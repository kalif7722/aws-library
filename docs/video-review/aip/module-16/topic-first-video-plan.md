# AIP Module 16 — Networking and Content Delivery: audited-video production plan

## Source of truth and state
- Original numbered R2 WebP images: `aws-genai-course-visuals/module-16/slide-NN.webp`.
- Source audit workflow: `.github/workflows/audit-aip-m16-visuals-01-18.yml`.
- Required source report: `docs/video-review/aip/module-16/visual-ocr-01-18.json`.
- **Current state:** Audit workflow committed. Do not write final narrations, map parts to the player, or initiate rendering until all 18 original slides pass verification and diagram content is inspected.
- Legacy lesson map has 18 entries (pages 612–629), but its titles must not override the headings and diagrams actually shown in R2.

## Tentative topic-first lecture sequence — subject to original slide review
1. CloudFront distribution, origin choices and S3 integration (legacy map 01–06).
2. Elastic Load Balancing fundamentals and ALB, NLB, GWLB selection (legacy map 07–10).
3. AWS Global Accelerator endpoint selection and CloudFront comparison (legacy map 11–13).
4. Route 53 DNS records, hosted zones and public/private scope (legacy map 14–18).

These boundaries are *provisional*, not fixed quotas. Repartition if the actual graphics require it. No slide may be skipped or duplicated.

## Approved narration and release controls
- Apply `docs/video-review/aip/visual-first-narration-standard.md` without requesting additional user confirmation.
- Narrate the original visual in a meaningful order, covering actual arrows, boundaries, labels, data and caveats.
- Use `en-US-AndrewNeural` at -3%. Avoid rigid introductory or closing formulas and invented numerical claims.
- On successful source audit, write complete natural narration for each original slide and group by full teaching topic.
- Rendering workflow must validate actual slide headings, module ID **16**, script revisions, consecutive chapter order, narration density, and the complete source audit before TTS.
- Render and verify MP4, WebVTT, SRT, transcript and manifest; upload to R2 only after checks. Enable player mappings only for the matching revision.
- R2 manifest + MP4 readiness is authoritative; committed workflow is not proof of successful publication.
- Audit-to-render is fully automated only **after reviewed narration assets are committed**; original-image interpretation and narration writing are not safely replaced by blind OCR or legacy-map scripting.
