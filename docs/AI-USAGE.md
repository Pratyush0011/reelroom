# AI usage disclosure

## Tools used to build this

- **Claude Code (Claude Opus 5.5)** was my pair programmer for the whole build: researching frameworks and
  platform specs, drafting the playbooks and agent definitions, writing the Remotion engine, the pipeline
  scripts and the tests, and running the end-to-end test runs.
- **Remotion's official agent guidance** (`remotion-dev/skills`, read during the build, not vendored) was used
  to follow Remotion's current best practices (frame-driven animation, `@remotion/media` audio, font loading).

- **The demo video** is narrated by an AI voice (Microsoft edge-tts, `en-IN-PrabhatNeural`) reading a script I
  approved, and the video says so on its first and last screens. Claude Code put it together from real footage: a
  screen recording of the cold Gemini run (sped up, cropped to that session), the gate commands recorded as they ran,
  the finished reel, and the README and run files rendered with GitHub's own Markdown renderer.

## Tools the product uses at runtime

- **Claude (via Claude Code or the Claude Agent SDK)** runs the showrunner and the seven subagents.
- **ElevenLabs** (`eleven_v4`, voice "Daniel") generates the voiceover with character-level timestamps that
  become word-synced captions. **edge-tts** (Microsoft Edge's neural voices) is the free fallback when no key is set.
- **Remotion** renders the video locally.
- **Wikimedia Commons and Openverse** supply licensed B-roll. No AI generates the pictures or the music: the example
  reel's music is "Super Power Cool Dude" by Kevin MacLeod (CC BY 3.0), credited in the README and `POST.md`.

## How I verified the code and outputs

- **Deterministic gates are unit-tested.** `npm test` (18 tests) covers the rules in `pipeline/checks.ts`:
  unverified claims, numbers with no source, numbers that don't match their claim, invented receipt URLs,
  a killed story, banned phrases, structure and word limits, and real voiced duration. It also covers the
  measurements behind `npm run look`. One test failed on the first run because the test itself built an
  invalid storyboard; I fixed the test, not the rule.
- **Type safety:** `tsc --noEmit` passes for the engine, the pipeline and the Agent SDK runner.
- **Visual checks:** I rendered stills of every scene type and reviewed them as a contact sheet. That's how
  I caught the compare card printing `20$` instead of `$20`, which I fixed.
- **End-to-end runs:** one real AI story and one fabricated headline (the edge case) went through the full
  agent pipeline. Results are in `runs/` and summarised in the README and technical note.
  How they were run: Claude Code acted as the showrunner, following `.claude/commands/reel.md` step by step, and
  briefed a fresh subagent for each role with that role's own definition file (`.claude/agents/*.md`) and playbook.
  All gates, scripts and loops were the real ones. The headless Agent SDK runner (`npm run reel`) was tested only up
  to authentication, because this machine had no API key. It correctly reports that it needs one.
- **One cold run (2 Nov 2026):** I typed `/reel` into a fresh Claude Code session for Gemini 4 Carbon and only
  approved tool prompts. When the ElevenLabs credits ran out mid-run, it stopped and asked me, and I supplied a new
  key. That was my only decision. The director extended the engine on its own: a ranking-board set piece and
  text-fragment screenshots. A new test covers the gate change, and I reviewed the diff afterwards. Claude Code had
  earlier tried to force the free voice for this run but tested that wrongly, which cost about 130 old credits.
- **Agent SDK runner:** I typed it against the installed package's own `.d.ts` rather than from memory, ran it,
  found it reported "success" when the CLI wasn't logged in, and fixed it to check `is_error`.
- **Facts in the playbooks:** frameworks are attributed to their authors (Loewenstein's information gap,
  Kallaway's hook structure, Olson's ABT, Parker & Stone's "but/therefore", the Heath brothers, Caulfield's SIFT).
  Where public numbers disagreed (platform safe zones, retention benchmarks), I designed to the most
  conservative values and said so instead of quoting a single figure.

## What was different about v4

I reviewed v3 and called it monotonous. v4 didn't go through the agent room the way the earlier versions did:

- **The storyboard was rebuilt by hand.** Claude Code rewrote `storyboard.json` and the engine directly in the main
  session. The director agent didn't do it, and the critic didn't score it. The hook, script and claims weren't
  regenerated: comparing `storyboard.v3.json` with `storyboard.json` shows no spoken line or claim changed, and the
  voiceover still matches the approved `04-script.md` word for word. `05b-direction.md` is still v3's research.
- **The benchmark is approximate.** Claude Code measured Shorts from 12 top channels (brightness, colourfulness, dark
  share, variety). YouTube blocked further page requests from this PC, so the numbers come from about 140 frames in
  public thumbnails, not from the videos. They say nothing about cut timing or real retention. I chose to treat them
  as a pass mark for looking monotonous, not as a measure of quality.
- **Music and photos were checked by licence.** The music is a CC BY 3.0 track, and the one photo left in the reel is
  CC0 (credited in `POST.md`). The reel still uses the original Daniel voice from the cache, so v4 spent no voice credits.
- **Visual QA found problems every gate had passed.** On 1 Nov 2026 a fresh subagent briefed from `visual-qa.md`
  reviewed 37 frames taken from `final.mp4`, plus the cover. Its verdict was FIX: no blockers, 7 majors and 14 minors
  (`06-visual-qa.md`, round 9). The main ones were pictures that overstate hedged claims, a blank first frame, and a
  caption on the cover caused by a real render bug. They were confirmed against the frames and the claims ledger.
- **v4.1 applied those fixes.** Claude Code made them by hand from the QA notes, again without the director agent, and
  no spoken line changed. It rejected one QA suggestion (the older `merge` scene for s13) because that scene doesn't
  match the look, and built a calm `combine` set piece instead. Previewing stills before the render caught two faults
  in its own fixes. The same QA subagent then reviewed frames from the new video and returned SHIP: no blockers, no
  majors, 13 minors (round 10). That was a re-check by the same agent, not a fresh review, and it saw two stills per scene.
- **One call stays open.** In s11 the title now says "No cost figures", which is accurate, but the voice and caption
  still say "No numbers shared". That's broader than the ledger, which records roughly 2x faster runtime for one
  customer (C3). QA rated it minor; a stricter reading would keep it major. Fixing it needs a new voice line.
- **`npm run look` was re-run** on the finished v4.1 `final.mp4` and passed: brightness 141, colourfulness 105, 5% dark,
  variety 0.84. `npm test` and `npm run check` passed too.
