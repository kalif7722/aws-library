const GENERIC_STAGE_COPY = /^(authenticated\/authorized input|managed transition|observe and retry|validate outcome|least privilege|versioned change|failure test|audit evidence)$/i;

export function isGenericArchitectureItem(value: string) {
  return GENERIC_STAGE_COPY.test(value.trim());
}

const clean = (value: string) => value.replace(/^\s*\d+[.)-]?\s*/, "").trim();

type CopyRule = [RegExp, [string, string]];

const RULES: CopyRule[] = [
  [/internet client|^client$|^user$|viewer|caller|consumer|requester/, ["Originates the request or traffic", "Carries identity, protocol and retry behaviour"]],
  [/google edge|edge pop|edge route|edge frontend/, ["Processes traffic on Google's global edge", "Applies edge routing, cache or security controls before origin"]],
  [/armor policy|waf|security policy/, ["Evaluates prioritized protection rules", "Applies WAF, rate-limit and threat controls"]],
  [/load balancer|frontend|proxy\/rule|health-aware backend selection/, ["Terminates or proxies the supported protocol", "Routes traffic only toward healthy eligible backends"]],
  [/backend|origin on miss|media origin|^origin$|^target$/, ["Runs the application or origin workload", "Health, capacity and response headers determine the result"]],
  [/cache lookup|^cache$/, ["Evaluates cache key, freshness and policy", "Serves a hit immediately or forwards a miss to origin"]],
  [/cached response|response cache/, ["Returns the edge-cached representation", "TTL and cache headers govern reuse and revalidation"]],
  [/resolver query/, ["Receives the DNS question from a resolver", "Name, record type and client context drive resolution"]],
  [/zone selection/, ["Selects the matching public, private or forwarding zone", "Visibility and longest-suffix matching determine the zone"]],
  [/record\/policy evaluation|record evaluation/, ["Evaluates record sets and DNS policies", "TTL, routing policy and response policy shape the answer"]],
  [/authoritative answer/, ["Returns the authoritative DNS response", "DNSSEC and record TTL protect integrity and caching behaviour"]],
  [/nameserver delegation/, ["Delegates the domain to authoritative name servers", "Registrar NS and DNSSEC delegation must match the hosted zone"]],
  [/contact verification/, ["Verifies registrant ownership and contact data", "Verification state affects registration and transfer lifecycle"]],
  [/packet mirror/, ["Copies selected packets without changing the production path", "Mirroring filters control inspected traffic volume"]],
  [/ids endpoint/, ["Receives mirrored packets for managed inspection", "Regional endpoint capacity must match mirrored traffic"]],
  [/signature analysis|threat inspection/, ["Inspects traffic for known and behavioural threats", "Detection produces security findings without changing the original packet path"]],
  [/alert\/log|alert workflow|finding/, ["Publishes actionable security evidence", "Route high-severity findings into logging, SIEM or response automation"]],
  [/on-prem router|peer router/, ["Advertises and receives enterprise prefixes", "Routing policy and redundancy determine hybrid reachability"]],
  [/carrier\/cross-connect|cross-connect|interconnect/, ["Carries private hybrid traffic into Google's edge", "Physical diversity and provider health underpin availability"]],
  [/vlan attachment/, ["Maps the Interconnect circuit into a VPC routing domain", "Attachment VLAN and capacity define the logical private link"]],
  [/cloud router/, ["Exchanges dynamic routes with BGP peers", "Advertisements, learned routes and priorities determine next hops"]],
  [/bgp session/, ["Exchanges prefixes and path attributes dynamically", "Session state, priorities and prefix limits control convergence"]],
  [/vpc route|dynamic route|route\/firewall evaluation|route exchange\/policy/, ["Selects the eligible next hop inside the VPC", "Routes and policy determine where the packet can travel next"]],
  [/nat translation/, ["Translates private source addresses and allocates NAT ports", "Port capacity and timeout state govern outbound connection scale"]],
  [/return mapping/, ["Uses the existing NAT state for return traffic", "Only responses matching an established mapping are translated back"]],
  [/internet\/api|internet destination/, ["Reaches the external service over the selected egress path", "Remote availability, TLS and egress policy affect completion"]],
  [/hierarchical policy|global\/regional policy|firewall policy/, ["Evaluates ordered firewall policy and priority", "Hierarchy, tags and implied rules determine the effective decision"]],
  [/allow\/deny\/log|verdict/, ["Produces the enforcement decision", "Logging records the matched rule and security outcome"]],
  [/mesh data plane/, ["Carries service-to-service traffic through mesh-aware clients or proxies", "mTLS identity and traffic policy are enforced in the data plane"]],
  [/service endpoint/, ["Receives traffic at the selected service instance", "Discovery, readiness and locality influence endpoint choice"]],
  [/telemetry/, ["Exports request, latency and security signals", "Metrics, logs and traces provide service-level evidence"]],
  [/ipsec tunnel|vpn interface|vpn gateway/, ["Encrypts traffic between Google Cloud and the peer network", "Tunnel redundancy and IKE/BGP health determine availability"]],
  [/selected network path|tier edge\/path/, ["Uses the configured network path and service tier", "Location, tier and private/public routing affect latency and cost"]],
  [/regional\/global boundary/, ["Crosses the relevant Google Cloud location boundary", "Inter-region or internet transfer rules may apply here"]],
  [/usage record/, ["Attributes transferred bytes to the billable path", "Direction, location and service class determine network charges"]],
  [/origin shield\/fill/, ["Fetches and consolidates cache misses from the media origin", "Shielding reduces repeated origin load and improves cache efficiency"]],
  [/ncc hub/, ["Provides the central connectivity and route-exchange control point", "Spoke groups and route policies govern transitive reachability"]],
  [/destination spoke/, ["Receives propagated routes through the NCC topology", "Underlying VPN, Interconnect or VPC capacity still carries traffic"]],
  [/configuration\/telemetry/, ["Collects network configuration and observed telemetry", "Topology, flow and performance evidence feed diagnostics"]],
  [/path simulation|metric analysis/, ["Models the packet path or analyses measured performance", "Checks routes, firewalls, policies and selected data-plane signals"]],
  [/remediation/, ["Applies the network or policy correction", "Retest after change to confirm the original failure mode is removed"]],
  [/retest/, ["Repeats the diagnostic after remediation", "Confirms reachability or performance against the intended state"]],
  [/steering policy/, ["Redirects selected traffic into the inspection path", "Symmetric routing and bypass prevention are design requirements"]],
  [/inspection service/, ["Performs the configured third-party or Google security inspection", "Scale, latency and failure mode affect the production path"]],
  [/identity\/context check/, ["Evaluates user, device and contextual access signals", "Only sessions satisfying policy proceed toward private resources"]],
  [/secure access edge/, ["Terminates the identity-aware secure access session", "Policy is enforced before private connectivity is granted"]],
  [/connector/, ["Bridges the managed access plane to the private resource network", "Connector health and capacity are part of application availability"]],
  [/explicit proxy/, ["Receives outbound HTTP(S) traffic from configured clients", "Client routing and enterprise trust configuration are prerequisites"]],
  [/policy\/tls inspection/, ["Evaluates URL, threat and optional TLS inspection policy", "Certificate trust and policy priority determine the allowed session"]],
  [/extension callout/, ["Invokes the configured extension on the request path", "Strict timeout and authentication protect load-balancer availability"]],
  [/decision\/mutation/, ["Returns the extension decision or permitted request mutation", "Failure mode determines whether traffic continues or is rejected"]],
  [/workload nic/, ["Attaches the workload to its VPC subnet", "Interface IP, routes and firewall policy establish the starting network context"]],
  [/subnet/, ["Provides regional IP addressing inside the global VPC", "CIDR planning and private-access settings constrain connectivity"]],
  [/next hop\/service/, ["Forwards traffic to the selected gateway, service or peer", "The chosen next hop defines the remaining path and failure domain"]],
  [/perimeter evaluation/, ["Evaluates VPC Service Controls context and perimeter membership", "Principal, project, service and access level contribute to the decision"]],
  [/ingress\/egress policy/, ["Applies explicit cross-perimeter access rules", "Rules must authorize the identity, service and source/destination relationship"]],
  [/supported api/, ["Processes the request only after perimeter and IAM checks succeed", "Unsupported services remain outside VPC Service Controls enforcement"]],
  [/audit decision/, ["Records allowed or denied perimeter activity", "Violation reason and dry-run logs support policy tuning and incident review"]],
  [/metric ingestion|log ingestion|trace ingestion/, ["Ingests telemetry into the managed observability backend", "Resource labels and timestamps preserve query context"]],
  [/alignment\/reduction|aggregation|grouping/, ["Transforms raw telemetry into useful analytical signals", "Windowing and aggregation determine dashboard and alert semantics"]],
  [/dashboard|alert policy|alert evaluation/, ["Evaluates operational health against configured views or thresholds", "Notifications and SLO signals drive response workflows"]],
  [/source database|source system|migration source/, ["Provides the workload or data being migrated", "Inventory, compatibility and change rate determine migration design"]],
  [/replication|change stream|cdc/, ["Continuously copies changes toward the target", "Lag, ordering and conflict handling govern cutover readiness"]],
  [/cutover/, ["Switches production traffic or writes to the target", "Rollback criteria and a controlled freeze window reduce migration risk"]],
  [/validation/, ["Compares target correctness, performance and completeness", "Only validated workloads should exit the migration rollback window"]],
  [/primary/, ["Serves the authoritative read/write workload", "Availability, replication state and transaction health determine service readiness"]],
  [/replica/, ["Maintains a secondary copy for scale or resilience", "Replication lag determines read freshness and failover confidence"]],
  [/persistent data|storage/, ["Persists application or analytical state outside ephemeral compute", "Durability, locality and backup policy determine recovery characteristics"]],
  [/scheduler|placement/, ["Selects eligible compute capacity for the workload", "Region, zone, machine constraints and autoscaling policy influence placement"]],
  [/instance|vm|worker|runtime|container/, ["Executes the application or processing workload", "CPU, memory, identity and network configuration define the runtime boundary"]],
  [/queue|topic|event bus/, ["Buffers or distributes asynchronous events", "Delivery, ordering and retry policy decouple producers from consumers"]],
  [/pipeline|processing stage|transform/, ["Transforms data according to the workload graph", "Parallelism, checkpointing and retry behaviour determine throughput and recovery"]],
  [/dataset|warehouse|table|database/, ["Stores structured state for managed query or transaction access", "Schema, locality and access controls shape downstream use"]],
  [/bucket|object store|object storage/, ["Stores durable objects and generations", "Class, retention, versioning and lifecycle rules govern data state"]],
  [/model endpoint|prediction endpoint|endpoint/, ["Serves the managed API or model operation", "Authentication, quota, latency and scaling determine request behaviour"]],
  [/model|inference/, ["Executes the selected model or inference logic", "Version, prompt/input shape and accelerator capacity affect quality and latency"]]
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
