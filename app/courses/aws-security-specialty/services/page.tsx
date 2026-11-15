import CertificationCourse from "../../../components/CertificationCourse";
import {scsScope} from "../../../security-scope";
export default function Services(){return <main><a href="/courses/aws-security-specialty">← Course overview</a><CertificationCourse code="SCS" level="Specialty" title="AWS Security services reference" description="Explore services used in the Security Specialty course." scope={scsScope} sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/scs-02-in-scope-services.html" sourceLabel="SCS-C03 services"/></main>;}
