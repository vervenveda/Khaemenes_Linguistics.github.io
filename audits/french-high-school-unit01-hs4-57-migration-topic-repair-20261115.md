# Khaemenes Academy · French IV · Unit 01 Migration/Identity Assessment Repair
**Checkpoint:** 2026-11-15  
**Status:** Draft source improvements committed to main; EXAM RELEASE HOLD.

## Repair scope
- All **54 language-use question prompts** (9 in each of six French IV Lesson 01–06 draft banks) were revised to reference migration, exile, displacement, personal and collective identity, Francophone memory, provenance, translation or staged documentary evidence.
- Three additional questions were revised to repair conservative *source-theme screening reserve gaps*: Lesson 01 question 19 (interpretation of an official migration letter), Lesson 02 question 20 (single migration photograph), and Lesson 03 question 10 (hypothetical public meeting affecting displaced families).
- All **57 source prompts** preserve original question IDs, correct answer texts, correct answer indices, three-category domains and original explanations. Original options remain unchanged. Existing question banks remain `authoring-review-not-published`; their editorial statuses retain independent-review-pending.
- The Hall course maps, all French I–III banks, college French materials, learner-scoped scores and historic completion state were not changed.

## Provisional identity/migration topic screening

| French IV drafted item category | Before repair | After repair |
| --- | ---: | ---: |
| Direct Unit 01 theme fit, provisional only | 68 | 114 |
| Transferable skill | 79 | 36 |
| More appropriate for later unit | 15 | 12 |
| Explicit rewrite flagged | 0 | 0 |
| **Total** | **162** | **162** |

Not all rewritten prompts represent **new** primary tags: some had already been provisionally classified as on-theme. The provisional primary total is not an educator approval, item-quality score or authorization to administer an assessment.

### Six-lesson domain coverage after thematic screening

| Lesson | Language-use candidates | Interpretation candidates | Application candidates |
| --- | ---: | ---: | ---: |
| 01 | 9 | 5 | 4 |
| 02 | 9 | 5 | 4 |
| 03 | 9 | 4 | 3 |
| 04 | 9 | 5 | 5 |
| 05 | 9 | 5 | 7 |
| 06 | 9 | 5 | 8 |

These preliminary classification counts now meet the balanced unit sampler's required **50-item lesson/domain quotas plus at least one candidate per cell**. A single additional candidate per cell is **not sufficient to guarantee non-repeating future retakes indefinitely**, nor proof that the full bank is linguistically sound or properly calibrated.

## Verification and control
- Checked all 162 French IV questions for unique normalized prompts, ID and key parity with crosswalk, answer-index and source-domain consistency.
- Added `scripts/test-french-high-school-unit01-hs4-migration-language-use.mjs` to validate all 54 contextual prompts and the three additional reserve candidates.
- Updated the existing 324-item screening regression totals; connected the new test to `.github/workflows/french-high-school-alignment.yml`.
- No new external dependencies, browser storage or student-facing grading powers were introduced.
- GitHub Actions execution, actual browser rendering and independent French instructor/language editor approval remain **unverified**.

## Remaining barriers before publication
1. A qualified French educator should independently review grammar keys, source scenarios, correct-option uniqueness, distractors and accessibility in both French III and French IV.
2. Validate all questions against the **actual authorized** Hall week/theme instruction and authentic reading, writing, speaking and listening evidence, not merely the six-lesson pilot companion.
3. Build an editor-approved item allowlist and independent approved-item counts. Do not equate thematic `primary` classification with publishable content.
4. Add secure learner-scoped assessment attempts, correction-before-retake logic, authorized grades and export safeguards before activating any student-facing examination.
5. Verify CI, full 50-question unit draws, assistive-accessible interactions, tablets, print and offline functionality.

**Next recommendation:** Conduct a cross-grade linguistic editorial pass of the revised French III/IV stems and choices, beginning with the retained general-purpose correct options whose context has been specialized; then commission evidence-rich reading and speaking activities.
