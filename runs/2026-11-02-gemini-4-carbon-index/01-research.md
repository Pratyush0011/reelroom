# Google's Gemini 4 Carbon is the new #1 AI on Artificial Analysis's index, by one point, and you can't use it yet

## One-line story
On 28 Oct 2026 Google announced Gemini 4 Carbon. Independent evaluator Artificial Analysis ranks it #1 on its brand-new Intelligence Index v5 with 59 points, one point ahead of Claude Opus 5.5. For now only a small group of cybersecurity defenders can use it.

Premise check (input: "Google launched Gemini 4 Carbon on 28 October 2026 and says it ranks first on the Artificial Analysis Intelligence Index"):
- Does "Gemini 4 Carbon" exist? YES. Google's official blog post, 28 Oct 2026, by Koray Kavukcuoglu.
- Launched 28 Oct 2026? YES for the announcement. Access is staged: "Starting this week" for a subset of cyber defenders. There is no public API or consumer access, so "launched" means announced with limited rollout, not generally available.
- Did Google claim #1 on AA? YES. The blog says: "Carbon ranks #1 on the recently updated v5.0 of Artificial Analysis Intelligence Index at 59."
- What does Artificial Analysis itself show? Its own article (28 Oct) is headlined "Gemini 4 Carbon is the new #1 on the Artificial Analysis Intelligence Index v5". The live leaderboard (checked 2026-11-02) has Gemini 4 Carbon (high) first at 59, followed by Claude Opus 5.5 (max with fallback) at 58, Gemini 4 Carbon (medium) at 58, and Claude Opus 5.5 (xhigh) and GPT-6 Astra (max) both at 57.
- Freshness: 5 days old as of 2026-11-02. Still current, and no model had overtaken it at time of checking.

## Why a normal person should care (3 bullets max)
- The "best AI in the world" title just changed hands again, and the gap is one point out of 100. Rankings this close flip weekly, so "#1" is a weak reason to pick a chatbot.
- The new #1 isn't something you can use. Google is giving it first to cybersecurity defenders, because the same skill that finds and patches software holes could help attackers.
- When it does open up, developers get an introductory price of $2/$10 per million input/output tokens, rising to $4/$20 later, with no end date announced for the intro price.

## The surprising part
- Claude Opus 5.5 was #1 on Index v5 for about one day. Artificial Analysis launched v5 on 27 Oct with "Claude Opus 5.5 (max) leads at 58", and Carbon took the top spot on 28 Oct.
- Google's previous model, Gemini 4 Argon, scores only 50 on the same v5 index. That is a 9-point jump in roughly two weeks (Google says Carbon came "two weeks" after Argon).
- Carbon is the most accurate model on AA-Omniscience, yet it makes things up more than its predecessor: hallucination rate rose from 4% to 11% vs Argon (The Decoder, citing AA). AA says it is still far below GPT-6 Astra and Opus 5.5, which are both at 50%.
- According to AA, it's cheaper to run than its nearest rival: $7.76 per Index task, about 23% less than Claude Opus 5.5 ($10.04), and it uses 29% fewer output tokens (123k vs 173k).

## The catch
- **One-point lead on a one-day-old test.** Carbon scores 59 to Opus 5.5's 58. Index v5 is new (27 Oct, with 2 new benchmarks, 3 upgrades and 3 removals), so v5 scores can't be compared with older v4 numbers. For example, AA's Sept 30 Argon article gave Argon 53 on the older index, but on v5 it is 50.
- **It doesn't win everything.** Carbon is #1 in only 4 of the 9 Index evaluations. On AA's Coding Agent Index, Claude Code with Opus 5.5 scores 62 to Carbon's 59. On AA-Briefcase (knowledge work), Carbon (1609) trails Kimi K3.1 Pro, Muse Wonder and Grok 4.7.
- **Not available.** AA says it "is being rolled out to selected users and is not yet publicly available." Google gives no date for developers or consumers.
- **Price will rise.** $2/$10 is introductory. VentureBeat notes Google "hasn't specified" when it ends, and AA's cost figures already use the standard $4/$20.
- **Google's own cyber numbers are self-reported.** SEC-bench Pro 88.2%, ExploitGym 54.8% and CWE-bench 71.0% were measured "without guardrails". VentureBeat says the safety improvements "remain company-reported measurements", and The Decoder says some internal results "can't be independently verified."
- **Vals AI disagrees.** On its Vals Index, Carbon is #2, not #1 (70.36%), so rankings depend on who builds the test.

## Timeline (dated)
- 2026-09-30: Artificial Analysis article on Gemini 4 Argon (score 53 on the pre-v5 index, tied with GPT-6 Astra max). Tier 3/4 sources say Argon was announced 30 Sep with wider rollout around 13 Oct (not verified on Google's site).
- ~2026-10-07 (approx.): Tier 4 reports describe "Carbon" as the codename of an internal Gemini 4 checkpoint (not verified, low weight).
- 2026-10-27: Artificial Analysis launches Intelligence Index v5. "Claude Opus 5.5 (max) leads at 58", then GPT-6 Astra (max) 57, GPT-6.1 Sol (max) 55, Gemini 4 Argon (high) 50.
- 2026-10-28: Google announces Gemini 4 Carbon (blog.google, Koray Kavukcuoglu). Access starts "this week" for a subset of cyber defenders.
- 2026-10-28: Artificial Analysis publishes "Gemini 4 Carbon is the new #1 on the Artificial Analysis Intelligence Index v5" (59).
- 2026-10-28: Coverage from VentureBeat (Carl Franzen) and The Decoder (Matthias Bastian).
- 2026-11-02 (today): The AA leaderboard still shows Gemini 4 Carbon (high) #1 at 59.

## Key people/orgs
- Google DeepMind / Google: maker. Koray Kavukcuoglu (SVP, Google DeepMind and Chief AI Architect) wrote the launch post.
- Varun Mohan, head of Google Antigravity, is quoted by VentureBeat about internal use.
- Artificial Analysis: independent benchmarking company that runs the Intelligence Index (v5.0, 9 evaluations in 4 categories weighted 25% each: Knowledge Work, Coding, Science, General).
- Anthropic (Claude Opus 5.5, now #2 at 58) and OpenAI (GPT-6 Astra at 57, GPT-6.1 Sol at 55): main rivals.
- Vals AI: second independent evaluator, which ranks Carbon #2.
- Fairwind Program: Google's trusted-partner access program for Carbon.

## Visual assets (url, what it shows)
- https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/ : header image (alt text: "Faceted iridescent crystal surrounded by floating white number 4s"), Google's benchmark table, SEC-bench Pro / ExploitGym / CWE-bench / Gray Swan IPI charts. Google copyright, so use as a screenshot "receipt" with attribution.
- https://artificialanalysis.ai/leaderboards/models : live leaderboard showing Carbon (high) at 59 on top and Opus 5.5 at 58. Good for a "receipt" screenshot.
- https://artificialanalysis.ai/articles/gemini-4-carbon-new-number-1 : AA's own launch-day analysis with Index, cost-per-task and Omniscience charts.
- https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5 : the 27 Oct v5 launch showing Opus 5.5 leading at 58 (the "before" frame).
- https://artificialanalysis.ai/models/comparisons/gemini-4-carbon-vs-claude-opus-5-5 : head-to-head comparison page.

## Open questions (things you could not confirm)
- Exact Argon dates: 30 Sep (announcement) vs ~13 Oct (wider rollout) come only from tier 3/4 sources. I could not open Google's Argon post. Google's Carbon post says Argon came "two weeks" earlier.
- When Carbon's introductory price ends and when developers or consumers get access. Google gives no date.
- AA's 50% launch discount is described by AA, and "no confirmed end date" is AA's wording as summarised. Exact verbatim wording not captured.
- A tier 4 blog claimed AA's Terminal-Bench 4.0 result was 65.2%, but AA's own article says 64%. I used AA's figure.
- The "15 of the 17 benchmark rows" figure (VentureBeat) counts rows in Google's own table. I did not count them myself.
- The AA leaderboard page shows no "last updated" date, so the ranking was verified as of my fetch on 2026-11-02 only.
- Whether Carbon is a separately trained model or built on Argon: Google says it "builds on" Argon, and the details are unknown.

## Sources (tier, title, publisher, date, url)
- Tier 1: "Gemini 4 Carbon: our next frontier model", Google (blog.google), 2026-10-28, https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/
- Tier 2: "Gemini 4 Carbon is the new #1 on the Artificial Analysis Intelligence Index v5", Artificial Analysis, 2026-10-28, https://artificialanalysis.ai/articles/gemini-4-carbon-new-number-1
- Tier 2: LLM Leaderboard, Artificial Analysis, live (fetched 2026-11-02), https://artificialanalysis.ai/leaderboards/models
- Tier 2: Artificial Analysis Intelligence Index v5 launch article, Artificial Analysis, 2026-10-27, https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v5
- Tier 2: Artificial Analysis Intelligence Index v5.0 (evaluation page), Artificial Analysis, live, https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index
- Tier 2: "Gemini 4 Argon: Google is back as one of the top three labs in intelligence achieved", Artificial Analysis, 2026-09-30, https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs
- Tier 2: Gemini 4 Carbon model page, Vals AI, date not captured, https://www.vals.ai/models/google_gemini-4-carbon (seen in search results only, not fetched)
- Tier 3: "Google unveils Gemini 4 Carbon, retaking the world's no. 1 spot on updated, harder benchmarks — but access is limited", VentureBeat (Carl Franzen), 2026-10-28, https://venturebeat.com/technology/google-unveils-gemini-4-carbon-retaking-the-worlds-no-1-spot-on-updated-harder-benchmarks-but-access-is-limited
- Tier 3: "Google Deepmind releases Gemini 4 Carbon just two weeks after Argon with gains across the board", The Decoder (Matthias Bastian), 2026-10-28, https://the-decoder.com/google-deepmind-releases-gemini-4-carbon-just-two-weeks-after-argon-with-gains-across-the-board/
- Tier 3: "Claude Opus 5.5 tops Artificial Analysis' revised AI index with 58 points", RuntimeWire (Ryan Merket), 2026-10-28, https://runtimewire.com/article/claude-opus-5-5-tops-artificial-analysis-revised-ai-index-with-58-points
- Tier 3: "Google Launches Gemini 4 Carbon for Cyber Defenders First...", gHacks, 2026-10-31, https://www.ghacks.net/2026/10/31/google-launches-gemini-4-carbon-for-cyber-defenders-first-with-api-pricing-from-2-per-million-tokens/ (search result only)

## Fact-check

Checked 2026-11-02 by the fact-checker. Every source below was re-fetched independently. **Publishable: yes.** 12 verified, 7 need softer wording, 0 unverified, 0 false.

| ID | Claim (short) | Verdict | Why / safe wording |
|---|---|---|---|
| C0 | Google "launched" Carbon 28 Oct, says #1 on AA | verified_with_wording | It was announced, with access only for a subset of cyber defenders. Say "announced", not "launched". |
| C1 | Google calls it its strongest model | verified | Verbatim in Google's post. Keep it attributed to Google. |
| C2 | Carbon (high) 59, #1 on Index v5 | verified | AA article, v5.0 eval page ("Gemini 4 Carbon (High) scores the highest"), comparison page ("scores 59"), live leaderboard. |
| C3 | One-point lead over Opus 5.5 (58) | verified | AA comparison page: "Claude Opus 5.5 (Max, Default Fallback) at 58". Lead applies to Carbon (high) only, since Carbon (medium) is also 58. |
| C4 | v5 launched 27 Oct, Opus led at 58 | verified | AA v5 article dated 27 Oct, RuntimeWire confirms. |
| C5 | 60% private, first-time majority | verified | AA's own description of its index. |
| C6 | 9 evals, 4 categories x 25% | verified | AA v5.0 page. |
| C7 | Argon 50 on v5 | verified | Traced to AA: "Gemini 4 Argon (high) is next at 50". Don't compare with the old 53 (v4). |
| C8 | Carbon two weeks after Argon | verified_with_wording | "Google says". Argon was announced and benchmarked by AA on 30 Sep, four weeks earlier. Drop "9-point jump in two weeks". |
| C9 | Not publicly available, no date | verified | Google (tier 1) and AA. |
| C10 | $2/$10 intro, then $4/$20, no end date | verified | Google post, with VentureBeat and AA confirming no end date. |
| C11 | $7.76/task, ~23% cheaper than Opus | verified | AA, at standard pricing. 7.76 vs 10.04 = 22.7%. |
| C12 | 123k vs 173k tokens, 29% fewer | verified_with_wording | Attribute to AA. |
| C13 | Omniscience accuracy 48 to 58%, hallucination 4 to 11% | verified_with_wording | Found in AA's own article, not just The Decoder. Must add context that it is still the second-lowest hallucination rate AA measured (Opus 5.5 and GPT-6 Astra at 50%). |
| C14 | Coding Agent Index 62 vs 59 | verified_with_wording | Name the harnesses: Claude Code vs Antigravity CLI. Don't confuse with the Index 59. |
| C15 | Cyber scores 88.2 / 54.8 / 71.0, no guardrails | verified_with_wording | "Google reports", tested without guardrails, not independently checked. |
| C16 | Vals AI ranks Carbon #2, 70.36% | verified_with_wording | Vals page checked directly: #2 behind Claude Sonnet 5.5. The score has moved (70.36% to 70.45%), so say "about 70%". |
| C17 | Live leaderboard still #1 on 2 Nov | verified | Re-fetched: Carbon (high) 59, Opus 5.5 (max w/ fallback) 58, Carbon (medium) 58. No last-updated date, so say "as of 2 Nov". |
| C18 | Kavukcuoglu: Carbon runs for days | verified | Verbatim in his bylined post. Say "wrote", not "said". |

Notes for writers outside the claims list: "Carbon is the most accurate model on AA-Omniscience" (Surprising part) is not a checked claim. AA gives Carbon 54 on Omniscience, 6 points ahead of Opus 5.5 (48), but I did not see AA call it the top model or the most accurate one. Don't use "most accurate" unless it is added as a claim and checked. The "15 of 17 benchmark rows" figure is unchecked. Don't use it.
