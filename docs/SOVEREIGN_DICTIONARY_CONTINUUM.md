# Sovereign Dictionary, Thesaurus & Interlingual Translator

**Canonical repository:** `vervenveda/Khaemenes_Linguistics.github.io`  
**Public tool:** `apps/translator.html` (Sovereign Interlingual Translator v2.6)  
**Canonical dictionary:** `data/sovereign-dictionary.v1.json`  
**Offline browser bundle:** `assets/sovereign-dictionary.generated.js`, followed by `assets/sovereign-dictionary-v1-errata.js`  
**Runtime API:** `assets/khaemenes-interlingual-core.js`

## Contents (source inventory)
- 434 source-attributed records: 397 existing definitions and 37 bilingual word records without standalone definitions.
- 553 separately classified Storybird Grove creative vocabulary items; these are **not** dictionary definitions.
- 234 source-listed synonym/related-term links from 221 headword records, not 234 certified synonyms.
- 16 repeated headword forms across different original sources, intentionally preserved rather than merged.
- 37 Preschool bilingual items in English with recorded Spanish, French, Mandarin Chinese and Arabic equivalents (148 source pairs).
- 1,645 pre-existing offline campus interface phrase pairs distributed across 12 target languages. Campus phrases are curated **drafts**, not reviewed academic assessments or general machine translation.
- Source repositories: Arcade, Preschool and ARSHIF. Every imported record includes its source repository, file path, source commit SHA and editorial status. The original repositories are **unchanged**.

## Features
The public Interlingual Translator provides an offline definition explorer, source links, bilingual word lookups, a thesaurus of direct and reverse **source-listed related expressions**, and a separate creative-prompt search. Its browser-local Draft Studio saves up to 200 user-entered headwords, definitions, examples and related terms, with JSON export/import. Drafts can be searched and used for practice but are never silently promoted into the canonical dataset.

On the public Verve N Veda, Khaemenes Academy and Polyglot gateways, the reusable campus phrase pack is loaded before the shared multilingual selector. Reviewed browser-local pairs outrank draft public translations. Public interface localization does not automatically translate private learner responses or educational target-language examples.

## Trust hierarchy
1. Exact reviewed local pair (`khaemenes_interlingual_library_v2`).
2. Exact existing bilingual word pair in the Preschool source (marked **draft**).
3. Exact curated campus interface phrase (marked **draft**).
4. Missing translation: return no inferred translation. Online translation remains an optional and separately consented user action in the original tool; it is not the source of truth.

No guessing between two non-English languages. One-word mappings can be polysemous or gender/context-dependent, and glossary phrasing must not be treated as semantic equivalence. ARSHIF oral tradition entries require community/context-aware editorial review. No automatic learner-grade changes or cloud sync.

## How to contribute and curate
1. In `apps/translator.html`, search to avoid duplicate words or senses.
2. Create a local draft with headword, clear definition, part of speech, original example and carefully described related expressions.
3. Export `khaemenes-dictionary-drafts.json` and retain a backup. Imports are schema-checked and bounded to 200 records.
4. Review linguistic correctness, source rights, culture/community context and duplicate senses.
5. Once approved, add an entry with explicit provenance and editorial status to the **canonical JSON**, regenerate the browser bundle and tests, and update the service-worker cache version.
6. Existing games and ARSHIF original source records must never be silently overwritten to make a consolidated dictionary.

**Bundle transition note:** The current v1 browser bundle was generated before a correction to 37 bilingual-only records. The small `assets/sovereign-dictionary-v1-errata.js` aligns runtime data with the canonical JSON. The dictionary integrity workflow asserts exact equality **after** applying that overlay. Replace both bundle and overlay with a single regenerated artifact at the next controlled build, never delete the overlay alone.

## Verification
- `.github/workflows/sovereign-dictionary-integrity.yml`: counts, source provenance, exact effective canonical bundle, bilingual precision, related-term links, browser-local draft safeguards.
- `.github/workflows/sovereign-translator-browser.yml`: headless Chrome exercises the real translator page, thesaurus, search and draft form.
- `.github/workflows/linguistics-integrity.yml`: campus course and PWA structural integrity.
- `service-worker.js`: named version `polyglot-v1.3.0-reference` caches the translator and reference scripts for repeat visits.

GitHub Pages is static and localStorage remains **origin-bound**. Separate custom domains cannot automatically share browser drafts, reviewed pairs or learner files; transfer requires explicit JSON export/import. Cached resources can be evicted by the browser, so users should keep important exports.
