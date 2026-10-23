# Canonical learner evidence bridge — pre-audit and safety gates
Date: 2026-10-23
Status: READ-ONLY findings; bridge NOT enabled, no learner records modified.

## Inspected source
- `vervenveda/Khaemenes_Academy.github.io/assets/khaemenes-family-registry.js`
- `vervenveda/Khaemenes_Academy.github.io/assets/khaemenes-family-school-bridge.js`
- `vervenveda/Khaemenes_Academy.github.io/assets/khaemenes-family-backup-vault.js`
- `vervenveda/Khaemenes_Academy.github.io/family/index.html`
- `vervenveda/Khaemenes_High.github.io/index.html`

## Confirmed contracts
1. Canonical identity comes from `KhaemenesFamilyRegistry.activeIds().learnerId` and `getLearner(learnerId)`, not a freeform student name.
2. `setActive({learnerId})` stores the selected learner in browser-local state; it does not independently establish an authenticated user session or permission to read private evidence.
3. `canAdult(adultId,learnerId,permission)` consults `learnerAdultAccess` records and supports revocation. Educator permissions include `learner.view`, `progress.view`, `mentor.view`, `education.manage`; dedicated `evidence.view`, `evidence.review` and `evidence.restore` grants are not present in the inspected presets.
4. The school bridge states local family registry as learner identity authority; High School preferences are learner-scoped.
5. The backup vault and registry restoration exist, but updating a registry backup is separate from approving a learner-evidence restore.

## Threats to test
- A and B are in one family browser; switching A→B must not cause A's notes to appear, upload, or save as B.
- A's work is in a legacy unscoped journal; adoption must require explicit learner selection, ownership verification, preview, and a reversible copy, with no destructive migration.
- Revoked educator or viewer cannot continue to read cached private evidence or change rubric/review status.
- Forged learnerId, adultId or localStorage edits must not authorize exports, evidence previews, imports or teacher review.
- Backups and partial restores must not merge learner identity or silently change ownership; duplicate source/record IDs must be rejected or quarantined.
- Cross-origin hosting of Lingustics and Academy paths may alter access to storage and sessions depending on canonical deployed origin; verify this in actual browsers.

## Required implementation boundary
A client-side bridge can safely provide identity-associated *draft routing and UI visibility controls* in one browser, but must not claim secure access control against other users with access to that browser. Private evidence and instructor review require an authenticated storage service or an encrypted, per-learner vault with separately protected credentials and explicit, revocable grants. Changing an active profile is never authorization.

## Non-destructive next sequence
1. Build a dependency-free regression harness using wholly fictional Family A / Learner A / Learner B / Educator data; assert denial of cross-learner read, write, merge, adopt, restore and review.
2. Define a versioned evidence envelope: opaque canonical learnerId, course ID, week, creation timestamp, provenance, content hash, reviewer authorization context, no sensitive payload in URL or log.
3. Implement read-only bridge detection before enabling writes; if authenticated authorization cannot be established, disable teacher review and shared-record access, while leaving the original offline journal operating.
4. Introduce an explicit preview, copy-only draft adoption, verification and rollback flow, never overwrite existing records.
5. Validate revocation, page refresh, multi-tab switching, two browsers, offline reconnection, and live teacher permissions before connecting lesson links.

## Decision
**NO-GO for live profile/teacher integration** on localStorage-based identity alone. Curriculum and offline journal remain unchanged. This source audit is not a live penetration test.
