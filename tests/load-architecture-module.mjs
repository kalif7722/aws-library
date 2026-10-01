import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
const cache=new Map();
export function loadArchitectureModule(input){
 const file=input instanceof URL?fileURLToPath(input):input;
 if(cache.has(file))return cache.get(file);
 const exports={};cache.set(file,exports);
 const source=fs.readFileSync(file,'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const require=specifier=>{
  if(!specifier.startsWith('.'))throw new Error(`Unexpected dependency in architecture data: ${specifier}`);
  return loadArchitectureModule(path.resolve(path.dirname(file),specifier+'.ts'));
 };
 new Function('exports','require',code)(exports,require);
 return exports;
}
