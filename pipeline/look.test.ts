import assert from 'node:assert/strict';
import {test} from 'node:test';
import {frameStats, variety} from './look.ts';

const solid = (r: number, g: number, b: number, n = 300) => {
	const f = new Uint8Array(n * 3);
	for (let i = 0; i < f.length; i += 3) [f[i], f[i + 1], f[i + 2]] = [r, g, b];
	return f;
};

test('a dark frame counts as dark, a bright saturated one does not', () => {
	const dark = frameStats(solid(12, 12, 18));
	const bright = frameStats(solid(255, 90, 54));
	assert.equal(dark.dark, 1);
	assert.equal(bright.dark, 0);
	assert.ok(bright.brightness > dark.brightness);
	assert.ok(bright.colourfulness > dark.colourfulness);
});

test('variety: identical frames score 0, different colour worlds score high', () => {
	assert.equal(variety([solid(10, 10, 10), solid(10, 10, 10), solid(10, 10, 10)]), 0);
	assert.ok(variety([solid(255, 90, 54), solid(43, 59, 255), solid(255, 210, 31)]) > 0.9);
});
