# Arabic I — Bilingual, Mobile, and Saudi Green Regression Pass
Date: 2026-10-23. Branch: main.

## Confirmed changes
- Read-only pre-audit of representative weeks 01, 03, 06, 07, 16, 20, 21, 32 showed existing viewport metadata, navigation, quiz/print controls, and very limited Saudi Green usage.
- Added `arabic-saudi-green-v1` responsive theme to all 32 Week 01–32 lesson and assessment pages, without changing main site homepage layout or curriculum quiz logic.
- Theme introduces accent #006C35, deep #004E28, soft #E5F2E9, focus indicators, minimum mobile button size, wrapped previous/next week links, RTL Arabic quote text handling, and print hiding of course navigation.
- Added `Halls/tools/audit-arabic-i-pages.mjs` for local source-level link, anchor, control, navigation, style and quiz checks.
- Changes have been confirmed by GitHub update acknowledgments, but the complete script was not executed in a cloned repo during this pass.

## Outstanding validation
1. Execute `node Halls/tools/audit-arabic-i-pages.mjs` from repo root; investigate every flagged link and control.
2. Browser testing at narrow mobile widths, tablet and desktop, English-Arabic mixed-script focus and screen reader behavior; include iOS Safari and Android Chromium if available.
3. Qualified Saudi Arabic language review of every week: MSA vs Saudi dialect labels, grammar and agreement, diacritics, naturalness/register, culture and safeguarding against overclaiming dialect accuracy.
4. Obtain approved recordings with source metadata and instructor-approved comprehension checkpoints; spoken evidence must not be marked complete from text alone.
5. Check reading connections across weeks: growing passage length, earlier vocabulary reuse, comprehension variety and portfolio evidence.
6. Verify student profile privacy and educator permission authority before enabling evidence persistence or review.
7. Validate link targets on the deployed host, especially absolute-root assets versus repository-project routes, without changing operational engines blindly.

## Status
Source styling integration completed. No independent Saudi Arabic linguistic sign-off or live-browser pass claimed. No learner records touched.
