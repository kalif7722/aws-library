export const providers = [
  {
    key: "aws", name: "Amazon Web Services", short: "AWS", status: "Available now", tone: "provider-aws",
    description: "Explore the complete AWS service library or study by official certification scope.",
    links: [
      ["FOUNDATIONAL · Cloud Practitioner (CLF-C02)", "/courses/aws-cloud-practitioner"],
      ["FOUNDATIONAL · AI Practitioner (AIF-C01)", "/courses/aws-ai-practitioner"],
      ["ASSOCIATE · Solutions Architect (SAA-C03)", "/courses/aws-solutions-architect-associate"],
      ["ASSOCIATE · Developer (DVA-C03)", "/courses/aws-developer-associate"],
      ["ASSOCIATE · CloudOps Engineer (SOA-C03)", "/courses/aws-cloudops-engineer-associate"],
      ["ASSOCIATE · Data Engineer (DEA-C01)", "/courses/aws-data-engineer-associate"],
      ["ASSOCIATE · Machine Learning Engineer (MLA-C01)", "/courses/aws-machine-learning-engineer-associate"],
      ["PROFESSIONAL · Solutions Architect (SAP-C03)", "/courses/aws-solutions-architect-professional"],
      ["PROFESSIONAL · DevOps Engineer (DOP-C02)", "/courses/aws-devops-engineer-professional"],
      ["PROFESSIONAL · Generative AI Developer (AIP-C01)", "/courses/aws-generative-ai-developer-professional"],
      ["SPECIALTY · Advanced Networking (ANS-C01)", "/courses/aws-advanced-networking-specialty"],
      ["SPECIALTY · Security (SCS-C03)", "/courses/aws-security-specialty"],
      ["Browse all AWS services", "/services"],
    ],
  },
  { key: "azure", name: "Microsoft Azure", short: "Azure", status: "Available now", tone: "provider-azure", description: "Study Azure certification scopes through the shared service pages and visual branch library.", links: [
    ["FOUNDATIONAL · Azure Fundamentals (AZ-900)", "/courses/azure-az-900"],
    ["ASSOCIATE · Azure Administrator (AZ-104)", "/courses/azure-az-104"],
    ["EXPERT · Azure Solutions Architect (AZ-305)", "/courses/azure-az-305"],
    ["ASSOCIATE · Azure Network Engineer (AZ-700)", "/courses/azure-az-700"],
    ["EXPERT · DevOps Engineer (AZ-400)", "/courses/azure-az-400"],
    ["FOUNDATIONAL · Azure AI Fundamentals (AI-901)", "/courses/azure-ai-901"],
    ["ASSOCIATE · Azure AI Apps and Agents (AI-103)", "/courses/azure-ai-103"],
    ["FOUNDATIONAL · Azure Data Fundamentals (DP-900)", "/courses/azure-dp-900"],
    ["ASSOCIATE · Azure Database Administrator (DP-300)", "/courses/azure-dp-300"],
    ["ASSOCIATE · Fabric Analytics Engineer (DP-600)", "/courses/azure-dp-600"],
    ["SPECIALTY · Azure Virtual Desktop (AZ-140)", "/courses/azure-az-140"],
    ["SPECIALTY · Azure for SAP Workloads (AZ-120)", "/courses/azure-az-120"],
    ["FOUNDATIONAL · Security, Compliance and Identity (SC-900)", "/courses/azure-sc-900"],
    ["ASSOCIATE · Identity and Access Administrator (SC-300)", "/courses/azure-sc-300"],
    ["ASSOCIATE · Security Operations Analyst (SC-200)", "/courses/azure-sc-200"],
    ["Browse all Azure services", "/azure-services"],
  ] },
  { key: "gcp", name: "Google Cloud", short: "GCP", status: "Available now", tone: "provider-gcp", description: "Study Google Cloud certification domains through the shared GCP service library and visual walkthrough workspace.", links: [
    ["LEADER · Cloud Digital Leader (CDL)", "/courses/gcp-cloud-digital-leader"],
    ["LEADER · Generative AI Leader (GAL)", "/courses/gcp-generative-ai-leader"],
    ["ASSOCIATE · Cloud Engineer (ACE)", "/courses/gcp-associate-cloud-engineer"],
    ["ASSOCIATE · Data Practitioner (ADP)", "/courses/gcp-associate-data-practitioner"],
    ["ASSOCIATE · Google Workspace Administrator (AGWA)", "/courses/gcp-associate-google-workspace-administrator"],
    ["PROFESSIONAL · Cloud Architect (PCA)", "/courses/gcp-professional-cloud-architect"],
    ["PROFESSIONAL · Cloud Developer (PCD)", "/courses/gcp-professional-cloud-developer"],
    ["PROFESSIONAL · Data Engineer (PDE)", "/courses/gcp-professional-data-engineer"],
    ["PROFESSIONAL · Cloud Database Engineer (PCDE)", "/courses/gcp-professional-cloud-database-engineer"],
    ["PROFESSIONAL · Machine Learning Engineer (PMLE)", "/courses/gcp-professional-machine-learning-engineer"],
    ["PROFESSIONAL · Cloud Security Engineer (PCSE)", "/courses/gcp-professional-cloud-security-engineer"],
    ["PROFESSIONAL · Cloud DevOps Engineer (PCDOE)", "/courses/gcp-professional-cloud-devops-engineer"],
    ["PROFESSIONAL · Cloud Network Engineer (PCNE)", "/courses/gcp-professional-cloud-network-engineer"],
    ["PROFESSIONAL · Agentic Architect (PAA)", "/courses/gcp-professional-agentic-architect"],
    ["PROFESSIONAL · Security Operations Engineer (PSOE)", "/courses/gcp-professional-security-operations-engineer"],
    ["Browse all Google Cloud services", "/gcp-services"],
  ] },
];
// Explicitly featured study experiences with reviewed visual modules; not a completion claim.
export const featuredVisualPaths = [
  "/courses/aws-ai-practitioner",
  "/courses/aws-solutions-architect-associate",
  "/courses/aws-developer-associate",
  "/courses/aws-solutions-architect-professional",
  "/courses/aws-generative-ai-developer-professional",
  "/courses/aws-security-specialty",
];
export const courseDirectory = providers.flatMap(provider =>
  provider.links.filter(([, href]) => href.startsWith("/courses/")).map(([label, href]) => {
    const [level, title] = label.split(" · ");
    const text = title.toLowerCase();
    const subject = /generative|machine learning|\bai\b|agentic|artificial/.test(text) ? "AI & machine learning"
      : /security|network|identity/.test(text) ? "Security & networking"
      : /data|database|analytics|fabric/.test(text) ? "Data & analytics"
      : /architect|cloud practitioner|fundamentals|digital leader/.test(text) ? "Architecture & foundations" : "Development & operations";
    return { href, title, level, subject, cloud: provider.key, cloudName: provider.short, featured: featuredVisualPaths.includes(href) };
  })
);
