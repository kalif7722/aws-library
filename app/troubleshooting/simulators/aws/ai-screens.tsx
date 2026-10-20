"use client";

import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import {
  createAwsSageMakerTrainingJob,
  getAwsAiProcessingJobs,
  getAwsBedrockGuardrails,
  getAwsBedrockKnowledgeBases,
  getAwsBedrockModels,
  getAwsQBusinessApplications,
  getAwsQDeveloperUsers,
  getAwsSageMakerEndpoints,
  getAwsSageMakerModels,
  getAwsSageMakerTrainingJobs,
  invokeAwsBedrockModel,
  invokeAwsSageMakerEndpoint,
  putAwsS3Object,
  runAwsAiProcessingJob,
  setAwsSageMakerEndpointInstanceCount,
  submitAwsBedrockUseCase,
  syncAwsBedrockKnowledgeBase,
  syncAwsQBusinessApplication,
  updateAwsBedrockGuardrail,
  updateAwsQDeveloperUser,
  type AwsLabState,
} from "./engine";

export type AwsAiScreen =
  | "Bedrock"
  | "SageMaker AI"
  | "Comprehend"
  | "Textract"
  | "Amazon Q Business"
  | "Amazon Q Developer";

type Props = {
  screen: AwsAiScreen;
  state: AwsLabState;
  setState: Dispatch<SetStateAction<AwsLabState>>;
  tab: string;
  setTab: (tab: string) => void;
  notify: (message: string) => void;
};

const Status = ({ value, good }: { value: string; good?: boolean }) => (
  <span className={"aws-sim-status " + (good ? "good" : ["Available", "ACTIVE", "READY", "Completed", "InService", "SUCCEEDED", "Active", "Pro"].includes(value) ? "good" : "bad")}>{value}</span>
);

const PanelTitle = ({ title, detail, action }: { title: string; detail?: string; action?: ReactNode }) => (
  <div className="aws-sim-panel-title"><div><h2>{title}</h2>{detail && <p>{detail}</p>}</div>{action}</div>
);

const Tabs = ({ values, selected, onSelect }: { values: string[]; selected: string; onSelect: (value: string) => void }) => (
  <div className="aws-sim-tabs">{values.map(value => <button type="button" key={value} className={selected === value ? "active" : ""} onClick={() => onSelect(value)}>{value}</button>)}</div>
);

type RagDocument = { id: string; name: string; version: number; extractedText: string; indexedText: string; status: "INDEXED" | "PENDING"; updatedAt: string; source: "mock" | "upload" };
type AiValidationCheck = { label: string; passed: boolean; detail: string };

function decodePdfLiteral(value: string): string {
  return value.replace(/\\([nrtbf()\\])/g, (_, c: string) => ({ n: "\n", r: "\r", t: "\t", b: "\b", f: "\f", "(": "(", ")": ")", "\\": "\\" } as Record<string, string>)[c] ?? c)
    .replace(/\\([0-7]{1,3})/g, (_, octal: string) => String.fromCharCode(parseInt(octal, 8)))
    .replace(/\\\r?\n/g, "");
}

function extractTextOperators(streamText: string): string {
  const values: string[] = [];
  const literal = /\(((?:\\.|[^\\)])*)\)\s*Tj/g;
  let match: RegExpExecArray | null;
  while ((match = literal.exec(streamText))) values.push(decodePdfLiteral(match[1]));
  const arrays = /\[((?:.|\n)*?)\]\s*TJ/g;
  while ((match = arrays.exec(streamText))) {
    const strings = match[1].matchAll(/\(((?:\\.|[^\\)])*)\)/g);
    for (const item of strings) values.push(decodePdfLiteral(item[1]));
  }
  return values.join(" ").replace(/\s+/g, " ").trim();
}

/** Lightweight text-layer extraction for common text-based PDFs. Scanned PDFs need OCR. */
async function extractPdfText(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const header = new TextDecoder("latin1").decode(bytes.subarray(0, 8));
  if (!header.startsWith("%PDF-")) throw new Error("The selected file does not have a valid PDF header.");
  const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join("");
  const streamStarts = [...binary.matchAll(/stream\r?\n/g)];
  const extracted: string[] = [];
  for (const item of streamStarts) {
    const start = (item.index ?? 0) + item[0].length;
    const end = binary.indexOf("endstream", start);
    if (end < 0) continue;
    const dictionary = binary.slice(Math.max(0, start - 1200), start);
    const streamBytes = bytes.slice(start, end > start && bytes[end - 1] === 10 ? end - (bytes[end - 2] === 13 ? 2 : 1) : end);
    let streamText = "";
    if (/\/FlateDecode/.test(dictionary) && typeof DecompressionStream !== "undefined") {
      try {
        const buffer = streamBytes.buffer.slice(streamBytes.byteOffset, streamBytes.byteOffset + streamBytes.byteLength) as ArrayBuffer;
        const inflated = new Blob([buffer]).stream().pipeThrough(new DecompressionStream("deflate"));
        streamText = new TextDecoder("latin1").decode(await new Response(inflated).arrayBuffer());
      } catch { continue; }
    } else {
      streamText = new TextDecoder("latin1").decode(streamBytes);
    }
    const text = extractTextOperators(streamText);
    if (text) extracted.push(text);
  }
  return [...new Set(extracted)].join("\n").trim();
}

function chunkRagText(text: string, maxLength = 700): string[] {
  const paragraphs = text.split(/\n{1,}|(?<=[.!?])\s+/).map(part => part.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";
  for (const paragraph of paragraphs) {
    if ((current + " " + paragraph).trim().length > maxLength && current) {
      chunks.push(current);
      current = "";
    }
    current = (current ? current + " " : "") + paragraph;
  }
  if (current) chunks.push(current);
  return chunks;
}

function retrieveRagContext(text: string, query: string): { chunk: string; score: number }[] {
  const terms = [...new Set(query.toLowerCase().split(/[^a-z0-9]+/).filter(term => term.length > 2))];
  return chunkRagText(text).map(chunk => {
    const lower = chunk.toLowerCase();
    return { chunk, score: terms.reduce((total, term) => total + (lower.includes(term) ? 1 : 0), 0) };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
}

function getAiValidationChecks(state: AwsLabState, screen: AwsAiScreen): AiValidationCheck[] {
  const objects = state.s3Objects ?? [];
  const roles = state.iamRoles ?? [];
  const hasObject = (bucket: string, key: string) => objects.some(item => item.bucketName === bucket && item.key === key);
  const roleHas = (name: string, trust: string, policies: string[]) => {
    const role = roles.find(item => item.name === name);
    return !!role && role.trustedService === trust && policies.every(policy => role.attachedPolicies.includes(policy));
  };
  if (screen === "Bedrock") {
    const kb = (state.bedrockKnowledgeBases ?? [])[0];
    return [
      { label: "Knowledge-base source objects", passed: !!kb && objects.some(item => item.bucketName === kb.sourceBucketName && item.key.startsWith(kb.sourcePrefix)), detail: "Checks the configured S3 prefix for at least one source object." },
      { label: "Knowledge-base role and permissions", passed: !!kb && roleHas(kb.roleName, "bedrock.amazonaws.com", ["BedrockDataSourceRead", "S3ArtifactsRead", "KMSAIArtifactAccess"]), detail: "Requires Bedrock trust plus the seeded S3 and KMS read permissions." },
      { label: "Knowledge-base sync status", passed: !!kb && kb.status === "ACTIVE", detail: "A configured resource alone is not proof of a successful sync." },
    ];
  }
  if (screen === "SageMaker AI") {
    const job = (state.sagemakerTrainingJobs ?? []).at(-1);
    return [
      { label: "Training input object", passed: !!job && hasObject(job.inputBucketName, job.inputKey), detail: "The selected training input must exist in the simulated S3 inventory." },
      { label: "Training execution role", passed: !!job && roleHas(job.executionRole, "sagemaker.amazonaws.com", ["SageMakerTrainingAccess", "S3ArtifactsRead", "KMSAIArtifactAccess"]), detail: "Checks service trust and required artifact permissions." },
      { label: "Model artifact output", passed: !!job && job.status === "Completed" && !!job.modelName && objects.some(item => item.bucketName === job.outputBucketName && item.key.startsWith(job.outputPrefix)), detail: "A completed training job should have a model artifact in its configured output prefix." },
    ];
  }
  if (screen === "Comprehend" || screen === "Textract") {
    const service = screen;
    const job = (state.aiProcessingJobs ?? []).filter(item => item.service === service).at(-1);
    const roleName = service === "Comprehend" ? "ComprehendBatchRole" : "TextractDocumentRole";
    const trust = service === "Comprehend" ? "comprehend.amazonaws.com" : "textract.amazonaws.com";
    const policy = service === "Comprehend" ? "ComprehendBatchAccess" : "TextractDocumentAccess";
    return [
      { label: "Source object exists", passed: !!job && hasObject(job.inputBucketName, job.inputKey), detail: "The selected source must exist before the batch job can run." },
      { label: "Execution role trust and permissions", passed: roleHas(roleName, trust, [policy, "S3ArtifactsRead", "KMSAIArtifactAccess"]), detail: "Checks the service trust relationship and S3/KMS permissions." },
      { label: "Successful output object", passed: !!job && job.status === "SUCCEEDED" && !!job.outputKey && hasObject(job.outputBucketName, job.outputKey), detail: "Successful processing should create a result object, not just a success banner." },
    ];
  }
  if (screen === "Amazon Q Business") {
    const app = (state.qBusinessApplications ?? [])[0];
    return [
      { label: "Data-source documents", passed: !!app && objects.some(item => item.bucketName === app.sourceBucketName && item.key.startsWith(app.sourcePrefix)), detail: "Checks that the configured S3 source contains documents." },
      { label: "Data-source role", passed: !!app && roleHas(app.roleName, "qbusiness.amazonaws.com", ["QBusinessDataSourceAccess", "S3ArtifactsRead", "KMSAIArtifactAccess"]), detail: "Checks service trust and data-source access." },
      { label: "Latest sync succeeded", passed: !!app && app.syncStatus === "SUCCEEDED" && app.status === "ACTIVE", detail: "Application status and latest sync status are validated separately." },
    ];
  }
  const users = state.qDeveloperUsers ?? [];
  return [
    { label: "User inventory populated", passed: users.length > 0, detail: "At least one simulated developer user should be assigned." },
    { label: "Subscription values valid", passed: users.every(user => ["Free", "Pro"].includes(user.subscription)), detail: "Only supported simulated subscription tiers are accepted." },
    { label: "Access state valid", passed: users.every(user => ["Active", "Suspended"].includes(user.status)), detail: "User access must be in a recognized state." },
  ];
}

function AiValidationPanel({ checks }: { checks: AiValidationCheck[] }) {
  const passed = checks.filter(check => check.passed).length;
  return <section className="aws-sim-editor" aria-label="Data validation results">
    <h3>Data validation</h3>
    <p>{passed} of {checks.length} checks passed. These checks evaluate the current simulated account state, not just the last button response.</p>
    <div className="aws-sim-table-wrap"><table><thead><tr><th>Check</th><th>Result</th><th>Evidence</th></tr></thead><tbody>{checks.map(check => <tr key={check.label}><td>{check.label}</td><td><Status value={check.passed ? "PASS" : "FAIL"} good={check.passed} /></td><td>{check.detail}</td></tr>)}</tbody></table></div>
  </section>;
}

export default function AwsAiScreens({ screen, state, setState, tab, setTab, notify }: Props) {
  const [selectedModelId, setSelectedModelId] = useState("amazon.nova-lite-v1:0");
  const [prompt, setPrompt] = useState("Summarize the operational risks in this payment-service scenario.");
  const [inferenceOutput, setInferenceOutput] = useState("");
  const [inferenceError, setInferenceError] = useState("");
  const [useCaseModelId, setUseCaseModelId] = useState("");
  const [useCaseDescription, setUseCaseDescription] = useState("Internal enterprise assistant for summarizing approved operational documentation.");
  const [useCaseWebsite, setUseCaseWebsite] = useState("https://github.com/kalif7722");
  const [trainingJobName, setTrainingJobName] = useState("churn-risk-training-new");
  const [trainingAlgorithm, setTrainingAlgorithm] = useState("XGBoost");
  const [trainingInputKey, setTrainingInputKey] = useState("training/churn/train.csv");
  const [trainingInstanceType, setTrainingInstanceType] = useState("ml.m5.xlarge");
  const [trainingInstanceCount, setTrainingInstanceCount] = useState("1");
  const [trainingError, setTrainingError] = useState("");
  const [comprehendInputKey, setComprehendInputKey] = useState("comprehend/reviews/batch-01.txt");
  const [textractInputKey, setTextractInputKey] = useState("textract/invoices/invoice-1027.pdf");
  const [textractJobType, setTextractJobType] = useState("Expense analysis");
  const [ragQuery, setRagQuery] = useState("What is the API timeout in the latest runbook?");
  const [ragAnswer, setRagAnswer] = useState<{ text: string; source: string; version: number; chunks: string[] } | null>(null);
  const [ragError, setRagError] = useState("");
  const [ragBusy, setRagBusy] = useState(false);
  const [ragDocuments, setRagDocuments] = useState<RagDocument[]>([{
    id: "operations-runbook-v17", name: "operations-runbook.pdf", version: 17,
    extractedText: "Runbook V17. The payments API request timeout is 30 seconds. Escalate repeated timeout errors to the Platform Operations team. Database connection pool maximum is 80.",
    indexedText: "Runbook V17. The payments API request timeout is 30 seconds. Escalate repeated timeout errors to the Platform Operations team. Database connection pool maximum is 80.",
    status: "INDEXED", updatedAt: "2026-10-15T08:00:00.000Z", source: "mock"
  }]);

  const aiObjects = state.s3Objects ?? [];
  const aiModels = getAwsBedrockModels(state);
  const knowledgeBases = getAwsBedrockKnowledgeBases(state);
  const guardrails = getAwsBedrockGuardrails(state);
  const sagemakerModels = getAwsSageMakerModels(state);
  const trainingJobs = getAwsSageMakerTrainingJobs(state);
  const endpoints = getAwsSageMakerEndpoints(state);
  const selectedModel = aiModels.find(model => model.modelId === selectedModelId) ?? aiModels[0];
  const textInputs = aiObjects.filter(object => object.bucketName === "ai-workloads" && object.key.startsWith("comprehend/") && object.key.endsWith(".txt") && !object.key.startsWith("comprehend/output/"));
  const pdfInputs = aiObjects.filter(object => object.bucketName === "ai-workloads" && object.key.startsWith("textract/") && object.key.endsWith(".pdf"));
  const comprehendJobs = getAwsAiProcessingJobs(state, "Comprehend");
  const textractJobs = getAwsAiProcessingJobs(state, "Textract");
  const qBusinessApps = getAwsQBusinessApplications(state);
  const qDeveloperUsers = getAwsQDeveloperUsers(state);
  const aiValidationChecks = getAiValidationChecks(state, screen);

  async function uploadRagPdf(file: File | undefined) {
    if (!file) return;
    setRagError("");
    setRagAnswer(null);
    if (!file.name.toLowerCase().endsWith(".pdf") || (file.type && file.type !== "application/pdf")) {
      setRagError("Choose a PDF file. Other file types are not accepted.");
      return;
    }
    if (file.size < 1 || file.size > 10 * 1024 * 1024) {
      setRagError("PDF must be between 1 byte and 10 MB in this simulator.");
      return;
    }
    setRagBusy(true);
    try {
      const extractedText = await extractPdfText(file);
      if (extractedText.length < 30) {
        throw new Error("No readable text layer was found. This PDF may be scanned/image-only or use unsupported font encoding; OCR is not simulated in this browser-only lab.");
      }
      const version = Math.max(17, ...ragDocuments.map(document => document.version)) + 1;
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const objectKey = "knowledge/payments/uploads/" + safeName;
      const uploadResult = putAwsS3Object(state, { bucketName: "ai-workloads", key: objectKey, sizeBytes: file.size });
      if (uploadResult.error) throw new Error(uploadResult.error);
      setState(uploadResult.state);
      const document: RagDocument = { id: "uploaded-" + Date.now(), name: file.name, version, extractedText, indexedText: "", status: "PENDING", updatedAt: new Date().toISOString(), source: "upload" };
      setRagDocuments(old => [...old, document]);
      setRagError("PDF text extracted and its object metadata was added to the simulated S3 inventory and CloudTrail. Select Index documents to make this version available to RAG answers.");
    } catch (error) {
      setRagError(error instanceof Error ? error.message : "Could not extract readable PDF text.");
    } finally {
      setRagBusy(false);
    }
  }

  function indexRagDocuments() {
    const pending = ragDocuments.filter(document => document.status !== "INDEXED" || document.indexedText !== document.extractedText);
    if (!pending.length) {
      setRagError("No pending document changes. Upload a new version or activate the V18 demo to test re-indexing.");
      return;
    }
    const knowledgeBase = knowledgeBases[0];
    if (!knowledgeBase) { setRagError("No Bedrock knowledge base is configured in the simulated account."); return; }
    const sync = syncAwsBedrockKnowledgeBase(state, knowledgeBase.id);
    if (!sync.success) { setState(sync.state); setRagError(sync.error ?? "Knowledge-base sync failed."); return; }
    setState(sync.state);
    setRagDocuments(old => old.map(document => ({ ...document, indexedText: document.extractedText, status: "INDEXED", updatedAt: new Date().toISOString() })));
    setRagAnswer(null);
    setRagError("Index updated. The simulated knowledge-base sync and CloudTrail event succeeded; new answers will retrieve from the latest indexed text.");
    notify("Simulated knowledge-base index updated and sync recorded.");
  }

  function activateRagV18Demo() {
    const v18 = "Runbook V18. The payments API request timeout is 45 seconds. Escalate repeated timeout errors to the Platform Operations team. Database connection pool maximum is 120. Change record CHG-2048 approved the timeout and pool-size update.";
    const objectResult = putAwsS3Object(state, { bucketName: "ai-workloads", key: "knowledge/payments/operations-runbook-v18.pdf", sizeBytes: v18.length * 2 });
    if (objectResult.error) { setRagError(objectResult.error); return; }
    setState(objectResult.state);
    setRagDocuments(old => {
      const existing = old.find(document => document.id === "operations-runbook-v18");
      const document: RagDocument = { id: "operations-runbook-v18", name: "operations-runbook.pdf", version: 18, extractedText: v18, indexedText: existing?.indexedText ?? "", status: "PENDING", updatedAt: new Date().toISOString(), source: "mock" };
      return [...old.filter(item => item.id !== "operations-runbook-v18"), document];
    });
    setRagAnswer(null);
    setRagError("Demo V18 loaded as pending. Until indexing completes, RAG should continue to return V17's 30-second timeout.");
  }

  function askRagQuestion() {
    const query = ragQuery.trim();
    if (!query) { setRagError("Enter a question before querying the knowledge base."); return; }
    if (query.length > 1000) { setRagError("Question must be 1,000 characters or fewer."); return; }
    const document = [...ragDocuments].filter(item => item.status === "INDEXED" && item.indexedText.trim()).sort((a, b) => b.version - a.version)[0];
    if (!document) { setRagError("No indexed document is available. Upload or activate a demo version, then index it."); setRagAnswer(null); return; }
    const matches = retrieveRagContext(document.indexedText, query);
    if (!matches.length) {
      setRagAnswer({ text: "I could not find supporting text in the indexed document, so I will not guess. Try asking about the API timeout, escalation, or database connection pool.", source: document.name, version: document.version, chunks: [] });
      setRagError("");
      return;
    }
    setRagAnswer({ text: matches.map(item => item.chunk).join("\n\n"), source: document.name, version: document.version, chunks: matches.map(item => item.chunk) });
    setRagError("");
  }

  function invokeBedrock() {
    const result = invokeAwsBedrockModel(state, selectedModelId, prompt);
    setState(result.state);
    setInferenceOutput(result.response);
    setInferenceError(result.error ?? "");
    if (result.success) notify("Simulated Bedrock invocation completed and recorded in CloudTrail.");
  }
  function submitUseCase() {
    const result = submitAwsBedrockUseCase(state, useCaseModelId, { description: useCaseDescription, website: useCaseWebsite });
    if (result.error) { setInferenceError(result.error); return; }
    setState(result.state);
    setUseCaseModelId("");
    setInferenceError("");
    notify("Model use-case details submitted in the training account.");
  }
  function createTrainingJob() {
    const result = createAwsSageMakerTrainingJob(state, {
      name: trainingJobName,
      algorithm: trainingAlgorithm,
      executionRole: "SageMakerExecutionRole",
      inputBucketName: "ai-workloads",
      inputKey: trainingInputKey,
      outputBucketName: "ai-workloads",
      outputPrefix: "models/" + trainingJobName.trim() + "/",
      instanceType: trainingInstanceType,
      instanceCount: Number(trainingInstanceCount),
    });
    setState(result.state);
    if (result.error) { setTrainingError(result.error); return; }
    setTrainingError("");
    setTrainingJobName("churn-risk-training-new-" + (trainingJobs.length + 1));
    setTab("Training jobs");
    notify("Training job completed in the simulator; model artifact and CloudTrail event were recorded.");
  }
  function syncKnowledgeBase(id: string) {
    const result = syncAwsBedrockKnowledgeBase(state, id);
    setState(result.state);
    notify(result.success ? "Knowledge-base data source sync completed." : result.error ?? "Knowledge-base sync failed.");
  }
  function syncQBusiness(id: string) {
    const result = syncAwsQBusinessApplication(state, id);
    setState(result.state);
    notify(result.success ? "Amazon Q Business data source sync completed." : result.error ?? "Data source sync failed.");
  }
  function runProcessingJob(service: "Comprehend" | "Textract") {
    const isComprehend = service === "Comprehend";
    const inputKey = isComprehend ? comprehendInputKey : textractInputKey;
    const name = isComprehend
      ? "reviews-sentiment-" + String(comprehendJobs.length + 1).padStart(2, "0")
      : "invoice-analysis-" + String(textractJobs.length + 1).padStart(2, "0");
    const outputPrefix = (isComprehend ? "comprehend/output/" : "textract/output/") + name + "/";
    const result = runAwsAiProcessingJob(state, {
      service,
      name,
      jobType: isComprehend ? "Sentiment analysis" : textractJobType,
      inputBucketName: "ai-workloads",
      inputKey,
      outputBucketName: "ai-workloads",
      outputPrefix,
    });
    setState(result.state);
    notify(result.success ? service + " job completed; S3 output and CloudTrail event were recorded." : result.error ?? service + " job failed.");
  }

  if (screen === "Bedrock") return (
    <div className="aws-sim-panel">
      <PanelTitle title="Amazon Bedrock" detail="Foundation models, knowledge bases, and guardrails in the simulated eu-west-1 account." />
      <Tabs values={["Model catalog", "Playground", "Knowledge bases", "Guardrails"]} selected={tab} onSelect={setTab} />
      {tab === "Model catalog" && <>
        <PanelTitle title={"Foundation models (" + aiModels.length + ")"} detail="Model availability and modality details for this account." />
        <div className="aws-sim-table-wrap"><table><thead><tr><th>Model</th><th>Provider</th><th>Model ID</th><th>Input</th><th>Output</th><th>Access status</th><th>Invocations</th><th>Actions</th></tr></thead><tbody>
          {aiModels.map(model => <tr key={model.modelId}><td>{model.name}</td><td>{model.provider}</td><td className="mono">{model.modelId}</td><td>{model.inputModalities.join(", ")}</td><td>{model.outputModalities.join(", ")}</td><td><Status value={model.accessStatus} /></td><td>{model.invocationCount}</td><td>{model.accessStatus === "Use case required" ? <button className="aws-sim-text-link" onClick={() => { setUseCaseModelId(model.modelId); setInferenceError(""); }}>Submit use-case details</button> : <button className="aws-sim-text-link" onClick={() => { setSelectedModelId(model.modelId); setTab("Playground"); }}>Open playground</button>}</td></tr>)}
        </tbody></table></div>
        {useCaseModelId && <div className="aws-sim-editor"><h3>Submit use-case details</h3><p>Anthropic models may require first-time use-case details. This form updates only the simulator's model-access state.</p><div className="aws-sim-form-grid"><label className="wide">Intended use<textarea rows={3} value={useCaseDescription} onChange={event => setUseCaseDescription(event.target.value)} maxLength={8192} /></label><label className="wide">Website or project URL<input value={useCaseWebsite} onChange={event => setUseCaseWebsite(event.target.value)} maxLength={128} placeholder="https://example.com" /></label></div>{inferenceError && <p className="aws-sim-error" role="alert">{inferenceError}</p>}<div className="aws-sim-editor-actions"><button onClick={() => setUseCaseModelId("")}>Cancel</button><button className="primary" onClick={submitUseCase}>Submit details</button></div></div>}
      </>}
      {tab === "Playground" && <>
        <PanelTitle title="Playground" detail="Run a sample inference against the selected foundation model." action={<button onClick={() => setInferenceOutput("")}>Clear output</button>} />
        <div className="aws-sim-form-grid"><label className="wide">Foundation model<select value={selectedModel?.modelId ?? ""} onChange={event => { setSelectedModelId(event.target.value); setInferenceOutput(""); setInferenceError(""); }}>{aiModels.map(model => <option key={model.modelId} value={model.modelId}>{model.name} · {model.accessStatus}</option>)}</select></label><label className="wide">Prompt<input value={prompt} onChange={event => setPrompt(event.target.value)} maxLength={8000} placeholder="Enter a prompt" /></label></div>
        {inferenceError && <p className="aws-sim-error" role="alert">{inferenceError}</p>}
        <div className="aws-sim-editor-actions"><button className="primary" onClick={invokeBedrock}>Run inference</button></div>
        {inferenceOutput && <div className="aws-sim-ai-output"><b>Model response</b><p>{inferenceOutput}</p><small>No live foundation-model API was called. Invocation state and audit history were updated locally.</small></div>}
        <AiValidationPanel checks={aiValidationChecks} />
      </>}
      {tab === "Knowledge bases" && <>
        <PanelTitle title={"Knowledge bases (" + knowledgeBases.length + ")"} detail="Knowledge bases link an S3 data source, an embedding model, and a vector store." />
        <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>Knowledge base ID</th><th>Data source</th><th>Embedding model</th><th>Vector store</th><th>Status</th><th>Indexed objects</th><th>Last sync</th><th>Actions</th></tr></thead><tbody>{knowledgeBases.map(kb => <tr key={kb.id}><td>{kb.name}</td><td className="mono">{kb.id}</td><td>s3://{kb.sourceBucketName}/{kb.sourcePrefix}</td><td>{kb.embeddingModel}</td><td>{kb.vectorStore}</td><td><Status value={kb.status} /></td><td>{kb.documentsIndexed}</td><td>{new Date(kb.lastSyncTime).toLocaleString()}</td><td><button className="aws-sim-text-link" onClick={() => syncKnowledgeBase(kb.id)}>Sync data source</button></td></tr>)}</tbody></table></div>
        <section className="aws-sim-editor">
          <h3>Document ingestion and RAG validation</h3>
          <p>Training simulation. Text-based PDFs are extracted and indexed locally; upload metadata, knowledge-base sync status, and CloudTrail events update the shared simulated AWS account. No real S3 upload or live Bedrock Knowledge Bases call occurs.</p>
          <div className="aws-sim-form-grid"><label className="wide">Upload PDF (max 10 MB)<input type="file" accept="application/pdf,.pdf" disabled={ragBusy} onChange={event => { void uploadRagPdf(event.target.files?.[0]); event.currentTarget.value = ""; }} /></label></div>
          <div className="aws-sim-editor-actions"><button type="button" onClick={activateRagV18Demo}>Load mock V18 (stale-answer demo)</button><button type="button" className="primary" onClick={indexRagDocuments} disabled={ragBusy}>Index documents</button></div>
          {ragBusy && <p role="status">Extracting PDF text…</p>}
          {ragError && <p className="aws-sim-error" role="status">{ragError}</p>}
          <div className="aws-sim-table-wrap"><table><thead><tr><th>Document</th><th>Version</th><th>Source</th><th>Index status</th><th>Extracted chars</th><th>Indexed chars</th><th>Updated</th></tr></thead><tbody>{ragDocuments.map(document => <tr key={document.id}><td>{document.name}</td><td>V{document.version}</td><td>{document.source === "mock" ? "Mock training data" : "Uploaded PDF"}</td><td><Status value={document.status} good={document.status === "INDEXED"} /></td><td>{document.extractedText.length}</td><td>{document.indexedText.length}</td><td>{new Date(document.updatedAt).toLocaleString()}</td></tr>)}</tbody></table></div>
          <h3>Ask the knowledge base</h3>
          <div className="aws-sim-form-grid"><label className="wide">Question<input value={ragQuery} onChange={event => setRagQuery(event.target.value)} maxLength={1000} placeholder="Ask about a value in the runbook" /></label></div>
          <div className="aws-sim-editor-actions"><button type="button" className="primary" onClick={askRagQuestion}>Retrieve and answer</button></div>
          {ragAnswer && <div className="aws-sim-ai-output"><b>Simulated RAG answer</b><p>{ragAnswer.text}</p><small>Source: {ragAnswer.source} · Indexed version: V{ragAnswer.version} · Retrieved chunks: {ragAnswer.chunks.length}. Answers are generated only from matching indexed text.</small>{ragAnswer.chunks.length > 0 && <details><summary>Show retrieved passages</summary>{ragAnswer.chunks.map((chunk, index) => <p key={index}>{chunk}</p>)}</details>}</div>}
          <div className="aws-sim-ai-note">Expected demo: ask “What is the API timeout?” before indexing V18 to get 30 seconds (V17). Load mock V18, ask again before indexing to confirm it is still 30 seconds, then index and ask again to get 45 seconds (V18).</div>
        </section>
        <AiValidationPanel checks={aiValidationChecks} />
      </>}
      {tab === "Guardrails" && <>
        <PanelTitle title={"Guardrails (" + guardrails.length + ")"} detail="Guardrail policy settings are shown as account resources; changes increment the simulated version and create CloudTrail events." />
        <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>ID</th><th>Version</th><th>Status</th><th>Content filters</th><th>Denied topics</th><th>Sensitive information</th></tr></thead><tbody>{guardrails.map(guardrail => <tr key={guardrail.id}><td>{guardrail.name}</td><td className="mono">{guardrail.id}</td><td>{guardrail.version}</td><td><Status value={guardrail.status} /></td>{([
          ["contentFiltersEnabled", "Content filters"],
          ["deniedTopicsEnabled", "Denied topics"],
          ["sensitiveInformationFiltersEnabled", "Sensitive information"],
        ] as const).map(([setting, label]) => <td key={setting}><button className="aws-sim-text-link" onClick={() => { const result = updateAwsBedrockGuardrail(state, guardrail.id, setting, !guardrail[setting]); if (result.error) { notify(result.error); return; } setState(result.state); notify(label + " setting updated."); }}>{guardrail[setting] ? "Enabled" : "Disabled"}</button></td>)}</tr>)}</tbody></table></div>
      </>}
    </div>
  );

  if (screen === "SageMaker AI") return (
    <div className="aws-sim-panel">
      <PanelTitle title="Amazon SageMaker AI" detail="Explore model artifacts, training jobs, and real-time inference endpoints." />
      <Tabs values={["Models", "Training jobs", "Endpoints"]} selected={tab} onSelect={setTab} />
      {tab === "Models" && <>
        <PanelTitle title={"Models (" + sagemakerModels.length + ")"} detail="Model registry entries reference versioned artifacts in Amazon S3." />
        <div className="aws-sim-table-wrap"><table><thead><tr><th>Model name</th><th>Framework / algorithm</th><th>Model artifact</th><th>Training job</th><th>Execution role</th><th>Created</th></tr></thead><tbody>{sagemakerModels.map(model => <tr key={model.name}><td>{model.name}</td><td>{model.framework}</td><td className="mono">{model.modelDataUrl}</td><td>{model.trainingJobName}</td><td>{model.executionRole}</td><td>{new Date(model.createdAt).toLocaleString()}</td></tr>)}</tbody></table></div>
      </>}
      {tab === "Training jobs" && <>
        <PanelTitle title={"Training jobs (" + trainingJobs.length + ")"} detail="Create a training job with an existing S3 input object and an execution role." action={<button onClick={() => { setTrainingError(""); setTrainingJobName("churn-risk-training-new-" + (trainingJobs.length + 1)); }}>New training job</button>} />
        <div className="aws-sim-editor"><h3>Configure training job</h3><div className="aws-sim-form-grid"><label>Job name<input value={trainingJobName} onChange={event => setTrainingJobName(event.target.value)} maxLength={63} /></label><label>Algorithm<select value={trainingAlgorithm} onChange={event => setTrainingAlgorithm(event.target.value)}><option>XGBoost</option><option>Linear Learner</option><option>Random Cut Forest</option></select></label><label>Training data (S3 object)<select value={trainingInputKey} onChange={event => setTrainingInputKey(event.target.value)}>{aiObjects.filter(object => object.bucketName === "ai-workloads" && object.key.startsWith("training/")).map(object => <option key={object.key} value={object.key}>{object.key}</option>)}</select></label><label>Training instance type<select value={trainingInstanceType} onChange={event => setTrainingInstanceType(event.target.value)}><option>ml.m5.large</option><option>ml.m5.xlarge</option><option>ml.m5.2xlarge</option></select></label><label>Instance count<input type="number" min="1" max="10" value={trainingInstanceCount} onChange={event => setTrainingInstanceCount(event.target.value)} /></label><label>Execution role<input value="SageMakerExecutionRole" readOnly /></label></div>{trainingError && <p className="aws-sim-error" role="alert">{trainingError}</p>}<div className="aws-sim-editor-actions"><button className="primary" onClick={createTrainingJob}>Create training job</button></div></div>
        <div className="aws-sim-table-wrap"><table><thead><tr><th>Job name</th><th>Status</th><th>Algorithm</th><th>Input data</th><th>Output path</th><th>Instance config</th><th>Model</th><th>Created</th></tr></thead><tbody>{trainingJobs.map(job => <tr key={job.name}><td>{job.name}</td><td><Status value={job.status} /></td><td>{job.algorithm}</td><td>s3://{job.inputBucketName}/{job.inputKey}</td><td>s3://{job.outputBucketName}/{job.outputPrefix}</td><td>{job.instanceType} × {job.instanceCount}</td><td>{job.modelName ?? "—"}{job.failureReason && <small>{job.failureReason}</small>}</td><td>{new Date(job.createdAt).toLocaleString()}</td></tr>)}</tbody></table></div>
        <AiValidationPanel checks={aiValidationChecks} />
      </>}
      {tab === "Endpoints" && <>
        <PanelTitle title={"Endpoints (" + endpoints.length + ")"} detail="Endpoint state, deployed model, instance capacity, and invocation count." />
        <div className="aws-sim-table-wrap"><table><thead><tr><th>Endpoint name</th><th>Status</th><th>Model</th><th>Instance type</th><th>Instance count</th><th>Invocations</th><th>Actions</th></tr></thead><tbody>{endpoints.map(endpoint => <tr key={endpoint.name}><td>{endpoint.name}</td><td><Status value={endpoint.status} /></td><td>{endpoint.modelName}</td><td>{endpoint.instanceType}</td><td>{endpoint.instanceCount}</td><td>{endpoint.invocationCount}</td><td><button className="aws-sim-text-link" onClick={() => { const result = invokeAwsSageMakerEndpoint(state, endpoint.name); setState(result.state); notify(result.success ? "Endpoint test invocation completed." : result.error ?? "Endpoint invocation failed."); }}>Invoke test</button> <button className="aws-sim-text-link" onClick={() => { const result = setAwsSageMakerEndpointInstanceCount(state, endpoint.name, Math.min(5, endpoint.instanceCount + 1)); setState(result.state); notify(result.error ?? "Endpoint instance count increased."); }}>Scale +1</button> <button className="aws-sim-text-link" disabled={endpoint.instanceCount <= 1} onClick={() => { const result = setAwsSageMakerEndpointInstanceCount(state, endpoint.name, Math.max(1, endpoint.instanceCount - 1)); setState(result.state); notify(result.error ?? "Endpoint instance count reduced."); }}>Scale −1</button></td></tr>)}</tbody></table></div>
        <AiValidationPanel checks={aiValidationChecks} />
      </>}
    </div>
  );

  if (screen === "Comprehend" || screen === "Textract") {
    const isComprehend = screen === "Comprehend";
    const jobs = isComprehend ? comprehendJobs : textractJobs;
    const sources = isComprehend ? textInputs : pdfInputs;
    const selectedInput = isComprehend ? comprehendInputKey : textractInputKey;
    const setSelectedInput = isComprehend ? setComprehendInputKey : setTextractInputKey;
    return (
      <div className="aws-sim-panel">
        <PanelTitle title={isComprehend ? "Amazon Comprehend" : "Amazon Textract"} detail={isComprehend ? "Batch text analytics jobs with S3 input and output locations." : "Document analysis jobs with source documents and JSON results in Amazon S3."} />
        <div className="aws-sim-ai-job-toolbar"><label>{isComprehend ? "Input text object" : "Input document"}<select value={selectedInput} onChange={event => setSelectedInput(event.target.value)}>{sources.map(object => <option key={object.key} value={object.key}>{object.key}</option>)}</select></label>{!isComprehend && <label>Analysis type<select value={textractJobType} onChange={event => setTextractJobType(event.target.value)}><option>Expense analysis</option><option>Text detection</option></select></label>}<button className="primary" onClick={() => runProcessingJob(isComprehend ? "Comprehend" : "Textract")}>{isComprehend ? "Start sentiment detection job" : textractJobType === "Expense analysis" ? "Start expense analysis" : "Start text detection"}</button></div>
        <div className="aws-sim-section-heading inside"><h2>Analysis jobs ({jobs.length})</h2><span>Job results are written to the configured S3 output path.</span></div>
        <div className="aws-sim-table-wrap"><table><thead><tr><th>Job name</th><th>Status</th><th>Operation</th><th>Input document</th><th>Output location</th><th>Execution role</th><th>Created</th><th>Result</th></tr></thead><tbody>{jobs.map(job => <tr key={job.id}><td>{job.name}</td><td><Status value={job.status} /></td><td>{job.jobType}</td><td>s3://{job.inputBucketName}/{job.inputKey}</td><td>s3://{job.outputBucketName}/{job.outputPrefix}</td><td>{job.executionRole}</td><td>{new Date(job.createdAt).toLocaleString()}</td><td>{job.outputKey ? <button className="aws-sim-text-link" onClick={() => notify("Result object: s3://" + job.outputBucketName + "/" + job.outputKey)}>View result location</button> : job.failureReason}</td></tr>)}</tbody></table></div>
        <AiValidationPanel checks={aiValidationChecks} />
      </div>
    );
  }

  if (screen === "Amazon Q Business") return (
    <div className="aws-sim-panel">
      <PanelTitle title="Amazon Q Business" detail="Manage the application index and data sources used to ground enterprise answers." />
      <div className="aws-sim-table-wrap"><table><thead><tr><th>Application</th><th>Application ID</th><th>Status</th><th>Identity provider</th><th>Index</th><th>S3 data source</th><th>Indexed objects</th><th>Last sync</th><th>Actions</th></tr></thead><tbody>{qBusinessApps.map(app => <tr key={app.id}><td>{app.name}</td><td className="mono">{app.id}</td><td><Status value={app.status} /></td><td>{app.identityProvider}</td><td>{app.indexName}</td><td>s3://{app.sourceBucketName}/{app.sourcePrefix}</td><td>{app.documentsIndexed}</td><td>{new Date(app.lastSyncTime).toLocaleString()} · {app.syncStatus}</td><td><button className="aws-sim-text-link" onClick={() => syncQBusiness(app.id)}>Sync data source</button></td></tr>)}</tbody></table></div>
      <AiValidationPanel checks={aiValidationChecks} />
    </div>
  );

  return (
    <div className="aws-sim-panel">
      <PanelTitle title="Amazon Q Developer" detail="Review user subscriptions and assigned access for the developer assistant." />
      <div className="aws-sim-table-wrap"><table><thead><tr><th>User</th><th>Subscription</th><th>Status</th><th>Assigned</th><th>Actions</th></tr></thead><tbody>{qDeveloperUsers.map(user => <tr key={user.username}><td>{user.username}</td><td><select aria-label={"Subscription for " + user.username} value={user.subscription} onChange={event => { const result = updateAwsQDeveloperUser(state, user.username, { subscription: event.target.value as "Free" | "Pro" }); if (result.error) { notify(result.error); return; } setState(result.state); notify("Subscription assignment updated."); }}><option value="Free">Free</option><option value="Pro">Pro</option></select></td><td><Status value={user.status} /></td><td>{user.assignedAt}</td><td><button className="aws-sim-text-link" onClick={() => { const result = updateAwsQDeveloperUser(state, user.username, { status: user.status === "Active" ? "Suspended" : "Active" }); if (result.error) { notify(result.error); return; } setState(result.state); notify(user.status === "Active" ? "User access suspended." : "User access restored."); }}>{user.status === "Active" ? "Suspend access" : "Restore access"}</button></td></tr>)}</tbody></table></div>
      <AiValidationPanel checks={aiValidationChecks} />
      <div className="aws-sim-ai-note">Subscription changes are simulated locally and recorded in CloudTrail; no AWS account or paid subscription is changed.</div>
    </div>
  );
}
