import React from 'react';
import {useCurrentFrame} from 'remotion';
import {enter, lerp} from '../motion';
import type {Colors, Source} from '../schema';
import {CAPTION_Y, mono, SAFE} from '../theme';

const DATE = /\d{4}-\d{2}-\d{2}/;
// Fits "✓ SOURCE" + label in the chip at 22 px mono (0.6 em per character) inside 840 px.
const BUDGET = 50;

// Ledger publisher strings can be long ("Artificial Analysis comparison page (fetched 2026-11-02)"). Keep the
// publisher name and the date, drop parentheticals and bylines, and if it still doesn't fit, shorten the name, never the date.
export const chipLabel = (publisher: string, suffix = '', budget = BUDGET) => {
	const date = publisher.match(DATE)?.[0];
	let name = publisher.replace(/\([^)]*\)/g, '').split(',')[0].replace(/\s+/g, ' ').trim().replace(/\s+page$/i, '') || publisher;
	const tail = `${date ? ` · ${date}` : ''}${suffix}`;
	if (name.length + tail.length > budget) name = `${name.slice(0, Math.max(6, budget - tail.length - 1)).trimEnd()}…`;
	return name + tail;
};

// The channel's signature: every fact on screen carries its receipt.
export const SourceChip: React.FC<{colors: Colors; sources: Source[]}> = ({colors, sources}) => {
	const frame = useCurrentFrame();
	if (!sources.length) return null;
	// One publisher name never clips; extra sources show as a count.
	const all = [...new Set(sources.map((s) => s.publisher))];
	const names = chipLabel(all[0], all.length > 1 ? ` +${all.length - 1}` : '');
	const p = enter(frame, 10, 14);

	return (
		<div
			style={{
				position: 'absolute',
				left: SAFE.left,
				top: CAPTION_Y + 142,
				opacity: p,
				translate: `${lerp(p, -30, 0)}px 0px`,
				display: 'flex',
				alignItems: 'center',
				gap: 14,
				padding: '12px 20px',
				borderRadius: 999,
				background: 'rgba(0,0,0,0.62)',
				
				fontFamily: mono,
				fontSize: 22,
				fontWeight: 500,
				maxWidth: 840,
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			}}
		>
			<span style={{color: '#6DFFC4', fontWeight: 700}}>✓ SOURCE</span>
			<span style={{color: '#fff'}}>{names}</span>
		</div>
	);
};
