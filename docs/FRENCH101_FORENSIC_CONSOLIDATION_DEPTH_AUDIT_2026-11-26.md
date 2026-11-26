# French 101 · Forensic Consolidation & Lesson-Depth Audit

Date: 2026-11-26  
Scope: `apps/French_101_index.html` on current `main`  
Method: source-level forensic inspection of current curriculum, mastery gates, assessment engine, evidence records, translator/audio integration and page architecture. No learner records or assessment banks were modified by this audit.

## Executive finding

French 101 is not a skeletal course. It has a mature 18-lesson academic spine, three six-lesson units, 80% mastery gates, 20-question lesson mastery assessments, 50-question unit assessments, a 150-question cumulative midterm and a 200-question comprehensive final. Every canonical lesson has an authored question bank of at least 27 prompts, providing the required one-third reserve for 20-question Monte Carlo retries. Cumulative pools meet the same reserve rule.

The remaining work is primarily **consolidation, parity verification and live-device hardening**, not wholesale curriculum creation.

## Current academic authority

Canonical sequence:
- Unit 01: Lessons 01–06
- Unit 02: Lessons 07–12
- Cumulative midterm: Lessons 01–12
- Unit 03: Lessons 13–18
- Comprehensive final: Lessons 01–18

Mastery:
- lesson quiz: 20 questions, 16 required
- unit assessment: 50 questions, 40 required
- midterm: 150 questions, 120 required
- final: 200 questions, 160 required
- threshold: 80% throughout
- retakes: fresh balanced draws with prior-question avoidance when reserve permits
- resumable checkpoints: 10-question checkpointing for lesson quizzes; 25-question checkpointing for 50/150/200-question assessments
- closed-book behavior is explicitly applied to cumulative exams
- invalid or tampered saved assessment state fails closed

## Lesson-depth matrix

The ratings below describe source evidence present on current main. They are not grades for students.

| Lesson | Canonical focus | Depth finding | Status |
|---|---|---|---|
| 01 | Alphabet / spelling / accents | Deep, but historically layered. Includes staged alphabet instruction, independent writing/dialogue, performance evidence, printable work, family report, mastery and attempt evidence. | Developed; consolidation priority |
| 02 | Numbers 0–100 | Deepened beyond original material with full 0–100 instruction, independent writing/corrections, listening/speaking observations and assessment support. | Developed; consolidation priority |
| 03 | Vowels / subject pronouns / spelling | Authored instruction, transfer, writing, corrections, rubric evidence and full canonical bank. | Developed |
| 04 | Greetings / introductions | Full studio with reading, guided conversation revision, original dialogue, corrections, oral evidence, reviewer rubric and printable learner/reviewer views. | Strong |
| 05 | Small words / first sentences | Full studio with reading, sentence construction, independent composition, corrections, oral evidence, reviewer rubric and print/export. | Strong |
| 06 | Nouns / articles / gender | Full studio with reading, article workshop, independent noun-phrase portfolio, corrections, oral evidence, reviewer rubric and print/export. | Strong |
| 07 | Être / avoir | Full studio with reading, verb workshop, original portfolio, transfer, correction journal, reviewer evidence and print/export. Historical silent-letter material remains archival. | Strong; archive cleanup candidate |
| 08 | Family / relationships | Full studio with reading, point-of-view/relationship work, original portfolio, transfer, corrections, reviewer evidence and print/export. Historical nasal-vowel material remains archival. | Strong; archive cleanup candidate |
| 09 | Colors / shapes / descriptions | Full studio with reading, description/agreement work, composition, transfer, oral evidence, corrections, reviewer rubric and print/export. | Strong |
| 10 | Dates / time | Full studio with calendar/time instruction, reading, schedule production, transfer, oral evidence, reviewer rubric and print/export. | Strong |
| 11 | Food / café | Full studio with food/article instruction, menu reading, café interaction, transfer, oral evidence, corrections, reviewer rubric and print/export. | Strong |
| 12 | Home / school / objects | Full studio with object/location instruction, reading, original fictional-space description, transfer, oral evidence, corrections, reviewer rubric and print/export. | Strong |
| 13 | Questions / negation / conversation | Full studio and 30-question bank spanning question forms, question words, negation, reading and transfer. Independent production/oral/reviewer evidence is present. | Strong |
| 14 | Present-tense verbs / routines | Full studio and 30-question bank covering regular forms, routine language, sequencing, reading and transfer; production/oral/reviewer evidence present. | Strong |
| 15 | Places / directions / transportation | Full studio and 30-question bank covering landmarks, directions, transport, reading and route transfer; production/oral/reviewer evidence present. | Strong |
| 16 | Reading / listening comprehension | Strong metacognitive comprehension instruction: gist, source evidence, inference limits, supported vs independent listening, support disclosure and reviewer guidance. | Strong |
| 17 | Writing / speaking | Strong production instruction: purpose/audience, cohesion, accuracy, revision, repair strategies, spontaneous vs scripted speaking and evidence conditions. | Strong |
| 18 | Integration / corrections / final preparation | Strong cumulative integration across foundations, structure, practical communication, comprehension, production and evidence limits. | Strong |

## Consolidation findings

The current page is approximately 852 KB and contains:
- 45 separate style blocks
- 8 inline script blocks
- multiple generations of presentation overrides
- historical 12-level compatibility code alongside the canonical 18-lesson model
- archived earlier lesson material retained inside several modern lesson routes
- page-specific translator layout CSS plus a direct `../assets/vnv-language.js` include
- service-worker registration and shared VNV ticker/ecosystem scripts

This is survivable but not ideal. The next consolidation must preserve:
1. canonical 18-lesson mastery authority;
2. all existing passing records and accepted historical totals;
3. learner-scoped assessment drafts and attempt histories;
4. independent writing / corrections / performance evidence;
5. family-report exports;
6. archive material until an explicit migration verifies nothing is lost;
7. current translator and narrator behavior until replacement ownership is verified.

## Highest-priority technical bubbles

### C01 — CSS ownership map
Classify all 45 style blocks as canonical, lesson-local, compatibility, print, archive or superseded. Merge only byte-equivalent/safely dominated rules first. No visual deletion without before/after evidence.

### C02 — Translator ownership
Trace the direct `../assets/vnv-language.js` include against the current Linguistics translator loader/header authority. Remove duplicate ownership only after proving the course still receives the canonical dictionary/translator stack.

### C03 — Historical 12-level compatibility boundary
Move legacy compatibility behind a clearly named adapter boundary. Do not rewrite old learner records and do not reinterpret legacy passes as canonical 18-lesson passes.

### C04 — Lesson 01–03 parity
These lessons are academically developed but structurally older and more layered than Lessons 04–18. Normalize their learner-facing studio anatomy without deleting preserved evidence keys.

### C05 — Archive separation
Lessons 07–12 include earlier phonology/orthography work as archival enrichment. Move those sections behind an explicit archive owner so the current lesson focus is visually unambiguous.

### C06 — live browser/tablet certification
Required before declaring the course technically complete: Chrome/Safari/tablet, keyboard navigation, offline resume, narrator availability/fallback, translator placement, 15/20 vs 16/20 boundaries, 39/50 vs 40/50, 119/150 vs 120/150, 159/200 vs 160/200, account switching and export round-trip.

## Completion assessment

- Curriculum architecture: mature
- Assessment architecture: mature
- Lesson-depth parity: strong overall; Lessons 01–03 need structural normalization, not major content replacement
- Evidence/reporting: strong and intentionally distinguishes verified mastery from self-entered/reviewer evidence
- Runtime architecture: functional but over-consolidated into one large page
- Live-device certification: still required
- Recommended status: **academically developed / technically hardening**
