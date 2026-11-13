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
| 02 | AWS and Cloud Computing | 29 | 29 |
| 03 | AI and Machine Learning | 62 | 8 |
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

**Current committed narration: 47 of 349 visual scenes across nine topic-based videos.** M00 Part 01, M01 Part 01, M02 Parts 01–05, and M03 Parts 01–02. These figures describe authored scripts and workflows, not independently confirmed MP4 publication.

## Committed pilot lectures

| Module / part | Original slides | Teaching concept | Narration JSON | GitHub Action |
| --- | --- | --- | --- | --- |
| 00 / 01 | 01–04 | Course learning path, business decision and certification orientation | `content/video-narration/aif-module-00-part-01.json` | `.github/workflows/render-aif-m00-part-01.yml` |
| 01 / 01 | 01–06 | What AI means, training/inference, history, use cases, document workflow and GenAI categories | `content/video-narration/aif-module-01-part-01.json` | `.github/workflows/render-aif-m01-part-01.yml` |
| 02 / 01 | 01–06 | Website requests, networking, servers, traditional data centers and why cloud exists | `content/video-narration/aif-module-02-part-01.json` | `.github/workflows/render-aif-m02-part-01.yml` |

| 02 / 02 | 07–13 | What cloud computing is and business benefits | `content/video-narration/aif-module-02-part-02.json` | `.github/workflows/render-aif-m02-part-02.yml` |
| 02 / 03 | 14–17 | Cloud service models and pricing | `content/video-narration/aif-module-02-part-03.json` | `.github/workflows/render-aif-m02-part-03.yml` |
| 02 / 04 | 18–25 | AWS global infrastructure, Regions, AZs and edge locations | `content/video-narration/aif-module-02-part-04.json` | `.github/workflows/render-aif-m02-part-04.yml` |
| 02 / 05 | 26–29 | Console, shared responsibility, safe use and budget planning | `content/video-narration/aif-module-02-part-05.json` | `.github/workflows/render-aif-m02-part-05.yml` |

| 03 / 01 | 01–05 | AI scope, practical use cases, solution layers and rule-based decisions | `content/video-narration/aif-module-03-part-01.json` | `.github/workflows/render-aif-m03-part-01.yml` |
| 03 / 02 | 06–08 | Deep learning, neural network layers and digit recognition | `content/video-narration/aif-module-03-part-02.json` | `.github/workflows/render-aif-m03-part-02.yml` |

## Completed Module 02 teaching units — original visuals inspected
1. Slides 07–13 — Cloud computing, deployment types, essential characteristics and business benefits — Part 02.
2. Slides 14–17 — IaaS, PaaS, SaaS, shared management and pricing — Part 03.
3. Slides 18–25 — AWS history, workloads, Region/AZ architecture and edge caching — Part 04.
4. Slides 26–29 — Console navigation, shared responsibility, responsible use and budget safety — Part 05.

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
- **Not yet independently verified:** successful GitHub Actions completion, R2 MP4/manifest presence and live website deployment. Nine narration/render workflows are configured; this is **not** a claim of nine completed MP4s. The user previously indicated reviewing the first video, so at least one player experience has been observed by the user, but this session cannot confirm how many of all nine are currently published. The live course API was inaccessible to the checking tools. The AIF player now displays the real, API-verified `ready` count for each module. 
- **Playback fix:** `app/api/aif-video/route.ts` now verifies each part against its `firstSlide` rather than incorrectly assuming all parts start with slide 1. This is essential for Parts 02–05 to become playable after publication.
- Module 02 is fully narrated. Module 03's first eight original images have been inspected and narrated in two teaching units. Continue Module 03 from slide 09 onward, following each original image; do not infer content from lesson titles.

## Progress checkpoint — November 13, 2026 (latest)

- **11 AIF lectures configured** across Modules 00–03: Module 00 has 1, Module 01 has 1, Module 02 has 5, and Module 03 has 4. This is the number of committed narration + rendering workflow pairs, **not** an independently verified count of R2 MP4 renders.
- **57 original slides covered by narration**: 4 in M00, 6 in M01, 29 in M02, and 18 in M03. The next untouched lesson is M03 slide 19, on supervised machine learning.
- Module 03 Part 03 (slides 09–14): generative AI, attention, diffusion, multimodal models and architecture families; narration `content/video-narration/aif-module-03-part-03.json`; renderer `.github/workflows/render-aif-m03-part-03.yml`.
- Module 03 Part 04 (slides 15–18): training data, labels, structured and unstructured information; narration `content/video-narration/aif-module-03-part-04.json`; renderer `.github/workflows/render-aif-m03-part-04.yml`.
- All eleven parts are represented in `app/api/aif-video/route.ts` and `app/components/AifVideoLectures.tsx`; shared play/pause, ±5-second, caption, speed, next/previous and fullscreen controls remain standard.
- Fixed Module 03 Part 02 workflow's incorrect `part-01.json` trigger. Future modifications to Part 02 will now trigger Part 02 rendering as intended.
- **Published-media count remains unverified**: neither live course API nor Cloudflare R2 MP4/manifest checks were available to this session. Do not report eleven rendered or uploaded videos without observing their actual R2 assets or completed GitHub job logs.

## Progress checkpoint — November 13, 2026 (Module 03 Parts 05–06)

- Reviewed original local Module 03 WebP visuals individually for slides 19–24, including the numeric house-price examples, spam classification, k-NN diagram, training/validation/test split, and feature engineering leakage safeguards.
- Added two topic-first beginner narration manifests: Part 05 slides 19–21 (supervised learning, regression, classification) and Part 06 slides 22–24 (dataset splitting, feature engineering, target leakage).
- Both parts use the shared approved voice en-US-AndrewNeural at -3%, visual-order walkthroughs, familiar examples, decision checks, exact scene numbering, and independent R2 media prefixes.
- Added push-triggered audited render/publish workflows and the matching API / AIF left-playlist entries. The existing player remains shared with AIP.
- GitHub Actions runs were observed **in_progress** during this update: Part 05 run 43398950789 and Part 06 run 43398955504. MP4 and R2 manifest publication are **not yet verified**; do not count them as ready until completed and confirmed.
- Current authored coverage: **63 of 349 slides across 13 configured lectures**. The next unreviewed AIF visual is Module 03 slide 25.

## Progress checkpoint — November 13, 2026 (Module 03 Parts 07–09)

- **Three sequential, topic-complete AIF lectures** were authored after visually reviewing all original WebP slides 25–36 (12 scenes). Narrations explain on-screen diagrams, exact examples, labels, numerical values and decision cues with the approved AIF beginner-first standard; voice en-US-AndrewNeural at -3%.
- Part 07: slides **25–29**, unstructured feature vectors; unsupervised learning; clustering customer segments; transaction association rules; anomaly detection and investigation.
- Part 08: slides **30–32**, small labeled and large unlabeled datasets, pseudo-label risks, masked words and self-supervised pretext tasks.
- Part 09: slides **33–36**, agent/state/action/reward/policy loop; maze rewards of -1, -10 and +100; exploration versus exploitation and cumulative rewards.
- Narration manifests: `content/video-narration/aif-module-03-part-07.json` through `part-09.json`; audited push-triggered workflows: `.github/workflows/render-aif-m03-part-07.yml` through `part-09.yml`. API and AIF left playlist include all three lessons with status gated on R2 manifests and MP4s.
- Observed GitHub Actions **in progress**: Part 07 run 43401529092, Part 08 run 43401534066, Part 09 run 43401539391. Do not count as published until actual R2 manifest and MP4 are confirmed.
- Cumulative authored AIF coverage is now **75/349 slides and 16 configured lectures**. Next untouched original is Module 03 slide 37. Module 03 Parts 05–06 workflows have completed successfully.

## Progress checkpoint — November 13, 2026 (Module 03 Parts 10–12)

- The original numbered WebPs **37–45** were individually inspected against the approved visual-first standard. Slides 46–48 were also reviewed to establish the next natural lesson boundary (classification confusion matrices).
- Added **three topic-based beginner narration manifests**: Part 10 slide 37 (RL applications and safety), Part 11 slides 38–40 (RLHF, human preferences and factual grounding), and Part 12 slides 41–45 (underfitting, overfitting, bias, variance and generalization).
- Narration follows on-screen visual order with examples and comprehension decisions, uses en-US-AndrewNeural at -3%, and preserves each exact original image title. Part 10's single slide is a deliberate continuation of the RL topic rather than arbitrary chunking.
- Push-triggered audit, render and Cloudflare R2 workflows were committed as `.github/workflows/render-aif-m03-part-10.yml` through `part-12.yml`. AIF API revision mapping and left-side player playlist include all three parts.
- GitHub render jobs observed **in_progress**: Part 10 run 43408302139, Part 11 run 43408306556, Part 12 run 43408316114. Do not call them published until verified MP4 and R2 manifests are present.
- Parts 07–09 from the prior batch all show completed GitHub workflow **success**; live player availability should still be verified separately.
- **Cumulative authored coverage: 84 of 349 AIF slides across 19 configured lectures.** Next untouched narration begins at Module 03 **slide 46**, with evaluation and confusion matrices.

## Progress checkpoint — November 13, 2026 (Module 03 Parts 13–15)

- Three topic-complete lectures now cover **slides 46–53**, based on individually inspected original AIF diagrams. Narration manifests and video workflows reside at `content/video-narration/aif-module-03-part-13.json` through `part-15.json`, and `.github/workflows/render-aif-m03-part-13.yml` through `part-15.yml`.
- Part 13 slides **46–49**: spam confusion matrices, true/false positives and negatives, precision, recall, F1, accuracy, multiclass evaluation and fraud ROC-AUC. Part 14 slides **50–51**: school-score regression errors, MAE, MAPE, RMSE and R-squared. Part 15 slides **52–53**: real-time, batch, asynchronous, serverless and edge inference.
- Preserve the original diagram order, numerical examples, comprehensible definitions and practical exam-style decision checks. Voice stays `en-US-AndrewNeural` at `-3%`. Standard AIP-style left playlist, shared player, captions and navigation remain in use.
- Registered all three revisions in the R2-verified AIF API and Module 03 playlist. Rendering workflow success and published media availability must still be verified independently.
- Previous Parts 10–12 completed successfully. Total configured coverage is **92/349 original slides, 22 lectures**. Next untouched narration begins at Module 03 slide **54** (ML lifecycle).
