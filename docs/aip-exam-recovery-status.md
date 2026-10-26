# AIP exam preparation recovery

Recovered 75 original explanation images and 38 original revision images from the saved archives. The question manifest was matched byte-for-byte to the user-supplied copy; every mapped WebP was checked for existence and format.

The missing question bank and interface were rebuilt, not recovered verbatim. There are 75 original authored scenarios, including 8 multiple-response questions. Domain allocation: 23 / 20 / 15 / 9 / 8. Every question retains its manifest ID, concept, module association, and image path.

Practice includes per-question checks and explanation images. Exam includes a 180-minute absolute deadline, flags, navigation, automatic expiry, submission, and domain results. Attempts persist in browser local storage. All 75 items are equally scored; this is not AWS scaled scoring or a prediction of certification success.

Validation: seven automated tests passed; production build passed. Browser preview could not launch because the preview environment reported `vite: not found`; browser interaction QA is not verified for this rebuild.

Existing lab edits are excluded. Release is based on repository commit c9ec3eefaddcbafdceb76fe42cbf86e6f26e0692.

Official references checked 2026-10-26:

- https://aws.amazon.com/certification/certified-generative-ai-developer-professional/
- https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/agents-action-add.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/agents-create.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html

Deployment must use kalif7722/aws-library and its existing Cloudflare pipeline. The legacy `.openai/hosting.json` points to a different Sites source; do not deploy this course through that unrelated source.
