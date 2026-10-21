# Arabic I — Learner Journey and Reward-System Forensic Audit
October 21, 2026 · Khaemenes Academy · Source audit of GitHub main

## Decision
**Upgrade and integrate the existing Arabic I course and Arabic learning applications. Do not replace them with a new comprehensive course.** The existing 32-week instructional spine is valuable; its missing layer is a trustworthy learner journey: persisted quiz/practical evidence, progression gates, useful feedback, achievements, and consolidated homeschool reports.

## Scope
Inspected course navigator, Week 01, Week 08, Week 09, Week 16, Week 17, Week 32 and the Arabic Learning Worlds directory. Inspected Arabic Lighted Path, Memory, and Numbers app files for storage/print/interface signals. This is **not** a live-browser certification or an exhaustive quiz-by-quiz audit of all 32 weeks. The entire Arabic I path has 32 week entry pages, but publication alone does not prove completion or creditworthiness.

## Student-path findings
| Stage | Observed evidence | Risk | Recommendation |
|---|---|---|---|
| Enter course | `Halls/courses/arabic-1/index.html` links weeks directly, with no localStorage state or gate evaluation | Learners can freely jump ahead with no mastery record | Preserve lesson access for review but add a clearly separate, evidence-based progression status |
| Study lesson | Week 01/08/09/17 include reading, vocab, practice and teacher skill work | Instruction exists; meaningful four-skill tasks lack a universal evidence capture workflow | Add reusable skill lab and evidence bridge, not duplicate lessons |
| Complete quiz | Sampled weeks use 10 MC questions and score locally; 8/10 described as readiness | Correct feedback disappears when reloading; repeated quizzes do not constitute durable mastery | Record attempts, score, version, date, learner; allow guided retries and explanations |
| Unlock | Week 01/09/17 quizzes explicitly say practical teacher checks remain; course links have no gate | 80% on recognition alone could falsely certify mastery | Require quiz >=80% **and** review of writing/speaking/listening/reading evidence before 'mastered'; keep remediation and teacher overrides auditable |
| Midterm | Week 16 is an 80-point teacher rubric and printable worksheet, not a completed auto-exam | No closed-book runtime, student submission or saved evaluated results | Build a controlled teacher-reviewed midterm workflow separate from formative quizzes; do not publish secure answer keys |
| Final | Week 32 explicitly says *Final Blueprint* with unseen prompts created by teacher | Blueprint is not a delivered exam or graduation-ready certificate | Keep blueprint; add private exam delivery/evidence/review workflow before claiming full certification |
| Print portfolio | Weekly print rules often hide quiz sections; Week 16 and 32 have printable rubrics | Student name/date, week/lesson, score and skill artifacts do not automatically combine | Academy-standard per-lesson print: header, learner, date, subject, grade, unit, week, attempt, teacher verification |
| Save/resume | Sampled formal weeks and navigator have **no localStorage references** | Learner loses quiz results and cannot resume demonstrable mastery | Shared, learner-specific JSON schema; safe export/import, identity check and preview; keep existing game localStorage separate |
| Games | Lighted Path and Numbers use some storage; Memory uses none; inspected games have no print interface | Game wins do not transfer to academic progress | Add opt-in ungraded practice reports through same companion; don't turn games into grade engines |

## Rewarding but challenging design
- **Three achievements per week:** Knowledge (>=80% quiz), Application (original contextual task), Communication (reading/listening/speaking/writing evidence reviewed). Earn 'Week Mastered' only when all criteria met; a mere lucky 8/10 earns a quiz badge, not course mastery.
- **Visible goals, optional stretch challenges, meaningful retry coaching** and a week-by-week mastery map. Reward persistence, accuracy and language transfer; do not assign points for repeated clicking without learning.
- **Student choice:** independent reading, practical vocabulary games and cultural context activities; specialist religious study remains optional.
- **Reasonable accommodations:** alternative formats, accessible audio transcripts, teacher-reviewed equivalents; keep rigorous skill standards.
- **Teacher-controlled reassessment and evidence review:** separate practice records from summative scores, no public secure exam keys.
- **Multi-learner device safety:** identity-isolated records and protected backup/restore, reusing patterns certified in French/German/Russian.

## Recommended implementation order
1. **Foundation pilot Weeks 01–02:** standard student identity, save/reload ten-question quiz attempts, input validation, 80% readiness status with recorded teacher-skill review. Do not block access to lessons during pilot.
2. **Shared evidence and print companion:** Academy layout with learner/date/course/grade/unit/week/lesson, source provenance and explicit formal-vs-practice labeling. No third-party dependency.
3. **Mastery map and gates:** measure prerequisite states from durable records; support parent/teacher verification and documented overrides; keep old bookmark URLs available.
4. **Apply across all 32 weeks** with a structural test of each quiz and browser journey samples each unit. Check difficulty progression and answer-key distributions, including actual reading, oral comprehension and writing tasks.
5. **Midterm/final implementation:** separate controlled assessment and rubric-reviewed evidence, plus certificates only after all requirements are met.
6. **Connect existing Arabic learning games:** age-appropriate practice suggestions, accessibility/audio/offline checks and non-graded evidence export. Avoid rebuilding apps unless a particular game has irreparable defects.

## Acceptance criteria before declaring curriculum production-ready
- Learner A and B never share records; backup import rejects identity mismatch.
- A student can complete, reload, resume, retry, print and export a Week 01 quiz with accurate provenance.
- A score below 80% gives study guidance; >=80% changes only 'knowledge ready' until skills are reviewed.
- Completing optional games never silently sets formal mastery or exam grades.
- Weeks 16 and 32 explicitly distinguish blueprint, delivered exam, instructor review and earned credit.
- One narrow 255px mobile pass and keyboard-only pass, plus real-device audio/offline and printed-page inspection.
- Cross-week state and Academy certificate are tested end-to-end rather than inferred from static HTML.

## Current certification status
**Instructional foundation present; integrated learner-journey certification NOT YET MET.** Source inspection is sufficient to establish missing persisted/formal integration in the sampled core pages. No claim made that every lesson or every Arabic app is defective.
