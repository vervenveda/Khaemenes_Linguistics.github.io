# STOS Academy Storage — Read-only Pre-Audit, 2026-10-23

## Evidence boundaries
Prior observed local STOS gateway: localhost 127.0.0.1:9844; read-only /v1/status and /v1/directory available, but 401 from protected workspace-status and 405 from Mini AGI archive do **not** demonstrate Academy evidence access, permissions, or a revocation API. An earlier archival publisher is not an Academy learner evidence service. The backend is on the user's iMac; this GitHub audit has no live access to that localhost instance.

No verified Academy Storage evidence endpoint, issuer identity, session verifier, learner-bound authorization decision, review permission, revocation API, or audit receipt was established by accessible repository source in this pass. Treat STOS promotion as HOLD and any teacher review as disabled.

## Executed fictional harness
Run `node Halls/tests/two-learner-auth-regression.mjs`. Nine synthetic checks cover anonymous denial, owner permission, sibling denial, read/review separation, review scoping, immediate revocation of prior authorization, and record-key stability. This is a **fixture model**, not an integration test against STOS or a browser student profile. Passing it cannot certify any live service.

## Security contract to obtain before enabling integration
1. Authoritative session validation (cryptographically verified issuer/audience/expiry, not a client-provided learner ID).
2. Authenticated owner/guardian/teacher relationship mapping with least-privilege `evidence:read`, `evidence:write`, and `evidence:review` scopes.
3. Exact learner, family, course and record binding for **every** read, write, restore, import and review mutation, with deny-by-default behavior.
4. Revocation enforced by service on each request; old sessions/capabilities cannot bypass it.
5. Atomic changes with audit receipts, recovery controls, export/import privacy boundaries, and logout/profile-switch invalidation.
6. Live two-fictional-learner integration regression using isolated test namespace and test identities only, including replay, forged IDs, expired grants, revoked grants and restoration conflicts.

## Preserve
Existing offline journals, browser-local learner drafts, academic pages and STOS runtime records were **not modified** by this audit. Do not connect the bridge or migrate storage without the verified backend security contract and end-to-end authorization tests.
