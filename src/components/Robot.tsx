import React from 'react';
import {useCurrentFrame} from 'remotion';

// The channel's recurring character. With no human presenter, faceless channels that win (Kurzgesagt, Zack D Films)
// rely on an expressive character: viewers read a face instantly.
export type Mood = 'happy' | 'stressed' | 'sad' | 'cool';

export const Robot: React.FC<{size: number; color?: string; mood?: Mood; seed?: number; ink?: string}> = ({
	size,
	color = '#FFFFFF',
	mood = 'happy',
	seed = 0,
	ink = '#14141C',
}) => {
	const frame = useCurrentFrame();
	const bob = Math.sin((frame + seed * 7) / 5) * 5;
	const wave = Math.sin((frame + seed * 5) / 4) * (mood === 'stressed' ? 42 : 18);
	const blink = (frame + seed * 13) % 48 < 3;
	const eye = {cx: [72, 128], cy: 92};
	return (
		<svg width={size} height={size * 1.2} viewBox="0 0 200 240" style={{overflow: 'visible', display: 'block'}}>
			{/* legs */}
			<rect x="66" y="196" width="24" height="36" rx="11" fill={ink} />
			<rect x="110" y="196" width="24" height="36" rx="11" fill={ink} />
			{/* arms */}
			<g transform={`rotate(${wave} 34 140)`}>
				<rect x="8" y="126" width="30" height="62" rx="15" fill={color} stroke={ink} strokeWidth="6" />
			</g>
			<g transform={`rotate(${-wave} 166 140)`}>
				<rect x="162" y="126" width="30" height="62" rx="15" fill={color} stroke={ink} strokeWidth="6" />
			</g>
			<g transform={`translate(0 ${bob})`}>
				{/* antenna */}
				<rect x="95" y="10" width="10" height="30" fill={ink} />
				<circle cx="100" cy="12" r="11" fill={mood === 'stressed' ? '#FF3B30' : '#FFE14A'} stroke={ink} strokeWidth="5" />
				{/* head + body */}
				<rect x="32" y="38" width="136" height="104" rx="34" fill={color} stroke={ink} strokeWidth="7" />
				<rect x="50" y="56" width="100" height="68" rx="22" fill={ink} />
				<rect x="50" y="134" width="100" height="72" rx="24" fill={color} stroke={ink} strokeWidth="7" />
				<circle cx="100" cy="170" r="13" fill="#FF3D9A" stroke={ink} strokeWidth="5" />
				{/* face */}
				{mood === 'cool'
					? <rect x="58" y="78" width="84" height="24" rx="10" fill="#6DFFC4" />
					: eye.cx.map((x) => <ellipse key={x} cx={x} cy={eye.cy} rx="12" ry={blink ? 2 : 14} fill="#6DFFC4" />)}
				{mood === 'happy' ? <path d="M84 110 Q100 124 116 110" stroke="#6DFFC4" strokeWidth="6" fill="none" strokeLinecap="round" /> : null}
				{mood === 'sad' || mood === 'stressed' ? <path d="M84 118 Q100 106 116 118" stroke="#FF3B30" strokeWidth="6" fill="none" strokeLinecap="round" /> : null}
				{mood === 'stressed' ? <path d="M176 44 q10 16 0 22 q-10 -6 0 -22" fill="#35C4FF" stroke={ink} strokeWidth="3" /> : null}
			</g>
		</svg>
	);
};
