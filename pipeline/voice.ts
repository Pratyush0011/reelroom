// Generates the voiceover scene by scene, measures it, and writes voice/timing.json.
// Each scene then lasts exactly as long as its narration plus a short breath.
import {execFileSync} from 'node:child_process';
import {mkdirSync, rmSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {Word, type Timing} from '../src/schema.ts';
import {brand, loadStoryboard, publicAudioDir, readJson, ROOT, runDirFromArgs, slugOf} from './lib.ts';

const FPS = 30;
const BREATH_MS = 280;

const runDir = runDirFromArgs();
const b = brand();
const sb = loadStoryboard(runDir);
const voice = sb.voice ?? b.voice;
const voiceDir = path.join(runDir, 'voice');
const audioDir = publicAudioDir(runDir);
rmSync(audioDir, {recursive: true, force: true});
mkdirSync(voiceDir, {recursive: true});
mkdirSync(audioDir, {recursive: true});

const audioMsOf = (file: string) =>
	Math.round(
		Number(
			execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], {encoding: 'utf8'}).trim(),
		) * 1000,
	);

const timing: Timing = {fps: FPS, scenes: []};
for (const scene of sb.scenes) {
	const txt = path.join(voiceDir, `${scene.id}.txt`);
	const mp3 = path.join(audioDir, `${scene.id}.mp3`);
	const wordsFile = path.join(voiceDir, `${scene.id}.words.json`);
	writeFileSync(txt, scene.say, 'utf8');
	// The free voice service occasionally drops a request; retry before giving up.
	for (let attempt = 1; ; attempt++) {
		try {
			execFileSync('python', ['-I', path.join(ROOT, 'pipeline', 'tts.py'), voice, b.voiceRate, txt, mp3, wordsFile], {stdio: 'pipe'});
			break;
		} catch (err) {
			if (attempt === 3) throw new Error(`Text-to-speech failed for ${scene.id} after 3 attempts: ${String((err as {stderr?: Buffer}).stderr ?? err).slice(-400)}`);
			console.log(`${scene.id}  voice service error, retrying (${attempt}/3)…`);
		}
	}
	const words = Word.array().parse(readJson(wordsFile));
	const audioMs = audioMsOf(mp3);
	timing.scenes.push({
		id: scene.id,
		audio: `runs/${slugOf(runDir)}/${scene.id}.mp3`,
		audioMs,
		durationInFrames: Math.ceil(((audioMs + BREATH_MS) / 1000) * FPS),
		words,
	});
	console.log(`${scene.id}  ${(audioMs / 1000).toFixed(2)}s  ${words.length} words`);
}

writeFileSync(path.join(voiceDir, 'timing.json'), JSON.stringify(timing, null, 2));
const total = timing.scenes.reduce((s, x) => s + x.durationInFrames, 0) / FPS;
console.log(`\nVoice: ${voice}  Total: ${total.toFixed(1)}s  → ${path.relative(ROOT, path.join(voiceDir, 'timing.json'))}`);
