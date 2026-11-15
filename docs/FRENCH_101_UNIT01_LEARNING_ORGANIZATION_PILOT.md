# French 101 · Unit 01 Learning Organization Pilot

**Date:** 2026-11-15  
**Branch:** `french101-unit01-learning-organization-pilot`  
**Source:** `apps/French_101_index.html`  
**Decision:** Protected pilot; **not** merged to `main` and **not** yet live-browser certified.

## What changed

A nine-stage navigation guide appears at the beginning of the existing Lesson 01 section. The guide points to **existing** content rather than copying, moving, collapsing or replacing it. Stage buttons are ordinary keyboard-accessible buttons with explicit targets and focus transfer. The guide is omitted from printed work.

Stages: Orientation; Discover; Listen & Observe; Guided Practice; Read & Understand; Create & Communicate; Practice Laboratory; Review & Corrections; Save, Print & Continue.

This is **navigation scaffolding**, not yet a complete transformation of the lesson body into nine discrete content panels. Existing content remains in its prior order; jumping between stages is intentional and does not redefine chronological reading order.

## Academic and data preservation

No original lesson paragraphs, bank items, scores, student textareas, keys or learner evidence were rewritten. No new persistent storage keys were added. No mastery rule or certificate route changed.

The new source-level test `node scripts/test-french101-lesson01-stage-guide.mjs` checks the nine stages, event-button behavior, focus links and principal preserved keys.

## Browser acceptance checklist (not yet completed)

- [ ] Desktop: all nine buttons appear and land on the correct visible heading
- [ ] Keyboard: Tab, Enter, Space, focus return, focus visibility, screen-reader labels
- [ ] Tablet landscape/portrait: card grid remains readable, no horizontal overflow
- [ ] Mobile at 255px: headings and buttons stay within the viewport
- [ ] Existing writing: save, reload, switch learner and recover exactly as before
- [ ] French audio: real voice and no-voice fallback
- [ ] Actual print preview: guide hidden; student worksheet and original writing preserved
- [ ] Assessments: daily practice cannot unlock official levels; Unit 01 and legacy gates unchanged
- [ ] No duplicate header, toolbar or unexpected scroll capture
- [ ] Educator review: alphabet names, accents, pronunciation and original dialogue accuracy
- [ ] Historical October 31 source comparison before any content restoration

## Promotion gate

Merge only after the source test passes, browser matrix passes, learner-work checks pass and the lesson's original content is approved. Extend the pilot to Lessons 02–06 **only afterward**, one at a time.
