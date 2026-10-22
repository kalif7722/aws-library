import AipC01TaskGuide from "../../../components/AipC01TaskGuide";
import "../../../components/AipC01TaskGuide.css";

export default function GenAIExamObjectivesPage() {
  return <main style={{maxWidth:1500,margin:"0 auto",padding:"24px 18px"}}>
    <a href="/courses/aws-generative-ai-developer-professional" style={{color:"#2459d3",fontWeight:700}}>← Back to course overview</a>
    <h1 style={{fontSize:"clamp(28px,4vw,40px)",margin:"18px 0 8px"}}>Official exam objectives & task walkthroughs</h1>
    <p style={{color:"#64748b",lineHeight:1.7}}>Review the exam domains and task-specific visual walkthroughs separately from the module learning content.</p>
    <AipC01TaskGuide />
  </main>;
}
