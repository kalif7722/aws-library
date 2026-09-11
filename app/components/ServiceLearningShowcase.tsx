"use client";

import "./ServiceLearningShowcase.css";

type WalkNode={label:string;sub?:string};
type WalkLayer={title:string;nodes:WalkNode[]};
type WalkArchitecture={title:string;note:string;reference?:string;layers:WalkLayer[]};

type Props={
  serviceName:string;
  architectures:WalkArchitecture[];
  security:string[];
  optimization:string[];
  cost:string[];
  watchPoints:string[];
  securityId?:string;
  costId?:string;
};

const clamp3=(items:string[])=>items.filter(Boolean).slice(0,3);

function WalkthroughCard({architecture,index}:{architecture:WalkArchitecture;index:number}){
  const layers=architecture.layers.slice(0,6);
  return <article className="service-walk-card">
    <div className="service-walk-heading"><b>{index}</b><div><span>ARCHITECTURE WALK-THROUGH</span><h4>{architecture.title}</h4></div></div>
    <p>{architecture.note}</p>
    <div className="service-walk-flow" aria-label={`${architecture.title} flow`}>
      {layers.map((layer,i)=><div className="service-walk-step" key={`${layer.title}-${i}`}>
        <strong>{layer.title}</strong>
        <small>{layer.nodes.slice(0,3).map(n=>n.label).join(" • ")}</small>
        {i<layers.length-1&&<i aria-hidden="true">→</i>}
      </div>)}
    </div>
    {architecture.reference&&<div className="service-walk-reference">Reference pattern: {architecture.reference}</div>}
  </article>;
}

function InsightPanel({title,icon,items,id}:{title:string;icon:string;items:string[];id?:string}){
  return <section className="service-insight-panel" id={id}>
    <div className="service-panel-title"><span>{icon}</span><h3>{title}</h3></div>
    <div className="service-insight-list">{clamp3(items).map((item,i)=><div key={i}><b>{String(i+1).padStart(2,"0")}</b><p>{item}</p></div>)}</div>
  </section>;
}

export default function ServiceLearningShowcase({serviceName,architectures,security,optimization,cost,watchPoints,securityId="security",costId="cost-models"}:Props){
  const walks=architectures.slice(0,3);
  const costItems=clamp3(cost);
  return <div className="service-showcase" data-service-showcase={serviceName}>
    <section className="service-walkthrough-section">
      <div className="service-section-cap"><div><p>REAL-WORLD EXAMPLES</p><h3>Architecture walk-throughs</h3></div><span>Read each flow left to right and connect the service to the responsibility it actually owns.</span></div>
      <div className={`service-walk-grid count-${Math.max(1,walks.length)}`}>{walks.map((a,i)=><WalkthroughCard architecture={a} index={i+1} key={`${a.title}-${i}`}/>)}</div>
    </section>

    <div className="service-insight-grid">
      <InsightPanel id={securityId} title="Security & governance" icon="◆" items={security}/>
      <InsightPanel title="Design & optimization" icon="◇" items={optimization}/>
      <InsightPanel title="Service-specific watch points" icon="!" items={watchPoints}/>
    </div>

    <section className="service-cost-board" id={costId}>
      <div className="service-section-cap"><div><p>COST MODEL</p><h3>How the bill behaves</h3></div><span>Learn the pricing shape and architecture drivers, not a price that goes stale.</span></div>
      <div className="service-cost-grid">{costItems.map((item,i)=><article className={i===0?"recommended":""} key={i}><b>{String(i+1).padStart(2,"0")}</b><p>{item}</p></article>)}</div>
      <div className="service-cost-rule"><b>Cost decision rule</b><span>Start with the workload shape and dominant charge driver, then optimize architecture before comparing unit prices.</span></div>
    </section>
  </div>;
}
