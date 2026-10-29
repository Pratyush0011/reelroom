import {z} from 'zod';

// The contract between the director agent and the video engine.
// Limits here are deliberate: short text is what makes vertical video readable.

export const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

const words = (max: number) =>
	z.string().min(1).refine((s) => countWords(s) <= max, {message: `must be ${max} words or fewer`});

export const ICONS = ['bot', 'user', 'users', 'brain', 'cpu', 'zap', 'clock', 'dollar', 'chart', 'search', 'code', 'file', 'shield', 'globe', 'phone', 'sparkles', 'wrench', 'database'] as const;

const base = {
	id: z.string().regex(/^s\d+$/, 'scene ids look like s1, s2, ...'),
	say: z.string().min(2).describe('Exact voiceover for this scene, written as spoken'),
	claims: z.array(z.string().regex(/^C\d+$/)).default([]),
};

export const HookScene = z.object({
	...base,
	type: z.literal('hook'),
	headline: words(6),
	accent: z.string().optional(),
	kicker: words(4).optional(),
	// Optional picture under the headline so frame 1 shows the idea, e.g. 5 bots vs 1 bot.
	matchup: z
		.object({left: z.object({icon: z.enum(ICONS), count: z.number().int().min(1).max(6)}), right: z.object({icon: z.enum(ICONS), count: z.number().int().min(1).max(6)})})
		.optional(),
});

export const StatementScene = z.object({
	...base,
	type: z.literal('statement'),
	text: words(12),
	accent: z.string().optional(),
});

export const StatScene = z.object({
	...base,
	type: z.literal('stat'),
	value: z.number(),
	prefix: z.string().max(3).optional(),
	suffix: z.string().max(6).optional(),
	decimals: z.number().int().min(0).max(2).optional(),
	label: words(8),
	context: words(10).optional(),
});

const Side = z.object({
	label: words(4),
	value: z.union([z.number(), z.string().max(14)]),
	note: words(6).optional(),
});

export const CompareScene = z.object({
	...base,
	type: z.literal('compare'),
	metric: words(6),
	left: Side,
	right: Side,
	winner: z.enum(['left', 'right', 'none']).default('none'),
	unit: z.string().max(6).optional(),
});

export const ListScene = z.object({
	...base,
	type: z.literal('list'),
	title: words(6),
	items: z.array(words(6)).min(2).max(4),
});

export const QuoteScene = z.object({
	...base,
	type: z.literal('quote'),
	quote: words(20),
	who: words(4),
	role: words(6).optional(),
});

export const ReceiptScene = z.object({
	...base,
	type: z.literal('receipt'),
	publisher: words(5),
	headline: words(14),
	date: z.string().max(20).optional(),
	url: z.string().url(),
});

export const ChartScene = z.object({
	...base,
	type: z.literal('chart'),
	title: words(7),
	unit: z.string().max(8).optional(),
	bars: z
		.array(z.object({label: words(3), value: z.number(), highlight: z.boolean().optional()}))
		.min(2)
		.max(5),
});

export const CatchScene = z.object({
	...base,
	type: z.literal('catch'),
	title: words(3).default('The catch'),
	text: words(14),
});

export const CtaScene = z.object({
	...base,
	type: z.literal('cta'),
	prompt: words(10),
	sub: words(10).optional(),
});

// Documentary "paper trail": a real screenshot of the source page, with the key line pulled out and highlighted.
export const DocumentScene = z.object({
	...base,
	type: z.literal('document'),
	publisher: words(5),
	quote: words(24).describe('verbatim words from the source'),
	highlight: z.string().optional().describe('phrase inside quote to mark with the highlighter'),
	date: z.string().max(20).optional(),
	url: z.string().url(),
});

const Group = z.object({
	label: words(4),
	icon: z.enum(ICONS),
	count: z.number().int().min(1).max(6),
	caption: words(5).optional(),
});

// Visual metaphor: two groups of icons side by side (a team of AIs vs one AI, old vs new, humans vs bots).
export const VersusScene = z.object({
	...base,
	type: z.literal('versus'),
	title: words(6).optional(),
	left: Group,
	right: Group,
	winner: z.enum(['left', 'right', 'none']).default('none'),
	verdict: words(5).optional().describe('stamp that lands at the end, e.g. "Often, not always"'),
});

// Visual metaphor for combining: several icons fly together and become one.
export const MergeScene = z.object({
	...base,
	type: z.literal('merge'),
	title: words(6).optional(),
	from: z.object({icon: z.enum(ICONS), count: z.number().int().min(2).max(6), label: words(4)}),
	to: z.object({icon: z.enum(ICONS), label: words(4)}),
	caption: words(8).optional(),
	tone: z.enum(['good', 'warn']).default('good').describe('warn = the merge went wrong (a catch)'),
});

export const Scene = z.discriminatedUnion('type', [
	DocumentScene,
	MergeScene,
	VersusScene,
	HookScene,
	StatementScene,
	StatScene,
	CompareScene,
	ListScene,
	QuoteScene,
	ReceiptScene,
	ChartScene,
	CatchScene,
	CtaScene,
]);
export type Scene = z.infer<typeof Scene>;

export const Storyboard = z
	.object({
		title: z.string(),
		voice: z.string().optional(),
		scenes: z.array(Scene).min(3).max(12),
	})
	.superRefine((sb, ctx) => {
		const ids = sb.scenes.map((s) => s.id);
		if (new Set(ids).size !== ids.length) ctx.addIssue({code: 'custom', message: 'scene ids must be unique'});
		if (sb.scenes[0]?.type !== 'hook') ctx.addIssue({code: 'custom', message: 'the first scene must be a hook'});
		if (sb.scenes.at(-1)?.type !== 'cta') ctx.addIssue({code: 'custom', message: 'the last scene must be a cta'});
		sb.scenes.forEach((s, i) => {
			if (i > 0 && s.type !== 'statement' && sb.scenes[i - 1].type === s.type)
				ctx.addIssue({code: 'custom', message: `${s.id}: same scene type twice in a row (${s.type})`});
		});
	});
export type Storyboard = z.infer<typeof Storyboard>;

// Written by `npm run voice`: real audio length and word timings for each scene.
export const Word = z.object({text: z.string(), startMs: z.number(), endMs: z.number()});
export type Word = z.infer<typeof Word>;

export const Timing = z.object({
	fps: z.number(),
	scenes: z.array(
		z.object({
			id: z.string(),
			audio: z.string().describe('path inside public/'),
			audioMs: z.number(),
			durationInFrames: z.number().int(),
			words: z.array(Word),
		}),
	),
});
export type Timing = z.infer<typeof Timing>;

export const Colors = z.object({
	bg: z.string(),
	surface: z.string(),
	text: z.string(),
	muted: z.string(),
	accent: z.string(),
	accentInk: z.string(),
	warn: z.string(),
	good: z.string(),
});
export type Colors = z.infer<typeof Colors>;

export type Source = {publisher: string; url: string};

export type ReelProps = {
	storyboard: Storyboard;
	timing: Timing | null;
	colors: Colors;
	handle: string;
	// claim id -> where it came from, for the on-screen source chip
	sources: Record<string, Source>;
	// Cover/thumbnail mode: no captions, so the frame reads as a poster.
	cover?: boolean;
	// scene id -> image path inside public/ (source screenshots for `document` scenes)
	assets?: Record<string, string>;
	// Optional music bed inside public/ (bring a track you're licensed to use)
	music?: string;
};
