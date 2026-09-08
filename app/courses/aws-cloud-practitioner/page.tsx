import CertificationCourse from "../../components/CertificationCourse";
import { clfScope } from "../../course-data-extra";
export default function Course(){return <CertificationCourse code="CLF" level="Foundational" title="AWS Certified Cloud Practitioner" description="Review the AWS services and technologies listed in the official CLF-C02 certification scope." scope={clfScope} sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-in-scope-services.html" sourceLabel="Aligned to the AWS Certified Cloud Practitioner CLF-C02 guide"/>;}
