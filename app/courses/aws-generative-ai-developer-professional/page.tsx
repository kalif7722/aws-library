import CertificationCourse from "../../components/CertificationCourse";
import { aipScope } from "../../course-data";

export default function GenerativeAIDeveloperProfessionalCourse() {
  return (
    <CertificationCourse
      code="AIP"
      level="Professional"
      title="AWS Certified Generative AI Developer – Professional"
      description="Prepare for AIP-C01 by studying the AWS services and service features used to integrate foundation models, build production GenAI applications, apply responsible AI controls, and operate solutions efficiently."
      scope={aipScope}
      sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/aip-01-in-scope-services.html"
      sourceLabel="AWS AIP-C01 exam guide"
    />
  );
}
