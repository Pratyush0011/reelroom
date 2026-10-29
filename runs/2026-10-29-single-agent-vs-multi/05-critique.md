# Critique: single agent vs multi-agent

## Round 1: hooks

Test viewer: a stranger scrolling Instagram who has never heard "subagent", "token", "system prompt" or "fold", and has not seen The Decoder's headline. Any hook that needs the headline or the jargon to make sense loses clarity points.

Scores (Scroll-stop / Clarity / Curiosity / Specificity / Truth = total /25):

| # | S | Cl | Cu | Sp | T | Total | One-line reason |
|---|---|---|---|---|---|---|---|
| H1 | 3 | 2 | 3 | 2 | 3 | 13 | Debunks a headline the stranger never saw. "Didn't say that" also overstates: Anthropic did say a single agent *frequently* beat subagents, and C15 bars implying the press got it wrong. Text hook says nothing on mute. |
| H2 | 2 | 1 | 2 | 3 | 5 | 13 | Accurate, but it is a quote about "subagents". The stranger sees jargon in quotation marks and scrolls. |
| H3 | 3 | 2 | 4 | 4 | 5 | 18 | Nice honest asterisk, but "2x faster" at what? It only bites if you already believe the headline. |
| H4 | 3 | 2 | 2 | 5 | 5 | 17 | "Tokens" is jargon, the subject arrives at word 9, it opens no loop, and it is January 2026 news fronting an October story. |
| H5 | 4 | 4 | 4 | 2 | 3 | 17 | Best plain-language hook in the set ("your chatbot"). But no claim says everyday support chats run as AI teams. "Might secretly be" is a promise the reel can't pay off, and there is no number. |
| H6 | 3 | 2 | 4 | 5 | 4 | 18 | Strongest tension: Anthropic's 2025 team win vs its 2026 "try one". Opens with the date (warm-up), the subject lands late, "Now: try one agent" is limp, and the text hook's "fold?" means nothing to a stranger on mute. |
| H7 | 3 | 3 | 4 | 2 | 4 | 16 | Same tension as H6 with the number removed. "Folding" is jargon again. |
| H8 | 3 | 2 | 2 | 4 | 5 | 16 | Off-story (prompt size), and "system prompt" is jargon. |
| H9 | 4 | 2 | 4 | 2 | 4 | 16 | "Faster. And it broke." is punchy, but it's the catch, not the story, and the text names no subject. Must say "sample test" (C8). |
| H10 | 2 | 3 | 2 | 4 | 5 | 16 | For builders only. Strangers don't count tool definitions. |
| H11 | 3 | 1 | 4 | 1 | 4 | 13 | The text hook has no subject at all, and the payoff word ("frequently") is an anticlimax for anyone who never saw the headline. |
| H12 | 3 | 2 | 4 | 5 | 2 | 16 | DISQUALIFIED (Truth 2). Putting 266 vs 21 against "try one agent" implies the swarm was ~12x better and that Anthropic contradicted itself. C14 bars that framing: about half the finds were in code the parallel agents never searched, and the swarm used about 4x the tokens. |

Verdict: REVISE (no hook as submitted reaches 20/25 with Truth ≥ 4; best are H6 18 and H3 18, with H5 the most relatable at 17).

Best two and why they fall short:
- **H6 (18):** right idea (Anthropic vs Anthropic, a contrast a stranger gets instantly), wrong wording. Date-first opening, jargon text hook, soft ending.
- **H5 (17):** right register (plain words, "your chatbot"), but it rests on an unsupported premise and has no specific.

Fixes (most important first):
1. Build the winner on H6's contrast in H5's plain language: "AI team" / "one AI", never "subagents", "fold" or "agent loop" in the hook.
2. Subject first: open on "Anthropic's AI team", not "In 2025". Move the year to the screen.
3. Replace "Now: try one agent" with Anthropic's own hedge word, used as the turn: "Now Anthropic says one AI *frequently* wins." This keeps C2's wording and sets up the honest payoff.
4. End on an open loop the script can close honestly: "Both are true." (Payoff: different jobs, see the promise below.) Do not imply a U-turn or say "Anthropic flipped".
5. The text hook must work on mute with zero jargon. Use a question and let the visual carry the years and the number.
6. Keep "internal eval" visible next to 90.2% in frame 1 (C13). Never pair 90.2% with the 15x token figure.
7. H5 rework if kept as a backup: drop "secretly". There is no evidence about anyone's chatbot. Anchor it to Anthropic's sample support agent (C8) instead.

### Tightened winner (H6 rewritten; proposed final)

- **Spoken (19 words):** "Anthropic's AI team beat a solo AI by 90.2%. Now Anthropic says one AI frequently wins. Both are true."
- **Text (6 words):** "Team of AIs or just one?"
- **Visual (frame 1):** Hard split, motion from frame 0. Left, a "2025" tag over five small AI icons working as a team; "+90.2%" slams in huge, with a small permanent label under it: "Anthropic internal eval". Right, a "2026" tag: the same five icons slide together and merge into one, and Anthropic's word "frequently" stamps beneath it.
- **Claims:** C13 (2025, 90.2%, internal eval), C2 / C0 ("frequently", subagents still have their place), C1 (Oct 2026 article), C9 (when teams still win; needed for "Both are true").
- Rescored: Scroll 4 / Clarity 4 / Curiosity 5 / Specificity 5 / Truth 4 = **22/25** (would PASS once adopted).

Promise the script must pay off by ~15 s:
- The 2025 win was on a research task, measured by Anthropic's internal eval (C13).
- The 2026 advice is from several enterprise deployments, hedged with "frequently", no figures published (C2), and "subagents still have their place" (C0).
- Keep the team when one AI bogs down from too much context, or when jobs must run in parallel with fresh context (C9). That is what "Both are true" means.
- Do not frame it as Anthropic contradicting itself.

## Round 2: hooks

Same test viewer as Round 1: a stranger mid-scroll who has never heard "subagent", "token" or "fold" and hasn't seen the press headline. The writer applied every Round 1 fix: plain words, subject first, no headline dependency, H12 and H1 dropped.

Scores (Scroll-stop / Clarity / Curiosity / Specificity / Truth = total /25):

| # | S | Cl | Cu | Sp | T | Total | One-line reason |
|---|---|---|---|---|---|---|---|
| R2-H1 | 4 | 4 | 5 | 5 | 4 | 22 | Subject in word 1, a number by word 9, and "Both are true" leaves a real question. Truth is 4, not 5, because "Both are true" is an editorial line that only holds if the script delivers C9. Frame 1 is crowded (see fix 1). |
| R2-H2 | 3 | 3 | 2 | 4 | 5 | 17 | Breaks the 20-word limit (21). The payoff ("twice as fast") only lands at word 19, after a slow "Anthropic says one customer tested..." The hook answers itself, so no loop is left open. |
| R2-H3 | 4 | 4 | 4 | 3 | 4 | 19 | Best story hook: "something broke" is a real itch, and the text works on mute. But it opens on the catch, so the reel would start by arguing against its own main point. It also reads as if it always breaks, while C8 says 1 of 2 runs, so the script must say so. One point short. |
| R2-H4 | 3 | 4 | 3 | 2 | 4 | 16 | Clear, but abstract. A stranger doesn't care *why* until they know *that*, there's no number, and "now" hints at a U-turn. |
| R2-H5 | 3 | 4 | 2 | 2 | 5 | 16 | A yes/no question that the same sentence answers. It is January 2026 advice presented as this week's news. C11 is listed but not used. |
| R2-H6 | 2 | 3 | 2 | 1 | 5 | 13 | Narrows the audience to builders in the first breath. "Lots of AI helpers" is vague, and the hedge leaves nothing to chase. |

Verdict: PASS. R2-H1 scores 22/25 with Truth 4. Backup: R2-H3 (19) if a cautionary opener is ever wanted. It is not good enough to lead this story.

Fixes (most important first; tightening only, no new round needed):
1. **Frame 1 is overloaded.** It holds the text hook, two year tags, five icons, "+90.2%", the eval label and "frequently", all at once, which is too much on a phone. Stagger them:
   - 0.0 s: the split and the year tags are already on screen, and "+90.2%" slams in.
   - 0.3 s: the eval label appears.
   - About 2.4 s: the icons merge, with "frequently" stamping in on the spoken word.
   - The text hook sits in its own band at the top or bottom, not over the split.
2. **Shorten the eval label** to "internal eval · research task". It must stay legible at phone size for the whole time "+90.2%" is on screen (C13).
3. **Read "frequently" with weight.** Don't swallow it in the voiceover. It's the word that keeps the hook honest (C2).
4. **Spoken line stays word for word.** Nothing left to cut without losing truth or the loop.

### Final hook (R2-H1)

- **Spoken (19 words, about 7.5 s at 2.5 words/s):** "Anthropic's AI team beat a solo AI by 90.2%. Now Anthropic says one AI frequently wins. Both are true."
- **Text (6 words, its own band):** "Team of AIs or just one?"
- **Visual (frame 1):** Hard split, already moving at frame 0.
  - Left: a "2025" tag over five small AI icons working together. "+90.2%" slams in huge, and the label "internal eval · research task" fades in under it and stays.
  - Right: a "2026" tag. On the spoken "frequently", the same five icons slide together into one, and Anthropic's word "frequently" stamps beneath it.
- **Claims:**
  - C13: June 2025, 90.2%, internal research eval.
  - C1: 22 Oct 2026 article.
  - C2 and C0: "frequently", several enterprise deployments, no figures, "still have their place".
  - C9: when teams still win.
- **Numbers on screen:** 90.2% (C13), 2025 (C13) and 2026 (C1). Nothing else.

What the script must pay off, in this order, by about 15 s:
1. The 2025 win was one research task, scored by Anthropic's own internal eval (C13). Do not pair it with the 15x figure, which compares against chats, not against a single agent.
2. The 2026 advice comes from Anthropic's comparisons across several enterprise deployments. A single AI that loads skills and tools when needed "frequently" did better, and no figures were published (C2, C0).
3. "Both are true": keep the team when one AI gets bogged down by too much context, or when jobs need to run in parallel with fresh context (C9). Say "subagents still have their place" (C0).
4. Never call it a U-turn or say Anthropic contradicted itself. The two results are about different jobs.
5. Optional re-hook in the middle of the reel: R2-H3's "merged them and something broke" (C8) is the catch beat. It must say "sample test" and "1 of 2 runs".

## Round 3: script

Same stranger as Rounds 1-2, now with the sound on. I checked every voiceover line, screen text and caption against `02-claims.json`. Timing uses brand.json: 2.5 words/s at voice rate +6%, so about 2.65 words/s effective.

**Correction to my own Round 2 wording.** I wrote "one research task" and "internal eval · research task", and the script copied both. C13 says the 90.2% was on Anthropic's "internal research eval". That is an evaluation, not one task. "One research task" says something narrower than the source. The fault is mine, not the writer's, but it is in the voiceover, on screen and in the caption, so the script cannot pass with it.

Scores:

| Criterion | Score | One-line reason |
|---|---|---|
| Hook delivery | 4 | The answer to "Both are true" really arrives by B3 (~17 s): different jobs, a research eval vs company deployments. The script just doesn't say that's the answer, so the payoff is easy to miss until B5 (~31 s). |
| Momentum | 4 | Mostly but/therefore. B4 and B5 both open on "But", so the second "but" blurs. |
| Re-hooks | 3 | B4 is a deflation ("no figures"), not a reason to stay. B5 is 23 words (~8.7 s) of list at 22-31 s with nothing new inside it. |
| Clarity | 4 | Plain words throughout ("helper AIs", "swamped"). The receipt title on screen has jargon, but it is a source title, which is acceptable. |
| Concreteness | 3 | Only one number, and the catch is abstract ("a working step broke"). C8 has a concrete picture that the script leaves out. |
| Honesty | 3 | "One research task" misstates C13 (in B2, on screen and in the caption). "Merging the team" (B6) overstates C8, where two helpers were merged in a sample bot. Everything else stays within the safe text and is attributed in the voiceover. |
| Ending | 4 | Real loop back to the hook, with a specific comment prompt. Small gap: C12's "Jan 2026" is on screen only, so the voiceover sounds as if it's new advice. |
| **Total** | **25/35** | Below 28. Also an automatic REVISE on truth (B2 / caption). |

Verdict: REVISE

### Line-by-line truth check
- **B1:** OK. This is the approved hook. "ninety point two percent" is spelled out for text-to-speech. Fix the screen label as in fix 1.
- **B2:** FAIL. "one research task, on Anthropic's internal test" goes against C13's "internal research eval". The stat context "internal eval · research task" has the same problem.
- **B3:** OK. "several company deployments" and "grabs tools only when needed" match C0/C2 ("several enterprise deployments", "loads skills and tools on demand"). The receipt title and date are verbatim (C1).
- **B4:** OK. "often cheaper and faster" matches C4 ("often", lower cost and latency), and "no figures" matches C2.
- **B5:** Acceptable. "Swamped with information" drops C9's "measurable" degradation. Fine for plain language, but don't make it stronger.
- **B6:** Tighten. C8 is folding *one helper into another* in a *sample support agent*, not merging "the team". "1 of 2 runs" is correct.
- **B7:** OK. C12 is close to verbatim; add the date to the voiceover (fix 6).
- **Caption:** FAIL. "The 2025 win was one research task" has the same C13 error. Sources in the first comment are all tier-1 URLs from 02-claims.json. OK.
- **Not used, correctly:** the 15x figure, C3, C14 and C16 all stay out.

### Ruling on the writer's flagged deviation (pay-off timing)
**Accepted, with a condition.** My Round 2 list asked for all three pay-off points by about 15 s. That can't be done after a hook that takes about 8.3 s to say, so the over-specification was mine. The real promise of "Both are true" is "they measured different jobs". B2 and B3 together pay that off by about 17 s at +6%. That is close enough to 15 s, **if** B3 says plainly that this is the answer (fix 2). B5 then becomes added value (when helpers still win), not the delayed payoff.

### Retention map (2.65 words/s effective; current draft)
```
0.0–8.3s   HOOK     strong: "+90.2%" lands ~2.5s, "frequently" ~6s, "Both are true" closes on an open question
8.3–11.7s  REVEAL   strong: short, punchy, but WRONG words ("one research task"), fix 1
11.7–17.4s REVEAL   ok: this is the actual answer, but it's delivered as a fragment and doesn't sound like one. Add "different jobs" (fix 2)
17.4–21.9s RE-HOOK  risk: "no figures published" deflates energy; it's honest, keep it, but make it shorter (fix 4)
21.9–30.6s PAYOFF   HIGH risk: 23-word list, 8.7s with no new hook, the second "But" in a row. Biggest drop point (fix 3)
30.6–37.4s CATCH    ok: "a catch" re-hooks, but "a working step broke" is abstract. Make it concrete (fix 5)
37.4–43.4s CTA      strong: loops to the hook question. Add "in January" to the advice (fix 6)
```
Total is about 43.4 s, inside the 20-50 s range. The fixes below are roughly word-neutral.

### Fixes (most important first)
1. **B2 truth fix.** VO: "That win was on Anthropic's own research test." Stat context: "Anthropic internal research eval". Caption line 2: "The 2025 win was on Anthropic's internal research eval." Apply the same label fix to the hook visual: "internal research eval" replaces "internal eval · research task".
2. **B3: make it sound like the answer.** Example: "The one-AI win came from a different job: real company deployments, with one AI that grabs tools only when needed." Same facts (C0/C2), and the words "different job" close the hook's loop by about 17 s.
3. **B5: cut and split, and drop the opening "But".** Example: "Helper AIs still have their place, Anthropic says. When one AI is swamped. Or when jobs must run side by side." That is about 21 words in three short sentences, with a small reveal in each.
4. **B4: shorten.** Example: "Often cheaper and faster too. No figures, though." It keeps C4 and C2, and saves 0.5-1 s for fix 5.
5. **B6: concrete and in scope (C8).** Example: "The catch: in Anthropic's sample support bot, after merging two helpers, it answered an order without checking the delivery date. One run in two." Screen: "Sample test: merged helpers skipped a delivery-date check · 1 of 2 runs". Do not say "the team" or imply it happened in production.
6. **B7: attribution in the voice.** Example: "Anthropic's advice back in January: start simple, add more only with evidence. So, team of AIs, or just one?" C12 is January 2026 advice, so don't let it sound new.
7. After the fixes, recount the words and update the timeline. Keep the total ≤ 50 s at 2.5 words/s. Rerun `npm run check` once the storyboard exists.

If fixes 1-6 are applied as given, my rescore would be about Hook 5 / Momentum 4 / Re-hooks 4 / Clarity 4 / Concreteness 4 / Honesty 5 / Ending 5 = 31/35.

## Round 4: script

The revised 04-script.md, checked against the same stranger, the same rubric and the same line-by-line truth check against `02-claims.json`. Timing uses an effective 2.65 words/s (2.5 at +6%).

Scores:

| Criterion | Score | One-line reason |
|---|---|---|
| Hook delivery | 5 | "...a different job" lands at word 38, about 14.3 s, so "Both are true" is answered before 15 s. |
| Momentum | 4 | The chain is now but / but / but / therefore / but / therefore. B4 ("too... though") is still a slight sag. |
| Re-hooks | 4 | A new beat every 3-8.7 s. B5 is still the longest stretch (8.7 s), but three short sentences now give each item its own small reveal. |
| Clarity | 4 | Plain words throughout. B6's "two helpers merged, and it skipped" is clumsy to hear: the "it" has no clear referent (fix 2). |
| Concreteness | 4 | The delivery-date catch is the human-scale picture the script lacked. |
| Honesty | 5 | Every line stays within its claim, attribution is in the voiceover, the catch is included, and there's no U-turn framing. |
| Ending | 5 | Dated attribution plus a loop back to the hook question and a specific comment prompt. |
| **Total** | **31/35** | No criterion below 3. |

Verdict: PASS

### Line-by-line truth check
- **B1:** OK. The hook as approved. The label "internal research eval" now matches C13.
- **B2:** OK. "Anthropic's own research test" is a faithful plain-language version of C13's "internal research eval", and the stat context says it outright. Round 3's error is gone everywhere: voiceover, stat, hook label and caption.
- **B3:** OK. "Several company deployments" and "grabs tools only when needed" match C2/C0. Calling it "a different job" is fair editorial framing of a research eval vs company deployments. The receipt is verbatim (C1).
- **B4:** OK. "Often" (C4) and "no figures" (C2).
- **B5:** OK. Covers both C9 conditions, attributed in the voiceover, and "swamped" is no stronger than "measurable degradation".
- **B6:** OK. C8's note says the main agent answered an order question without asking for the delivery date, in 1 of 2 runs, in a sample support agent with one helper folded into another. The script keeps "sample", "two helpers merged", "it" (not "merged helpers") and "one run in two". The writer was right to reject my "merged helpers skipped" wording.
- **B7:** OK. C12, now dated in the voiceover.
- **Caption / first comment:** OK. Every source is a tier-1 URL from 02-claims.json.
- **Numbers on screen:** 90.2 (C13), 2025 (C13), 2026 / 22 Oct 2026 (C1), Jan 2026 (C12) and 1 of 2 (C8), nothing else.

### Retention map (2.65 words/s effective)
```
0.0–8.3s   HOOK     strong: "+90.2%" at ~2.5s, "frequently" ~6s, open question "Both are true"
8.3–11.3s  REVEAL   strong: 8 words, the stat card holds the honest label
11.3–18.9s PAYOFF   strong: "a different job" at ~14.3s closes the hook's loop; the receipt card shows the source
18.9–21.9s RE-HOOK  ok: short; "No figures, though" is an honest beat that lowers energy slightly. Keep it this short.
21.9–30.6s REVEAL   medium risk: longest beat (8.7s). The list items must pop in on their own sentences, or this is where viewers drop.
30.6–38.9s CATCH    strong: "The catch" re-hooks; the delivery-date picture is concrete. Wording polish (fix 2).
38.9–46.0s CTA      strong: dated advice, then the hook question loops back to frame 1
```
About 46 s with the +6% voice rate, or 48.8 s at the 2.5 words/s planning rate.

### Polish (not blocking; for the director and voice)
1. **Duration margin is thin.** 48.8 s against a 50 s limit at the planning rate. Measure the real TTS length. If scene transitions push it past 50 s, cut "with information" (B5) and "an order's" (B6) first. Don't cut any of the hedges.
2. **B6 wording for the ear.** Suggested: "The catch: in Anthropic's sample support bot, after two helpers were merged, it skipped checking an order's delivery date. One run in two." This adds one word and makes clear the bot is the "it".
3. **B6 screen text is long** (about 13 words). Suggested: "Sample bot skipped the delivery date · 1 of 2 runs". Keep "sample".
4. **B5 list items** should appear on the words "swamped" and "side by side", not all at once. That timing is what keeps the 8.7 s beat alive.
5. Run `npm run check` on the storyboard. The numbers and receipts above are the only ones allowed.
