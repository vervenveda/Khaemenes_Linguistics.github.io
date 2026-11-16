# Khaemenes Academy · French III–IV Unit 01 bilingual editorial accuracy checkpoint

**Checkpoint:** 2026-11-15  
**Status:** Editorial source-level repair and structural recheck committed; independent educator review still REQUIRED.  
**Scope:** Six draft lesson banks in French III (162 items) and six in French IV (162 items), total **324**.

## Work completed

The editorial pass compared the revised school/education and identity/migration wording with answer choices, grammatical targets, explanation text and the crosswalk's recorded correct answers. Ten concrete issues were corrected in-place, without moving correct answer indices or changing any question ID, course metadata, domain, bank size, or unpublished status.

| Course/item | Defect corrected | Change |
| --- | --- | --- |
| French IV L01 Q007 | Past conditional `il aurait fallu` mismatched with an ambiguous present-tense consultation scenario | Recast as hypothetical present `Il faudrait que … consultent`; explained the subjunctive |
| French IV L02 Q008 | Explanation mistakenly mixed plural and singular conditional forms | Corrected the explanation of `aurait été rédigé vers 1920` |
| French IV L03 Q010 | Key said “residents” when passage specified displaced families | Key now refers to displaced families and an explicitly hypothetical outcome |
| French IV L04 Q005 | Formal rewrite lost some sense of the informal original | Used `Ce document présente plusieurs éléments`, a precise register correction |
| French IV L04 Q006 | “Traduction de l'auteur” obscured translator/editor responsibility | Identified the editor's proposed translation and editorial note |
| French IV L05 Q003 | Correct answer assumed documentary sources had been identified | Defined the staged scene as performed by actors, distinct from original footage |
| French IV L05 Q004 | Fictional teaching letter implicitly claimed real archival accession | Required a fictional source identifier instead of an invented real archive reference |
| French IV L05 Q006 | `une autrice encore débattue` awkwardly described the author instead of uncertain authorship | Changed to `L'attribution … reste débattue` |
| French III L05 Q006 | Question lacked bounded observations behind a school-wide comparison | Gave the actual three-school scope in the prompt and explanation |
| French III L06 Q015 | Generic survey question lacked a clear educational source context | Linked the 30-of-50 calculation to a fictional school tutoring survey |

The question bank files were edited *only at these ten locations*. The source-level crosswalk was updated to match changed prompts or answer text, with per-item `editorialCorrection` provenance and `independent-review-pending` preserved. Six of the ten fixes changed the correct answer's wording; **no correct answer index changed**.

## Verified cross-bank structural checks

- **324 / 324** questions accounted for across 12 source files.
- **162 distinct prompts per course**, unique source question IDs and 27 items per lesson.
- **9 items per domain** (language use / interpretation / transfer) and **9 keyed items per choice position** in each 27-item lesson bank.
- All source prompt, keyed choice and domain fields agree with the machine-readable per-item crosswalk.
- All source files remain `authoring-review-not-published`; the crosswalk retains `officialUnit01Eligible: false`.
- New regression: `scripts/test-french-high-school-unit01-bilingual-editorial-repair.mjs` (CI path and step connected).

**Verification limitation:** These were source-level checks and editorial judgments, not observed successful Node CI execution or a real student-browser test.

## Important outstanding quality issues

1. **Qualified bilingual review:** A French-language educator must independently sign off on all 324 stems, semantic correctness, multiple defensible interpretations, register, cultural nuance and the fairness of distractors. This pass does **not** claim independent comprehensive sign-off.
2. **Difficulty:** A significant portion of distractors are obviously implausible (`toujours`, `forcément`, unrelated words or impossible time markers). Students may succeed by eliminating exaggerated options instead of demonstrating French proficiency. Commission three plausible, grammatical alternatives when the skill permits, while preserving one demonstrably best answer.
3. **French input balance:** Many higher-level items use English stems with only short French fragments. Add substantial, connected French readings and source packets with explicit evidence retrieval and context—not merely isolated one-sentence snippets.
4. **Four-skill validity:** Written multiple-choice items alone do not verify original French writing, spontaneous speaking, pronunciation or audio listening. Use teacher-reviewed performance tasks and properly sourced audio with transcripts.
5. **Official topical eligibility:** Provisional `primary` counts remain a theme-screening measure, not an approved-item allowlist. The underlying Hall phases and pilot lessons still need confirmed official lesson-level mapping.
6. **Retakes and learner safety:** Validate source-level distractor variants, question exposure, correction-before-retake, learner-scoped submission provenance, persistence and export. Do not grant credits or unlocks from these drafts.

## Recommended next stage

Run a **distractor-quality and reading-depth repair** for the two highest-risk groups: French III's education-policy evidence items and French IV's historical/translation source items. Build paired short source passages first, followed by contextually credible distractors. Preserve source items as drafts until a qualified bilingual review verifies that there is exactly one best response.

**Historical record boundary:** No student grades, completion flags, official Hall curriculum pages or college French 101–202 content were changed.
