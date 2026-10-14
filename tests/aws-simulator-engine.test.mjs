import test from 'node:test';
import assert from 'node:assert/strict';
import {loadArchitectureModule} from './load-architecture-module.mjs';

const {createInitialAwsLabState,addSshIngressRule,evaluateAwsSshReachability,updateS3BucketSetting}=loadArchitectureModule(new URL('../app/troubleshooting/simulators/aws/engine.ts',import.meta.url));

test('SSH reachability uses the current attached security-group rules',()=>{
  const initial=createInitialAwsLabState();
  const blocked=evaluateAwsSshReachability(initial);
  assert.equal(blocked.reachable,false);
  assert.equal(blocked.blockedAt,'security-group');
  const updated=addSshIngressRule(initial,'sg-bastion-prod','SecurityGroup');
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
  const inboundBroken={...fixed,networkAcl:[{direction:'inbound',protocol:'TCP',ports:'22',source:'0.0.0.0/0',action:'deny'},...fixed.networkAcl]};
  const inboundResult=evaluateAwsSshReachability(inboundBroken);
  assert.equal(inboundResult.reachable,false);
  assert.equal(inboundResult.blockedAt,'network-acl');
  const outboundBroken={...fixed,networkAcl:[{direction:'outbound',protocol:'TCP',ports:'49152-65535',source:'0.0.0.0/0',action:'deny'},...fixed.networkAcl]};
  const outboundResult=evaluateAwsSshReachability(outboundBroken);
  assert.equal(outboundResult.reachable,false);
  assert.equal(outboundResult.blockedAt,'network-acl');
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
