import { aipC01Domains } from "./aip-c01-data";
import { azureOfficialExamDomains } from "./azure-exam-objectives";
import { gcpOfficialExamDomains } from "./gcp-all-exam-objectives";
import { gcpCourses } from "./gcp-course-data";
import { domains as aifDomains } from "./components/AwsAiPractitionerCourseGuide";
import { domains as clfDomains } from "./components/AwsCloudPractitionerCourseGuide";
import { domains as dvaDomains } from "./components/AwsDeveloperAssociateCourseGuide";
import { domains as ansDomains } from "./components/AwsAdvancedNetworkingCourseGuide";
import { saaDomains } from "./components/AwsSaaCourseGuide";
import { sapDomains } from "./components/AwsSapCourseGuide";
import { domains as securityDomains } from "./components/AwsSecurityCourseGuide";
import { cloudOpsGuide, dataEngineerGuide, machineLearningGuide, devOpsGuide } from "./components/AwsNewExamGuides";

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
  walkthroughs: ["primary", "companion"];
};

const scenarioRules: Array<{ pattern: RegExp; terms: string }> = [
  { pattern: /redshift|bigquery|synapse|data warehouse|warehouse|analytics|business intelligence|reporting|dashboard|athena|quick.?sight|power bi/i, terms: "slow analytics reports slow dashboard reporting data warehouse query optimization BI business intelligence executive reporting SQL analytics data lake ETL ELT pipeline ingestion" },
  { pattern: /database|sql|nosql|dynamodb|rds|aurora|cosmos|spanner|postgres|mysql|database migration|query performance/i, terms: "database design database capacity query performance slow queries relational nosql transactional data database migration replication backups connection pooling" },
  { pattern: /security|threat|identity|access|encryption|key management|compliance|audit|vulnerability|incident|zero trust|conditional access/i, terms: "cloud security threat detection least privilege encryption compliance audit incident response zero trust data protection compromised identity security posture" },
  { pattern: /network|connect|vpc|vnet|subnet|routing|dns|hybrid|on.?premises|interconnect|expressroute|vpn|transit gateway/i, terms: "hybrid cloud private connectivity on premises data center network routing subnet vpc vnet vpn direct connect expressroute interconnect dns private link" },
  { pattern: /availability|resilien|disaster recovery|failover|backup|restore|region|multi.?region|continuity|fault.?tolerant/i, terms: "high availability fault tolerance region failure failover disaster recovery backup restore business continuity RTO RPO multi AZ multi region active active active passive" },
  { pattern: /cost|billing|budget|pricing|optimi[sz]|right.?siz|spend|finops/i, terms: "reduce cloud costs cost optimization finops budget billing right sizing cost effective idle resources waste reserved instances savings plans" },
  { pattern: /migrat|moderni[sz]|transfer|rehost|replatform|refactor|on.?prem/i, terms: "cloud migration legacy application database migration modernization rehost replatform refactor data transfer datacenter exit" },
  { pattern: /scale|autoscal|performance|latency|throughput|capacity|load balanc|traffic spike/i, terms: "scale application traffic spikes autoscaling performance latency throughput capacity load balancing burst unpredictable demand" },
  { pattern: /monitor|observab|logging|logs|metrics|trace|alert|troubleshoot|incident|operat/i, terms: "production monitoring troubleshooting logs metrics traces alerts observability incident operations root cause analysis" },
  { pattern: /deploy|release|ci.?cd|pipeline|rollback|infrastructure as code|terraform|blue.?green|canary/i, terms: "safe deployment CI CD continuous delivery rollback canary blue green infrastructure as code release automation" },
  { pattern: /ai|machine learning|model|generative|agent|llm|rag|prompt|foundation model|document retrieval/i, terms: "artificial intelligence machine learning generative AI AI agent chatbot RAG retrieval augmented generation model training inference prompt grounding enterprise documents hallucination" },
  { pattern: /govern|organization polic|landing zone|guardrail|resource hierarchy|project|subscription|account vending/i, terms: "cloud governance multiple accounts projects subscriptions policies landing zone guardrails compliance resource hierarchy centralized management" },
  { pattern: /event|message|queue|stream|pub.?sub|kafka|asynchronous|workflow|orchestrat/i, terms: "real time event streaming data ingestion event driven messaging asynchronous queue workflow orchestration decoupled services retries" },
  { pattern: /identity|authentication|authorization|iam|sso|mfa|federat|principal|role|permission/i, terms: "identity authentication authorization SSO MFA zero trust workload identity federation least privilege IAM RBAC permissions" },
  { pattern: /container|kubernetes|gke|eks|aks|pod|cluster|orchestrat/i, terms: "container Kubernetes orchestration microservices cluster deployment autoscaling EKS AKS GKE" },
  { pattern: /api|application integration|service mesh|gateway/i, terms: "secure API API gateway API management application integration service mesh authentication throttling rate limiting" },
  { pattern: /data loss|sensitive data|personal data|privacy|classification|retention/i, terms: "sensitive data discovery data loss prevention DLP privacy classification retention tokenization masking encryption" },
  { pattern: /patch|upgrade|maintenance|configuration drift|provision|automation/i, terms: "patch management fleet maintenance configuration drift infrastructure provisioning runbook automation compliance" },
];

function scenarioTermsFor(text: string): string {
  return scenarioRules.filter((rule) => rule.pattern.test(text)).map((rule) => rule.terms).join(" ");
}

function normalizeTaskId(value: string): string {
  return value.replace(/^(?:Task\s*)/i, "").replace(/[.]/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

type GenericTask = {
  id?: string;
  title?: string;
  name?: string;
  ask?: string;
  description?: string;
  focus?: string[];
  services?: string[];
  flow?: string[];
  tasks?: string[];
};
type GenericDomain = { title?: string; name?: string; number?: string; weight?: string | number; tasks: GenericTask[] };

function makeAwsTaskItems(
  courseCode: string,
  courseTitle: string,
  route: string,
  domains: GenericDomain[],
): SearchTaskItem[] {
  return domains.flatMap((domain, domainIndex) => domain.tasks.map((task, taskIndex) => {
    const rawTitle = task.title || task.name || `Task ${domainIndex + 1}.${taskIndex + 1}`;
    const extracted = rawTitle.match(/Task\s*(\d+)[.-](\d+)/i);
    const id = normalizeTaskId(task.id || (extracted ? `${extracted[1]}-${extracted[2]}` : `${domainIndex + 1}-${taskIndex + 1}`));
    const cleanTitle = rawTitle.replace(/^Task\s*\d+[.-]\d+\s*[:·–-]?\s*/i, "").trim();
    const focus = [...(task.focus || []), task.ask || "", task.description || "", ...(task.flow || []), ...(task.services || [])].filter(Boolean).join(" ");
    const domainName = domain.title || domain.name || `Domain ${domainIndex + 1}`;
    return {
      title: `Task ${id.replace(/-/g, ".")} · ${cleanTitle}`,
      description: `${domainName} · ${task.ask || task.description || (task.focus || []).slice(0, 2).join(" ")} · Primary + companion walkthroughs`,
      href: `/courses/${route}?task=${encodeURIComponent(id)}#${courseCode === "SAA" ? "exam-guide" : `${courseCode.toLowerCase()}-exam-guide`}`,
      provider: "AWS" as const,
      terms: `AWS ${courseCode} ${courseTitle} ${domainName} ${rawTitle} ${cleanTitle} ${focus} primary walkthrough companion walkthrough architecture visual practical solution business problem ${scenarioTermsFor(`${domainName} ${rawTitle} ${focus}`)}`,
      kind: "Course task" as const,
      courseCode,
      domain: domainName,
      taskId: id,
      walkthroughs: ["primary", "companion"] as ["primary", "companion"],
    };
  }));
}

const awsTaskItems: SearchTaskItem[] = [
  ...makeAwsTaskItems("AIF", "AWS Certified AI Practitioner", "aws-ai-practitioner", aifDomains as unknown as GenericDomain[]),
  ...makeAwsTaskItems("CLF", "AWS Certified Cloud Practitioner", "aws-cloud-practitioner", clfDomains as unknown as GenericDomain[]),
  ...makeAwsTaskItems("DVA", "AWS Certified Developer Associate", "aws-developer-associate", dvaDomains as unknown as GenericDomain[]),
  ...makeAwsTaskItems("ANS", "AWS Certified Advanced Networking Specialty", "aws-advanced-networking-specialty", ansDomains as unknown as GenericDomain[]),
  ...makeAwsTaskItems("SAA", "AWS Certified Solutions Architect Associate", "aws-solutions-architect-associate", saaDomains as unknown as GenericDomain[]),
  ...makeAwsTaskItems("SAP", "AWS Certified Solutions Architect Professional", "aws-solutions-architect-professional", sapDomains as unknown as GenericDomain[]),
  ...makeAwsTaskItems("SCS", "AWS Certified Security Specialty", "aws-security-specialty", securityDomains as unknown as GenericDomain[]),
  ...makeAwsTaskItems(cloudOpsGuide.code, cloudOpsGuide.title, "aws-cloudops-engineer-associate", cloudOpsGuide.domains as unknown as GenericDomain[]),
  ...makeAwsTaskItems(dataEngineerGuide.code, dataEngineerGuide.title, "aws-data-engineer-associate", dataEngineerGuide.domains as unknown as GenericDomain[]),
  ...makeAwsTaskItems(machineLearningGuide.code, machineLearningGuide.title, "aws-machine-learning-engineer-associate", machineLearningGuide.domains as unknown as GenericDomain[]),
  ...makeAwsTaskItems(devOpsGuide.code, devOpsGuide.title, "aws-devops-engineer-professional", devOpsGuide.domains as unknown as GenericDomain[]),
  ...aipC01Domains.flatMap((domain) => domain.tasks.map((task) => ({
    title: `Task ${task.id.replace(/-/g, ".")} · ${task.title}`,
    description: `${domain.title} · ${task.focus.slice(0, 2).join(" ")} · Primary + companion walkthroughs`,
    href: `/courses/aws-generative-ai-developer-professional?task=${encodeURIComponent(task.id)}#aip-c01-objectives`,
    provider: "AWS" as const,
    terms: `AWS AIP AIP-C01 Generative AI Developer Professional ${domain.title} ${task.title} ${task.focus.join(" ")} ${task.services.join(" ")} primary walkthrough companion walkthrough architecture visual business problem ${scenarioTermsFor(`${domain.title} ${task.title} ${task.focus.join(" ")}`)}`,
    kind: "Course task" as const,
    courseCode: "AIP",
    domain: domain.title,
    taskId: task.id,
    walkthroughs: ["primary", "companion"] as ["primary", "companion"],
  }))),
];

const gcpRoutes = new Map(gcpCourses.map((course) => [course.code, course.route]));
const gcpTaskItems: SearchTaskItem[] = Object.entries(gcpOfficialExamDomains).flatMap(([code, domains]) => {
  const route = gcpRoutes.get(code);
  const course = gcpCourses.find((item) => item.code === code);
  if (!route || !course) return [];
  return domains.flatMap((domain, domainIndex) =>
    domain.groups.map((group, groupIndex) => {
      const taskText = group.tasks.join(" ");
      const taskId = group.id || `${domainIndex + 1}-${groupIndex + 1}`;
      return {
        title: `${group.name}`,
        description: `${domain.name} · ${group.tasks.slice(0, 2).join(" ")} · Primary + companion walkthroughs`,
        href: `/courses/${route}?task=${encodeURIComponent(taskId)}#${course.assetPrefix}-exam-guide`,
        provider: "Google Cloud" as const,
        terms: `${code} ${course.title} Google Cloud ${domain.name} ${group.name} ${taskText} primary walkthrough companion walkthrough architecture visual business problem ${scenarioTermsFor(`${domain.name} ${group.name} ${taskText}`)}`,
        kind: "Course task" as const,
        courseCode: code,
        domain: domain.name,
        taskId,
        walkthroughs: ["primary", "companion"] as ["primary", "companion"],
      };
    }),
  );
});

const groupCourseCodes = new Set(["AI-901", "AI-103", "DP-900", "DP-300"]);
const azureCourseRoutes = new Set(["AI-901", "AI-103", "AZ-104", "AZ-120", "AZ-140", "AZ-305", "AZ-400", "AZ-700", "AZ-900", "DP-300", "DP-600", "DP-900", "SC-200", "SC-300", "SC-900"]);
const azureTaskItems: SearchTaskItem[] = Object.entries(azureOfficialExamDomains).flatMap(([code, domains]) => {
  if (!azureCourseRoutes.has(code)) return [];
  return domains.flatMap((domain, domainIndex) => domain.groups.flatMap((group, groupIndex) => {
    const isGroupCourse = groupCourseCodes.has(code);
    const tasks = isGroupCourse ? [{ title: group.name, text: group.tasks.join(" "), id: `${domainIndex + 1}-${groupIndex + 1}` }] : group.tasks.map((task, taskIndex) => ({
      title: task,
      text: task,
      id: task.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/formerly azure ad/g, "entra id").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }));
    return tasks.map((task) => ({
      title: task.title,
      description: `${domain.name} · ${task.text.slice(0, 220)} · Primary + companion walkthroughs`,
      href: `/courses/azure-${code.toLowerCase()}?task=${encodeURIComponent(task.id)}`,
      provider: "Azure" as const,
      terms: `${code} Microsoft Azure ${domain.name} ${group.name} ${task.title} ${task.text} primary walkthrough companion walkthrough architecture visual business problem ${scenarioTermsFor(`${domain.name} ${group.name} ${task.text}`)}`,
      kind: "Course task" as const,
      courseCode: code,
      domain: domain.name,
      taskId: task.id,
      walkthroughs: ["primary", "companion"] as ["primary", "companion"],
    }));
  }));
});

export const semanticSearchTaskItems: SearchTaskItem[] = [
  ...awsTaskItems,
  ...azureTaskItems,
  ...gcpTaskItems,
];
