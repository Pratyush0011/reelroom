# Visual direction playbook

You turn an approved script into a storyboard for the reelroom video engine. The engine has a
library of designed scene types; you choose the right one for each beat and fill in its fields.
You do not write React code; you write `storyboard.json`, which `src/schema.ts` validates.

## 1. Vertical grammar

- **Canvas:** 1080 × 1920, 30 fps, 9:16.
- **Safe zone:** the platform UI covers parts of the frame (status bar at the top, caption/username/buttons at the bottom, like/comment/share buttons on the right). The engine keeps every element inside a conservative safe zone that works across Reels, TikTok and Shorts. Don't try to place things at the edges.
- **One idea per frame.** If a scene needs two ideas, it is two scenes.
- **Change something at least every 2 s.** A new word, a counter ticking, a highlight, a new item. Static frames bleed viewers. Each scene type has built-in internal motion; choose types that keep the eye busy.
- **Read time:** on-screen text must be readable in the time it is on screen: about 3 words per second at most, and big. Fewer words always wins.
- **Mute-proof:** someone watching without sound should still get the story from on-screen text + captions.

## 2. Scene library (what each type is for)

| type | Use it for | Fields |
|---|---|---|
| `hook` | Beat 1 only. The text hook, slammed in word by word, with one accent word. | `headline` (≤6 words), `accent` (one word from headline), `kicker` (optional tiny label above, e.g. "AI NEWS") |
| `statement` | A key sentence that should land hard. | `text` (≤12 words), `accent` (word or phrase to highlight) |
| `stat` | A single striking number. The counter animates up. | `value` (number), `prefix`/`suffix` ("$", "x", "%", "M"), `decimals`, `label` (≤8 words), `context` (optional ≤10 words) |
| `compare` | Before/after, A vs B, old vs new. | `left` and `right`: `{label, value, note?}`; `winner` ("left"/"right"/"none"); `metric` (what's being compared). If both values are numeric, bars animate. |
| `list` | 2–4 items revealed one by one. | `title`, `items` (each ≤6 words) |
| `quote` | A short quote from a named person/org. | `quote` (≤20 words), `who`, `role` |
| `receipt` | Showing the source on screen: builds trust, great after a surprising claim. | `publisher`, `headline` (as published, ≤14 words), `date`, `url` |
| `chart` | 3–5 numbers that compare (benchmarks, prices). | `title`, `unit`, `bars`: `[{label, value, highlight?}]` |
| `catch` | The honest "but". A warning-style card. | `title` (e.g. "The catch"), `text` (≤14 words) |
| `cta` | Final beat. A comment/save prompt. | `prompt` (≤10 words), `sub` (optional) |
| `document` | **Paper trail.** The real source page (auto-screenshotted) drifts behind a pulled quote; `highlight` gets marked as it's spoken. Strongest trust moment in the library. | `publisher`, `quote` (≤24 words, **verbatim** from a checked source quote), `highlight` (phrase inside quote), `date`, `url` (a checked source) |
| `merge` | **Combining, shown.** Several icons fly together and become one bigger icon ("two helper bots merged into one"). The merge lands on the spoken word "merged"/"one". | `title?`, `from`: `{icon, count 2–6, label}`, `to`: `{icon, label}`, `caption?` (≤8 words) |
| `hook` + `matchup` | The hook can carry a small icon line under the headline (e.g. 5 bots VS 1 bot) so frame 1 shows the idea. | `matchup`: `{left: {icon, count}, right: {icon, count}}` |
| `versus` | **Visual metaphor.** Two icon groups face off (5 robots vs 1 robot, user vs bot…); the winner glows; a verdict stamp lands. | `title`, `left`/`right`: `{label ≤4 words, icon, count 1–6, caption?}`, `winner`, `verdict` (≤5 words). Icons: bot, user, users, brain, cpu, zap, clock, dollar, chart, search, code, file, shield, globe, phone, sparkles, wrench, database |
| `show` | **The default.** An illustrated set piece with the robot character (see "Look" below). | `set`, `title?`, `verdict?`, `left?`, `winner?`, `labels?` (see `src/schema.ts`) |
| `broll` | A full-screen photo or clip with a slammed headline. | `media: {query}`, `kicker?`, `headline`, `accent?` |

## Look: colour worlds and illustrated ideas (read this first)

Measured against 12 top channels, a dark template with text cards is what "monotonous" looks like: brightness 45 vs 107,
variety 0.16 vs 0.57, 76% dark vs 22%. So:
- **Every scene is its own full-frame colour world** (`world`: blue, coral, yellow, teal, paper, violet, pink, sky, ink). Never the same world twice in a row. `ink` (near-black) only for the catch.
- **One giant idea per frame, almost no text.** The default scene type is `show`, an illustrated set piece with the robot character. Use `statement` rarely. Titles are 5 words or fewer; the voice does the explaining.
- `show` sets: `versus` (crowd vs one; `left`, `winner`, `verdict`), `tools` (AI with orbiting tools), `overload` (buried in paper), `lanes` (racing at the same time), `meters` (two gauges; `labels`), `locked` (padlock over hidden numbers), `combine` (two robots slide together into one), `parcel` (box + crossed-out calendar), `runs` (pass/fail tickets), `blocks` (stack; `left` = how many).
- Real photos stay at full brightness (`broll`), never dimmed behind text.
- If no set fits a new story, add a new set in `src/sets.tsx` instead of falling back to a text card.

`npm run look` measures the finished MP4 against the benchmark and must pass.

## Motion layer (applies to every scene)

Every scene can also set:
- `emphasis`: 1–2 words from `say` → camera punch-in + the word pops as an accent sticker *inside the caption band* + click SFX,
  exactly when spoken. Pick words that are **not already written big on screen** (repeating them adds noise, not energy).
- `transition`: `whip` | `zoom` | `glitch` | `flash` | `slide` (otherwise the engine cycles them).
- `shake: true` for tension beats (the catch).
- Scene type `broll`: a full-screen footage or photo moment with a slammed headline. Write **concrete object + setting + light**
  queries ("stack of documents office desk", "team working at whiteboard", "parcel delivery van daytime", "server racks data center").
  The fetcher skips politicians, brands/ads, money/stamps and weapons, and rejects near-black clips. Visual QA checks every
  pick; if a query keeps returning off-topic footage, rephrase it or use a `show` scene instead.

**Pace is enforced by `npm run check`:** a visual change (cut or emphasis) at least every 2.0 s on average, and no
scene longer than 4.5 s. Plan for 15–24 scenes in a 40–50 s reel: split voice lines across scenes (words unchanged).

Rules of thumb:
- **Pick your reference style first** (`playbooks/references.md`) and write `05b-direction.md` before the storyboard.
- **No scene longer than 4.5 seconds of voice (about 10 spoken words).** If a script beat is longer, split it across two scenes with different visuals. Long static scenes are the #1 reason a reel feels like a slideshow.
- **Never reuse the same visual layout for two different ideas.** If `versus` appears twice, the second must look different (different icons/counts, winner on the other side, or a different scene type).
- **The picture must agree with the voice at that moment.** Don't show a winner while the voice says "here's when it doesn't".
- **Keep the hedge in the picture.** If the claim says "often" or "in one test", the scene's title or verdict must say so too. A crash or a defeated bot makes a hedged claim look like a knockout.
- **Show, don't write:** prefer `show`, `document`, `stat` and `compare` (pictures and numbers) over `statement` (sentences). Use at most two `statement` scenes per reel.
- Start with `hook`. End with `cta`.
- Put a `receipt` right after the most surprising claim. On-screen receipts are this channel's signature.
- Use `stat` or `compare` for any number that matters; never bury a big number inside a sentence card.
- Don't use the same type twice in a row (except `statement` if the beats really are two lines of argument, or `show` with a different set and world).

## 3. Voice and timing

- Each scene has `say`: the exact voiceover for that scene, copied from the script's voiceover lines (spoken form, numbers written out).
- Scene length is decided by the voice: the engine generates speech per scene and sizes each scene to fit, plus a small pause. So you never set durations.
- Captions are generated from the voice with word-level timing and shown in the lower-middle area automatically.

## 4. Sources on screen

Every scene that shows a fact should carry `claims: ["C2", ...]`. The engine shows a small source chip
(publisher name) so viewers see where each fact comes from. `npm run check` rejects scenes that cite
claims that are not `verified` / `verified_with_wording`.

## 5. Output contract

Write `storyboard.json`:
```json
{
  "title": "...",
  "voice": "en-US-AndrewMultilingualNeural",
  "scenes": [
    {"id": "s1", "type": "hook", "say": "...", "headline": "...", "accent": "...", "claims": ["C2"]},
    ...
  ]
}
```
`voice` is optional; it defaults to the one in `brand.json`. Then run `npm run check -- <run-dir>` and fix every error before handing back.
