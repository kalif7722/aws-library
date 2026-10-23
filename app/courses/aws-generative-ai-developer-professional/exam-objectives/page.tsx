import AipC01TaskGuide from "../../../components/AipC01TaskGuide";
import "../../../components/AipC01TaskGuide.css";

export default function GenAIExamObjectivesPage() {
  return <main className="aip-c01-page">
    <nav className="aip-c01-breadcrumb" aria-label="Breadcrumb"><a href="/courses/aws-generative-ai-developer-professional">← Course overview</a><span>/</span><span>Exam objectives</span></nav>
    <div className="aip-c01-page-heading"><div><p className="aip-c01-page-eyebrow">AWS CERTIFIED GENERATIVE AI DEVELOPER · PROFESSIONAL</p><h1>Exam objectives &amp; visual walkthroughs</h1><p>Explore the official domains, select a task, and study its visual walkthroughs and related services.</p></div><span className="aip-c01-page-badge">AIP-C01</span></div>
    <AipC01TaskGuide />
  </main>;
}
