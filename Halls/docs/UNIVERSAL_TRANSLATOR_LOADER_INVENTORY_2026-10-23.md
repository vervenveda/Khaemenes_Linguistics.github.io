# Universal Translator — Loader Inventory and Integration
Date: 2026-10-23
Scope: Verve N Veda homepage and Khaemenes Linguistics public surfaces

## Confirmed resource configurations
| Surface | Existing resources | Finding |
|---|---|---|
| `vervenveda/vervenveda.github.io/index.html` | campus phrases, older interlingual core, vnv-language.js | Missing expanded dictionary, lexicon and transliteration resources. Preserve homepage appearance; do not replace engine blindly. |
| `Khaemenes_Linguistics.github.io/index.html` | campus phrases, interlingual core, vnv-language.js | Lightweight site translation; lacks advanced dictionary resources. |
| `Khaemenes_Linguistics.github.io/apps/translator.html` | campus, generated dictionary, errata, lexicon expansion, transliteration, core, review policy, vnv-language | Richest interface; first safe integration for shared loader. |
| `Khaemenes_Linguistics.github.io/multilingual-translator_index.html` | review policy, standalone translation UI, vnv-language | Legacy app with separate code path; compatibility retained. |

## Implemented
- Created `assets/khaemenes-translator-loader.js` version 1.0.0.
- Adds explicit resource presence detection, optional complete resource loading in order, and a diagnostics report available via `KhaemenesTranslatorLoader.status()`.
- The loader requests only same-site JavaScript resource paths; it does not send translation content to any provider.
- Integrated it additively into `apps/translator.html` after its existing resources. No existing script removed, no visual design change, and saved data untouched.

## Remaining release gates
- The homepage and Linguistics hall still have older cores. A loader that starts after those cores cannot automatically rebuild precomputed dictionary references: coordinate dependency order during a dedicated compatibility change.
- Confirm actual browser/network execution, missing-file recovery, CSP behavior, optional-resource loading and ready-event handlers.
- Check all student-facing page templates for duplicate injectors, load order and fallback behavior.
- Test offline caches after first visit and full offline cold-start separately. Script loading from same origin is not proof of offline caching.
- A local editorial vocabulary draft is not a reviewed translation or verified synonym.

Status: first integrated loader only; not a claim that every ecosystem page is standardized.
