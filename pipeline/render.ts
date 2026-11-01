// Renders <run>/final.mp4 and a cover image (the end of the hook scene, fully built).
import {renderMedia, renderStill} from '@remotion/renderer';
import path from 'node:path';
import {resolveTiming} from '../src/Reel.tsx';
import {propsForRun, runDirFromArgs} from './lib.ts';
import {prepare} from './remotion.ts';

const runDir = runDirFromArgs();
const inputProps = propsForRun(runDir);
const {serveUrl, composition} = await prepare(inputProps);

const hook = resolveTiming(inputProps).scenes[0];
// The props live on the selected composition, so the cover flag has to go there too or captions stay on.
const cover = {...composition, props: {...composition.props, cover: true}};
await renderStill({serveUrl, composition: cover, inputProps: {...inputProps, cover: true}, frame: hook.durationInFrames - 2, output: path.join(runDir, 'cover.png')});

let last = -1;
await renderMedia({
	serveUrl,
	composition,
	inputProps,
	codec: 'h264',
	crf: 18,
	outputLocation: path.join(runDir, 'final.mp4'),
	onProgress: ({progress}) => {
		const pct = Math.floor(progress * 10) * 10;
		if (pct !== last) console.log(`rendering ${pct}%`), (last = pct);
	},
});
console.log(`\n✓ ${path.join(runDir, 'final.mp4')}  (${(composition.durationInFrames / composition.fps).toFixed(1)}s)`);
