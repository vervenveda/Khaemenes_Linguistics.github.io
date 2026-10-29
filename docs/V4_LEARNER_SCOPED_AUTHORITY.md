# Five-Language Academy · Learner-Scoped V4 Authority

**Version:** 1  
**Purpose:** prevent multiple students on the same browser/device from sharing one formal V4 course record.

## Previous condition

The V4 Hall historically stored all formal progress in one key:

`arshif.languageHall.v4`

The learner name was a field inside that object. Changing the name therefore did not create a separate transcript.

## New storage architecture

The original key is preserved as a **legacy shared V4 record**.

Named records use:

`arshif.languageHall.v4.learner:<learner-id>`

Supporting keys:

- active learner: `arshif.languageHall.v4.activeLearner`
- learner registry: `arshif.languageHall.v4.learners`

No existing shared V4 record is automatically renamed, merged or deleted.

## Explicit legacy assignment

A learner may explicitly copy the preserved shared V4 record into a new named record.

The operation must:

1. require a non-empty learner name;
2. refuse to overwrite an existing named record;
3. clone rather than move the shared record;
4. preserve the original `arshif.languageHall.v4` key;
5. record that the learner copy came from an explicit legacy assignment;
6. activate the new named record only after the copy succeeds.

## New learner records

Opening a new learner creates a fresh V4 record with no copied formal course mastery. Navigation context may be retained by the Hall interface, but course evidence starts empty.

## Profile identity rule

The learner name is now a record selector/identity, not a free-form rename of the current transcript.

Home/heritage language and teacher/mentor remain editable profile details inside the active learner record.

## Clearing

Clear operations apply only to the current record:

- clearing a named learner record does not delete the legacy shared V4 record or another learner;
- clearing the legacy record does not delete named learner records;
- V3 remains a separate preserved key.

## Authority Bridge relationship

French/German Authority Bridge v1 may display review-only evidence only when the Hall has a matching **named** learner record.

This learner-scoped authority layer is a prerequisite for any future Bridge v2 acceptance workflow, but it does not itself authorize automatic evidence acceptance.

## Safety invariants

- no automatic migration from shared V4 to named V4;
- no named-record overwrite during legacy assignment;
- no cross-learner course sharing;
- no clearing another learner while one learner is active;
- no deletion of V3 during V4 learner operations;
- existing course completion remains unchanged inside the record where it already exists.
