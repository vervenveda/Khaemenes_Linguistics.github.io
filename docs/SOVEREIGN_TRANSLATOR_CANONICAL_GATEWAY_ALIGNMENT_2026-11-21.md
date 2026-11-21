# Sovereign Translator — Canonical VNV Gateway Component Alignment

**Date:** 2026-11-21  
**Scope corrected by owner:** The previously supplied English 10 structure was an **example of layout expectations**, not authorization to alter English 10. Earlier English 10 changes from this pass were surgically reverted, including the grade-entry HTML, shared toolbar matcher, one new test, workflow and audit record. No English 10 course, lessons or grade data should have changed as a result of this layout request.

## Canonical gateway audit

Inspected the actual `vervenveda/vervenveda.github.io/index.html` (Git blob `dd8b85b3584121aad86d401dc23627e6c9b3e976`) and its script registrations, then mapped exact shared providers without introducing competing ticker, hamburger, toolbar or translator engines:

| Requirement | Shared owner / resource used |
| --- | --- |
| 333 Network ticker | `https://vervenveda.com/assets/vnv-333-ticker.js` |
| Auto-populated page-links ticker | `https://vervenveda.com/assets/vnv-ticker-autopopulate.js` |
| One coordinated ticker mount | Existing `https://vervenveda.com/Khaemenes_High.github.io/assets/vnv-dual-ticker-v1.js`, which loads both official tickers idempotently |
| Full-width Academy header | Simple semantic header markup consistent with gateway `.site-header .header-inner`; no added header script owner |
| One hamburger for ecosystem directory | `https://vervenveda.com/assets/vnv-ecosystem-menu.js` placed in `[data-vnv-ecosystem-slot]` |
| Lower-left universal tools | `https://vervenveda.com/assets/vnv-class-tools-toolbar.js?v=1.6.1` with per-page navigation-only `KhaemenesClassToolsConfigV1` |
| Translator inside left toolbar | Existing universal toolbar `type:"translator"` control, which moves `#vnv-language-switch` into its own popup; hide the unmounted top-level switch on these two pages to avoid a third top strip |
| Lower-right ecosystem toolbar | `https://vervenveda.com/assets/vnv-ecosystem-toolbar.js` (once per page) |
| Canonical language resources | `https://vervenveda.com/Khaemenes_Linguistics.github.io/assets/khaemenes-translator-loader.js?v=1.1.1` and existing local `assets/vnv-language.js` |

## Pages actually aligned

1. **`apps/translator.html`**: Preserved the full live Sovereign Translator application, existing offline/online service consent controls, 434-record dictionary and source lookup, thesaurus, review library and **new opt-in Teacher Study Lab**. Replaced an independent ribbon/brand/theme-button header with a full-width charcoal Academy header and official menu. Made the hero `Khaemenes Academy` 33px, `Sovereign Translator` 66px and descriptor 24px. Added three centered translator-relevant access doors (Translate, Dictionary, Teacher Lab), one concise About section and four symmetric 2×2 feature cards. Retained the original DOM IDs, form handlers and data APIs.
2. **`apps/translator-entry.html`**: Replaced its standalone minimal card with the same official chrome and concise translator-specific 33/66/24 charcoal hero, three access doors, 2×2 features and a centered charcoal footer. Legacy translator remains linked as compatibility only; canonical app route is `apps/translator.html`.

**Explicitly not modified:** `multilingual-translator_index.html` legacy compatibility implementation, canonical dictionary JSON, generated bundle/errata, Review Policy and learning modules, private Creative Spark ciphertext vault, Keychain, STOS services, student/parent records or assessments.

## Presentation and safeguarding

- Buttons and cards use 7px corners, cream/charcoal contrast, minimum 16px control text, and symmetric even-numbered feature grids. The 2×2 desktop/tablet cards fold to one column on narrow phones.
- The official universal toolbars retain their original lower-left/lower-right ownership; no duplicate corner buttons are introduced.
- The lower-left Language tool is the **page-interface language selector**. It is not a new hidden general-purpose translation engine. The main translator workspace remains accessible directly in the page.
- The public translator does **not** auto-save translated pages into the separate private Mac vault, automatically train from private page text, or upgrade draft words into reviewed dictionary entries.

## Regression evidence and pending browser checks

`scripts/translator-canonical-landing.test.mjs` contains seven structural tests for both pages: dual-ticker ownership, one hamburger provider, universal toolbars, translator mount, fixed hero hierarchy, three valid access anchors, symmetrical features, preservation of existing translator controls/dictionary/Teacher lab and clean separate entry. Added to `.github/workflows/sovereign-dictionary-integrity.yml` alongside the prior 16 candidate-learning tests and dictionary audits.

The seven structural checks were manually evaluated against the exact current repository sources in the GitHub connector environment and **7/7 passed**. This is not the same as Node CLI run, completed GitHub Actions run, or live Chrome browser proof. **Mac Node and browser acceptance remain pending.** In particular, inspect the actual ticker/header stack, hamburger and both corner docks, language picker action, desktop/tablet/phone geometry, and ensure the existing Translate, Review and Teacher Lab functions work unchanged.

Suggested Mac commands:
```sh
cd "$HOME/Khaemenes-Linguistics-Terminal/Khaemenes_Linguistics.github.io"
git pull --ff-only
node --test scripts/translator-canonical-landing.test.mjs scripts/translation-candidate-lab.test.mjs scripts/translation-teacher-arbiter.test.mjs
node scripts/audit-dictionary.mjs
node scripts/audit-translation-trust.mjs
```

**Release posture:** Source committed; actual browser/Node validation on owner's Mac pending. Do not conflate public translator presentation synchronization with authorization to access the separately paired encrypted mini-cloud.
