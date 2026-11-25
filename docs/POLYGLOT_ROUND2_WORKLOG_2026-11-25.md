# Polyglot post-merge hardening round 2

Base: 6a64c736d21321e898fd41d8e7718c406eb64873. Review branch; no learner data migration, production writes, private vault changes, or STOS changes.

1. Repair structural French alias and theme-command assertions; align dynamic Spanish fixture with expanded copy. Run integrity and browser checks on pull requests and continue independent steps after failures.
2. Correct week index routes and validate resolved targets. Preserve the existing top/bottom navigation pairs until the full 64-page render audit; do not generate another pair when either existing form is present. Make rollout read-only, exclude the historical translator redirect, and require deliberate review of generated changes.
3. Pin Hall scope to opened record; reject stale tab save/export/restore/undo/clear, bind legacy state in memory, add two-context synthetic regression. Same-learner concurrent edits, rapid selection away/back and cross-app scope remain separate review items.
4. Automatic machine translation operates only on explicitly marked unchanged static leaf text captured at init; no automatic draft persistence or vocabulary harvesting, legacy storage untouched. Coverage counts remain broader, exported missing strings restricted. Existing curated translation continues; unmarked machine coverage intentionally reduced until reviewed static copy is marked. Bound runtime cache to 400 entries; exclude arbitrary query keys and out-of-scope requests. Real offline upgrade and external-request interception testing remain required.
5. Validate French progression and review scores; maintain historical 10-question lesson, 20-question Unit 01, 24-question Unit 02 and 30-question midterm recognition; never delete recorded scores. Earlier unused assessment selectors retained pending provenance audit; no full browser learner journey claimed. Expand CI to exercise existing bank and mastery tests.

Verification is required before merge. No claims of completed CI/browser certification at authoring time.

Follow-up source verification: historical commit 61a70a7 confirms distinct Unit 01 (20), Unit 02 (24) and midterm (30) totals. Unit 03 and canonical final were not present in that version. Gate-specific compatibility replaces the shared question-count lookup so one gate cannot accept another gate's historical total.
