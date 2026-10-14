import test from 'node:test';
import assert from 'node:assert/strict';
import {loadArchitectureModule} from './load-architecture-module.mjs';

const directory = loadArchitectureModule(new URL('../app/troubleshooting/simulators/aws/service-directory.ts', import.meta.url));
const mocks = loadArchitectureModule(new URL('../app/troubleshooting/simulators/aws/mock-configs.ts', import.meta.url));

test('AWS service directory separates implemented screens from catalog-only services', () => {
  const entries = directory.AWS_SERVICE_DIRECTORY;
  assert.ok(entries.length >= 40);
  assert.ok(entries.some(service => service.name === 'EC2' && service.implemented && service.screen === 'EC2 Dashboard'));
  assert.ok(entries.some(service => service.name === 'CloudTrail' && !service.implemented));
  assert.equal(new Set(entries.map(service => service.name)).size, entries.length);
});

test('AWS mock baseline includes connected resources across core services', () => {
  const profile = mocks.getAwsMockProfile();
  const byId = new Map(profile.resources.map(resource => [resource.id, resource]));
  assert.ok(byId.has('i-0a12b345c678d9012'));
  assert.ok(byId.has('vpc-0123abcd4567ef890'));
  assert.ok(byId.has('orders-prod'));
  assert.ok(byId.has('sg-rds-orders'));
  assert.ok(byId.has('payments-authorizer'));
  assert.ok(byId.get('i-0a12b345c678d9012').relationships.securityGroups.includes('sg-0ab12cd34ef56ab78'));
  assert.ok(byId.get('orders-prod').relationships.securityGroups.includes('sg-rds-orders'));
  assert.equal(byId.get('sg-rds-orders').attributes.allowedSourceSecurityGroup, 'sg-0ab12cd34ef56ab78');
});

test('lab mock profiles are available without replacing the normal baseline', () => {
  assert.ok(mocks.AWS_MOCK_PROFILES.some(profile => profile.id === 'private-db-connectivity-lab'));
  const dbLab = mocks.getAwsMockProfile('private-db-connectivity-lab');
  assert.equal(dbLab.resources.find(resource => resource.id === 'sg-rds-orders').attributes.allowedSourceSecurityGroup, 'sg-legacy-app');
  const iamLab = mocks.getAwsMockProfile('iam-access-denied-lab');
  assert.equal(iamLab.resources.find(resource => resource.id === 'Boundary-ApplicationRuntime').attributes.allowsS3PutObject, false);
  assert.equal(mocks.getAwsMockProfile('unknown-profile').id, 'baseline-production');
});
