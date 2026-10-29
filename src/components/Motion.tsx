import {Audio, Video} from '@remotion/media';
import React from 'react';
import {AbsoluteFill, Img, interpolate, random, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter, lerp, OUT} from '../motion';
import type {Colors, Scene, Word} from '../schema';
import {H, W} from '../theme';

// The motion layer every scene sits in: entrance transition, constant camera drift, punch-ins on emphasis words,
// optional shake, and a B-roll backdrop. This is what keeps something moving on screen at all times.

const CYCLE = ['whip', 'zoom', 'slide', 'glitch', 'flash'] as const;
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

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

// Darkened, slowly zooming B-roll behind the scene's graphics.
export const Backdrop: React.FC<{src: string; dur: number; colors: Colors; strength?: number}> = ({src, dur, colors, strength = 0.42}) => {
	const frame = useCurrentFrame();
	const zoom = interpolate(frame, [0, dur], [1.08, 1.2]);
	const style: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', scale: String(zoom)};
	return (
		<AbsoluteFill style={{opacity: interpolate(frame, [0, 6], [0, strength], {extrapolateRight: 'clamp'})}}>
			{isVideo(src) ? <Video src={staticFile(src)} muted loop style={style} /> : <Img src={staticFile(src)} style={style} />}
			<AbsoluteFill style={{background: `linear-gradient(180deg, ${colors.bg}88, ${colors.bg}CC 70%)`}} />
		</AbsoluteFill>
	);
};

export const MotionScene: React.FC<{
	scene: Scene;
	index: number;
	words: Word[];
	dur: number;
	colors: Colors;
	bg?: string;
	children: React.ReactNode;
}> = ({scene, index, words, dur, colors, bg, children}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const kind = scene.transition ?? CYCLE[index % CYCLE.length];
	const t = enter(frame, 0, 8, OUT);
	const cues = emphasisCues(scene, words, fps);

	// Entrance
	let translate = '0px 0px';
	let scale = 1;
	let blur = 0;
	if (kind === 'whip') (translate = `${lerp(t, W * 0.9, 0)}px 0px`), (blur = lerp(t, 40, 0));
	if (kind === 'slide') translate = `0px ${lerp(t, H * 0.6, 0)}px`;
	if (kind === 'zoom') (scale = lerp(t, 1.7, 1)), (blur = lerp(t, 24, 0));
	if (kind === 'flash') scale = lerp(t, 1.12, 1);

	// Camera: slow push-in + drift, punch-in on every emphasis word, and an exit push into the next cut.
	const push = interpolate(frame, [0, dur], [1, 1.06]);
	const punch = cues.reduce((acc, c) => acc + 0.09 * Math.max(0, 1 - Math.abs(frame - c.frame - 3) / 9), 0);
	const exit = interpolate(frame, [dur - 5, dur], [0, 0.08], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const drift = Math.sin((frame + index * 20) / 40) * 0.6;
	const shake = scene.shake ? (random(`x${frame}`) - 0.5) * 14 : 0;
	const glitch = kind === 'glitch' && frame < 8 ? (random(`g${frame}`) - 0.5) * 60 : 0;

	return (
		<AbsoluteFill>
			{bg ? <Backdrop src={bg} dur={dur} colors={colors} /> : null}
			<AbsoluteFill
				style={{
					translate,
					scale: String(scale * (push + punch + exit)),
					rotate: `${drift}deg`,
					filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
					marginLeft: shake + glitch,
					marginTop: shake * 0.6,
				}}
			>
				{children}
			</AbsoluteFill>
			{kind === 'glitch' && frame < 8 ? (
				<AbsoluteFill style={{mixBlendMode: 'screen', opacity: 0.6, translate: `${-glitch}px 0px`, background: `linear-gradient(90deg, transparent 40%, ${colors.warn}55 50%, transparent 60%)`}} />
			) : null}
			{kind === 'flash' ? <AbsoluteFill style={{background: '#fff', opacity: interpolate(frame, [0, 4], [0.85, 0], {extrapolateRight: 'clamp'})}} /> : null}
			{/* a light sweep across every cut keeps the eye moving */}
			<AbsoluteFill
				style={{
					background: `linear-gradient(100deg, transparent 35%, ${colors.text}18 50%, transparent 65%)`,
					translate: `${interpolate(frame, [0, 14], [-W, W], {extrapolateRight: 'clamp'})}px 0px`,
				}}
			/>
			{cues.map((c, i) => (
				<Sequence key={c.word + i} from={Math.max(0, c.frame)} durationInFrames={24} layout="none">
					<Audio src={staticFile('sfx/mouse-click.wav')} volume={0.35} />
				</Sequence>
			))}
			{index > 0 ? <Audio src={staticFile(`sfx/${SFX[kind]}`)} volume={0.22} /> : null}
		</AbsoluteFill>
	);
};
