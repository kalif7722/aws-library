# AIP Module 10 — topic-based lecture plan

Source: original numbered R2 visuals `aws-genai-course-visuals/module-10/slide-NN.webp` (17 expected slides).

**Audit status:** Complete: all 17 original R2 slides verified. All five topic-first narration scripts registered with player API, captions and two fresh-audio render workflows. R2 publication remains unverified.

| Video | Verified slides | Cohesive subject |
|---|---|---|
| 01 | 01–02 | Compute options and AWS App Runner architecture |
| 02 | 03–06 | EC2 foundations, sizing, user data and Linux instance walkthrough |
| 03 | 07–12 | Docker and Amazon ECS: EC2/Fargate, separate IAM roles, ALB and EFS |
| 04 | 13–16 | Amazon EKS architecture, node management and persistent volumes |
| 05 | 17 | Amazon Lex with Amazon Connect and customer engagement |

The verified scene groups follow complete topics, including a dedicated single-slide Lex/Connect customer-engagement lesson. No fixed-size batching was used.

Quality gates:
- Narration explains original numbered flow, arrows, icons and visible configuration rather than reciting headings.
- Include technical caveats, design trade-offs, IAM/network restrictions, operational checks and practical use cases.
- Use a fresh Module 10 TTS cache namespace, with no previous-course audio.
- Before publication, match `script_revision`, actual slide list, first-title, R2 MP4 and VTT with API/catalog and live player.
- Render after source QA; prevent the Module 08 mistake where outdated five-slide MP4s existed but were rejected by the player's topic-based manifest.
