import {Easing, interpolate} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Snappy ease-out used for almost every entrance: fast start, soft landing.
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);

// 0 -> 1 progress starting at `start` frames and lasting `dur` frames.
export const enter = (frame: number, start: number, dur = 12, easing = OUT) =>
	interpolate(frame, [start, start + dur], [0, 1], {...clamp, easing});

export const lerp = (p: number, from: number, to: number) => from + (to - from) * p;

// Count-up for numbers, landing slightly before the scene's midpoint.
export const countUp = (frame: number, start: number, dur: number, to: number) =>
	interpolate(frame, [start, start + dur], [0, to], {...clamp, easing: Easing.bezier(0.2, 0.9, 0.2, 1)});

export const formatNumber = (n: number, decimals = 0) =>
	n.toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
