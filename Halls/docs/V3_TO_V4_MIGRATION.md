# V3_TO_V4_MIGRATION.md

V3 used:
`arshif.languageHall.v3`

V4 uses:
`arshif.languageHall.v4`

V4 does not delete or overwrite the V3 key.

If V3 exists when V4 is initialized, a copy is preserved inside the V4 record under `legacyV3`.

V3 course completion is **not automatically translated into Spanish/French/German/Mandarin/Japanese formal-course completion**, because V3 used one generic 40-module path with a user-entered target language.

The old 40 modules remain available as the Language Learning Foundations Library.
