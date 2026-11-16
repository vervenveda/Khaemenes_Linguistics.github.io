# French III and IV · Unit 01 Teaching-Context Repair
**Checkpoint:** 2026-11-15  
**Status:** Teaching models revised on main; official course mapping and assessment release still on HOLD.

## Scope of this repair
The Khaemenes Academy French I–IV Hall continues to define the original 36-week thematic curriculum. No learner score, historic completion, assessment approval or official course theme changed.

The pilot companion at `Halls/french-high-school-unit01-instruction.html` retains the single Lesson 01 renderer for all 24 instructional sections. In this milestone **all seven instructional content fields in Lessons 01–06 of French III and French IV** were rewritten to make the source passages, teaching explanations, reading checks, practice, student products and feedback match the Hall's primary themes more closely.

### French III · Original Unit 01 theme: education
1. **Evidence:** Fictional surveys of school-library use; distinction between attendance, satisfaction and achievement.
2. **Argument:** School transport and extracurricular access; balanced cost/equity objections and concessions.
3. **Conditional:** Hypothetical tutoring pilots, school funding and verified outcomes.
4. **Relative clauses:** School-specific reports, researchers and student participants with accurate attribution.
5. **Sources:** Two non-identical school surveys; distinguish sampling groups, denominators and measured outcomes.
6. **Mission:** A modest school reading-support proposal with transparent evidence limits and family participation.

### French IV · Original Unit 01 theme: identity & migration
1. **Memory:** Relocation and migrant identity versus administrative departure counts; no inferred motives.
2. **Provenance:** Later captions and earlier family migration letters; explicitly fictional sources.
3. **Counterfactual:** Unreal past migration alternatives, restrictions, assumptions and limits.
4. **Translation:** The difference between 'had to leave' and 'chose to leave'; community register and agency.
5. **Representation:** Archival migration documents, a staged departure film and symbolic poetry.
6. **Mission:** An evidence-aware Many Voices migration exhibit with attribution, source limitations and missing perspectives.

## Controls preserved
- French I and French II teaching records retained as-is; no rewriting of their 12 lesson sections.
- One canonical Lesson 01 presentation structure remains shared across all four levels.
- The pilot crosswalk retains original theme arrays and all 24 mappings. Revised teaching context is recorded explicitly, but **draft question-bank alignment is NOT marked complete**.
- No real learner names, personal data, external runtime dependency, browser persistent storage or student grading action added.
- Fictional teaching sources are identified as fictional; avoid claims that any constructed texts are actual archival evidence.
- New context regression `scripts/test-french-high-school-unit01-education-migration-context.mjs` is wired to the four-grade CI workflow.

## Remaining precise alignment work
The existing French III and IV assessment banks still include prompts about noneducational generic policy and nonmigration historical analysis. They are useful as broad transferable practice but **must not be treated as approved official Unit 01 questions without item-level review**. Next:
1. Classify the 324 drafted French III–IV items against the official theme, explicitly tagging `primary`, `transfer`, `later-unit` or `requires-rewrite`.
2. Review an independent sample of French language, answer-key ambiguity and distractor fairness, then replace off-theme items where necessary.
3. Connect each proposed approved item to a specific teaching objective/source; preserve the 27-question lesson bank and 67-question unit reserve.
4. Add real listening and interpersonal evidence in separate, reviewable activities; current written models cannot certify a student's listening/speaking competence.
5. Verify automated CI runs, browser/print accessibility and learner-scoped progress handling before releasing exams.

**Verification boundary:** GitHub commits and source checks are reported, not independently confirmed full browser QA or passing GitHub Actions execution.
