import fs from 'node:fs';

const wrapper = fs.readFileSync('app/components/AipServiceLearningDetails.tsx', 'utf8');
if (!wrapper.includes('AipServiceLearningDetailsV5')) {
  throw new Error('AIP renderer is not pointing at stable V5');
}

const course = fs.readFileSync('app/course-data.ts', 'utf8');
const required = ['AWS CLI','AWS Lambda@Edge','Amazon SQS','Amazon SNS','Amazon EventBridge','AWS Step Functions','Amazon ECR','Amazon ECS','Amazon EKS','AWS Fargate','Amazon Bedrock','Amazon Q Business','Amazon Q Developer','Amazon SageMaker AI','Amazon API Gateway','Amazon CloudFront','Amazon VPC','AWS KMS','AWS Secrets Manager','AWS WAF','Amazon S3'];
for (const service of required) {
  if (!course.includes(`"${service}"`)) throw new Error(`AIP scope changed or service missing: ${service}`);
}

console.log('Verified stable AIP service learning renderer and course scope.');
