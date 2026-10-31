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

const clean = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

// Emphasis words pop inside the caption band as an accent "sticker", so they can never cover the scene's content.
export const Captions: React.FC<{words: Word[]; colors: Colors; emphasis?: string[]}> = ({words, colors, emphasis = []}) => {
	const hot = new Set(emphasis.flatMap((e) => e.split(/\s+/).map(clean)));
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
				fontSize: 60,
				lineHeight: 1.1,
				textTransform: 'uppercase',
				scale: String(lerp(p, 0.86, 1)),
				opacity: p,
			}}
		>
			{page.map((w) => {
				const active = ms >= w.startMs - 40 && ms < w.endMs + 120;
				const isHot = hot.has(clean(w.text));
				const pop = isHot ? enter(frame, Math.floor(((w.startMs - 40) / 1000) * fps), 6) : 0;
				return (
					<span
						key={w.startMs}
						style={
							isHot && ms >= w.startMs - 40
								? {
										color: '#111',
										background: '#FFE14A',
										padding: '0 14px',
										borderRadius: 12,
										display: 'inline-block',
										rotate: '-3deg',
										scale: String(lerp(pop, 1.6, 1.12)),
										boxShadow: '0 12px 30px rgba(0,0,0,0.45)',
									}
								: {
										color: active ? '#FFE14A' : '#FFFFFF',
										WebkitTextStroke: '11px #111',
										paintOrder: 'stroke fill',
									}
						}
					>
						{w.text.replace(/[.,;:]$/, '')}
					</span>
				);
			})}
		</div>
	);
};
