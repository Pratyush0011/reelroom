import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {enter, lerp} from '../motion';
import type {Colors, Word} from '../schema';
import {CAPTION_Y, display, SAFE, W} from '../theme';

// Word-synced captions. Words are grouped into short pages (max 3 words, broken at
// punctuation and pauses) and the word being spoken lights up in the accent colour.
const paginate = (words: Word[]) => {
	const pages: Word[][] = [];
	let cur: Word[] = [];
	words.forEach((w, i) => {
		cur.push(w);
		const next = words[i + 1];
		const pause = next ? next.startMs - w.endMs > 280 : true;
		if (cur.length === 3 || /[.,!?;:]$/.test(w.text) || pause) {
			pages.push(cur);
			cur = [];
		}
	});
	if (cur.length) pages.push(cur);
	return pages;
};

export const Captions: React.FC<{words: Word[]; colors: Colors}> = ({words, colors}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const ms = (frame / fps) * 1000;
	const pages = paginate(words);
	const idx = pages.findIndex((p, i) => ms >= p[0].startMs - 60 && (i === pages.length - 1 || ms < pages[i + 1][0].startMs - 60));
	if (idx < 0) return null;
	const page = pages[idx];
	const p = enter(frame, Math.floor(((page[0].startMs - 60) / 1000) * fps), 6);

	return (
		<div
			style={{
				position: 'absolute',
				top: CAPTION_Y,
				left: SAFE.left,
				width: W - SAFE.left - SAFE.right,
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				gap: '0 18px',
				fontFamily: display,
				fontWeight: 900,
				fontSize: 66,
				lineHeight: 1.1,
				textTransform: 'uppercase',
				scale: String(lerp(p, 0.86, 1)),
				opacity: p,
			}}
		>
			{page.map((w) => {
				const active = ms >= w.startMs - 40 && ms < w.endMs + 120;
				return (
					<span
						key={w.startMs}
						style={{
							color: active ? colors.accent : colors.text,
							WebkitTextStroke: `10px ${colors.bg}`,
							paintOrder: 'stroke fill',
						}}
					>
						{w.text.replace(/[.,;:]$/, '')}
					</span>
				);
			})}
		</div>
	);
};
