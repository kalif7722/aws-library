# AIF Module 14: approved scenario exam and visual explanations

## Scope and verified status

Module 14 now uses the user-approved 65-question scenario bank. The standalone revision section remains removed. Every question has one independently generated explanation visual, reviewed against its approved answer and rationale, with competing choices explained. All 65 production assets are 2048×1152 WebP at quality 94. The original questions, source-page/course mappings and briefs are preserved in `aif-exam-approved-question-review.json`; prompts and corrections are in `aif-exam-explanation-prompts.json`.

This completes the approved replacement exam and explanation-image work. It does not represent a new audit of Modules 01–13; their previously verified teaching content was unchanged and skipped. Concurrent SAP course work was preserved.

## Corrections during image review

- Managed model APIs: narrowed provider duties to infrastructure; retained customer data, IAM, application controls and model-version decisions.
- Agent frameworks: scoped the managed-runtime requirement to this team's scenario; self-hosting remains possible.
- Few-shot prompting: replaced placeholder outputs with completed original examples; clarified that application history does not train weights.
- Prompt clarity: added the omitted model-memory distractor and retained external action authorization.
- Evaluation: corrected the suggestion that text similarity proves relevance or task success.
- Attribution: aligned the example with risk prediction and labeled feature influence illustrative and case-dependent.
- Provenance: required intended-use review without deciding a universal legal outcome.
- Macie: replaced an incorrect monitoring-style icon with a conceptual discovery illustration.
- Workload identities: acknowledged secret-store storage benefits while explaining shared long-lived identity risks.
- Private connectivity: removed claims that data/IAM policies stay inside a VPC; separated private connectivity, TLS and authorization.
- Asset validation caught three empty WebP encodings; atomic re-encoding and full decoding resolved them before release.

## Application behavior and checks

Practice explanations appear only after checking an answer. Exam explanations appear only after submission or deadline expiry. Fullscreen uses a body-level portal, keyboard focus trapping/restoration, Escape dismissal, fit view and native-size zoom/pan. A new saved-attempt version prevents old bank selections from being applied to the replacement questions. Course links and case context accompany questions.

The strict production validator requires all 65 reviewed assets, exact image hashes, question-content hashes, valid paths and 2048×1152 dimensions. An answer-change test verifies that previously reviewed visuals are invalidated by semantic question changes.

- All 65 WebPs fully decoded and passed the image/question binding validator.
- 12 selected tests passed: source-page coverage, lesson/module navigation, guide-task coverage, image progress, audit integrity, exam distribution/formats, exact scoring, deadline, asset binding, change invalidation and bounded course discovery.
- Repository `npm run build` passed with Azure, GCP and AIF validators and production server/client output.
- Final browser results are recorded in `aif-exam-browser-validation.json`; desktop fit, phone fit and phone zoom screenshots were inspected.

## Current official reference checks

The approved course/objective mapping remains recorded with each question. Additional service-boundary checks used these AWS primary references on 2026-10-30:

- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-distillation.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html
- https://docs.aws.amazon.com/macie/latest/user/data-classification.html
- https://docs.aws.amazon.com/macie/latest/user/discovery-supported-storage.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
- https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html
- https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html

These are original educational practice items and conceptual illustrations, not AWS-authored exam questions, exam dumps or copied commercial question-bank content. No claim is made that a raw simulator percentage predicts an AWS scaled score or guarantees exam success.
