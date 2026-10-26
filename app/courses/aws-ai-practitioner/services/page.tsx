import Link from 'next/link';
import CertificationCourse from '../../../components/CertificationCourse';
import {aifScope} from '../../../course-data-extra';
export default function Page(){return <><Link href="/courses/aws-ai-practitioner">← Course overview</Link><CertificationCourse code="AIF" level="Foundational" title="AI Practitioner: AWS services reference" description="Explore the supporting AWS services and connect them to AI use cases." scope={aifScope} sourceUrl="https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-in-scope-services.html" sourceLabel="Official AIF-C01 service scope"/></>;}
