import { gcpOfficialExamDomains } from "./gcp-all-exam-objectives";

export type GcpCourse = {
  code: string;
  route: string;
  assetPrefix: string;
  title: string;
  level: "Professional" | "Associate" | "Leader";
  description: string;
  sourceUrl: string;
  notes?: string[];
};

export const gcpCourses: GcpCourse[] = [
  {
    code: "PCA",
    route: "gcp-professional-cloud-architect",
    assetPrefix: "pca",
    title: "Professional Cloud Architect",
    level: "Professional",
    description: "Design, develop, and manage robust, secure, scalable, efficient, cost-effective, highly available, and flexible Google Cloud solutions that drive business objectives.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/professional-cloud-architect",
    notes: [
      "The Google Cloud Well-Architected Framework is woven throughout the exam objectives.",
      "The guide identifies Altostrat Media, Cymbal Retail, EHR Healthcare, and KnightMotives Automotive as case studies that may appear in exam questions."
    ]
  },
  {
    code: "PCD",
    route: "gcp-professional-cloud-developer",
    assetPrefix: "pcd",
    title: "Professional Cloud Developer",
    level: "Professional",
    description: "Build and configure scalable, secure cloud-native applications using Google-recommended tools, generative AI APIs, and modern application development practices.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/professional-cloud-developer"
  },
  {
    code: "PDE",
    route: "gcp-professional-data-engineer",
    assetPrefix: "pde",
    title: "Professional Data Engineer",
    level: "Professional",
    description: "Design, build, deploy, monitor, maintain, optimize, and secure data processing and storage workloads that support data-driven decisions.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/professional-data-engineer"
  },
  {
    code: "PCDE",
    route: "gcp-professional-cloud-database-engineer",
    assetPrefix: "pcde",
    title: "Professional Cloud Database Engineer",
    level: "Professional",
    description: "Design, create, manage, migrate, scale, and troubleshoot Google Cloud databases for resilient and cost-effective application data platforms.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/professional-cloud-database-engineer"
  },
  {
    code: "PMLE",
    route: "gcp-professional-machine-learning-engineer",
    assetPrefix: "pmle",
    title: "Professional Machine Learning Engineer",
    level: "Professional",
    description: "Build, evaluate, productionize, optimize, automate, and monitor conventional and generative AI solutions on Google Cloud.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/professional-machine-learning-engineer",
    notes: ["The exam guide states that coding skills are not directly assessed, but candidates should be able to interpret Python and SQL snippets."]
  },
  {
    code: "PCSE",
    route: "gcp-professional-cloud-security-engineer",
    assetPrefix: "pcse",
    title: "Professional Cloud Security Engineer",
    level: "Professional",
    description: "Design and implement secure Google Cloud workloads across identity, network boundaries, data protection, security operations, AI security, supply chain, and compliance.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/professional-cloud-security-engineer"
  },
  {
    code: "PCDOE",
    route: "gcp-professional-cloud-devops-engineer",
    assetPrefix: "pcdoe",
    title: "Professional Cloud DevOps Engineer",
    level: "Professional",
    description: "Implement delivery, SRE, observability, troubleshooting, and FinOps practices that balance software delivery speed with production reliability.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/professional-cloud-devops-engineer"
  },
  {
    code: "PCNE",
    route: "gcp-professional-cloud-network-engineer",
    assetPrefix: "pcne",
    title: "Professional Cloud Network Engineer",
    level: "Professional",
    description: "Design, implement, secure, monitor, and troubleshoot Google Cloud VPC, hybrid, multicloud, GKE, load-balancing, DNS, routing, and connectivity architectures.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/professional-cloud-network-engineer"
  },
  {
    code: "PAA",
    route: "gcp-professional-agentic-architect",
    assetPrefix: "paa",
    title: "Professional Agentic Architect",
    level: "Professional",
    description: "Design and manage autonomous AI-driven agentic workflows with low-code tools, custom agents, enterprise retrieval, multiagent orchestration, evaluation, deployment, and governance.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/professional-agentic-architect",
    notes: ["The guide explicitly scopes Agent Development Kit, Agent Gateway, Agent Identity, Agent Registry, Agent Retrieval and Vector Search, Agent Runtime, Agent Search, A2A, MCP, Agents CLI, Antigravity, Auth Manager, BigQuery, Cloud Run, Cloud SQL, Cloud Storage, Firestore, Gemini Enterprise, Gemini LLMs, Google Cloud Observability, GKE, Memorystore for Redis, Model Armor, Model Garden, RAG Engine, Sensitive Data Protection, and Skill Registry."]
  },
  {
    code: "PSOE",
    route: "gcp-professional-security-operations-engineer",
    assetPrefix: "psoe",
    title: "Professional Security Operations Engineer",
    level: "Professional",
    description: "Detect, hunt, investigate, respond to, and report on security threats using Google Security Operations, Security Command Center, threat intelligence, detection engineering, and SOAR workflows.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/professional-security-operations-engineer",
    notes: ["The exam guide states that the exam assesses operational tasks in Google Security Operations (SecOps) and Security Command Center (SCC)."]
  },
  {
    code: "ACE",
    route: "gcp-associate-cloud-engineer",
    assetPrefix: "ace",
    title: "Associate Cloud Engineer",
    level: "Associate",
    description: "Deploy, secure, operate, monitor, and scale Google Cloud applications, services, infrastructure, data, networking, and access controls using common platform tooling.",
    sourceUrl: "https://cloud.google.com/learn/certification/guides/cloud-engineer"
  },
  {
    code: "ADP",
    route: "gcp-associate-data-practitioner",
    assetPrefix: "adp",
    title: "Associate Data Practitioner",
    level: "Associate",
    description: "Prepare, ingest, analyze, visualize, orchestrate, secure, and govern data using Google Cloud data and analytics services.",
    sourceUrl: "https://cloud.google.com/learn/certification/data-practitioner"
  },
  {
    code: "AGWA",
    route: "gcp-associate-google-workspace-administrator",
    assetPrefix: "agwa",
    title: "Associate Google Workspace Administrator",
    level: "Associate",
    description: "Administer Google Workspace identities, core collaboration services, governance, security, endpoints, reporting, and troubleshooting for day-to-day operations.",
    sourceUrl: "https://cloud.google.com/learn/certification/associate-google-workspace-administrator",
    notes: ["Workspace products that are not part of the shared Google Cloud service catalog remain fully covered in the task guide; only catalog-backed products appear in the linked service workspace."]
  },
  {
    code: "GAL",
    route: "gcp-generative-ai-leader",
    assetPrefix: "gal",
    title: "Generative AI Leader",
    level: "Leader",
    description: "Understand Google Cloud generative AI concepts, offerings, model-improvement techniques, secure and responsible AI, and business strategies for transformational gen AI adoption.",
    sourceUrl: "https://cloud.google.com/learn/certification/generative-ai-leader"
  },
  {
    code: "CDL",
    route: "gcp-cloud-digital-leader",
    assetPrefix: "cdl",
    title: "Cloud Digital Leader",
    level: "Leader",
    description: "Explain how Google Cloud supports digital transformation across data, AI, infrastructure, application modernization, security, operations, and cost control.",
    sourceUrl: "https://cloud.google.com/learn/certification/cloud-digital-leader"
  }
];

export const gcpCourseByCode = Object.fromEntries(gcpCourses.map(course => [course.code, course])) as Record<string, GcpCourse>;
export const gcpCourseByRoute = Object.fromEntries(gcpCourses.map(course => [course.route, course])) as Record<string, GcpCourse>;

export const gcpCourseSkillCount = (course: GcpCourse) => (gcpOfficialExamDomains[course.code] || []).reduce((sum, domain) => sum + domain.groups.length, 0);
