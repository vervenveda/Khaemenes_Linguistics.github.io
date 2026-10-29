# French 101 · Lessons 01–06 cohesion repairs

Date: 2026-10-29. Baseline: `62e30dc8af833519ef0ffdd2ef447730d707fb8a`.
Scope: academic and learner-evidence repairs before expanding the next lesson.

## Shared standard

Every lesson has explicit learning goals, worked/guided material, original independent production, correction/reflection, a 30-question formative bank, a ten-question round, four topic-specific review criteria, learner evidence and separate educator print guidance. Equal standards do not require equal prose lengths or identical tasks. Lesson 01 retains its original instruction and warm-up; supplied spelling answers are now honestly labeled guided models and the independent extension requests different examples.

## Repairs

- Storage failures now produce an accessible persistent alert for every `safeSet` caller, including older preserved drafts and rubric controls. A failed write does not overwrite the last saved draft. Copy/print is recommended; JSON evidence export still reads saved records rather than unsaved edits.
- Lessons 01–03 retain the most recent 20 completed formative rounds, including question identifiers, responses, score, timestamp, and explicit non-certification flags. Incomplete rounds do not become completed evidence. Each question locks after one answer; retry begins a new round. These new records use new keys; no old records are migrated or deleted.
- Learner printing for 01–03 includes actual text answer choices instead of blank multiple-choice stems. Current drafts and selected rubric values are copied before printing. Historical enrichment, older general worksheets and educator answer panels are omitted from the main learner print. Educator prints provide the full bank/key and review guidance separately. Existing print cleanup remains in place.
- Lesson 01's accordion uses its direct lesson heading rather than the earlier embedded video-archive heading.
- Lesson 02 includes staged instruction through 100: tens, et, 70/80/90 composition, the s in quatre-vingts, regional conventions, contrasting worked examples, a new contextual reading, and independent correction/composition. Earlier 0–20 content remains as its foundation. Ten shallow reasoning/transfer items were replaced with composition, regional-awareness and unfamiliar quantity tasks. Six domains contribute ten questions: two each recognition, spelling, reasoning and transfer; one each sequencing and quantities.
- Lesson 03 now has 30 questions (six in each of five domains). A laboratory distinguishes written vowel letters from sounds, introduces tu/tout and rue/roue, and separates observed oral evidence from playback. New pronoun situations require identifying speaker, addressee and referent; rubric anchors specify what the evidence must show. A future-conjugation reference no longer assumes the legacy Lesson 07 already teaches it.
- Lessons 02–03 use one main ten-question round rather than a second mixed-topic five-question round. Earlier supplemental writing, introductory draft fields and general worksheets remain available in a closed optional panel with their original keys and event listeners. Original introductory readings remain visible.
- Lessons 04–05 similarly consolidate supplemental drafts while retaining their original readings, studio writing and assessment. Duplicate generic print buttons were removed from 04–06.
- Lessons 04–06 have explicit retrieval/readiness steps and staged workloads. Lesson 06 separates singular, elision/reference and plural/exception stages. Its saved cumulative portfolio covers all six strands individually and appears in its learner print.
- Progress import accepts the course's already-exported `quizTotal_*`, `u01GateRequired`, and `u01CheckpointPassed` fields, with numeric/boolean validation. Existing learner-identity and explicit restore confirmation checks remain.

## Validation

`PLAYWRIGHT_CHROMIUM_EXECUTABLE=... node scripts/test-french-cohesion-browser.cjs`

Checks fresh deep links for all six lessons, 30-item banks and ten-question rounds in 01–03, correct-answer grading and answer locking, persisted completed rounds, unchanged official progress during practice, draft reloads, preserved supplemental fields, original reading visibility, learner/educator print separation, printed choices/current drafts, cumulative portfolio printing, storage-quota errors and retained prior drafts, current progress-backup preview acceptance and malformed-flag rejection. Tests widths 1280, 390 and 255 and checks page exceptions. A real Lesson 02 PDF was generated and its first page visually inspected.

Existing focused Lesson 04, 05 and 06 browser suites also passed: every authored key, workshops, profile separation, preserved older work, print/export, storage warnings, mocked French speech and unavailable-audio behavior; widths 1280, 768, 390 and 255.

Static preservation checks confirm the availability rule, official checkpoint function, evidence-export function, complete original daily-data array and all prior storage-key literals are unchanged. All inline scripts parse. External requests are blocked in local focused tests; these checks do not certify real-device French speech or externally hosted media.

## Boundaries and remaining course-wide work

Official 80% gates, previous passes and original 15-day navigation remain unchanged. The new cumulative six-strand performance is formative; the old official checkpoint is still a sound/spelling assessment and has not been relabeled as broad six-lesson mastery. A future official assessment migration needs explicit versioning and grandfathering rather than silently changing historical requirements.

Evidence export has no matching whole-evidence import yet; this change repairs the existing progress-backup round trip only. The older service-worker path/offline behavior is outside this change. Historical enrichment remains available and keeps its records, but its older standalone print layouts are not standardized here.

The broader repository-integrity workflow had four established baseline failures before these repairs (French theme count, both translation directions, accepted translations, root index parse). Do not report the entire repository as passing based on these focused checks. Check deployed CI separately after the commit.
