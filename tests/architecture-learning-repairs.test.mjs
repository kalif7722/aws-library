import test from 'node:test';
import assert from 'node:assert/strict';
import {loadArchitectureModule} from './load-architecture-module.mjs';
const {reviewedWorkloadArchitectures:registry}=loadArchitectureModule(new URL('../lib/reviewed-workload-architectures.ts',import.meta.url));
const {learningRepairTitles}=loadArchitectureModule(new URL('../lib/reviewed-learning-repairs.ts',import.meta.url));
const unique=[...new Map(Object.values(registry).flat().map(arch=>[arch.title,arch])).values()];
test('all 35 short reviewed examples have authored dependencies and valid connections',()=>{
 assert.equal(learningRepairTitles.length,35);
 for(const title of learningRepairTitles){
  const arch=unique.find(a=>a.title===title),nodes=arch.layers.flatMap(l=>l.nodes),labels=new Set(nodes.map(n=>n.label));
  assert.ok(nodes.length>=5,title);assert.equal(labels.size,nodes.length,title);
  assert.deepEqual(new Set(arch.learningPath.flatMap(l=>l.nodes).map(n=>n.label)),labels,title);
  assert.ok(arch.connections.length>=nodes.length-1,title);
  for(const edge of arch.connections){assert.ok(labels.has(edge.from)&&labels.has(edge.to),title);assert.notEqual(edge.from,edge.to);assert.ok(edge.label);}
  const seen=new Set([nodes[0].label]);
  for(let i=0;i<nodes.length;i++)for(const edge of arch.connections)if(seen.has(edge.from)||seen.has(edge.to)){seen.add(edge.from);seen.add(edge.to);}
  assert.equal(seen.size,nodes.length,title);
  for(const node of nodes)assert.ok(node.detail.length>90,node.label);
 }
 assert.equal(unique.filter(a=>a.layers.flatMap(l=>l.nodes).length<=4).length,0);
});
test('Cognito sign-in is a separate branch from protected API invocation',()=>{
 const arch=registry['Amazon Cognito'][0];
 assert.ok(arch.connections.some(e=>e.from==='Customer application'&&e.to==='Amazon Cognito'));
 assert.ok(arch.connections.some(e=>e.from==='Customer application'&&e.to==='Order history API Gateway'));
 assert.ok(!arch.connections.some(e=>e.from==='Amazon Cognito'&&e.to==='Order history API'));
});
test('Cloud NAT configuration is distinct from the provider request path',()=>{
 const arch=registry['Cloud NAT'][0];
 assert.ok(arch.connections.find(e=>e.from==='Cloud NAT').control);
 assert.ok(arch.connections.some(e=>e.from==='Private Compute Engine worker'&&e.to==='Distributed Public NAT data plane'&&!e.control));
});
