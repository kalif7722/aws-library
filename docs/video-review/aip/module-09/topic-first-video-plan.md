# AIP Module 09 — topic-first narrated video plan

Source of truth: original R2 `aws-genai-course-visuals/module-09/slide-NN.webp` (26 slides).
**Status:** source audits completed (26/26 slides). All seven topic-based narration scripts are written, registered and queued by two video render workflows. R2 publication is not yet confirmed.

| Video | Original slides | Verified complete teaching topic |
|---|---|---|
| 01 | 01–03 | GenAI analytics overview and Athena query/RAG use cases |
| 02 | 04–06 | Amazon EMR cluster architecture, usage models and distributed frameworks |
| 03 | 07–11 | QuickSight architecture, data access modes, GenAI dashboards and anti-patterns |
| 04 | 12–16 | QuickSight identity, resource policies, cross-Region, cross-account and row-level access |
| 05 | 17–20 | Kinesis stream architecture, retention and replay, capacity modes, real-time GenAI pipeline |
| 06 | 21–24 | Amazon MSK brokers, Kafka topics and groups, comparison with Kinesis, consumer patterns |
| 07 | 25–26 | Service selection guide and integrated analytics architecture |

## Required QA gates

1. Read original R2 numbered images and spatial audit `visual-ocr-01-13.json` plus `visual-ocr-14-26.json`; adjust boundaries when the actual content suggests a better sequence.
2. Narrate real arrows, service connections, tables, examples, security constraints and numerical values without guessing unverified details.
3. Explain how each service works, why it was selected, operational trade-offs, and exam-relevant distinctions. Avoid repeatedly restating the slide title.
4. Prefer complete teaching sections over fixed slide counts; labs and console walkthroughs can be separate parts.
5. Use new module-09 TTS cache namespace, register the matching R2 manifest revision and exact chapter order. Never reuse Module 08 audio.
6. Before publication, validate slide source availability, scene order, generated MP4 duration, VTT, manifest and R2 object presence; avoid outdated-manifest mismatch seen in Module 08 Videos 07–09.
7. Wire `AIP_VIDEO_PARTS["09"]`, course availability API, captions, and module page. The module-page video section must derive visibility from the catalog, not hardcode supported module IDs.
8. Only display **ready** after the API confirms the uploaded manifest matches the catalog's revision and slide range.
