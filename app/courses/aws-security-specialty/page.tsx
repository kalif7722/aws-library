import CertificationCourse from "../../components/CertificationCourse";
import AwsSecurityCourseGuide from "../../components/AwsSecurityCourseGuide";
import { scsScope } from "../../security-scope";

export default function SecuritySpecialty() {
  return <>
    <AwsSecurityCourseGuide />
    <CertificationCourse
    code="SCS"
    level="Specialty"
    title="AWS Certified Security – Specialty"
    description="Study detection, incident response, infrastructure security, identity and access management, data protection, and security governance using the current SCS-C03 in-scope AWS services."
    scope={scsScope}
    sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/scs-02-in-scope-services.html"
    sourceLabel="Aligned to the AWS Certified Security – Specialty SCS-C03 guide"
  />
  </>;
}
