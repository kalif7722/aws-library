import type { Metadata } from "next";
import {ArrowRight, BookOpen, Cloud, Eye, GraduationCap, Network, Sparkles, Terminal} from "lucide-react";
import "./components/LearningHome.css";

export const metadata: Metadata = {
  title: "AWS, Azure & Google Cloud Certification Learning",
  description:
    "Explore visual AWS, Azure, and Google Cloud service guides, certification learning paths, architecture walkthroughs, and cross-cloud comparisons.",
};

const providers = [
  {
    key: "aws", name: "Amazon Web Services", short: "AWS", status: "Available now", tone: "provider-aws",
    description: "Explore the complete AWS service library or study by official certification scope.",
    links: [
      ["FOUNDATIONAL · Cloud Practitioner (CLF-C02)", "/courses/aws-cloud-practitioner"],
      ["FOUNDATIONAL · AI Practitioner (AIF-C01)", "/courses/aws-ai-practitioner"],
      ["ASSOCIATE · Solutions Architect (SAA-C03)", "/courses/aws-solutions-architect-associate"],
      ["ASSOCIATE · Developer (DVA-C02)", "/courses/aws-developer-associate"],
      ["ASSOCIATE · CloudOps Engineer (SOA-C03)", "/courses/aws-cloudops-engineer-associate"],
      ["ASSOCIATE · Data Engineer (DEA-C01)", "/courses/aws-data-engineer-associate"],
      ["ASSOCIATE · Machine Learning Engineer (MLA-C01)", "/courses/aws-machine-learning-engineer-associate"],
      ["PROFESSIONAL · Solutions Architect (SAP-C02)", "/courses/aws-solutions-architect-professional"],
      ["PROFESSIONAL · DevOps Engineer (DOP-C02)", "/courses/aws-devops-engineer-professional"],
      ["PROFESSIONAL · Generative AI Developer (AIP-C01)", "/courses/aws-generative-ai-developer-professional"],
      ["SPECIALTY · Advanced Networking (ANS-C01)", "/courses/aws-advanced-networking-specialty"],
      ["SPECIALTY · Security (SCS-C03)", "/courses/aws-security-specialty"],
      ["Browse all AWS services", "/services"],
    ],
  },
  { key: "azure", name: "Microsoft Azure", short: "Azure", status: "Available now", tone: "provider-azure", description: "Study Azure certification scopes through the shared service pages and visual branch library.", links: [
    ["FOUNDATIONAL · Azure Fundamentals (AZ-900)", "/courses/azure-az-900"],
    ["ASSOCIATE · Azure Administrator (AZ-104)", "/courses/azure-az-104"],
    ["EXPERT · Azure Solutions Architect (AZ-305)", "/courses/azure-az-305"],
    ["SPECIALTY · Azure Network Engineer (AZ-700)", "/courses/azure-az-700"],
    ["EXPERT · DevOps Engineer (AZ-400)", "/courses/azure-az-400"],
    ["FOUNDATIONAL · Azure AI Fundamentals (AI-901)", "/courses/azure-ai-901"],
    ["ASSOCIATE · Azure AI Apps and Agents (AI-103)", "/courses/azure-ai-103"],
    ["FOUNDATIONAL · Azure Data Fundamentals (DP-900)", "/courses/azure-dp-900"],
    ["ASSOCIATE · Azure Database Administrator (DP-300)", "/courses/azure-dp-300"],
    ["ASSOCIATE · Fabric Analytics Engineer (DP-600)", "/courses/azure-dp-600"],
    ["ASSOCIATE · Azure Virtual Desktop (AZ-140)", "/courses/azure-az-140"],
    ["SPECIALTY · Azure for SAP Workloads (AZ-120)", "/courses/azure-az-120"],
    ["FOUNDATIONAL · Security, Compliance and Identity (SC-900)", "/courses/azure-sc-900"],
    ["ASSOCIATE · Identity and Access Administrator (SC-300)", "/courses/azure-sc-300"],
    ["ASSOCIATE · Security Operations Analyst (SC-200)", "/courses/azure-sc-200"],
    ["Browse all Azure services", "/azure-services"],
  ] },
  { key: "gcp", name: "Google Cloud", short: "GCP", status: "Available now", tone: "provider-gcp", description: "Study Google Cloud certification domains through the shared GCP service library and visual walkthrough workspace.", links: [
    ["LEADER · Cloud Digital Leader (CDL)", "/courses/gcp-cloud-digital-leader"],
    ["LEADER · Generative AI Leader (GAL)", "/courses/gcp-generative-ai-leader"],
    ["ASSOCIATE · Cloud Engineer (ACE)", "/courses/gcp-associate-cloud-engineer"],
    ["ASSOCIATE · Data Practitioner (ADP)", "/courses/gcp-associate-data-practitioner"],
    ["ASSOCIATE · Google Workspace Administrator (AGWA)", "/courses/gcp-associate-google-workspace-administrator"],
    ["PROFESSIONAL · Cloud Architect (PCA)", "/courses/gcp-professional-cloud-architect"],
    ["PROFESSIONAL · Cloud Developer (PCD)", "/courses/gcp-professional-cloud-developer"],
    ["PROFESSIONAL · Data Engineer (PDE)", "/courses/gcp-professional-data-engineer"],
    ["PROFESSIONAL · Cloud Database Engineer (PCDE)", "/courses/gcp-professional-cloud-database-engineer"],
    ["PROFESSIONAL · Machine Learning Engineer (PMLE)", "/courses/gcp-professional-machine-learning-engineer"],
    ["PROFESSIONAL · Cloud Security Engineer (PCSE)", "/courses/gcp-professional-cloud-security-engineer"],
    ["PROFESSIONAL · Cloud DevOps Engineer (PCDOE)", "/courses/gcp-professional-cloud-devops-engineer"],
    ["PROFESSIONAL · Cloud Network Engineer (PCNE)", "/courses/gcp-professional-cloud-network-engineer"],
    ["PROFESSIONAL · Agentic Architect (PAA)", "/courses/gcp-professional-agentic-architect"],
    ["PROFESSIONAL · Security Operations Engineer (PSOE)", "/courses/gcp-professional-security-operations-engineer"],
    ["Browse all Google Cloud services", "/gcp-services"],
  ] },
];
const features = [
  { icon: Eye, title: "See the concept", text: "Visual explanations turn complex cloud services into clear mental models." },
  { icon: Network, title: "Connect the architecture", text: "Follow service relationships, design choices and real workload patterns." },
  { icon: Terminal, title: "Learn by doing", text: "Explore console walkthroughs and course-specific labs where available." },
  { icon: GraduationCap, title: "Study with direction", text: "Follow certification learning paths, exam objectives and focused revision." },
];
export default function LearningHome() { return <main className="learning-shell home-redesign">
  <nav className="top-nav" aria-label="Primary navigation"><a className="brand-link" href="/">Visual <span>Cloud Learning</span></a><div><a href="#courses">Certification courses</a><a href="#features">How you learn</a><a href="#libraries">Service libraries</a><a href="/cloud-comparison">Compare clouds</a></div></nav>
  <section className="home-hero" aria-labelledby="home-title"><div><p className="home-eyebrow">AWS · MICROSOFT AZURE · GOOGLE CLOUD</p><h1 id="home-title">See the cloud.<br/><span>Understand the why.</span></h1><p className="home-summary">Build cloud knowledge that connects. Explore visual certification courses, architecture explanations and practical walkthroughs—all in one learning workspace.</p><div className="home-actions"><a className="home-primary" href="#courses">Find your course <ArrowRight size={18}/></a><a className="home-secondary" href="#features">Explore the experience ↓</a></div><p className="home-hero-note">From your first cloud concept to your next certification.</p></div>
  <div className="home-visual" aria-label="Your visual learning journey"><div className="home-visual-top"><span className="home-live-dot"/>YOUR NEXT CLOUD SKILL STARTS HERE</div><div className="home-clouds"><span>AWS</span><span>Azure</span><span>Google Cloud</span></div><div className="home-journey">{[{icon:BookOpen,title:"Choose your path",text:"42 certification learning paths"},{icon:Network,title:"Make the connections",text:"Visual concepts and architecture"},{icon:Terminal,title:"Put knowledge into practice",text:"Walkthroughs and course-based labs"}].map(({icon:Icon,title,text},i)=><div className="home-journey-step" key={title}><span className="home-step-icon"><Icon size={23}/></span><div><small>0{i+1}</small><strong>{title}</strong><p>{text}</p></div></div>)}</div><div className="home-visual-bottom"><Sparkles size={16}/> Learn visually. Think architecturally. Apply confidently.</div></div></section>
  <section className="home-courses" id="courses" aria-labelledby="courses-title"><div className="home-section-heading"><div><p className="home-eyebrow">YOUR COURSE COMES FIRST</p><h2 id="courses-title">Choose a cloud. Start a learning path.</h2></div><p>Explore 42 certification paths across three clouds. Pick your starting point and build from there.</p></div><div className="home-provider-grid">{providers.map(provider=>{const courses=provider.links.filter(([,href])=>href.startsWith('/courses/'));return <article className={`home-provider ${provider.tone}`} key={provider.key}><div className="home-provider-heading"><span className="provider-mark">{provider.short}</span><span>{courses.length} learning paths</span></div><h3>{provider.name}</h3><p>{provider.key==='aws'?'Build from cloud foundations to architecture, security and generative AI.':provider.key==='azure'?'Connect administration, architecture, data, AI and security skills.':'Explore cloud engineering, data, AI and professional architecture.'}</p><div className="home-course-list">{courses.slice(0,3).map(([label,href])=><a key={href} href={href}><span><small>{label.split(' · ')[0]}</small><strong>{label.split(' · ')[1]}</strong></span><ArrowRight size={16}/></a>)}</div><details className="home-more-courses"><summary>Explore all {courses.length} {provider.short} courses <span>＋</span></summary><div className="home-course-list">{courses.slice(3).map(([label,href])=><a key={href} href={href}><span><small>{label.split(' · ')[0]}</small><strong>{label.split(' · ')[1]}</strong></span><ArrowRight size={16}/></a>)}</div></details></article>})}</div></section>
  <section id="features" className="home-features" aria-labelledby="features-title"><div className="home-section-heading"><div><p className="home-eyebrow">MORE THAN A LIST OF SERVICES</p><h2 id="features-title">Make complex concepts click.</h2></div><p>See how a service works, why you would choose it and where it fits in the bigger picture.</p></div><div className="home-feature-grid">{features.map(({icon:Icon,title,text})=><article key={title}><Icon size={25}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
  <section id="libraries" className="home-resources" aria-labelledby="resources-title"><div className="home-section-heading"><div><p className="home-eyebrow">KEEP EXPLORING</p><h2 id="resources-title">The right reference, when you need it.</h2></div><p>Jump into a service library or compare equivalent capabilities across clouds.</p></div><div className="home-resource-grid">{providers.map(provider=><a key={provider.key} href={provider.links[provider.links.length-1][1]}><Cloud size={23}/><h3>{provider.short} service library</h3><p>Explore visual service guides, use cases and architecture explanations.</p><span>Browse services <ArrowRight size={16}/></span></a>)}<a href="/cloud-comparison"><Network size={23}/><h3>Cross-cloud comparison</h3><p>Connect matching capabilities across AWS, Azure and Google Cloud.</p><span>Compare services <ArrowRight size={16}/></span></a></div></section>
  <footer className="home-footer"><span>Visual Cloud Learning</span><p>Build understanding. Connect the concepts. Take the next step.</p><a href="#courses">Explore certification courses ↑</a></footer>
</main>; }
