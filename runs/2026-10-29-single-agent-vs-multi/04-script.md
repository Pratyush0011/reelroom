# Script: When one AI beats a team (and when it doesn't)

> **v4 note (added 2026-11-01).** The voiceover below is still exact: v4 speaks these words unchanged, split across 18
> scenes. The on-screen text and scene notes describe v2's 11 scenes and no longer match the video. For what appears on
> screen, read `storyboard.json`.

Template: Myth vs reality, used lightly. Belief: "more AIs = better" → one AI frequently wins → when the team still wins (by ~16.6 s) → Anthropic's own words on the page → cost and speed → catch → January advice → loop question.
Hook: R3-H6, final tightened version in 05-critique.md "## Round 5: hooks (v2)"
Target duration: 43 s (108 words at 2.5 words/s; about 40.8 s at the +6% voice rate; brief 32-42 s, brand range 20-50 s)  Word count: 108

Beat kind: **P** = picture beat (versus / stat / document / quote / hook / catch scene), **S** = sentence beat (`statement` scene). One scene per beat: 11 beats, 11 scenes (engine max 12). Statement scenes: 2 (B3, B5), within the ≤2 rule.

| Beat | Purpose (hook / context / reveal / re-hook / catch / payoff / cta) | Kind | Voiceover line | On-screen text | Claims |
|---|---|---|---|---|---|
| 1 | hook | P | One AI frequently beats a team of AI bots, Anthropic found. | `hook`: headline "When one AI beats a team" · accent "one" · kicker "ANTHROPIC". Headline slams in word by word. | C0, C2 |
| 2 | hook (opens the loop) | P | Here's when it doesn't. | `versus`: left {label "Team of AIs", icon bot, count 5} · right {label "One AI", icon bot, count 1, caption "grabs tools as needed"} · winner right · verdict "Frequently. Not always." | C0, C2, C9 |
| 3 | context | S | The winner: one AI using tools only when needed. | `statement`: "The winner: one AI + tools when needed" · accent "winner" | C0 |
| 4 | payoff (loop, part 1) | P | A team still wins when one AI is overloaded with information. | `versus`: title "When the team wins" · left {label "Team of AIs", icon bot, count 5} · right {label "One AI", icon bot, count 1, caption "overloaded with information"} · winner left · verdict "Team wins" | C9 |
| 5 | payoff (loop, part 2) | S | Or when jobs must run at the same time. | `statement`: "Or jobs running at the same time" · accent "same time" | C9 |
| 6 | paper trail | P | In Anthropic's own words, teams "still have their place." | `document`: publisher "Anthropic" · quote "To be clear, subagents still have their place, including at the research frontier." · highlight "still have their place" · date "22 Oct 2026" · url https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop | C2, C0, C1 |
| 7 | re-hook (cost and speed) | P | Still, one AI with tools was often cheaper, faster. No numbers shared. | `versus`: title "Cost and speed · company use" · left {label "Team of AIs", icon bot, count 5} · right {label "One AI", icon zap, count 1, caption "one AI with tools"} · winner right · verdict "Often. No numbers shared." | C2, C4 |
| 8 | catch (re-hook) | P | The catch: in Anthropic's sample support bot, they merged two helper bots. | `catch`: title "The catch" · text "Sample support bot: two helper bots merged into one" | C8 |
| 9 | catch (detail) | P | It skipped checking the delivery date, in one of two test runs. | `stat`: value 1 · suffix "of 2" (schema max 4 chars, so no leading space; engine should space it) · decimals 0 · label "test runs: delivery date skipped" · context "Anthropic sample support bot" | C8 |
| 10 | payoff (advice) | P | Anthropic's January advice: start simple. Add more only with evidence. | `quote`: quote "Start with the simplest approach that works, and add complexity only when evidence supports it." · who "Anthropic" · role "Claude blog, Jan 2026" | C12 |
| 11 | cta (loop) | S/P | So, one AI or a team? Comment your pick. | `cta`: prompt "One AI or a team? Comment your pick." · sub "Anthropic: one AI frequently wins, not always" | C2 |

Word count per beat: 11 / 4 / 9 / 11 / 9 / 9 / 12 / 12 / 12 / 10 / 9 = 108 words → 43.2 s at 2.5 words/s (about 40.8 s at the +6% voice rate). Every beat ≤ 12 spoken words.
Approximate timeline at the effective 2.65 words/s: B1 0-4.2 s · B2 -5.7 s · B3 -9.1 s · B4 -13.2 s · B5 -16.6 s · B6 -20.0 s · B7 -24.5 s · B8 -29.1 s · B9 -33.6 s · B10 -37.4 s · B11 -40.8 s.
Loop payoff: the first answer (B4) lands by ~13 s and B5 closes the loop by ~16.6 s. B6 confirms it in Anthropic's own words (~20 s).
Duration note: 43.2 s at the planning rate is just over the 42 s brief, but about 40.8 s at the real +6% voice rate, inside the brief and well inside brand's 50 s. Measure the real TTS. If it runs long, cut "only" (B3) first, then "So," (B11). Never cut a hedge ("frequently", "often", "sample", "test").

Notes for the director and voice:
- B1 + B2 together are the approved spoken hook word for word: "One AI frequently beats a team of AI bots, Anthropic found. Here's when it doesn't." Read "frequently" with weight (C2's hedge).
- Scene order (critic's Round 6): hook → versus → statement → versus → statement → document → versus → catch → stat → quote → cta. 2 statements; 3 versus scenes with different outcomes (right "Frequently. Not always." / left "Team wins" / right "Often. No numbers shared."); no type twice in a row.
- B3 opens on "The winner:" so it is heard as a description of the one AI, not as the promised "when it doesn't".
- B6 is the paper-trail beat. The `document` quote is verbatim from C2/C0's checked source quote ("To be clear, subagents still have their place, including at the research frontier.", claude.com article, 22 Oct 2026). The voiceover only puts the verbatim words "still have their place" inside quotation marks; "teams" outside the quotes is our plain stand-in for "subagents". Use the real page screenshot; the highlighter lands on "still have their place" as the voice says it.
- B7: "Still," turns the energy back after B6. "One AI with tools" is the subject, so "it" can't be misheard as the team. "Several companies" is gone from voice and screen; the versus title says "company use" (C2: "across several enterprise deployments"). "Often" = C4; "No numbers shared" = C2 "gives no figures". No cost or speed figure exists; do not invent one. The right group uses the `zap` icon so the frame doesn't look like a replay of B2.
- B8-B9 keep v1's verified C8 wording, now active voice: sample support bot (not production), they (Anthropic) merged two helper bots (one folded into another), the bot skipped the delivery date, one of two *test* runs. The `stat` label says "test runs" so "1 of 2" is not read as a general failure rate.
- B10's `quote` is verbatim C12 minus "Our advice?" (Claude blog, 23 Jan 2026). The voiceover shortens it and says "January" so it does not sound new.
- B4 "overloaded with information" is C9's "measurable performance degradation from context bloat", not made stronger. B5 "at the same time" is C9's "tackled in parallel".
- Numbers on screen: 22 Oct 2026 (C1), Jan 2026 (C12), 1 of 2 (C8). Nothing else. 90.2% and 15x are not used.
- No U-turn or "Anthropic contradicted itself" framing anywhere.

Say-back check (a stranger's one-hearing repeat):
- B1 "One AI often beats a team of AIs." · B2 "But not always." · B3 "The one that wins uses tools when it needs them." · B4 "A team wins if one AI has too much information." · B5 "Or if jobs happen at the same time." · B6 "The company says teams still have a place." · B7 "Still, one AI was often cheaper and faster, no numbers given." · B8 "In a test bot, they joined two helper bots." · B9 "It forgot the delivery date in one of two tests." · B10 "Start simple, add more only with evidence." · B11 "Which do you pick?" Each say-back is no longer or vaguer than the line.

## ABT check
One AI frequently beats a team of AI bots, Anthropic found, BUT not always. The winner is one AI using tools only when needed, BUT a team still wins when one AI is overloaded with information, or when jobs must run at the same time. AND in Anthropic's own words, teams "still have their place." BUT still, one AI with tools was often cheaper and faster, though no numbers were shared. BUT there's a catch: in Anthropic's sample support bot, they merged two helper bots, AND it skipped checking the delivery date in one of two test runs. THEREFORE Anthropic's January advice: start simple, add more only with evidence. So, one AI or a team?

Connectors between beats: but (B2), but (B4), and (B6, confirmation, not a consequence), but (B7), but (B8), and (B9, detail of the catch), therefore (B10). Only one "therefore", and it is a real consequence. The two "and" links each sit inside a turn, so there is no "and then" chain. The closing question loops back to the hook headline.

## Post kit
Caption: One AI frequently beats a team of AI bots, Anthropic found. Not always, though.
A team still wins when one AI is overloaded with information, or when jobs must run at the same time. In Anthropic's words, teams "still have their place". The comparisons covered several enterprise deployments, with no numbers published.
One AI or a team: which would you trust with your work?
Hashtags: #AIagents #Anthropic #Claude #AItools #AIexplained #TechNewsIndia #ArtificialIntelligence
First comment: Sources: Anthropic, "Building agents: When to fold subagents into your main agent loop" (22 Oct 2026) https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop · Anthropic, "Building multi-agent systems: When and how to use them" (23 Jan 2026) https://www.claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them

## Changes in this round
This is **v2** of the reel (v1 is saved as 04-script.v1.md, built on R2-H1). This round applies the critic's Round 6 fixes to the first v2 draft.
1. Fix 1: B3 is now "The winner: one AI using tools only when needed." Screen: "The winner: one AI + tools when needed", accent "winner". It can no longer be heard as the answer to "when it doesn't".
2. Fix 2: B4 "swamped" → "overloaded" (VO, versus caption, caption). B5 is now "Or when jobs must run at the same time." Screen: "Or jobs running at the same time", accent "same time".
3. Fix 3: B7 is now "Still, one AI with tools was often cheaper, faster. No numbers shared." The subject is explicit, so "it" can't mean the team, and "several companies" is gone. It changed from `statement` to a `versus` picture beat: title "Cost and speed · company use", right icon `zap` with caption "one AI with tools", winner right, verdict "Often. No numbers shared." (C2, C4).
4. Fix 4: caption line 2 now says "The comparisons covered several enterprise deployments, with no numbers published." (C2 safe_text).
5. Fix 5: B9 is now "It skipped checking the delivery date, in one of two test runs." It is a mandatory `stat` picture beat: value 1, suffix "of 2", label "test runs: delivery date skipped", context "Anthropic sample support bot". The suffix has no leading space because the schema caps suffix at 4 characters; the director/engine should space it.
6. Fix 6: B8 is active voice: "The catch: in Anthropic's sample support bot, they merged two helper bots." Catch text: "Sample support bot: two helper bots merged into one".
7. Fix 7: ABT relabelled. B5→B6 is now "and" (confirmation). With "Still," B6→B7 is a real "but". The only "therefore" is the January advice.
8. Fix 8, partly applied: B10 is shortened to "Anthropic's January advice: start simple. Add more only with evidence." (10 words). I kept "evidence" instead of "proof": C12 says "when evidence supports it", and "proof" is stronger than the source. The quote card stays verbatim C12.
9. Fix 9: recount is 108 words (11 / 4 / 9 / 11 / 9 / 9 / 12 / 12 / 12 / 10 / 9). That is 43.2 s at the planning rate and about 40.8 s at +6%. B4 lands by ~13.2 s and B5 closes the loop by ~16.6 s. The timeline above is updated.
10. Statement budget: 4 → 2 (B3, B5). Scene order is exactly the critic's: hook → versus → statement → versus → statement → document → versus → catch → stat → quote → cta. Storyboard claims: B7 versus C2/C4, B9 stat C8. Run `npm run check` once the storyboard is rebuilt.

Carried over from the first v2 draft: new R3-H6 hook word for word over B1/B2; Round 5 pay-off order; 90.2%, 15x, "Both are true" and the receipt beat dropped; paper-trail `document` beat (B6) with C2/C0's verbatim quote; v1's verified catch (C8) and dated advice (C12) wording reused; every beat ≤ 12 spoken words; plain words for an Indian non-expert viewer (no "subagent", "deployment", "context" or "latency" in the voiceover; "subagents" only inside the verbatim on-screen quote).
