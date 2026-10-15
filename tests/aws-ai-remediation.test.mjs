import test from 'node:test';
import assert from 'node:assert/strict';
import { loadArchitectureModule } from './load-architecture-module.mjs';

const ai = loadArchitectureModule(new URL('../app/troubleshooting/simulators/aws/engine.ts', import.meta.url));
const {
  createInitialAwsLabState,
  getAwsQBusinessApplications,
  getAwsAiProcessingJobs,
  invokeAwsBedrockModel,
  syncAwsQBusinessApplication,
  runAwsAiProcessingJob,
} = ai;

test('Bedrock IAM denial can be investigated, repaired and retested with CloudTrail evidence', () => {
  const initial = createInitialAwsLabState();
  const broken = {
    ...initial,
    iamRoles: initial.iamRoles.map(role => role.name === 'AI-Platform-Operator'
      ? { ...role, attachedPolicies: role.attachedPolicies.filter(policy => policy !== 'BedrockInvokeAccess') }
      : role),
  };

  const denied = invokeAwsBedrockModel(broken, 'amazon.nova-lite-v1:0', 'Summarize operational risks.');
  assert.equal(denied.success, false);
  assert.match(denied.error, /bedrock:InvokeModel permission/);
  assert.equal(denied.state.cloudTrailEvents[0].eventName, 'Converse');
  assert.equal(denied.state.cloudTrailEvents[0].errorCode, 'AccessDeniedException');

  const repaired = {
    ...denied.state,
    iamRoles: denied.state.iamRoles.map(role => role.name === 'AI-Platform-Operator'
      ? { ...role, attachedPolicies: [...role.attachedPolicies, 'BedrockInvokeAccess'] }
      : role),
  };
  const retried = invokeAwsBedrockModel(repaired, 'amazon.nova-lite-v1:0', 'Summarize operational risks.');
  assert.equal(retried.success, true);
  assert.equal(retried.error, null);
  assert.equal(retried.state.cloudTrailEvents[0].errorCode, null);
  assert.match(retried.response, /no live foundation-model API was called/i);
});

test('Q Business data-source role trust failure is observable and recoverable', () => {
  const initial = createInitialAwsLabState();
  const broken = {
    ...initial,
    iamRoles: initial.iamRoles.map(role => role.name === 'QBusinessDataSourceRole'
      ? { ...role, trustedService: 'lambda.amazonaws.com' }
      : role),
  };

  const denied = syncAwsQBusinessApplication(broken, 'q-app-operations');
  assert.equal(denied.success, false);
  assert.match(denied.error, /must trust qbusiness.amazonaws.com/);
  assert.equal(denied.state.cloudTrailEvents[0].errorCode, 'AccessDeniedException');
  assert.equal(getAwsQBusinessApplications(denied.state)[0].syncStatus, 'FAILED');

  const repaired = {
    ...denied.state,
    iamRoles: denied.state.iamRoles.map(role => role.name === 'QBusinessDataSourceRole'
      ? { ...role, trustedService: 'qbusiness.amazonaws.com' }
      : role),
  };
  const retried = syncAwsQBusinessApplication(repaired, 'q-app-operations');
  assert.equal(retried.success, true);
  assert.equal(getAwsQBusinessApplications(retried.state)[0].syncStatus, 'SUCCEEDED');
  assert.equal(retried.state.cloudTrailEvents[0].errorCode, null);
});

test('Comprehend KMS permission failure does not write output and succeeds after role repair', () => {
  const initial = createInitialAwsLabState();
  const input = {
    service: 'Comprehend',
    name: 'ci-kms-remediation-sentiment-job-20261015',
    jobType: 'Sentiment analysis',
    inputBucketName: 'ai-workloads',
    inputKey: 'comprehend/reviews/batch-01.txt',
    outputBucketName: 'ai-workloads',
    outputPrefix: 'comprehend/output/ci-kms-remediation-sentiment-job-20261015/',
  };
  const broken = {
    ...initial,
    iamRoles: initial.iamRoles.map(role => role.name === 'ComprehendBatchRole'
      ? { ...role, attachedPolicies: role.attachedPolicies.filter(policy => policy !== 'KMSAIArtifactAccess') }
      : role),
  };

  const denied = runAwsAiProcessingJob(broken, input);
  assert.equal(denied.success, false);
  assert.match(denied.error, /S3\/KMS read\/write permissions/);
  assert.equal(denied.job.status, 'FAILED');
  assert.equal(denied.job.outputKey, null);
  assert.equal(denied.state.cloudTrailEvents[0].errorCode, 'AccessDeniedException');
  assert.equal(denied.state.s3Objects.some(object => object.key === 'comprehend/output/ci-kms-remediation-sentiment-job-20261015-retry/sentiment-results.json'), false);

  const repaired = {
    ...denied.state,
    iamRoles: denied.state.iamRoles.map(role => role.name === 'ComprehendBatchRole'
      ? { ...role, attachedPolicies: [...role.attachedPolicies, 'KMSAIArtifactAccess'] }
      : role),
  };
  const retryInput = { ...input, name: input.name + '-retry', outputPrefix: input.outputPrefix.replace(input.name, input.name + '-retry') };
  const retried = runAwsAiProcessingJob(repaired, retryInput);
  assert.equal(retried.success, true);
  assert.equal(retried.job.status, 'SUCCEEDED');
  assert.ok(retried.state.s3Objects.some(object => object.key === 'comprehend/output/ci-kms-remediation-sentiment-job-20261015/sentiment-results.json'));
  assert.equal(retried.state.cloudTrailEvents[0].errorCode, null);
  assert.equal(getAwsAiProcessingJobs(retried.state, 'Comprehend').some(job => job.name === retryInput.name && job.status === 'SUCCEEDED'), true);
});
