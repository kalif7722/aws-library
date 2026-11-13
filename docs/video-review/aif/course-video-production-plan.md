# AIF-C01 Beginner Visual Video Course — Production Tracker

## Approved educational contract
- **Audience:** College graduates, beginners and non-technical learners with no assumed background in cloud computing, programming, AI or AWS.
- **Primary policy:** `docs/video-review/aif/beginner-first-visual-narration-standard.md`.
- **General production policy:** `docs/video-review/aip/visual-first-narration-standard.md` (visual reading order, full teaching topics, natural pacing, image-first source audit, MP4 + captions + transcript).
- Narrate every actual on-screen label, arrow, architecture and worked example where relevant. Define unfamiliar terms on first use; build from what the student already knows; teach why the concept matters; compare likely choices and risks.
- Use concrete everyday examples and short comprehension checks that explain the answer. Avoid assuming familiarity with servers, networking, APIs, databases, ML models or AWS acronyms.
- AIF original assets are **local reviewed WebPs** at `public/course-visuals/aif-course/module-NN/slide-MM.webp`. Do not use the AIP image URL or AIP lesson map. Course manifest: `app/courses/aws-ai-practitioner/visual-lesson-map.json`.
- Voice `en-US-AndrewNeural`, `-3%`. Segments have flexible content-driven length rather than fixed slide or minute counts.
- Automatic rendering needs prior source verification and committed image-grounded narration. No additional user confirmation between modules; failed audit prevents publication.

## Full course source inventory
The 2026-10-30 AIF audit reports **349/349 reviewed WebP lessons** across 15 modules. That is a visual-teaching audit, not evidence that 349 video scenes have been narrated or published.

| Module | Subject | Total visuals | Current narrated scenes |
| --- | --- | ---: | ---: |
| 00 | Course Introduction | 4 | 4 |
| 01 | Introduction to Artificial Intelligence | 6 | 6 |
| 02 | AWS and Cloud Computing | 29 | 6 |
| 03 | AI and Machine Learning | 62 | 0 |
| 04 | Generative AI and Amazon Bedrock | 20 | 0 |
| 05 | Model Customization, RAG and Agents | 28 | 0 |
| 06 | Prompt Engineering | 15 | 0 |
| 07 | Amazon Q and AI Assistants | 15 | 0 |
| 08 | AWS Managed AI Services | 29 | 0 |
| 09 | Amazon SageMaker AI | 36 | 0 |
| 10 | Responsible AI and Explainability | 16 | 0 |
| 11 | AI Governance, Compliance and MLOps | 23 | 0 |
| 12 | AWS Security and Supporting Services | 52 | 0 |
| 13 | Current Exam Guide Additions | 12 | 0 |
| 14 | Practice Exam | 2 | 0 |

**Current committed narration: 16 of 349 visual scenes.** M00 Part 01, M01 Part 01 and M02 Part 01. These scenes do not imply the related MP4s are already live.

## Committed pilot lectures

| Module / part | Original slides | Teaching concept | Narration JSON | GitHub Action |
| --- | --- | --- | --- | --- |
| 00 / 01 | 01–04 | Course learning path, business decision and certification orientation | `content/video-narration/aif-module-00-part-01.json` | `.github/workflows/render-aif-m00-part-01.yml` |
| 01 / 01 | 01–06 | What AI means, training/inference, history, use cases, document workflow and GenAI categories | `content/video-narration/aif-module-01-part-01.json` | `.github/workflows/render-aif-m01-part-01.yml` |
| 02 / 01 | 01–06 | Website requests, networking, servers, traditional data centers and why cloud exists | `content/video-narration/aif-module-02-part-01.json` | `.github/workflows/render-aif-m02-part-01.yml` |

## Module 02 suggested remaining teaching units (must inspect actual images)
1. Slides 07–13 — What cloud computing means, cloud deployment types, benefits, key characteristics and real business needs.
2. Slides 14–17 — IaaS vs PaaS vs SaaS, ownership boundaries, choosing service models and pricing.
3. Slides 18–25 — AWS evolution and global infrastructure; Region, Availability Zone and edge-location selection.
4. Slides 26–29 — AWS Console, shared responsibility, responsible use and safe learning budget.

The grouping above is provisional, not a five-slide quota. Original images and complete concepts determine final boundaries.

## Release architecture
- Source audit: `scripts/audit_aif_local_visuals.py --module NN`; validates every original local image against the manifest.
- Shared renderer: `scripts/render_aip_course_video.py` now accepts `course_slug:"aif"` and `output_prefix:"aif-module-NN-part-PP"` while leaving AIP source handling intact.
- R2 files: `aws-course-videos/previews/aif/module-NN/part-PP/aif-module-NN-part-PP.mp4`, `.vtt`, `.srt`, `-transcript.txt`, `-manifest.json`.
- API `app/api/aif-video/route.ts` checks matching script revision, slide headings/count, chapter timings and MP4 presence. Until verified, it responds `processing`.
- Player `app/components/AifVideoLectures.tsx` appears above the original AIF lessons on supported pages, displays status and supports subtitles, slide chapters, playback speed and progress resume.
- Existing `app/components/AifModuleLessons.tsx` retains the complete image gallery, lesson details and study tracking.
- Regression test: `tests/aif-video-lesson-mapping.test.mjs`.

## Publication status and next steps
- **GitHub source scripts, workflows and player mappings committed on main.**
- **Not yet verified:** successful GitHub Actions completion, R2 MP4/manifest presence and live website deployment. A committed workflow is not a completed render.
- Continue sequentially by visually reviewing original Module 02 slides 07–29, completing their topic-first lectures, and then Module 03. Do not automatically infer the unreviewed slide content from lesson names.
