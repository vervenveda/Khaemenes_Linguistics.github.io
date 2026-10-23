# Year I — Eight-Lesson Grammar, Audio and Evidence Privacy Review
Date: 2026-10-23 · Branch: main · Source inspection only

## Review boundary
Eight priority four-skill studios: Arabic I and Russian I weeks 06, 07, 20, 21. This is an editorial, line-specific review of each short studio reading, not an independent language-specialist certification of all embedded lessons or quizzes. Each item remains **pending independent review**.

| Lesson | Exact reviewed studio passage | Grammar/register observation and specialist check |
| --- | --- | --- |
| Arabic 06 | `أَنَا لَيْلَى. أَنَا مِنْ مِصْرَ. هَذَا صَدِيقِي سَامِي.` | Inspect diacritics and proper-name vocalization, `مِصْرَ` after `مِنْ` (diptote country name), and masculine `صَدِيقِي` in this example; clarify formal MSA vs colloquial introductions. |
| Arabic 07 | `أَنَا طَالِبٌ. هِيَ طَالِبَةٌ. نَحْنُ فِي الْمَدْرَسَةِ.` | Review case endings in fully vocalized MSA and gender-marked predicate nouns; teacher note should distinguish grammatical gender from person identity. |
| Arabic 20 | `أُحِبُّ الشَّايَ، وَلَكِنْ أُفَضِّلُ الْمَاءَ. صَدِيقَتِي تُحِبُّ الْعَصِيرَ.` | Check hamza/short vowel accuracy, definite accusative complements, and feminine verb agreement with `صَدِيقَتِي`; confirm suitable MSA register for beginners. |
| Arabic 21 | `بَيْتِي فِي شَارِعٍ هَادِئٍ. بِجَانِبِ الْبَيْتِ حَدِيقَةٌ صَغِيرَةٌ.` | Inspect genitive adjective agreement `شَارِعٍ هَادِئٍ`, nominal sentence/inversion, and adjective agreement `حَدِيقَةٌ صَغِيرَةٌ`. |
| Russian 06 | `Меня зовут Анна. Я из Москвы. Это мой друг Иван.` | Check `Меня зовут` construction, genitive of Moscow after `из`, and masculine possessive `мой`; add stress guidance only after audio validation. |
| Russian 07 | `Я студент. Она студентка. Мы учимся вместе.` | Explain nominative nominal predicates and omitted present-tense copula, `учимся` reflexive form, and the gendered student nouns. |
| Russian 20 | `Я хочу чай, пожалуйста. Но мне больше нравится вода.` | Verify colloquial request register and nuanced preference construction: `нравится` agrees with singular `вода`, `мне` is dative. Confirm natural café wording with a native reviewer. |
| Russian 21 | `Мой дом на тихой улице. Рядом с домом есть небольшой парк.` | Check prepositional after `на` for location, instrumental `домом` after `с`, and nominative `небольшой парк`. Stress and vowel reduction need native listening model. |

## Audio approval crosscheck
The v1 JSON manifest lists all eight as `pending-review` with no `audio_file`, `transcript_file`, rights, named reviewer or approved comprehension check. This is **expected**, not a missing-file error. No published recording is approved merely by adding a manifest entry. A human instructor can read aloud in supervised lessons, but that is not an online prerecorded audio asset.

Before updating any manifest entry to `approved`, require: valid playable file, exact transcript, explicit distribution rights, language reviewer, review date, four-skill lesson alignment, questions that cannot be solved solely by reading on screen, and actual listening regression test. Avoid public student voices and identifiers.

## Evidence privacy
The two-learner regression is a *simulation* with fictional learner IDs. It checks separate course and week keys and now also explicitly models denial of cross-learner reads and writes and denial of changes to an existing learner's record. Passing it cannot demonstrate that the real profile app enforces authorization: localStorage alone does not provide an access-control boundary.

Before publishing student evidence persistence, test: authenticated learner switch and shared devices, student 1/2 records staying separate, teacher-role review without exposing unrelated learner records, browser reload/offline restore, export/import conflict handling, and deletion/retention rules. Do not put private portfolios in a public GitHub repository.

## Decisions
- Preserve the eight instructional pages and ten-question quizzes. No automatic grammar correction made.
- No manifest record upgraded to approved.
- Privacy test script expanded; execute it in Node and then conduct actual browser tests with fictional test accounts.
- Formal independent grammar check, reviewed audio assets, and actual student-account privacy signoff remain pending.
