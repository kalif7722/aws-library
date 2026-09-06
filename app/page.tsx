const learningStats = [
  ["225+", "visual service guides"],
  ["13", "AWS categories"],
  ["3", "certification paths"],
];

export default function LearningHome() {
  return (
    <main className="learning-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand-link" href="/">EL10 AWS Learning</a>
        <div><a className="active" href="/">Courses</a><a href="/services">Browse all AWS services</a></div>
      </nav>

      <section className="learning-hero">
        <div className="hero-copy">
          <p className="course-kicker">Visual AWS learning paths</p>
          <h1>Learn AWS by goal,<br />not by service list.</h1>
          <p className="hero-summary">Follow a certification-focused sequence, then open any service as a detailed EL10 visual guide when you need deeper understanding.</p>
          <div className="hero-actions">
            <a className="primary-action" href="/courses/aws-solutions-architect-associate">Start Solutions Architect Associate</a>
            <a className="secondary-action" href="/services">Browse all services</a>
          </div>
        </div>
        <div className="learning-map" aria-label="Learning flow">
          <div><span>01</span><strong>Choose a path</strong><small>Start with your certification goal</small></div>
          <i>→</i>
          <div><span>02</span><strong>Study by module</strong><small>Learn related services together</small></div>
          <i>→</i>
          <div><span>03</span><strong>Open EL10 guides</strong><small>See architecture and exam context</small></div>
        </div>
      </section>

      <section className="stats-row" aria-label="Library summary">
        {learningStats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      <section className="path-section">
        <div className="section-heading"><div><p className="course-kicker">Certification courses</p><h2>Choose your learning path</h2></div><span>More paths can be added using the same EL10 library</span></div>
        <div className="path-grid">
          <a className="course-card" href="/courses/aws-solutions-architect-associate">
            <div className="course-card-top"><span className="aws-badge">AWS</span><span className="status-pill">Available</span></div>
            <p>Associate</p><h3>Solutions Architect</h3>
            <span className="course-description">Cover every service and feature listed in the official SAA-C03 scope, organized by AWS service category.</span>
            <div className="course-meta"><span>16 categories</span><span>Official scope</span></div>
            <strong className="card-link">Open course →</strong>
          </a>
          <a className="course-card professional-card" href="/courses/aws-solutions-architect-professional">
            <div className="course-card-top"><span className="aws-badge">AWS</span><span className="status-pill">Available</span></div>
            <p>Professional</p><h3>Solutions Architect</h3>
            <span className="course-description">Cover every service and feature listed in the official SAP-C02 scope across advanced architecture categories.</span>
            <div className="course-meta"><span>19 categories</span><span>Official scope</span></div>
            <strong className="card-link">Open course →</strong>
          </a>
          <a className="course-card ai-course-card" href="/courses/aws-generative-ai-developer-professional">
            <div className="course-card-top"><span className="aws-badge">AWS</span><span className="status-pill">Available</span></div>
            <p>Professional</p><h3>Generative AI Developer</h3>
            <span className="course-description">Study every service and feature listed in the official AIP-C01 scope with the shared EL10 viewer.</span>
            <div className="course-meta"><span>13 categories</span><span>Official scope</span></div>
            <strong className="card-link">Open course →</strong>
          </a>
          <a className="library-card" href="/services">
            <div className="library-symbol">⌘</div>
            <p>Complete reference</p><h3>Browse All AWS Services</h3>
            <span className="course-description">Search semantically, explore category branches and open every visual study guide from one place.</span>
            <strong className="card-link">Open service library →</strong>
          </a>
        </div>
      </section>
    </main>
  );
}
