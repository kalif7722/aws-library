# AWS Developer Associate · Module 10 visual review

Review build, 10 November 2026. 60 lessons: 45 distinct new WebP slides plus 15 references to existing SAP Module 20 visuals.

**Status:** Published for visual and technical review, not asserted to be fully audited or approved. The first 45 images are original course drafts; SAP reuse is grouped at the end to preserve image slide numbering.

| Lesson | Type | Topic | Source pages / reuse |
|---|---|---|---|
| 01 | New visual | IMDSv2: request a token before metadata | 239–240 |
| 02 | New visual | AWS SDK: acquire credentials, then call APIs | 242–243 |
| 03 | New visual | SigV4: prove who signed the request | 246–247 |
| 04 | New visual | API throttling: exponential backoff and jitter | 244–245 |
| 05 | New visual | CloudFormation: infrastructure as code | 380–386 |
| 06 | New visual | CloudFormation building blocks | 387–409 |
| 07 | New visual | AWS SAM: build, test and deploy serverless | 733–736 |
| 08 | New visual | AWS CDK: define infrastructure with code | 745–748 |
| 09 | New visual | CloudFormation intrinsic functions | 398–415 |
| 10 | New visual | CloudFormation change sets and rollbacks | 416 |
| 11 | New visual | CloudFormation service roles and capabilities | 417–418 |
| 12 | New visual | CloudFormation safety controls | 419–423 |
| 13 | New visual | CloudFormation custom resources | 424–426 |
| 14 | New visual | CloudFormation StackSets | 427 |
| 15 | New visual | SAM local capabilities | 742–743 |
| 16 | New visual | SAM Accelerate: fast sync | 737–738 |
| 17 | New visual | SAM and CodeDeploy Lambda releases | 740–741 |
| 18 | New visual | CDK construct levels L1, L2 and L3 | 751–754 |
| 19 | New visual | CloudFormation parameter validation | 394–398 |
| 20 | New visual | CloudFormation mappings and pseudo parameters | 399–402 |
| 21 | New visual | CloudFormation outputs and conditions | 403–408 |
| 22 | New visual | Nested CloudFormation stacks | 380–427 |
| 23 | New visual | Diagnose and recover stack rollbacks | 416 |
| 24 | New visual | Protect critical CloudFormation resources | 419–423 |
| 25 | New visual | Custom-resource cleanup patterns | 424–426 |
| 26 | New visual | SAM policy templates | 739 |
| 27 | New visual | SAM multi-environment configuration | 744 |
| 28 | New visual | CDK testing and validation | 757 |
| 29 | New visual | CDK constructs and composition | 751–754 |
| 30 | New visual | CDK context and environment configuration | 756 |
| 31 | New visual | CDK asset bundling and deployment | 746–756 |
| 32 | New visual | CDK escape hatches and overrides | 751–754 |
| 33 | New visual | CDK logical IDs and resource naming | 751–754 |
| 34 | New visual | CDK stack dependencies and deployment order | 746–756 |
| 35 | New visual | CDK bootstrapping | 756 |
| 36 | New visual | CDK assertions testing | 757 |
| 37 | New visual | Test CDK-generated Lambda with SAM CLI | 749 |
| 38 | New visual | CloudFormation deployment validation | 385–386 |
| 39 | New visual | AWS CLI MFA with temporary STS credentials | 241 |
| 40 | New visual | CloudFormation input constraints in practice | 394–397 |
| 41 | New visual | Fn::Base64 and EC2 user data | 414 |
| 42 | New visual | Recover UPDATE_ROLLBACK_FAILED | 416 |
| 43 | New visual | DeletionPolicy vs UpdateReplacePolicy | 419–423 |
| 44 | New visual | SAM permissions and deployment identity | 739–741 |
| 45 | New visual | CloudFormation vs SAM vs CDK | 748 |
| 46 | SAP reuse | SAP reuse: IaC makes architecture repeatable | sap-20-001 |
| 47 | SAP reuse | SAP reuse: Read the stack before updating it | sap-20-002 |
| 48 | SAP reuse | SAP reuse: DeletionPolicy protects the old resource | sap-20-003 |
| 49 | SAP reuse | SAP reuse: Replacement requires a second policy | sap-20-004 |
| 50 | SAP reuse | SAP reuse: Custom resources extend a stack | sap-20-005 |
| 51 | SAP reuse | SAP reuse: StackSets deploy across accounts and Regions | sap-20-006 |
| 52 | SAP reuse | SAP reuse: Drift compares template and actual state | sap-20-008 |
| 53 | SAP reuse | SAP reuse: Secrets Manager references at deploy time | sap-20-009 |
| 54 | SAP reuse | SAP reuse: SAM is a CloudFormation transform | sap-20-014 |
| 55 | SAP reuse | SAP reuse: SAM traffic shifting uses aliases | sap-20-015 |
| 56 | SAP reuse | SAP reuse: CDK synthesizes before deployment | sap-20-016 |
| 57 | SAP reuse | SAP reuse: Choose CloudFormation, SAM or CDK | sap-20-017 |
| 58 | SAP reuse | SAP reuse: Validate policy before execution | sap-20-018 |
| 59 | SAP reuse | SAP reuse: Walkthrough: safe RDS template update | sap-20-022 |
| 60 | SAP reuse | SAP reuse: Secrets in IaC: reference, rotate, consume | sap-20-026 |

## Visual checks

- 45 separate 2048×1152 WebP files; no collages or image placeholders.
- Slides 39 and 45 use the corrected review versions.
- Fifteen SAP Module 20 assets are referenced by their existing paths, not duplicated.
- Some slides still warrant illustration-depth and technical-content QA before final approval.
- The source slide deck PDF and live AWS documentation should be reconciled before claiming 100% objective coverage.
