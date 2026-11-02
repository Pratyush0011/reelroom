// Screenshots the real source page for every `document` scene, using Remotion's headless Chrome.
// Writes public/runs/<slug>/doc-<scene>.png and <run>/assets.json for the renderer.
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {loadStoryboard, publicAudioDir, ROOT, runDirFromArgs, slugOf} from './lib.ts';

const findChrome = () => {
	const base = path.join(ROOT, 'node_modules', '.remotion', 'chrome-headless-shell');
	for (const platform of existsSync(base) ? readdirSync(base) : []) {
		for (const name of ['chrome-headless-shell.exe', 'chrome-headless-shell']) {
			const dir = path.join(base, platform, `chrome-headless-shell-${platform}`);
			if (existsSync(path.join(dir, name))) return path.join(dir, name);
		}
	}
	throw new Error('Headless Chrome not found. Run `npx remotion browser ensure` first.');
};

// First row of Chrome's text-fragment highlight (lavender, about #E9D2FD), or null if the quote wasn't found on the page.
const highlightY = (png: string, width: number, height: number): number | null => {
	const rgb = execFileSync('ffmpeg', ['-v', 'error', '-i', png, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], {maxBuffer: width * height * 3 + 1024});
	for (let y = 0; y < height; y += 2) {
		let n = 0;
		for (let x = 0; x < width; x += 3) {
			const i = (y * width + x) * 3;
			const [r, g, b] = [rgb[i], rgb[i + 1], rgb[i + 2]];
			if (r >= 225 && r <= 245 && g >= 195 && g <= 220 && b >= 245 && r > g + 15) n++;
		}
		if (n > 8) return y;
	}
	return null;
};

const runDir = runDirFromArgs();
const sb = loadStoryboard(runDir);
const outDir = publicAudioDir(runDir);
mkdirSync(outDir, {recursive: true});
const chrome = findChrome();
const assetsFile = path.join(runDir, 'assets.json');
const assets: Record<string, string> = existsSync(assetsFile) ? JSON.parse(readFileSync(assetsFile, 'utf8')) : {};

for (const scene of sb.scenes) {
	if (scene.type !== 'document') continue;
	const raw = path.join(outDir, `raw-${scene.id}.png`);
	const out = path.join(outDir, `doc-${scene.id}.png`);
	try {
		// Reduced motion makes sites skip their fade-in animations (otherwise text is captured half-faded or
		// invisible). We keep only the top of the page: the headline, and above cookie banners pinned to the bottom.
		// With a text fragment (#:~:text=...), Chrome scrolls to the quoted line and highlights it. The scrolled capture
		// isn't reliably aligned to the window, so we shoot a tall window and crop around the highlight instead.
		const fragment = scene.url.includes('#:~:text=');
		const height = fragment ? 3400 : 1700;
		execFileSync(
			chrome,
			['--headless', '--hide-scrollbars', `--window-size=1200,${height}`, '--force-prefers-reduced-motion', '--virtual-time-budget=4000', `--screenshot=${raw}`, scene.url],
			{stdio: 'pipe', timeout: 90_000},
		);
		const hit = fragment ? highlightY(raw, 1200, height) : null;
		const top = hit === null ? 0 : Math.max(0, Math.min(height - 1150, hit - 160));
		if (fragment) console.log(`${scene.id}  ${hit === null ? 'highlight not found, keeping the top of the page' : `quoted line found at y=${hit}`}`);
		execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-vf', `crop=1200:1150:0:${top}`, out]);
		rmSync(raw, {force: true});
		assets[scene.id] = `runs/${slugOf(runDir)}/doc-${scene.id}.png`;
		console.log(`${scene.id}  ✓ ${scene.url}`);
	} catch (e) {
		// The scene still works without a backdrop; QA will see it.
		console.log(`${scene.id}  ✗ could not screenshot ${scene.url}: ${String(e).slice(0, 120)}`);
	}
}
writeFileSync(assetsFile, JSON.stringify(assets, null, 2));
