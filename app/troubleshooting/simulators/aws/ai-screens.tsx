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
      </>}
      {tab === "Knowledge bases" && <>
        <PanelTitle title={"Knowledge bases (" + knowledgeBases.length + ")"} detail="Knowledge bases link an S3 data source, an embedding model, and a vector store." />
        <div className="aws-sim-table-wrap"><table><thead><tr><th>Name</th><th>Knowledge base ID</th><th>Data source</th><th>Embedding model</th><th>Vector store</th><th>Status</th><th>Indexed objects</th><th>Last sync</th><th>Actions</th></tr></thead><tbody>{knowledgeBases.map(kb => <tr key={kb.id}><td>{kb.name}</td><td className="mono">{kb.id}</td><td>s3://{kb.sourceBucketName}/{kb.sourcePrefix}</td><td>{kb.embeddingModel}</td><td>{kb.vectorStore}</td><td><Status value={kb.status} /></td><td>{kb.documentsIndexed}</td><td>{new Date(kb.lastSyncTime).toLocaleString()}</td><td><button className="aws-sim-text-link" onClick={() => syncKnowledgeBase(kb.id)}>Sync data source</button></td></tr>)}</tbody></table></div>
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
      </>}
      {tab === "Endpoints" && <>
        <PanelTitle title={"Endpoints (" + endpoints.length + ")"} detail="Endpoint state, deployed model, instance capacity, and invocation count." />
        <div className="aws-sim-table-wrap"><table><thead><tr><th>Endpoint name</th><th>Status</th><th>Model</th><th>Instance type</th><th>Instance count</th><th>Invocations</th><th>Actions</th></tr></thead><tbody>{endpoints.map(endpoint => <tr key={endpoint.name}><td>{endpoint.name}</td><td><Status value={endpoint.status} /></td><td>{endpoint.modelName}</td><td>{endpoint.instanceType}</td><td>{endpoint.instanceCount}</td><td>{endpoint.invocationCount}</td><td><button className="aws-sim-text-link" onClick={() => { const result = invokeAwsSageMakerEndpoint(state, endpoint.name); setState(result.state); notify(result.success ? "Endpoint test invocation completed." : result.error ?? "Endpoint invocation failed."); }}>Invoke test</button> <button className="aws-sim-text-link" onClick={() => { const result = setAwsSageMakerEndpointInstanceCount(state, endpoint.name, Math.min(5, endpoint.instanceCount + 1)); setState(result.state); notify(result.error ?? "Endpoint instance count increased."); }}>Scale +1</button> <button className="aws-sim-text-link" disabled={endpoint.instanceCount <= 1} onClick={() => { const result = setAwsSageMakerEndpointInstanceCount(state, endpoint.name, Math.max(1, endpoint.instanceCount - 1)); setState(result.state); notify(result.error ?? "Endpoint instance count reduced."); }}>Scale −1</button></td></tr>)}</tbody></table></div>
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
        <div className="aws-sim-ai-job-toolbar"><label>{isComprehend ? "Input text object" : "Input document"}<select value={selectedInput} onChange={event => setSelectedInput(event.target.value)}>{sources.map(object => <option key={object.key} value={object.key}>{object.key}</option>)}</select></label>{!isComprehend && <label>Analysis type<select value={textractJobType} onChange={event => setTextractJobType(event.target.value)}><option>Expense analysis</option><option>Text detection</option></select></label>}<button className="primary" onClick={() => runProcessingJob(screen)}>{isComprehend ? "Start sentiment detection job" : textractJobType === "Expense analysis" ? "Start expense analysis" : "Start text detection"}</button></div>
        <div className="aws-sim-section-heading inside"><h2>Analysis jobs ({jobs.length})</h2><span>Job results are written to the configured S3 output path.</span></div>
        <div className="aws-sim-table-wrap"><table><thead><tr><th>Job name</th><th>Status</th><th>Operation</th><th>Input document</th><th>Output location</th><th>Execution role</th><th>Created</th><th>Result</th></tr></thead><tbody>{jobs.map(job => <tr key={job.id}><td>{job.name}</td><td><Status value={job.status} /></td><td>{job.jobType}</td><td>s3://{job.inputBucketName}/{job.inputKey}</td><td>s3://{job.outputBucketName}/{job.outputPrefix}</td><td>{job.executionRole}</td><td>{new Date(job.createdAt).toLocaleString()}</td><td>{job.outputKey ? <button className="aws-sim-text-link" onClick={() => notify("Result object: s3://" + job.outputBucketName + "/" + job.outputKey)}>View result location</button> : job.failureReason}</td></tr>)}</tbody></table></div>
        
      </div>
    );
  }

  if (screen === "Amazon Q Business") return (
    <div className="aws-sim-panel">
      <PanelTitle title="Amazon Q Business" detail="Manage the application index and data sources used to ground enterprise answers." />
      <div className="aws-sim-table-wrap"><table><thead><tr><th>Application</th><th>Application ID</th><th>Status</th><th>Identity provider</th><th>Index</th><th>S3 data source</th><th>Indexed objects</th><th>Last sync</th><th>Actions</th></tr></thead><tbody>{qBusinessApps.map(app => <tr key={app.id}><td>{app.name}</td><td className="mono">{app.id}</td><td><Status value={app.status} /></td><td>{app.identityProvider}</td><td>{app.indexName}</td><td>s3://{app.sourceBucketName}/{app.sourcePrefix}</td><td>{app.documentsIndexed}</td><td>{new Date(app.lastSyncTime).toLocaleString()} · {app.syncStatus}</td><td><button className="aws-sim-text-link" onClick={() => syncQBusiness(app.id)}>Sync data source</button></td></tr>)}</tbody></table></div>
      
    </div>
  );

  return (
    <div className="aws-sim-panel">
      <PanelTitle title="Amazon Q Developer" detail="Review user subscriptions and assigned access for the developer assistant." />
      <div className="aws-sim-table-wrap"><table><thead><tr><th>User</th><th>Subscription</th><th>Status</th><th>Assigned</th><th>Actions</th></tr></thead><tbody>{qDeveloperUsers.map(user => <tr key={user.username}><td>{user.username}</td><td><select aria-label={"Subscription for " + user.username} value={user.subscription} onChange={event => { const result = updateAwsQDeveloperUser(state, user.username, { subscription: event.target.value as "Free" | "Pro" }); if (result.error) { notify(result.error); return; } setState(result.state); notify("Subscription assignment updated."); }}><option value="Free">Free</option><option value="Pro">Pro</option></select></td><td><Status value={user.status} /></td><td>{user.assignedAt}</td><td><button className="aws-sim-text-link" onClick={() => { const result = updateAwsQDeveloperUser(state, user.username, { status: user.status === "Active" ? "Suspended" : "Active" }); if (result.error) { notify(result.error); return; } setState(result.state); notify(user.status === "Active" ? "User access suspended." : "User access restored."); }}>{user.status === "Active" ? "Suspend access" : "Restore access"}</button></td></tr>)}</tbody></table></div>
      <div className="aws-sim-ai-note">Subscription changes are simulated locally and recorded in CloudTrail; no AWS account or paid subscription is changed.</div>
    </div>
  );
}
