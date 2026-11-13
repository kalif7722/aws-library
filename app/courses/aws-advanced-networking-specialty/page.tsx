import CertificationCourse from "../../components/CertificationCourse";
import AwsAdvancedNetworkingCourseGuide from "../../components/AwsAdvancedNetworkingCourseGuide";
import { ansScope } from "../../course-data-extra";

export default function Course() {
  return <>
    <AwsAdvancedNetworkingCourseGuide />
    <CertificationCourse
      code="ANS"
      level="Specialty"
      title="AWS Certified Advanced Networking – Specialty"
      description="Study hybrid connectivity, global routing, multi-account and multi-Region networking, network security, observability, automation, and AWS networking services using the official ANS-C01 scope."
      scope={ansScope}
      sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/advanced-networking-specialty-01/advanced-networking-specialty-01.html"
      sourceLabel="Aligned to the AWS Certified Advanced Networking – Specialty ANS-C01 exam guide"
    />
  </>;
}
