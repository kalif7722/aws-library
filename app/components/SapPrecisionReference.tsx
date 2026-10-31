import sections from './sap-precision-reference.json';
import comparisons from './sap-service-comparisons.json';
import './SapS3Reference.css';
import './SapPrecisionReference.css';

function ServiceIcon({icon}:{icon:string}) {
 return <img className="sap-service-icon" src={`/course-visuals/aws-service-icons/${icon}.svg`} width="40" height="40" alt="" loading="lazy" decoding="async"/>;
}
function detailIcon(moduleId:string,index:number,topic:string) {
 const defaults=moduleId==='11'?['Amazon-RDS','Amazon-Aurora','Amazon-DynamoDB','Amazon-ElastiCache','Amazon-OpenSearch-Service']:['Amazon-Elastic-Container-Service','Amazon-Elastic-Container-Registry','Amazon-Elastic-Kubernetes-Service','AWS-Cloud-Map','AWS-App-Runner'];
 if(/DAX/.test(topic))return 'dax';
 if(/DocumentDB/.test(topic))return 'Amazon-DocumentDB';
 if(/LiveAnalytics|Time-series/.test(topic))return 'Amazon-Timestream';
 if(/EKS Anywhere/.test(topic))return 'Amazon-EKS-Anywhere';
 if(/ECS Anywhere|Hybrid host/.test(topic))return 'Amazon-ECS-Anywhere';
 if(/Migration candidate/.test(topic))return 'Amazon-Elastic-Container-Service';
 if(/Lattice/.test(topic))return 'Amazon-VPC-Lattice';
 if(/App Mesh/.test(topic))return 'AWS-App-Mesh';
 if(/Service Connect/.test(topic))return 'Amazon-Elastic-Container-Service';
 if(/Fargate/.test(topic))return 'AWS-Fargate';
 if(/FSx/.test(topic))return 'Amazon-FSx-for-Lustre';
 return defaults[index];
}
export default function SapPrecisionReference({moduleId}:{moduleId:string}) {
 const own=sections.filter(section=>section.moduleId===moduleId);
 if(!own.length)return null;
 const enhanced=moduleId==='11'||moduleId==='12';
 const groups=comparisons.filter(group=>group.moduleId===moduleId);
 const count=groups.reduce((sum,group)=>sum+group.rows.length,0);
 const detailCount=own.reduce((sum,section)=>sum+section.rows.length,0);
 return <section className={`sap-s3-ref${enhanced?' sap-precision-enhanced':''}`} id="module-precision-reference" aria-label="Detailed service comparison">
  <header><p className="sap-s3-kicker">DETAILS AND EXCEPTIONS · REVIEWED 31 OCTOBER 2026</p><h2>{enhanced?'Compare the services. Master the details.':'Inspect the limits. Keep the exceptions.'}</h2><p>{enhanced?'Choose the right service, then check the operating model, security gates, recovery behavior and exceptions. These comparisons cover the core services, service features and supporting integrations taught in this module.':'Use these readable comparisons alongside the visual lessons. Numerical maxima depend on the selected Region, instance, configuration and current service documentation.'}</p>
  {enhanced&&<><div className="sap-reference-stats"><span><strong>{count}</strong> service &amp; feature comparisons</span><span><strong>{detailCount}</strong> precision details</span><span><strong>AWS</strong> official architecture icons</span></div><nav aria-label="Comparison sections">{groups.map((group,index)=><a key={group.title} href={`#sap-${moduleId}-compare-${index}`}>{group.title}</a>)}<a href={`#sap-${moduleId}-precision`}>Limits &amp; exceptions ↓</a></nav></>}
  </header>
  {enhanced&&<div className="sap-comparison-guide"><strong>Read across to make a decision.</strong> Compare purpose → operating contract → caveat. Supporting services are building blocks, not interchangeable alternatives. Feature rows use the parent AWS service icon. On a small screen, scroll each table sideways; service names stay visible.</div>}
  {groups.map((group,index)=><details className="sap-comparison-section" key={group.title} id={`sap-${moduleId}-compare-${index}`} open><summary><span className="sap-summary-label"><span className="sap-section-number">{String(index+1).padStart(2,'0')}</span>{group.title}</span><span className="sap-row-count">{group.rows.length} comparisons</span></summary><div className="sap-s3-detail"><div className="sap-s3-table sap-service-table" role="region" aria-label={`${group.title} comparison table, scroll horizontally`} tabIndex={0}><table><caption>{group.title} · Module {moduleId}<span>Compare purpose, responsibilities and decision-changing exceptions.</span></caption><thead><tr><th scope="col">AWS service / feature</th><th scope="col">Choose it for</th><th scope="col">Operating model &amp; controls</th><th scope="col">Exceptions &amp; exam traps</th></tr></thead><tbody>{group.rows.map(row=><tr key={row.service}><th scope="row"><span className="sap-service-label"><ServiceIcon icon={row.icon}/><span>{row.service}</span></span></th><td>{row.choose}</td><td>{row.operations}</td><td className="sap-caveat">{row.watch}</td></tr>)}</tbody></table></div><div className="sap-reference-sources"><p>Primary AWS documentation</p>{group.sources.map(source=><a key={source} href={source} target="_blank" rel="noreferrer">{new URL(source).pathname.split('/').filter(Boolean).pop()?.replace(/\.html$/,'').replace(/[_.-]/g,' ')} ↗</a>)}</div></div></details>)}
  {enhanced&&<div className="sap-detail-heading" id={`sap-${moduleId}-precision`}><p className="sap-s3-kicker">THE PRECISION LAYER</p><h3>Limits, prerequisites &amp; operational exceptions</h3><p>Retain every qualification below alongside the visual lessons. Numerical maxima depend on Region, engine, version, deployment and configuration; linked AWS documentation is authoritative.</p></div>}
  {own.map((section,index)=><details key={section.title} open><summary>{enhanced?<><span className="sap-summary-label"><ServiceIcon icon={detailIcon(moduleId,index,'')}/>{section.title}</span><span className="sap-row-count">{section.rows.length} details</span></>:section.title}</summary><div className="sap-s3-detail"><div className="sap-s3-table sap-precision-table" role="region" aria-label={section.title} tabIndex={0}><table>{enhanced&&<caption>{section.title}<span>Exact boundaries that can change an architecture decision.</span></caption>}<thead><tr><th scope="col">Topic</th><th scope="col">Detail to retain</th></tr></thead><tbody>{section.rows.map(([topic,detail])=><tr key={topic}><th scope="row">{enhanced?<span className="sap-service-label"><ServiceIcon icon={detailIcon(moduleId,index,topic)}/><span>{topic}</span></span>:topic}</th><td>{detail}</td></tr>)}</tbody></table></div><div className={enhanced?'sap-reference-sources':''}><p>{enhanced?'Primary AWS documentation':'Primary references:'}</p>{section.sources.map((source,sourceIndex)=><a key={source} href={source} target="_blank" rel="noreferrer">{enhanced?new URL(source).pathname.split('/').pop()?.replace(/\.html$/,'').replace(/[_.-]/g,' '):`AWS reference ${sourceIndex+1}`} ↗ </a>)}</div></div></details>)}
  {enhanced&&<p className="sap-icon-attribution">Icons: <a href="https://aws.amazon.com/architecture/icons/" target="_blank" rel="noreferrer">official AWS Architecture Icons</a>, July 2026 package. Service features share their parent icon; an icon is not an availability guarantee. App Mesh retirement and restricted new-customer offerings are explicitly identified above.</p>}
 </section>;
}
