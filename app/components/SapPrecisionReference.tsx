import sections from './sap-precision-reference.json';
import './SapS3Reference.css';

export default function SapPrecisionReference({moduleId}:{moduleId:string}) {
 const own=sections.filter(section=>section.moduleId===moduleId);
 if(!own.length)return null;
 return <section className="sap-s3-ref" id="module-precision-reference" aria-label="Detailed service comparison"><header><p>DETAILS AND EXCEPTIONS · REVIEWED 31 OCTOBER 2026</p><h2>Inspect the limits. Keep the exceptions.</h2><p>Use these readable comparisons alongside the visual lessons. Numerical maxima depend on the selected Region, instance, configuration and current service documentation.</p></header>{own.map(section=><details key={section.title} open><summary>{section.title}</summary><div className="sap-s3-detail"><div className="sap-s3-table" role="region" aria-label={section.title} tabIndex={0}><table><thead><tr><th scope="col">Topic</th><th scope="col">Detail to retain</th></tr></thead><tbody>{section.rows.map(([topic,detail])=><tr key={topic}><th scope="row">{topic}</th><td>{detail}</td></tr>)}</tbody></table></div><p>Primary references: {section.sources.map((source,index)=><a key={source} href={source} target="_blank" rel="noreferrer">AWS reference {index+1} ↗ </a>)}</p></div></details>)}</section>;
}
