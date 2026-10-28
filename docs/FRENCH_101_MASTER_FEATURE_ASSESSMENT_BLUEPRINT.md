# Khaemenes Academy — French 101 Master Feature & Assessment Blueprint
**Audit date:** 2026-10-28 · **Repository:** `vervenveda/Khaemenes_Linguistics.github.io` · **Source:** `apps/French_101_index.html` on `main` (inspected blob `2ea27a859b658880df911c07d419d5b73721e3e4`).

**Status:** Planning and source-level assessment audit, **not** live-browser or educator certification. Do not rewrite original lessons, modify student progress keys, alter mastery thresholds, or deploy unrelated design changes while using this checklist.

## 1. Historical feature inventory (reconstructed from our French 101 work)

Legend: [x] source/feature implemented or documented; [~] partial, unverified or inconsistent; [ ] still to build/certify.

### A. Core academic charter
- [x] Free French 101 entry open to all ages; original 12-level standalone course preserved.
- [x] Dedicated Unit 01: 15 daily lessons (Day 01 plus Days 02–15 in day selector); retain original Level 1 entry and course journey.
- [x] 80% official mastery threshold; student-friendly corrections, retakes and retries.
- [x] Distinguish **formative** practice/game activity from official mastery and reviewed performance.
- [~] Later formal pathways to middle-school French 1–3, high-school French I–IV and college French 101–202 must not silently overwrite this course.
- [ ] Standards crosswalk and external qualified-educator approval for any formal course-credit claim.

### B. Learning experiences
- [x] Original letter-name and pronunciation instruction, alphabet A–Z, accents, spelling, greetings and original French dialogue.
- [x] Reading interpretation, oral rehearsal, listening buttons, guided examples, writing prompts, correction and independent dialogue (Day 01).
- [x] Three worked Day 02 vowel examples; Days 02–15 selector, per-day prompts and local writing.
- [x] Handwriting Laboratory, alphabet matching, sound-to-spelling activity, sentence builder, pronunciation laboratory, Café story, original story reader, independent reading and vocabulary/practice tools.
- [x] Separate twelve-level story/reading resource, vocabulary/context and comprehension; Constellation mastery-map resource; practice-game shelves.
- [~] Days 02–15 are still uneven in academic depth and native daily question banks; review each day, not only CSS.
- [ ] Verified independent unfamiliar oral tasks, educator feedback, expanded authentic dialogues and cross-cultural contexts per day.

### C. Assessments and evidence
- [x] Day 01 legacy five-question warm-up with explanations, formative only.
- [x] Day 01 thirty-question authored bank, ten-question random review: two items per strand, five strands.
- [x] Lesson-specific stored writing, original dialogue and correction reflections, printable worksheet, educator rubric.
- [x] Unit 01 cumulative fifteen-question checkpoint with 12/15 threshold and separate saved result.
- [x] Original ten-question Level quiz with 8/10 threshold; typed translation, randomized item selection and answer equivalence matcher.
- [x] Final exam exists: ten sampled translation prompts across 12 levels; 8/10 pass; certificate after completed levels.
- [~] Level 1 mastery and Unit 01 checkpoint are separate and conditionally interlocked; legacy passes are preserved, but exhaustive state-transition testing is outstanding.
- [~] Listening questions can fall back to visible text when French speech is unavailable: fallback **must not** count as verified independent listening.
- [ ] Formal midterm **does not exist in the inspected French 101 flow**; build from approved blueprint, not label an existing check as a midterm.
- [ ] Assessment blueprint for each unit, midterm and final with unseen performance tasks, strand weights, answer/rubric review, retry policy and audit trail.
- [ ] Official results and educator observations clearly separated from unverified learner/self-reports.

### D. Student experience and visual design
- [x] French-themed illustrated welcome splash, start action, shared Academy header, French 101 landing and 12-level entrance.
- [x] Baroque palette (hunter green, sapphire, burgundy, parchment, antique gold), charcoal inset trim, stable color design, centered 870px card rhythm.
- [x] Gold-lettered header, rightmost hamburger, shared translation controls and compact lower-right learner/Beta toolbar.
- [x] Expandable lesson cards, wide text areas, instructional text left and audio/action buttons aligned right, 7px radii.
- [x] French narrator selection, page voice volume, Test voice/Stop and status; selection stored on the device.
- [~] Browser speech relies on installed French voice; onstart/onend do not prove audible playback on Mac/Chrome.
- [~] Translation widget, dynamically injected contribution panel and footer alignment rely partly on external/shared scripts; verify live.
- [x] Official page footer attribution: Verve N Veda · Khaemenes Academy · Jennifer Kay Pearl · 2026, Home and Back to Top.
- [ ] Keyboard, screen-reader, narrow-viewport, tablet and actual print-view certification.

### E. Records, safeguarding and tools
- [x] Learner-selected local progress, learner-scoped writing, record export and import with validation.
- [x] Progress/lesson state preserved for existing learner cohorts; teacher/parent review rubric and print evidence.
- [x] Service-worker registration and offline-first intent; no mandatory external account for core learning.
- [~] Test import/export, browser reload, learner switching, localStorage failure, restricted storage, offline reload, duplicate ID/event behavior.
- [ ] Demonstrate independent evidence integrity and durable private records; don't confuse self-entered names with authenticated identity.

### F. Learning video program
- [x] Video promotion policy and rights-safe candidate catalog in `assets/learning-video/`.
- [x] Four candidate videos and two additional audio/exercise references; candidates are not approved.
- [ ] For each candidate: exact URL/media type, accuracy, ratings/reviews (video-specific if published), accessibility, age fit, rights, ad-free claim, transcript, browser playback, educator sign-off and recheck date.
- [ ] Only approved link/appropriately licensed embed in lesson; preserve complete in-house lesson when offline.

## 2. Current Lesson 01 assessment forensic snapshot
| Component | Observed behavior | Audit judgement |
|---|---|---|
| Day 01 fixed warm-up | 5 MCQ, feedback, no official score | KEEP as retrieval primer; clearly label practice |
| Day 01 balanced review | 30 authored questions, draws 10: 2 from each of order, accent, meaning, usage, transfer | KEEP; questions mostly recognition MCQ, no written spelling scoring |
| Day 01 independent assignments | Alphabet/name writing, two-person dialogue, correction log in distinct local keys | KEEP; educator rubric needed for performance validity |
| French audio | speechSynthesis selects installed fr voice; device selector and status, written fallback | VERIFY audible output; speech event != hearing |
| Unit 01 checkpoint | 15 MCQ drawn from 15-item transfer pool, 12 correct passes, stored checkpoint | HIGH PRIORITY: wider unseen bank, coverage and answer-key review |
| Official Level 1 quiz | 10 typed responses selected from Level 1 vocabulary, pass >=8; fallback swaps listening to visible text if no voice | HIGH PRIORITY: diversify modes and check all alternate correct answers |
| Unlock | Level 1 completion plus Unit 01 checkpoint for new learners; legacy completions protected | HIGH PRIORITY: pass-order, reload, repeat, failure and legacy matrices |
| End-of-course final | 10 typed English translations sampled from all 12 levels, 8/10 pass | NOT enough by itself to establish four-skill French proficiency |
| Midterm | No confirmed midterm function in current source | NOT IMPLEMENTED |

**Important assessment bug/clarification risk:** when audio is unavailable, the quiz changes an intended listening prompt to a visible text task. That is suitable as an accessible knowledge check only, not evidence of listening proficiency. Preserve existing result history; clearly mark any future assessment mode in records.

**Prompt-bank quality check:** 30 Day 01 items actually distribute as 5 order, 8 accent, 5 meaning, 5 usage and 7 transfer; each ten-item round samples two per strand. Some questions directly repeat taught examples. Add truly unfamiliar decoding, new spelling input and meaningful response prompts *before* claiming independent proficiency.

## 3. Reusable ten-part daily lesson checklist
Duplicate this checklist for every day; mark implemented, educator-reviewed and browser-tested separately.

- [ ] 01. **Lesson identity + landing:** grade/course/unit/day, objectives, prior-knowledge retrieval, prerequisites, daily navigation, accessibility and learner resume.
- [ ] 02. **Substantial original instruction:** accurate language explanation, examples, contrasts, accessible vocabulary, culture, no tiny placeholder lectures.
- [ ] 03. **French voices + listening:** eligible voice choice, hear/replay, slower model and transcript, true audio-unavailable behavior, independent listening separately recorded.
- [ ] 04. **Guided application:** alphabet, phonetics, vocabulary, grammar lab, corrections and scaffolded tasks, skill-aligned practice games.
- [ ] 05. **Original reading/dialogue:** comprehensible input, unfamiliar passage, literal/inferential/context questions, provenance/permissions.
- [ ] 06. **Independent performance:** original writing, spelling, speaking task, saved draft, detailed analytic rubric and human review.
- [ ] 07. **Formative quiz:** 20–30+ nontrivial authored bank; short randomized 8–10 item sessions; deliberate strand blueprint; immediate explanation, retries do not unlock.
- [ ] 08. **Correction + reflection:** explain error, show corrected work, self-review and instructor/parent review clearly distinguished.
- [ ] 09. **Printable evidence:** complete worksheet with student response space, answer key/rubric separated, saved text in actual print preview.
- [ ] 10. **Student journey:** header, translator, instructor/mentor entry, accessible accordions, aligned buttons, bottom-right toolbar, certificate/progress records, next/previous, no external dependency.

### Day 01 reference completion state
- [x] Lesson structure, examples, original passage, writing + corrections, 30-item balanced review, worksheet and rubric in code.
- [~] Exact ten-step sequential presentation is not yet fully normalized: old warm-up and extra material coexist. Retain both, rationalize order only after UI regression tests.
- [ ] Validate answer-key linguistic correctness by educator; written/spoken independent grading; live voice; saved-record isolation; print; 255px mobile; keyboard; actual quiz-state testing.

## 4. Unit landing-page checklist
- [ ] Unit identity, purpose, target skills, grammar/vocabulary map, cultural connection and estimated flexible pacing.
- [ ] All daily lessons visible with understandable status, saved-resume link, prerequisites and previous/next.
- [ ] Intro diagnostic **not counted as mastery**, optional audio test and full-text alternative.
- [ ] Academic evidence expectations + educator/parent review route.
- [ ] Visible unit checkpoint eligibility and official gate explanation; no admin detour.
- [ ] Course-wide Academy header, stable palette, translator, student toolbar, same card widths and footer.
- [ ] Local-first/offline and export/import status tested; independent resources never block core work.
- [ ] Unit video studio displays only APPROVED links and fallback instruction.

## 5. Unit quiz/checkpoint checklist
- [ ] Declared construct: knowledge, application, listening, writing and/or speaking; specify what is *not* measured.
- [ ] Content blueprint maps items to each daily objective with balanced difficulty and unknown transfer examples.
- [ ] Larger vetted item bank with correct/alternative answers, accent normalization policies, ambiguity and bias checks.
- [ ] Shuffle equivalents without leaking correct answer or repeating nearly identical prompts.
- [ ] Official >=80% pass; failed attempt allows meaningful correction and retake; earned >=80% answers/grade preserved.
- [ ] Responses, mode, duration if relevant, total, score, timestamp and version recorded by learner without collecting unnecessary personal data.
- [ ] A no-audio fallback changes **measurement scope**, never silently awards listening.
- [ ] Parent/educator review for independently produced language; not automatically certified by MCQ.
- [ ] Pass/fail/reload/offline/legacy-progress state tests and printable accessible results.

## 6. Midterm blueprint — NOT YET BUILT
- [ ] Place at the pedagogically appropriate unit boundary and clearly label scope (proposed after first major instructional block; verify final map before deciding).
- [ ] Cover multiple prior units via balanced unseen vocabulary, reading, grammar use, transfer, independent writing, and separately reviewed listening/speaking.
- [ ] Larger security-conscious item pool and parallel retake forms; student-visible study guide but no leaked active key.
- [ ] >=80% knowledge mastery; independent skill rubric and explicit educator-review status.
- [ ] Closed-book/open-book policy established and communicated before the attempt (do not guess current status).
- [ ] Save/export private result; never revoke a previously earned course achievement due to new requirements without an approved migration policy.
- [ ] Print/accessibility, offline, voice-unavailable and learner-switch tests.

## 7. Final examination blueprint
- [x] Existing 10-item 8/10 translation exam and certificate in source; preserve as legacy baseline.
- [ ] Expand to comprehensive multi-unit blueprint instead of 10 translations alone.
- [ ] Receptive language (reading and authentic listening), production (original writing and observed speaking), grammar/usage and novel situational communication.
- [ ] Separate objectively scored knowledge and teacher-reviewed production, with overall award policy documented.
- [ ] Approved exam security, meaningful retake, remediation and reasonable accessibility accommodations.
- [ ] Versioned historic records, printable final report/certificate; completed learners grandfathered.
- [ ] Live exam journey tested on desktop/mobile/offline and no-audio conditions.

## 8. Required test matrix before promoting a lesson
- [ ] Fresh learner: first visit > lesson > assignment > practice > official quiz fail (<80%) > retry > pass.
- [ ] Official quiz pass first, unit checkpoint second; checkpoint first, quiz second.
- [ ] Both failed, one passed, both passed; no unintended auto-unlock.
- [ ] Legacy Level 1 completion prior to new checkpoint; no retroactive lockout.
- [ ] Different named learner on same device; export/import and storage errors.
- [ ] Voice available, voice absent, voice start-but-silent, accented speech, resume and volume.
- [ ] Browser translate widget, shared toolbar, contribution card, footer, 255px and tablet widths.
- [ ] Print assignment with current textarea values, complete text and separate review guidance.
- [ ] Instructor evaluates actual writing/speech; verify no manufactured oral certification.

## 9. Work order and change-control rules
1. **Freeze design baseline** for current French page; only fix witnessed defects.
2. **Lesson 01 assessment hardening**: independently answer and validate all 30 bank questions, old five-item primer, checkpoint and Level 1 typed answers. Add spelling/application scoring without breaking old attempts.
3. **Unit 01 gate tests** and learner-record compatibility. Fix any actual regression with surgical commits.
4. **Lesson 02**: use entire ten-step checklist, approved vetted bank, saved evidence, print and audio checks; then sequentially Days 03–15.
5. **Unit landing** and unit checkpoint, with blueprint and test coverage.
6. **Midterm design** with approved scope and independent performance rubrics.
7. **Final modernization** preserving existing certificates and completed student progress.
8. **Educator + live-browser certification**: only after evidence passes; never say A+++ certified based on source inspection alone.

For every change: source pre-audit > one scoped patch > fetch and verify saved source > user-facing browser test > educator review > mark release state. Work on `main` only, preserve original app and progress. No unapproved video embedding or third-party media redistribution.
