import type {Metadata} from "next";
import {PortalResume} from "./components/PortalChrome";
import {courseDirectory} from "./courses/catalog";

export const metadata: Metadata = {
  title: "AWS, Azure & Google Cloud Certification Learning",
  description: "Find visual certification courses, cloud service guides and architecture explanations across AWS, Azure and Google Cloud.",
};
const featured=courseDirectory.filter(c=>c.featured).slice(0,5);
export default function LearningHome(){
  return <main className="portal-page">
    <section className="portal-home-hero">
      <div><p className="portal-kicker">AWS · Azure · Google Cloud</p>
        <h1>Learn cloud architecture visually.</h1>
        <p className="portal-lede">Follow a certification course or look up a service. See how it works, where it fits, and why you’d choose it.</p>
        <div className="portal-actions"><PortalResume className="portal-button portal-resume"/><a className="portal-button portal-primary" href="/courses">Browse courses</a><a className="portal-button" href="/services">Explore services</a></div>
      </div>
      <figure className="portal-hero-art">
        <img src="/course-visuals/sap-c03/module-10/slide-01-aip-v3.webp" width={2048} height={1152} fetchPriority="high" alt="EBS storage stays within an Availability Zone, but a snapshot can restore a volume in another zone."/>
        <figcaption><span>From the visual library</span><a href="/courses/aws-solutions-architect-professional/visual/module-10?lesson=sap-10-001">Open this EBS lesson <span aria-hidden="true">→</span></a></figcaption>
      </figure>
    </section>
    <section className="portal-section"><div className="portal-section-head"><div><p className="portal-kicker">Certification pathways</p><h2>Find a course that fits your goal</h2></div><a href="/courses">All courses <span aria-hidden="true">→</span></a></div>
      <div className="portal-card-grid">{featured.map(c=><article key={c.href}><small>{c.cloudName} · {c.level}</small><h3><a href={c.href}>{c.title}</a></h3><p>{c.subject}</p></article>)}</div>
      <div className="portal-cloud-links"><a href="/courses?cloud=aws">Browse AWS courses</a><a href="/courses?cloud=azure">Browse Azure courses</a><a href="/courses?cloud=gcp">Browse Google Cloud courses</a></div>
    </section>
    <section className="portal-section"><div className="portal-section-head"><div><p className="portal-kicker">Quick reference</p><h2>Look up a service or compare clouds</h2></div></div>
      <div className="portal-card-grid portal-reference"><article><h3><a href="/services">AWS service library</a></h3><p>Find a service and see how it fits into an architecture.</p></article><article><h3><a href="/azure-services">Azure service library</a></h3><p>Browse services by capability.</p></article><article><h3><a href="/gcp-services">Google Cloud service library</a></h3><p>Browse services and visual guides.</p></article><article><h3><a href="/cloud-comparison">Cross-cloud comparison</a></h3><p>Compare how the providers solve similar problems.</p></article></div>
    </section>
    <footer className="portal-footer">Visual Cloud Learning <a href="/troubleshooting/walkthroughs">Console walkthroughs</a></footer>
  </main>;
}
