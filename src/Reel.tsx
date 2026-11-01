import {Audio} from '@remotion/media';
import React from 'react';
import {AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Captions} from './components/Captions';
import {MotionScene} from './components/Motion';
import {SourceChip} from './components/SourceChip';
import {enter, lerp} from './motion';
import {SceneView} from './scenes';
import {WORLD_CYCLE, WORLDS} from './worlds';
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

export const Reel: React.FC<ReelProps> = (props) => {
	const {storyboard, sources} = props;
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

	const worldOf = (i: number) => WORLDS[storyboard.scenes[i].world ?? WORLD_CYCLE[i % WORLD_CYCLE.length]];

	return (
		<AbsoluteFill>
			{placed.map(({scene, t, from}, i) => (
				<Sequence key={scene.id} name={`${scene.id} · ${scene.type}`} from={from} durationInFrames={t.durationInFrames}>
					<MotionScene scene={scene} index={i} words={t.words} dur={t.durationInFrames} colors={worldOf(i)} prev={i ? worldOf(i - 1).bg : worldOf(i).bg}>
						<SceneView scene={scene} colors={worldOf(i)} dur={t.durationInFrames} words={t.words} asset={props.assets?.[scene.id]} />
					</MotionScene>
					<SourceChip colors={worldOf(i)} sources={scene.claims.map((c) => sources[c]).filter(Boolean)} />
					{props.cover ? null : <Captions words={t.words} colors={worldOf(i)} emphasis={scene.emphasis} />}
					{t.audio ? <Audio src={staticFile(t.audio)} /> : null}
				</Sequence>
			))}
			{props.music ? (
				<Audio
					src={staticFile(props.music)}
					loop
					volume={(f) => interpolate(f, [0, 20, at - 45, at], [0, 0.17, 0.17, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
				/>
			) : null}
		</AbsoluteFill>
	);
};
