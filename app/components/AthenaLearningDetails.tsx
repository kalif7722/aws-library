"use client";

import { useState } from "react";
import "./AthenaLearningDetails.css";
import "./AthenaAwsIcons.css";
import { awsArchitectureIcons, awsIconSrc, awsIconFallbackSrc, type AwsArchitectureIcon } from "../../lib/aws-architecture-icons";
import { AnalyticsArchitectureEnhancement, AnalyticsCostEnhancement } from "./AnalyticsMiddleEnhancements";


const demoAsset = { image: "/assets/demos/amazon-athena-practical-demo.webp", alt: "Amazon Athena practical four-step walkthrough" };
const demoRepoFallback = (path: string) => `https://raw.githubusercontent.com/kalif7722/aws-library/main${path}`;
const walkthroughBase = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/";
const walkthroughFilename = (serviceName: string) => {
  const aliases: Record<string, string> = {
    "Amazon Quick Sight": "amazon-quicksight",
    "Amazon Managed Streaming for Apache Kafka (Amazon MSK)": "amazon-msk",
    "Amazon Managed Service for Apache Flink": "amazon-managed-service-for-apache-flink",
    "AWS Cost and Usage Report": "aws-cost-and-usage-report",
    "Amazon EC2 Auto Scaling": "amazon-ec2-auto-scaling",
  };
  return (aliases[serviceName] || serviceName).toLowerCase()
    .replace(/[()]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".webp";
};
function WalkthroughDemo({ image, alt, label }: { image: string; alt: string; label: string }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return <section className="athena-demo-card service-practical-demo" aria-label={`${label} practical demo`}>
    <button type="button" className="athena-demo-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open}>{open ? "Hide" : "View"} walkthrough</button>
    {open && <div className="athena-demo-panel">
      <button type="button" className="athena-demo-image-button" onClick={() => setExpanded(true)} aria-label={`Open ${label} walkthrough full page`}><img src={image} alt={alt} loading="lazy" onError={(event) => { const img = event.currentTarget; const fallback = demoRepoFallback(image); if (img.src !== fallback) img.src = fallback; else img.onerror = null; }} /></button>
    </div>}
    {expanded && <div className="athena-demo-modal" role="dialog" aria-modal="true" aria-label={`${label} walkthrough`} onClick={() => setExpanded(false)}><button type="button" className="athena-demo-modal-close" onClick={() => setExpanded(false)}>Close ×</button><img src={image} alt={alt} onClick={event => event.stopPropagation()} /></div>}
  </section>;
}
function AthenaPracticalDemo() {
  return <WalkthroughDemo image={demoAsset.image} alt={demoAsset.alt} label="Amazon Athena" />;
}
export const serviceDemoAssets: Record<string, { image: string; alt: string }> = {
  "Amazon Managed Streaming for Apache Kafka (Amazon MSK)": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-msk.webp", alt: "Amazon MSK practical Kafka workflow" },
  "Amazon Quick Sight": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-quicksight.webp", alt: "Amazon QuickSight practical dashboard workflow" },
  "Amazon AppFlow": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-appflow.webp", alt: "Amazon AppFlow practical integration workflow" },
  "AWS AppSync": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-appsync.webp", alt: "AWS AppSync practical GraphQL workflow" },
  "Amazon EventBridge": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-eventbridge.webp", alt: "Amazon EventBridge practical event-routing workflow" },
  "AWS Data Exchange": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-data-exchange.webp", alt: "AWS Data Exchange practical dataset subscription workflow" },
  "Amazon Data Firehose": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-data-firehose.webp", alt: "Amazon Data Firehose practical streaming delivery workflow" },
  "Amazon Kinesis Data Streams": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-kinesis-data-streams.webp", alt: "Amazon Kinesis Data Streams practical real-time streaming workflow" },
  "AWS Lake Formation": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-lake-formation.webp", alt: "AWS Lake Formation practical governed data lake workflow" },
  "Amazon Managed Service for Apache Flink": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-managed-service-for-apache-flink.webp", alt: "Amazon Managed Service for Apache Flink practical streaming analytics workflow" },
  "Amazon EMR": { image: "/assets/demos/amazon-emr-practical-demo-v3.webp", alt: "Amazon EMR practical log analytics workflow" },
  "AWS Glue": { image: "/assets/demos/aws-glue-practical-demo-v3.webp", alt: "AWS Glue practical sales ETL workflow" },
  "Amazon Kinesis": { image: "/assets/demos/amazon-kinesis-practical-demo-v3.webp", alt: "Amazon Kinesis practical clickstream workflow" },
  "Amazon OpenSearch Service": { image: "/assets/demos/amazon-opensearch-service-practical-demo-v3.webp", alt: "Amazon OpenSearch Service practical observability workflow" },
  "Amazon MQ": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-mq.webp", alt: "Amazon MQ practical message-broker workflow" },
  "Amazon SNS": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-sns.webp", alt: "Amazon SNS practical publish-subscribe workflow" },
  "Amazon SQS": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-sqs.webp", alt: "Amazon SQS practical queue-processing workflow" },
  "AWS Step Functions": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-step-functions.webp", alt: "AWS Step Functions practical orchestration workflow" },
  "Amazon Managed Blockchain": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-managed-blockchain.webp", alt: "Amazon Managed Blockchain practical network workflow" },
  "Amazon SES": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-ses.webp", alt: "Amazon SES practical email-delivery workflow" },
  "AWS Budgets": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-budgets.webp", alt: "AWS Budgets practical cost-alert workflow" },
  "AWS Cost and Usage Report": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-cost-and-usage-report.webp", alt: "AWS Cost and Usage Report practical billing-data workflow" },
  "AWS Cost Explorer": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-cost-explorer.webp", alt: "AWS Cost Explorer practical cost-analysis workflow" },
  "Savings Plans": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/savings-plans.webp", alt: "Savings Plans practical commitment-analysis workflow" },
  "AWS App Runner": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-app-runner.webp", alt: "AWS App Runner practical application-deployment workflow" },
  "AWS Auto Scaling": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-auto-scaling.webp", alt: "AWS Auto Scaling practical capacity-management workflow" },
  "AWS Batch": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-batch.webp", alt: "AWS Batch practical batch-compute workflow" },
  "AWS Elastic Beanstalk": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-elastic-beanstalk.webp", alt: "AWS Elastic Beanstalk practical web-application deployment workflow" },
  "Amazon EC2": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-ec2.webp", alt: "Amazon EC2 practical virtual-server workflow" },
  "Amazon EC2 Auto Scaling": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-ec2-auto-scaling.webp", alt: "Amazon EC2 Auto Scaling practical resilient-web-tier workflow" },
  "AWS Fargate": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-fargate.webp", alt: "AWS Fargate practical serverless-container workflow" },
  "AWS Lambda": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-lambda.webp", alt: "AWS Lambda practical event-driven workflow" },
  "Amazon Lightsail": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/amazon-lightsail.webp", alt: "Amazon Lightsail practical simple-application workflow" },
  "AWS Outposts": { image: "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aws-outposts.webp", alt: "AWS Outposts practical hybrid-workload workflow" },
};
export function ServicePracticalDemo({ serviceName }: { serviceName: string }) {
  const asset = serviceDemoAssets[serviceName] || {
    image: walkthroughBase + walkthroughFilename(serviceName),
    alt: `${serviceName} practical AWS Console walkthrough`,
  };
  return <WalkthroughDemo image={asset.image} alt={asset.alt} label={serviceName} />;
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
