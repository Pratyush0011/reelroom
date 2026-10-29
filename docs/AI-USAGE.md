# AI usage disclosure

## Tools used to build this

- **Claude Code (Claude Opus 5.5)** was my pair programmer for the whole build: researching frameworks and
  platform specs, drafting the playbooks and agent definitions, writing the Remotion engine, the pipeline
  scripts and the tests, and running the end-to-end test runs.
- **Remotion's official agent guidance** (`remotion-dev/skills`, read during the build, not vendored) was used
  to follow Remotion's current best practices (frame-driven animation, `@remotion/media` audio, font loading).

## Tools the product uses at runtime

- **Claude (via Claude Code or the Claude Agent SDK)** runs the showrunner and the seven subagents.
- **ElevenLabs** (`eleven_v4`, voice "Daniel") generates the voiceover with character-level timestamps that
  become word-synced captions. **edge-tts** (Microsoft Edge's neural voices) is the free fallback when no key is set.
- **Remotion** renders the video locally.

## How I verified the code and outputs

- **Deterministic gates are unit-tested.** `npm test` covers every rule in `pipeline/checks.ts`:
  unverified claims, numbers with no source, numbers that don't match their claim, invented receipt URLs,
  a killed story, banned phrases, structure and word limits, and real voiced duration. One test failed
  on the first run because the test itself built an invalid storyboard; I fixed the test, not the rule.
- **Type safety:** `tsc --noEmit` passes for the engine, the pipeline and the Agent SDK runner.
- **Visual checks:** I rendered stills of every scene type and reviewed them as a contact sheet. That's how
  I caught the compare card printing `20$` instead of `$20`, which I fixed.
- **End-to-end runs:** one real AI story and one fabricated headline (the edge case) went through the full
  agent pipeline. Results are in `runs/` and summarised in the README and technical note.
  How they were run: Claude Code acted as the showrunner, following `.claude/commands/reel.md` step by step, and
  briefed a fresh subagent for each role with that role's own definition file (`.claude/agents/*.md`) and playbook.
  All gates, scripts and loops were the real ones. The `/reel` command itself was not typed into a fresh Claude Code
  window, and the headless Agent SDK runner (`npm run reel`) was tested only up to authentication, because this
  machine had no API key. It correctly reports that it needs one.
- **Agent SDK runner:** I typed it against the installed package's own `.d.ts` rather than from memory, ran it,
  found it reported "success" when the CLI wasn't logged in, and fixed it to check `is_error`.
- **Facts in the playbooks:** frameworks are attributed to their authors (Loewenstein's information gap,
  Kallaway's hook structure, Olson's ABT, Parker & Stone's "but/therefore", the Heath brothers, Caulfield's SIFT).
  Where public numbers disagreed (platform safe zones, retention benchmarks), I designed to the most
  conservative values and said so instead of quoting a single figure.
