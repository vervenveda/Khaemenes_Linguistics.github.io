# Khaemenes Academy · French 101 Daily Lesson Standard

Status: **instructional design standard / audit baseline**, not educator or browser certification.
Purpose: One consistent, rigorous, all-ages, free and accessible daily lesson format. Preserve the existing original 12-level progression and learner data; no automatic retroactive grade changes.

## One unit, one day at a time
Unit 01 has 15 daily lessons; Days 02–15 currently have brief lecture text and three native daily question items. Improve each without deleting its topic or previously saved work. Before Unit 02 expansion, test Unit 01.

## Required lesson anatomy (in order)
1. **Identity and readiness** — Unit/week/day, unique lesson ID, prerequisite, estimated workload expressed as flexible guidance (not a time gate), student-friendly objective and measurable mastery targets.
2. **Discover** — Clear original instruction with accurate French phonetics, vocabulary, pronunciation warnings, 3+ worked examples with rationale, prior-day retrieval, authentic cultural relevance and accessible reading.
3. **Hear and speak** — System voice optional for practice; independently reviewed listening/speaking tasks clearly distinguished. Written fallback must never count as listening proficiency. Provide replay, transcript/reveal and speech-unavailable feedback.
4. **Guided laboratory** — Scaffolded demonstration, 3+ increasingly demanding activities, immediate feedback and corrected examples, with a handwriting or sound practice tool only when aligned.
5. **Read and interpret** — Fresh French passage or dialogue appropriate to the day, context questions, authentic meaning questions and explanation prompts; steadily increase passage complexity.
6. **Independent composition** — Original written and/or spoken performance task with clear criteria. Save drafts under existing learner namespace, do not overwrite passes or prior evidence.
7. **Daily formative review** — Authored lesson-specific bank aiming for 20–30 varied questions, selecting 8–10 balanced items where feasible. Include listening where real sound is available, accurate written spelling, usage, sentence building, interpretation and error analysis. Randomize equivalent tasks, not merely answer order. Corrections and retries must not award formal mastery.
8. **Review and reflection** — A short error log, self-assessment, one independent transfer task, and educator/parent rubric with 0–3 scale plus evidence notes. Do not represent self-entered observations as authenticated educator review.
9. **Printable evidence** — Student-facing explanation + exercise sheet with room to answer, accessible text and print-specific styles; separate answer guide and review rubric; print current writing text and expanded sections, not the certificate.
10. **Navigation and profile** — Academy header, centered readable lesson card, symmetric right-aligned action controls, accessible collapsible sections, previous/next controls and a lower-right learner toolbar. A returning learner can retrieve saved work without admin detours.

## Daily academic deliverables
- A complete French-language explanation plus accurate examples; no one-paragraph placeholder lecture.
- Original vocabulary with spelling, accents, usage and appropriate grammatical notes.
- One supported activity, one unfamiliar independent application and one cumulative retrieval exercise.
- Reading, writing, listening and speaking opportunities distinguished by which skills were actually assessed.
- Saved independent task and corrections. On-device privacy and graceful storage failure.
- A printable worksheet and separately identifiable educator guidance.
- An accessible independent review with documented correct answers and explanations.
- No third-party runtime requirement for core learning; optional Academy tools clearly labeled and do not write mastery scores.

## Unit-level contract
- Map prerequisites, lesson objectives and daily evidence to one coherent cumulative blueprint.
- Unit knowledge checkpoint >=80%; original level 80% gate preserved, avoid false or conflicting unlock states.
- Cumulative assessment includes unfamiliar tasks; separately verify oral proficiency and independent writing.
- Previously earned passes and historical five-question records remain grandfathered.
- Daily practice, game points and self-assessment never trigger official unlocks.

## UI and reliability checklist
- Verify header and lower-right toolbar are present and do not overlap essential controls at desktop, tablet and 255px mobile.
- Confirm only one hamburger/menu and stable jewel-tone palette (hunter green, sapphire, burgundy, parchment, antique gold).
- Ensure accordion headings have useful labels, keyboard operation and print expansion.
- Right-align buttons in balanced rows and maintain readable contrast.
- Save, reload, switch learner, reopen work, retry after failure, reach passing states, preserve previous passes and export/restore intentionally.
- Check speech on a device with and without a French voice; never falsely certify listening.
- Inspect actual browser print preview, not just @media print source.
- Validate JavaScript syntax, DOM IDs, internal references, accessibility and no console errors.
- Obtain educator review and real-browser certification before claiming A+++ release.

## Unit 01 source audit: October 28, 2026
Inspected `apps/French_101_index.html` main branch.
- 15 daily lessons, 14 data-driven Lessons 02–15.
- Each Days 02–15 lecture is ~166–239 characters, not a complete academic exposition.
- Each has 3 unique authored native review questions; additional review draws rotating items from one fixed 15-question cumulative pool.
- 15-question unit checkpoint uses 12/15 passing threshold, but is text-based and cannot independently certify oral proficiency.
- Printable worksheets and rubrics are present; multiple print rules require browser verification.
- The original Level 1 quiz and later Unit 01 checkpoint use separate keys and dual gate logic; perform fresh-pass, retry, reload and legacy-pass matrix testing.
- Recent shared-header/layout changes verified in source only; mobile/tablet visual QA outstanding.

## Recommended development sequence
1. Bring Unit 01 Day 01 to this standard and verify it end-to-end.
2. Upgrade Day 02, QA, then Days 03–15 individually without renumbering or breaking saved learner work.
3. Verify Unit 01 cumulative blueprint and exact unlock compatibility.
4. Perform an educator review and student journey certification before applying this structure to Unit 02.
