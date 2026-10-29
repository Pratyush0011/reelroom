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

## Round 5: hooks (v2)

Test viewer: a stranger in India scrolling Instagram. They have no AI background and do not know the name "Anthropic". They hear the hook once, at normal speed, and may be on mute. Clarity is scored with the updated rule: **5 only if my own say-back is no longer or vaguer than the hook.** Other conditions for a 5: one idea, no number to decode, no riddle. The engine is also a hard limit. Frame 1 must be a `hook` scene (headline ≤6 words plus one accent word) or a `versus` scene (bot/user/... icons, count 1-6). A kitchen, a classroom or a tug-of-war cannot be drawn.

Note on "Anthropic": the stranger won't know the name, but none of the hooks below needs them to. Read as "an AI company", it still works as attribution. Any hook where the idea depends on knowing Anthropic would lose clarity. None of these does.

Scores (Scroll-stop / Clarity / Curiosity / Specificity / Truth = total /25):

| # | S | Cl | Cu | Sp | T | Total | My say-back | One-line reason |
|---|---|---|---|---|---|---|---|---|
| R3-H1 | 3 | 5 | 3 | 4 | 5 | 20 | "An AI company tested one AI against a team of AIs, and the one usually won." | Very clear, but it answers itself. "Compared" is a flat verb and no loop is left open, so it is one point from failing on feel. |
| R3-H2 | 4 | 5 | 4 | 3 | 5 | 21 | "You'd think a team of AIs is smarter, but one AI often does better." | A real belief gets reversed, and the stranger already holds the belief. No name or contrast beyond "one vs team". The graduation-cap picture can't be drawn; use `versus` instead. Strong backup. |
| R3-H3 | 4 | 4 | 4 | 3 | 5 | 20 | "Too many cooks spoil the broth, same with AI, one AI with tools often does better." | FAILS clarity. "AI cooks" is a metaphor the listener has to decode first, and my say-back is longer than the hook. The idiom is known but not universal. A kitchen with robot chefs can't be drawn. |
| R3-H4 | 3 | 5 | 2 | 3 | 5 | 18 | "One AI is often cheaper and faster than a team." | Clear and true, but it closes its own loop. The stranger doesn't pay for AI teams, so the stakes aren't theirs. Taxi meters can't be drawn. |
| R3-H5 | 3 | 3 | 3 | 2 | 3 | 14 | "AI teams are like... group projects? Something about slow?" | FAILS. "The same problem" is a riddle: same as what? Truth 3, because it states a *reason* teams are slow, and no claim supports that (C4 only says "often" lower latency). |
| R3-H6 | 4 | 5 | 4 | 4 | 5 | 22 | "One AI usually beats a team of AIs, but not always." | **Winner.** One idea, the hedge built into the structure, and an honest open loop ("when it doesn't") that a 12-year-old understands. The payoff is C9 plus C2's "still have their place, including at the research frontier". Its tug-of-war can't be drawn, but `hook` plus `versus` can. |
| R3-H7 | 3 | 5 | 3 | 3 | 5 | 19 | "More AIs doesn't always help; one AI with tools often wins." | Clear and honest but soft. "Isn't always better" is a shrug, not an itch. |
| R3-H8 | 4 | 4 | 4 | 3 | 4 | 19 | "They joined two AIs in a test and it got faster but messed up." | FAILS clarity. The stranger asks "why join them?", and the hook needs the main story first. Truth 4: "then made a mistake" reads as certain, while C8 says 1 of 2 runs. Agree with the writer: mid-reel re-hook only. |

Verdict: PASS. R3-H6, tightened as below: 22/25, Clarity 5, Truth 5. Backup: R3-H2 (21).

### Tightening (R3-H6)
1. **Move the idea before the name.** The stranger doesn't know "Anthropic", so make the first three words "One AI frequently". The attribution moves to the end of the first sentence. The subject is still in the first 3 words, and now it's the surprising part.
2. **Keep "frequently".** It is Anthropic's own word in C2, it is the hedge that makes "beats" true, and it is easy to understand in Indian English. Say it with weight, as in Round 2.
3. **"Here's when it doesn't" stays word for word.** It's the loop and it's a plain promise, not a riddle.

### Final hook
- **Spoken (15 words, ~5.7 s at 2.65 w/s):** "One AI frequently beats a team of AI bots, Anthropic found. Here's when it doesn't."
- **Text (5 words):** "When one AI beats a team". Accent: "one". Optional kicker: "ANTHROPIC".
- **Visual, using only engine scene types:**
  - **s1 `hook`:** the headline slams in word by word, with "one" in the accent colour. Voice: "One AI frequently beats a team of AI bots, Anthropic found." That's 11 words, ~4.2 s.
  - **s2 `versus`:** voice is "Here's when it doesn't." Fields:
    - left: `{label: "Team of AIs", icon: "bot", count: 5}`
    - right: `{label: "One AI", icon: "bot", count: 1, caption: "grabs tools as needed"}`
    - `winner: "right"`, `verdict: "Frequently. Not always."`
    - The "not always" in the verdict is the visual promise of the loop. The caption carries C0's "with skills/tools" qualifier, which the spoken hook leaves out.
- **Claims:** C0, C2 (hook); C9 (the promise).
- **Numbers on screen:** none.

### What this changes downstream (must fix before the reel is rebuilt)
1. **04-script.md (Round 4 PASS) was built on the old R2-H1 hook and no longer fits.**
   - B1 is the old hook. B2 is the 90.2% stat. B3's "a different job" answers "Both are true", a question the new hook no longer asks.
   - The script needs a new round. The new promise is "when one AI loses", and it must be paid off by ~15 s, not at B5 (~22 s) as now.
2. **Payoff order for the rewrite:**
   1. Straight after the hook, say what "one AI" means: one AI that grabs tools only when it needs them (C0).
   2. By ~15 s, give when the team still wins. That's when one AI gets swamped with too much information, or when jobs must run side by side (C9). Add Anthropic's own words, "still have their place, including at the research frontier" (C2).
   3. Then the scope: several company deployments, no figures published (C2); often cheaper and faster too (C4).
   4. The catch beat (C8: sample bot, delivery date, 1 of 2 runs) and the January advice CTA (C12) can stay as they are.
3. **The 90.2% is optional now and leaves the opener.** If it comes back as a "research frontier" example, it must say *of what* in the same breath: "beat one AI on Anthropic's own research test". Keep "internal research eval" on screen (C13), and never pair it with 15x.
4. **No U-turn framing anywhere.** That rule from Rounds 1-4 still applies.
5. Re-run `npm run check` once the storyboard is rebuilt. The hook scene cites C0/C2, and the versus scene cites C0/C2/C9.

VERDICT: PASS

## Round 6: script (v2)

The test viewer is the Round 5 stranger: someone in India scrolling Instagram, no AI background, doesn't know the name "Anthropic", hears each line once. This time the sound is on. I checked every voiceover line, screen text and caption against `02-claims.json` (`safe_text` where it exists, checked quotes otherwise). Timing uses 2.65 words/s effective (2.5 at +6%). I also checked the script against the new visual-direction rule: **at most two `statement` scenes per reel, pictures over sentences.**

Scores:

| Criterion | Score | One-line reason |
|---|---|---|
| Hook delivery | 4 | The real answer (B4-B5) closes by ~15.5 s. But B3 comes straight after "Here's when it doesn't" and sounds like the answer, which it isn't (fix 1). |
| Momentum | 3 | After 15.5 s the main loop is closed and no new one is open until "The catch" at 23.4 s. B6 repeats B4-B5 and B7 lets the energy drop. The ABT's "therefore" before B6 is really an "and". |
| Re-hooks | 3 | The cuts are fast (11 scenes, ~3.6 s each), but 15.5-23.4 s brings no new information: a restatement, then "no numbers shared". That's the biggest drop point. |
| Clarity | 3 | Two say-back failures (B3 "That's", B7 "it"). B8 has a passive "two helper bots merged". "Swamped" and "side by side" are a bit soft for Indian-English ears. |
| Concreteness | 4 | The versus pictures and the delivery-date catch are concrete. "1 of 2" is the only number, and it is buried in a sentence card (fix 5). |
| Honesty | 4 | Attribution, hedges and the catch are all there, with no U-turn framing. But "several companies" says more than C2's "several enterprise deployments" (in B7 and the caption), and "1 of 2" invites a "half the time" reading. |
| Ending | 4 | Dated advice, then a loop back to the hook with a specific prompt. "Add more" doesn't say more of what (minor). |
| **Total** | **25/35** | Below 28. There is also a small truth tightening (fix 3) and a visual-rule breach: 4 `statement` scenes. |

Verdict: REVISE

### Line-by-line truth check
- **B1:** OK. This is the approved hook, word for word. "Frequently" and "Anthropic found" fit C0/C2 safe_text. The C0 qualifier "with tools" is on the B2 caption, as Round 5 specified.
- **B2:** OK. The verdict "Frequently. Not always." matches C2. The caption "grabs tools as needed" matches C0 ("loads skills and tools on demand").
- **B3:** OK on truth (C0). It fails clarity (see the say-back test).
- **B4:** OK. "Team still wins when one AI is swamped" is the plain version of C9 "keep subagents when ... measurable performance degradation from context bloat". It's an Anthropic recommendation, attributed by B1 and B6. Don't make it any stronger. The screen verdict "Team wins" is acceptable.
- **B5:** OK. C9 "tackled in parallel".
- **B6:** OK. The document quote is verbatim from C2/C0's checked quote (13 words, so ≤24). The date is 22 Oct 2026 (C1), and the URL is the tier-1 checked source. "Teams" outside the quote marks is a fair stand-in for "subagents".
- **B7:** TIGHTEN (truth). C2/C0 safe_text says "across several enterprise deployments", not several companies. Deployments are not necessarily different companies. "Often cheaper and faster" = C4, OK. "No numbers shared" = C2 "gives no figures", OK.
- **B8:** OK. C8: a *sample* support agent, with one helper folded into another. "Two helper bots merged" is the wording accepted in Round 4.
- **B9:** OK in the voice (C8 note: the delivery date was skipped in one of two runs). The screen risk: a bare "1/2" or "1 of 2" card reads as "fails half the time". Label it "test runs" (fix 5).
- **B10:** OK. The quote card is verbatim C12 minus "Our advice?". The voiceover is dated "from January".
- **B11:** OK. The sub line matches C2.
- **Caption:** TIGHTEN. "The comparison covered several companies" has the same problem as B7. Everything else in the caption is within C2/C9.
- **First comment:** OK. Both URLs are tier-1 checked sources (C1/C2, C12).
- **Numbers on screen:** 22 Oct 2026 (C1), Jan 2026 (C12), 1 of 2 (C8). Nothing else. 90.2% and 15x are correctly absent.

### Say-back test (each beat, heard once by a non-expert Indian viewer)
| Beat | My say-back | Result |
|---|---|---|
| B1 | "One AI often beats a group of AIs, some company found." | PASS |
| B2 | "But not always. They'll tell me when." | PASS |
| B3 | "So... it loses when it grabs tools?" | **FAIL.** "That's" right after "Here's when it doesn't" is heard as the answer. |
| B4 | "A team is better when one AI has too much to handle." | PASS ("swamped" is OK; "overloaded" is more common in Indian English) |
| B5 | "Or when jobs happen... next to each other?" | WEAK. "Side by side" sounds physical. "At the same time" is instantly clear. |
| B6 | "The company itself says teams are still useful." | PASS |
| B7 | "Something was cheaper and faster... the teams? No numbers." | **FAIL.** After B6 ("teams still have their place"), "it" points to teams, which is the opposite of the claim. |
| B8 | "In a test chatbot, two helper bots... joined?" | WEAK. Passive voice. Say "they merged two helper bots". |
| B9 | "It forgot the delivery date half the time." | WEAK. The viewer generalises "1 of 2" into a rate. Say "in one of two *test* runs". |
| B10 | "Start small, add more only if it's proven." | PASS ("more what?" is a minor gap) |
| B11 | "One AI or a team: comment." | PASS |

### Statement budget (new visual-direction rule: ≤2 `statement`, pictures over sentences)
The current plan has **4 statements**: B3, B5, B7 and B9 (B9 defaults to `statement`, and its Kind column says P, which doesn't match). Two must become pictures:
- **B7 → `versus` (picture).** It's a cost/speed face-off and a natural flip back after B4's "team wins". B6 is `document` and B8 is `catch`, so there's no type repeat. Fields: title "Cost and speed" · left {label "Team of AIs", icon bot, count 5} · right {label "One AI", icon bot, count 1, caption "with tools"} · winner right · verdict "Often. No numbers shared." Change the icon or the caption so it doesn't look like a replay of B2.
- **B9 → `stat` (picture, mandatory, not optional).** Any number that matters goes on a `stat`. Fields: value 1 · suffix " of 2" · label "test runs: delivery date skipped" · context "Anthropic sample support bot". Don't use a bare "/2".
- **B3 stays a `statement` (1 of 2).** It has to sit between the B2 and B4 `versus` scenes, because the same type can't run twice in a row. Rewrite it so it can't be heard as the answer (fix 1).
- **B5 stays a `statement` (2 of 2).** It can't be a `versus` straight after B4's `versus`. Its accent is "same time".
- Result: hook → versus → statement → versus → statement → document → versus → catch → stat → quote → cta. That's 2 statements, 3 versus scenes with different winners and verdicts, and no type twice in a row.

### Retention map (v2 as written, 2.65 words/s effective)
```
0.0–4.2s   HOOK        strong: subject in 3 words, "frequently" weighted, headline slams in
4.2–5.7s   LOOP        strong: "Here's when it doesn't" + versus stamp "Frequently. Not always."
5.7–8.3s   CONTEXT     HIGH risk: "That's one AI grabbing tools" heard as the answer; confusion right after the promise (fix 1)
8.3–12.5s  PAYOFF 1    strong: the versus flips, team wins; best visual reversal in the reel
12.5–15.5s PAYOFF 2    ok: statement card; "side by side" soft (fix 2). Main loop closes at 15.5 s
15.5–18.9s PAPER TRAIL ok: real page + highlighter is strong visually, but it repeats B4-B5 with no new info
18.9–23.4s SCOPE       HIGH risk: biggest drop. No open loop, "it" misreferenced, deflating "no numbers", sentence card (fixes 3-4)
23.4–27.5s CATCH       strong: "The catch" is a real re-hook
27.5–32.1s DETAIL      strong content, weak frame: number buried in a sentence card (fix 5)
32.1–36.2s ADVICE      ok: dated quote card; "add more" vague
36.2–39.6s CTA         strong: loops back to the frame-1 question
```

### Fixes (most important first)
1. **B3 must not sound like the answer.** VO: "The winner: one AI using tools only when needed." (9 words). Screen `statement`: "The winner: one AI + tools when needed" · accent "winner". Uses C0. With "The winner" the viewer hears a description, not the promised "when it doesn't".
2. **B4/B5, plain Indian-English words.** B4: "swamped" → "overloaded" ("...when one AI is overloaded with information"). B5 VO: "Or when jobs must run at the same time." (C9). Screen: "Or jobs running at the same time" · accent "same time".
3. **B7 truth + clarity + picture.** VO: "Still, one AI with tools was often cheaper, faster. No numbers shared." (12 words, C2/C4). "Still" turns the energy back after B6. "One AI with tools" fixes the "it", and "several companies" leaves the voice. If scope is needed on screen, put it in the versus title: "Cost and speed · company use", not "several companies". Scene: `versus` as specified above.
4. **Caption line 2:** "The comparison covered several companies" → "The comparisons covered several enterprise deployments, with no numbers published." (C2 safe_text).
5. **B9 → `stat` + say "test".** VO: "It skipped checking the delivery date, in one of two test runs." (12 words, C8). Stat as specified above, with "test runs" in the label. Set the Kind column to P with a real picture.
6. **B8 active voice.** "The catch: in Anthropic's sample support bot, they merged two helper bots." (12 words, C8). Keep "sample". Screen `catch` text: "Sample support bot: two helper bots merged into one".
7. **ABT honesty in the doc.** Relabel B5→B6 as "and" (it's confirmation, not consequence). With fix 3's "Still", B6→B7 becomes a real "but". Don't call a connector "therefore" when it isn't one.
8. **Optional, B10.** "Anthropic's January advice: start simple. Add more only with proof." (10 words). The quote card stays verbatim C12.
9. **Recount and retime.** Fixes 1-8 come to about 108 words, ~40.8 s at 2.65 words/s (43.2 s at the planning rate; inside brand's 50 s, a touch over the 42 s brief at the planning rate, so measure the real TTS). The first payoff (B4) should still land by ~13 s and B5 should close the loop by ~16 s. Then rebuild the storyboard with the scene order above and run `npm run check`. Scene claims: B7 versus C2/C4, B9 stat C8.

If fixes 1-6 are applied as written, my rescore would be about Hook 5 / Momentum 4 / Re-hooks 4 / Clarity 5 / Concreteness 5 / Honesty 5 / Ending 4 = 32/35.

VERDICT: REVISE

## Round 7: script (v2)

Same stranger as Round 6 (India, no AI background, doesn't know "Anthropic", sound on, one hearing). I checked the revised 04-script.md against the same rubric, did a line-by-line truth check against `02-claims.json`, applied the say-back test, and checked the ≤2 `statement` rule. Timing is 2.65 words/s effective.

Scores:

| Criterion | Score | One-line reason |
|---|---|---|
| Hook delivery | 5 | B3 now clearly describes the winner, and the promised answer lands at B4 (~13.2 s), closing the loop with B5 by ~16.6 s. |
| Momentum | 4 | The chain is but / but / and / but / but / and / therefore. "Still," turns the energy back after B6. B6 is still a confirmation rather than new information. Its strong visual carries it. |
| Re-hooks | 4 | Three different versus outcomes, the document highlight, "The catch" and a counting stat. 16.6-20 s is the softest stretch, but it's short. |
| Clarity | 5 | Every beat passes the say-back test (below). No jargon in the voiceover. |
| Concreteness | 5 | The 5-vs-1 pictures, the delivery date, and "1 of 2" on a stat card labelled "test runs". |
| Honesty | 5 | Every line is within its claim or safe_text. "Several companies" is gone. The hedges ("frequently", "often", "sample", "test") are all in the voice. |
| Ending | 4 | Dated advice, then a loop back to the frame-1 question. "Add more" is still a little open, but it's faithful to C12. |
| **Total** | **32/35** | ≥28, and nothing is below 3. |

Verdict: PASS

### Line-by-line truth check
- **B1-B2:** OK. The approved hook, word for word (C0/C2, C9 promise).
- **B3:** OK. "One AI using tools only when needed" = C0 "loads skills and tools on demand".
- **B4:** OK. "Overloaded with information" is the plain version of C9 "measurable performance degradation from context bloat", and no stronger.
- **B5:** OK. "At the same time" = C9 "tackled in parallel".
- **B6:** OK. The document quote is verbatim from the checked quote. Date 22 Oct 2026 (C1). The URL is tier 1.
- **B7:** OK. "Often cheaper, faster" = C4. "No numbers shared" = C2 "gives no figures". The title "company use" is a fair stand-in for "enterprise deployments" and doesn't claim several companies.
- **B8:** OK. C8: sample support agent, with one helper folded into another ("merged into one").
- **B9:** OK. C8 note: the delivery date was skipped in one of two runs. "Test runs" in the voice and the label stops it reading as a failure rate.
- **B10:** OK. **The writer was right to keep "evidence".** My Round 6 "proof" was stronger than C12 ("when evidence supports it"). The quote card is verbatim C12.
- **B11:** OK. C2.
- **Caption:** OK. "Several enterprise deployments, with no numbers published" = C2 safe_text.
- **First comment:** OK. Both are tier-1 checked URLs.
- **Numbers on screen:** 22 Oct 2026 (C1), Jan 2026 (C12), 1 of 2 (C8). Nothing else.

### Say-back test (non-expert Indian viewer, one hearing)
| Beat | My say-back | Result |
|---|---|---|
| B1 | "One AI often beats a group of AIs, some company found." | PASS |
| B2 | "But not always. They'll tell me when." | PASS |
| B3 | "The one that wins uses tools only when it needs them." | PASS. "The winner" removes the Round 6 confusion. |
| B4 | "A team is better when one AI has too much information." | PASS |
| B5 | "Or when jobs happen at the same time." | PASS |
| B6 | "The company itself says teams are still useful." | PASS |
| B7 | "Still, one AI was often cheaper and faster. No numbers given." | PASS. The subject is explicit. |
| B8 | "In a test chatbot, they joined two helper bots." | PASS |
| B9 | "It forgot the delivery date in one of two tests." | PASS |
| B10 | "Start simple, add more only with evidence." | PASS |
| B11 | "One AI or a team: comment." | PASS |

### Statement budget
2 `statement` scenes (B3, B5), so within the rule. The scene order is hook → versus → statement → versus → statement → document → versus → catch → stat → quote → cta, with no type twice in a row and 11 scenes (8-12 allowed).

### Retention map (2.65 words/s effective)
```
0.0–4.2s   HOOK        strong: subject in 3 words, "frequently" weighted, headline slam
4.2–5.7s   LOOP        strong: versus stamp "Frequently. Not always." opens the question
5.7–9.1s   CONTEXT     ok: "The winner:" reads as description; short; statement card
9.1–13.2s  PAYOFF 1    strong: versus flips to "Team wins", the answer lands at ~13 s
13.2–16.6s PAYOFF 2    ok: statement, "same time" accent; loop closed
16.6–20.0s PAPER TRAIL ok: confirmation, not new info; the real page + highlighter carries it. Softest stretch, keep it tight
20.0–24.5s RE-HOOK     strong: "Still," + versus flips back to one AI (zap icon), verdict "Often. No numbers shared."
24.5–29.1s CATCH       strong: "The catch" warning card
29.1–33.6s DETAIL      strong: 1-of-2 stat counter, "test runs" label
33.6–37.4s ADVICE      ok: dated verbatim quote card
37.4–40.8s CTA         strong: loops back to the frame-1 question
```
About 40.8 s at +6% (43.2 s at the planning rate). Measure the real TTS against the 42 s brief.

### Notes for the director (not blocking)
1. **Stat suffix.** `src/schema.ts` allows a suffix up to **6** characters, not 4, and `src/scenes.tsx` already adds a 6 px gap before the suffix. "of 2" will render spaced, and " of 2" is also allowed. Check the frame in visual QA so it doesn't read "1of 2".
2. **B6 is the softest beat.** Time the highlighter to land exactly on "still have their place". Don't add a pause after it.
3. **B7 versus.** The right caption "one AI with tools" repeats the label "One AI". "with tools" alone is enough (optional).
4. If TTS runs long, cut words in the writer's order: "only" (B3), then "So," (B11). Never cut a hedge.
5. Rebuild the storyboard with the claims as listed (B7: C2/C4, B9: C8) and run `npm run check`.

VERDICT: PASS
