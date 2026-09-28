import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const ops = () => g("OPERATE & GOVERN", c("Cloud Monitoring", "Path / service health"), c("Cloud Logging", "Flow / service logs"), c("IAM controls", "Least privilege", "IAM"));
const gov = (service: string, caption: string): GcpArchitectureBoard => b(`Governed ${service} production`, `Treat ${service} configuration as reviewed infrastructure, separate policy administration from workload ownership and retain path evidence for incidents.`, `${service} governance pattern`,
  g("CHANGE CONTROL", c(service, "Versioned configuration", service)),
  g("IDENTITY / POLICY", c("IAM controls", "Separated administration", "IAM"), c("Organization Policy", "Guardrails")),
  g("SERVICE CAPABILITY", c(service, caption, service)),
  g("RESILIENCE", c("Cloud Monitoring", "Availability / path SLO")),
  g("AUDIT", c("Cloud Audit Logs", "Admin evidence"), c("Cloud Logging", "Traffic evidence"))
);
const pair = (primary: GcpArchitectureBoard, service: string, caption: string): GcpArchitectureBoard[] => [primary, gov(service, caption)];

export const gcpNetworkingArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "cloud-armor": pair(
    b("Protected internet application", "Apply edge DDoS, WAF and rate controls before traffic reaches the application load balancer and healthy backends.", "Google Cloud Cloud Armor protected application pattern",
      g("CLIENTS", c("Internet users", "HTTPS requests", "user")),
      g("EDGE SECURITY", c("Cloud Armor", "WAF + DDoS policy")),
      g("TRAFFIC DELIVERY", c("Cloud Load Balancing", "TLS + health routing")),
      g("APPLICATION", c("Cloud Run", "Serverless backend"), c("GKE", "Container backend")),
      ops()), "Cloud Armor", "Edge WAF + DDoS"),
  "cloud-cdn": pair(
    b("Global cached web delivery", "Serve cacheable content at Google's edge and send only misses through the load balancer to durable origins.", "Google Cloud Cloud CDN origin pattern",
      g("USERS", c("Global users", "HTTP(S) requests", "user")),
      g("EDGE CACHE", c("Cloud CDN", "Cache + signed access")),
      g("FRONTEND", c("Cloud Load Balancing", "Global frontend")),
      g("ORIGIN", c("Cloud Storage", "Static origin"), c("Compute Engine", "Dynamic origin")),
      ops()), "Cloud CDN", "Global edge cache"),
  "cloud-dns": pair(
    b("Authoritative public and private DNS", "Resolve public internet names and private VPC names through managed zones while protecting delegation and DNSSEC state.", "Google Cloud Cloud DNS authoritative pattern",
      g("RESOLVERS", c("Clients / resolvers", "DNS queries", "user")),
      g("AUTHORITATIVE DNS", c("Cloud DNS", "Public / private zones")),
      g("POLICY / SECURITY", c("DNSSEC", "Signed responses", "security"), c("DNS policy", "Forwarding / response", "network")),
      g("APPLICATION TARGETS", c("Cloud Load Balancing", "Application records"), c("Service Directory", "Private services")),
      ops()), "Cloud DNS", "Authoritative DNS"),
  "cloud-domains": pair(
    b("Domain registration to application", "Register a domain, delegate authoritative name servers to Cloud DNS and route users to a managed application endpoint.", "Google Cloud Domains with Cloud DNS pattern",
      g("DOMAIN OWNER", c("Registrant", "Registration lifecycle", "user")),
      g("REGISTRAR", c("Cloud Domains", "Registration + renewal")),
      g("DNS", c("Cloud DNS", "Authoritative zone")),
      g("APPLICATION", c("Cloud Load Balancing", "HTTPS frontend"), c("Cloud Run", "Web service")),
      ops()), "Cloud Domains", "Domain lifecycle"),
  "cloud-ids": pair(
    b("Out-of-band network threat detection", "Mirror selected VPC traffic to managed IDS endpoints, generate threat findings and route evidence to security operations without putting IDS inline.", "Google Cloud Cloud IDS packet mirroring pattern",
      g("WORKLOAD TRAFFIC", c("VPC workloads", "East / west traffic", "VPC")),
      g("TRAFFIC COPY", c("Packet Mirroring", "Selected packet copy", "network")),
      g("THREAT DETECTION", c("Cloud IDS", "Signature inspection")),
      g("SECURITY RESPONSE", c("Security Command Center", "Threat findings"), c("Cloud Logging", "Investigation logs")),
      ops()), "Cloud IDS", "Managed threat detection"),
  "cloud-interconnect": pair(
    b("Dedicated hybrid connectivity", "Extend on-premises routing into Google Cloud through redundant Interconnect circuits, VLAN attachments and BGP on Cloud Router.", "Google Cloud Dedicated Interconnect redundant pattern",
      g("ON-PREMISES", c("Enterprise router", "Private prefixes", "network")),
      g("PRIVATE CIRCUIT", c("Cloud Interconnect", "Dedicated / partner link")),
      g("VLAN / ROUTING", c("VLAN attachment", "Logical circuit", "network"), c("Cloud Router", "BGP exchange")),
      g("GOOGLE CLOUD", c("VPC network", "Private workloads", "VPC")),
      ops()), "Cloud Interconnect", "Private hybrid circuit"),
  "cloud-load-balancing": pair(
    b("Global application load balancing", "Terminate client traffic at Google's global edge and route only to healthy VM, GKE or serverless backends.", "Google Cloud global external Application Load Balancer pattern",
      g("CLIENTS", c("Global clients", "HTTP(S) traffic", "user")),
      g("EDGE / SECURITY", c("Cloud Armor", "WAF + DDoS"), c("Cloud Load Balancing", "Anycast frontend")),
      g("BACKENDS", c("Compute Engine", "MIG backend"), c("GKE", "NEG backend"), c("Cloud Run", "Serverless NEG")),
      g("APPLICATION DATA", c("Cloud SQL", "Transactional state"), c("Cloud Storage", "Object data")),
      ops()), "Cloud Load Balancing", "Health-aware traffic delivery"),
  "cloud-nat": pair(
    b("Private workload internet egress", "Give private VM and container workloads outbound internet connectivity without assigning public IP addresses or accepting unsolicited inbound sessions.", "Google Cloud Public NAT egress pattern",
      g("PRIVATE WORKLOADS", c("Compute Engine", "Private VMs"), c("GKE", "Private nodes")),
      g("VPC ROUTING", c("VPC network", "Regional subnet routes", "VPC"), c("Cloud Router", "NAT control plane")),
      g("ADDRESS TRANSLATION", c("Cloud NAT", "Managed SNAT")),
      g("EXTERNAL SERVICES", c("Internet / APIs", "Outbound sessions", "internet")),
      ops()), "Cloud NAT", "Managed outbound NAT"),
  "cloud-ngfw": pair(
    b("Next-generation VPC inspection", "Apply hierarchical firewall policy and managed threat inspection to selected VPC traffic before it reaches the destination workload.", "Google Cloud Cloud NGFW enterprise firewall pattern",
      g("WORKLOAD TRAFFIC", c("VPC workloads", "Network flows", "VPC")),
      g("FIREWALL POLICY", c("Cloud NGFW", "Ordered policy + tags")),
      g("THREAT INSPECTION", c("Firewall endpoint", "IPS / TLS inspection", "Cloud NGFW")),
      g("DESTINATION", c("Application workload", "Allowed traffic", "server")),
      ops()), "Cloud NGFW", "Firewall + threat prevention"),
  "cloud-router": pair(
    b("Dynamic hybrid routing", "Exchange prefixes dynamically between an external network and a VPC over VPN or Interconnect while Cloud Router remains a routing control plane rather than a packet hop.", "Google Cloud Cloud Router BGP pattern",
      g("EXTERNAL ROUTER", c("On-prem / peer router", "BGP prefixes", "network")),
      g("HYBRID LINK", c("Cloud VPN", "Encrypted link"), c("Cloud Interconnect", "Private circuit")),
      g("DYNAMIC ROUTING", c("Cloud Router", "BGP advertisements")),
      g("VPC", c("VPC network", "Learned routes", "VPC")),
      ops()), "Cloud Router", "Managed BGP control plane"),
  "cloud-service-mesh": pair(
    b("Service-to-service zero trust", "Apply workload identity, mTLS and service traffic policy between microservices while exporting request telemetry centrally.", "Google Cloud Service Mesh GKE pattern",
      g("SERVICE CLIENT", c("GKE workload", "Service request", "GKE")),
      g("MESH DATA PLANE", c("Cloud Service Mesh", "mTLS + traffic policy")),
      g("SERVICE TARGET", c("GKE workload", "Service endpoint", "GKE")),
      g("TELEMETRY", c("Cloud Monitoring", "Service metrics"), c("Cloud Logging", "Request logs"), c("Cloud Trace", "Distributed traces")),
      g("IDENTITY", c("IAM controls", "Workload identity", "IAM"))), "Cloud Service Mesh", "mTLS + service policy"),
  "cloud-vpn": pair(
    b("Highly available site-to-site VPN", "Connect an external network to a VPC through redundant HA VPN interfaces and exchange routes dynamically with Cloud Router.", "Google Cloud HA VPN redundant tunnel pattern",
      g("ON-PREMISES", c("Peer gateway", "Enterprise network", "network")),
      g("ENCRYPTED TUNNELS", c("Cloud VPN", "HA IPsec tunnels")),
      g("DYNAMIC ROUTING", c("Cloud Router", "BGP failover")),
      g("GOOGLE CLOUD", c("VPC network", "Private workloads", "VPC")),
      ops()), "Cloud VPN", "Encrypted hybrid connectivity"),
  "data-transfer-essentials": pair(
    b("Cost-aware data transfer path", "Choose the network path for a large data movement based on source, destination, geography, performance and egress economics.", "Google Cloud network data transfer decision pattern",
      g("SOURCE", c("Google Cloud service", "Data producer", "Google Cloud")),
      g("NETWORK PATH", c("Premium Tier", "Google backbone", "Network Service Tiers"), c("Standard Tier", "Regional internet", "Network Service Tiers"), c("Cloud Interconnect", "Private hybrid")),
      g("LOCATION BOUNDARY", c("Region / internet", "Transfer boundary", "network")),
      g("DESTINATION", c("External / cloud target", "Data consumer", "internet")),
      ops()), "Data Transfer Essentials", "Network transfer planning"),
  "media-cdn": pair(
    b("High-throughput streaming delivery", "Cache manifests and media segments at Google's edge while shielding the media origin from repeated global viewer demand.", "Google Cloud Media CDN streaming pattern",
      g("VIEWERS", c("Streaming clients", "Video requests", "user")),
      g("MEDIA EDGE", c("Media CDN", "Edge cache + routing")),
      g("ORIGIN SHIELD", c("Media CDN", "Consolidated fills")),
      g("MEDIA ORIGIN", c("Cloud Storage", "Media objects"), c("External origin", "Origin server", "internet")),
      ops()), "Media CDN", "Streaming edge delivery"),
  "network-connectivity-center": pair(
    b("Hub-and-spoke enterprise network", "Use Network Connectivity Center as the route-exchange hub across VPCs and hybrid links while the underlying VPN and Interconnect paths carry the actual packets.", "Google Cloud Network Connectivity Center hub-and-spoke pattern",
      g("SPOKES", c("VPC networks", "Cloud spokes", "VPC"), c("Cloud VPN", "Hybrid spoke"), c("Cloud Interconnect", "Hybrid spoke")),
      g("CONNECTIVITY HUB", c("Network Connectivity Center", "Hub + route exchange")),
      g("ROUTE POLICY", c("Route tables / groups", "Segmentation", "network")),
      g("DESTINATION SPOKES", c("VPC workloads", "Reachable networks", "VPC")),
      ops()), "Network Connectivity Center", "Hub-and-spoke routing"),
  "network-intelligence-center": pair(
    b("Network path diagnosis", "Model a source-to-destination path against routing, firewall and topology state, then use measured performance evidence to guide remediation.", "Google Cloud Network Intelligence Center troubleshooting pattern",
      g("SOURCE / DESTINATION", c("Endpoints", "Test path", "network")),
      g("PATH ANALYSIS", c("Connectivity Tests", "Config + dataplane check", "Network Intelligence Center")),
      g("NETWORK INSIGHTS", c("Network Topology", "Path view", "Network Intelligence Center"), c("Performance Dashboard", "Latency / loss", "Network Intelligence Center")),
      g("REMEDIATION", c("Network team", "Route / firewall fix", "user")),
      ops()), "Network Intelligence Center", "Network diagnostics"),
  "network-security-integration": pair(
    b("Inline network security service insertion", "Steer selected traffic through a managed or third-party inspection service, preserve routing symmetry and define explicit bypass/failure behaviour.", "Google Cloud network security service insertion pattern",
      g("WORKLOAD", c("VPC workloads", "Selected traffic", "VPC")),
      g("TRAFFIC STEERING", c("Routing / policy", "Inspection path", "network")),
      g("SECURITY SERVICE", c("Cloud NGFW", "Managed inspection"), c("Security appliance", "Partner inspection", "server")),
      g("DESTINATION", c("Application / internet", "Allowed traffic", "internet")),
      ops()), "Network Security Integration", "Security service insertion"),
  "network-service-tiers": pair(
    b("Premium versus Standard internet delivery", "Select the network tier at the external frontend to trade Google's global backbone reach against lower-cost regional internet routing.", "Google Cloud Network Service Tiers pattern",
      g("USERS", c("Internet clients", "Global demand", "user")),
      g("NETWORK TIER", c("Premium Tier", "Global backbone", "Network Service Tiers"), c("Standard Tier", "Regional internet", "Network Service Tiers")),
      g("FRONTEND", c("Cloud Load Balancing", "Supported external IP")),
      g("WORKLOAD", c("Compute Engine", "Application backend")),
      ops()), "Network Service Tiers", "Internet routing tier"),
  "secure-access-connect": pair(
    b("Identity-aware private application access", "Authenticate the user and device context at the managed access edge before a connector grants a path to a private application.", "Google Cloud Secure Access Connect private application pattern",
      g("USER / DEVICE", c("Workforce user", "Identity + device", "user")),
      g("CONTEXT POLICY", c("Cloud Identity", "Identity context"), c("Access Context Manager", "Context signals")),
      g("SECURE ACCESS", c("Secure Access Connect", "Managed access edge")),
      g("PRIVATE RESOURCE", c("Connector", "Private path", "network"), c("Private application", "Protected service", "server")),
      ops()), "Secure Access Connect", "Identity-aware private access"),
  "secure-web-proxy": pair(
    b("Governed outbound web access", "Force selected workload HTTP(S) traffic through an explicit proxy that applies URL, threat and optional TLS inspection policy before internet egress.", "Google Cloud Secure Web Proxy outbound pattern",
      g("CLIENTS", c("VPC workloads", "HTTP(S) egress", "VPC")),
      g("WEB PROXY", c("Secure Web Proxy", "Explicit proxy")),
      g("SECURITY POLICY", c("URL / threat policy", "Allow / deny", "security"), c("TLS inspection", "Enterprise CA", "security")),
      g("INTERNET", c("External websites", "Approved destinations", "internet")),
      ops()), "Secure Web Proxy", "Outbound web policy"),
  "service-extensions": pair(
    b("Programmable load-balancer extension", "Call a custom extension at a supported load-balancer stage to make a bounded decision or request mutation before traffic reaches the backend.", "Google Cloud Service Extensions callout pattern",
      g("CLIENT", c("Application client", "Request", "user")),
      g("LOAD BALANCER", c("Cloud Load Balancing", "Request processing")),
      g("EXTENSION", c("Service Extensions", "Callout / mutation")),
      g("BACKEND", c("Cloud Run", "Application service"), c("GKE", "Service backend")),
      ops()), "Service Extensions", "Programmable datapath hook"),
  "virtual-private-cloud": pair(
    b("Segmented VPC application network", "Place workloads in regional subnets, apply distributed firewall policy and route private traffic toward managed services, peers or hybrid gateways.", "Google Cloud VPC application network pattern",
      g("WORKLOADS", c("Compute Engine", "VM interfaces"), c("GKE", "Pod / node ranges")),
      g("SUBNET / FIREWALL", c("VPC network", "Subnets + routes", "VPC"), c("Cloud Firewall", "Traffic policy")),
      g("PRIVATE SERVICES", c("Private Service Connect", "Private endpoints"), c("Cloud NAT", "Outbound egress")),
      g("HYBRID / PEER", c("Cloud VPN", "Hybrid"), c("VPC Peering", "Peer VPC", "VPC")),
      ops()), "Virtual Private Cloud", "Global software-defined network"),
  "vpc-service-controls": pair(
    b("Data exfiltration service perimeter", "Evaluate request context and explicit ingress/egress rules before a protected Google Cloud API can access resources inside a service perimeter.", "Google Cloud VPC Service Controls perimeter pattern",
      g("PRINCIPAL / REQUEST", c("User / workload", "API request", "user")),
      g("CONTEXT", c("Access Context Manager", "Access level")),
      g("PERIMETER", c("VPC Service Controls", "Ingress / egress policy")),
      g("PROTECTED SERVICES", c("BigQuery", "Protected data"), c("Cloud Storage", "Protected objects")),
      g("EVIDENCE", c("Cloud Audit Logs", "Violation reason"), c("Cloud Logging", "Dry-run findings"))), "VPC Service Controls", "API service perimeter")
};
