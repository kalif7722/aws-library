import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadArchitectureModule} from './load-architecture-module.mjs';
const {finalArchitectureBatches:batches,finalArchitectureRecipes:recipes,reviewedFinalArchitectures:final}=loadArchitectureModule(new URL('../lib/reviewed-final-architectures.ts',import.meta.url));
const {reviewedWorkloadArchitectures:all,reviewedWorkloadNodeDetail:detail,reviewedGcpBoards}=loadArchitectureModule(new URL('../lib/reviewed-workload-architectures.ts',import.meta.url));
test('36 batches cover the 357 previously pending service names with unique operations',()=>{
 assert.equal(batches.length,36);assert.equal(recipes.length,357);
 assert.equal(new Set(recipes.map(r=>r.cloud+':'+r.service)).size,357);
 assert.deepEqual(Object.fromEntries(['AWS','Azure','GCP'].map(c=>[c,recipes.filter(r=>r.cloud===c).length])),{AWS:120,Azure:127,GCP:110});
 assert.equal(new Set(recipes.map(r=>r.action)).size,357);
 for(const r of recipes){
  const key=r.cloud==='AWS'?r.service:r.cloud+':'+r.service,arch=all[key][0];
  assert.equal(arch,final[key][0]);assert.ok(arch.layers.flatMap(l=>l.nodes).length>=6);
  const nodes=arch.layers.flatMap(l=>l.nodes),labels=new Set(nodes.map(n=>n.label));
  assert.equal(labels.size,nodes.length);assert.ok(nodes.some(n=>n.label===r.service&&n.detail===r.action));
  for(const edge of arch.connections){assert.ok(labels.has(edge.from));assert.ok(labels.has(edge.to));}
  for(const n of nodes){assert.equal(detail(arch.title,n.label),n.detail);assert.ok(n.detail.length>=65);assert.doesNotMatch(n.detail,/in this scenario|applies that capability|at this point in the flow|provides .*subtitle/i);}
  assert.match(r.reference,/^https:\/\//);
  if(r.cloud==='GCP')assert.equal(reviewedGcpBoards(r.service)[0].title,arch.title);
 }
});
test('provider namespaces distinguish both Audit Managers and both Cloud Shells',()=>{
 assert.match(all['Audit Manager'][0].title,/^AWS:/);
 assert.match(all['GCP:Audit Manager'][0].title,/^GCP:/);
 assert.notEqual(all['Azure:Cloud Shell'][0].title,all['GCP:Cloud Shell'][0].title);
 const azure=fs.readFileSync(new URL('../app/components/AzureServiceLearningDetails.tsx',import.meta.url),'utf8');
 assert.match(azure,/service\.startsWith\("Azure:"\)/);
 assert.match(azure,/architectures\.every\(arch=>arch\.title\.startsWith\("Azure:"\)\)/);
});
test('legacy workflows explicitly teach migration and never claim uninterrupted new provisioning',()=>{
 for(const service of ['AWS App Mesh','AWS OpsWorks (Legacy)','Amazon Elastic Transcoder'])assert.match(all[service][0].note,/Historical workflow/);
 for(const service of ['Azure Blueprints','Azure Database for MariaDB','Azure Spring Apps'])assert.match(all['Azure:'+service][0].title,/historical|transition/);
});
