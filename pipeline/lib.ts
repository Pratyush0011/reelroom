import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Colors, Storyboard, Timing, type ReelProps, type Source} from '../src/schema.ts';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export type Brand = {
	name: string;
	handle: string;
	voice: string;
	voiceRate: string;
	wordsPerSecond: number;
	minSeconds: number;
	maxSeconds: number;
	colors: Colors;
};

export const readJson = <T = unknown>(file: string): T => JSON.parse(readFileSync(file, 'utf8')) as T;

export const brand = () => readJson<Brand>(path.join(ROOT, 'brand.json'));

export const runDirFromArgs = () => {
	const arg = process.argv[2];
	if (!arg) {
		console.error('Usage: npm run <script> -- runs/<run-folder>');
		process.exit(2);
	}
	const dir = path.resolve(arg);
	if (!existsSync(dir)) {
		console.error(`Run folder not found: ${dir}`);
		process.exit(2);
	}
	return dir;
};

// Audio lives under public/ so Remotion can serve it with staticFile().
export const slugOf = (runDir: string) => path.basename(runDir);
export const publicAudioDir = (runDir: string) => path.join(ROOT, 'public', 'runs', slugOf(runDir));

export type Claim = {
	id: string;
	text: string;
	importance?: string;
	status: string;
	safe_text?: string;
	sources?: {url: string; publisher?: string}[];
	checked_sources?: {url: string; publisher?: string}[];
};
export type Ledger = {publishable?: boolean; kill_reason?: string | null; mode?: 'news' | 'debunk'; claims: Claim[]};

export const USABLE = new Set(['verified', 'verified_with_wording']);

export const loadLedger = (runDir: string) => {
	const f = path.join(runDir, '02-claims.json');
	return existsSync(f) ? readJson<Ledger>(f) : null;
};

const publisherFromUrl = (url: string) => {
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return url;
	}
};

export const sourcesFromLedger = (ledger: Ledger | null): Record<string, Source> => {
	const out: Record<string, Source> = {};
	for (const c of ledger?.claims ?? []) {
		const s = c.checked_sources?.[0] ?? c.sources?.[0];
		if (s) out[c.id] = {url: s.url, publisher: s.publisher ?? publisherFromUrl(s.url)};
	}
	return out;
};

export const loadStoryboard = (runDir: string) => Storyboard.parse(readJson(path.join(runDir, 'storyboard.json')));

export const loadTiming = (runDir: string) => {
	const f = path.join(runDir, 'voice', 'timing.json');
	return existsSync(f) ? Timing.parse(readJson(f)) : null;
};

export const propsForRun = (runDir: string): ReelProps => {
	const b = brand();
	return {
		storyboard: loadStoryboard(runDir),
		timing: loadTiming(runDir),
		colors: b.colors,
		handle: b.handle,
		sources: sourcesFromLedger(loadLedger(runDir)),
	};
};
