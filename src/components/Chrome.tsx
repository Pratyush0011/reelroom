import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import type {Colors} from '../schema';
import {mono, SAFE, W} from '../theme';

// Story-style chapter segments + channel handle, inside the top of the safe zone.
export const Chrome: React.FC<{colors: Colors; handle: string; starts: number[]; total: number}> = ({
	colors,
	handle,
	starts,
	total,
}) => {
	const frame = useCurrentFrame();
	const ends = [...starts.slice(1), total];

	return (
		<div style={{position: 'absolute', top: SAFE.top - 40, left: SAFE.left, width: W - SAFE.left - SAFE.right}}>
			<div style={{display: 'flex', gap: 8}}>
				{starts.map((s, i) => {
					const fill = interpolate(frame, [s, ends[i]], [0, 100], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					return (
						<div key={s} style={{flex: 1, height: 6, borderRadius: 3, background: `${colors.text}26`, overflow: 'hidden'}}>
							<div style={{width: `${fill}%`, height: '100%', background: colors.text}} />
						</div>
					);
				})}
			</div>
			<div
				style={{
					marginTop: 22,
					fontFamily: mono,
					fontWeight: 700,
					fontSize: 26,
					letterSpacing: 2,
					color: colors.muted,
					textTransform: 'uppercase',
				}}
			>
				<span style={{color: colors.accent}}>●</span> {handle}
			</div>
		</div>
	);
};
