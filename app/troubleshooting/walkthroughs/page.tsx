'use client';

import { useEffect, useState } from 'react';
import labsData from './labs.json';
import './walkthroughs.css';

type Screen = { title: string; path: string; action: string; why: string; rows: [string, string][]; warning?: string };
type Lab = { section: string; id: string; service: string; title: string; simulator: string | null; console?: string; doc: string; screens: Screen[] };
const labs = labsData as Lab[];
const sections = [...new Set(labs.map(lab => lab.section))].sort();
const href = (id: string) => `/troubleshooting/walkthroughs?lab=${encodeURIComponent(id)}`;

export default function ConsoleWalkthroughs() {
  const [id, setId] = useState('ec2-first-instance');
  const [screen, setScreen] = useState(0);
  useEffect(() => { const requested = new URLSearchParams(window.location.search).get('lab'); if (labs.some(lab => lab.id === requested)) setId(requested!); }, []);
  const lab = labs.find(item => item.id === id) ?? labs[0];
  const current = lab.screens[screen] ?? lab.screens[0];
  const select = (next: string) => { setId(next); setScreen(0); history.pushState(null, '', href(next)); };
  return <main className="aws-walk-shell">
    <header className="aws-walk-top"><a href="/">← Home</a><strong>AWS Console Walkthroughs</strong><nav><a href="/troubleshooting/practice?lab=ec2-first-instance">Interactive practice</a><a href="/troubleshooting">Troubleshooting labs</a></nav></header>
    <div className="aws-walk-hero"><span>REUSABLE PRACTICE MODULE</span><h1>See the console. Understand every choice.</h1><p>Follow illustrated AWS console screens in order, then apply the same decisions in the linked simulator. These annotated reconstructions follow the service navigation and field labels in AWS documentation. They are not captures of a live account; compare them with the current console as you practise.</p></div>
    <div className="aws-walk-layout"><aside className="aws-walk-sidebar" aria-label="Console walkthrough lab sections"><div className="aws-walk-sidebar-title"><strong>Console walkthroughs</strong><small>{labs.length} image-led labs · {labs.reduce((n,l) => n + l.screens.length,0)} screens</small></div>{sections.map(section => <section key={section}><h2>{section}</h2>{labs.filter(l => l.section === section).map(item => <button key={item.id} className={item.id === id ? 'active' : ''} onClick={() => select(item.id)}><span>{item.service}</span><strong>{item.title}</strong><small>{item.screens.length} screens →</small></button>)}</section>)}<div className="aws-walk-sidebar-foot"><strong>Other labs</strong><a href="/troubleshooting">Incident troubleshooting ↗</a><a href="/troubleshooting/practice?lab=ec2-first-instance">Interactive EC2 practice ↗</a></div></aside>
      <article className="aws-walk-main"><div className="aws-walk-intro"><span>{lab.service.toUpperCase()} · GUIDED CONSOLE TOUR</span><h2>{lab.title}</h2><p>Open each screen, follow the highlighted decision, and explain why the setting matters. The highlighted controls are annotated reconstructions; use the linked simulator to click and inspect its supported resources.</p></div><div className="aws-walk-step-tabs" role="tablist" aria-label="Walkthrough screens">{lab.screens.map((item, i) => <button role="tab" aria-selected={screen===i} key={item.title} className={screen===i?'active':''} onClick={() => setScreen(i)}><b>{String(i+1).padStart(2,'0')}</b><span>{item.title}</span></button>)}</div>
        <div className="aws-walk-screen"><div className="aws-walk-screen-head"><span>SCREEN {screen+1} / {lab.screens.length}</span><strong>{current.path}</strong><em>ANNOTATED AWS CONSOLE VIEW</em></div><img src={`/aws-console-walkthroughs/${lab.id}-${String(screen+1).padStart(2,'0')}.svg`} alt={`Bright-mode AWS console reconstruction for ${lab.service}, screen ${screen+1}: ${current.title}. ${current.action}`} width={lab.id === "ec2-first-instance" ? 1920 : 1280} height={lab.id === "ec2-first-instance" ? 1006 : 720}/><div className="aws-walk-caption"><div><small>CHOOSE IN THE CONSOLE</small><p>{current.action}</p></div><div><small>WHY AN ARCHITECT CARES</small><p>{current.why}</p></div></div>{current.warning && <div className="aws-walk-warning"><strong>Check before using this setting</strong><p>{current.warning}</p></div>}</div>
        <div className="aws-walk-actions"><button disabled={screen===0} onClick={() => setScreen(n => n-1)}>← Previous screen</button><span>{screen+1} of {lab.screens.length}</span><button disabled={screen===lab.screens.length-1} onClick={() => setScreen(n => n+1)}>Next screen →</button></div>
        <section className="aws-walk-after"><span>AFTER THE IMAGE WALKTHROUGH</span><h3>Try these decisions yourself</h3><p>{lab.simulator ? "The simulator opens on the corresponding service screen. It is a training account with local state; some creation flows are still simplified compared with AWS. Compare each visible field with this walkthrough and the current AWS documentation." : "This service does not yet have a matching simulator screen. Use only an approved AWS sandbox to practise the console steps, and check current AWS documentation and pricing before creating resources."}</p><div className="aws-walk-links">{lab.simulator ? <a className="primary" href={`/troubleshooting/simulators/aws?screen=${encodeURIComponent(lab.simulator)}`}>Try in simulator or practice lab in console ↗</a> : <a className="primary" href={lab.console} target="_blank" rel="noreferrer">Practice in authorized AWS console ↗</a>}{lab.id==='ec2-first-instance' && <a href="/troubleshooting/practice?lab=ec2-first-instance">Complete guided EC2 launch practice ↗</a>}<a href={lab.doc} target="_blank" rel="noreferrer">Current AWS documentation ↗</a></div></section>
      </article></div>
  </main>;
}
