# AIF Module 14 — revision and practice implementation

Implemented on 2026-10-30, following the official AIF-C01 guide (revision 1.2, published 2026-10-29). The two original visual lessons remain intact. Their prior teaching audit did not mean that the planned simulator was implemented; this change completes that separate functionality.

## Content

- Five original domain revision summaries linked back to the AIF course.
- 65 independently authored foundational questions: domain counts 13, 16, 18, 9, 9. This approximates the official domain weightings for a 65-item study set.
- Single choice, multiple response, ordering and matching. Questions test business constraints, service selection, AI/ML and generative-AI concepts, evaluation, responsible use, and security/governance. They avoid implementation-heavy professional-level coding tasks.
- Explanations and official domain-objective links accompany every question. These are educational examples, not AWS-authored questions, exam dumps or copied course questions.

## Behavior

Practice mode has explicit answer checking and locks checked responses. The 90-minute exam hides explanations until manual submission or deadline expiry. Both modes support navigation and flagging. Answers and the absolute exam deadline persist in browser storage; closing the page does not pause the deadline. Start-over requires confirmation. Results include per-domain raw performance; unanswered questions receive no credit and multi-part questions require a completely correct response.

All 65 questions count in this simulator. The real exam's 50 scored and 15 unidentified unscored items are not simulated as hidden scoring rules. No raw-percentage pass threshold is presented as equivalent to AWS's scaled score.

## Sources and validation

- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-revisions.html
- Each question records the relevant official domain page. The existing course supplies the extended teaching context.
- Content/scoring/deadline tests plus existing AIF coverage and audit checks: 13 passed.
- Repository production build: passed, including required course/asset validators.
- Browser checks passed for single/multiple response, ordering and matching, checked-answer explanations, saved-attempt recovery, manual submission, hidden exam explanations, automatic submission after 90 minutes, and mobile horizontal containment. Desktop and mobile screenshots were inspected.
