import './SaaModuleReference.css';

const rows:Record<string,[string,string,string,string][]>= {
 '01':[
  ['IAM user / group','Named workforce identity / shared permission set','Prefer federation for human access; groups hold policies for users.','A group is not a principal that assumes a role.'],
  ['IAM role','Temporary workload or cross-account access','Trust policy controls who may assume it; permission policy controls allowed actions.','Role trust alone does not grant access to the target resource.'],
  ['Identity / resource policy','Principal permissions / resource-side grant','Evaluate the whole request: principal, action, resource and conditions.','An explicit deny overrides an allow.'],
  ['Permissions boundary / SCP','Maximum permissions for an identity / organization account guardrail','Intersect applicable allows with guardrails.','Neither grants access by itself.'],
  ['MFA / access keys','Sign-in protection / programmatic credentials','Use temporary credentials and audit long-lived keys.','A password policy does not protect access keys.'],
  ['KMS key policy','Key authorization boundary','Check key policy, applicable IAM permission and grants as relevant.','S3 object access alone does not authorize SSE-KMS decryption.']
 ],
 '02':[
  ['AMI / user data','Instance image / launch-time bootstrap','Choose the base image, then configure software at launch.','User data normally runs on first boot by default.'],
  ['Instance family','Compute, memory, storage or accelerated profile','Match the family to the measured bottleneck.','A larger instance is not always the right family.'],
  ['Security group','Stateful ENI traffic filter','Allow the required source and port; return traffic is automatic.','Rules are allow-only and do not create a route.'],
  ['EC2 Instance Connect','Temporary SSH public key delivery','Check IAM authorization and SSH network reachability.','A key delivery mechanism does not replace a security-group rule.'],
  ['Spot / Savings Plan','Interruptible capacity / billing commitment','Use Spot for interruption-tolerant work; a plan discounts matching usage.','A discount is not a capacity guarantee.'],
  ['Capacity Reservation / Dedicated Host','AZ capacity / physical host allocation','Reserve matching capacity or meet licensing and isolation needs.','Regional RI and Savings Plans do not reserve AZ capacity.'],
  ['Auto Scaling group','Replace and adjust instance capacity','Set health checks, min/max/desired capacity and scaling policy.','Warmup and readiness affect how safely new capacity serves traffic.']
 ]
};

export default function SaaModuleReference({moduleId,topics}:{moduleId:string;topics:string[]}){
 const entries=rows[moduleId];
 return <section className="saa-reference" aria-label="Module decision reference"><div className="saa-reference-heading"><p>ARCHITECTURE DECISION REFERENCE</p><h2>Compare the choices</h2><span>{entries?'Use these boundaries when applying the visual lessons.':'Use the topic inventory while visual lessons are prepared.'}</span></div><div className="saa-reference-scroll" role="region" aria-label="Module comparison table" tabIndex={0}><table><thead><tr><th scope="col">{entries?'Service / feature':'Topic'}</th><th scope="col">{entries?'Purpose':'Learning focus'}</th><th scope="col">{entries?'Choose and configure':'Status'}</th><th scope="col">{entries?'Decision boundary':'Next step'}</th></tr></thead><tbody>{entries?entries.map(([name,purpose,choice,boundary])=><tr key={name}><th scope="row">{name}</th><td>{purpose}</td><td>{choice}</td><td>{boundary}</td></tr>):topics.map(topic=><tr key={topic}><th scope="row">{topic}</th><td>Architecture concept and relevant service decision</td><td>Visual lesson in preparation</td><td>Review the technical details before applying this choice.</td></tr>)}</tbody></table></div></section>;
}
