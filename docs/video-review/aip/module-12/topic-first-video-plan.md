# AIP Module 12 — original R2 video plan and current status

## Source of truth
Original numbered R2 visuals: `aws-genai-course-visuals/module-12/slide-NN.webp` (18 entries in the older course map).
Confirmed spatial audit results: slides **01–09**, **12–13**, and **14–18**. Slides **10–11** have not produced an accessible audit report; a diagnostic workflow `.github/workflows/audit-aip-m12-visuals-10-11.yml` now commits status even when the R2 images are unavailable.

## Topic-based videos
| Part | Slides | Topic | Status |
|---|---|---|---|
| 01 | 01–05 | CDK/SAM, local Lambda testing, scientific image-analysis application | Narrated, registered, render configured |
| 02 | 06–07 | Human/workload identity, AWS CLI and SDK access | Narrated, registered, render configured |
| 03 | 08 | CloudFormation lifecycle and stack safety | Narrated, registered, render configured |
| 04 | 09 | CodeArtifact dependency flow | Narrated, registered, render configured |
| 05 | 10–13 | **Pending original-image verification for slides 10–11**; slides 12–13 cover temporary credentials, CLI profiles and SDK resolution | Hold: do not generate or publish inaccurate lesson |
| 06 | 14–16 | CloudFormation dependencies, change sets, retention, drift and visual IaC | Narrated, registered, render configured |
| 07 | 17–18 | CodeArtifact cross-account authorization and safe package validation | Narrated, registered, render configured |

All scripts are based on verified R2 slide content, not the legacy lesson-map titles. Preserve correct slide sequence even if part 05 needs to be split after source verification.

## Publication safeguards
- All current render workflows have Module 12 ID checks, fresh TTS caches, expected chapter order, R2 uploads and MP4/manifest HEAD checks.
- An R2 MP4 is not enough to make the player ready: the manuscript revision, first title, slide order and asset presence must match the API config.
- Do not claim end-to-end completion until source slides 10–11 are verified, narrated, mapped and rendered.
