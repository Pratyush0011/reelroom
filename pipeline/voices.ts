// Find and audition ElevenLabs voices.
//   npm run voices -- search [accent]            list popular narration voices (default accent: indian)
//   npm run voices -- sample [accent] [n]        add the top n to your library and render a test line for each
//   npm run voices -- use <voice_id>             set brand.json elevenlabs.voiceId
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {eleven, elevenKey, speak} from './elevenlabs.ts';
import {brand, ROOT} from './lib.ts';

type Shared = {public_owner_id: string; voice_id: string; name: string; accent: string; gender: string; age: string; descriptive: string; use_case: string; cloned_by_count: number; preview_url?: string};

const [cmd = 'search', arg1, arg2] = process.argv.slice(2);
if (!elevenKey() && cmd !== 'use') {
	console.error('Set ELEVENLABS_API_KEY in .env first.');
	process.exit(2);
}

const TEST_LINE = 'Is a team of AIs better than just one? Anthropic tested both, and the answer is more interesting than the headlines.';

const search = async (accent: string, n: number) => {
	const q = new URLSearchParams({accent, language: 'en', sort: 'cloned_by_count', page_size: '40'});
	const {voices} = (await eleven(`/v1/shared-voices?${q}`)) as {voices: Shared[]};
	// Narration and news-style voices first.
	const good = voices.filter((v) => /narrat|inform|educat|news|social|advert/i.test(`${v.use_case} ${v.descriptive}`));
	return (good.length >= n ? good : voices).slice(0, n);
};

const setVoice = (voiceId: string) => {
	const file = path.join(ROOT, 'brand.json');
	const json = JSON.parse(readFileSync(file, 'utf8'));
	json.elevenlabs = {...json.elevenlabs, voiceId};
	writeFileSync(file, JSON.stringify(json, null, 2) + '\n');
	console.log(`brand.json → elevenlabs.voiceId = ${voiceId}`);
};

if (cmd === 'search') {
	for (const v of await search(arg1 ?? 'indian', 15))
		console.log(`${v.voice_id}  ${v.name.padEnd(28).slice(0, 28)} ${v.gender}/${v.age}  ${v.use_case} · ${v.descriptive}  (used ${v.cloned_by_count}×)  ${v.preview_url ?? ''}`);
} else if (cmd === 'sample') {
	const dir = path.join(ROOT, 'samples');
	mkdirSync(dir, {recursive: true});
	const cfg = brand().elevenlabs!;
	// `sample id1,id2` auditions specific voices from the search results; `sample <accent> <n>` takes the top n.
	const ids = arg1?.includes(',') ? arg1.split(',') : null;
	const picks = ids ? (await search('indian', 40)).filter((v) => ids.includes(v.voice_id)) : await search(arg1 ?? 'indian', Number(arg2 ?? 3));
	for (const v of picks) {
		// Shared-library voices have to be added to your own library before they can be used.
		const added = (await eleven(`/v1/voices/add/${v.public_owner_id}/${v.voice_id}`, {
			method: 'POST',
			body: JSON.stringify({new_name: `reelroom ${v.name}`.slice(0, 50)}),
		}).catch((e) => ({voice_id: v.voice_id, error: String(e)}))) as {voice_id: string; error?: string};
		const out = path.join(dir, `${v.name.replace(/[^\w]+/g, '-').toLowerCase()}.mp3`);
		try {
			await speak({...cfg, voiceId: added.voice_id}, TEST_LINE, out);
			console.log(`${added.voice_id}  ${v.name}  →  ${path.relative(ROOT, out)}`);
		} catch (e) {
			console.log(`${v.voice_id}  ${v.name}  ✗ ${String(e).slice(0, 160)}`);
		}
	}
	console.log('\nListen, then: npm run voices -- use <voice_id>');
} else if (cmd === 'use' && arg1) {
	setVoice(arg1);
} else {
	console.error('Usage: npm run voices -- search [accent] | sample [accent] [n] | use <voice_id>');
	process.exit(2);
}
