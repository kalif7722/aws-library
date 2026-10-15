import test from 'node:test';
import assert from 'node:assert/strict';
import {loadArchitectureModule} from './load-architecture-module.mjs';

const {createInitialAwsLabState,addSshIngressRule,addSecurityGroupIngressRule,updateSecurityGroupIngressRule,deleteSecurityGroupIngressRule,addSecurityGroupEgressRule,updateSecurityGroupEgressRule,deleteSecurityGroupEgressRule,addNetworkAclRule,updateNetworkAclRule,deleteNetworkAclRule,getAwsInstances,launchAwsInstance,setAwsInstanceState,rebootAwsInstance,updateAwsInstanceTag,deleteAwsInstanceTag,getAwsVpcs,getAwsSubnets,getAwsRouteTables,associateSubnetWithRouteTable,toggleAwsRouteState,addAwsRoute,updateAwsRoute,deleteAwsRoute,createAwsSubnet,migrateAwsLabState,evaluateAwsSshReachability,updateS3BucketSetting,toggleIamRolePolicy,getAwsLoadBalancers,getAwsTargetGroups,getAwsDatabases,getAwsDnsRecords,getAwsLambdaFunctions,getAwsDynamoTables,getAwsCloudWatchAlarms,evaluateAwsTargetGroupHealth,evaluateAwsLoadBalancerHealth,evaluateAwsDatabaseConnectivity,evaluateAwsDnsRecord,evaluateAwsLambdaReadiness,updateAwsTargetGroupHealthCheck,setAwsDatabaseStatus,updateAwsDnsRecordTarget,setAwsInstanceListenerState}=loadArchitectureModule(new URL('../app/troubleshooting/simulators/aws/engine.ts',import.meta.url));

test('instance lifecycle actions stay scoped and synchronize the legacy primary-instance view',()=>{
  const initial=createInitialAwsLabState();
  const launched=launchAwsInstance(initial,{name:'lifecycle-worker',instanceType:'t3.small',subnetId:initial.instance.subnetId,securityGroupIds:initial.instance.securityGroupIds});
  assert.equal(launched.error,null);
  assert.ok(launched.instance);
  const stopped=setAwsInstanceState(launched.state,launched.instance.id,'stopped');
  assert.equal(getAwsInstances(stopped).find(item=>item.id===launched.instance.id).state,'stopped');
  assert.equal(stopped.instance.id,initial.instance.id);
  assert.equal(stopped.instance.state,initial.instance.state);
  const rebooted=rebootAwsInstance(stopped,launched.instance.id);
  const worker=getAwsInstances(rebooted).find(item=>item.id===launched.instance.id);
  assert.equal(worker.state,'running');
  assert.equal(worker.systemStatus,'passed');
  assert.equal(worker.instanceStatus,'passed');
  assert.equal(rebooted.instance.id,initial.instance.id);
  const primaryStopped=setAwsInstanceState(rebooted,initial.instance.id,'stopped');
  assert.equal(primaryStopped.instance.state,'stopped');
  assert.equal(getAwsInstances(primaryStopped).find(item=>item.id===initial.instance.id).state,'stopped');
  assert.equal(getAwsInstances(rebooted).find(item=>item.id===initial.instance.id).state,'running');
});

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


test('instance tag edits validate keys and update the selected instance only',()=>{
  const initial=createInitialAwsLabState();
  const launched=launchAwsInstance(initial,{name:'worker-02',instanceType:'t3.small',subnetId:initial.instance.subnetId,securityGroupIds:initial.instance.securityGroupIds});
  const updated=updateAwsInstanceTag(launched.state,launched.instance.id,'CostCenter','CC-42');
  assert.equal(updated.error,null);
  assert.equal(getAwsInstances(updated.state)[1].tags.CostCenter,'CC-42');
  const renamed=updateAwsInstanceTag(updated.state,launched.instance.id,'Name','worker-renamed');
  assert.equal(getAwsInstances(renamed.state)[1].name,'worker-renamed');
  assert.equal(getAwsInstances(renamed.state)[1].tags.Name,'worker-renamed');
  assert.match(updateAwsInstanceTag(renamed.state,launched.instance.id,'Name','').error,/cannot be empty/);
  assert.equal(getAwsInstances(updated.state)[0].tags.CostCenter,undefined);
  assert.match(updateAwsInstanceTag(updated.state,launched.instance.id,'aws:reserved','x').error,/reserved/);
  assert.match(updateAwsInstanceTag(updated.state,launched.instance.id,'','x').error,/required/);
  const deleted=deleteAwsInstanceTag(updated.state,launched.instance.id,'CostCenter');
  assert.equal(deleted.error,null);
  assert.equal(getAwsInstances(deleted.state)[1].tags.CostCenter,undefined);
  assert.match(deleteAwsInstanceTag(deleted.state,launched.instance.id,'Name').error,/required/);
});


test('security group ingress rules support validated create edit and delete',()=>{
  const initial=createInitialAwsLabState();
  const groupId='sg-0ab12cd34ef56ab78';
  const added=addSecurityGroupIngressRule(initial,groupId,{protocol:'TCP',fromPort:8080,toPort:8080,sourceType:'IPv4',source:'198.51.100.24/32',description:'Temporary application test'});
  assert.equal(added.error,null);
  assert.ok(added.rule);
  assert.equal(added.state.securityGroups[0].ingress.length,initial.securityGroups[0].ingress.length+1);
  assert.match(addSecurityGroupIngressRule(added.state,groupId,{protocol:'TCP',fromPort:8080,toPort:8080,sourceType:'IPv4',source:'198.51.100.24/32',description:'Duplicate'}).error,/already exists/);
  assert.match(addSecurityGroupIngressRule(initial,groupId,{protocol:'TCP',fromPort:8081,toPort:8080,sourceType:'IPv4',source:'198.51.100.24/32',description:'Invalid range'}).error,/port range/);
  assert.match(addSecurityGroupIngressRule(initial,groupId,{protocol:'TCP',fromPort:8080,toPort:8080,sourceType:'IPv4',source:'10.0.0.0/33',description:'Invalid CIDR'}).error,/CIDR/);
  const edited=updateSecurityGroupIngressRule(added.state,groupId,added.rule.id,{protocol:'TCP',fromPort:8443,toPort:8443,sourceType:'IPv4',source:'198.51.100.24/32',description:'Updated application test'});
  assert.equal(edited.error,null);
  assert.equal(edited.state.securityGroups[0].ingress.find(rule=>rule.id===added.rule.id).fromPort,8443);
  const deleted=deleteSecurityGroupIngressRule(edited.state,groupId,added.rule.id);
  assert.equal(deleted.deleted,true);
  assert.ok(!deleted.state.securityGroups[0].ingress.some(rule=>rule.id===added.rule.id));
  assert.equal(initial.securityGroups[0].ingress.some(rule=>rule.id===added.rule.id),false);
});


test('route table association updates the subnet graph and effective routes',()=>{
  const initial=createInitialAwsLabState();
  const moved=associateSubnetWithRouteTable(initial,'subnet-0123abcd4567ef890','rtb-0fedcba9876543210');
  assert.equal(moved.error,null);
  assert.equal(getAwsSubnets(moved.state).find(subnet=>subnet.id==='subnet-0123abcd4567ef890').routeTableId,'rtb-0fedcba9876543210');
  assert.ok(getAwsRouteTables(moved.state).find(table=>table.id==='rtb-0fedcba9876543210').associatedSubnetIds.includes('subnet-0123abcd4567ef890'));
  assert.ok(!getAwsRouteTables(moved.state).find(table=>table.id==='rtb-0123abcd4567ef890').associatedSubnetIds.includes('subnet-0123abcd4567ef890'));
  assert.ok(moved.state.routes.some(route=>route.target==='igw-0123abcd4567ef890'));
  const invalid=associateSubnetWithRouteTable(initial,'subnet-0123abcd4567ef890','rtb-does-not-exist');
  assert.match(invalid.error,/Route table not found/);
  assert.equal(getAwsVpcs(initial).length,1);
  assert.equal(getAwsSubnets(initial).length,4);
});

test('route edits stay in the selected route table and update effective reachability routes',()=>{
  const initial=createInitialAwsLabState();
  const updated=toggleAwsRouteState(initial,'rtb-0123abcd4567ef890','10.20.0.0/16');
  assert.equal(updated.error,null);
  assert.equal(updated.state.routes.find(route=>route.destination==='10.20.0.0/16').state,'blackhole');
  assert.equal(getAwsRouteTables(updated.state).find(table=>table.id==='rtb-0123abcd4567ef890').routes.find(route=>route.destination==='10.20.0.0/16').state,'blackhole');
  const publicRoute=toggleAwsRouteState(initial,'rtb-0fedcba9876543210','0.0.0.0/0');
  assert.equal(publicRoute.state.routes.find(route=>route.destination==='0.0.0.0/0').target,'nat-0123abcd4567ef890');
});

test('legacy saved state migration preserves existing route faults and supplies subnet relationships',()=>{
  const initial=createInitialAwsLabState();
  const legacy={...initial,vpcs:undefined,subnets:undefined,routeTables:undefined,instances:undefined,routes:initial.routes.map(route=>route.target==='local'?{...route,state:'blackhole'}:route)};
  const migrated=migrateAwsLabState(legacy);
  assert.equal(getAwsSubnets(migrated).find(subnet=>subnet.id===migrated.instance.subnetId).routeTableId,'rtb-0123abcd4567ef890');
  assert.equal(getAwsRouteTables(migrated)[0].routes.find(route=>route.target==='local').state,'blackhole');
  assert.equal(migrated.instance.tags.Name,migrated.instance.name);
});


test('migration restores required graph resources from empty arrays',()=>{
  const initial=createInitialAwsLabState();
  const migrated=migrateAwsLabState({...initial,vpcs:[],subnets:[],routeTables:[],instances:[]});
  assert.ok(getAwsVpcs(migrated).length>0);
  assert.ok(getAwsSubnets(migrated).length>0);
  assert.ok(getAwsRouteTables(migrated).length>0);
});


test('reachability analysis uses the target instance subnet and attached security groups',()=>{
  const initial=createInitialAwsLabState();
  const launched=launchAwsInstance(initial,{name:'public-worker',instanceType:'t3.small',subnetId:'subnet-0fedcba9876543210',securityGroupIds:['sg-0ab12cd34ef56ab78']});
  assert.equal(launched.error,null);
  const blocked=evaluateAwsSshReachability(launched.state,'sg-bastion-prod',launched.instance.id);
  assert.equal(blocked.reachable,false);
  assert.equal(blocked.blockedAt,'security-group');
  const allowedRule=addSecurityGroupIngressRule(launched.state,'sg-0ab12cd34ef56ab78',{protocol:'TCP',fromPort:22,toPort:22,sourceType:'SecurityGroup',source:'sg-bastion-prod',description:'Admin SSH'});
  const allowed=evaluateAwsSshReachability(allowedRule.state,'sg-bastion-prod',launched.instance.id);
  assert.equal(allowed.reachable,true);
  const brokenRoute=toggleAwsRouteState(allowedRule.state,'rtb-0fedcba9876543210','10.20.0.0/16');
  const blockedByRoute=evaluateAwsSshReachability(brokenRoute.state,'sg-bastion-prod',launched.instance.id);
  assert.equal(blockedByRoute.reachable,false);
  assert.equal(blockedByRoute.blockedAt,'route');
});


test('route CRUD validates destinations targets duplicates and immutable local routes',()=>{
  const initial=createInitialAwsLabState();
  const added=addAwsRoute(initial,'rtb-0123abcd4567ef890','172.16.0.0/16','nat-0123abcd4567ef890');
  assert.equal(added.error,null);
  assert.ok(getAwsRouteTables(added.state).find(table=>table.id==='rtb-0123abcd4567ef890').routes.some(route=>route.destination==='172.16.0.0/16'));
  assert.match(addAwsRoute(added.state,'rtb-0123abcd4567ef890','172.16.0.0/16','nat-0123abcd4567ef890').error,/already exists/);
  assert.match(addAwsRoute(initial,'rtb-0123abcd4567ef890','172.16.0.0/33','nat-0123abcd4567ef890').error,/valid IPv4/);
  assert.match(addAwsRoute(initial,'rtb-0123abcd4567ef890','172.16.0.0/16','nat-does-not-exist').error,/known target/);
  const edited=updateAwsRoute(added.state,'rtb-0123abcd4567ef890','172.16.0.0/16','172.17.0.0/16','igw-0123abcd4567ef890');
  assert.equal(edited.error,null);
  assert.equal(getAwsRouteTables(edited.state).find(table=>table.id==='rtb-0123abcd4567ef890').routes.find(route=>route.destination==='172.17.0.0/16').target,'igw-0123abcd4567ef890');
  assert.match(updateAwsRoute(initial,'rtb-0123abcd4567ef890','10.20.0.0/16','10.20.0.0/16','nat-0123abcd4567ef890').error,/local route cannot be edited/);
  const deleted=deleteAwsRoute(edited.state,'rtb-0123abcd4567ef890','172.17.0.0/16');
  assert.equal(deleted.error,null);
  assert.ok(!getAwsRouteTables(deleted.state).find(table=>table.id==='rtb-0123abcd4567ef890').routes.some(route=>route.destination==='172.17.0.0/16'));
  assert.match(deleteAwsRoute(initial,'rtb-0123abcd4567ef890','10.20.0.0/16').error,/local route cannot be deleted/);
});


test('security group egress CRUD keeps outbound rules separate from ingress',()=>{
  const initial=createInitialAwsLabState();
  const groupId='sg-0ab12cd34ef56ab78';
  const initialGroup=initial.securityGroups.find(group=>group.id===groupId);
  assert.equal(initialGroup.egress.length,1);
  const added=addSecurityGroupEgressRule(initial,groupId,{protocol:'TCP',fromPort:443,toPort:443,sourceType:'IPv4',source:'203.0.113.0/24',description:'Outbound HTTPS to partner'});
  assert.equal(added.error,null);
  assert.equal(added.state.securityGroups.find(group=>group.id===groupId).egress.length,2);
  assert.equal(added.state.securityGroups.find(group=>group.id===groupId).ingress.length,initialGroup.ingress.length);
  const edited=updateSecurityGroupEgressRule(added.state,groupId,added.rule.id,{protocol:'TCP',fromPort:8443,toPort:8443,sourceType:'IPv4',source:'203.0.113.0/24',description:'Updated partner traffic'});
  assert.equal(edited.error,null);
  assert.equal(edited.state.securityGroups.find(group=>group.id===groupId).egress.find(rule=>rule.id===added.rule.id).fromPort,8443);
  const deleted=deleteSecurityGroupEgressRule(edited.state,groupId,added.rule.id);
  assert.equal(deleted.deleted,true);
  assert.equal(deleted.state.securityGroups.find(group=>group.id===groupId).egress.length,1);
});


test('network ACL protocol validation supports all-traffic wildcard ports',()=>{
  const initial=createInitialAwsLabState();
  const allTraffic=addNetworkAclRule(initial,{direction:'inbound',ruleNumber:130,protocol:'ALL',ports:'-1',source:'10.20.0.0/16',action:'allow'});
  assert.equal(allTraffic.error,null);
  assert.ok(allTraffic.state.networkAcl.some(rule=>rule.ruleNumber===130&&rule.protocol==='ALL'&&rule.ports==='-1'));
  assert.match(addNetworkAclRule(initial,{direction:'inbound',ruleNumber:131,protocol:'ICMP',ports:'ALL',source:'10.20.0.0/16',action:'allow'}).error,/Choose TCP/);
});


test('subnet creation validates CIDR overlap and route table VPC',()=>{
  const initial=createInitialAwsLabState();
  const created=createAwsSubnet(initial,{name:'application-subnet',cidr:'10.20.5.0/24',availabilityZone:'eu-west-1a',vpcId:'vpc-0123abcd4567ef890',routeTableId:'rtb-0123abcd4567ef890'});
  assert.equal(created.error,null);
  assert.ok(getAwsSubnets(created.state).some(subnet=>subnet.id===created.subnet.id&&subnet.cidr==='10.20.5.0/24'));
  assert.ok(getAwsRouteTables(created.state).find(table=>table.id==='rtb-0123abcd4567ef890').associatedSubnetIds.includes(created.subnet.id));
  assert.match(createAwsSubnet(initial,{name:'overlap-subnet',cidr:'10.20.2.128/25',availabilityZone:'eu-west-1a',vpcId:'vpc-0123abcd4567ef890',routeTableId:'rtb-0123abcd4567ef890'}).error,/overlaps/);
  assert.match(createAwsSubnet(initial,{name:'wrong-table-subnet',cidr:'10.20.5.0/24',availabilityZone:'eu-west-1a',vpcId:'vpc-0123abcd4567ef890',routeTableId:'rtb-wrong-vpc'}).error,/route table in the selected VPC/);
});


test('shared service graph seeds connected ALB, target groups, RDS, DNS, Lambda, DynamoDB and alarms',()=>{
  const state=createInitialAwsLabState();
  assert.equal(state.schemaVersion,3);
  assert.equal(getAwsLoadBalancers(state)[0].listeners[0].targetGroupId,'tg-payments-api');
  assert.equal(evaluateAwsLoadBalancerHealth(state,'alb-payments-prod').healthy,true);
  assert.equal(evaluateAwsTargetGroupHealth(state,'tg-payments-api').healthy,true);
  assert.equal(evaluateAwsTargetGroupHealth(state,'tg-payments-admin').healthy,false);
  assert.equal(evaluateAwsDatabaseConnectivity(state,state.instance.id,'orders-prod').healthy,true);
  assert.equal(evaluateAwsDnsRecord(state,'record-api').healthy,true);
  assert.equal(getAwsDynamoTables(state).length,2);
  assert.equal(getAwsLambdaFunctions(state).length,2);
  assert.equal(evaluateAwsLambdaReadiness(state,'payments-authorizer').healthy,true);
  assert.equal(evaluateAwsLambdaReadiness(state,'orders-event-handler').healthy,false);
  assert.deepEqual(getAwsCloudWatchAlarms(state).map(alarm=>alarm.state),['OK','OK','ALARM']);
});

test('target health-check configuration changes health and the related CloudWatch alarm',()=>{
  const initial=createInitialAwsLabState();
  const broken=updateAwsTargetGroupHealthCheck(initial,'tg-payments-api','/ready');
  assert.equal(broken.error,null);
  assert.equal(evaluateAwsTargetGroupHealth(broken.state,'tg-payments-api').healthy,false);
  assert.equal(getAwsCloudWatchAlarms(broken.state).find(alarm=>alarm.name==='payments-target-health').state,'ALARM');
  const restored=updateAwsTargetGroupHealthCheck(broken.state,'tg-payments-api','/health');
  assert.equal(restored.error,null);
  assert.equal(evaluateAwsTargetGroupHealth(restored.state,'tg-payments-api').healthy,true);
  assert.match(updateAwsTargetGroupHealthCheck(initial,'tg-payments-api','bad path').error,/start with/);
});

test('application listener state drives target group and load balancer health',()=>{
  const initial=createInitialAwsLabState();
  const stopped=setAwsInstanceListenerState(initial,initial.instance.id,8080,'stopped');
  assert.equal(stopped.error,null);
  assert.equal(evaluateAwsTargetGroupHealth(stopped.state,'tg-payments-api').healthy,false);
  assert.equal(evaluateAwsLoadBalancerHealth(stopped.state,'alb-payments-prod').healthy,false);
  const restored=setAwsInstanceListenerState(stopped.state,initial.instance.id,8080,'listening');
  assert.equal(evaluateAwsLoadBalancerHealth(restored.state,'alb-payments-prod').healthy,true);
});

test('RDS availability and database security rules drive private application connectivity',()=>{
  const initial=createInitialAwsLabState();
  const stopped=setAwsDatabaseStatus(initial,'orders-prod','stopped');
  assert.equal(stopped.error,null);
  assert.equal(evaluateAwsDatabaseConnectivity(stopped.state,initial.instance.id,'orders-prod').healthy,false);
  assert.equal(getAwsCloudWatchAlarms(stopped.state).find(alarm=>alarm.name==='orders-db-connections').state,'ALARM');
  const fixedSg={...initial,securityGroups:initial.securityGroups.map(group=>group.id==='sg-rds-orders'?{...group,ingress:[]}:group)};
  assert.equal(evaluateAwsDatabaseConnectivity(fixedSg,initial.instance.id,'orders-prod').healthy,false);
  assert.equal(evaluateAwsDatabaseConnectivity(initial,initial.instance.id,'orders-prod').healthy,true);
});

test('Route 53 records resolve through resource references and surface stale targets',()=>{
  const initial=createInitialAwsLabState();
  assert.equal(evaluateAwsDnsRecord(initial,'record-api').healthy,true);
  const changed=updateAwsDnsRecordTarget(initial,'record-api','database','orders-prod');
  assert.equal(changed.error,null);
  assert.equal(evaluateAwsDnsRecord(changed.state,'record-api').healthy,false);
  const restored=updateAwsDnsRecordTarget(changed.state,'record-api','load-balancer','alb-payments-prod');
  assert.equal(evaluateAwsDnsRecord(restored.state,'record-api').healthy,true);
});

test('Lambda role policy state affects readiness and the CloudWatch alarm',()=>{
  const initial=createInitialAwsLabState();
  assert.equal(evaluateAwsLambdaReadiness(initial,'orders-event-handler').healthy,false);
  const fixed=toggleIamRolePolicy(initial,'Lambda-Payments-Role','DynamoDBOrdersWrite');
  assert.equal(evaluateAwsLambdaReadiness(fixed,'orders-event-handler').healthy,true);
  assert.equal(getAwsCloudWatchAlarms(fixed).find(alarm=>alarm.name==='orders-event-handler-errors').state,'OK');
});

test('legacy account migration adds new service graph once and preserves later target health faults',()=>{
  const initial=createInitialAwsLabState();
  const old={...initial};
  delete old.schemaVersion;
  delete old.loadBalancers;
  delete old.targetGroups;
  delete old.databases;
  delete old.dnsRecords;
  delete old.lambdaFunctions;
  delete old.dynamoTables;
  delete old.cloudWatchAlarmDefinitions;
  old.securityGroups=old.securityGroups.filter(group=>group.id!=='sg-alb-payments'&&group.id!=='sg-rds-orders').map(group=>group.id==='sg-0ab12cd34ef56ab78'?{...group,ingress:group.ingress.filter(rule=>rule.id!=='sgr-alb-8080')}:group);
  delete old.instance.listeners;
  delete old.instance.healthCheckPaths;
  const migrated=migrateAwsLabState(old);
  assert.equal(migrated.schemaVersion,3);
  assert.ok(getAwsLoadBalancers(migrated).length>0);
  assert.ok(migrated.securityGroups.find(group=>group.id==='sg-0ab12cd34ef56ab78').ingress.some(rule=>rule.id==='sgr-alb-8080'));
  const broken=updateAwsTargetGroupHealthCheck(migrated,'tg-payments-api','/ready').state;
  const reloaded=migrateAwsLabState(broken);
  assert.equal(evaluateAwsTargetGroupHealth(reloaded,'tg-payments-api').healthy,false);
});
