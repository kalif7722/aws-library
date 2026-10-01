import test,{after} from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {createServer} from "vite";
import {loadArchitectureModule} from "./load-architecture-module.mjs";
const vite=await createServer({configFile:false,server:{middlewareMode:true,hmr:false}});
after(()=>vite.close());
const {reviewedScaleArchitectures:registry}=loadArchitectureModule(new URL("../lib/reviewed-scale-architectures.ts",import.meta.url));
const {reviewedWorkloadArchitectures:allReviewed}=loadArchitectureModule(new URL("../lib/reviewed-workload-architectures.ts",import.meta.url));
test("all 100 service diagrams render every node in the restored directional format",async()=>{
 const {default:Sections}=await vite.ssrLoadModule("/app/components/ReviewedArchitectureSections.tsx");
 for(const [service,architectures] of Object.entries(registry)){
  const expected=architectures[0].layers.flatMap(l=>l.nodes).length;
  const html=renderToStaticMarkup(React.createElement(Sections,{architectures,anchor:"architecture",provider:architectures[0].title.startsWith("GCP:")?"gcp":"aws"}));
  assert.equal((html.match(/data-topology-node=/g)||[]).length,expected,service);
  assert.equal((html.match(/data-architecture-detail=/g)||[]).length,expected,service);
  assert.match(html,/directional architecture/);
  assert.match(html,/v8-connector/);
  assert.ok(!html.includes("architecture-lesson-stage"));
  assert.ok(!html.includes("architecture-node-connections"));
  assert.ok(!html.includes("architecture-topology-edges"));
  const targets=new Set([...html.matchAll(/id="([^"]+)"/g)].map(match=>match[1]));
  for(const link of html.matchAll(/href="#([^"]+)"/g))assert.ok(targets.has(link[1]),service+": missing destination anchor");
 }
});
test("all 303 reviewed workflows retain every role, hover detail and learning-stage node",async()=>{
 const {default:Sections}=await vite.ssrLoadModule("/app/components/ReviewedArchitectureSections.tsx");
 const unique=[...new Map(Object.values(allReviewed).flat().map(arch=>[arch.title,arch])).values()];
 assert.equal(unique.length,303);
 for(const arch of unique){
  const html=renderToStaticMarkup(React.createElement(Sections,{architectures:[arch],anchor:"architecture",provider:arch.title.startsWith("GCP:")?"gcp":"aws"}));
  const count=arch.layers.flatMap(layer=>layer.nodes).length;
  assert.equal((html.match(/data-topology-node=/g)||[]).length,count,arch.title);
  assert.equal((html.match(/data-architecture-detail=/g)||[]).length,count,arch.title);
  const targets=new Set([...html.matchAll(/id="([^"]+)"/g)].map(match=>match[1]));
  for(const link of html.matchAll(/href="#([^"]+)"/g))assert.ok(targets.has(link[1]),arch.title);
 }
});
