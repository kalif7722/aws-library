# SAA Module 20 — More architecture and other services

- Planned source range: pages 805–854. Published mapping: 44 lessons, including 11 new SAA visuals and 33 selected SAP visuals.
- S3: scheduled Inventory, versioned asynchronous replication, Batch Operations, storage classes, lifecycle, and event notifications.
- Integration: SQS buffering, SNS fanout, EventBridge rule routing and target delivery. HPC: Batch or ParallelCluster, FSx for Lustre, compute and network fit.
- Operations and IaC: CloudFormation change sets and rollback considerations, Session Manager, Run Command, Automation, Patch Manager.
- Cost: Cost Explorer investigation, Budgets, anomalies, CUR 2.0 exports, allocation tags, storage and network transfer paths, and architecture tradeoffs.
- Technical checks: S3 destination versions have independent IDs; existing objects need Batch Replication. Event consumers should tolerate duplicate delivery. Session Manager needs agent, permissions and network reachability. Billing examples do not claim fixed prices.
- Planned labs remain separate: CloudFormation stack change and Cost Explorer investigation.
- Source status: the topic plan is mapped, but a page-by-page comparison with the original SAA course PDF has not been completed. No 100% coverage claim is made.
- AWS primary references: [S3 Inventory](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html), [S3 Batch Operations](https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops.html), [CloudFormation change sets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html), [Systems Manager Run Command](https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html), [Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html).
