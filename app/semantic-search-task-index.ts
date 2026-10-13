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

const businessProblemTerms = [
  "business problem business requirement real world scenario architecture decision solution design",
  "high availability resilient fault tolerant disaster recovery region failure failover recovery point recovery time",
  "reduce cost optimize spend cost effective budget right sizing pay as you go",
  "secure data prevent data breach least privilege encryption key management audit compliance",
  "connect on premises data center hybrid cloud private connectivity vpn dedicated connection",
  "analyze large datasets data warehouse analytics etl elt reporting dashboards business intelligence",
  "migrate legacy application database cloud modernization rehost replatform refactor",
  "scale application handle traffic spikes autoscaling performance latency throughput",
  "monitor production troubleshoot incidents logs metrics traces alerts observability",
  "deploy application safely ci cd rollback canary blue green infrastructure as code",
  "protect public application from attacks ddos web application firewall threat detection incident response",
  "build ai assistant chatbot agent rag retrieval augmented generation ground answers enterprise documents",
  "govern multiple accounts projects subscriptions policies landing zone guardrails",
  "stream real time events data ingestion event driven messaging asynchronous processing",
  "identity authentication authorization sso mfa zero trust workload identity",
  "backup restore business continuity ransomware immutable backup",
].join(" ");

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
        terms: `${code} ${course.title} ${domain.name} ${group.name} ${taskText} ${businessProblemTerms}`,
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
        terms: `${code} Microsoft Azure ${domain.name} ${group.name} ${taskText} ${businessProblemTerms}`,
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
    terms: `AIP AIP-C01 AWS AI Practitioner ${domain.title} ${task.title} ${task.focus.join(" ")} ${task.services.join(" ")} ${businessProblemTerms}`,
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
