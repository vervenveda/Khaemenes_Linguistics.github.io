# Polyglot

### Khaemenes Academy Linguistics Hall

**Polyglot — The World in Words** is an international language and linguistics landing page within the Khaemenes Academy learning ecosystem. It is designed as a calm, scholarly gateway for language study, cultural understanding, translation, literature, and the science of human communication.

The project welcomes learners of different ages, backgrounds, abilities, and levels of experience. A visitor may begin with a single greeting, explore a language family, save an area of interest, or follow a future pathway toward structured study.

> Many languages. Many histories. One shared human conversation.

---

## Project Purpose

Polyglot is intended to become a central home for:

- world-language learning;
- linguistics and language science;
- reading, writing, listening, and speaking practice;
- translation and interpretation studies;
- world literature and oral traditions;
- heritage-language learning;
- signed languages and Deaf culture;
- culturally respectful travel language;
- multilingual family and homeschool resources; and
- language preservation, history, and identity.

The current page establishes the visual system, navigation structure, learning pathways, and planned collection map for those future resources.

---

## Current Features

The standalone `index.html` currently includes:

- a multilingual welcome ribbon;
- a responsive scholarly landing page;
- light and dark display themes;
- a rotating phrase compass;
- browser-based phrase pronunciation when speech support is available;
- nine searchable language and linguistics collections;
- a personal **My Shelf** feature saved in the visitor's browser;
- pathways for young learners, teens, adults, heritage learners, travelers, and academic study;
- language skill studios for scripts, pronunciation, grammar, conversation, translation, vocabulary, reading, and writing;
- sections for literature, living voices, etiquette, identity, and language history;
- right-to-left text support;
- keyboard-visible focus states;
- reduced-motion support; and
- clearly labeled notices for modules that are planned but not yet published.

Future destinations are intentionally presented as planned Academy wings instead of opening broken or unfinished links.

---

## Language Collections

Polyglot currently organizes future study resources into nine broad collections:

1. **Global Foundations** — English, Spanish, French, Portuguese, and high-access international study.
2. **Middle East & North Africa** — Arabic, Hebrew, Persian, Turkish, right-to-left scripts, and regional traditions.
3. **East & Southeast Asia** — Mandarin Chinese, Japanese, Korean, Vietnamese, tonal listening, character systems, and honorifics.
4. **South Asia** — Hindi and other modern and classical language traditions of the Indian subcontinent.
5. **Africa & Indigenous Voices** — living languages, oral traditions, heritage reclamation, and respectful preservation.
6. **Classical & Historical Languages** — Latin, Ancient Greek, and other historical language pathways.
7. **Europe & the Mediterranean** — Romance, Germanic, Slavic, Hellenic, and Celtic language families.
8. **Signed Languages** — visual grammar, fingerspelling, accessibility, signed-language diversity, and Deaf culture.
9. **Linguistics & Language Science** — phonetics, phonology, morphology, syntax, semantics, sociolinguistics, acquisition, and language change.

These collections are an organizational foundation, not a claim that every listed course is already complete.

---

## Learning Pathways

Polyglot is structured to support multiple kinds of learners:

- **Young Learners** — stories, songs, sounds, images, and joyful first words.
- **Teen Scholars** — coursework, projects, cultural study, literature, and future academic-credit pathways.
- **Adult Learners** — practical pacing for work, community, travel, and lifelong learning.
- **Heritage Language Learners** — reconnection with family language, stories, and intergenerational memory.
- **Travelers** — useful speech, listening, etiquette, navigation, and respectful cultural preparation.
- **Academic Learners** — grammar, translation, linguistics, literature, research, and exam preparation.

---

## Design Direction

The visual language combines:

- deep scholarly navy;
- warm parchment;
- antique gold;
- restrained oxblood and teal accents;
- atlas-inspired line work;
- manuscript-style serif typography; and
- script-aware international typefaces.

The design avoids reducing international study to a collage of flags. Its global character comes through writing systems, language families, literature, maps, cultural context, and the shared study of human communication.

### Typography

The page uses the following externally hosted Google Fonts when an internet connection is available:

- Cormorant Garamond
- Inter
- Noto Sans Arabic
- Noto Sans Devanagari
- Noto Sans Japanese
- Noto Sans Simplified Chinese

System font fallbacks are included so that the page remains readable when those files cannot be loaded.

---

## Technology

Polyglot is built as a self-contained front-end page using:

- semantic HTML5;
- modern CSS;
- vanilla JavaScript;
- `localStorage` for theme and saved-collection preferences;
- the Web Speech API for optional phrase playback; and
- native browser accessibility features.

No framework, package manager, database, or build process is required for the present version.

---

## Privacy

The current page does not include user accounts, analytics, advertising trackers, or a remote database.

The following preferences are stored only in the visitor's browser:

- selected light or dark theme; and
- saved language collections in **My Shelf**.

Clearing browser site data removes these saved preferences. Speech playback is handled through the visitor's browser and operating-system speech capabilities; voice availability and pronunciation quality vary by device, browser, and language.

---

## Accessibility

The current page includes:

- a skip-to-content link;
- semantic page regions and headings;
- descriptive labels for interactive controls;
- visible keyboard focus states;
- responsive navigation;
- reduced-motion behavior;
- language and text-direction attributes for multilingual samples;
- high-contrast light and dark palettes; and
- status messages for saved items and planned modules.

Accessibility should be retested whenever new lessons, media, games, dialogs, or portals are added.

---

## Running Locally

No installation is necessary.

1. Download or clone the repository.
2. Open `index.html` in a modern web browser.

For more consistent browser behavior, serve the folder through a small local web server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

---

## GitHub Pages Deployment

1. Place `index.html`, `README.md`, and `LICENSE.md` in the repository root.
2. Open the repository's **Settings**.
3. Select **Pages**.
4. Choose **Deploy from a branch**.
5. Select the default branch and the root directory.
6. Save the Pages settings.

GitHub Pages will publish the static site after deployment completes.

---

## Suggested Repository Structure

```text
Polyglot/
├── index.html
├── README.md
├── LICENSE.md
├── assets/
│   ├── images/
│   ├── icons/
│   ├── audio/
│   └── fonts/
├── collections/
├── courses/
├── literature/
├── linguistics/
├── portals/
└── resources/
```

Only create folders when content is ready to be published. Avoid linking visitors directly to repository browsing pages; public navigation should lead to finished Academy pages and applications.

---

## Development Roadmap

Potential future development includes:

- individual language collection landing pages;
- Student, Parent, and Educator portals;
- structured beginner-to-advanced courses;
- alphabet and script-tracing tools;
- IPA and pronunciation laboratories;
- multilingual dictionaries and personal vocabulary decks;
- graded readers and parallel-text libraries;
- translation and interpretation exercises;
- signed-language learning modules;
- heritage-language family archives;
- teacher lesson builders and printable resources;
- learner progress records and certificates;
- offline-capable lessons and downloadable course packets;
- age-appropriate assessments and portfolios; and
- carefully reviewed links to free educational resources.

Any future backend should be documented separately and should follow privacy-by-design principles, especially when serving children and families.

---

## Content Principles

Contributors should protect the purpose of the Hall by following these principles:

1. **Teach languages with context.** Vocabulary and grammar should be connected to history, culture, place, and living communities.
2. **Respect regional variation.** Dialects and varieties should not be treated as defective versions of a standard language.
3. **Use living voices responsibly.** Obtain permission for community stories, recordings, interviews, and identifiable personal material.
4. **Avoid cultural flattening.** A language, nation, religion, ethnicity, and writing system are related concepts, but they are not interchangeable.
5. **Verify educational claims.** Grammar explanations, translations, pronunciation guidance, and historical statements should be reviewed before publication.
6. **Identify machine assistance.** Machine-generated translations or examples should be checked by knowledgeable human speakers before being presented as authoritative.
7. **Design for access.** New features should support keyboard use, readable contrast, mobile layouts, text direction, captions, transcripts, and reduced motion.
8. **Protect learners.** Do not add behavioral advertising, hidden tracking, unsafe chat systems, or unnecessary collection of children's personal data.

---

## Contributions

Thoughtful contributions may include:

- corrections to language samples;
- accessibility improvements;
- tested responsive-layout fixes;
- culturally reviewed learning materials;
- public-domain or properly licensed reading resources;
- language-learning activities;
- teacher and homeschool supports; and
- documentation improvements.

Before contributing third-party text, audio, illustrations, photographs, typefaces, or curriculum materials, confirm that their license permits inclusion and record the source and license in a notice file.

---

## License

This repository uses a **dual-license structure**:

- original software code is available under the **MIT License**;
- original educational text and curriculum material specifically identified as shareable are available under **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International**;
- the Khaemenes Academy and Polyglot names, seals, logos, visual identity, original artwork, and other reserved brand assets are **not** granted for reuse unless written permission is provided; and
- third-party materials remain governed by their respective licenses.

See [`LICENSE.md`](LICENSE.md) for the complete notice and scope.

---

## Credits

**Concept, creative direction, and Academy stewardship**  
Jennifer Kay Pearl

**Khaemenes Academy**  
A Verve N Veda educational initiative

Polyglot is created in support of free, creative, internationally minded learning and the belief that language study can deepen knowledge, dignity, memory, and human connection.

---

## Academy Links

- Khaemenes Academy: https://vervenveda.github.io/khaemenesacademy.github.io/
- Verve N Veda: https://vervenveda.github.io/

For licensing, collaboration, or educational inquiries:

**KhaemenesAcademy@protonmail.com**

---

© 2026 Jennifer Kay Pearl. Rights are granted only as described in `LICENSE.md`.
