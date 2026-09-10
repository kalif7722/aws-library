import fs from 'node:fs';

const wrapper = fs.readFileSync('app/components/AipServiceLearningDetails.tsx', 'utf8');
if (!wrapper.includes('AipServiceLearningDetailsV8')) {
  throw new Error('AIP renderer is not pointing at V8');
}

const renderer = fs.readFileSync('app/components/AipServiceLearningDetailsV8.tsx', 'utf8');
if (!renderer.includes('function architectures(service:string,category:string):Arch[]')) {
  throw new Error('AIP V8 architecture builder missing');
}
if (!renderer.includes('v8-layers') || !renderer.includes('arch.layers.map')) {
  throw new Error('AIP V8 layered architecture renderer missing');
}
if (!renderer.includes('Reference pattern:')) {
  throw new Error('AIP V8 reference-pattern labels missing');
}
// Validate the actual layered data/rendering shape rather than matching explanatory prose.
// The UI intentionally mentions the retired source/service/destination model to explain
// that V8 no longer uses it, so checking for those words produces a false positive.
if (!renderer.includes('layers:[') || !renderer.includes('layer.nodes.map')) {
  throw new Error('AIP V8 architecture data is not using layered node groups');
}

const course = fs.readFileSync('app/course-data.ts', 'utf8');
const required = ['AWS CLI','AWS Lambda@Edge','Amazon SQS','Amazon SNS','Amazon EventBridge','AWS Step Functions','Amazon ECR','Amazon ECS','Amazon EKS','AWS Fargate','Amazon Connect','Amazon Aurora','Amazon DynamoDB','Amazon Bedrock','Amazon Bedrock Knowledge Bases','Amazon Q Business','Amazon Q Developer','Amazon SageMaker AI','Amazon SageMaker Neo','Amazon API Gateway','Amazon CloudFront','Amazon VPC','AWS KMS','AWS Secrets Manager','AWS WAF','Amazon S3'];
for (const service of required) {
  if (!course.includes(`"${service}"`)) throw new Error(`AIP scope changed or service missing: ${service}`);
}

console.log('Verified AIP V8 layered architecture renderer and course scope.');
