import CertificationCourse from "../../components/CertificationCourse";
import AwsExamTaskGuide from "../../components/AwsExamTaskGuide";
import { devOpsGuide } from "../../components/AwsNewExamGuides";
import { dopScope } from "../../course-data-extra";
export default function Course(){return <><AwsExamTaskGuide guide={devOpsGuide} scopeServices={dopScope.flatMap(category=>category.services)}/><CertificationCourse code="DOP" level="Professional" title="AWS Certified DevOps Engineer – Professional" description="Study continuous delivery, automation, observability, security and resilient operations using the official DOP-C02 scope." scope={dopScope} sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/devops-engineer-professional-02/dop-02-in-scope-services.html" sourceLabel="Aligned to the AWS Certified DevOps Engineer – Professional DOP-C02 guide"/></>;}
