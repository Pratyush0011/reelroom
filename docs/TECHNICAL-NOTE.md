# reelroom: technical note

## Problem
AI content pages need short, accurate explainers, and a wrong number costs trust. A good 30–45 s reel takes a team to
source, fact-check, write, design, voice and edit. One-prompt video generators skip those steps, so their output is
generic and often wrong. reelroom automates the team: give it a link or topic and it returns a fact-checked vertical
reel with a caption and sources, or refuses and says why.

## Approach
A showrunner command (`/reel`) runs seven Claude subagents with hard gates between steps: `researcher` → `fact-checker`
(can kill the story) → `hook-writer` ↔ `retention-editor` → `script-writer` ↔ `retention-editor` → `director` → voice →
`visual-qa` → render.
- **Agents for judgment, code for rules.** Verified claims only, numbers traced to claims, checked source URLs, length
  and pace are a unit-tested gate (`pipeline/checks.ts`), not a prompt the model might ignore.
- **The director writes data, not code.** A schema-validated storyboard on a fixed engine is reproducible. Generated
  React would fail differently on every run.
- **Separate agents for independence.** The fact-checker's fresh context can't inherit the researcher's assumptions.

## Technical implementation
- **Claude Code subagents** give each role its own context, with a headless **Claude Agent SDK** runner (`npm run reel`).
- **Remotion 4** renders locally: 15 scene types, 10 illustrated set pieces, word-synced captions. **Zod** is the
  contract between director and engine, and **ffmpeg** measures real audio and the finished video.
- **ElevenLabs** (free `edge-tts` fallback) voices each scene with word timings, cached per line. **Wikimedia Commons and
  Openverse** supply credited, licensed B-roll with no keys.

## Testing
- **Automated:** 18 unit tests cover the gates, which also run on every real output.
- **Real story** (Anthropic, "single vs multi-agent"): the fact-checker caught press coverage misreporting a study, and
  the critic rejected all 12 first-round hooks.
- **Edge case, fabricated headline** (GPT-7 "conscious"). **It failed first:** true statements *about* the rumour passed
  as an unrequested debunk. A mandatory `C0` premise claim, a code gate and tests fixed it, and the retest stopped correctly.
- **Human review found what gates couldn't.** v1 passed every gate but was unpublishable, so hooks got a say-back test.
  v2 was "static", so I added motion and pace gates. v3 was "monotonous", so I measured it against 12 top channels
  (brightness 45 vs 107, variety 0.16 vs 0.57), rebuilt the look and added `npm run look`. v4 scores 141 and 0.84.
- **Visual QA** caught what no unit test would. v4 passed every gate, yet QA found 7 majors, mostly pictures overstating
  hedged claims. I fixed them, QA returned SHIP, and the playbooks now require it. One wording call on s11 stays open.

## Limitations and next steps
- **Not fully proven:** the example runs followed `/reel`'s steps with subagents briefed from the agent files. The command
  hasn't run in a fresh session, the headless runner was tested only up to authentication, and v4's storyboard and
  fixes were done by hand, not by the director agent.
- **Other limits:** a reel takes 20–30 minutes, the fact-checker can only use pages it can open, and `look` measures
  visual variety from thumbnail frames, not retention or quality.
- **Chose not to build:** a web UI, auto-posting and a real presenter.
- **With another day:** run `/reel` cold end to end, then build an eval set of past stories to measure fact-check recall.
