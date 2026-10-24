# Academy identity authority — forensic checkpoint (2026-10-23)
## Source inspected
`vervenveda/Khaemenes_Academy.github.io/assets/khaemenes-family-registry.js`, current `main` retrieved using GitHub connector. The family registry stores `khaemenes_family_registry_v1` and `khaemenes_active_learner_v1` in localStorage.
- `activeIds()` reads active family, adult and learner IDs from browser storage.
- `setActive()` sets these IDs in browser storage.
- `grantAdultAccess()` persists a `learnerId:adultId` entry with permissions and status `active`.
- `revokeAdultAccess()` marks the access record as `revoked`.
- `canAdult()` checks current local record status and permission.
These are useful UX and local continuity APIs, **not an authenticated service authorization boundary**. No cryptographically authenticated session or server-enforced revocation was demonstrated by this inspection.

## Required local inspector report (not received)
The actual macOS/STOS local-inspector output is unavailable to this GitHub-only audit. Do not treat the source-level assertions below as its substitute. Obtain sanitized output showing service identity, permission authority, session claims/validation (not secrets), revocation checks and request-level deny decisions. Do not transmit credentials, cookies, tokens, or children's personal data.

## Controlled regression plan (fictional records only)
1. Establish test adult, Learner A and Learner B via a real authenticated test service; check that adult A can view only the explicitly authorized learner.
2. Verify a learner switch invalidates previous learner's selection and doesn't reveal cached portfolio content.
3. Attempt cross-learner reads, writes, status edits, and imports using mismatched learner identifiers; each must return a server-side denial.
4. Revoke a previously allowed view/review permission; repeat requests with old and fresh clients and verify they are rejected.
5. Restore from a fictional backup bearing the wrong learner identifier; refuse without merging or overwriting data.
6. Confirm audit logs report denial reasons without private text. Browser-local `canAdult` alone is insufficient.

## Release status
**FAIL-CLOSED / NOT AUTHENTICATED-TEST CERTIFIED.** No private bridge activated, no real learner records accessed or modified, no authenticated test service called, no real inspector report reviewed. Keep existing offline journals working.
