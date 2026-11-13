import test from 'node:test';
import assert from 'node:assert/strict';
import {loadArchitectureModule} from './load-architecture-module.mjs';
const {reviewedScaleArchitectures:r}=loadArchitectureModule(new URL('../lib/reviewed-scale-architectures.ts',import.meta.url));
test('Inspector release example contains the actual build, replacement verification and release gate',()=>{
 const arch=r['Amazon Inspector'][0],nodes=arch.layers.flatMap(l=>l.nodes);
 assert.ok(nodes.length>4);
 assert.ok(nodes.some(n=>n.label==='Patched container build'));
 assert.ok(nodes.some(n=>n.label==='Container release gate'));
 assert.ok(nodes.some(n=>n.label==='Amazon ECS application service'));
 assert.ok(!nodes.some(n=>/Order portal|CloudFront|Cognito|Order record/.test(n.label)));
 assert.match(nodes.find(n=>n.label==='Replacement ECR image').detail,/new digest.*checks the vulnerability policy again/);
});
test('Reachability example diagnoses a specific rule and separately verifies a live database query',()=>{
 const arch=r['VPC Reachability Analyzer'][0],nodes=arch.layers.flatMap(l=>l.nodes);
 assert.ok(nodes.length>4);
 assert.match(nodes.find(n=>n.label==='VPC Reachability Analyzer').detail,/does not send database requests/);
 assert.ok(arch.connections.some(e=>e.from==='Database connectivity test'&&e.to==='Inventory RDS database'&&!e.control));
 assert.ok(!nodes.some(n=>/load balancer|Corporate inventory client/.test(n.label)));
});
