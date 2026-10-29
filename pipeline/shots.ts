// Screenshots the real source page for every `document` scene, using Remotion's headless Chrome.
// Writes public/runs/<slug>/doc-<scene>.png and <run>/assets.json for the renderer.
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
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

const runDir = runDirFromArgs();
const sb = loadStoryboard(runDir);
const outDir = publicAudioDir(runDir);
mkdirSync(outDir, {recursive: true});
const chrome = findChrome();
const assets: Record<string, string> = {};

for (const scene of sb.scenes) {
	if (scene.type !== 'document') continue;
	const raw = path.join(outDir, `raw-${scene.id}.png`);
	const out = path.join(outDir, `doc-${scene.id}.png`);
	try {
		// Reduced motion makes sites skip their fade-in animations (otherwise text is captured half-faded or
		// invisible). We keep only the top of the page: the headline, and above cookie banners pinned to the bottom.
		execFileSync(
			chrome,
			['--headless', '--hide-scrollbars', '--window-size=1200,1700', '--force-prefers-reduced-motion', '--virtual-time-budget=4000', `--screenshot=${raw}`, scene.url],
			{stdio: 'pipe', timeout: 90_000},
		);
		execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', raw, '-vf', 'crop=1200:1150:0:0', out]);
		rmSync(raw, {force: true});
		assets[scene.id] = `runs/${slugOf(runDir)}/doc-${scene.id}.png`;
		console.log(`${scene.id}  ✓ ${scene.url}`);
	} catch (e) {
		// The scene still works without a backdrop; QA will see it.
		console.log(`${scene.id}  ✗ could not screenshot ${scene.url}: ${String(e).slice(0, 120)}`);
	}
}
writeFileSync(path.join(runDir, 'assets.json'), JSON.stringify(assets, null, 2));
