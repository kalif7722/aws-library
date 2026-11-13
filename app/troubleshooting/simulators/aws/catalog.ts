/**
 * Shared AWS troubleshooting scenario registry.
 *
 * Scenarios describe the AWS services/resources that the common simulator must
 * model. They are data, not individual pages: every hub issue should resolve
 * to this registry and the same console/simulation engine.
 */
export type AwsResourceArea =
  | "EC2" | "VPC" | "IAM" | "Route53" | "ELB" | "RDS"
  | "Lambda" | "S3" | "CloudWatch" | "CloudTrail"
  | "ECS" | "EKS" | "DynamoDB" | "Glue" | "CostExplorer";

export type AwsDiagnosticCheck = {
  id: string;
  label: string;
  resourceArea: AwsResourceArea;
  evidence: string;
  passCondition: string;
  safeNextStep: string;
};

export type AwsIncidentDefinition = {
  id: string;
  title: string;
  symptoms: string[];
  resources: AwsResourceArea[];
  consoleScreens: string[];
  checks: AwsDiagnosticCheck[];
  verification: string[];
};

const check = (
  id: string,
  label: string,
  resourceArea: AwsResourceArea,
  evidence: string,
  passCondition: string,
  safeNextStep: string,
): AwsDiagnosticCheck => ({ id, label, resourceArea, evidence, passCondition, safeNextStep });

export const AWS_INCIDENTS: AwsIncidentDefinition[] = [
  {
    id: "vm-unreachable",
    title: "EC2 instance is running but SSH is unreachable",
    symptoms: ["SSH timeout", "EC2 status checks pass", "Bastion cannot connect"],
    resources: ["EC2", "VPC"],
    consoleScreens: ["Instances", "Security Groups", "Route Tables", "Network ACLs", "Reachability Analyzer"],
    checks: [
      check("instance-health", "Confirm instance and system health", "EC2", "Instance state, both status checks, system log, and console output.", "Instance is running and status checks pass.", "If impaired, inspect the failed status check and system log before changing network controls."),
      check("route-path", "Verify the effective route", "VPC", "Subnet association, local route, route target state, and source-to-destination path.", "The path has a valid active route in the required direction.", "Correct only a proven missing or blackhole route; preserve the prior route for rollback."),
      check("network-acl", "Check stateless NACL in both directions", "VPC", "Inbound TCP/22 and outbound ephemeral return-port rules in rule-number order.", "Both request and return traffic match allow rules before any deny rule.", "Add the narrowest approved rule only after identifying the subnet NACL and required CIDR."),
      check("security-group", "Check attached security-group ingress", "VPC", "The instance's attached groups and source identity/CIDR for TCP/22.", "A rule allows TCP/22 from the approved bastion or administrator source.", "Prefer the bastion security-group reference or approved /32; never open SSH to 0.0.0.0/0."),
      check("guest-service", "Verify guest OS and SSH service", "EC2", "SSHD service state, listening socket, host firewall, disk pressure, and auth logs.", "SSHD listens on TCP/22 and the host firewall permits the source.", "Use SSM/console access where available; separate network reachability from key and user authentication."),
    ],
    verification: ["Re-run path analysis", "Test SSH from the approved source", "Inspect auth/system logs", "Confirm no broader ingress was introduced"],
  },
  {
    id: "private-connectivity",
    title: "Private application cannot reach its database",
    symptoms: ["Connection timeout", "Private database call fails", "DNS may resolve correctly"],
    resources: ["VPC", "EC2", "RDS", "Route53"],
    consoleScreens: ["VPC", "Route Tables", "Security Groups", "Network ACLs", "Route 53", "RDS"],
    checks: [
      check("dns", "Resolve the database endpoint", "Route53", "Resolver answer, record/endpoint, and private hosted-zone association.", "The name resolves to the expected database endpoint and address.", "Fix DNS only if the returned name/address or resolver path is wrong."),
      check("route", "Verify application-to-database routing", "VPC", "Subnet route tables, peering/TGW/VPN routes where applicable, and return path.", "Both directions have a valid route.", "Correct the specific missing route or association; do not add a default route as a guess."),
      check("database-sg", "Inspect database ingress policy", "VPC", "Database security groups and the actual application security identity.", "The database port is allowed from the approved application security group.", "Use a source security-group reference and the database's configured port."),
      check("listener", "Confirm database health and listener", "RDS", "DB status, endpoint/port, connection limits, and recent events.", "Database is available and accepting connections.", "Resolve database availability or capacity before altering network policy."),
    ],
    verification: ["Connect from the application runtime", "Run a real application request", "Check database and application metrics", "Confirm only the required port/source is allowed"],
  },
  {
    id: "access-denied",
    title: "Deployment pipeline receives AccessDenied",
    symptoms: ["API returns AccessDenied", "Deployment recently changed", "Role assumption may succeed"],
    resources: ["IAM", "CloudTrail", "S3", "Lambda", "ECS"],
    consoleScreens: ["IAM Roles", "IAM Policy Simulator", "CloudTrail Event History", "Target Service"],
    checks: [
      check("caller", "Identify the effective caller", "IAM", "CloudTrail event identity, assumed-role ARN, session issuer, and account.", "The event's caller is the role/session expected by the pipeline.", "Correct the trust/assumption path only if the event proves the wrong principal is active."),
      check("action-resource", "Pinpoint denied action and resource", "CloudTrail", "Exact API action, resource ARN, region, timestamp, and error context.", "The requested action and resource are understood precisely.", "Avoid broad AdministratorAccess; test the minimum action/resource combination."),
      check("policy-evaluation", "Evaluate all policy layers", "IAM", "Identity policy, resource policy, permissions boundary, SCP, session policy, and explicit denies.", "No explicit deny or higher-level restriction blocks the request.", "Change the policy layer that actually causes the denial, following approval."),
    ],
    verification: ["Repeat the same pipeline action", "Confirm CloudTrail shows the expected role and success", "Check unrelated permissions remain denied"],
  },
  {
    id: "database-slowdown",
    title: "Checkout latency rises during a promotion",
    symptoms: ["P95 latency rises", "Errors/timeouts increase", "Database load may spike"],
    resources: ["CloudWatch", "ELB", "EC2", "RDS"],
    consoleScreens: ["CloudWatch Metrics", "Application Load Balancer", "RDS Performance Insights", "EC2 Auto Scaling"],
    checks: [
      check("scope", "Correlate latency and request volume", "CloudWatch", "ALB target response time, request count, 4xx/5xx, and application latency by time window.", "The failing layer is narrowed using aligned time-series evidence.", "Compare to baseline and segment by target, route, and deployment."),
      check("targets", "Check target health and capacity", "ELB", "Healthy target count, target response codes, connection errors, and scaling activity.", "Targets are healthy and capacity matches the load.", "Fix unhealthy targets or capacity constraints indicated by the evidence."),
      check("database", "Inspect database saturation and waits", "RDS", "CPU, connections, free memory, storage, query latency, and Performance Insights waits.", "Database resources and query behavior support expected concurrency.", "Address the demonstrated bottleneck; do not scale blindly before checking query waits."),
    ],
    verification: ["Re-check p95/p99 latency", "Confirm error rate and database saturation return to baseline", "Review capacity and alarm thresholds"],
  },
  {
    id: "stale-data",
    title: "Revenue dashboard is missing the latest data",
    symptoms: ["Dashboard freshness lags", "Ingestion job may have failed", "Source data is newer than warehouse"],
    resources: ["Glue", "CloudWatch", "S3", "CloudTrail"],
    consoleScreens: ["Glue Jobs", "S3 Objects", "CloudWatch Logs", "Data Catalog"],
    checks: [
      check("source-freshness", "Verify source object freshness", "S3", "Object timestamps, expected partition/key, and upstream completion signal.", "The expected source object/partition exists and is current.", "Trace the missing partition upstream before rerunning downstream jobs."),
      check("job-run", "Inspect ingestion job run", "Glue", "Job status, error logs, bookmark/offset state, and retry history.", "The job completed for the expected time range and partition.", "Correct the observed job error and rerun only the missing interval where safe."),
      check("catalog-query", "Validate catalog and downstream query", "Glue", "Catalog partition registration, schema, query filters, and data-location mapping.", "The new partition is queryable and included by the dashboard query.", "Repair the specific partition/schema/filter mismatch proven by the evidence."),
    ],
    verification: ["Confirm latest partition is queryable", "Compare source and dashboard counts/timestamps", "Monitor freshness SLA"],
  },
  {
    id: "rag-stale-answers",
    title: "Enterprise RAG assistant returns outdated answers",
    symptoms: ["Source document has changed", "Retrieval cites old text", "Ingestion may be delayed"],
    resources: ["S3", "Lambda", "CloudWatch", "CloudTrail"],
    consoleScreens: ["S3", "Lambda", "CloudWatch Logs", "Knowledge Base / Vector Store"],
    checks: [
      check("source-version", "Confirm the current source version", "S3", "Object version, last-modified time, metadata, and ingestion trigger.", "The intended source version exists and was eligible for ingestion.", "Correct source selection or trigger only if evidence shows the current version was skipped."),
      check("ingestion", "Trace ingestion and chunking", "Lambda", "Trigger delivery, function errors, retry/DLQ state, chunk counts, and embedding completion.", "The current document version completed ingestion without partial failures.", "Retry the failed stage idempotently and track the document/version identifier."),
      check("retrieval", "Inspect retrieved passages and filters", "CloudWatch", "Retrieved chunk version, metadata filters, ranking, and answer citations.", "Top retrieved passages reflect the current document and correct access filters.", "Fix stale index entries or metadata/filter logic without weakening document authorization."),
    ],
    verification: ["Query a known updated fact", "Inspect cited document version and retrieved chunks", "Confirm access controls remain enforced"],
  },
  {
    id: "cloud-cost-spike",
    title: "AWS spend rises without a matching traffic increase",
    symptoms: ["Cost anomaly alert", "Request volume is stable", "One service or region dominates the increase"],
    resources: ["CostExplorer", "CloudWatch", "CloudTrail"],
    consoleScreens: ["Cost Explorer", "Cost Anomaly Detection", "CloudTrail", "CloudWatch"],
    checks: [
      check("cost-dimension", "Isolate service, region, usage type, and account", "CostExplorer", "Daily cost by linked account, service, region, usage type, and operation.", "The anomaly is narrowed to a concrete billable dimension.", "Compare to the previous equivalent period and check billing-data freshness."),
      check("change-correlation", "Correlate with deployments and API activity", "CloudTrail", "Resource creation/modification events and the time the usage changed.", "A change or workload pattern plausibly explains the cost delta.", "Validate ownership and expected behavior before stopping or deleting resources."),
      check("utilization", "Compare cost to utilization", "CloudWatch", "CPU, request volume, data transfer, storage growth, and service-specific metrics.", "The driver is understood as rate, quantity, idle capacity, or unexpected activity.", "Use a reversible, owner-approved mitigation and preserve evidence."),
    ],
    verification: ["Confirm daily usage trend falls as expected", "Check service health after mitigation", "Add an owner and actionable anomaly threshold"],
  },
];

export const AWS_INCIDENT_BY_ID = Object.fromEntries(AWS_INCIDENTS.map((incident) => [incident.id, incident])) as Record<string, AwsIncidentDefinition>;
