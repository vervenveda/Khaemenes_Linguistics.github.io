# Arabic I & Russian I — Weeks 06, 07, 20, 21 Evidence Pre-audit
Date: 2026-10-23 | Branch: main

## Scope and source inspection
Eight files: both languages, weeks 06 (introductions), 07 (pronouns), 20 (preferences/ordering), and 21 (home/neighborhood/city).
All eight already contain topic-specific four-skill evidence studios, navigation, browser-local evidence journal and teacher-review companion script references. No lesson-level additions were required in this pass.

## Confirmed gap and mitigation
The shared teacher-review form allowed a listening score without identifying an audio source. It now requires a self-declared instructor-approved recording ID or teacher-read passage reference before a listening score can be saved. The reference is not independent certification and should not contain private media or personal identifiers. Existing local review entries remain readable; no migration or deletion was performed. See commit fd334b3a7654aacd31761394a2b42317daaaf73b.

## Academic review still required
- Arabic: diacritics/vowel marks, morphology and gender agreement, idiomatic register, Modern Standard Arabic vs regional variants.
- Russian: stress, aspect, case government, agreement, idiomatic word order.
- Qualified language specialists must verify the eight passages and audio scripts before certification.
- Neither an actual reviewed recording manifest nor a complete source-to-transcript checksum was established in this audit. Mark listening tasks as pending rather than mastered.
- Browser-local records use learner-chosen labels and are not authenticated identity partitions; on shared devices, labels do not establish access control.
- Teacher-review worksheets are self-entered and do not constitute independently authenticated signatures.
- Live browser, offline, screen-reader, print, import/restore and multiple-learner regression tests are pending.

## Next actions
1. Produce a per-lesson grammar issue log with line references and second-review decisions.
2. Build an approved audio manifest (source, reviewer, license, lesson, transcript, integrity digest) without publishing student audio.
3. Test local portfolio save/load/import isolation across two learners and deliberate label collisions; improve privacy boundaries if necessary.
4. Execute live end-to-end testing before production or academic sign-off.

No quizzes, navigation, or learner records were intentionally modified.
