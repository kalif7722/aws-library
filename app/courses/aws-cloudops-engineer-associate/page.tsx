import CertificationCourse from "../../components/CertificationCourse";
import AwsExamTaskGuide from "../../components/AwsExamTaskGuide";
import { cloudOpsGuide } from "../../components/AwsNewExamGuides";
import { soaScope } from "../../course-data-extra";
export default function Course(){return <><AwsExamTaskGuide guide={cloudOpsGuide} scopeServices={soaScope.flatMap(category=>category.services)}/><CertificationCourse code="SOA" level="Associate" title="AWS Certified CloudOps Engineer – Associate" description="Study operations, monitoring, networking, security and resilience using the official SOA-C03 in-scope services." scope={soaScope} sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/soa-03-in-scope-services.html" sourceLabel="Aligned to the AWS Certified CloudOps Engineer – Associate SOA-C03 guide"/></>;}
