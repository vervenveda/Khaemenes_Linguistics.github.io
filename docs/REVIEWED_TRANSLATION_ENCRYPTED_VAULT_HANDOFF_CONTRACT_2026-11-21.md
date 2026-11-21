# Reviewed Translation → Encrypted Vocabulary Vault: Owner Handoff Gate

**Drafted:** 2026-11-21. **Status: SPECIFICATION / IMPLEMENTATION HOLD.** This is not a live synchronization bridge.

## Existing boundaries

- Public Sovereign Translator: `apps/translator.html`, origin-bound `khaemenes_interlingual_library_v2` browser library and `assets/khaemenes-review-policy.js`.
- Separate private vocabulary: Mac-local `127.0.0.1:18722` Creative Spark owner terminal with one-use pairing, exact approved client HTML integrity, strict CSP, Web Crypto encryption and narrowly scoped authenticated ciphertext read/write.
- No public Linguistics script has authority to read Mac Keychain, open the private GitHub archive or bypass owner pairing. No STOS account or student records are part of this scope.

## Required bridge states (never automatic)

1. **OFF:** No collection, upload, polling or background translation transfer.
2. **LOCAL REVIEW:** User selects explicit translation pairs from their own reviewed browser library. Show the source, target, language pair, prior human review status and date. Exclude machine drafts, campus drafts, Teacher candidates, account identifiers and page text not consciously selected.
3. **EXPORT PROPOSAL:** Only locally validated pairs are assembled for explicit download/transfer. Default to **no plaintext export** when secure handoff is unavailable; never include passphrases, bearer codes, Keychain values or learner context. Preview should show counts and categories without logging content.
4. **OWNER IMPORT PREVIEW:** Owner opens/authorizes the pack inside the **already paired private Mac vocabulary client**. Validate strict schema, version, bounded lengths and record counts, exact language codes, duplicate keys, review provenance and collision policy. No record is saved during preview.
5. **OWNER CONFIRMATION:** Separate explicit approval per batch. Inside the trusted vault session, encrypt client-side with the existing correct passphrase, use the established stable identity key and GitHub revision/CAS writer, and require exact ciphertext readback before acknowledging a durable save.
6. **REJECT / ABORT:** Invalid, stale, foreign, malformed, duplicate, unreviewed, overlimit or provenance-incompatible records are rejected without writing. No automatic retry that could overwrite the original encrypted vault.

## Mandatory gates before authorizing engineering

- Confirm exact current encrypted vocabulary document schema and the expected import record shape in the **approved local HTML source**, not assumptions from public JSON.
- Define one-way, non-executable transfer format and manual, authenticated transport that does not open a new public server endpoint or expose the Mac's private session.
- Review privacy: default no raw page-harvest, no persistent candidate history and no automatic online machine draft export.
- Author a non-production synthetic fixture containing a few consenting, deliberately non-sensitive pairs; never use the owner's real `hello → bonjour` ciphertext as a destructive fixture.
- Prove: explicit selection, no-selection denial, foreign identity denial, unreviewed denial, malformed pack, duplicate and revision conflict, read-only preview, deliberate approval, encryption, exact GitHub readback, restart recovery and zero writes on abort.
- Owner must review the import and the first write in a manually controlled Mac-local session. Public/unattended/STOS commissioning remains HOLD.

## Current five-bubble disposition

B1 — stale online response guards: code committed; source checks passed; Mac/browser end-to-end pending.

B2 — online machine drafts: switched to memory-only; legacy machine cache cleared at startup, reviewed library and dictionary drafts untouched; Mac/browser tests pending.

B3 — browser dictionary bundle regenerated from canonical source, deterministic `scripts/build-sovereign-dictionary.mjs` added, standalone equality checked; errata retained temporarily for backward-compatibility; offline service worker cache version bumped.

B4 — Teacher observations now include typed provider tier/source; repeated external machine output no longer increases correctness confidence; human review still required.

B5 — specified above; **no private vault API or public-page auto-sync implemented**, due to the existing owner identity/encryption boundaries.
