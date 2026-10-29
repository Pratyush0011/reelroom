import React from 'react';
import {useCurrentFrame} from 'remotion';
import {enter, lerp} from '../motion';
import type {Colors, Source} from '../schema';
import {CAPTION_Y, mono, SAFE} from '../theme';

// The channel's signature: every fact on screen carries its receipt.
export const SourceChip: React.FC<{colors: Colors; sources: Source[]}> = ({colors, sources}) => {
	const frame = useCurrentFrame();
	if (!sources.length) return null;
	// One publisher name never clips; extra sources show as a count.
	const all = [...new Set(sources.map((s) => s.publisher))];
	const names = all.length > 1 ? `${all[0]} +${all.length - 1}` : all[0];
	const p = enter(frame, 10, 14);

	return (
		<div
			style={{
				position: 'absolute',
				left: SAFE.left,
				top: CAPTION_Y - 96,
				opacity: p,
				translate: `${lerp(p, -30, 0)}px 0px`,
				display: 'flex',
				alignItems: 'center',
				gap: 14,
				padding: '12px 20px',
				borderRadius: 999,
				background: `${colors.surface}E6`,
				border: `1.5px solid ${colors.text}22`,
				fontFamily: mono,
				fontSize: 24,
				fontWeight: 500,
				color: colors.muted,
				maxWidth: 780,
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			}}
		>
			<span style={{color: colors.good, fontWeight: 700}}>✓ SOURCE</span>
			<span style={{color: colors.text}}>{names}</span>
		</div>
	);
};
