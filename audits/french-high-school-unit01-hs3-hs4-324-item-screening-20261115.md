# French III–IV · Unit 01 assessment item-by-item theme screening

**Checkpoint:** 2026-11-15  
**Review type:** Assistant source-level thematic screening, not independent French educator review.  
**Decision:** EXAMS REMAIN UNPUBLISHED; no item is approved for official assessment.

## Scope and categories

The review covers **324 draft assessment items**: 162 in French III and 162 in French IV, across six lesson banks each. The authoritative 36-week Hall themes and newly revised instructional companion were compared with item prompts and keyed responses.

- **primary:** Prompt or assessed context directly supports the original official Unit 01 theme, subject to additional lesson-objective, key and language review.
- **transfer:** General grammar, argumentation or source-interpretation skill; no confirmed Unit 01 topic anchoring, so not automatically eligible.
- **later-unit:** Content more naturally associated with another original Hall thematic unit; preserve for future scheduling and review.
- **requires-rewrite:** Targeted contextual or linguistic rewrite needed before reassessment.

All 324 item IDs, source-bank paths, current prompt strings, keyed answers, learning domains, draft lesson numbers and screening rationales are preserved in `data/french-high-school-unit01-hs3-hs4-item-topic-crosswalk.json`. Source question banks and their keyed answers were **not altered**.

## Classification totals

| Course | Primary theme fit | Transfer-only | Later-unit fit | Requires rewrite | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| French III · Education | 16 | 117 | 28 | 1 | 162 |
| French IV · Identity & migration | 68 | 79 | 15 | 0 | 162 |
| **Both** | **84** | **196** | **43** | **1** | **324** |

These are conservative **screening judgments, not item approvals**. A transfer question may ultimately prove suitable for the official theme after a teacher supplies sufficient educational context; a primary question can still fail linguistic review.

## Confirmed 50-question blueprint coverage gap

The draft balanced unit specification requires 50 questions per draw, distributed 9/9/8/8/8/8 across six lessons and 17/17/16 across language-use, interpretation and transfer. Checking only those currently labeled `primary` against the 18 lesson × domain cells reveals:

- **French III:** 34 minimum selection slots lack a preliminarily primary-tagged item in their required lesson/domain cell. Many early language-use prompts are general French grammar with no school-specific scenario. Only 16 items carry a provisional primary tag in the entire 162-question bank.
- **French IV:** 8 minimum selection slots remain unfilled despite 68 preliminarily primary-tagged items overall. This particularly affects language-use in Lessons 01–04; many context-neutral past conditional and editorial-form questions need migration-related examples.

Both courses therefore fail the **theme-aligned blueprint commissioning check**, regardless of total bank count or the 67-item minimum reserve. These shortages are lower-bound selection shortfalls, *not* a final estimate of required new items: adequate retake reserves and independent review may require further replacements.

## Specific repair directions

### French III
1. Rewrite general claims about bicycle routes, municipal maintenance, housing, and rural transport as evidence-based school problems where the tested linguistic construction survives.
2. Bring general future and conditional examples into school-program timelines, tutoring, school libraries and budgets.
3. Use school-specific referents with `qui`, `que`, `où`, `dont` while preserving correct answer positions and distractor plausibility.
4. Rewrite the survey comparison sources as genuinely different school datasets; explain denominators, populations, question wording and outcome limitations.
5. Develop sufficiently many original **language-use** items in all six lessons, not just interpretation questions.

### French IV
1. Ground the counterfactual and past-condition language questions in carefully labeled migration/identity scenarios, without implying they document actual events.
2. Use translation of necessity, identity terms and community voice in Lessons 01–04, not generic civic debates alone.
3. Retain useful editorial, provenance and literary genre questions as transfer practice, but do not automatically promote them into Unit 01 without context.
4. Audit the missing language-use blueprint cells first; ensure content genuinely teaches the necessary forms and retains linguistic fairness.
5. Preserve a distinct path for original writing and teacher-reviewed oral/listening evidence.

## Safeguards and next steps

- The existing 648 question banks, lesson titles, answer keys and historical learner records are untouched.
- Screening labels must not be used as an unreviewed allowlist. The current balanced sampler remains nonofficial and **does not filter by independent item approval**.
- `scripts/test-french-high-school-unit01-hs3-hs4-item-crosswalk.mjs` checks every item against its original question-bank ID, prompt, keyed answer, lesson and learning domain. It also checks the explicit unpublished/screening status.
- This test is included in `.github/workflows/french-high-school-alignment.yml`. A successful CI execution or browser run has not been independently confirmed.

**Recommended next repair:** Begin a controlled, surgical French III language-use and source-context rewrite with a preservation report of prior item IDs, correct answer positions and old/new content. Then do the same for French IV language-use. Recompute each lesson/domain coverage matrix after every batch; do not publish before an independent education and linguistic review.
