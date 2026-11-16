# Khaemenes Academy · French III–IV Unit 01 · Distractor + Listening/Speaking Expansion
**Checkpoint:** November 16, 2026  
**Status:** Committed to main; draft learning activities only, official exams withheld.

## Completed
**14 original assessment-bank distractor repairs**, seven in French III and seven in French IV, including school-policy inference, source reliability, conditional proposal language, migration evidence, reported-past translation and archival representation. All original question IDs, correct-answer texts and choice indices remain intact. Explanations now distinguish precisely why the keyed answer is best, rather than using absurd or unrelated alternatives.

**12 new teacher/partner-led French oral dialogues**, six per course:
- French III: school-library access, after-school transport, tutoring finance, research comparisons, non-equivalent surveys, school-council forum.
- French IV: migration-register identity, photograph attribution, historical counterfactual, translation of necessity, archive versus film and poetry, ethical migration exhibit.

Every activity includes an original 73–83-word French dialogue, two comprehension prompts, an open oral-response task and four teacher/partner review criteria. It is available in the same Lesson 01 canonical instructional companion and requires no learner account, third-party package or storage.

## Playback and integrity controls
- A **Play French voice preview** button uses the browser's speech-synthesis capability only if a voice is explicitly marked **`localService === true`** and offers a French language tag. If not available, playback is **withheld**; a teacher, partner or transcript remains available.
- A **Stop voice** control cancels playback; switching the selected French course also cancels playback.
- This is a synthetic pronunciation/listening aid, **not an authentic recorded conversation** and not an officially graded listening test.
- The transcript stays in a separate, user-expandable disclosure to support listen-first practice; print also includes it.
- Nothing captures microphones, writes learner scores, records voice or promotes an exam.

## Verification completed
- Re-fetched the 7 affected draft question-bank files, checked all 14 adjusted items against the unchanged correct answer in the 324-item crosswalk, all 3 answer choices unique, plausible-option length and explanation detail.
- Re-fetched the 12 dialogue records and embedded companion version; source and embedded data agree.
- Confirmed six activities per grade, twelve comprehension prompts per grade, four review criteria per activity and the local-only voice guard/fallback.
- New regression tests committed and wired to both GitHub Actions path scopes and CI steps:
  - `scripts/test-french-high-school-unit01-distractor-quality.mjs`
  - `scripts/test-french-high-school-unit01-guided-listening-speaking.mjs`
- `officialUnit01Eligible=false` and all affected banks remain `authoring-review-not-published`. French I, II, college French and historical learner records were not touched.

## Release and quality limitations
- These were live GitHub commits and source-level checks; **successful GitHub Actions execution and actual browser/device playback have not been independently verified**.
- The Web Speech API's local-service indicator is used as the prerequisite; actual voice quality, pronunciation, regional variation and platform availability need hands-on testing.
- A qualified French educator must still verify the revised distractors, answer uniqueness, accuracy and level appropriateness, and review audio comprehension and original speaking separately.
- Student speaking and listening need human-evaluated evidence. The optional voice preview does not establish mastery.
- A further full-bank bilingual pass remains necessary: 14 difficult original assessment items were improved in this checkpoint, **not all 324**.
- No student assessment, credential, official grade or unlock should be activated until independent linguistic QA, learner-scoped attempt provenance and accessibility tests are complete.
