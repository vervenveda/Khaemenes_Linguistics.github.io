# Linguistics Vocabulary Mini Cloud — GitHub encrypted storage contract

Status: **HTML client published; authenticated GitHub writer NOT commissioned.**
Do not describe this page as a working cloud until the writer, private repository scoping and write/readback tests pass.

## Authority

- Master translator and dictionary: `apps/translator.html`, `data/sovereign-dictionary.v1.json`.
- Encryption implementation: `apps/vocabulary-mini-cloud/index.html` (Web Crypto API within HTML).
- Durable destination: GitHub encrypted JSON object, written **only through a trusted authenticated server-side GitHub App bridge**.
- Public GitHub Pages hosts static client code only. The user passphrase, decrypted vocabulary, private data and GitHub credentials must never be written into HTML, repository source, telemetry, query parameters or logs.
- No browser `localStorage`, `sessionStorage`, `IndexedDB`, cookies, CacheStorage or filesystem fallback.
- The mini cloud records new terms as **unreviewed**. It must never automatically rewrite the published canonical dictionary. Editorial approval and a separate provenance-aware publication process are required.
- Do not use existing family, STOS or other vault keys; isolate the Linguistics vault and use fresh encryption salts per upload.

## Bridge API (not yet implemented)

Authenticated page integration may expose `window.KhaemenesVocabularyGitHubBridge` from a separately reviewed bridge library:

```js
await bridge.status({namespace:"linguistics.vocabulary.v1"})
// {authenticated:true,authorized:true,repository:"vervenveda/Khaemenes_Linguistics.github.io",
//  namespace:"linguistics.vocabulary.v1",identity:"<stable authorized opaque id>"}

await bridge.get({namespace:"linguistics.vocabulary.v1",identity:"<opaque id>"})
// {authenticated:true,namespace:"linguistics.vocabulary.v1",identity:"<opaque id>",
//  revision:0,blob:null}
// or revision>=1, blob:{schema,algorithm,kdf,iterations,salt,iv,ciphertext}

await bridge.put({namespace,identity,expectedRevision,blob,sha256})
// {authenticated:true,durable:true,namespace,identity,revision,sha256}
```

The trusted writer must:

1. Authenticate each read and write using a server-held GitHub App installation credential or equivalent restricted server-side authority. **Never embed a PAT or GitHub secret in the page.**
2. Authorize the exact private repo, immutable namespace and caller-specific object path. Reject path traversal and arbitrary repository writes.
3. Allow only the encrypted envelope schema and enforce a size cap. Never accept plaintext vocabulary.
4. Verify the SHA-256 digest of the exact serialized envelope and compare revisions atomically to avoid lost updates.
5. After GitHub confirms a commit, re-read the committed bytes and verify their digest before returning a durable receipt; protect against replay.
6. Enforce rate limits, audit changes without logging plaintext, and support explicit recovery/rotation procedures.
7. Deny unauthenticated requests, stale revisions and failed readbacks. Never fall back to local browser storage or pretend GitHub accepted a save.

GitHub commit histories persist old encrypted revisions. Encryption protects plaintext confidentiality under the stated passphrase assumptions, but does not prevent traffic/metadata disclosure or erase older commits. Use a dedicated **private** record repository if vocabulary provenance is sensitive.

## Browser encryption contract

- AES-256-GCM authenticated encryption via `crypto.subtle`.
- PBKDF2-HMAC-SHA256 with 310,000 iterations and a new random 128-bit salt.
- Fresh 96-bit GCM IV per ciphertext; namespace is authenticated associated data.
- Encryption and decryption in the HTML page; passphrase remains only in memory for an unlocked session.
- GitHub writer sees opaque ciphertext only; server-side authentication must be separate from cryptographic passphrase handling.

## Acceptance tests before calling it operational

1. No localStorage, sessionStorage, IndexedDB or browser vault persistence in Mini Cloud page.
2. No backend -> connect fails closed, Save remains disabled.
3. Wrong passphrase -> decryption fails without data changes.
4. Valid authenticated bridge -> ciphertext-only write and exact readback hash.
5. Duplicate entry, oversized vocabulary, and stale revisions -> rejected.
6. Wrong identity or repository scope -> rejected.
7. Confirm a new page load decrypts the remote GitHub envelope with the correct passphrase.
8. Confirm encryption keys, passphrase and plaintext never appear in GitHub commits, logs or response bodies.
9. Verify cross-device behavior against a private GitHub record object.
10. Separate dictionary-publication review test; new words must not become authoritative until approved.

The encrypted client is a published candidate, **not proof of an operational GitHub storage service**.
