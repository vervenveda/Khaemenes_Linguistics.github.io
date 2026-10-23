# Evidence Identity Bridge — pre-audit and fictional privacy tests
Date: 2026-10-23. Source inspection, not live permission certification.

## Current identity findings
- Academy family page checks `R.canAdult(adultId, learnerId, "progress.view")` before exposing progress and sets active learner through registry.
- High School portal reads `khaemenes_family_registry_v1` and `khaemenes_active_learner_v1` for navigation. These values identify a learner but cannot authenticate a viewer.
- Linguistics repository already contains dormant `assets/khaemenes-evidence-identity-bridge.js` v0.1, which creates learner-specific stores with `khaemenes_evidence_bridge_v1:<learnerId>` and supports save/list/adopt/review.
- The existing bridge accepts a caller-supplied `authorize` callback. A malicious or broken caller can grant itself privileges; neither localStorage identity nor a client callback can prove server-authenticated teacher rights.
- There is no proof of cross-origin identity federation, server session checks, revocation, or verified consent available to the Linguistics page from this inspection.

## Changes made
Added `tests/two-learner-privacy-regression.cjs`, using only fictional learners and an in-memory storage stub. Test cases cover separate records, attempts at cross-learner reads/writes, denied overwrite, explicit adoption confirmation, denial of unauthorized teacher review and revocation checks. No real learner records were read, updated, imported or deleted. No bridge activation or connection to live student profiles was added.

## Execution
Run from repository checkout:
```sh
node tests/two-learner-privacy-regression.cjs
```
This is a source-added test, not independently executed in a browser during this pass. A passing fictional test demonstrates adapter logic under a correctly implemented authorization callback; it does not establish that the real family's authentication system supplies one.

## Release blocker
Before any student-facing portfolio integration, obtain a trusted, authenticated and revocable permission authority for the actual learner and reviewer. Reject all access if unavailable. Test two real sign-in contexts without exposing private data, and preserve the original offline journal until verified.
