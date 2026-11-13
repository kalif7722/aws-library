import fs from 'node:fs';

const crossPath='app/components/CrossCourseLearningDetails.tsx';
let cross=fs.readFileSync(crossPath,'utf8');
const from='<ServiceLearningShowcase serviceName={serviceName} architectures={arches} security={insights.security} optimization={insights.optimization} cost={insights.cost} watchPoints={insights.watchPoints} securityId="cross-security" costId="cross-cost"/>';
const to='<ServiceLearningShowcase serviceName={serviceName} architectures={arches} security={insights.security} optimization={insights.optimization} cost={insights.cost} watchPoints={insights.watchPoints} examplesId="cross-use-cases" securityId="cross-security" costId="cross-cost"/>';
if(!cross.includes(to)){
  if(!cross.includes(from))throw new Error('Cross-course showcase anchor changed');
  cross=cross.replace(from,to);
}
fs.writeFileSync(crossPath,cross);
console.log('Preserved cross-course showcase navigation anchors.');
