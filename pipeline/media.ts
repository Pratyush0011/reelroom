// Fetches licensed B-roll for `broll` scenes, with no API keys:
// Wikimedia Commons (video first, then images) and Openverse (Creative Commons images).
// Only licenses that allow commercial reuse are accepted; every clip is credited in <run>/media-credits.json.
// Each run rebuilds from scratch, so nothing stale or uncredited can end up in a render.
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {loadStoryboard, publicAudioDir, readJson, runDirFromArgs, slugOf} from './lib.ts';

const UA = 'reelroom/0.1 (AI news reel generator; https://github.com/Pratyush0011/reelroom)';
const OK_LICENSE = /^(cc0|pdm|public domain|cc[- ]?by(-sa)?([- ][0-9.]+)?|by(-sa)?)$/i;
// Things that make B-roll a liability on a news page: identifiable politicians, brands and ads, money and stamps, weapons.
const RISKY =
	/(president|minister|prime|senator|politic|election|rally|campaign|stamp|banknote|coin|currency|logo|advert|brand|tobacco|cigar|rolling paper|cannabis|weapon|gun|rifle|military|army|\bwar\b|protest|portrait|air force|navy|marine|soldier|squadron|amazon|walmart|fedex|ups truck|dhl|coca|pepsi|nike|apple store|google|microsoft)/i;
const MIN_BRIGHTNESS = 45; // average luma 0-255; below this the clip reads as a black screen

type Credit = {scene: string; query: string; title: string; author: string; license: string; source: string; kind: 'video' | 'image'};
type Candidate = Omit<Credit, 'scene' | 'query'> & {url: string};

const get = async (url: string) => {
	const res = await fetch(url, {headers: {'User-Agent': UA}});
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	return res.json() as Promise<any>;
};
const strip = (html = '') => html.replace(/<[^>]+>/g, '').trim();
// Some sources return percent-encoded author names (sometimes Latin-1); decode them for a clean credit line.
const decode = (s: string) => {
	try {
		return decodeURIComponent(s);
	} catch {
		return unescape(s);
	}
};
// Wikimedia search is loose, so a result must name most of the query's words in its title to count.
const relevant = (title: string, query: string) => {
	const keys = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
	const t = title.toLowerCase();
	return keys.filter((k) => t.includes(k)).length >= Math.ceil(keys.length / 2);
};

const commons = async (query: string, kind: 'video' | 'image'): Promise<Candidate[]> => {
	const q = new URLSearchParams({
		action: 'query',
		format: 'json',
		generator: 'search',
		gsrsearch: `${kind === 'video' ? 'filetype:video' : 'filetype:bitmap'} ${query}`,
		gsrnamespace: '6',
		gsrlimit: '20',
		prop: 'imageinfo',
		iiprop: 'url|size|mime|extmetadata',
		iiurlwidth: '1600',
	});
	const data = await get(`https://commons.wikimedia.org/w/api.php?${q}`);
	const pages = Object.values<any>(data.query?.pages ?? {}).sort((a, b) => a.index - b.index);
	const out: Candidate[] = [];
	for (const p of pages) {
		const ii = p.imageinfo?.[0];
		const meta = ii?.extmetadata ?? {};
		const license = strip(meta.LicenseShortName?.value);
		if (!ii || !OK_LICENSE.test(license) || !relevant(p.title, query) || RISKY.test(p.title)) continue;
		if (kind === 'video' && (ii.size > 60_000_000 || !/video/.test(ii.mime))) continue;
		if (kind === 'image' && (ii.width < 900 || !/jpeg|png/.test(ii.mime))) continue;
		out.push({
			kind,
			url: kind === 'image' ? ii.thumburl ?? ii.url : ii.url,
			title: p.title.replace(/^File:/, ''),
			author: decode(strip(meta.Artist?.value)) || 'unknown',
			license,
			source: ii.descriptionurl,
		});
	}
	return out;
};

const openverse = async (query: string): Promise<Candidate[]> => {
	const q = new URLSearchParams({q: query, license_type: 'commercial', size: 'large', page_size: '12', mature: 'false'});
	const data = await get(`https://api.openverse.org/v1/images/?${q}`);
	const out: Candidate[] = [];
	for (const r of data.results ?? []) {
		const text = `${r.title ?? ''} ${(r.tags ?? []).map((t: {name: string}) => t.name).join(' ')}`;
		if ((r.width ?? 0) < 900 || /\.(gif|svg)$/i.test(r.url) || RISKY.test(text)) continue;
		out.push({kind: 'image', url: r.url, title: decode(r.title ?? 'untitled'), author: decode(r.creator ?? 'unknown'), license: `${r.license} ${r.license_version ?? ''}`.trim(), source: r.foreign_landing_url ?? r.url});
	}
	return out;
};

// Average luma of the file, by shrinking every sampled frame to one grey pixel.
const brightness = (file: string) => {
	// A still image has a single frame, so sampling it at 2 fps would yield nothing.
	const sample = /\.jpg$/i.test(file) ? ['-frames:v', '1', '-vf', 'scale=1:1,format=gray'] : ['-t', '4', '-vf', 'fps=2,scale=1:1,format=gray'];
	const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, ...sample, '-f', 'rawvideo', '-'], {maxBuffer: 1 << 20});
	return raw.length ? raw.reduce((a, b) => a + b, 0) / raw.length : 0;
};

const normalise = (raw: string, kind: 'video' | 'image', out: string) => {
	const vf = 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920';
	if (kind === 'video')
		execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-t', '8', '-an', '-vf', `${vf},fps=30`, '-c:v', 'libx264', '-crf', '23', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', out]);
	else execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-vf', vf, '-q:v', '3', out]);
};

const runDir = runDirFromArgs();
const sb = loadStoryboard(runDir);
const outDir = publicAudioDir(runDir);
mkdirSync(outDir, {recursive: true});

// Clean rebuild: drop every previous B-roll file and asset entry (screenshots for document scenes are kept).
for (const f of readdirSync(outDir)) if (f.startsWith('media-') || f.startsWith('raw-')) rmSync(path.join(outDir, f), {force: true});
const assetsFile = path.join(runDir, 'assets.json');
const previous: Record<string, string> = existsSync(assetsFile) ? readJson(assetsFile) : {};
const assets = Object.fromEntries(Object.entries(previous).filter(([, v]) => !path.basename(v).startsWith('media-')));
const credits: Credit[] = [];

for (const scene of sb.scenes) {
	if (scene.type !== 'broll') continue;
	const query = scene.media.query;
	const key = scene.id;

	// Same query as last time → reuse the clip QA already saw, instead of re-rolling the search.
	const cacheDir = path.join(runDir, 'media-cache');
	const hash = createHash('sha1').update(query.toLowerCase().trim()).digest('hex').slice(0, 12);
	const cachedMeta = path.join(cacheDir, `${hash}.json`);
	if (existsSync(cachedMeta)) {
		const meta = JSON.parse(readFileSync(cachedMeta, 'utf8')) as Omit<Credit, 'scene' | 'query'> & {file: string};
		const out = path.join(outDir, `media-${key}${path.extname(meta.file)}`);
		copyFileSync(path.join(cacheDir, meta.file), out);
		assets[key] = `runs/${slugOf(runDir)}/${path.basename(out)}`;
		const {file: _f, ...credit} = meta;
		credits.push({scene: scene.id, query, ...credit});
		console.log(`${scene.id}  ✓ ${meta.kind}  ${meta.title.slice(0, 60)}  (cached)`);
		continue;
	}
	// Long, specific queries often match nothing in Openverse; fall back to shorter versions of the same idea.
	const w = query.split(/\s+/).filter((x) => x.length > 2);
	const shorter = [...new Set([w.slice(-2).join(' '), w.slice(0, 2).join(' ')])].filter((q) => q && q !== query);
	// Openverse photos match plain-language queries best; Wikimedia video titles are often events or names.
	const candidates = [
		...(await openverse(query).catch(() => [])),
		...(await commons(query, 'video').catch(() => [])),
		...(await commons(query, 'image').catch(() => [])),
	];
	for (const q of shorter) if (candidates.length < 4) candidates.push(...(await openverse(q).catch(() => [])));
	candidates.splice(8);

	let done = false;
	for (const c of candidates) {
		const raw = path.join(outDir, `raw-${key}`);
		const out = path.join(outDir, `media-${key}.${c.kind === 'video' ? 'mp4' : 'jpg'}`);
		try {
			const res = await fetch(c.url, {headers: {'User-Agent': UA}});
			if (!res.ok) throw new Error(`download ${res.status}`);
			writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
			normalise(raw, c.kind, out);
			const luma = brightness(out);
			if (luma < MIN_BRIGHTNESS) {
				console.log(`${scene.id}  · skip (too dark, ${luma.toFixed(0)}): ${c.title.slice(0, 50)}`);
				rmSync(out, {force: true});
				continue;
			}
			assets[key] = `runs/${slugOf(runDir)}/${path.basename(out)}`;
			const {url: _url, ...meta} = c;
			credits.push({scene: scene.id, query, ...meta});
			mkdirSync(cacheDir, {recursive: true});
			copyFileSync(out, path.join(cacheDir, `${hash}${path.extname(out)}`));
			writeFileSync(cachedMeta, JSON.stringify({...meta, file: `${hash}${path.extname(out)}`}));
			console.log(`${scene.id}  ✓ ${c.kind}  ${c.title.slice(0, 60)}  (${c.license})`);
			done = true;
			break;
		} catch (e) {
			console.log(`${scene.id}  · skip (${String(e).slice(0, 60)})`);
		} finally {
			rmSync(raw, {force: true});
		}
	}
	if (!done) console.log(`${scene.id}  ✗ nothing licensed, safe and bright enough for "${query}"`);
}

writeFileSync(assetsFile, JSON.stringify(assets, null, 2));
writeFileSync(path.join(runDir, 'media-credits.json'), JSON.stringify(credits, null, 2));
console.log(`\n${credits.length} clip(s) → media-credits.json`);
