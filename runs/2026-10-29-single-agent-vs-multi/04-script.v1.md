# Script: Team of AIs or just one? Anthropic says both
Template: Before / after (2025 team win → 2026 one-AI advice from a different job → when helpers still win → catch), closing with a loop ending
Hook: R2-H1 (final version in 05-critique.md "## Round 2: hooks"; from 03-hooks.md Round 2)
Target duration: 49 s (122 words at 2.5 words/s; about 46 s at the +6% voice rate; brand range 20-50 s)  Word count: 122

| Beat | Purpose (hook / context / reveal / re-hook / catch / payoff / cta) | Voiceover line | On-screen text | Claims |
|---|---|---|---|---|
| 1 | hook | Anthropic's AI team beat a solo AI by ninety point two percent. Now Anthropic says one AI *frequently* wins. Both are true. | `hook`: headline "Team of AIs or just one?" · accent "one" · kicker "AI NEWS". (Split visual per critic: left "2025" / "+90.2%" / label "internal research eval"; right "2026" / icons merge / "frequently" stamp.) | C13, C2, C0, C1, C9 |
| 2 | payoff | That win was on Anthropic's own research test. | `stat`: value 90.2 · prefix "+" · suffix "%" · decimals 1 · label "AI team vs solo AI, 2025" · context "Anthropic internal research eval" | C13 |
| 3 | payoff (closes "both are true") | The one-AI win came from a different job: several company deployments, with one AI that grabs tools only when needed. | `receipt`: publisher "Anthropic" · headline "Building agents: When to fold subagents into your main agent loop" · date "22 Oct 2026" · url https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop | C1, C2, C0 |
| 4 | re-hook | Often cheaper and faster too. No figures, though. | `statement`: text "Often cheaper and faster. No figures published." · accent "often" | C4, C2 |
| 5 | reveal (added value) | Helper AIs still have their place, Anthropic says. When one AI is swamped with information. Or when jobs must run side by side. | `list`: title "Helpers still have their place" · items "One AI swamped with info" / "Jobs must run side by side" | C9, C0 |
| 6 | catch | The catch: in Anthropic's sample support bot, two helpers merged, and it skipped checking an order's delivery date. One run in two. | `catch`: title "The catch" · text "Sample bot: after a merge, it skipped the delivery date · 1 of 2 runs" | C8 |
| 7 | cta (loop) | Anthropic's advice back in January: start simple, add more only with evidence. So, team of AIs, or just one? | `cta`: prompt "Team of AIs or one? Comment your pick." · sub "Anthropic, Jan 2026: start simple, add only with evidence" | C12 |

Word count per beat: 22 / 8 / 20 / 8 / 23 / 22 / 19 = 122 words → 48.8 s at 2.5 words/s (about 46 s at the +6% voice rate). Inside the 50 s max.
Approximate timeline at 2.5 words/s: B1 0-8.8 s · B2 -12.0 s · B3 -20.0 s · B4 -23.2 s · B5 -32.4 s · B6 -41.2 s · B7 -48.8 s. At the effective 2.65 words/s, "different job" (the answer to "Both are true") lands by about 17-19 s.

Notes for the director and voice:
- Beat 1 is the approved spoken hook word for word (only "90.2%" spelled out for text-to-speech). Read "frequently" with weight; the asterisks are emphasis only, not spoken.
- 90.2% always sits with "internal research eval" (C13): hook visual label, stat context and caption. Never "one research task". The 15x token figure is not used anywhere. C3 (2x), C14 (266 vs 21) and C16 (false) are not used.
- B6 is kept in scope for C8: a sample support bot (not production), two helpers merged (one folded into another), a break in 1 of 2 runs. The delivery-date detail comes from C8's verified note ("the main agent answered an order question without asking the shipping specialist for the delivery date; the break appeared in one of two runs"); it is not in C8's quote or safe_text (C8 has no safe_text; status `verified`).
- No "U-turn" or "contradicted itself" framing. B3 frames the 2026 result as a different job; B5 adds the C9 conditions as extra value.
- Numbers on screen: 90.2 (C13), 2025 (C13), 2026 / 22 Oct 2026 (C1), Jan 2026 (C12), 1 of 2 runs (C8). Nothing else.
- Scene types run hook → stat → receipt → statement → list → catch → cta: 7 scenes, no type repeated back to back.
- "Helper AIs" is the plain-language stand-in for "subagents"; "swamped with information" stands in for C9's "measurable performance degradation from context bloat" (not made stronger).

## ABT check
Anthropic's AI team beat a solo AI by 90.2%, AND now Anthropic says one AI frequently wins, BUT that win was on Anthropic's own research test, BUT the one-AI win came from a different job, several company deployments with an AI that grabs tools only when needed, often cheaper and faster too, BUT no figures were published. THEREFORE helper AIs still have their place: when one AI is swamped, or jobs must run side by side. BUT merging has a catch: in a sample support bot, two merged helpers skipped a delivery-date check in one run of two. THEREFORE start simple and add more only with evidence. So: team of AIs, or just one?

Connectors: and, but, but, but, therefore, but, therefore. Only the first link is "and" (the two halves of the hook). No beat in the voiceover now opens on "But" back to back: B4 ends on "though", B5 opens on "Helper AIs". The ending question loops back into the hook's first line.

## Post kit
Caption: Anthropic's AI team beat a solo AI by 90.2%. Now it says one AI frequently wins. Both are true.
The 2025 win was on Anthropic's internal research eval. The 2026 advice comes from its comparisons across several company deployments, with no figures published, and it says helper AIs "still have their place".
Team of AIs or just one? Tell us which you'd trust.
Hashtags: #AIagents #Anthropic #Claude #MultiAgent #AIexplained #AItools #TechNews
First comment: Sources: Anthropic, "Building agents: When to fold subagents into your main agent loop" (22 Oct 2026) https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop · Anthropic Engineering, "How we built our multi-agent research system" (13 Jun 2025) https://www.anthropic.com/engineering/multi-agent-research-system · Anthropic, "Building multi-agent systems: When and how to use them" (23 Jan 2026) https://www.claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them

## Changes in this round
1. Fix 1 (C13 truth fix): "one research task" removed everywhere. B2 voiceover is now "That win was on Anthropic's own research test." Stat context is now "Anthropic internal research eval", the hook visual label is now "internal research eval", and caption line 2 now says "The 2025 win was on Anthropic's internal research eval."
2. Fix 2: B3 now says it plainly: "The one-AI win came from a different job: several company deployments...". I kept "several" (C2's "several enterprise deployments") instead of the example's "real".
3. Fix 3: B5 drops the opening "But" and is now three short sentences: "Helper AIs still have their place, Anthropic says. When one AI is swamped with information. Or when jobs must run side by side." It is 23 words. I kept "with information" so "swamped" stays understandable.
4. Fix 4: B4 is shortened to "Often cheaper and faster too. No figures, though." (12 → 8 words).
5. Fix 5: B6 is now concrete and in scope: a sample support bot, two helpers merged, and it skipped checking an order's delivery date in one run of two. "The team" is gone. I checked that the delivery-date detail is in C8's `note` (verified claim, no safe_text). The screen catch is now "Sample bot: after a merge, it skipped the delivery date · 1 of 2 runs". It says "it" rather than the critic's "merged helpers skipped", because in C8 the main agent skipped the check.
6. Fix 6: B7 voiceover now says "Anthropic's advice back in January: ...".
7. Recount: 115 → 122 words. That is 48.8 s at 2.5 words/s, about 46 s at +6%, so ≤ 50 s. The timeline above is updated. `npm run check` still needs to run once the storyboard exists.
