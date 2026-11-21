# Sovereign Dictionary integration notes

**Updated 2026-11-21 — source-aligned offline distribution**

- Canonical source: `data/sovereign-dictionary.v1.json` (434 entries, 397 definitions, 37 bilingual-only records and 553 creative terms).
- Browser distribution: `assets/sovereign-dictionary.generated.js`, now regenerated **directly** from canonical JSON. The unpatched browser object has been compared structurally to the canonical source and matched.
- Deterministic build: `node scripts/build-sovereign-dictionary.mjs` verifies exact source-to-bundle bytes without writing; `--write` requires explicit owner action and should only be used after a reviewed canonical source change. CI checks drift and standalone parity.
- `assets/sovereign-dictionary-v1-errata.js` is still loaded for backward compatibility with previously cached bundles; it is now **redundant for the current bundle** and must not be deleted until service-worker and all consumer references have been verified against an updated cache.
- Original Arcade, Preschool, Storybird and ARSHIF source files remain untouched.
- No automatic dictionary learning, private vault import or STOS writes have been authorized by this build.
