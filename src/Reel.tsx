import {Audio} from '@remotion/media';
import React from 'react';
import {AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Background} from './components/Background';
import {Captions} from './components/Captions';
import {Chrome} from './components/Chrome';
import {SourceChip} from './components/SourceChip';
import {enter, lerp} from './motion';
import {SceneView} from './scenes';
import {countWords, type ReelProps, type Scene, type Timing, type Word} from './schema';

export const FPS = 30;
const WPS = 2.5;

// Without real voice timing (Studio preview, tests), estimate durations and spread words evenly.
export const resolveTiming = (props: ReelProps): Timing => {
	if (props.timing) return props.timing;
	return {
		fps: FPS,
		scenes: props.storyboard.scenes.map((s) => {
			const audioMs = (countWords(s.say) / WPS) * 1000;
			const tokens = s.say.split(/\s+/).filter(Boolean);
			const per = audioMs / tokens.length;
			const words: Word[] = tokens.map((t, i) => ({text: t, startMs: i * per, endMs: (i + 1) * per - 30}));
			return {id: s.id, audio: '', audioMs, durationInFrames: Math.ceil(((audioMs + 350) / 1000) * FPS), words};
		}),
	};
};

// Every cut gets a short punch-in so hard cuts feel deliberate.
const Cut: React.FC<{children: React.ReactNode}> = ({children}) => {
	const frame = useCurrentFrame();
	const p = enter(frame, 0, 8);
	return <AbsoluteFill style={{opacity: lerp(p, 0.4, 1), scale: String(lerp(p, 1.04, 1))}}>{children}</AbsoluteFill>;
};

export const Reel: React.FC<ReelProps> = (props) => {
	const {storyboard, colors, handle, sources} = props;
	const timing = resolveTiming(props);
	const byId = new Map(timing.scenes.map((t) => [t.id, t]));
	const starts: number[] = [];
	let at = 0;
	const placed = storyboard.scenes.map((scene: Scene) => {
		const t = byId.get(scene.id)!;
		const from = at;
		starts.push(from);
		at += t.durationInFrames;
		return {scene, t, from};
	});

	return (
		<AbsoluteFill>
			<Background colors={colors} />
			{placed.map(({scene, t, from}, i) => (
				<Sequence key={scene.id} name={`${scene.id} · ${scene.type}`} from={from} durationInFrames={t.durationInFrames}>
					<Cut>
						<SceneView scene={scene} colors={colors} dur={t.durationInFrames} words={t.words} asset={props.assets?.[scene.id]} />
					</Cut>
					<SourceChip colors={colors} sources={scene.claims.map((c) => sources[c]).filter(Boolean)} />
					{props.cover ? null : <Captions words={t.words} colors={colors} />}
					{t.audio ? <Audio src={staticFile(t.audio)} /> : null}
					{i > 0 ? <Audio src={staticFile('sfx/whoosh.wav')} volume={0.18} /> : null}
				</Sequence>
			))}
			{props.music ? (
				<Audio
					src={staticFile(props.music)}
					loop
					volume={(f) => interpolate(f, [0, 20, at - 45, at], [0, 0.1, 0.1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
				/>
			) : null}
			<Chrome colors={colors} handle={handle} starts={starts} total={at} />
		</AbsoluteFill>
	);
};
