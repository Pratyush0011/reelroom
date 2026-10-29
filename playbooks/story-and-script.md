# Story and script playbook

A good reel is a tiny story: a question opens in second one and closes in the last second,
and every beat in between gives the viewer a reason to stay for the next.

## 1. Story engines

### And / But / Therefore (the spine)
Randy Olson's ABT and Trey Parker & Matt Stone's "but / therefore" rule: beats connected by
"and then... and then..." are boring; beats connected by **"but"** (a complication) and
**"therefore"** (a consequence) pull people forward. Read your beat list aloud with the
connecting word between each beat. If most connectors are "and", rewrite.

### Open loops
An unanswered question keeps attention (people remember interrupted tasks better than finished ones,
the Zeigarnik effect). Open the main loop in the hook. Inside the reel, open small loops before closing
the previous one ("but that's not the wild part..."), so there is always one question in the air.

### Re-hooks
Every 6 to 8 seconds, give a new reason to stay: a reveal, a number, a contrast, a "but". On a retention graph
the dips come where nothing new happens.

### Payoff early, payoff often
Deliver the hook's promise early (by ~15 s), then keep adding value. A delayed payoff that never arrives
reads as clickbait.

## 2. Templates for AI stories

Pick the one that fits the facts, don't force facts into a template.

1. **The consequence explainer:** Hook → what happened (1 line) → why it matters to *you* → the surprising detail → the catch → what to do/watch → loop-back line.
2. **Myth vs reality:** Viral claim → "here's what's actually true" → evidence 1, 2 → the real takeaway.
3. **Before / after:** How it used to work → what changed → the new number → who wins/loses → catch.
4. **Three things:** "3 things in X's announcement nobody's talking about" → each thing is a mini-reveal, best saved for last.
5. **Head-to-head:** A vs B on 2-3 criteria the viewer cares about → verdict with honest caveat.

## 3. Writing for the ear

- **Pace:** natural narration is around 150 words per minute (~2.5 words per second). A 35 s reel is ~85 words. Hard limits come from `brand.json`.
- **Short sentences.** Average under 12 words. One idea per sentence. Fragments are fine.
- **Concrete over abstract.** "It wrote a working app in 4 minutes" beats "it's very capable".
- **Make numbers human** (Chip Heath, *Making Numbers Count*): translate magnitudes into something felt, but only with a correct comparison. "1 million tokens, about 8 Harry Potter books' worth of text" (check the math).
- **Make it stick** (Heath brothers, *Made to Stick*, SUCCESs): Simple, Unexpected, Concrete, Credible, Emotional, Story. Each reel should hit at least Simple, Unexpected, Concrete and Credible.
- **Explain jargon in passing**, never stop to define it: "a context window, the amount it can read at once, of..."
- **Attribution in the voice,** not just the screen: "Google says", "according to the paper". This is how honest reels sound.
- **Spell numbers the way you'd say them** in the voiceover text ("two point five times", "forty dollars a month") so text-to-speech reads them right. The on-screen text can use digits.

## 4. Endings

- **Loop ending:** the last line flows back into the first ("...and that's why everyone's talking about [hook topic]"), so replays feel seamless.
- **Comment prompt:** a specific question people *want* to answer ("Would you pay $20 for this? Yes or no.") beats "let me know in the comments".
- **Save prompt:** if the reel is a tip/tool list, "save this for later" is a natural ask.
- Never end with "that's it" or "thanks for watching".

## 5. Banned phrases (they signal low-effort AI content)

game-changer, game changing, revolutionize, revolutionary, mind-blowing, in today's fast-paced world, buckle up,
let's dive in, dive into, delve, unleash, unlock the power, the future is here, it's not just X it's Y,
here's the kicker, but wait there's more, without further ado, crazy (as filler), insane (as filler).

## 6. Script output contract (`04-script.md`)

```
# Script: <title>
Template: <which template>
Hook: H<n> (from 03-hooks.md)
Target duration: <s>  Word count: <n>

| Beat | Purpose (hook / context / reveal / re-hook / catch / payoff / cta) | Voiceover line | On-screen text | Claims |
|---|---|---|---|---|
| 1 | hook | ... | ... | C2 |
| 2 | context | ... | ... | C1 |
...

## ABT check
<read the beats with and/but/therefore between them>

## Post kit
Caption: <2-3 lines, first line is a second hook>
Hashtags: <5-8, specific>
First comment: Sources: <short list of the tier-1 links used>
```
Every beat that states a fact must list its claim IDs, and those claims must be `verified` or
`verified_with_wording` (using `safe_text`). `npm run check` enforces this.
