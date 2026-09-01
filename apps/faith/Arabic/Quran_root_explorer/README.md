# Qurâ€™anic Root Explorer â€” Temple of Letters

This standalone browser app introduces selected Qurâ€™anic Arabic root families through derived forms, verified verse evidence, search, study cards, and a private reflection journal.

## Instructional scope

The included dataset is a verified two-root seed collection: Ùƒ-Øª-Ø¨ and Ø¹-Ù„-Ù…. It is not a 1,000-root dictionary or a comprehensive morphological corpus. Expansion should occur only through reviewed entries containing accurate roots, derived forms, verse references, excerpt labels, and exact surface-form matches.

## Deep-inspection repairs

- Removed Qurâ€™an 96:4 from the Ùƒ-Øª-Ø¨ card because the verse contains no form of that root.
- Added a valid Ùƒ-Øª-Ø¨ example from 2:282.
- Replaced literal contiguous-root highlighting with verified surface-form highlighting. Root consonants do not necessarily appear as one uninterrupted string inside derived Arabic words.
- Labeled each displayed passage as an excerpt or complete Äyah.
- Added Arabic-script forms alongside the Latin transliterations of derived words.
- Corrected â€œtrilateralâ€ to the linguistic term â€œtriliteral.â€
- Improved Arabic search by ignoring vowel marks, Qurâ€™anic annotation marks, tatweel, and spaces.
- Improved Latin search by normalizing case, spacing, hyphens, punctuation, and combining accents.
- Escaped all dataset fields before HTML rendering, making later JSON expansion safer.
- Replaced misleading clipboard failure alerts with a real fallback and an accessible status message.
- Removed remote font and undeclared beta-script dependencies.
- Added search and journal labels, Arabic language/direction metadata, keyboard focus styling, reduced-motion handling, and live result status.
- Namespaced local-storage records and restored the last viewed card.
- Added private-note JSON export and confirmed per-root deletion.

## Privacy

Reflection notes and the last viewed card remain in the current browserâ€™s local storage. Nothing is transmitted. Export produces a local JSON file selected by the learner. Clearing a note requires confirmation and cannot be undone.
