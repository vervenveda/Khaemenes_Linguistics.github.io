# Foundation Unit 01 — Behavioral and Curriculum Validity Gate
October 21, 2026 · Spanish / Mandarin Chinese / Japanese

## Technical certification (simulated)
PASS — GitHub Actions Linguistics Repository Integrity, including `scripts/test-unit01-checkpoint-behavior.mjs` on three checkpoints. Each simulated journey checked independent Alice/Bob storage, below-threshold then passing quiz attempts, persistence of original drafts and rubric fields across learner switching, printable output invocation, matched JSON backup restore, and rejection of an unmatched learner's backup. Shared checkpoint script is `assets/unit01-language-checkpoint.js`.

## Repairs made
1. Removed a form refresh immediately after field-change saving that risked discarding edits not yet saved elsewhere on the page.
2. Reordered question display deterministically (without changing source answer values) to remove the uniform first-choice cue; scoring still uses the original keyed values.
3. Readiness now requires nonempty student grammar, conversation, and listening evidence in addition to 8/10 knowledge, complete 16/20+ rubric, named reviewer and notes.
4. Added the three-language checkpoint behavior suite to CI, including backup identity rejection and return-to-learner verification.

## Curriculum-validity audit: conditional, not yet full certification
### Strengths
- Unit 01 moves from greetings to plans, places, times, reasons and invitations.
- Each checkpoint asks for ten knowledge answers; original grammar, an original conversation, and a listening response; teacher scores five dimensions (0–4 each) with a 16/20 readiness suggestion.
- Unseen listening is explicitly teacher supplied. Device speech and visible transcript are rehearsal, **not** a verified listening proficiency examination.
- Local evidence and rubric review are distinguished from formal language credit.

### Weaknesses to address before Lessons 05–08
- Many multiple-choice items ask direct translation/recognition or identify good study strategies. Reordering positions reduces answer leakage but **does not raise cognitive demand** on its own. Build interpretation and grammatical transfer items grounded in unseen, authentic short passages, including near-miss distractors.
- Three reviewed-language rubrics share broad domain descriptors; create language-specific analytic anchors for grammar, communicative appropriateness, and speech features (Spanish question formation and time phrases; Mandarin word order and tones; Japanese particles, politeness and kana).
- Student-produced grammar, conversation and listening fields are required to be nonempty, but the runtime cannot determine whether submissions are authentic, coherent or accurate. Meaningful assessment remains a **reviewer responsibility**.
- Teacher names are self-entered and are not independently authenticated; a local rubric record is not verified external certification.
- Current checkpoint includes only one scripted practice dialogue and device speech, which cannot establish a reliable scored listening examination. An assessor should prepare and safeguard an unseen oral task and assessment record.
- `window.print()` is exercised in simulation, not a physical print or PDF inspection.
- Follow-up work should check actual screen reader and 255px device experiences, offline behavior, and two learners across separate tabs.

## Required validity gate before scaled expansion
1. Upgrade each checkpoint with at least 3 independent listening comprehension prompts delivered by an instructor or licensed, human-reviewed recordings; retain scripts privately for formal use.
2. Define domain-specific performance criteria and require a reviewer record describing original responses, errors, accommodations and reassessment.
3. Add at least 4 higher-order grammar/interpretation questions per language, and avoid confusing general pedagogical knowledge with measured language performance.
4. Validate with at least two learners using different work quality (not only saved values), and teacher-score independently before declaring instructional readiness.
5. Keep printable academic evidence (learner, language, unit, date, reviewer, results, submitted work) distinct from games and formative quizzes.
6. Only then expand Lessons 05–08, reusing this tested single-source checkpoint mechanism rather than creating another score system.

## Status
Automated simulated behavioral gate: **PASS**.
Curriculum validity for a demanding proficiency checkpoint: **CONDITIONAL / IMPROVEMENTS REQUIRED**.
Real-device and independently reviewed performance certification: **NOT YET TESTED**.
