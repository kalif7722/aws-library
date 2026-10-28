'use client';

import {useEffect, useMemo, useState} from 'react';
import {ArrowLeft, ArrowRight, BookOpen, Check, Compass, Home, Layers, List, X} from 'lucide-react';
import slides from './sap-c03-slides.json';
import './SapC03Slides.css';

const guide = 'https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-03/solutions-architect-professional-03.html';
const names = ['Course roadmap and architecture thinking', 'IAM, federation and cross-account access'];

export default function SapC03Slides() {
  const [current, setCurrent] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const slide = slides[current];
  const moduleStart = slide.module === 1 ? 0 : 4;
  const moduleTotal = slide.module === 1 ? 4 : 44;
  const numberInModule = current - moduleStart + 1;
  const progress = ((current + 1) / slides.length) * 100;
  const byModule = useMemo(() => [slides.slice(0, 4), slides.slice(4)], []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && current < slides.length - 1) setCurrent(n => n + 1);
      if (event.key === 'ArrowLeft' && current > 0) setCurrent(n => n - 1);
      if (event.key === 'Escape') setDrawer(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);
  useEffect(() => setRevealed(false), [current]);

  return <main className="sap03">
    <header className="sap03-top"><a href="/" aria-label="Home"><Home size={18}/> Home</a><a href="/courses/aws-solutions-architect-professional">Course overview</a><span>AWS SAP-C03 · Visual learning path</span><button onClick={() => setDrawer(true)} aria-label="Open slide list"><List size={18}/> All lessons</button></header>
    <div className="sap03-progress" aria-label={`Slide ${current+1} of ${slides.length}`}><span style={{width: `${progress}%`}}/></div>
    <section className="sap03-stage" aria-labelledby="sap03-title">
      <div className="sap03-kicker"><span>MODULE {String(slide.module).padStart(2, '0')}</span><span>{names[slide.module-1]}</span><span>{numberInModule} / {moduleTotal}</span></div>
      <div className="sap03-main"><div className="sap03-copy"><div className="sap03-kind">{slide.kind} · SAP-C03</div><h1 id="sap03-title">{slide.title}</h1><p className="sap03-lead">{slide.lead}</p><ul>{slide.points.map((point, i) => <li key={i}><span>{String(i+1).padStart(2, '0')}</span>{point}</li>)}</ul></div>
      <div className={`sap03-visual sap03-visual-${slide.kind}`} aria-label="Concept map"><div className="sap03-visual-heading"><Layers size={19}/> Concept map</div><div className="sap03-visual-track">{slide.visual.map((item, i) => <div className="sap03-visual-node" key={i}><span>{String(i+1).padStart(2, '0')}</span><strong>{item}</strong></div>)}</div><div className="sap03-visual-caption">Follow the identity, permission, and resource boundaries in the request.</div></div></div>
      <div className="sap03-bottom"><div className="sap03-check"><button onClick={() => setRevealed(!revealed)} aria-expanded={revealed}><Compass size={18}/>{revealed ? 'Hide key decision' : 'Reveal key decision'}</button>{revealed && <p><Check size={18}/>{slide.takeaway}</p>}</div><div className="sap03-skill"><BookOpen size={16}/>{slide.skills.map(s => /^\d\.\d\.\d$/.test(s) ? `Skill ${s}` : s).join(' · ')}</div></div>
    </section>
    <footer className="sap03-controls"><span>Lesson {current + 1} of 48 · Opening 2 of 28 modules</span><div><button disabled={current===0} onClick={() => setCurrent(n => n - 1)}><ArrowLeft size={17}/> Previous</button><button disabled={current===slides.length-1} onClick={() => setCurrent(n => n + 1)}>Next lesson <ArrowRight size={17}/></button></div><a href={guide} target="_blank" rel="noreferrer">Official SAP-C03 exam guide ↗</a></footer>
    {drawer && <div className="sap03-overlay" onClick={() => setDrawer(false)}><aside className="sap03-drawer" onClick={event => event.stopPropagation()} aria-label="Lesson list"><div className="sap03-drawer-head"><div><small>LEARNING PATH</small><h2>Lessons</h2></div><button onClick={() => setDrawer(false)} aria-label="Close slide list"><X/></button></div>{byModule.map((group, m) => <div className="sap03-drawer-module" key={m}><h3>{String(m+1).padStart(2,'0')} · {names[m]} <span>{group.length}</span></h3>{group.map((s, j) => <button className={current === (m === 0 ? j : j+4) ? 'active' : ''} key={j} onClick={() => {setCurrent(m === 0 ? j : j+4);setDrawer(false)}}><span>{String(j+1).padStart(2,'0')}</span>{s.title}</button>)}</div>)}</aside></div>}
  </main>;
}
