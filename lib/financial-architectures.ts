type Node={label:string;sub:string;kind?:"data"|"user"|"app"|"security";detail:string};
type Layer={title:string;nodes:Node[]};
type Architecture={title:string;note:string;reference:string;layers:Layer[]};
const node=(label:string,sub:string,detail:string,kind?:Node["kind"]):Node=>({label,sub,detail,kind});
const layer=(title:string,...nodes:Node[]):Layer=>({title,nodes});
export const financialArchitectures:Record<string,Architecture[]>={
 "AWS Budgets":[{
  title:"Monthly project spend alert",note:"A project owner receives a warning when recorded or forecasted spend crosses a configured threshold.",reference:"AWS Budgets cost-budget notifications",layers:[
   layer("Billing input",node("AWS cost and usage","Recorded charges","Billing records supply the project's accumulated charges. Budgets evaluates updated billing data rather than inspecting application requests or stopping charges in real time.","data")),
   layer("Budget definition",node("Project budget","Amount, period and filters","The owner sets a monthly amount and selects the linked account, service, or activated cost-allocation tags that define which charges count toward this project budget.","data")),
   layer("Evaluate",node("AWS Budgets","Actual / forecast thresholds","Budgets compares the filtered month's actual spend and forecast with the configured thresholds. Crossing an actual or forecast threshold triggers the corresponding notification; a budget is not a hard spending cap.")),
   layer("Notify",node("Amazon SNS","Budget notification","The authorized SNS topic receives the budget notification and delivers it to confirmed subscriptions so the project owner can review the threshold breach.")),
   layer("Review",node("Project owner","Investigate cost drivers","The owner opens Cost Explorer, identifies the services or accounts responsible for the increase, and decides whether to reduce consumption or revise the approved budget.","user"))
  ]},{title:"Approval-controlled budget action",note:"A threshold breach can trigger an explicitly configured budget action with an execution role and optional approval.",reference:"AWS Budgets actions",layers:[
   layer("Measure",node("AWS cost and usage","Actual / forecast spend","Updated billing records provide the measured and forecasted spending against which the action threshold is evaluated.","data")),
   layer("Threshold",node("AWS Budgets","Action threshold","Budgets evaluates the configured action threshold and starts the selected budget action when it is exceeded. Ordinary budget notifications do not automatically restrict resources.")),
   layer("Authorize",node("Budget action role","Delegated permissions","The execution role grants Budgets permission to perform only the configured response. It is separate from the human permissions used to edit the budget.","security"),node("Budget approver","Optional approval","For an approval-required action, the approver reviews the cost impact and proposed restriction before authorizing execution.","user")),
   layer("Apply",node("Configured budget action","Policy or resource response","The chosen action can apply an IAM policy or SCP, or stop selected supported EC2/RDS resources. The configured action type and scope determine the effect; there is no universal account spending cutoff.","app")),
   layer("Audit",node("AWS CloudTrail","Budget administration audit","CloudTrail records supported budget and action API activity so administrators can investigate who changed the controls or invoked supported operations."))
  ]}],
 "AWS Cost Explorer":[{title:"Interactive FinOps analysis",note:"FinOps groups historical charges by ownership and service to identify the causes of spending changes.",reference:"AWS Cost Explorer cost analysis workflow",layers:[
  layer("Billing data",node("AWS cost and usage","Historical charges","Billing records supply cost and usage history for the selected date range. This is the financial dataset being analyzed, not application payload data.","data")),
  layer("Analysis",node("AWS Cost Explorer","Filter / group / forecast","Cost Explorer filters historical charges and groups them by dimensions such as service, linked account, or activated cost-allocation tag. The analyst can separately view a supported ungrouped forecast to estimate future spend.")),
  layer("Dimensions",node("Account / service / tag","Cost drivers","These are grouping dimensions in the cost report. They attribute portions of the bill to accounts, services, and tagged owners so FinOps can locate the source of an increase; they are not processing services.","data")),
  layer("Users",node("FinOps / owners","Investigate trends","FinOps compares periods and drills into the high-cost groups to distinguish usage growth, pricing effects, or resource changes and assign follow-up to the responsible owner.","user")),
  layer("Action",node("Budget / optimization decision","Govern spend","The owner uses the analysis to set an appropriate budget or plan a rightsizing, scheduling, or architectural change. Cost Explorer supplies evidence; the owner or a separately configured automation makes the change.","app"))
 ]},{title:"Cost investigation after an anomaly",note:"An alert starts an investigation; Cost Explorer isolates the financial contributors and the owner decides the remediation.",reference:"Cost Explorer anomaly investigation pattern",layers:[
  layer("Alert",node("AWS Cost Anomaly Detection","Unexpected spend","Anomaly Detection identifies unusual spending patterns in its configured monitors and notifies the subscribed owners when alert criteria are met.")),
  layer("Investigate",node("AWS Cost Explorer","Time range + grouping","The investigator selects the anomaly's time range and groups or filters costs by service, account, usage type, and tags to isolate the contributors to the increase.")),
  layer("Correlate",node("AWS CloudTrail","Resource/config changes","The investigator searches API events around the spending change for resource launches or configuration changes that may explain the cost increase. Audit events complement, rather than replace, billing records."),node("Tags / accounts","Ownership","Activated allocation tags and linked-account identifiers associate the affected charges with the team responsible for investigating and changing the resources.","data")),
  layer("Remediate",node("Service owner","Right-size / stop / redesign","The owner validates the business need, then changes the responsible resources or usage pattern. The cost-analysis tool itself does not shut down the workload.","user"))
 ]}]
};

export function financialNodeDetail(architecture:string|undefined,label:string){
 for(const arches of Object.values(financialArchitectures)){
  const arch=arches.find(item=>item.title===architecture);
  const match=arch?.layers.flatMap(item=>item.nodes).find(item=>item.label===label);
  if(match)return match.detail;
 }
 return undefined;
}
