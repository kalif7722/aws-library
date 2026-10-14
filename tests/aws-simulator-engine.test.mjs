import test from 'node:test';
import assert from 'node:assert/strict';
import {loadArchitectureModule} from './load-architecture-module.mjs';

const {createInitialAwsLabState,addSshIngressRule,addNetworkAclRule,updateNetworkAclRule,deleteNetworkAclRule,getAwsInstances,launchAwsInstance,setAwsInstanceState,rebootAwsInstance,evaluateAwsSshReachability,updateS3BucketSetting,toggleIamRolePolicy}=loadArchitectureModule(new URL('../app/troubleshooting/simulators/aws/engine.ts',import.meta.url));

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

test('network ACL rule creation validates priority, ports, and IPv4 CIDR',()=>{
  const initial=createInitialAwsLabState();
  const valid=addNetworkAclRule(initial,{direction:'inbound',ruleNumber:120,protocol:'TCP',ports:'443',source:'10.40.0.0/16',action:'allow'});
  assert.equal(valid.error,null);
  assert.ok(valid.state.networkAcl.some(rule=>rule.direction==='inbound'&&rule.ruleNumber===120&&rule.ports==='443'));
  assert.equal(initial.networkAcl.some(rule=>rule.ruleNumber===120),false);
  assert.match(addNetworkAclRule(initial,{direction:'inbound',ruleNumber:100,protocol:'TCP',ports:'443',source:'10.40.0.0/16',action:'allow'}).error,/already used/);
  assert.match(addNetworkAclRule(initial,{direction:'inbound',ruleNumber:32767,protocol:'TCP',ports:'443',source:'10.40.0.0/16',action:'allow'}).error,/between 1 and 32766/);
  assert.match(addNetworkAclRule(initial,{direction:'inbound',ruleNumber:120,protocol:'TCP',ports:'70000',source:'10.40.0.0/16',action:'allow'}).error,/port/);
  assert.match(addNetworkAclRule(initial,{direction:'inbound',ruleNumber:120,protocol:'TCP',ports:'443',source:'10.40.0.0/33',action:'allow'}).error,/CIDR/);
});


test('network ACL rules can be edited, renumbered, and deleted immutably',()=>{
  const initial=createInitialAwsLabState();
  const edited=updateNetworkAclRule(initial,'inbound',110,{direction:'inbound',ruleNumber:120,protocol:'TCP',ports:'443',source:'10.40.0.0/16',action:'deny'});
  assert.equal(edited.error,null);
  assert.ok(edited.state.networkAcl.some(rule=>rule.direction==='inbound'&&rule.ruleNumber===120&&rule.action==='deny'));
  assert.ok(!edited.state.networkAcl.some(rule=>rule.direction==='inbound'&&rule.ruleNumber===110));
  assert.ok(initial.networkAcl.some(rule=>rule.direction==='inbound'&&rule.ruleNumber===110));
  const duplicate=updateNetworkAclRule(initial,'inbound',110,{direction:'inbound',ruleNumber:100,protocol:'TCP',ports:'443',source:'10.40.0.0/16',action:'deny'});
  assert.match(duplicate.error,/already used/);
  const deleted=deleteNetworkAclRule(edited.state,'inbound',120);
  assert.equal(deleted.deleted,true);
  assert.ok(!deleted.state.networkAcl.some(rule=>rule.direction==='inbound'&&rule.ruleNumber===120));
  assert.equal(deleteNetworkAclRule(deleted.state,'inbound',120).deleted,false);
});


test('launching instances supports a legacy single-instance state and validates configuration',()=>{
  const initial=createInitialAwsLabState();
  const invalid=launchAwsInstance(initial,{name:'api-prod-01',instanceType:'t3.small',subnetId:initial.instance.subnetId,securityGroupIds:initial.instance.securityGroupIds});
  assert.match(invalid.error,/already exists/);
  const noGroup=launchAwsInstance(initial,{name:'worker-02',instanceType:'t3.small',subnetId:initial.instance.subnetId,securityGroupIds:['sg-missing']});
  assert.match(noGroup.error,/valid security group/);
  const launched=launchAwsInstance(initial,{name:'worker-02',instanceType:'t3.small',subnetId:initial.instance.subnetId,securityGroupIds:initial.instance.securityGroupIds,tags:{Environment:'test'}});
  assert.equal(launched.error,null);
  assert.equal(getAwsInstances(launched.state).length,2);
  assert.equal(getAwsInstances(launched.state)[1].name,'worker-02');
  assert.equal(getAwsInstances(launched.state)[1].tags.Environment,'test');
  assert.equal(initial.instances,undefined);
  const stopped=setAwsInstanceState(launched.state,launched.instance.id,'stopped');
  assert.equal(getAwsInstances(stopped)[1].state,'stopped');
  assert.equal(stopped.instance.state,'running');
  const rebooted=rebootAwsInstance(stopped,launched.instance.id);
  assert.equal(getAwsInstances(rebooted)[1].state,'running');
  assert.equal(getAwsInstances(rebooted)[1].instanceStatus,'passed');
});


test('SSH ingress rule targets the selected security group rather than always the primary attachment',()=>{
  const initial=createInitialAwsLabState();
  const updated=addSshIngressRule(initial,'198.51.100.24/32','IPv4','sg-0f55aa11bb22cc33');
  assert.ok(updated.securityGroups.find(group=>group.id==='sg-0f55aa11bb22cc33').ingress.some(rule=>rule.source==='198.51.100.24/32'));
  assert.ok(!updated.securityGroups.find(group=>group.id==='sg-0ab12cd34ef56ab78').ingress.some(rule=>rule.source==='198.51.100.24/32'));
});
