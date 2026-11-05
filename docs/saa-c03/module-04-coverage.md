# SAA-C03 Module 04: high availability, load balancing and scaling

Source inventory: AWS Certified Solutions Architect Slides v49, pages 119–160, checked against current AWS service documentation where source details may have changed. The source provides a topic inventory only. Visuals are original or previously produced SAP visuals selected for Associate depth; no source diagram or wording is reproduced.

| Source pages | Teaching concept | Candidate visuals | State |
| --- | --- | --- | --- |
| 119–124 | Vertical/horizontal scale versus failure resilience | SAA 04-01 | Mapped, visual QA pending |
| 125–128 | ELB purpose, managed operation and target health | SAP 08-01, 08-02, 08-03, 08-05; SAA 04-05 | Mapped, Associate-fit review pending |
| 129–131 | ALB/NLB/GWLB/legacy CLB and security groups | SAP 08-01, 08-19, 08-22 | Mapped, Associate-fit review pending |
| 132–137 | ALB path/host/query rules and target types | SAA 04-02; SAP 08-02, 08-06, 08-07, 08-10 | Mapped, visual QA pending |
| 138–140 | NLB TCP/UDP, addressing, targets and health | SAP 08-13, 08-14, 08-15 | Mapped, Associate-fit review pending |
| 141–142 | GWLB appliance inspection and targets | SAP 08-17, 08-18 | Mapped, Associate-fit review pending |
| 143–144 | Target affinity and cookie types | SAA 04-03 | Mapped, visual QA pending |
| 145–146 | Cross-zone behavior and AZ balance | SAP 08-04, 08-24 | Mapped, current-setting QA pending |
| 147–150 | TLS, ACM certificate selection and SNI | SAA 04-04; SAP 08-08 | Mapped, visual QA pending |
| 151 | Connection draining / deregistration delay | SAP 08-11 | Mapped, Associate-fit review pending |
| 152–155 | ASG launch template, min/desired/max, ELB health | SAA 04-05; SAP 07-12, 07-19 | Mapped, visual QA pending |
| 156–160 | Scaling policy, metrics, warmup and cooldown | SAA 04-06; SAP 07-13 through 07-18 | Mapped, visual QA pending |

## Release check

- 12/12 source-page groups have candidate visuals; 34/34 lesson paths resolve at 2048×1152.
- 6 new SAA images and 28 selected SAP images. Current AWS docs were used for target tracking, warmup, cooldown and target group stickiness so outdated source-deck defaults are not copied.
- This is topic mapping. Detailed image-by-image technical and visual QA, SAA-C03 objective traceability and a rendered site check remain open; no `qa-passed` claim is made.

## 2026-11-05 cookie gap closure

Added SAA 04-07 to distinguish ALB duration-based AWSALB from application-based target cookie plus ALB AWSALBAPP. It also explains the target-failure and external-session-store consequence. Module now has 35 mapped visuals; all source-page groups 119–160 have explicit image coverage.
