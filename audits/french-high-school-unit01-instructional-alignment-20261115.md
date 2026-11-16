# Khaemenes Academy · French I–IV · Unit 01 instructional alignment audit
**Checkpoint:** 2026-11-15  
**Assessment scope:** Four 36-week high-school French courses; 6 draft lesson banks per grade (648 authored MCQs).  
**Decision:** Instructional companion PILOT COMMITTED; assessment and alignment certification HOLD.

## Repository evidence reviewed
- `Halls/index.html`: language and grade metadata; six broad themes per course; a generic 36-week six-phase map (Input & Modeling, Vocabulary/Script, Structure & Patterns, Interpretive Lab, Interpersonal Lab, Presentational Performance); manually reviewed progress and percentage entries; generalized theme-based Practice Studio.
- `data/french-hs{1,2,3,4}-unit01-lesson01..06-bank.json`: six 27-item draft banks per grade.
- `assets/french-high-school-assessment-contract.mjs` and `assets/french-high-school-unit01-balanced-exam.mjs`: unpublished 20-item lesson and balanced 50-item unit draw foundations.
- `docs/FRENCH_HIGH_SCHOOL_UNIT01_LESSON06_MISSION_BRIEFS.md`: proposed human-reviewed integration performances.
- Newly committed `Halls/french-high-school-unit01-instruction.html`: one keyboard-navigable, printable, zero-storage study companion with 4 selectable courses, 6 expandable lesson sections per course, each containing objective, explanation, original French passage/dialogue, comprehension, guided correction, independent product and feedback.

## Critical topology discrepancy — do not conceal
The existing **Hall thematic unit map** is not the same as the newer **six-lesson question-bank sequence**. The original Hall's first theme of each grade is:
- French I: **identity**. The provisional 6-lesson sequence expands into school, family and café/food topics. These belong across multiple themes in the existing Hall map, and cannot automatically be certified as Unit 01 instruction.
- French II: **past experiences**. Past storytelling, pronouns and narrative sources largely fit the theme, but review individual sequence boundaries.
- French III: **education**. The draft sequence is evidence/debate/conditional policy across general community topics; must anchor its sources and performance tasks to education or be explicitly reclassified.
- French IV: **identity & migration**. Current drafts focus on broad archive, memory, historical counterfactual and source ethics; explicit migration/identity contexts need stronger grounding.

A further distinction: Hall week phases (week 1 modeling, week 2 vocabulary, week 3 structure, etc.) are **not** equivalent to six autonomous teaching lessons as assumed by the pilot question banks. No official course topology or historic student completion was remapped in this checkpoint.

## New instructional support
The companion page has 24 authored guided lesson sections. Four-grade routing from Hall is conditional on `state.activeLanguage==="french"` and one of `hs1..hs4`; college French and unrelated language stages are unchanged.
Each section supports a student-visible learning sequence: **Explore → Read → Check → Practice → Create → Reflect**. There is a print option and no persistent browser storage or automatic mastery scoring.
These materials are new instructional **scaffolds**, not evidence of full existing-course lesson coverage or complete high-stakes assessment alignment. No actual listening-audio asset or self-grading is supplied.

## Five high-priority remaining bubbles
1. **Curriculum mapping:** Obtain the authoritative 36-week topic sequencing and decide where pilot Lesson 01–06 should live without replacing the original Hall map or moving previous completion flags. Create a question-to-teaching-objective crosswalk and mark exceptions.
2. **Target-language input:** Increase authentic connected passages and calibrated French III–IV reading length. The brief models are introductory; they do not by themselves establish intermediate proficiency or culturally broad source interpretation.
3. **Listening and interpersonal tasks:** Commission real approved audio with editable transcripts, graded speaking rubrics and review provenance. Silent written prompts must not be scored as listening proficiency.
4. **Actionable formative feedback:** Add short practice and correction cycles, an answer workspace, accessible printables and feedback tied to a demonstrated misunderstanding; no third-party runtime dependency or persistent localStorage.
5. **Editorial certification and release safety:** Independent educator reviews need a traceable approved-item flag. Only an approved subset of at least 67 unit-eligible items per grade should enter the official exam bank. Verify full CI and browser behavior, learner isolation, existing-grade preservation, export and recovery.

## Implemented controls and regression
- New companion linked to French I–IV only, labeled **pilot** to avoid implying existing curricular alignment.
- `scripts/test-french-high-school-unit01-instructional-companion.mjs` validates the presence and structure of all 24 lesson sections, grade selector and safe course routing.
- Workflow `.github/workflows/french-high-school-alignment.yml` includes this test and its changed paths. Source-level checks passed for four levels, 24 section records and required instructional fields. GitHub Actions **execution has not been confirmed**.
- Historical learner state, score provenance, assessments and completion have not been altered.

## Recommended controlled next milestone
Commission a **four-grade Unit 01 topic/assessment crosswalk**, mapping each lesson-bank objective and companion activity to an official course theme, specific week phase, performance task and test eligibility. Resolve the above theme mismatch *before* presenting any question bank or study companion as the official course Unit 01 curriculum.
