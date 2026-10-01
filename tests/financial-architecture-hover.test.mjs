import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import {loadArchitectureModule} from './load-architecture-module.mjs';
const source=fs.readFileSync(new URL('../lib/financial-architectures.ts',import.meta.url),'utf8');
const compiled=ts.transpile(source,{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022});
const exports={};
new Function('exports',compiled)(exports);
const {financialArchitectures,financialNodeDetail}=exports;
test('every financial architecture node has explicit flow-specific hover copy',()=>{
 let count=0;
 for(const arches of Object.values(financialArchitectures))for(const arch of arches)for(const layer of arch.layers)for(const node of layer.nodes){
  assert.ok(node.detail.length>70,`${arch.title}: ${node.label}`);
  assert.equal(financialNodeDetail(arch.title,node.label),node.detail);
  assert.doesNotMatch(node.detail,/managed aws capability|at this point in the flow|in this scenario|configured resource receives/i);
  count++;
 }
 assert.equal(count,21);
});
test('same service has distinct explanations for alerting and action workflows',()=>{
 const alert=financialNodeDetail('Monthly project spend alert','AWS Budgets');
 const action=financialNodeDetail('Approval-controlled budget action','AWS Budgets');
 assert.notEqual(alert,action);
 assert.match(alert,/not a hard spending cap/);
 assert.match(action,/Ordinary budget notifications do not automatically restrict/);
});
test('cost dimensions are report attributes rather than execution services',()=>{
 assert.match(financialNodeDetail('Interactive FinOps analysis','Account / service / tag'),/not processing services/);
 assert.equal(financialNodeDetail('unreviewed flow','AWS Budgets'),undefined);
});
test('shared resolver selects financial flow copy before role heuristics',()=>{
 const resolver=loadArchitectureModule(new URL('../lib/architecture-node-detail.ts',import.meta.url));
 const describe=resolver.architectureNodeDetail;
 assert.equal(describe({label:'AWS Budgets',sub:'Managed AWS capability',architecture:'Monthly project spend alert'}),financialNodeDetail('Monthly project spend alert','AWS Budgets'));
 assert.match(describe({label:'AWS Budgets',sub:'Metrics / logs'}),/actual or forecast cost/);
 assert.match(describe({label:'AWS Cost Explorer',sub:'Filter / group / forecast',architecture:'Interactive FinOps analysis'}),/ungrouped forecast/);
 assert.match(describe({label:'Elastic Load Balancing',sub:'Traffic'}),/distributes/);
 assert.doesNotMatch(describe({label:'Elastic Load Balancing',sub:'Traffic'}),/executes traffic/);
});
