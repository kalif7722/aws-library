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
    ["Compare AWS · Azure · GCP", "/gcp-comparison"],
    ["Browse all Google Cloud services", "/gcp-services"],
  ] },
];
const learningStats = [["225+", "visual service guides"], ["42", "certification paths"], ["3", "cloud providers"]];
export default function LearningHome() { return <main className="learning-shell">
  <nav className="top-nav" aria-label="Primary navigation"><span className="brand-link">Visual Learning</span></nav>
  <section className="learning-hero"><div className="hero-copy"><p className="course-kicker">AWS · Azure · GCP</p><h1>One visual study library for every cloud.</h1><p className="hero-summary">Choose a provider, then move from an official certification course into the exact service guides you need—without leaving the learning workspace.</p><div className="hero-actions"><a className="primary-action" href="/courses/aws-solutions-architect-associate">Start with AWS SAA</a><a className="secondary-action" href="/services">Browse all AWS services</a></div></div><div className="learning-map" aria-label="Learning flow"><div><span>01</span><strong>Choose a cloud</strong><small>AWS, Azure and Google Cloud</small></div><i>→</i><div><span>02</span><strong>Choose a course</strong><small>Follow the official exam domains</small></div><i>→</i><div><span>03</span><strong>Open visual guides</strong><small>Study architecture, use cases and walkthroughs</small></div></div></section>
  <section className="learning-intro" aria-labelledby="why-visual"><div><p className="course-kicker">A clearer way to learn cloud services</p><h2 id="why-visual">Understand the whole picture at a glance.</h2></div><ul><li><strong>Build the mental model first.</strong><span>See what a service does, where it fits, and how the main building blocks connect.</span></li><li><strong>Study less, remember more.</strong><span>Short explanations, diagrams, workflows, and examples turn dense documentation into a focused visual review.</span></li><li><strong>Prepare with confidence.</strong><span>Move from a certification topic to the exact service guide, then return to the learning path without losing context.</span></li></ul></section>
  <section className="stats-row" aria-label="Library summary">{learningStats.map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>
  <section className="comparison-home-callout"><div><p className="course-kicker">Cross-cloud comparison</p><h2>Translate your architecture across clouds.</h2><p>Compare matching capabilities across AWS, Azure and Google Cloud, with practical differences that matter in design reviews.</p></div><a href="/gcp-comparison">Explore service comparison ↗</a></section>
  <section className="provider-section"><div className="section-heading"><div><p className="course-kicker">Cloud provider library</p><h2>Where do you want to study?</h2></div><span>Explore AWS, Azure, and Google Cloud certification courses or browse each provider's shared service library.</span></div><div className="provider-grid">{providers.map(provider=><article className={`provider-card ${provider.tone}`} key={provider.key}><div className="provider-card-top"><span className="provider-mark">{provider.short}</span><span className="status-pill">{provider.status}</span></div><h3>{provider.name}</h3><p>{provider.description}</p>{provider.links.length?<details className="course-picker"><summary>Choose {provider.short} course or library <span>⌄</span></summary><div className="course-picker-menu">{provider.links.map(([label,href])=><a href={href} key={href}>{label}<span>→</span></a>)}</div></details>:<span className="coming-soon">Course and service mapping coming next</span>}</article>)}</div></section>
</main>; }
