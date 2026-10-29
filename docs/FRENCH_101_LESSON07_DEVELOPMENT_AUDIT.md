# French 101 · Lesson 07 · Être and Avoir

Date: 2026-10-29. Baseline: `c4ce19308a2431c651d6bd7a9da09c218b7d3d9d`.

## Pre-audit and curriculum decision

The deployed day-7 source was “Silent letters at word endings”: a short lecture, petit/grand/Paris/salut examples, guided repetition, a four-word observation assignment and three written recognition items. It did not teach the proposed curriculum's Lesson 07 être/avoir topic. The original daily object is retained byte for byte, and its writing, transfer and general educator keys remain accessible in a closed optional archive. Historical spelling observations are not reclassified as verb mastery.

The new studio follows the curriculum roadmap and the shared Lessons 01–06 standard. It is a daily lesson within official Course Level 1, not official Level 7. No official curriculum-level migration is introduced.

## Academic development

- Staged retrieval and readiness: pronouns, et/est and article reference, then être, avoir, contrasting meanings, independent production and correction.
- Present-tense paradigms for je, tu, il/elle/on, nous, vous and ils/elles, including j’ai and êtes. Noun subjects, singular polite vous and on's singular agreement are explicit.
- Substantial instruction with worked reasoning: subject versus object control, location/identity versus having, a/à, et/est, preserving meaning when correcting a sentence, age/faim/soif and the limits of word-for-word English translation. Être à plus a person is acknowledged so the learning anchors do not become false absolute rules.
- French system-voice controls for complete conjugation pairs, an original reading and sont/ont contrasts. Visible unavailable-audio feedback and explicit distinction between synthetic rehearsal and independently observed oral evidence.
- Original reading, supplied vocabulary, three saved evidence responses and a closed educator guide. Questions distinguish stated facts from unsupported ages/quantities/locations.
- Eight-context interactive verb-choice laboratory with correction/retry feedback. Guided conversation becomes new production after closing the model.
- Eight-sentence original portfolio, two unfamiliar reviewer-supplied combinations, explanations of three forms, five correction challenges, first-attempt revisions and a next goal. Fictional names/ages are welcome; untaught vocabulary must be supplied.
- Thirty reviewed questions: six each on être, avoir, expression meaning, reading and transfer. Balanced shuffled ten-question rounds draw two per domain. One response locks each item; retry creates a new round. The latest 20 completed rounds retain item IDs, responses, scores, dates and formative/non-certification flags.
- Four criterion-specific 0–3/Not assessed rubrics, reviewer role/support/observed-task notes, oral evidence recorded separately, learner worksheet/current-evidence print, separate educator guidance/full answer key, and evidence export.

## Data and navigation

New namespace: `<learnerKey>_beginner2026_lesson07_verbs_`. Suffixes: `reading_0_v1` through `reading_2_v1`, `guided_v1`, `oral_v1`, `composition_v1`, `corrections_v1`, `educator_v1`, `rubric_0_v1` through `rubric_3_v1`, `rounds_v1`.

Preserved earlier keys include `_u01_day7_writing`, `_u01_day7_transfer_v1`, `_u01_d7_rubric_*` and `_u01_d7_review_notes`. No old record is renamed, deleted or converted. The optional earlier archive has its own print route, including text answer choices and live draft values.

The existing picker displays Être and Avoir for Lesson 07 while retaining the original data array. Direct `#lesson-07` entry uses the existing route. Previous/next links retain the 15-day library. Lesson 06's final signpost now points to the completed verb studio; its instruction and evidence logic are otherwise unchanged. Later daily entries still include older sound/spelling content; planned Lesson 08 family vocabulary is not claimed to be developed.

## Validation

Run `node scripts/test-french-lesson07-browser.cjs` with Playwright Chromium installed, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.

The focused browser suite verifies all eight workshop contexts with incorrect and correct choices; all 30 authored answer keys; two-per-domain random rounds; answer locking and retry; saved draft/rubric/round reloads; unchanged official progress; old writing/transfer/rating retrieval; separate learner/educator/archive prints; widths 1280/768/390/255; mocked French speech and unavailable-voice feedback; two-learner separation; 06↔07↔08 navigation; current-learner JSON evidence export; storage errors; and no page exceptions. Real learner and educator PDFs and phone/desktop screenshots were generated; the learner PDF and phone view were visually inspected.

The Lessons 01–06 cohesion suite and focused Lesson 06 suite passed after initial integration. Static comparison preserves the complete original daily array, Lessons 01–05 functions, Lesson 06 teaching/evidence apart from the next-step signpost, and official availability/quiz/checkpoint/exam/certificate functions. Inline JavaScript parses.

Local focused tests block external network assets; mocked speech verifies requests and fallback behavior, not audible quality on every device. Learner print includes current unsaved field values; evidence JSON exports saved records. Listening/speaking observations and local ratings do not certify proficiency.

## Official assessment and deployment boundaries

Existing 80% gates, official scores, earlier passes and checkpoints remain untouched. Lesson 07 practice never awards official mastery or changes unlocks. No new external runtime dependencies were added.

The baseline broader repository-integrity workflow has four unrelated failures: French stage-7 theme count, translation-direction coverage, missing accepted translations and root-index parsing. Focused lesson success is not an all-repository clean bill. Deployment workflows must be checked separately for this commit.
