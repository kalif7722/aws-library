import type {Metadata} from "next";
import type {CSSProperties} from "react";
import {ArrowRight, Cloud, Eye, Network} from "lucide-react";
import {PortalResume} from "./components/PortalChrome";
import {courseDirectory} from "./courses/catalog";
import PortalCertificationBadge from "./components/PortalCertificationBadge";
import {portalExamCode,portalCertificationHue} from "./components/portalCertificationAssets";

export const metadata: Metadata = {
  title: "AWS, Azure & Google Cloud Certification Learning",
  description: "Find visual certification courses, cloud service guides and architecture explanations across AWS, Azure and Google Cloud.",
};

const featured = courseDirectory.filter(course=>course.featured).slice(0,5);
const providers = [
  {label:"AWS",key:"aws",services:"/services"},
  {label:"Azure",key:"azure",services:"/azure-services"},
  {label:"Google Cloud",key:"gcp",services:"/gcp-services"},
] as const;

export default function LearningHome(){
  return <div className="portal-home-shell"><main className="portal-page portal-home">
    <section className="portal-home-hero" aria-labelledby="portal-home-title">
      <div className="portal-home-intro">
        <p className="portal-kicker">AWS · Azure · Google Cloud</p>
        <h1 id="portal-home-title">Learn cloud architecture <span>visually.</span></h1>
        <p className="portal-lede">Follow a certification course or look up a service. See how it works, where it fits, and why you’d choose it.</p>
        <div className="portal-actions">
          <PortalResume className="portal-button portal-resume"/>
          <a className="portal-button portal-primary" href="/courses">Browse courses <ArrowRight size={17} aria-hidden="true"/></a>
          <a className="portal-button" href="/services">Explore services</a>
        </div>
      </div>
      <figure className="portal-hero-art">
        <div className="portal-art-label"><Eye size={16} aria-hidden="true"/> Sample visual lesson</div>
        <img src="/course-visuals/sap-c03/module-10/slide-01-aip-v3.webp" width={2048} height={1152} fetchPriority="high" alt="EBS storage stays within an Availability Zone, but a snapshot can restore a volume in another zone."/>
        <figcaption><span>AWS architecture · Block storage</span><a href="/courses/aws-solutions-architect-professional/visual/module-10?lesson=sap-10-001">Open this EBS lesson <ArrowRight size={16} aria-hidden="true"/></a></figcaption>
      </figure>
    </section>

    <section className="portal-section portal-home-pathways" aria-labelledby="portal-pathways-title">
      <div className="portal-section-head">
        <div><p className="portal-kicker">Certification pathways</p><h2 id="portal-pathways-title">Find a course that fits your goal</h2></div>
        <a className="portal-home-text-link" href="/courses">All courses <ArrowRight size={16} aria-hidden="true"/></a>
      </div>
      <div className="portal-card-grid portal-pathway-grid">{featured.map(course=>{
        const code=portalExamCode(course.title);
        return <a className="portal-pathway-card portal-certification-tile" style={{"--cert-hue":portalCertificationHue(code)} as CSSProperties} href={course.href} key={course.href}>
          <div className="portal-certification-head"><PortalCertificationBadge cloud={course.cloud} code={code}/><ArrowRight className="portal-pathway-arrow" size={17} aria-hidden="true"/></div>
          <small>{course.cloudName} · {course.level}</small>
          <h3>{course.title}</h3><p>{course.subject}</p>
        </a>;
      })}</div>
      <nav className="portal-cloud-links" aria-label="Browse courses by provider">
        {providers.map(provider=><a href={`/courses?cloud=${provider.key}`} className={`portal-provider-link portal-provider-${provider.key}`} key={provider.key}><span aria-hidden="true"/>Browse {provider.label} courses</a>)}
      </nav>
    </section>

    <section className="portal-section portal-home-reference" aria-labelledby="portal-reference-title">
      <div className="portal-section-head"><div><p className="portal-kicker">Quick reference</p><h2 id="portal-reference-title">Look up a service or compare clouds</h2></div></div>
      <div className="portal-reference-grid">
        <article className="portal-route-card portal-tone-cyan">
          <div className="portal-pathway-mark"><Cloud size={23} aria-hidden="true"/></div>
          <div><h3>Cloud service libraries</h3><p>Explore what services do and how they fit into an architecture.</p>
            <nav className="portal-service-links" aria-label="Service libraries">
              {providers.map(provider=><a href={provider.services} key={provider.key}>{provider.label}<ArrowRight size={15} aria-hidden="true"/></a>)}
            </nav>
          </div>
        </article>
        <article className="portal-route-card portal-tone-violet">
          <div className="portal-pathway-mark"><Network size={23} aria-hidden="true"/></div>
          <div><h3>Cross-cloud comparison</h3><p>Compare the services AWS, Azure, and Google Cloud use to solve similar problems.</p>
            <a className="portal-home-text-link" href="/cloud-comparison">Compare clouds <ArrowRight size={16} aria-hidden="true"/></a>
          </div>
        </article>
      </div>
    </section>
    <footer className="portal-footer"><span>Visual Cloud Learning</span><a href="/troubleshooting/walkthroughs">Console walkthroughs</a></footer>
  </main></div>;
}
