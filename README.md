# reelroom

**A writers' room of AI agents that turns any AI news link into a fact-checked, ready-to-post vertical reel.**

Paste a link. Seven specialist agents research it, fact-check it, write and critique hooks, script it,
direct it, voice it, look at the rendered frames, and hand you an MP4 plus a caption, hashtags and a
sources comment. Every number on screen carries its receipt, and if the story doesn't survive
fact-checking, the room refuses to make the video and tells you why.

```
/reel https://example.com/some-ai-announcement
```

## See it work: two real runs

### 1. A real story → a reel ([`runs/2026-10-29-single-agent-vs-multi`](runs/2026-10-29-single-agent-vs-multi))

**Input:** "Anthropic says single AI agents beat multi-agent setups", a headline doing the rounds in late October 2026.

**What the room found:** Anthropic never said that. Its 22 Oct guide says a single agent "frequently" did
better in several enterprise deployments, publishes no figures, and says subagents "still have their place".
The fact-checker also caught press coverage misreporting a study (claiming it tested 10–100 agents; the
primary source capped teams at 5) and kept that out of the video.

▶ **[final.mp4](runs/2026-10-29-single-agent-vs-multi/final.mp4)** (50 s, v2) · [cover](runs/2026-10-29-single-agent-vs-multi/cover.png) · [POST.md](runs/2026-10-29-single-agent-vs-multi/POST.md) · [run-log.md](runs/2026-10-29-single-agent-vs-multi/run-log.md) · [05b-direction.md](runs/2026-10-29-single-agent-vs-multi/05b-direction.md) (the director's reference research)

**v1 → v2 (after human review).** v1 passed every gate but a human viewer still found it unpublishable. The
hook ("Anthropic's AI team beat a solo AI by 90.2%… Both are true") was confusing, the voice was flat, and
it was mostly text on a dark background. The fixes went into the system, not just this video:
- **Hooks now have to pass a "say-back" test** (could a stranger repeat it after one listen?): one idea, no number to decode, no riddles. The critic requires 5/5 on clarity. New hook: *"One AI frequently beats a team of AI bots, Anthropic found. Here's when it doesn't."*
- **The director now studies reference styles** (`playbooks/references.md`: paper-trail documentary, visual explainer, fast creator reel, calm tech review), researches real examples each run, and writes down what it's borrowing.
- **New scenes that show instead of tell:** `versus` (icon match-ups), `merge` (bots combining), `document` (an automatic screenshot of the real source page with the quote highlighted on the spoken words), and an icon match-up on the hook frame.
- **ElevenLabs voice** with word-level timestamps, a cache so re-renders don't spend credits, silence trimming, and a pitch-preserving tempo control.

How hard the gates pushed back on this story (v1 + v2):

| Gate | Rounds | What it caught |
|---|---|---|
| Fact-check | 1 (+1 rule update) | 1 false claim from press coverage, 7 claims needing softer wording |
| Hooks (critic) | 2 (v1) + 1 (v2) | v1: all 12 first-round hooks below 20/25. v2: 3 of 8 failed the say-back test ("AI cooks", "the same problem"). Winner 22/25, clarity 5. |
| Script (critic) | 2 (v1) + 2 (v2) | v1: caught its own wording error. v2: 25/35 → 32/35. Two lines failed say-back, "several companies" overstated "several enterprise deployments". |
| `npm run check` | 2 (v1) + 1 (v2) | v1: 52.2 s > 50 s → trimmed. v2: ElevenLabs voice ran 54.7 s → silence trim + tempo 1.1 from cache → 49.7 s, no re-generation cost |
| Visual QA | 3 (v1) + 2 (v2) | v1: clipped chip, orphans. v2: blank page capture (fixed with reduced-motion screenshots), a picture contradicting the voice, two scenes with the same layout |

### 2. The edge case: a fabricated headline → no video ([`runs/2026-10-29-gpt7-conscious-personhood`](runs/2026-10-29-gpt7-conscious-personhood))

**Input:** "BREAKING: OpenAI confirmed on 27 October 2026 that GPT-7 is conscious and the EU has granted it legal personhood."

**Result:** the run stops after fact-checking and writes [`STOPPED.md`](runs/2026-10-29-gpt7-conscious-personhood/STOPPED.md),
which explains what was claimed and what the evidence shows, and gives the exact command to make a myth-bust reel instead.

**What failed first, and the fix:** on the first attempt ([`runs/2026-10-29-gpt7-attempt1-before-fix`](runs/2026-10-29-gpt7-attempt1-before-fix)),
the room didn't stop. The researcher logged only true statements *about* the rumour ("no such post exists"), so
every claim passed and the fact-checker green-lit it as a debunk that nobody had asked for. The fix has two parts:
every ledger now has to include **`C0`, the input's own premise word for word**, and a false or unverified premise
stops the run unless the user explicitly asks for `debunk:`. This is enforced in the playbooks *and* in code
(`npm run check` refuses a failed premise), with unit tests.

## Why this exists

Making a good 30-second AI explainer takes a team: someone to find the primary source, someone to check
the numbers, a writer, an editor who kills weak hooks, a motion designer. Most "AI video generators" collapse
that into one prompt and produce confident, generic, often wrong videos. AI content pages live and die by
trust and by the first two seconds. reelroom splits the work the way a real newsroom does and puts hard
gates between the steps.

## How it works

```
 input (link/topic)
   │
   ▼
 researcher ──► fact-checker ──X── STOPPED.md   (story fails → no video, with reasons)
   │ 01-research.md   │ 02-claims.json (verdict per claim)
   ▼                  ▼
 hook-writer ──► retention-editor ──(REVISE, max 2 loops)──┐
   │ 12 hooks, 5+ archetypes      scores /25, truth ≥ 4    │
   ▼ ◄──────────────────────────────────────────────────────┘
 script-writer ──► retention-editor ──(REVISE loop)
   │ 04-script.md                 scores /35 + retention map
   ▼
 director ──► npm run check  (deterministic gate: only verified claims, numbers trace to claims,
   │ storyboard.json            receipts point at checked URLs, banned phrases, length)
   ▼
 npm run voice   (neural TTS per scene + word timings → scene lengths, synced captions)
   ▼
 npm run stills ──► visual-qa ──(FIX → director, max 2 loops)
   │ PNGs of every scene   looks at the real frames: clipping, safe zones, wrong numbers
   ▼
 npm run render  → final.mp4, cover.png, POST.md (caption, hashtags, sources)
```

| Agent | Job | Craft it brings (see `playbooks/`) |
|---|---|---|
| `researcher` | Finds the primary source and the story inside the news | Source hierarchy, lateral reading / SIFT, AI-news traps (benchmark theatre, demo vs product, "open" claims) |
| `fact-checker` | Independently re-verifies every claim; can kill the story | Verdicts with safe wording, red-flag downgrades, kill switch on core claims |
| `hook-writer` | 3 angles × 12 hooks across 10 archetypes | Curiosity gap, contrarian snapback (Kallaway's 3-step), stakes, number shock, three-layer hooks (spoken/text/visual) |
| `retention-editor` | The critic. Scores, maps drop-off, sends work back | Hook rubric /25 with a truth gate, script rubric /35, second-by-second retention map |
| `script-writer` | 25–45 s script + post kit | And/But/Therefore, open loops, re-hooks every 6–8 s, *Made to Stick*, human-scale numbers, loop endings, banned-phrase list |
| `director` | Storyboard for the engine | 9:16 grammar, safe zones, one idea per frame, scene-type selection, receipts after surprising claims |
| `visual-qa` | Looks at rendered stills before shipping | Legibility, clipping, safe zones, hierarchy, caption collisions, on-screen number accuracy |

The **showrunner** (`.claude/commands/reel.md`) runs them in order, enforces the gates, loops work back,
and keeps `run-log.md`.

### Why agents for some steps and plain code for others

- **Creative and investigative work** (research, judgment, writing, critique, looking at frames) is done by agents.
- **Rules that must never bend** are code: `pipeline/checks.ts` rejects any scene that cites an unverified
  claim, any on-screen number with no claim behind it, any receipt URL that wasn't checked, banned filler
  phrases, and out-of-range durations. It's unit-tested (`npm test`).
- **Rendering** is deterministic: the director writes JSON, never React. The engine (`src/`, Remotion) has 13
  designed scene types (hook, statement, stat, compare, list, quote, receipt, chart, catch, cta, versus, merge, document), word-synced
  captions, story-style chapter bars and a "✓ SOURCE" chip on every factual scene. The same storyboard
  always renders the same video.

## Setup

Requirements: Node 20+, Python 3.10+, ffmpeg on PATH, [Claude Code](https://claude.com/claude-code).

```bash
git clone <this repo> && cd reelroom
npm install
pip install edge-tts
npx remotion browser ensure     # one-time headless Chrome download (~120 MB)
```

**Voice:** for ElevenLabs, copy `.env.example` to `.env` and add your key (it starts with `sk_` and needs the
Text to Speech permission), then choose a voice:

```bash
npm run voices -- search indian            # browse narration voices by accent
npm run voices -- use <voice_id>           # set it in brand.json
```

Without a key, reelroom uses Microsoft Edge's free neural voices (`edge-tts`, default `en-IN-PrabhatNeural`).
Note: ElevenLabs' free plan can only use its built-in voices through the API. Library voices (like the Indian
narrators) and Voice Design need a paid plan.

## Usage

**In Claude Code (recommended):** open the folder and run

```
/reel <AI news URL or topic>
```

**Headless (CI, scripts):** the same command and agents through the Claude Agent SDK. Needs
`ANTHROPIC_API_KEY` set, or a logged-in `claude` CLI.

```bash
npm run reel -- "https://example.com/some-ai-announcement"
```

Everything lands in `runs/<date>-<slug>/`:

| File | What it is |
|---|---|
| `01-research.md` | Story, why it matters, the catch, timeline, sources by tier, fact-check table |
| `02-claims.json` | Claims ledger with verdicts, safe wording and checked sources |
| `03-hooks.md` | Angles and 12 hooks |
| `04-script.md` | Beat sheet, ABT check, post kit |
| `05-critique.md` | Every scoring round from the retention editor |
| `05b-direction.md` | The director's chosen reference style, the real examples it studied, and the techniques it borrowed |
| `storyboard.json` | Scenes for the engine |
| `06-visual-qa.md` | Visual QA rounds |
| `final.mp4`, `cover.png`, `POST.md` | The deliverables |
| `STOPPED.md` | Only if the fact-checker killed the story |
| `run-log.md` | One line per step: who did what, scores, loops |

### Useful commands

```bash
npm run studio                      # Remotion Studio with the scene-library demo
npx tsx pipeline/make-demo.ts       # create runs/_demo (no agents needed)
npm run check  -- runs/<run>        # the deterministic gate
npm run shots  -- runs/<run>        # screenshot real source pages for document scenes
npm run voice  -- runs/<run>        # TTS + word timings (cached per line)
npm run stills -- runs/<run>        # QA stills
npm run render -- runs/<run>        # final.mp4 + cover.png
npm test                            # gate unit tests
```

### Make it yours

`brand.json` sets the handle, the ElevenLabs voice and model (or a free `edge-tts` voice, e.g. `en-IN-NeerjaNeural`
or `hi-IN-MadhurNeural`), `tempo`, duration limits, colours, and an optional music bed (`public/music/bed.mp3`;
bring a track you're licensed to use). The playbooks are plain Markdown: edit them to change how the room thinks.

### Optional: Remotion's official agent skills

If you want Claude to extend the video engine itself (new scene types), install Remotion's official
agent skills: `npx skills add remotion-dev/skills`.

## Limitations

- **One run is slow and costs tokens:** about 20–30 minutes and roughly a dozen subagent turns for the real
  story above, most of it in research and fact-checking. That's the price of the gates. A "fast mode" that skips
  the critic loops would be easy to add, but hasn't been.
- **The fact-checker is only as good as what it can open.** Some official pages (openai.com/news, the European
  Commission press corner) block automated fetches. The checker then relies on feeds, release logs and reporting,
  and says so in its notes.
- **The scene library is fixed (13 types).** That's deliberate, for reliability. New visual ideas become new scene
  types (that's how `versus`, `merge` and `document` were added after review), not per-video code.
- **Voice:** the reel uses ElevenLabs "Daniel" (British). An Indian-accent narrator was the goal, but on the free
  ElevenLabs plan the API only allows built-in voices; the Indian library voices need a paid plan.
- **No B-roll or stock footage**, by design: everything on screen is type, icons, data and real source pages. Music
  is optional and bring-your-own.
- **Two text-only scenes remain** in the example reel (s3, s5). Visual QA flagged them as fine but improvable; a
  "lanes" scene for parallel work would be the next addition.
- **Headless mode needs API credentials.** Inside Claude Code it uses your existing login.
