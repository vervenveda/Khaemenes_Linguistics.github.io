# French 101 and French 201 · Lesson 01 Family Record Reconciliation

**2026-11-15 · Source-level implementation.** No academic scoring, pass gate, or question bank was changed.

## French 101
- A collapsed Student & Family Report appears beside the existing record-export tools.
- Reads the original alphabet assignment, independently authored dialogue, spelling transfer, corrections, observation, reviewer notes, four rubric selections, saved canonical quiz attempts/draft, and official canonical Lesson 01 mastery.
- Reports checklist separately from grades and never changes official passing scores.
- Exports report with readable summaries plus original underlying record values, from existing learner namespace.
- Does not authenticate reviewer observations or treat local TTS as an oral-proficiency certificate.

## French 201
- Adds an expandable Lesson 01 family report with saved-writing inventory, recent formative results, and unfinished-quiz progress.
- Upgrades the main JSON export so it includes all Unit 01 learner writing **and** Lesson 01 quiz attempt history and in-progress draft under their existing keys.
- Adds a refresh button. Preserves formative status; does not write into the formal V4 Five-Language course authority.

## Boundaries and QA
- Learner labels are local browser selectors, not authenticated IDs or cloud links. Backups contain student work: store privately.
- Five regression checks passed through a controlled JavaScript evaluation against the GitHub files. Browser, tablet, print-preview and actual export/download checks remain to do.
- Existing progress import flow remains unchanged; new family exports are backups/readable reports, **not** validated restore files. A restoration feature will require explicit version/schema and learner-identity checks and pre-restore snapshots.
- Source rollback branch: `preservation/french-lesson01-records-20261115`.

## Next stages
1. Check desktop/tablet card symmetry and export file contents.
2. Harmonize the seven-stage learning journey without replacing content.
3. Strengthen genuine interactive laboratory feedback and corrected examples.
4. Build independently verifiable listening activity and improve audio fallbacks.
5. Improve reasoning-based quiz calibration and QA.
