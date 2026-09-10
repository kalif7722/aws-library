import fs from 'node:fs';

const componentPath = 'app/components/CertificationCourse.tsx';
let source = fs.readFileSync(componentPath, 'utf8');

if (!source.includes('AnalyticsLearningDetails')) {
  const importAnchor = 'import AthenaLearningDetails from "./AthenaLearningDetails";';
  if (!source.includes(importAnchor)) throw new Error('Athena import anchor changed');
  source = source.replace(importAnchor, `${importAnchor}\nimport AnalyticsLearningDetails, { analyticsDetailServices } from "./AnalyticsLearningDetails";`);
}
if (!source.includes('const [visualVisible, setVisualVisible] = useState(true);')) {
  const stateAnchor = 'const [allOpen, setAllOpen] = useState(false); const [sidebarCollapsed, setSidebarCollapsed] = useState(false);';
  if (!source.includes(stateAnchor)) throw new Error('Course viewer state anchor changed');
  source = source.replace(stateAnchor, `${stateAnchor} const [visualVisible, setVisualVisible] = useState(true);`);
}
source = source.replace('const isAthena = selected?.name.toLowerCase().includes("athena");','const isAthena = selected?.name.toLowerCase().includes("athena");\n  const hasStructuredDetails = !!selected && (isAthena || analyticsDetailServices.has(selected.name));');
source = source.replace('className={`viewer course-viewer ${isAthena ? "has-knowledge" : ""}`}','className={`viewer course-viewer ${hasStructuredDetails ? "has-knowledge" : ""}`}');
source = source.replace('const selectService = (name: string) => { const match = findGuide(name); if (!match) return; setSelectedName(match.name); setImageScale(100); };','const selectService = (name: string) => { const match = findGuide(name); if (!match) return; setSelectedName(match.name); setImageScale(100); setVisualVisible(true); };');

const oldViewer=/<div className="viewer-head"><div><p>Selected EL10 page<\/p><h2>\{selected\.name\}<\/h2><small>\{selected\.summary\}<\/small><\/div><button onClick=\{\(\)=>setExpanded\(true\)\}>Fit in browser ↗<\/button><\/div><button className="image-link"[\s\S]*?<p className="viewer-note">Choose another service on the left to switch pages\. Click the image for the full browser view\.<\/p>/;
const newViewer='<div className="viewer-head clean-viewer-head"><div><h2>{selected.name}</h2><small>{selected.summary}</small></div><button className="visual-toggle" onClick={()=>setVisualVisible(v=>!v)}>{visualVisible ? "Hide visual ↑" : "Show visual ↓"}</button></div>{visualVisible && <button className="image-link clean-image-link" onClick={()=>setExpanded(true)} aria-label={`Open ${selected.name} visual full screen`}><img src={assetUrl(selected.file)} onError={e=>imageFallback(e,selected.file)} alt={`${selected.name} EL10 infographic`}/></button>}';
if(oldViewer.test(source))source=source.replace(oldViewer,newViewer);else if(!source.includes('className="visual-toggle"'))throw new Error('Course viewer markup anchor changed');

if (!source.includes('analyticsDetailServices.has(selected.name) && <AnalyticsLearningDetails')) {
  const detailsAnchor='{isAthena && <AthenaLearningDetails/>}';
  if(!source.includes(detailsAnchor))throw new Error('Structured details render anchor changed');
  source=source.replace(detailsAnchor,'{isAthena && <AthenaLearningDetails/>}{!isAthena && analyticsDetailServices.has(selected.name) && <AnalyticsLearningDetails serviceName={selected.name}/>}');
}
fs.writeFileSync(componentPath,source);

// Put the shared second architecture in the middle of each analytics service page,
// and put cost models before comparison + the final memory hook.
const analyticsPath='app/components/AnalyticsLearningDetails.tsx';
let analytics=fs.readFileSync(analyticsPath,'utf8');
const enhancementImport='import { AnalyticsArchitectureEnhancement, AnalyticsCostEnhancement } from "./AnalyticsMiddleEnhancements";';
if(!analytics.includes(enhancementImport)){
  const anchor='import { awsArchitectureIcons, awsIconSrc, awsIconFallbackSrc, type AwsArchitectureIcon } from "../../lib/aws-architecture-icons";';
  if(!analytics.includes(anchor))throw new Error('Analytics icon import anchor changed');
  analytics=analytics.replace(anchor,`${anchor}\n${enhancementImport}`);
}
if(!analytics.includes('<AnalyticsArchitectureEnhancement serviceName={serviceName}/>')){
  const anchor='</div><div className="callout"><b>Remember</b><span>{d.memory}</span></div></section><div className="knowledge-grid three"';
  if(!analytics.includes(anchor))throw new Error('Analytics architecture placement anchor changed');
  analytics=analytics.replace(anchor,'</div><div className="callout"><b>Remember</b><span>{d.memory}</span></div></section><AnalyticsArchitectureEnhancement serviceName={serviceName}/><div className="knowledge-grid three"');
}
if(!analytics.includes('<AnalyticsCostEnhancement serviceName={serviceName}/>')){
  const anchor='</section></div><section className="compare-board" id={`${slug}-compare`}>';
  if(!analytics.includes(anchor))throw new Error('Analytics cost placement anchor changed');
  analytics=analytics.replace(anchor,'</section></div><AnalyticsCostEnhancement serviceName={serviceName}/><section className="compare-board" id={`${slug}-compare`}>');
}
fs.writeFileSync(analyticsPath,analytics);

// Athena already has two icon-based examples; add a third production architecture and
// the same cost-model treatment before comparison, keeping the memory hook last.
const athenaPath='app/components/AthenaLearningDetails.tsx';
let athena=fs.readFileSync(athenaPath,'utf8');
if(!athena.includes(enhancementImport)){
  const anchor='import { awsArchitectureIcons, awsIconSrc, awsIconFallbackSrc, type AwsArchitectureIcon } from "../../lib/aws-architecture-icons";';
  if(!athena.includes(anchor))throw new Error('Athena icon import anchor changed');
  athena=athena.replace(anchor,`${anchor}\n${enhancementImport}`);
}
if(!athena.includes('<AnalyticsArchitectureEnhancement serviceName="Amazon Athena"/>')){
  const anchor='</div></section>\n    <div className="knowledge-grid three">';
  if(!athena.includes(anchor))throw new Error('Athena architecture placement anchor changed');
  athena=athena.replace(anchor,'</div></section>\n    <AnalyticsArchitectureEnhancement serviceName="Amazon Athena"/>\n    <div className="knowledge-grid three">');
}
if(!athena.includes('<AnalyticsCostEnhancement serviceName="Amazon Athena"/>')){
  const anchor='</Box></div>\n    <section className="compare-board" id="athena-compare">';
  if(!athena.includes(anchor))throw new Error('Athena cost placement anchor changed');
  athena=athena.replace(anchor,'</Box></div>\n    <AnalyticsCostEnhancement serviceName="Amazon Athena"/>\n    <section className="compare-board" id="athena-compare">');
}
fs.writeFileSync(athenaPath,athena);

const cssPath='app/globals.css';let css=fs.readFileSync(cssPath,'utf8');
const marker='/* course-service-viewer-cleanup-v1 */';if(!css.includes(marker)){css+=`\n\n${marker}\n.course-viewer.has-knowledge{padding:0;background:transparent;border:0;border-radius:0;box-shadow:none;overflow:visible}\n.course-viewer.has-knowledge>.clean-viewer-head,.course-viewer.has-knowledge>.clean-image-link,.course-viewer.has-knowledge>.service-knowledge{width:100%;max-width:none;margin-left:0;margin-right:0}\n.course-viewer.has-knowledge>.clean-viewer-head{padding:18px 22px 14px;background:var(--panel);border:1px solid #2d3752;border-top:4px solid var(--service-accent);border-radius:22px 22px 0 0;margin-bottom:0}\n.course-viewer.has-knowledge>.clean-image-link{min-height:0;max-height:none;border-radius:0;background:#0e1424;padding:0;overflow:hidden}\n.course-viewer.has-knowledge>.clean-image-link img{display:block;width:100%!important;max-width:100%;height:auto;max-height:none;object-fit:contain}\n.course-viewer.has-knowledge>.service-knowledge{margin-top:18px}\n.clean-viewer-head h2{margin:0 0 5px}.clean-viewer-head small{display:block;color:#aeb8d0;line-height:1.45}.visual-toggle{min-width:118px}\n@media(max-width:700px){.course-viewer.has-knowledge>.clean-viewer-head{border-radius:16px 16px 0 0;padding:15px}.clean-viewer-head{align-items:flex-start;flex-direction:row}.visual-toggle{min-width:auto}}\n`;}
const analyticsMarker='/* shared-analytics-learning-v1 */';if(!css.includes(analyticsMarker)){css+=`\n${analyticsMarker}\n.analytics-service-flow{display:flex;align-items:flex-start;justify-content:center;gap:22px;padding:22px 12px 14px;flex-wrap:wrap}.analytics-flow-piece{display:flex;align-items:center;gap:22px;min-width:0}.analytics-flow-piece .big-arrow{font-size:2rem;color:#ff9900;padding:34px 4px 0}.analytics-service-flow .aws-arch-node{min-width:150px;max-width:180px}.scenario.horizontal span{display:flex;align-items:center;gap:8px}.scenario.horizontal span b{color:#ff9900;margin-right:3px}.secondary-architecture{margin-top:18px}@media(max-width:900px){.analytics-service-flow,.analytics-flow-piece{flex-direction:column;align-items:center}.analytics-flow-piece .big-arrow{transform:rotate(90deg);padding:0}.analytics-service-flow .aws-arch-node{min-width:0}}\n`;}
fs.writeFileSync(cssPath,css);
console.log('Applied clean viewer and shared analytics page structure.');
