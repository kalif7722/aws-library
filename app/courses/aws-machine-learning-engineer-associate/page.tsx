import CertificationCourse from "../../components/CertificationCourse";
import AwsExamTaskGuide from "../../components/AwsExamTaskGuide";
import { machineLearningGuide } from "../../components/AwsNewExamGuides";
import { mlaScope } from "../../course-data-extra";
export default function Course(){return <><AwsExamTaskGuide guide={machineLearningGuide} scopeServices={mlaScope.flatMap(category=>category.services)}/><CertificationCourse code="MLA" level="Associate" title="AWS Certified Machine Learning Engineer – Associate" description="Study machine-learning workloads and supporting AWS services using the official MLA-C01 certification scope." scope={mlaScope} sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/machine-learning-engineer-associate-01/mla-01-in-scope-services.html" sourceLabel="Aligned to the AWS Certified Machine Learning Engineer – Associate MLA-C01 guide"/></>;}
