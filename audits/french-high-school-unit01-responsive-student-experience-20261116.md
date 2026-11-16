# Khaemenes Academy · French I–IV · Responsive Student Experience Audit

**Checkpoint:** 2026-11-16  
**Scope:** Shared French high-school Unit 01 *pilot study companion*, all four levels, with 24 instructional lessons, extended reading, listening/speaking and evidence bridges.  
**Status:** Targeted UI repairs committed to `main`; source checks passed; actual browser/device and CI run remain unverified.

## Forensic findings and repairs

| Finding | Before | Repair |
| --- | --- | --- |
| Desktop lesson width | Two columns above 980px cramped long instructional source passages and writing areas | One centered, maximum 900px lesson column at all widths, preserving ample reading space |
| Small-screen controls | Buttons could wrap unpredictably and crowd text | At 640px and below, lesson controls become single-column 44px-minimum targets, with narrower internal padding and wrap-safe text |
| Navigation | Students needed to scroll through six long lessons | Added a centered six-item lesson jump directory, three columns normally and two at small widths, using native section anchors |
| Print layout | Keeping entire long cards together created blank pages and awkward splits | Scoped print layout allows long cards to break across pages, gives 14mm margins, suppresses buttons/navigation/notes and keeps headings with following text |
| Print one lesson | Only an all-lessons print control existed | Each lesson now has a **Print this lesson** button; print mode hides other lesson cards and automatically clears its scope after printing |
| Incorrect export grade label | Original user-initiated TXT export labeled French I and II as IV | Mapped `hs1..hs4` to the correct `French I..IV` textual export heading |
| Lost drafts on level switching | Changing the level discards on-screen evidence notes and writing | Draft-aware confirmation for level switching and browser exit, plus visible reminder to export manually |
| Keyboard/screen-reader affordances | Focus styles covered only some elements, and students had no quick lesson directory | Common visible focus treatment for controls; semantic lesson navigation, native accessible details, labeled note fields and existing live feedback remain |

## Protected academic architecture

- Single Lesson 01 six-stage canonical renderer and its unchanged teaching data for all 24 pilot lessons.
- All **four** levels retain 6 reading labs, 6 guided listening/speaking activities and 6 evidence bridges each.
- No change to the original Hall themes/week structure, 648 draft assessment-bank items, learner records, scores, 80% mastery gate or draft exam publication hold.
- No localStorage, sessionStorage, IndexedDB, recording, automatic grade submission or network fetch added.
- User-selected TXT export remains a manual browser download rather than a claim that Academy records were saved.

## Verification performed

- Re-fetched canonical companion page and regression files after commits.
- Confirmed both page JavaScript and new UI regression JavaScript **parse successfully** as JavaScript, without executing application code.
- Confirmed source presence of responsive 1-column layout, small-screen breakpoints, focus-visible selectors, per-lesson print targeting, print CSS, correct export grade names, draft-protection logic and all required lesson-template markers.
- Confirmed the new `scripts/test-french-high-school-unit01-responsive-print-ux.mjs` regression is connected to the GitHub Actions workflow.
- Confirmed there is no unexpected browser-persistent storage or fetching in the page source.

## Remaining validation gates

1. Test the live site at approximately 320px, 390px, 768px, 1024px and 1440px widths, including tablet portrait/landscape and 200% text zoom; inspect for clipped media, horizontal overflow and toolbar collisions.
2. In a real browser, verify lesson links, all 24 accordion sequences, radio/checking interactions, voice stop and fallback, four-grade switching, and export download filenames.
3. Verify print previews for one lesson versus all lessons and that student-entered textareas display their complete content. The printable source UI is improved but real preview has **not** been independently inspected.
4. Run screen-reader and keyboard-only testing, verify focus order and all feedback announcements. CSS focus and semantic markup alone are not a substitute.
5. Observe successful GitHub Actions execution; source checks do not certify green CI.
6. Request qualified French educator approval before any of the draft exam banks become available to students.

**Release:** The UI repairs are committed, but their cross-device acceptance status is **pending live testing**. The pilot remains educational practice, not an official course completion or assessment.
