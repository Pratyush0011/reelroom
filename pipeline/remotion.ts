import {bundle} from '@remotion/bundler';
import {selectComposition} from '@remotion/renderer';
import path from 'node:path';
import type {ReelProps} from '../src/schema.ts';
import {ROOT} from './lib.ts';

// Bundle once, then reuse for every still or render.
export const prepare = async (inputProps: ReelProps) => {
	const serveUrl = await bundle({entryPoint: path.join(ROOT, 'src', 'index.ts'), publicDir: path.join(ROOT, 'public')});
	const composition = await selectComposition({serveUrl, id: 'Reel', inputProps});
	return {serveUrl, composition};
};
