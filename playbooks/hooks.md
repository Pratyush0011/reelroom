# Hook playbook

The hook is the first 1 to 3 seconds. On short-form feeds most people decide in that window
whether to keep watching. Everything else in the reel only matters if the hook works.
A hook has one job: **make the viewer need the next sentence.**

## 1. The three layers (they must agree)

Every hook is delivered three ways at once, and all three must point at the same idea:
1. **Spoken hook:** the first line of voiceover.
2. **Text hook:** the on-screen headline, 3 to 6 words, huge, readable on mute.
3. **Visual hook:** what moves on screen in frame 1 (a number slamming in, a strike-through, a before/after split, a logo being crossed out).

Many people watch on mute, so the text hook must work alone. The text is a compressed version of the spoken line, not a copy of it.

## 2. Hook archetypes

Write hooks across several of these, then let the critic pick. Each is a different psychological lever.

| Archetype | Lever | Pattern | Example shape |
|---|---|---|---|
| Curiosity gap | Missing information creates an itch (Loewenstein's "information gap") | Reveal that something surprising exists, withhold what it is | "Google just quietly changed how you'll search. Most people missed it." |
| Contrarian / snapback | Challenges a belief the viewer holds | Common belief → "but" → reversal | "Everyone's calling this the end of coders. The data says the opposite." |
| Stakes / consequence | Loss aversion, self-relevance | What it costs or gives *you* | "If you use ChatGPT for work, this update changes your bill." |
| Number shock | Concrete magnitude | Lead with a specific, surprising number | "₹0. That's what this model costs to run on your laptop." |
| Before / after | Contrast is processed instantly | Old state vs new state | "Last year this took a studio. Now it takes one prompt." |
| Insider reveal | Status, being early | "Here's what the announcement didn't say" | "Buried on page 14 of the paper is the real story." |
| Direct address | Self-relevance | Name the viewer's identity | "Students: stop paying for this tool." |
| Timeline urgency | Fear of missing out (only if true) | Deadline or window | "You have until Friday to claim this for free." |
| Myth bust | Correcting a viral claim | "That viral clip is fake. Here's how we know." | |
| Question (non-yes/no) | Open loop | A question the viewer can't answer yet | "Why is every AI company suddenly buying power plants?" |

## 3. Kallaway's 3-step hook (for spoken hooks)

A reliable structure from creator Kane Kallaway, useful when a story needs a little set-up:
1. **Context lean-in:** establish the topic and why it matters to the viewer (common ground, a pain, a benefit).
2. **Scroll-stop interjection:** a short pivot line, usually turning on "but".
3. **Contrarian snapback:** the surprising reversal that opens the loop the rest of the reel closes.

Compress all three into about 2 to 3 seconds of speech. Example shape:
"Every AI company says their model is the smartest. But one of them just admitted it isn't. And that's the most honest thing in AI this year."

## 4. Hard rules

- **The say-back test (most important).** After hearing the hook once, a stranger must be able to repeat it in
  their own words. If they'd ask "wait, what?", it fails. Clarity beats cleverness every time.
- **One idea per hook.** Never two competing claims ("X won by 90%… now Y wins") in the opening. Pick one.
- **No number to decode.** A percentage or multiplier must say *of what* in the same breath, in everyday words,
  or it stays out of the hook. "90.2% better" means nothing; "five AIs beat one" is instantly clear.
- **No riddles that need context** ("Both are true", "It's complicated", "Here's the twist") as the payoff of the hook.
  A question is fine if a 12-year-old would understand the question itself.
- **Everyday words:** "a team of AI bots", "one AI assistant", not "multi-agent system", "subagents", "eval".
- **Subject in the first 3 words.** The viewer must know what this is about immediately.
- **No warm-up.** Never start with "Hey guys", "So", "In today's video", "Did you know", "Let's talk about".
- **Specific beats vague.** "Cut costs by 90%" beats "way cheaper". Names beat "a company".
- **Promise only what the reel pays off.** Every hook implies a promise; the script must deliver it, ideally within 15 seconds.
- **Truth gate.** The hook may only rely on claims marked `verified` or `verified_with_wording` in `02-claims.json`, using the safe wording. A hook that overstates the facts is rejected no matter how strong it is. Clickbait that the video doesn't support destroys trust and the comment section.
- **Text hook: at most 6 words.** If it needs more, the idea isn't sharp enough.
- **Spoken hook: at most 16 words**, ideally 8 to 14 (the code gate hard-stops at 20).

## 5. Output contract (`03-hooks.md`)

```
## Angles
A1: <angle in one line: who it's for + the consequence>
A2: ...
A3: ...

## Hooks
| # | Angle | Archetype | Spoken hook | Text hook (≤6 words) | Visual hook (frame 1) | Claims used |
|---|---|---|---|---|---|---|
| H1 | A1 | number shock | ... | ... | ... | C2, C4 |
... (12 hooks, at least 5 different archetypes)
```
