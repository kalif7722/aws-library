# AIF pending audit completion — 2026-10-30

Repository: `kalif7722/aws-library`. Scope: the 188 lessons whose teaching audits were pending at execution time. The repository lesson map establishes the PDF mapping below; conflicting historical module trackers were not used. The source is *AWS Certified AI Practitioner Slides v16.pdf*, 364 pages. Module 13 is explicitly separate current-guide coverage.

| Module | Pending lessons reviewed | PDF pages | Repaired visuals | Result |
|---|---:|---|---:|---|
| 00 | 3 | 4, 5, 6 | 0 | Verified |
| 07 | 15 | 113–127 | 4 | Verified |
| 08 | 29 | 192–220 | 11 | Verified |
| 09 | 36 | 222–257 | 9 | Verified |
| 10 | 16 | 259–274 | 1 | Verified |
| 11 | 23 | 275–297 | 6 | Verified |
| 12 | 52 | 300–351 | 28 | Verified |
| 13 | 12 | Current official guide; no PDF pages | 2 | Verified |
| 14 | 2 | 353–354 | 2 | Verified |

Modules 01–06 (160 lessons) and Module 00 lesson 04 (one lesson) already had verified teaching audits and were skipped. Their lesson audit entries and assets were not revised. All 349 lesson audits now have a verified status; the 188 newly closed records bind verification to the actual asset and lesson-content SHA-256 hashes.

## Findings and repairs

- **Module 07:** Document ACL example; plugin read/write actions; current Quick Sight terminology; CloudWatch->SNS->Q chat architecture.

- **Module 08:** Comprehend entities/key phrases; Rekognition confidence 0–100, no fabricated Safe label; Personalize import/recipes; normalized Textract output; A2I workforce and existing-customer eligibility; MedicalCondition/DetectPHI distinctions; EC2 virtual CPUs and GPU vendor differences.

- **Module 09:** Separate target from features; correct one-hot encoding and train-only imputation; signed attributions; Ground Truth availability/workforces; DAG dependency/parallel execution; explicit deployment resources; MLflow tracking ARN; Automatic Model Tuning; registry/deployment monitoring flow.

- **Module 10:** Service selection boundaries and current names/availability.

- **Module 11:** Correct Inspector remediation ownership; AWS-managed SageMaker service boundaries; KMS at-rest versus TLS in-transit; F1 equation; Bedrock native monitoring/logging destinations; DataZone lineage; workload versus human access; security scopes; configured retraining and Batch Transform distinction.

- **Module 12:** IAM groups/principals/evaluation; S3 key/URI, lifecycle, partitions, tiers, billing floors and retrieval exceptions; EC2 bootstrap/lifecycle; CloudTrail management/data scope; Trusted Advisor access; VPC endpoint boundaries/routes; KMS S3 decryption; SageMaker network modes; Bedrock API schema/code.

- **Module 13:** Kiro requirements.md and illustrative implementation; Prompt management double-curly variables and mutable draft versus immutable versions.

- **Module 14:** S3 document source versus Bedrock Knowledge Base/vector store; Kendra retrieval versus answer generation; label original illustrative practice questions.

The final AWS lifecycle cross-check additionally updated Q Business, Q Apps, Kendra and selected Comprehend feature eligibility, with explicit alternatives for new deployments.

63 visuals were repaired while preserving the existing dark glossy style, diagram walkthroughs and teaching density. Original supporting explanations were restored/expanded, including every lesson in Modules 12–14 and gaps in Modules 07–08. Service-lifecycle notes distinguish historical lecture workflows from current new-customer availability. The final integrity pass found and repaired a damaged Module 09 slide 35 encoding; all 349 assets then decoded successfully. Every published lesson remains a separate 2048×1152 WebP.

## Validation

- `node --test tests/aif-visual-plan.test.mjs tests/course-visual-discovery.test.mjs tests/final-architecture-coverage.test.mjs`: 9 passed, 0 failed.
- Final validation including `tests/aif-audit-integrity.test.mjs`: 10 passed, 0 failed. The integrity check rejects later visual or explanation changes that no longer match the reviewed hashes.
- Coverage checks account for all 364 PDF pages exactly once: 337 teaching pages plus 27 reference-only pages, 349 lessons including 12 current-guide additions, and all 14 planned exam task groups.
- `npm run build`: exit 0. Required service/course transformations and Azure/GCP validation passed; bounded Vinext production build completed. Framework route-classification notices are informational.
- Browser: Chromium 153, 1440×1000 and 390×844. Modules 00 and 07–14 loaded their complete lesson lists and all images decoded; no document horizontal overflow. Fullscreen next/close worked at both widths; expandable supporting explanations rendered. Screenshots were inspected for desktop composition and mobile containment. The initial long-module image check ran before lazy images loaded; the final check explicitly decoded all images and passed.
- Follow-up browser checks confirmed the new Q Business, Comprehend and Kendra lifecycle explanations display when their lesson details are expanded.
- Full-resolution source/visual review was continued from the 2026-10-29 recovery checkpoint. Recovered images and the four newly regenerated replacements were inspected before final encoding. This report does not substitute an automated asset flag for manual review.

## Evidence and limits

Per-lesson source pages, verified evidence and asset/content hashes are recorded in `docs/aif-teaching-depth-audit.json`. Module-to-source relationships remain in `app/courses/aws-ai-practitioner/visual-lesson-map.json`. Current AWS references used for corrections are listed below. Source concepts are taught using original explanations, examples and generated visuals; the source PDF is not republished and its slide designs are not reproduced. This is not a legal clearance, an assurance of zero copyright risk, a guarantee of exam success, or an assertion that every future AWS change is already covered.

No audit blockers remain for the scoped pending lessons. The earlier recovery branch is historical evidence, not an additional production change to merge.

- https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering-overview.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingObjects.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-code-samples.html
- https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor-check-reference.html
- https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html
- https://docs.aws.amazon.com/inspector/latest/user/scanning-ec2.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-create.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-deploy.html
- https://kiro.dev/docs/specs/
- https://docs.aws.amazon.com/quick/latest/userguide/what-is.html
- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
- https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-in-scope-services.html
- https://docs.aws.amazon.com/personalize/latest/dg/working-with-predefined-recipes.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/a2i-use-augmented-ai-a2i-human-review-loops.html
- https://docs.aws.amazon.com/sagemaker/latest/dg/sms-getting-started.html
- https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-developer-ide-end-of-support.html

- https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/doc-history.html
- https://docs.aws.amazon.com/kendra/latest/dg/doc-history.html
- https://docs.aws.amazon.com/comprehend/latest/dg/comprehend-availability-change.html
