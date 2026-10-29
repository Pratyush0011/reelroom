// Deterministic quality gates. The agents are creative; these rules are not negotiable.
// Pure functions so they can be unit-tested without running any model.
import {countWords, Storyboard, type Scene, type Timing} from '../src/schema.ts';
import {USABLE, type Brand, type Ledger} from './lib.ts';

export const BANNED = [
	'game-changer',
	'game changer',
	'game changing',
	'revolutionize',
	'revolutionary',
	'mind-blowing',
	'mind blowing',
	"in today's fast-paced world",
	'buckle up',
	"let's dive in",
	'dive into',
	'delve',
	'unleash',
	'unlock the power',
	'the future is here',
	"here's the kicker",
	'but wait there',
	'without further ado',
];

export type Report = {errors: string[]; warnings: string[]; stats: Record<string, number | string>};

const screenText = (s: Scene): string[] => {
	switch (s.type) {
		case 'hook':
			return [s.headline, s.kicker ?? ''];
		case 'statement':
			return [s.text];
		case 'stat':
			return [s.label, s.context ?? ''];
		case 'compare':
			return [s.metric, s.left.label, s.right.label, String(s.left.value), String(s.right.value), s.left.note ?? '', s.right.note ?? ''];
		case 'list':
			return [s.title, ...s.items];
		case 'quote':
			return [s.quote, s.who, s.role ?? ''];
		case 'receipt':
			return [s.publisher, s.headline];
		case 'chart':
			return [s.title, ...s.bars.map((b) => b.label)];
		case 'catch':
			return [s.title, s.text];
		case 'cta':
			return [s.prompt, s.sub ?? ''];
		case 'document':
			return [s.publisher, s.quote];
		case 'merge':
			return [s.title ?? '', s.from.label, s.to.label, s.caption ?? ''];
		case 'versus':
			return [s.title ?? '', s.left.label, s.right.label, s.left.caption ?? '', s.right.caption ?? '', s.verdict ?? ''];
	}
};

const numbersOnScreen = (s: Scene): number[] => {
	if (s.type === 'stat') return [s.value];
	if (s.type === 'chart') return s.bars.map((b) => b.value);
	if (s.type === 'compare') return [s.left.value, s.right.value].filter((v): v is number => typeof v === 'number');
	return [];
};

// Does the number appear in the claim text? Accepts 2.5 / 2,5 / 1,000 / 1000 and spelled-out % or x around it.
const mentions = (text: string, n: number) => {
	const plain = text.replace(/(\d),(\d{3})/g, '$1$2');
	const forms = new Set([String(n), n.toFixed(1), n.toLocaleString('en-US')].map((f) => f.replace(/,/g, '')));
	return [...forms].some((f) => new RegExp(`(^|[^\\d.])${f.replace('.', '\\.')}(?![\\d])`).test(plain));
};

export const checkRun = ({
	storyboard,
	ledger,
	timing,
	brand,
}: {
	storyboard: unknown;
	ledger: Ledger | null;
	timing: Timing | null;
	brand: Pick<Brand, 'wordsPerSecond' | 'minSeconds' | 'maxSeconds'>;
}): Report => {
	const errors: string[] = [];
	const warnings: string[] = [];
	const stats: Report['stats'] = {};

	if (!ledger) errors.push('02-claims.json is missing: nothing has been fact-checked.');
	else if (ledger.publishable === false) errors.push(`The fact-checker stopped this story: ${ledger.kill_reason ?? 'no reason given'}`);
	else {
		const premise = ledger.claims.find((c) => c.id === 'C0');
		if (!premise) errors.push('the claims ledger has no C0 (the input\'s own premise), so the story itself was never checked');
		else if (!USABLE.has(premise.status) && ledger.mode !== 'debunk')
			errors.push(`the input's premise (C0) is "${premise.status}"; only a run started with "debunk:" may continue`);
	}

	const parsed = Storyboard.safeParse(storyboard);
	if (!parsed.success) {
		for (const issue of parsed.error.issues) errors.push(`storyboard ${issue.path.join('.') || '(root)'}: ${issue.message}`);
		return {errors, warnings, stats};
	}
	const sb = parsed.data;
	const claims = new Map((ledger?.claims ?? []).map((c) => [c.id, c]));
	const knownUrls = new Set((ledger?.claims ?? []).flatMap((c) => [...(c.sources ?? []), ...(c.checked_sources ?? [])].map((s) => s.url)));

	for (const s of sb.scenes) {
		for (const id of s.claims) {
			const c = claims.get(id);
			if (!c) errors.push(`${s.id}: cites ${id}, which is not in the claims ledger`);
			else if (!USABLE.has(c.status)) errors.push(`${s.id}: cites ${id}, which the fact-checker marked "${c.status}"`);
		}

		for (const n of numbersOnScreen(s)) {
			if (!s.claims.length) {
				errors.push(`${s.id}: shows the number ${n} but cites no claim`);
				continue;
			}
			const texts = s.claims.map((id) => claims.get(id)).flatMap((c) => (c ? [c.text, c.safe_text ?? ''] : []));
			if (!texts.some((t) => mentions(t, n)))
				warnings.push(`${s.id}: the number ${n} does not appear in the text of ${s.claims.join(', ')}; check it was derived correctly`);
		}

		if ((s.type === 'receipt' || s.type === 'document') && !knownUrls.has(s.url))
			errors.push(`${s.id}: ${s.type} URL is not one of the checked sources (${s.url})`);

		// A document scene shows words as a quote, so they must appear verbatim in a checked source quote.
		if (s.type === 'document') {
			const flat = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
			const quotes = s.claims
				.map((id) => claims.get(id))
				.flatMap((c) => [...(c?.sources ?? []), ...(c?.checked_sources ?? [])].map((src) => (src as {quote?: string}).quote ?? ''));
			if (!quotes.some((q) => flat(q).includes(flat(s.quote))))
				errors.push(`${s.id}: the quote is not found verbatim in the cited claims' source quotes`);
		}

		const all = [s.say, ...screenText(s)].join(' ').toLowerCase();
		for (const phrase of BANNED) if (all.includes(phrase)) errors.push(`${s.id}: uses banned phrase "${phrase}"`);
	}

	const hookWords = countWords(sb.scenes[0].say);
	if (hookWords > 20) errors.push(`s1: the spoken hook is ${hookWords} words; keep it to 20 or fewer`);

	const words = sb.scenes.reduce((n, s) => n + countWords(s.say), 0);
	const estimate = words / brand.wordsPerSecond;
	stats.words = words;
	stats.estimatedSeconds = Number(estimate.toFixed(1));
	stats.scenes = sb.scenes.length;

	if (timing) {
		const ids = new Set(sb.scenes.map((s) => s.id));
		const stale = timing.scenes.length !== sb.scenes.length || timing.scenes.some((t) => !ids.has(t.id));
		if (stale) errors.push('voice/timing.json does not match the storyboard; run `npm run voice` again');
		const seconds = timing.scenes.reduce((n, t) => n + t.durationInFrames, 0) / timing.fps;
		stats.seconds = Number(seconds.toFixed(1));
		if (seconds > brand.maxSeconds) errors.push(`the voiced reel is ${seconds.toFixed(1)}s; the maximum is ${brand.maxSeconds}s`);
		if (seconds < brand.minSeconds) errors.push(`the voiced reel is ${seconds.toFixed(1)}s; the minimum is ${brand.minSeconds}s`);
	} else {
		if (estimate > brand.maxSeconds * 1.1) errors.push(`script is ~${estimate.toFixed(0)}s at ${brand.wordsPerSecond} words/s; the maximum is ${brand.maxSeconds}s`);
		if (estimate < brand.minSeconds * 0.8) errors.push(`script is ~${estimate.toFixed(0)}s; the minimum is ${brand.minSeconds}s`);
	}

	return {errors, warnings, stats};
};
