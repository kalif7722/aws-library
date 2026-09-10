import fs from 'node:fs';

const wrapper = fs.readFileSync('app/components/AipServiceLearningDetails.tsx', 'utf8');
if (!wrapper.includes('AipServiceLearningDetailsV8')) {
  throw new Error('AIP renderer is not pointing at V8');
}

const rendererPath = 'app/components/AipServiceLearningDetailsV8.tsx';
let renderer = fs.readFileSync(rendererPath, 'utf8');
const overrideImport = 'import { getAipArchitectureOverrides } from "./AipArchitectureOverrides";';
const overrideImport2 = 'import { getAipArchitectureOverrides2 } from "./AipArchitectureOverrides2";';
if (!renderer.includes(overrideImport)) {
  renderer = renderer.replace(
    'import { aipScope, guideAliases } from "../course-data";',
    'import { aipScope, guideAliases } from "../course-data";\n' + overrideImport
  );
}
if (!renderer.includes(overrideImport2)) {
  renderer = renderer.replace(overrideImport, overrideImport + '\n' + overrideImport2);
}
const oldArches = 'const arches=architectures(e.service,e.category);';
const previousArches = 'const arches=getAipArchitectureOverrides(e.service,e.category)??architectures(e.service,e.category);';
const newArches = 'const arches=getAipArchitectureOverrides2(e.service,e.category)??getAipArchitectureOverrides(e.service,e.category)??architectures(e.service,e.category);';
if (!renderer.includes(newArches)) {
  if (renderer.includes(previousArches)) renderer = renderer.replace(previousArches, newArches);
  else if (renderer.includes(oldArches)) renderer = renderer.replace(oldArches, newArches);
  else throw new Error('AIP V8 architecture selection hook missing');
}
fs.writeFileSync(rendererPath, renderer);

if (!renderer.includes('function architectures(service:string,category:string):Arch[]')) {
  throw new Error('AIP V8 architecture builder missing');
}
if (!renderer.includes('type Layer={title:string;nodes:Node[]}') || !renderer.includes('type Arch={title:string;note:string;layers:Layer[];reference:string}')) {
  throw new Error('AIP V8 layered architecture types missing');
}
if (!renderer.includes('const L=(title:string,...nodes:Node[]):Layer=>({title,nodes})') || !renderer.includes('const A=(title:string,note:string,reference:string,...layers:Layer[]):Arch=>({title,note,reference,layers})')) {
  throw new Error('AIP V8 layered architecture constructors missing');
}
if (!renderer.includes('v8-layers') || !renderer.includes('arch.layers.map') || !renderer.includes('layer.nodes.map')) {
  throw new Error('AIP V8 layered architecture renderer missing');
}
if (!renderer.includes('Reference pattern:')) {
  throw new Error('AIP V8 reference-pattern labels missing');
}
if (!renderer.includes('getAipArchitectureOverrides2(e.service,e.category)??getAipArchitectureOverrides(e.service,e.category)??architectures(e.service,e.category)')) {
  throw new Error('AIP service-specific architecture overrides are not active');
}

const overrides = fs.readFileSync('app/components/AipArchitectureOverrides.ts', 'utf8');
const requiredOverrides = [
  'AWS Glue','Amazon Kinesis','Amazon OpenSearch Service','Amazon Quick Sight','Amazon Managed Streaming for Apache Kafka (Amazon MSK)',
  'AWS App Runner','Amazon EC2','AWS Outposts','AWS Wavelength','AWS Amplify','Kiro',
  'Amazon Augmented AI','Amazon Comprehend','Amazon Comprehend Medical','Amazon Personalize','Amazon Polly','Amazon Rekognition','Amazon Textract','Amazon Transcribe','Amazon Nova','Amazon Titan','Amazon PartyRock',
  'Amazon Q Business','Amazon Q Business Apps','Amazon Q Developer','Amazon Quick',
  'Amazon SageMaker Data Wrangler','Amazon SageMaker Processing','Amazon SageMaker Ground Truth','Amazon SageMaker Clarify','Amazon SageMaker Model Monitor','Amazon SageMaker Model Registry','Amazon SageMaker JumpStart','Amazon SageMaker Neo','Amazon SageMaker Unified Studio',
  'AWS Auto Scaling','AWS Chatbot','Amazon CloudWatch Logs','Amazon CloudWatch Synthetics','AWS Cost Anomaly Detection','AWS Cost Explorer','Amazon Managed Grafana','AWS Service Catalog','AWS Well-Architected Tool',
  'IAM','IAM Access Analyzer','IAM Identity Center','Amazon S3 Intelligent-Tiering','Amazon S3 Lifecycle policies','Amazon S3 Cross-Region Replication'
];
for (const service of requiredOverrides) {
  if (!overrides.includes(`"${service}"`)) throw new Error(`Missing AIP service-specific architecture override: ${service}`);
}

const overrides2 = fs.readFileSync('app/components/AipArchitectureOverrides2.ts', 'utf8');
const requiredOverrides2 = [
  'Amazon Bedrock Prompt Management','Amazon Bedrock Prompt Flows','AWS CodeArtifact','AWS CodeBuild','AWS CodeDeploy','AWS CodePipeline',
  'AWS CloudFormation','AWS CDK','AWS CLI','AWS Tools and SDKs','Amazon Aurora','Amazon RDS','Amazon DynamoDB Streams','AWS Encryption SDK'
];
for (const service of requiredOverrides2) {
  if (!overrides2.includes(`"${service}"`)) throw new Error(`Missing second-set AIP architecture override: ${service}`);
}

const course = fs.readFileSync('app/course-data.ts', 'utf8');
const required = ['AWS CLI','AWS Lambda@Edge','Amazon SQS','Amazon SNS','Amazon EventBridge','AWS Step Functions','Amazon ECR','Amazon ECS','Amazon EKS','AWS Fargate','Amazon Connect','Amazon Aurora','Amazon DynamoDB','Amazon Bedrock','Amazon Bedrock Knowledge Bases','Amazon Q Business','Amazon Q Developer','Amazon SageMaker AI','Amazon SageMaker Neo','Amazon API Gateway','Amazon CloudFront','Amazon VPC','AWS KMS','AWS Secrets Manager','AWS WAF','Amazon S3'];
for (const service of required) {
  if (!course.includes(`"${service}"`)) throw new Error(`AIP scope changed or service missing: ${service}`);
}

console.log('Verified AIP V8 layered architecture renderer, both service-specific override sets, and course scope.');
