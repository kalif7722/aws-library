"use client";

import { useState } from "react";
import "./AwsSecurityCourseGuide.css";

type Visual = { kind: string; title: string; subtitle: string; nodes: string[]; explanation: string; cue: string };
type Task = { title: string; ask: string; focus: string[]; services: string[]; flow: string[]; visual: Visual };
type Domain = { number: string; title: string; weight: string; outcome: string; flow: string[]; tasks: Task[] };

const V = (kind: string, title: string, subtitle: string, nodes: string[], explanation: string, cue: string): Visual => ({ kind, title, subtitle, nodes, explanation, cue });
const taskId = (title: string) => {
  const match = title.match(/Task (\d+)\.(\d+)/);
  return match ? match[1] + "-" + match[2] : "";
};

const domains: Domain[] = [
  {
    number: "01", title: "Fundamentals of AI and ML", weight: "20%", outcome: "Recognize core AI and ML concepts, practical use cases, and the lifecycle from data to production.", flow: ["Define the AI problem", "Choose the learning approach", "Match the use case", "Measure business value"],
    tasks: [
      { title: "Task 1.1: Explain basic AI concepts and terminologies", ask: "Explain the vocabulary, data types, learning approaches, inference patterns, and differences between AI, ML, GenAI, and agentic AI.", focus: ["AI, ML, deep learning, neural networks, models, algorithms, training, inference, bias, fairness, LLMs, GenAI, and agentic AI", "Supervised, unsupervised, and reinforcement learning; labeled and unlabeled data; batch, real-time, asynchronous, and serverless inference"], services: ["Amazon SageMaker AI", "Amazon Bedrock", "Amazon Comprehend", "Amazon Rekognition"], flow: ["Classify the AI concept.", "Identify the data and learning type.", "Choose the inference pattern.", "Explain the expected output and limitation."], visual: V("matrix", "AI concepts form a connected vocabulary", "Separate data, learning, model, inference, and outcome", ["Data", "Learn", "Model", "Infer", "Outcome"], "AI questions become clearer when the data type, learning method, model behavior, inference mode, and business outcome are separated.", "Know the difference between prediction, generation, classification, clustering, and agentic action.") },
      { title: "Task 1.2: Identify practical use cases for AI", ask: "Select suitable AI or ML techniques and AWS managed services for practical business problems.", focus: ["Regression, classification, clustering, computer vision, NLP, speech, recommendations, fraud detection, forecasting, knowledge bases, and agentic AI", "When traditional ML or foundation models fit better based on cost, regulation, explainability, operational constraints, and required outcome"], services: ["Amazon SageMaker AI", "Amazon Transcribe", "Amazon Translate", "Amazon Comprehend", "Amazon Lex", "Amazon Polly"], flow: ["Describe the business decision.", "Select the AI capability.", "Match the managed service.", "Check value, risk, and feasibility."], visual: V("decision", "Use the simplest AI capability that fits", "Start with the business decision, not the model name", ["Problem", "Data", "Technique", "Service", "Value"], "A practical AI choice balances business value, available data, required accuracy, explainability, cost, latency, and operational ownership.", "Use a managed AI service when the capability is already available and the business does not need to build the model.") },
      { title: "Task 1.3: Describe the AI/ML development lifecycle", ask: "Describe the lifecycle from problem framing and data preparation through training, deployment, monitoring, retraining, and production readiness.", focus: ["Data and feature preparation, experimentation, model training, evaluation, deployment, monitoring, retraining, and technical debt", "Foundation model sources, managed APIs, self-hosted APIs, MLOps repeatability, model metrics, and business metrics"], services: ["Amazon SageMaker AI", "Amazon Bedrock", "Amazon S3", "Amazon CloudWatch"], flow: ["Frame the problem and data.", "Experiment and train.", "Deploy and monitor.", "Improve and retrain."], visual: V("cycle", "AI value is a lifecycle, not a single model call", "Experiment, deploy, measure, and improve", ["Frame", "Prepare", "Train", "Deploy", "Monitor"], "Production AI requires repeatable data, model, deployment, monitoring, feedback, and retraining processes.", "Distinguish model metrics such as precision and recall from business metrics such as cost per user, ROI, and customer feedback.") }
    ]
  },
  {
    number: "02", title: "Fundamentals of GenAI", weight: "24%", outcome: "Explain how generative AI works, where it fits, and which AWS infrastructure supports GenAI applications.", flow: ["Understand generation", "Assess capability", "Choose the pattern", "Build the foundation"],
    tasks: [
      { title: "Task 2.1: Explain the basic concepts of generative AI (GenAI)", ask: "Explain foundation models, tokens, embeddings, transformers, context, inference, multimodality, and common GenAI patterns.", focus: ["Foundation models, large language models, tokens, embeddings, transformers, context windows, temperature, hallucinations, and multimodal models", "Text generation, summarization, classification, extraction, image generation, code generation, and conversational experiences"], services: ["Amazon Bedrock", "Amazon SageMaker AI", "Amazon Nova", "Amazon Q"], flow: ["Identify the generation task.", "Choose the model capability.", "Shape the prompt and context.", "Validate the generated result."], visual: V("flow", "GenAI transforms context into generated output", "Model capability, prompt, context, and evaluation work together", ["Prompt", "Context", "Model", "Output", "Evaluate"], "Generative AI produces new content from learned patterns, but output quality depends on model capability, instructions, context, sampling, and evaluation.", "A foundation model is general-purpose; a business solution still needs grounding, guardrails, evaluation, and monitoring.") },
      { title: "Task 2.2: Understand the capabilities and limitations of GenAI for solving business problems", ask: "Evaluate GenAI opportunities, limitations, risks, and cost trade-offs for business use cases.", focus: ["Accuracy, hallucination, bias, explainability, privacy, latency, token cost, context limits, model selection, and human review", "When GenAI is appropriate for drafting, summarization, search, assistants, and generation; when deterministic logic or traditional ML is safer"], services: ["Amazon Bedrock", "Amazon Bedrock Guardrails", "Amazon Q Business", "Amazon SageMaker AI"], flow: ["Define the business outcome.", "Test model capability and limits.", "Add grounding and human review.", "Measure quality, risk, and cost."], visual: V("matrix", "GenAI value depends on risk and control", "Match autonomy to the consequence of error", ["Use case", "Model", "Risk", "Control", "Value"], "GenAI decisions should balance quality, uncertainty, data sensitivity, latency, cost, explainability, and the required level of human oversight.", "Do not use a generative model when a deterministic rule or verified data lookup is the safer solution.") },
      { title: "Task 2.3: Describe AWS infrastructure and technologies for building GenAI applications", ask: "Describe the AWS services, architecture components, and managed capabilities used to build GenAI applications.", focus: ["Amazon Bedrock models, inference, knowledge bases, agents, guardrails, prompt management, model evaluation, and data grounding", "S3, IAM, KMS, VPC connectivity, CloudWatch, SageMaker AI, vector stores, APIs, and application integration"], services: ["Amazon Bedrock", "Amazon SageMaker AI", "Amazon S3", "AWS Identity and Access Management (IAM)", "AWS Key Management Service (KMS)"], flow: ["Choose the model access path.", "Secure data and identity.", "Add grounding and controls.", "Observe quality, usage, and cost."], visual: V("pipeline", "A GenAI application is an AWS system", "Model access is one layer in a secure application architecture", ["Data", "Ground", "Model", "Guard", "App"], "A production GenAI architecture includes data, identity, network, model access, grounding, guardrails, observability, and application integration.", "Choose managed model access when it reduces operational burden without violating control or data requirements.") }
    ]
  },
  {
    number: "03", title: "Applications of Foundation Models", weight: "28%", outcome: "Design, prompt, adapt, and evaluate foundation-model applications for reliable business outcomes.", flow: ["Design the application", "Engineer the prompt", "Adapt the model", "Evaluate performance"],
    tasks: [
      { title: "Task 3.1: Describe design considerations for applications that use foundation models (FMs)", ask: "Choose architecture patterns for foundation-model applications based on data, latency, control, cost, and user experience requirements.", focus: ["Prompt-based applications, retrieval augmented generation, agents, knowledge bases, vector search, model choice, context, latency, throughput, and cost", "Data grounding, access control, session memory, human review, failure handling, and multi-model architecture"], services: ["Amazon Bedrock", "Amazon Bedrock Knowledge Bases", "Amazon Bedrock Agents", "Amazon OpenSearch Service"], flow: ["Define the user task.", "Choose context and grounding.", "Select model and orchestration.", "Control access, cost, and failure."], visual: V("decision", "Foundation-model design is a context decision", "Choose model, knowledge, tools, and controls together", ["Task", "Context", "Model", "Tools", "Control"], "FM application design connects user intent to context, model behavior, retrieval, tools, session state, safety, and measurable outcomes.", "Use retrieval or tools when the model needs current, private, or verifiable information.") },
      { title: "Task 3.2: Choose effective prompt engineering techniques", ask: "Select prompting techniques that improve clarity, consistency, grounding, and output format.", focus: ["Zero-shot, few-shot, role, system instructions, delimiters, decomposition, chain-of-thought handling, prompt templates, structured output, and negative constraints", "Prompt injection awareness, context selection, examples, output validation, and iterative testing"], services: ["Amazon Bedrock", "Amazon Bedrock Prompt Management", "Amazon Q", "Amazon SageMaker AI"], flow: ["State the task and role.", "Provide relevant context and examples.", "Specify the output contract.", "Test edge cases and revise."], visual: V("flow", "A prompt is an interface contract", "Instruction, context, examples, and output format reduce ambiguity", ["Role", "Task", "Context", "Format", "Test"], "Effective prompts make the task, constraints, context, examples, and expected output explicit while testing ambiguity, injection, and failure cases.", "Prompt engineering improves behavior, but it does not replace access control, grounding, evaluation, or application validation.") },
      { title: "Task 3.3: Describe the training and fine-tuning process for FMs", ask: "Describe when to use pre-training, fine-tuning, continued pre-training, instruction tuning, or retrieval instead of changing the model.", focus: ["Training data, labeling, compute, hyperparameters, epochs, overfitting, transfer learning, fine-tuning, adapters, and reinforcement learning from human feedback", "Prompt engineering versus retrieval versus fine-tuning; data quality, privacy, cost, model versioning, and evaluation before release"], services: ["Amazon Bedrock Custom Model Import", "Amazon SageMaker AI", "Amazon SageMaker JumpStart", "Amazon S3"], flow: ["Define the behavior gap.", "Choose retrieval, prompt, or tuning.", "Prepare secure representative data.", "Train, evaluate, version, and deploy."], visual: V("matrix", "Adapt the model only when the gap requires it", "Retrieval, prompting, and tuning solve different problems", ["Need", "Prompt", "Retrieve", "Tune", "Evaluate"], "Prompting changes instructions, retrieval supplies current context, and fine-tuning changes model behavior using representative data and controlled evaluation.", "Do not fine-tune simply because the model lacks current facts; retrieval is usually the better fit for changing knowledge.") },
      { title: "Task 3.4: Describe methods to evaluate FM performance", ask: "Evaluate foundation-model quality, safety, usefulness, and business impact using appropriate metrics and test sets.", focus: ["Human evaluation, automated evaluation, ground-truth comparison, relevance, faithfulness, toxicity, bias, robustness, latency, cost, and task success", "Representative datasets, golden answers, prompt regression tests, model comparison, red teaming, and production feedback"], services: ["Amazon Bedrock Model Evaluation", "Amazon SageMaker AI", "Amazon Bedrock Guardrails", "Amazon CloudWatch"], flow: ["Define success and failure.", "Build representative test cases.", "Measure quality and risk.", "Compare, monitor, and improve."], visual: V("cycle", "FM evaluation must reflect the real task", "Quality, safety, cost, and business impact are all signals", ["Test set", "Quality", "Safety", "Cost", "Decision"], "Foundation-model evaluation combines automated metrics, human judgment, safety checks, business measures, and production monitoring.", "A high language score does not prove factuality, safety, or business usefulness.") }
    ]
  },
  {
    number: "04", title: "Guidelines for Responsible AI", weight: "14%", outcome: "Recognize fairness, transparency, explainability, privacy, safety, and human oversight requirements for responsible AI.", flow: ["Identify harm", "Measure bias", "Explain behavior", "Govern use"],
    tasks: [
      { title: "Task 4.1: Explain the development of AI systems that are responsible", ask: "Recognize responsible-AI principles and development practices that reduce bias, privacy risk, unsafe output, and unintended harm.", focus: ["Fairness, inclusiveness, robustness, safety, privacy, security, transparency, explainability, accountability, and human oversight", "Representative data, bias testing, content filters, guardrails, monitoring, documentation, red teaming, and feedback loops"], services: ["Amazon SageMaker Clarify", "Amazon Bedrock Guardrails", "Amazon Bedrock", "AWS Audit Manager"], flow: ["Identify affected users.", "Assess data and model risk.", "Apply controls and human review.", "Monitor outcomes and improve."], visual: V("layers", "Responsible AI is built across the lifecycle", "Principles become controls, tests, and accountable decisions", ["Data", "Model", "Control", "Human", "Monitor"], "Responsible AI requires practical controls across data, model development, deployment, user interaction, monitoring, and governance.", "Treat fairness and safety as measurable engineering concerns, not only policy statements.") },
      { title: "Task 4.2: Recognize the importance of transparent and explainable models", ask: "Explain why transparency, interpretability, explainability, documentation, and user communication matter for AI systems.", focus: ["Model cards, data documentation, feature importance, explainability methods, confidence, uncertainty, human review, auditability, and disclosure", "Trade-offs between model complexity and explainability; communicating limitations and appropriate use to stakeholders"], services: ["Amazon SageMaker Clarify", "Amazon SageMaker Model Monitor", "AWS Audit Manager", "Amazon Bedrock"], flow: ["Document the model and data.", "Explain the decision or output.", "Communicate uncertainty and limits.", "Audit and review the use."], visual: V("decision", "Explainability connects the model to the decision", "Users need context, evidence, limits, and recourse", ["Model", "Reason", "Confidence", "User", "Review"], "Transparency and explainability help users understand model behavior, detect errors, support accountability, and make informed decisions.", "Explainability requirements increase when decisions affect people, rights, safety, or regulated outcomes.") }
    ]
  },
  {
    number: "05", title: "Security, Compliance, and Governance for AI Solutions", weight: "14%", outcome: "Secure AI data and workloads while applying governance, compliance, access, monitoring, and lifecycle controls.", flow: ["Protect the data", "Control access", "Monitor usage", "Prove compliance"],
    tasks: [
      { title: "Task 5.1: Explain methods to secure AI systems", ask: "Recognize identity, data, network, application, model, prompt, and output controls for secure AI solutions.", focus: ["IAM least privilege, KMS encryption, private connectivity, data isolation, prompt injection, data leakage, model access, guardrails, logging, and secrets management", "S3 security, VPC endpoints, CloudTrail, CloudWatch, Macie, vulnerability management, abuse prevention, and human approval"], services: ["AWS Identity and Access Management (IAM)", "AWS Key Management Service (KMS)", "Amazon Bedrock Guardrails", "Amazon Macie", "AWS CloudTrail"], flow: ["Classify data and threats.", "Apply identity and encryption controls.", "Constrain prompts, outputs, and network paths.", "Monitor, detect, and respond."], visual: V("layers", "AI security spans data, model, and interaction", "Protect inputs, processing, outputs, identities, and evidence", ["Data", "Identity", "Model", "Output", "Audit"], "Secure AI systems require layered controls around data, identity, model access, prompts, outputs, network paths, monitoring, and response.", "Apply least privilege to both people and applications that can invoke or configure AI services.") },
      { title: "Task 5.2: Recognize governance and compliance regulations for AI systems", ask: "Recognize governance, risk, compliance, data residency, audit, and organizational controls that apply to AI systems.", focus: ["Data classification, retention, residency, consent, intellectual property, audit evidence, model inventory, acceptable use, risk assessment, and third-party governance", "AWS shared responsibility, service terms, access reviews, change control, incident response, documentation, and continuous monitoring"], services: ["AWS Audit Manager", "AWS Artifact", "AWS Config", "AWS Organizations", "AWS Control Tower"], flow: ["Identify obligations and ownership.", "Classify data and AI use.", "Implement policy and evidence.", "Review changes and compliance continuously."], visual: V("matrix", "AI governance makes responsibility visible", "Map use, data, control, evidence, and accountable owner", ["Use", "Data", "Policy", "Evidence", "Owner"], "AI governance connects business purpose, data rights, security controls, model risk, regulatory obligations, audit evidence, and accountable ownership.", "Compliance is not proven by a model choice alone; it requires controls, evidence, reviews, and operating processes.") }
    ]
  }
];

const openService = (name: string) => {
  window.dispatchEvent(new CustomEvent("aws-course-service", { detail: { name, courseCode: "AIF" } }));
  requestAnimationFrame(() => document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth", block: "start" }));
};

function Walkthrough({ task }: { task: Task }) {
  const [full, setFull] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  const key = taskId(task.title);
  const base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/aif-c01-tasks";
  const items = ["primary", "companion"].map(kind => ({ kind, src: base + "/aif-c01-task-" + key + "-" + kind + ".png" }));
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
    <span>{taskId(task.title).replace("-", ".")}</span><strong>{task.title.replace(/^Task \d+\.\d+: /, "")}</strong>
  </button>;
}

export default function AwsAiPractitionerCourseGuide() {
  const [domainIndex, setDomainIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const domain = domains[domainIndex];
  const task = domain.tasks[taskIndex];
  const selectDomain = (index: number) => { setDomainIndex(index); setTaskIndex(0); };
  return <section className="aws-security-course" id="curriculum" data-course-layout="shared-task-shell-v2">
    <div className="aws-security-course-header">
      <div className="aws-security-course-header-main">
        <p className="aws-security-kicker">AWS CERTIFIED AI PRACTITIONER · AIF-C01 · TASK-FIRST COURSE</p>
        <h1>AI concepts, foundation models, responsible AI, and secure AWS solutions</h1>
        <p>Study each official AIF-C01 task through a visual explainer, practical architecture, service decisions, and exam-focused memory hooks.</p>
      </div>
      <div className="aws-security-course-stats">
        <strong>05</strong><span>exam domains</span>
        <strong>14</strong><span>official tasks</span>
        <strong>700</strong><span>passing scaled score</span>
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
            <p className="aws-security-label">VISUAL EXPLAINER · AIF-C01</p><h3>{task.visual.title}</h3><p>{task.visual.subtitle}</p>
            <div className="aws-security-flow">{task.visual.nodes.map((node, index) => <span key={node}>{node}{index < task.visual.nodes.length - 1 && <i>→</i>}</span>)}</div>
            <p className="aws-security-explanation">{task.visual.explanation}</p>
          </div>
          <div className="aws-security-focus-card">
            <p className="aws-security-label">GUIDE-ALIGNED FOCUS</p>
            {task.focus.map(item => <p key={item}>{item}</p>)}
            <p className="aws-security-label">RELATED AIF-C01 SERVICES</p>
            <div className="aws-security-services">{task.services.map(service => <button type="button" key={service} onClick={() => openService(service)}>{service} ↗</button>)}</div>
          </div>
        </div>
        <div className="aws-security-flow-card"><p className="aws-security-label">TASK-TO-DESIGN FLOW</p><div>{task.flow.map((step, index) => <article key={step}><b>0{index + 1}</b><span>{step}</span></article>)}</div></div>
        <Walkthrough task={task} />
        <div className="aws-security-memory"><b>EXAM MEMORY HOOK</b><span>{task.visual.cue}</span></div>
      </main>
    </div>
  </section>;
}
