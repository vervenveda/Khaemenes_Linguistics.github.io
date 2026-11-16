# Khaemenes Academy · French I–IV · Unit 01 balanced examination specification

**Status:** COMMITTED / DRAFT ONLY / NOT RELEASED. This file does not authorize student-facing testing, grading, certification or changes to historical records.

## Exam size and passing threshold

The shared French I–IV Unit 01 examination contract requires **50 independently authored questions per sitting**, at least **67 eligible bank questions**, **40 correct to meet 80%**, and a fresh draw when a retry is appropriate.

The six lesson banks contain 162 draft items per grade (27 per lesson). The *availability of 162 draft items is not evidence of 162 editorially approved exam items*.

## Required 50-question distribution

| Unit 01 lesson | Language use | Interpretation | Application / transfer | Total |
| --- | ---: | ---: | ---: | ---: |
| 01 | 3 | 3 | 3 | 9 |
| 02 | 3 | 3 | 3 | 9 |
| 03 | 3 | 3 | 2 | 8 |
| 04 | 3 | 2 | 3 | 8 |
| 05 | 2 | 3 | 3 | 8 |
| 06 | 3 | 3 | 2 | 8 |
| **Total** | **17** | **17** | **16** | **50** |

Each lesson/domain cell must have **at least one authored reserve item above the draw quota** and pass all shared validity checks. This is a *minimal structural reserve*; review may require substantially more questions in weak or ambiguous cells.

## Algorithm / integrity

- Implementation: `assets/french-high-school-unit01-balanced-exam.mjs`.
- Entry point: `drawBalancedFrenchUnit01(course, questions, {previousIds, random})`.
- Accept only `hs1`, `hs2`, `hs3`, `hs4` and Unit 01 metadata.
- Confirm the underlying shared bank validation (minimum 67, unique IDs, explanatory text, valid answer indices, no out-of-scope units).
- Confirm six lesson-by-three domain quotas. Return **withheld** on any missing cell; total count alone never overrides failed coverage.
- Select unrepeated items first within **each** lesson/domain cell. Only then allow a repeated item if a later retake exhausts unseen material in that cell.
- Shuffle the selected 50 without altering source questions or giving an unrestricted random draw the opportunity to eliminate required coverage.
- Return a draft, nonofficial selection. It does not grade learners or write attempts, student records, course completion, certificates, teacher notes or parent exports.
- `inspectBalancedFrenchUnit01Draw` inspects coverage without disclosing answer keys.

The companion `gradeBalancedFrenchUnit01Attempt` function rechecks the exact 50-question matrix, rejects out-of-scope items and invalid response indices, and returns a **nonofficial** formative result only. It cannot update the Hall learner record.

## Quality and release safeguards

**Authoring complete does not mean eligible for administration.** Current banks have an assistant draft editorial pass but no independent qualified linguistic sign-off. The engine has no per-item *editorially approved* flag, topic coverage, calibrated difficulty metadata, item exposure limits beyond prioritizing unseen items, or live learner-scoped attempt tracking. It does not test listening, oral conversation or original writing. It is not connected to the current Hall manual-score or historic completion authority.

Before release, commission an approved-item allowlist, verified original instructional passages, quality review of plausible alternatives and Francophone variation, difficulty calibration, audio and speaking evidence, authentic writing review, the 50-item blueprint QA and safe records with explicit corrections/retakes. Verify GitHub Actions execution and real browsers. Keep a fixed printable/editor-only answer key separate from learner screens.

## Automatic regression

`scripts/test-french-high-school-unit01-balanced-exam.mjs` checks all four grades, exact quota matrix, pass/fail boundaries, zero-overlap second draws *where enough draft questions remain*, explicit failure when one lesson/domain cell is empty, duplicate IDs, cross-course questions, invalid random values and the non-published status.

The CI workflow includes the new regression; successful GitHub Actions execution and live integration still need to be observed.
