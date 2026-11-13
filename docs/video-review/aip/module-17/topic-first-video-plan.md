# AIP Module 17 — Verified source-first video production

## Source and approval
- Original R2 audit: `docs/video-review/aip/module-17/visual-ocr-01-20.json`, all 20 source images status `ok`, 2048×1152.
- Original source: `aws-genai-course-visuals/module-17/slide-NN.webp`.
- Original WebP content and visual-heading sequence are authoritative over legacy PDF course map.
- Narration follows `docs/video-review/aip/visual-first-narration-standard.md`.
- Voice: `en-US-AndrewNeural`, speech rate `-3%`.

## Topic-first video plan and committed scripts

| Part | Slides | Topic | Narration |
| --- | --- | --- | --- |
| 01 | 01–05 | EBS block storage, AZ placement, performance, termination and snapshots | `content/video-narration/aip-module-17-part-01.json` |
| 02 | 06–10 | EFS, lifecycle, block/file/instance storage and pipeline storage | `content/video-narration/aip-module-17-part-02.json` |
| 03 | 11–13 | Production GenAI architecture, vector stores, managed vs serverless OpenSearch | `content/video-narration/aip-module-17-part-03.json` |
| 04 | 14–17 | Kendra, Aurora pgvector, Neptune Analytics, S3 Vectors | `content/video-narration/aip-module-17-part-04.json` |
| 05 | 18–20 | Step Functions, internal legal Q&A, customer chatbot | `content/video-narration/aip-module-17-part-05.json` |

## Release safeguards
- Automated renderer: `.github/workflows/render-aip-m17-parts-01-05.yml` (push-triggered + manual dispatch, no new confirmation required).
- Mandatory checks: audit completeness 20/20, module identity 17, scene sequence, narration density, revision ID, source availability, MP4 duration, VTT and transcript.
- Render MP4, SRT, WebVTT, transcript and R2 manifest. R2 upload and HEAD checks must succeed before calling a part published.
- Player and captions are mapped in `app/api/aip-video/route.ts`, `app/api/aip-video-captions/route.ts`, and `app/components/aipVideoCatalog.ts`.
- **Status:** Source audited and scripts/player/workflow committed. Actual successful R2 MP4 publication and live player playback are not yet independently verified.
