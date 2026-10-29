import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Colors} from '../schema';

// Persistent backdrop: dark canvas, a slowly drifting accent glow, a faint engineering grid and film grain.
// It never cuts between scenes, which makes hard cuts on top of it feel intentional.
export const Background: React.FC<{colors: Colors}> = ({colors}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const t = frame / Math.max(durationInFrames, 1);

	return (
		<AbsoluteFill style={{backgroundColor: colors.bg, overflow: 'hidden'}}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(900px 900px at ${interpolate(t, [0, 1], [20, 80])}% ${interpolate(t, [0, 1], [18, 62])}%, ${colors.accent}24, transparent 70%)`,
				}}
			/>
			<AbsoluteFill
				style={{
					background: `radial-gradient(700px 700px at ${interpolate(t, [0, 1], [90, 10])}% 95%, ${colors.warn}14, transparent 70%)`,
				}}
			/>
			<AbsoluteFill
				style={{
					opacity: 0.07,
					backgroundImage: `linear-gradient(${colors.text} 1px, transparent 1px), linear-gradient(90deg, ${colors.text} 1px, transparent 1px)`,
					backgroundSize: '90px 90px',
					backgroundPosition: `0px ${-(frame * 0.6) % 90}px`,
					maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
				}}
			/>
			<svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.09, mixBlendMode: 'overlay'}}>
				<filter id="grain">
					<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={Math.floor(frame / 2) % 50} />
				</filter>
				<rect width="100%" height="100%" filter="url(#grain)" />
			</svg>
		</AbsoluteFill>
	);
};
