import assert from 'node:assert/strict';
import {test} from 'node:test';
import {checkRun} from './checks.ts';
import type {Ledger} from './lib.ts';

const brand = {wordsPerSecond: 2.5, minSeconds: 5, maxSeconds: 50};

const ledger = (over: Partial<Ledger> = {}): Ledger => ({
	publishable: true,
	claims: [
		{id: 'C0', text: 'Company X released a faster model', status: 'verified'},
		{id: 'C1', text: 'The model is 2.5x faster on the company benchmark', status: 'verified', checked_sources: [{url: 'https://example.com/a'}]},
		{id: 'C2', text: 'It beats every rival', status: 'unverified'},
	],
	...over,
});

const board = (scenes: object[]) => ({
	title: 't',
	scenes: [
		{id: 's1', type: 'hook', headline: 'A faster model just landed', say: 'A faster model just landed today.', claims: []},
		...scenes,
		{id: 's9', type: 'cta', prompt: 'Would you switch?', say: 'Would you switch? Tell me below.', claims: []},
	],
});

test('a clean storyboard passes', () => {
	const r = checkRun({
		storyboard: board([{id: 's2', type: 'stat', value: 2.5, suffix: 'x', label: 'faster', say: 'It is two and a half times faster.', claims: ['C1']}]),
		ledger: ledger(),
		timing: null,
		brand,
	});
	assert.deepEqual(r.errors, []);
});

test('citing an unverified claim fails', () => {
	const r = checkRun({
		storyboard: board([{id: 's2', type: 'statement', text: 'It beats every rival', say: 'It beats every rival.', claims: ['C2']}]),
		ledger: ledger(),
		timing: null,
		brand,
	});
	assert.ok(r.errors.some((e) => e.includes('marked "unverified"')));
});

test('a number with no claim behind it fails', () => {
	const r = checkRun({
		storyboard: board([{id: 's2', type: 'stat', value: 40, suffix: '%', label: 'cheaper', say: 'Forty percent cheaper.', claims: []}]),
		ledger: ledger(),
		timing: null,
		brand,
	});
	assert.ok(r.errors.some((e) => e.includes('shows the number 40 but cites no claim')));
});

test('a number that is not in the cited claim is flagged', () => {
	const r = checkRun({
		storyboard: board([{id: 's2', type: 'stat', value: 3, suffix: 'x', label: 'faster', say: 'Three times faster.', claims: ['C1']}]),
		ledger: ledger(),
		timing: null,
		brand,
	});
	assert.ok(r.warnings.some((w) => w.includes('the number 3 does not appear')));
});

test('a receipt pointing at an unchecked URL fails', () => {
	const r = checkRun({
		storyboard: board([{id: 's2', type: 'receipt', publisher: 'Somewhere', headline: 'Big news', url: 'https://made-up.example/x', say: 'Here is the source.', claims: ['C1']}]),
		ledger: ledger(),
		timing: null,
		brand,
	});
	assert.ok(r.errors.some((e) => e.includes('receipt URL is not one of the checked sources')));
});

test('a story the fact-checker killed can never pass', () => {
	const r = checkRun({storyboard: board([]), ledger: ledger({publishable: false, kill_reason: 'no primary source'}), timing: null, brand});
	assert.ok(r.errors.some((e) => e.includes('stopped this story: no primary source')));
});

test('a false premise stops the run, even if every scene only uses true claims', () => {
	const premiseFalse = ledger();
	premiseFalse.claims[0] = {id: 'C0', text: 'OpenAI confirmed GPT-7 is conscious', status: 'false'};
	const r = checkRun({storyboard: board([{id: 's2', type: 'statement', text: 'Middle', say: 'A middle line.', claims: []}]), ledger: premiseFalse, timing: null, brand});
	assert.ok(r.errors.some((e) => e.includes('premise (C0) is "false"')));
});

test('a false premise is allowed only in an explicit debunk run', () => {
	const debunk = ledger({mode: 'debunk'});
	debunk.claims[0] = {id: 'C0', text: 'OpenAI confirmed GPT-7 is conscious', status: 'false'};
	const r = checkRun({storyboard: board([{id: 's2', type: 'statement', text: 'Middle', say: 'A middle line.', claims: []}]), ledger: debunk, timing: null, brand});
	assert.deepEqual(r.errors, []);
});

test('a ledger without a premise claim fails', () => {
	const r = checkRun({storyboard: board([{id: 's2', type: 'statement', text: 'Middle', say: 'A middle line.', claims: []}]), ledger: ledger({claims: ledger().claims.slice(1)}), timing: null, brand});
	assert.ok(r.errors.some((e) => e.includes('no C0')));
});

test('a document scene must quote its source verbatim', () => {
	const withQuote = ledger();
	withQuote.claims[1] = {...withQuote.claims[1], checked_sources: [{url: 'https://example.com/a', quote: 'The model is 2.5x faster on our benchmark.'} as {url: string}]};
	const scene = (quote: string) => board([{id: 's2', type: 'document', publisher: 'Example', quote, url: 'https://example.com/a', say: 'Here is what they wrote.', claims: ['C1']}]);
	assert.deepEqual(checkRun({storyboard: scene('2.5x faster on our benchmark'), ledger: withQuote, timing: null, brand}).errors, []);
	assert.ok(checkRun({storyboard: scene('ten times faster than everyone'), ledger: withQuote, timing: null, brand}).errors.some((e) => e.includes('not found verbatim')));
});

test('banned filler phrases fail', () => {
	const r = checkRun({
		storyboard: board([{id: 's2', type: 'statement', text: 'This is a game-changer', say: 'Honestly this is a game-changer.', claims: []}]),
		ledger: ledger(),
		timing: null,
		brand,
	});
	assert.ok(r.errors.some((e) => e.includes('banned phrase "game-changer"')));
});

test('storyboard structure is enforced (hook first, cta last, word limits)', () => {
	const r = checkRun({
		storyboard: {title: 't', scenes: [{id: 's1', type: 'statement', text: 'one two three four five six seven eight nine ten eleven twelve thirteen', say: 'x y', claims: []}, {id: 's2', type: 'statement', text: 'a', say: 'a b', claims: []}, {id: 's3', type: 'statement', text: 'b', say: 'a b', claims: []}]},
		ledger: ledger(),
		timing: null,
		brand,
	});
	assert.ok(r.errors.some((e) => e.includes('first scene must be a hook')));
	assert.ok(r.errors.some((e) => e.includes('last scene must be a cta')));
	assert.ok(r.errors.some((e) => e.includes('12 words or fewer')));
});

test('real voiced duration is checked against brand limits', () => {
	const r = checkRun({
		storyboard: board([{id: 's2', type: 'statement', text: 'Middle', say: 'A middle line.', claims: []}]),
		ledger: ledger(),
		timing: {
			fps: 30,
			scenes: ['s1', 's2', 's9'].map((id) => ({id, audio: '', audioMs: 1, durationInFrames: 610, words: []})),
		},
		brand,
	});
	assert.ok(r.errors.some((e) => e.includes('the maximum is 50s')));
});
