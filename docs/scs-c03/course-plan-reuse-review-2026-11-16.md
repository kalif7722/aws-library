# Course plan and reuse review — 16 November 2026

Source: current Library course plan AWS-Security-Specialty-SCS-C03-Course-Plan.md, 690-page v30 PDF, live Security manifest, existing SAP/DVA inventories and actual reviewed SAP image bytes. Active standard: AIP_SECURITY_TEACHING_V2.

## Course-wide planning baseline

| Planning ID | Display order | Module | New estimate | Reuse candidates |
|---|---:|---|---:|---:|
| 00 | 00 | Orientation | 4 | 4 |
| 08 | 01 | Advanced IAM | 28 | 12 |
| 09 | 02 | Credentials and workload identity | 22 | 10 |
| 11 | 03 | Federation | 24 | 14 |
| 10 | 04 | S3 authorization | 20 | 10 |
| 12 | 05 | Cryptography and KMS foundations | 20 | 12 |
| 13 | 06 | Advanced KMS | 32 | 12 |
| 14 | 07 | Secrets, storage protection, recovery | 28 | 12 |
| 15 | 08 | TLS and certificates | 16 | 10 |
| 06 | 09 | VPC and hybrid security | 24 | 16 |
| 07 | 10 | Edge and API protection | 28 | 14 |
| 18 | 11 | Compute and data-service security | 26 | 12 |
| 19 | 12 | GenAI safeguards | 22 | 8 |
| 02 | 13 | Logging and alerting | 24 | 16 |
| 03 | 14 | Data and network visibility | 22 | 10 |
| 01 | 15 | Detection and investigation | 26 | 14 |
| 05 | 16 | Systems Manager operations | 16 | 10 |
| 04 | 17 | Incident response | 30 | 8 |
| 16 | 18 | Organizations | 16 | 10 |
| 17 | 19 | Governance and secure automation | 22 | 14 |
| 20 | 20 | Integrated cases | 18 | 4 |
| Total | | Provisional budget | 468 | 232 |

Display positions after 04 are planned, not newly published modules. Estimates are not quotas or verified reuse counts. No mass reuse mapping is inferred from this table. Future candidates need byte-level visual review and source-claim verification. Do not generate all estimated new images before reviewing reuse.

## Current release decision

Ten original images: eight reviewed in the preceding conversation and two source-checked continuations. Nine add distinct lessons; the new service-role architecture replaces Module 02 lesson 1 because the earlier trust-versus-permission lesson teaches the same claim. Stable lesson numbers and links are preserved. Existing Roles Anywhere and credential-components images stay mapped. The eight prior SAP reuses in Module 01 and two in orientation stay unchanged.

One new verified reuse: SAP Module 01 slide-49-v2.webp, mapped to Module 02 lesson 13. Its readable API-family comparison distinguishes AssumeRole, SAML/web-identity role sessions, GetSessionToken and GetFederationToken. Actual image bytes were reviewed, source blob hash verified, and the original is unchanged. This covers source PDF 335-337 at overview depth; it does not complete federation or regional-endpoint teaching.

Rejected candidate: SAP Module 01 slide-10.webp, external-ID diagram. It needs a clearer specialist explanation of third-party tenant binding and all authorization gates; it is not mapped. A future new case should distinguish ExternalId matching from complete role authorization.

DVA Module 01 MFA, Module 10 SDK/metadata and Module 14 STS/PassRole were discovered as overlap candidates. They are not counted as verified reuse in this release. The approved new specialist slides already teach the MFA-context, PassRole deployment/runtime and IMDSv2 claims, so duplicating those assets would add repetition. SDK credential-provider coverage remains open for byte-level review.

## Planning module 09 source inventory

| PDF anchor | Current evidence / next action |
|---|---|
| 318-320 | New MFA human-sign-in and device comparison, display 02 lesson 4 |
| 321 | S3 MFA Delete belongs to planning 10; pending there |
| 322-323 | Display 02 lessons 5-6; context and age examples |
| 324 | MFA device-recovery diagnostic pending |
| 325 | Display 02 lesson 7 report interpretation |
| 326 | Display 02 lesson 8 key retirement; specialist Config automation depth remains reviewable |
| 327-328 | Display 02 lessons 1 and 9; service role and PassRole |
| 329-330 | Existing display 02 lesson 3 Roles Anywhere |
| 331 | Role trust in lesson 1; failure case in display 01 lesson 48 |
| 332-334 | Credentials report and existing Access Analyzer inventory overlap; skill audit still pending |
| 335-337 | Existing credential-components lesson 2 and new SAP reuse lesson 13; detailed cross-account walkthrough still reviewable |
| 338-339 | STS regional endpoints / token compatibility pending |
| 340-341 | New specialist external-ID case pending; overview trust case does not establish full coverage |
| 342-343 | Display 02 lesson 10 session cutoff and entry-path containment |
| 344-345,348 | Display 02 lesson 11 token/metadata mechanism; broader metadata field inventory remains reviewable |
| 346-347 | EC2 SDK/profile delivery and metadata reachability diagnostics pending |
| 349 | Display 02 lesson 12 compatibility and enforcement |
| 350-351 | ec2:RoleDelivery and launch/change governance pending |

## Current inventory

69 mapped lessons: display 00 has 6; display 01 has 49; display 02 has 13; display 04 has 1. Eleven total SAP reuse mappings, 58 course-original mappings. This is publication inventory, not a completed-course claim. No new official objective-level completion is asserted.

## Primary verification sources

- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html
- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-IMDS-new-instances.html
