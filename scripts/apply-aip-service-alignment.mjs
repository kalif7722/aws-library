import fs from 'node:fs';

const wrapper = fs.readFileSync('app/components/AipServiceLearningDetails.tsx', 'utf8');
if (!wrapper.includes('AipServiceLearningDetailsV6')) {
  throw new Error('AIP renderer is not pointing at V6');
}

const renderer = fs.readFileSync('app/components/AipServiceLearningDetailsV6.tsx', 'utf8');
if (renderer.includes('AipServiceLearningDetailsV3') || renderer.includes('AipServiceLearningDetailsV4') || renderer.includes('AipServiceLearningDetailsV5')) {
  throw new Error('AIP V6 must remain standalone and must not import legacy renderers');
}

const course = fs.readFileSync('app/course-data.ts', 'utf8');
const required = ['AWS CLI','AWS Lambda@Edge','Amazon SQS','Amazon SNS','Amazon EventBridge','AWS Step Functions','Amazon ECR','Amazon ECS','Amazon EKS','AWS Fargate','Amazon Bedrock','Amazon Bedrock Knowledge Bases','Amazon Q Business','Amazon Q Developer','Amazon SageMaker AI','Amazon SageMaker Neo','Amazon API Gateway','Amazon CloudFront','Amazon VPC','AWS KMS','AWS Secrets Manager','AWS WAF','Amazon S3'];
for (const service of required) {
  if (!course.includes(`"${service}"`)) throw new Error(`AIP scope changed or service missing: ${service}`);
  if (!renderer.includes(`"${service}"`)) throw new Error(`AIP V6 architecture catalog missing: ${service}`);
}

console.log('Verified standalone AIP V6 service-specific architecture renderer and course scope.');
