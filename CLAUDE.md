# reelroom

A newsroom of Claude Code subagents that turns an AI news link or topic into a fact-checked vertical reel.

- Start a reel with `/reel <url or topic>` (`.claude/commands/reel.md` is the showrunner).
- Specialists live in `.claude/agents/`; their craft knowledge lives in `playbooks/`. Agents read their playbook before working.
- Every run writes to `runs/<date>-<slug>/`. Numbered files are the paper trail (research → claims → hooks → script → critique → storyboard → QA).
- The video engine is Remotion (`src/`). The director only writes `storyboard.json`; `src/schema.ts` is the contract.
- `npm run check -- <run>` is the non-negotiable gate: only fact-checked claims may appear, numbers must trace to a claim, receipts must point at checked URLs.
- Keep scene text short; if something doesn't fit, shorten words or change the scene type. Never change a fact to make it fit.
