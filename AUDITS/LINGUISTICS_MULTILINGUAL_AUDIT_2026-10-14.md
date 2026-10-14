# Polyglot / Khaemenes Linguistics — Multilingual and Curriculum Forensic Audit
**Audit date:** 2026-10-14  
**Branch:** `main` only  
**Scope:** public landing page, source file tree, 30 curated app entries, French 101, V4 Formal Academy, V3 Atlas, translations, offline shell and GitHub Actions.  
**Policy:** preserve existing features, STOS, student records, and older courses; do not introduce a cloud translation API or external script to implement core localization.

## Inventory and evidence
- Formal Academy: five languages (Spanish, French, German, Mandarin Chinese, Japanese), each with 11 level definitions; nominal total **55 course frameworks**.
- V3 comparative World Language Atlas retains 206 dossiers and 40 foundational modules.
- Homepage now lists **30 curated app destinations**, each resolving to a file in this repository.
- The repository also contains `apps/electives/Arabic/temple-of-letters-full-course/index.html` and root `multilingual-translator_index.html`, which are not currently in the homepage's 30-app filter. Investigate inclusion in future navigation; intentional archival entries should remain labeled.
- Seven-language UI module: English, Spanish, French, Arabic, Chinese, German and Russian. 152 source-phrase dictionary rows, with English fallback. This is interface localization, **not yet a complete translation of every course/lesson/app**.

## Completed repairs on main
1. **French 101** (`apps/French_101_index.html`): replaced three partial levels with 12 content-bearing lessons (five phrases each); added 80% quiz and final gates; locked-level navigation, safe pronunciation buttons, accessible scrolling, and guarded progress storage. Does not modify formal French V4 records.
2. **Polyglot multilingual entry** (`assets/vnv-language.js`, `index.html`): copied sovereign multilingual interface from Verve N Veda with 50 Polyglot-specific translations. Preserved language samples and TTS practice text, localized common controls, and stored preferred language. Arabic RTL is supported at the interface level.
3. **Cross-campus routes**: breadcrumb links to Verve N Veda and Khaemenes Academy; the KA seal returns to VNV; the Polyglot title still returns to the Linguistics homepage.
4. **Application index**: listed `apps/translator.html` as the missing 30th curated app. This translator has a private offline mode and an optional MyMemory online mode with consent.
5. **Offline shell**: bumped `service-worker.js` to `polyglot-v1.1.0-lang`, pre-caching the language module and invalidating older Polyglot caches.
6. **Formal College 101 course length** (`Halls/index.html`): corrected a 24-week/16-week mismatch in *all five* College 101 programs. The original six topics remain in `legacyThemes`, combined into four thematic units; with four phases per unit, each map now contains 16 weeks.
7. **Unreachable mastery gate**: the previous code counted completed units but did not expose any control to record them. Added visible unit review checkboxes that save to the existing `r.units` local record; clamped readiness counts to active unit numbers while retaining historic keys.
8. **Browser resilience**: guarded landing-page localStorage reads/writes and the optional speech stop function so restricted storage or unavailable TTS does not crash the page.
9. **Automated safety net**: `scripts/audit-linguistics.mjs` plus `.github/workflows/linguistics-integrity.yml` assert app paths, seven-language module, 12 French lessons and 80% scoring, 5×11 formal stage shapes, 16/36-week theme maps, preserved V3 material, and JS syntax. This automation **found** the College 101 mismatch, then passed after it was repaired.

## Outstanding issues / bounded next phases
**P1 — Full learning-content localization.** The language selector covers recurring interface phrases, not the substantive 55 course curricula or every one of the standalone practice tools. Preserve French, Arabic, Mandarin and Japanese *target-language examples* as study content instead of translating them away. Audit Halls V4 first; add explicit message IDs, localized instructional guidance, and a coverage matrix.

**P1 — Mastery authority and evidence quality.** V4 unit reviews, task reviews, competency observations and assessment scores are browser-local and can be self-recorded. They must not be represented as verified teacher-authenticated grades or official external credentials. Add learner/teacher permissions and evidence review before any trusted transcript sync.

**P2 — Offline content availability.** The service worker caches the gateway shell and interface module, **not all large Hall pages and 30 apps**. Implement separately downloaded/verified offline packs with quota-aware handling and tested recovery from storage eviction.

**P2 — Audio and accessibility.** Voices vary by browser/OS; TTS cannot guarantee native French or other language voices on every device. Browser test pronunciation fallbacks, disabled controls, Arabic RTL, phone/tablet layouts, high contrast and keyboard navigation. Do not infer that syntax tests prove visual accessibility.

**P2 — External resource boundaries.** Current index includes optional Google Fonts; the translator explicitly offers a third-party MyMemory call after consent; Stripe is used for optional support. Audit external-host links individually and distinguish offline/private from internet-dependent functionality.

**P2 — Directory completeness.** Evaluate the two unlisted standalone resources, the V3 Hall archive, duplication between translation utilities, and route coherence with the master Verve N Veda ecosystem directory. Do not create a second, competing menu implementation.

**P3 — Instructional depth.** The 55 course frameworks and weekly maps are real structured content, but the source audit alone does not establish that every week has a full worked lesson, validated audio, exercises, formative assessment and teacher resources. Conduct language-by-language pedagogical verification.

## Verification caveats
- GitHub structural workflow passed on repaired Hall revision `f1aa6500f3bb877811dbaa5585442808d23a2c3b`.
- Subsequent homepage resilience revision: `b95f8bb8ec6c682034996b1429bcf755d01a3544`; its Linguistics integrity and Beta index workflows passed when checked. Pages deployment was still running then.
- No live cross-device student sign-in test, manual visual browser test, native voice quality test, or external URL-by-URL network probe has been completed by this audit.
- STOS code and private account authority files were not modified.
