import CertificationCourse from "../../components/CertificationCourse";
import { aifScope } from "../../course-data-extra";
export default function Course(){return <CertificationCourse code="AIF" level="Foundational" title="AWS Certified AI Practitioner" description="Review the AI, machine learning and supporting AWS services listed in the official AIF-C01 certification scope." scope={aifScope} sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-in-scope-services.html" sourceLabel="Aligned to the AWS Certified AI Practitioner AIF-C01 guide"/>;}
