# Sovereign Dictionary × Translation Study Lab × laNGgwij — controlled integration

**2026-11-21 · public Linguistics `main`**

## Repositories and authority

- **Dictionary source of truth:** `vervenveda/Khaemenes_Linguistics.github.io/data/sovereign-dictionary.v1.json` — 434 provenance-backed records, of which 37 source bilingual-only records are not definition claims. The published JS bundle plus errata constitute the current effective offline view. `assets/khaemenes-interlingual-core.js` supplies lookup and source trust hierarchy; `assets/khaemenes-review-policy.js` governs personally reviewed pair creation and import.
- **Creative Spark encrypted vault:** separate owner-controlled Mac-only candidate, encrypted GitHub record in `artist1970/creative-spark.github.io`. The new translation study lab **does not read, transmit, merge, rewrite or unlock this archive**. No public GitHub source file has an owner Keychain/GitHub PAT access path.
- **AffixSix™:** bounded 240-pattern history and outcome-weighted move preference, as an *idea* for bounded candidate counts and weak repeated evidence. Existing game uses its own browser localStorage for match history and is not imported as a runtime dependency.
- **Checkers Variant Lab:** outcome-rewarded board-state learning and user-adjustable learning strength, as an *idea* for separately reviewed feedback and provisional ranking. Its actual game memory and game rules are not run by the translator.
- **laNGgwij:** independent sovereign C17 Teacher and final semantic arbiter in its native runtime. Its `config/teacher-policy.json` establishes minimum best score 0.48, minimum winner margin 0.06, absolute maximum learning bias 0.12 and fail-closed WITHHOLD. The Linguistics page adopts **only a separate advisory JavaScript implementation** of those policy ideas. It is not laNGgwij's runtime, native verifier, journal, signed receipt, STOS authority or neural model.

## Implemented candidate pipeline — opt in, no silent learning

```text
User-initiated translation in Sovereign Translator
   │
   ├── original sovereign offline lookup / optional separately consented online draft
   │
   ├── opt-in unchecked?  → no observation, no candidate
   │
   └── opt-in checked? → short text / PII and markup safeguards
                           │
                           ├── existing dictionary lookup (READ ONLY)
                           ├── bounded 240-record in-memory pattern counts
                           ├── advisory laNGgwij-inspired arbitration
                           │    ├── low score or near tie → WITHHOLD
                           │    └── clear score → SUGGEST FOR HUMAN REVIEW
                           └── never automatic trusted dictionary write
                                      │
                        User manually reviews/edits in existing Translation Review
                                      │
                       User checks explicit review attestation and saves
                                      │
                       existing browser-local reviewed pair (NOT GitHub ciphertext)
```

New modules:
- `assets/khaemenes-translation-candidate-lab.js`: `optIn`, `observe`, `list`, `recommend`, `reviewedProposal`, `clear`, `status`. Reuses the exact `KhaemenesSovereignTranslate.lookupLocal` core read-only. Bounded to 240 distinct candidate records per tab, caps repeats at 12, scores never establish translation correctness or review authority, blocks oversized/PII-like/markup/private-origin observations.
- `assets/khaemenes-translation-teacher-arbiter.js`: separate advisory `WITHHOLD` or `SUGGEST_FOR_REVIEW`, thresholds drawn from the current Teacher policy, never automatic publication and no native execution.
- `assets/khaemenes-translation-candidate-ui.js`: opt-in checkbox (OFF by default), memory-only candidate list and Clear Candidate Memory. No localStorage, cookies, network calls, GitHub writes or persistent learning log.
- `apps/translator.html`: contains the opt-in **Teacher's Translation Study Lab** adjacent to the pre-existing Translation Review. Its existing `afterTranslation()` reports a successful user-initiated on-page translation to the study lab only when enabled. Existing review/save behavior remains the only path to a personally reviewed local pair.

**Not implemented / deliberately not claimed:** automatic capture of every ecosystem page's translations, background scraping of pages, automatic persistent recording of raw translations, bulk import or replacement of canonical JSON, automatic encryption of candidates into the Mac GitHub vault, independent native laNGgwij execution/authorization, or autonomous language-model training. The public domain cannot silently write to a loopback-only private owner vault or bypass the new one-time pairing flow. A future cross-page bridge requires explicit opt-in, page eligibility and text minimization, origin trust, reviewed schema mapping, and an owner-authorized encrypted transport contract.

## Sovereignty and learning safeguards

1. Missing translation stays missing. Exact source lookup remains authoritative for observed source metadata, not an inferred language answer.
2. Repeated machine drafts or page observations can improve **candidate priority only**, never certify semantic accuracy, override reviewed pairs, or change canonical entries.
3. Source attribution and conflicts are displayed. laNGgwij-inspired uncertainty leads to WITHHOLD.
4. No learner records, private input fields, account IDs, secrets, authentication text or unsolicited page content should be ingested. The initial bounded filter is a defense-in-depth candidate, not a complete PII detector; only explicitly user-requested public text is eligible.
5. The candidate lab retains **no browser persistence**. Closing a tab or unchecking the opt-in control erases candidate history. Existing reviewed-pair browser storage belongs to the prior translator and must not be mislabeled as the private GitHub vocabulary cloud.
6. An explicit, separately authenticated encrypted archive proposal is needed before any candidate ever crosses into private Creative Spark. The existing ciphertext revision and stable HMAC identity must not be rewritten for this feature.
7. laNGgwij Teacher journal is a separate governed, hash-chained C17 research system; no automatic append, ABBY receipt, native execution or STOS terminal change is implemented here.

## Testing and deployment

```sh
cd "$HOME/Khaemenes-Linguistics-Terminal/Khaemenes_Linguistics.github.io"
git pull --ff-only
node --check assets/khaemenes-translation-candidate-lab.js
node --check assets/khaemenes-translation-teacher-arbiter.js
node --check assets/khaemenes-translation-candidate-ui.js
node --test scripts/translation-candidate-lab.test.mjs scripts/translation-teacher-arbiter.test.mjs
node scripts/audit-dictionary.mjs
node scripts/audit-translation-trust.mjs
```

The existing public dictionary integrity workflow includes the new regression tests. **Do not call the new tests PASS or UI acceptance complete until execution results have been observed.** Separately test the public translator in browser: no candidate before opt-in; one short offline translation after opt-in; WITHHOLD or advisory output only; clearing/disabling removes observations; manual reviewed-pair save remains explicitly required.

**Original private Creative Spark Mac vault:** untouched; it continues using the separately approved and pinned `apps/vocabulary-mini-cloud/index.html` source. Do not restart that vault to deploy this public translator feature.
