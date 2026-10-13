"use client";

import { useEffect, useMemo, useState } from "react";
import "./SemanticSearch.css";
import catalogItems from "../semantic-search-index.json";

type SearchItem = {
  title: string;
  description: string;
  href: string;
  provider: "AWS" | "Azure" | "Google Cloud" | "Multi-cloud" | "Certification";
  terms: string;
};

const curatedItems: SearchItem[] = [
  { title: "Amazon EC2", description: "Virtual machines, compute capacity, and scalable workloads.", href: "/services?service=Amazon%20EC2", provider: "AWS", terms: "virtual machine vm server compute instance linux windows host lift and shift" },
  { title: "AWS Lambda", description: "Run code without managing servers; event-driven serverless compute.", href: "/services?service=AWS%20Lambda", provider: "AWS", terms: "serverless functions event trigger pay per use backend automation" },
  { title: "Amazon S3", description: "Object storage for backups, static assets, data lakes, and archives.", href: "/services?service=Amazon%20S3", provider: "AWS", terms: "object storage files backup archive static website data lake bucket" },
  { title: "Amazon VPC", description: "Isolated cloud networking, subnets, routes, and traffic boundaries.", href: "/services?service=Amazon%20VPC", provider: "AWS", terms: "network private subnet routing isolation vnet firewall connectivity" },
  { title: "AWS IAM", description: "Identities, roles, policies, least privilege, and workload access.", href: "/services?service=AWS%20IAM", provider: "AWS", terms: "identity access management permissions role least privilege authentication authorization entra id" },
  { title: "AWS Network Firewall", description: "Managed network traffic inspection and firewall policy enforcement.", href: "/services?service=AWS%20Network%20Firewall", provider: "AWS", terms: "firewall ids ips inspect traffic network security segmentation" },
  { title: "Amazon CloudWatch", description: "Metrics, logs, alarms, dashboards, and operational observability.", href: "/services?service=Amazon%20CloudWatch", provider: "AWS", terms: "monitoring metrics logs alert tracing observability troubleshoot" },
  { title: "Amazon EKS", description: "Managed Kubernetes for containerized applications.", href: "/services?service=Amazon%20EKS", provider: "AWS", terms: "kubernetes containers orchestration microservices pods cluster" },
  { title: "Amazon RDS", description: "Managed relational databases with backups and high availability options.", href: "/services?service=Amazon%20RDS", provider: "AWS", terms: "sql relational database postgres mysql oracle database migration" },
  { title: "Amazon DynamoDB", description: "Managed NoSQL key-value and document database at scale.", href: "/services?service=Amazon%20DynamoDB", provider: "AWS", terms: "nosql key value document low latency scalable database" },
  { title: "Amazon Bedrock", description: "Build generative AI applications and agents with foundation models.", href: "/services?service=Amazon%20Bedrock", provider: "AWS", terms: "gen ai generative ai llm foundation model agents prompt chatbot" },
  { title: "Amazon Bedrock Knowledge Bases", description: "Ground AI answers in enterprise content using retrieval-augmented generation.", href: "/services?service=Amazon%20Bedrock%20Knowledge%20Bases", provider: "AWS", terms: "rag retrieval augmented generation embeddings vector search semantic search enterprise documents hallucination grounding" },
  { title: "AWS Organizations and Control Tower", description: "Govern multiple accounts with guardrails, landing zones, and policy controls.", href: "/services?service=AWS%20Control%20Tower", provider: "AWS", terms: "multi account governance landing zone guardrails policy organization enterprise" },
  { title: "AWS Security Hub", description: "Centralize security findings and posture visibility.", href: "/services?service=AWS%20Security%20Hub", provider: "AWS", terms: "security posture findings compliance threat detection soc" },
  { title: "AWS KMS", description: "Create and control encryption keys for data protection.", href: "/services?service=AWS%20KMS", provider: "AWS", terms: "encryption keys cryptography kms secrets at rest transit customer managed key" },
  { title: "AWS Direct Connect", description: "Dedicated network connectivity between on-premises environments and AWS.", href: "/services?service=AWS%20Direct%20Connect", provider: "AWS", terms: "hybrid network private dedicated connection on premise datacenter expressroute interconnect" },
  { title: "Amazon CloudFront", description: "Deliver content globally through an edge network and caching.", href: "/services?service=Amazon%20CloudFront", provider: "AWS", terms: "cdn edge caching low latency web delivery content distribution" },
  { title: "AWS Migration services", description: "Plan and execute workload, database, and large-scale cloud migrations.", href: "/services?service=AWS%20Application%20Migration%20Service", provider: "AWS", terms: "migrate migration rehost replatform datacenter move workloads database transfer" },
  { title: "Microsoft Azure Virtual Machines", description: "Provision and manage Windows and Linux virtual machines.", href: "/azure-services?service=virtual-machines", provider: "Azure", terms: "vm virtual machine compute server host" },
  { title: "Azure Functions", description: "Run event-driven code without managing application servers.", href: "/azure-services?service=azure-functions", provider: "Azure", terms: "serverless functions event triggers automation" },
  { title: "Azure Blob Storage", description: "Object storage for unstructured data, backups, and analytics.", href: "/azure-services?service=azure-blob-storage", provider: "Azure", terms: "object storage file backup archive data lake" },
  { title: "Azure Virtual Network", description: "Private networking, subnets, routing, and network segmentation.", href: "/azure-services?service=azure-virtual-network", provider: "Azure", terms: "vnet private subnet routing connectivity network isolation" },
  { title: "Microsoft Entra ID", description: "Cloud identity, authentication, conditional access, and identity governance.", href: "/azure-services?service=microsoft-entra-id", provider: "Azure", terms: "identity access management authentication sso permissions zero trust" },
  { title: "Azure AI Foundry", description: "Build, evaluate, and govern AI applications and agents.", href: "/azure-services?service=microsoft-foundry", provider: "Azure", terms: "generative ai llm agent model prompt chatbot" },
  { title: "Azure Monitor", description: "Collect telemetry, analyze logs, and alert on operational signals.", href: "/azure-services?service=azure-monitor", provider: "Azure", terms: "monitoring logs metrics observability alerts troubleshooting" },
  { title: "Azure Kubernetes Service", description: "Managed Kubernetes clusters for container workloads.", href: "/azure-services?service=azure-kubernetes-service", provider: "Azure", terms: "aks kubernetes container orchestration microservices" },
  { title: "Google Compute Engine", description: "Virtual machines for general-purpose and specialized compute.", href: "/gcp-services?service=compute-engine", provider: "Google Cloud", terms: "virtual machine vm server compute instance" },
  { title: "Cloud Run", description: "Run containerized applications on a serverless platform.", href: "/gcp-services?service=cloud-run", provider: "Google Cloud", terms: "serverless container service api scale to zero functions" },
  { title: "Cloud Storage", description: "Object storage for application data, backups, and analytics.", href: "/gcp-services?service=cloud-storage", provider: "Google Cloud", terms: "object storage bucket backup archive data lake files" },
  { title: "Google Kubernetes Engine", description: "Managed Kubernetes for containerized workloads.", href: "/gcp-services?service=google-kubernetes-engine", provider: "Google Cloud", terms: "gke kubernetes container orchestration microservices pods cluster" },
  { title: "BigQuery", description: "Serverless analytics warehouse for large-scale SQL analysis.", href: "/gcp-services?service=bigquery", provider: "Google Cloud", terms: "data warehouse analytics sql reporting business intelligence data lake" },
  { title: "Vertex AI", description: "Build, deploy, evaluate, and operate machine-learning and generative AI solutions.", href: "/courses/gcp-professional-machine-learning-engineer", provider: "Google Cloud", terms: "machine learning generative ai llm foundation model agents mlops" },
  { title: "Cloud IAM", description: "Manage identities, roles, permissions, and access boundaries.", href: "/gcp-services?service=identity-and-access-management", provider: "Google Cloud", terms: "identity access management permissions role least privilege authentication" },
  { title: "Cloud Logging and Monitoring", description: "Investigate logs, track metrics, and alert on service health.", href: "/gcp-services?service=logging", provider: "Google Cloud", terms: "monitoring metrics logs alert observability troubleshooting" },
  { title: "Cloud Interconnect", description: "Connect on-premises networks to Google Cloud using dedicated connectivity.", href: "/gcp-services?service=cloud-interconnect", provider: "Google Cloud", terms: "hybrid network private dedicated connection datacenter" },
  { title: "Cloud Digital Leader (CDL)", description: "Understand cloud value, digital transformation, data, AI, and Google Cloud services.", href: "/courses/gcp-cloud-digital-leader", provider: "Certification", terms: "beginner foundational business cloud digital transformation" },
  { title: "Google Cloud Professional Cloud Architect", description: "Architecture design, security, reliability, operations, and cost optimization.", href: "/courses/gcp-professional-cloud-architect", provider: "Certification", terms: "pca architect design architecture migration security reliability resilient cost optimization" },
  { title: "AWS Solutions Architect – Associate", description: "Design secure, resilient, high-performing, cost-optimized AWS architectures.", href: "/courses/aws-solutions-architect-associate", provider: "Certification", terms: "saa architecture architect availability fault tolerant secure cost optimization" },
  { title: "AWS Security Specialty", description: "Prepare for AWS security, identity, logging, data protection, and incident response.", href: "/courses/aws-security-specialty", provider: "Certification", terms: "security cyber threat detection encryption iam incident response compliance" },
  { title: "Azure Solutions Architect (AZ-305)", description: "Design Azure infrastructure, identity, governance, data, and business continuity.", href: "/courses/azure-az-305", provider: "Certification", terms: "architecture architect design az305 identity networking resilience" },
  { title: "AWS AI Practitioner", description: "Learn AI concepts, foundation models, responsible AI, and AWS AI services.", href: "/courses/aws-ai-practitioner", provider: "Certification", terms: "ai artificial intelligence gen ai machine learning llm responsible ai beginner" },
  { title: "Google Cloud Generative AI Leader", description: "Learn generative AI fundamentals, business value, and responsible adoption.", href: "/courses/gcp-generative-ai-leader", provider: "Certification", terms: "generative ai business leader adoption governance" },
  { title: "Cross-cloud comparison", description: "Compare equivalent AWS, Azure, and Google Cloud services and trade-offs.", href: "/cloud-comparison", provider: "Multi-cloud", terms: "compare equivalent differences alternatives tradeoffs aws azure gcp cloud provider mapping" },
  { title: "Cloud architecture patterns", description: "Find visual guides for high availability, disaster recovery, hybrid cloud, and secure network design.", href: "/cloud-comparison", provider: "Multi-cloud", terms: "architecture pattern reference design highly available ha dr disaster recovery failover multi region active active backup restore hybrid cloud private connectivity network security" },
  { title: "Cost optimization", description: "Explore rightsizing, autoscaling, storage tiers, budgets, and pricing trade-offs.", href: "/cloud-comparison", provider: "Multi-cloud", terms: "cost optimization cheaper price budget spending finops rightsizing autoscaling reserved commitment storage tier waste" },
  { title: "Zero trust and identity security", description: "Study identity-first access, least privilege, segmentation, and secure service access.", href: "/courses/aws-security-specialty", provider: "Multi-cloud", terms: "zero trust identity security least privilege conditional access iam entra id segmentation authentication authorization" },
  { title: "Monitoring and incident response", description: "Connect logs, metrics, alerts, security findings, and operational response.", href: "/services?service=Amazon%20CloudWatch", provider: "Multi-cloud", terms: "monitor logs metrics tracing alert incident response observability detection soc troubleshooting" },
  { title: "Containers and Kubernetes", description: "Understand container images, orchestration, clusters, and microservice deployment.", href: "/services?service=Amazon%20EKS", provider: "Multi-cloud", terms: "docker kubernetes k8s containers orchestration cluster microservices deployment" },
  { title: "Serverless applications", description: "Explore event-driven compute, managed services, and scale-to-zero patterns.", href: "/services?service=AWS%20Lambda", provider: "Multi-cloud", terms: "serverless no server event driven functions scale to zero lambda functions" },
  { title: "AI agents and RAG", description: "Find agent, foundation-model, embedding, vector-search, and knowledge-base learning material.", href: "/services?service=Amazon%20Bedrock%20Knowledge%20Bases", provider: "Multi-cloud", terms: "agentic rag retrieval augmented generation vector database embedding semantic search llm grounding knowledge base ai" },
  { title: "Private cloud networking", description: "Explore VPC/VNet design, private subnets, VPNs, dedicated links, and hybrid connectivity.", href: "/services?service=Amazon%20VPC", provider: "Multi-cloud", terms: "private network vpn hybrid cloud vpc vnet subnet routing direct connect expressroute interconnect connectivity" },
  { title: "Data lakes and analytics", description: "Explore object storage, ingestion, data lakes, warehouses, and analytical queries.", href: "/gcp-services?service=bigquery", provider: "Multi-cloud", terms: "data lake warehouse analytics etl ingestion object storage sql bigquery glue" },
  { title: "Resilience and disaster recovery", description: "Learn redundancy, multi-zone design, failover, backup, recovery objectives, and continuity.", href: "/cloud-comparison", provider: "Multi-cloud", terms: "resilience reliability high availability fault tolerance disaster recovery rto rpo failover multi az multi region backup business continuity" },
];

const items: SearchItem[] = [...curatedItems, ...(catalogItems as SearchItem[])];

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const synonyms: Record<string, string[]> = {
  vm: ["virtual machine", "compute"], vms: ["virtual machine", "compute"], "k8s": ["kubernetes", "containers"], "rag": ["retrieval augmented generation", "knowledge bases", "semantic search"],
  "genai": ["generative ai"], "gen ai": ["generative ai"], llm: ["foundation model", "generative ai"], "sso": ["single sign on", "identity"],
  "dr": ["disaster recovery"], ha: ["high availability"], "finops": ["cost optimization"], "cdn": ["content delivery", "edge caching"],
  "db": ["database"], "sql": ["relational database", "analytics"], "iam": ["identity access management"], "soc": ["security operations", "incident response"],
  "vpn": ["private connectivity", "hybrid network"], "on prem": ["on premises", "hybrid cloud"], "on premise": ["on premises", "hybrid cloud"],
};

function score(item: SearchItem, query: string) {
  const q = normalize(query);
  if (!q) return 0;
  const corpus = normalize([item.title, item.description, item.provider, item.terms].join(" "));
  const phrase = normalize(item.title);
  let total = phrase === q ? 100 : phrase.includes(q) ? 24 : corpus.includes(q) ? 14 : 0;
  const tokens = [...new Set(q.split(" ").filter(token => token.length > 1))];
  for (const token of tokens) {
    if (phrase.split(" ").includes(token)) total += 8;
    else if (phrase.includes(token)) total += 5;
    else if (corpus.split(" ").includes(token)) total += 3;
  }
  const expanded = synonyms[q] || [];
  for (const term of expanded) if (corpus.includes(normalize(term))) total += 10;
  return total;
}

export default function SemanticSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(value => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);
  const results = useMemo(() => items.map(item => ({ item, score: score(item, query) })).filter(entry => entry.score > 0).sort((a,b) => b.score - a.score).slice(0, 7), [query]);
  return <div className="semantic-search">
    <button type="button" className="semantic-search-trigger" aria-expanded={open} onClick={() => setOpen(value => !value)}>
      <span className="semantic-search-icon" aria-hidden="true">⌕</span><span>Search by concept, problem, or service</span><kbd>⌘ K</kbd>
    </button>
    {open && <div className="semantic-search-panel" role="dialog" aria-label="Semantic cloud search">
      <div className="semantic-search-input-wrap"><span aria-hidden="true">⌕</span><input autoFocus type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="e.g. keep a private app highly available…" aria-label="Search cloud learning content" onKeyDown={event => { if (event.key === "Escape") setOpen(false); if (event.key === "Enter" && results[0]) window.location.href = results[0].item.href; }} /><button type="button" onClick={() => { setQuery(""); setOpen(false); }} aria-label="Close search">×</button></div>
      <p className="semantic-search-hint">Try a goal or plain-English question—not just a product name.</p>
      <div className="semantic-search-suggestions">{["private app connectivity", "reduce cloud costs", "AI agents and RAG", "disaster recovery"].map(value => <button key={value} type="button" onClick={() => setQuery(value)}>{value}</button>)}</div>
      {query.trim() && <div className="semantic-search-results" role="listbox" aria-label="Search results">
        {results.length ? results.map(({ item, score: relevance }) => <a role="option" key={item.title} href={item.href} onClick={() => setOpen(false)}><span className="semantic-result-provider">{item.provider} · {relevance >= 24 ? "Strong match" : "Related topic"}</span><strong>{item.title}</strong><small>{item.description}</small></a>) : <p className="semantic-no-results">No close match yet. Try a service name, “security”, “serverless”, “RAG”, or “cost optimization”.</p>}
      </div>}
      <div className="semantic-search-footer"><span>Searches concepts, aliases, use cases, and service names</span><button type="button" onClick={() => { setQuery(""); setOpen(false); }}>Close</button></div>
    </div>}
  </div>;
}
