// Measures how a rendered reel *looks* against top short-form channels, so "monotonous" is a number, not a feeling.
// Benchmark: median of 12 top channels (Fireship, Kurzgesagt, Zack D Films, Cleo Abram, Johnny Harris, Vox, Varun Mayya,
// Dhruv Rathee, Mrwhosetheboss, Veritasium, Jeff Su, NileRed), measured Oct 2026 on sampled frames from their Shorts.
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {runDirFromArgs} from './lib.ts';

const W = 90;
const H = 160;
export const BENCHMARK = {brightness: 107, colourfulness: 47, dark: 0.22, variety: 0.57};
// Pass marks are deliberately below the median: the bar is "in the same league", not "the best channel on YouTube".
export const PASS = {brightness: 85, colourfulness: 40, dark: 0.35, variety: 0.45};

type Frame = Uint8Array;

const std = (a: number[], mean: number) => Math.sqrt(a.reduce((s, x) => s + (x - mean) ** 2, 0) / a.length);

export const frameStats = (f: Frame) => {
	const rg: number[] = [];
	const yb: number[] = [];
	let lum = 0;
	let dark = 0;
	const n = f.length / 3;
	for (let i = 0; i < f.length; i += 3) {
		const [r, g, b] = [f[i], f[i + 1], f[i + 2]];
		const l = 0.299 * r + 0.587 * g + 0.114 * b;
		lum += l;
		if (l < 40) dark++;
		rg.push(r - g);
		yb.push(0.5 * (r + g) - b);
	}
	const mrg = rg.reduce((a, b) => a + b, 0) / n;
	const myb = yb.reduce((a, b) => a + b, 0) / n;
	// Hasler & Suesstrunk colourfulness
	const colourfulness = Math.hypot(std(rg, mrg), std(yb, myb)) + 0.3 * Math.hypot(mrg, myb);
	return {brightness: lum / n, colourfulness, dark: dark / n};
};

const histogram = (f: Frame) => {
	const h = new Float64Array(64);
	for (let i = 0; i < f.length; i += 3) h[(f[i] >> 6) * 16 + (f[i + 1] >> 6) * 4 + (f[i + 2] >> 6)]++;
	return h.map((v) => v / (f.length / 3));
};

// Average colour-histogram distance between all pairs of frames: 0 = every frame looks the same, 1 = nothing in common.
export const variety = (frames: Frame[]) => {
	const hs = frames.map(histogram);
	let sum = 0;
	let pairs = 0;
	for (let i = 0; i < hs.length; i++)
		for (let j = i + 1; j < hs.length; j++) {
			sum += 0.5 * hs[i].reduce((s, v, k) => s + Math.abs(v - hs[j][k]), 0);
			pairs++;
		}
	return pairs ? sum / pairs : 0;
};

const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;

if (process.argv[1]?.endsWith('look.ts')) {
	const runDir = runDirFromArgs();
	const file = path.join(runDir, 'final.mp4');
	const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-vf', `fps=1/2,scale=${W}:${H}`, '-pix_fmt', 'rgb24', '-f', 'rawvideo', '-'], {maxBuffer: 1 << 28});
	const size = W * H * 3;
	const frames = Array.from({length: Math.floor(raw.length / size)}, (_, i) => new Uint8Array(raw.subarray(i * size, (i + 1) * size)));
	const stats = frames.map(frameStats);
	const got = {
		brightness: avg(stats.map((s) => s.brightness)),
		colourfulness: avg(stats.map((s) => s.colourfulness)),
		dark: avg(stats.map((s) => s.dark)),
		variety: variety(frames),
	};
	const rows: [keyof typeof PASS, boolean][] = [
		['brightness', got.brightness >= PASS.brightness],
		['colourfulness', got.colourfulness >= PASS.colourfulness],
		['dark', got.dark <= PASS.dark],
		['variety', got.variety >= PASS.variety],
	];
	console.log('metric          ours   pass   market');
	for (const [k, ok] of rows) console.log(`${k.padEnd(14)} ${got[k].toFixed(2).padStart(6)} ${String(PASS[k]).padStart(6)} ${String(BENCHMARK[k]).padStart(6)}  ${ok ? '✓' : '✗ FAIL'}`);
	const failed = rows.filter(([, ok]) => !ok).length;
	console.log(failed ? `\n✗ looks monotonous: ${failed} of 4 below the bar` : '\n✓ in the same league as the benchmark');
	process.exit(failed ? 1 : 0);
}
