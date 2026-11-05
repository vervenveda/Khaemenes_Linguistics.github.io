# French 101 · Unit 01 Forensic Curriculum Audit and Additive Hardening

**Review date:** 2026-11-04  
**Repository:** \`vervenveda/Khaemenes_Linguistics.github.io\`  
**Learner-facing page:** \`apps/French_101_index.html\`  
**Scope:** Lesson 02 and five supplemental Unit 01 lessons; review of question/answer logic, comprehension, printables, evidence, accessibility and authority.  
**Release policy:** Review branch / pull request only; no changes to formal V4 records or existing learner data.

## Source topology and authority

- The canonical French 101 curriculum spine contains **18 lessons in three units of six**.
- Unit 01: Lessons 01–06. Unit 02: Lessons 07–12. Unit 03: Lessons 13–18.
- The **preserved legacy 12-level** quiz, saved progress, final and certificate remain intact for compatibility; they are not substitutes for the eventual 18-lesson final.
- \`data/course-topology.json\` identifies the French 101 page as the **learner experience**, while the Five-Language Academy V4 is the formal **record authority**. The current bridge is *review-only*. This extension must not award V4 mastery.
- Historic vowel/spelling Lesson 02 material remains labeled as optional archival work. It is not the canonical number lesson.

## Confirmed learning defect

Before this change, the canonical map called Lesson 02 **Numbers 0–100**, but the primary lesson's vocabulary buttons, narrative models and original 30-item bank taught overwhelmingly **0–20**. This misaligned the stated objective, teaching and practice. There was no comprehensive interactive number reference for all 101 integers. A few higher numbers appeared in the cumulative assessment, without equivalent systematic teaching in Lesson 02.

## Additions and repairs on this branch

1. Preserve the original 0–20 lesson, old practice evidence and the existing learner-scoped storage keys.
2. Add a verified traditional France-French \`numberWord(n)\` for every integer 0–100, with listening rehearsal and interval browser. Explicitly teach 21/31/41/51/61, 70/71/72–79, 80/81, 90–99 and cent. Recognize regional septante/nonante/huitante as variants rather than learner errors in general French, while teaching the France standard for the current form.
3. Add **30 higher-number prompts** (5 each for recognition, writing, sequence, quantities, reasoning and transfer) to the preserved 30-question Lesson 02 bank. A ten-question formative round now contains **six 21–100 questions and four foundational questions**, preserving the six-skill balance.
4. Add **five visible supplemental Unit 01 lessons A–E**: 21–69 patterns, 70–100 patterns, contextual quantities/ages/prices, reading evidence/inference, and cumulative independent transfer. Each includes original instruction, French passage, comprehension reasoning, saved writing and corrections, 10 answer-keyed practice questions, educator guidance, audio rehearsal and separate learner/reviewer print.
5. Preserve the canonical **20-question / 16-correct (80%)** Unit 01 knowledge checkpoint while extending its bank from 36 to **42 authored questions**, including six specific 71–100 prompts. Balanced selection guarantees two advanced number prompts and one foundational number prompt in each 20-question attempt.
6. Correct a bank hygiene issue: all 36 original canonical questions had their correct answer at index zero in source. Their *choices were rotated and answer indices updated together*, retaining each original correct answer and explanation. They remain shuffled for a first assessment.
7. Change **below-80% Unit 01 retries** to reuse the same 20 questions and option order. Previous successful records remain untouched.
8. Add \`scripts/test-french101-unit01.mjs\` as a read-only regression contract.

## Static and simulated tests conducted

| Check | Result |
|---|---|
| New extension JavaScript parsed | PASS |
| Existing 11 inline scripts parsed | PASS |
| Number generator produced all 101 number words (0–100), unique | PASS |
| Critical spellings 21, 61, 70, 71, 79, 80, 81, 90, 95, 99, 100 | PASS |
| Higher-number formative questions | 30; 5 per strand; valid unique choices |
| Five supplemental lesson data sets | 5 × 10 valid answer-keyed items |
| Simulated DOM render of five lessons and number explorer | PASS |
| Simulated 10/10 supplemental quiz and learner-specific record write | PASS |
| Preserved main progress key and legacy route declarations | PASS |
| Companion extension writes to formal / legacy mastery keys | NONE |
| Original 36 canonical correct-answer meanings after answer rotation | ALL PRESERVED |
| New bank and 20-item assessment threshold | 42 total; 16/20 |
| Full live-browser rendering, speaker/pace behavior and printing | NOT YET VERIFIED |
| Formal V4 account/evidence synchronization across devices | NOT YET VERIFIED |

## Distinguish completed protections from remaining risks

**Confirmed in code:** Lesson 01 is unchanged; original core Lessons 01–08 remain in sequence; stored evidence keys remain; the new activities are learner-scoped browser storage, not formal academic authority. The extension has no network or cloud-writing capability and cannot silently regrade an existing formal learner.

**Pending live proof:** Test Start Journey, Lesson 02 panel, number audio and pace controls, read/retry flows, printing of single learner and educator worksheets (header/page isolation, pagination, mobile), and two learner accounts on the same device. Repeat in a mobile browser and with audio unavailable.

**Known architectural boundary:** The canonical course map still allows access to later instructional lessons without requiring the earlier unit assessment. That is a progression-policy issue, not a reason to overwrite learner data or the V4 authority. Final 18-lesson certification remains separate from the legacy 12-level compatibility certificate; it is not completed by this patch.

**Recommended gate before release:** Confirm the developer review and exercise the unit assessment at 15/20 (must not pass), 16/20 (passes), retry of exactly the same failed set, and preservation of a previously passed Unit 01 result. Check print isolation, educator-only answer separation, two-learner isolation, Android/tablet UI and the reader/translator links.

## Integrity statement

No live learner records were read, edited or reset. No formal V4 mastery or certificate was issued. All changes are additive or scoped to the canonical Unit 01 question-bank logic and preserved route. The full application must be browser-tested before merging to \`main\`.


## Nov. 5 follow-up: Lesson 01 is now five manageable alphabet sessions

The original Lesson 01 covered all letters, accents, writing, oral rehearsal, a multi-strand assessment, matching practice and comprehensive teacher review on one long page. The preserved lesson's original DOM children and event listeners are now placed in a collapsed **Full original Lesson 01 reference and saved historical work** section. Student records and keys remain the same.

The added entry is titled **Unit One · The French Alphabet**, with five independently navigable instructional sessions:

1. **Alphabet A / 1 — A–G:** first seven letters, upper/lowercase, names vs word sounds, and reading for stated versus unknown facts.
2. **Alphabet B / 2 — H–N:** name spelling, letter-name H versus word pronunciation, contextual reading and correction.
3. **Alphabet C / 3 — O–U:** spelling versus pronunciation (tu/tout), positions, reading and evidence limits.
4. **Alphabet D / 4 — V–Z & A–Z:** last five letters, full 26-letter retrieval, missing/misordered letters.
5. **Alphabet E / 5 — Accents and spelling dialogue:** é/è/ê/ë/ç, accurate names, spelling requests, and original communication.

Each session has three short instructional steps, original French reading plus English support, a speech-rehearsal button and individual letter-name buttons, reading comprehension, independent writing and correction fields, ten answer-keyed MC questions, stable same-question retry, learner-scoped local evidence, independent learner worksheet and educator print, plus a forward/back lesson control. **8/10 is only formative practice readiness; it does not replace the official 80% unit gate.**

The main French 101 course map now links directly to all five alphabet sessions, inside the current Lesson 01 academic route. This is a **safe transitional learner-facing unit structure**; the canonical 18-lesson/three-unit numbering, previous 12-level progression and V4 authority have not been renumbered. A formal Unit 01 repartition would require a separate, deliberately migrated authority and transcript policy.

Read-only checks performed on this branch: source and 12 inline scripts parse; five sessions cover all A–Z exactly once plus accents; 5 × 10 uniquely answer-keyed questions validate; mock DOM mounting, legacy node preservation, course-map navigation, 10/10 scoring, learner-scoped writing save and formal-key isolation pass. **Live** audio, print preview, student tablet and cross-account testing remain release blockers.
