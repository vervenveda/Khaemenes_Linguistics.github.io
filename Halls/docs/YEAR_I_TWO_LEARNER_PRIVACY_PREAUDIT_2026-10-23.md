# Year I Evidence — Two-Learner Privacy Pre-Audit
Date: 2026-10-23 · Branch: main · **READ-ONLY analysis, no learner records modified**

## Evidence inspected
- `assets/year-i-evidence-journal.js`, used by Arabic I and Russian I lessons.
- `vervenveda/Khaemenes_Academy.github.io/assets/khaemenes-family-registry.js`
- `vervenveda/Khaemenes_Academy.github.io/family/index.html`
- `vervenveda/Khaemenes_Academy.github.io/teacher-admin/index.html`
- `vervenveda/Khaemenes_High.github.io/index.html`

## Executed source-logic checks (fictional labels, no browser or production data)
1. Labels alpha and beta yield different localStorage keys for the same language/week: pass.
2. The same label in Arabic weeks 06 and 07 yields different keys: pass.
3. The same label in Arabic and Russian week 06 yields different keys: pass.
4. Labels Alpha and alpha yield the **same** key due to lowercase normalization: isolation risk confirmed.
5. Backup with a different label is rejected by the current matching criteria: pass.
6. A backup bearing the currently selected label, schema, course and week is accepted at schema level: pass, but **no identity authentication**.
7. A forged backup whose label was changed to the current learner label also meets the journal's schema checks: **privacy and integrity risk confirmed**.
These checks executed JavaScript equivalents of the inspected key derivation and backup validation branches. They are **not** browser execution of the real journal DOM script and do not establish end-to-end permission security.

## Current implementation and findings
- Journal keys use `khae-language-evidence-v1:<course>:<week>:<hex(lowercase(trimmed learner label))>`; this is local browser storage, **not an authenticated learner ID**.
- The journal records four narrative evidence fields and formative quiz attempts. A learner-controlled label can be reused or guessed; device users sharing the same browser storage may access each other's work.
- Import validates schema, course, week, label, field type/length, and attempts array, but **does not prove ownership or trusted record provenance**; existing data can be replaced after confirmation.
- Quiz saving is triggered from rendered status text, not signed or authoritative grade records.
- Academy family registry keys include `khaemenes_family_registry_v1` and active family/adult/learner keys. It implements `canAdult(adultId,learnerId,permission)` by looking up a local permission record with active status.
- `educator` preset includes learner.view, progress.view, mentor.view, education.manage. It does **not** itself establish server-authenticated teacher review or an evidence-specific permission.
- Teacher-admin is explicitly a public resource page with review guidance and a local evidence-review queue. The source inspected does not justify treating it as a secure cross-origin portfolio approval authority.
- Separate repository origins, browser storage locality and absence of a verified server-side permission mechanism prohibit direct cross-repository localStorage reads as a trusted integration.

## Release gate: no live portfolio connection yet
1. Establish canonical learnerId/familyId binding, without allowing freeform labels as identity.
2. Establish explicit `evidence.view`, `evidence.review` and consent/guardian scopes, with server-enforced authorization if records are shared remotely.
3. Preserve existing label-based drafts via user-confirmed, non-destructive adoption after authenticated identification and conflict detection. Never silently merge two learners.
4. Treat formative scores and teacher review assertions as untrusted browser input until independently validated.
5. Run real two-learner browser tests for isolation, switch, export, malicious import, revocation and review approval, plus cross-browser and cross-origin behavior.
6. Do not write identifying student material to a public GitHub repository or machine-translation provider.

**Status:** isolation model useful for offline drafting only; not a secure teacher-reviewed portfolio, not ready for automatic profile linkage.
