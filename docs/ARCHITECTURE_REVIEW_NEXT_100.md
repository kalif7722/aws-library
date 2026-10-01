# Next 100 service architecture reviews

This release reviews 100 previously pending catalog services in ten batches: 40 AWS, 30 Azure and 30 GCP. No aliases are added to reach that target. Four AWS networking controls share one actual public application architecture, producing 97 distinct new diagrams and 935 explicitly authored node occurrences.

The new diagrams show the surrounding workload and explicit connections, including clients, identity, ingress, application execution, data, asynchronous workers, and relevant operational branches. A CDN is shown for static assets where selected, rather than inserted into every private or administrative path. Associated WAF/firewall policy, BGP control, detection evidence, deployment and human acceptance use distinct connection semantics.

| Batch | Provider and scope | Catalog services | Distinct diagrams | Node occurrences |
| --- | --- | ---: | ---: | ---: |
| 1 | AWS VPC routing, controls and network investigation | 10 | 7 | 60 |
| 2 | AWS certificates, security evidence and fine-grained authorization | 10 | 10 | 104 |
| 3 | AWS database, search and Kafka workloads | 10 | 10 | 98 |
| 4 | AWS hosting, configuration, delivery and batch execution | 10 | 10 | 106 |
| 5 | Azure connectivity, ingress and network operations | 10 | 10 | 94 |
| 6 | Azure databases, storage and data products | 10 | 10 | 86 |
| 7 | Azure release, real-time updates and fleet operations | 10 | 10 | 104 |
| 8 | GCP connectivity, network security and release trust | 10 | 10 | 99 |
| 9 | GCP databases, lake processing and analytics | 10 | 10 | 85 |
| 10 | GCP hosting, discovery and operations | 10 | 10 | 99 |
| Total | | 100 | 97 | 935 |

Google Cloud Batch uses a provider-qualified registry key so its diagram cannot replace Azure Batch. Each new diagram references official documentation. Database-specific examples replace unrelated default backend/data paths; workers connect to their actual input and output stores, and analytical consumers have explicit query/publication connections.

Validation includes exact hover resolution, valid connection endpoints, unique node labels, no disconnected diagram components, database-path regression checks, actual worker read/write connections, and server rendering of every node and connection list for all 100 services. All 26 focused tests and the production build pass. The broader suite passes 29/31 tests; the unchanged starter tests for development preview metadata and unused animation utility CSS fail against this production build. Their source tests, layout and global CSS match the preceding remote commit. Automated visual browser testing of the local preview was blocked by the browser environment, so this release does not claim a completed screenshot audit.

Overall catalog coverage is now AWS 101/321, Azure 76/203 and GCP 67/177: 244 reviewed, 457 pending. The explicit registry contains 203 distinct workflows and 1,450 node occurrences, plus the separate four financial workflows and 21 financial node occurrences. Older diagrams outside these selections remain pending; this is not a whole-catalog sign-off.

## Services in each batch

The exact batch registry is maintained in `lib/reviewed-scale-architectures.ts` and its ten authored modules. See [completed and pending services](ARCHITECTURE_REVIEW_SERVICE_LIST.md) for the complete catalog list.

### Batch 1: AWS

- Amazon VPC
- Amazon EC2 security groups
- Network ACLs
- Internet gateways
- Egress-only internet gateways
- VPC peering
- VPC Flow Logs
- VPC Reachability Analyzer
- AWS Network Access Analyzer
- Elastic IP Addresses

### Batch 2: AWS

- AWS Certificate Manager
- AWS Private CA
- Amazon Macie
- Amazon Inspector
- Amazon Detective
- Amazon Security Lake
- Amazon Verified Permissions
- AWS Shield Advanced
- AWS Firewall Manager
- AWS CloudTrail Lake

### Batch 3: AWS

- Amazon RDS Proxy
- Amazon DynamoDB Accelerator (DAX)
- Amazon DynamoDB Streams
- Amazon MemoryDB
- Amazon DocumentDB
- Amazon Keyspaces
- Amazon Neptune
- Amazon Redshift
- Amazon OpenSearch Service
- Amazon Managed Streaming for Apache Kafka

### Batch 4: AWS

- AWS App Runner
- AWS Elastic Beanstalk
- AWS Batch
- Amazon EC2 Auto Scaling
- AWS AppConfig
- AWS AppSync
- AWS Cloud Map
- AWS CodeArtifact
- AWS Signer
- AWS SAM

### Batch 5: Azure

- Azure ExpressRoute
- Azure Load Balancer
- Azure Traffic Manager
- Azure Bastion
- Azure Firewall
- Azure DDoS Protection
- Azure Virtual Network
- Azure Virtual WAN
- Azure Route Server
- Azure Network Watcher

### Batch 6: Azure

- Azure Database for MySQL Flexible Server
- Azure Database for PostgreSQL Flexible Server
- Azure SQL Managed Instance
- Azure Table Storage
- Storage Accounts
- Archive Storage
- Azure NetApp Files
- Azure Data Explorer
- Azure Databricks
- Microsoft Fabric

### Batch 7: Azure

- Static Web Apps
- Virtual Machine Scale Sets
- Azure Repos
- Azure Artifacts
- Azure App Configuration
- Azure SignalR Service
- Azure Web PubSub
- Update management center
- Azure Arc
- Azure Advisor

### Batch 8: GCP

- Cloud Interconnect
- Network Connectivity Center (NCC)
- Virtual Private Cloud (VPC)
- Cloud NGFW
- Cloud IDS
- VPC Service Controls
- Binary Authorization
- Artifact Analysis
- Sensitive Data Protection
- Certificate Manager

### Batch 9: GCP

- AlloyDB
- Bigtable
- Firestore in Datastore mode
- Datastream
- Dataform
- Managed Service for Apache Spark
- Dataproc Metastore
- Cloud Data Fusion
- Looker
- Logging

### Batch 10: GCP

- App Engine
- Cloud Service Mesh
- Service Directory
- VM Manager
- Infra Manager
- Cloud Asset Inventory
- Recommender
- Error Reporting
- Profiler
- Batch
