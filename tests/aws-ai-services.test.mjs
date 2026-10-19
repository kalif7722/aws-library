import test from 'node:test';
import assert from 'node:assert/strict';
import { loadArchitectureModule } from './load-architecture-module.mjs';

const ai = loadArchitectureModule(new URL('../app/troubleshooting/simulators/aws/engine.ts', import.meta.url));
const {
  createInitialAwsLabState,
  migrateAwsLabState,
  getAwsBedrockModels,
  getAwsBedrockKnowledgeBases,
  getAwsBedrockGuardrails,
  getAwsSageMakerModels,
  getAwsSageMakerTrainingJobs,
  getAwsSageMakerEndpoints,
  getAwsAiProcessingJobs,
  getAwsQBusinessApplications,
  getAwsQDeveloperUsers,
  submitAwsBedrockUseCase,
  invokeAwsBedrockModel,
  syncAwsBedrockKnowledgeBase,
  updateAwsBedrockGuardrail,
  createAwsSageMakerTrainingJob,
  setAwsSageMakerEndpointInstanceCount,
  invokeAwsSageMakerEndpoint,
  runAwsAiProcessingJob,
  syncAwsQBusinessApplication,
  updateAwsQDeveloperUser,
} = ai;

test('AI service baseline contains secure S3 inputs, outputs and least-privilege execution roles', () => {
  const state = createInitialAwsLabState();
  assert.equal(state.schemaVersion, 10);
  assert.ok(state.s3Buckets.some(bucket => bucket.name === 'ai-workloads' && bucket.blockPublicAccess && bucket.encryption === 'SSE-KMS'));
  for (const key of [
    'training/churn/train.csv',
    'knowledge/payments/product-guide.txt',
    'comprehend/reviews/batch-01.txt',
    'textract/invoices/invoice-1027.pdf',
    'qbusiness/handbook/employee-guide.txt',
  ]) {
    assert.ok(state.s3Objects.some(object => object.bucketName === 'ai-workloads' && object.key === key), 'missing AI source object ' + key);
  }
  const requiredRoles = [
    ['BedrockKnowledgeBaseRole', 'bedrock.amazonaws.com', 'BedrockDataSourceRead'],
    ['SageMakerExecutionRole', 'sagemaker.amazonaws.com', 'SageMakerTrainingAccess'],
    ['ComprehendBatchRole', 'comprehend.amazonaws.com', 'ComprehendBatchAccess'],
    ['TextractDocumentRole', 'textract.amazonaws.com', 'TextractDocumentAccess'],
    ['QBusinessDataSourceRole', 'qbusiness.amazonaws.com', 'QBusinessDataSourceAccess'],
  ];
  for (const [name, trust, permission] of requiredRoles) {
    const role = state.iamRoles.find(item => item.name === name);
    assert.ok(role, 'missing role ' + name);
    assert.equal(role.trustedService, trust);
    assert.ok(role.attachedPolicies.includes(permission));
    assert.ok(role.attachedPolicies.includes('S3ArtifactsRead'));
    assert.ok(role.attachedPolicies.includes('KMSAIArtifactAccess'));
  }
  assert.ok(state.s3BucketPolicies.some(policy => policy.bucketName === 'ai-workloads' && policy.statements.some(statement => statement.sid === 'DenyInsecureTransport')));
  assert.equal(getAwsBedrockModels(state).length, 2);
  assert.equal(getAwsBedrockKnowledgeBases(state).length, 1);
  assert.equal(getAwsBedrockGuardrails(state).length, 1);
  assert.equal(getAwsSageMakerModels(state).length, 1);
  assert.equal(getAwsSageMakerTrainingJobs(state).length, 1);
  assert.equal(getAwsSageMakerEndpoints(state).length, 1);
  assert.equal(getAwsAiProcessingJobs(state, 'Comprehend').length, 1);
  assert.equal(getAwsAiProcessingJobs(state, 'Textract').length, 1);
  assert.equal(getAwsQBusinessApplications(state).length, 1);
  assert.equal(getAwsQDeveloperUsers(state).length, 3);
});

test('legacy saved accounts receive AI prerequisites without losing existing state', () => {
  const baseline = createInitialAwsLabState();
  const aiRoleNames = new Set(['AI-Platform-Operator', 'BedrockKnowledgeBaseRole', 'SageMakerExecutionRole', 'ComprehendBatchRole', 'TextractDocumentRole', 'QBusinessDataSourceRole']);
  const legacy = {
    ...baseline,
    schemaVersion: 6,
    bedrockModels: undefined,
    bedrockKnowledgeBases: undefined,
    bedrockGuardrails: undefined,
    sagemakerModels: undefined,
    sagemakerTrainingJobs: undefined,
    sagemakerEndpoints: undefined,
    aiProcessingJobs: undefined,
    qBusinessApplications: undefined,
    qDeveloperUsers: undefined,
    iamRoles: baseline.iamRoles.filter(role => !aiRoleNames.has(role.name)),
    s3Buckets: baseline.s3Buckets.filter(bucket => bucket.name !== 'ai-workloads'),
    s3Objects: baseline.s3Objects.filter(object => object.bucketName !== 'ai-workloads'),
    s3BucketPolicies: baseline.s3BucketPolicies.filter(policy => policy.bucketName !== 'ai-workloads'),
    cloudTrailEvents: [...baseline.cloudTrailEvents],
  };
  const migrated = migrateAwsLabState(legacy);
  assert.equal(migrated.schemaVersion, 10);
  assert.ok(migrated.instance);
  assert.ok(migrated.s3Buckets.some(bucket => bucket.name === 'ai-workloads'));
  assert.ok(migrated.s3Objects.some(object => object.bucketName === 'ai-workloads' && object.key === 'training/churn/train.csv'));
  assert.ok(migrated.iamRoles.some(role => role.name === 'SageMakerExecutionRole'));
  assert.ok(migrated.s3BucketPolicies.some(policy => policy.bucketName === 'ai-workloads'));
  assert.equal(migrated.cloudTrailEvents.length, legacy.cloudTrailEvents.length);
  assert.equal(getAwsBedrockModels(migrated).length, 2);
});

test('Bedrock use-case submission, inference authorization, usage and CloudTrail stay linked', () => {
  const initial = createInitialAwsLabState();
  const modelId = 'amazon.nova-lite-v1:0';
  const invoked = invokeAwsBedrockModel(initial, modelId, 'Summarize the risks.');
  assert.equal(invoked.success, true);
  assert.equal(invoked.error, null);
  assert.equal(getAwsBedrockModels(invoked.state).find(model => model.modelId === modelId).invocationCount, 13);
  assert.equal(invoked.state.cloudTrailEvents[0].eventName, 'Converse');
  assert.equal(invoked.state.cloudTrailEvents[0].errorCode, null);

  const pendingId = 'anthropic.claude-sonnet-4-20250514-v1:0';
  const invalid = submitAwsBedrockUseCase(initial, pendingId, { description: 'Internal assistant', website: 'example.com' });
  assert.match(invalid.error, /HTTPS website/);
  const submitted = submitAwsBedrockUseCase(initial, pendingId, { description: 'Internal enterprise assistant for approved operational documentation.', website: 'https://github.com/kalif7722' });
  assert.equal(submitted.error, null);
  assert.equal(getAwsBedrockModels(submitted.state).find(model => model.modelId === pendingId).accessStatus, 'Available');

  const deniedState = {
    ...initial,
    iamRoles: initial.iamRoles.map(role => role.name === 'AI-Platform-Operator' ? { ...role, attachedPolicies: role.attachedPolicies.filter(policy => policy !== 'BedrockInvokeAccess') } : role),
  };
  const denied = invokeAwsBedrockModel(deniedState, modelId, 'hello');
  assert.equal(denied.success, false);
  assert.match(denied.error, /permission/);
  assert.equal(denied.state.cloudTrailEvents[0].errorCode, 'AccessDeniedException');
});

test('Bedrock knowledge-base sync checks its role and S3 source; guardrail edits increment versions', () => {
  const initial = createInitialAwsLabState();
  const kbId = 'kb-payments-product-guide';
  const synced = syncAwsBedrockKnowledgeBase(initial, kbId);
  assert.equal(synced.success, true);
  const kb = getAwsBedrockKnowledgeBases(synced.state).find(item => item.id === kbId);
  assert.equal(kb.status, 'ACTIVE');
  assert.equal(kb.documentsIndexed, 1);
  assert.equal(synced.state.cloudTrailEvents[0].eventName, 'StartIngestionJob');

  const broken = {
    ...initial,
    iamRoles: initial.iamRoles.map(role => role.name === 'BedrockKnowledgeBaseRole' ? { ...role, attachedPolicies: role.attachedPolicies.filter(policy => policy !== 'S3ArtifactsRead') } : role),
  };
  const failed = syncAwsBedrockKnowledgeBase(broken, kbId);
  assert.equal(failed.success, false);
  assert.match(failed.error, /S3 or KMS data-source permissions/);
  assert.equal(failed.state.cloudTrailEvents[0].errorCode, 'AccessDeniedException');

  const guardrailId = 'gr-payments-assistant';
  const updated = updateAwsBedrockGuardrail(initial, guardrailId, 'contentFiltersEnabled', false);
  assert.equal(updated.error, null);
  const guardrail = getAwsBedrockGuardrails(updated.state).find(item => item.id === guardrailId);
  assert.equal(guardrail.contentFiltersEnabled, false);
  assert.equal(guardrail.version, 4);
  assert.equal(updated.state.cloudTrailEvents[0].eventName, 'UpdateGuardrail');
});

test('SageMaker training creates a model artifact and endpoint actions update shared state', () => {
  const initial = createInitialAwsLabState();
  const result = createAwsSageMakerTrainingJob(initial, {
    name: 'unit-test-churn-training',
    algorithm: 'XGBoost',
    executionRole: 'SageMakerExecutionRole',
    inputBucketName: 'ai-workloads',
    inputKey: 'training/churn/train.csv',
    outputBucketName: 'ai-workloads',
    outputPrefix: 'models/unit-test-churn-training/',
    instanceType: 'ml.m5.large',
    instanceCount: 1,
  });
  assert.equal(result.success, true);
  assert.equal(result.error, null);
  assert.equal(result.job.status, 'Completed');
  assert.ok(getAwsSageMakerModels(result.state).some(model => model.name === 'unit-test-churn-training-model'));
  assert.ok(result.state.s3Objects.some(object => object.key === 'models/unit-test-churn-training/unit-test-churn-training-model/model.tar.gz'));
  assert.equal(result.state.cloudTrailEvents[0].eventName, 'CreateTrainingJob');

  const invalid = createAwsSageMakerTrainingJob(initial, {
    name: 'unit-test-missing-input',
    algorithm: 'XGBoost',
    executionRole: 'SageMakerExecutionRole',
    inputBucketName: 'ai-workloads',
    inputKey: 'training/missing.csv',
    outputBucketName: 'ai-workloads',
    outputPrefix: 'models/missing/',
    instanceType: 'ml.m5.large',
    instanceCount: 1,
  });
  assert.equal(invalid.success, false);
  assert.match(invalid.error, /input object does not exist/);

  const scaled = setAwsSageMakerEndpointInstanceCount(initial, 'churn-risk-predictor', 3);
  assert.equal(scaled.error, null);
  assert.equal(getAwsSageMakerEndpoints(scaled.state).find(endpoint => endpoint.name === 'churn-risk-predictor').instanceCount, 3);
  const invoked = invokeAwsSageMakerEndpoint(scaled.state, 'churn-risk-predictor');
  assert.equal(invoked.success, true);
  assert.equal(getAwsSageMakerEndpoints(invoked.state).find(endpoint => endpoint.name === 'churn-risk-predictor').invocationCount, 39);
  assert.equal(invoked.state.cloudTrailEvents[0].eventName, 'InvokeEndpoint');
});

test('Comprehend and Textract batch jobs validate sources and write auditable S3 outputs', () => {
  const initial = createInitialAwsLabState();
  const comprehend = runAwsAiProcessingJob(initial, {
    service: 'Comprehend',
    name: 'unit-test-sentiment',
    jobType: 'Sentiment analysis',
    inputBucketName: 'ai-workloads',
    inputKey: 'comprehend/reviews/batch-01.txt',
    outputBucketName: 'ai-workloads',
    outputPrefix: 'comprehend/output/unit-test-sentiment/',
  });
  assert.equal(comprehend.success, true);
  assert.equal(comprehend.job.status, 'SUCCEEDED');
  assert.ok(comprehend.state.s3Objects.some(object => object.key === 'comprehend/output/unit-test-sentiment/sentiment-results.json'));
  assert.equal(comprehend.state.cloudTrailEvents[0].eventName, 'StartSentimentDetectionJob');

  const textract = runAwsAiProcessingJob(comprehend.state, {
    service: 'Textract',
    name: 'unit-test-expense-analysis',
    jobType: 'Expense analysis',
    inputBucketName: 'ai-workloads',
    inputKey: 'textract/invoices/invoice-1027.pdf',
    outputBucketName: 'ai-workloads',
    outputPrefix: 'textract/output/unit-test-expense-analysis/',
  });
  assert.equal(textract.success, true);
  assert.equal(textract.job.status, 'SUCCEEDED');
  assert.ok(textract.state.s3Objects.some(object => object.key === 'textract/output/unit-test-expense-analysis/document-analysis.json'));
  assert.equal(textract.state.cloudTrailEvents[0].eventName, 'StartExpenseAnalysis');

  const missing = runAwsAiProcessingJob(initial, {
    service: 'Textract',
    name: 'unit-test-missing-document',
    jobType: 'Text detection',
    inputBucketName: 'ai-workloads',
    inputKey: 'textract/missing.pdf',
    outputBucketName: 'ai-workloads',
    outputPrefix: 'textract/output/missing/',
  });
  assert.equal(missing.success, false);
  assert.match(missing.error, /input object was not found/);
  assert.equal(missing.state.cloudTrailEvents[0].errorCode, 'AccessDeniedException');
});

test('Amazon Q Business sync and Amazon Q Developer subscription changes update shared account state', () => {
  const initial = createInitialAwsLabState();
  const sync = syncAwsQBusinessApplication(initial, 'q-app-operations');
  assert.equal(sync.success, true);
  assert.equal(getAwsQBusinessApplications(sync.state)[0].syncStatus, 'SUCCEEDED');
  assert.equal(getAwsQBusinessApplications(sync.state)[0].documentsIndexed, 1);
  assert.equal(sync.state.cloudTrailEvents[0].eventName, 'StartDataSourceSyncJob');

  const update = updateAwsQDeveloperUser(sync.state, 'intern@example.com', { subscription: 'Pro', status: 'Suspended' });
  assert.equal(update.error, null);
  const user = getAwsQDeveloperUsers(update.state).find(item => item.username === 'intern@example.com');
  assert.equal(user.subscription, 'Pro');
  assert.equal(user.status, 'Suspended');
  assert.equal(update.state.cloudTrailEvents[0].eventName, 'UpdateUserSubscription');
});
