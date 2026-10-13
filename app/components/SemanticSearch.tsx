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
  kind?: "Service" | "Certification" | "Course task";
  courseCode?: string;
  domain?: string;
  taskId?: string;
  walkthroughs?: ["primary", "companion"];
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


const certificationItems: SearchItem[] = [
  { title: "AWS Certified Cloud Practitioner (CLF-C02)", description: "AWS foundational cloud concepts, value, security, and billing.", href: "/courses/aws-cloud-practitioner", provider: "Certification", terms: "clf cloud practitioner foundational beginner aws certified cloud practitioner" },
  { title: "AWS Certified AI Practitioner (AIF-C01)", description: "AI, machine learning, generative AI, responsible AI, and AWS AI services.", href: "/courses/aws-ai-practitioner", provider: "Certification", terms: "aif ai foundation ai practitioner artificial intelligence aws" },
  { title: "AWS Solutions Architect – Associate (SAA-C03)", description: "Design secure, resilient, high-performing, cost-optimized AWS architectures.", href: "/courses/aws-solutions-architect-associate", provider: "Certification", terms: "saa saa c03 solutions architect associate aws architecture" },
  { title: "AWS Developer – Associate (DVA-C02)", description: "Develop, deploy, secure, and troubleshoot applications on AWS.", href: "/courses/aws-developer-associate", provider: "Certification", terms: "dva developer associate aws applications" },
  { title: "AWS CloudOps Engineer – Associate (SOA-C03)", description: "Deploy, manage, monitor, and operate workloads on AWS.", href: "/courses/aws-cloudops-engineer-associate", provider: "Certification", terms: "soa cloudops sysops operations associate aws" },
  { title: "AWS Data Engineer – Associate (DEA-C01)", description: "Build and operate data pipelines, data stores, and analytics solutions.", href: "/courses/aws-data-engineer-associate", provider: "Certification", terms: "dea data engineer associate aws" },
  { title: "AWS Machine Learning Engineer – Associate (MLA-C01)", description: "Prepare data, build models, deploy, and monitor ML workloads.", href: "/courses/aws-machine-learning-engineer-associate", provider: "Certification", terms: "mla machine learning engineer associate aws ml" },
  { title: "AWS Solutions Architect – Professional (SAP-C02)", description: "Advanced AWS architecture, organizational complexity, migration, resilience, and optimization.", href: "/courses/aws-solutions-architect-professional", provider: "Certification", terms: "sap sap-c02 solutions architect professional aws certified professional architecture" },
  { title: "AWS DevOps Engineer – Professional (DOP-C02)", description: "Automate delivery, resilience, observability, and security on AWS.", href: "/courses/aws-devops-engineer-professional", provider: "Certification", terms: "dop devops engineer professional aws" },
  { title: "AWS Generative AI Developer – Professional (AIP-C01)", description: "Design and implement production generative AI solutions on AWS.", href: "/courses/aws-generative-ai-developer-professional", provider: "Certification", terms: "aip aip-c01 generative ai developer professional aws genai" },
  { title: "AWS Advanced Networking – Specialty (ANS-C01)", description: "Design and troubleshoot complex hybrid and AWS network architectures.", href: "/courses/aws-advanced-networking-specialty", provider: "Certification", terms: "ans advanced networking specialty aws network" },
  { title: "AWS Security – Specialty (SCS-C03)", description: "Secure AWS workloads, identities, data, logging, and incident response.", href: "/courses/aws-security-specialty", provider: "Certification", terms: "scs security specialty aws cybersecurity" },
  { title: "Azure Fundamentals (AZ-900)", description: "Core cloud concepts, Azure services, security, governance, and pricing.", href: "/courses/azure-az-900", provider: "Certification", terms: "az900 azure fundamentals beginner" },
  { title: "Azure Administrator Associate (AZ-104)", description: "Manage Azure identity, compute, networking, storage, and governance.", href: "/courses/azure-az-104", provider: "Certification", terms: "az104 azure administrator associate admin" },
  { title: "Azure Solutions Architect Expert (AZ-305)", description: "Design Azure infrastructure, identity, data, governance, and continuity.", href: "/courses/azure-az-305", provider: "Certification", terms: "az305 azure solutions architect expert architecture" },
  { title: "Azure Network Engineer Associate (AZ-700)", description: "Design and implement Azure networking and hybrid connectivity.", href: "/courses/azure-az-700", provider: "Certification", terms: "az700 azure network engineer networking" },
  { title: "Azure DevOps Engineer Expert (AZ-400)", description: "Plan, implement, and operate secure delivery pipelines.", href: "/courses/azure-az-400", provider: "Certification", terms: "az400 azure devops engineer expert" },
  { title: "Azure AI Fundamentals (AI-901)", description: "Understand AI concepts and Azure AI workloads.", href: "/courses/azure-ai-901", provider: "Certification", terms: "ai901 azure ai fundamentals" },
  { title: "Azure AI Apps and Agents (AI-103)", description: "Build AI applications and agents with Microsoft Azure.", href: "/courses/azure-ai-103", provider: "Certification", terms: "ai103 azure ai apps agents" },
  { title: "Azure Data Fundamentals (DP-900)", description: "Core relational, non-relational, analytics, and data workloads.", href: "/courses/azure-dp-900", provider: "Certification", terms: "dp900 azure data fundamentals" },
  { title: "Azure Database Administrator (DP-300)", description: "Manage, secure, and optimize relational database platforms.", href: "/courses/azure-dp-300", provider: "Certification", terms: "dp300 azure database administrator" },
  { title: "Fabric Analytics Engineer (DP-600)", description: "Implement analytics solutions with Microsoft Fabric.", href: "/courses/azure-dp-600", provider: "Certification", terms: "dp600 fabric analytics engineer" },
  { title: "Azure Virtual Desktop (AZ-140)", description: "Plan, deploy, and manage Azure Virtual Desktop.", href: "/courses/azure-az-140", provider: "Certification", terms: "az140 azure virtual desktop" },
  { title: "Azure for SAP Workloads (AZ-120)", description: "Plan and operate SAP workloads on Azure.", href: "/courses/azure-az-120", provider: "Certification", terms: "az120 azure sap workloads" },
  { title: "Security, Compliance and Identity Fundamentals (SC-900)", description: "Foundational security, compliance, and identity concepts.", href: "/courses/azure-sc-900", provider: "Certification", terms: "sc900 security compliance identity fundamentals" },
  { title: "Identity and Access Administrator (SC-300)", description: "Manage identity lifecycle, authentication, and access in Microsoft Entra.", href: "/courses/azure-sc-300", provider: "Certification", terms: "sc300 identity access administrator entra" },
  { title: "Security Operations Analyst (SC-200)", description: "Investigate threats and respond using security operations tools.", href: "/courses/azure-sc-200", provider: "Certification", terms: "sc200 security operations analyst soc" },
  { title: "Google Cloud Digital Leader (CDL)", description: "Cloud value, digital transformation, data, AI, and Google Cloud services.", href: "/courses/gcp-cloud-digital-leader", provider: "Certification", terms: "cdl cloud digital leader google cloud foundational" },
  { title: "Google Cloud Generative AI Leader (GAL)", description: "Generative AI fundamentals, business value, and responsible adoption.", href: "/courses/gcp-generative-ai-leader", provider: "Certification", terms: "gal generative ai leader google cloud business" },
  { title: "Google Cloud Associate Cloud Engineer (ACE)", description: "Deploy, configure, secure, and operate workloads on Google Cloud.", href: "/courses/gcp-associate-cloud-engineer", provider: "Certification", terms: "ace associate cloud engineer google cloud" },
  { title: "Google Cloud Associate Data Practitioner (ADP)", description: "Prepare, ingest, analyze, visualize, and govern data on Google Cloud.", href: "/courses/gcp-associate-data-practitioner", provider: "Certification", terms: "adp associate data practitioner google cloud" },
  { title: "Google Workspace Administrator (AGWA)", description: "Manage Google Workspace users, services, security, and administration.", href: "/courses/gcp-associate-google-workspace-administrator", provider: "Certification", terms: "agwa associate google workspace administrator" },
  { title: "Google Cloud Professional Cloud Architect (PCA)", description: "Design secure, resilient, scalable, and cost-optimized cloud architectures.", href: "/courses/gcp-professional-cloud-architect", provider: "Certification", terms: "pca professional cloud architect google cloud" },
  { title: "Google Cloud Professional Cloud Developer (PCD)", description: "Build, deploy, and scale applications on Google Cloud.", href: "/courses/gcp-professional-cloud-developer", provider: "Certification", terms: "pcd professional cloud developer google cloud" },
  { title: "Google Cloud Professional Data Engineer (PDE)", description: "Design data processing systems, analytics, and machine learning pipelines.", href: "/courses/gcp-professional-data-engineer", provider: "Certification", terms: "pde professional data engineer google cloud" },
  { title: "Google Cloud Professional Cloud Database Engineer (PCDE)", description: "Design, migrate, secure, and operate cloud database solutions.", href: "/courses/gcp-professional-cloud-database-engineer", provider: "Certification", terms: "pcde professional cloud database engineer google cloud" },
  { title: "Google Cloud Professional Machine Learning Engineer (PMLE)", description: "Build, deploy, and monitor machine learning solutions on Google Cloud.", href: "/courses/gcp-professional-machine-learning-engineer", provider: "Certification", terms: "pmle professional machine learning engineer google cloud" },
  { title: "Google Cloud Professional Cloud Security Engineer (PCSE)", description: "Design and operate secure Google Cloud environments.", href: "/courses/gcp-professional-cloud-security-engineer", provider: "Certification", terms: "pcse professional cloud security engineer google cloud" },
  { title: "Google Cloud Professional Cloud DevOps Engineer (PCDOE)", description: "Implement reliability, delivery automation, and operations on Google Cloud.", href: "/courses/gcp-professional-cloud-devops-engineer", provider: "Certification", terms: "pcdoe professional cloud devops engineer google cloud" },
  { title: "Google Cloud Professional Cloud Network Engineer (PCNE)", description: "Design and implement Google Cloud network architectures.", href: "/courses/gcp-professional-cloud-network-engineer", provider: "Certification", terms: "pcne professional cloud network engineer google cloud" },
  { title: "Google Cloud Professional Agentic Architect (PAA)", description: "Design agentic AI solutions and architecture patterns on Google Cloud.", href: "/courses/gcp-professional-agentic-architect", provider: "Certification", terms: "paa professional agentic architect google cloud agentic ai" },
  { title: "Google Cloud Professional Security Operations Engineer (PSOE)", description: "Design and operate security monitoring and response with Google Cloud SecOps.", href: "/courses/gcp-professional-security-operations-engineer", provider: "Certification", terms: "psoe professional security operations engineer google cloud secops" },
];

const items: SearchItem[] = [...curatedItems, ...certificationItems, ...(catalogItems as SearchItem[])];

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Certification acronyms, common abbreviations, alternate spellings, and cloud jargon.
const aliases: Record<string, string[]> = {
  gal: ["generative ai leader", "google cloud generative ai leader"],
  "generative ai leader": ["gal", "google cloud generative ai leader"],
  cdl: ["cloud digital leader", "google cloud digital leader"],
  pca: ["professional cloud architect", "google cloud professional cloud architect"],
  pcd: ["professional cloud developer", "google cloud professional cloud developer"],
  agwa: ["associate google workspace administrator", "google workspace administrator"],
  ace: ["associate cloud engineer", "google cloud associate cloud engineer"],
  adp: ["associate data practitioner", "google cloud associate data practitioner"],
  pde: ["professional data engineer", "google cloud professional data engineer"],
  pmle: ["professional machine learning engineer", "google cloud professional machine learning engineer"],
  pcse: ["professional cloud security engineer", "google cloud professional cloud security engineer"],
  pcdoe: ["professional cloud devops engineer", "google cloud professional cloud devops engineer"],
  paa: ["professional agentic architect", "google cloud professional agentic architect"],
  pcde: ["professional cloud database engineer", "google cloud professional cloud database engineer"],
  pcne: ["professional cloud network engineer", "google cloud professional cloud network engineer"],
  psoe: ["professional security operations engineer", "google cloud professional security operations engineer"],
  saa: ["solutions architect associate", "aws solutions architect associate"],
  sap: ["solutions architect professional", "aws solutions architect professional"],
  aip: ["generative ai developer professional", "aws generative ai developer professional"],
  aif: ["ai practitioner", "aws ai practitioner", "ai foundation"],
  clf: ["cloud practitioner", "aws certified cloud practitioner"],
  scs: ["security specialty", "aws security specialty"],
  soa: ["cloudops engineer associate", "aws cloudops engineer associate"],
  dea: ["data engineer associate", "aws data engineer associate"],
  mla: ["machine learning engineer associate", "aws machine learning engineer associate"],
  dop: ["devops engineer professional", "aws devops engineer professional"],
  sc: ["security compliance identity"],
  ans: ["advanced networking specialty", "aws advanced networking"],
  dva: ["developer associate", "aws developer associate"],
  "az 305": ["azure solutions architect expert", "designing microsoft azure infrastructure solutions"],
  az900: ["azure fundamentals"], az104: ["azure administrator associate"], az700: ["azure network engineer"], az400: ["azure devops engineer"],
  ai901: ["azure ai fundamentals"], ai103: ["azure ai apps and agents"], dp900: ["azure data fundamentals"], dp300: ["azure database administrator"], dp600: ["fabric analytics engineer"], az140: ["azure virtual desktop"], az120: ["azure sap workloads"], sc900: ["security compliance identity fundamentals"], sc300: ["identity and access administrator"], sc200: ["security operations analyst"],
  "az 104": ["azure administrator associate", "azure administration"],
  // Cross-cloud concept synonyms and concrete service names. These aliases let capability searches
  // find the actual services even when their catalog descriptions use different wording.
  data: ["data analytics", "data engineering", "data lake", "data warehouse", "data warehousing", "etl", "elt", "data pipelines", "business intelligence", "bi", "olap", "amazon redshift", "redshift serverless", "amazon athena", "aws glue", "aws lake formation", "azure synapse analytics", "microsoft fabric", "azure data factory", "azure databricks", "bigquery", "dataflow", "dataform", "looker"],
  analytics: ["data analytics", "data engineering", "data lake", "data warehouse", "data warehousing", "etl", "elt", "data pipelines", "business intelligence", "bi", "olap", "amazon redshift", "redshift serverless", "amazon athena", "aws glue", "aws lake formation", "azure synapse analytics", "microsoft fabric", "azure data factory", "azure databricks", "bigquery", "dataflow", "dataform", "looker", "power bi", "stream analytics"],
  warehouse: ["data warehouse", "data warehousing", "analytics", "sql", "olap", "amazon redshift", "redshift serverless", "bigquery", "azure synapse analytics", "microsoft fabric", "snowflake"],
  etl: ["extract transform load", "data integration", "data pipelines", "elt", "aws glue", "aws glue databrew", "azure data factory", "azure synapse pipelines", "google cloud dataflow", "cloud data fusion", "datastream", "dataform"],
  database: ["relational database", "nosql", "managed database", "sql database", "amazon rds", "amazon aurora", "dynamodb", "documentdb", "neptune", "redshift", "azure sql database", "cosmos db", "azure database for postgresql", "cloud sql", "alloydb", "spanner", "bigtable", "firestore", "memorystore"],
  security: ["cloud security", "identity security", "threat detection", "security posture", "key management", "firewall", "web application firewall", "waf", "defender for cloud", "security command center", "security hub", "guardduty", "inspector", "macie", "sentinel", "key vault", "kms", "cloud armor", "security operations", "siem", "soar"],
  networking: ["cloud networking", "virtual network", "vpc", "vnet", "subnet", "routing", "hybrid connectivity", "load balancing", "cloud interconnect", "expressroute", "direct connect", "transit gateway", "cloud vpn", "private link", "private endpoint", "dns", "route 53", "azure front door", "cloud cdn"],
  compute: ["virtual machines", "compute engine", "azure virtual machines", "amazon ec2", "serverless compute", "containers", "batch processing", "autoscaling", "scale sets", "instance groups"],
  storage: ["object storage", "blob storage", "cloud storage", "amazon s3", "azure data lake storage", "efs", "fsx", "persistent disk", "filestore", "backup", "archive", "data lake", "file storage", "block storage"],
  monitoring: ["observability", "logs", "logging", "metrics", "alerts", "tracing", "cloudwatch", "azure monitor", "cloud monitoring", "cloud logging", "application insights", "managed prometheus", "managed grafana", "opentelemetry"],
  ai: ["artificial intelligence", "machine learning", "generative ai", "foundation models", "ai agents", "vertex ai", "azure ai foundry", "azure openai", "amazon bedrock", "sagemaker", "model training", "inference", "llm", "rag", "embeddings"],
  migration: ["cloud migration", "database migration", "modernization", "aws migration", "application migration service", "azure migrate", "database migration service", "google cloud migration", "transfer appliance", "data transfer", "disaster recovery"],
  governance: ["cloud governance", "policy controls", "compliance", "landing zone", "management groups", "organization policies", "aws organizations", "control tower", "azure policy", "resource manager", "cloud asset inventory", "audit", "configuration compliance"],
  containers: ["kubernetes", "amazon eks", "azure kubernetes service", "google kubernetes engine", "gke", "aks", "eks", "container registry", "container apps", "cloud run", "fargate", "artifact registry"],
  serverless: ["serverless compute", "aws lambda", "azure functions", "cloud run", "event driven applications", "eventbridge", "step functions", "logic apps", "cloud functions", "api gateway"],
  integration: ["data integration", "application integration", "event routing", "message broker", "workflow orchestration", "aws glue", "eventbridge", "step functions", "azure logic apps", "service bus", "event grid", "cloud data fusion", "workflows", "pub sub"],
  messaging: ["message queue", "event streaming", "event bus", "pub sub", "kafka", "amazon sqs", "amazon sns", "eventbridge", "azure service bus", "event grid", "confluent"],
  devops: ["continuous integration", "continuous delivery", "ci cd", "deployment pipeline", "infrastructure as code", "terraform", "cloud build", "codebuild", "codepipeline", "azure devops", "deployment manager", "cloud deploy"],
  backup: ["backup and recovery", "disaster recovery", "archive", "restore", "snapshots", "aws backup", "azure backup", "backup and dr", "recovery services vault"],
  identity: ["identity and access management", "iam", "single sign on", "sso", "multi factor authentication", "mfa", "least privilege", "workload identity", "entra id", "active directory", "identity center", "cloud identity"],
  api: ["api management", "api gateway", "application programming interface", "rest api", "graphql", "service mesh", "azure api management", "apigee", "amazon api gateway"],
  cdn: ["content delivery", "edge caching", "cloudfront", "azure front door", "cloud cdn", "global accelerator"],
  dns: ["domain name system", "route 53", "azure dns", "cloud dns", "name resolution", "traffic manager"],
  encryption: ["key management", "encryption at rest", "encryption in transit", "kms", "key vault", "cloud hsm", "secret manager", "certificate manager"],
  compliance: ["regulatory compliance", "audit evidence", "security posture", "policy controls", "configuration compliance", "aws config", "audit manager", "defender for cloud", "security command center"],
  cost: ["cost optimization", "finops", "billing", "budgets", "pricing calculator", "cost explorer", "cloudability", "billing reports", "resource optimization"],
  ml: ["machine learning", "model training", "model deployment", "inference", "sagemaker", "vertex ai", "azure machine learning", "feature store", "mlops"],
  streaming: ["real time data", "stream processing", "event streaming", "kinesis", "managed service for apache kafka", "event hubs", "stream analytics", "dataflow", "pub sub", "data firehose"],
  logging: ["logs", "log analytics", "observability", "cloudwatch logs", "log analytics workspace", "cloud logging", "opensearch", "sentinel"],
  secrets: ["secret management", "secrets manager", "secret manager", "key vault", "parameter store", "credentials", "certificates"],
  iot: ["internet of things", "device management", "iot core", "iot hub", "device telemetry", "industrial iot"],
  orchestration: ["workflow orchestration", "container orchestration", "managed airflow", "step functions", "workflows", "data pipelines", "kubernetes"],
  gcp: ["google cloud platform", "google cloud"],
  aws: ["amazon web services"],
  vm: ["virtual machine", "compute"], vms: ["virtual machine", "compute"],
  ec2: ["elastic compute cloud", "virtual machine"],
  s3: ["simple storage service", "object storage"],
  vpc: ["virtual private cloud", "private network"],
  vnet: ["virtual network", "private network"],
  k8s: ["kubernetes", "containers"],
  rag: ["retrieval augmented generation", "knowledge bases", "semantic search"],
  genai: ["generative ai"], "gen ai": ["generative ai"],
  llm: ["large language model", "foundation model", "generative ai"],
  sso: ["single sign on", "identity"], dr: ["disaster recovery"],
  ha: ["high availability"], finops: ["cost optimization"], cdn: ["content delivery", "edge caching"],
  db: ["database"], sql: ["relational database", "analytics"],
  iam: ["identity access management", "permissions"], soc: ["security operations", "incident response"],
  vpn: ["private connectivity", "hybrid network"], "on prem": ["on premises", "hybrid cloud"],
  "on premise": ["on premises", "hybrid cloud"], mfa: ["multi factor authentication", "identity security"],
  waf: ["web application firewall", "application security"], ids: ["intrusion detection", "network security"],
  ips: ["intrusion prevention", "network security"], tls: ["transport layer security", "encryption"],
  kpi: ["key performance indicator", "business metrics"], pii: ["personal data", "data protection"],
};

function expandedTerms(query: string) {
  const normalized = normalize(query);
  const terms = new Set<string>([normalized]);
  for (const [abbr, expansions] of Object.entries(aliases)) {
    if (normalized === normalize(abbr)) expansions.forEach(term => terms.add(normalize(term)));
  }
  // Expand acronyms inside multi-word searches too, e.g. "GCP GAL" or "AWS DR".
  normalized.split(" ").forEach(token => {
    (aliases[token] || []).forEach(term => terms.add(normalize(term)));
  });
  return [...terms].filter(Boolean);
}

function providerGroup(item: SearchItem): "AWS" | "Azure" | "Google Cloud" | "Other" {
  const href = item.href.toLowerCase();
  if (href.startsWith("/courses/aws-") || href.startsWith("/services")) return href.startsWith("/services") ? "AWS" : "AWS";
  if (href.startsWith("/courses/azure-") || href.startsWith("/azure-services")) return "Azure";
  if (href.startsWith("/courses/gcp-") || href.startsWith("/gcp-services")) return "Google Cloud";
  if (item.provider === "AWS" || item.provider === "Azure" || item.provider === "Google Cloud") return item.provider;
  return "Other";
}

function hasExplicitProvider(query: string) {
  const q = normalize(query);
  return /(^| )(aws|amazon|azure|microsoft|gcp|google cloud|google|gke|aks|eks)( |$)/.test(q);
}

function diversifyResults<T extends { item: SearchItem; score: number }>(entries: T[], query: string, limit: number): T[] {
  if (hasExplicitProvider(query)) return entries.slice(0, limit);
  const providers = ["AWS", "Azure", "Google Cloud"] as const;
  const buckets: Record<(typeof providers)[number], T[]> = {
    AWS: [], Azure: [], "Google Cloud": [],
  };
  const other: T[] = [];
  for (const entry of entries) {
    const group = providerGroup(entry.item);
    if (group === "Other") other.push(entry);
    else buckets[group].push(entry);
  }

  // Within each cloud, keep both problem-solving tasks and service pages discoverable.
  // A task is included only when its score indicates a meaningful content match.
  const selected: Record<(typeof providers)[number], T[]> = {
    AWS: [], Azure: [], "Google Cloud": [],
  };
  for (const provider of providers) {
    const ranked = buckets[provider];
    const services = ranked.filter((entry) => entry.item.kind !== "Course task");
    const tasks = ranked.filter((entry) => entry.item.kind === "Course task" && entry.score >= 20);
    const first = ranked[0];
    if (first) selected[provider].push(first);
    const alternate = first?.item.kind === "Course task" ? services[0] : tasks[0];
    if (alternate && alternate.item.title !== first?.item.title && alternate.score >= Math.max(20, (first?.score || 0) * 0.42)) {
      selected[provider].push(alternate);
    }
    for (const entry of ranked) {
      if (selected[provider].length >= 3) break;
      const key = `${entry.item.provider}:${entry.item.courseCode || ""}:${entry.item.kind || ""}:${entry.item.title}`;
      if (!selected[provider].some((chosen) => `${chosen.item.provider}:${chosen.item.courseCode || ""}:${chosen.item.kind || ""}:${chosen.item.title}` === key)) {
        selected[provider].push(entry);
      }
    }
  }

  const diversified: T[] = [];
  const seen = new Set<string>();
  for (let rank = 0; rank < 3; rank++) {
    for (const provider of providers) {
      const entry = selected[provider][rank];
      if (!entry) continue;
      const key = `${entry.item.provider}:${entry.item.courseCode || ""}:${entry.item.kind || ""}:${entry.item.title}`;
      if (!seen.has(key)) {
        diversified.push(entry);
        seen.add(key);
      }
    }
  }
  for (const entry of [...entries, ...other]) {
    const key = `${entry.item.provider}:${entry.item.courseCode || ""}:${entry.item.kind || ""}:${entry.item.title}`;
    if (!seen.has(key)) {
      diversified.push(entry);
      seen.add(key);
    }
    if (diversified.length >= limit) break;
  }
  return diversified.slice(0, limit);
}

const capabilityBoosts: Array<{ query: RegExp; service: RegExp; boost: number }> = [
  { query: /data|analytics|warehouse|etl|elt|business intelligence/, service: /redshift|athena|aws glue|lake formation|synapse|fabric|data factory|databricks|bigquery|dataflow|dataform|looker|data fusion|dataproc|data firehose/, boost: 28 },
  { query: /database|sql|nosql|relational|dynamodb/, service: /rds|aurora|dynamodb|documentdb|neptune|redshift|sql database|cosmos db|cloud sql|alloydb|spanner|bigtable|firestore|memorystore/, boost: 24 },
  { query: /security|threat|firewall|compliance|siem|soc|waf|encryption/, service: /security hub|guardduty|inspector|macie|sentinel|defender|security command|network firewall|firewall|key vault|kms|cloud armor|security center|security operations|waf|shield|iam|identity center/, boost: 22 },
  { query: /network|connectivity|routing|vpc|vnet|dns|load balanc/, service: /vpc|virtual network|transit gateway|direct connect|expressroute|interconnect|load balanc|route 53|cloud dns|azure dns|cloud vpn|private link|front door|cloudfront|network manager/, boost: 22 },
  { query: /compute|virtual machine|server|instance/, service: /ec2|virtual machine|compute engine|vm scale|instance group|batch|lightsail/, boost: 20 },
  { query: /storage|object storage|file storage|block storage|archive|backup/, service: /s3|blob storage|cloud storage|efs|fsx|persistent disk|filestore|backup|archive|data lake/, boost: 20 },
  { query: /monitor|observability|logging|logs|metrics|tracing|alert/, service: /cloudwatch|azure monitor|application insights|cloud monitoring|cloud logging|managed prometheus|grafana|opensearch/, boost: 20 },
  { query: /ai|generative|machine learning|llm|model|rag|agent/, service: /bedrock|sagemaker|vertex ai|azure ai|azure openai|machine learning|cognitive services|foundation model|model garden/, boost: 20 },
  { query: /migration|modernization|transfer|disaster recovery/, service: /migration|migrate|transfer|database migration|disaster recovery|backup|application discovery/, boost: 20 },
  { query: /container|kubernetes|k8s|orchestration/, service: /eks|aks|gke|kubernetes|container apps|fargate|cloud run|artifact registry/, boost: 20 },
  { query: /serverless|function|event driven/, service: /lambda|azure functions|cloud functions|cloud run|eventbridge|step functions|logic apps|api gateway/, boost: 20 },
  { query: /identity|iam|access|sso|mfa|authentication|authorization/, service: /iam|identity center|entra|active directory|cloud identity|workload identity|cognito|identity platform/, boost: 20 },
  { query: /api|integration|workflow|message|queue|event|streaming/, service: /api gateway|apigee|logic apps|service bus|event grid|eventbridge|step functions|sqs|sns|pub sub|kinesis|event hubs|dataflow|workflows/, boost: 18 },
  { query: /cost|billing|finops|budget|pricing/, service: /cost|billing|budgets|pricing|finops|resource graph|cloudability/, boost: 18 },
  { query: /devops|ci cd|deployment|pipeline|infrastructure as code|terraform/, service: /codebuild|codepipeline|azure devops|cloud build|cloud deploy|deployment manager|cloudformation|resource manager/, boost: 18 },
];

function score(item: SearchItem, query: string) {
  const q = normalize(query);
  if (!q) return 0;
  const phrase = normalize(item.title);
  const corpus = normalize([item.title, item.description, item.provider, item.terms].join(" "));
  const variants = expandedTerms(query);
  let total = phrase === q ? 120 : phrase.startsWith(q) ? 35 : phrase.includes(q) ? 26 : corpus.includes(q) ? 16 : 0;
  for (const variant of variants) {
    if (variant === q) continue;
    if (phrase === variant) total = Math.max(total, 105);
    else if (phrase.includes(variant)) total += 30;
    else if (corpus.includes(variant)) total += 16;
  }
  const tokens = [...new Set(q.split(" ").filter(token => token.length > 1))];
  for (const token of tokens) {
    if (phrase.split(" ").includes(token)) total += 8;
    else if (phrase.includes(token)) total += 5;
    else if (corpus.split(" ").includes(token)) total += 3;
  }
  // Keep key services visible when a feature/category query has more matches than the short result list.
  const searchable = normalize([item.title, item.description, item.terms].join(" "));
  for (const rule of capabilityBoosts) {
    if (rule.query.test(q) && rule.service.test(searchable)) total += rule.boost;
  }
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
  const rankedResults = useMemo(() => items.map(item => ({ item, score: score(item, query) })).filter(entry => entry.score > 0).sort((a,b) => b.score - a.score), [query]);
  const results = diversifyResults(rankedResults, query, 9);
  const autocomplete = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    const variants = expandedTerms(query);
    const ranked = items.map(item => {
      const title = normalize(item.title);
      const exactAlias = variants.some(term => term !== q && title.includes(term));
      const startsWith = title.startsWith(q) || title.split(" ").some(word => word.startsWith(q));
      return { item, score: (startsWith ? 50 : 0) + (exactAlias ? 40 : 0) + score(item, query) };
    }).filter(entry => entry.score > 0)
      .sort((a,b) => b.score - a.score)
      .filter((entry,index,array) => array.findIndex(other => other.item.title === entry.item.title) === index);
    return diversifyResults(ranked, query, 6);
  }, [query]);
  return <div className="semantic-search">
    <button type="button" className="semantic-search-trigger" aria-expanded={open} onClick={() => setOpen(value => !value)}>
      <span className="semantic-search-icon" aria-hidden="true">⌕</span><span>Search by concept, problem, or service</span><kbd>Ctrl / ⌘ K</kbd>
    </button>
    {open && <div className="semantic-search-panel" role="dialog" aria-label="Semantic cloud search">
      <div className="semantic-search-input-wrap"><span aria-hidden="true">⌕</span><input autoFocus type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="e.g. keep a private app highly available…" aria-label="Search cloud learning content" onKeyDown={event => { if (event.key === "Escape") setOpen(false); if (event.key === "Enter" && (autocomplete[0] || results[0])) window.location.href = (autocomplete[0] || results[0]).item.href; }} /><button type="button" onClick={() => { setQuery(""); setOpen(false); }} aria-label="Close search">×</button></div>
      <p className="semantic-search-hint">Try a goal or plain-English question—not just a product name.</p>
      <div className="semantic-search-suggestions">{["GAL", "CDL", "PCA", "private app connectivity", "reduce cloud costs", "AI agents and RAG"].map(value => <button key={value} type="button" onClick={() => setQuery(value)}>{value}</button>)}</div>
      {query.trim() && autocomplete.length > 0 && <div className="semantic-search-autocomplete" role="listbox" aria-label="Autocomplete suggestions">
        <span className="semantic-search-section-label">Suggestions · choose a match</span>
        {autocomplete.map(({ item }) => <a role="option" key={`${item.provider}-${item.courseCode || ""}-${item.taskId || ""}-${item.title}`} href={item.href} onClick={() => setOpen(false)}><span className="semantic-autocomplete-icon" aria-hidden="true">↳</span><span><strong>{item.title}</strong><small>{item.provider} · {item.kind || (item.provider === "Certification" ? "Certification" : "Service")} · {item.description}</small></span><span className="semantic-autocomplete-arrow" aria-hidden="true">↗</span></a>)}
      </div>}
      {query.trim() && <div className="semantic-search-results" role="listbox" aria-label="Search results">
        <span className="semantic-search-section-label">Best matching learning content</span>
        {results.length ? results.map(({ item, score: relevance }) => <a role="option" key={item.title} href={item.href} onClick={() => setOpen(false)}><span className="semantic-result-provider">{item.provider} · {item.kind || (item.provider === "Certification" ? "Certification" : "Service")} · {relevance >= 24 ? "Strong match" : "Related topic"}</span><strong>{item.title}</strong><small>{item.description}</small>{item.kind === "Course task" && <small className="semantic-result-context">Course {item.courseCode} · {item.domain}</small>}{item.kind === "Course task" && item.walkthroughs && <small className="semantic-result-context">Primary walkthrough + companion coverage · opens the exact task</small>}</a>) : <p className="semantic-no-results">No close match yet. Try an abbreviation (GAL, CDL, PCA), service name, or concept like “security” or “disaster recovery”.</p>}
      </div>}
      <div className="semantic-search-footer"><span>Searches concepts, aliases, use cases, and service names</span><button type="button" onClick={() => { setQuery(""); setOpen(false); }}>Close</button></div>
    </div>}
  </div>;
}
