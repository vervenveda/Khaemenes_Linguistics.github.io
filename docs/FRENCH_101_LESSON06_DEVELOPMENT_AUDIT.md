# French 101 — Lesson 06 development audit

Scope: **Nouns, Articles and Gender**, following the supplied 18-topic curriculum map and the instructional/evidence pattern established in Lessons 01–05. This is a daily lesson inside official Course Level 1, not official Level 6.

Baseline main: `6974a018465838021b21de5c7d3d94a24f4deeb7`.
Baseline French page blob: `1c5d5ab28b57c48285b21af87734a9ea712ec046`.

## Pre-audit and compatibility decision

The previous daily Lesson 06 was **Listening: same or different?**: a short vowel-comparison lecture, tu/tout/le/les/école/elle examples, three written recognition questions, writing/transfer records, worksheet and general rubric. It was not the proposed noun/article/gender topic.

The lesson picker and primary Lesson 06 view now present Nouns, Articles and Gender. Value `6`, direct route `#lesson-06`, selected-lesson storage and previous/next navigation remain. The original `FRENCH_101_UNIT01_DAYS` data, including its full listening object, are preserved unchanged. The old content and original keys are rendered in a labeled optional listening panel, not reinterpreted as new noun achievement. The original day-6 video slot remains in that panel; no unapproved video is promoted.

## New academic development

- Nouns and grammatical gender; article–noun learning; counterexamples to guessing from endings or owner identity.
- Contextual definite/indefinite singular and plural: un, une, le, la, l’, des and les. Avoid marking two valid phrases right/wrong without stating the intended meaning.
- Elision with vowels/mute h; supplied homme/haricot contrast explains that aspirated h blocks elision and does not require an English h sound.
- Familiar regular plurals, supplied animaux and prix exceptions, preserved accents/apostrophes and the distinction between written plural and actual listening evidence.
- Twelve noun-reference cards, each showing four article/number forms and replay controls. Extra challenge entries supply gender and plural rather than assuming untaught vocabulary.
- Five worked examples, two original readings, saved interpretations and separate answer guidance. Fixed est/sont and c’est/ce sont frames are explained without treating the full verb paradigm as a prerequisite.
- Three guided choice/repair activities and an eight-context article workshop with meaningful feedback and repeatable practice.
- Independent six-noun/four-form portfolio, a new short description, reviewer-supplied transfer entries, correction/reflection journal and distinct oral observations.
- Thirty authored items, six each in gender/articles/plural/reading/transfer. Ten per round, two per domain, shuffled order/choices, explanations and new rounds.
- Four criterion-specific 0–3 rubrics plus Not assessed. Ratings and reviewer entries are local, unverified formative evidence.
- Separate learner worksheet/evidence and educator guidance/answer-key printing. Earlier listening work has its own separate print action.

## Data preservation

New records use the selected learner prefix plus `_beginner2026_lesson06_nouns_`: reading/guided drafts, composition, corrections, oral/reviewer notes, four rubric values and up to twenty completed formative rounds. Rounds store item IDs, responses, correctness and timestamp with `formative:true` and `oralProficiencyCertified:false`. Partial rounds and article-workshop selection state are not persisted.

Original `_u01_day6_writing`, `_u01_day6_transfer_v1`, `_u01_d6_rubric_*` and `_u01_d6_review_notes` keys remain in the optional listening panel. New noun work never overwrites them. Existing learner-scoped evidence export includes both old and new records; evidence import is not added.

Lessons 01–05 teaching and print functions, original daily lesson data, official quiz/checkpoint/final/certificate functions and availability rules are unchanged. No grade migration, threshold change, new official unlock, runtime dependency or network service is introduced. Synthetic speech is practice; unavailable audio remains written work and cannot confer listening achievement.

## Validation completed

- Inline JavaScript syntax and source preservation checks.
- All 30 stated answer keys exercised in the browser; six unique items/domain and balanced 10-question selection.
- All eight workshop contexts tested with correct and incorrect choices, including elision/h/number distinctions.
- One-answer locking, new rounds, saved completed-round history, drafts and rubric reload.
- Two isolated learners; current-learner export; explicit storage-failure warning; no official progress changes.
- Archived listening assignment and rubric values retained, visible in the old panel; separate old-evidence printing includes its live response and excludes new noun instruction.
- Lesson 05 ↔ Lesson 06 navigation restores new writing. Direct Lesson 06 entrance and new menu title checked.
- Learner versus educator print isolation and current evidence values checked; final print samples rendered and visually reviewed.
- No new-studio horizontal overflow at 1280, 768, 390 and 255 CSS pixels. No page JavaScript exceptions.
- Controlled French-speech requests and unavailable-speech messages checked. Real audible pronunciation and independent oral skills still need real-device/human observation.
- Existing Lesson 05 browser regression passed after integration. Earlier official functions remain byte-for-byte unchanged.

Reusable focused test: `node scripts/test-french-lesson06-browser.cjs` with Playwright Chromium installed. Optional `PLAYWRIGHT_CHROMIUM_EXECUTABLE` selects an installed browser. Test records are isolated and local; remote resources are blocked and temporary print/screenshots are produced. This is core/browser verification, not educator certification or whole-ecosystem/offline certification.

## Existing follow-up remains separate

The wider repository still has the four pre-existing integrity diagnostics recorded in the Lesson 04 audit. The progress-backup importer compatibility issue, evidence restore gap, cumulative checkpoint/final breadth, proposed midterm and complete 18-lesson migration remain open. This pass does not silently alter official assessments to match the newly developed daily lesson. The next proposed curriculum topic is Être and Avoir; the current later library retains older listening/spelling material until separately developed.
