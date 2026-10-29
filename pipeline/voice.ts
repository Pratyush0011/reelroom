// Generates the voiceover scene by scene, measures it, and writes voice/timing.json.
// Each scene then lasts exactly as long as its narration plus a short breath.
// Uses ElevenLabs when ELEVENLABS_API_KEY and brand.json elevenlabs.voiceId are set; otherwise free edge-tts.
// Clips are cached by (voice, settings, text), so re-running only pays for lines that changed.
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {Word, type Timing} from '../src/schema.ts';
import {elevenKey, speak} from './elevenlabs.ts';
import {brand, loadStoryboard, publicAudioDir, readJson, ROOT, runDirFromArgs, slugOf} from './lib.ts';

const FPS = 30;
const BREATH_MS = 60; // fast reels cut tight; the motion layer covers the join
const LEAD_MS = 60; // keep a hair of air before the first word
const TAIL_MS = 90; // and after the last

const runDir = runDirFromArgs();
const b = brand();
const sb = loadStoryboard(runDir);
const useEleven = Boolean(elevenKey() && b.elevenlabs?.voiceId);
const voiceDir = path.join(runDir, 'voice');
const cacheDir = path.join(voiceDir, 'cache');
const audioDir = publicAudioDir(runDir);
mkdirSync(cacheDir, {recursive: true});
mkdirSync(audioDir, {recursive: true});
// Only clear old audio; source screenshots live in the same public folder.
for (const f of readdirSync(audioDir)) if (f.endsWith('.mp3')) rmSync(path.join(audioDir, f));

const audioMsOf = (file: string) =>
	Math.round(
		Number(
			execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], {encoding: 'utf8'}).trim(),
		) * 1000,
	);

const edge = (text: string, mp3: string, wordsFile: string) => {
	const txt = `${mp3}.txt`;
	writeFileSync(txt, text, 'utf8');
	// The free voice service occasionally drops a request; retry before giving up.
	for (let attempt = 1; ; attempt++) {
		try {
			execFileSync('python', ['-I', path.join(ROOT, 'pipeline', 'tts.py'), sb.voice ?? b.voice, b.voiceRate, txt, mp3, wordsFile], {stdio: 'pipe'});
			rmSync(txt, {force: true});
			return Word.array().parse(readJson(wordsFile));
		} catch (err) {
			if (attempt === 3) throw new Error(`Text-to-speech failed after 3 attempts: ${String((err as {stderr?: Buffer}).stderr ?? err).slice(-400)}`);
		}
	}
};

const timing: Timing = {fps: FPS, scenes: []};
let fresh = 0;
for (const [i, scene] of sb.scenes.entries()) {
	const ctx = {previous: sb.scenes[i - 1]?.say, next: sb.scenes[i + 1]?.say};
	const key = createHash('sha1')
		.update(JSON.stringify(useEleven ? [b.elevenlabs, scene.say, ctx] : [sb.voice ?? b.voice, b.voiceRate, scene.say]))
		.digest('hex')
		.slice(0, 16);
	const raw = path.join(cacheDir, `${key}.mp3`);
	const rawWords = path.join(cacheDir, `${key}.json`);
	if (!existsSync(raw) || !existsSync(rawWords)) {
		const w = useEleven ? await speak(b.elevenlabs!, scene.say, raw, ctx) : edge(scene.say, raw, rawWords);
		writeFileSync(rawWords, JSON.stringify(w));
		fresh++;
	}
	const words = Word.array().parse(readJson(rawWords));

	// Trim dead air: cut from just before the first word to just after the last, and shift timings to match.
	const start = Math.max(0, (words[0]?.startMs ?? 0) - LEAD_MS);
	const end = Math.min(audioMsOf(raw), (words.at(-1)?.endMs ?? audioMsOf(raw)) + TAIL_MS);
	const mp3 = path.join(audioDir, `${scene.id}.mp3`);
	// Optional pitch-preserving speed-up (brand.json "tempo", e.g. 1.1) for voices that read slowly.
	const tempo = b.tempo ?? 1;
	execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(start / 1000), '-to', String(end / 1000), '-i', raw, '-filter:a', `atempo=${tempo}`, '-c:a', 'libmp3lame', '-q:a', '2', mp3]);
	const shifted = words.map((w) => ({...w, startMs: Math.round((w.startMs - start) / tempo), endMs: Math.round((w.endMs - start) / tempo)}));
	writeFileSync(path.join(voiceDir, `${scene.id}.words.json`), JSON.stringify(shifted));

	const audioMs = audioMsOf(mp3);
	timing.scenes.push({
		id: scene.id,
		audio: `runs/${slugOf(runDir)}/${scene.id}.mp3`,
		audioMs,
		durationInFrames: Math.ceil(((audioMs + BREATH_MS) / 1000) * FPS),
		words: shifted,
	});
	console.log(`${scene.id}  ${(audioMs / 1000).toFixed(2)}s  ${words.length} words`);
}

writeFileSync(path.join(voiceDir, 'timing.json'), JSON.stringify(timing, null, 2));
const total = timing.scenes.reduce((s, x) => s + x.durationInFrames, 0) / FPS;
const who = useEleven ? `ElevenLabs ${b.elevenlabs!.model} / ${b.elevenlabs!.voiceId}` : `edge-tts ${sb.voice ?? b.voice}`;
console.log(`\nVoice: ${who}  (${fresh} new clip(s), ${sb.scenes.length - fresh} from cache)  Total: ${total.toFixed(1)}s`);
