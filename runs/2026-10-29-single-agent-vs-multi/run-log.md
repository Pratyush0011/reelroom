# Run log

Input: Anthropic says single AI agents beat multi-agent setups (reported week of 19 Oct 2026)
Started: 2026-10-29

- [1 research] researcher → 16 claims, 3 core; primary source = Anthropic article 22 Oct 2026; headline 'beats' originates in press coverage, not Anthropic
- [2 fact-check] fact-checker → PUBLISHABLE: yes. 9 verified, 7 softened (incl. C0 premise: true only with qualifiers), 1 FALSE (C16: press misreported a Vals study as testing 10-100 agents; primary study capped at 5)
- [3 hooks] hook-writer → 3 angles, 12 hooks, 9 archetypes; C16 excluded
- [3 hooks critique r1] retention-editor → REVISE. Best 18/25 (H6, H3). H12 disqualified on truth (implied '12x better'); H1 truth 3/5. Proposed rewrite of H6 scored 22/25.
- [3 hooks r2] hook-writer → 6 plain-language hooks; adopts critic's rewrite as R2-H1
- [3 hooks critique r2] retention-editor → PASS. R2-H1 22/25 (Truth 4); backup R2-H3 19/25. Fixes: stagger frame-1 elements, shorten eval label.
- [4 script] script-writer → 7 beats, 115 words (~43 s at +6%), claims C0 C1 C2 C4 C8 C9 C12 C13
- [4 script critique r3] retention-editor → REVISE 25/35. Truth fail: 'one research task' misstates C13 (critic's own R2 wording; VO B2, label, caption). Pay-off timing deviation accepted if B3 states 'different job'. B5 long list = main drop point.
- [4 script r2] script-writer → applied 6 fixes, 122 words
- [4 script critique r4] retention-editor → PASS 31/35. All truth issues resolved; 'different job' at ~14.3s. Polish: thin 50s margin, B6 wording/screen text, stagger B5 list.
- [5 storyboard] director → 7 scenes; moved 'Both are true.' to s2 because the spelled-out hook was 22 words (gate max 20). npm run check: PASS
- [6 voice] edge-tts → 52.2 s; GATE FAIL (max 50). Director sent back to trim say lines.
- [6 voice r2] director trimmed 10 words (no hedges cut) → 49.2 s; npm run check PASS
- [7 visual-qa r1] visual-qa → FIX: 1 blocker (clipped source chip on the hook frame), 4 majors (orphan words, '1 of / 2 runs' split, crowded CTA). Engine fixed (1-publisher chip, balanced wrapping); director applying text fixes.
- [7 visual-qa r2] visual-qa → FIX: 4 of 5 resolved; s4 'No figures' split across lines. Director fix round 2 (last allowed).
- [7 director fix r2] s4 → 'Often cheaper. No figures.'
- [7 visual-qa r3] visual-qa → SHIP
- [8 render] final.mp4 49.2 s 1080x1920 h264/aac; cover.png; POST.md written. DONE.

## Version 2 (2026-10-30), after user feedback: hook too confusing, voice not good enough, video not publishable
- playbooks updated: hook say-back test + one-idea rule; director reference styles (references.md); new scenes document + versus; ≤5 s scenes
- [v2 hooks] hook-writer → 8 clarity-first hooks; retention-editor → PASS: 'One AI frequently beats a team of AI bots, Anthropic found. Here's when it doesn't.' 22/25 (clarity 5, truth 5)
- [v2 voice] user picked ElevenLabs Daniel (free plan blocks Indian library voices via API; voice design is paid-only)
- [v2 script] script-writer → 11 beats; retention-editor → REVISE 25/35 (2 beats fail say-back; 'several companies' overstates C2; 4 statement scenes > 2)
- [v2 script r2] retention-editor → PASS 32/35, all beats pass say-back
- [v2 direction] director → style B (visual explainer) + A (paper trail); 3 references; 11 scenes; check PASS
- [v2 voice] ElevenLabs Daniel: 54.7 s → gate FAIL. Engine fixes (silence trim, clip cache, pitch-preserving tempo 1.1) → 49.7 s, PASS, no re-generation cost
- [v2 visual-qa r4] visual-qa → FIX: no blockers; 5 majors (blank page capture [stale], s2 picture contradicts voice, s7 clones s2, s7 stray '·', s11 orphan). Engine: reduced-motion screenshots, 'merge' scene, hook matchup. Director fixing.
- [v2 director fix] hook matchup, open contest s2, compare s7, merge s8, cta shortened; no say lines changed (voice from cache)
- [v2 visual-qa r5] visual-qa → SHIP ('now a publishable AI-news reel'); showrunner applied optional polish: merge in warning colour
- [v2 render] final.mp4 49.7 s, ElevenLabs Daniel (eleven_v4, tempo 1.1); POST.md updated. DONE.

## Version 3 (2026-10-30), after user feedback: 'static, basic; inspiration research not really enabled; needs fast motion graphics + B-roll'
- new: reel-inspiration skill (preloaded into director), gate requiring ≥5 refs incl. ≥3 real short-form reels + motion recipe
- new: motion layer (transitions, camera drift/punch-ins, emphasis stickers, shake, SFX), animated background, licensed B-roll (Wikimedia Commons + Openverse, no keys), broll scene
- new gate: ≤2.0 s per visual change, no scene > 4.5 s
- [v3 direction] director → reel-inspiration: 7 references (5 YouTube Shorts with 13k–876k views, 2 documentaries: Vox, ColdFusion), studied via YouTube preview storyboards; motion recipe; 17→18 scenes; B-roll on 11 scenes (Wikimedia Commons/Openverse, licensed)
- [v3 voice] 51.7 s → tighter joins (engine) → 48.9 s; s9 4.6 s > 4.5 → director split → 18 scenes, 49.1 s, 1.2 s per visual change; check PASS
- [v3 visual-qa r6] visual-qa → FIX: 3 blockers (stale uncredited B-roll from old scene ids; rolling-papers pack; sticker hiding headline), majors (head-of-state footage, Reichsmark stamp, black clip, 4 sticker collisions). Engine: clean media rebuild, 8 candidates/query, risky-subject filter, brightness check, emphasis moved into caption band.
- [v3 fixes] engine: brightness check fixed for stills, shorter-query fallback, brand filter, decoded credits; storyboard: QA r6/r7 query + emphasis fixes
- [v3 final] media fixed (brightness bug, query fallback, brand/military filter, per-query cache); visual-qa r7 FIX (Bible page, real spreadsheet) → r8 SHIP; final.mp4 49.2 s, 18 scenes, 1.54 s/visual change, re-encoded 18.8 MB; POST.md with B-roll credits. DONE.

## Version 4 (2026-10-31), after user feedback: 'monotonous, not market quality'
- measured 12 top channels vs v3 (brightness 45 vs 107, variety 0.16 vs 0.57); YouTube rate-limited page fetches, so public thumbnail frames were used
- rebuilt look: colour worlds, robot character, 10 illustrated set pieces, minimal text, CC BY music; voice reused from cache (ElevenLabs quota 9,850/10,000)
- look gate PASS: brightness 141, colourfulness 103, dark 5%, variety 0.84; final.mp4 49.2 s
- not run through the agents: storyboard rebuilt by hand in the main session (no director, no critic). Compared with storyboard.v3.json: no `say` line or claim changed; voiceover still matches 04-script.md word for word

## v4 audit (2026-11-01), no video produced and no voice credits spent
- [v4 visual-qa r9] visual-qa → FIX: 0 blockers, 7 majors, 14 minors, on 37 frames taken from final.mp4 plus cover.png. Pictures overstate hedged claims (s6, s9, s13), s6 title lost on white sheets, 'No numbers shared' broader than C3 (s11), blank first frame, caption on the cover. No major needs a `say` change
- [v4 engine] cover bug fixed in pipeline/render.ts (the flag never reached the composition's props), proved on a test still; `npm run stills` now captures the first frame; QA and direction playbooks now check pictures against the hedge

## Version 4.1 (2026-11-01), QA round 9 fixes, no voice credits spent
- [v4.1 fixes] applied by hand in the main session from the QA notes (no director round); v4 archived as storyboard.v4.json. 12 scenes edited, no `say` line changed. Engine: hook on screen from frame 0, no entrance wipe on the first scene, 'stressed' robot no longer has X eyes, `crash` set replaced by a calm `combine` set (departs from QA's `merge` advice, because that scene's line icons don't match the reel's look)
- [v4.1 preview] own stills caught 2 faults in those fixes before rendering (hook words run together on frame 0, s13 still empty mid-scene); both fixed
- [v4.1 render] npm run check PASS; final.mp4 49.2 s, re-encoded 18 MB; look gate PASS: brightness 141, colourfulness 105, dark 5%, variety 0.84
- [v4.1 visual-qa r10] visual-qa → SHIP: 0 blockers, 0 majors, 13 minors; 6 of 7 round 9 majors fixed. The 7th is a judgment call: s11's title is now accurate ("No cost figures") but the voice and caption still say "No numbers shared", broader than C3. QA rated this minor; a stricter reading keeps it major. `say` "No overall numbers shared." would close it for one voice line. Same-agent re-check, not a fresh one; two stills per scene, so motion and audio sync were not reviewed by QA
