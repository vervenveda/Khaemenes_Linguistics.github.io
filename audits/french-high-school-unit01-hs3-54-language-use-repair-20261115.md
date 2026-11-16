# Khaemenes Academy · French III Unit 01 language-use contextual repair

**Checkpoint:** 2026-11-15  
**Status:** 54 school-context question revisions committed; independent linguistic review and official exam publication withheld.

## Scope and preservation
All nine `language-use` questions in each of six French III Unit 01 draft lesson banks (54 items total) were reviewed and given explicit school, student, tutoring, school-library or educational evidence contexts.

- Preserved all **54 question IDs**, their original order, unit/lesson/domain labels and **correct-answer index positions**.
- Preserved all 27 questions per lesson, 9 questions per learning domain, and answer-position balance 9/9/9 per lesson.
- Revised correct-answer *wording* in nine items to reflect the educational scenario; their correct indices remain unchanged. Question prompts were edited in all 54 items.
- Preserved independent-review-pending status and the `authoring-review-not-published` flag on every bank. No official assessment or course-unlock logic was changed.
- English or French wording was adjusted only where relevant to the educational scenario; detailed linguistic and distractor fairness checks remain necessary.

## Six surgical workstreams
1. **Lesson 01:** Education claims, tutoring, school council, source attribution, concession and subjunctive.
2. **Lesson 02:** School transport, access, cost comparison, causal connectors and balanced counterarguments.
3. **Lesson 03:** Tutoring proposals, school budgets, future/simple conditional and school improvement.
4. **Lesson 04:** Relative pronouns `qui/que/où/dont` with school studies, researchers and school-related antecedents.
5. **Lesson 05:** School-library studies and educational report comparison, sample sizes and uncertainty.
6. **Lesson 06:** School-improvement mission, evidence-based claims, budget conditions and educational limitations.

## Updated item-level screening

| French III Unit 01 classification | Before | After |
| --- | ---: | ---: |
| Preliminary primary theme fit | 16 | 69 |
| Transfer-only | 117 | 66 |
| Later-unit fit | 28 | 27 |
| Requires rewrite | 1 | 0 |
| **Total** | **162** | **162** |

The assistant screening classification was recalculated in `data/french-high-school-unit01-hs3-hs4-item-topic-crosswalk.json`. Primary-tagged items are **not** independently approved or eligible for publication.

**Balanced 50-question primary-only draft selection shortfall: 18 slots, down from 34.** All 18 remaining required cells are interpretation/application cells, whereas the six language-use rows now reach the minimum per-lesson selection quota. This is not proof of sufficient retake reserves, difficulty distribution or instructional alignment.

French IV was not altered in this batch: it still has 68 preliminarily primary-tagged items with eight required primary-only selection slots missing, mainly language-use in Lessons 01–04.

## Source-level checks
- Re-read all six French III source files and the crosswalk after commits.
- Validated 162/162 unique prompts and IDs, all 54 school-context stems, 27 items per lesson, 9 per domain, 9 per correct-answer position.
- Checked exact crosswalk prompt, correct-key text, domain and ID parity for 162 French III items.
- Updated `scripts/test-french-high-school-unit01-hs3-hs4-item-crosswalk.mjs` to the new thematic distribution.
- Added `scripts/test-french-high-school-unit01-hs3-education-language-use.mjs` and wired it into the existing GitHub workflow.
- **GitHub Actions execution, independent French-language review and live browser QA were not verified.**

## Next controlled repairs
1. Improve French III *interpretation* and *application* questions against actual school-specific passages until all six lesson/domain cells satisfy the 50-question draw and at least the intended reserves.
2. Audit the 54 rewritten items for ambiguous alternatives and idiomatic French, particularly hypothetical/school debate and comparison questions.
3. Then repair French IV language-use's eight minimum topic-alignment slots using migration and identity context while preserving prior keyed positions.
4. Do not enable the student assessment route until qualified independent review, controlled retakes and learner-scoped persistence are verified.

**Historical-record safety:** No Hall course themes, student records, teacher-entered grades, or completion flags were changed.
