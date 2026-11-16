# French I–IV · Unit 01 · Lesson 01 Canonical Teaching Blueprint

**Status:** Shared instructional presentation implemented on `main`, subject to independent linguistic review and official curriculum crosswalk. No exams or historic learner records changed.

## Canonical lesson structure

Every grade's Lessons 01–06 now uses the **same renderer and instructional section order**, derived from the initial Lesson 01 companion design:

1. **Lesson title and objective — “I can…”**: learner-facing achievement statement centered beneath the title.
2. **Explore — Teaching explanation**: a concise, accurate grammar, context or source-reasoning model.
3. **Read — Original French model**: a French-language passage or dialogue, visually differentiated with `lang="fr"`.
4. **Check — Guided interpretation**: reading-comprehension questions based on the model.
5. **Practice — Correct and explain**: explicit, supported correction tasks and metalinguistic feedback.
6. **Create — Your evidence**: an original sentence, dialogue, story, argument or source synthesis appropriate to grade.
7. **Reflect — Self-check and feedback**: a correction-oriented explanation, not simply a score.

The six learning sections after the objective use collapsible disclosure controls. The first teaching explanation is initially expanded; other sections can be opened as needed. Learners can expand or collapse all sections and print the entire companion.

## Scope and parity

| Grade | Canonical lessons | Academic content |
| --- | ---: | --- |
| French I | 6 | Greetings, spelling, family, classroom present tense, café, integrated communication |
| French II | 6 | Past-event narration, agreement, imperfect, pronouns, reading, integrated storytelling |
| French III | 6 | Evidence, counterarguments, conditional, relatives, source comparison, debate |
| French IV | 6 | Memory, provenance, counterfactuals, register, source representations, curation |

The rendering sequence is **one function** (`renderLesson`) and **one blueprint constant** (`LESSON01_BLUEPRINT`) for all 24 sections. Differences remain in academic content, not layout. No duplicated grade-specific presentation functions are introduced.

## Verified source-level conditions

- Four grade-specific data packages, six lesson sections each, eight populated source fields per lesson.
- Six shared expandable section labels, one common renderer, consistent centered title and descriptor.
- A visible Level selector, all-section expand/collapse buttons, printable view and accessible disclosure controls.
- No localStorage, sessionStorage, backend attempt writes or automated mastery or completion.
- Both `scripts/test-french-high-school-unit01-instructional-companion.mjs` and `scripts/test-french-high-school-unit01-lesson01-canonical-layout.mjs` are configured in the GitHub alignment workflow.
- Existing title expectation for French I Lesson 04 was corrected to “School Routines” rather than “class.”

## Remaining gates

1. Confirm browser/device/print behavior and successful CI execution; source inspection is not a live-browser test.
2. Crosswalk the provisional topic sequence to the original 36-week official Hall themes without reassigning stored progress.
3. Obtain independent French-language/editorial review and add deeper authentic passages, listening, graded pronunciation and speaking tasks.
4. Add student workspaces and approved rubric-based evidence only after permissioned student-scoped persistence is verified.
5. Release examination banks only when alignment and approved-item sign-off are complete.

**Meaning of “unified”:** Layout and student learning journey are synchronized; the academic content remains distinct and increases appropriately across French I–IV. This does **not** imply that every official 36-week course lesson has been rebuilt.
