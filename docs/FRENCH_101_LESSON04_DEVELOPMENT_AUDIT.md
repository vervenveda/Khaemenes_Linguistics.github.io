# French 101 — Lesson 04 development and forensic audit

Audit date: October 28, 2026 (America/New_York).
Scope: current French 101 source, course assessment/storage architecture, the attached Master Curriculum & Assessment Blueprint and 18-Lesson Curriculum, the Lesson 01 standard, and focused browser development/verification of Lesson 04.
Baseline: `apps/French_101_index.html` blob `37f2c4d53bbaf9a9fd34f94022d9f71f38f4ee73`; main commit `4b4f3ed166dda197ea5b5e9f9519db802116c318`.

## Decision and protected content

Develop Greetings and Introductions additively. Do not renumber the existing 12 official levels or 15-lesson Unit 01 sequence to implement the proposed 18-lesson map. Lessons 01–03, their existing banks, the original Lesson 04 beginner dialogue and assignment, archived accents instruction and its keys, official quizzes/checkpoint/final/certificate functions, and previous mastery records remain unchanged.

## Findings resolved in Lesson 04

| Finding | Implementation |
| --- | --- |
| Brief expression list without sufficient context | New studio teaches greetings versus departure wishes, time/context, polite/familiar/plural address, names, well-being, courtesy and repair. |
| Insufficient conversation variety | Preserve original Léa/teacher dialogue; add friends, a learner/teacher and unfamiliar evening visitors, each with interpretation prompts, saved responses and separate guidance. |
| Only three native introductory review questions | Preserve original source items; replace the mixed daily review display for Lesson 04 with one dedicated 30-item greetings bank. Each 10-question round draws two per domain: meaning, context, grammar, reading, transfer. |
| Weak independent achievement evidence | Two original 6–8-turn dialogues, guided context revision, correction/reflection journal, independent listening/speaking observation notes, four criterion-specific 0–3 rubric scales and Not assessed. |
| Mismatched alphabet recommendations | Conversation laboratory, independent dialogue studio and existing Sentence Builder. Links open the destination's collapsed panel where required. |
| Direct #lesson-04 entrance selected content while its parent remained collapsed | Direct lesson review opens the target's ancestor details before scrolling. This affects review access only. |
| Generic printout exposed answer panels and lacked focused guidance | Separate learner worksheet/saved-evidence and educator guidance/30-answer-key print actions, live textarea/rating values, A4 margins. |

The new bank IDs are l04-01 through l04-30. Six items in each of five domains. All include a stated key and instructional explanation. A public formative key is intentionally accessible; it is not a secure examination. Answer order is shuffled, and each question accepts one answer before a new round.

## Evidence and storage contract

New records use the current learner namespace plus `_beginner2026_lesson04_greetings_`. Suffixes include interpretation drafts, guided work, original dialogues, corrections, oral observations, reviewer notes, four rubric ratings and up to 20 completed formative rounds. Each completed round stores question IDs, chosen option indices, correctness, timestamp, `formative:true`, and `oralProficiencyCertified:false`. Partial rounds are not saved. Written work saves as entered; completed rounds and ratings never write official mastery.

Existing `_u01_day4_writing`, `_beginner2026_lesson4_evidence_v1`, `_u01_day4_transfer_v1`, general rubric and historical accents keys are preserved. The earlier general review remains accessible in an optional historical-record panel. Current-learner evidence export includes the new records through the existing export mechanism. That export is a backup/download; no new evidence-import capability is implied.

Audio reuses the existing French narrator, volume, pace and Stop controls. No voice/audio gives a written fallback message, not a listening pass. Browser tests simulate speech requests; audible pronunciation, real-device narration and independent spoken/listening competence require human/device review. Rubric entries are locally entered observations, not authenticated teacher approval. When only one oral skill was observed, leave the combined criterion Not assessed and document the observed skill separately.

## Browser and source checks completed

- All inline scripts compile.
- Every one of 30 authored items grades its stated key correctly in the browser.
- Balanced 10-question selection; disabled answered choices; new rounds; completed-round persistence.
- Saved drafts and ratings survive reload. Two learner records remain separate. Legacy writing and accents records remain intact.
- Current-learner JSON evidence export excludes the other learner. Storage failure produces an explicit warning rather than claiming a save.
- Direct Lesson 04 route opens visibly; source comparison confirms official functions and Lessons 01–03 unchanged.
- Learner and educator print documents generated with Chromium's print engine; saved writing is present; formative answer key excluded from learner printing. Rendered print samples inspected.
- No new-studio horizontal overflow at 1280, 768, 390 or 255 CSS pixels. These are local-core tests; remote shared styles/scripts are blocked in the test harness.
- No page JavaScript exceptions in the focused tests.
- Official gate matrix: Level 1 8/10 then Unit 01 12/15; checkpoint-first then quiz; 7/10 and 11/15 failures; pass reload; historical pass retention. No thresholds or official functions changed.

Reusable focused browser check: `node scripts/test-french-lesson04-browser.cjs` after installing Playwright and its Chromium browser. Optional `PLAYWRIGHT_CHROMIUM_EXECUTABLE` selects an installed executable. The test blocks remote resources, creates isolated local learner records, and writes print/screenshot samples to a temporary directory. It does not submit or change live learner data.

## Course-wide findings still open — not silently changed in this pass

1. **Curriculum map migration:** the PDFs propose 18 lessons in three blocks; runtime still has 12 official levels and 15 daily Unit 01 activities. Formal replacement needs an explicit compatibility plan.
2. **Lesson 02 range:** dedicated instruction currently covers 0–20, whereas the proposed map specifies 0–100. The old official Level 3 vocabulary contains later tens/100, but that is not a complete Lesson 02 teaching sequence.
3. **Official construct alignment:** Level 1 official quiz assesses greetings/courtesy rather than independent alphabet proficiency. Daily evidence is deliberately separate.
4. **Assessment breadth:** Unit 01 uses 15 fixed cumulative items. Final remains ten sampled translations; proposed cumulative midterm is not implemented. Neither establishes independent oral proficiency.
5. **Existing backup compatibility:** source importer allowlist omits fields the official quiz writes, including `quizTotal_1`, `u01GateRequired` and `u01CheckpointPassed`; a newly earned progress export can therefore be rejected on restore. Existing restore rules were not broadened during this lesson-content update. Evidence exports also have no matching evidence restore interface. Prioritize a separate compatibility/recovery repair with round-trip tests.
6. **Service worker route:** the French page registers `../../service-worker.js` from its apps path, which resolves to the site root, rather than the repository's own worker. Offline deployment/caching needs a separate scope audit; no offline certification is claimed here.
7. **Human/device review:** new French instruction, question-bank pedagogy and independent performance need a qualified educator's review; actual French sound and mobile/desktop browsers need device checks. Core browser tests do not replace those checks.

## Release assessment

Lesson 04's requested development sequence is implemented and locally browser-tested. This is not certification of the full course, the proposed 18-lesson program, human oral proficiency or all remote ecosystem resources. Next curriculum work is Lesson 05 under the same preservation contract; resolve backup compatibility before relying on full-course restore as a recovery mechanism.

## Publication and CI verification

Lesson implementation commit: `70f713bca9c3d86e642f2922302391f1a8c03d05` on main. GitHub Pages deployment, Beta index coverage and French German Browser Accessibility all completed successfully. The broader Linguistics Repository Integrity check failed with the identical four messages already present on baseline commit `4b4f3ed166dda197ea5b5e9f9519db802116c318`: French stage 7 themes mismatch for 16 weeks; French quiz must cover both translation directions; French quiz accepted translations missing; index.html Unexpected token '<'. Compare baseline integrity run 40792362543 with implementation run 40794966121. These are unresolved pre-existing diagnostics, not a green repository-wide certification. Official quiz source is unchanged and its two translation directions were exercised in the focused gate tests.
