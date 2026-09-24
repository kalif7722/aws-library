"use client";

import { useState } from "react";
import "./AwsSecurityCourseGuide.css";

type Visual = { kind: string; title: string; subtitle: string; nodes: string[]; explanation: string; cue: string };
type Task = { title: string; ask: string; focus: string[]; services: string[]; flow: string[]; visual: Visual };
type Domain = { number: string; title: string; weight: string; outcome: string; flow: string[]; tasks: Task[] };

const V = (kind: string, title: string, subtitle: string, nodes: string[], explanation: string, cue: string): Visual => ({ kind, title, subtitle, nodes, explanation, cue });
const id = (title: string) => { const match = title.match(/Task (\d+)\.(\d+)/); return match ? match[1] + "-" + match[2] : ""; };

const domains: Domain[] = [
  {
    number: "01", title: "Development with AWS Services", weight: "32%", outcome: "Build, integrate, and persist application behavior with AWS APIs, compute, and data services.", flow: ["Design the application boundary", "Implement the runtime", "Persist and retrieve data", "Prove the behavior"],
    tasks: [
      { title: "Task 1.1: Develop code for applications hosted on AWS", ask: "Use AWS SDKs, APIs, CLI tools, and application configuration to build code that interacts correctly with AWS services.", focus: ["AWS SDKs, APIs, CLI, credentials, regions, endpoints, retries, pagination, and error handling", "Application integration with Lambda, API Gateway, ECS, Elastic Beanstalk, EC2, and event-driven services"], services: ["AWS SDKs and APIs", "AWS Lambda", "Amazon API Gateway", "Amazon ECS"], flow: ["Identify the application boundary.", "Choose the AWS API and credential path.", "Implement retries, errors, and configuration.", "Test the service interaction end to end."], visual: V("flow", "Application code is an AWS integration boundary", "Make credentials, APIs, retries, and runtime behavior explicit", ["Code", "SDK", "Identity", "API", "Result"], "Developer solutions must account for region, credentials, request shape, retries, pagination, errors, and the runtime where the code executes.", "Choose the narrowest SDK or API path and prove the response, failure, and permission behavior.") },
      { title: "Task 1.2: Develop code for AWS Lambda", ask: "Develop event-driven Lambda code with the correct handler, event source, execution role, configuration, concurrency, versioning, and invocation behavior.", focus: ["Lambda handlers, context, environment variables, layers, versions, aliases, concurrency, timeouts, memory, and ephemeral storage", "Synchronous and asynchronous invocation, event source mappings, destinations, retries, DLQs, and idempotency"], services: ["AWS Lambda", "Amazon EventBridge", "Amazon SQS", "AWS Step Functions"], flow: ["Define the event and handler contract.", "Configure execution and scaling.", "Control retries and duplicate events.", "Validate success, failure, and observability."], visual: V("cycle", "Lambda behavior is an event contract", "The handler, event, retry, and destination must agree", ["Event", "Handler", "Runtime", "Retry", "Outcome"], "Lambda design connects the event shape to handler code, execution role, runtime limits, concurrency, retries, and idempotent outcomes.", "Treat retries and duplicate delivery as part of the application design.") },
      { title: "Task 1.3: Use data stores in application development", ask: "Select and use AWS data stores according to access patterns, consistency, transactions, performance, durability, and lifecycle requirements.", focus: ["DynamoDB keys, indexes, capacity, consistency, transactions, streams, and conditional writes", "S3, RDS/Aurora, ElastiCache, OpenSearch, connection handling, caching, and data access patterns"], services: ["Amazon DynamoDB", "Amazon S3", "Amazon Aurora", "Amazon ElastiCache"], flow: ["Classify the access pattern.", "Choose the data model and consistency.", "Implement connection, retry, and cache behavior.", "Measure performance and durability."], visual: V("matrix", "The access pattern chooses the data store", "Model reads, writes, consistency, and growth before coding", ["Access", "Model", "Consistency", "Scale", "Durability"], "Application data design depends on access pattern, item or row shape, consistency, connection behavior, scaling, durability, and recovery.", "Do not choose a database by habit; choose it from the access pattern and failure requirement.") }
    ]
  },
  {
    number: "02", title: "Security", weight: "26%", outcome: "Apply identity, encryption, secrets, and least-privilege controls in application code and AWS services.", flow: ["Identify the caller", "Authorize the action", "Protect the data", "Prove the boundary"],
    tasks: [
      { title: "Task 2.1: Implement authentication and/or authorization for applications and AWS services", ask: "Implement identity and access controls for users, workloads, APIs, resources, and cross-account application interactions.", focus: ["IAM users, roles, policies, STS, Cognito, API Gateway authorizers, resource policies, and policy evaluation", "Least privilege, temporary credentials, role assumption, service-to-service access, and authorization boundaries"], services: ["AWS Identity and Access Management (IAM)", "Amazon Cognito", "AWS Security Token Service (STS)", "Amazon API Gateway"], flow: ["Identify the principal.", "Evaluate the policy boundary.", "Issue temporary or application identity.", "Test allowed and denied actions."], visual: V("decision", "Authorization follows the principal and resource", "Trace identity, policy, action, and resource together", ["Principal", "Policy", "Action", "Resource", "Decision"], "Application authorization depends on who calls, which policy applies, what action is requested, which resource is targeted, and which boundary overrides it.", "Separate authentication from authorization and test both allow and deny paths.") },
      { title: "Task 2.2: Implement encryption by using AWS services", ask: "Use AWS encryption services and application integrations to protect data in transit, at rest, and during key or certificate lifecycle operations.", focus: ["KMS keys, key policies, grants, envelope encryption, rotation, multi-Region keys, and encryption context", "TLS certificates, S3 and DynamoDB encryption, RDS encryption, EBS encryption, and client-side encryption"], services: ["AWS Key Management Service (KMS)", "AWS Certificate Manager", "AWS Secrets Manager", "Amazon S3"], flow: ["Classify the data path.", "Choose the encryption layer and key.", "Control key use and rotation.", "Validate encrypted reads, writes, and transport."], visual: V("layers", "Encryption is a data-path decision", "Protect the payload, key, endpoint, and transport", ["Data", "Key", "Policy", "TLS", "Evidence"], "Encryption design includes the data path, key ownership, key policy, service integration, certificate lifecycle, and the boundary where plaintext is exposed.", "Know whether the requirement is encryption at rest, in transit, client-side, or all three.") },
      { title: "Task 2.3: Manage sensitive data in application code", ask: "Store, retrieve, rotate, and audit application secrets without exposing credentials through source code, configuration, logs, or deployment artifacts.", focus: ["Secrets Manager, Systems Manager Parameter Store, AppConfig, environment variables, IAM roles, and secret rotation", "Secret retrieval, caching, access policies, logging redaction, repository scanning, and separation of configuration from code"], services: ["AWS Secrets Manager", "AWS Systems Manager", "AWS AppConfig", "AWS IAM"], flow: ["Classify the sensitive value.", "Store it in a managed control plane.", "Retrieve it with least privilege.", "Rotate, redact, and audit usage."], visual: V("pipeline", "Sensitive data should not travel with the code", "Separate storage, retrieval, rotation, and audit", ["Secret", "Store", "Role", "Runtime", "Rotate"], "Secure application code keeps secrets out of source, images, logs, and templates while controlling runtime retrieval, rotation, and evidence.", "A secret is not protected if it is merely moved into an environment variable without access control and rotation.") }
    ]
  },
  {
    number: "03", title: "Deployment", weight: "24%", outcome: "Package, test, automate, and release applications through repeatable AWS deployment pipelines.", flow: ["Package the artifact", "Test the change", "Automate the gates", "Release safely"],
    tasks: [
      { title: "Task 3.1: Prepare application artifacts to be deployed to AWS", ask: "Build, package, version, store, and prepare application artifacts and dependencies for deployment to AWS runtimes.", focus: ["Build specifications, dependency packaging, Lambda deployment packages, container images, ECR, S3 artifacts, CodeArtifact, and SAM", "Artifact immutability, versioning, architecture compatibility, configuration separation, and deployment manifests"], services: ["AWS CodeBuild", "Amazon ECR", "AWS CodeArtifact", "Amazon S3"], flow: ["Resolve dependencies.", "Build the deployable artifact.", "Version and store it immutably.", "Validate runtime compatibility."], visual: V("pipeline", "A deployment starts with a trustworthy artifact", "Build once, version once, promote the same artifact", ["Source", "Build", "Artifact", "Version", "Runtime"], "Artifact preparation covers dependencies, architecture, packaging format, version identity, storage, configuration separation, and runtime compatibility.", "Do not let the deployment stage silently rebuild or mutate the artifact.") },
      { title: "Task 3.2: Test applications in development environments", ask: "Test application code, integrations, infrastructure, and deployment behavior in suitable local, isolated, and development environments.", focus: ["Unit, integration, contract, load, and acceptance testing; SAM local, containerized tests, API Gateway stages, Lambda versions, and test data", "Environment isolation, mocks, service integrations, failure injection, logs, traces, and reproducible test configuration"], services: ["AWS CodeBuild", "AWS SAM", "Amazon API Gateway", "AWS X-Ray"], flow: ["Define the test boundary.", "Provision isolated dependencies.", "Run functional and failure tests.", "Capture evidence before promotion."], visual: V("decision", "Test the boundary that can fail", "Mocks are useful only when the real integration is also verified", ["Code", "Mock", "Service", "Trace", "Evidence"], "Development testing must distinguish code defects from integration, configuration, permission, data, and deployment defects.", "Use fast tests for feedback and realistic integration tests before release.") },
      { title: "Task 3.3: Automate deployment testing", ask: "Automate quality, security, infrastructure, and regression tests as gates in an AWS delivery workflow.", focus: ["CodePipeline stages, CodeBuild reports, test specifications, CloudFormation validation, cfn-lint, unit and integration gates", "Approval controls, test artifacts, deployment strategies, rollback signals, and automated promotion criteria"], services: ["AWS CodePipeline", "AWS CodeBuild", "AWS CloudFormation", "AWS CodeDeploy"], flow: ["Define the release gates.", "Run automated test stages.", "Publish reports and evidence.", "Promote or stop based on policy."], visual: V("cycle", "Automation turns quality into a release gate", "A green build must prove more than compilation", ["Commit", "Test", "Report", "Gate", "Promote"], "Automated deployment testing should cover code, infrastructure, security, integration, and regression behavior before promotion.", "A deployment pipeline is safe only when failed evidence blocks release.") },
      { title: "Task 3.4: Deploy code by using AWS Continuous Integration and Continuous Delivery (CI/CD) services", ask: "Design and operate CI/CD deployments for compute, containers, serverless applications, and infrastructure with safe release and rollback behavior.", focus: ["CodePipeline, CodeBuild, CodeDeploy, Elastic Beanstalk, ECS, ECR, Lambda aliases, blue/green, canary, rolling, and all-at-once deployments", "Parameterization, approvals, alarms, rollback, artifact promotion, source integrations, and environment separation"], services: ["AWS CodePipeline", "AWS CodeDeploy", "Amazon ECS", "AWS Lambda"], flow: ["Connect the source and artifact.", "Deploy to the target environment.", "Shift traffic with a release strategy.", "Observe, approve, or roll back."], visual: V("flow", "CI/CD is controlled traffic movement", "Release strategy, alarms, and rollback are one design", ["Source", "Artifact", "Deploy", "Traffic", "Rollback"], "A safe release combines immutable artifacts, environment configuration, deployment strategy, health signals, approvals, and rollback.", "Choose blue/green, canary, rolling, or all-at-once from risk, traffic, and rollback requirements.") }
    ]
  },
  {
    number: "04", title: "Troubleshooting and Optimization", weight: "18%", outcome: "Use evidence to isolate faults, instrument applications, and improve performance, reliability, and cost.", flow: ["Reproduce the symptom", "Collect evidence", "Fix the boundary", "Measure the outcome"],
    tasks: [
      { title: "Task 4.1: Assist in a root cause analysis", ask: "Use logs, metrics, traces, deployment history, configuration, and service signals to identify the root cause of application failures.", focus: ["CloudWatch Logs Insights, metrics, alarms, X-Ray traces, CloudTrail, deployment events, health checks, and distributed request context", "Hypothesis-driven investigation, correlation IDs, failure boundaries, rollback evidence, and incident timelines"], services: ["Amazon CloudWatch", "AWS X-Ray", "AWS CloudTrail", "AWS Systems Manager"], flow: ["Reproduce and scope the symptom.", "Correlate logs, metrics, and traces.", "Test the most likely boundary.", "Verify the fix and document evidence."], visual: V("decision", "Root cause analysis follows evidence", "Trace the request, change, dependency, and failure", ["Symptom", "Signal", "Trace", "Change", "Cause"], "Root cause analysis separates symptom from cause by correlating application behavior with AWS service signals, deployment changes, configuration, and dependencies.", "Start with a hypothesis and evidence, not a random configuration change.") },
      { title: "Task 4.2: Instrument code for observability", ask: "Add logs, metrics, traces, correlation context, and alarms that make application behavior measurable and diagnosable.", focus: ["Structured logging, custom metrics, CloudWatch Logs and alarms, X-Ray SDK, segments, annotations, metadata, and OpenTelemetry", "Request IDs, latency, errors, throttles, saturation, dashboards, sampling, retention, and alert quality"], services: ["Amazon CloudWatch", "AWS X-Ray", "AWS Distro for OpenTelemetry", "Amazon API Gateway"], flow: ["Define the question to answer.", "Emit structured signals.", "Correlate across services.", "Alert on meaningful change."], visual: V("pipeline", "Observability makes runtime behavior explainable", "Logs, metrics, and traces answer different questions", ["Log", "Metric", "Trace", "Dashboard", "Alert"], "Good instrumentation connects request context, structured events, measurements, traces, dashboards, and alerts without creating noisy or unsafe telemetry.", "Instrument for diagnosis and action, not simply for volume.") },
      { title: "Task 4.3: Optimize applications by using AWS services and features", ask: "Improve application performance, scalability, reliability, and cost by selecting and tuning AWS services and features.", focus: ["Lambda memory and concurrency, DynamoDB capacity and indexes, caching, S3 transfer, CloudFront, API Gateway caching, database connections, and asynchronous patterns", "Right-sizing, batching, pagination, compression, retries, quotas, service limits, cost allocation, and performance measurement"], services: ["AWS Lambda", "Amazon DynamoDB", "Amazon CloudFront", "Amazon ElastiCache"], flow: ["Measure the bottleneck.", "Choose the smallest effective change.", "Tune the service and code.", "Validate performance, reliability, and cost."], visual: V("matrix", "Optimization is measured trade-off", "Improve the bottleneck without creating a new one", ["Measure", "Bottleneck", "Change", "Result", "Cost"], "Application optimization balances latency, throughput, availability, operational complexity, quotas, and cost using measured evidence.", "Optimize the limiting resource and re-measure the whole request path.") }
    ]
  }
];

const openDvaService = (name: string) => {
  window.dispatchEvent(new CustomEvent("aws-course-service", { detail: { name, courseCode: "DVA" } }));
};

function Walkthrough({ task }: { task: Task }) {
  const [full, setFull] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  const key = id(task.title);
  const base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/dva-c02-tasks";
  const items = ["primary", "companion"].map(kind => ({ kind, src: base + "/dva-c02-task-" + key + "-" + kind + ".png" }));
  return <div className="aws-security-walkthrough">
    <div className="aws-security-walkthrough-head"><b>WALKTHROUGH · {key.replace("-", ".")}</b><span>Click any board to open full screen</span></div>
    <div className="aws-security-walkthrough-grid">
      {items.map(item => <figure key={item.src}>
        <figcaption>{item.kind === "primary" ? "PRIMARY WALKTHROUGH" : "COMPANION COVERAGE"}</figcaption>
        <button type="button" onClick={event => { const image = event.currentTarget.querySelector("img"); if (image) setFull(image.currentSrc); }}>
          <img src={item.src} alt={task.title + " " + item.kind + " walkthrough"} loading="lazy" onError={event => { const image = event.currentTarget; if (!image.dataset.fallback) { image.dataset.fallback = "webp"; image.src = image.src.replace(/\.png$/, ".webp"); } else { image.style.display = "none"; setMissing(true); } }} />
          <span>Open full screen</span>
        </button>
      </figure>)}
    </div>
    {missing && <div className="aws-security-walkthrough-missing">Walkthrough guide will appear here once the matching image is uploaded.</div>}
    {full && <div className="aws-security-lightbox" role="dialog" aria-modal="true" onClick={() => setFull(null)}><button type="button" aria-label="Close full-screen walkthrough" onClick={() => setFull(null)}>×</button><img src={full} alt={task.title + " full-screen walkthrough"} onClick={event => event.stopPropagation()} /></div>}
  </div>;
}

function TaskCard({ task, active, onSelect }: { task: Task; active: boolean; onSelect: () => void }) {
  return <button type="button" className={"aws-aif-task " + (active ? "active" : "")} onClick={onSelect}>
    <span>{id(task.title).replace("-", ".")}</span><strong>{task.title.replace(/^Task \d+\.\d+: /, "")}</strong>
  </button>;
}

export default function AwsDeveloperAssociateCourseGuide() {
  const [domainIndex, setDomainIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const domain = domains[domainIndex];
  const task = domain.tasks[taskIndex];
  const selectDomain = (index: number) => { setDomainIndex(index); setTaskIndex(0); };
  return <section className="aws-security-course" id="dva-exam-guide" data-course-layout="shared-task-shell-v2">
    <div className="aws-security-course-header">
      <div className="aws-security-course-header-main">
        <p className="aws-security-kicker">AWS CERTIFIED DEVELOPER – ASSOCIATE · DVA-C02 · TASK-FIRST COURSE</p>
        <h1>Build, secure, deploy, and optimize AWS applications</h1>
        <p>Study each official DVA-C02 task through a visual explainer, development and deployment patterns, related services, and exam-focused memory hooks.</p>
      </div>
      <div className="aws-security-course-stats">
        <strong>04</strong><span>exam domains</span>
        <strong>13</strong><span>official tasks</span>
        <strong>720</strong><span>passing scaled score</span>
      </div>
    </div>
    <div className="aws-security-domain-tabs">{domains.map((item, index) => <button type="button" key={item.number} className={domainIndex === index ? "active" : ""} onClick={() => selectDomain(index)}><span>{item.number}</span><strong>{item.title}</strong><em>{item.weight}</em></button>)}</div>
    <div className="aws-security-layout">
      <aside className="aws-security-task-list">
        <div className="aws-security-task-list-title">TASKS · {domain.title}</div>
        {domain.tasks.map((item, index) => <TaskCard task={item} active={index === taskIndex} onSelect={() => setTaskIndex(index)} key={item.title} />)}
      </aside>
      <main className="aws-security-main">
        <p className="aws-security-kicker">DOMAIN {domain.number} · {domain.weight} · OFFICIAL OBJECTIVE</p>
        <h2>{task.title.replace(/^Task \d+\.\d+: /, "")}</h2>
        <p className="aws-security-breadcrumb">{domain.title} → {task.title}</p>
        <div className="aws-security-ask"><b>WHAT THIS TASK ASKS</b><span>{task.ask}</span></div>
        <div className="aws-security-content-grid">
          <div className="aws-security-visual-card">
            <p className="aws-security-label">VISUAL EXPLAINER · DVA-C02</p><h3>{task.visual.title}</h3><p>{task.visual.subtitle}</p>
            <div className="aws-security-flow">{task.visual.nodes.map((node, index) => <span key={node}>{node}{index < task.visual.nodes.length - 1 && <i>→</i>}</span>)}</div>
            <p className="aws-security-explanation">{task.visual.explanation}</p>
          </div>
          <div className="aws-security-focus-card">
            <p className="aws-security-label">GUIDE-ALIGNED FOCUS</p>
            {task.focus.map(item => <p key={item}>{item}</p>)}
            <p className="aws-security-label">RELATED DVA-C02 SERVICES</p>
            <div className="aws-security-services">{task.services.map(service => <button type="button" key={service} onClick={() => openDvaService(service)}>{service} ↗</button>)}</div>
          </div>
        </div>
        <div className="aws-security-flow-card"><p className="aws-security-label">TASK-TO-DESIGN FLOW</p><div>{task.flow.map((step, index) => <article key={step}><b>0{index + 1}</b><span>{step}</span></article>)}</div></div>
        <Walkthrough key={task.title} task={task} />
        <div className="aws-security-memory"><b>EXAM MEMORY HOOK</b><span>{task.visual.cue}</span></div>
      </main>
    </div>
  </section>;
}
