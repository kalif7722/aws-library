# AIP Module 10 — topic-based lecture plan

Source: original numbered R2 visuals `aws-genai-course-visuals/module-10/slide-NN.webp` (17 expected slides).

**Audit status:** Automated original-image spatial audit is configured in `.github/workflows/audit-aip-m10-visuals-01-17.yml`. Final scene boundaries, titles and technical explanations must be confirmed using its output before any narration or media production.

| Planned lecture | Provisional slides | Cohesive subject |
|---|---|---|
| 01 | 01–02 | Compute options and AWS App Runner architecture |
| 02 | 03–06 | EC2 foundations, sizing, user data and Linux instance walkthrough |
| 03 | 07–12 | Docker and Amazon ECS: EC2/Fargate, separate IAM roles, ALB and EFS |
| 04 | 13–16 | Amazon EKS architecture, node management and persistent volumes |
| 05 | 17 | Amazon Lex with Amazon Connect and customer engagement |

These ranges are hypotheses based on the legacy lesson map, **not approved scene order**. Inspect the actual R2 images and move boundaries if lessons differ. Do not use a fixed 5-slide batching pattern.

Quality gates:
- Narration explains original numbered flow, arrows, icons and visible configuration rather than reciting headings.
- Include technical caveats, design trade-offs, IAM/network restrictions, operational checks and practical use cases.
- Use a fresh Module 10 TTS cache namespace, with no previous-course audio.
- Before publication, match `script_revision`, actual slide list, first-title, R2 MP4 and VTT with API/catalog and live player.
- Render after source QA; prevent the Module 08 mistake where outdated five-slide MP4s existed but were rejected by the player's topic-based manifest.
