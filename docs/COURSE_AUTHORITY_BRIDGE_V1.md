# Course Authority Evidence Bridge · Version 1

## Purpose

The Linguistics repository contains rich language-specific learner experiences alongside the formal Five-Language Academy V4 authority. The bridge allows a language-specific experience to **summarize learner evidence for formal review** without becoming a second official transcript.

## Non-negotiable rule

> Bridge evidence is review evidence, not mastery.

Version 1 is deliberately non-destructive.

It must never:

- write to `arshif.languageHall.v4`;
- mark V4 units complete;
- mark competencies Secure;
- mark performance tasks reviewed;
- set V4 midterm or final scores;
- write a V4 capstone;
- mark V4 portfolio review complete;
- set `complete=true`;
- change language-course unlocks;
- downgrade or erase an existing record.

## Storage

Bridge summaries use a separate learner-scoped namespace:

`khaemenes.courseAuthorityBridge.v1:<course-id>:<learner-record-id>`

Named learners are required. Anonymous/shared-device records are not eligible for bridge preparation because attribution is ambiguous.

## French 101 bridge

Source learner experience:

`apps/French_101_index.html`

Summary surface:

`apps/maitrise-constellation/index.html`

Target authority:

`Halls/index.html?language=french&course=101`

The bridge summarizes:

- 12-level completion;
- per-level quiz percentage where stored;
- count of quizzes meeting the Academy 80% threshold;
- Unit 01 checkpoint status where available;
- final-exam percentage;
- writing-presence count;
- practice-attempt count;
- existence of parent/teacher notes;
- whether any source record explicitly claims independently certified oral proficiency.

A complete standalone French record may be **ready for human review**, but Version 1 does not assert that it is formally equivalent to all V4 unit, competency, performance-task, midterm, final and capstone requirements.

## German bridge

Source learner ecosystem:

- German Hub
- German Coach
- German reader
- German Sound Laboratory
- German conversation world
- German mastery constellation

Target authority:

`Halls/index.html?language=german`

German evidence is classified as **supplemental course evidence** because the Coach/studios are not one-to-one equivalents of a specific V4 German course.

The bridge summarizes:

- Coach days completed;
- quiz record count and best percentage;
- examination record count and best percentage;
- whether examination evidence meets the Academy 80% threshold;
- reading attempts;
- writing-draft presence;
- sound-lab attempts;
- conversation attempts and missions;
- existence of parent/teacher notes.

Older German Coach records may have used a local 70% pass threshold. The bridge **does not inherit that threshold**. It separately reports whether recorded exam evidence reaches the Academy-wide 80% threshold.

## V4 Hall behavior

The Hall receives a **read-only bridge panel** for a matching named learner.

The panel may:

- show that a bridge package exists;
- summarize its evidence;
- export the bridge JSON for review.

The panel may not change `courseReady()` or any V4 course field.

## Privacy

Bridge records copy **summary evidence only**. They do not copy:

- written learner responses;
- quiz answer details;
- exam answer details;
- recordings;
- private URLs.

## Future Version 2 gate

A future bridge may support teacher-reviewed acceptance into specific V4 evidence slots only after:

1. V4 has a safe learner-scoped record model;
2. evidence-to-competency mappings are explicit;
3. review actions are explicitly attributed by reviewer role, while allowing Parent and Teacher to be the same person and allowing self-review for self-directed adults where independent attestation is not explicitly required;
4. existing V4 completion can never be downgraded;
5. export/recovery exists before migration;
6. two-learner shared-device regression passes;
7. every accepted mapping has an audit trail.

### Reviewer-role principle

Khaemenes is a free online educational platform and does not treat review as a privileged-account function.

A reviewer may be a Parent, Teacher, Homeschool Parent/Teacher, Mentor, Self-Directed Adult, or another local reviewer. One person may hold more than one of those roles. The purpose of reviewer metadata is to make the evidence trail clear, not to create an institutional gate.

Independent third-party review should be required only when a specific assessment explicitly says it needs independent attestation.

Until those gates are satisfied, bridge evidence remains review-only.
