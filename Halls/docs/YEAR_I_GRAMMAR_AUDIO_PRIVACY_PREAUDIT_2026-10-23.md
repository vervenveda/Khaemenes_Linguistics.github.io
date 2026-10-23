# Arabic I and Russian I — Grammar, Audio and Learner Evidence Pre-Audit
Date: 2026-10-23 · Source: main
Status: source-level audit and release-gate preparation; **not independently certified**.

## Verified preflight
Weeks 06, 07, 20, 21 in Arabic I and Russian I: eight of eight lesson pages contain `four-skill-evidence-v2`, ten-question quiz banks and `lesson-navigation`. Comparison Weeks 03 and 17 in both languages also retained these features. None of the twelve sampled pages contained an HTML audio-player element. Absence of an audio player does not prove that no supervised live oral teaching happens.

## Lesson-specific grammar review register
| Course | Week | Review focus | Decision | Evidence required |
|---|---|---|---|---|
| Arabic I | 06 | Diacritics; grammatical agreement; MSA/register; reading-vs-spoken form | Pending specialist review | Lesson-level line annotations and signed reviewer decision required |
| Arabic I | 07 | Diacritics; grammatical agreement; MSA/register; reading-vs-spoken form | Pending specialist review | Lesson-level line annotations and signed reviewer decision required |
| Arabic I | 20 | Diacritics; grammatical agreement; MSA/register; reading-vs-spoken form | Pending specialist review | Lesson-level line annotations and signed reviewer decision required |
| Arabic I | 21 | Diacritics; grammatical agreement; MSA/register; reading-vs-spoken form | Pending specialist review | Lesson-level line annotations and signed reviewer decision required |
| Russian I | 06 | Stress and vowel reduction; grammatical case; agreement; syntax | Pending specialist review | Lesson-level line annotations and signed reviewer decision required |
| Russian I | 07 | Stress and vowel reduction; grammatical case; agreement; syntax | Pending specialist review | Lesson-level line annotations and signed reviewer decision required |
| Russian I | 20 | Stress and vowel reduction; grammatical case; agreement; syntax | Pending specialist review | Lesson-level line annotations and signed reviewer decision required |
| Russian I | 21 | Stress and vowel reduction; grammatical case; agreement; syntax | Pending specialist review | Lesson-level line annotations and signed reviewer decision required |

## Audio release protocol
The machine-readable manifest is `Halls/docs/year-i-listening-source-manifest.json`. All eight audio items start `pending-review` without invented files or reviewers. An approved item must include accessible audio file, matching transcript, source rights, language reviewer, date and comprehension checks. Transcripts are teacher aids and should not automatically appear during independent listening assessment. Never treat synthesized audio or speculative transliteration as independently validated native pronunciation.

## Student portfolio/privacy regression protocol
Use only fictional `test-learner-alpha` and `test-learner-beta` in automated tests. Confirm separate keys by learner, course and week; ensure switching students never reuses cached form state; reload, export, import and deletion must remain isolated. Teacher review requires explicit permissions; localStorage alone does **not** create a security boundary on a shared browser origin. For production, server-side identity/authorization or independently encrypted per-learner storage with careful key handling is needed before sensitive learner work is centrally accessible. Do not publish names, photographs, student writing or access tokens in the repository.

Source simulator: `node Halls/tools/check-year-i-evidence-privacy.mjs`.
This simulated check does not exercise real profile integration, browser storage or real permissions. A live two-profile regression remains required.

## Separate QA milestones
1. Review Arabic vowel marks/hamza, number/gender agreement, formality and dialect labels line by line.
2. Review Russian case government, aspect, stress placement, collocations and natural sentence structure.
3. Have independent reviewers sign off recorded audio and timed listening tasks; include an alternative for disability accommodations.
4. Complete two-learner browser acceptance tests for login, pin, submission, teacher review, restore, export and deletion.
5. Re-run source and browser quiz/navigation regressions. Do not assert course accreditation before the checks pass.
