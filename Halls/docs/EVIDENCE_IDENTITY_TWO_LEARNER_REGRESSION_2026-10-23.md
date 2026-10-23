# Two-learner evidence privacy regression specification

Status: NOT EXECUTED. Use only invented learner IDs and memory-backed storage.
Bridge file: assets/khaemenes-evidence-identity-bridge.js

1. Learner A creates an Arabic Week 06 draft; learner A can read it.
2. Switch to learner B; deny reading learner A's draft.
3. Learner B saves Russian Week 20 evidence; verify separate storage keys and no merging.
4. Refuse duplicate evidence IDs rather than overwriting.
5. Refuse restore/adoption without express owner permission and confirmation.
6. Refuse a learner's attempt to set reviewed status.
7. Refuse teacher review unless profile authority grants that teacher access to the exact learner.
8. Allow authorized teacher review and preserve the original draft.
9. Reject mismatched learnerId inside stored data, malformed week keys and changed IDs.
10. Confirm legacy journals remain unchanged and functional.

Cautions: The profile authority contract is not yet verified. Do not authorize using active-learner ID from localStorage alone. No production page imports the bridge. No actual student record was accessed or changed.
