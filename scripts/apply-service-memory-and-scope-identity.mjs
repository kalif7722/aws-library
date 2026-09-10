import fs from 'node:fs';

function replaceOnce(source, from, to, label){
  if(source.includes(to)) return source;
  if(!source.includes(from)) throw new Error(`${label} anchor changed`);
  return source.replace(from,to);
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

// Give every cross-course service a real, service-specific memory hook and the same orange terminal treatment as AIP/Athena.
const crossPath='app/components/CrossCourseLearningDetails.tsx';
let cross=fs.readFileSync(crossPath,'utf8');
const crossImport='import { getServiceMemoryHook } from "./ServiceMemoryHooks";';
if(!cross.includes(crossImport))cross=cross.replace('import { getAipDecisionGuide } from "./AipDecisionGuides";',`import { getAipDecisionGuide } from "./AipDecisionGuides";\n${crossImport}`);
if(!cross.includes('const memoryHook=getServiceMemoryHook')){
  cross=cross.replace('const useCases=arches.map(a=>`${a.title}: ${a.note}`);','const useCases=arches.map(a=>`${a.title}: ${a.note}`);const memoryHook=getServiceMemoryHook(serviceName,category,decision,arches);');
}
cross=cross.replace('href="#cross-memory"','href="#memory-hook"');
const oldCrossMemory='<Cards id="cross-memory" title="Certification memory hook" items={[`Remember ${serviceName} by responsibility: what it owns, what it integrates with, and what it does not replace.`,`Picture the primary architecture above before answering feature questions; topology often reveals the correct service faster than memorized definitions.`,`When two answers look plausible, compare invocation model, state, network placement, scaling and failure behavior.`]}/>';
if(cross.includes(oldCrossMemory))cross=cross.replace(oldCrossMemory,'<Cards id="memory-hook" title="Certification memory hook" items={memoryHook}/>');
if(!cross.includes('title="Certification memory hook" items={memoryHook}'))throw new Error('Cross-course memory hook migration incomplete');
fs.writeFileSync(crossPath,cross);

// Apply the same service-specific memory hook to AIP services after the AIP alignment transform has run.
const aipPath='app/components/AipServiceLearningDetailsV8.tsx';
let aip=fs.readFileSync(aipPath,'utf8');
const aipImport='import { getServiceMemoryHook } from "./ServiceMemoryHooks";';
const decisionImport='import { getAipDecisionGuide } from "./AipDecisionGuides";';
if(!aip.includes(aipImport)){
  if(aip.includes(decisionImport))aip=aip.replace(decisionImport,`${decisionImport}\n${aipImport}`);
  else aip=aip.replace('import { aipScope, guideAliases } from "../course-data";',`import { aipScope, guideAliases } from "../course-data";\n${aipImport}`);
}
if(aip.includes('const decision=getAipDecisionGuide')&&!aip.includes('const memoryHook=getServiceMemoryHook')){
  aip=aip.replace('const applicationFit=[', 'const memoryHook=getServiceMemoryHook(e.service,e.category,decision,arches);const applicationFit=[');
}
const aipMemoryRegex=/<Cards id="memory-hook" title="Certification memory hook" items=\{\[[\s\S]*?\]\}\/>/;
if(aipMemoryRegex.test(aip))aip=aip.replace(aipMemoryRegex,'<Cards id="memory-hook" title="Certification memory hook" items={memoryHook}/>');
if(!aip.includes('title="Certification memory hook" items={memoryHook}'))throw new Error('AIP memory hook migration incomplete');
fs.writeFileSync(aipPath,aip);

console.log('Applied exact course-service identity and service-specific certification memory hooks.');
