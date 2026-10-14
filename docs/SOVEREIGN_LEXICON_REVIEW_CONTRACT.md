# Sovereign Lexicon Hub — Review & Import Contract

**Scope:** The dictionary, thesaurus, and Interlingual Translator on `main`.  
**Purpose:** Let the ecosystem grow its vocabulary while preventing guesses, machine translations, and imported drafts from silently acquiring trusted status.

## Permanent sources of truth

- `data/sovereign-dictionary.v1.json`: canonical source-attributed dictionary (434 entries; 397 with definitions, 37 bilingual words without source definitions) and 553 distinct Storybird creative terms.
- `assets/sovereign-dictionary.generated.js`: public offline browser distribution. The separate `assets/sovereign-dictionary-v1-errata.js` currently applies the known bilingual metadata correction. The integrity workflow compares the *effective* bundle with canonical JSON. Regenerate the bundle and remove the errata together at a later maintenance checkpoint.
- `assets/khaemenes-campus-phrases.js`: curated but **not independently verified** 13-language public interface translations.
- `assets/khaemenes-interlingual-core.js`: exact-match dictionary, thesaurus and bilingual lookup API, no network.
- `assets/khaemenes-review-policy.js`: explicit local review record creation and guarded library-import logic.
- `apps/translator.html`: editing and review interface, with **offline** selected by default. Optional MyMemory mode is separate and requires explicit session consent.

## Trust levels

| Input | Status | Can automatically become a trusted pair? |
| --- | --- | --- |
| ARSHIF / Arcade / Preschool public source record | Source-attributed, educational, unreviewed | No |
| Storybird story ingredient | Creative prompt without authoritative definition | No |
| Campus interface translation | Curated draft | No |
| Optional external machine translation | Online draft | No |
| Imported translation JSON | Draft unless explicit review-trust box is checked | No |
| Reviewed translation saved through editable review field and checkbox | **Personally reviewed local pair** | Yes, after manual confirmation |
| Legacy stored pair with `verified:true` but no review metadata | Legacy review unconfirmed | Preserved with a clear warning |

No local review constitutes a professional certification, official course grade, teacher-authenticated assessment, or independent linguistic authority.

## Safe process for a new translation

1. Choose source/target languages and remain in Offline Library unless explicitly requesting an online draft.
2. Translate a phrase by exact lookup, or supply your own wording. Unavailable terms must stay unavailable rather than being guessed.
3. Edit the result in **Translation Review**. Confirm that it was checked against the original.
4. Select the approval checkbox and use **Save My Reviewed Pair**.
5. The browser stores a `reviewStatus: "self-reviewed"` record, timestamp, and origin. The separate app may now prefer it over an unreviewed campus draft.
6. Export the local v2 library as JSON for intentional transfer to another browser. Browser storage is not shared across website origins or computers automatically.

## Safe importing

- Imports retain the v2 language library schema; previous local entries are never overwritten.
- Default: every imported pair is a draft, even if its JSON claims `verified:true`.
- **Trust already-reviewed pairs** is an opt-in checkbox for a known, personally reviewed export. It does not promote incoming drafts and is not official verification.
- Import rejects malformed schemas, unsafe field names, excessively large files, and incompatible pair keys.
- The user should export an existing local library before any major migration.

## Regression gates

- `node scripts/audit-dictionary.mjs`: original sources, canonical/bundle equivalence, word/thesaurus/offline lookup, and draft management.
- `node scripts/audit-translation-trust.mjs`: rejection of unconfirmed review, import-as-draft, existing-pair preservation, prototype keys, opt-in trust.
- `node scripts/browser-translator-smoke.mjs`: real Chrome navigation, offline bilingual lookup, manual review, local save, dictionary, thesaurus and draft interactions.
- GitHub Actions runs these automatically for changes to the relevant public tools. These tests do not prove translation quality or accessibility across all devices.

## Next expansion

Add explicitly sourced entries and contributor review notes to **draft packs first**. Continue linking ARSHIF references, then responsibly incorporate vetted forms from other games, course dictionaries and language specialists. Never bulk-promote dictionary definitions to translation pairs, and never replace the original source applications.
