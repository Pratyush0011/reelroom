# 06 Visual QA

## Round 1
Verdict: FIX

Stills reviewed: s1–s7, mid + end (14 PNGs, 540x960 half-res; zones halved). Captions are word-synced, so single caption words are expected and not flagged.

| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s1 | s1-mid.png, s1-end.png | blocker | Source chip is clipped mid-word: "Anthropic Engineering + Anthropic (claude.co" runs out of the pill with no ending. The hook is the thumbnail frame, so a cut-off line shows here first. | Make the hook cite one publisher only. Either drop C13 from s1 `claims` and take the "ninety point two percent" line out of s1 `say` (s2 already carries 90.2% with C13), or keep C13 and drop C2/C0, moving "one AI frequently wins" into s3 voice. |
| s2 | s2-mid.png, s2-end.png | major | Label wraps so "2025" sits alone on its own line, an orphan under the big number. | Shorten `label` so it fits one line, e.g. "Team vs solo AI, 2025" (or "AI team vs solo, 2025"). |
| s4 | s4-mid.png, s4-end.png | major | Statement wraps to 4 lines and two of them are single words ("figures", "published."). It reads as a ragged block, not a punch. | Shorten `text` to 5 words or fewer, e.g. "Often cheaper, faster. No numbers." Keep accent "Often" and keep the no-figures caveat (C2). |
| s6 | s6-mid.png, s6-end.png | major | The key figure is split across lines: "delivery date · 1 of" / "2 runs". The "1 of 2" fact is broken in half. | Shorten `text` so "1 of 2 runs" stays together, e.g. "Bot skipped delivery date in 1 of 2 runs" is still long; prefer "Skipped the delivery date: 1 of 2 runs" or move "Sample bot" into `title` ("The catch: sample bot") and set `text` to "Skipped delivery date · 1 of 2 runs". |
| s7 | s7-mid.png, s7-end.png | major | Prompt wraps to 4 lines with "pick." alone on the last line. It also repeats the button ("TELL US IN THE COMMENTS"), so the frame stacks headline, sub, button, chip and caption with no clear single focus. | Shorten `prompt` to the question only, e.g. "Team of AIs, or one?" and let the button do the comment ask. |
| s1 | s1-end.png | minor | The hook headline has no number, so the thumbnail does not show the 90.2% vs "one wins" tension. It is still bold and readable. | Optional: none needed once the blocker is fixed. |
| s1/s7 | s1-end.png, s7-end.png | minor | The opening and closing headlines are almost the same words. They work as bookends and the layouts differ, so this is fine. | No change required. |

Checks passed:
- **Accuracy:** +90.2% is shown with "Anthropic internal research eval" and 2025 (C13). The receipt title and the 22 Oct 2026 date match C1. "Often cheaper and faster / no figures" matches C4 and C2. The two "helpers still have their place" conditions match C9. "Sample bot ... 1 of 2 runs" matches the C8 note. "Anthropic, Jan 2026: start simple, add only with evidence" matches C12. No number is wrong after formatting.
- **Safe zones:** only the progress bar and @handle sit in the top band. All content stays left of x≈470 (≈940 full-res) and above the bottom 1520 px zone.
- **Caption collision:** none. Captions sit in their own band under the source chip.
- **Pacing:** each scene uses a different layout (hook, stat, tilted receipt card, highlight statement, numbered list, hazard-striped catch, CTA).
- **Legibility:** all type is large and high-contrast. Only the s1 chip is cut off.

VERDICT: FIX

## Round 2
Verdict: FIX

Re-opened all 14 re-rendered stills (540x960). Checked the Round 1 items and ran the full checklist again.

Round 1 items:
- s1 chip: **fixed.** It now reads "Anthropic Engineering +1" and fits inside the pill. The headline also re-balanced to "Team of / AIs or / just *one?*".
- s2 label: **fixed.** "Team vs solo AI, 2025" now sits on one line.
- s6: **fixed.** The tag reads "CATCH: SAMPLE BOT" and the text wraps as "Skipped the / delivery date / in 1 of 2 runs", so "1 of 2 runs" stays together.
- s7: **fixed.** The prompt "Team of / AIs, or one?" is 2 lines with no orphan, and it no longer repeats the button.
- s4: **not fixed.** See the table.

| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s4 | s4-mid.png, s4-end.png | major | "Often cheaper, faster. No figures." wraps as "Often cheaper, / faster. No / figures." So "figures." is alone on the last line, and "No figures", the phrase that matters, is split across two lines. | Change `text` so the caveat can't break. Preferred: "Often cheaper and faster." (wraps cleanly "Often cheaper / and faster."). The "no figures" caveat (C2) still reaches the viewer through the voice and the "NO FIGURES THOUGH" caption. To keep it on screen instead, use "Often cheaper. No figures." Accent stays "Often". |
| s1 | s1-mid.png, s1-end.png | minor | "+1" on the source chip is a bit cryptic, but it is legible and not clipped. | No change required. |

Checks passed:
- **Accuracy:** s2 still shows 90.2% (one decimal) with "Anthropic internal research eval" and 2025 (C13). The s6 text matches C8 (delivery date skipped in 1 of 2 runs, sample bot). The s7 sub matches C12. s3, s4 and s5 are unchanged and match C1, C4/C2 and C9.
- **Safe zones:** nothing important sits in the top or bottom UI bands, and content stays left of about 940 px full-res.
- **Caption collision:** none.
- **Pacing:** all seven scenes look different.
- **First frame:** the hook frame is bold and clean.

VERDICT: FIX

## Round 3
Verdict: SHIP

Re-opened all 14 re-rendered stills (540x960) and ran the full checklist again.

Round 2 item:
- s4: **fixed.** "Often cheaper. No figures." now sits on 2 clean lines: "*Often* cheaper." / "No figures.". "No figures" stays together and no word is left alone on a line. The accent "Often" is still the one focal point.

| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s4 | s4-mid.png, s4-end.png | minor | The on-screen text now says "cheaper" only, while the voice says "cheaper and faster". It is still accurate (C4: lower cost and latency) and the voice and caption carry "faster". | No change required. |
| s1 | s1-mid.png, s1-end.png | minor | "+1" on the source chip is a bit cryptic, but it is legible. | No change required. |

Checks passed:
- **Unchanged since Round 2:** s1, s2, s3, s5, s6 and s7 look the same as in Round 2. There is no clipping and no word left alone on a line.
- **Accuracy:** 90.2% is still shown with "internal research eval" and 2025 (C13). The receipt title and 22 Oct 2026 date match C1. s4 matches C4/C2. s5 matches C9. "1 of 2 runs" on the sample bot matches C8. "Jan 2026: start simple, add only with evidence" matches C12.
- **Safe zones:** nothing important sits in the top or bottom UI bands or at the right edge.
- **Caption collision:** none. Captions stay in their own band.
- **Pacing:** the seven scenes are visually distinct.
- **First frame:** the hook frame is strong as a thumbnail.

No blockers or majors remain.

VERDICT: SHIP

## Round 4 (v2)
Verdict: FIX

Version 2 storyboard (11 scenes, new `versus` and `document` scene types). I opened all 22 stills (540x960 half-res; zones halved). Captions are word-synced, so caption fragments are expected and not flagged.

| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s6 | s6-mid.png, s6-end.png | major | The "real Anthropic page" behind the quote card is blank. Only the claude.com nav bar and a "Claude Resources" strip render, and the body is empty off-white. It looks like a page that failed to load, so it hurts the receipt instead of proving it. | Re-capture the page so the visible area shows the article title "Building agents: When to fold subagents into your main agent loop" and the byline or date. Point the capture at the headline area, not the empty top of the page. If no good capture is possible, drop the page image and keep the card alone. |
| s2 | s2-mid.png, s2-end.png | major | The picture contradicts the voice. The voice says "Here's when it doesn't", but the frame shows One AI winning (green, highlighted) with "Frequently. Not always." The "doesn't" picture only comes in s4. s3 then restates the same win in plain text, so s1, s2 and s3 all show the same idea. | Make s2 the open matchup: no `winner`, `verdict` "Who wins?", and change `say` to set up the contest. Or keep s2 as the winner card and delete s3, which only repeats it, then move "Here's when it doesn't" to the start of s4's `say`. |
| s7 | s7-mid.png, s7-end.png | major | The layout repeats s2: same 5-bot team on the left, highlighted One AI on the right, and a tilted stamp below. Only the icon (zap) and the title differ. Two scenes that look the same. | Change the scene type. "Often cheaper, faster. No numbers shared." works as a `statement` with accent "Often", or as a `stat`-style frame. If it stays `versus`, change the comparison it draws (for example, cost vs speed tiles) so it does not mirror s2. |
| s7 | s7-mid.png, s7-end.png | major | The title wraps as "Cost and speed" / "· company use", so the second line opens on a stray "·". | Set `title` to "Cost and speed" only. "Company use" is already implied, and the voice carries it. |
| s11 | s11-mid.png, s11-end.png | major | The sub wraps "Anthropic: one AI frequently wins, not" / "always", leaving "always" alone on a line. The prompt also says "Comment your pick." right above the "TELL US IN THE COMMENTS" button, which is the same repeat flagged in Round 1. | Set `sub` to "Anthropic: frequently, not always" (one line). Set `prompt` to "One AI or a team?" and let the button ask for the comment. |
| s6 | s6-mid.png, s6-end.png | minor | The SOURCE chip overlaps the bottom edge of the quote card. The page image also runs to x≈500 (≈1000 full-res, inside the right-edge zone), and "Try Claude" is cut off at the right in s6-end. | Shorten nothing. Ask for the card to sit higher or the page image to be scaled in. If the director can only edit the storyboard, cut the quote to "subagents still have their place" (highlight unchanged) so the card is 2 lines shorter and clears the chip. |
| s4 | s4-mid.png, s4-end.png | minor | "Overloaded with information" exists only as small grey mono text. The One AI icon looks the same as in s2, so the picture does not show overload. | If the schema allows, use a different icon for the right side (for example a stack or file icon, `count` > 1) or shorten `caption` to "overloaded". |
| s1 | s1-mid.png, s1-end.png | minor | The hook is strong type but has no picture. It is still legible and bold as a thumbnail. | Optional: open on the s2 matchup visual (5 bots vs 1) with the headline above it. |
| s8 | s8-mid.png, s8-end.png | minor | "Two helper bots merged into one" is told in 4 lines of text, not shown. | Optional: shorten `text` to "Two helper bots → one" so it reads as a picture in 2 lines. |

Checks passed:
- **Accuracy:** "frequently, not always" matches C2 and C0's safe text. The s4 and s5 conditions match C9. The s6 quote is verbatim C2/C0 with the correct 22 Oct 2026 date (C1). "Often. No numbers shared." matches C4 and C2. "1 of 2 test runs: delivery date skipped, Anthropic sample support bot" matches the C8 note. The s10 quote is verbatim C12, "Claude blog, Jan 2026". No number is wrong. Nothing shows the false C16 or the press-headline wording as Anthropic's claim.
- **Legibility:** all main type is large and high-contrast. The smallest text, the versus card captions in grey mono, can still be read.
- **Safe zones:** only the progress bar and @handle sit in the top band, and nothing sits in the bottom band. The only edge issue is the s6 page image (minor).
- **Caption collision:** none. Captions stay in their own band under the chip.
- **First frame:** bold and legible, but text-only (see s1 minor).

Publishability (beyond the checklist): **not yet.** v2 is a clear step up. The `document` scene is the right idea, and the versus cards give the reel real pictures. Three things hold it back:
1. **Visual variety is still thin.** Of 11 scenes, 3 are the same versus card (s2, s4, s7) and 4 are big white text on the same dark gradient (s1, s3, s5, s8). s9, s10 and s11 are also type-only. The only scene with a real image is s6, and its image is blank. Scrolling through, the middle of the reel reads as text slide, card, text slide, card.
2. **A clear picture per idea: about half.** s2/s4 (team vs one) and s9 (1 of 2) land without the voice. s3, s5 ("jobs at the same time" could be parallel lanes or clocks), s8 (a merge could be 2 bots becoming 1) and s7 are told, not shown. s2's picture contradicts its own line.
3. **First frame:** clean and thumbnail-legible, but it is generic headline type that any AI page could post. The 5-vs-1 bot matchup is the reel's strongest image, and it is not on the first frame.

With the five majors fixed (most of all a real s6 page capture, and s7 no longer cloning s2), this would be a clean, credible, publishable explainer. Putting the matchup on the hook would make it stand out.

VERDICT: FIX

## Round 5 (v2)
Verdict: SHIP

I re-opened all 22 re-rendered stills (540x960) against the updated storyboard and ran the full checklist again.

Round 4 items:
- s6 page capture: **fixed.** The claude.com article page now renders: nav, the article's icon tile, the title "Building agents: When…", the Category/Product sidebar and the byline/date sliver. The quote card no longer overlaps the SOURCE chip.
- s2 picture vs voice: **fixed.** It is now an open contest: "Who wins?", neither card highlighted, and a "NOT ALWAYS" stamp. That fits "Here's when it doesn't" and no longer gives away s3.
- s7 cloning s2: **fixed.** It is now a `compare` scene with two stacked tiles: "Cost / Often lower" and "Speed / Often faster", with "No numbers shared" as a note. The layout is fully different.
- s7 title wrap: **fixed.** The title is a small "COST AND SPEED" eyebrow, and there is no stray "·".
- s11 orphan and repeat: **fixed.** The prompt is "One AI or / a team?" on 2 clean lines. The sub "Anthropic: frequently, not always" fits one line. The button alone asks for comments.
- s4 overload (minor): **improved.** The stamp now reads "OVERLOADED? TEAM WINS.", so the idea comes from the stamp.
- s1 hook (minor): **fixed.** A 5-vs-1 bot matchup sits under the headline, and the single bot is in accent green.
- s8 (minor): **fixed.** The new `merge` scene shows two bots (mid) becoming one bot (end).
- s9: "1 of 2" spacing is clean.

| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s8 | s8-mid.png, s8-end.png | minor | "The catch" no longer looks like a warning. The hazard stripe and orange tag are gone, and the merged bot is accent green, which reads as a success right when the voice says it went wrong. The two bots in s8-mid are small with a lot of empty space, and "TWO HELPER BOTS → ONE BOT" is small grey mono spread across the full width. | Optional: if `merge` supports a tone or colour field, set it to warning. Otherwise keep it as is: s9 ("1 of 2… skipped") lands the failure right after. |
| s11 | s11-mid.png, s11-end.png | minor | "Anthropic: frequently, not always" lacks a subject on its own ("frequently" what?). | Optional: "Anthropic: one AI often wins, not always", only if it stays on one line. |
| s2→s3 | s2-end.png, s3-mid.png | minor | The voice says "Here's when it doesn't", then s3 says "The winner: …" before any "doesn't" case. The visual order is fine; this is a script-order wrinkle. | Optional: change s2 `say` to "But does it always win?" |
| s6 | s6-mid.png, s6-end.png | minor | The page image reaches x≈500 (≈1000 full-res) and "Try Claude" is cut off at the right in s6-end. It is decorative, not key content. | No change required. |
| s3, s5 | all | minor | They are still text-only statements on the same gradient. They are legible and accented, so this is acceptable. | Optional: a picture for "same time" (parallel lanes) in a later version. |

Checks passed:
- **Accuracy:** s1/s2/s11 "frequently, not always" matches C0/C2. "One AI + tools when needed" matches C0's safe text. The s4/s5 conditions match C9. The s6 quote is verbatim (C2) with 22 Oct 2026 (C1), and the captured page is the cited URL. The s7 "Often lower / Often faster / No numbers shared" matches C4 and C2 (no invented figures). The s8/s9 "two helper bots merged… 1 of 2 test runs, delivery date skipped, sample support bot" matches C8 and its note. s10 is verbatim C12, Jan 2026. Nothing from false C16 appears, and the press headline is never shown as Anthropic's claim.
- **Legibility and clipping:** no clipped text and no single word left alone on a line. All main type is large and high-contrast.
- **Safe zones:** only the progress bar and @handle sit in the top band, and nothing sits in the bottom band. The only edge item is the decorative s6 page (minor).
- **Caption collision:** none.
- **Hierarchy:** each frame has one clear focal point.
- **Pacing:** 9 distinct looks across 11 scenes. These are hook+matchup, open versus, statement, versus with a winner, statement, document, compare tiles, merge, stat, quote and CTA. s2 and s4 share the versus card on purpose, and they read as a before/after pair (no winner vs team highlighted).

Publishability (beyond the checklist): **yes, this is now a publishable AI-news reel.** The first frame shows the whole story in one glance: "When *one* AI beats a team" over 5 bots vs 1 green bot, and it works as a thumbnail. Most ideas now have a picture: the open contest, team wins when overloaded, the real Anthropic page as the receipt, cost/speed tiles, the merge, and the "1 of 2" number. The rest are short, accented lines. The real page in s6 gives it the credibility an AI news page needs. Remaining polish for a future version: give "the catch" a warning colour, and give s3/s5 pictures to cut the text-on-gradient stretches.

No blockers or majors remain.

VERDICT: SHIP
