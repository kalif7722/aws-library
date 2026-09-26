import ServiceLearningShowcase from "./ServiceLearningShowcase";
import type { GcpContent } from "../gcp-data";

export default function GcpSharedServiceSections({ serviceName, details }: { serviceName: string; details: GcpContent }) {
  const architecture = (details.architecture || []).map((item, index) => ({
    title: `${serviceName} pattern ${index + 1}`,
    note: item,
    reference: "Google Cloud architecture guidance",
    layers: [{ title: "Workload", nodes: [{ label: item, sub: "service boundary" }] }],
  }));
  return <>
    <section className="gcp-content-grid gcp-shared-foundation">
      {[["Core concepts", details.concepts], ["Application fit", details.applicationFit]].map(([title, items]) => <section className="gcp-content-card" key={title as string}><h3>{title as string}</h3><ul>{(items as string[] || []).map((item, index) => <li key={index}>{item}</li>)}</ul></section>)}
    </section>
    <ServiceLearningShowcase serviceName={serviceName} architectures={architecture} security={details.security || []} optimization={details.operations || []} cost={details.cost || []} watchPoints={details.watchPoints || []} />
  </>;
}
