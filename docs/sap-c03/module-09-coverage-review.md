# Module09 — S3 architecture, protection and performance

Reviewed2026-10-31. Reference inventory: physical pages338–357 of the845-page source PDF. The PDF supplies topics, not reusable wording or diagrams. All lesson prose and artwork are original. Current AWS documentation supplies technical dispositions.

## Result and claim boundary

33 reviewed visual lessons, plus an embedded decision reference with exact comparison tables and operational cards. Nine images were refined after current-source review:01,11,14,15,18,22,23,28,29. The final29 replaces an intermediate image with a misspelled word. Earlier rejected drafts are not published.

Every enumerated reference topic below is represented in a visual, the embedded reference, an explicit historical/current disposition, or the named prerequisite overview. This is closure of the S3 reference section; it is not a whole-course completion claim or an exam-pass guarantee. Guide skills1.5.5,3.4.1 and4.3.4 remain shared with other modules.

## Topic/subtopic crosswalk

|Reference page|Topic inventory|Teaching location and disposition|
|---|---|---|
|338|Object/key/data/metadata/class; elastic storage and use-based costs; static assets; tiny-object overhead; POSIX/locking, queries, update and dynamic-content tradeoffs|01,02,12,29,30,32. Reference Access & discovery explains Mountpoint's limited file bridge and managed S3 Metadata; old blanket no-mount/no-index assertions are not repeated.|
|339|All seven reference classes; durability; designed availability; AZ count; minimum-duration charges; billable sizes; retrieval charges; Lifecycle transitions|09–12 plus Storage classes table. Explicit distinction:40KB archive metadata overhead is not an ordinary minimum object size. One-Zone loss, archive restore, Intelligent-Tiering timing/eligibility and current small-object transition defaults explained.|
|340|Versioning; SRR/CRR; replication and Lifecycle; latency, security, compliance and DR; RTC percentage/time objective|06,13,14,31 and Transfers & replication. Destination policies remain separate. Product overview99.99% target is distinguished from RTC guide/SLA99.9% monthly threshold. RTC does not apply to Batch Replication.|
|341|Create/remove/restore/replication events; key filters; image-thumbnail use case; destinations; delivery delays|15 and Access & discovery event card. Prefix/suffix filtering replaces the PDF's misleading wildcard shorthand. Standard SQS/SNS/Lambda restrictions, quotas, idempotency, ordering and recursion covered. Delivery can take a minute or longer.|
|342|EventBridge routing/filtering; multiple service targets; archive/replay and reliability|16 and event card. Actual bucket/key/size/type fields distinguished from custom metadata requiring lookup. No fixed legacy count of destinations is taught.|
|343|Per-prefix write/read baseline; automatic gradual scaling; latency context; prefixes and worked parallel-read example|17 and Transfers reference.3,500 write-type/5,500 read-type baseline; four-prefix22,000 illustrative baseline; latency is workload-dependent, not a universal promise.|
|344|Multipart recommendation/requirement; parallel uploads; Transfer Acceleration via edge network; combined use|18,21 plus Transfers reference. Around100MB recommendation;5GB single PUT;10,000parts;5MiB–5GiB parts with last-part exception;48.8TiB core limit; AWS50TB terminology and units explained.|
|345|Parallel byte ranges; retry resilience; partial/header access|20 and Transfers reference. Consistency across ranges and version/condition-aware reads included; no overlapping numeric ranges in art.|
|346|Unfinished parts; CLI listing; Lifecycle abort after chosen days|19 and Transfers reference. Exact list-multipart-uploads command, pagination, billable parts and abort action distinguished from object expiry.|
|347|SQL rows/columns before transfer; lower network/client processing; S3 Select and Glacier Select|22 and Access & discovery. S3 Select explicitly unavailable to new customers; existing use continues. Glacier Select retained only as historical vault-service context. Athena/new processing path is a separate design decision.|
|348|Storage Class Analysis; Standard-to-IA scope; excluded One-Zone/Glacier recommendations; daily reports;24–48h initial data; QuickSight workflow; Lifecycle decision|23 and Access reference. Usually30days or more for recommendation evidence, versus initial report visibility. Original BI/export explanation, no copied CSV screenshot.|
|349|Storage Lens organization/account/Region/bucket/prefix scope; anomalies, cost and protection; default/custom dashboards; daily CSV/Parquet exports|24–28 and Storage Lens reference. Current scope includes storage-class/groups where supported; current query windows replace ambiguous old30day wording.|
|350|Default dashboard summary, free/advanced support and disable-versus-delete|24 and Storage Lens configuration card. Default scope cannot be changed; custom dashboard scope can be tailored.|
|351|StorageBytes/ObjectCount; growth/unused storage; NonCurrentVersionStorageBytes; IncompleteMultipartUploadStorageBytes; seven-day investigation and class-cost opportunity|25 plus exact metric table and cost cards. Seven days is an investigation example, not an automatic cleanup default.|
|352|VersioningEnabledBucketCount; MFADeleteEnabledBucketCount; SSEKMSEnabledBucketCount; CrossRegionReplicationRuleCount; ObjectOwnershipBucketOwnerEnforcedBucketCount; EventNotificationEnabledBucketCount|26 plus exact metric table. Bucket-setting and rule counts are not proof of object-level protection or successful processing; free/advanced tier meanings checked.|
|353|TransferAccelerationEnabledBucketCount; AllRequests/GetRequests/PutRequests/ListRequests/BytesDownloaded;200OKStatusCount/403ForbiddenErrorCount/404NotFoundErrorCount|27 plus exact metric table. Configuration is distinct from measured performance. Current advanced performance metrics exist; no claim that acceleration configuration is the entire current category.|
|354|Free/advanced scope; historical metric count;14day/15month query history; CloudWatch publishing; prefix aggregation|28 plus Storage Lens cards. All metrics retained15months, with different query windows. Historical28metric count is not a current feature-catalog claim. Prefix/group/derived publishing restrictions and publishing-versus-other-CloudWatch charges explained.|
|355|Static delivery using EC2 local/EBS, web fleet/shared EFS, or S3/CloudFront|08,30,33. Original conceptual comparison; compute/filesystem dependencies and OAC/website endpoint distinctions explained.|
|356|Event-driven DynamoDB metadata index; date, tenant, attributes and customer aggregate queries|29 and Access reference. Object-size field, reliable per-customer aggregation/reconciliation, tenant access, duplicate/out-of-order events and index lag explicit. Current managed S3 Metadata is a distinct alternative.|
|357|DNS/CDN; dynamic compute/API/database/cache; static S3; signed upload; events/Lambda/index|08,29,30,33 plus prerequisite Module07 lesson32 whole-system layer overview. Detailed CloudFront/DAX/API design continues in their dedicated modules; the S3 responsibility and upload/index relationship is explicit here.|

Additional protection material:03–07 cover policies/ownership, endpoint authorization, encryption/key access, version history and Object Lock.31 covers restoration and independent recovery. Original conceptual illustrations are not precise AWS console screenshots or measured charts.

## Current-source decisions

- Storage classes: use current documented comparison values. Designed availability is not an availability SLA. Flexible/Deep Archive comparison values apply after restoration.
- Archive metadata:8KB at Standard plus32KB at the destination archive rate. Explain fixed metadata costs and small-object eligibility separately.
- Uploads: current maximum-object documentation has a50TB label and a48.8TiB/50,000GiB core calculation. Preserve the unit distinction; do not teach the old5TB object ceiling.
- RTC: AWS's replication overview quotes99.99%; the RTC guide and SLA use99.9% for the monthly15minute threshold. The lesson uses the SLA credit boundary; the embedded comparison transparently distinguishes it from the overview target.
- Select: no new S3 Select customers. Do not infer that a historic Glacier Select launch means SQL is available on all S3 Glacier-class objects today.
- Storage Lens: do not repeat obsolete metric counts or imply that basic protection metrics are paid only. Prefix/group-level metrics are not CloudWatch-published; derived metrics need formulas.
- Modern interfaces: Mountpoint and S3 Metadata prevent outdated blanket assertions about file access or metadata discovery. They do not make S3 a general POSIX filesystem or DynamoDB an automatically consistent object index.

Primary-source details and lesson mappings are recorded in module-09-source-verification.json. Visual selection, exact final copy and asset hashes are recorded in module-09-visual-plan.json and module-09-visual-qa.json.
