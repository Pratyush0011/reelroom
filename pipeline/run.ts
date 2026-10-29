// Headless entry point: runs the same /reel command and the same subagents as Claude Code,
// through the Claude Agent SDK. Usage: npm run reel -- "<url or topic>"
import {query} from '@anthropic-ai/claude-agent-sdk';
import {ROOT} from './lib.ts';

const input = process.argv.slice(2).join(' ').trim();
if (!input) {
	console.error('Usage: npm run reel -- "<AI news URL or topic>"');
	process.exit(2);
}

const started = Date.now();
const elapsed = () => `${Math.round((Date.now() - started) / 1000)}s`.padStart(5);

for await (const msg of query({
	prompt: `/reel ${input}`,
	options: {
		cwd: ROOT,
		// Load .claude/commands/reel.md and .claude/agents/* from this repo only.
		settingSources: ['project'],
		permissionMode: 'acceptEdits',
		allowedTools: ['Agent', 'Task', 'Read', 'Write', 'Edit', 'Glob', 'Grep', 'WebSearch', 'WebFetch', 'Bash(npm run *)', 'Bash(npx tsx *)', 'Bash(mkdir *)'],
	},
})) {
	if (msg.type === 'assistant') {
		for (const block of msg.message.content) {
			if (block.type === 'text' && block.text.trim()) console.log(`${elapsed()}  ${block.text.trim()}`);
			if (block.type === 'tool_use') {
				const input = block.input as {subagent_type?: string; command?: string; description?: string};
				const what = input.subagent_type ? `→ ${input.subagent_type}` : input.command ?? input.description ?? '';
				console.log(`${elapsed()}  [${block.name}] ${what}`.slice(0, 160));
			}
		}
	} else if (msg.type === 'result') {
		const ok = msg.subtype === 'success' && !msg.is_error;
		console.log(`\n${ok ? '✓ done' : `✗ failed (${msg.subtype === 'success' ? 'error' : msg.subtype})`} in ${elapsed().trim()}`);
		if (msg.subtype === 'success') console.log(msg.result);
		if (!ok && msg.subtype === 'success' && /log ?in/i.test(msg.result))
			console.log('\nThe Agent SDK needs credentials: set ANTHROPIC_API_KEY, or run `claude` once and log in.');
		process.exit(ok ? 0 : 1);
	}
}
