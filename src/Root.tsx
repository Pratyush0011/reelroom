import React from 'react';
import {Composition} from 'remotion';
import {demoProps} from './demo';
import {FPS, Reel, resolveTiming} from './Reel';
import type {ReelProps} from './schema';
import {H, W} from './theme';

export const RemotionRoot: React.FC = () => (
	<Composition
		id="Reel"
		component={Reel}
		fps={FPS}
		width={W}
		height={H}
		durationInFrames={300}
		defaultProps={demoProps}
		calculateMetadata={({props}: {props: ReelProps}) => ({
			durationInFrames: resolveTiming(props).scenes.reduce((sum, s) => sum + s.durationInFrames, 0),
		})}
	/>
);
