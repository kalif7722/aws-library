import type {ReviewedArchitecture,ReviewedNode} from '../reviewed-workload-architectures';
export type Recipe={service:string;cloud:'AWS'|'Azure'|'GCP';mode:'request'|'data'|'control'|'build'|'migration'|'runtime'|'desktop'|'edge';title:string;input:string;action:string;output:string;check:string;reference:string;legacy?:boolean};
const n=(label:string,sub:string,detail:string,icon?:string):ReviewedNode=>({label,sub,detail,icon,kind:icon?undefined:'app'});
// Recipes define business inputs, the exact service operation, its consumer and
// an acceptance test. Shared nodes describe concrete application responsibilities.
// Control workflows are explicitly administration sequences, never packet paths.
export function author(r:Recipe):ReviewedArchitecture{
 const cloud=r.cloud;const storage=cloud==='AWS'?'Amazon S3':cloud==='Azure'?'Azure Blob Storage':'Cloud Storage';
 const identity=cloud==='AWS'?'AWS IAM':cloud==='Azure'?'Microsoft Entra ID':'IAM';
 const service=n(r.service,'Service responsibility',r.action,r.service);
 let layers:ReviewedArchitecture['layers'];
 if(r.mode==='request')layers=[
  {title:'Request',nodes:[n('Application client','Submit the selected operation',r.input)]},
  {title:'API boundary',nodes:[n('Authenticated application API','Check caller and request scope','The application backend validates the caller and permission for this operation before accepting the request. It rejects invalid input and limits retries; a cloud API credential is never handed to the browser.')]},
  {title:'Service call',nodes:[n('Application service identity','Restricted backend API credentials',`The backend authenticates its service call with ${identity} permissions restricted to the required resource and operation. Customer ownership remains an application check before that call.`,identity),service]},
  {title:'Use response',nodes:[n('Application response handler','Apply the returned result',r.output)]},
  {title:'Acceptance',nodes:[n('Application acceptance test','Verify result and failure behavior',r.check)]}
 ];
 else if(r.mode==='data')layers=[
  {title:'Source',nodes:[n('Dataset owner','Approve the selected input',r.input)]},
  {title:'Data access',nodes:[n('Ingestion or query identity','Authorize the data path',`The ingestion or query job uses ${identity} permissions restricted to the selected source and destination. The owner records dataset versions and excludes fields that the destination is not authorized to receive.`,identity)]},
  {title:'Data capability',nodes:[service]},
  {title:'Consume',nodes:[n('Dataset consumer','Use the produced dataset',r.output)]},
  {title:'Reconcile',nodes:[n('Data reconciliation job','Check completeness and correctness',r.check)]},
  {title:'Operate',nodes:[n('Dataset operations owner','Retention and repeatable reruns','The owner records the successful run or dataset version, applies its retention policy and schedules the next approved update. Failed runs retain enough source evidence for diagnosis before replaying only the affected input.')]}
 ];
 else if(r.mode==='build')layers=[
  {title:'Change',nodes:[n('Repository maintainer','Review the intended change',r.input)]},
  {title:'Build identity',nodes:[n('Build runner','Use an isolated job and scoped credentials',`The runner checks out the approved revision and runs the selected build or validation job in an isolated environment. Its ${identity} permissions allow only required artifact publication or deployment; untrusted pull requests cannot obtain release credentials.`,identity)]},
  {title:'Build capability',nodes:[service]},
  {title:'Release',nodes:[n('Release owner','Apply the approved result',r.output)]},
  {title:'Verify',nodes:[n('Release acceptance test','Validate behavior before broad rollout',r.check)]},
  {title:'Recover',nodes:[n('Release rollback decision','Keep a known-good revision','The release owner retains the previous accepted artifact and configuration. Failed acceptance checks stop promotion; rollback restores the tested revision and checks any state or schema changes separately before resuming traffic.')]}
 ];
 else if(r.mode==='migration')layers=[
  {title:'Inventory',nodes:[n('Source workload owner','Identify state and dependencies',r.input)]},
  {title:'Target preparation',nodes:[n('Migration target owner','Prepare connectivity and restricted access',`The owner prepares the target capacity, network path and ${identity} permissions for the selected workload. Source data is retained through cutover, and migration credentials are removed after the accepted transfer.`,identity)]},
  {title:'Transfer or transform',nodes:[service]},
  {title:'Target validation',nodes:[n('Target workload','Use the migrated assets',r.output)]},
  {title:'Cutover gate',nodes:[n('Migration acceptance team','Reconcile before switching clients',r.check)]},
  {title:'Cutover',nodes:[n('Workload cutover owner','Controlled switch and rollback window','The owner pauses or coordinates remaining writes, accepts the final synchronized state and switches the approved client endpoint. The old environment remains protected during the rollback window; it is retired only after business acceptance.')]}
 ];
 else if(r.mode==='runtime')layers=[
  {title:'Workload',nodes:[n('Workload owner','Choose the application and capacity',r.input)]},
  {title:'Provision',nodes:[n('Deployment identity','Apply network and runtime configuration',`The deployment role prepares the approved artifact, capacity and private dependencies with ${identity} permissions. Application secrets stay in the protected runtime configuration rather than the image or user-facing client.`,identity)]},
  {title:'Run',nodes:[service]},
  {title:'Application result',nodes:[n('Workload client','Use the running application',r.output)]},
  {title:'Readiness',nodes:[n('Workload acceptance probe','Exercise the actual application path',r.check)]},
  {title:'Lifecycle',nodes:[n('Runtime operations owner','Roll forward or restore the accepted revision','The owner records the deployed version and capacity settings, then uses a controlled rollout for later changes. A failed readiness check stops promotion, and stateful data is recovered using the workload backup procedure rather than replacing compute alone.')]}
 ];
 else if(r.mode==='desktop')layers=[
  {title:'User and assignment',nodes:[n('Workspace user','Request the assigned workspace',r.input)]},
  {title:'Identity',nodes:[n('Workspace identity provider','Authenticate and select the permitted assignment','The configured identity provider authenticates the employee and enforces the chosen access policy. The workspace assignment grants access to the intended application or desktop; it does not grant administrator access to the hosting cloud.')]},
  {title:'Workspace',nodes:[service]},
  {title:'Work',nodes:[n('Workspace application','Use protected business resources',r.output)]},
  {title:'Acceptance',nodes:[n('Workspace access test','Test user, application and session behavior',r.check)]},
  {title:'Session lifecycle',nodes:[n('Workspace administrator','Terminate access and preserve required work','The administrator applies idle/session policy and removes the assignment when access ends. Required business files are retained under their storage policy; deleting a desktop is coordinated with user-profile and application-data recovery.')]}
 ];
 else if(r.mode==='edge')layers=[
  {title:'Endpoint',nodes:[n('Client or field device','Initiate the selected connection',r.input)]},
  {title:'Connection policy',nodes:[n('Network access owner','Configure the approved endpoints and routes','The owner specifies allowed endpoints, address ranges, ports and return paths before the connection is used. Endpoint identity and application authorization are checked independently of permitted network reachability.')]},
  {title:'Network or edge capability',nodes:[service]},
  {title:'Destination workload',nodes:[n('Destination application','Handle the allowed operation',r.output)]},
  {title:'Path validation',nodes:[n('Network acceptance test','Check the expected path and denied access',r.check)]},
  {title:'Operational ownership',nodes:[n('Network change owner','Maintain routes and capacity','The owner records the accepted path and its capacity or availability constraints. Later changes are tested against permitted and denied paths before rollout, with a documented rollback to the previous routing and access configuration.')]}
 ];
 else layers=[
  {title:'Operational question',nodes:[n('Resource owner','Select the resources and evidence',r.input)]},
  {title:'Administration identity',nodes:[n('Authorized administrator','Limit access to the selected estate',`The administrator uses ${identity} permissions for the selected resources and operation. A separate approved change role applies workload modifications when needed; reading evidence does not grant unrestricted remediation permissions.`,identity)]},
  {title:'Control capability',nodes:[service]},
  {title:'Owner response',nodes:[n('Responsible resource owner','Act on the concrete outcome',r.output)]},
  {title:'Acceptance',nodes:[n('Operational acceptance check','Confirm the requested outcome',r.check)]},
  {title:'Evidence',nodes:[n('Change or incident record','Record the decision and actual result','The owner retains the resource identifiers, approved action and observed acceptance result in the change or incident record. Unresolved conditions remain assigned for follow-up rather than closing the record merely because a control-plane request succeeded.')]}
 ];
 const nodes=layers.flatMap(l=>l.nodes);
 const connections=nodes.slice(0,-1).map((node,i)=>({from:node.label,to:nodes[i+1].label,label:layers.find(l=>l.nodes.includes(nodes[i+1]))!.title,control:['control','build','migration'].includes(r.mode)}));
 return {title:`${cloud}: ${r.title}`,note:(r.legacy?'Historical workflow / migration learning example. ':'')+(['control','build','migration'].includes(r.mode)?'Follow the administration and acceptance sequence; the arrows represent actions and evidence, not application traffic. ':r.mode==='runtime'?'Provisioning precedes the running application path; the acceptance and lifecycle stages are operational checks. ':'Follow the request or dataset responsibility, then the separate acceptance and operational checks. ')+r.output,reference:r.reference,layers,connections};
}
