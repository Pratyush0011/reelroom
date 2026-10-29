// Renders two PNGs per scene (mid and end) into <run>/qa/ for the visual-QA agent to look at.
import {renderStill} from '@remotion/renderer';
import {mkdirSync, readdirSync, rmSync} from 'node:fs';
import path from 'node:path';
import {resolveTiming} from '../src/Reel.tsx';
import {propsForRun, runDirFromArgs} from './lib.ts';
import {prepare} from './remotion.ts';

const runDir = runDirFromArgs();
const inputProps = propsForRun(runDir);
const qaDir = path.join(runDir, 'qa');
// Empty the folder rather than deleting it: on Windows a folder that's open in a shell or viewer can't be removed.
mkdirSync(qaDir, {recursive: true});
for (const f of readdirSync(qaDir)) rmSync(path.join(qaDir, f), {force: true});

const {serveUrl, composition} = await prepare(inputProps);
const timing = resolveTiming(inputProps);
let at = 0;
for (const t of timing.scenes) {
	const shots = {mid: at + Math.floor(t.durationInFrames / 2), end: at + t.durationInFrames - 3};
	for (const [name, frame] of Object.entries(shots)) {
		const output = path.join(qaDir, `${t.id}-${name}.png`);
		await renderStill({serveUrl, composition, inputProps, frame, output, scale: 0.5});
		console.log(path.relative(runDir, output));
	}
	at += t.durationInFrames;
}
