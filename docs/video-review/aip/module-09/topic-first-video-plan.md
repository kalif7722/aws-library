# AIP Module 09 — topic-first narrated video plan

Source of truth: original R2 `aws-genai-course-visuals/module-09/slide-NN.webp` (26 slides).
**Status:** provisional section boundaries based on inventory only. Do not render until source-image audit verifies all titles, content and slide order.

| Part | Source slides | Coherent instructional section |
|---|---|---|
| 01 | 01–03 | Athena: serverless SQL on S3, query architecture and use cases |
| 02 | 04–07 | Amazon EMR: clusters, sizing/use patterns and supported processing frameworks |
| 03 | 08–12 | Amazon QuickSight: BI architecture, sources, SPICE, use cases and anti-patterns |
| 04 | 13–19 | QuickSight access and connectivity: security boundaries, cross-account and cross-Region data access, user management |
| 05 | 20–22 | Kinesis Data Streams: shards, retention, replay and capacity modes |
| 06 | 23–26 | Amazon MSK: Kafka fundamentals, comparison with Kinesis and consumer patterns |

## Required QA gates

1. Read original R2 numbered images and spatial audit `visual-ocr-01-13.json` plus `visual-ocr-14-26.json`; adjust boundaries when the actual content suggests a better sequence.
2. Narrate real arrows, service connections, tables, examples, security constraints and numerical values without guessing unverified details.
3. Explain how each service works, why it was selected, operational trade-offs, and exam-relevant distinctions. Avoid repeatedly restating the slide title.
4. Prefer complete teaching sections over fixed slide counts; labs and console walkthroughs can be separate parts.
5. Use new module-09 TTS cache namespace, register the matching R2 manifest revision and exact chapter order. Never reuse Module 08 audio.
6. Before publication, validate slide source availability, scene order, generated MP4 duration, VTT, manifest and R2 object presence; avoid outdated-manifest mismatch seen in Module 08 Videos 07–09.
7. Wire `AIP_VIDEO_PARTS["09"]`, course availability API, captions, and module page. The module-page video section must derive visibility from the catalog, not hardcode supported module IDs.
8. Only display **ready** after the API confirms the uploaded manifest matches the catalog's revision and slide range.
