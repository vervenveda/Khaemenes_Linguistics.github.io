# French 101 · Lesson 08 · Family and Relationships

Date: October 28, 2026 (America/New_York). Baseline: `367b2d8d4e5927ca521fa8643a3ef87d5c7cabc0`.

## Pre-audit

The existing day-8 object was a short “Nasal vowels: introduction” lesson: bon/pain/un/maman examples, an audio-comparison assignment and three written recognition items. It did not teach the proposed Lesson 08 family topic. Its complete source object remains unchanged. Earlier nasal-vowel teaching, audio examples, original assignment/transfer fields and general review ratings are available in a closed optional archive, with a separate print route. No historical phonology evidence is converted into family-language achievement.

## Development

The new studio follows the Lessons 01–07 standard inside official Course Level 1. It does not replace official Level 8 or change the official 15-day navigation.

- Explicit retrieval and staged learning: relationship nouns, possessives, introductions and connected être/avoir descriptions, interpretation, independent production and correction.
- Article–noun reference cards and French system-speech buttons for parents, siblings, children, cousins, uncles/aunts, grandparents, family and a supported friend example. Instruction covers accents, sœur, fils, contextual fille, and parents versus broader relatives.
- Worked explanations of point of view and de + name, stated relationships versus unsupported family-tree inference, mon/ma/mes, son/sa/ses, noun agreement versus owner gender, ambiguous ownership and the vowel-initial feminine mon amie exception. Ton/ta/tes and group/polite possessives have supplied examples; core assessment stays staged.
- C’est/ce sont and être/avoir descriptions connect to Lesson 07. Standard written plural introductions are distinguished from familiar spoken c’est usage without declaring all informal usage impossible.
- Original fictional-family reading, three saved evidence responses, audio, vocabulary support and closed educator guidance. Questions require textual support and identify unknown ages, family sides, household arrangements and allocations of objects.
- Eight-context relationship/possessive workshop with incorrect/correct feedback and retry. A guided four-turn exchange becomes original conversation from a new point of view.
- Eight-sentence original portfolio, explicit relationship key, two viewpoint-transfer sentences, two unfamiliar reviewer-supplied entries, three explanations, correction journal and next goal. Fictional casts satisfy every requirement; personal family disclosure is never necessary.
- Thirty reviewed multiple-choice questions: six each on relationships, possessives, sentences, reading and transfer. A shuffled round draws two from each domain. Answer choices shuffle; each response locks after one selection. Up to 20 completed rounds retain item IDs, responses, result, date and formative/non-certification flags. Recognition scores are separate from independent writing/oral performance.
- Four criterion-specific 0–3/Not assessed rubrics, reviewer-role/task/support notes, separate observed oral evidence, learner worksheet/current-draft print, educator guidance/full key print and current-learner JSON evidence export.

## Data and preservation

New prefix: `<learnerKey>_beginner2026_lesson08_family_`.
Suffixes: `reading_0_v1` through `reading_2_v1`, `guided_v1`, `oral_v1`, `composition_v1`, `corrections_v1`, `educator_v1`, `rubric_0_v1` through `rubric_3_v1`, `rounds_v1`.

Earlier `_u01_day8_writing`, `_u01_day8_transfer_v1`, `_u01_d8_rubric_*` and `_u01_d8_review_notes` continue to use their original keys. No old scores, dates or writing are deleted, renamed or reinterpreted.

The picker labels day 8 Family and Relationships and enters its dedicated studio through the existing direct route `#lesson-08`. Previous/next navigation preserves the library and saved drafts across 07↔08↔09. The Lesson 07 next-step paragraph now points to the completed Lesson 08; its teaching, assessment and evidence functions are otherwise unchanged. Lesson 09 still contains earlier sound/spelling content; colors and shapes are a planned future studio, not a claimed completed feature.

Static comparisons preserve Lessons 01–06 and Lesson 07 apart from that single next-step paragraph, the entire original daily array, and the availability/quiz/checkpoint/exam/certificate functions. No new external runtime dependency is introduced.

## Validation

`node scripts/test-french-lesson08-browser.cjs` (Playwright Chromium required; optionally set `PLAYWRIGHT_CHROMIUM_EXECUTABLE`).

Focused tests verify all eight workshop contexts with wrong/correct choices; all 30 authored keys; domain-balanced rounds; locks/retry; saved writing/rubric/round reloads; unchanged official progress; earlier assignment/transfer/rubric retrieval; separate learner/educator/archive prints; desktop/tablet/phone/255px layouts; mocked French speech and unavailable-voice feedback; menu-based two-learner isolation; 07↔08↔09 navigation; current-learner evidence export; storage-failure warnings; and no page exceptions. Actual learner/educator PDFs and phone/desktop screenshots were generated; phone layout and both first print pages were visually inspected.

The existing Lesson 07 browser suite and Lessons 01–06 cohesion suite also passed after integration. Inline JavaScript parses, and preservation assertions pass. Tests block external assets and mock speech requests: they do not certify audible quality or real-device oral proficiency. JSON evidence export reads saved records; print captures current live drafts.

## Assessment and repository boundaries

Official 80% gates, previous passes, checkpoint requirements and course grades remain unchanged. Practice, synthetic playback and self-entered educator ratings do not create official mastery or certified oral achievement. Independently observed listening and speaking are recorded separately; unobserved evidence is Not assessed.

The broad integrity workflow has four baseline issues outside this lesson: French stage-7 themes mismatch, both translation directions, missing accepted translations and root-index parsing. Focused lesson tests do not imply all-repository success. Deployment and accessibility workflows are checked separately after publication.
