# Sovereign Translator — Five-Bubble Hardening Worklog

**Date:** 2026-11-21  
**Scope:** `vervenveda/Khaemenes_Linguistics.github.io` only.  
**Reference audit:** `docs/SOVEREIGN_TRANSLATOR_FULL_ARCHITECTURE_FORENSIC_AUDIT_2026-11-21.md`.  
**Safety posture:** No new public-to-private API, no STOS change, no edits to the owner's existing private encrypted `hello → bonjour` record, no Keychain access, and no automatic translation promotion.

## Bubble 1 — async response race and wrong-language review: SOURCE REPAIRED

- New `assets/khaemenes-translation-request-guard.js` issues process-local request epochs and `AbortController` signals.
- Translator `fetch` receives the abort signal. Responses are checked after the response headers and JSON body resolve; only the active epoch with the exact source text, source language, target language, service and learning purpose may write output or cache.
- Input, language, service, learning-purpose, swap, Clear, new Translate and lesson context changes invalidate pending requests, clear stale review state and displayed output. A swap explicitly preserves existing output only for its deliberate swap behavior.
- Switching offline closes pending online consent, and online execution checks the current mode before sending text.
- A superseded request cannot call `afterTranslation` or feed the Teacher candidate lab.

**Remaining validation:** New unit tests and browser out-of-order mock-response trials must run before declaring a live Chrome PASS. Browser cancellation is not a guarantee that a request already sent to a third-party server is revoked.

## Bubble 2 — machine-draft browser retention: SOURCE REPAIRED

- `khaemenes_interlingual_cache_v2` no longer serves as a durable online text cache. The page uses a capped, tab-memory-only `transientOnlineCache` (120 entries maximum).
- On startup, the old online-machine-draft storage key is removed as a privacy migration. **Reviewed user library** `khaemenes_interlingual_library_v2` and **dictionary drafts** `khaemenes_dictionary_drafts_v1` are explicitly untouched.
- Clearing temporary drafts clears the current memory cache. Machine drafts do not become reviewed vocabulary without the existing checkbox and manual Save My Reviewed Pair action.
- External MyMemory online mode remains explicitly consented and still sends the chosen text in the provider request. Users must not enter sensitive text for online translation.

**Remaining validation:** Mac/browser retention test across refresh and private-mode behavior, while separately checking reviewed pairs survive refresh.

## Bubble 3 — canonical dictionary distribution: SOURCE REGENERATED; LEGACY OVERLAY RETAINED

- `assets/sovereign-dictionary.generated.js` regenerated directly from `data/sovereign-dictionary.v1.json` without altering canonical 434 source records or 553 creative terms.
- **Direct pre-errata equality** confirmed in isolated in-tool source execution, in addition to prior effective-bundle checks.
- New deterministic `scripts/build-sovereign-dictionary.mjs` checks exact bundle bytes in default read-only mode; `--write` requires deliberate owner action. `scripts/audit-dictionary.mjs` now rejects differences **before** any legacy errata is applied. CI runs the deterministic build verification.
- `service-worker.js` increments the cache to `polyglot-v1.5.11-translator-trust-20261121`, precaching the updated request guard, generated dictionary, translator resources and Teacher lab assets.
- `assets/sovereign-dictionary-v1-errata.js` remains temporarily loaded **for backward compatibility** while older service-worker cache installations and all consumer pages are evaluated. The standalone generated bundle no longer depends on it. Removing the compatibility overlay is a distinct future release gate.

**Remaining validation:** Owner Mac CLI check and browser offline-refresh check across the service-worker activation lifecycle.

## Bubble 4 — Teacher learning provenance and false evidence reinforcement: SOURCE REPAIRED

- Candidate observations now carry `providerTier` and bounded `providerSource`. The translator distinguishes **offline-reviewed**, **offline-source-draft**, **online-machine-draft**, and **online-memory-draft** paths.
- Repeated external machine output increments a bounded observation count but does **not** increase translation certainty by repetition alone.
- When evidence provider tier changes, candidate observation and feedback bias reset rather than borrowing accumulated evidence from an unrelated provider tier.
- The study UI displays source tier. Existing Teacher WITHHOLD thresholds, explicit opt-in, 240-candidate cap, ±0.12 feedback ceiling and human manual review controls remain unchanged.
- No source-tier label is a professional quality certification, semantic proof, or authorization to publish.

**Remaining validation:** New regression tests and human observation of the Teacher panel on real translations.

## Bubble 5 — private encrypted durability: MANUAL OWNER HANDOFF CONTRACT, LIVE SYNC HOLD

- Added `docs/REVIEWED_TRANSLATION_ENCRYPTED_VAULT_HANDOFF_CONTRACT_2026-11-21.md`: private owner-session pairing, reviewed-only selection, read-only preview, explicit batch approval, browser-side encryption, existing immutable HMAC identity, CAS revision/write/readback, and rollback/reject controls.
- **No cross-origin public-page write to private Creative Spark or STOS was added.** The existing public reviewed pair storage remains intentionally separate.
- The current private Mac vocabulary document format must be inspected and a synthetic non-sensitive end-to-end import fixture must pass before implementing an owner-authorized first live sync. Never overwrite the existing ciphertext for an unrelated test.

## Test and release status

**Source commits complete.** The modified inline application scripts and new JS modules were syntax-checked in the connector execution environment. Eight independent source/behavior checks passed in an in-tool synthetic harness: request epoch blocking, text mismatch, machine repeat certainty, invalid provenance rejection, inline script parse, absence of old cache writes, typed evidence wiring, and canonical unpatched bundle identity. These are **not** Mac Node execution, complete GitHub Actions status, headless Chrome acceptance or independent security certification.

Regression coverage added:
- `scripts/translation-request-privacy.test.mjs`: request epochs, stale context, aborts, transient cache, UI invalidation, provider tiers and offline cache resource availability.
- `scripts/translation-candidate-lab.test.mjs`: repeated machine output no confidence boost, invalid tiers, and reset of mixed-provider evidence.
- `scripts/audit-dictionary.mjs`: canonical equality before errata.
- `.github/workflows/sovereign-dictionary-integrity.yml`: all new tests plus deterministic bundle drift check.

**Mac verification commands:**
```sh
cd "$HOME/Khaemenes-Linguistics-Terminal/Khaemenes_Linguistics.github.io"
git pull --ff-only
node scripts/build-sovereign-dictionary.mjs
node scripts/audit-dictionary.mjs
node scripts/audit-translation-trust.mjs
node --test scripts/translation-request-privacy.test.mjs scripts/translation-candidate-lab.test.mjs scripts/translation-teacher-arbiter.test.mjs scripts/translator-canonical-landing.test.mjs
```

Then test in a public/localhost browser: offline exact bilingual lookup, online consent, rapidly changing text/language during slow provider fetch, new request supersession, source status, Teacher study opt-in, reviewed-pair save, temporary cache clear and refresh, dictionary/thesaurus, and offline service worker. Do not submit personal learner text to MyMemory.

**Current release designation:** Source hardening pushed to `main`. B1/B2/B3/B4 are **implemented in source, owner browser and CLI acceptance pending**. B3 legacy overlay retirement and B5 encrypted sync activation remain **HOLD**.
