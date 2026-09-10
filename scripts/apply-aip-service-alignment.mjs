import fs from 'node:fs';

const patchFile = (path, replacements) => {
  let source = fs.readFileSync(path, 'utf8');
  for (const [from, to] of replacements) source = source.split(from).join(to);
  fs.writeFileSync(path, source);
};

patchFile('app/components/AipServiceLearningDetailsV3.tsx', [
  ['[pub("ai","Trained model","Framework artifact"),aws("Amazon SageMaker AI","Neo compiler"),[pub("file","Optimized artifact","Target-specific"),pub("app","Edge/cloud runtime","Inference")])', '[pub("ai","Trained model","Framework artifact")],aws("Amazon SageMaker AI","Neo compiler"),[pub("file","Optimized artifact","Target-specific"),pub("app","Edge/cloud runtime","Inference")])'],
  ['aws("AWS Cloud","Amplify build + hosting")', 'aws("AWS Amplify","Build + hosting")'],
  ['aws("AWS Cloud","Amplify hosted app")', 'aws("AWS Amplify","Hosted web application")'],
  ['aws("AWS Cloud","Amazon Kendra index")', 'aws("Amazon Kendra","Enterprise search index")'],
  ['aws("AWS Cloud","Amazon Kendra retrieval")', 'aws("Amazon Kendra","Permission-aware retrieval")'],
  ['aws("AWS Cloud","Amazon Lex bot")', 'aws("Amazon Lex","Bot + intent recognition")'],
  ['aws("AWS Cloud","Amazon Lex","Intent/slots")', 'aws("Amazon Lex","Intent / slots")'],
  ['aws("AWS Cloud","Amazon Personalize")', 'aws("Amazon Personalize","Recommendation engine")'],
  ['aws("AWS Cloud","Amazon Polly")', 'aws("Amazon Polly","Text-to-speech")'],
  ['aws("AWS Cloud","Amazon Rekognition")', 'aws("Amazon Rekognition","Image/video analysis")'],
  ['aws("AWS Cloud","Amazon Transcribe")', 'aws("Amazon Transcribe","Speech-to-text")'],
  ['aws("AWS Cloud",service)', 'aws(service,"Service control plane")']
]);

patchFile('app/components/AipServiceLearningDetailsV4.tsx', [
  ['n("AWS Auto Scaling","Scaling policy","monitor","awsCloud")', 'n("AWS Auto Scaling","Scaling policy","monitor","autoScaling")'],
  ['n("AWS Auto Scaling","Predictive / scheduled action","monitor","awsCloud")', 'n("AWS Auto Scaling","Predictive / scheduled action","monitor","autoScaling")'],
  ['n("AWS Chatbot","Chat integration","message","awsCloud")', 'n("AWS Chatbot","Chat integration","message","chatbot")'],
  ['n("AWS Chatbot","Authorized command","message","awsCloud")', 'n("AWS Chatbot","Authorized command","message","chatbot")']
]);

const wrapper = fs.readFileSync('app/components/AipServiceLearningDetails.tsx', 'utf8');
if (!wrapper.includes('AipServiceLearningDetailsV4')) throw new Error('AIP renderer is not pointing at V4');

const course = fs.readFileSync('app/course-data.ts', 'utf8');
const required = ['AWS CLI','AWS Lambda@Edge','Amazon SQS','Amazon SNS','Amazon EventBridge','AWS Step Functions','Amazon ECR','Amazon ECS','Amazon EKS','AWS Fargate','Amazon Bedrock','Amazon Q Business','Amazon Q Developer','Amazon SageMaker AI','Amazon API Gateway','Amazon CloudFront','Amazon VPC','AWS KMS','AWS Secrets Manager','AWS WAF','Amazon S3'];
for (const service of required) if (!course.includes(`"${service}"`)) throw new Error(`AIP scope changed or service missing: ${service}`);

console.log('Applied AIP service-specific architecture and icon alignment.');
