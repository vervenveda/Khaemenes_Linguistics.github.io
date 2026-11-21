# Pierre ↔ Sovereign Translator · Direct Mentor Integration

**Date:** 2026-11-21
**Owner:** Khaemenes Academy Linguistics
**Identity authority:** `artist1970/CORE/PierreCore/AI_CORE_MANIFEST.json` (Git blob `dee9019c0e37be778b556a30f7cde3a271b46192`)
**Public chat:** `https://artist1970.github.io/Pierre.gihub.io/#talk`
**Canonical translator:** `https://vervenveda.com/Khaemenes_Linguistics.github.io/apps/translator.html#translatorWorkspace`

## Integrated surfaces

1. `index.html`: retains the existing Pierre mentor introduction and its **Talk with Pierre** direct chat link; the companion Translator link now opens the actual workspace.
2. `apps/translator-entry.html`: contains a Pierre mentor introduction and direct **Open Pierre's Chat** link. Existing three translator access buttons and course features remain unchanged. The page-specific universal class toolbar includes Pierre.
3. `apps/translator.html`: contains a Pierre mentor panel, direct **Open Pierre's Chat** link and a **Copy Text for Pierre** button. The universal class toolbar includes Pierre, alongside Translate, Dictionary, Teacher, Language, Academy and Theme.
4. `artist1970/Pierre.gihub.io/index.html`: its existing learning-pathway link returns directly to the canonical full Translator workspace, not to a readiness or intermediary loop.

## Synchronization and data boundaries

`assets/pierre-core-profile.v1.json` is a source-pinned identical copy of the approved public `pierre-public-core-profile-v1` projection used by Pierre's front door, originating from canonical PierreCore. `assets/pierre-translator-mentor-v1.js` fetches this same-origin profile and fails closed on an identity, provenance or authority mismatch.

**No new independent chat instance is created.** A normal anchor opens Pierre's established conversation at `#talk`. The optional clipboard button copies only the currently visible original and translated text, capped at 1,200 characters each, after the user's explicit click; it never sends that text, saves it, opens private stores or automatically fills the chat. The user must review the clipboard and deliberately paste it in the front-door chat. The chat continues using its independently approved public knowledge corpus.

Pierre offers teaching and linguistic guidance; he does **not** become the authority for translation verification, dictionary promotion, teacher approvals, learner identities, STOS, private Creative Spark Code Capsules, or encrypted vocabulary vault records. Source-attributed dictionary data and tentative candidate feedback remain managed by the existing Translator and its review gates.

## Regression

```sh
node --check assets/pierre-translator-mentor-v1.js
node --test scripts/pierre-translator-mentor.test.mjs
```

Dedicated CI: `.github/workflows/pierre-translator-mentor.yml`.

Browser acceptance still needs to confirm the direct chat deep link, clipboard permissions, mobile layout and screen-reader status announcements. A source commit alone does not certify browser behavior or GitHub Pages deployment.
