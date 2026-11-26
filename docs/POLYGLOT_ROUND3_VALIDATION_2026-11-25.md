# Polyglot round 3 — validation recovery
Baseline: 50c8a7ab731da267aadb7b6e547bae020c0a06a1.
PR 18 merged as 23a5fc4; later translator-loader and vocabulary-review changes are included and not reverted.

Evidence: structural run 45681382500; rollout run 45679809387 (seven proposed modifications without filenames); four-grade French run 45672676933. Existing passing recorded runs are not full certification of the new revision.

Changes: reconcile bidirectional quiz selection, guarded French speech handlers, versioned translator script URL and French 101 six-module/18-week contract. Preserve generic stage templates. Correct Hall guide terminology without changing assessment logic. Retain the French III question 12 revised answer distinguishing correlation from causation and its draft-review status.

Rollout remains read-only in CI. Report proposed file paths and competing script tags instead of silently choosing one. Independent route and evidence validators run even if rollout drift fails. Versioned translator paths recognized in foundation validation. Actual rollout drift remains open until the new diagnostics identify affected files.

No learner migration, private cloud write, academic publication, STOS change or direct main commit. Full browser journey and cache migration remain outstanding.
