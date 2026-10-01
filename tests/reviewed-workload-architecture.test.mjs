import test from 'node:test';
import assert from 'node:assert/strict';
import {loadArchitectureModule} from './load-architecture-module.mjs';
const {reviewedWorkloadArchitectures:registry,reviewedWorkloadNodeDetail:lookup,reviewedGcpBoards}=loadArchitectureModule(new URL('../lib/reviewed-workload-architectures.ts',import.meta.url));
const {architectureNodeDetail:describe}=loadArchitectureModule(new URL('../lib/architecture-node-detail.ts',import.meta.url));
const unique=[...new Map(Object.values(registry).flat().map(arch=>[arch.title,arch])).values()];

test('Security Hub response requires approval and targets routed egress',()=>{
 const flow=registry['AWS Security Hub'].find(a=>a.title==='AWS: contain a confirmed malicious outbound destination');
 assert.ok(flow);
 assert.match(lookup(flow.title,'AWS Step Functions'),/approval callback/);
 assert.match(lookup(flow.title,'Firewall remediation Lambda'),/update token/);
 assert.match(lookup(flow.title,'AWS Network Firewall'),/bypasses the endpoints/);
 assert.match(lookup(flow.title,'Incident responder'),/does not remove malware/);
 assert.ok(registry['AWS Network Firewall'].includes(flow));
});
test('Service Bus catalog name uses the reviewed fulfillment flow',()=>{
 assert.deepEqual(registry['Service Bus'],registry['Azure Service Bus']);
 assert.match(registry['Service Bus'][0].title,/fulfillment/);
});
test('recovery and migration distinguish restore, traffic cutover and promotion',()=>{
 assert.match(registry['AWS Backup'][0].title,/restore/);
 const dr=registry['AWS Elastic Disaster Recovery'][0];
 assert.match(lookup(dr.title,'Recovery coordinator'),/does not perform the traffic failover itself/);
 const migration=registry['Database Migration Service'][0];
 assert.match(lookup(migration.title,'Migration operator'),/stops source application writes/);
 assert.match(lookup(migration.title,'Migration operator'),/disconnects the destination/);
});
test('tracing workflows keep application responsibilities separate from export',()=>{
 for(const key of ['AWS X-Ray','Azure Monitor','Trace']){
  const flow=registry[key][0];
  assert.ok(flow.layers[0].nodes.length===2);
  assert.ok(flow.layers[0].nodes.every(n=>n.kind==='app'||n.kind==='data'));
  assert.match(flow.layers.flatMap(l=>l.nodes).find(n=>n.label===key).detail,/engineer/);
 }
});

test('every reviewed node resolves to authored copy for its exact architecture',()=>{
 assert.equal(unique.length,41);
 for(const arch of unique){
  const labels=new Set();
  for(const layer of arch.layers)for(const node of layer.nodes){
   assert.ok(!labels.has(node.label),`${arch.title}: duplicate label would select wrong role`);labels.add(node.label);
   assert.ok(node.detail.length>90,`${arch.title}: ${node.label}`);
   assert.equal(lookup(arch.title,node.label),node.detail);
   assert.equal(describe({label:node.label,sub:node.sub,architecture:arch.title}),node.detail);
   assert.doesNotMatch(node.detail,/in this scenario|managed aws capability|at this point in the flow|configured resource receives/i);
  }
 }
});
test('Cloud Run describes three different business responsibilities',()=>{
 const entries=registry['Cloud Run'].map(arch=>lookup(arch.title,'Cloud Run'));
 assert.equal(new Set(entries).size,3);
 assert.match(entries[0],/resizes|resized|resizes|resize/);
 assert.match(entries[1],/reserve|booking/);
 assert.match(entries[2],/receipt/);
});
test('storage events carry metadata and require application reads',()=>{
 for(const [service,sourceLabel] of [['AWS Lambda','Amazon S3 input bucket'],['Azure Functions','Azure Blob Storage input'],['Cloud Run','Cloud Storage input bucket']]){
  const flow=registry[service][0];
  assert.ok(lookup(flow.title,sourceLabel));
  const handler=flow.layers.flatMap(x=>x.nodes).find(x=>x.label===service);
  assert.match(handler.detail,/read|retriev/i);
 }
});
test('queue acknowledgments are separate from storage writes',()=>{
 assert.match(lookup('AWS: queued invoice generation','Lambda event source mapping'),/deleted|retry/);
 assert.match(lookup('Azure: process fulfillment commands','Azure Functions'),/completes the message only after/);
 assert.match(lookup('GCP: queued receipt generation','Cloud Run'),/acknowledgment response only after/);
});
test('WAF is attached to the ingress layer, not an application backend',()=>{
 for(const [service,waf] of [['AWS WAF','AWS WAF'],['Azure Web Application Firewall','Azure Web Application Firewall'],['Cloud Armor','Cloud Armor']]){
  const arch=registry[service][0];const layer=arch.layers.find(x=>x.nodes.some(n=>n.label===waf));
  assert.equal(layer.nodes.length,2);
  assert.match(lookup(arch.title,waf),/policy|ACL/);
 }
});
test('GCP adapter preserves architecture keys and every node description',()=>{
 for(const service of ['Cloud Run','Cloud Storage','Pub/Sub','Cloud Armor','Cloud Load Balancing','Cloud CDN','Cloud DNS']){
  const boards=reviewedGcpBoards(service);
  assert.equal(boards.length,registry[service].length);
  for(const board of boards)for(const group of board.groups)for(const card of group.cards){
   assert.equal(describe({label:card.label,sub:card.caption,architecture:board.title}),card.detail);
  }
 }
});
