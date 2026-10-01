// Explicit-registry coverage only; existing category templates do not count as reviewed.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import {loadArchitectureModule} from '../tests/load-architecture-module.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function literalArray(file,key){
 const source=fs.readFileSync(path.join(root,file),'utf8');
 const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true);
 let value;
 function walk(node){
  if(ts.isVariableDeclaration(node)&&node.name.getText(ast)===key){
   // These catalog arrays are repository-owned literal data, not user input.
   if(!ts.isArrayLiteralExpression(node.initializer))throw new Error(`Nonliteral catalog ${key}`);
   value=new Function(`return (${node.initializer.getText(ast)})`)();
  }
  ts.forEachChild(node,walk);
 }
 walk(ast);if(!value)throw new Error(`Missing catalog ${key}`);return value;
}
const {reviewedWorkloadArchitectures:registry}=loadArchitectureModule(path.join(root,'lib/reviewed-workload-architectures.ts'));
const {financialArchitectures}=loadArchitectureModule(path.join(root,'lib/financial-architectures.ts'));
const reviewedNames=new Set([...Object.keys(registry),...Object.keys(financialArchitectures)]);
const azure=new Map();
for(const branch of literalArray('app/azure-data.ts','azureBranches'))for(const service of branch.services)if(!azure.has(service.slug))azure.set(service.slug,service.name);
const catalogs={
 AWS:literalArray('app/services/page.tsx','services').map(s=>s.name),
 Azure:[...azure.values()],
 GCP:JSON.parse(fs.readFileSync(path.join(root,'docs/gcp/gcp-services.json'),'utf8')).services.map(s=>s.displayName),
};
const arches=[...new Map(Object.values(registry).flat().map(a=>[a.title,a])).values()];
const summary={reviewedWorkflows:arches.length,explicitNodes:arches.flatMap(a=>a.layers.flatMap(l=>l.nodes)).length,clouds:{}};
let doc='# Architecture walkthrough review status\n\nCompleted means the currently selected explicit replacement workflows were reviewed, not every historical diagram or possible workload. Pending means node-by-node semantic review is still required even where diagrams already exist. Counts deduplicate catalog services and exclude registry-only aliases.\n';
for(const [cloud,names] of Object.entries(catalogs)){
 const all=[...new Set(names)].sort();
 const completed=all.filter(n=>reviewedNames.has(n)),pending=all.filter(n=>!reviewedNames.has(n));
 summary.clouds[cloud]={total:all.length,completed:completed.length,pending:pending.length};
 doc+=`\n## ${cloud}: ${completed.length} completed, ${pending.length} pending\n\n### Completed\n\n${completed.map(n=>'- '+n).join('\n')}\n\n### Pending\n\n${pending.map(n=>'- '+n).join('\n')}\n`;
}
doc+='\n## Catalog gaps\n\nOrganization Policy has authored workflow data but no matching entry in the current GCP catalog. It is excluded from completed coverage.\n\nRegenerate with `node scripts/report-architecture-review.mjs`.\n';
fs.writeFileSync(path.join(root,'docs/ARCHITECTURE_REVIEW_SERVICE_LIST.md'),doc);
console.log(JSON.stringify(summary,null,2));
