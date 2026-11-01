import {Audio} from '@remotion/media';
import React from 'react';
import {AbsoluteFill, interpolate, random, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter, lerp, OUT} from '../motion';
import type {Colors, Scene, Word} from '../schema';
import {H, W} from '../theme';

// The motion layer: every scene is its own colour world that wipes in over the previous one, on a camera that never
// stops moving, with punch-ins exactly on the spoken emphasis words.

const CYCLE = ['zoom', 'whip', 'slide', 'flash', 'glitch'] as const;
const SFX: Record<(typeof CYCLE)[number], string> = {whip: 'whip.wav', zoom: 'whoosh.wav', slide: 'whoosh.wav', glitch: 'switch.wav', flash: 'shutter-modern.wav'};
const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

// Frame at which each emphasis word is spoken.
export const emphasisCues = (scene: Scene, words: Word[], fps: number) =>
	(scene.emphasis ?? [])
		.map((e) => {
			const first = norm(e.split(/\s+/)[0]);
			const w = words.find((x) => norm(x.text) === first) ?? words.find((x) => norm(x.text).startsWith(first));
			return w ? {word: e, frame: Math.round((w.startMs / 1000) * fps)} : null;
		})
		.filter((x): x is {word: string; frame: number} => x !== null);

// Moving pattern inside a colour world, so flat colour is never static.
const Pattern: React.FC<{colors: Colors; index: number}> = ({colors, index}) => {
	const frame = useCurrentFrame();
	const tint = `${colors.text}14`;
	const kind = index % 3;
	if (kind === 0)
		return (
			<AbsoluteFill style={{overflow: 'hidden'}}>
				<div style={{position: 'absolute', left: W / 2 - H, top: H * 0.42 - H, width: H * 2, height: H * 2, rotate: `${frame * 0.5}deg`, background: `repeating-conic-gradient(${tint} 0 12deg, transparent 12deg 24deg)`}} />
			</AbsoluteFill>
		);
	if (kind === 1)
		return <AbsoluteFill style={{backgroundImage: `radial-gradient(${tint} 12px, transparent 13px)`, backgroundSize: '84px 84px', backgroundPosition: `${frame * 1.4}px ${frame * 2.2}px`}} />;
	return <AbsoluteFill style={{backgroundImage: `repeating-linear-gradient(-45deg, ${tint} 0 40px, transparent 40px 90px)`, backgroundPosition: `${frame * 2}px 0px`}} />;
};

export const MotionScene: React.FC<{
	scene: Scene;
	index: number;
	words: Word[];
	dur: number;
	colors: Colors;
	prev: string;
	children: React.ReactNode;
}> = ({scene, index, words, dur, colors, prev, children}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const kind = scene.transition ?? CYCLE[index % CYCLE.length];
	const t = enter(frame, 0, 8, OUT);
	const cues = emphasisCues(scene, words, fps);

	// How the new colour world arrives over the previous one. The first scene has nothing to wipe over, and its frame 0 is the thumbnail.
	let translate = '0px 0px';
	let clipPath: string | undefined;
	if (index > 0) {
		if (kind === 'zoom' || kind === 'flash') clipPath = `circle(${lerp(t, 0, 125)}% at 50% 44%)`;
		if (kind === 'whip') translate = `${lerp(t, W, 0)}px 0px`;
		if (kind === 'slide') translate = `0px ${lerp(t, H, 0)}px`;
		if (kind === 'glitch') clipPath = frame < 7 ? `inset(${(random(`a${frame}`) * 30).toFixed(0)}% 0 ${(random(`b${frame}`) * 30).toFixed(0)}% 0)` : undefined;
	}

	// Camera: continuous push + drift, a hard punch on every emphasis word, and a push into the next cut.
	const push = interpolate(frame, [0, dur], [1, 1.07]);
	const punch = cues.reduce((acc, c) => acc + 0.11 * Math.max(0, 1 - Math.abs(frame - c.frame - 2) / 8), 0);
	const exit = interpolate(frame, [dur - 4, dur], [0, 0.1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const drift = Math.sin((frame + index * 20) / 26) * 1.1;
	const shake = scene.shake ? (random(`x${frame}`) - 0.5) * 18 : 0;

	return (
		<AbsoluteFill style={{background: prev}}>
			<AbsoluteFill style={{translate, clipPath, background: colors.bg, overflow: 'hidden'}}>
				<Pattern colors={colors} index={index} />
				<AbsoluteFill style={{scale: String(push + punch + exit), rotate: `${drift}deg`, marginLeft: shake, marginTop: shake * 0.6}}>{children}</AbsoluteFill>
			</AbsoluteFill>
			{index > 0 && kind === 'flash' ? <AbsoluteFill style={{background: '#fff', opacity: interpolate(frame, [0, 4], [0.9, 0], {extrapolateRight: 'clamp'})}} /> : null}
			{cues.map((c, i) => (
				<Sequence key={c.word + i} from={Math.max(0, c.frame)} durationInFrames={20} layout="none">
					<Audio src={staticFile('sfx/mouse-click.wav')} volume={0.4} />
				</Sequence>
			))}
			{index > 0 ? <Audio src={staticFile(`sfx/${SFX[kind]}`)} volume={0.3} /> : null}
		</AbsoluteFill>
	);
};
