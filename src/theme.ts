import {loadFont as loadInterTight} from '@remotion/google-fonts/InterTight';
import {loadFont as loadSerif} from '@remotion/google-fonts/InstrumentSerif';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const display = loadInterTight('normal', {weights: ['600', '800', '900'], subsets: ['latin']}).fontFamily;
export const serif = loadSerif('italic', {weights: ['400'], subsets: ['latin']}).fontFamily;
export const mono = loadMono('normal', {weights: ['500', '700'], subsets: ['latin']}).fontFamily;

export const W = 1080;
export const H = 1920;

// Conservative safe zone shared by Reels, TikTok and Shorts:
// status bar on top, username/caption/buttons at the bottom, action buttons on the right.
export const SAFE = {left: 84, right: 150, top: 270, bottom: 430};
export const CONTENT = {
	x: SAFE.left,
	y: SAFE.top + 70,
	width: W - SAFE.left - SAFE.right,
	height: 900,
};
export const CAPTION_Y = 1300;

// Deterministic text sizing (no DOM measuring, so it's identical in preview, stills and final render).
// Inter Tight at heavy weights averages ~0.56em per character.
export const fitSize = (
	text: string,
	{maxWidth, maxLines, max, min = 40, ratio = 0.56}: {maxWidth: number; maxLines: number; max: number; min?: number; ratio?: number},
) => {
	const words = text.split(/\s+/).filter(Boolean);
	const longest = Math.max(...words.map((w) => w.length), 1);
	for (let size = max; size > min; size -= 2) {
		const charW = size * ratio;
		if (longest * charW > maxWidth) continue;
		let lines = 1;
		let used = 0;
		for (const w of words) {
			const need = (used ? 1 : 0) * charW + w.length * charW;
			if (used + need > maxWidth) {
				lines++;
				used = w.length * charW;
			} else used += need;
		}
		if (lines <= maxLines) return size;
	}
	return min;
};
