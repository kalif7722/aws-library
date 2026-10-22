import CertificationCourse from "../../../../components/CertificationCourse";
import { aipScope } from "../../../../course-data";

export default function GenAIServiceReferencePage() {
  return <main style={{maxWidth:1400,margin:"0 auto",padding:"24px 18px"}}>
    <a href="/courses/aws-generative-ai-developer-professional" style={{color:"#2459d3",fontWeight:700}}>← Back to course overview</a>
    <h1 style={{fontSize:"clamp(28px,4vw,40px)",margin:"18px 0 8px"}}>AWS services reference</h1>
    <p style={{color:"#64748b",lineHeight:1.7}}>A dedicated reference view for the services and service features relevant to the AIP-C01 course. Use the module learning path for visual explanations.</p>
    <CertificationCourse code="AIP" level="Professional" title="AWS Certified Generative AI Developer – Professional" description="Browse the services and service features used to integrate foundation models, build production GenAI applications, apply responsible AI controls, and operate solutions efficiently." scope={aipScope} sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/aip-01-in-scope-services.html" sourceLabel="AWS AIP-C01 exam guide" />
  </main>;
}
