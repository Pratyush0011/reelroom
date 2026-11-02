import {Bot, Brain, ChartColumn, Clock, Code, Cpu, Database, DollarSign, FileText, Globe, Search, Shield, Smartphone, Sparkles, User, Users, Wrench, Zap} from 'lucide-react';
import {Video} from '@remotion/media';
import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Robot} from './components/Robot';
import {countUp, enter, formatNumber, lerp} from './motion';
import {BoardRow, NoteTag, SetPiece} from './sets';
import type {Colors, ICONS, Scene, Word} from './schema';
import {CONTENT, display, fitSize, mono, serif} from './theme';

type Of<T extends Scene['type']> = Extract<Scene, {type: T}>;
type P<T extends Scene['type']> = {scene: Of<T>; colors: Colors; dur: number; words: Word[]};

const FPS = 30;
const STOP = new Set(['the', 'and', 'with', 'when', 'that', 'this', 'from', 'your', 'just', 'must', 'only', 'more']);
const keyWords = (text: string) => text.toLowerCase().split(/\s+/).map((w) => w.replace(/[^\p{L}\p{N}]/gu, '')).filter((w) => w.length > 2 && !STOP.has(w));

// Frames at which each phrase is first spoken, in order, so reveals land on the voice.
// Falls back to even spacing when a phrase isn't found in the narration.
const cueFrames = (words: Word[], phrases: string[], fallback: (i: number) => number) => {
	let from = 0;
	return phrases.map((phrase, i) => {
		const keys = new Set(keyWords(phrase));
		const at = words.findIndex((w, j) => j >= from && keys.has(w.text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')));
		if (at < 0) return fallback(i);
		from = at + 1;
		return Math.max(0, Math.round((words[at].startMs / 1000) * FPS) - 4);
	});
};

const Stage: React.FC<{children: React.ReactNode; gap?: number; align?: 'flex-start' | 'center'}> = ({
	children,
	gap = 36,
	align = 'flex-start',
}) => (
	<div
		style={{
			position: 'absolute',
			left: CONTENT.x,
			top: CONTENT.y,
			width: CONTENT.width,
			height: CONTENT.height,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: align,
			gap,
		}}
	>
		{children}
	</div>
);

const Label: React.FC<{children: React.ReactNode; color: string; bg?: string; delay?: number}> = ({children, color, bg, delay = 0}) => {
	const frame = useCurrentFrame();
	const p = enter(frame, delay, 10);
	return (
		<div
			style={{
				fontFamily: mono,
				fontWeight: 700,
				fontSize: 28,
				letterSpacing: 3,
				textTransform: 'uppercase',
				color,
				background: bg,
				padding: bg ? '10px 18px' : 0,
				borderRadius: 8,
				opacity: p,
				translate: `0px ${lerp(p, 16, 0)}px`,
			}}
		>
			{children}
		</div>
	);
};

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}%$₹.]/gu, '');

// Splits text into words and marks the ones that belong to the accent phrase.
const markAccent = (text: string, accent?: string) => {
	const words = text.split(/\s+/).filter(Boolean);
	if (!accent) return words.map((w) => ({w, hit: false}));
	const target = accent.split(/\s+/).map(norm);
	const start = words.findIndex((_, i) => target.every((t, j) => norm(words[i + j] ?? '') === t));
	return words.map((w, i) => ({w, hit: start >= 0 && i >= start && i < start + target.length}));
};

export const Hook: React.FC<P<'hook'>> = ({scene, colors, dur}) => {
	const frame = useCurrentFrame();
	const tokens = markAccent(scene.headline, scene.accent);
	const busy = Boolean(scene.matchup || scene.rows?.length);
	const size = fitSize(scene.headline, {maxWidth: CONTENT.width, maxLines: busy ? 3 : 4, max: busy ? 126 : 168});
	// Frame 0 is the thumbnail, so the whole hook is already on screen and the words only settle in.
	return (
		<Stage gap={40}>
			<Label color={colors.accentInk} bg={colors.accent} delay={-10}>
				{scene.kicker ?? 'AI news'}
			</Label>
			<div
				style={{
					fontFamily: display,
					fontWeight: 900,
					fontSize: size,
					lineHeight: 0.98,
					textWrap: 'balance',
					letterSpacing: -size * 0.035,
					color: colors.text,
					scale: String(interpolate(frame, [0, dur], [1, 1.045])),
					transformOrigin: 'left center',
				}}
			>
				{tokens.map(({w, hit}, i) => {
					const p = enter(frame, i * 3, 9);
					return (
						<span
							key={i}
							style={{
								display: 'inline-block',
								marginRight: size * 0.24,
								translate: `0px ${lerp(p, 18, 0)}px`,
								color: hit ? colors.accent : colors.text,
								fontFamily: hit ? serif : display,
								fontWeight: hit ? 400 : 900,
								fontSize: hit ? size * 1.12 : size,
								letterSpacing: hit ? 0 : undefined,
							}}
						>
							{w}
						</span>
					);
				})}
			</div>
			{scene.matchup ? <Matchup matchup={scene.matchup} colors={colors} start={8} /> : null}
			{/* Rows are already in place on frame 0 (the thumbnail); only the crown drops in. */}
			{scene.rows?.length ? (
				<div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 24, marginTop: 34}}>
					{scene.rows.map((r, i) => (
						<BoardRow key={i} row={r} i={i} at={-12 + i * 4} colors={colors} compact still />
					))}
				</div>
			) : null}
			<NoteTag text={scene.note} colors={colors} />
		</Stage>
	);
};

// The channel's core image on frame 1: a crowd of bots against one.
const Matchup: React.FC<{matchup: NonNullable<Of<'hook'>['matchup']>; colors: Colors; start: number}> = ({matchup, colors, start}) => {
	const frame = useCurrentFrame();
	const p = (d: number) => enter(frame, start + d, 8);
	return (
		<div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 6}}>
			<div style={{display: 'flex', flexWrap: 'wrap', gap: 6, width: 400}}>
				{Array.from({length: matchup.left.count}, (_, k) => (
					<div key={k} style={{scale: String(lerp(p(k * 2), 0.82, 1))}}><Robot size={118} seed={k} /></div>
				))}
			</div>
			<div style={{fontFamily: display, fontWeight: 900, fontSize: 64, color: colors.accent}}>VS</div>
			<div style={{scale: String(lerp(p(10), 0.82, 1))}}><Robot size={230} color={colors.accent} mood="cool" seed={3} /></div>
		</div>
	);
};

export const Statement: React.FC<P<'statement'>> = ({scene, colors, words}) => {
	const frame = useCurrentFrame();
	const tokens = markAccent(scene.text, scene.accent);
	const size = fitSize(scene.text, {maxWidth: CONTENT.width, maxLines: 5, max: 118});
	const [accentAt] = cueFrames(words, [scene.accent ?? ''], () => 12);
	const sweep = enter(frame, Math.max(8, accentAt), 14);
	return (
		<Stage>
			<div style={{fontFamily: display, fontWeight: 800, fontSize: size, lineHeight: 1.08, textWrap: 'balance', letterSpacing: -size * 0.025, color: colors.text}}>
				{tokens.map(({w, hit}, i) => {
					const p = enter(frame, i * 2, 10);
					return (
						<span
							key={i}
							style={{
								position: 'relative',
								display: 'inline-block',
								marginRight: size * 0.26,
								opacity: p,
								translate: `0px ${lerp(p, 28, 0)}px`,
								color: hit ? colors.accentInk : colors.text,
								zIndex: 1,
							}}
						>
							{hit ? (
								<span
									style={{
										position: 'absolute',
										inset: `8% -${size * 0.13}px 2% -${size * 0.13}px`,
										background: colors.accent,
										zIndex: -1,
										scale: `${sweep} 1`,
										transformOrigin: 'left center',
										borderRadius: 6,
									}}
								/>
							) : null}
							<span style={{color: hit ? (sweep > 0.5 ? colors.accentInk : colors.text) : undefined}}>{w}</span>
						</span>
					);
				})}
			</div>
		</Stage>
	);
};

export const Stat: React.FC<P<'stat'>> = ({scene, colors, dur}) => {
	const frame = useCurrentFrame();
	const decimals = scene.decimals ?? (Number.isInteger(scene.value) ? 0 : 1);
	const shown = formatNumber(countUp(frame, 4, Math.min(36, dur * 0.45), scene.value), decimals);
	const full = `${scene.prefix ?? ''}${formatNumber(scene.value, decimals)}${scene.suffix ?? ''}`;
	const size = fitSize(full, {maxWidth: CONTENT.width, maxLines: 1, max: 330, ratio: 0.6});
	const line = enter(frame, 8, 30);
	const labelSize = fitSize(scene.label, {maxWidth: CONTENT.width, maxLines: 3, max: 76});
	return (
		<Stage gap={28}>
			<div style={{fontFamily: display, fontWeight: 900, fontSize: size, lineHeight: 0.9, textWrap: 'balance', letterSpacing: -size * 0.04, color: colors.accent, display: 'flex', alignItems: 'baseline'}}>
				{scene.prefix ? <span style={{fontSize: size * 0.55, marginRight: 8}}>{scene.prefix}</span> : null}
				<span style={{fontVariantNumeric: 'tabular-nums'}}>{shown}</span>
				{/* Word suffixes ("of 2") get a real gap; symbols ("x", "%") sit tight against the number. */}
				{scene.suffix ? (
					<span style={{fontSize: size * 0.55, letterSpacing: 0, wordSpacing: size * 0.08, marginLeft: /[a-z]/i.test(scene.suffix.trim()[0] ?? '') && scene.suffix.trim().length > 1 ? size * 0.18 : 6, whiteSpace: 'pre'}}>
						{scene.suffix.trim()}
					</span>
				) : null}
			</div>
			<div style={{height: 6, width: `${line * 100}%`, background: `linear-gradient(90deg, ${colors.accent}, transparent)`, borderRadius: 3}} />
			<div style={{fontFamily: display, fontWeight: 800, fontSize: labelSize, lineHeight: 1.08, textWrap: 'balance', color: colors.text, opacity: enter(frame, 10, 12)}}>
				{scene.label}
			</div>
			{scene.context ? (
				<div style={{fontFamily: display, fontWeight: 600, fontSize: 44, lineHeight: 1.2, textWrap: 'balance', color: colors.muted, opacity: enter(frame, 18, 12)}}>{scene.context}</div>
			) : null}
		</Stage>
	);
};

export const Compare: React.FC<P<'compare'>> = ({scene, colors}) => {
	const frame = useCurrentFrame();
	const sides = [
		{key: 'left', ...scene.left},
		{key: 'right', ...scene.right},
	] as const;
	const nums = sides.map((s) => (typeof s.value === 'number' ? s.value : NaN));
	const numeric = nums.every((n) => Number.isFinite(n));
	const max = numeric ? Math.max(...nums, 1e-9) : 1;
	return (
		<Stage gap={30}>
			<Label color={colors.muted}>{scene.metric}</Label>
			{sides.map((s, i) => {
				const win = scene.winner === s.key;
				const p = enter(frame, 6 + i * 10, 14);
				const grow = enter(frame, 14 + i * 10, 22);
				const unit = scene.unit ?? '';
				const currency = /^[$₹€£¥]$/.test(unit);
				const n = typeof s.value === 'number' ? formatNumber(numeric ? countUp(frame, 14 + i * 10, 22, s.value) : s.value, Number.isInteger(s.value) ? 0 : 1) : '';
				const value = typeof s.value === 'number' ? (currency ? `${unit}${n}` : `${n}${unit}`) : s.value;
				return (
					<div
						key={s.key}
						style={{
							width: '100%',
							padding: '34px 40px',
							borderRadius: 28,
							background: win ? `${colors.accent}14` : colors.surface,
							border: `3px solid ${win ? colors.accent : `${colors.text}14`}`,
							opacity: p,
							translate: `${lerp(p, i ? 80 : -80, 0)}px 0px`,
						}}
					>
						<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24}}>
							<div style={{fontFamily: display, fontWeight: 800, fontSize: 50, textWrap: 'balance', color: colors.text}}>{s.label}</div>
							<div style={{fontFamily: display, fontWeight: 900, fontSize: 92, color: win ? colors.accent : colors.text, whiteSpace: 'nowrap'}}>{value}</div>
						</div>
						{numeric ? (
							<div style={{marginTop: 22, height: 18, borderRadius: 9, background: `${colors.text}12`}}>
								<div style={{height: '100%', width: `${(nums[i] / max) * 100 * grow}%`, borderRadius: 9, background: win ? colors.accent : colors.muted}} />
							</div>
						) : null}
						{s.note ? <div style={{marginTop: 16, fontFamily: mono, fontSize: 28, color: colors.muted}}>{s.note}</div> : null}
					</div>
				);
			})}
		</Stage>
	);
};

export const List: React.FC<P<'list'>> = ({scene, colors, dur, words}) => {
	const frame = useCurrentFrame();
	const step = Math.max(8, (dur * 0.7) / scene.items.length);
	const cues = cueFrames(words, scene.items, (i) => 6 + i * step);
	return (
		<Stage gap={34}>
			<div style={{fontFamily: display, fontWeight: 900, fontSize: 84, lineHeight: 1.02, textWrap: 'balance', color: colors.text, opacity: enter(frame, 0, 10)}}>{scene.title}</div>
			{scene.items.map((item, i) => {
				const p = enter(frame, cues[i], 12);
				return (
					<div key={i} style={{display: 'flex', alignItems: 'center', gap: 30, opacity: p, translate: `${lerp(p, 60, 0)}px 0px`}}>
						<div
							style={{
								flex: '0 0 84px',
								height: 84,
								borderRadius: 20,
								background: colors.accent,
								color: colors.accentInk,
								fontFamily: mono,
								fontWeight: 700,
								fontSize: 40,
								display: 'grid',
								placeItems: 'center',
							}}
						>
							{String(i + 1).padStart(2, '0')}
						</div>
						<div style={{fontFamily: display, fontWeight: 800, fontSize: 58, lineHeight: 1.08, textWrap: 'balance', color: colors.text}}>{item}</div>
					</div>
				);
			})}
		</Stage>
	);
};

export const Quote: React.FC<P<'quote'>> = ({scene, colors, dur}) => {
	const frame = useCurrentFrame();
	const words = scene.quote.split(/\s+/);
	const size = fitSize(scene.quote, {maxWidth: CONTENT.width, maxLines: 6, max: 92, ratio: 0.42});
	return (
		<Stage gap={26}>
			<div style={{fontFamily: serif, fontSize: 260, lineHeight: 0.6, color: colors.accent, height: 120, opacity: enter(frame, 0, 10)}}>“</div>
			<div style={{fontFamily: serif, fontSize: size, lineHeight: 1.12, textWrap: 'balance', color: colors.text}}>
				{words.map((w, i) => (
					<span key={i} style={{opacity: lerp(enter(frame, 4 + (i * dur * 0.6) / words.length, 6), 0.18, 1)}}>
						{w}{' '}
					</span>
				))}
			</div>
			<div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 14, opacity: enter(frame, 12, 12)}}>
				<div style={{width: 60, height: 4, background: colors.accent}} />
				<div>
					<div style={{fontFamily: display, fontWeight: 800, fontSize: 44, textWrap: 'balance', color: colors.text}}>{scene.who}</div>
					{scene.role ? <div style={{fontFamily: mono, fontSize: 28, color: colors.muted}}>{scene.role}</div> : null}
				</div>
			</div>
		</Stage>
	);
};

export const Receipt: React.FC<P<'receipt'>> = ({scene, colors}) => {
	const frame = useCurrentFrame();
	const drop = enter(frame, 0, 16);
	const stamp = enter(frame, 16, 8);
	const domain = scene.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
	const size = fitSize(scene.headline, {maxWidth: CONTENT.width - 120, maxLines: 5, max: 70});
	const paper = '#F4F2EE';
	const ink = '#111114';
	return (
		<Stage align="center">
			<div
				style={{
					position: 'relative',
					width: '100%',
					padding: '54px 56px 48px',
					borderRadius: 20,
					background: paper,
					color: ink,
					boxShadow: '0 40px 90px rgba(0,0,0,0.55)',
					rotate: `${lerp(drop, -7, -2)}deg`,
					translate: `0px ${lerp(drop, -260, 0)}px`,
					opacity: drop,
				}}
			>
				<div style={{fontFamily: mono, fontWeight: 700, fontSize: 28, letterSpacing: 2, textTransform: 'uppercase', color: '#6B6870'}}>{scene.publisher}</div>
				<div style={{fontFamily: display, fontWeight: 900, fontSize: size, lineHeight: 1.06, textWrap: 'balance', marginTop: 22, letterSpacing: -1}}>{scene.headline}</div>
				<div style={{display: 'flex', justifyContent: 'space-between', marginTop: 34, fontFamily: mono, fontSize: 26, color: '#6B6870'}}>
					<span>{domain}</span>
					<span>{scene.date ?? ''}</span>
				</div>
				<div
					style={{
						position: 'absolute',
						right: -18,
						top: -40,
						padding: '12px 22px',
						border: `5px solid ${colors.good}`,
						borderRadius: 12,
						color: colors.good,
						background: `${paper}EE`,
						fontFamily: mono,
						fontWeight: 700,
						fontSize: 32,
						letterSpacing: 3,
						rotate: '8deg',
						opacity: stamp,
						scale: String(lerp(stamp, 1.8, 1)),
					}}
				>
					✓ SOURCE
				</div>
			</div>
		</Stage>
	);
};

export const Chart: React.FC<P<'chart'>> = ({scene, colors}) => {
	const frame = useCurrentFrame();
	const max = Math.max(...scene.bars.map((b) => b.value), 1e-9);
	return (
		<Stage gap={30}>
			<div style={{fontFamily: display, fontWeight: 900, fontSize: 72, lineHeight: 1.04, textWrap: 'balance', color: colors.text, opacity: enter(frame, 0, 10)}}>{scene.title}</div>
			{scene.unit ? <Label color={colors.muted} delay={4}>{scene.unit}</Label> : null}
			{scene.bars.map((b, i) => {
				const g = enter(frame, 8 + i * 6, 24);
				const dec = Number.isInteger(b.value) ? 0 : 1;
				return (
					<div key={i} style={{width: '100%'}}>
						<div style={{display: 'flex', justifyContent: 'space-between', fontFamily: display, fontWeight: 800, fontSize: 42, color: b.highlight ? colors.accent : colors.text, marginBottom: 10}}>
							<span>{b.label}</span>
							<span style={{fontVariantNumeric: 'tabular-nums'}}>{formatNumber(b.value * g, dec)}</span>
						</div>
						<div style={{height: 34, borderRadius: 10, background: `${colors.text}10`}}>
							<div style={{height: '100%', width: `${(b.value / max) * 100 * g}%`, borderRadius: 10, background: b.highlight ? colors.accent : `${colors.text}55`}} />
						</div>
					</div>
				);
			})}
		</Stage>
	);
};

export const Catch: React.FC<P<'catch'>> = ({scene, colors}) => {
	const frame = useCurrentFrame();
	const size = fitSize(scene.text, {maxWidth: CONTENT.width, maxLines: 5, max: 100});
	const p = enter(frame, 0, 12);
	return (
		<Stage gap={40}>
			<div
				style={{
					width: '100%',
					height: 44,
					borderRadius: 8,
					opacity: p,
					backgroundImage: `repeating-linear-gradient(-45deg, ${colors.warn} 0 26px, transparent 26px 52px)`,
					backgroundPosition: `${frame * 2}px 0px`,
				}}
			/>
			<Label color={colors.bg} bg={colors.warn} delay={3}>
				⚠ {scene.title}
			</Label>
			<div style={{fontFamily: display, fontWeight: 800, fontSize: size, lineHeight: 1.08, textWrap: 'balance', color: colors.text, opacity: enter(frame, 6, 12), translate: `0px ${lerp(enter(frame, 6, 12), 30, 0)}px`}}>
				{scene.text}
			</div>
		</Stage>
	);
};

export const Cta: React.FC<P<'cta'>> = ({scene, colors}) => {
	const frame = useCurrentFrame();
	const size = fitSize(scene.prompt, {maxWidth: CONTENT.width, maxLines: 4, max: 124});
	const pulse = 1 + Math.sin(frame / 5) * 0.04;
	return (
		<Stage gap={40}>
			<div style={{fontFamily: display, fontWeight: 900, fontSize: size, lineHeight: 1.02, textWrap: 'balance', letterSpacing: -size * 0.03, color: colors.text, opacity: enter(frame, 0, 10), scale: String(lerp(enter(frame, 0, 14), 0.9, 1))}}>
				{scene.prompt}
			</div>
			{scene.sub ? <div style={{fontFamily: display, fontWeight: 600, fontSize: 46, color: colors.muted, opacity: enter(frame, 8, 12)}}>{scene.sub}</div> : null}
			<div
				style={{
					padding: '20px 30px',
					borderRadius: 999,
					background: colors.accent,
					color: colors.accentInk,
					fontFamily: mono,
					fontWeight: 700,
					fontSize: 32,
					letterSpacing: 2,
					opacity: enter(frame, 14, 10),
					scale: String(pulse),
				}}
			>
				TELL US IN THE COMMENTS ↓
			</div>
		</Stage>
	);
};

// Documentary paper trail: the real source page drifts behind a pulled quote that gets highlighted on the spoken words.
export const Document: React.FC<P<'document'> & {asset?: string}> = ({scene, colors, dur, words, asset}) => {
	const frame = useCurrentFrame();
	const drop = enter(frame, 0, 16);
	const [hlAt] = cueFrames(words, [scene.highlight ?? ''], () => Math.round(dur * 0.35));
	const sweep = enter(frame, Math.max(10, hlAt), 16);
	const size = fitSize(scene.quote, {maxWidth: CONTENT.width - 110, maxLines: 6, max: 64});
	const tokens = markAccent(scene.quote, scene.highlight);
	const domain = scene.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
	return (
		<>
			{asset ? (
				// The real page, like a printout on the desk: crisp, slightly tilted, slowly pushing in.
				<div
					style={{
						position: 'absolute',
						left: 70,
						top: CONTENT.y + 10,
						width: 920,
						height: 560,
						overflow: 'hidden',
						borderRadius: 16,
						rotate: '-2deg',
						opacity: drop,
						translate: `0px ${lerp(drop, -120, 0)}px`,
						boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
					}}
				>
					<Img
						src={staticFile(asset)}
						style={{width: '100%', scale: String(interpolate(frame, [0, dur], [1.0, 1.1])), transformOrigin: '35% 35%'}}
					/>
				</div>
			) : null}
			<div
				style={{
					position: 'absolute',
					left: CONTENT.x,
					width: CONTENT.width,
					top: asset ? CONTENT.y + 420 : CONTENT.y + 250,
					padding: '40px 46px',
					borderRadius: 18,
					background: '#F4F2EE',
					color: '#111114',
					boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
					opacity: enter(frame, 6, 12),
					translate: `0px ${lerp(enter(frame, 6, 14), 80, 0)}px`,
					rotate: '1deg',
				}}
			>
				<div style={{fontFamily: mono, fontWeight: 700, fontSize: 24, letterSpacing: 2, textTransform: 'uppercase', color: '#6B6870', marginBottom: 18}}>
					{scene.publisher} · {domain}
					{scene.date ? ` · ${scene.date}` : ''}
				</div>
				<div style={{fontFamily: display, fontWeight: 800, fontSize: size, lineHeight: 1.12, textWrap: 'balance'}}>
					{tokens.map(({w, hit}, i) => (
						<span key={i} style={{position: 'relative', display: 'inline-block', marginRight: size * 0.24, zIndex: 1}}>
							{hit ? (
								<span
									style={{
										position: 'absolute',
										inset: `18% -${size * 0.12}px 4% -${size * 0.12}px`,
										background: colors.accent,
										zIndex: -1,
										scale: `${sweep} 1`,
										transformOrigin: 'left center',
									}}
								/>
							) : null}
							{i === 0 ? '“' : ''}
							{w}
							{i === tokens.length - 1 ? '”' : ''}
						</span>
					))}
				</div>
			</div>
		</>
	);
};

const ICON: Record<(typeof ICONS)[number], React.FC<{size?: number; color?: string; strokeWidth?: number}>> = {
	bot: Bot, user: User, users: Users, brain: Brain, cpu: Cpu, zap: Zap, clock: Clock, dollar: DollarSign, chart: ChartColumn,
	search: Search, code: Code, file: FileText, shield: Shield, globe: Globe, phone: Smartphone, sparkles: Sparkles, wrench: Wrench, database: Database,
};

// Visual metaphor: two icon groups face off; the winner glows and a verdict stamp lands on the spoken cue.
export const Versus: React.FC<P<'versus'>> = ({scene, colors, dur, words}) => {
	const frame = useCurrentFrame();
	const sides = [
		{key: 'left', g: scene.left},
		{key: 'right', g: scene.right},
	] as const;
	const cues = cueFrames(words, [scene.left.label, scene.right.label], (i) => 4 + i * Math.round(dur * 0.3));
	const stamp = enter(frame, Math.round(dur * 0.62), 8);
	return (
		<Stage gap={36}>
			{scene.title ? (
				<div style={{fontFamily: display, fontWeight: 900, fontSize: 76, lineHeight: 1.04, textWrap: 'balance', color: colors.text, opacity: enter(frame, 0, 10)}}>{scene.title}</div>
			) : null}
			<div style={{display: 'flex', gap: 26, width: '100%', position: 'relative'}}>
				{sides.map(({key, g}, i) => {
					const Icon = ICON[g.icon];
					const win = scene.winner === key;
					const appear = enter(frame, cues[i], 12);
					const cols = g.count === 1 ? 1 : g.count <= 4 ? 2 : 3;
					const iconSize = g.count === 1 ? 190 : g.count <= 4 ? 96 : 76;
					return (
						<div
							key={key}
							style={{
								flex: 1,
								padding: '34px 24px 30px',
								borderRadius: 28,
								background: win ? `${colors.accent}14` : colors.surface,
								border: `3px solid ${win ? colors.accent : `${colors.text}14`}`,
								opacity: appear,
								translate: `0px ${lerp(appear, 60, 0)}px`,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 22,
							}}
						>
							<div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, auto)`, gap: 14, height: 240, alignContent: 'center'}}>
								{Array.from({length: g.count}, (_, k) => {
									const pop = enter(frame, cues[i] + 3 + k * 3, 10);
									return (
										<div key={k} style={{scale: String(lerp(pop, 0.3, 1)), opacity: pop}}>
											<Icon size={iconSize} color={win ? colors.accent : colors.text} strokeWidth={1.6} />
										</div>
									);
								})}
							</div>
							<div style={{fontFamily: display, fontWeight: 900, fontSize: 50, lineHeight: 1.05, textAlign: 'center', textWrap: 'balance', color: win ? colors.accent : colors.text}}>{g.label}</div>
							{g.caption ? <div style={{fontFamily: mono, fontSize: 26, textAlign: 'center', color: colors.muted, textWrap: 'balance'}}>{g.caption}</div> : null}
						</div>
					);
				})}
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: 120,
						translate: '-50% 0px',
						width: 84,
						height: 84,
						borderRadius: 42,
						background: colors.bg,
						border: `3px solid ${colors.text}30`,
						display: 'grid',
						placeItems: 'center',
						fontFamily: mono,
						fontWeight: 700,
						fontSize: 30,
						color: colors.text,
						opacity: enter(frame, cues[1], 10),
					}}
				>
					VS
				</div>
			</div>
			{scene.verdict ? (
				<div
					style={{
						alignSelf: 'center',
						padding: '14px 26px',
						border: `5px solid ${colors.accent}`,
						borderRadius: 14,
						fontFamily: mono,
						fontWeight: 700,
						fontSize: 38,
						letterSpacing: 2,
						textTransform: 'uppercase',
						color: colors.accent,
						rotate: '-4deg',
						opacity: stamp,
						scale: String(lerp(stamp, 1.8, 1)),
					}}
				>
					{scene.verdict}
				</div>
			) : null}
		</Stage>
	);
};

// Full-screen B-roll with a slammed headline: the "real world" beat between graphics.
export const Broll: React.FC<P<'broll'> & {asset?: string}> = ({scene, colors, dur, asset}) => {
	const frame = useCurrentFrame();
	const tokens = markAccent(scene.headline, scene.accent);
	const size = fitSize(scene.headline, {maxWidth: CONTENT.width, maxLines: 3, max: 120});
	const zoom = interpolate(frame, [0, dur], [1.12, 1.28]);
	const media: React.CSSProperties = {position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', scale: String(zoom)};
	return (
		<>
			{asset ? (
				/\.(mp4|webm)$/i.test(asset) ? (
					<Video src={staticFile(asset)} muted loop style={media} />
				) : (
					<Img src={staticFile(asset)} style={{...media, translate: `${interpolate(frame, [0, dur], [-30, 30])}px 0px`}} />
				)
			) : null}
			<div style={{position: 'absolute', left: CONTENT.x, width: CONTENT.width, top: CONTENT.y + 520, display: 'flex', flexDirection: 'column', gap: 16, padding: '26px 30px', borderRadius: 26, background: colors.bg, boxShadow: '0 14px 0 rgba(0,0,0,.25)', rotate: '-1.5deg'}}>
				{scene.kicker ? <Label color={colors.accentInk} bg={colors.accent}>{scene.kicker}</Label> : null}
				<div style={{fontFamily: display, fontWeight: 900, fontSize: size, lineHeight: 1.0, letterSpacing: -size * 0.03, color: colors.text, textWrap: 'balance'}}>
					{tokens.map(({w, hit}, i) => {
						const p = enter(frame, 3 + i * 3, 8);
						return (
							<span key={i} style={{display: 'inline-block', marginRight: size * 0.24, opacity: p, translate: `0px ${lerp(p, 50, 0)}px`, color: hit ? colors.accent : colors.text}}>
								{w}
							</span>
						);
					})}
				</div>
			</div>
		</>
	);
};

// Several icons fly together and become one bigger icon: "two helper bots merged into one".
export const Merge: React.FC<P<'merge'>> = ({scene, colors, dur, words}) => {
	const frame = useCurrentFrame();
	const From = ICON[scene.from.icon];
	const To = ICON[scene.to.icon];
	const [mergeAt] = cueFrames(words, ['merged', 'merge', 'combined', 'one'], () => Math.round(dur * 0.4));
	const m = enter(frame, Math.max(10, mergeAt), 16);
	const n = scene.from.count;
	const tint = scene.tone === 'warn' ? colors.warn : colors.accent;
	return (
		<Stage gap={30}>
			{scene.title ? <div style={{fontFamily: display, fontWeight: 900, fontSize: 76, lineHeight: 1.04, textWrap: 'balance', color: colors.text, opacity: enter(frame, 0, 10)}}>{scene.title}</div> : null}
			<div style={{position: 'relative', width: '100%', height: 420}}>
				{Array.from({length: n}, (_, k) => {
					const x = (k - (n - 1) / 2) * 190;
					const p = enter(frame, 2 + k * 3, 10);
					return (
						<div key={k} style={{position: 'absolute', left: '50%', top: 120, translate: `${lerp(m, x, 0) - 60}px 0px`, opacity: p * (1 - m), scale: String(lerp(m, 1, 0.6))}}>
							<From size={120} color={colors.text} strokeWidth={1.5} />
						</div>
					);
				})}
				<div style={{position: 'absolute', left: '50%', top: 60, translate: '-120px 0px', opacity: m, scale: String(lerp(m, 0.4, 1))}}>
					<To size={240} color={tint} strokeWidth={1.4} />
				</div>
			</div>
			<div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontFamily: mono, fontWeight: 700, fontSize: 30, letterSpacing: 2, textTransform: 'uppercase'}}>
				<span style={{color: colors.muted, opacity: 1 - m * 0.6}}>{scene.from.label}</span>
				<span style={{color: tint, opacity: m}}>→ {scene.to.label}</span>
			</div>
			{scene.caption ? <div style={{fontFamily: display, fontWeight: 800, fontSize: 52, lineHeight: 1.1, textWrap: 'balance', color: colors.text, opacity: enter(frame, Math.max(10, mergeAt) + 10, 12)}}>{scene.caption}</div> : null}
		</Stage>
	);
};

export const SceneView: React.FC<{scene: Scene; colors: Colors; dur: number; words: Word[]; asset?: string}> = ({scene, colors, dur, words, asset}) => {
	switch (scene.type) {
		case 'document':
			return <Document scene={scene} colors={colors} dur={dur} words={words} asset={asset} />;
		case 'show':
			return <SetPiece scene={scene} colors={colors} dur={dur} />;
		case 'broll':
			return <Broll scene={scene} colors={colors} dur={dur} words={words} asset={asset} />;
		case 'merge':
			return <Merge scene={scene} colors={colors} dur={dur} words={words} />;
		case 'versus':
			return <Versus scene={scene} colors={colors} dur={dur} words={words} />;
		case 'hook':
			return <Hook scene={scene} colors={colors} dur={dur} words={words} />;
		case 'statement':
			return <Statement scene={scene} colors={colors} dur={dur} words={words} />;
		case 'stat':
			return <Stat scene={scene} colors={colors} dur={dur} words={words} />;
		case 'compare':
			return <Compare scene={scene} colors={colors} dur={dur} words={words} />;
		case 'list':
			return <List scene={scene} colors={colors} dur={dur} words={words} />;
		case 'quote':
			return <Quote scene={scene} colors={colors} dur={dur} words={words} />;
		case 'receipt':
			return <Receipt scene={scene} colors={colors} dur={dur} words={words} />;
		case 'chart':
			return <Chart scene={scene} colors={colors} dur={dur} words={words} />;
		case 'catch':
			return <Catch scene={scene} colors={colors} dur={dur} words={words} />;
		case 'cta':
			return <Cta scene={scene} colors={colors} dur={dur} words={words} />;
	}
};
