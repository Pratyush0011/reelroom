---
name: reel-inspiration
description: Research what is trending and working for a topic before storyboarding a reel. Finds real short-form videos (YouTube Shorts, Instagram Reels, TikTok) and documentary explainers (Vox, Johnny Harris style) on the same or an adjacent topic, deconstructs their hooks, pacing and motion devices, and turns that into a concrete motion recipe mapped to reelroom's engine. Use before writing any storyboard.
---

# Reel inspiration

A reel nobody watches is usually a reel where nothing happens on screen. Before you storyboard, you study what's
actually working **for this topic, right now**, and steal the *techniques* (never the footage, voice or identity).

## 0. What the market actually looks like (measured Oct 2026)

Frames from Shorts by Fireship, Kurzgesagt, Zack D Films, Cleo Abram, Johnny Harris, Vox, Varun Mayya, Dhruv Rathee,
Mrwhosetheboss, Veritasium, Jeff Su and NileRed. Median: brightness 107, colourfulness 47, 22% dark pixels, frame-to-frame
variety 0.57. Patterns: bright full-frame images, one giant subject, very little on-screen text, small captions. Faces carry
most of them; the faceless winners use vivid illustration or 3D characters. Dark cards full of text are the opposite of this.
Fast cuts alone don't fix a reel that looks the same on every cut.

## 1. Search (run at least 6 searches)

Use the story's plain-language topic (e.g. "one AI vs team of AI agents"), not jargon.
- `site:youtube.com/shorts <topic>` and `<topic> shorts`
- `site:instagram.com/reel <topic>` and `site:tiktok.com <topic>`
- `<topic> explained` (look for Vox, Johnny Harris, Cleo Abram, ColdFusion, Kurzgesagt, Fireship, Varun Mayya, MKBHD)
- `trending AI reels this week` / `viral AI explainer short <month year>`
- If results are thin, widen to the adjacent topic (e.g. "AI agents", "ChatGPT vs team of AIs", "AI automation").

## 2. Shortlist at least 5 references

- **At least 3 short-form** videos (YouTube Shorts, Instagram Reels or TikTok) on the same or an adjacent topic,
  preferring high view counts and the last 6 months.
- **At least 1 long-form documentary explainer** (Vox / Johnny Harris / similar) on the topic or the technology.
- Open each with WebFetch. Record: title, creator, URL, date, views/likes if shown, and anything the page reveals
  (description, chapters, transcript, thumbnail text). Never invent view counts; write "not shown".

## 3. Deconstruct each one

For every reference, note:
| Field | What to write |
|---|---|
| Hook device | What happens in the first 2 s (question on screen? shocking number? object slams in? fast zoom?) |
| Cut pace | Estimated seconds per visual change (shorts that work: 0.8–2 s) |
| Motion devices | From the catalogue below |
| Text style | Big kinetic captions? Highlight words? Emoji/icon pops? |
| Sound | Whooshes on cuts, pops on words, music drops? |
| Ending | Loop, question, cliffhanger? |

## 4. Motion catalogue (what the reelroom engine can do)

| Device | Engine feature |
|---|---|
| Punch-in zoom on a key word | scene `emphasis: ["word"]`: camera punches in, the word pops as a sticker, a click SFX plays |
| Whip pan / zoom-through / glitch / flash transitions | scene `transition: "whip" \| "zoom" \| "glitch" \| "flash" \| "slide"` (with whoosh SFX) |
| Camera shake for tension | scene `shake: true` |
| Real-world B-roll behind graphics | scene `bg: {query: "..."}` (auto-fetched, licensed, darkened, Ken Burns) |
| Full-screen B-roll moment | scene type `broll` with `media: {query}`, `kicker`, `headline` |
| Paper trail / receipt | `document` (real page screenshot + highlighter), `receipt` |
| Visual metaphor | `versus` (icon match-up), `merge` (icons combining) |
| Numbers that move | `stat` (count-up), `chart`, `compare` |
| Warning beat | `catch` |
| Illustrated idea with the robot character | `show` scene (`set`: versus, tools, overload, lanes, meters, locked, crash, parcel, runs, blocks) |
| Colour change on every cut | scene `world` |

## 5. Write the motion recipe → `<run_dir>/05b-direction.md`

```
## References (≥5; ≥3 short-form; ≥1 documentary)
| # | Type | Title — creator | URL | Date | Views | Hook device | Cut pace | Motion devices | What I'm stealing |

## Motion recipe for this reel
- Target visual change every: ≤ 1.8 s
- Signature moves (3): ...
- Transitions: which, where
- Emphasis words per scene: rule (1–2 per scene)
- B-roll plan: which scenes get `bg` or `broll`, with search queries (concrete nouns: "server room", "office team meeting", "robot arm")
- Sound: where SFX land
- Hook frame (0–1.5 s): exactly what moves

## Style
Primary / secondary style from playbooks/references.md and why.
```

`npm run check` verifies this file exists with at least 5 reference URLs, at least 3 of them short-form
(youtube.com/shorts, instagram.com/reel, tiktok.com), and a "Motion recipe" section.
