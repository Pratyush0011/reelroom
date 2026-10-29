import brand from '../brand.json';
import type {ReelProps} from './schema';

// A self-contained example so `npm run studio` shows every scene type without running the agents.
// The facts are illustrative placeholders, not a real story.
export const demoProps: ReelProps = {
	colors: brand.colors,
	handle: brand.handle,
	timing: null,
	sources: {
		C1: {publisher: 'Example Labs blog', url: 'https://example.com/blog'},
		C2: {publisher: 'Example Labs paper', url: 'https://example.com/paper'},
	},
	storyboard: {
		title: 'Scene library demo',
		scenes: [
			{id: 's1', type: 'hook', kicker: 'Scene demo', headline: 'This reel checks its own facts', accent: 'facts', say: 'This reel checks its own facts before you see them.', claims: []},
			{id: 's2', type: 'versus', title: 'Who does the job better?', left: {label: 'Team of AIs', icon: 'bot', count: 5, caption: 'split the work'}, right: {label: 'One AI', icon: 'bot', count: 1, caption: 'grabs tools when needed'}, winner: 'right', verdict: 'Often. Not always.', say: 'A team of AI bots, or one AI with the right tools?', claims: []},
			{id: 's3', type: 'document', publisher: 'Example Labs', quote: 'Our new model is 2.5x faster on internal tests.', highlight: '2.5x faster', date: 'Oct 2026', url: 'https://example.com/blog', say: 'Here is the line from their own blog: two and a half times faster.', claims: ['C1']},
			{id: 's4', type: 'stat', value: 2.5, suffix: 'x', label: 'faster than last year', context: 'on the lab’s own benchmark', say: 'The lab says it is two and a half times faster.', claims: ['C1']},
			{id: 's5', type: 'receipt', publisher: 'Example Labs', headline: 'Our new model is 2.5x faster on internal tests', date: 'Oct 2026', url: 'https://example.com/blog', say: 'And here is where that number comes from.', claims: ['C1']},
			{id: 's6', type: 'compare', metric: 'Price per million words', left: {label: 'Before', value: 20}, right: {label: 'Now', value: 4}, winner: 'right', unit: '$', say: 'The price drops from twenty dollars to four.', claims: ['C2']},
			{id: 's7', type: 'chart', title: 'Benchmark score', unit: 'percent', bars: [{label: 'Model A', value: 71}, {label: 'Model B', value: 78}, {label: 'New one', value: 84, highlight: true}], say: 'On the shared benchmark it scores eighty four.', claims: ['C2']},
			{id: 's8', type: 'list', title: 'Who should care', items: ['Students on a budget', 'Indie developers', 'Small agencies'], say: 'This matters most for students, indie developers and small agencies.', claims: []},
			{id: 's9', type: 'quote', quote: 'Speed is the feature people actually notice.', who: 'Jane Doe', role: 'Research lead, Example Labs', say: 'As their research lead put it, speed is the feature people notice.', claims: []},
			{id: 's10', type: 'catch', title: 'The catch', text: 'Nobody outside the lab has tested it yet', say: 'But nobody outside the lab has tested it yet.', claims: []},
			{id: 's11', type: 'statement', text: 'Fast is great. Proven fast is better.', accent: 'Proven fast', say: 'Fast is great. Proven fast is better.', claims: []},
			{id: 's12', type: 'cta', prompt: 'Would you switch for 2x speed?', sub: 'Yes or no, one word.', say: 'Would you switch for double the speed? Yes or no.', claims: []},
		],
	},
};
