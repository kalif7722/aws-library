import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadArchitectureModule} from './load-architecture-module.mjs';
const {reviewedNextArchitectures:next,reviewedNextBatches:batches}=loadArchitectureModule(new URL('../lib/reviewed-next-architectures.ts',import.meta.url));
const {reviewedWorkloadArchitectures:registry,reviewedGcpBoards}=loadArchitectureModule(new URL('../lib/reviewed-workload-architectures.ts',import.meta.url));
test('ten batches add 100 distinct selected service workflows with connected authored roles',()=>{
 assert.equal(batches.length,10);assert.equal(Object.keys(next).length,100);
 const titles=new Set();
 for(const batch of batches)assert.equal(Object.keys(batch).length,10);
 for(const [service,arches] of Object.entries(next)){
  assert.equal(registry[service],arches,service+' must select the replacement');
  const arch=arches[0];assert.ok(!titles.has(arch.title));titles.add(arch.title);
  assert.match(arch.reference,/^https:\/\/(docs\.aws\.amazon\.com|aws\.amazon\.com|aws\.github\.io)\//);
  const nodes=arch.layers.flatMap(l=>l.nodes);assert.ok(nodes.length>=6);
  const labels=new Set(nodes.map(n=>n.label));assert.equal(labels.size,nodes.length);
  assert.equal(arch.connections.length,nodes.length-1);
  for(const edge of arch.connections){assert.ok(labels.has(edge.from));assert.ok(labels.has(edge.to));}
  for(const node of nodes){assert.ok(node.detail.length>90,service);assert.doesNotMatch(node.detail,/in this scenario|applies that capability|provides.*walkthrough/i);}
 }
});
test('new AWS Audit Manager cannot replace the GCP service of the same name',()=>{
 assert.match(registry['Audit Manager'][0].title,/^AWS:/);assert.match(reviewedGcpBoards('Audit Manager')[0].title,/^GCP:/);
});
test('Athena selects its authored replacement on service and course pages',()=>{
 const source=fs.readFileSync(new URL('../app/components/AthenaLearningDetails.tsx',import.meta.url),'utf8');
 assert.match(source,/<ReviewedArchitectureSections architectures=\{reviewedWorkloadArchitectures\["Amazon Athena"\]\}/);
 assert.ok(!source.includes('id="athena-flow"><div className="section-cap"'));
 for(const file of ['../app/services/page.tsx','../app/components/CertificationCourse.tsx'])assert.match(fs.readFileSync(new URL(file,import.meta.url),'utf8'),/AthenaLearningDetails/);
});
