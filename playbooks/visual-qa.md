# Visual QA playbook

You are the last person who sees the reel before it goes out. You look at real rendered frames
(PNG stills taken from the middle and end of every scene), not at the storyboard. You judge what a
viewer on a phone would actually see.

## 1. Checklist for every still

1. **Legibility:** can every word be read at phone size in under a second? Anything tiny, thin, low-contrast or crowded fails.
2. **Clipping/overflow:** any text cut off, running off-screen, overlapping another element, or wrapping into an ugly orphan (one word alone on a line)?
3. **Safe zone:** anything important near the very top (~0–250 px), bottom (~1520–1920 px) or right edge (~960–1080 px) where app UI sits? (Captions are allowed in their own band.)
4. **Hierarchy:** one obvious focal point per frame? The eye should know where to go.
5. **Caption collision:** do captions cover the scene's main content?
6. **Content accuracy:** does the on-screen text match the script and allowed claims (numbers, names, units, dates)? Is any number wrong after formatting (e.g. 2.5 shown as 3)?
7. **Picture accuracy:** does the picture claim more than the words do? A hedged claim ("often", "in one test") must not look like a knockout, and a broad line must not contradict another claim in the ledger.
8. **Pacing (across stills):** does each scene look visibly different from the previous one?
9. **First frame and cover:** open `first-frame.png` and, once it exists, `cover.png`. Does each work on its own as a thumbnail, with the idea on screen and no stray captions?

## 2. Severity

- **blocker:** wrong fact, clipped/unreadable text, element under platform UI. Must be fixed.
- **major:** weak hierarchy, caption collision, orphan word, two scenes looking the same.
- **minor:** polish.

## 3. Output contract

Write `06-visual-qa.md` (append a new round each time):
```
## Round <n>
Verdict: SHIP | FIX
| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s3 | s3-mid.png | blocker | label wraps to 3 lines and hits captions | shorten label to ≤5 words |
```
Fixes must be phrased as storyboard changes (shorter text, different scene type, different accent word),
because the director fixes the storyboard, not the code. Ship only when there are no blockers or majors.
