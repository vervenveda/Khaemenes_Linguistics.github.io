# Polyglot Changelog

This file records meaningful public changes to Polyglot. Dates use the `YYYY-MM-DD` format.

## Unreleased

### Changed — 2026-10-29 · Topology stabilization

- Added `data/course-topology.json` as the canonical machine-readable route and academic-authority registry.
- Added `docs/TOPOLOGY_ARCHITECTURE.md`.
- Added `scripts/audit-topology.mjs` and a topology-integrity GitHub Actions workflow.
- Classified learner experiences, formal authorities, supplements and archives separately.
- Declared `apps/translator.html` the canonical sovereign translator while preserving compatibility surfaces.
- Reconciled the homepage application inventory from 30 to the live 29-entry registry.
- Repaired PWA shortcuts to live homepage anchors.
- Expanded mentor discovery to principal language routes and formal course authorities.
- Expanded the offline application shell to include the topology registry and canonical course entrances without pre-caching every lesson.
- Reclassified the August Hall package manifest as a historical snapshot instead of current release evidence.
- Updated project README and roadmap to describe the live repository rather than the original prototype state.

### Changed — 2026-10-29 · Authority Bridge v1

- Added a versioned learner-scoped French/German evidence bridge.
- Bridge records live in a separate `khaemenes.courseAuthorityBridge.v1:` namespace.
- Added review-only evidence preparation and JSON export to the French and German mastery dashboards.
- Added a read-only bridge panel to the formal V4 Hall for matching named learners.
- Bridge v1 never writes `arshif.languageHall.v4`, never changes unlocks, and never awards formal mastery or completion.
- Anonymous/shared-device records are intentionally ineligible for bridge promotion.
- German bridge scoring evaluates recorded exam evidence against the Academy 80% threshold even when an older Coach pass flag used a lower threshold.
- Added bridge documentation, static safety audit and dedicated GitHub Actions integrity workflow.
- Added a two-learner regression test covering French and German learner isolation, anonymous-record blocking, 80% interpretation and zero V4 mutation.
- Corrected French bridge compatibility with the established portfolio-review note key.

### Changed — 2026-10-29 · Learner-scoped V4 authority

- Added `assets/v4-learner-scope.js` as the formal Hall record-scope layer.
- Named learner records now use `arshif.languageHall.v4.learner:<learner-id>`.
- Added active learner and learner registry keys.
- Preserved the historical `arshif.languageHall.v4` key as a legacy shared record rather than silently migrating it.
- Added explicit learner create/open/switch controls to the V4 Vault.
- Added explicit legacy-shared open and non-destructive copy-to-learner controls.
- Changing a learner name no longer relabels the current transcript.
- Current-record clearing no longer deletes another learner or the preserved V3 key.
- Added learner-scope regression and static integration audits.

### Next

- Make the formal V4 record itself safely learner-scoped before any Bridge v2 evidence acceptance.
- Establish Language World evidence parity for Spanish, Mandarin and Japanese.
- Continue Arabic/Russian academic release hardening and live-browser QA.
- Generate a current package manifest from the live repository.

## 1.1.0 — 2026-08-02

### Added

- Custom `404.html` with verified recovery links.
- Offline fallback page.
- Web-app manifest.
- Same-origin service worker and registration script.
- Privacy notice.
- Accessibility statement.
- Security policy.
- Contribution guide.
- Community code of conduct.
- Project roadmap.
- Third-party notices.
- Repository `.gitignore` and `.nojekyll` files.

### Security

- Limited runtime caching to same-origin `GET` requests.
- Added cache-version cleanup.
- Added private vulnerability-reporting guidance.

## 1.0.0 — 2026-08-02

### Added

- Initial Polyglot landing page.
- International scholarly visual system using parchment, navy, gold, oxblood, and teal.
- Multilingual welcome ribbon.
- Responsive Academy navigation.
- Language Compass and rotating phrase feature.
- Optional browser speech playback.
- Nine organized language collections.
- Searchable language cards.
- Local **My Shelf** preferences.
- Learner pathways and skill-studio map.
- Culture, literature, identity, and language-history sections.
- Student, parent, educator, and Academy portal area.
- Accessible planned-module dialog in place of dead links.
- Light and dark themes.
- Reduced-motion handling.
- Right-to-left language samples.
- Initial `README.md` and `LICENSE.md`.
