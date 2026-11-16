# Khaemenes Academy · French I–II · Four-skill Unit 01 continuity repair

**Checkpoint:** 2026-11-16  
**Status:** Source material and live companion integration committed to main; official assessments remain unpublished.

## Scope

French I and French II Unit 01 are now provided with the same expandable student experience previously implemented for French III–IV. This expansion introduces separate age/level-appropriate reading, listening, speaking and original-writing evidence. It does **not** replace the Academy Hall's existing 36-week theme map or overwrite any established original lesson models, lesson bank, grade, student record or college French 101/102/201/202 course.

### New additions

| Course | New source readings | Source-linked MCQs | Partner-led dialogues | Evidence Bridges | Reading passage length |
| --- | ---: | ---: | ---: | ---: | --- |
| French I | 6 | 18 | 6 | 6 | 100–124 words |
| French II | 6 | 18 | 6 | 6 | 107–126 words |
| **Total** | **12** | **36** | **12** | **12** | — |

Each reading source is a **fictional original teaching text**. Each has three comprehension questions with explicitly reviewed answer indices and feedback. All oral scripts are short original French exchanges; they are practice, not evidence of a completed formal listening examination.

### French I · six-lesson progression

1. Greetings, names, classroom identity and polite clarification.
2. Alphabet, spelling, repeated listening and written accents.
3. Family members, short description and adjective agreement.
4. Simple present-tense classroom routines and requests for assistance.
5. Café ordering, quantities, prices and verifying ingredients.
6. Welcome Desk + Café integration: introductions, directions and polite ordering.

French I Evidence Bridges use short original dialogues, typically **4–12 written lines or short French sentences**, a modest oral role-play and four accessible self-review criteria. Students may invent family details rather than disclose private information.

### French II · six-lesson progression

1. Imparfait for setting, passé composé for an interrupting event.
2. Completed journeys with être/avoir and past-participle agreement.
3. Past habits versus individual events, with careful chronology.
4. Direct/indirect object pronouns and clearly attributed reference.
5. Compare independent accounts without assuming that disagreement proves dishonesty.
6. Reconstruct a missing travel notebook through timed evidence, reported recollections and a bounded conclusion.

French II's connected writing rises gradually from **80–100 words to 150–180 words**, paired with partner dialogues and revision. This is more demanding than French I but remains below the later French III and IV evidence-synthesis assignments.

## Unified student experience

All four grades now share the existing Lesson 01 canonical six-stage renderer, then optionally extend into three panels per lesson:

1. **Extended Reading Lab:** independent original text, three selectable answers and explanation-based checking; students can retry.
2. **Guided Listening & Speaking:** partner/teacher reads first; optional locally installed French synthetic voice preview, hidden-by-default transcript, comprehension and an oral task.
3. **Evidence Bridge:** retrieve facts, interpret them, compare spoken information, write original French, use four criteria, revise and transfer to next lesson.

Student-written evidence is not auto-saved. The existing **Export my practice notes (.txt)** option is available in the Evidence Bridge, with a user-initiated download only.

## Repository changes

- `data/french-hs1-unit01-extended-reading-lab.json`
- `data/french-hs2-unit01-extended-reading-lab.json`
- `data/french-hs1-unit01-guided-listening-speaking.json`
- `data/french-hs2-unit01-guided-listening-speaking.json`
- `data/french-hs1-unit01-integrated-evidence-bridges.json`
- `data/french-hs2-unit01-integrated-evidence-bridges.json`
- `Halls/french-high-school-unit01-instruction.html`
- `scripts/test-french-high-school-unit01-hs1-hs2-four-skills.mjs`
- Updated existing French III–IV bridge/oral tests to accept all four courses; original grade-specific assertions remain.
- Updated `.github/workflows/french-high-school-alignment.yml` to watch all six files and run the new test.

## Validation and remaining gates

After the final commits, repository source was re-read and cross-checked: **12 new reading passages, 36 practice questions, 12 spoken scripts and 12 matching evidence bridges** have correct lesson IDs, matching embedded data, checked keyed positions, unique alternatives, acceptable minimum source lengths, self-review structures and CI wiring. The original six-stage renderer remains one unified implementation.

No assessment bank status was promoted. No scores, exam submissions, unlocks, student names or personal data were transmitted or written.

**Unverified:** actual GitHub Actions execution; desktop/tablet browser interaction; French synthetic voice availability/quality; screen reader and printable layout; independent teacher review of all translations, keys, distractors and assignment fairness. These remain prerequisites for official assessment commissioning.

**Future recommendation:** carefully test the entire four-grade page on real tablet portrait/landscape and keyboard access; then connect only reviewed student-authored evidence to the Academy's authorized learner-scoped portfolio or export workflows, without introducing localStorage or automatic grades.
