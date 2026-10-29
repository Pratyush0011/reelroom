// Creates runs/_demo from the built-in scene-library demo, so the engine can be tried without the agents.
import {mkdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {demoProps} from '../src/demo.ts';
import {ROOT} from './lib.ts';

const dir = path.join(ROOT, 'runs', '_demo');
mkdirSync(dir, {recursive: true});
writeFileSync(path.join(dir, 'storyboard.json'), JSON.stringify(demoProps.storyboard, null, 2));
writeFileSync(
	path.join(dir, '02-claims.json'),
	JSON.stringify(
		{
			publishable: true,
			mode: 'news',
			claims: [
				{id: 'C0', text: 'Example Labs released a faster, cheaper model', type: 'premise', status: 'verified', checked_sources: [{url: 'https://example.com/blog', publisher: 'Example Labs blog'}]},
				{id: 'C1', text: 'Example Labs says its new model is 2.5x faster on internal tests', status: 'verified_with_wording', safe_text: 'Example Labs says it is 2.5x faster on its own tests', checked_sources: [{url: 'https://example.com/blog', publisher: 'Example Labs blog', quote: 'Our new model is 2.5x faster on internal tests.'}]},
				{id: 'C2', text: 'Price drops from 20 to 4 dollars per million words; it scores 84 on the shared benchmark vs 71 and 78', status: 'verified', checked_sources: [{url: 'https://example.com/paper', publisher: 'Example Labs paper'}]},
			],
		},
		null,
		2,
	),
);
console.log(`wrote ${path.relative(ROOT, dir)}`);
