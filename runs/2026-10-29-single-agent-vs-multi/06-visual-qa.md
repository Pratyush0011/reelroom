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
