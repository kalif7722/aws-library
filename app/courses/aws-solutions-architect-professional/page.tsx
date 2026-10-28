import CertificationCourse from "../../components/CertificationCourse";
import AwsSapCourseGuide from "../../components/AwsSapCourseGuide";
import { sapScope } from "../../course-data";

export default function SolutionsArchitectProfessional() {
  return (
    <>
      <section style={{maxWidth:1100,margin:'24px auto',padding:'28px 32px',background:'#fff9ef',color:'#24365c',border:'1px solid #e9cc9d',borderRadius:20}}>
        <p style={{fontWeight:800,color:'#a05f12',letterSpacing:'.12em',fontSize:12}}>NEW · SAP-C03 VISUAL COURSE</p>
        <h2 style={{fontSize:'clamp(26px,3vw,40px)',margin:'9px 0'}}>Architecture decisions, explained one lesson at a time</h2>
        <p style={{lineHeight:1.6,maxWidth:800}}>Begin the 800-lesson learning path. The first 48 lessons cover the course roadmap and identity architecture, including federation, temporary credentials, data perimeters and workload identities.</p>
        <a href="/courses/aws-solutions-architect-professional/learn" style={{display:'inline-block',marginTop:12,padding:'13px 19px',borderRadius:10,background:'#233c6d',color:'#fff',fontWeight:700,textDecoration:'none'}}>Start SAP-C03 lessons →</a>
      </section>
      <div style={{maxWidth:1100,margin:'18px auto',padding:'0 18px',color:'#59657a'}}>The reference material below follows the earlier SAP-C02 scope while SAP-C03 lessons are being built.</div>
      <AwsSapCourseGuide />
      <CertificationCourse
        code="SAP"
        level="Professional"
        title="AWS Solutions Architect – Professional"
        description="Explore the earlier SAP-C02 service reference while the new SAP-C03 visual lessons are published module by module."
        scope={sapScope}
        sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-02/sap-02-in-scope-services.html"
        sourceLabel="Earlier AWS Certified Solutions Architect – Professional SAP-C02 reference"
      />
    </>
  );
}
