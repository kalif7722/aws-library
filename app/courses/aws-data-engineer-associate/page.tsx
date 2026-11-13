import CertificationCourse from "../../components/CertificationCourse";
import AwsExamTaskGuide from "../../components/AwsExamTaskGuide";
import { dataEngineerGuide } from "../../components/AwsNewExamGuides";
import { deaScope } from "../../course-data-extra";
export default function Course(){return <><AwsExamTaskGuide guide={dataEngineerGuide} scopeServices={deaScope.flatMap(category=>category.services)}/><CertificationCourse code="DEA" level="Associate" title="AWS Certified Data Engineer – Associate" description="Study data ingestion, transformation, storage, analytics and governance using the official DEA-C01 service scope." scope={deaScope} sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/data-engineer-associate-01/dea-01-in-scope-services.html" sourceLabel="Aligned to the AWS Certified Data Engineer – Associate DEA-C01 guide"/></>;}
