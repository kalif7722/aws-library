# SAA Module 05 — RDS, Aurora and ElastiCache

Source-topic inventory: AWS Certified Solutions Architect Slides v49, pages 161–193. New diagrams and explanations are original; source diagrams and prose are not reproduced.

31 mapped lessons: 5 new SAA architecture visuals and 26 selected SAP visuals.

| Topic group | Lesson assets |
| --- | --- |
| Managed responsibility, engine choice and cost | SAP 11-01, 11-02; SAA 05-03 |
| RDS network, encryption, authentication and auditing | SAP 11-03, 11-08, 11-09 |
| Multi-AZ, read replicas and readable cluster instances | SAA 05-01; SAP 11-05, 11-06 |
| Backup, retention, restore, encryption migration and cloning | SAA 05-02; SAP 11-04, 11-59; module comparison table |
| RDS Custom, Babelfish and Aurora ML integration | SAA 05-03 |
| Aurora storage, replicas, endpoints and reader scaling | SAP 11-15 through 11-19 |
| Serverless v2, Global Database and recovery | SAA 05-05; SAP 11-22, 11-24, 11-26 |
| Proxy connection pooling and eligible read endpoints | SAP 11-12, 11-13, 11-60 |
| Cache-aside, write invalidation and shared sessions | SAP 11-44 through 11-46, 11-61 |
| Cache engines, deployment model and resilience | SAP 11-47, 11-48; SAA 05-04 |
| Cache security, TTL and sorted-set leaderboard | SAA 05-04 |

## Verification

- All 31 lesson identifiers are unique; 26 reused asset paths exist in the Git tree.
- Five new WebPs decode at 2048×1152; inspected generated output for readability and technical issues. Corrected RDS Custom automation wording before integration.
- Added a ten-row module comparison table, including backup retention and current deployment distinctions.
- Existing shared navigation, fullscreen viewer and return-link behavior retained.
- Reused asset binaries were not available in this sparse checkout. Detailed image-by-image review, complete exam-objective traceability and rendered site verification remain open. This release is topic mapping, not a claim of 100% audited coverage.

## Current AWS references

- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html
- https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/backups.html
- https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/auth-iam.html

## 2026-11-05 source gap closure

Added SAA 05-06 for same-Region versus cross-Region RDS read-replica replication-transfer charges (PDF p. 167), and SAA 05-07 for the physical MySQL backup stored in S3 and restored to a new RDS for MySQL instance or Aurora MySQL cluster (p. 183). The reused SAP 11-02 already covers RDS storage autoscaling (p. 164). Module now has 33 mapped visuals: 26 reused and 7 original SAA. All 33 image paths were checked against the PDF teaching-topic inventory.
