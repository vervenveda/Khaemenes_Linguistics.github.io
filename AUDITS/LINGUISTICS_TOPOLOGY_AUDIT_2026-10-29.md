# Linguistics Repository — Topology Forensic Audit
**Date:** 2026-10-29  
**Branch:** `main`  
**Audit mode:** read-only discovery followed by additive architecture stabilization  
**Repository:** `vervenveda/Khaemenes_Linguistics.github.io`

## Baseline tree

At the forensic baseline, the repository contained:

- **466** tree entries
- **358** files
- **108** directories
- **198** HTML pages
- **90** conventional `index.html` pages
- **129** files under `apps/`
- **115** files under `Halls/`
- **39** scripts
- **28** assets

## Primary finding

The repository had grown beyond the assumptions of its original gateway architecture.

The dominant risk was not missing content. It was **authority fragmentation**: the same language could be represented by a formal Hall course, a language-specific course experience, a language world, and one or more supplemental apps, each with its own local records.

The architectural rule adopted from this audit is:

> One course may have many learning surfaces, but it must have one declared academic identity and one authoritative mastery record.

## Principal routes found

| Language | Learner-facing route | Formal authority |
|---|---|---|
| Spanish | `apps/language-worlds/spanish/` | Five-Language Academy V4 |
| French | `apps/French_101_index.html` | Five-Language Academy V4 |
| German | `apps/German_hub_index.html` | Five-Language Academy V4 |
| Mandarin | `apps/language-worlds/mandarin/` | Five-Language Academy V4 |
| Japanese | `apps/language-worlds/japanese/` | Five-Language Academy V4 |
| Arabic | `Halls/courses/arabic-1/` | Arabic I |
| Russian | `Halls/courses/russian-1/` | Russian I |

## Preserved generations

The audit confirmed three Hall generations:

1. `Halls/index.html` — current V4 formal authority
2. `Halls/language-learning-v3_index.html` — V3 archive / migration reference
3. `apps/Language_learning_hall_index.html` — original Hall archive

The archives remain intentionally preserved.

## Translator overlap

Four translation-related surfaces were present:

- `apps/translator.html`
- `multilingual-translator_index.html`
- `apps/translator-entry.html`
- `apps/translation_helper_index.html`

The richest current implementation is `apps/translator.html`; it is now declared canonical. The other surfaces remain compatibility/entry/helper routes pending feature-by-feature migration review.

## Confirmed topology drift

The audit found and repaired these deterministic inconsistencies:

1. Homepage advertised **30** local apps while the live `appRegistry` contained **29**.
2. The legacy Linguistics integrity script asserted 29 but printed a success message claiming 30.
3. PWA shortcuts pointed at retired homepage anchors: `#languages`, `#pathways`, `#studios`.
4. Mentor discovery exposed only a small subset of the actual principal course topology.
5. Offline pre-cache strongly favored recently developed French/German surfaces while omitting several canonical course entrances.
6. Root README and ROADMAP still described the early prototype rather than the current campus.
7. The August Hall package manifest was stale but not clearly labeled historical.

## Architecture stabilization completed

Added:

- `data/course-topology.json`
- `docs/TOPOLOGY_ARCHITECTURE.md`
- `scripts/audit-topology.mjs`
- `.github/workflows/topology-integrity.yml`

Reconciled:

- homepage app count
- PWA shortcuts
- mentor/NAIB discovery
- canonical translator classification
- service-worker entrance cache
- README
- ROADMAP
- Hall README
- historical package-manifest status
- changelog

## Validation after stabilization

A direct repository-tree validation confirmed:

- all **7/7** principal learner routes exist;
- all declared academic-authority files exist;
- app inventory is **29/29**;
- visible homepage app count is 29;
- all PWA shortcut anchors exist;
- required mentor resources are present;
- all canonical offline entrance paths are represented in the service-worker shell;
- topology registry is cached;
- preserved Hall archives still exist and remain marked non-entry.

## Important unresolved architecture work

### P0 — French and German authority bridges

French 101 and the German ecosystem retain mature browser-local records that are not yet a single formal V4 mastery record. The next phase must define a **versioned, non-destructive evidence bridge**.

No bridge should:

- erase existing learner records;
- lower a previously earned completion;
- convert practice into mastery automatically;
- merge learners on a shared device;
- overwrite V3/V4 history without export/recovery protection.

### P1 — Language World parity

Spanish, Mandarin and Japanese Language Worlds need an explicit evidence relationship to the V4 course ladder while remaining useful foundation experiences.

### P1 — Arabic/Russian academic release hardening

Topology is comparatively clean, but content depth, reviewed listening evidence, productive-language assessment, secure summatives and language-specialist signoff remain separate academic QA gates.

### P1 — Translator consolidation

Compatibility surfaces need feature comparison before any redirect or retirement decision.

### P2 — Offline packs

The service worker now caches canonical entrances, not every lesson. Large courses should receive opt-in quota-aware offline packs rather than an ever-growing default cache.

## Change-control conclusion

Repository optimization should now proceed from the topology registry rather than from individual pages in isolation.

Any new major language route should declare, before promotion:

- learner entrance;
- academic authority;
- record/evidence namespace;
- formal vs supplemental role;
- offline policy;
- mentor/NAIB discoverability;
- archive or migration relationships.

This audit does **not** authorize deletion of preserved Hall generations or existing learner storage.
