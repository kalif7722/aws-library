# AIF-C01 Module 12 — visual-introduced VisualFirst video production

## Source and scope

- Course: AWS Certified AI Practitioner (AIF-C01), Module 12 — AWS Security and Supporting Services.
- Authoritative images: `public/course-visuals/aif-course/module-12/slide-NN.webp`, **52** slides in the course lesson map.
- Narration standard: `docs/video-review/aif/beginner-first-visual-narration-standard.md`, especially **Visual-to-voice sequence**.
- Mandatory narration for each slide: (1) purpose/overall visual; (2) pictured panels, arrows, branching decisions and labels in meaningful order; (3) the **actual visible** worked example; (4) explain how the complete picture works, including meaningful risks or constraints.
- Keep natural pace, `en-US-AndrewNeural`, rate `-3%`, and fresh version-matched voice, captions, transcript and chapters. Do not skip important elements for a length quota.

## Reviewed and committed image-grounded lectures

| Video | Original images individually reviewed | Whole learning topic | Script and revision |
| --- | --- | --- | --- |
| 01 | **01–05**, all originals inspected at full resolution | IAM root, user/group permissions, denies, inheritance, policy JSON and temporary service roles | `content/video-narration/aif-module-12-part-01.json`, `2026-11-14-aif-m12-p01-original-webp-visualintro-v1` |
| 02 | **06–10**, all originals inspected at full resolution | S3 object storage, common uses, buckets, object keys, metadata, tags and versioning | `content/video-narration/aif-module-12-part-02.json`, `2026-11-14-aif-m12-p02-original-webp-visualintro-v1` |

These are **10 of 52** original slides. The next 42 have not been narrated or claimed complete.

## Rendering and publication controls

- Current workflow: `.github/workflows/render-aif-m12-parts-01-02.yml` — original-image audit for Module **12**, **52/52** source inventory, YAML/module ID guard, exact narration IDs and consecutive ranges, and publish only verified outputs to R2.
- Fail-fast checker: `scripts/validate_aif_video_workflow.py --workflow .github/workflows/render-aif-m12-parts-01-02.yml`, before dependency installation and synthesis.
- Automated repo-wide check: `python scripts/validate_aif_video_workflow.py --all`.
- R2 output prefix: `aws-course-videos/previews/aif/module-12/part-NN/`.
- Video player: `app/components/AifVideoLectures.tsx`; API: `app/api/aif-video/route.ts`. The published R2 manifest plus MP4 makes lectures available automatically, independently of a per-part site commit.
- GitHub commit of scripts/workflow is **not** proof that audio/video or R2 publication succeeded. Confirm completed render job, MP4, VTT, SRT, transcript and manifest before reporting ready.

## Next work: provisional source-audit queues

1. Slides **11–18**: S3 storage classes, durability, availability, pricing — inspect every slide before choosing lecture boundaries and narrating.
2. Slides **19–28**: EC2 selection/launch and event-driven Lambda — regroup by actual diagrams and worked examples.
3. Slides **29–40**: AWS governance, monitoring, vulnerability and compliance services — explain service differences using slide comparisons.
4. Slides **41–52**: VPC routes/endpoints, service recaps, Bedrock and SageMaker private access/audit — preserve actual topology and every trust boundary.

These are only **audit queues**, not fixed five-slide groups or approved video segments. After original WebP inspection, split by complete topics; enforce contiguous slide coverage within each rendering batch. Do not silently narrate from lesson-map notes alone or jump ahead without image review.
