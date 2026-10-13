import { aipC01Domains } from "./aip-c01-data";
import { azureOfficialExamDomains } from "./azure-exam-objectives";
import { gcpOfficialExamDomains } from "./gcp-all-exam-objectives";
import { gcpCourses } from "./gcp-course-data";

export type SearchTaskItem = {
  title: string;
  description: string;
  href: string;
  provider: "AWS" | "Azure" | "Google Cloud";
  terms: string;
  kind: "Course task";
  courseCode: string;
  domain: string;
  taskId: string;
};

const scenarioRules: Array<{ pattern: RegExp; terms: string }> = [
  { pattern: /database|sql|nosql|data warehouse|bigquery|redshift|spanner|dynamodb|storage engine/i, terms: "database design database capacity query performance relational nosql data warehouse data analytics reporting" },
  { pattern: /data|analytics|etl|pipeline|stream|warehouse|business intelligence|report/i, terms: "data analytics data lake data warehouse etl elt data pipeline business intelligence dashboard reporting streaming ingestion" },
  { pattern: /security|threat|identity|access|encryption|key management|compliance|audit|vulnerability|incident/i, terms: "cloud security threat detection least privilege encryption compliance audit incident response zero trust data protection" },
  { pattern: /network|connect|vpc|vnet|subnet|routing|dns|hybrid|on.?premises|interconnect|expressroute|vpn/i, terms: "hybrid cloud private connectivity on premises data center network routing subnet vpc vnet vpn direct connect expressroute interconnect dns" },
  { pattern: /availability|resilien|disaster recovery|failover|backup|restore|region|multi.?region|continuity/i, terms: "high availability fault tolerance region failure failover disaster recovery backup restore business continuity rto rpo" },
  { pattern: /cost|billing|budget|pricing|optimi[sz]|right.?siz|spend/i, terms: "reduce cloud costs cost optimization finops budget billing right sizing cost effective" },
  { pattern: /migrat|moderni[sz]|transfer|rehost|replatform|refactor/i, terms: "cloud migration legacy application database migration modernization rehost replatform refactor data transfer" },
  { pattern: /scale|autoscal|performance|latency|throughput|capacity|load balanc/i, terms: "scale application traffic spikes autoscaling performance latency throughput capacity load balancing" },
  { pattern: /monitor|observab|logging|logs|metrics|trace|alert|troubleshoot|incident/i, terms: "production monitoring troubleshooting logs metrics traces alerts observability incident operations" },
  { pattern: /deploy|release|ci.?cd|pipeline|rollback|infrastructure as code|terraform/i, terms: "safe deployment ci cd continuous delivery rollback canary blue green infrastructure as code" },
  { pattern: /ai|machine learning|model|generative|agent|llm|rag|prompt|foundation model/i, terms: "artificial intelligence machine learning generative ai ai agent chatbot rag retrieval augmented generation model training inference prompt grounding" },
  { pattern: /govern|organization polic|landing zone|guardrail|resource hierarchy|project|subscription/i, terms: "cloud governance multiple accounts projects subscriptions policies landing zone guardrails compliance resource hierarchy" },
  { pattern: /event|message|queue|stream|pub.?sub|kafka|asynchronous|workflow|orchestrat/i, terms: "real time event streaming data ingestion event driven messaging asynchronous queue workflow orchestration" },
  { pattern: /identity|authentication|authorization|iam|sso|mfa|federat|principal|role/i, terms: "identity authentication authorization sso mfa zero trust workload identity federation least privilege iam" },
  { pattern: /container|kubernetes|gke|eks|aks|pod|cluster|orchestrat/i, terms: "container kubernetes orchestration microservices cluster deployment autoscaling" },
  { pattern: /api|application integration|service mesh|gateway/i, terms: "secure api api gateway api management application integration service mesh authentication" },
];

function scenarioTermsFor(text: string): string {
  return scenarioRules.filter((rule) => rule.pattern.test(text)).map((rule) => rule.terms).join(" ");
}

const gcpRoutes = new Map(gcpCourses.map((course) => [course.code, course.route]));

const gcpTaskItems: SearchTaskItem[] = Object.entries(gcpOfficialExamDomains).flatMap(([code, domains]) => {
  const route = gcpRoutes.get(code);
  const course = gcpCourses.find((item) => item.code === code);
  if (!route || !course) return [];
  return domains.flatMap((domain, domainIndex) =>
    domain.groups.map((group, groupIndex) => {
      const taskText = group.tasks.join(" ");
      return {
        title: group.name,
        description: `${domain.name} · ${group.tasks.slice(0, 2).join(" ")}`,
        href: `/courses/${route}#exam-objectives`,
        provider: "Google Cloud" as const,
        terms: `${code} ${course.title} ${domain.name} ${group.name} ${taskText} ${scenarioTermsFor(`${domain.name} ${group.name} ${taskText}`)}`,
        kind: "Course task" as const,
        courseCode: code,
        domain: domain.name,
        taskId: group.id || `${domainIndex + 1}-${groupIndex + 1}`,
      };
    }),
  );
});

const azureTaskItems: SearchTaskItem[] = Object.entries(azureOfficialExamDomains).flatMap(([code, domains]) =>
  domains.flatMap((domain, domainIndex) =>
    domain.groups.map((group, groupIndex) => {
      const taskText = group.tasks.join(" ");
      return {
        title: group.name,
        description: `${domain.name} · ${group.tasks.slice(0, 2).join(" ")}`,
        href: `/courses/azure-${code.toLowerCase()}#exam-objectives`,
        provider: "Azure" as const,
        terms: `${code} Microsoft Azure ${domain.name} ${group.name} ${taskText} ${scenarioTermsFor(`${domain.name} ${group.name} ${taskText}`)}`,
        kind: "Course task" as const,
        courseCode: code,
        domain: domain.name,
        taskId: `${domainIndex + 1}-${groupIndex + 1}`,
      };
    }),
  ),
);

const awsAipTaskItems: SearchTaskItem[] = aipC01Domains.flatMap((domain) =>
  domain.tasks.map((task) => ({
    title: `Task ${task.id} · ${task.title}`,
    description: `${domain.title} · ${task.focus.slice(0, 2).join(" ")}`,
    href: `/courses/aws-ai-practitioner?task=${encodeURIComponent(task.id)}#aip-c01-objectives`,
    provider: "AWS" as const,
    terms: `AIP AIP-C01 AWS AI Practitioner ${domain.title} ${task.title} ${task.focus.join(" ")} ${task.services.join(" ")} ${scenarioTermsFor(`${domain.title} ${task.title} ${task.focus.join(" ")}`)}`,
    kind: "Course task" as const,
    courseCode: "AIP",
    domain: domain.title,
    taskId: task.id,
  })),
);

export const semanticSearchTaskItems: SearchTaskItem[] = [
  ...awsAipTaskItems,
  ...azureTaskItems,
  ...gcpTaskItems,
];
