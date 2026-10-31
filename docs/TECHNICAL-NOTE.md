# reelroom: technical note

## Problem
AI content pages need a steady flow of short, accurate explainers. Turning one AI announcement into a good
30–45 s reel takes a team: find the primary source, check the numbers, find the angle, write a hook that
survives the first two seconds, script, design, voice and edit. One-prompt "AI video generators" skip the
hard parts. Their output is generic and often wrong, and on an AI news page a wrong number costs trust.
reelroom automates the team, not just the typing.

## Approach
A **newsroom of seven specialist subagents**, run by a showrunner command (`/reel`), with **hard gates**
between steps:

1. `researcher` climbs to the primary source and logs every usable fact in a claims ledger.
2. `fact-checker` re-verifies each claim *independently* and can **kill the story** (writes `STOPPED.md`).
3. `hook-writer` writes 12 hooks across 10 psychological archetypes; `retention-editor` scores them (/25, with a truth gate) and loops them back.
4. `script-writer` writes the beat sheet; `retention-editor` scores it (/35) and maps where viewers would drop off.
5. `director` maps beats to a library of designed scene types in `storyboard.json`.
6. Voice, stills, then `visual-qa` looks at real rendered frames and loops fixes back to the director.

**Key decisions**
- **Agents where judgment is needed, code where it isn't.** The non-negotiable rules (only verified claims on
  screen, every number traceable to a claim, receipts must point at checked URLs, banned filler, duration)
  are a deterministic, unit-tested gate (`pipeline/checks.ts`), not a prompt the model might ignore.
- **The director writes data, not code.** A schema-validated storyboard rendered by a fixed, designed engine
  is reproducible and can't break the build. Free-form generated React would look different and fail differently every run.
- **Separate agents for independence, not for show.** The fact-checker gets a fresh context, so it can't
  inherit the researcher's assumptions. The critic doesn't grade its own writing. This matches the cases where
  Anthropic's own guidance says subagents earn their cost (independent context, context bloat). Writing
  stays with one agent per artifact.
- **Craft lives in playbooks** (`playbooks/*.md`), not in agent prompts, so editors can tune how the room
  thinks without touching code. They encode named frameworks: SIFT/lateral reading, Loewenstein's information
  gap, Kallaway's hook structure, ABT and "but/therefore", *Made to Stick*, platform safe zones.
- **Trust as a visual signature:** every factual scene shows a "✓ SOURCE" chip, and a `receipt` scene shows
  the actual headline. The fact-checker's safe wording ("Google says…", "up to…") flows into the voiceover.

## Technical implementation
- **Claude Code subagents + slash command** (`.claude/agents`, `.claude/commands/reel.md`). The same command
  runs headless through the **Claude Agent SDK** (`npm run reel`).
- **Remotion 4** (React → MP4) with 13 scene types (including icon match-ups, merges and real source-page screenshots), word-synced captions, chapter bars and a persistent animated
  background. Fonts: Inter Tight, Instrument Serif, JetBrains Mono.
- **ElevenLabs** (`eleven_v4`, with-timestamps endpoint; free `edge-tts` fallback) generates speech **per scene with word-level timings**, cached per line, silence-trimmed and tempo-adjusted, so each
  scene lasts exactly as long as its narration and captions highlight the spoken word.
- **Zod schema** (`src/schema.ts`) is the contract between the director and the engine; ffprobe measures real audio length.

## Testing
- **Human review is part of the loop.** v1 passed every automated gate, yet a human viewer found it unpublishable: a confusing hook, a flat voice, too much text. Rather than hand-edit the video, I changed the system. The hook rubric got a say-back clarity gate, the director got reference-style research, and the engine got picture-first scenes (`versus`, `merge`, `document`). v2 then went through every gate again. The lesson: automated critics enforce the rules you give them, so a human has to keep improving the rules.
- **Second human review (v3): "static".** I made motion something the system has to deliver, not something it may add. There's an inspiration skill whose output is gated (real short-form references plus a motion recipe), a motion layer on every scene, pace gates (≤ 2 s per visual change, ≤ 4.5 s per scene), and licensed B-roll. Visual QA then caught problems no unit test would: stale uncredited clips from an earlier scene numbering, footage of a head of state, a rolling-papers ad, a Bible page and a heron behind news text. Each became a pipeline rule (clean rebuilds, a risky-subject filter, a brightness check, a per-query cache), not a one-off edit.
- **Unit tests (`npm test`, 12 passing)** cover every deterministic gate: unverified claims, numbers with no
  claim, numbers that don't match their claim, invented receipt URLs, a killed story, a false premise, debunk mode,
  missing `C0`, banned phrases, structure and word limits, and real voiced duration.
- **End-to-end, real story** (Anthropic "single vs multi-agent", Oct 2026). The run produced a 49 s reel. The gates
  did real work: the fact-checker caught press coverage misreporting a study (false claim kept out). The critic
  rejected all 12 first-round hooks, then caught a wording error *it* had introduced. `npm run check` failed the
  first voiced cut at 52.2 s. Visual QA failed two rounds (clipped source chip on the thumbnail frame, orphan words,
  a split "1 of 2" figure).
- **Edge case, fabricated headline** (GPT-7 conscious + EU personhood). **First attempt failed:** the ledger only
  held true statements *about* the rumour, so the story passed as an unrequested debunk. **Fix:** a mandatory `C0`
  premise claim judged word for word, a stop unless the input says `debunk:`, and a code gate plus tests. **Second
  attempt:** stopped correctly, with `STOPPED.md` explaining why.
- **Third human review (v4): "monotonous".** Fast cuts hadn't fixed it, so I measured the gap against Shorts from 12 top channels: v3 scored brightness 45 vs 107 and variety 0.16 vs 0.57. The fix was a new look (a colour world per scene, illustrated set pieces, minimal text, music) plus `npm run look`, which fails monotonous reels. v4 scores 141 and 0.84. YouTube rate-limited my frame collection, so the benchmark uses public thumbnail frames, not exact cut timings.
- **Visual verification:** I reviewed stills of every scene type as contact sheets. That's where I found the
  `20$` currency bug and the orphan-word problem, and fixed the latter in the engine with balanced wrapping, not
  per video. List items and accent highlights are timed to the spoken words using TTS word boundaries.
- **Robustness:** the voice service failed once mid-run, so `npm run voice` now retries. The Agent SDK runner
  initially reported "success" without credentials; it now checks `is_error` and explains the fix.

## Limitations and next steps
- **Cost and speed:** about 20–30 minutes and a dozen subagent turns per reel, mostly research and fact-checking.
  The gates are the product, but a lighter mode for low-stakes posts would help.
- **Source access:** some official newsrooms block automated fetches, so verification falls back to feeds and
  reporting. The checker records when that happens.
- **Fixed scene library (deliberate):** reliable and on-brand, but the critic's richer visual ideas get
  approximated. Next step: a reviewed "custom scene" escape hatch where Claude writes a Remotion component that
  must pass the same stills QA.
- **What I chose not to build:** a web UI, B-roll or stock footage, music, auto-posting. They're out of scope for a
  trustworthy core and add licensing and safety questions.
- **With another day:** an eval set of 20 past AI stories with known ground truth to measure fact-check recall and
  hook scores over time; a Hindi voice/script track (the playbooks are language-neutral, and `edge-tts` has Hindi
  voices); and parallel research for multi-source stories.
