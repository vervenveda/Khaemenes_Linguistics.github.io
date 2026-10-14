# Sovereign Dictionary integration notes

- Canonical source: data/sovereign-dictionary.v1.json (434 entries and 553 creative terms).
- Offline browser bundle: assets/sovereign-dictionary.generated.js.
- The canonical source marks 37 Preschool bilingual records as translation-only, without definitions.
- The current browser bundle is one revision behind on that metadata. The shared core masks synthetic descriptions and returns null definitions for those 37 records.
- Before redistribution, regenerate the offline bundle from canonical JSON and rerun the integrity workflow.
- Original Arcade, Preschool, Storybird and ARSHIF sources were preserved.
