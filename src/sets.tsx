import {Calendar, Check, Code, Lock, Package, Search, Wrench, X, Zap} from 'lucide-react';
import React from 'react';
import {Easing, interpolate, random, useCurrentFrame} from 'remotion';
import {Robot, type Mood} from './components/Robot';
import {enter, lerp} from './motion';
import type {Colors, Scene} from './schema';
import {display, H, mono} from './theme';

// Illustrated set pieces: one giant animated idea filling the frame, in the spirit of Kurzgesagt-style explainers.
type Show = Extract<Scene, {type: 'show'}>;
type P = {scene: Show; colors: Colors; dur: number};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
// Pop with overshoot: things land with weight instead of sliding in politely.
const pop = (frame: number, start: number, dur = 11) => interpolate(frame, [start, start + dur], [0, 1], {...clamp, easing: Easing.back(2.2)});

const Pop: React.FC<{at: number; x: number; y: number; children: React.ReactNode; rotate?: number}> = ({at, x, y, children, rotate = 0}) => {
	const frame = useCurrentFrame();
	const p = pop(frame, at);
	return (
		<div style={{position: 'absolute', left: x, top: y, translate: '-50% -50%', scale: String(Math.max(0, p)), rotate: `${rotate}deg`, opacity: frame >= at ? 1 : 0}}>
			{children}
		</div>
	);
};

const Title: React.FC<{text?: string; colors: Colors}> = ({text, colors}) => {
	const frame = useCurrentFrame();
	if (!text) return null;
	const size = text.length > 22 ? 84 : text.length > 14 ? 104 : 128;
	return (
		<div style={{position: 'absolute', left: 70, right: 130, top: 300, textAlign: 'center', fontFamily: display, fontWeight: 900, fontSize: size, lineHeight: 1, letterSpacing: -size * 0.03, color: colors.text, textWrap: 'balance', scale: String(Math.max(0, pop(frame, 0, 9)))}}>
			{text}
		</div>
	);
};

const Stamp: React.FC<{text?: string; at: number; colors: Colors; y?: number}> = ({text, at, colors, y = 1130}) => {
	const frame = useCurrentFrame();
	if (!text) return null;
	const p = enter(frame, at, 7);
	return (
		<div style={{position: 'absolute', left: 0, right: 60, top: y, display: 'flex', justifyContent: 'center', opacity: p}}>
			<div style={{padding: '14px 30px', background: colors.accent, color: colors.accentInk, borderRadius: 16, fontFamily: display, fontWeight: 900, fontSize: 58, textTransform: 'uppercase', rotate: '-3deg', scale: String(lerp(p, 2.2, 1)), boxShadow: '0 10px 0 rgba(0,0,0,.25)'}}>{text}</div>
		</div>
	);
};

const Burst: React.FC<{x: number; y: number; at: number; color: string; size?: number; label?: string; ink?: string}> = ({x, y, at, color, size = 240, label, ink = '#14141C'}) => {
	const frame = useCurrentFrame();
	const pts = Array.from({length: 24}, (_, i) => {
		const r = i % 2 ? size * 0.32 : size * 0.5;
		const a = (i / 24) * Math.PI * 2;
		return `${size / 2 + Math.cos(a) * r},${size / 2 + Math.sin(a) * r}`;
	}).join(' ');
	return (
		<Pop at={at} x={x} y={y} rotate={frame * 1.5}>
			<svg width={size} height={size}><polygon points={pts} fill={color} stroke={ink} strokeWidth="6" /></svg>
			{label ? <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: display, fontWeight: 900, fontSize: size * 0.27, color: ink, rotate: `${-frame * 1.5}deg`}}>{label}</div> : null}
		</Pop>
	);
};

// Crowd vs giant: the channel's core image. `winner` decides who celebrates.
const Versus: React.FC<P> = ({scene, colors, dur}) => {
	const n = scene.left ?? 5;
	const leftMood: Mood = scene.winner === 'right' ? 'sad' : 'happy';
	const rightMood: Mood = scene.winner === 'left' ? 'stressed' : scene.winner === 'right' ? 'cool' : 'happy';
	return (
		<>
			<Title text={scene.title} colors={colors} />
			{Array.from({length: n}, (_, i) => (
				<Pop key={i} at={2 + i * 2} x={120 + (i % 2) * 150 + (i % 3) * 30} y={640 + i * 95}>
					<Robot size={scene.winner === 'left' ? 190 : 150} color="#FFFFFF" mood={leftMood} seed={i} />
				</Pop>
			))}
			<Pop at={6} x={700} y={800}>
				<Robot size={scene.winner === 'left' ? 260 : 400} color={colors.accent} mood={rightMood} seed={9} />
			</Pop>
			<Burst x={440} y={520} at={9} color="#FFFFFF" size={190} label="VS" />
			<Stamp text={scene.verdict} at={Math.round(dur * 0.45)} colors={colors} />
		</>
	);
};

// One AI with its tools orbiting around it.
const Tools: React.FC<P> = ({scene, colors}) => {
	const frame = useCurrentFrame();
	const icons = [Wrench, Search, Code, Zap, Package];
	return (
		<>
			<Title text={scene.title} colors={colors} />
			<Pop at={2} x={480} y={830}><Robot size={360} color={colors.accent} mood="cool" /></Pop>
			{icons.map((I, i) => {
				const a = frame / 11 + (i / icons.length) * Math.PI * 2;
				return (
					<Pop key={i} at={5 + i * 3} x={480 + Math.cos(a) * 350} y={830 + Math.sin(a) * 330}>
						<div style={{width: 130, height: 130, borderRadius: 34, background: '#fff', border: '7px solid #14141C', display: 'grid', placeItems: 'center'}}><I size={78} color="#14141C" strokeWidth={2.4} /></div>
					</Pop>
				);
			})}
		</>
	);
};

// A robot buried under falling paper.
const Overload: React.FC<P> = ({scene, colors, dur}) => {
	const frame = useCurrentFrame();
	const pile = interpolate(frame, [0, dur], [40, 300], clamp);
	return (
		<>
			{Array.from({length: 34}, (_, i) => {
				const x = 40 + random(`x${i}`) * 900;
				const speed = 26 + random(`s${i}`) * 26;
				const y = ((frame * speed + random(`y${i}`) * 1500) % 1500) + 280;
				return (
					<div key={i} style={{position: 'absolute', left: x, top: Math.min(y, 1240 - pile * 0.3), width: 110, height: 140, borderRadius: 8, background: '#fff', border: '5px solid #14141C', rotate: `${(frame + i * 30) * (i % 2 ? 7 : -7)}deg`}}>
						{[28, 52, 76, 100].map((t) => <div key={t} style={{position: 'absolute', left: 14, right: 14, top: t, height: 7, background: '#C8C8D0'}} />)}
					</div>
				);
			})}
			<Pop at={1} x={480} y={820}><Robot size={340} color={colors.accent} mood="stressed" /></Pop>
			<div style={{position: 'absolute', left: 0, right: 0, bottom: H - 1270, height: pile, background: `repeating-linear-gradient(0deg, #fff 0 16px, #D9D9E3 16px 22px)`, borderTop: '7px solid #14141C'}} />
			<Title text={scene.title} colors={colors} />
			<Stamp text={scene.verdict} at={Math.round(dur * 0.4)} colors={colors} y={1040} />
		</>
	);
};

// Racing lanes: several jobs running at the same time.
const Lanes: React.FC<P> = ({scene, colors}) => {
	const frame = useCurrentFrame();
	return (
		<>
			<Title text={scene.title} colors={colors} />
			{[0, 1, 2].map((i) => (
				<div key={i} style={{position: 'absolute', left: 0, right: 0, top: 560 + i * 225, height: 200, background: '#14141C', overflow: 'hidden'}}>
					<div style={{position: 'absolute', left: 0, right: 0, top: 95, height: 10, backgroundImage: 'repeating-linear-gradient(90deg, #FFE14A 0 70px, transparent 70px 130px)', backgroundPosition: `${-frame * 34}px 0`}} />
					<div style={{position: 'absolute', top: 2, left: interpolate(frame, [0, 45], [-180, 180 + i * 240], clamp) + Math.sin(frame / 3 + i) * 16}}>
						<Robot size={156} color={['#FFFFFF', colors.accent, '#6DFFC4'][i]} mood="happy" seed={i} />
					</div>
				</div>
			))}
		</>
	);
};

// Two gauges swinging over.
const Gauge: React.FC<{x: number; label: string; at: number; colors: Colors}> = ({x, label, at, colors}) => {
	const frame = useCurrentFrame();
	const angle = interpolate(frame, [at, at + 14], [-80, 55], {...clamp, easing: Easing.back(2.5)});
	return (
		<Pop at={at - 2} x={x} y={820}>
			<div style={{position: 'relative', width: 420, height: 420}}>
				<div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff', border: '10px solid #14141C'}} />
				<div style={{position: 'absolute', inset: 34, borderRadius: '50%', background: 'conic-gradient(from -100deg, #FF3B30 0 60deg, #FFD21F 60deg 130deg, #12B76A 130deg 200deg, transparent 200deg)'}} />
				<div style={{position: 'absolute', inset: 92, borderRadius: '50%', background: '#fff'}} />
				<div style={{position: 'absolute', left: 202, top: 40, width: 16, height: 170, background: '#14141C', borderRadius: 8, transformOrigin: '8px 170px', rotate: `${angle}deg`}} />
				<div style={{position: 'absolute', left: 180, top: 180, width: 60, height: 60, borderRadius: 30, background: '#14141C'}} />
			</div>
			<div style={{textAlign: 'center', marginTop: 18, fontFamily: display, fontWeight: 900, fontSize: 70, color: colors.text}}>{label}</div>
		</Pop>
	);
};

const Meters: React.FC<P> = ({scene, colors, dur}) => (
	<>
		<Title text={scene.title} colors={colors} />
		<Gauge x={262} label={scene.labels?.[0] ?? ''} at={4} colors={colors} />
		<Gauge x={700} label={scene.labels?.[1] ?? ''} at={10} colors={colors} />
		<Stamp text={scene.verdict} at={Math.round(dur * 0.5)} colors={colors} y={1125} />
	</>
);

// A giant padlock slams shut over blurred numbers.
const Locked: React.FC<P> = ({scene, colors, dur}) => {
	const frame = useCurrentFrame();
	return (
		<>
			{Array.from({length: 14}, (_, i) => (
				<div key={i} style={{position: 'absolute', left: 40 + (i % 4) * 240, top: 340 + Math.floor(i / 4) * 300 + Math.sin(frame / 6 + i) * 12, fontFamily: mono, fontWeight: 700, fontSize: 120, color: colors.muted, filter: 'blur(14px)', opacity: 0.8}}>??</div>
			))}
			<Pop at={Math.round(dur * 0.15)} x={480} y={760}>
				<div style={{width: 520, height: 520, borderRadius: 90, background: colors.accent, border: '10px solid #14141C', display: 'grid', placeItems: 'center', boxShadow: '0 16px 0 rgba(0,0,0,.25)'}}><Lock size={320} color={colors.accentInk} strokeWidth={2.2} /></div>
			</Pop>
			<Title text={scene.title} colors={colors} />
		</>
	);
};

// Two robots slide together and become one. Calm on purpose: this shows a design change, not a disaster.
const Combine: React.FC<P> = ({scene, colors, dur}) => {
	const frame = useCurrentFrame();
	const meet = Math.round(dur * 0.45);
	const t = interpolate(frame, [0, meet], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
	return (
		<>
			<Title text={scene.title} colors={colors} />
			{/* Pop stays at zero scale for its first 7 frames, so start early: the merged robot must be there when the pair disappears. */}
			<Pop at={meet - 9} x={480} y={810}><Robot size={400} color={colors.accent} seed={3} /></Pop>
			{frame < meet + 3 ? (
				<>
					<div style={{position: 'absolute', left: lerp(t, 10, 330), top: 640}}><Robot size={300} color="#FFFFFF" /></div>
					<div style={{position: 'absolute', left: lerp(t, 650, 330), top: 640}}><Robot size={300} color={colors.accent} seed={3} /></div>
				</>
			) : null}
			<Stamp text={scene.verdict} at={meet + 6} colors={colors} y={1110} />
		</>
	);
};

// A parcel and a calendar; the date gets crossed out.
const Parcel: React.FC<P> = ({scene, colors, dur}) => {
	const at = Math.round(dur * 0.4);
	return (
		<>
			<Title text={scene.title} colors={colors} />
			<Pop at={1} x={300} y={840} rotate={-6}><div style={{width: 400, height: 400, borderRadius: 40, background: '#C98A4B', border: '10px solid #14141C', display: 'grid', placeItems: 'center'}}><Package size={270} color="#14141C" strokeWidth={1.8} /></div></Pop>
			<Pop at={5} x={690} y={800} rotate={6}><div style={{width: 340, height: 340, borderRadius: 40, background: '#fff', border: '10px solid #14141C', display: 'grid', placeItems: 'center'}}><Calendar size={230} color="#14141C" strokeWidth={1.8} /></div></Pop>
			<Pop at={at} x={690} y={800}><X size={460} color="#FF3B30" strokeWidth={4} /></Pop>
			<Stamp text={scene.verdict} at={at + 4} colors={colors} y={1120} />
		</>
	);
};

// Two test tickets: one passes, one fails.
const Runs: React.FC<P> = ({scene, colors, dur}) => (
	<>
		<Title text={scene.title} colors={colors} />
		{[0, 1].map((i) => {
			const ok = i === 0;
			const Icon = ok ? Check : X;
			return (
				<Pop key={i} at={3 + i * Math.round(dur * 0.35)} x={265 + i * 435} y={830} rotate={i ? 4 : -4}>
					<div style={{width: 390, height: 520, borderRadius: 40, background: '#fff', border: '10px solid #14141C', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14}}>
						<div style={{fontFamily: mono, fontWeight: 700, fontSize: 40, color: '#14141C'}}>RUN {i + 1}</div>
						<Icon size={270} color={ok ? '#12B76A' : '#FF3B30'} strokeWidth={4} />
					</div>
				</Pop>
			);
		})}
		<Stamp text={scene.verdict} at={Math.round(dur * 0.7)} colors={colors} y={1130} />
	</>
);

// Start with one block; add another only after the magnifier checks it.
const Blocks: React.FC<P> = ({scene, colors, dur}) => {
	const frame = useCurrentFrame();
	const count = scene.left ?? 1;
	return (
		<>
			<Title text={scene.title} colors={colors} />
			{Array.from({length: count}, (_, i) => (
				<Pop key={i} at={2 + i * Math.round(dur / Math.max(count, 1) / 1.4)} x={480} y={1040 - i * 210}>
					<div style={{width: 420, height: 200, borderRadius: 34, background: i === 0 ? colors.accent : '#fff', border: '10px solid #14141C'}} />
				</Pop>
			))}
			<Pop at={8} x={780 + Math.sin(frame / 7) * 40} y={700 + Math.cos(frame / 9) * 90}><Search size={250} color={colors.text} strokeWidth={2.6} /></Pop>
		</>
	);
};

export const SetPiece: React.FC<P> = (props) => {
	switch (props.scene.set) {
		case 'versus':
			return <Versus {...props} />;
		case 'tools':
			return <Tools {...props} />;
		case 'overload':
			return <Overload {...props} />;
		case 'lanes':
			return <Lanes {...props} />;
		case 'meters':
			return <Meters {...props} />;
		case 'locked':
			return <Locked {...props} />;
		case 'combine':
			return <Combine {...props} />;
		case 'parcel':
			return <Parcel {...props} />;
		case 'runs':
			return <Runs {...props} />;
		case 'blocks':
			return <Blocks {...props} />;
	}
};

