import fs from 'node:fs';

function replaceOnce(source, from, to, label){
  if(source.includes(to)) return source;
  if(!source.includes(from)) throw new Error(`${label} anchor changed`);
  return source.replace(from,to);
}

function ensureImport(source,anchor,line,label){
  if(source.includes(line))return source;
  if(!source.includes(anchor))throw new Error(`${label} import anchor changed`);
  return source.replace(anchor,`${anchor}\n${line}`);
}

// Preserve the exact certification-scope service as page identity even when its visual guide is reused.
const coursePath='app/components/CertificationCourse.tsx';
let course=fs.readFileSync(coursePath,'utf8');
course=replaceOnce(course,
  'const available = useMemo(() => scope.flatMap((category) => category.services).map(findGuide).filter(Boolean), [scope]);',
  'const availableScopeServices = useMemo(() => scope.flatMap((category) => category.services).filter((service) => !!findGuide(service)), [scope]);',
  'available scope services');
course=replaceOnce(course,
  'const [selectedName, setSelectedName] = useState(available[0]?.name || "");',
  'const [selectedScopeName, setSelectedScopeName] = useState(availableScopeServices[0] || "");',
  'selected scope state');
course=replaceOnce(course,
  'const selected = services.find((item) => item.name === selectedName) || available[0];',
  'const selected = selectedScopeName ? findGuide(selectedScopeName) : undefined;',
  'selected guide resolution');
course=course.replace('const isAthena = selected?.name.toLowerCase().includes("athena");','const isAthena = selectedScopeName.toLowerCase().includes("athena");');
course=course.replace(/const selectedCategory = selected \? \(scope\.find\(category => category\.services\.some\(service => findGuide\(service\)\?\.name === selected\.name\)\)\?\.title \|\| "AWS Services"\) : "AWS Services";/,
  'const selectedCategory = selectedScopeName ? (scope.find(category => category.services.includes(selectedScopeName))?.title || "AWS Services") : "AWS Services";');
course=course.replace('const selectService = (name: string) => { const match = findGuide(name); if (!match) return; setSelectedName(match.name); setImageScale(100); setVisualVisible(true); };',
  'const selectService = (name: string) => { const match = findGuide(name); if (!match) return; setSelectedScopeName(name); setImageScale(100); setVisualVisible(true); };');
course=course.replaceAll('selected?.name===mapped?.name','selectedScopeName===service');
course=course.replaceAll('selected?.name === mapped?.name','selectedScopeName === service');
course=course.replace('<h2>{selected.name}</h2>','<h2>{selectedScopeName}</h2>');
course=course.replaceAll('`${selected.name} EL10 infographic`','`${selectedScopeName} EL10 infographic`');
course=course.replaceAll('`Open ${selected.name} visual full screen`','`Open ${selectedScopeName} visual full screen`');
course=course.replace('{!isAthena && analyticsDetailServices.has(selected.name) && <AnalyticsLearningDetails serviceName={selected.name}/>}','{!isAthena && analyticsDetailServices.has(selected.name) && <AnalyticsLearningDetails serviceName={selected.name}/>}');
course=course.replace('{!isAthena && !analyticsDetailServices.has(selected.name) && hasAipLearningDetails(selected.name) && <AipServiceLearningDetails serviceName={selected.name} summary={selected.summary}/>} ',
  '{!isAthena && !analyticsDetailServices.has(selected.name) && hasAipLearningDetails(selectedScopeName) && <AipServiceLearningDetails serviceName={selectedScopeName} summary={selected.summary}/>} ');
course=course.replace('{!isAthena && !analyticsDetailServices.has(selected.name) && !hasAipLearningDetails(selected.name) && <CrossCourseLearningDetails serviceName={selected.name} category={selectedCategory} summary={selected.summary}/>} ',
  '{!isAthena && !analyticsDetailServices.has(selected.name) && !hasAipLearningDetails(selectedScopeName) && <CrossCourseLearningDetails serviceName={selectedScopeName} category={selectedCategory} summary={selected.summary}/>} ');
if(!course.includes('selectedScopeName')||course.includes('setSelectedName('))throw new Error('Certification course scope identity migration incomplete');
fs.writeFileSync(coursePath,course);

const showcaseImport='import ServiceLearningShowcase from "./ServiceLearningShowcase";';
const insightImport='import { getServiceLearningInsights } from "./ServiceLearningInsights";';

// Give every cross-course service service-specific insights, Athena-style walkthroughs and cost models.
const crossPath='app/components/CrossCourseLearningDetails.tsx';
let cross=fs.readFileSync(crossPath,'utf8');
const crossMemoryImport='import { getServiceMemoryHook } from "./ServiceMemoryHooks";';
cross=ensureImport(cross,'import { getAipDecisionGuide } from "./AipDecisionGuides";',crossMemoryImport,'Cross-course memory');
cross=ensureImport(cross,crossMemoryImport,insightImport,'Cross-course insights');
cross=ensureImport(cross,insightImport,showcaseImport,'Cross-course showcase');
if(!cross.includes('const memoryHook=getServiceMemoryHook')){
  cross=cross.replace('const useCases=arches.map(a=>`${a.title}: ${a.note}`);','const useCases=arches.map(a=>`${a.title}: ${a.note}`);const memoryHook=getServiceMemoryHook(serviceName,category,decision,arches);');
}
if(!cross.includes('const insights=getServiceLearningInsights')){
  cross=cross.replace('const memoryHook=getServiceMemoryHook(serviceName,category,decision,arches);','const memoryHook=getServiceMemoryHook(serviceName,category,decision,arches);const insights=getServiceLearningInsights(serviceName,category);');
}
cross=cross.replace('href="#cross-memory"','href="#memory-hook"');
const oldCrossMemory='<Cards id="cross-memory" title="Certification memory hook" items={[`Remember ${serviceName} by responsibility: what it owns, what it integrates with, and what it does not replace.`,`Picture the primary architecture above before answering feature questions; topology often reveals the correct service faster than memorized definitions.`,`When two answers look plausible, compare invocation model, state, network placement, scaling and failure behavior.`]}/>';
if(cross.includes(oldCrossMemory))cross=cross.replace(oldCrossMemory,'<Cards id="memory-hook" title="Certification memory hook" items={memoryHook}/>');
cross=cross.replace(/<Cards id="cross-security" title="Security & governance" items=\{\[[\s\S]*?\]\}\/>/,'<Cards id="cross-security" title="Security & governance" items={insights.security}/>');
cross=cross.replace(/<Cards title="Design & optimization" items=\{\[[\s\S]*?\]\}\/>/,'<Cards title="Design & optimization" items={insights.optimization}/>');
cross=cross.replace(/<Cards id="cross-cost" title="Cost model & drivers" items=\{\[[\s\S]*?\]\}\/>/,'<Cards id="cross-cost" title="Cost model & drivers" items={insights.cost}/>');
if(!cross.includes('title="Service-specific watch points"')){
  cross=cross.replace('<Cards id="memory-hook" title="Certification memory hook" items={memoryHook}/>','<Cards id="watch-points" title="Service-specific watch points" items={insights.watchPoints}/><Cards id="memory-hook" title="Certification memory hook" items={memoryHook}/>');
}
const crossShowcase='<ServiceLearningShowcase serviceName={serviceName} architectures={arches} security={insights.security} optimization={insights.optimization} cost={insights.cost} watchPoints={insights.watchPoints} securityId="cross-security" costId="cross-cost"/>';
if(!cross.includes(crossShowcase)){
  cross=cross.replace('<Cards id="cross-use-cases" title="Practical use cases" items={useCases}/>',crossShowcase);
  cross=cross.replace('<Cards id="cross-security" title="Security & governance" items={insights.security}/>','');
  cross=cross.replace('<Cards title="Design & optimization" items={insights.optimization}/>','');
  cross=cross.replace('<Cards id="watch-points" title="Service-specific watch points" items={insights.watchPoints}/>','');
  cross=cross.replace('<Cards id="cross-cost" title="Cost model & drivers" items={insights.cost}/>','');
}
if(!cross.includes('ServiceLearningShowcase serviceName={serviceName}')||!cross.includes('costId="cross-cost"'))throw new Error('Cross-course Athena-style showcase migration incomplete');
if(!cross.includes('title="Certification memory hook" items={memoryHook}'))throw new Error('Cross-course memory hook migration incomplete');
fs.writeFileSync(crossPath,cross);

// Apply the same service-specific learning experience to AIP services after AIP alignment runs.
const aipPath='app/components/AipServiceLearningDetailsV8.tsx';
let aip=fs.readFileSync(aipPath,'utf8');
const aipMemoryImport='import { getServiceMemoryHook } from "./ServiceMemoryHooks";';
const decisionImport='import { getAipDecisionGuide } from "./AipDecisionGuides";';
if(!aip.includes(aipMemoryImport)){
  if(aip.includes(decisionImport))aip=aip.replace(decisionImport,`${decisionImport}\n${aipMemoryImport}`);
  else aip=aip.replace('import { aipScope, guideAliases } from "../course-data";',`import { aipScope, guideAliases } from "../course-data";\n${aipMemoryImport}`);
}
aip=ensureImport(aip,aipMemoryImport,insightImport,'AIP insights');
aip=ensureImport(aip,insightImport,showcaseImport,'AIP showcase');
if(aip.includes('const decision=getAipDecisionGuide')&&!aip.includes('const memoryHook=getServiceMemoryHook')){
  aip=aip.replace('const applicationFit=[', 'const memoryHook=getServiceMemoryHook(e.service,e.category,decision,arches);const applicationFit=[');
}
if(!aip.includes('const insights=getServiceLearningInsights')){
  aip=aip.replace('const memoryHook=getServiceMemoryHook(e.service,e.category,decision,arches);','const memoryHook=getServiceMemoryHook(e.service,e.category,decision,arches);const insights=getServiceLearningInsights(e.service,e.category);');
}
const aipMemoryRegex=/<Cards id="memory-hook" title="Certification memory hook" items=\{\[[\s\S]*?\]\}\/>/;
if(aipMemoryRegex.test(aip))aip=aip.replace(aipMemoryRegex,'<Cards id="memory-hook" title="Certification memory hook" items={memoryHook}/>');
aip=aip.replace(/<Cards id="security" title="Security & governance" items=\{\[[\s\S]*?\]\}\/>/,'<Cards id="security" title="Security & governance" items={insights.security}/>');
aip=aip.replace(/<Cards title="Design & optimization" items=\{\[[\s\S]*?\]\}\/>/,'<Cards title="Design & optimization" items={insights.optimization}/>');
aip=aip.replace(/<Cards id="cost-models" title="Cost model & drivers" items=\{\[[\s\S]*?\]\}\/>/,'<Cards id="cost-models" title="Cost model & drivers" items={insights.cost}/>');
if(!aip.includes('title="Service-specific watch points"')){
  aip=aip.replace('<Cards id="memory-hook" title="Certification memory hook" items={memoryHook}/>','<Cards id="watch-points" title="Service-specific watch points" items={insights.watchPoints}/><Cards id="memory-hook" title="Certification memory hook" items={memoryHook}/>');
}
const aipShowcase='<ServiceLearningShowcase serviceName={e.service} architectures={arches} security={insights.security} optimization={insights.optimization} cost={insights.cost} watchPoints={insights.watchPoints} securityId="security" costId="cost-models"/>';
if(!aip.includes(aipShowcase)){
  aip=aip.replace('<Cards id="use-cases" title="Practical use cases" items={useCases}/>',aipShowcase);
  aip=aip.replace('<Cards id="security" title="Security & governance" items={insights.security}/>','');
  aip=aip.replace('<Cards title="Design & optimization" items={insights.optimization}/>','');
  aip=aip.replace('<Cards id="watch-points" title="Service-specific watch points" items={insights.watchPoints}/>','');
  aip=aip.replace('<Cards id="cost-models" title="Cost model & drivers" items={insights.cost}/>','');
}
if(!aip.includes('ServiceLearningShowcase serviceName={e.service}')||!aip.includes('costId="cost-models"'))throw new Error('AIP Athena-style showcase migration incomplete');
if(!aip.includes('title="Certification memory hook" items={memoryHook}'))throw new Error('AIP memory hook migration incomplete');
fs.writeFileSync(aipPath,aip);

console.log('Applied exact course-service identity, Athena-style walkthroughs, service-specific insights, restored cost models, and certification memory hooks.');
