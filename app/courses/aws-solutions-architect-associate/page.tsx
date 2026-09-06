import CertificationCourse from "../../components/CertificationCourse";
import { saaScope } from "../../course-data";

export default function SolutionsArchitectAssociate() {
  return <CertificationCourse
    code="SAA"
    level="Associate"
    title="AWS Solutions Architect – Associate"
    description="Build secure, resilient, high-performing and cost-optimized architectures while reviewing every service and feature listed in the official SAA-C03 scope."
    scope={saaScope}
    sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-in-scope-services.html"
    sourceLabel="Aligned to the AWS Certified Solutions Architect – Associate SAA-C03 guide"
  />;
}
