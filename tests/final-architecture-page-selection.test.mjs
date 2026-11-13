import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createServer} from 'vite';
import {loadArchitectureModule} from './load-architecture-module.mjs';
const {finalArchitectureRecipes:recipes}=loadArchitectureModule(new URL('../lib/reviewed-final-architectures.ts',import.meta.url));
const vite=await createServer({configFile:false,server:{middlewareMode:true,hmr:false}});after(()=>vite.close());
test('every pending Azure page actually displays its explicit replacement and hover nodes',async()=>{
 const {default:Page}=await vite.ssrLoadModule('/app/components/AzureServiceLearningDetails.tsx');
 for(const r of recipes.filter(r=>r.cloud==='Azure')){
  const html=renderToStaticMarkup(React.createElement(Page,{serviceName:r.service}));
  assert.ok(html.includes('directional architecture'),r.service+' must render');
  assert.ok(html.includes(r.action.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;')),r.service+' exact responsibility must render');
  assert.ok((html.match(/data-architecture-detail=/g)||[]).length>=6,r.service);
 }
});
test('every pending AWS page selects authored data through its actual renderer route',async()=>{
 const {default:Aip,hasAipLearningDetails}=await vite.ssrLoadModule('/app/components/AipServiceLearningDetailsV8.tsx');
 const {default:Analytics,analyticsDetailServices}=await vite.ssrLoadModule('/app/components/AnalyticsLearningDetails.tsx');
 const {default:Cross}=await vite.ssrLoadModule('/app/components/CrossCourseLearningDetails.tsx');
 for(const r of recipes.filter(r=>r.cloud==='AWS')){
  const Page=analyticsDetailServices.has(r.service)?Analytics:hasAipLearningDetails(r.service)?Aip:Cross;
  const html=renderToStaticMarkup(React.createElement(Page,{serviceName:r.service,category:'Architecture learning',summary:r.title}));
  assert.ok((html.match(/data-architecture-detail=/g)||[]).length>=6,r.service+' must select an explicit workflow');
  assert.ok(html.includes('AWS:'),r.service);
 }
});
test('every pending GCP page displays its exact service responsibility',async()=>{
 const {default:Page}=await vite.ssrLoadModule('/app/components/GcpSharedServiceSections.tsx');
 const {gcpServices,gcpContent}=await vite.ssrLoadModule('/app/gcp-data.ts');
 for(const r of recipes.filter(r=>r.cloud==='GCP')){
  const entry=gcpServices.find(s=>s.displayName===r.service||s.canonicalName===r.service);
  assert.ok(entry,r.service);
  const html=renderToStaticMarkup(React.createElement(Page,{serviceName:r.service,details:gcpContent[entry.slug]}));
  assert.ok(html.includes(r.action.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;')),r.service+' exact responsibility must render');
  assert.ok((html.match(/data-architecture-detail=/g)||[]).length>=6,r.service);
 }
});
