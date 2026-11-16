# SAP-C03 Module 02 proposed visuals 27–32 — image QA

Status: **only slide 28 approved**; do not insert the complete generated six-slide ZIP into the production lesson map.

Source: the generated `SAP_Module_02_Proposed_Slides_27-32.zip`, individually inspected at 2048×1152.

| Slide | Subject | Visual standard | Technical completeness | Decision |
| --- | --- | --- | --- | --- |
| 27 | Control Tower drift detection and remediation | Too dense, many small cards | Depicts GuardDuty as a general detective governance control; requires clearer distinction between detected drift, manual action and separately configured automatic remediation | Regenerate |
| 28 | CloudFormation StackSets, accounts and Regions | Good match: navy/glossy/cyan/purple/gold, legible architecture | Good introduction; main diagram, OUs/accounts/Regions, auto-deployment and takeaway are correct at this level. Narration should add service-managed vs self-managed permissions and rollback caveats | Approved, pending binary upload |
| 29 | Budgets, Cost Categories and allocation tags | Too flat relative to approved slide 28 | Distinction present, but lacks clear billing account and spend/notification example | Regenerate |
| 30 | Account closure | Too flat relative to approved slide 28 | Lifecycle present, but insufficient visibility for evidence retention, dependencies, billing and closure prerequisites | Regenerate or split |
| 31 | Landing-zone update and account enrollment | Too flat relative to approved slide 28 | Two workflows appear, but Control Tower enrollment prerequisites, baseline drift and verify controls need more explanatory visuals | Regenerate |
| 32 | Governance troubleshooting | Too flat relative to approved slide 28 | Generic diagnose flow; no specific failure, root cause or layer-by-layer test | Regenerate |

## Publishing gate

- Preserve existing approved Module 02 slides 1–26 without reordering or overwriting.
- Publish slide 28 only after it is available as `public/course-visuals/sap-c03/module-02/slide-28.webp`; do not map it as contiguous module content until slide 27 is approved.
- Regenerated slides must each be **one independent 2048×1152 WebP** (not a collage), using the approved dark glossy SAP theme.
- Give one primary AWS architecture diagram, readable labels, 2–3 short teaching takeaways and a concise Remember bar.
- Narration adds nuance; images must not assert that AWS Control Tower always remediates automatically. Control Tower drift findings and AWS Config compliance evaluations are distinct and require appropriate remediation steps.
- Once all six pass QA, add sequential lessons 27–32 to `app/courses/aws-solutions-architect-professional/visual-lesson-map.json` and create a new VisualFirst video batch using the actual visual filenames.

This document records the image QA only. It does **not** claim the new visuals are currently live, nor that narration/video rendering has completed.
