import { gcpServices, type GcpService } from "./gcp-data";
import { gcpOfficialExamDomains, type GcpExamSkill } from "./gcp-all-exam-objectives";

const normalize = (value: string) => value.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

const manualAliases: Record<string, string[]> = {
  "google kubernetes engine": ["google-kubernetes-engine"], gke: ["google-kubernetes-engine"],
  "cloud iam": ["identity-and-access-management"], iam: ["identity-and-access-management"], "identity and access management": ["identity-and-access-management"],
  vpc: ["virtual-private-cloud"], "virtual private cloud": ["virtual-private-cloud"],
  "cloud logging": ["logging"], "cloud monitoring": ["monitoring"], "google cloud observability": ["monitoring", "logging", "trace", "profiler", "error-reporting"], "cloud trace": ["trace"], "cloud profiler": ["profiler"], "error reporting": ["error-reporting"],
  "cloud kms": ["cloud-kms"], "cloud key management service": ["cloud-kms"],
  "security command center": ["security-command-center"], scc: ["security-command-center"],
  "google security operations": ["google-secops"], secops: ["google-secops"],
  "cloud ngfw": ["cloud-ngfw"], "cloud next generation firewall": ["cloud-ngfw"],
  "network connectivity center": ["network-connectivity-center"], ncc: ["network-connectivity-center"], "network intelligence center": ["network-intelligence-center"],
  "cloud service mesh": ["cloud-service-mesh"], "sensitive data protection": ["sensitive-data-protection"], "cloud dlp": ["sensitive-data-protection"],
  "certificate authority service": ["ca-service"], "ca service": ["ca-service"],
  "agent platform": ["gemini-enterprise-agent-platform"], "gemini enterprise": ["gemini-enterprise-agent-platform"], "agent search": ["gemini-enterprise-agent-platform"], "model garden": ["gemini-enterprise-agent-platform"], "vertex ai": ["gemini-enterprise-agent-platform"],
  "cloud composer": ["managed-service-for-apache-airflow"], "managed service for apache airflow": ["managed-service-for-apache-airflow"],
  "memorystore for redis": ["memorystore-for-redis-cluster"], memorystore: ["memorystore-for-redis-cluster"],
  "cloud api gateway": ["api-gateway"], "api gateway": ["api-gateway"],
  "cloud source repositories": ["cloud-source-repositories"], "cloud workstations": ["cloud-workstations"],
  "cloud interconnect": ["cloud-interconnect"], "cloud vpn": ["cloud-vpn"], "cloud router": ["cloud-router"], "cloud nat": ["cloud-nat"], "cloud dns": ["cloud-dns"], "cloud armor": ["cloud-armor"], "secure web proxy": ["secure-web-proxy"],
  "cloud storage": ["cloud-storage"], gcs: ["cloud-storage"], filestore: ["filestore"], "netapp volumes": ["netapp-volumes"],
  "backup and dr": ["backup-and-dr-service"], "backup and dr service": ["backup-and-dr-service"],
  "cloud run functions": ["cloud-run-functions"], "cloud functions": ["cloud-run-functions"],
  "cloud load balancing": ["cloud-load-balancing"], "load balancer": ["cloud-load-balancing"], "load balancing": ["cloud-load-balancing"],
  "private service connect": ["private-service-connect"],
  "vpc service controls": ["vpc-service-controls"],
  "identity aware proxy": ["identity-aware-proxy"], iap: ["identity-aware-proxy"],
  "secret manager": ["secret-manager"], "artifact registry": ["artifact-registry"], "cloud build": ["cloud-build"], "cloud deploy": ["cloud-deploy"],
  "migration center": ["migration-center"], "database migration service": ["database-migration-service"], "storage transfer service": ["storage-transfer-service"],
  "cloud data fusion": ["cloud-data-fusion"], dataflow: ["dataflow"], dataproc: ["dataproc"], "pub sub": ["pub-sub"], "pub/sub": ["pub-sub"],
  looker: ["looker"], bigquery: ["bigquery"], "cloud sql": ["cloud-sql"], alloydb: ["alloydb"], spanner: ["spanner"], firestore: ["firestore"], bigtable: ["bigtable"],
  apigee: ["apigee"], eventarc: ["eventarc"], workflows: ["workflows"], "cloud scheduler": ["cloud-scheduler"], "cloud tasks": ["cloud-tasks"],
  "model armor": ["model-armor"], "cloud identity": ["cloud-identity"], "cloud asset inventory": ["cloud-asset-inventory"],
};

const courseRequiredTerms: Record<string, string[]> = {
  PCA: [
    "Compute Engine", "Google Kubernetes Engine", "Cloud Run", "Cloud Run functions", "Cloud Storage", "Filestore", "NetApp Volumes", "Backup and DR Service",
    "BigQuery", "Cloud SQL", "AlloyDB", "Spanner", "Firestore", "Bigtable", "Pub/Sub", "Dataflow",
    "Virtual Private Cloud", "Cloud Load Balancing", "Cloud DNS", "Cloud NAT", "Cloud VPN", "Cloud Interconnect", "Cloud Router", "Cloud Armor", "Private Service Connect",
    "Identity and Access Management", "Cloud KMS", "Secret Manager", "VPC Service Controls", "Identity-Aware Proxy", "Security Command Center", "Sensitive Data Protection", "Model Armor",
    "Artifact Registry", "Cloud Build", "Cloud Deploy", "Apigee", "Service Catalog", "Migration Center", "Database Migration Service",
    "Monitoring", "Logging", "Trace", "Profiler", "Error Reporting"
  ],
  PCD: [
    "Compute Engine", "Google Kubernetes Engine", "Cloud Run", "Cloud Run functions", "App Engine", "API Gateway", "Apigee", "Cloud Tasks", "Pub/Sub", "Eventarc", "Workflows",
    "Cloud SQL", "Firestore", "Spanner", "Bigtable", "Memorystore for Redis", "Cloud Storage", "Secret Manager", "Identity and Access Management", "Cloud KMS",
    "Artifact Registry", "Cloud Build", "Cloud Deploy", "Cloud Workstations", "Cloud Source Repositories", "Monitoring", "Logging", "Trace", "Error Reporting"
  ],
  PDE: [
    "BigQuery", "Cloud Storage", "Pub/Sub", "Dataflow", "Dataproc", "Managed Service for Apache Airflow", "Dataform", "Cloud Data Fusion", "Datastream", "Analytics Hub", "Looker",
    "Cloud SQL", "AlloyDB", "Spanner", "Firestore", "Bigtable", "Database Migration Service", "Storage Transfer Service", "Identity and Access Management", "Cloud KMS", "Monitoring", "Logging"
  ],
  PCDE: [
    "Cloud SQL", "AlloyDB", "Spanner", "Firestore", "Bigtable", "Memorystore for Redis", "Database Migration Service", "Datastream", "Backup and DR Service",
    "Virtual Private Cloud", "Private Service Connect", "Identity and Access Management", "Cloud KMS", "Monitoring", "Logging"
  ],
  PMLE: [
    "Gemini Enterprise Agent Platform", "BigQuery", "Cloud Storage", "Dataflow", "Dataproc", "Managed Service for Apache Airflow", "Google Kubernetes Engine", "Cloud Run", "Pub/Sub",
    "Cloud Build", "Monitoring", "Logging", "Sensitive Data Protection", "Model Armor"
  ],
  PCSE: [
    "Cloud Identity", "Identity and Access Management", "Access Context Manager", "Identity-Aware Proxy", "Cloud KMS", "Secret Manager", "VPC Service Controls", "Virtual Private Cloud",
    "Cloud Armor", "Cloud NGFW", "Security Command Center", "Sensitive Data Protection", "Certificate Authority Service", "Artifact Registry", "Cloud Build", "Cloud Deploy",
    "Monitoring", "Logging", "Cloud Asset Inventory", "Model Armor"
  ],
  PCDOE: [
    "Cloud Build", "Cloud Deploy", "Artifact Registry", "Google Kubernetes Engine", "Cloud Run", "Compute Engine", "Cloud Workstations", "Cloud Source Repositories",
    "Monitoring", "Logging", "Trace", "Profiler", "Error Reporting", "Service Health", "Pub/Sub", "Cloud Tasks", "Workflows"
  ],
  PCNE: [
    "Virtual Private Cloud", "Cloud Load Balancing", "Cloud DNS", "Cloud NAT", "Cloud VPN", "Cloud Interconnect", "Cloud Router", "Network Connectivity Center", "Network Intelligence Center",
    "Cloud Armor", "Cloud NGFW", "Cloud Service Mesh", "Private Service Connect", "Secure Web Proxy", "Google Kubernetes Engine", "Monitoring", "Logging"
  ],
  PAA: [
    "Gemini Enterprise Agent Platform", "BigQuery", "Cloud Run", "Cloud SQL", "Cloud Storage", "Firestore", "Google Kubernetes Engine", "Memorystore for Redis", "Model Armor",
    "Sensitive Data Protection", "Monitoring", "Logging"
  ],
  PSOE: [
    "Google Security Operations", "Security Command Center", "Sensitive Data Protection", "Cloud Asset Inventory", "Logging", "Monitoring", "Model Armor", "Web Risk"
  ],
  ACE: [
    "Compute Engine", "Google Kubernetes Engine", "Cloud Run", "Cloud Run functions", "Artifact Registry", "Cloud Workstations", "Cloud Storage", "Filestore", "NetApp Volumes",
    "Cloud SQL", "BigQuery", "Firestore", "Spanner", "Bigtable", "AlloyDB", "Dataflow", "Pub/Sub", "Memorystore for Redis", "Storage Transfer Service",
    "Virtual Private Cloud", "Cloud Load Balancing", "Cloud NGFW", "Cloud VPN", "Cloud Interconnect", "Cloud DNS", "Cloud NAT",
    "Identity and Access Management", "Cloud Identity", "Cloud Asset Inventory", "Cloud KMS", "Monitoring", "Logging", "Trace", "Profiler", "Service Health"
  ],
  ADP: [
    "Cloud Storage", "BigQuery", "Cloud SQL", "Firestore", "Bigtable", "Spanner", "Storage Transfer Service", "Database Migration Service", "Cloud Data Fusion", "Dataflow", "Dataproc",
    "Managed Service for Apache Airflow", "Dataform", "Cloud Scheduler", "Workflows", "Pub/Sub", "Eventarc", "Looker", "Analytics Hub", "Identity and Access Management", "Cloud KMS", "Monitoring", "Logging"
  ],
  GAL: [
    "Gemini Enterprise Agent Platform", "Cloud Storage", "Cloud Run", "Cloud Run functions", "BigQuery", "Cloud SQL", "AlloyDB", "Firestore", "Spanner", "Bigtable",
    "Document AI API", "Vision API", "Video Intelligence API", "Speech-to-Text API", "Text-to-Speech API", "Translation API", "Natural Language API",
    "Identity and Access Management", "Security Command Center", "Sensitive Data Protection", "Model Armor", "Monitoring", "Logging"
  ],
  CDL: [
    "Cloud Storage", "Spanner", "Cloud SQL", "AlloyDB", "Bigtable", "BigQuery", "Firestore", "Looker", "Pub/Sub", "Dataflow", "Dataproc", "Gemini Enterprise Agent Platform",
    "Compute Engine", "Google Kubernetes Engine", "Cloud Run", "Cloud Run functions", "Apigee", "Security Command Center", "Google Security Operations", "Virtual Private Cloud", "Cloud VPN",
    "Cloud Interconnect", "Cloud Armor", "Logging", "Identity and Access Management", "Sensitive Data Protection", "Certificate Manager", "Identity-Aware Proxy", "Monitoring", "Trace", "Profiler", "Error Reporting"
  ],
  AGWA: [
    "Cloud Identity", "Sensitive Data Protection", "Identity-Aware Proxy", "Monitoring", "Logging"
  ]
};

const conceptRules: Array<{ pattern: RegExp; terms: string[] }> = [
  { pattern: /object storage|bucket|storage class|unstructured data|cloud storage/i, terms: ["Cloud Storage"] },
  { pattern: /file storage|shared file|nfs|file system/i, terms: ["Filestore", "NetApp Volumes"] },
  { pattern: /backup|disaster recovery|rto|rpo|recovery/i, terms: ["Backup and DR Service", "Cloud Storage"] },
  { pattern: /compute|virtual machine|vm |spot vm|instance group/i, terms: ["Compute Engine"] },
  { pattern: /kubernetes|container orchestration|gke/i, terms: ["Google Kubernetes Engine"] },
  { pattern: /serverless|cloud run|function/i, terms: ["Cloud Run", "Cloud Run functions"] },
  { pattern: /network|vpc|subnet|routing|hybrid|multicloud/i, terms: ["Virtual Private Cloud", "Cloud Load Balancing", "Cloud DNS", "Cloud NAT", "Cloud VPN", "Cloud Interconnect", "Cloud Router"] },
  { pattern: /database|relational|sql|nosql/i, terms: ["Cloud SQL", "AlloyDB", "Spanner", "Firestore", "Bigtable"] },
  { pattern: /warehouse|analytics|bigquery|data analysis/i, terms: ["BigQuery", "Looker"] },
  { pattern: /pipeline|streaming|data processing|etl|elt/i, terms: ["Pub/Sub", "Dataflow", "Dataproc"] },
  { pattern: /monitor|observability|logging|trace|profil|alert/i, terms: ["Monitoring", "Logging", "Trace", "Profiler", "Error Reporting"] },
  { pattern: /iam|identity|access|least privilege|service account/i, terms: ["Identity and Access Management", "Cloud Identity"] },
  { pattern: /encrypt|key management|cmek|kms|secret/i, terms: ["Cloud KMS", "Secret Manager"] },
  { pattern: /security|threat|posture|soc|secops/i, terms: ["Security Command Center", "Sensitive Data Protection"] },
  { pattern: /agent|generative ai|gen ai|gemini|model garden|rag/i, terms: ["Gemini Enterprise Agent Platform", "Model Armor"] },
];

function resolveTerm(term: string): GcpService[] {
  const wanted = normalize(term);
  const direct = gcpServices.filter(service => [service.displayName, service.canonicalName, ...(service.aliases || []), ...(service.abbreviations || [])].some(value => normalize(value) === wanted));
  if (direct.length) return direct;
  const aliasSlugs = manualAliases[wanted] || manualAliases[term.toLowerCase()] || [];
  return aliasSlugs.map(slug => gcpServices.find(service => service.slug === slug)).filter((service): service is GcpService => Boolean(service));
}

function servicesFromTerms(terms: string[]) {
  const map = new Map<string, GcpService>();
  for (const term of terms) for (const service of resolveTerm(term)) map.set(service.slug, service);
  return [...map.values()];
}

function scoreServices(raw: string) {
  const text = normalize(raw);
  const scored = new Map<string, number>();
  for (const service of gcpServices) {
    const terms = [service.displayName, service.canonicalName, ...(service.aliases || []), ...(service.abbreviations || [])].map(normalize).filter(term => term.length >= 3);
    let best = Number.POSITIVE_INFINITY;
    for (const term of terms) {
      const index = text.indexOf(term);
      if (index >= 0) best = Math.min(best, index);
    }
    if (Number.isFinite(best)) scored.set(service.slug, best);
  }
  for (const [alias, slugs] of Object.entries(manualAliases)) {
    const index = text.indexOf(normalize(alias));
    if (index < 0) continue;
    for (const slug of slugs) scored.set(slug, Math.min(scored.get(slug) ?? Number.POSITIVE_INFINITY, index));
  }
  return [...scored.entries()].sort((a, b) => a[1] - b[1]);
}

function conceptServices(raw: string) {
  const terms = conceptRules.filter(rule => rule.pattern.test(raw)).flatMap(rule => rule.terms);
  return servicesFromTerms(terms);
}

export function gcpRelatedServicesForSkill(skill: GcpExamSkill, limit = 12): GcpService[] {
  const raw = `${skill.name} ${skill.tasks.join(" ")}`;
  const map = new Map<string, GcpService>();
  for (const [slug] of scoreServices(raw)) {
    const service = gcpServices.find(item => item.slug === slug);
    if (service) map.set(slug, service);
  }
  for (const service of conceptServices(raw)) map.set(service.slug, service);
  return [...map.values()].slice(0, limit);
}

export function gcpCourseServices(code: string): GcpService[] {
  const domains = gcpOfficialExamDomains[code] || [];
  const raw = domains.flatMap(domain => domain.groups.flatMap(group => [group.name, ...group.tasks])).join(" ");
  const selected = new Set<string>();
  for (const [slug] of scoreServices(raw)) selected.add(slug);
  for (const service of conceptServices(raw)) selected.add(service.slug);
  for (const service of servicesFromTerms(courseRequiredTerms[code] || [])) selected.add(service.slug);
  return gcpServices.filter(service => selected.has(service.slug));
}
