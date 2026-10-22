import Link from "next/link";
import ModuleVisualGallery from "../../../../components/ModuleVisualGallery";

const modules = [
["00","Course Introduction","3–15","Course orientation and learning roadmap"],
["01","Generative AI Fundamentals and Amazon Bedrock","16–74","Generative AI foundations and Bedrock"],
["02","Managing Data for Generative AI","75–218","Data preparation, vector search, storage, and security"],
["03","Agentic AI","219–268","Agent loops, tools, orchestration, and agent frameworks"],
["04","Operations Efficiency and Optimization","269–290","Cost, latency, throughput, and reliability"],
["05","Managing Models with SageMaker AI","291–326","Model lifecycle, deployment, and monitoring"],
["06","More Tools for Building AI Applications","327–402","Application tools and integrations"],
["07","Governance and Quality Assurance","403–454","Evaluation, governance, and quality"],
["08","Security, Identity, and Compliance","455–507","Identity, access, privacy, and security"],
["09","Other AWS Services: Analytics","508–533","Analytics services"],
["10","Other AWS Services: Compute, Containers and Customer Engagement","534–550","Compute, containers, customer engagement"],
["11","Other AWS Services: Database","551–560","Database services"],
["12","Other AWS Services: Developer Tools","561–578","Developer tools"],
["13","Other AWS Services: Machine Learning","579–590","Machine learning services"],
["14","Other AWS Services: Management and Governance","591–605","Management and governance services"],
["15","Other AWS Services: Migration and Data Transfer","606–611","Migration and data transfer"],
["16","Other AWS Services: Networking and Content Delivery","612–629","Networking and content delivery"],
["17","Other AWS Services: Storage","630–649","Storage services"],
["18","Exam Preparation","650–671","Exam preparation and scenario review"]
] as const;

export default async function GenAIModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const id = moduleId.replace("module-", "");
  const selected = modules.find((item) => item[0] === id);
  if (!selected) return <main style={{padding:32}}><h1>Module not found</h1><Link href="/courses/aws-generative-ai-developer-professional">Back to course overview</Link></main>;
  const [num,title,pages,desc] = selected;
  const imageBase = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals";
  return <main style={{maxWidth:1400,margin:"0 auto",padding:"24px 20px 48px",color:"#152440"}}>
    <style>{`.genai-deep-hero{padding:clamp(24px,4vw,40px);border-radius:22px;color:white;background:linear-gradient(120deg,#111b38,#174078 60%,#087e9e)}.genai-deep-hero a{color:#c5e9ff}.genai-deep-hero h1{font-size:clamp(28px,4vw,42px);line-height:1.15;margin:14px 0}.genai-deep-hero p{color:#e0ecff;line-height:1.7}.genai-deep-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:24px}.genai-deep-card{border:1px solid #dbe5f1;border-radius:14px;overflow:hidden;background:#fff}.genai-deep-card img{width:100%;aspect-ratio:16/9;object-fit:contain;background:#f3f7fc;display:block}.genai-deep-fallback{aspect-ratio:16/9;display:grid;place-items:center;text-align:center;padding:18px;background:#f3f7fc;color:#66758b;font-size:13px}.genai-deep-card div:last-child{padding:12px}.genai-deep-card b{font-size:13px}.genai-deep-card small{display:block;color:#687991;margin-top:5px}.genai-deep-note{margin-top:20px;padding:16px;border:1px dashed #bfd0e5;background:#f7faff;border-radius:12px;color:#5d6f87;line-height:1.6}@media(max-width:850px){.genai-deep-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.genai-deep-grid{grid-template-columns:1fr}}`}</style>
    <section className="genai-deep-hero"><Link href="/courses/aws-generative-ai-developer-professional">← All course modules</Link><p style={{letterSpacing:".12em",fontSize:11,fontWeight:800}}>MODULE {num} · VISUAL DEEP DIVE</p><h1>{title}</h1><p>{desc}</p><p>Source PDF pages {pages}. This space is reserved for the module’s individual visual lessons. Content should preserve source coverage rather than compressing multiple concepts into a single overview.</p></section>
    <section><h2 style={{marginTop:28}}>Visual lessons</h2><p style={{color:"#64748b"}}>Click any visual to open a full-screen viewer. Use the left/right arrows or keyboard arrow keys to move between visuals; press Esc to close.</p><ModuleVisualGallery moduleNumber={num} imageBase={imageBase} /></section>
  </main>;
}
