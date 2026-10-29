# V4 Learner Backup & Recovery

## Purpose

Formal Five-Language Academy V4 records are learner-scoped. Backup and restore must therefore preserve **learner identity** as carefully as grades and course completion.

## Restore-capable backup format

Only the dedicated learner backup format is restore-capable:

`khaemenes-five-language-v4-learner-backup-v1`

A backup contains:

- learner ID;
- learner label;
- export timestamp;
- the complete active learner V4 record;
- learner-scope metadata.

The older generic `arshif-language-hall-v4` JSON export remains useful as an archival/report snapshot, but it is **not accepted for restoration**.

## Named learner requirement

Backup creation and restoration require a named learner record.

The legacy shared V4 record cannot be restored through the learner import flow.

## Validation before restore

Before the Restore button is enabled, the Hall validates:

1. backup format and version;
2. learner label;
3. learner ID derived from the label;
4. record-scope identity;
5. profile learner identity;
6. expected object structure;
7. bounded course/foundation/favorite/note counts;
8. notebook size;
9. unsafe object keys;
10. file size (2 MB maximum in the Hall UI).

A backup for one learner cannot restore into another active learner.

## Pre-restore recovery

Immediately before a validated restore replaces a named learner record, the current record is saved locally under a separate recovery namespace.

Up to three recent pre-restore snapshots are retained per learner.

The Hall exposes **Undo Last Restore** to recover the most recent pre-import version.

## Isolation guarantees

Restoring or undoing one learner must not modify:

- another named V4 learner;
- the preserved legacy shared V4 record;
- V3;
- French/German standalone source records;
- Authority Bridge evidence packages.

## Confirmation rule

Selecting and validating a file does not modify progress.

A restore requires a separate explicit confirmation.

## Recovery limitation

Recovery snapshots are browser-local. Clearing browser storage or moving to another device removes those local recovery snapshots. Downloaded learner backup JSON is the portable recovery mechanism.
