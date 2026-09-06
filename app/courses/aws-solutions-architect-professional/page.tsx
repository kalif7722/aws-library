import CertificationCourse from "../../components/CertificationCourse";
import { sapScope } from "../../course-data";

export default function SolutionsArchitectProfessional() {
  return <CertificationCourse
    code="SAP"
    level="Professional"
    title="AWS Solutions Architect – Professional"
    description="Develop advanced architecture judgment across organizational complexity, migration, modernization, resilience and continuous optimization while covering the official SAP-C02 service scope."
    scope={sapScope}
    sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/sap-02-in-scope-services.html"
    sourceLabel="Aligned to the AWS Certified Solutions Architect – Professional SAP-C02 guide"
  />;
}
