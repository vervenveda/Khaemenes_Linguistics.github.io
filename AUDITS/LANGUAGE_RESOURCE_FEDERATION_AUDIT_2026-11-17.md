# Khaemenes Linguistics — Cross-Repository Language Resource Federation Audit
**Date:** 2026-11-17  
**Branch:** main  
**Scope:** Linguistics plus Preschool, Kindergarten, Elementary, Middle, High School, Higher Learning, ARSHIF, Arcade, Academy and VNV gateway language/literacy resources.

## Architectural conclusion

Khaemenes Linguistics should become the **canonical discovery and classification hub** for language learning across the Verve N Veda ecosystem, but it should **not require physical migration** of working games or tools from their original repositories.

Rule:

> One language ecosystem may have many practice surfaces across age-specific repositories, but formal course authority, mastery records, and age suitability must remain explicit.

Language resources should therefore be federated by metadata:
- language
- age band / learner stage
- skill domain
- practice vs formal course
- repository of origin
- mastery authority
- offline status
- audio / speech support
- reading / writing / listening / speaking classification

## Linguistics repository — current core

The Linguistics repository already contains the strongest formal and cross-language infrastructure:

### Formal / principal language routes
- Spanish — Language Worlds
- French — French 101 / 201 and high-school-aligned course work
- German — German Hub, Coach, Traveler, Word Challenge, mastery constellation
- Mandarin — Language Worlds
- Japanese — Language Worlds
- Arabic — Arabic I, 32-week Year I, Arabic learning worlds and specialist studies
- Russian — Russian I, 32-week Year I, conversation and mastery tools
- English / ESL — Language Worlds ESL

### Core practice / tools
- Arabic Lighted Path
- Arabic Memory Game
- Arabic Numbers
- Arabic Temple of Letters
- German Word Challenge
- German Coach
- Russian Skills Lab
- Russian Numbers
- Russian Conversation World
- Scrabble Word Finder
- Word of the Day
- Sovereign Translator
- Translation Helper
- Interlingual Core
- Lexicon Expansion
- language-specific mastery constellations

### Translator authority
The existing topology audit designates `apps/translator.html` as the canonical translator implementation. Other translator pages are compatibility, entry, or helper surfaces and should not become competing authorities.

---

## Preschool — early language and literacy resources

Confirmed language/literacy resources include:

- `apps/ABC_Alphabet_Adventure_index.html`
- `apps/ABC_Story_Time/`
- `apps/ABC_adventure_hub_index.html`
- `apps/ABC_bilingual_index.html`
- `apps/ABC_bubble_adventure_index.html`
- `apps/ABC_cosmic_alphabet_index.html`
- `apps/ABC_match_index.html`
- `apps/ABC_time_index.html`
- `apps/Spelling_game_index.html`
- `apps/Spelling_journal_index.html`
- `apps/Spelling_safari_index.html`
- `apps/Sunny_ABCs_123s_Storytime/`
- `apps/reading_learnanewword_index.html`
- `apps/reading_sight_words_index.html`
- `apps/reading_storybird_grove/`
- `apps/cosmic_arabic_alphabet_quest_index.html`

The Preschool catalog confirms that the Bilingual ABC Garden is explicitly cross-language and that the Cosmic Arabic activity practices Arabic letter recognition and word-picture association.

**Federation role:** early literacy, alphabet familiarity, sound-symbol play, sight words, storytelling, beginner Arabic exposure.  
**Do not treat these as formal Linguistics mastery records.**

---

## Kindergarten — phonics, reading and spelling resources

Confirmed resources include:

- `apps/ABC_curriculum_index.html`
- `apps/ABC_letter-lab.index.html`
- `apps/ABC_spelling_soup_index.html`
- `apps/ABC_story-sing-along.html`
- `apps/Spelling_safari_index.html`
- `curriculum/kinder_garden_phonic_awareness_index.html`
- `reading/index.html`
- `tools/reading-list_index.html`

**Federation role:** phonemic awareness, phonics, early spelling, oral language, story/listening practice, early reading.

These remain child-safe Kindergarten resources and should only appear in Linguistics when the learner-stage filter explicitly allows early childhood resources.

---

## Elementary — vocabulary and word-play resources

Confirmed shared games include:

- `games/elementary_vocabulary_garden/`
- `games/learn_a_new_word/`
- `games/word-detective/`
- `games/story-seed-garden/`
- `games/story-problem-studio/`

The repository also contains full Language Arts pathways for Grades 2–5.

**Federation role:** vocabulary growth, context clues, word analysis, writing prompts, narrative construction, language reasoning.

These are especially useful as reusable mechanics for later foreign-language versions.

---

## Middle School — vocabulary and world-language infrastructure

Confirmed:

- Grade 6 World Languages — 36-week route
- Grade 7 World Languages — 36-week route
- Grade 8 World Languages — 36-week route
- `grades/vocabulary-studio/`
- official translator rollout and accessibility workflows

**Federation role:** bridge layer between general literacy and formal language specialization.

The Vocabulary Studio is a strong candidate for language-specific adapters rather than creating separate vocabulary-game engines for every language.

---

## High School — advanced language / vocabulary resources

Confirmed:

- `courses/electives/world-languages-linguistics/`
- four-grade vocabulary studio infrastructure
- `assets/Learn-a-new-word.html`
- reading, vocabulary and academic-language support across English 9–12
- official language-pin workflows

**Federation role:** formal secondary language pathway integration, academic vocabulary, morphology, reading-to-writing transfer, and handoff into Linguistics formal courses.

---

## Higher Learning — academic language resources

Confirmed:

- Academic Language & Lexicology course
- vocabulary frameworks embedded in advanced science/math courses
- Higher Learning language/cultural study should link into the Linguistics hub rather than invent a duplicate language directory.

**Federation role:** academic vocabulary, lexical research, morphology, scholarly writing, advanced language study.

---

## Arcade — reusable language game engines

Confirmed:

- `AffixSix™_index.html`
- `Learn_a_New_Word_index.html`
- `games/kids/ABC_Bubbles_index.html`
- `a_quantum_storyseed_orb_game_index.html`

**Federation role:**
- AffixSix → morphology, roots, prefixes, suffixes, word formation
- Learn a New Word → vocabulary acquisition
- ABC Bubbles → early alphabet / sound-symbol adaptation
- Storyseed Orb → narrative generation / writing practice

These should be treated as reusable practice engines that can be parameterized by language and age, not as separate formal courses.

---

## ARSHIF Archives — textual and reading resources

Path-level scan confirms:

- `halls/Reading_room_index.html`
- `tools/close-reading-annotation-lab/`
- literacy / children's classics framework
- English reading collections used by Academy courses

ARSHIF currently exposes fewer language-specific filenames than Linguistics, but it is strategically important for:
- source reading
- close reading
- annotation
- historical language study
- scripture / faith textual study
- public-domain and archival reading
- cultural context

A future content-level ARSHIF pass should inspect generic reading/archive pages for multilingual texts and language-study usefulness rather than relying only on filenames.

---

## Existing Arabic cross-repository evidence

The earlier Arabic ecosystem inventory already identified:

- formal Arabic I and 32 weekly pages in Linguistics
- 11 Arabic application entrances in Linguistics
- Preschool Cosmic Arabic Alphabet Quest
- Preschool `ABC_arabic.js`

That earlier audit explicitly warned that its search was filename-based and not exhaustive. This federation audit extends the model to generic vocabulary, reading, spelling, phonics, writing, and language-game engines.

---

## Recommended canonical resource taxonomy

Every federated language resource should eventually declare:

### Learner stage
- preschool
- kindergarten
- elementary
- middle
- high-school
- higher-learning
- adult / lifelong
- all-ages with age adapter

### Language
- English / ESL
- Spanish
- French
- German
- Mandarin
- Japanese
- Arabic
- Russian
- multilingual / language-agnostic

### Skill domain
- alphabet / script
- phonics / sound-symbol
- vocabulary
- morphology
- grammar
- reading
- listening
- speaking
- writing
- translation
- culture / context
- textual / archival study

### Academic role
- formal-course
- supplemental-practice
- game
- studio
- reference
- archive
- assessment-support

### Authority
Each record must say which course, if any, is allowed to interpret the activity as formal evidence.

Games and supplemental tools **must not independently award course mastery**.

---

## Recommended implementation

Create a canonical cross-repository data file in Linguistics, for example:

`data/ecosystem-language-resources.json`

It should point to original URLs rather than copy applications into Linguistics.

Then build one Linguistics **Language Resource Explorer** that can filter by:
- language
- age
- skill
- formal vs practice
- game / reading / speaking / writing / translator
- repository

This explorer can feed:
- Linguistics landing page
- language-specific course toolbars
- Higher Learning language resources
- Middle/High language toolbars
- age-appropriate Elementary access
- teacher/parent discovery views where appropriate

Preschool and Kindergarten must remain governed by their child-safe local navigation boundaries. Their games may be discoverable from the adult/teacher Linguistics resource explorer, but child-facing Preschool/Kindergarten pages must not gain a route outward into the full ecosystem.

## Immediate next pass

1. Build the canonical `ecosystem-language-resources.json` registry.
2. Seed it with verified resources from Linguistics, Preschool, Kindergarten, Elementary, Middle, High, Higher Learning, Arcade and ARSHIF.
3. Add explicit age and academic-role metadata.
4. Keep original repository URLs.
5. Add regression tests that no practice/game resource can masquerade as formal mastery authority.
6. Then connect the Linguistics lower-left learner toolbar to this registry so its six controls become language-aware and course-aware.
