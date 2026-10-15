# Arabic I & Russian I — 64-Page Regression Audit
Audit date: 2026-10-15 · Repository: vervenveda/Khaemenes_Linguistics.github.io · Branch: main

## Source-inspection results
- **64/64 expected weekly HTML lesson or assessment files found**: Arabic I Weeks 01–32 and Russian I Weeks 01–32.
- **60 formative quiz pages found**, ten questions per page, for **600 multiple-choice questions**. Weeks 16 and 32 in each course are instructor frameworks, not quiz pages.
- All quiz question counts and structurally valid answer indices confirmed from embedded question banks. Weeks 01–02 have a different JavaScript layout than Weeks 03–31; this is legitimate and parsed separately.
- **Russian I Week 19 defect fixed:** initial bank contained ten questions but only six unique prompts; its replacement has ten unique prompts including a cost-expression interpretation and noun form question. Commit: f55638de988f16663fd80aa1652ff61a1d75a7a9.
- All other Weeks 03–31 showed ten distinct prompts during this source review. Distinct wording is not the same as psychometric quality or proof of correct language usage.
- Both Week 32 pages include a four-unit portfolio checkpoint and the final's four skill headings. Midterm/final remain instructor blueprints; secure unseen passages, audio, scoring exemplars and formal approvals are absent.
- **Navigation regression confirmed:** lesson-navigation controls are present at Weeks 01, 08, 09, 16, 17, 24, 25 and 32 of each course. The remaining **24 weeks per course**, **48 weekly pages total**, do not yet provide the same course-index and previous/next controls.
- The inspected pages contain print controls and foundation or instructional deep-dive sections for Weeks 01–15 and 17–31. Assessment frameworks are intentionally distinct.

## Academic quality and technical blockers
1. **High: lesson-to-lesson navigation**. Standardize previous / all weeks / next anchors on the 48 remaining pages, verify relative paths, and test with keyboard and a screen reader.
2. **High: assessment validity**. The 600 questions are overwhelmingly recognition items; generic study-strategy prompts remain. Add contextual reading, grammar and production evidence, instructor rubrics and moderation. Do not equate an 80% formative quiz with course credit.
3. **High: trustworthy listening and speaking**. Verified recordings and human/rubric assessments are not consistently bundled. Mark tasks pending when no verified audio is available.
4. **High: secure cumulative exams**. Weeks 16 and 32 contain public blueprints; do not publish examiner-only prompts or keys. A teacher must author and review the unseen assessments before use.
5. **High: student records**. Quiz pages are not demonstrated to save, restore, isolate, export, or sync student scores and course pins across profiles and devices. No cross-device persistence can be inferred from this code review.
6. **Medium: offline dependencies**. Some early weeks reference `/assets/vnv-beta-link.js` with an absolute root path. Verify deployment availability and graceful operation in offline/file mode; no assumption of a CDN is warranted.
7. **Medium: curriculum validation**. Qualified Arabic/Russian review remains necessary for pronunciation, idiomatic phrasing, orthography, cases, agreement and sociolinguistic context.
8. **Medium: browser and accessibility execution**. This audit inspected repository source but did not execute 64 pages in a real browser, simulate screen readers, or validate printing and save/reload workflows.

## Pass criteria before full release
- 64/64 live lesson routes resolve from the deployed host and full previous/next navigation works.
- All quiz banks pass content as well as structural review; keyboard scoring and retry are tested.
- Teacher-reviewed listening and speaking models exist, with alternative participation options.
- Private, moderated summative examiner materials are prepared outside the public repository.
- Multiple learners can pin courses without state collision, with tested recovery/export/import and no private information exposure.
- Offline/local-first behavior and print layouts are validated across supported student devices.

## Classification
**Source regression passed with outstanding issues; NOT production/academic sign-off.** Fixes in this audit are limited to Russian I Week 19 quiz repetition; remaining items are logged explicitly instead of claiming they were repaired or browser-tested.
