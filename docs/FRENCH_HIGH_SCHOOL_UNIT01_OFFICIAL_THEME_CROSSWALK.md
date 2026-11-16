# French I–IV · Official Hall thematic crosswalk for Unit 01 pilot lessons

**Status:** Draft mapping, not an official syllabus revision.  
**Preservation rule:** The Hall's six-theme / 36-week course structure remains authoritative. No learner completion flags, manual grades, exam results or historical portfolios have been migrated or changed.

## Core topology finding

A Hall **unit** is a broad theme occupying six weekly phases:
**Input & Modeling → Vocabulary / Script → Structure & Patterns → Interpretive Lab → Interpersonal Lab → Presentational Performance**.

The newer pilot companion has **six instructional lessons** per grade, but these do *not* automatically correspond one-to-one to the Hall's six weekly phases. Calling all six pilot lessons “official Unit 01” would conceal cross-unit content.

## Four-grade mapping summary

| Grade | Official Hall Unit 01 | Pilot lessons with primary Unit 01 alignment | Cross-theme pilot lessons | Required resolution |
| --- | --- | --- | --- | --- |
| French I | Identity | L01–L03 | L04 maps to official Unit 02 school/work; L05 maps to Unit 03 food; L06 integrates Units 01–03 | Keep L04–L06 supplemental until formally scheduled |
| French II | Past experiences | L01–L05 | L06 also uses Unit 06 travel-problem context | Preserve L01–L05; treat travel notebook as integration rather than official unit completion |
| French III | Education | None is fully verified yet; L01–L05 have transferable language goals | Generic policy cases also map to Unit 06 community issues; L06 is cross-unit | Revise example contexts, readings and tasks to education, then re-check question-bank alignment |
| French IV | Identity & migration | Needs explicit identity/migration grounding | L01–L03 emphasize Unit 02 history/memory; L04–L06 bridge Units 01, 02 and 04 literature/film | Ground source passages in identity/migration and verify chronology/provenance |

The full 24-row, machine-readable mapping and revision notes are in `data/french-high-school-unit01-pilot-theme-crosswalk.json`. The companion mirrors these entries directly in each lesson card and labels them as **provisional**. The `scripts/test-french-high-school-unit01-pilot-crosswalk.mjs` regression compares the mirror with the source, validates all 24 mappings and asserts the original Hall's six theme arrays.

## Five instructional repairs before certification

1. **No implicit lesson→week promotion:** Preserve Week 01–06 as the existing phase sequence. Cross-theme pilot material may be enrichment or later-unit instruction; student historical progress cannot be automatically relocated.
2. **French I scope:** Preserve the welcome, spelling and family identity core. Class routines and café activities need official Unit 02/03 mapping or clear supplemental classification.
3. **French III educational anchor:** Build original education-focused source packets, dialogue/debate examples, learner-facing listening scripts, school-policy data comparisons and argument writing; audit question stems that currently use unrelated municipal policy.
4. **French IV migration anchor:** Build documented/fictional-identified diaspora, language and migration evidence tasks, source attribution, ethical representation and translation exercises; avoid implying reconstructed sources are archival originals.
5. **Evidence/release control:** Tie each bank item to a taught objective and independently reviewed source. Only vetted, on-theme items may enter a future official unit exam. The current 50-question balanced sampler is structural/draft-only and cannot certify the original official Unit 01.

## Changes implemented in this checkpoint

- Source crosswalk committed without altering Hall course data.
- Study companion's Lesson 01 canonical renderer unchanged in structure and now displays the mapping, review status and a plain-language reason for each lesson.
- Provisional “pilot” labels replace potentially misleading references implying every card is already part of official Unit 01.
- The new crosswalk test is wired into the existing French high-school GitHub workflow.

**Verification boundary:** Source checks and GitHub commits have been completed. CI execution and student-device browser behavior remain unverified. Independent linguistic and curriculum review is still required before release.
