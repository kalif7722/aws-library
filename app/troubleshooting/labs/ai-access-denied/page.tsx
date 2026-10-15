"use client";

import { useMemo, useState } from "react";
import "./lab.css";

type Choice = { label: string; correct: boolean; feedback: string };
type Stage = {
  title: string;
  objective: string;
  evidenceTitle: string;
  evidence: string[];
  question: string;
  choices: Choice[];
  action: string;
  verify: string;
  consolePage: string;
};

const stages: Stage[] = [
  {
    title: "Reproduce the failure",
    objective: "Run the same model request before changing configuration. Capture the operation, timestamp, Region, and full response.",
    evidenceTitle: "Request context",
    evidence: ["Service: Amazon Bedrock Runtime", "Operation: Converse", "Model: Claude 3.5 Sonnet (simulated)", "Caller: assumed role AI-Platform-Operator", "Region: us-east-1"],
    question: "Which evidence should you preserve before making a change?",
    choices: [
      { label: "Full error, caller identity, operation, model/Region and timestamp", correct: true, feedback: "Correct. Preserve the original request context so it can be correlated with the audit event." },
      { label: "Only the words AccessDenied", correct: false, feedback: "That is not enough to distinguish an IAM denial from model access, organization policy, or other restrictions." },
      { label: "Immediately attach AdministratorAccess", correct: false, feedback: "That is an over-broad change before the cause is established." }
    ],
    action: "In the simulator, open Amazon Bedrock and try the model invocation. If it succeeds initially, open IAM → Roles and detach the linked Bedrock invocation policy from AI-Platform-Operator, then repeat the request. This changes simulated account state only.",
    verify: "Capture the complete response and timestamp. Open CloudTrail → Event history and find the matching Converse event; compare the principal, event name, Region, and error code.",
    consolePage: "Amazon Bedrock · Converse"
  },
  {
    title: "Correlate the audit evidence",
    objective: "Do not assume every AccessDenied is an identity-policy issue. Use the event and the effective caller to narrow the cause.",
    evidenceTitle: "Evidence to inspect",
    evidence: ["Event source: bedrock.amazonaws.com", "Event name: Converse", "Error code: AccessDeniedException", "User identity: assumed-role session", "Request parameters: model identifier"],
    question: "What should you check next to distinguish likely denial causes?",
    choices: [
      { label: "The actual caller, action/resource scope, identity policies, explicit denies and applicable organization/resource controls", correct: true, feedback: "Correct. AccessDenied can come from several authorization and model-access layers; verify the evidence rather than guessing." },
      { label: "Only whether the role name contains the word Bedrock", correct: false, feedback: "Role names do not determine effective permissions." },
      { label: "Disable CloudTrail and retry to remove the error", correct: false, feedback: "Audit logging does not grant authorization and should not be disabled for troubleshooting." }
    ],
    action: "Open CloudTrail → Event history and inspect the failed event details. Then open IAM → Roles → AI-Platform-Operator and inspect attached policies. In this deliberately scoped lab, the role no longer has the policy granting model invocation. In a real account, also check explicit denies, SCPs, model availability/access, inference-profile resource scope and relevant conditions.",
    verify: "The identity and event must match the failed request. Confirm the missing allow is in the effective policy path before changing anything; if the event points elsewhere, follow that evidence instead.",
    consolePage: "CloudTrail · Event history"
  },
  {
    title: "Apply the least-privilege fix",
    objective: "Restore only the intended model-invocation permission. Avoid broad access as a shortcut.",
    evidenceTitle: "Proposed change",
    evidence: ["Principal: AI-Platform-Operator", "Policy: BedrockInvokeAccess", "Purpose: model inference only", "Change scope: one role in the simulator"],
    question: "Which remediation is appropriate for this lab's confirmed cause?",
    choices: [
      { label: "Reattach the intended BedrockInvokeAccess policy to the caller role", correct: true, feedback: "Correct. Restore the known intended permission and keep the change scoped." },
      { label: "Attach AdministratorAccess to every AI role", correct: false, feedback: "That greatly expands the blast radius and does not establish a least-privilege fix." },
      { label: "Make the foundation model public", correct: false, feedback: "Foundation-model invocation is not fixed by making a model public." }
    ],
    action: "In IAM → Roles, select AI-Platform-Operator and attach BedrockInvokeAccess. This is a local training simulation. For real workloads, review the policy's Action and Resource scope; inference profiles may require an inference-profile ARN, and other account/model restrictions may need separate investigation.",
    verify: "Confirm the intended policy is attached to the actual caller role. Do not add unrelated S3, KMS, Marketplace, or administrator permissions unless the evidence independently establishes that they are required.",
    consolePage: "IAM · Roles"
  },
  {
    title: "Retest and prove recovery",
    objective: "A policy change alone is not proof. Repeat the same operation and correlate the new audit event.",
    evidenceTitle: "Acceptance criteria",
    evidence: ["Same caller and model request", "Invocation succeeds", "New CloudTrail event is successful", "No broad policy was added"],
    question: "What is sufficient evidence that the incident is resolved?",
    choices: [
      { label: "A successful repeat invocation and a matching successful CloudTrail event", correct: true, feedback: "Correct. The end-to-end request and its audit record confirm recovery." },
      { label: "The IAM screen shows a policy attached", correct: false, feedback: "Configuration does not prove the original request now succeeds." },
      { label: "The old error is no longer visible", correct: false, feedback: "You need a new request and fresh evidence." }
    ],
    action: "Return to Amazon Bedrock and repeat the same model request. Then open CloudTrail and inspect the newest matching Converse event.",
    verify: "Pass when the invocation succeeds and the matching CloudTrail event shows no error. If it still fails, do not keep adding permissions: re-check caller, action/resource scope, explicit denies, organization controls, model availability and model-specific prerequisites.",
    consolePage: "Amazon Bedrock · Retest"
  }
];

function Architecture({ step }: { step: number }) {
  const nodes = [
    { title: "Application / operator", sub: "Request + credentials", detail: "Caller", color: "blue" },
    { title: "IAM role session", sub: "Effective permissions", detail: "Authorization", color: step === 2 ? "green" : step === 1 || step === 0 ? "amber" : "blue" },
    { title: "Amazon Bedrock Runtime", sub: "Converse / InvokeModel", detail: step === 0 ? "Request denied" : step === 3 ? "Request succeeds" : "Model request", color: step === 0 ? "red" : step === 3 ? "green" : "blue" },
    { title: "AWS CloudTrail", sub: "Event history evidence", detail: "Audit trail", color: "purple" }
  ];
  return (
    <div className="lab-architecture" aria-label="Problem architecture walkthrough">
      <div className="lab-architecture-top"><span>REQUEST PATH</span><span>ILLUSTRATIVE LAB ARCHITECTURE</span></div>
      <div className="lab-architecture-flow">
        {nodes.map((node, i) => <div className="lab-architecture-part" key={node.title}>
          <div className={"lab-arch-node " + node.color + (i === step % 4 ? " focus" : "")}>
            <span className="lab-arch-index">{String(i + 1).padStart(2, "0")}</span>
            <strong>{node.title}</strong><small>{node.sub}</small><em>{node.detail}</em>
          </div>
          {i < nodes.length - 1 && <div className={"lab-arch-arrow " + (i === 1 && step === 0 ? "denied" : "")} aria-hidden="true"><span>{i === 1 && step === 0 ? "× Denied" : "→"}</span></div>}
        </div>)}
      </div>
      <div className="lab-architecture-legend"><span><i className="dot red" /> Failed request</span><span><i className="dot amber" /> Inspect permissions</span><span><i className="dot green" /> Recovery verified</span></div>
    </div>
  );
}

export default function AwsAiAccessDeniedLab() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"guided" | "challenge">("guided");
  const [sideBySide, setSideBySide] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const current = stages[step];
  const correctCount = useMemo(() => stages.reduce((n, stage, i) => n + (checked[i] && stage.choices[answers[i]]?.correct ? 1 : 0), 0), [answers, checked]);
  const choice = answers[step];
  const submitted = !!checked[step];
  const passed = submitted && current.choices[choice]?.correct;

  function goTo(next: number) {
    setStep(Math.max(0, Math.min(stages.length - 1, next)));
  }

  return (
    <main className={"lab-shell " + (sideBySide ? "lab-side-mode" : "")}>
      <header className="lab-hero">
        <a href="/troubleshooting">← Troubleshooting Hub</a>
        <p className="lab-kicker">AWS HANDS-ON TROUBLESHOOTING · LAB 01</p>
        <h1>Amazon Bedrock: failed model invocation</h1>
        <p>A model request starts failing after an access change. Investigate the request path, correlate CloudTrail evidence, identify the actual authorization layer, then prove recovery. This lab uses a local simulator—no live AWS resources are accessed or changed.</p>
        <div className="lab-hero-meta"><span>4 checkpoints</span><span>Bedrock · IAM · CloudTrail</span><span>Guided + challenge</span></div>
      </header>

      <section className="lab-intro">
        <div>
          <span className="lab-section-kicker">THE PROBLEM</span>
          <h2>Why can the model request fail?</h2>
          <p>The application reaches the Bedrock Runtime API, but the request is rejected. The task is to find which part of the request's authorization or model-access path explains the denial—not to assume every AccessDeniedException has the same cause.</p>
          <div className="lab-symptoms"><span><b>01</b> Inference request fails</span><span><b>02</b> Caller and event need correlation</span><span><b>03</b> Fix must be narrowly scoped</span></div>
        </div>
        <div className="lab-error-preview">
          <div className="lab-error-title"><span className="lab-error-dot" /> Simulated API response <span className="lab-http">HTTP 403</span></div>
          <code>AccessDeniedException</code>
          <p>The request was denied. Capture the full response and inspect the matching CloudTrail event to identify the cause.</p>
          <small>Training note: AWS can return an enhanced authorization message naming the denied action and policy reason, but the wording varies by API, authorization layer and context. This lab reveals the specific IAM hypothesis only after you inspect the evidence.</small>
        </div>
        <Architecture step={step} />
        <p className="lab-source-note">Error behavior reference: <a href="https://repost.aws/knowledge-center/bedrock-invokemodel-api-error" target="_blank" rel="noreferrer">AWS guidance on Bedrock InvokeModel errors ↗</a></p>
      </section>

      <div className="lab-controls">
        <div className="lab-mode-switch" role="group" aria-label="Learning mode">
          <button className={mode === "guided" ? "active" : ""} onClick={() => setMode("guided")}>Guided walkthrough</button>
          <button className={mode === "challenge" ? "active" : ""} onClick={() => setMode("challenge")}>Challenge mode</button>
        </div>
        <label className="lab-split-toggle"><input type="checkbox" checked={sideBySide} onChange={e => setSideBySide(e.target.checked)} /> Try side-by-side console</label>
      </div>
      <p className="lab-mode-description">{mode === "guided" ? "Guided mode explains what to inspect, why it matters, and how to verify the result." : "Challenge mode hides the suggested action and explanation. Use the simulator and evidence to decide your next move; reveal the walkthrough when you need a hint."}</p>

      <section className={"lab-layout " + (sideBySide ? "split-layout" : "")}>
        <aside className="lab-steps" aria-label="Lab progress">
          <h2>Investigation path</h2>
          {stages.map((item, i) => <button key={item.title} className={i === step ? "active" : checked[i] && item.choices[answers[i]]?.correct ? "complete" : ""} onClick={() => goTo(i)}><span>{checked[i] && item.choices[answers[i]]?.correct ? "✓" : String(i + 1).padStart(2, "0")}</span><strong>{item.title}</strong><small>{checked[i] ? item.choices[answers[i]]?.correct ? "Passed" : "Review answer" : "Not completed"}</small></button>)}
          <div className="lab-score"><span>Knowledge checks passed</span><strong>{correctCount} / {stages.length}</strong></div>
          {correctCount === stages.length && <div className="lab-completion"><strong>Lab complete</strong><p>You correlated the evidence, made a scoped change, and verified recovery.</p></div>}
        </aside>

        <article className="lab-workspace">
          <div className="lab-stage-head"><span>CHECKPOINT {step + 1} OF {stages.length}</span><h2>{current.title}</h2><p>{current.objective}</p></div>
          <div className="lab-evidence-card"><div className="lab-evidence-head"><span>{mode === "guided" ? "INVESTIGATION EVIDENCE" : "CASE FILE"}</span><strong>{current.evidenceTitle}</strong></div>{current.evidence.map((line) => <div className="lab-evidence-row" key={line}><span>{line.split(":")[0]}</span><strong>{line.includes(":") ? line.slice(line.indexOf(":") + 1).trim() : line}</strong></div>)}</div>
          {mode === "guided" ? <div className="lab-instruction"><h3>Visual walkthrough · {current.consolePage}</h3><p>{current.action}</p><a href="/troubleshooting/simulators/aws" target="_blank" rel="noreferrer">Open AWS Console Simulator in a new tab ↗</a></div> : <details className="lab-hint"><summary>Reveal guided walkthrough</summary><p>{current.action}</p><a href="/troubleshooting/simulators/aws" target="_blank" rel="noreferrer">Open AWS Console Simulator ↗</a></details>}
          <div className="lab-verify"><h3>Evidence-based verification</h3><p>{mode === "guided" ? current.verify : "What evidence would confirm or reject your hypothesis? Check the request result and the matching CloudTrail event before moving on."}</p></div>
          <div className="lab-question"><h3>Decision checkpoint</h3><p>{current.question}</p><div className="lab-choices">{current.choices.map((item, i) => <button key={item.label} className={submitted && choice === i ? item.correct ? "right" : "wrong" : choice === i ? "selected" : ""} onClick={() => { setAnswers(old => ({ ...old, [step]: i })); setChecked(old => ({ ...old, [step]: false })); }}><span>{String.fromCharCode(65 + i)}</span>{item.label}</button>)}</div>
            {submitted && <p className={current.choices[choice]?.correct ? "lab-feedback good" : "lab-feedback bad"}>{current.choices[choice]?.feedback}</p>}
            <div className="lab-actions">{!submitted && <button className="primary" disabled={choice === undefined} onClick={() => setChecked(old => ({ ...old, [step]: true }))}>Check decision</button>}{submitted && !passed && <button onClick={() => setChecked(old => ({ ...old, [step]: false }))}>Try again</button>}{passed && step < stages.length - 1 && <button className="primary" onClick={() => goTo(step + 1)}>Continue to next checkpoint →</button>}{step > 0 && <button onClick={() => goTo(step - 1)}>← Previous</button>}{step === stages.length - 1 && passed && <span className="lab-complete-text">Checkpoint passed</span>}</div>
          </div>
        </article>

        {sideBySide && <aside className="lab-console-pane"><div className="lab-console-head"><div><span>SIMULATED AWS CONSOLE</span><strong>{current.consolePage}</strong></div><a href="/troubleshooting/simulators/aws" target="_blank" rel="noreferrer">Open full view ↗</a></div><iframe title="AWS console simulator side-by-side view" src="/troubleshooting/simulators/aws" loading="lazy" /></aside>}
      </section>
      <footer className="lab-footer">Training simulation only · The console and evidence are local illustrations, not live AWS resources. Do not grant broad permissions as a shortcut.</footer>
    </main>
  );
}
