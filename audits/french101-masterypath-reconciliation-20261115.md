# French 101 · Preservation and 18-Lesson Mastery Reconciliation

Status: proposed, not deployed. Review branch only. Date: 2026-11-15.

## Non-destructive preservation
- Protected full main snapshot: preservation/french101-pre-reconciliation-20261115.
- Preserve October 31, 2026 source history; locate exact 4:04 PM timestamp using author timezone before claiming any single historical commit is the baseline.
- Preserve every legacy 12-level progress, score, historical final and certificate key as read-only historical achievement.
- Do not overwrite lesson source, lesson banks, saved writing or academic evidence to reconcile progression.
- Never infer canonical mastery from a checklist mark, a legacy grade, or opening a lesson.

## Canonical authority
18 lessons in 3 groups of six remain the current curriculum. Canonical completion status must not be derived from the 12-level compatibility certificate.

## Mastery gates (required)
- Every lesson has a **distinct ten-question lesson quiz**, with at least 8 correct (80%) needed to unlock the next lesson.
- Unit 01 assessment is locked until Lessons 01–06 each have an 80% quiz pass. Its own passing score is 16/20.
- Unit 02 begins after Unit 01 passes. Unit 02 assessment is locked until Lessons 07–12 each have an 80% quiz pass. Its own passing score is 20/24.
- Midterm is locked until Unit 02 mastery; its own passing score is 24/30.
- Unit 03 begins only after the cumulative midterm passes. Lessons 13–18 individually require 80% before advancing.
- All entrance paths, including course-map buttons, internal dropdown, Next Lesson control, URL navigation and saved lesson selection, must honor the same gate.
- New results must include learner identifier, lesson number, version, integer score and total, question identifiers, attempt timestamp and integrity validation.
- Retakes must not destroy previous attempts or passes. Below-threshold work must remain editable, without forced random reshuffling.
- When the browser cannot persist a pass, **do not unlock** the next lesson.
- Historical grades must remain visible in a distinct section, clearly labeled as legacy and not migrated to new mastery records without evidence.

## Open integration requirements
- Validate question bank coverage and accuracy for all 18 lessons before enabling real gates.
- Keep formative self-checks distinct from graded work and from speaking/listening proficiency.
- Establish canonical Unit 03 and final assessment before making claims of full-course certification.
- Full automated regression and real browser test required before merge.
