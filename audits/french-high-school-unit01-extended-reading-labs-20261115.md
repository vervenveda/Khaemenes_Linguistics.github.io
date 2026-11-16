# Khaemenes Academy · French III–IV · Extended Reading Labs
**Checkpoint:** 2026-11-15  
**Status:** Working source-based formative practice committed to `main`; not an official assessment.

## Delivered

A new **Extended Reading Lab** appears within each of the six Unit 01 pilot companion lessons in **French III and French IV**. French I–II lesson presentation remains unchanged. It preserves the existing Lesson 01 canonical Explore → Read → Check → Practice → Create → Reflect sequence and adds optional expanded reading below the teaching sections.

| Course | Original French source passages | Source-linked practice items | Passage length |
| --- | ---: | ---: | --- |
| French III · Education | 6 | 18 | 136–150 words |
| French IV · Identity and migration | 6 | 18 | 152–170 words |
| **Total** | **12** | **36** | — |

The readings are **fictional teaching sources clearly labeled as such**, not reported archives, real interviews, published research results or verified historical events. Each reading offers **three evidence-based questions** with multiple reasonable-seeming alternatives; correctness is grounded in precise details of the passage. Every question has a content-specific explanation and a balanced correct-answer position (0/2/1 across each three-question set).

### French III source sequence
1. Extended school library hours, visit counts versus unique pupils, and unequal transport access.
2. School transport proposal, unrepresentative volunteer survey, missing maintenance costs.
3. Hypothetical tutoring funding, planned action versus verified educational outcomes.
4. Relative clauses and differences between two non-identical educational methods.
5. Comparing school surveys with different respondents, indicators and dates.
6. School council forum, access, time, resource constraints and a bounded reading initiative.

### French IV source sequence
1. Migration record versus a family's account and a later interpretation of choice.
2. Archival photograph versus a later museum caption and uncertain identification.
3. Historical counterfactual, unobserved consultation and practical constraints.
4. Translation of `devoir partir`, speaker agency and editorial normalization.
5. Original administrative records versus staged film and figurative poetry.
6. Migrant testimony, absence of universal representation, documented provenance and ethical curation.

## Student experience

- Each lesson has one expandable source lab containing an original French text, three radio-choice questions and a **Check my reading** control.
- The checked response produces specific, correction-oriented feedback, including an explanatory note and a suggested answer if incorrect.
- Students can change responses and check again; no shuffled assessment, scores, official grades or course unlocks are generated.
- Content is embedded locally in the static HTML; it does **not** depend on network fetches, browser localStorage, third-party libraries or an online backend.
- The source and options are printable; keyboard-accessible radio inputs, native detail/summary elements and live text-feedback containers are used.

## Integrity and automated tests

- Authoritative source files: `data/french-hs3-unit01-extended-reading-lab.json` and `data/french-hs4-unit01-extended-reading-lab.json`.
- Presentation: `Halls/french-high-school-unit01-instruction.html`.
- Regression: `scripts/test-french-high-school-unit01-extended-reading-labs.mjs`.
- GitHub workflow updated in both push/PR path scopes and test runner.

Post-commit **source checks** verified 12 passages, 36 questions, source/embed parity, ≥130 connected words in French III, ≥145 words in French IV, three options with unique wording per question, sufficient prompt/explanation length, answer position cycling and the presence of feedback controls. Actual GitHub Actions execution, browser interaction and print-layout testing were **not independently observed**.

## Limits and next editorial actions

1. This reading lab is **supplementary practice**, not a replacement for the existing 324 French III/IV draft MCQ items or the unpublished 50-item unit exam.
2. Qualified bilingual educators must independently verify the language, comprehension demands, distractor plausibility, culturally appropriate source representation, answer uniqueness and learner-level difficulty.
3. The current reading texts and questions are authored teaching examples, **not authenticated external sources**; the lab does not evaluate listening pronunciation, spontaneous oral interaction or sustained original writing.
4. Trial the labs in desktop/tablet portrait and landscape, screen readers, and print. Confirm that no official achievement state is affected.
5. After review, link approved reading objectives to the existing item-topic crosswalk and strengthen the original assessment-bank distractors where needed, with versioned corrections and verified test coverage.

**Release boundary:** All underlying French III/IV assessment banks remain `authoring-review-not-published`, the theme screen remains `officialUnit01Eligible=false`, and existing learner progress and Hall structure remain unchanged.
