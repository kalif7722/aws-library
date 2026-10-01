# Practical architecture learning review

The previous topology renderer placed application traffic, investigation steps and supporting controls in the same rows and drew curved connections across them. This release replaces that layout with numbered learning stages and source-local, labeled destination links. Request/data relationships and control/evidence relationships remain distinct. Application context is shown separately and can be collapsed; the full node descriptions and official icon mappings remain available.

AWS and Azure shared architecture renderers, reviewed AWS/GCP sections, and GCP architecture boards use the same responsive presentation. Layout adjacency no longer creates an automatic service-to-service arrow. The layout does not assert new integrations for legacy diagrams without authored connections.

## Content repairs

All 35 explicitly reviewed examples with four nodes have been expanded with individually authored dependencies, outputs, failure handling or recovery checks. They now have five or six nodes, 63 new node descriptions in total, explicit connections and an authored learning order. The changes preserve the existing exact architecture keys so hover lookup still selects the correct description.

- Persistent disks and shared files: EBS, EFS, FSx, Azure Disk Storage, Azure Files, Filestore and Persistent Disk.
- Hybrid and outbound networking: AWS Site-to-Site VPN, Direct Connect, NAT Gateway; Azure VPN Gateway and NAT Gateway; Cloud NAT.
- Infrastructure and account operations: CloudFormation, StackSets, Control Tower, Systems Manager, ARM templates, Azure Automation and Resource Manager.
- Incident response: Cloud Monitoring and CloudWatch queue-backlog alerts, including investigation and recovery verification.
- Analytical data paths: Kinesis Data Streams, Data Factory, Synapse, Stream Analytics, Dataflow and BigQuery.
- Application integration: Cloud Scheduler, Cloud Tasks, Queue Storage, Event Grid, SES and Firehose.
- Customer identity: Cognito, with a separate sign-in branch, API Gateway JWT validation, ownership-filtered query and customer response.

The existing 97 diagrams for the latest 100-service batch retain all 935 authored nodes. Their selected service walkthrough is separated from surrounding application context, without imposing a four-node limit. The full reviewed registry now contains 203 distinct workflows and 1,513 node occurrences, plus four separate financial workflows and 21 node occurrences.

## Verification and remaining scope

The production build and 30 focused tests pass. Tests render every node and hover description across all 203 reviewed workflows, check destination anchors, verify all 35 repairs contain connected valid relationships, and retain the service-boundary and acknowledgement regression checks. Local browser preview is blocked by `ERR_BLOCKED_BY_CLIENT`; visual screenshot verification is not claimed.

Reviewed catalog coverage remains 244 services: AWS 101, Azure 76 and GCP 67. The shared presentation changes also apply to legacy renderer paths, but 457 catalog services still await individual semantic review. This release does not label those services fully reviewed merely because their layout changed. The complete inventory is in [ARCHITECTURE_REVIEW_SERVICE_LIST.md](ARCHITECTURE_REVIEW_SERVICE_LIST.md).
