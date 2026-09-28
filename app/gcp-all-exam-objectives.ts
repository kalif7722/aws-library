import { gcpOfficialExamDomains as professionalExamDomains } from "./gcp-exam-objectives";
import { gcpAdditionalExamDomains } from "./gcp-exam-objectives-additional";

export type { GcpExamDomain, GcpExamSkill } from "./gcp-exam-objectives";

export const gcpOfficialExamDomains = {
  ...professionalExamDomains,
  ...gcpAdditionalExamDomains,
};
