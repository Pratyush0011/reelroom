# 05b Direction (v3): motion-first

> **v4 note (added 2026-11-01).** This file is the director agent's research for v3, and v4 did not redo it. The v4
> storyboard was rebuilt by hand in the main Claude Code session, not by the director agent, after a reviewer called v3
> monotonous. It kept every `say` line and claim and replaced the look (colour worlds, `show` set pieces). v4's new input
> was the 12-channel measurement in `.claude/skills/reel-inspiration/SKILL.md`, section 0.

Reviewer note on v2: "not much is going on on the screen", and the v2 references were articles, not reels.
This round's research looked at real, popular short-form videos on AI agents / multi-agent AI, plus two documentary
explainers, and turns what they do on screen into a motion recipe for the engine.

## How the research was done (2026-10-30)

Searches run (10): `site:youtube.com/shorts multi-agent AI explained`, `AI agents explained shorts single agent vs multi agent`,
`site:instagram.com/reel AI agents explained`, `site:tiktok.com multi agent AI one AI vs team of AI agents`,
`AI agents explained Vox OR "Johnny Harris" OR "Cleo Abram" OR ColdFusion video`, `viral AI explainer short October 2026 AI agents`,
`"youtube.com/shorts" AI agents`, `tiktok AI agents explained video multi-agent`, `instagram reel AI agents explained Varun Mayya`,
then YouTube's own search for "multi agent AI vs single agent shorts", "one AI vs team of AI agents shorts", "AI agents explained shorts",
"multi-agent AI explained #shorts", "AI agents team vs one agent #shorts", "agentic AI explained #shorts", "Vox AI agents",
"Johnny Harris artificial intelligence", "Cleo Abram AI agents", "ColdFusion AI agents".

What worked and what didn't: the web search tool returns blogs, not reels, for `site:` queries; Instagram returned no reel pages;
TikTok pages refuse connections from this machine (ECONNREFUSED), so no TikTok reference could be opened and none is cited.
YouTube's search page did list Shorts with view counts. Each reference below was opened with WebFetch (it confirms the title but
YouTube hides the rest from it), and its views, likes, date and length were read from the same watch page's embedded player data.
The deconstruction comes from YouTube's own 1-frame-per-second preview storyboard for each Short (every 5 s / 10 s for the
long videos), viewed as contact sheets. No view count below is estimated; all were read on 2026-10-30.

Topic-exact Shorts ("One AI Agent vs a Team of Subagents: What Anthropic Found", "One AI Agent Beat a Team of AI Agents") exist
but have 11 and 78 views, so they show nothing about what works. The shortlist favours high-view Shorts on the adjacent topic
(AI agents explained) and keeps one topic-exact, low-energy clip as the counter-example.

## References (≥5; ≥3 short-form; ≥1 documentary)

| # | Type | Title — creator | URL | Date | Views | Hook device | Cut pace | Motion devices | What I'm stealing |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Short (52 s) | AI Agents explained in 3 steps — Jeff Su | https://www.youtube.com/shorts/BF2k_fKuCVM | 8 May 2025 | 876,132 (19,837 likes) | 2 s talking head, then the title "AI AGENTS EXPLAINED (in 3 simple steps)" pops; cuts to a black canvas by s3 | ~1 s: a new node, arrow, label or tick lands every second | Diagram built piece by piece (Input → LLM → Output boxes), yellow "LEVEL 1/2/3" kicker, red ✗ / green ✓ pops next to "Passive" / "Access to tools", app icons fly in, a "Goal → AI Agent" box re-uses the same layout one level up | **Build the picture one element per spoken phrase** on a dark canvas; same layout, one thing changes; ✗/✓ verdict pops = our `versus` winner glow + verdict stamp |
| 2 | Short (16 s) | What can i even do with AI agents? — David Ondrej | https://www.youtube.com/shorts/heJpA0wYrrk | 3 May 2025 | 761,063 (6,569 likes) | Question as the title, face in a circle, one yellow word under it | <1 s: one caption word per beat, screen cuts ~every 2 s | Circular face-cam over a screen recording, single-word yellow captions, red hand-drawn arrows that circle the thing being named | **One-word punch captions** and **pointing at the exact thing being said** → `emphasis` word stickers + punch-in on that word |
| 3 | Short (58 s) | 🔥AI Agents vs Agentic AI — Intellipaat | https://www.youtube.com/shorts/SKd15qYtkdU | 12 Mar 2026 | 406,906 (5,241 likes) | Black-and-white cold open with a neon icon, then a glowing title card "AI Agents & Agentic AI" | ~1–1.5 s | Presenter with icon + 2-word label pops (bot icon "Do Exactly as You Asked"), full-screen dark server/code B-roll with text slammed on top, presenter shrinks to a picture-in-picture over B-roll, 3D emoji pops ("GOAL" + target), gold "Clear Instruction" word art | **Dark tech B-roll behind every text card** (`bg`), **full-screen B-roll + slammed line** (`broll`), icon + label pops |
| 4 | Short (54 s) | AI Agent vs Agentic AI — What's the Difference? — Analytics Vidhya | https://www.youtube.com/shorts/3Y68D4DU8Os | 8 Jul 2025 | 265,746 (5,653 likes) | Talking head with a single centred word caption from frame 1 | ~2 s | Hard cuts to real-world B-roll (robot arm playing chess, humanoid robot in a field, phone in hand, self-driving car screen), kinetic serif text that writes in word by word ("It acts with a sense of purpose and autonomy"), keyword highlight in green | **Concrete, photographable B-roll for abstract words** ("agent" → robot arm), **word-by-word headline build** (our `hook` / `broll` headline slam) |
| 5 | Short (1:58), topic-exact counter-example | Multi-agent vs. single-agent: Which should you use? — Google Cloud Tech | https://www.youtube.com/shorts/7EhiJL_6ats | 21 Oct 2025 | 13,032 (291 likes) | Static podcast frame: "The Agent Factory, Episode 5", title "When to Use Multi Agents" | Picture never changes; only a karaoke caption word moves | Locked-off webcam, one caption word at a time, no B-roll, no graphics | **What not to do.** Same question as ours, 1/60th of Jeff Su's views. Its idea is useful though: "read-heavy" work suits parallel agents, "write-heavy" suits one, which matches C9's "run at the same time" beat |
| 6 | Documentary (6:31) | We're already using AI more than we realize — Vox | https://www.youtube.com/watch?v=YsZ-lx_3eoM | 28 Feb 2024 | 729,681 (12,409 likes) | Phone close-up, then a real ChatGPT prompt being typed ("write me an email for an interview req…") | ~3–5 s in the cold open | Real UI on screen, face-tracking overlay on footage, collage cut-outs, branded title card "AI, EXPLAINED", **Pew Research chart on a blue card with the source label top-left**, bars animate to 68% / 65% / 64%… | **The source on screen with its name** (our `document` + source chip), numbers that animate up (`stat`) |
| 7 | Documentary (29:40) | How The Internet's Favourite AI Employee Went Rogue — ColdFusion | https://www.youtube.com/watch?v=qKqrmS6dKDg | 31 Mar 2026 | 911,056 (27,367 likes) | Street protest footage with a lower-third "AI protest in San Francisco" | ~5–10 s (long form) | Phone-grid of other creators' clips, blurred-edge vertical clips, red warning triangle over a monitor, **real news headlines shown as pages** ("AI Agents Created Their Own Religion…"), X profile screenshots | **Paper trail as pages** (`document`), **red warning beat** for the catch (`catch` + `shake`) |

Pattern across the winners (1–4): something new lands about once a second, the frame is never a plain card (B-roll, a diagram
building, or an icon popping), and text is one to four words at a time. The loser (5) has the same topic and a still frame.

## Motion recipe for this reel

- **Target visual change every:** ≤ 1.8 s. Plan: 18 scenes + 16 emphasis punch-ins = 34 changes. On the real ElevenLabs
  voice (48.9 s) that is ≈ 1.45 s per change (QA round 6 removed stickers that repeated on-screen words). No scene above 9 spoken words (≤ 4.3 s voiced); the shortest are 2–4 words (≈ 1.5 s slams).
  The v3 draft's "Still, one AI with tools was often cheaper, faster." ran 4.6 s voiced, so it is split into s9 (versus) + s10 (compare).
- **Signature moves (3):**
  1. *Build, don't show* (Jeff Su): the team-vs-one match-up returns three times and changes one thing each time
     (hook matchup → "Who wins?" with no winner → team wins when overloaded → one AI + tools wins on cost and speed), so the eye tracks a single picture evolving.
  2. *Slammed line over real footage* (Intellipaat / Analytics Vidhya): three full-screen `broll` moments ("A team still wins",
     "No numbers shared", "Delivery date: skipped") and dark B-roll behind 8 graphic scenes.
  3. *Punch-in on the hedge* (David Ondrej's one-word captions): the hedge words get the caption-band pop + click
     ("frequently", "only", "sample"), so the honesty is the loudest thing on screen.
- **Transitions:** never the same twice in a row. `flash` into the receipt (s2), the catch (s12) and the CTA (s18);
  `glitch` on "Here's when it doesn't" (s3) and "No numbers shared" (s11), the two "wait, what?" turns; `whip` into B-roll and
  turn moments (s5, s9, s14); `zoom` into the overloaded versus, the paper trail, the merge and the quote (s6, s8, s13, s16);
  `slide` for explanatory follow-ups (s4, s7, s10, s15, s17).
- **Emphasis words per scene:** 0–2 spoken words that are **not already written big on screen** (round 6 rule): "frequently",
  "bots", "using", "only", "information", "own words", "sample", "pick". Scenes whose card already says the word (s2, s3, s5, s9, s15)
  carry none. Every emphasis word is in that scene's `say`.
- **B-roll plan** (queries as fetched by `npm run media`, Wikimedia Commons / Openverse, licensed):
  - `bg` (behind graphics): s1 "server racks data center", s4 "hand tools wrenches", s6 "stack of documents office desk" (overloaded
    with information), s7 "industrial robot arms assembly line" (jobs at the same time), s10 "stopwatch" (faster),
    s12 "headset customer support" (support bot), s16 "notebook and pen", s17 "magnifying glass on document" (evidence).
    s9 and s15 deliberately have no backdrop.
  - full-screen `broll`: s5 "team working at whiteboard" (a team still wins), s11 "empty spreadsheet on screen"
    (no numbers shared), s14 "parcel delivery van daytime" (the skipped delivery date).
- **Sound:** whoosh on every cut (engine default per transition), click/pop on every emphasis word, the heaviest hit on the
  catch (s12, shake). No music bed change needed.
- **Hook frame (0–1.5 s):** dark server-rack footage drifting behind; "When one AI beats a team" slams in word by word with "one"
  in accent colour; under it 5 bots vs 1 bot pop in; at "frequently" (~0.6 s) the camera punches in and "frequently" pops in the caption band.
  At ~2.6 s, flash cut to the real Anthropic receipt ("Anthropic found").
- **Loop:** ends on the same 1-vs-team question the hook posed ("One AI or a team?"), so a replay lands back on the matchup.

## Style

Primary: **C, fast creator reel** (something changes every ~1 s, big text that matches the voice, short spoken chunks), because
the reviewer's note is about energy and every high-view reference above is built that way.
Secondary: **A, paper-trail documentary** (Vox / ColdFusion pages on screen): the receipt at 2.6 s and the highlighted
Anthropic quote at ~20 s keep the hedged claim trustworthy while the pace goes up. The B-style `versus` metaphor stays as the
recurring picture, rebuilt rather than repeated.
