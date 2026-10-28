# French 101 · Lesson 01 Assessment Hardening — Audit & Test Cases
Date: 2026-10-28. This is a source inspection and controlled update, **not** live-browser or educator certification.

## Verified architecture
- Day 01 original five-question warm-up: multiple choice, formative, feedback and no official unlock.
- Day 01 balanced review: 30 authored items (5 order, 8 accent, 5 meaning, 5 usage, 7 transfer); selects 2 from each strand per 10-item session; immediate explanation; retries allowed.
- Official Level 1 quiz: 4 French-to-English typed items, 4 English-to-French typed items, 2 synthetic speech/listening-mode items when a French voice is available. Ten distinct lexical items; 8/10 required.
- When no French system voice is available, two listening-mode items become *visible French-to-English text prompts*. Official mastery still operates as before, but these are **not verified listening proficiency**.
- Unit 01 checkpoint: 15 shuffled multiple-choice prompts drawn from 15 items, 12/15 required; new Level 2 unlock requires both Level 1 completion and the checkpoint where applicable. Legacy completions must not be revoked.
- Final exam: ten typed French-to-English translations sampled across twelve levels, >=8 required; does not establish oral proficiency. Midterm not present.

## Fix committed in this pass
Official Level quiz attempt history now adds `assessmentMode`, `speechAvailableAtStart`, `listeningItems`, `textFallbackItems`, and `oralProficiencyCertified:false`. It retains the same history key, original properties, scoring, mastery threshold and earned progress. Existing historical records intentionally remain unchanged; these fields must not be fabricated for old attempts.

## Five remaining quality risks
1. **Construct alignment** — Lesson 01 starts with alphabet, letter names and accents; original Level 1 official bank is greetings and courtesy. The daily alphabet formative review should not be represented as a formally passed alphabet competence assessment.
2. **Authentic listening** — Browser speech availability is not proof that a student heard audio; status events and speech-dependent questions need runtime/device tests. A text fallback cannot confer listening credit.
3. **Written performance** — MCQs and typed vocabulary answers do not substitute for evaluated independent dialogue, unfamiliar spelling and explanation. Rubric and qualified reviewer need explicit evidence.
4. **Checkpoint integrity** — Fifteen fixed cumulative items with shuffled ordering is a small official bank; expand with vetted novel items only after checking answer keys, coverage and grandfathered progress.
5. **Progress compatibility** — Verify checkpoint-first/quiz-first/pass/fail/legacy progression and restore/reload/offline behavior without retroactively invalidating earned results.

## Required manual browser matrix
- [ ] Complete existing five-question warm-up, reset and confirm no progress change.
- [ ] Run ten-item balanced review twice: exactly 2 items in each of 5 strands; one click per question, correct explanation and disabled answers.
- [ ] Type accented/unaccented Level 1 answers and verify documented matching/accepted alternatives.
- [ ] Level 1 pass then checkpoint pass; checkpoint pass then Level 1 pass; verify one correct Level 2 entrance.
- [ ] Fail each official assessment; retry; preserve prior passes after reload.
- [ ] With French voice: inspect quiz listening display, audio audible and entry says listeningItems=2 in saved attempt (not independently certified).
- [ ] Without French voice: verify adapted written prompts; saved record says textFallbackItems=2, listeningItems=0, oralProficiencyCertified=false.
- [ ] Fresh, returning and legacy learners; separate identity records; import/export; no data loss.
- [ ] Voice selector, no-audio, Mac Chrome/Safari, actual print view, keyboard and 255px layout.
- [ ] Human evaluation of original dialogue, accent accuracy, independent comprehension and actual speech performance.

## Promotion decision
**Not certified** until tests and educator review complete. Next safe task: strengthen Lesson 01's independently scored, non-mastery writing rubric and add well-vetted unfamiliar spelling tasks. Do not change official gates or legacy assessment history without a versioned migration and verified approval.
