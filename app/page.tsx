const providers = [
  {
    key: "aws",
    name: "Amazon Web Services",
    short: "AWS",
    status: "Available now",
    tone: "provider-aws",
    description: "Explore the complete AWS service library or study by official certification scope.",
    links: [
      ["AWS Solutions Architect Associate", "/courses/aws-solutions-architect-associate"],
      ["AWS Solutions Architect Professional", "/courses/aws-solutions-architect-professional"],
      ["AWS Generative AI Developer Professional", "/courses/aws-generative-ai-developer-professional"],
      ["Browse all AWS services", "/services"],
    ],
  },
  {
    key: "azure",
    name: "Microsoft Azure",
    short: "Azure",
    status: "Next platform",
    tone: "provider-azure",
    description: "Azure service visuals and certification paths will follow the AWS foundation.",
    links: [],
  },
  {
    key: "gcp",
    name: "Google Cloud",
    short: "GCP",
    status: "Next platform",
    tone: "provider-gcp",
    description: "A matching GCP service library and course workspace is planned next.",
    links: [],
  },
];

const learningStats = [
  ["225+", "visual service guides"],
  ["3", "AWS certification paths"],
  ["1", "shared EL10 viewer"],
];

export default function LearningHome() {
  return (
    <main className="learning-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand-link" href="/">EL10 Cloud Learning</a>
        <div><a className="active" href="/">Cloud providers</a><a href="/services">Browse AWS services</a></div>
      </nav>

      <section className="learning-hero">
        <div className="hero-copy">
          <p className="course-kicker">AWS · Azure · GCP</p>
          <h1>One visual study library for every cloud.</h1>
          <p className="hero-summary">Choose a provider, then move from an official certification course into the exact service guides you need—without leaving the learning workspace.</p>
          <div className="hero-actions">
            <a className="primary-action" href="/courses/aws-solutions-architect-associate">Start with AWS SAA</a>
            <a className="secondary-action" href="/services">Browse all AWS services</a>
          </div>
        </div>
        <div className="learning-map" aria-label="Learning flow">
          <div><span>01</span><strong>Choose a cloud</strong><small>AWS today, Azure and GCP next</small></div>
          <i>→</i>
          <div><span>02</span><strong>Choose a course</strong><small>Follow the official in-scope services</small></div>
          <i>→</i>
          <div><span>03</span><strong>Open EL10 guides</strong><small>Study architecture, use cases and code</small></div>
        </div>
      </section>

      <section className="learning-intro" aria-labelledby="why-visual">
        <div>
          <p className="course-kicker">A clearer way to learn cloud services</p>
          <h2 id="why-visual">Understand the whole picture at a glance.</h2>
        </div>
        <ul>
          <li><strong>Build the mental model first.</strong><span>See what a service does, where it fits, and how the main building blocks connect.</span></li>
          <li><strong>Study less, remember more.</strong><span>Short explanations, diagrams, workflows, and examples turn dense documentation into a focused visual review.</span></li>
          <li><strong>Prepare with confidence.</strong><span>Move from a certification topic to the exact service guide, then return to the learning path without losing context.</span></li>
        </ul>
      </section>

      <section className="stats-row" aria-label="Library summary">
        {learningStats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      <section className="provider-section">
        <div className="section-heading"><div><p className="course-kicker">Cloud provider library</p><h2>Where do you want to study?</h2></div><span>AWS is fully mapped; Azure and GCP are next.</span></div>
        <div className="provider-grid">
          {providers.map((provider) => (
            <article className={`provider-card ${provider.tone}`} key={provider.key}>
              <div className="provider-card-top"><span className="provider-mark">{provider.short}</span><span className="status-pill">{provider.status}</span></div>
              <h3>{provider.name}</h3>
              <p>{provider.description}</p>
              {provider.links.length ? (
                <details className="course-picker">
                  <summary>Choose AWS course or library <span>⌄</span></summary>
                  <div className="course-picker-menu">
                    {provider.links.map(([label, href]) => <a href={href} key={href}>{label}<span>→</span></a>)}
                  </div>
                </details>
              ) : <span className="coming-soon">Course and service mapping coming next</span>}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
