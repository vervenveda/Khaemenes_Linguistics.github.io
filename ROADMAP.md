# Polyglot Roadmap
## Khaemenes Academy · Linguistics & World Language Campus

This roadmap reflects the **current repository**, not the original August 2026 prototype plan. It preserves existing courses and learner records while moving the campus toward one coherent academic architecture.

## Permanent principles

Every phase must preserve:

- free access;
- learner privacy;
- accessibility;
- cultural and dialect respect;
- explicit academic authority;
- browser-local continuity;
- no silent deletion or rewriting of learner records;
- clear separation between practice evidence, mastery and external credentials;
- useful offline behavior; and
- source / reviewer transparency.

## Phase A — Canonical topology
**Status: COMPLETE · 2026-10-29**

- [x] Create `data/course-topology.json`.
- [x] Declare campus gateway, formal authorities, learner experiences, supplements and archives separately.
- [x] Declare one canonical translator.
- [x] Preserve V3 and Original Hall generations as archives rather than new-course authorities.
- [x] Reconcile public app count to the live 29-entry registry.
- [x] Repair PWA shortcuts to current homepage anchors.
- [x] Expand mentor discovery to the principal course topology.
- [x] Cache the canonical topology registry and principal entrances.
- [x] Add `scripts/audit-topology.mjs`.
- [x] Add a GitHub Actions topology regression gate.

## Phase B — Single-authority evidence bridges
**Status: REVIEW-ONLY BRIDGE V1 COMPLETE · acceptance/migration intentionally deferred**

French and German have rich learner experiences plus independent browser-local records. They must not be flattened or replaced.

- [x] Specify a versioned evidence bridge contract.
- [x] Expose French 101 evidence to the V4 French authority as a learner-scoped, review-only bridge without deleting French storage.
- [x] Expose German Coach/studio evidence to the V4 German authority as learner-scoped supplemental evidence without deleting German storage.
- [x] Keep practice evidence distinct from formal mastery; Bridge v1 has zero V4 mastery writes.
- [x] Add two-learner regression tests proving learner isolation and zero V4 mutation.
- [x] Add bridge JSON export before any future migration or acceptance workflow.
- [x] Static bridge audit proves Bridge v1 cannot write the V4 authority key or completion field.
- [x] Require the Academy 80% threshold when interpreting bridge exam evidence, even if a legacy app stored a lower local pass flag.

### Learner-scoped V4 authority

Named V4 records use `arshif.languageHall.v4.learner:` with an active-learner pointer and local learner registry. The historical `arshif.languageHall.v4` key remains a preserved shared record until explicitly copied or explicitly cleared.

### Bridge v2 release gates


Do not implement automatic acceptance into V4 until:

- [x] V4 formal records are safely learner-scoped with explicit legacy-shared preservation.
- [ ] Teacher/reviewer acceptance is distinguishable from learner self-entry.
- [ ] Evidence-to-competency mappings are explicit and auditable.
- [ ] Existing completion can never be downgraded.
- [ ] Export/recovery precedes migration.
- [ ] Runtime browser testing confirms two-learner behavior.

## Phase C — Spanish / Mandarin / Japanese parity

- [ ] Define the formal relationship between each Language World and its V4 course ladder.
- [ ] Add learner-scoped evidence/portfolio support where appropriate.
- [ ] Confirm 80% gates where a gate is academically intended.
- [ ] Add printable evidence and recovery.
- [ ] Verify foundation checkpoints in a real browser.
- [ ] Avoid making foundation practice a second formal transcript.

## Phase D — Arabic I / Russian I academic release hardening

- [ ] Complete full 64-week-page route and browser regression.
- [ ] Improve variable-depth weeks to integrated four-skill instruction.
- [ ] Add reviewed listening models or instructor-delivered source procedures.
- [ ] Keep productive speaking/writing assessment separate from recognition quizzes.
- [ ] Maintain secure unseen summative prompts outside the public repository.
- [ ] Obtain language-specialist review for Arabic register/inflection and Russian stress/case/idiomaticity.
- [ ] Confirm mobile, RTL, print and two-learner behavior.

## Phase E — Translator consolidation

- [x] Declare `apps/translator.html` canonical.
- [ ] Inventory feature differences in all compatibility translators.
- [ ] Move unique safe features into the canonical translator where needed.
- [ ] Convert compatibility pages to clearly labeled legacy/entry roles.
- [ ] Test saved-data and deep-link compatibility before any redirect behavior.
- [ ] Keep consent-gated external translation boundaries explicit.

## Phase F — Offline course packs

- [x] Cache campus shell and canonical entrances.
- [ ] Define per-course offline manifests.
- [ ] Add explicit learner-controlled download/remove controls.
- [ ] Estimate storage before download.
- [ ] Handle quota failure and storage eviction.
- [ ] Verify cold-start offline behavior separately from previously visited runtime cache.

The default service worker should not pre-cache hundreds of large lessons.

## Phase G — Mentor / NAIB course awareness

- [x] Expose principal current routes in `mentor-manifest.json`.
- [ ] Teach NAIB the difference between formal authority and supplemental practice.
- [ ] Add course-code and authority metadata to mentor resources.
- [ ] Map portfolio/evidence destinations by course.
- [ ] Prevent a supplemental game or reader from being treated as course completion.
- [ ] Integrate Academy-wide Readiness / Refresh / Retention / Course Mastery records only through an explicit versioned contract.

## Phase H — Repository normalization

Do **not** rename old public paths merely for neatness.

- [ ] Add aliases/canonical metadata before any path normalization.
- [ ] Inventory `*_index.html` legacy paths.
- [ ] Normalize new files to predictable lower-case directory `index.html` patterns.
- [ ] Keep old URLs alive while external links and saved learner paths may depend on them.
- [ ] Generate manifests instead of manually maintaining counts.

## Phase I — Documentation and release evidence

- [x] Replace the original prototype README with current architecture documentation.
- [x] Replace the prototype roadmap with this live roadmap.
- [ ] Generate a current Hall package manifest rather than treating the August snapshot as current.
- [ ] Add deployed-browser screenshots / visual checks to release evidence.
- [ ] Record accessibility, language review and offline verification separately from source syntax checks.

## Quality gate for every new public course surface

Before a new course or app is promoted, verify:

1. canonical route;
2. authority classification;
3. storage/evidence namespace;
4. navigation in and out;
5. 80% mastery semantics if applicable;
6. retry/correction behavior if applicable;
7. privacy and shared-device behavior;
8. accessibility;
9. offline impact;
10. mentor/NAIB discoverability;
11. print/export/recovery where academic evidence is collected;
12. topology audit remains green.
