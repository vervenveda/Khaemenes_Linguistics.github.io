# Polyglot
### Khaemenes Academy · Linguistics & World Language Campus

**Polyglot — The World in Words** is the Khaemenes Academy language-learning and linguistics campus. It now contains formal course architecture, language-specific learner experiences, world-language reference material, local practice applications, translation tools, and preserved legacy generations.

> Many languages. Many histories. One shared human conversation.

## Current architecture

The canonical repository topology is declared in:

- `data/course-topology.json` — machine-readable route and authority registry
- `docs/TOPOLOGY_ARCHITECTURE.md` — human-readable architecture contract
- `scripts/audit-topology.mjs` — regression check preventing route/authority drift

The governing rule is:

> One course may have many learning surfaces, but it has one declared academic identity and one authoritative mastery record.

### Campus layers

| Layer | Canonical surface | Purpose |
|---|---|---|
| Campus gateway | `index.html` | discovery, language matrix, apps, tools and campus navigation |
| Formal Five-Language authority | `Halls/index.html` | Spanish, French, German, Mandarin Chinese and Japanese course architecture |
| Arabic Year I | `Halls/courses/arabic-1/` | canonical 32-week Arabic I course |
| Russian Year I | `Halls/courses/russian-1/` | canonical 32-week Russian I course |
| Language Worlds | `apps/language-worlds/` | foundation and communication pathways |
| Canonical translator | `apps/translator.html` | sovereign translation and language-comparison tool |
| Archives | V3 + Original Hall | continuity and migration reference; not new-course authorities |

## Current learning inventory

The campus currently exposes:

- **5 formal V4 language programs**
- **55 V4 formal course frameworks**
- **7 principal learner-facing language routes**
- **206 World Language Atlas dossiers**
- **40 Language Learning Foundations modules**
- **29 curated local application entries**
- complete 32-week Arabic I and Russian I navigators
- dedicated French and German learner ecosystems
- Spanish, Mandarin and Japanese Language Worlds
- English / ESL resources
- a sovereign dictionary / translation stack
- local-first evidence and portfolio tools on supported courses

The repository deliberately distinguishes **formal course authority** from supplemental readers, games, sound labs, translators, practice tools and local formative evidence.

## Principal learner routes

| Language | Learner-facing entrance | Formal record authority |
|---|---|---|
| Spanish | `apps/language-worlds/spanish/` | Five-Language Academy V4 |
| French | `apps/French_101_index.html` | Five-Language Academy V4 |
| German | `apps/German_hub_index.html` | Five-Language Academy V4 |
| Mandarin Chinese | `apps/language-worlds/mandarin/` | Five-Language Academy V4 |
| Japanese | `apps/language-worlds/japanese/` | Five-Language Academy V4 |
| Arabic | `Halls/courses/arabic-1/` | Arabic I |
| Russian | `Halls/courses/russian-1/` | Russian I |

French and German retain their established browser-local learner records while a deliberate authority bridge is developed. Existing learner data must not be deleted or silently rewritten during that work.

## Preserved Hall generations

The current formal Hall is:

`/Halls/index.html`

Two older generations remain intentionally preserved:

- `/Halls/language-learning-v3_index.html` — V3 archive and migration reference
- `/apps/Language_learning_hall_index.html` — original Hall archive

They remain functional for continuity, notes, exports and migration evidence, but they are not coequal authorities for new formal coursework.

## Translation architecture

The canonical translator is:

`/apps/translator.html`

Compatibility surfaces remain available while migration is tested:

- `/multilingual-translator_index.html`
- `/apps/translator-entry.html`
- `/apps/translation_helper_index.html`

The canonical translator uses the repository's sovereign dictionary, transliteration, interlingual core and review-policy resources. Optional external translation remains subject to explicit consent where implemented.

## Offline architecture

Polyglot uses a service worker for a lightweight application shell and runtime caching.

The shell now includes the topology registry and canonical course entrances. It intentionally does **not** pre-cache every lesson in the repository. Large language courses should use runtime caching now and may later receive explicit, quota-aware offline packs.

## Learner-scoped formal records

The Five-Language Academy V4 now separates named learners on a shared browser/device.

- historical shared V4: `arshif.languageHall.v4`
- named learner V4: `arshif.languageHall.v4.learner:<learner-id>`
- active learner pointer: `arshif.languageHall.v4.activeLearner`
- learner registry: `arshif.languageHall.v4.learners`

The historical shared record is never silently merged into a learner. It may be explicitly copied into a new named record, with overwrite protection, while leaving the original preserved.

## Learner records and privacy

Polyglot is primarily browser-local and privacy-conscious.

Current local records may include course progress, formative evidence, portfolio notes, learner labels, preferences and locally entered review notes. Individual modules explicitly distinguish unverified browser-local evidence from authenticated external credentials.

Architecture changes must preserve existing storage namespaces unless a migration is separately designed, documented and regression-tested.

## Assessment boundary

Course numbers and internal Academy records do not automatically confer:

- ACTFL or CEFR certification
- DELF, Goethe, HSK, JLPT or other official examination credentials
- interpreter or teacher credentials
- transferable college credit
- external accreditation

Productive speaking/listening competence and formal summative assessment require appropriate evidence and review beyond recognition quizzes alone.

## Technology

The repository is designed around:

- semantic HTML
- modern CSS
- vanilla JavaScript
- browser `localStorage`
- the Web Speech API where supported
- print / JSON evidence workflows on supported courses
- same-origin offline caching
- no required framework or package build for the public site

Some optional public surfaces use external fonts, support links or explicitly consent-gated external translation. These are not required to define the core academic authority.

## Accessibility and internationalization

The repository includes combinations of:

- keyboard-visible focus
- reduced-motion handling
- responsive layouts
- right-to-left Arabic support
- multilingual interface translation
- local speech synthesis
- print evidence
- learner-switching safeguards

Automated source checks do not replace real-browser, screen-reader, phone/tablet, native-voice and language-specialist testing.

## Automated quality gates

Key checks include:

- Linguistics structural integrity
- topology integrity
- multilingual source coverage
- translator browser smoke tests
- sovereign dictionary integrity
- French / German browser regressions
- Arabic / Russian learner and evidence regressions
- Beta doorway coverage

The topology workflow should fail whenever the canonical registry, homepage routes, mentor discovery, PWA shortcuts or offline entrances drift apart.

## Content principles

1. Teach languages with context.
2. Respect dialect and regional variation.
3. Do not equate language, ethnicity, nation, religion or writing system.
4. Review machine-assisted translations before presenting them as authoritative instruction.
5. Protect learner privacy and avoid unnecessary personal-data collection.
6. Treat accessibility and offline use as educational infrastructure.
7. Preserve historical learner records during migrations.
8. Keep practice evidence, course mastery and external credentials conceptually separate.

## Repository development rule

Before adding another major course surface, determine:

- its canonical learner entrance;
- its academic authority;
- its progress/evidence namespace;
- whether it is formal, formative, supplemental or archival;
- its offline policy;
- its mentor/NAIB discovery status;
- its relationship to existing language surfaces.

Then update `data/course-topology.json` and the topology audit with the new route.

## Academy links

- Khaemenes Academy: https://vervenveda.com/Khaemenes_Academy.github.io/
- Verve N Veda: https://vervenveda.com/

**Concept, creative direction and Academy stewardship:** Jennifer Kay Pearl

© 2026 Jennifer Kay Pearl. See `LICENSE.md` for licensing scope.
