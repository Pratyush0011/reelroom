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

## Round 6 (v3)
Verdict: FIX

I opened all 36 v3 stills (540x960, s1–s18 mid/end) and checked them against storyboard.json, media-credits.json, 02-claims.json and the motion recipe in 05b-direction.md. I also checked `public/runs/<run>/` and assets.json, because three scenes showed footage that is not in the credits.

**Main finding (blocker): stale B-roll from an earlier draft is in the render, and none of it is credited.** `assets.json` still holds keys from the previous scene numbering (files written 01:27–01:28, before the 01:29 storyboard). The engine looks up `bg-<scene id>`, so:
- s9 (versus, no `bg`) shows the stopwatch clip. `media-bg-s9.mp4` is byte-identical to s10's.
- s15 (stat, no `bg`) shows the woman-writing photo. `media-bg-s15.jpg` is byte-identical to s16's, so s15 and s16 look the same.
- s7 says "no licensed match", yet it plays `media-bg-s7.mp4`, an unknown 1.5 MB clip with no entry in media-credits.json.
- Stale `s10`, `s13` and `bg-s4.mp4` entries/files are also left over. They are unused for now but could get picked up later.

So the render uses footage with no licence trail. Fix: re-run `npm run media` with assets.json and the run's public media cleared first, so only current scene ids get files. Then give s9, s15 and s7 their own `bg` or leave them with none. (This is a pipeline fix. The storyboard itself is fine on this point.)

| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s7, s9, s15 | s7-mid/end, s9-mid/end, s15-mid/end | blocker | Uncredited, stale B-roll from an earlier draft plays behind these scenes (see above). s15 shares s16's photo, so the two scenes look alike. | Rebuild media from a clean assets.json. s7: new `bg.query` "industrial robot arms assembly line" (or "highway traffic lanes" for parallel work). s9: no `bg`, or "toolbox". s15: no `bg`, or "checklist clipboard". |
| s6 | s6-mid, s6-end | blocker | "pile of papers" pulled a **rolling-papers brand pack** (Randy's Wired Rolling Papers). Brand names are readable across the frame ("Wired Rolling Papers", "Randy's", "Since 1975"). It is off-topic, reads as a tobacco/cannabis product ad, and the big serif lettering fights the versus cards. | `bg.query` → "stack of documents office desk" or "overflowing paperwork". Avoid the word "papers" on its own. |
| s5 | s5-mid | blocker | The "STILL" sticker lands on the headline and covers the word "still" in "still wins", so the headline reads "A team ___ wins". | Remove `emphasis` "still" from s5, since the headline already says it. |
| s5 | s5-mid, s5-end | major | "business meeting" fetched a Philippine government clip of **President Marcos** shaking hands with Singtel executives. An identifiable head of state now illustrates "A team still wins", which suggests a political endorsement. | `media.query` → "team working at whiteboard" or "coworkers around laptop table". Prefer footage without identifiable public figures. |
| s17 | s17-mid, s17-end | major | "magnifying glass" returned a **close-up of a 1-Reichsmark Deutsche Post stamp**. A huge "1" and "DEUTSCHE POST… RM" sit behind "Add more only with evidence". It is off-topic, and the "1" reads like a number in a list scene. | `bg.query` → "magnifying glass on document" or "laboratory measuring". If none fits, drop the `bg`. |
| s14 | s14-mid, s14-end | major | The full-screen `broll` for "delivery date skipped" (a drone delivery clip) renders almost black. The one footage beat on the catch shows nothing, so it plays like a plain card. | `media.query` → "parcel delivery van" or "cardboard boxes doorstep" (a daylight shot). Or change the type to `statement` with `bg` "wall calendar". |
| s10 | s10-mid | major | The "CHEAPER" sticker lands on the **Speed** tile and covers part of "Often faster" and its note, so the two facts mix. | Keep at most one emphasis word in s10 ("faster"), or none: the tiles already say it. |
| s2 | s2-mid | major | The "FOUND" sticker covers the article date "22 Oct 2026" on the receipt card, and that date is part of the C1 evidence. | Drop `emphasis` "found" from s2. The receipt is the emphasis. |
| s3 | s3-mid | major | A big "DOESN'T" sticker sits on the source chip, and the caption also says "DOESN'T" right under it. Out of context it reads as a stray negation. | Drop `emphasis` "doesn't". The "NOT ALWAYS" stamp makes the point. |
| s6 | s6-mid | major | The "OVERLOADED" sticker covers the bottom of the One AI card and its own "overloaded" caption. The word is shown 3 times at once (card caption, sticker, subtitles). | Drop `emphasis` "overloaded", or remove `right.caption` "overloaded". |
| s9 | s9-end | minor | The "TOOLS" sticker, the "OFTEN" stamp and the "TOOLS" caption pile up in one band, so the hedge stamp is the smallest of the three. | Drop `emphasis` "tools" here. s4 already used it. |
| s11 | s11-mid, s11-end | minor | The headline sits on busy calculator keys (orange/blue labels). It is readable thanks to the shadow, but busy. The display shows "0.000000"/"8", which half-contradicts "No numbers shared". | Optional: `media.query` → "blank calculator display" or "empty spreadsheet on screen". |
| s15, s16 | s15-mid, s16-end | minor | The "TEST RUNS" sticker touches the source chip. In s16-end, "Claude blog, Jan 2026" sits flush against the SOURCE chip. | Drop `emphasis` "test runs" in s15 (the stat label says it). Shorten the s16 `role` to "Jan 2026". |
| s13 | s13-mid, s13-end | minor | Mid and end are the same frame: one orange bot. The two-bots-into-one merge is not visible in either still, and "TWO HELPER BOTS" is dim grey. | Check that the merge animates early in the scene. If not, add `bg` "merging lanes road" or show it as a 2-vs-1 picture. |
| s12 | s12-mid, s12-end | minor | The call-center news clip is so dark it is invisible. It doesn't hurt, but it adds nothing. | Optional: `bg.query` "headset customer support" (a still image). |
| s8 | s8-mid | minor | The caption breaks as `TEAMS "STILL HAVE`, leaving an opening quote mark with no closing one. | Remove the quote marks from s8 `say` (the document card already quotes). |

**B-roll relevance:**
- *Fits:* s1 server racks (dark, reads as "data centre"), s4 wrenches = tools, s10 stopwatch = faster, s11 calculator = numbers, s16 hand writing in a notebook = advice.
- *Off-topic:* s6 rolling papers, s17 Reichsmark stamp, s5 head of state.
- *Empty:* s14 is black and s12 is invisible.
- *Uncredited:* s7, s9 and s15 (stale).

Queries that work on Commons/Openverse are concrete objects with setting/lighting words, e.g. "stack of documents office desk", "team working at whiteboard", "parcel delivery van daytime", "magnifying glass on document", "industrial robot arms assembly line".

**Legibility over B-roll:** the scrim works on stills (s1, s4, s10, s16). The full-screen footage scenes keep white text with a heavy shadow, and it is readable everywhere, including the bright s5 window and the busy s11 keys. No text is clipped and nothing important sits in the top/bottom bands, apart from the s8 page past the right edge (decorative, as in v2).

**Stickers:** this is the main craft problem in v3. Every sticker pops in the same band (just above the source chip, left or right). Anything in that band gets covered: the receipt date (s2), the source chip (s3, s15), the One AI card (s6), the Speed tile (s10) and the headline word itself (s5). Six of the ~10 stickers caught in stills collide with content. Rule for the director: choose emphasis words that are **not already written on screen**, and use at most one where a card or headline fills the lower-middle band.

**Overall vs the motion recipe:** the bones are right now. There are 18 cuts in ~49 s, varied transitions, a hook thumbnail that reads in one glance, a real receipt, a highlighted quote, warning stripes on the catch, and real footage behind most cards. It now feels like the Intellipaat / Analytics Vidhya reference Shorts, not the static Google Cloud counter-example. Three things stop it from being publishable today:
- **Licensing:** stale, uncredited clips are in the render.
- **Footage choices:** three choices a viewer would notice: a rolling-papers ad, a sitting president, and a Reichsmark stamp.
- **Stickers:** the collisions make the "hedge words loudest" idea backfire in s2 and s5, where the sticker hides the evidence or the headline.

All three are query/emphasis edits plus a clean media rebuild. No scene structure needs to change.

Accuracy: all on-screen facts still match C0/C1/C2/C4/C8/C9/C12. There are no invented numbers, nothing from C16, and the press headline is never shown as Anthropic's claim.

VERDICT: FIX

## Round 7 (v3)
Verdict: FIX

I re-opened all 36 freshly rendered stills (540x960) and checked them against the updated storyboard.json, media-credits.json and assets.json.

**What Round 6 fixed:**
- **Stale media: fixed.** assets.json and the public folder now hold only current scene ids. Every `bg-`/media file has a credits entry. s9 and s15 render on the plain background, and s15 no longer copies s16.
- **Sticker collisions: fixed.** Emphasis words now light up inside the caption band as an accent pill or colour. Nothing covers the receipt date (s2), the One AI card (s6), the Speed tile (s10) or the s5 headline.
- **s6 rolling papers:** gone. The new backdrop is a desk of printed documents, which fits "overloaded with information" and is dim enough.
- **s5 head of state:** gone. The new shot is a whiteboard with sticky notes and no people, a good "team" picture, and the headline is legible on it.
- **s7:** a dark car assembly line, a fair "jobs at the same time" image.
- **s8:** the caption has no stray quote mark.
- **s16:** "Jan 2026" no longer collides with the source chip.
- **s14:** no longer black. It is a real daylight street.

| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s17 | s17-mid, s17-end | major | The "magnifying glass on document" pick is a magnifier over a **Portuguese Bible page**. Large, readable lines run behind the list ("Vive o Senhor", and in bold italics "Contra os falsos profetas", i.e. "against the false prophets"). Scripture behind "Anthropic's advice" is off-topic, and "false prophets" reads as an editorial jab. It is also the busiest backdrop in the reel. | `bg.query` → "microscope lab" or "measuring tape". If neither returns a clean object shot, drop `bg` from s17. |
| s11 | s11-mid, s11-end | major | The "spreadsheet" clip is a real Google Sheet with **visible numbers** (100, 65, 25, 17, 40) and a **real person's name** ("Asaf Bartov"; other rows show "J. K. Something", "Ingrid Something"). Behind the headline "No numbers shared", the screen literally shows numbers, which invites "so what are those?". It also puts a named private person in an AI-news reel. | `media.query` → "padlock" or "locked safe" (the numbers are kept closed), or "blank paper". |
| s4 | s4-mid, s4-end | minor | The wrench photo includes its museum label. Large serif text "…orged Adjustable W… made in the early 1900's" sits right under the caption and competes with it. | `bg.query` → "wrench" or "toolbox", or keep the query and accept it (it is dim). |
| s14 | s14-mid, s14-end | minor | The "delivery van" fallback shows a pedestrian street with café umbrellas and a cat, with no van or parcel. It is neutral and readable, but it doesn't say "delivery". | `media.query` → "cardboard boxes" or "parcel". |
| s12 | s12-mid, s12-end | minor | The headset vector is cropped so far it is just abstract orange/black shapes. It is harmless (it even suits the warning palette), but it doesn't read as "support bot". | Optional: `bg.query` "headset" (a photo), or no `bg`. |
| s13 | s13-mid, s13-end | minor | Both stills show the same single orange bot. The two-into-one merge is not visible at mid or end, and "TWO HELPER BOTS" is still dim grey. | Optional: check that the merge plays in the first third. If the engine allows it, raise the `from.label` contrast. |
| s4 | s4-mid | minor | Emphasis "using"/"only" lights up function words ("ONE AI **USING**"). The meaning words are "tools" and "needed". | `emphasis` → ["tools"]. |
| credits | media-credits.json | minor | The s6 author is URL-encoded garbage ("Ch%E2u%20Th%F4ng%20Phan"). The s16 and s17 rawpixel entries say author "unknown" and title "untitled". CC0 needs no attribution, but the credit line should be clean. | Decode the s6 author ("Châu Thông Phan"). The s17 entry goes away with the new query. |

**B-roll relevance, pick by pick:**

| Scene | Footage | Verdict |
|---|---|---|
| s1 | NERSC rack rear | Good (data centre) |
| s4 | Adjustable wrench | Good, but the label text shows |
| s5 | Whiteboard with sticky notes | Good (team) |
| s6 | Desk of documents | Good (information) |
| s7 | Car assembly line | Good (parallel jobs) |
| s10 | Stopwatch | Good (faster) |
| s11 | Real spreadsheet | **Off-message** (shows numbers and a name) |
| s12 | Cropped vector | Neutral |
| s14 | Street with a cat | Weak but safe |
| s16 | Coffee, notebook, pen | Good (advice) |
| s17 | Bible page | **Off-topic, risky** |

**Legibility over B-roll:** good everywhere. The headlines on the brightest frames (s5 whiteboard, s11 sheet) sit on a dark gradient band and read instantly. Nothing is clipped. Nothing important sits in the top or bottom bands. The only thing past the right edge is the decorative s8 page ("Try Claude" cut off), the same as in v2.

**Emphasis:** emphasis now lives in the caption band and never collides. The "pill" moments (BOTS, INFORMATION, SAME TIME, FASTER, START SIMPLE, EVIDENCE, PICK) give the one-word punch the recipe wanted.

**Overall:** this is now a fast, publishable motion-graphics reel in the mould of the high-view references:
- 18 cuts with varied transitions
- footage behind most cards
- a thumbnail-ready hook
- a real receipt and a highlighted quote
- a warning beat on the catch
- a "1 of 2" stat that lands the failure

Only two footage picks stand between it and SHIP: s17's scripture page and s11's spreadsheet full of numbers and a real name. Both are one-query swaps. With those two fixed (and no new problems in their re-render), I expect SHIP.

Accuracy: all on-screen facts match C0/C1/C2/C4/C8/C9/C12. There are no invented figures, nothing from C16, and the press headline is never shown as Anthropic's claim.

VERDICT: FIX

## Round 8 (v3)
Verdict: SHIP

I re-opened all 36 freshly rendered stills (540x960) and checked the new media-credits.json. Everything is credited, the credit names are clean (s6 now reads "Châu Thông Phan"), and s12 renders with no backdrop as stated.

**Round 7 majors, both fixed:**
- **s17:** the Bible page is gone. The backdrop is now a close-up of a yellow measuring tape. That is a literal, on-message picture for "add more only with evidence" (measure first). It is dim, and the list reads cleanly on top.
- **s11:** the spreadsheet with numbers and a real name is gone. The B-roll is now red and brass padlocks on a bridge cable. It reads as "locked away" behind "No numbers shared", and there are no digits or names. The headline sits on the dark gradient band and reads instantly.

**Round 7 minors:**
- **s4:** fixed. The wrench set has no museum label in the frame. Only a dim "…anion" brand fragment sits in the top band behind the progress bar.
- **s14:** fixed. A Korea Post rider carries a big parcel, an exact "delivery" picture, and it is bright and clear.
- **s12:** fixed. With no backdrop, the hazard stripe and "THE CATCH" tag carry the frame.

**B-roll, pick by pick:**

| Scene | Pick | Fit | Safe |
|---|---|---|---|
| s1 | NERSC rack, cables | yes (data centre) | yes |
| s4 | Wrench set | yes (tools) | yes (dim maker mark only) |
| s5 | Whiteboard, sticky notes | yes (team planning) | yes, no people |
| s6 | Desk of papers | yes (information overload) | yes |
| s7 | Car assembly line | yes (parallel jobs) | yes |
| s10 | Pocket stopwatch | yes (faster) | yes ("Excelsior Park" dial text is incidental) |
| s11 | Padlocks | yes (not shared) | yes; heart shape is a small tonal wobble |
| s14 | Postal rider and parcel | yes (delivery) | see minor below |
| s16 | Notebook, pen, coffee | yes (advice) | yes |
| s17 | Measuring tape | yes (evidence/measure) | yes |

| Scene | Still | Severity | Problem | Fix (in storyboard terms) |
|---|---|---|---|---|
| s14 | s14-mid, s14-end | minor | A private postal worker is shown in side profile (glasses visible under the visor). The parcel has a readable company label ("META BIOMED"). The "@REELROOM.AI" handle sits on the white helmet and is low-contrast there. None of this is a political, military or harmful association, and it is CC BY-SA credited. | Optional: `media.query` → "parcel doorstep" for a no-person shot. |
| s13 | s13-mid, s13-end | minor | Same as before: both stills show the single merged bot, and "TWO HELPER BOTS" is dim grey. The two-to-one merge must happen early in the scene, not at the sampled frames. | Optional: no change needed. s14–s15 land the consequence. |
| s11 | s11-mid | minor | The heart-shaped "love lock" adds a romantic note that the line doesn't need. | Optional: `media.query` → "rusty padlock". |
| s5 | s5-mid, s5-end | minor | The whiteboard is the brightest frame in the reel, and the top handle/progress bar are faint on it. The headline and caption are fine. | None required. |

**Checklist, all stills:**
- **Legibility:** every headline, card and caption reads at phone size, on footage and on the plain background.
- **Clipping:** no text is clipped. The only thing past the edge is the decorative s8 page ("Try Claude" cut off), as accepted since v2.
- **Safe zones:** nothing important sits in the top or bottom bands.
- **Emphasis:** the caption-band emphasis pills (BOTS, INFORMATION, SAME TIME, FASTER, START SIMPLE, EVIDENCE, PICK) never cover content.
- **Hierarchy:** each frame has one clear focal point.
- **Pacing:** consecutive scenes all look different.
- **Hook frame:** s1 works as a thumbnail ("When *one* AI beats a team" over server racks, 5 bots vs 1 green bot).

**Accuracy:**
- The "frequently / not always" hedge (C0, C2) is on screen.
- s4 shows "one AI + tools when needed" (C0).
- s5–s7 show the subagent conditions (C9).
- s8 shows the verbatim quote with 22 Oct 2026 (C1, C2).
- s9–s11 show "often lower / often faster / no numbers shared" (C4, C2).
- s12–s15 show the sample support bot, two helpers merged, and the delivery date skipped in 1 of 2 test runs (C8).
- s16–s17 show the verbatim January 2026 advice (C12).
- Nothing from C16 appears, and the press headline is never shown as Anthropic's claim.

**Overall vs the motion recipe:** this is a fast, publishable motion-graphics reel.
- **Pace and transitions:** 18 cuts in about 49 s, with varied transitions.
- **Footage:** real, on-topic, licensed footage sits behind 10 scenes.
- **Recurring picture:** the team-vs-one matchup is rebuilt three times.
- **Paper trail:** a real receipt and a highlighted source quote.
- **The catch:** a warning beat on the catch, and a big "1 of 2" that lands the failure.
- **Ending:** a CTA that loops back to the hook's question.

It now matches the reference Shorts (something new every ~1 s, text over real footage, one-word punch) and avoids the static counter-example's look. There are no blockers or majors.

VERDICT: SHIP
