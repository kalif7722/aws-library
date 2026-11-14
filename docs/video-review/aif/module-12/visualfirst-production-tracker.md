# AIF-C01 Module 12 — VisualFirst narrated video production

## Preparation completed

- **52/52 original Module 12 WebP slides individually visually inspected**, including the actual boxes, architecture arrows, codes, worked examples and exception branches.
- **52/52 slide-specific scripts completed** in **10 topic-first video parts**, not a forced fixed slide count.
- Each narration scene has a brief `visual_overview`, ordered `visual_walkthrough` anchors, a reviewed `visual_example`, a `visual_synthesis` and a full `narration` that teaches those visual details.
- Source of truth: `public/course-visuals/aif-course/module-12/slide-NN.webp` and `app/courses/aws-ai-practitioner/visual-lesson-map.json`.
- Voice: `en-US-AndrewNeural`, rate `-3%`. New revision-specific synthesis and synchronized MP4, VTT, SRT, transcript and machine-readable manifest.
- *Script preparation and GitHub source publication are not video-render completion.* Confirm successful workflow, verified R2 object uploads and manifest readiness before reporting videos available.

## 10 approved narration parts

| Part | Original slides | Coherent teaching topic | Narration manifest |
| --- | --- | --- | --- |
| 01 | 01–05 | IAM identities, policies, permissions and service roles | `content/video-narration/aif-module-12-part-01.json` |
| 02 | 06–10 | S3 buckets, objects, keys and versioning | `content/video-narration/aif-module-12-part-02.json` |
| 03 | 11–13 | Storage-class selection, durability and availability | `content/video-narration/aif-module-12-part-03.json` |
| 04 | 14–18 | IA and Glacier classes, Intelligent-Tiering and pricing | `content/video-narration/aif-module-12-part-04.json` |
| 05 | 19–22 | EC2 sizing, serving, user data and launching | `content/video-narration/aif-module-12-part-05.json` |
| 06 | 23–28 | Lambda, runtime choices, image events, schedules and pricing | `content/video-narration/aif-module-12-part-06.json` |
| 07 | 29–33 | Macie, Config and Inspector | `content/video-narration/aif-module-12-part-07.json` |
| 08 | 34–40 | CloudTrail, Artifact, Audit Manager and Trusted Advisor | `content/video-narration/aif-module-12-part-08.json` |
| 09 | 41–45 | VPC networking, private inference, NAT and PrivateLink | `content/video-narration/aif-module-12-part-09.json` |
| 10 | 46–52 | Bedrock controls, KMS, SageMaker private connectivity and auditing | `content/video-narration/aif-module-12-part-10.json` |

## Render and distribution

- Parts **01–02** use `.github/workflows/render-aif-m12-parts-01-02.yml` and are triggered only by their own two narration JSON files; unrelated new parts must not cause re-rendering.
- Parts **03–10** use `.github/workflows/render-aif-m12-parts-03-10.yml`. Its source audit validates Module **12** with **52/52** original slides and runs eight matrix jobs at maximum two concurrent jobs.
- Both workflows require module/part ID, voice revision, continuous original slide order, narration completeness and original-image preflight **before** any synthesis. Run `python scripts/validate_aif_video_workflow.py --all` as lightweight CI for module reference mistakes.
- R2 publication prefix is `aws-course-videos/previews/aif/module-12/part-NN/`. Files are accessible in the site through R2 manifest and `app/api/aif-video/route.ts` without per-video site commits.
- UI catalog `app/components/AifVideoLectures.tsx` includes all ten parts and the standard course player with caption and chapter controls.
- Do not add unrelated slide visuals or revise the images as part of narration.

## Narration teaching quality

For every individual slide: (1) orient learner on *what the entire diagram is about*; (2) point to the actual main panels/arrows/branches and explain their mechanisms and order; (3) teach the original worked example, labels and decision; (4) synthesize the overall picture. Prioritize important source visuals over unrelated anecdotes, and do not skip exclusions, IAM limits, route/endpoint differences, cost floors, security boundaries or the audit scope.
