import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const ops = () => g("OPERATE & GOVERN", c("Cloud Monitoring", "Pipeline / query health"), c("Cloud Logging", "Execution logs"), c("IAM controls", "Least privilege", "IAM"));
const governed = (service: string, role: string, evidence = "Data / job audit"): GcpArchitectureBoard => b(`Governed ${service} production`, `Separate data access, execution identity and configuration ownership around ${service}, then retain operational evidence for every production change.`, `${service} governance pattern`,
  g("DATA ACCESS", c("IAM controls", "Dataset / runtime roles", "IAM"), c("Cloud KMS", "CMEK where required", "Cloud KMS")),
  g("CONFIGURATION", c(service, "Versioned configuration", service)),
  g("SERVICE CAPABILITY", c(service, role, service)),
  g("QUALITY / RELIABILITY", c("Cloud Monitoring", "Freshness / failures")),
  g("AUDIT", c("Cloud Audit Logs", evidence), c("Cloud Logging", "Runtime evidence"))
);
const pair = (primary: GcpArchitectureBoard, service: string, role: string, evidence?: string): GcpArchitectureBoard[] => [primary, governed(service, role, evidence)];

export const gcpAnalyticsArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "bigquery": pair(
    b("Streaming and batch analytics warehouse", "Land batch and streaming data in BigQuery, organize it into governed tables and serve SQL, BI and ML consumers without managing warehouse servers.", "Google Cloud BigQuery analytics platform pattern",
      g("DATA SOURCES", c("Applications", "Events / records", "app"), c("Cloud Storage", "Batch files")),
      g("INGESTION", c("Pub/Sub", "Streaming events"), c("Dataflow", "Transform / load")),
      g("ANALYTICS WAREHOUSE", c("BigQuery", "Partitioned / clustered tables")),
      g("CONSUMPTION", c("Looker", "Governed BI"), c("BigQuery ML", "In-warehouse ML", "BigQuery")),
      ops()), "BigQuery", "Serverless analytics warehouse", "Query / data audit"),
  "blockchain-analytics": pair(
    b("On-chain analytics platform", "Transform indexed blockchain activity into queryable BigQuery datasets and expose curated metrics to analysts, models and APIs.", "Google Cloud Blockchain Analytics pattern",
      g("CHAIN DATA", c("Blockchain ledger", "Blocks / transactions", "data")),
      g("INDEX / CURATE", c("Blockchain Analytics", "Curated chain data")),
      g("WAREHOUSE", c("BigQuery", "Queryable chain tables")),
      g("CONSUMPTION", c("Looker", "Dashboards"), c("Vertex AI", "Models / features")),
      ops()), "Blockchain Analytics", "Curated on-chain datasets"),
  "cloud-data-fusion": pair(
    b("Visual enterprise data integration", "Design pipelines with source and sink plugins, then execute transformations on managed data-processing runtimes while lineage and operations remain visible centrally.", "Google Cloud Cloud Data Fusion integration pattern",
      g("SOURCES", c("Enterprise databases", "Operational data", "database"), c("SaaS / files", "External data", "internet")),
      g("PIPELINE DESIGN", c("Cloud Data Fusion", "Visual pipeline + plugins")),
      g("PROCESSING RUNTIME", c("Dataproc", "Spark runtime"), c("Dataflow", "Beam runtime")),
      g("DESTINATIONS", c("BigQuery", "Analytics tables"), c("Cloud Storage", "Lake objects")),
      ops()), "Cloud Data Fusion", "Visual data integration"),
  "cortex-framework": pair(
    b("Enterprise data foundation with Cortex", "Ingest enterprise application data into standardized BigQuery layers, apply reusable transformations and expose governed business content to Looker.", "Google Cloud Cortex Framework enterprise data pattern",
      g("ENTERPRISE SOURCES", c("SAP / CRM", "Business data", "database")),
      g("INGESTION", c("Dataflow", "Pipeline ingestion"), c("Cloud Storage", "Landing zone")),
      g("DATA FOUNDATION", c("Cortex Framework", "Reusable models + content"), c("BigQuery", "Raw / curated layers")),
      g("BUSINESS ANALYTICS", c("Looker", "Dashboards / metrics")),
      ops()), "Cortex Framework", "Enterprise analytics content"),
  "data-studio": pair(
    b("Self-service analytics dashboard", "Connect Looker Studio to governed analytical sources so business users can explore and share reports without copying data into the visualization layer.", "Google Cloud Looker Studio reporting pattern",
      g("DATA SOURCES", c("BigQuery", "Warehouse data"), c("Cloud SQL", "Operational data")),
      g("SEMANTIC / CONNECTOR", c("Looker Studio", "Data source + fields", "Data Studio")),
      g("REPORTING", c("Looker Studio", "Charts / dashboards", "Data Studio")),
      g("CONSUMERS", c("Business users", "Interactive reports", "user")),
      ops()), "Data Studio", "Self-service reporting"),
  "dataflow": pair(
    b("Streaming event processing", "Consume events from Pub/Sub, apply windowed Apache Beam transformations in Dataflow and write durable analytical results to BigQuery with a dead-letter path.", "Google Cloud Dataflow streaming pipeline pattern",
      g("EVENT PRODUCERS", c("Applications", "Events", "app")),
      g("MESSAGING", c("Pub/Sub", "Durable event stream")),
      g("STREAM PROCESSING", c("Dataflow", "Beam windows + state")),
      g("OUTPUTS", c("BigQuery", "Analytics tables"), c("Cloud Storage", "Dead-letter / archive")),
      ops()), "Dataflow", "Managed Beam processing"),
  "dataform": pair(
    b("SQL transformation workflow", "Develop versioned SQLX transformations, compile dependencies and assertions, then execute governed warehouse transformations directly in BigQuery.", "Google Cloud Dataform BigQuery transformation pattern",
      g("SOURCE DATA", c("BigQuery", "Raw datasets")),
      g("SQL DEVELOPMENT", c("Dataform", "SQLX + dependency graph")),
      g("TRANSFORMATION", c("BigQuery", "Compiled SQL jobs")),
      g("CURATED DATA", c("BigQuery", "Trusted marts"), c("Looker", "BI consumption")),
      ops()), "Dataform", "BigQuery SQL orchestration"),
  "dataproc-metastore": pair(
    b("Shared lake metadata for Spark", "Keep Hive-compatible table metadata in a managed metastore while Spark engines read the underlying lake data directly from object storage.", "Google Cloud Dataproc Metastore lake pattern",
      g("DATA LAKE", c("Cloud Storage", "Parquet / lake files")),
      g("METADATA", c("Dataproc Metastore", "Hive table metadata")),
      g("COMPUTE", c("Dataproc", "Spark / Hive"), c("Managed Spark", "Serverless Spark", "Managed Service for Apache Spark")),
      g("ANALYTICS", c("BigQuery", "Federated / downstream analytics")),
      ops()), "Dataproc Metastore", "Managed Hive metadata"),
  "datastream": pair(
    b("Database change data capture", "Read database transaction logs continuously, stream changes through Datastream and land them in BigQuery or Cloud Storage for near-real-time analytics.", "Google Cloud Datastream CDC pattern",
      g("SOURCE DATABASE", c("Cloud SQL", "Operational database"), c("External database", "Oracle / MySQL / PostgreSQL", "database")),
      g("CHANGE CAPTURE", c("Datastream", "CDC + backfill")),
      g("DESTINATIONS", c("BigQuery", "Replicated analytics"), c("Cloud Storage", "Change objects")),
      g("CONSUMERS", c("Looker", "Near-real-time BI"), c("Dataflow", "Further processing")),
      ops()), "Datastream", "Serverless CDC"),
  "knowledge-catalog": pair(
    b("Enterprise data discovery and stewardship", "Discover analytical assets, enrich them with business metadata and glossary terms, and let users search for trusted data without granting access through the catalog itself.", "Google Cloud data catalog stewardship pattern",
      g("DATA ASSETS", c("BigQuery", "Datasets / tables"), c("Cloud Storage", "Lake data")),
      g("METADATA INGESTION", c("Dataplex", "Discovery / metadata")),
      g("CATALOG", c("Knowledge Catalog", "Business metadata + search")),
      g("USERS", c("Analysts / stewards", "Discover + curate", "user")),
      ops()), "Knowledge Catalog", "Data discovery + metadata"),
  "lakehouse": pair(
    b("Open lakehouse analytics", "Keep durable data in object storage and open table formats, govern it through a shared catalog and query the same datasets with BigQuery and Spark engines.", "Google Cloud lakehouse architecture pattern",
      g("DATA SOURCES", c("Operational systems", "Batch / streaming data", "database")),
      g("LAKE STORAGE", c("Cloud Storage", "Open data files")),
      g("CATALOG / GOVERNANCE", c("Dataplex", "Catalog + governance"), c("BigLake", "Governed tables")),
      g("QUERY ENGINES", c("BigQuery", "Serverless SQL"), c("Managed Spark", "Spark processing", "Managed Service for Apache Spark")),
      ops()), "Lakehouse", "Open analytical architecture"),
  "looker": pair(
    b("Governed business intelligence", "Model warehouse data once in LookML and let dashboards, explores and embedded applications reuse the same governed metrics.", "Google Cloud Looker governed BI pattern",
      g("WAREHOUSE", c("BigQuery", "Analytical data")),
      g("SEMANTIC MODEL", c("Looker", "LookML metrics")),
      g("ANALYTICS", c("Looker", "Explores + dashboards")),
      g("CONSUMERS", c("Business users", "Governed insights", "user"), c("Embedded app", "Analytics API", "app")),
      ops()), "Looker", "Governed semantic BI"),
  "managed-service-for-apache-airflow": pair(
    b("Data pipeline orchestration with Cloud Composer", "Schedule a DAG in managed Airflow, run processing in external data services and keep the orchestrator focused on dependencies and state rather than heavy data work.", "Google Cloud Composer orchestration pattern",
      g("DAG SOURCE", c("Cloud Storage", "DAG files"), c("Secure Source Manager", "Reviewed code")),
      g("ORCHESTRATION", c("Cloud Composer", "Managed Apache Airflow", "Managed Service for Apache Airflow")),
      g("DATA SERVICES", c("Dataflow", "Streaming / batch"), c("BigQuery", "SQL jobs"), c("Dataproc", "Spark jobs")),
      g("RESULTS", c("BigQuery", "Curated datasets"), c("Cloud Storage", "Pipeline outputs")),
      ops()), "Managed Service for Apache Airflow", "Managed Airflow orchestration"),
  "managed-service-for-apache-kafka": pair(
    b("Managed Kafka event backbone", "Publish partitioned events to a managed Kafka cluster and let independent consumer groups process the same durable stream at their own pace.", "Google Cloud Managed Service for Apache Kafka pattern",
      g("PRODUCERS", c("Applications", "Kafka records", "app")),
      g("EVENT BACKBONE", c("Managed Service for Apache Kafka", "Topics + partitions")),
      g("CONSUMERS", c("Dataflow", "Stream processing"), c("GKE", "Kafka consumers")),
      g("ANALYTICS / ARCHIVE", c("BigQuery", "Analytics"), c("Cloud Storage", "Archive")),
      ops()), "Managed Service for Apache Kafka", "Managed Kafka event streams"),
  "managed-service-for-apache-spark": pair(
    b("Serverless Spark lake processing", "Submit Spark code without a persistent cluster, read lake data from Cloud Storage and write transformed output to BigQuery or open storage.", "Google Cloud serverless Spark batch pattern",
      g("CODE / NOTEBOOK", c("Spark application", "PySpark / Scala / SQL", "file")),
      g("SERVERLESS COMPUTE", c("Managed Service for Apache Spark", "Ephemeral Spark runtime")),
      g("DATA SOURCES", c("Cloud Storage", "Lake files"), c("BigQuery", "Warehouse tables")),
      g("OUTPUT", c("BigQuery", "Curated tables"), c("Cloud Storage", "Processed data")),
      ops()), "Managed Service for Apache Spark", "Serverless Spark runtime"),
  "manufacturing-data-engine": pair(
    b("Contextualized manufacturing analytics", "Ingest plant telemetry securely, map raw signals to an asset model and expose contextualized operational data to analytics and AI consumers.", "Google Cloud Manufacturing Data Engine pattern",
      g("FACTORY / EDGE", c("Machines / sensors", "OT telemetry", "compute")),
      g("INGESTION", c("Pub/Sub", "Telemetry stream"), c("Dataflow", "Stream processing")),
      g("CONTEXTUALIZATION", c("Manufacturing Data Engine", "Asset + event model")),
      g("ANALYTICS / AI", c("BigQuery", "Operational analytics"), c("Vertex AI", "Predictive models")),
      ops()), "Manufacturing Data Engine", "Contextualized OT data"),
  "pub-sub": pair(
    b("Event-driven application backbone", "Publish events once to Pub/Sub and fan them out through independent subscriptions to serverless, streaming and analytical consumers.", "Google Cloud Pub/Sub event-driven pattern",
      g("PUBLISHERS", c("Applications", "Events", "app"), c("Google Cloud services", "Service events", "Google Cloud")),
      g("MESSAGING", c("Pub/Sub", "Topics + retained messages")),
      g("SUBSCRIBERS", c("Cloud Run", "Push consumer"), c("Dataflow", "Streaming consumer")),
      g("DATA / RESULT", c("BigQuery", "Event analytics"), c("Cloud Storage", "Archive")),
      ops()), "Pub/Sub", "Global asynchronous messaging")
};
