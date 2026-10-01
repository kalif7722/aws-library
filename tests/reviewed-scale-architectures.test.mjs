import test from "node:test";
import assert from "node:assert/strict";
import {loadArchitectureModule} from "./load-architecture-module.mjs";
const {reviewedScaleArchitectures:registry,reviewedScaleBatches:batches}=loadArchitectureModule(new URL("../lib/reviewed-scale-architectures.ts",import.meta.url));
const {reviewedWorkloadNodeDetail:detail,reviewedGcpBoards}=loadArchitectureModule(new URL("../lib/reviewed-workload-architectures.ts",import.meta.url));
const unique=[...new Map(Object.values(registry).flat().map(a=>[a.title,a])).values()];

test("ten batches contain exactly 100 selected service entries",()=>{
 assert.equal(batches.length,10);assert.equal(Object.keys(registry).length,100);
 assert.ok(batches.every(batch=>Object.keys(batch).length===10));
 assert.equal(unique.length,97); // four network controls share one actual application architecture
 assert.ok(!registry.Batch);assert.ok(registry["GCP:Batch"]);
 assert.equal(reviewedGcpBoards("Batch")[0].title,registry["GCP:Batch"][0].title);
});
test("every new architecture has complete explicit topology and hover data",()=>{
 for(const arch of unique){
  const nodes=arch.layers.flatMap(l=>l.nodes),labels=nodes.map(n=>n.label);
  assert.ok(nodes.length>=7,arch.title);assert.equal(new Set(labels).size,labels.length,arch.title);
  for(const node of nodes){assert.ok(node.detail.length>90,node.label);assert.equal(detail(arch.title,node.label),node.detail);}
  assert.ok(arch.connections.length>=nodes.length-1,arch.title);
  for(const edge of arch.connections){assert.ok(labels.includes(edge.from),edge.from);assert.ok(labels.includes(edge.to),edge.to);assert.notEqual(edge.from,edge.to);assert.ok(edge.label);}
  const seen=new Set([labels[0]]);
  for(let i=0;i<labels.length;i++)for(const edge of arch.connections)if(seen.has(edge.from)||seen.has(edge.to)){seen.add(edge.from);seen.add(edge.to);}
  assert.equal(seen.size,labels.length,arch.title+" contains disconnected consumers");
  assert.ok(arch.layers.every(layer=>layer.nodes.length<=4));
 }
});
test("database replacements retain one coherent primary backend path",()=>{
 const labels=key=>registry[key][0].layers.flatMap(l=>l.nodes).map(n=>n.label);
 assert.ok(!labels("Amazon RDS Proxy").includes("Order record table"));
 assert.ok(!labels("Azure Database for PostgreSQL Flexible Server").includes("Azure inventory data"));
 assert.ok(!labels("AlloyDB").includes("Warehouse Cloud SQL records"));
 assert.ok(labels("AlloyDB").includes("AlloyDB"));
});
test("detection, traffic policy and identity are explicit associated branches",()=>{
 const flow=registry["Cloud IDS"][0];
 assert.match(detail(flow.title,"Cloud IDS"),/mirrored packet copies/);
 assert.ok(flow.connections.find(e=>e.to==="Warehouse packet-mirroring policy").control);
 const waf=registry["Amazon VPC"][0];
 assert.match(detail(waf.title,"Order WAF and ALB"),/routes allowed requests to healthy/);
 assert.ok(waf.connections.some(e=>e.from==="Amazon EC2 security groups"&&e.control));
 const approval=registry["Amazon Verified Permissions"][0];
 assert.ok(approval.layers.flatMap(l=>l.nodes).some(n=>n.label==="Invoice approving employee"));
 assert.match(detail(approval.title,"Amazon Verified Permissions"),/returns an authorization decision/i);
});
test("async execution connects real workers to input and durable output",()=>{
 for(const [key,worker,input,output] of [
  ["AWS Batch","Conversion container","Document input bucket","Document result bucket"],
  ["GCP:Batch","Conversion task container","Document Cloud Storage input","Document Cloud Storage results"],
  ["Binary Authorization","Approved GKE workload","Document Cloud Storage input","Document Cloud Storage results"]
 ]){
  const edges=registry[key][0].connections;
  assert.ok(edges.some(e=>e.from===worker&&e.to===input),key);
  assert.ok(edges.some(e=>e.from===worker&&e.to===output),key);
 }
});
