// Structural discovery only. A match is a review candidate, not semantic approval.
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const files=[
 'app/components/AipServiceLearningDetailsV8.tsx',
 'app/components/CrossCourseLearningDetails.tsx',
 'app/components/AipArchitectureOverrides.ts',
 'app/components/AipArchitectureOverrides2.ts',
 'app/components/AzureServiceLearningDetails.tsx',
 'app/components/AthenaLearningDetails.tsx',
 'app/components/AnalyticsLearningDetails.tsx',
 ...fs.readdirSync('lib').filter(x=>/^gcp-architecture-boards.*\.ts$/.test(x)).map(x=>path.join('lib',x)),
];
const report={status:'Discovery only: semantic review remains pending outside explicitly reviewed flows',files:[],genericCopy:[],literalNodeCount:0,dynamicNodeCount:0};
for(const file of files){
 const text=fs.readFileSync(file,'utf8');
 const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 let nodes=0,dynamic=0;
 function walk(node){
  if(ts.isCallExpression(node)&&ts.isIdentifier(node.expression)&&['W','P','N','c'].includes(node.expression.text)&&node.arguments.length>=2){
   if(ts.isStringLiteral(node.arguments[0])&&ts.isStringLiteral(node.arguments[1]))nodes++;else dynamic++;
  }
  if(ts.isStringLiteral(node)||ts.isTemplateExpression(node)){
   const value=node.getText(ast);
   if(/Managed AWS capability|Service-specific .*role|Primary capability|Managed capability|Production workload integration|Control-plane capability|Service-specific access model|Organization-wide capability|Routing \/ orchestration \/ messaging/i.test(value)){
    report.genericCopy.push({file,line:ast.getLineAndCharacterOfPosition(node.getStart(ast)).line+1,text:value});
   }
  }
  ts.forEachChild(node,walk);
 }
 walk(ast);
 report.files.push({file,literalNodes:nodes,dynamicNodeExpressions:dynamic,semanticReview:'pending'});
 report.literalNodeCount+=nodes;report.dynamicNodeCount+=dynamic;
}
console.log(JSON.stringify(report,null,2));
