import test,{after} from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {createServer} from "vite";
import {loadArchitectureModule} from "./load-architecture-module.mjs";
const vite=await createServer({configFile:false,server:{middlewareMode:true,hmr:false}});
after(()=>vite.close());
const {reviewedScaleArchitectures:registry}=loadArchitectureModule(new URL("../lib/reviewed-scale-architectures.ts",import.meta.url));
test("all 100 service diagrams render every node and a readable connection list",async()=>{
 const {default:Sections}=await vite.ssrLoadModule("/app/components/ReviewedArchitectureSections.tsx");
 for(const [service,architectures] of Object.entries(registry)){
  const expected=architectures[0].layers.flatMap(l=>l.nodes).length;
  const html=renderToStaticMarkup(React.createElement(Sections,{architectures,anchor:"architecture",provider:architectures[0].title.startsWith("GCP:")?"gcp":"aws"}));
  assert.equal((html.match(/data-topology-node=/g)||[]).length,expected,service);
  assert.equal((html.match(/data-architecture-detail=/g)||[]).length,expected,service);
  assert.match(html,/Connections · solid/);
  for(const edge of architectures[0].connections)assert.ok(html.includes(edge.label),service+": missing connection caption");
 }
});
