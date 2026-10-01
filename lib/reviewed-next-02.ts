import {batch} from "./reviewed-next-builders";
export const reviewedNext02=batch([
["AWS User Notifications","route a maintenance notice to the application owner","https://docs.aws.amazon.com/notifications/latest/userguide/what-is-service.html",[
"AWS Health maintenance event^Identify affected resources^The provider event identifies the affected account resources and maintenance window; ownership is resolved from the workload inventory.",
"Notification configuration^Select event and recipient scope^The operator selects the supported event rules, delivery configuration and intended contacts for the application's maintenance notices.",
"AWS User Notifications^Aggregate and deliver the notification^The service processes matching supported events using its configured aggregation and delivery choices; it does not repair the affected workload.",
"Application operations contact^Review the maintenance impact^The notified owner compares the event's resource scope with the application's replicas, dependencies and approved maintenance window.",
"Maintenance change procedure^Apply the approved workload action^The operations team performs the reviewed replacement or failover task using its scoped workload permissions and rollback plan.",
"Service acceptance check^Verify application health^The owner confirms successful application requests and records the maintenance outcome rather than treating notification delivery as recovery evidence."
]],
["AWS Resource Explorer","find an unowned production resource","https://docs.aws.amazon.com/resource-explorer/latest/userguide/welcome.html",[
"Regional resource indexes^Enable supported discovery scope^The platform team configures the intended regional indexes and aggregation so supported resources can be searched across the approved scope.",
"Resource search view^Restrict the searcher's resource visibility^The selected view and IAM permissions bound the searcher's results; discovery access does not grant resource modification permissions.",
"AWS Resource Explorer^Search by resource attributes^The operator searches supported indexed attributes to locate the unexpected production resource and checks indexing freshness before interpreting missing results.",
"Resource ownership registry^Identify the responsible workload^The operator correlates the discovered ARN, account, Region and tags with deployment records to identify the resource owner.",
"Resource owner review^Decide whether the resource is required^The owner validates dependencies and business purpose before proposing deletion or tagging repair; a search result alone is insufficient deletion evidence.",
"Approved resource change^Repair ownership metadata^The owner applies the scoped tag or inventory correction and verifies the resource remains functional under the accepted workload configuration."
]],
["AWS Resource Groups","target a reviewed patch operation by application tags","https://docs.aws.amazon.com/ARG/latest/userguide/resource-groups.html",[
"Application resource tags^Identify the managed-server population^The platform owner maintains the approved application and environment tags on managed servers before using them as an operational target boundary.",
"Resource group query^Define the permitted membership^The group selects the intended resource types and tags; the operator reviews membership to exclude production or unrelated systems.",
"AWS Resource Groups^Resolve the logical resource collection^The service exposes the supported resources matching the group definition; grouping does not itself patch servers or grant command execution.",
"Systems Manager operation owner^Preview the actual target set^The owner uses the supported integration and scoped permissions to select the reviewed group resources for the maintenance task.",
"Approved maintenance command^Patch the selected managed servers^The command executes only on eligible managed targets under its required agent and role setup, with concurrency and failure limits.",
"Per-server maintenance results^Verify the group's operation outcome^The owner checks each target's result and required application tests rather than assuming every group member accepted the patch."
]],
["AWS Resource Access Manager (RAM)","share a transit gateway with a member account","https://docs.aws.amazon.com/ram/latest/userguide/what-is.html",[
"Network owner account^Create the shared transit gateway^The central networking account owns the transit gateway and its intended routing domains; ownership remains separate from the consuming application's account.",
"Resource share definition^Select resource and approved principals^The administrator selects the supported gateway resource and allowed organization or account principals under the applicable sharing prerequisites.",
"AWS Resource Access Manager (RAM)^Expose the approved shared resource^RAM manages access to the supported shared gateway; the consumer follows the applicable acceptance workflow where required.",
"Application account VPC attachment^Attach the permitted application network^The consumer creates its supported VPC attachment and the gateway owner applies the intended attachment approval and route-table association.",
"Transit gateway route tables^Configure intended network reachability^Explicit gateway and VPC routes select the approved corporate or shared-service path; a RAM share alone creates no unrestricted routing.",
"Private application connection test^Verify allowed and denied paths^The network team tests the intended application port and isolation boundaries after attachment and route configuration are accepted."
]],
["AWS Service Catalog","provision an approved private application environment","https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html",[
"Platform product template^Define the approved network and runtime^The platform team versions a tested infrastructure product with its permitted parameters, required resource controls and deployment outputs.",
"Portfolio access and launch role^Assign approved users and permissions^The administrator grants the selected developer access and configures the bounded launch role rather than giving unrestricted account administration.",
"AWS Service Catalog^Launch the selected product version^The authorized user provisions the accepted product using validated parameters; Service Catalog invokes its supported provisioning workflow.",
"AWS CloudFormation deployment^Create the product's resources^The stack creates the defined private application resources under the launch role and exposes operation results and selected outputs.",
"Application developer smoke test^Verify the provisioned environment^The developer tests the intended application route and identity with the accepted outputs, distinguishing stack completion from application readiness.",
"Provisioned-product owner^Manage version updates and retirement^The owner tracks the deployed product version and uses reviewed update or termination workflows while protecting persistent application data."
]],
["AWS Service Management / AppRegistry","associate deployment stacks with an application inventory","https://docs.aws.amazon.com/servicecatalog/latest/arguide/overview-appreg.html",[
"Application platform owner^Define existing application ownership^An existing AppRegistry customer records the application's business identity, environment and responsible team before associating its infrastructure resources.",
"Deployment stack inventory^Identify the application resource scope^The platform team identifies the approved CloudFormation stacks and relevant metadata without including unrelated shared account resources.",
"AWS Service Management / AppRegistry^Register application and associations^AppRegistry stores the application and supported resource associations so application-level inventory can be queried.",
"Application metadata attributes^Record operational context^The owner attaches the selected attribute groups and maintains their approved ownership and environment information for operational consumers.",
"Operations inventory consumer^Resolve resources for the application^The authorized consumer reads the application's associations to identify its current resource scope during cost or incident review.",
"Deployment reconciliation^Update inventory after infrastructure changes^The pipeline or owner reconciles stack replacements and metadata changes so the application inventory does not retain stale resource ownership."
]],
["AWS License Manager","govern licensed software on an EC2 estate","https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html",[
"Software entitlement register^Document purchased license conditions^The licensing owner records the contract's applicable counts, deployment constraints and approved interpretation before configuring cloud tracking.",
"License configuration^Define the supported tracking rules^The owner chooses the supported license-counting model and configured limits appropriate to the reviewed software deployment.",
"AWS License Manager^Track associated resource consumption^License Manager tracks supported associated resources under the configured rules; its inventory is not a legal interpretation of every vendor contract.",
"Licensed EC2 deployment^Launch under the configured association^The deployment uses the selected license association and obeys its configured enforcement behavior and applicable account permissions.",
"Entitlement compliance reviewer^Compare inventory with contractual rights^The reviewer reconciles tracked consumption and deployment topology with the purchased rights, investigating resources outside the discovery coverage.",
"Reviewed estate adjustment^Repair an excess allocation^The owner applies an approved capacity or license assignment change and rechecks the inventory before marking the licensing review complete."
]],
["AWS Artifact","supply a service compliance report for a design review","https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html",[
"Security review request^Identify the required provider evidence^The reviewer identifies the AWS service, assurance period and compliance question instead of requesting an unrelated provider report.",
"Artifact access role^Authorize the report retrieval^The organization grants the selected reviewer the required Artifact permissions while keeping agreement administration separately scoped.",
"AWS Artifact^Retrieve the applicable assurance report^The reviewer follows the supported report access workflow and applicable terms to obtain the selected AWS compliance evidence.",
"Evidence assessment^Check report scope and period^The reviewer verifies that the report covers the required services and period and records the shared-responsibility boundaries relevant to the application.",
"Customer control evidence^Evaluate the workload's own configuration^The application owner supplies identity, encryption and operational evidence that is not established by the provider's assurance report.",
"Design review decision^Record evidence and open gaps^The reviewer records the accepted provider evidence and remaining customer-control actions rather than interpreting report availability as workload compliance."
]],
["Audit Manager","collect evidence for an application control assessment","https://docs.aws.amazon.com/audit-manager/latest/userguide/what-is.html",[
"Assessment scope owner^Select accounts, services and control framework^The compliance owner defines the supported resource scope and control framework matching the application's actual assurance requirement.",
"Evidence-source configuration^Authorize supported collection inputs^The administrator configures required permissions and source prerequisites so automatic evidence collection covers the intended accounts and controls.",
"Audit Manager^Collect and organize assessment evidence^Audit Manager collects supported evidence and organizes it against the selected controls; collection does not certify that the application is compliant.",
"Control evidence reviewer^Validate automated and manual evidence^The assigned reviewer checks period, resource scope and control relevance and adds required manual evidence where automatic sources are insufficient.",
"Application control owner^Resolve the identified control gap^The owner applies the approved underlying configuration or process correction and supplies its verification evidence for reassessment.",
"Assessment report publisher^Publish the reviewed evidence package^The authorized publisher creates the selected assessment report after evidence review, retaining unresolved findings and reviewer decisions explicitly."
]],
["AWS Well-Architected Tool","review a customer API against reliability requirements","https://docs.aws.amazon.com/wellarchitected/latest/userguide/intro.html",[
"Customer API workload owner^Define workload boundaries and objectives^The owner records the API's dependencies, users and recovery objectives so the review addresses the actual production system.",
"Architecture evidence pack^Collect deployment and failure evidence^The team gathers the network design, data protection procedure and operating evidence rather than answering reliability questions from memory alone.",
"AWS Well-Architected Tool^Record lens answers and identified risks^The reviewer answers the applicable lens questions and records the workload's improvement risks; the tool does not run failover tests itself.",
"Reliability improvement plan^Assign measurable remediation work^The owner prioritizes the identified risks against business impact and assigns concrete tasks such as restore verification or dependency isolation.",
"Workload engineering changes^Implement and test the selected improvement^The team deploys the approved change and tests its expected failure or recovery behavior using the application's real operating procedure.",
"Review milestone^Compare the accepted evidence with prior risk^The reviewer records a new milestone and justified answer changes after verification, preserving the earlier review for comparison."
]]
]);
