import Link from "next/link";
import ModuleVisualGallery from "../../../../components/ModuleVisualGallery";
import GenAITroubleshootingModule from "../../../../components/GenAITroubleshootingModule";
import ExamPreparation from "../../../../components/genai-exam/ExamPreparation";
import visualMap from "../../visual-lesson-map.json";

type CourseModule = {
  id: string;
  title: string;
  sourcePageStart: number;
  sourcePageEnd: number;
  description: string;
};

const modules = visualMap.modules as CourseModule[];
const heroCss = ".genai-deep-hero{padding:clamp(24px,4vw,40px);border-radius:22px;color:white;background:linear-gradient(120deg,#111b38,#174078 60%,#087e9e)}" +
  ".genai-deep-hero a{color:#c5e9ff}.genai-deep-hero h1{font-size:clamp(28px,4vw,42px);line-height:1.15;margin:14px 0}.genai-deep-hero p{color:#e0ecff;line-height:1.7}" +
  ".genai-deep-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:24px}.genai-deep-card{border:1px solid #dbe5f1;border-radius:14px;overflow:hidden;background:#fff}" +
  ".genai-deep-card img{width:100%;aspect-ratio:16/9;object-fit:contain;background:#f3f7fc;display:block}.genai-deep-fallback{aspect-ratio:16/9;display:grid;place-items:center;text-align:center;padding:18px;background:#f3f7fc;color:#66758b;font-size:13px}" +
  ".genai-deep-card div:last-child{padding:12px}.genai-deep-card b{font-size:13px}.genai-deep-card small{display:block;color:#687991;margin-top:5px}.genai-deep-note{margin-top:20px;padding:16px;border:1px dashed #bfd0e5;background:#f7faff;border-radius:12px;color:#5d6f87;line-height:1.6}" +
  "@media(max-width:850px){.genai-deep-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.genai-deep-grid{grid-template-columns:1fr}}";

export default async function GenAIModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const id = moduleId.replace("module-", "");
  const selected = modules.find((item) => item.id === id);
  if (!selected) return <main style={{padding:32}}><h1>Module not found</h1><Link href="/courses/aws-generative-ai-developer-professional">Back to course overview</Link></main>;
  if (id === "18") return <main style={{maxWidth:1400,margin:"0 auto",padding:"24px 20px 48px"}}><style>{heroCss}</style><section className="genai-deep-hero"><Link href="/courses/aws-generative-ai-developer-professional">← All course modules</Link><p>MODULE 18 · EXAM PREPARATION</p><h1>Review. Practice. Build confidence.</h1><p>Visual revision followed by original scenario-based practice and a timed exam.</p></section><ExamPreparation /></main>;
  if (id === "19") return <main style={{maxWidth:1400,margin:"0 auto",padding:"24px 20px 48px"}}>
    <style>{heroCss}</style>
    <section className="genai-deep-hero"><Link href="/courses/aws-generative-ai-developer-professional">← All course modules</Link><p style={{letterSpacing:".12em",fontSize:11,fontWeight:800}}>MODULE 19 · AIP-C01 TROUBLESHOOTING</p><h1>GenAI Troubleshooting</h1><p>Practical failure diagnosis across model requests, retrieval, prompts, agents, and deployment.</p></section>
    <GenAITroubleshootingModule />
  </main>;
  const { id: num, title, sourcePageStart, sourcePageEnd, description: desc } = selected;
  const imageBase = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals";

  return <main style={{maxWidth:1400,margin:"0 auto",padding:"24px 20px 48px",color:"#152440"}}>
    <style>{heroCss}</style>
    <section className="genai-deep-hero">
      <Link href="/courses/aws-generative-ai-developer-professional">← All course modules</Link>
      <p style={{letterSpacing:".12em",fontSize:11,fontWeight:800}}>MODULE {num} · VISUAL DEEP DIVE</p>
      <h1>{title}</h1>
      <p>{desc}</p>
    </section>
    <section>
      <h2 style={{marginTop:28,color:"var(--text, #94a3b8)"}}>Visual lessons</h2>
      <p style={{color:"#64748b"}}>Click any available visual to open the full-screen viewer. Use the left/right arrows or keyboard arrow keys to move between available visuals; press Esc to close.</p>
      <ModuleVisualGallery moduleNumber={num} imageBase={imageBase} />
    </section>
  </main>;
}
