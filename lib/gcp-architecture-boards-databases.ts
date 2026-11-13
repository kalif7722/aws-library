import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const ops = () => g("OPERATE & GOVERN", c("Cloud Monitoring", "DB health / latency"), c("Cloud Logging", "Database / connection logs"), c("IAM controls", "Least privilege", "IAM"));
const governed = (service: string, role: string): GcpArchitectureBoard => b(`Governed ${service} production`, `Keep ${service} network access, database identity, backup policy and recovery evidence independently owned so a healthy managed control plane does not hide application or data risk.`, `${service} governance pattern`,
  g("IDENTITY / NETWORK", c("IAM controls", "Admin / runtime separation", "IAM"), c("VPC network", "Private database path", "VPC")),
  g("DATABASE", c(service, role, service)),
  g("PROTECTION", c("Cloud KMS", "CMEK where required", "Cloud KMS"), c("Backup / PITR", "Recovery points", "data")),
  g("VALIDATION", c("Application probes", "Read / write health", "monitor")),
  g("AUDIT", c("Cloud Audit Logs", "Admin evidence"), c("Cloud Monitoring", "SLO / capacity"))
);
const pair = (primary: GcpArchitectureBoard, service: string, role: string): GcpArchitectureBoard[] => [primary, governed(service, role)];

export const gcpDatabaseArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "alloydb": pair(
    b("High-performance PostgreSQL application", "Route private application traffic to an AlloyDB primary for writes, scale read-heavy traffic through read pools and keep durable storage and recovery independent from compute instances.", "Google Cloud AlloyDB production architecture",
      g("APPLICATIONS", c("Cloud Run", "Application services"), c("GKE", "Container workloads")),
      g("PRIVATE ACCESS", c("VPC network", "Private service path", "VPC"), c("AlloyDB Auth Proxy", "Secure DB connection", "security")),
      g("DATABASE COMPUTE", c("AlloyDB", "Primary writes"), c("Read pool", "Horizontal reads", "AlloyDB")),
      g("DATA / RECOVERY", c("AlloyDB storage", "Distributed durable data", "AlloyDB"), c("Backup / replica", "PITR + DR", "AlloyDB")),
      ops()), "AlloyDB", "Managed PostgreSQL-compatible cluster"),
  "alloydb-omni": pair(
    b("AlloyDB Omni on customer-managed infrastructure", "Run AlloyDB Omni close to applications in Kubernetes or Linux while the customer owns hosts, persistent storage, HA and backup lifecycle.", "Google Cloud AlloyDB Omni Kubernetes pattern",
      g("APPLICATIONS", c("Enterprise applications", "PostgreSQL clients", "app")),
      g("CUSTOMER PLATFORM", c("GKE / Kubernetes", "Customer-managed runtime", "GKE"), c("Linux hosts", "VM / bare metal", "Compute Engine")),
      g("DATABASE", c("AlloyDB Omni", "PostgreSQL-compatible engine")),
      g("PERSISTENT DATA", c("Persistent storage", "Customer-managed volumes", "data"), c("Cloud Storage", "Backup / export")),
      ops()), "AlloyDB Omni", "Portable AlloyDB database engine"),
  "bigtable": pair(
    b("Low-latency time-series platform", "Ingest high-volume events through a streaming pipeline, distribute writes across well-designed row keys and serve low-latency reads from replicated Bigtable clusters.", "Google Cloud Bigtable time-series pattern",
      g("EVENT SOURCES", c("Devices / applications", "High-volume events", "app")),
      g("INGESTION", c("Pub/Sub", "Event buffer"), c("Dataflow", "Stream transforms")),
      g("DATABASE", c("Bigtable", "Wide-column serving store")),
      g("CONSUMERS", c("Cloud Run", "Low-latency API"), c("BigQuery", "Analytical export")),
      ops()), "Bigtable", "Wide-column low-latency database"),
  "cloud-sql": pair(
    b("Highly available managed relational database", "Keep application traffic on private connectivity, use regional HA for instance failure, add read replicas for scale and retain automated backup/PITR for data recovery.", "Google Cloud Cloud SQL HA application pattern",
      g("APPLICATIONS", c("Cloud Run", "Application service"), c("GKE", "Container application")),
      g("PRIVATE CONNECTION", c("Cloud SQL Connectors", "TLS / IAM connection", "Cloud SQL"), c("VPC network", "Private IP path", "VPC")),
      g("DATABASE", c("Cloud SQL", "Primary + HA standby"), c("Read replica", "Read scaling", "Cloud SQL")),
      g("PROTECTION", c("Automated backups", "PITR", "Cloud SQL"), c("Cloud Storage", "Logical exports")),
      ops()), "Cloud SQL", "Managed MySQL / PostgreSQL / SQL Server"),
  "database-migration-service": pair(
    b("Continuous database migration", "Seed a target database, replicate ongoing source changes and cut over only after lag, compatibility and application validation are within the migration window.", "Google Cloud Database Migration Service continuous migration pattern",
      g("SOURCE DATABASE", c("On-prem / cloud DB", "Migration source", "database")),
      g("PRIVATE CONNECTIVITY", c("Cloud VPN", "Encrypted path"), c("VPC network", "Database network", "VPC")),
      g("MIGRATION", c("Database Migration Service", "Initial load + CDC")),
      g("TARGET DATABASE", c("Cloud SQL", "Managed target"), c("AlloyDB", "PostgreSQL target")),
      g("CUTOVER / VERIFY", c("Application validation", "Lag + correctness", "monitor"), c("Cloud Monitoring", "Target health"))), "Database Migration Service", "Managed migration orchestration"),
  "firestore-in-datastore-mode": pair(
    b("Serverless entity datastore application", "Serve application entities through Firestore in Datastore mode, use indexes for query access and decouple downstream processing through events rather than database polling.", "Google Cloud Firestore in Datastore mode application pattern",
      g("APPLICATIONS", c("App Engine", "Web application"), c("Cloud Run", "API service")),
      g("DOCUMENT DATABASE", c("Firestore in Datastore mode", "Entities + indexes", "Firestore")),
      g("ASYNC PROCESSING", c("Pub/Sub", "Domain events"), c("Cloud Tasks", "Background work")),
      g("ANALYTICS / EXPORT", c("BigQuery", "Analytical copy"), c("Cloud Storage", "Export / archive")),
      ops()), "Firestore in Datastore mode", "Serverless entity database"),
  "firestore-with-mongodb-compatibility": pair(
    b("MongoDB-compatible serverless application", "Reuse MongoDB drivers against a managed Firestore-compatible backend while keeping application sessions stateless and analytical exports outside the serving database.", "Google Cloud Firestore MongoDB compatibility pattern",
      g("APPLICATIONS", c("Cloud Run", "MongoDB client app"), c("GKE", "Service workloads")),
      g("MONGODB API", c("MongoDB driver", "Compatible protocol", "app")),
      g("DATABASE", c("Firestore with MongoDB compatibility", "Documents + indexes", "Firestore")),
      g("DOWNSTREAM", c("Pub/Sub", "Application events"), c("BigQuery", "Analytics")),
      ops()), "Firestore with MongoDB compatibility", "MongoDB-compatible document database"),
  "memorystore-for-redis-cluster": pair(
    b("Distributed application cache", "Place a Redis Cluster cache between stateless application services and the authoritative database so hot reads and ephemeral state scale independently from the system of record.", "Google Cloud Memorystore for Redis Cluster caching pattern",
      g("APPLICATIONS", c("Cloud Run", "Stateless services"), c("GKE", "Container services")),
      g("PRIVATE NETWORK", c("VPC network", "Private cache path", "VPC")),
      g("CACHE", c("Memorystore for Redis Cluster", "Sharded cache + replicas")),
      g("SYSTEM OF RECORD", c("Cloud SQL", "Relational data"), c("Spanner", "Distributed transactions")),
      ops()), "Memorystore for Redis Cluster", "Sharded managed Redis cache"),
  "memorystore-for-valkey": pair(
    b("Managed Valkey caching tier", "Use a private managed Valkey tier for frequently accessed data, sessions or transient application state while durable records remain in an authoritative database.", "Google Cloud Memorystore for Valkey caching pattern",
      g("APPLICATIONS", c("Cloud Run", "Application services"), c("GKE", "Microservices")),
      g("PRIVATE ACCESS", c("VPC network", "Private endpoint path", "VPC")),
      g("CACHE", c("Memorystore for Valkey", "Managed in-memory data")),
      g("DURABLE DATA", c("Cloud SQL", "System of record"), c("Bigtable", "High-scale serving")),
      ops()), "Memorystore for Valkey", "Managed Valkey in-memory store"),
  "spanner": pair(
    b("Globally distributed transactional application", "Serve strongly consistent transactions from a multi-region Spanner database while stateless application tiers scale independently across regions.", "Google Cloud Spanner multi-region application pattern",
      g("GLOBAL CLIENTS", c("Web / mobile", "Requests", "user")),
      g("APPLICATION TIER", c("Cloud Run", "Regional services"), c("GKE", "Regional services")),
      g("GLOBAL DATABASE", c("Spanner", "Multi-region transactions")),
      g("DATA PIPELINES", c("Change Streams", "CDC events", "Spanner"), c("BigQuery", "Analytics")),
      ops()), "Spanner", "Horizontally scalable relational database")
};
