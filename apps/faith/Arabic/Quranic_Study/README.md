# Noor Pathway â€” Faith Studies Elective

## Classification

- **Area:** Faith Studies
- **Course:** Qurâ€™an Foundations
- **Format:** Six-week, self-paced elective
- **Audience:** Beginners
- **Assessment:** Six weekly mastery checks plus a final assessment
- **Mastery threshold:** 80%

This is a devotional Faith Studies course, not an Arabic-language course. It introduces Qurâ€™anic structure, themes, reflection practices, stories of prophets, worship, character, community, and sustainable study habits. Arabic religious terms appear in transliteration, but Arabic reading, writing, grammar, and vocabulary are outside this courseâ€™s instructional scope.

## Required companion materials

The app contains the course plan and assessments, but it does not embed the assigned Qurâ€™an passages, translations, tafsÄ«r, or recitation audio. Learners should use a trusted edition or a teacher-approved resource. The interface is locally operable without a network, but the complete learning experience depends on those companion materials.

## Deep-inspection repairs

- Reclassified all public metadata, headings, certificate language, and footer text as a Faith Studies elective.
- Raised weekly and final mastery from 70% to 80%.
- Reconstructed mastery from stored scores instead of trusting legacy `passed` flags.
- Required mastery of Weeks 1â€“6 before the final assessment unlocks.
- Required final mastery before certificate access unlocks.
- Preserved the learnerâ€™s best score when a retake is lower.
- Prevented incomplete quizzes from being graded as completed attempts.
- Corrected the certificate so it certifies recorded mastery checks rather than unrecorded journaling.
- Used the final mastery date as the certificate issue date.
- Required a learner name before printing.
- Added progress export and confirmed local reset.
- Added keyboard operation for week navigation, the final assessment, and course tabs.
- Added tab semantics, status announcements, focus indicators, reduced-motion behavior, and a skip link.
- Remembered the last open week without allowing a saved route to bypass the final lock.
- Removed the undeclared beta-script dependency and added a restrictive local-page content policy.
- Clarified that assigned readings and audio are not included in the offline shell.
- Refined statements about 2:255, 12:111, ad-Duá¸¥Ä, and ash-Shará¸¥ so lesson interpretation is not presented as verbatim verse content or a shared revelation history.

## Progress authority

Legacy records from `noor_quran_pathway_v1` are read once and normalized. A score below 80% is not treated as mastery even if an older stored flag says it passed. New records are saved under `noorFaithStudies.v2`.

The final assessment remains unavailable until every weekly score is at least 80%. The certificate remains unavailable until the final score is also at least 80%.

## Privacy

Scores, dates, the last open week, and the certificate name stay in the browserâ€™s local storage. Nothing is transmitted. Export creates a local JSON record. Reset requires confirmation and removes both current and legacy course records from the device.
