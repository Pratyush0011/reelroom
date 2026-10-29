import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import type {Colors} from '../schema';

// Persistent, always-moving backdrop: drifting accent glows, a scrolling grid, rising particles,
// a slowly rotating dashed ring and film grain. It never cuts, so hard cuts on top of it feel intentional.
const PARTICLES = Array.from({length: 26}, (_, i) => ({
	x: random(`px${i}`) * 1080,
	y: random(`py${i}`) * 1920,
	r: 2 + random(`pr${i}`) * 5,
	speed: 0.6 + random(`ps${i}`) * 1.8,
	o: 0.15 + random(`po${i}`) * 0.35,
}));

export const Background: React.FC<{colors: Colors}> = ({colors}) => {
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill style={{backgroundColor: colors.bg, overflow: 'hidden'}}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(900px 900px at ${50 + Math.sin(frame / 50) * 35}% ${40 + Math.cos(frame / 70) * 25}%, ${colors.accent}2E, transparent 70%)`,
				}}
			/>
			<AbsoluteFill
				style={{
					background: `radial-gradient(760px 760px at ${50 + Math.cos(frame / 45) * 40}% ${85 + Math.sin(frame / 60) * 10}%, ${colors.warn}1C, transparent 70%)`,
				}}
			/>
			<AbsoluteFill
				style={{
					opacity: 0.09,
					backgroundImage: `linear-gradient(${colors.text} 1px, transparent 1px), linear-gradient(90deg, ${colors.text} 1px, transparent 1px)`,
					backgroundSize: '90px 90px',
					backgroundPosition: `${(frame * 0.8) % 90}px ${-(frame * 2.2) % 90}px`,
					maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black, transparent)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 540 - 520,
					top: 760 - 520,
					width: 1040,
					height: 1040,
					borderRadius: '50%',
					border: `2px dashed ${colors.text}14`,
					rotate: `${frame * 0.25}deg`,
				}}
			/>
			{PARTICLES.map((p, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: p.x + Math.sin((frame + i * 13) / 30) * 20,
						top: ((p.y - frame * p.speed * 2) % 1920 + 1920) % 1920,
						width: p.r,
						height: p.r,
						borderRadius: '50%',
						background: i % 4 === 0 ? colors.accent : colors.text,
						opacity: p.o,
					}}
				/>
			))}
			<svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.09, mixBlendMode: 'overlay'}}>
				<filter id="grain">
					<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={Math.floor(frame / 2) % 50} />
				</filter>
				<rect width="100%" height="100%" filter="url(#grain)" />
			</svg>
		</AbsoluteFill>
	);
};
