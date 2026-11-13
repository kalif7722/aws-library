const GENERIC_STAGE_COPY = /^(authenticated(?:\/authorized)? input|managed transition|controlled transition|observe and retry|log and evaluate|validate (?:outcome|output)|least privilege|versioned change|failure test|recovery test|recovery\/rollback test|audit evidence)$/i;

export function isGenericArchitectureItem(value: string) {
  return GENERIC_STAGE_COPY.test(value.trim());
}

const clean = (value: string) => value.replace(/^\s*\d+[.)-]?\s*/, "").trim();
type CopyRule = [RegExp, [string, string]];
const R = (pattern: RegExp, a: string, b: string): CopyRule => [pattern, [a, b]];

const RULES: CopyRule[] = [
  // Networking
  R(/internet client|^client$|^user$|viewer|caller|consumer|requester/, "Originates the request or traffic", "Carries identity, protocol and retry behaviour"),
  R(/google edge|edge pop|edge route|edge frontend/, "Processes traffic on Google's global edge", "Applies edge routing, cache or security controls before origin"),
  R(/armor policy|waf|security policy/, "Evaluates prioritized protection rules", "Applies WAF, rate-limit and threat controls"),
  R(/load balancer|frontend|proxy\/rule|health-aware backend selection/, "Terminates or proxies the supported protocol", "Routes traffic only toward healthy eligible backends"),
  R(/cache lookup|^cache$/, "Evaluates cache key, freshness and policy", "Serves a hit immediately or forwards a miss to origin"),
  R(/cached response/, "Returns the edge-cached representation", "TTL and cache headers govern reuse and revalidation"),
  R(/resolver query/, "Receives the DNS question from a resolver", "Name, record type and client context drive resolution"),
  R(/zone selection/, "Selects the matching public, private or forwarding zone", "Visibility and longest-suffix matching determine the zone"),
  R(/record\/policy evaluation|record evaluation/, "Evaluates record sets and DNS policies", "TTL, routing policy and response policy shape the answer"),
  R(/authoritative answer/, "Returns the authoritative DNS response", "DNSSEC and record TTL protect integrity and caching behaviour"),
  R(/nameserver delegation/, "Delegates the domain to authoritative name servers", "Registrar NS and DNSSEC delegation must match the hosted zone"),
  R(/contact verification/, "Verifies registrant ownership and contact data", "Verification state affects registration and transfer lifecycle"),
  R(/packet mirror/, "Copies selected packets without changing the production path", "Mirroring filters control inspected traffic volume"),
  R(/ids endpoint/, "Receives mirrored packets for managed inspection", "Regional endpoint capacity must match mirrored traffic"),
  R(/signature analysis|threat inspection/, "Inspects traffic for known and behavioural threats", "Detection produces security findings without changing the original packet path"),
  R(/on-prem router|peer router/, "Advertises and receives enterprise prefixes", "Routing policy and redundancy determine hybrid reachability"),
  R(/carrier\/cross-connect|cross-connect|interconnect/, "Carries private hybrid traffic into Google's edge", "Physical diversity and provider health underpin availability"),
  R(/vlan attachment/, "Maps the Interconnect circuit into a VPC routing domain", "Attachment VLAN and capacity define the logical private link"),
  R(/cloud router/, "Exchanges dynamic routes with BGP peers", "Advertisements, learned routes and priorities determine next hops"),
  R(/bgp session/, "Exchanges prefixes and path attributes dynamically", "Session state, priorities and prefix limits control convergence"),
  R(/vpc route|dynamic route|route\/firewall evaluation|route exchange\/policy/, "Selects the eligible next hop inside the VPC", "Routes and policy determine where the packet can travel next"),
  R(/nat translation/, "Translates private source addresses and allocates NAT ports", "Port capacity and timeout state govern outbound connection scale"),
  R(/return mapping/, "Uses the existing NAT state for return traffic", "Only responses matching an established mapping are translated back"),
  R(/internet\/api|internet destination/, "Reaches the external service over the selected egress path", "Remote availability, TLS and egress policy affect completion"),
  R(/hierarchical policy|global\/regional policy|firewall policy/, "Evaluates ordered firewall policy and priority", "Hierarchy, tags and implied rules determine the effective decision"),
  R(/mesh data plane/, "Carries service-to-service traffic through mesh-aware clients or proxies", "mTLS identity and traffic policy are enforced in the data plane"),
  R(/service endpoint/, "Receives traffic at the selected service instance", "Discovery, readiness and locality influence endpoint choice"),
  R(/ipsec tunnel|vpn interface|vpn gateway/, "Encrypts traffic between Google Cloud and the peer network", "Tunnel redundancy and IKE/BGP health determine availability"),
  R(/selected network path|tier edge\/path/, "Uses the configured network path and service tier", "Location, tier and private/public routing affect latency and cost"),
  R(/regional\/global boundary/, "Crosses the relevant Google Cloud location boundary", "Inter-region or internet transfer rules may apply here"),
  R(/usage record/, "Attributes transferred bytes to the billable path", "Direction, location and service class determine network charges"),
  R(/origin shield\/fill/, "Fetches and consolidates cache misses from the media origin", "Shielding reduces repeated origin load and improves cache efficiency"),
  R(/ncc hub/, "Provides the central connectivity and route-exchange control point", "Spoke groups and route policies govern transitive reachability"),
  R(/destination spoke/, "Receives propagated routes through the NCC topology", "Underlying VPN, Interconnect or VPC capacity still carries traffic"),
  R(/configuration\/telemetry/, "Collects network configuration and observed telemetry", "Topology, flow and performance evidence feed diagnostics"),
  R(/path simulation|metric analysis/, "Models the packet path or analyses measured performance", "Checks routes, firewalls, policies and selected data-plane signals"),
  R(/steering policy/, "Redirects selected traffic into the inspection path", "Symmetric routing and bypass prevention are design requirements"),
  R(/inspection service/, "Performs the configured security inspection", "Scale, latency and failure mode affect the production path"),
  R(/identity\/context check/, "Evaluates user, device and contextual access signals", "Only sessions satisfying policy proceed toward private resources"),
  R(/secure access edge/, "Terminates the identity-aware secure access session", "Policy is enforced before private connectivity is granted"),
  R(/explicit proxy/, "Receives outbound HTTP(S) traffic from configured clients", "Client routing and enterprise trust configuration are prerequisites"),
  R(/policy\/tls inspection/, "Evaluates URL, threat and optional TLS inspection policy", "Certificate trust and policy priority determine the allowed session"),
  R(/extension callout/, "Invokes the configured extension on the request path", "Strict timeout and authentication protect load-balancer availability"),
  R(/decision\/mutation/, "Returns the extension decision or permitted request mutation", "Failure mode determines whether traffic continues or is rejected"),
  R(/workload nic/, "Attaches the workload to its VPC subnet", "Interface IP, routes and firewall policy establish the starting network context"),
  R(/^subnet$/, "Provides regional IP addressing inside the global VPC", "CIDR planning and private-access settings constrain connectivity"),
  R(/next hop\/service/, "Forwards traffic to the selected gateway, service or peer", "The chosen next hop defines the remaining path and failure domain"),
  R(/perimeter evaluation/, "Evaluates VPC Service Controls context and perimeter membership", "Principal, project, service and access level contribute to the decision"),
  R(/ingress\/egress policy/, "Applies explicit cross-perimeter access rules", "Rules must authorize identity, service and source/destination relationship"),
  R(/supported api/, "Processes the request after perimeter and IAM checks succeed", "Unsupported services remain outside VPC Service Controls enforcement"),

  // Compute and AI infrastructure
  R(/^datasets?$/, "Supplies training or inference data to the compute path", "Placement, throughput and data governance affect accelerator utilization"),
  R(/high-throughput storage/, "Feeds accelerators at sustained parallel throughput", "Storage bandwidth must match the GPU/TPU fabric to avoid idle compute"),
  R(/gpu\/tpu fabric|accelerator fabric/, "Interconnects accelerator workers for collective operations", "Topology and collective latency determine distributed training efficiency"),
  R(/distributed job/, "Coordinates parallel workers across the accelerator topology", "Checkpointing, sharding and failure recovery determine job goodput"),
  R(/checkpoints\/models|checkpoints|model artifacts/, "Persists checkpoints and trained model artifacts", "Durable outputs enable restart, evaluation and downstream serving"),
  R(/scheduler|placement/, "Selects eligible compute capacity for the workload", "Region, zone, machine constraints and autoscaling policy influence placement"),
  R(/instance|\bvm\b|worker|runtime|container/, "Executes the application or processing workload", "CPU, memory, identity and network configuration define the runtime boundary"),
  R(/persistent data/, "Persists state outside ephemeral compute", "Durability, locality and backup policy determine recovery characteristics"),

  // Databases
  R(/^application$/, "Opens the database session and issues reads or writes", "Client pooling, transaction behaviour and retry policy shape database load"),
  R(/private endpoint/, "Provides private network reachability to the managed database", "VPC connectivity and authorized identity constrain database exposure"),
  R(/primary\/read pool|primary instance/, "Routes writes to the primary and eligible reads to scaled read capacity", "Connection role and replication lag determine consistency behaviour"),
  R(/distributed storage/, "Persists database pages independently from compute", "Managed replication and storage durability support failover and scaling"),
  R(/backup\/replica/, "Maintains recovery points and secondary copies", "Backup health and replica lag determine recovery and failover confidence"),
  R(/^primary$/, "Serves the authoritative read/write workload", "Availability, replication state and transaction health determine readiness"),
  R(/^replica$/, "Maintains a secondary copy for scale or resilience", "Replication lag determines read freshness and failover confidence"),

  // Analytics and pipelines
  R(/^sources$/, "Produces files, events or records for analytical ingestion", "Schema, freshness and source reliability determine downstream data quality"),
  R(/load\/stream|ingestion/, "Loads batch data or accepts streaming records", "Delivery semantics, schema handling and quotas determine ingestion reliability"),
  R(/partitioned tables/, "Stores analytical data using partition and clustering layout", "Pruning and data organization reduce scanned bytes and query cost"),
  R(/sql job|query job/, "Executes distributed analytical SQL using managed capacity", "Slots, shuffle and query shape determine latency and bytes processed"),
  R(/result\/export|query result/, "Returns query results or exports them to downstream consumers", "Result size, destination and access controls govern delivery"),
  R(/queue|topic|event bus/, "Buffers or distributes asynchronous events", "Delivery, ordering and retry policy decouple producers from consumers"),
  R(/pipeline|processing stage|transform/, "Transforms data according to the workload graph", "Parallelism, checkpointing and retry behaviour determine throughput and recovery"),

  // Migration
  R(/production\/test input/, "Feeds equivalent representative input to both implementations", "Input selection must avoid duplicate side effects while preserving business semantics"),
  R(/legacy execution/, "Runs the existing system as the comparison baseline", "Its output and latency establish the known production behaviour"),
  R(/target execution/, "Runs the modernized target with the same logical input", "Differences are captured before production cutover"),
  R(/normalized comparison/, "Normalizes and compares legacy and target outputs", "Domain-specific tolerances separate acceptable differences from defects"),
  R(/triage\/cutover evidence/, "Turns discrepancies into migration readiness evidence", "Unresolved high-severity differences block or constrain cutover"),
  R(/source database|source system|migration source/, "Provides the workload or data being migrated", "Inventory, compatibility and change rate determine migration design"),
  R(/replication|change stream|\bcdc\b/, "Continuously copies changes toward the target", "Lag, ordering and conflict handling govern cutover readiness"),
  R(/^cutover$/, "Switches production traffic or writes to the target", "Rollback criteria and a controlled freeze window reduce migration risk"),
  R(/^validation$/, "Compares target correctness, performance and completeness", "Only validated workloads should exit the rollback window"),

  // Observability
  R(/application exception/, "Emits an exception or stack trace from the workload", "Structured error context improves grouping without exposing sensitive values"),
  R(/^cloud logging$/, "Ingests the application error into centralized logs", "Project, service and version labels preserve operational context"),
  R(/parser\/grouping/, "Parses stack traces and groups similar error events", "Grouping heuristics reduce duplicate noise while preserving regressions"),
  R(/error group/, "Represents the deduplicated operational issue", "Occurrences, affected versions and users quantify impact"),
  R(/alert\/triage/, "Notifies operators and drives investigation workflow", "Regression state and severity determine response priority"),
  R(/metric ingestion|log ingestion|trace ingestion/, "Ingests telemetry into the managed observability backend", "Resource labels and timestamps preserve query context"),
  R(/alignment\/reduction|aggregation|grouping/, "Transforms raw telemetry into useful analytical signals", "Windowing and aggregation determine dashboard and alert semantics"),
  R(/dashboard|alert policy|alert evaluation/, "Evaluates operational health against configured views or thresholds", "Notifications and SLO signals drive response workflows"),

  // Hybrid / multicloud planning
  R(/placement requirement/, "Captures workload geography, service and compliance constraints", "The requirement set becomes the filter for candidate locations"),
  R(/location filters/, "Filters locations by geography, service availability and facility attributes", "Residency, latency and sustainability constraints narrow viable sites"),
  R(/candidate comparison/, "Compares the remaining regions, edge sites or partner facilities", "Trade-offs include service coverage, proximity and operational ownership"),
  R(/connectivity check/, "Validates that required network paths can be established", "Interconnect, partner and latency constraints can eliminate an otherwise valid site"),
  R(/selected site/, "Produces the recommended placement candidate", "Selection still requires capacity, connectivity and compliance validation before deployment"),

  // Industry solutions
  R(/catalog import/, "Loads normalized product catalog and attribute data", "Catalog quality and freshness directly influence retail relevance"),
  R(/user-event ingestion/, "Captures shopper behaviour such as views, clicks and purchases", "Accurate attribution and consent produce trustworthy ranking signals"),
  R(/model\/serving config/, "Combines learned ranking with serving and business controls", "Filters, boosts and model configuration shape eligible results"),
  R(/shopper query/, "Submits the shopper's search or recommendation context", "Query intent, filters and user context drive candidate retrieval"),
  R(/ranked products/, "Returns products ordered by predicted relevance and business rules", "Latency, no-result rate and conversion metrics validate serving quality"),

  // Security
  R(/request context/, "Collects identity, device, network and location context", "Context is evaluated separately from the permissions granted by IAM"),
  R(/access-level evaluation/, "Evaluates Access Context Manager conditions", "The request satisfies an access level only when its configured context rules match"),
  R(/perimeter\/iam check/, "Combines service-perimeter and IAM authorization checks", "Both contextual boundary policy and resource permission must allow the request"),
  R(/api decision/, "Produces the allow or deny decision for the protected API request", "Denied requests surface policy reason without bypassing IAM"),
  R(/audit log|audit decision/, "Records security-relevant access evidence", "Logs and violation reasons support review, tuning and incident investigation"),

  // Storage / recovery
  R(/protected workload/, "Provides the application or dataset to be protected", "Protection scope and consistency requirements determine the capture method"),
  R(/scheduled capture/, "Creates policy-driven snapshots or application-consistent recovery points", "Schedule and retention objectives define achievable RPO"),
  R(/immutable\/controlled vault/, "Stores protected recovery points behind isolated access controls", "Immutability, retention and administrative separation reduce destructive-risk exposure"),
  R(/restore mount\/copy/, "Presents or copies the selected recovery point for restoration", "Recovery location, credentials and application dependencies must be available"),
  R(/recovery validation/, "Tests the restored workload for usable application recovery", "A successful backup is not proven recovery until restore validation passes"),

  // General stages used across branches
  R(/alert\/log|alert workflow|finding/, "Publishes actionable operational or security evidence", "Route important findings into the appropriate response workflow"),
  R(/allow\/deny\/log|verdict/, "Produces the enforcement decision", "Logging records the matched rule and outcome"),
  R(/^telemetry$/, "Exports operational signals from the service path", "Metrics, logs and traces provide evidence for health and troubleshooting"),
  R(/^connector$/, "Bridges the managed control plane to the target private environment", "Connector health and capacity become part of end-to-end availability"),
  R(/^remediation$/, "Applies the configuration or policy correction", "Retest after change to confirm the original failure mode is removed"),
  R(/^retest$/, "Repeats the diagnostic after remediation", "Confirms reachability or performance against the intended state"),
  R(/backend|origin on miss|media origin|^origin$|^target$/, "Runs the application, target or origin workload", "Health, capacity and response behaviour determine the final result"),
  R(/dataset|warehouse|table|database/, "Stores managed data for query or transaction access", "Schema, locality, durability and access controls shape downstream use"),
  R(/bucket|object store|object storage/, "Stores durable objects and generations", "Class, retention, versioning and lifecycle rules govern data state"),
  R(/model endpoint|prediction endpoint|^endpoint$/, "Serves the managed API or model operation", "Authentication, quota, latency and scaling determine request behaviour"),
  R(/^model$|inference/, "Executes the selected model or inference logic", "Version, input shape and accelerator capacity affect quality and latency")
];

export function architectureStageCopy(serviceName: string, _flowTitle: string, stageTitle: string, currentItems: string[]) {
  const meaningful = currentItems.filter(item => !isGenericArchitectureItem(item));
  if (meaningful.length) return meaningful.slice(0, 3);
  const stage = clean(stageTitle);
  const stageKey = stage.toLowerCase();
  for (const [pattern, copy] of RULES) if (pattern.test(stageKey)) return copy;
  return [
    `Performs the ${stage.toLowerCase()} responsibility in the ${serviceName} flow`,
    "Validate identity, state, failure handling and observability at this boundary"
  ];
}

export function architectureStageLabel(stageTitle: string) {
  return clean(stageTitle);
}
