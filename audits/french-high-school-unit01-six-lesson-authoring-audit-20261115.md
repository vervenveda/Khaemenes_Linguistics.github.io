# Khaemenes Academy · French I–IV · Unit 01 Forensic Authoring Audit
**Checkpoint:** 2026-11-15  
**Scope:** Four 36-week high-school French programs, first six *draft assessment banks* each.  
**Decision:** AUTHORING COMPLETE / RELEASE HOLD.

## Verified repository observations
1. Four distinct Lesson 06 JSON files have 27 questions each (108 new entries). All question IDs, answer indexes, choice uniqueness, explanation minimum lengths, domain balance and within-lesson scope were checked at source level.
2. Each grade has six authored banks of 27 questions: 162 questions per grade, **648 total**. Each grade's 162 prompts were checked for exact repeat text across lessons; no exact duplicates found.
3. A 20-question lesson draw calls for 27 items (7-question reserve) and an 80% threshold (16 correct). A 50-question unit exam calls for 67 items (17-item reserve) and 40 correct. Lesson-bank counts satisfy the nominal numeric reserve for drafting a unit bank, but **do not constitute a reviewed or properly balanced unit exam**.
4. Lesson 03, 04 and 05 regression files formerly checked `bank.lesson===2`. Their assertions now match 3, 4 and 5 respectively. Lesson 06 checks 6. All were committed to `main`.
5. New Lesson 06 bank and six-lesson integrity tests were added to the same CI workflow. Source references and expected markers were verified; GitHub Actions **execution was not verified**.
6. The HTML Hall, original lesson bodies, historical learner completions, teacher-entered percentages and V4 scope were **not modified** as part of this authoring checkpoint. New banks remain `authoring-review-not-published`; no student assessment is activated.

## Five high-priority instructional bubbles

### A. Actual instruction/evidence alignment — HOLD
The Hall provides a high-school theme map, but this checkpoint did not verify four complete lesson sequences, reading passages, audio with transcripts, oral practice or printable instructions corresponding to every question. Validate questions against actual material *before* learners are graded.

### B. Unit exam coverage — HOLD
The existing `drawAssessment` prioritizes unseen questions and randomness but **does not enforce quotas by lesson, domain, content area or difficulty**. A unit-wide random 50 may overrepresent one area. Design and test a formal blueprint allocating the 50 draws across six lessons and skills without turning lesson quizzes into a disguised unit exam.

### C. Linguistic and cultural depth — HOLD
Draft banks mix French content with English metalinguistic prompts, particularly in French III–IV; increase authentic target-language reading and production. Review source representations, accent variants, grammar, realistic distractors and fair alternative answers with qualified French-language educators. Draft originality and string-level uniqueness do not establish independent pedagogical quality.

### D. Performance authenticity — HOLD
Multiple-choice checks do not verify pronunciation, listening from real audio, unrehearsed speaking or a student's own sustained writing. The separate, unpublished `FRENCH_HIGH_SCHOOL_UNIT01_LESSON06_MISSION_BRIEFS.md` defines staged, human-reviewed performance tasks with transcripts, accessibility alternatives, corrections and a balanced rubric.

### E. Assessment authority and persistence — HOLD
The assessment contract produces `formative-engine-result-not-official` and does not write official learner-scoped grades. The Hall still has independent historical/portfolio completions. Before release implement proper draft submission, retake revisions, immutable attempt provenance, isolation, export, accessibility/browser checks and safe authorized transitions. No automatic credential or grade promotion until then.

## Next synchronized repair (before Unit 02)
1. Commission a **balanced six-lesson unit blueprint** (50-item unit with at least 67 vetted eligible items) and a CI regression that fails closed if any required lesson/domain is absent.
2. Conduct a bilingual content and instructional alignment pass; correct ambiguity and increase authentic reading, listening and conversation.
3. Attach the four original mission briefs to teachable lesson sequences with printable and keyboard-accessible workspaces, without touching legacy records.
4. Run verified CI, browser and offline assessments against all four grades together.
5. Publish only when all four programs meet the same release standard.

**Meaning of 'complete':** Unit 01 *question-bank authoring milestone* only, **not** completed lessons, live exams, verified mastery or accredited credit.
