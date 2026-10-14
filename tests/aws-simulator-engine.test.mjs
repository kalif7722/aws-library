import test from 'node:test';
import assert from 'node:assert/strict';
import {loadArchitectureModule} from './load-architecture-module.mjs';

const {createInitialAwsLabState,addSshIngressRule,evaluateAwsSshReachability,updateS3BucketSetting,toggleIamRolePolicy}=loadArchitectureModule(new URL('../app/troubleshooting/simulators/aws/engine.ts',import.meta.url));

test('SSH reachability uses the current attached security-group rules',()=>{
  const initial=createInitialAwsLabState();
  const blocked=evaluateAwsSshReachability(initial);
  assert.equal(blocked.reachable,false);
  assert.equal(blocked.blockedAt,'security-group');
  assert.ok(initial.securityGroups.some(group => group.id === 'sg-0f55aa11bb22cc33' && group.name === 'sg-bastion-prod'));
  const updated=addSshIngressRule(initial,'sg-bastion-prod','SecurityGroup');
  assert.equal(updated.securityGroups[0].ingress.find(rule => rule.id === 'sgr-sim-ssh-admin').source, 'sg-0f55aa11bb22cc33');
  const reachable=evaluateAwsSshReachability(updated);
  assert.equal(reachable.reachable,true);
  assert.ok(reachable.checks.every(check=>check.result==='passed'));
});

test('SSH reachability detects a blackhole local route after the security group is fixed',()=>{
  const fixed=addSshIngressRule(createInitialAwsLabState(),'sg-bastion-prod','SecurityGroup');
  const broken={...fixed,routes:fixed.routes.map(route=>route.target==='local'?{...route,state:'blackhole'}:route)};
  const result=evaluateAwsSshReachability(broken);
  assert.equal(result.reachable,false);
  assert.equal(result.blockedAt,'route');
});

test('SSH reachability evaluates inbound and return-path network ACL rules',()=>{
  const fixed=addSshIngressRule(createInitialAwsLabState(),'sg-bastion-prod','SecurityGroup');
  const inboundBroken={...fixed,networkAcl:[...fixed.networkAcl,{direction:'inbound',ruleNumber:90,protocol:'TCP',ports:'22',source:'0.0.0.0/0',action:'deny'}]};
  const inboundResult=evaluateAwsSshReachability(inboundBroken);
  assert.equal(inboundResult.reachable,false);
  assert.equal(inboundResult.blockedAt,'network-acl');
  const outboundBroken={...fixed,networkAcl:[...fixed.networkAcl,{direction:'outbound',ruleNumber:90,protocol:'TCP',ports:'49152-65535',source:'0.0.0.0/0',action:'deny'}]};
  const outboundResult=evaluateAwsSshReachability(outboundBroken);
  assert.equal(outboundResult.reachable,false);
  assert.equal(outboundResult.blockedAt,'network-acl');
});

test('network ACL evaluation follows numeric rule priority rather than array order',()=>{
  const fixed=addSshIngressRule(createInitialAwsLabState(),'sg-bastion-prod','SecurityGroup');
  const lowerPriorityDeny={...fixed,networkAcl:[...fixed.networkAcl,{direction:'inbound',ruleNumber:120,protocol:'TCP',ports:'22',source:'0.0.0.0/0',action:'deny'}]};
  assert.equal(evaluateAwsSshReachability(lowerPriorityDeny).reachable,true);
  const higherPriorityDeny={...fixed,networkAcl:[...fixed.networkAcl,{direction:'inbound',ruleNumber:90,protocol:'TCP',ports:'22',source:'0.0.0.0/0',action:'deny'}]};
  assert.equal(evaluateAwsSshReachability(higherPriorityDeny).reachable,false);
});

test('S3 configuration changes update only the selected bucket and remain in shared state',()=>{
  const initial=createInitialAwsLabState();
  const updated=updateS3BucketSetting(initial,'data-lake-curated','versioningEnabled',true);
  assert.equal(updated.s3Buckets.find(bucket=>bucket.name==='data-lake-curated').versioningEnabled,true);
  assert.equal(updated.s3Buckets.find(bucket=>bucket.name==='prod-app-artifacts').versioningEnabled,true);
  assert.equal(initial.s3Buckets.find(bucket=>bucket.name==='data-lake-curated').versioningEnabled,false);
  const publicAccessChanged=updateS3BucketSetting(updated,'prod-app-artifacts','blockPublicAccess',false);
  assert.equal(publicAccessChanged.s3Buckets.find(bucket=>bucket.name==='prod-app-artifacts').blockPublicAccess,false);
});

test('IAM policy attachment changes are scoped to the selected role',()=>{
  const initial=createInitialAwsLabState();
  const updated=toggleIamRolePolicy(initial,'Lambda-Payments-Role','CloudWatchAgentServerPolicy');
  assert.ok(updated.iamRoles.find(role=>role.name==='Lambda-Payments-Role').attachedPolicies.includes('CloudWatchAgentServerPolicy'));
  assert.ok(!initial.iamRoles.find(role=>role.name==='Lambda-Payments-Role').attachedPolicies.includes('CloudWatchAgentServerPolicy'));
  const detached=toggleIamRolePolicy(updated,'Lambda-Payments-Role','CloudWatchAgentServerPolicy');
  assert.ok(!detached.iamRoles.find(role=>role.name==='Lambda-Payments-Role').attachedPolicies.includes('CloudWatchAgentServerPolicy'));
  assert.deepEqual(detached.iamRoles.find(role=>role.name==='EC2-Production-Role').attachedPolicies,['CloudWatchAgentServerPolicy']);
});
