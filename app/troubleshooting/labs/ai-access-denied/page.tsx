"use client";

import { useMemo, useState } from "react";
import "./lab.css";

type Choice = { label: string; correct: boolean; feedback: string };
type Stage = { title: string; objective: string; evidenceTitle: string; evidence: string[]; question: string; choices: Choice[]; action: string; verify: string };

const stages: Stage[] = [
  {
    title: "1 · Reproduce the failure",
    objective: "Use the Bedrock model invocation in the AWS simulator. Record the exact error before changing IAM.",
    evidenceTitle: "Expected incident evidence",
    evidence: ["Service: Amazon Bedrock · Converse", "Caller role: AI-Platform-Operator", "Error: AccessDeniedException", "Denied action: bedrock:InvokeModel"],
    question: "What is the safest first action?",
    choices: [
      { label: "Capture the denied action, caller role, model and timestamp", correct: true, feedback: "Correct. You have a precise hypothesis and evidence to correlate with CloudTrail." },
      { label: "Attach AdministratorAccess immediately", correct: false, feedback: "That is excessive privilege and skips identifying the missing permission." },
      { label: "Change the model ID and retry repeatedly", correct: false, feedback: "A permission denial should be investigated before changing unrelated configuration." }
    ],
    action: "Open the AWS simulator, choose Amazon Bedrock, then use the model invocation form. The simulator may initially succeed; to practice the failure path, detach the linked Bedrock invocation policy from AI-Platform-Operator in IAM, then return to Bedrock and invoke again.",
    verify: "The invocation should fail with AccessDeniedException. Open CloudTrail → Event history and confirm the failed Converse event and caller identity."
  },
  {
    title: "2 · Identify the permission boundary",
    objective: "Use the caller and denied action from the failure evidence to inspect the role's effective permissions.",
    evidenceTitle: "Evidence to correlate",
    evidence: ["IAM role: AI-Platform-Operator", "Required action: bedrock:InvokeModel", "Linked policy: BedrockInvokeAccess", "Scope: model invocation only"],
    question: "Which remediation best matches the evidence?",
    choices: [
      { label: "Attach the least-privilege Bedrock invocation policy to the caller role", correct: true, feedback: "Correct. Restore the specific permission required by this workflow." },
      { label: "Make the model publicly accessible", correct: false, feedback: "Model access is not fixed by making a model public." },
      { label: "Grant broad permissions to every AI service role", correct: false, feedback: "That expands access beyond the demonstrated requirement." }
    ],
    action: "In the simulator, open IAM → Roles and locate AI-Platform-Operator. Use the linked-policy action to attach BedrockInvokeAccess. This is a local training-account change, not a real AWS IAM update.",
    verify: "Return to IAM and confirm BedrockInvokeAccess appears in the role's attached permissions. Do not add unrelated S3, KMS, or administrator permissions for this incident."
  },
  {
    title: "3 · Retest and prove recovery",
    objective: "A policy change is not proof of recovery. Repeat the original operation and inspect its audit event.",
    evidenceTitle: "Recovery acceptance criteria",
    evidence: ["Bedrock invocation completes", "No AccessDeniedException on the new event", "CloudTrail records the successful Converse operation", "No broad administrative policy was added"],
    question: "What proves the incident is resolved?",
    choices: [
      { label: "A successful repeat invocation plus a matching successful CloudTrail event", correct: true, feedback: "Correct. Verify the same operation after the fix and correlate the audit evidence." },
      { label: "The IAM page shows that a policy is attached", correct: false, feedback: "Configuration alone does not prove the request now succeeds." },
      { label: "The error disappears from the screen without retesting", correct: false, feedback: "You need a new request and a corresponding success event." }
    ],
    action: "Return to Amazon Bedrock and invoke the same model with the same prompt. Then open CloudTrail and inspect the newest Converse event.",
    verify: "Pass when the invocation succeeds and CloudTrail shows a successful Converse event. If it still fails, re-check the actual caller role, model access, permission scope, and any applicable organization or resource-level controls."
  }
];

export default function AwsAiAccessDeniedLab() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const current = stages[step];
  const correctCount = useMemo(() => stages.reduce((n, stage, i) => n + (checked[i] && stage.choices[answers[i]]?.correct ? 1 : 0), 0), [answers, checked]);
  const choice = answers[step];
  const submitted = !!checked[step];
  return (
    <main className="lab-shell">
      <header className="lab-hero">
        <a href="/troubleshooting">← Troubleshooting Hub</a>
        <p className="lab-kicker">AWS HANDS-ON TROUBLESHOOTING · LAB 01</p>
        <h1>Amazon Bedrock: AccessDenied on model invocation</h1>
        <p>Investigate the caller, use audit evidence, apply a least-privilege IAM fix, and prove recovery. This lab uses a local simulator—no live AWS resources are accessed or changed.</p>
        <div className="lab-hero-meta"><span>3 checkpoints</span><span>IAM · Bedrock · CloudTrail</span><span>Guided practice</span></div>
      </header>
      <section className="lab-layout">
        <aside className="lab-steps" aria-label="Lab progress">
          <h2>Investigation path</h2>
          {stages.map((item, i) => <button key={item.title} className={i === step ? "active" : checked[i] ? "complete" : ""} onClick={() => setStep(i)}><span>{checked[i] && item.choices[answers[i]]?.correct ? "✓" : String(i + 1).padStart(2, "0")}</span><strong>{item.title.slice(4)}</strong><small>{checked[i] ? item.choices[answers[i]]?.correct ? "Passed" : "Review answer" : "Not completed"}</small></button>)}
          <div className="lab-score"><span>Knowledge checks passed</span><strong>{correctCount} / {stages.length}</strong></div>
        </aside>
        <article className="lab-workspace">
          <div className="lab-stage-head"><span>CHECKPOINT {step + 1} OF {stages.length}</span><h2>{current.title.slice(4)}</h2><p>{current.objective}</p></div>
          <div className="lab-evidence-card"><div className="lab-evidence-head"><span>SIMULATED INCIDENT RECORD</span><strong>{current.evidenceTitle}</strong></div>{current.evidence.map((line) => <div className="lab-evidence-row" key={line}><span>{line.split(":")[0]}</span><strong>{line.includes(":") ? line.slice(line.indexOf(":") + 1).trim() : line}</strong></div>)}</div>
          <div className="lab-instruction"><h3>Perform the investigation</h3><p>{current.action}</p><a href="/troubleshooting/simulators/aws" target="_blank" rel="noreferrer">Open AWS Console Simulator ↗</a></div>
          <div className="lab-verify"><h3>Verify with evidence</h3><p>{current.verify}</p></div>
          <div className="lab-question"><h3>Knowledge check</h3><p>{current.question}</p><div className="lab-choices">{current.choices.map((item, i) => <button key={item.label} className={submitted && choice === i ? item.correct ? "right" : "wrong" : choice === i ? "selected" : ""} onClick={() => { setAnswers(old => ({ ...old, [step]: i })); setChecked(old => ({ ...old, [step]: false })); }}><span>{String.fromCharCode(65 + i)}</span>{item.label}</button>)}</div>
            {submitted && <p className={current.choices[choice]?.correct ? "lab-feedback good" : "lab-feedback bad"}>{current.choices[choice]?.feedback}</p>}
            <div className="lab-actions">{submitted && current.choices[choice]?.correct && step < stages.length - 1 && <button className="primary" onClick={() => setStep(step + 1)}>Continue to next checkpoint →</button>}{!submitted && <button className="primary" disabled={choice === undefined} onClick={() => setChecked(old => ({ ...old, [step]: true }))}>Check answer</button>}{submitted && !current.choices[choice]?.correct && <button onClick={() => setChecked(old => ({ ...old, [step]: false }))}>Try again</button>}{step > 0 && <button onClick={() => setStep(step - 1)}>← Previous</button>}{step === stages.length - 1 && submitted && current.choices[choice]?.correct && <span className="lab-complete">Lab checkpoint passed</span>}</div>
          </div>
        </article>
      </section>
      <footer className="lab-footer">Training simulation only · Evidence and events are illustrative until verified inside the simulator · Never grant broad permissions as a shortcut.</footer>
    </main>
  );
}
