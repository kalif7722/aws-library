# Module 17 — Security visibility, compliance and threat modelling

Source: *AWS Certified Solutions Architect Professional Slides v30.pdf*, physical pages 157–165, 171–173 and 771 (13 pages). Reviewed 2026-11-01.

The 36 visual lessons cover 38 inventoried source items, with four illustrative walkthroughs, 16 native service comparison rows, 74 precision-reference rows and AWS service icons. The page/item-to-lesson crosswalk is recorded in `module-17-source-crosswalk.json`. Additional lessons address the official guide's audit evidence, residency, access analysis, threat modelling and AI oversight requirements. These supplements are identified separately from PDF coverage.

| Area | Coverage | Lessons |
|---|---|---|
| Inspector | EC2 inventory and eligible agentless paths, package versus network exposure, ECR/Lambda scanning, coverage, prioritization and deployed remediation | 2–5, 34 |
| Config | Recording scope, regional aggregation, configuration/compliance/API timelines, managed/Lambda/Guard rules, triggers, proactive evaluations and safe Automation remediation | 6–10, 33 |
| Security evidence | API, flow, DNS, request and configuration evidence; exact destinations, NLB TLS restriction, public/Resolver DNS distinction and retention | 7, 11 and native log table |
| GuardDuty | Foundational inputs, extended protection plans, runtime-agent distinction, threat examples, EventBridge/SNS/action paths and delegated regional administration | 12–15, 35 |
| Hub and investigation | Security Hub versus CSPM, Config prerequisites, multi-account/Region findings, integrations, ASFF custom imports, controlled response and Detective context | 16–20, 23, 32, 35 |
| Macie | Sensitive S3 data, identifiers, discovery scope and coverage, policy/content findings, permissions, EventBridge response and access verification | 21–22, 28, 36 |
| Guide supplements | Security Lake, Audit Manager/Artifact, residency, trust boundaries, response privilege, Access Analyzer and AI evidence/approval | 24–31 |

## Historical material reconciled

* Inspector's older SSM-only EC2 description is expanded with eligible agentless snapshot scanning. Its older three-resource list is not presented as the exhaustive current portfolio; Code Security is documented in the precision reference.
* Config custom rules support Lambda and Guard. The historical fixed managed-rule count is removed. Supported proactive evaluation assesses proposed properties; it does not itself deny deployment. Runbooks must check current state because automatic remediation can use stale compliance snapshots.
* GuardDuty foundational analysis and Runtime Monitoring have different agent requirements. Current protection plans extend the PDF inventory; regional support, default enablement, resource coverage and pricing must be checked individually.
* Security Hub and Security Hub CSPM are distinguished. The current Config recorder setup branches between both services enabled and CSPM alone. CSPM findings use ASFF, including supported custom-product imports.
* NLB access logs cover TLS requests. CloudFront standard logging v2 adds destinations beyond legacy S3 delivery. Public DNS query logs and Resolver query logs cover different DNS paths.

All core relationships were remade as original visuals. Fourteen lessons were replaced after semantic review to correct service names, attribution, deployment gating, event/log distinctions, trust boundaries or arrow direction. Final assets, hashes and review evidence are recorded in `module-17-asset-manifest.json` and `module-17-visual-qa.json`. Every published image decoded at 2048×1152, the build passed and both existing discovery tests passed.

Walkthroughs are illustrative exercises, not evidence of execution in an AWS account. This review establishes coverage of Module 17's assigned source inventory. The course-wide 100% coverage flag remains false while later modules are pending.
