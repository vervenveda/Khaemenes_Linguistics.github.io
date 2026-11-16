# Khaemenes Academy · French III–IV Unit 01 · Six-Lesson Comprehension and Interaction Audit

**Checkpoint:** 2026-11-16
**Scope:** French III (education) and French IV (identity & migration), six provisional lessons per course; existing Lesson 01 canonical page, twelve extended reading labs, twelve guided listening/speaking scripts, original assessment question banks, and the source-topic crosswalk.
**Decision:** Integrated formative sequence **implemented** on main. Official curriculum placement and assessment approval **withheld**.

## Actual topology reviewed

For each of 12 pilot lessons, the student can now move through:
1. **Explore:** concise grammar/source-context model
2. **Read:** short original French model
3. **Check:** guided interpretation
4. **Practice:** grammar correction and explanation
5. **Create:** a lesson-level original product
6. **Reflect:** correction-oriented self-check
7. **Extended Reading Lab:** original connected French source and three evidence-dependent questions with explanation feedback
8. **Guided Listening & Speaking:** original French dialogue, two comprehension prompts, teacher/partner oral task, four review criteria and optional local-only synthetic voice preview
9. **Evidence Bridge:** specific source retrieval, interpretive limitation, dialogue comparison, longer original French composition, self-review and a transfer prompt connecting to the next lesson

The original Hall's six themes and week phases are **not** rewritten or remapped; these are additional source-based pilot components.

## 12-lesson continuity matrix

| Course | Lesson | Reading source | Oral activity | Distinct culminating evidence |
| --- | --- | --- | --- | --- |
| French III · Education | 01 | School-library visiting counts | Library access and late bus | Bounded school-council proposal, 110–140 French words |
| French III | 02 | Volunteer school-transport survey | School shuttle debate | Respectful case with cost and access objections, 130–160 words |
| French III | 03 | Conditional tutoring finance letter | Principal's budget discussion | Future versus hypothetical school notice, 130–160 words |
| French III | 04 | School studies and relative clauses | Comparing tools and researchers | Attributed source synthesis with relative clauses, 150–180 words |
| French III | 05 | Two noncomparable homework surveys | Explaining incompatible indicators | Evidence table and evaluated study-space proposal, 170–210 words |
| French III | 06 | Student-council forum and constraints | Negotiating the reading pilot | Full reasoned proposal, 220–280 words plus 90-second discussion |
| French IV · Identity/migration | 01 | Register, family testimony and later caption | Archivist–descendant dialogue | Bilingual source-limited museum label, 160–200 words |
| French IV | 02 | Photograph and later caption | Unidentified photograph | Two captions showing editorial correction, 90 words each |
| French IV | 03 | Historical displacement and counterfactual | Historian dialogue | Alternative-history analysis with explicit uncertainty, 180–220 words |
| French IV | 04 | Translation of obligation and register | Interpreter/curator dialogue | Bilingual translator's note preserving agency, 180–240 words |
| French IV | 05 | Archive versus staged film and poem | Guided comparative commentary | Multisource analysis with absent perspectives, 230–280 words |
| French IV | 06 | Letter, administrative list and documentary | Multi-voice exhibit debate | 300–400-word bilingual exhibit plus two-minute oral presentation |

## Five forensic findings and repairs

**Finding 1 — Siloed activities.** A pupil could answer reading multiple-choice and leave without applying the source evidence in original French. **Repair:** A dedicated Evidence Bridge now turns retrieval and inference into a written argument and a spoken explanation.

**Finding 2 — Repetition without cognitive progression.** Several passages teach the useful lesson “one source does not represent everyone” but risk asking the same basic question six times. **Repair:** Task demand now progresses from identifying numbers/source provenance to considering transport/finance, grammatical attribution, comparable indicators, and a final independent synthesis. French IV progresses from identity through provenance, counterfactuals, translation agency, media representation and an ethical exhibition.

**Finding 3 — Comprehension divorced from oral interaction.** Guided listening questions were previously separate from reading evidence. **Repair:** Every lesson has an explicit compare-with-listening prompt and a teacher/partner-reviewed oral task that references the same conceptual distinction.

**Finding 4 — No coherent revisable student artifact.** Students could view feedback but had no structured on-page location to collect source evidence and write their own revised response. **Repair:** Two accessible textareas, four reflection checkboxes and feedback guidance are embedded in each bridge. There is no automatic grading.

**Finding 5 — Unsaved work risk.** Since the reference page intentionally has no persistent browser or learner-record storage, a draft could vanish on navigation. **Repair:** Every bridge includes a **user-initiated text export** of its evidence notes, original French writing and corrective feedback. The app does not transmit or automatically save this material; downloaded files are the student's own responsibility. Existing Academy portfolio/workspace remains the proper place for persistent work.

## Automated regression and safety

- New source of truth: `data/french-hs3-hs4-unit01-integrated-evidence-bridges.json`.
- Canonical student page: `Halls/french-high-school-unit01-instruction.html`, with the unchanged six-stage Lesson 01 renderer plus all 12 supplements.
- Regression: `scripts/test-french-high-school-unit01-integrated-evidence-bridges.mjs`.
- Existing reading-lab parsing test was updated for the additional embedded data object.
- CI workflow now watches bridge data and regression script, and runs the bridge test on push and pull requests.
- Source-level verification: 12 matched lesson indexes and source-aligned records, all required fields and rubrics present, matching embedded JSON, correct page rendering markers, no automatic persistent storage, and test-to-CI wiring.

**Not yet verified:** live device/browser behavior, GitHub Actions execution, download behavior in mobile browsers, screen-reader narration, local synthetic French voice quality, and independent education/linguistic review.

## Release gates remaining

1. Verify content quality and word-count challenge with qualified bilingual instructors and student usability testing in portrait/landscape tablet modes.
2. Add authentic, permissioned audio recordings and reliable transcript provenance; optional synthetic voice is not equivalent to real listening evidence.
3. Integrate properly authorized learner-scoped portfolio persistence and teacher rubric results via the Academy account cloud, **not** localStorage.
4. Check original question-bank distractors with genuinely comparable grammatical options across all 324 draft items; only a small high-risk subset has been improved.
5. Preserve all previously established **80% mastery** policies and 20-lesson / 50-unit / 150-midterm / 200-final question structures until independent curriculum mapping, approved-item review, accessibility QA and real student-record provenance pass.

**Release decision:** Existing lesson banks remain `authoring-review-not-published`; no student grade, completion, unlock or credential is written by these companion activities. This is an academic quality improvement, not an official exam publication.
