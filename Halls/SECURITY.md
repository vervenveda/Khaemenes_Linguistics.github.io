# SECURITY.md

V4 is static and local-first.

## Storage
- V3 key remains untouched: `arshif.languageHall.v3`
- V4 key: `arshif.languageHall.v4`

Do not store passwords, API keys, immigration documents, confidential student records, private heritage interviews, protected community knowledge or medical information in localStorage.

## Content Security Policy
The Hall keeps `connect-src 'none'`, preventing background network calls from the page.

External sources open only when the learner explicitly follows a link.
