// ElevenLabs text-to-speech with character timestamps, grouped into word timings for the captions.
import {writeFileSync} from 'node:fs';
import type {Word} from '../src/schema.ts';

const API = 'https://api.elevenlabs.io';

export type ElevenConfig = {
	voiceId: string;
	model: string;
	stability: number;
	similarity: number;
	style: number;
	speed: number;
};

export const elevenKey = () => process.env.ELEVENLABS_API_KEY?.trim() || '';

export const eleven = async (path: string, init: RequestInit = {}) => {
	const res = await fetch(`${API}${path}`, {
		...init,
		headers: {'xi-api-key': elevenKey(), 'Content-Type': 'application/json', ...(init.headers ?? {})},
	});
	if (!res.ok) throw new Error(`ElevenLabs ${init.method ?? 'GET'} ${path} → ${res.status}: ${(await res.text()).slice(0, 300)}`);
	return res.json();
};

type Alignment = {characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[]};

// Characters -> words: a word is a run of non-space characters.
export const wordsFromAlignment = (a: Alignment): Word[] => {
	const words: Word[] = [];
	let text = '';
	let start = 0;
	let end = 0;
	a.characters.forEach((ch, i) => {
		if (/\s/.test(ch)) {
			if (text) words.push({text, startMs: Math.round(start * 1000), endMs: Math.round(end * 1000)});
			text = '';
			return;
		}
		if (!text) start = a.character_start_times_seconds[i];
		text += ch;
		end = a.character_end_times_seconds[i];
	});
	if (text) words.push({text, startMs: Math.round(start * 1000), endMs: Math.round(end * 1000)});
	return words;
};

// previous/next text lets the model keep one continuous delivery across separately generated scenes.
export const speak = async (
	cfg: ElevenConfig,
	text: string,
	outMp3: string,
	context: {previous?: string; next?: string} = {},
): Promise<Word[]> => {
	const body = {
		text,
		model_id: cfg.model,
		previous_text: context.previous,
		next_text: context.next,
		voice_settings: {stability: cfg.stability, similarity_boost: cfg.similarity, style: cfg.style, speed: cfg.speed, use_speaker_boost: true},
	};
	const data = (await eleven(`/v1/text-to-speech/${cfg.voiceId}/with-timestamps?output_format=mp3_44100_128`, {
		method: 'POST',
		body: JSON.stringify(body),
	})) as {audio_base64: string; alignment?: Alignment | null};
	if (!data.alignment) throw new Error('ElevenLabs returned no timing data for this model; try model "eleven_multilingual_v2".');
	writeFileSync(outMp3, Buffer.from(data.audio_base64, 'base64'));
	return wordsFromAlignment(data.alignment);
};
