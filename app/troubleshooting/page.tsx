import Link from "next/link";
import "./troubleshooting.css";

const labs = [
  { number: "01", id: "vm-unreachable", title: "EC2 / VM unreachable", category: "Networking & connectivity", level: "Core", status: "Completed", description: "Trace reachability from the client through routes, security groups and network ACLs to the instance.", services: "EC2 · VPC · Security Groups", icon: "↔" },
  { number: "02", id: "private-connectivity", title: "Application cannot reach a private database", category: "Networking & databases", level: "Core", status: "Completed", description: "Follow the private application-to-database path and isolate DNS, routing, security-group and return-path failures.", services: "VPC · RDS · Security Groups", icon: "⌁" },
  { number: "03", id: "access-denied", title: "Deployment pipeline AccessDenied", category: "Identity & security", level: "Core", status: "Completed", description: "Use real console configuration and audit evidence to identify the missing permission and verify least-privilege recovery.", services: "IAM · S3 · CloudTrail", icon: "◇" },
  { number: "04", id: "ai-access-denied", title: "Bedrock model invocation denied", category: "AI & applications", level: "Core", status: "Completed", description: "Inspect the caller identity, model access and IAM policy, then retest the invocation and audit trail.", services: "Bedrock · IAM · CloudTrail", icon: "✳" },
  { number: "05", id: "rag-stale-answers", title: "RAG assistant returns outdated answers", category: "Generative AI & RAG", level: "Intermediate", status: "Completed", description: "Compare source versions, knowledge-base ingestion, retrieved passages and grounded answers before and after re-indexing.", services: "S3 · Bedrock Knowledge Bases", icon: "▤" },
  { number: "06", id: "stale-data", title: "Analytics dashboard is missing latest data", category: "Data & analytics", level: "Intermediate", status: "Completed", description: "Trace source objects through the curation job and confirm the refreshed output is available to the dashboard.", services: "S3 · Glue · CloudWatch", icon: "▥" },
  { number: "07", id: "cloud-cost-spike", title: "NAT Gateway / cloud cost spike", category: "Cost & governance", level: "Intermediate", status: "Completed", description: "Break down the cost delta by service, region and usage, then identify unexpected NAT data processing or traffic paths.", services: "Cost Explorer · VPC · NAT Gateway", icon: "$" },
  { number: "08", id: "database-slowdown", title: "Checkout latency / database slowdown", category: "Performance & reliability", level: "Intermediate", status: "Needs final verification", description: "Correlate latency, database pressure and request behaviour to identify the bottleneck before changing capacity.", services: "RDS · CloudWatch · Application logs", icon: "⌁" },
  { number: "09", id: "alb-targets-unhealthy", title: "Application Load Balancer targets unhealthy", category: "Load balancing", level: "Core", status: "Available", description: "Inspect listener rules, target health, health-check path and port, then verify recovery in the console.", services: "ALB · Target Groups · EC2", icon: "⇄" },
  { number: "10", id: "ec2-no-outbound", title: "EC2 instance has no outbound internet access", category: "Networking & connectivity", level: "Core", status: "Available", description: "Follow the egress path through subnet routes, NAT, security groups and network ACLs.", services: "EC2 · VPC · NAT Gateway", icon: "↗" },
  { number: "11", id: "rds-connection-timeout", title: "Application cannot connect to RDS", category: "Networking & databases", level: "Core", status: "Available", description: "Validate endpoint, port, subnet path, database security group and client configuration.", services: "RDS · VPC · Security Groups", icon: "▦" },
  { number: "12", id: "s3-access-denied", title: "S3 object operation returns AccessDenied", category: "Identity & storage", level: "Core", status: "Available", description: "Compare identity and bucket policies, object ownership and encryption permissions.", services: "S3 · IAM · KMS", icon: "▤" },
  { number: "13", id: "lambda-timeout", title: "Lambda function times out", category: "Serverless", level: "Intermediate", status: "Available", description: "Inspect function configuration, logs, downstream calls and VPC networking to isolate the delay.", services: "Lambda · CloudWatch · VPC", icon: "λ" },
];

const groups = [
  { title: "Networking & connectivity", description: "Routes, reachability and private service paths", ids: ["vm-unreachable", "private-connectivity", "ec2-no-outbound"] },
  { title: "Identity & security", description: "Permissions, access boundaries and audit evidence", ids: ["access-denied", "ai-access-denied", "s3-access-denied"] },
  { title: "Generative AI & RAG", description: "Document freshness, ingestion and grounded answers", ids: ["rag-stale-answers"] },
  { title: "Data & analytics", description: "Source freshness and processing pipelines", ids: ["stale-data"] },
  { title: "Cost & governance", description: "Usage analysis and NAT Gateway spend", ids: ["cloud-cost-spike"] },
  { title: "Performance & reliability", description: "Database pressure, latency and health checks", ids: ["database-slowdown", "alb-targets-unhealthy", "lambda-timeout"] },
];

export default function TroubleshootingPage() {
  const completed = labs.filter((lab) => lab.status === "Completed").length;
  return <main className="lab-directory">
    <header className="lab-directory-header">
      <div className="lab-directory-brand"><span className="lab-directory-mark">VC</span><span>VISUAL CLOUD LEARNING <small> / TROUBLESHOOTING LABS</small></span></div>
      <Link className="lab-directory-back" href="/">← Back to learning library</Link>
    </header>
    <section className="lab-directory-hero">
      <div><p className="lab-directory-eyebrow">HANDS-ON CLOUD OPERATIONS</p><h1>Troubleshooting <span>Lab Library</span></h1><p className="lab-directory-intro">Choose an incident, follow the architecture and investigate using a console-style simulator. The learning guidance stays outside the console; simulated console screens focus on the controls and evidence a cloud engineer would actually inspect.</p></div>
      <div className="lab-directory-stats"><div><strong>{labs.length}</strong><span>LAB SCENARIOS</span></div><div><strong>{completed}</strong><span>COMPLETED</span></div><div><strong>{groups.length}</strong><span>CATEGORIES</span></div></div>
    </section>
    <section className="lab-directory-toolbar"><div><p className="lab-directory-eyebrow">BROWSE BY CATEGORY</p><h2>Pick a lab to begin</h2></div><p>Each card opens its own lab page with an architecture walkthrough, investigation steps and console simulator where implemented.</p></section>
    <nav className="lab-directory-categories" aria-label="Lab categories">{groups.map((group) => <a key={group.title} href={"#category-" + group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}><span>{group.title}</span><b>{group.ids.length.toString().padStart(2, "0")}</b></a>)}</nav>
    {groups.map((group) => <section className="lab-directory-group" id={"category-" + group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={group.title}>
      <div className="lab-directory-group-heading"><div><p className="lab-directory-eyebrow">CATEGORY</p><h2>{group.title}</h2><p>{group.description}</p></div><span>{group.ids.length.toString().padStart(2, "0")} LABS</span></div>
      <div className="lab-directory-grid">{group.ids.map((id) => { const lab = labs.find((item) => item.id === id)!; return <Link className="lab-directory-card" href={"/troubleshooting/labs/" + lab.id} key={lab.id}>
        <div className="lab-directory-card-top"><span className="lab-directory-icon">{lab.icon}</span><span className={"lab-directory-status " + (lab.status === "Completed" ? "is-complete" : lab.status === "Needs final verification" ? "is-review" : "is-available")}>{lab.status}</span></div>
        <p className="lab-directory-card-category">{lab.category}</p><h3>{lab.number}. {lab.title}</h3><p className="lab-directory-card-description">{lab.description}</p>
        <div className="lab-directory-card-meta"><span>{lab.level}</span><span>{lab.services}</span></div><span className="lab-directory-open">Open lab <b>↗</b></span>
      </Link>; })}</div>
    </section>)}
    <footer className="lab-directory-footer"><span>All labs use illustrative evidence and simulated cloud resources; no real cloud resources are modified.</span><Link href="/troubleshooting/simulators/aws">Open AWS console simulator ↗</Link></footer>
  </main>;
}
