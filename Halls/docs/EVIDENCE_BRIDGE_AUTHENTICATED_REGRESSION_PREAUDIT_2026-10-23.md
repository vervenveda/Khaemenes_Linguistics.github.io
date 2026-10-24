# Evidence Bridge — Authenticated Regression Pre-Audit
Date: 2026-10-23 · main · READ-ONLY SERVICE STATUS
## Sources inspected
- Linguistics `assets/khaemenes-evidence-identity-bridge.js`: dormant v0.1; explicit `authorize` callback per operation; learner-keyed storage; no auto-init, actual login, or server access.
- Linguistics `tests/two-learner-privacy-regression.cjs`: fictional A/B storage isolation; unauthorized reads/writes; duplicate/adoption denial; teacher grant and simulated revocation.
- Academy `assets/khaemenes-family-registry.js` v1.3.2: browser-local family roles, permissions, and active learner state; not a verified server identity authority.
- Academy `assets/khaemenes-account-client.js` v1.0.0: HTTPS account client with a fail-closed disabled default and safe-session shaping; no evidenced usable evidence:review or evidence:restore service authorization/revocation endpoint.
- Academy `assets/khaemenes-family-school-bridge.js` v2.4.0: browser-local family/school routing and stored context; not proof of authenticated authorization.

## Execution evidence
The fictional Node harness exists in repository, but its successful execution has **not** been established in this audit. An attempted public git clone in the analysis environment failed because the network could not resolve github.com. GitHub connector source retrieval succeeded; connector cannot run local STOS service or provide authoritative local-inspector output. Do not treat source inspection as a test run.
No local STOS inspector report with timestamp, service configuration, redacted session/permission matrix, or authenticated revocation traces was supplied or accessible here.

## Required real-service gate (still BLOCKED)
1. Obtain actual local inspector report from STOS host, excluding secrets and private learner data; include service build, issuer/audience, session validity, canonical learner binding, grant/revoke endpoints, enforcement point, and audit trail.
2. Use two **fictional**, isolated enrolled learners and two fictional adults/teacher accounts.
3. Test positive and negative read, write, adoption and teacher-review permissions against authenticated service requests, not JavaScript mocks.
4. Switch A→B→A and require complete segregation of session-bound evidence, UI, browser cache and server results.
5. Revoke teacher access server-side and prove a previously valid session and previously loaded UI can no longer read/review after revocation (including replay and stale capability cases).
6. Reject wrong-learner import, forged learner IDs, unauthenticated writes, overwritten evidence, unauthorized review-status changes and restoration.
7. Record request/response status codes and immutable redacted test IDs, never access tokens or learner data.
8. Confirm existing offline journal remains operational and is not auto-migrated.
Only then consider integrating an explicitly authenticated authorization adapter into the dormant bridge.

## Safety disposition
NO LIVE BRIDGE ENABLED. NO LEARNER RECORDS READ OR MODIFIED. NO AUTHENTICATED PRIVACY CERTIFICATION. No approval to route student work into STOS or to allow teacher review at this stage.
