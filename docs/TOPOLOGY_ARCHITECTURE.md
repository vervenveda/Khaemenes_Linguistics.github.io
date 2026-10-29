# Polyglot Topology Architecture

**Status:** Canonical architecture contract  
**Repository:** `vervenveda/Khaemenes_Linguistics.github.io`  
**Registry:** `data/course-topology.json`

## Core rule

> One course may have many learning surfaces, but it has one declared academic identity and one authoritative mastery record.

This document separates five concepts that had grown together as the repository expanded:

1. **Campus gateway** — discovery and navigation.
2. **Learner experience** — the page, hub, reader, studio, or lesson interface a learner actually uses.
3. **Academic authority** — the course definition that owns official Academy completion semantics.
4. **Evidence surface** — supplemental practice or local evidence that may support learning but does not silently create a second course transcript.
5. **Archive** — preserved historical generations used for continuity, export, migration, and reference.

## Canonical topology

```text
Polyglot / index.html
        |
        +-- Canonical topology registry / data/course-topology.json
        |
        +-- Formal Five-Language authority / Halls/index.html
        |      +-- Spanish
        |      +-- French
        |      +-- German
        |      +-- Mandarin
        |      +-- Japanese
        |
        +-- Language-specific learner experiences
        |      +-- Spanish Language World
        |      +-- French 101
        |      +-- German Hub + studios
        |      +-- Mandarin Language World
        |      +-- Japanese Language World
        |
        +-- Separate formal Year I authorities
        |      +-- Arabic I / 32 weeks
        |      +-- Russian I / 32 weeks
        |
        +-- Supplemental tools
        |      +-- Canonical Sovereign Translator
        |      +-- Dictionary
        |      +-- Readers
        |      +-- Sound / conversation studios
        |      +-- Atlas and foundation libraries
        |
        +-- Preserved archives
               +-- V3 Hall
               +-- Original Language Learning Hall
```

## Authority rules

### Five-Language Academy

`Halls/index.html` remains the formal record authority for Spanish, French, German, Mandarin Chinese and Japanese. Rich language-specific interfaces may remain the preferred learner experience.

The repository must not imply that two independent progress stores are two official completion records for the same course.

### French

`apps/French_101_index.html` remains the preferred French 101 learner experience. Its existing browser-local records are preserved. A later evidence bridge may map qualifying French evidence into the V4 formal authority; no existing French record should be deleted or silently rewritten.

### German

The German Hub, Coach, reader, sound lab, conversation world and mastery constellation remain intact. Their learner-scoped safeguards are preserved. Formal Academy completion remains a separate authority until an explicit bridge is implemented and regression-tested.

### Spanish, Mandarin and Japanese

The Language Worlds are foundation and communication pathways. They are not allowed to silently become competing formal-course completion authorities.

### Arabic and Russian

Arabic I and Russian I are physically separate 32-week Year I courses and are canonical for their own Year I routes. Their browser-local formative evidence and unverified teacher-review notes must remain clearly distinguished from authenticated external credentials.

## Translator authority

Canonical translator:

`apps/translator.html`

Compatibility surfaces are preserved but classified as legacy/entry/helper paths:

- `multilingual-translator_index.html`
- `apps/translator-entry.html`
- `apps/translation_helper_index.html`

No compatibility surface should silently fork the canonical dictionary/review policy.

## Archive policy

The following are preserved and must not be deleted merely to simplify navigation:

- `Halls/language-learning-v3_index.html`
- `apps/Language_learning_hall_index.html`

They must remain clearly archival and must never be the default entrance for new formal coursework.

## Offline policy

The service worker caches the campus shell and canonical entrances. It should **not** pre-cache hundreds of large lesson pages by default. Large courses should use normal runtime caching now and may later offer explicit, quota-aware offline packs.

## NAIB / mentor discovery

The mentor manifest should expose the same principal topology visible to students. Mentor discovery must not treat a small set of standalone apps as if they were the whole Linguistics campus.

## Change-control rule

Architecture changes should update, in the same change set when applicable:

- `data/course-topology.json`
- homepage route(s)
- `mentor-manifest.json`
- `manifest.webmanifest`
- `service-worker.js`
- documentation
- `scripts/audit-topology.mjs`

The topology audit exists specifically to prevent these surfaces from drifting apart again.
