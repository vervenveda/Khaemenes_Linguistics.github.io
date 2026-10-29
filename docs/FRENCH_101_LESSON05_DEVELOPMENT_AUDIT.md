# French 101 — Lesson 05 development audit

Scope: **Small Words and First Sentences**, following the supplied French 101 Master Blueprint, proposed 18-topic map and developed Lessons 01–04. Existing course is still 12 official levels with 15 daily Unit 01 lessons; no migration is performed.

Baseline main: `d2ad42378c99d76d94ee2270039e339e8b3b3690`.
Baseline French page blob: `a35664dcd2959220776883a5bf62f5fcf5483b13`.

## Pre-audit

The existing lesson had a short lecture, focus-word list (le/la/un/une/et/est/dans/sur/oui/non/mon/ma), three native MCQs, an original reading about a book/apple/pen/bag, pronunciation controls and learner-scoped writing. It did not contain the deeper dedicated teaching, varied practice, 30-item bank or independent rubric developed for Lesson 04. Its recommended resources pointed to sound/spelling work rather than sentence meaning.

## Additive development

- Substantial teaching on noun phrases, subjects, est as a verb and et as a conjunction; meaning as well as form.
- Familiar masculine/feminine article–noun pairs, introduction versus reference, bounded l’école recognition, c’est contraction and punctuation. Complete gender/article rules remain in Lesson 06.
- Sur/dans based on actual location; mon/ma based on the noun rather than owner gender; positive oui/non question/response patterns. Full negative construction and negative-question si are deferred.
- Five worked examples with reasoning, two additional original readings and saved interpretation prompts. Preserve the earlier reading and all original assignments.
- Three guided decision/repair stations, a select-based location-sentence workshop and keyboard-friendly word-order cards with checks and reset. These are temporary rehearsal activities, not official mastery or persistent lab-state records.
- Eight new independent sentences, a separate question/response exchange, correction/reflection journal, and independent listening/speaking observation notes.
- Thirty authored questions, six each in meaning/articles/structure/reading/transfer. Each ten-question round samples two per area and shuffles choices. Immediate explanations, answered-item locking and new practice rounds.
- Four criterion-specific 0–3 educator review scales with Not assessed, reviewer observations, explicit limits on self-entered/unverified oral evidence.
- Separate learner worksheet/saved-evidence and educator guidance/answer-key print actions; current drafts, ratings and completed-round summary included as applicable.
- Lesson 05 resource recommendations now point to sentence construction, word order and independent writing. Existing lesson navigation and direct #lesson-05 entrance retained.

## Preservation and storage

Lessons 01–04 teaching and assessment functions, Lesson 04 print function, archived accents, official quiz/checkpoint/final/certificate functions, availability rules and all original question data remain unchanged. Shared rendering only adds a day-5 studio branch, replaces day-5 generic mixed review display with its dedicated bank, routes day-5 printing to its own print function and preserves older generic day-5 rubric entries in an optional historical-record panel.

New evidence is stored under the selected learner prefix plus `_beginner2026_lesson05_sentences_`. This includes reading/guided drafts, composition, correction/oral/reviewer notes, four rubric values and up to twenty completed formative rounds. Each completed round records selected question IDs, response indices, correctness and timestamp, with `formative:true` and `oralProficiencyCertified:false`. Partial rounds are not persisted. Existing `_u01_day5_writing`, `_beginner2026_lesson5_evidence_v1`, `_u01_day5_transfer_v1` and `_u01_d5_rubric_*` records are retained. Current-learner evidence export includes new records through the existing mechanism; this does not add evidence import or repair the existing progress-backup importer.

No new runtime dependency, network service, video or official gate is added. Existing French narrator, pace, volume and Stop controls are reused. Unavailable speech remains written practice, not a listening pass. Hearing device-generated text is not independently observed proficiency.

## Validation completed

- All inline programs compile. Source comparison protects Lessons 01–04 and official assessment/availability functions byte-for-byte.
- Focused Lesson 05 browser test checks thirty unique keyed items, six per domain, balanced ten-item rounds, all thirty stated answers, one-answer locking, retry and saved round records.
- Correct/incorrect location-sentence feedback, all word-order cards and reset behavior checked.
- Two isolated learners: drafts/ratings/rounds survive reload, old day-5 assignment and rubric records remain intact, changing to Lesson 04 and returning restores Lesson 05 writing.
- Practice never changes official progress. Current-learner export excludes the other learner. Simulated storage failure gives explicit warning.
- Learner printing includes live drafts; educator key is excluded from learner output. Educator print includes all thirty keys and rubric guidance. Final print samples rendered and visually checked.
- No new-studio horizontal overflow at 1280, 768, 390 and 255 CSS pixels. No page JavaScript exceptions in the focused tests.
- French speech-request behavior and unavailable-speech distinction tested with controlled speech mocks. Actual audible pronunciation and independent oral achievement require real-device/human observation.
- Existing Lesson 04 browser regression passed after integration, including its bank, evidence, print and small-screen checks.

Reusable test: `node scripts/test-french-lesson05-browser.cjs`, with Playwright Chromium installed. Optional `PLAYWRIGHT_CHROMIUM_EXECUTABLE` points to an installed browser. Tests use isolated local learner records, block remote resources and write temporary print/screenshot samples. They do not alter live student records. These local-core tests do not certify remote shared components or the whole course.

## Existing course-wide follow-up

The previous audit’s backup-import allowlist incompatibility, evidence-restore gap, proposed 18-lesson migration, narrower Lesson 02 number range, midterm/final assessment breadth and service-worker scope issues remain separate work. The four repository-wide integrity failures recorded in the Lesson 04 audit predate this pass; do not represent targeted browser checks as a green whole-repository certification. A qualified educator should review new French tasks and independent performance before formal proficiency claims.
