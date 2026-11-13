# Module 16 — Streaming, analytics, lakehouses and data sharing

Source: *AWS Certified Solutions Architect Professional Slides v30.pdf*, physical pages 371–373, 481–521 and 526–534 (53 pages). Reviewed 2026-11-01.

The 57 visuals map to every assigned physical page in `module-16-source-crosswalk.json`. Four illustrated walkthroughs synthesize the topics. The module includes 15 native service comparison rows, 41 precision rows and official AWS service icons. The PDF defines the topic inventory; current AWS documentation resolves historical naming and capabilities. Course-wide 100% coverage remains false while later modules are pending.

| Area | Detailed coverage | Lessons |
|---|---|---|
| Third-party data | Data Exchange terms, entitlements, delivery, updates and lake integration | 1–3 |
| Streaming | Kinesis shard keys, order, retention, capacity, consumers and fan-out; Firehose transforms, backup, buffering and delivery; Flink state, windows and checkpoints; MSK topics, partitions and consumer groups | 4–24, 54 |
| Jobs and clusters | Batch definitions, queues, environments, scaling, networking and multi-node jobs; EMR engines, storage, node roles, instance groups and fleets | 25–35, 55 |
| Lake and warehouse | Glue ETL, crawlers and Catalog; Redshift loading, WLM, concurrency scaling, Spectrum, snapshots, encrypted cross-Region copy and restore | 36–44, 57 |
| Query and BI | Athena SQL, partitions, scan cost and federated connectors; Amazon Quick Sight sources, SPICE, refresh, analyses, dashboards and sharing | 45–50, 56 |
| End-to-end selection | Stream, queue, topic and object semantics; pipeline, lakehouse, IoT and processing engine decisions | 5, 18–20, 35, 51–57 |

Historical naming is reconciled: Kinesis Data Analytics for Apache Flink is Amazon Managed Service for Apache Flink; Kinesis Data Firehose is Amazon Data Firehose; Amazon QuickSight is Amazon Quick Sight. Batch multi-node parallel jobs require eligible EC2 capacity rather than Fargate or Spot. EMR scaling, Redshift lake features, quotas, prices and Region availability depend on current configuration and documentation. Walkthrough resources and outputs are illustrative architecture exercises, not evidence of execution in an AWS account. Asset hashes are in `module-16-asset-manifest.json`.
