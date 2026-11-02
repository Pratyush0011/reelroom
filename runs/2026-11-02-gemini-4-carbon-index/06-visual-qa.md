## Round 1
Verdict: FIX
| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s1, s2, s3, s4, s5 | s1-mid.png ... s5-end.png | blocker | Source chip is cut off mid-date: "Google (blog.google), Koray Kavukcuoglu, 2026-10". The "-28" and the "+N" count are lost. It shows on 10 stills. | Reorder `claims` so a claim with a short source label comes first. s1: `[C2, C0, C9, C17]` (chip reads "Artificial Analysis, 2026-10-28 +3", which suits the AA rank shown). s2 to s5: `[C9, C0]` (chip reads "Google (blog.google), 2026-10-28 +1", which already fits in s16). |
| s8, s9, s15, s17 | s8-mid.png ... s17-end.png | blocker | Source chip is cut off: "Artificial Analysis comparison page (fetched 202". This comes from the first checked source of C3. | s17: `[C9, C3]`. s9 and s15: put C2 first (`[C2, C3, C17]`, `[C2, C3, C16, C17]`), since both rely on the 59. s8 cannot be fixed by reordering because no short-label claim fits a scene that shows only "Opus 58 as of 2 Nov". Ask the fact-checker to shorten C3's first `checked_sources.publisher` to something like "Artificial Analysis (fetched 2026-11-02)", or have the chip shorten with an ellipsis or wrap. |
| s9 | s9-mid.png | blocker | The count-up is still running at mid-scene. It shows Carbon (high) **57** vs Opus (max) **12**, with a near-empty Opus bar. The scene is only 1.6 s long ("One point behind."), so wrong numbers and a knockout-looking gap fill about half of it while the voice says "one point". | Change s9 from `compare` to a `statement` with no animated numbers. For example, text "Just 1 point apart · AA Index v5, as of 2 Nov" with accent "1 point". s7 and s8 already show 59 (high) and 58 (max). A statement may follow s8's stat. Do not use `stat`, because two stat scenes in a row are invalid. |
| s11 | s11-mid.png, s11-end.png | major | The document scene has no page screenshot, only the quote card on a blank blue background, with large empty areas above and below. Cause: `assets.json` still uses the old 15-scene numbering (s3, s10, s12). The scene split moved the documents to s3, s11 and s14, and `npm run shots` was not re-run. | No storyboard change needed. Re-run `npm run shots` against the current 17-scene storyboard so `assets.json` maps s11 and s14. |
| s14 | s14-mid.png, s14-end.png | major | Same problem: no Vals AI screenshot is rendered, so the receipt is missing. | Same fix as s11. Then see the next row. |
| s3, s11, s14 | s3-mid.png, s3-end.png (and the captures in public/runs/.../doc-s3/s10/s12.png) | major | None of the captures shows the quoted line. Google (s3) shows only the title, byline and hero, not "a subset of cyber defenders". AA v5 (old s10) shows the header and intro, not "Claude Opus 5.5 (max) leads at 58". Vals (old s12) shows "ranks #2 of 32 models ... 70.45%" but never names Claude Sonnet 5.5. None is blank or a cookie banner. | Recapture each page scrolled to the quoted passage. The schema has no anchor field, so this is a shots change. If the Vals passage with Sonnet can't be captured, change s14's quote to a line the page does show only after the fact-checker adds it as a checked quote for C16. |
| s13 | s13-mid.png, s13-end.png | major | The catch text wraps to 3 lines and the last line starts with the separator: "· as of 2 Nov". That leaves an ugly near-orphan line. The text also repeats s12's note word for word. | Shorten `text` to something like "Carbon is #2 on Vals AI (about 70%)". The date already appears on s12 and s14. |
| first frame | first-frame.png | minor | Carbon shows its final 59 with "(high)" and "AA Index v5 · as of 2 Nov", which is good. But a caption fragment "GOOGLE'S NEW AI" floats under the card. | Render `cover.png` in cover mode (no captions) and use it as the thumbnail. No storyboard change. |
| s12 | s12-end.png | minor | The note "Vals AI: #2 (about 70% / accuracy) · as of 2 Nov" wraps to 2 lines of small mono text, and the top edge of its box sits at about y 234, just inside the top UI band. | Shorten `note` to "Vals Index · as of 2 Nov" so it fits on one line like the AA notes. "About 70%" stays in s13. |
| s15 | s15-end.png | minor | The verdict stamp "ON 1 RANKING" sits directly above the caption "ON ONE RANKING". The two read the same, so they compete for attention. | Change `verdict` to something that adds information, e.g. "Not #1 on Vals AI" (C16), or drop it. |
| s8 | s8-end.png | minor | The context line "AA Index v5 · as of 2 Nov" is pale pink on hot pink, which is low contrast. | Use a darker `world` such as `ink` or `violet` for s8, or accept it as is. |
| s9 | s9-end.png | minor | The metric "1 POINT, AS OF 2 NOV" is small grey mono text on a beige stripe background. | This goes away if s9 becomes a statement. |
| s11 | s11-end.png | minor | The card header wraps as "ARTIFICIAL ANALYSIS · ARTIFICIALANALYSIS.AI ·" with a dangling dot, and "27 OCT 2026" falls to a second line. The emphasis pill "BRAND-NEW" overlaps the S of "THIS" in the caption. | Shorten `publisher` to "AA". Optionally move the emphasis to "ranking". |
| s11 (capture) | doc-s10.png | minor | If this capture is re-attached unchanged, its body text contains "launched" and "launching", about v4 and Progress Index, not Carbon. The text is small, but it is the word we avoid. | Recapturing at the "leads at 58" passage (see above) avoids it. |

Checks that pass:
- Every 59 has "(high)" and every Opus 58 has "(max)" (s1, s7, s8, s9, s10, s11).
- Every AA rank carries "AA Index v5 · as of 2 Nov". s9 shows "as of 2 Nov" plus "AA Index v5" on each side. The 27→28 Oct board (s10) shows only "AA Index v5", as intended.
- The dimmed Opus row in s7 is readable lavender on deep purple, not ghosted.
- No "launched" appears in any rendered text. s5 says "Announced 28 Oct".
- No caption covers scene content. The two-line captions in s10 and s11 sit tight above the source chip but do not touch it.
- No key text sits under the right-edge UI band.
- Consecutive scenes look visibly different.
- The Vals capture's "70.45%" agrees with "about 70%" and shows Carbon at #2.

## Round 2
Verdict: SHIP
| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s9 | s9-mid.png, s9-end.png | minor | The statement runs 10 words in headline type over 4 lines ("Just 1 point / apart · AA / Index v5, / as of 2 Nov"), which splits "AA Index v5" across two lines, in a 1.6 s scene. The orange "1 point" still gives a clear focal point, and every number is correct. | Optional: shorten `text` to "Just 1 point apart, as of 2 Nov" if the check allows it. s7 and s8 directly before already carry "AA Index v5". |
| s14 | s14-mid.png, s14-end.png | minor | The card header says "AS OF 2 NOV", but the crop right behind it is Vals' update dated "Oct 28, 2026" (#2 of 29, 70.36%). A viewer who pauses sees two dates. The rank and the Sonnet 5.5 leader agree either way. | Optional: set `date` to "28 Oct 2026" to match the visible snippet. s12's note keeps "as of 2 Nov" for the rank. |
| first frame | first-frame.png | minor | Unchanged: the caption fragment "GOOGLE'S NEW AI" sits under the card. Otherwise the frame works as a thumbnail: the final 59 with "(high)" and the dated AA note. | Render `cover.png` in cover mode (no captions) for the thumbnail. |

Round 1 items re-checked:
- Source chips (s1–s17): all fit now. Examples: "Artificial Analysis · 2026-10-28 +3", "Google · 2026-10-28 +1", "Artificial Analysis leaderboard · 2026-11-02 +1", "Vals AI model · 2026-11-02". Fixed.
- s9 count-up: gone. The statement shows no animated numbers. Fixed.
- s11 and s14 screenshots: both rendered, and each crop shows the quoted line marked by the browser's text-fragment highlight ("leads at 58"; "#2 of 29 on the Vals Index (70.36%) … behind Claude Sonnet 5.5"). Fixed.
- s3 screenshot: the crop contains "...available to a subset of cyber defenders" with the light-purple fragment highlight, visible in the render just above the quote card. Fixed, even though the shots log didn't confirm it.
- s13: now 3 clean lines, "Carbon is #2 / on Vals AI / (about 70%)". Fixed.
- s12: the note is on one line, its box top is at about y 300, outside the UI band, and it is still readable. Fixed.
- s15: the duplicate stamp is gone. Fixed.
- s8: blue background, and the context line is readable. Fixed.
- s11: the header fits on one line ("AA · ARTIFICIALANALYSIS.AI · 27 OCT 2026"), and the caption pill no longer overlaps. Fixed.

Director's questions:
1. Google crop and "launch": the visible crop starts after the Argon "launched two weeks ago" sentence, so that line isn't in frame. The only form shown is "Gemini 4 Carbon will launch at the same introductory price…". That is future tense, sits next to "deliberate approach to rollout… before making Carbon available to developers, businesses, and consumers… as soon as possible", and supports "not public yet" rather than contradicting it. It is Google's own page text, and at phone size it is about 6 px tall and unreadable. Acceptable as is. Our own text never says "launched".
2. Vals crop: it reads "#2 of 29 on the Vals Index (70.36%) … behind Claude Sonnet 5.5 (70.85%) and ahead of Claude Opus 5.5 (70.18%)". That directly supports "#2 behind Claude Sonnet 5.5", and 70.36% (70.45% on the live page) is consistent with "about 70%". Opus at 70.18% sits below Carbon on a different index, which doesn't conflict with the AA story, and the figures are unreadable at phone size anyway. No contradiction.

Checks that still pass:
- Every 59 has "(high)" and every Opus 58 has "(max)".
- Every AA rank shows "AA Index v5 · as of 2 Nov", and s10 deliberately shows only "AA Index v5".
- The dimmed Opus row in s7 is readable.
- No "launched" appears in our text.
- No caption collides with content, and no key text sits in a UI band.
- Consecutive scenes look visibly different.
