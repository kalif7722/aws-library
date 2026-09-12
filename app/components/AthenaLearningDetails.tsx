"use client";

import { useState } from "react";
import "./AthenaLearningDetails.css";
import "./AthenaAwsIcons.css";
import { awsArchitectureIcons, awsIconSrc, awsIconFallbackSrc, type AwsArchitectureIcon } from "../../lib/aws-architecture-icons";


const demoSteps = [
  { title: "Select an S3 data source", detail: "Choose the S3 location that contains the data you want to query.", image: "https://raw.githubusercontent.com/kalif7722/aws-library/main/assets/demos/athena-step-1.png" },
  { title: "Write the SQL query", detail: "Use standard SQL in the Athena query editor.", image: "https://raw.githubusercontent.com/kalif7722/aws-library/main/assets/demos/athena-step-2.png" },
  { title: "Run the query", detail: "Submit the query and let Athena scan only the data it needs.", image: "https://raw.githubusercontent.com/kalif7722/aws-library/main/assets/demos/athena-step-3.png" },
  { title: "Inspect the results", detail: "Review the returned rows and use the result for analysis or reporting.", image: "https://raw.githubusercontent.com/kalif7722/aws-library/main/assets/demos/athena-step-4.png" },
];
function AthenaPracticalDemo() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const current = demoSteps[step];
  return <section className="athena-demo-card athena-demo-card--manual" aria-labelledby="athena-demo-title">
    <button type="button" className="athena-demo-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="athena-demo-panel">{open ? "Hide" : "Show"} it in action</button>
    {open && <div id="athena-demo-panel" className="athena-demo-panel">
      <div className="athena-demo-visual">
        <div className="athena-demo-frame"><img key={current.image} src={current.image} alt={`Athena walkthrough step ${step + 1}: ${current.title}`} loading="lazy" /></div>
        <div className="athena-demo-controls"><button type="button" onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0} aria-label="Previous Athena demo step">‹ Previous</button><span>Step {step + 1} of {demoSteps.length}</span><button type="button" onClick={() => setStep(value => Math.min(demoSteps.length - 1, value + 1))} disabled={step === demoSteps.length - 1} aria-label="Next Athena demo step">Next ›</button></div>
      </div>
    </div>}
  </section>;
}


export const serviceDemoAssets: Record<string, { image: string; alt: string }> = {
  "Amazon EMR": { image: "https://raw.githubusercontent.com/kalif7722/aws-library/main/assets/demos/amazon-emr-practical-demo-v2.png", alt: "Amazon EMR practical log analytics workflow" },
  "AWS Glue": { image: "https://raw.githubusercontent.com/kalif7722/aws-library/main/assets/demos/aws-glue-practical-demo-v2.png", alt: "AWS Glue practical sales ETL workflow" },
  "Amazon Kinesis": { image: "https://raw.githubusercontent.com/kalif7722/aws-library/main/assets/demos/amazon-kinesis-practical-demo-v2.png", alt: "Amazon Kinesis practical clickstream workflow" },
  "Amazon OpenSearch Service": { image: "https://raw.githubusercontent.com/kalif7722/aws-library/main/assets/demos/amazon-opensearch-service-practical-demo-v2.png", alt: "Amazon OpenSearch Service practical observability workflow" },
};
export function ServicePracticalDemo({ serviceName }: { serviceName: string }) {
  const asset = serviceDemoAssets[serviceName];
  const [open, setOpen] = useState(false);
  if (!asset) return null;
  return <section className="athena-demo-card athena-demo-card--manual service-practical-demo" aria-label={`${serviceName} practical demo`}>
    <button type="button" className="athena-demo-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open}>{open ? "Hide" : "Show"} it in action</button>
    {open && <div className="athena-demo-panel"><div className="athena-demo-visual"><div className="athena-demo-frame"><img src={asset.image} alt={asset.alt} loading="lazy" /></div></div></div>}
  </section>;
}

const Box = ({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) => <section className="knowledge-card"><div className="knowledge-card-title"><span>{icon}</span><h3>{title}</h3></div><div className="knowledge-card-body">{children}</div></section>;
const Node = ({ label, sub, tone = "blue" }: { label: string; sub?: string; tone?: string }) => <div className={`arch-node ${tone}`}><strong>{label}</strong>{sub && <small>{sub}</small>}</div>;
const AwsNode = ({ icon, label, sub }: { icon: AwsArchitectureIcon; label?: string; sub?: string }) => <div className="aws-arch-node"><div className="aws-icon-disc"><img src={awsIconSrc(icon)} data-fallback={awsIconFallbackSrc(icon)} onError={(event) => { const image = event.currentTarget; const fallback = image.dataset.fallback; if (fallback && image.src !== fallback) image.src = fallback; else image.onerror = null; }} alt={`${label || icon.name} AWS architecture icon`} loading="lazy" /></div><strong>{label || icon.name}</strong>{sub && <small>{sub}</small>}</div>;
const Arrow = ({ label }: { label?: string }) => <div className="arch-arrow"><span>→</span>{label && <small>{label}</small>}</div>;

export default function AthenaLearningDetails() {
  const icons = awsArchitectureIcons;
  return <div className="service-knowledge" id="athena-learning-details">
    <div className="knowledge-intro"><div><p className="knowledge-kicker">VISUAL DEEP DIVE • AMAZON ATHENA</p><h2>Query data where it lives.</h2><p>Athena is a serverless interactive analytics service. For its classic SQL use case, your data stays in Amazon S3, metadata describes it in the AWS Glue Data Catalog, and Athena reads only the data needed by your SQL query.</p></div><div className="knowledge-facts"><span><b>01</b>Serverless</span><span><b>02</b>Standard SQL</span><span><b>03</b>S3 data lake</span><span><b>04</b>Pay per query</span></div></div>
    <nav className="knowledge-jumps" aria-label="Athena learning sections"><a href="#athena-flow">Architecture</a><a href="#athena-concepts">Core concepts</a><a href="#athena-examples">Examples</a><a href="#athena-security">Security</a><a href="#athena-cost">Cost</a><a href="#athena-compare">Compare</a></nav>
    <div className="knowledge-grid" id="athena-concepts">
      <Box icon="⌁" title="The mental model"><div className="mini-flow"><span>DATA</span><i>→</i><span>SCHEMA</span><i>→</i><span>SQL</span><i>→</i><span>RESULT</span></div><p><b>S3</b> holds the files. <b>Glue Data Catalog</b> holds table/schema metadata. <b>Athena</b> executes SQL. Results can be written to a customer S3 location or managed by Athena.</p></Box>
      <Box icon="▦" title="Formats that matter"><div className="pill-row"><span>CSV</span><span>JSON</span><span>Parquet ★</span><span>ORC ★</span><span>Iceberg</span></div><p>Columnar formats such as Parquet and ORC are especially useful because queries can read fewer bytes. Partitioning and compression further reduce scan volume.</p></Box>
      <Box icon="⚡" title="When Athena shines"><ul className="visual-list"><li><b>Ad-hoc analysis</b><span>Explore data without provisioning a cluster.</span></li><li><b>Log analytics</b><span>Query application, access and operational logs in S3.</span></li><li><b>Data lake SQL</b><span>Analyze structured and semi-structured datasets.</span></li><li><b>Federated analytics</b><span>Use connectors to query supported sources beyond S3.</span></li></ul></Box>
      <Box icon="◎" title="Workgroups = control plane"><div className="workgroup-visual"><div><b>TEAM A</b><span>Encrypted results</span></div><div><b>TEAM B</b><span>Usage controls</span></div><div><b>BI</b><span>Dedicated settings</span></div></div><p>Use workgroups to isolate users/queries, enforce settings, configure result locations and encryption, publish metrics, and apply query data-usage controls.</p></Box>
    </div>
        <AthenaPracticalDemo />
    <section className="architecture-stage" id="athena-flow"><div className="section-cap"><div><p>ARCHITECTURE 01</p><h3>Serverless S3 analytics flow</h3></div><span>Official AWS architecture icons • follow the arrows</span></div><div className="architecture-row icon-architecture"><AwsNode icon={icons.user} label="Analyst / BI" sub="Console • JDBC • ODBC"/><Arrow label="SQL"/><AwsNode icon={icons.athena} sub="Serverless query engine"/><Arrow label="schema"/><AwsNode icon={icons.glueDataCatalog} sub="Tables • columns • partitions"/><Arrow label="reads"/><AwsNode icon={icons.s3} sub="CSV • JSON • Parquet • ORC"/></div><div className="architecture-return"><span>Query result</span><b>←</b><span>Athena processes the query</span><b>←</b><span>Only relevant source data is read</span></div><div className="callout"><b>Remember</b><span>Athena does not require you to load S3 data into a database first. The table definition tells Athena where the source data is and how to interpret it.</span></div></section>
    <section className="architecture-stage federated" id="athena-examples"><div className="section-cap"><div><p>ARCHITECTURE 02</p><h3>Federated query: one SQL layer, multiple sources</h3></div><span>Official service icons make the architecture easier to recognize</span></div><div className="federated-layout icon-federated"><div className="source-stack icon-source-stack"><AwsNode icon={icons.s3} sub="Data lake"/><AwsNode icon={icons.rds} sub="Relational source via connector"/><AwsNode icon={icons.dynamodb} sub="NoSQL source via connector"/></div><div className="big-arrow">→</div><AwsNode icon={icons.athena} label="Athena Federated Query" sub="Connectors read supported sources • predicate pushdown where supported"/><div className="big-arrow">→</div><Node label="Unified SQL result" sub="Analyze • report • persist" tone="pink"/></div></section>
    <div className="knowledge-grid three"><Box icon="1" title="Example: investigate web logs"><div className="scenario"><span>ALB / CloudFront logs</span><b>↓</b><span>S3</span><b>↓</b><span>Athena SQL</span><b>↓</b><span>Top errors / IPs / latency</span></div><pre>{`SELECT status, count(*) AS hits
FROM access_logs
WHERE day = DATE '2026-09-10'
GROUP BY status
ORDER BY hits DESC;`}</pre></Box><Box icon="2" title="Example: optimize a data lake"><div className="before-after"><div><b>BEFORE</b><span>CSV</span><span>Many files</span><span>Broad scans</span></div><i>→</i><div><b>BETTER</b><span>Parquet</span><span>Compressed</span><span>Partitioned</span></div></div><p>Design storage for the queries you run. Selecting only required columns and pruning partitions can substantially reduce scanned data.</p></Box><Box icon="3" title="Example: BI reporting"><div className="scenario horizontal"><span>S3 lake</span><b>→</b><span>Athena</span><b>→</b><span>BI / SQL client</span></div><p>Use Athena as the SQL query layer for reporting and exploration. JDBC and ODBC connectivity let compatible analytics clients query Athena.</p></Box></div>
    <div className="knowledge-grid" id="athena-security"><Box icon="◆" title="Security layers"><div className="security-rings"><div>IAM<br/><small>Who can call Athena?</small></div><div>S3<br/><small>Can they read the source/results?</small></div><div>KMS<br/><small>Can they use encryption keys?</small></div><div>Catalog / governance<br/><small>What metadata/data is exposed?</small></div></div><p>Authorization is layered. Athena permission alone does not automatically grant access to the underlying S3 objects or encryption keys.</p></Box><Box icon="$" title="Cost & performance"><div className="cost-equation"><span>LESS DATA SCANNED</span><b>=</b><span>LOWER COST + FASTER QUERIES</span></div><ol className="rank-list"><li><b>Partition</b> on useful filter dimensions.</li><li><b>Prefer columnar</b> Parquet/ORC for analytics.</li><li><b>Compress</b> source data where appropriate.</li><li><b>Select columns</b> instead of unnecessary SELECT *.</li><li><b>Use workgroups</b> for governance and usage controls.</li></ol></Box></div>
    <section className="compare-board" id="athena-compare"><div className="section-cap"><div><p>CHOOSE THE RIGHT TOOL</p><h3>Athena vs Redshift vs EMR</h3></div></div><div className="compare-columns"><div className="recommended"><b>ATHENA</b><strong>Interactive serverless SQL</strong><span>Ad-hoc S3 analysis</span><span>Data lake exploration</span><span>No cluster to manage</span></div><div><b>REDSHIFT</b><strong>Data warehouse</strong><span>Warehouse workloads</span><span>Repeated BI / analytics</span><span>Managed warehouse capabilities</span></div><div><b>EMR</b><strong>Big-data frameworks</strong><span>Spark / Hadoop ecosystem</span><span>Complex processing</span><span>Fine-grained framework control</span></div></div></section>
    <section className="exam-strip"><div><p>MEMORY HOOK</p><h3>S3 = data • Glue = schema • Athena = query</h3></div><div className="exam-tips"><span><b>01</b>No infrastructure to provision for Athena SQL.</span><span><b>02</b>Partition + columnar format = common optimization pattern.</span><span><b>03</b>Workgroups help separate teams, settings and usage controls.</span><span><b>04</b>Federated Query reaches supported sources outside S3 through connectors.</span></div></section>
    <p className="knowledge-reviewed">Prototype structured learning content • Reviewed against AWS Athena documentation • September 2026</p>
  </div>;
}
