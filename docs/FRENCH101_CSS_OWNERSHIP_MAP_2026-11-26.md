# French 101 CSS ownership map · C02

Date: 2026-11-26

This map classifies the remaining style blocks after removing the proven-empty `french101-toolbar-fit` block. It is a consolidation guide, not permission to delete unique styles.

## Ownership classes

### A. Base / legacy shell
- anonymous base block — original page variables, baseline body/button/level/print behavior
- `french-landing-campus-layout`
- `french101-baroque-landing`
- `french101-baroque-framing`
- `french101-header-gold-legibility`

These overlap heavily with later KA/VNV presentation layers. Do not remove until computed-style equivalence is tested.

### B. Current global course presentation
- `french101-stable-workspace`
- `french101-unified-course-layout`
- `french101-refined-lesson-actions`
- `french101-audit-five-refinements`
- `french101-unified-card-and-footer`
- `french101-all-lessons-unified-finish`
- `french101-ka-unit01-design-pilot-v2`
- `french101-vnv-ka-crisp-parchment-v3`
- `french101-vnv-ka-section-headings-and-disclosure-v4`
- `french101-current-unit-archive-v1`

These are the main consolidation candidates because they repeatedly style the same course shell, cards, lesson panels and buttons with later blocks generally carrying higher specificity / more `!important`.

### C. Translator / shared chrome presentation
- `french101-translation-footer-repair`
- `french101-translation-exact-controls`
- `french101-secondary-navigation-narrator-v1`

These must stay separate until translator/header ownership is reconciled against the current shared Linguistics stack.

### D. Narration / audio
- `french101-audio-control-design`
- `french101-audio-panel-elegant`
- `french101-pronunciation-pace-control`

Potential merge target: one narrator/audio stylesheet after browser voice QA.

### E. Print / evidence
- `french-daily-print-override`
- `unit01-print-isolation`
- `french101-print-evidence-2026`
- anonymous print/cohesion helper block

Retain until print regression proof exists.

### F. Lesson-specific studios
- `french101-lesson01-unified-finish`
- `french101-day01-performance-layout`
- `french101-day02-blueprint-design`
- `french-lesson04-studio-styles`
- `french-lesson05-studio-styles`
- `french-lesson06-studio-styles`
- `french-lesson07-studio-styles`
- `french-lesson08-studio-styles`

These own unique lesson UI and should not be folded into the global shell until Lessons 01–08 anatomy is normalized.

### G. Course features / records
- `french101-canonical-spine`
- `french101-four-skill-expandable-grid-v5`
- `french101-learner-family-dashboard-v1`
- `french101-record-card-alignment-v2`
- `french101-resumable-assessment-v1`
- `french101-unit-progress-v1`

These are active feature owners and should remain explicit.

### H. Supporting / archive
- `french101-contribution-refinement`
- `french101-archive-video-slots`
- `french101-beginner-pathway-2026`

Retain while archive/contribution behavior exists.

## First safe consolidation result

Removed:
- `french101-toolbar-fit` — empty block, zero declarations, zero runtime value.

Remaining style blocks: 44.

## Next safe target

Before deleting any overlapping global presentation block, run a real-browser computed-style comparison at minimum for:
- landing page
- canonical unit map
- Lesson 01
- Lesson 08
- Lesson 18
- 20-question assessment
- 200-question final
- family dashboard
- narrator panel
- translator control
- mobile width
- print mode

Only selectors with equal computed output at all sampled surfaces should be removed or merged.
