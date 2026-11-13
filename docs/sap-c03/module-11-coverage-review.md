# Module 11 — Databases, caching and search

Production review: 31 October 2026. The supplied PDF is a topic inventory; explanations and diagrams are original. The Module 09 visual standard governs all lessons.

## Source coverage

46 physical pages (405–446 and 522–525), including divider page 410, are accounted for in module-11-source-crosswalk.json. The checklist below contains 204 topic/qualifier entries; these entries support a scoped module audit, not a claim that the complete course is finished.

**PDF page 405** — Managed in-memory cache role; Read-load reduction and replaceable application servers; Managed platform responsibilities versus application integration. Visuals: 44.

**PDF page 406** — Read hit and cache-miss source lookup; Cache fill after a miss; Invalidation and stale-result control. Visuals: 44, 45, 61.

**PDF page 407** — Shared session state across app instances; Session write at sign-in and later retrieval; Expiry and outage implications. Visuals: 46, 61.

**PDF page 408** — Replication and automatic failover versus sharding; Replica read scaling; Engine/deployment-specific persistence and snapshots; Memcached multithreading; Current correction: no generic managed AOF claim; Serverless Memcached snapshot exception. Visuals: 47, 48.

**PDF page 409** — End-to-end capacity bottleneck reasoning; Caching/expiry/network/compute/cost/latency trade-offs; Historic database/cache node and storage throughput numbers; Historic API/concurrency/edge defaults; S3 request-prefix and KMS interaction; Queue and stream throughput caveats; later-module ownership. Visuals: 49.

**PDF page 410** — Section divider; no additional teaching topic. Visuals: section divider.

**PDF page 411** — Managed key-value/document database positioning; 400 KB items and managed storage; CRUD access; Provisioned/Auto Scaling versus on-demand; Eventual versus supported strong reads; Regional ACID transactions; Backup and point-in-time restore; Standard versus Standard-IA; Historical Cassandra analogy is not API compatibility. Visuals: 1, 27, 31, 32, 33, 39.

**PDF page 412** — Tables, creation-time primary-key schema and flexible non-key attributes; 400 KB includes attributes; Scalar String/Number/Binary/Boolean/Null; Document List/Map; String/Number/Binary sets. Visuals: 27, 58.

**PDF page 413** — Partition-key-only uniqueness; Diverse keys and load distribution; User identity example. Visuals: 28.

**PDF page 414** — Composite-key uniqueness; Grouping by partition key; Sort/range key access; User/game and time-ordered examples. Visuals: 28, 58.

**PDF page 415** — Item key plus attributes; LSI same partition key with alternate sort key and creation-time requirement; GSI alternate key and later creation; Key-based Query versus arbitrary relational query; Index projections and capacity/consistency exceptions. Visuals: 29, 30, 32, 58.

**PDF page 416** — TTL expiry representation and asynchronous cleanup; Native Streams consumers and 24-hour retention; Per-item ordering and consumer retries; Active regional replicas and recovery/latency goals; Streams requirement qualified by current MREC/MRSC mode. Visuals: 34, 35, 37, 38.

**PDF page 417** — Kinesis item-level change capture alternative; Longer configured retention than native Streams; Processing with Lambda or current managed Flink naming; Delivery to S3/Redshift/OpenSearch; Duplication, ordering and replay responsibilities. Visuals: 36.

**PDF page 418** — S3 event-driven object metadata indexing; API queries by customer/date/attributes; Storage totals need maintained aggregates; Reliable event updates and reconciliation. Visuals: 40.

**PDF page 419** — DAX-aware application integration; Write-through behavior; Very-low-latency cached reads; Hot-read qualification rather than universal hot-key fix; Five-minute default TTL; Current eleven-node maximum replacing historic ten total; Multi-AZ production fault tolerance; VPC/IAM/KMS/audit controls. Visuals: 41, 42.

**PDF page 420** — DAX item and Query/Scan caching; ElastiCache application-computed aggregate values; Different client/invalidation contracts. Visuals: 43.

**PDF page 421** — OpenSearch naming and open-source lineage; Managed domains versus Serverless collections; Log/monitoring/security/full-text/clickstream/indexing use cases. Visuals: 1, 50.

**PDF page 422** — Search/index engine; Dashboards visualization over indexed data; Logstash ingestion responsibilities; Retention/granularity and CloudWatch comparison qualifications. Visuals: 51.

**PDF page 423** — DynamoDB source CRUD API; Streams and Lambda indexing path; Separate search API; Asynchronous freshness, deletion and repair handling. Visuals: 52.

**PDF page 424** — CloudWatch subscription delivery via supported Lambda integration; Buffered Firehose delivery alternative; Relative latency and retry/rejection visibility. Visuals: 53.

**PDF page 425** — Engine family choices including Db2; Managed provisioning/patches/backups/monitoring; VPC/private subnet/security group connectivity including Lambda; EBS-based storage and eligible autoscaling; Automated backups and recovery window; Manual snapshots and eligible cross-Region copies; RDS events through SNS. Visuals: 1, 2, 3, 4, 59, 63.

**PDF page 426** — Classic synchronous standby and automatic DNS failover; Asynchronous read replicas and cross-Region use; Current Multi-AZ DB cluster exception with readable replicas. Visuals: 5, 6.

**PDF page 427** — Weighted DNS over read endpoints; Health eligibility; Connection caches and non-exact per-query distribution. Visuals: 7.

**PDF page 428** — KMS storage/snapshot protection; Oracle/SQL Server TDE qualification; TLS; Supported IAM login engines; Database-side SQL authorization; Encrypted snapshot copy migration; CloudTrail is not SQL query auditing. Visuals: 3, 8.

**PDF page 429** — Supported MySQL/MariaDB/PostgreSQL IAM authentication; Signed login token with fifteen-minute validity; TLS and caller role/instance identity; Database user/grants remain required; Expiry does not terminate existing sessions. Visuals: 9.

**PDF page 430** — Managed Oracle restore versus exported RMAN backup destination; No RAC in standard RDS Oracle; Self-managed EC2 responsibility; TDE and DMS compatibility/prerequisites. Visuals: 10.

**PDF page 431** — Logical MySQL export to an external compatible target; Consistent seed, replication catch-up and controlled stop/cutover; On-premises or EC2 external target. Visuals: 11.

**PDF page 432** — Lambda connection pressure; Proxy connection pooling and supported authentication; Private network requirement corrects historical public-proxy wording; Pinning and capacity constraints. Visuals: 12, 60.

**PDF page 433** — Cross-Region asynchronous replica; Application health route or metric/alarm detection; Controlled replica promotion; Endpoint/DNS cutover and old-writer fencing. Visuals: 14, 59.

**PDF page 434** — MySQL/PostgreSQL compatible SQL; Auto-growing distributed storage with current version-specific maximum; Replica reader endpoint; Cross-Region copy covers the database rather than arbitrary selected tables; Engine-specific S3 import/export; Backup/snapshot/restore. Visuals: 1, 15, 62.

**PDF page 435** — Six storage copies in three AZs; Four-of-six write and three-of-six read quorum concepts; Self-healing and distributed/striped storage; Compute promotion targets and failover timing qualification; Cross-Region support. Visuals: 15, 16.

**PDF page 436** — Auto-expanding shared storage; Reader compute Auto Scaling as separate control; Writer and reader endpoints; Connection balancing. Visuals: 19.

**PDF page 437** — Host/port endpoint concept; Writer endpoint follows primary; Reader connection balancing and no-reader exception; Custom subset endpoint; Instance endpoint for diagnosis. Visuals: 17.

**PDF page 438** — Selected replica subset for analytics; Different capacity/configuration intent; Reader endpoint remains useful rather than universally retired; Membership/ANY versus READER and restoration exceptions. Visuals: 18.

**PDF page 439** — Aurora MySQL error, slow, general and supported audit logs; Download or CloudWatch publication; Engine-specific controls and retention/access. Visuals: 20.

**PDF page 440** — Wait/SQL/host/user analysis; CloudWatch CPU/memory/swap trends; Enhanced Monitoring host/process detail; Slow-query evidence; Current Database Insights console disposition. Visuals: 21, 63.

**PDF page 441** — Elastic database compute for intermittent/unpredictable work; Supported Serverless v2 ACU bounds; Current auto-pause eligibility; Per-second capacity charging and complete cost comparison; Historic Serverless v1 proxy-fleet diagram disposition. Visuals: 22.

**PDF page 442** — HTTPS SQL without persistent client sockets; Data API and Secrets Manager authorization; Database credentials still used behind the interface; Current provisioned/Serverless support qualification. Visuals: 23.

**PDF page 443** — Proxy writer path; Additional Aurora read-only proxy endpoint; Reader target eligibility and connection behavior. Visuals: 13, 60.

**PDF page 444** — Cross-Region replica versus Global Database; Single primary writer and regional read clusters; Current up-to-ten-secondary topology and primary-reader trade-off; Async lag and controlled recovery; RPO/RTO need measurement rather than old unconditional timing; Aurora PostgreSQL supported RPO control context. Visuals: 24.

**PDF page 445** — Secondary write forwarding to primary; Change performed at primary before replication; Endpoint simplification with latency/consistency restrictions. Visuals: 25.

**PDF page 446** — Eligible RDS snapshot-to-Aurora restore; Eligible Aurora-replica migration/promotion; Source compatibility and tested application cutover. Visuals: 26.

**PDF page 522** — Document storage/query/index model; MongoDB API compatibility rather than identical engine; Managed primary/replica/distributed storage availability; Automatic storage growth and workload-specific scale claims. Visuals: 1, 54.

**PDF page 523** — On-demand instance billing and minimum period; Standard per-I/O model versus current I/O-Optimized exception; Storage and backup cost dimensions; Complete workload cost comparison. Visuals: 55.

**PDF page 524** — Time-series workloads and managed scaling; Memory/historical magnetic tiering; Scheduled SQL queries and multi-measure records; Time-series functions and analytics; Transit/rest encryption; Marketing speed/price figures disposition; LiveAnalytics availability versus InfluxDB products. Visuals: 1, 56.

**PDF page 525** — IoT/stream/Lambda/processing ingestion architecture; Queries through supported BI/JDBC/ML paths; Current product/engine-specific connector validation; Event time, retries and retention. Visuals: 57.


## Exact details and current-service dispositions

Five visible comparison tables provide deployment constraints, capacity arithmetic, topology exceptions, engine-specific prerequisites and historical-PDF corrections alongside the visual teaching lessons. See app/components/sap-precision-reference.json.

### RDS deployment, security and recovery

- **Classic Multi-AZ instance** — Synchronous standby provides availability and automatic endpoint failover. The standby does not serve reads. Read replicas are asynchronous and may require explicit promotion.
- **Multi-AZ DB cluster** — Supported MySQL/PostgreSQL deployments use a writer and two readable replicas across three AZs with semisynchronous replication. This differs from the classic non-readable standby.
- **Private connection path** — Validate subnet routing, DNS, security groups, supported port and database grants. Lambda needs supported private reachability to the database or proxy.
- **Backups and snapshots** — Automated backups enable point-in-time recovery within the configured retention window, up to 35 days. A standard RDS DB instance supports 0–35 days (0 disables automated backups); a Multi-AZ DB cluster requires 1–35 days. Defaults depend on the creation interface. Manual snapshots persist until deleted. Restore creates another database endpoint. Check encryption keys, engine compatibility and application consistency.
- **Regional recovery** — Copy eligible snapshots or use eligible cross-Region asynchronous replicas. Detect failure, fence the former writer, promote deliberately, validate data and cut over application endpoints. DNS changes alone do not promote a database.
- **Encryption layers** — KMS protects eligible storage, backups and snapshots. TLS protects the connection. Oracle/SQL Server TDE depends on engine/edition support; it is not interchangeable with network encryption.
- **Encrypt existing data** — Use a supported encrypted snapshot-copy and restore workflow; verify KMS policies and grants before cutover. Changing a connection setting does not encrypt an old volume.
- **IAM login** — Supported MySQL, MariaDB and PostgreSQL configurations accept a signed login token valid for 15 minutes. Caller rds-db:connect permission, database-user setup/grants and TLS remain required. Token expiry does not terminate an authenticated session.
- **Proxy constraints** — RDS Proxy uses private endpoints and supported database targets. Validate VPC connectivity, authentication and capacity. Session pinning reduces connection multiplexing; a proxy does not create unlimited database capacity.
- **Read-only proxy endpoint** — An additional read-only proxy endpoint can target eligible Aurora readers. It is not a generic endpoint for arbitrary ordinary RDS read replicas.
- **Oracle RMAN boundary** — Supported rdsadmin packages can produce RMAN backups for export and self-managed restoration. You cannot restore an arbitrary RMAN backup directly into managed RDS. Standard RDS Oracle does not provide RAC.
- **MySQL migration** — Export a consistent logical seed to a compatible external EC2/on-premises target, catch up replication where supported, stop/fence writes and test a controlled cutover. DMS has separate source/target and logging prerequisites.
- **Audit evidence** — CloudTrail records supported control-plane API actions, not every SQL statement. Use supported engine audit/general/slow/error logs for database evidence. RDS events through SNS complement CloudWatch metrics and query diagnosis.

### Aurora topology and operational exceptions

- **Storage versus compute** — Six storage copies across three AZs are separate from writer/reader compute instances. Classic storage-quorum concepts use four of six for writes and three of six for reads, with self-healing distributed storage.
- **Current storage capacity** — Eligible Aurora PostgreSQL 17.5+, 16.9+, 15.13+ and Aurora MySQL 3.10+ configurations support up to 256 TiB; older supported configurations can retain a 128-TiB maximum. Confirm engine/version eligibility.
- **Reader count and balancing** — An ordinary Aurora cluster supports up to 15 reader replicas. The reader endpoint balances new connections rather than individual SQL queries. With no reader, it connects to the writer and can accept writes.
- **Endpoint identity** — The writer endpoint follows the primary. Reader endpoints serve eligible reader connections; instance endpoints select a particular instance for diagnosis. Reconnect after failover and account for DNS/client connection caching.
- **Custom endpoint membership** — ANY versus READER types and static/exclusion membership affect routing. Console-created custom endpoints use ANY. A selected analytical subset does not remove those instances from the built-in reader endpoint. Custom endpoints are not restored from snapshots.
- **Scaling controls** — Storage grows independently from compute. Reader Auto Scaling changes eligible reader count within configured bounds, not the writer size. Serverless v2 scales supported ACUs within configured minimum/maximum bounds.
- **Serverless eligibility and costs** — Zero-ACU auto-pause requires supported versions/configurations and idle conditions. Capacity billing does not eliminate storage, I/O, backup or transfer charges. The old Serverless v1 proxy-fleet illustration is not the v2 architecture.
- **Data API** — Supported provisioned and Serverless Aurora configurations can execute SQL through HTTPS. Validate engine/Region eligibility, Data API IAM authorization, Secrets Manager access, applicable KMS permissions and database grants. Credentials remain necessary behind the interface.
- **Global topology** — Current eligible configurations allow up to 10 secondary Regions. Primary readers plus secondary clusters must not exceed 15; a secondary cluster supports up to 16 instances. Replication is asynchronous and applies database storage changes, not arbitrary selected tables.
- **Global recovery** — A planned synchronized switchover avoids data loss; unplanned failover can lose recent unreplicated changes. Measure lag, RPO, RTO and application reconnection. Supported Aurora PostgreSQL rds.global_db_rpo controls can block commits when all secondaries exceed the target lag.
- **Write forwarding** — A secondary forwards eligible writes to the primary, which commits before changes replicate back. Forwarding does not create independent regional writers or eliminate network latency and consistency restrictions.
- **Diagnosis** — Use current CloudWatch Database Insights console workflows for database load/waits and SQL/host/user dimensions, CloudWatch CPU/memory/swap metrics, Enhanced Monitoring host/process detail and engine slow-query evidence. Historical Performance Insights references require the current console/API distinction.
- **S3 integration** — Aurora MySQL LOAD DATA FROM S3 and SELECT INTO OUTFILE S3 need supported versions, cluster IAM-role configuration and bucket/KMS access. Aurora PostgreSQL aws_s3 import/export functions need extension setup, permissions and supported data formats. These are engine-specific operations, not arbitrary S3 filesystem access.
- **Migration** — Use an eligible RDS snapshot restore or supported Aurora read-replica migration/promotion path. Validate source version, extensions, parameters, client behavior, reconciliation, rollback and cutover before production traffic.

### DynamoDB exact limits and consistency

- **Item model** — Maximum item size is 400 KB including attribute names and values. Scalar types include String, Number, Binary, Boolean and Null; documents use List/Map; sets use String/Number/Binary. The Cassandra analogy does not imply compatible APIs.
- **Primary keys** — A partition-only key uniquely identifies an item. With a composite key, the partition-plus-sort-key pair is unique; related items can share a partition key. Diverse workload keys help distribute load.
- **Query versus Scan** — Query requires partition-key equality and supports optional sort-key conditions. Scan reads across items. Filter expressions are applied after reads and do not erase the read capacity already consumed; paginate results.
- **LSI** — Same partition key, alternate sort key; create only with the table. Up to five per table, 10-GB item-collection limit per partition-key value, shared table capacity. Supported LSI reads can request strong consistency.
- **GSI** — An alternate partition/sort key can be added later. Default quota is 20 per table, subject to approved increases. A GSI has separate provisioned capacity when that mode applies and supports eventual consistency only. Projections affect available attributes and cost.
- **Capacity mode** — Provisioned mode allocates capacity and can use configured Auto Scaling; on-demand mode charges for requests and adapts within supported limits. Neither design removes throttling, hot-partition risks or account/table quotas.
- **Read units** — For an individual read, round item size up to 4-KB units: strong = one unit, eventual = half a unit, transactional = two units. An 8-KB item needs 2, 1 or 4 units respectively. Batch/Query aggregation rules require the operation-specific calculation.
- **Write units** — For an individual standard write, round size up to 1-KB units; transactional writes use twice the units. A 2-KB item needs 2 standard or 4 transactional write units. Updates/deletes have their own charged-size rules.
- **Consistency scope** — Regional table and supported LSI reads may use strong consistency; GSIs remain eventual. A strongly consistent read of an MREC regional replica does not guarantee the latest write made in another Region.
- **Transactions** — Up to 100 distinct items/actions and 4 MB per transaction, within one account and Region. Conditional writes protect an individual precondition; multi-item transactions provide a different atomicity boundary.
- **TTL** — Use a numeric Unix-epoch timestamp in seconds. Removal is asynchronous and expired items can remain visible; enforce authorization/session expiry in application logic. TTL is not an exact scheduler.
- **Streams versus Kinesis** — Native Streams retains records for 24 hours with per-item order. Consumer retries can repeat processing even though native stream records themselves are not duplicated. Kinesis capture offers configured 24-hour to 365-day retention, but can deliver duplicates and changes out of order; checkpoint, deduplicate and reconcile.
- **MREC** — Multi-Region eventual consistency supports regional writes with asynchronous replication and conflict resolution. It uses Streams. The application selects suitable regional endpoints and handles failures; Route 53 does not automatically route DynamoDB SDK table operations.
- **MRSC** — Multi-Region strong consistency uses supported three-Region groups, with either three replicas or two replicas plus a non-client-serving witness. It does not require Streams. TTL, LSIs and transactions are not supported; GSIs remain eventual.
- **Table classes and backups** — Standard offers lower request cost and higher storage cost than Standard-IA. Both remain online; Standard-IA is not archive storage. On-demand backups and point-in-time recovery solve recovery history, independently of table class. DynamoDB PITR supports a configured 1–35-day window, default 35 days, with per-second recovery points; restore creates a new table.
- **S3 metadata index** — Store queryable object metadata in DynamoDB; the object remains in S3. Process supported object events reliably and reconcile missed/duplicate/out-of-order updates. Storage totals require maintained aggregates, not a free sum over all objects.

### DAX and ElastiCache decisions

- **DAX topology** — DynamoDB Accelerator is a managed regional DynamoDB cache requiring a DAX-aware client. Maximum cluster size is 11 nodes: one primary and up to 10 replicas. At least three nodes across AZs is the production availability recommendation; the source PDF ten-total limit is obsolete.
- **DAX request paths** — Hits return from DAX. Misses read DynamoDB and populate the cache. Writes through DAX go to DynamoDB and update applicable item-cache entries. Strong and transactional reads pass through without populating the cache.
- **DAX freshness** — Default TTL is five minutes with separately controlled item and query caches. Updating an item does not invalidate cached Query/Scan results. Direct-table or cross-Region updates can bypass a local cache; eventual reads may remain stale until expiry/refresh.
- **DAX security** — Deploy with supported private VPC connectivity and security groups, IAM authorization, at-rest KMS encryption and supported audit controls. DAX does not solve every write-heavy or hot-partition workload.
- **Cache contract** — DAX understands supported DynamoDB operations. ElastiCache stores application-selected values such as computed aggregates or sessions; the application owns keys, serialization, invalidation and fallback behavior.
- **Cache-aside** — The application checks the cache. On a miss it reads the database and fills the cache. The cache does not independently query an arbitrary RDS database. Test expiry, stampedes, outages, eviction and source load.
- **Write/invalidation order** — Write the authoritative store, then perform a selected update/invalidation strategy with race/retry handling. TTL bounds retained data age but does not guarantee immediate freshness. Session authorization must check its actual expiry.
- **Engine/deployment differences** — Valkey/Redis OSS replication and automatic failover differ from sharding for capacity. Replica reads may lag. Memcached multithreading and horizontal distribution do not imply the same persistence/failover contract.
- **Persistence exception** — Managed ElastiCache Valkey/Redis OSS does not provide generic self-managed AOF configuration. Node-based Memcached has no snapshot backup; Serverless Memcached supports snapshots. Validate engine, deployment and current feature support separately.
- **Extreme-rate bottlenecks** — Measure client, DNS, edge, API throttling, Lambda concurrency, network, database partitions, cache misses and cost as one path. The PDF historic node capacities, API/Lambda/edge defaults and unbounded queue claims are not current universal guarantees. S3 baseline is 5,500 GET/HEAD requests per second per partitioned prefix, not the PDF 5,550 typo; KMS can impose another quota. Detailed quotas belong to Modules 07/09 and later Modules 13–16.

### Search, documents and time-series boundaries

- **OpenSearch modes** — Managed domains and Serverless collections have different scaling and operational contracts. Serverless encryption/network/data-access policies and identity authorization are separate controls. OpenSearch is a derived search index, not a drop-in relational source of truth.
- **Pipeline roles** — Logstash or supported ingestion components transform/deliver data; OpenSearch indexes and searches it; Dashboards visualizes results. Retention and granularity depend on configuration, not a universal advantage over CloudWatch.
- **DynamoDB search index** — Source CRUD operations remain in DynamoDB. A supported Streams/Lambda or ingestion pipeline maintains the search view asynchronously. Handle initial backfill, updates, deletions, duplicates, retries and reconciliation; search is not immediately authoritative.
- **CloudWatch delivery** — Supported subscription/Lambda paths prioritize low-latency processing. Amazon Data Firehose buffers and delivers supported destinations. Validate destination compatibility, retry/rejected records and latency rather than assuming identical real-time behavior.
- **DocumentDB compatibility** — A managed document database with supported MongoDB-compatible APIs is not the identical MongoDB engine. Validate operators, drivers, indexes, transactions and workload behavior. Instance-based storage grows in 10-GB increments; eligible engine 8+ supports 256 TiB, earlier configurations 128 TiB; up to 15 readers.
- **DocumentDB pricing** — On-demand instance compute is billed per second with a ten-minute minimum. Standard charges supported I/O separately; I/O-Optimized changes the storage/I/O pricing model. Include reader instances, storage, backups, transfer and Region-specific prices; benchmark rather than asserting a universal throughput gain.
- **LiveAnalytics availability** — Timestream for LiveAnalytics stopped accepting new customers on 20 June 2025. Existing-service memory/magnetic tiering, SQL, scheduled queries, multi-measure records, time-series functions and encryption remain teaching concepts. Evaluate current Timestream for InfluxDB independently; APIs, connectors and tiering are not interchangeable.
- **Time-series pipeline** — Validate producer write formats, event time, late arrivals, retention, duplicates and retries. Supported IoT/Kinesis/Lambda/Flink, SQL/JDBC/BI/ML integrations depend on the chosen product. Historic marketing speed/price ratios are not architecture guarantees.

## Review and release gate

All 63 assets must pass semantic diagram/text review, readability review and publication-format validation before acceptance. Corrections include Aurora storage-copy numbering, overlapping custom-reader membership, synchronized switchover data-loss wording, DAX request routing and name, Standard table-class cost comparison, application-owned cache-aside arrows, and walkthrough cleanup order. Sandbox walkthroughs illustrate procedures; they do not claim an AWS account execution. The whole-course claim remains false because Modules 12–27 are planned.

## Primary sources

- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Endpoints.Reader.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Endpoints.Custom.Considerations.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Limits.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.configuration.requirements.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_DatabaseInsights.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/data-api.enabling.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2-auto-pause.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.Oracle.CommonDBATasks.RMAN.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Constraints.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ServiceQuotas.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/read-write-operations.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/streamsmain.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/kds.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.cluster.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.consistency.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/dax-deploy-cluster.html
- https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/backups-automatic.html
- https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/redis-ug.pdf
- https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-security.html
- https://docs.aws.amazon.com/documentdb/latest/devguide/what-is.html
- https://docs.aws.amazon.com/documentdb/latest/devguide/db-cluster-storage-configs.html
- https://aws.amazon.com/documentdb/pricing/
- https://docs.aws.amazon.com/timestream/latest/developerguide/AmazonTimestreamForLiveAnalytics-availability-change.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.LoadFromS3.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.SaveIntoS3.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_PostgreSQL.S3Import.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/postgresql-s3-export.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.overview.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.BackupRetention.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/PointInTimeRecovery_Howitworks.html

## Final validation

All 63 selected WebP assets were decoded and checked at 2048 × 1152; final hashes and sizes match module-11-visual-qa.json. All 423 active course assets decoded with unique lesson identifiers, sequences and paths. The final application build passed; both existing course visual-discovery tests passed. A production-server HTTP check returned Module 11 with 63 reviewed lessons, five visible reference tables and successful sampled asset responses. Existing Modules 01–10 comparison content is semantically unchanged.
