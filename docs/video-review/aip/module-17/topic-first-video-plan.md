# AIP Module 17 — Source-gated topic-first video production

## Source verification
- Original evidence: `aws-genai-course-visuals/module-17/slide-NN.webp` in Cloudflare R2.
- Audit workflow: `.github/workflows/audit-aip-m17-visuals-01-20.yml`.
- Expected audit result: `docs/video-review/aip/module-17/visual-ocr-01-20.json`.
- **Status:** Audit workflow committed; the result must be read and all 20 original slide headings/diagrams checked before writing or rendering final scripts.
- The legacy lesson map assigns source PDF pages 630–649; its titles are provisional and may not match the original visuals.

## Provisional topic boundaries — validate against R2
1. EBS block storage architecture, volumes, Availability Zones and lifecycle (legacy slides 01–05).
2. EFS shared file storage, workloads, performance and storage classes (legacy slides 06–09).
3. EBS versus EFS decisions and GenAI production architecture (legacy slides 10–13).
4. Choosing vector stores, cost, permissions and OpenSearch deployment models (legacy slides 14–17).
5. Orchestration decisions, internal legal Q&A and customer-facing chatbot examples (legacy slides 18–20).

Boundaries may change after the original-image audit. Keep a complete teaching concept together; never split to reach a five-slide quota. The R2-original slide captions, diagrams, labels, examples and console steps override all old lesson-map metadata.

## Automatically executable gates
- A GitHub source audit verifies actual images and records a spatial transcript with exact consecutive slide numbers, dimensions, and source status.
- Narration assets must be based on reviewed originals, using `docs/video-review/aip/visual-first-narration-standard.md`; the source audit alone is not a substitute for visual review.
- On committing audited scripts, GitHub Actions may render without another approval, but must validate that `module_id == "17"`, that the complete audit passes, all scene slide numbers match their video segment, and every script revision matches workflow and player expectations.
- Preserve en-US-AndrewNeural, -3% speech rate, MP4, SRT, WebVTT, transcript, chapter ordering and manifest, with R2 upload and independent MP4/manifest checks.
- Never claim publication until live R2 assets pass verification. Unavailable originals block inaccurate narration and synthesis rather than allowing inferred titles.
