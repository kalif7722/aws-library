import {n,l} from "./reviewed-architecture-builders";
import {practicalInspector,practicalReachability} from "./reviewed-practical-architectures";
import {reviewedScale01} from "./reviewed-scale-01";
import {reviewedScale02} from "./reviewed-scale-02";
import {reviewedScale03} from "./reviewed-scale-03";
import {reviewedScale04} from "./reviewed-scale-04";
import {reviewedScale05} from "./reviewed-scale-05";
import {reviewedScale06} from "./reviewed-scale-06";
import {reviewedScale07} from "./reviewed-scale-07";
import {reviewedScale08} from "./reviewed-scale-08";
import {reviewedScale09} from "./reviewed-scale-09";
import {reviewedScale10} from "./reviewed-scale-10";
import {completeSystem,connection as e,awsOrderSystem as order,awsDocumentSystem as docs,awsPrivateSystem as privateAws,awsGameSystem as game,awsTelemetrySystem as telemetry,azurePortalSystem as portal,azurePrivateSystem as privateAzure,azureSalesSystem as azureSales,gcpPortalSystem as gcpDocs,gcpPrivateSystem as privateGcp,gcpSalesSystem as gcpSales} from "./reviewed-system-contexts";
import type {ReviewedArchitecture} from "./reviewed-workload-architectures";
import {gcpEquipmentSystem, gcpBookingSystem, azureEquipmentSystem} from "./reviewed-system-contexts";
type Context=Parameters<typeof completeSystem>[1];
type Spec=[Context,string,string,string[],boolean?,string?];
function bind(registry:Record<string,ReviewedArchitecture[]>,specs:Record<string,Spec>){
 const result:Record<string,ReviewedArchitecture[]>={};
 for(const [service,flows] of Object.entries(registry)){
  const spec=specs[service];if(!spec)throw new Error("Missing full-system plan for "+service);
  const [context,origin,label,steps,control=false,returnTo]=spec;
  result[service]=flows.map(flow=>{
   const complete=completeSystem(flow,context,e(origin,flow.layers[0].nodes[0].label,label,control),steps,control);
   if(returnTo)complete.connections!.push(e(flow.layers.at(-1)!.nodes[0].label,returnTo,"validated outcome",control));
   return complete;
  });
 }
 return result;
}
const awsNetwork=bind(reviewedScale01,{
 "Amazon VPC":[order,"Order API WAF and gateway","network deployment",["public path","network admission","allowed request"],true],
 "Amazon EC2 security groups":[order,"Order API WAF and gateway","network deployment",["public path","network admission","allowed request"],true],
 "Network ACLs":[order,"Order API WAF and gateway","network deployment",["public path","network admission","allowed request"],true],
 "Internet gateways":[order,"Order API WAF and gateway","public network deployment",["public path","network admission","allowed request"],true],
 "Egress-only internet gateways":[privateAws,"Private inventory API","approved update task",["IPv6 initiated flow","reply + signed package"]],
 "VPC peering":[privateAws,"Private inventory API","remote database query",["private DB connection","permitted query"]],
 "VPC Flow Logs":[privateAws,"Private inventory API","failed connection evidence",["interface metadata","incident investigation"],true],
 "VPC Reachability Analyzer":[privateAws,"Private inventory API","connectivity investigation",["model selected path","review repair"],true],
 "AWS Network Access Analyzer":[privateAws,"Inventory VPC routing","exposure review",["scope analysis","reviewed restriction"],true],
 "Elastic IP Addresses":[order,"Order API WAF and gateway","replacement ingress plan",["reviewed association","public endpoint test"],true]
});
// The public network example is an actual ALB/EC2 application path, not a
// Lambda portal transplanted into a VPC diagram.
const originalTiers=reviewedScale01["Amazon VPC"][0];
const tiers:ReviewedArchitecture={
 ...originalTiers,
 layers:[
  l("Customer and edge",n("Order customer browser","Static portal and authenticated order request","The customer retrieves the portal's static files through CloudFront and sends the authenticated order request to the application's separate HTTPS hostname. The API request includes its stable request ID; personalized order responses are not shared CDN cache entries.","user"),n("Order portal CDN","Private S3 static origin and selected cache policy","CloudFront serves the approved portal assets from its restricted S3 origin. The browser calls the order ALB directly for personalized operations; origin access policy and static-object caching are tested separately from backend database access.",undefined,"Amazon CloudFront")),
  l("VPC public entry",...originalTiers.layers[0].nodes,...originalTiers.layers[1].nodes),
  l("Ingress protection",n("Order WAF and ALB","Web ACL, TLS listener and healthy target routing","WAF evaluates requests at the associated ALB under its selected web ACL. The ALB presents its configured certificate, terminates frontend TLS and routes allowed requests to healthy EC2 application targets. Target-side TLS is configured separately; balancing does not execute order logic.",undefined,"Elastic Load Balancing")),
  originalTiers.layers[2],
  l("Private business tier",n("Order EC2 frontend","Authenticate customer and validate order","The frontend verifies the customer token, validates trusted item prices and quantities and uses its restricted database credential for the order transaction. Requests carry an idempotency key and success is returned only after the selected durable commit.",undefined,"Amazon EC2"),n("Private order database","Atomic order and idempotency record","The database listener accepts the permitted frontend path under its network rules, then authenticates the database account and executes the order transaction. It preserves duplicate-request protection and is not directly exposed by the public ALB.",undefined,"Amazon RDS"))
 ],
 connections:[e("Order customer browser","Order portal CDN","static portal"),e("Order customer browser","Internet gateways","public HTTPS"),e("Amazon VPC","Internet gateways","route configuration",true),e("Internet gateways","Order WAF and ALB","routed ingress"),e("Order WAF and ALB","Order EC2 frontend","healthy target"),e("Network ACLs","Order EC2 frontend","subnet policy",true),e("Amazon EC2 security groups","Order EC2 frontend","interface policy",true),e("Order EC2 frontend","Private order database","order transaction")]
};
for(const service of ["Amazon VPC","Amazon EC2 security groups","Network ACLs","Internet gateways"])awsNetwork[service]=[tiers];
tiers.connections!.push(e("Amazon EC2 security groups","Private order database","restricted database ingress",true),e("Network ACLs","Private order database","private subnet ACL",true));

const awsSecurity=bind(reviewedScale02,{
 "AWS Certificate Manager":[docs,"Document API WAF and ALB","certificate association requirement",["domain-validated association","forward HTTPS request"],true],
 "AWS Private CA":[privateAws,"Private inventory API","internal TLS certificate need",["approved CSR issuance","install + distribute trust"],true],
 "Amazon Macie":[docs,"Document input bucket","sensitive-data job scope",["scoped object inspection","finding review"],true],
 "Amazon Inspector":[order,"Order business handler","release image dependency",["scanned image digest","finding + rebuild"],true],
 "Amazon Detective":[order,"Order business handler","suspected role misuse",["entity investigation","corroborated incident"],true],
 "Amazon Security Lake":[order,"Order API WAF and gateway","selected security evidence sources",["configured collection","authorized lake query"],true],
 "Amazon Verified Permissions":[order,"Order business handler","invoice approval endpoint",["trusted Cedar request","allow/deny enforcement"]],
 "AWS Shield Advanced":[docs,"Document API WAF and ALB","protected endpoint enrollment",["protection scope","mitigation evidence"],true],
 "AWS Firewall Manager":[docs,"Document API WAF and ALB","organization web-ACL baseline",["scoped remediation","associated WAF policy"],true],
 "AWS CloudTrail Lake":[order,"Order business handler","administrative change investigation",["selected event collection","SQL evidence review"],true]
});
const invoiceContext:Context={
 layers:[
  l("Employee and identity",n("Invoice approving employee","Authorized finance user and invoice action","The finance employee signs in through the configured corporate issuer and submits an approval for the selected invoice. The request carries the applicable API token and invoice identity; being authenticated is not sufficient to approve every invoice or amount.","user"),n("Corporate invoice identity provider","Trusted issuer and approval API token","The configured issuer authenticates the employee and issues the selected API token. The approval API verifies signature, issuer, audience and expiration and derives trusted employee attributes before requesting the fine-grained policy decision.","security")),
  l("Protected application ingress",n("Invoice HTTPS load balancer","TLS listener and healthy approval API targets","The ALB presents its configured server certificate and routes permitted HTTPS requests to healthy invoice API targets. The employee's token is checked by the approval application; load-balancer health does not determine invoice approval rights.",undefined,"Elastic Load Balancing"),n("Invoice AWS WAF policy","Web ACL on the invoice ALB","The associated web ACL evaluates the configured request rules and applies its selected actions before the request reaches the approval backend. It restricts request abuse without deciding the employee's invoice approval entitlement.",undefined,"AWS WAF")),
  l("Durable invoice ledger",n("Invoice ledger database","Approved invoice state and replay protection","The application commits the allowed invoice approval and request identity under its bounded database transaction. Current invoice status and amount are checked at the update boundary so a stale approval decision or repeated request cannot approve an already changed invoice.","data","Amazon RDS"))
 ],connections:[e("Invoice approving employee","Corporate invoice identity provider","sign in"),e("Invoice approving employee","Invoice HTTPS load balancer","HTTPS + token"),e("Invoice AWS WAF policy","Invoice HTTPS load balancer","associated web ACL",true)]
};
awsSecurity["Amazon Verified Permissions"]=reviewedScale02["Amazon Verified Permissions"].map(flow=>{
 const arch=completeSystem(flow,invoiceContext,e("Invoice HTTPS load balancer","Invoice approval API","employee approval request"),["trusted principal/action/resource","allow or deny decision"]);
 arch.connections!.push(e("Corporate invoice identity provider","Invoice approval API","trusted issuer validation",true),e("Invoice application transaction","Invoice ledger database","allowed transactional commit"));
 return arch;
});
const awsDatabase=bind(reviewedScale03,{
 "Amazon RDS Proxy":[order,"Order API WAF and gateway","database-backed order route",["client database connection","pooled transaction"]],
 "Amazon DynamoDB Accelerator (DAX)":[order,"Order portal customer","catalog display lookup",["eventually consistent read","cache miss"]],
 "Amazon DynamoDB Streams":[order,"Order business handler","product-management update route",["committed item change","stream consumer batch"]],
 "Amazon MemoryDB":[game,"Game API WAF and gateway","authorized score route",["validated score update","ranking read"]],
 "Amazon DocumentDB":[order,"Order API WAF and gateway","customer-profile route",["permitted document update","stored version"]],
 "Amazon Keyspaces":[telemetry,"Equipment ingestion API","validated device reading",["keyed CQL write","device/time query"]],
 "Amazon Neptune":[order,"Order business handler","approved account investigation",["validated graph load","bounded path evidence"],true],
 "Amazon Redshift":[order,"Order record table","approved sales extract",["completed batch COPY","validated publication"],true],
 "Amazon OpenSearch Service":[docs,"Document authorization API","approved article ingestion",["bulk index with item results","filtered search"]],
 "Amazon Managed Streaming for Apache Kafka":[order,"Order business handler","warehouse fulfillment event",["producer acknowledgement","consumer group read"]]
});
const awsApplications=bind(reviewedScale04,{
 "AWS App Runner":[order,"Order API WAF and gateway","catalog service release",["pull selected release","business catalog query"],true],
 "AWS Elastic Beanstalk":[docs,"Document API WAF and ALB","web release process",["reviewed version deployment","release health checks"],true],
 "AWS Batch":[docs,"Document processing queue","ready conversion work",["submit reviewed job","scheduled task execution"]],
 "Amazon EC2 Auto Scaling":[docs,"Document API WAF and ALB","target-load scaling signal",["target policy","ready target registration"],true],
 "AWS AppConfig":[order,"Order business handler","checkout feature rollout",["validated config deployment","agent/client refresh"],true],
 "AWS AppSync":[order,"Order portal customer","product GraphQL lookup",["authenticated GraphQL field","resolver data request"]],
 "AWS Cloud Map":[privateAws,"Private inventory API","inventory discovery dependency",["registered endpoints","client direct connection"]],
 "AWS CodeArtifact":[order,"Order business handler","release dependency chain",["approved package publish","pinned package download"],true],
 "AWS Signer":[order,"Order business handler","function code release",["selected artifact signing","enforced deployment"],true],
 "AWS SAM":[order,"Order API WAF and gateway","serverless environment deployment",["reviewed template build","stack deployment"],true]
});
const azureNetwork=bind(reviewedScale05,{
 "Azure ExpressRoute":[privateAzure,"Azure corporate client","corporate private path",["private peering","gateway connection"]],
 "Azure Load Balancer":[privateAzure,"Azure corporate client","private service connection",["frontend transport","healthy-target selection"]],
 "Azure Traffic Manager":[portal,"Azure portal customer","regional DNS lookup",["profile DNS query","selected endpoint address"],true],
 "Azure Bastion":[privateAzure,"Azure inventory backend","approved VM administration",["authorized management session","private VM connection"],true],
 "Azure Firewall":[privateAzure,"Azure inventory backend","provider integration task",["route through firewall","allowed provider request"]],
 "Azure DDoS Protection":[portal,"Portal Azure Front Door","protected origin enrollment",["selected protection scope","availability evidence"],true],
 "Azure Virtual Network":[privateAzure,"Azure corporate client","private subnet path",["selected subnet connection","private database path"]],
 "Azure Virtual WAN":[privateAzure,"Azure corporate client","branch connectivity setup",["VPN spoke path","selected VNet route"]],
 "Azure Route Server":[privateAzure,"Inventory Azure Virtual Network","dynamic appliance routing",["BGP route advertisement","effective next-hop route"],true],
 "Azure Network Watcher":[privateAzure,"Azure inventory backend","failed connection investigation",["scoped diagnosis","reviewed repair"],true]
});
const azureData=bind(reviewedScale06,{
 "Azure Database for MySQL Flexible Server":[portal,"Portal API Management","order API route",["validated SQL request","confirmed commit"]],
 "Azure Database for PostgreSQL Flexible Server":[privateAzure,"Internal Azure Load Balancer","stock API route",["transactional reservation","confirmed mutation"]],
 "Azure SQL Managed Instance":[privateAzure,"Internal Azure Load Balancer","migrated business endpoint",["SQL procedure call","migration acceptance"]],
 "Azure Table Storage":[azureEquipmentSystem,"Equipment Azure ingestion API","device status operation",["conditional entity write","scoped keyed read"]],
 "Storage Accounts":[portal,"Portal application backend","customer upload storage setup",["reviewed account configuration","scoped object use"],true],
 "Archive Storage":[portal,"Portal application backend","retained-document request",["authorized rehydration","online-object readiness"]],
 "Azure NetApp Files":[portal,"Portal Service Bus jobs","accepted render job",["authorized NFS mount","validated frame publication"]],
 "Azure Data Explorer":[azureEquipmentSystem,"Equipment Azure event publisher","equipment analytical connection",["configured ingestion","bounded telemetry query"]],
 "Azure Databricks":[azureSales,"Sales batch orchestration","ready sales batch",["authorized Spark input","accepted Delta output"]],
 "Microsoft Fabric":[azureSales,"Sales operational application","completed sales data product",["configured lakehouse load","governed report query"]]
});
const azureOperations=bind(reviewedScale07,{
 "Static Web Apps":[portal,"Azure portal customer","frontend release path",["selected deployment","authorized API request"],true],
 "Virtual Machine Scale Sets":[portal,"Portal application backend","fleet capacity policy",["configured scale rule","ready backend registration"],true],
 "Azure Repos":[portal,"Portal application backend","source change lifecycle",["pull-request review","approved build revision"],true],
 "Azure Artifacts":[portal,"Portal application backend","release package dependency",["publish reviewed version","pinned feed download"],true],
 "Azure App Configuration":[portal,"Portal application backend","feature configuration",["reviewed key/flag version","client refresh"],true],
 "Azure SignalR Service":[portal,"Portal application backend","committed order update",["authorized negotiation","hub message publish"]],
 "Azure Web PubSub":[privateAzure,"Azure inventory backend","committed stock update",["permitted connection token","group notification"]],
 "Update management center":[privateAzure,"Azure inventory backend","planned guest maintenance",["approved patch scope","per-machine result"],true],
 "Azure Arc":[privateAzure,"Azure inventory backend","hybrid server management",["authorized agent onboarding","extension outcome"],true],
 "Azure Advisor":[portal,"Portal application backend","capacity/cost review",["scoped usage recommendation","tested adjustment"],true]
});
const gcpSecurity=bind(reviewedScale08,{
 "Cloud Interconnect":[privateGcp,"GCP corporate application","corporate private path",["selected VLAN attachment","BGP control plane"]],
 "Network Connectivity Center (NCC)":[privateGcp,"GCP corporate application","site routing configuration",["registered spoke resources","effective route verification"],true],
 "Virtual Private Cloud (VPC)":[privateGcp,"GCP corporate application","private warehouse path",["applicable route/firewall","allowed listener"]],
 "Cloud NGFW":[privateGcp,"Warehouse Google VPC","network policy review",["policy deployment","traffic verification"],true],
 "Cloud IDS":[privateGcp,"Warehouse Google VPC","configured packet-mirroring copy",["mirrored packet analysis","threat evidence"],true],
 "VPC Service Controls":[gcpDocs,"Document Cloud Run API","protected storage operation",["supported API perimeter check","IAM-permitted operation"]],
 "Binary Authorization":[gcpDocs,"Document Cloud Run API","container deployment evidence",["signed digest attestation","admitted workload release"],true],
 "Artifact Analysis":[gcpDocs,"Document Cloud Run API","candidate container release",["configured image analysis","finding-based release review"],true],
 "Sensitive Data Protection":[gcpDocs,"Document Cloud Run worker","document sanitization call",["selected bytes + transform policy","validated sanitized output"]],
 "Certificate Manager":[gcpDocs,"Document HTTPS load balancer","frontend certificate lifecycle",["domain authorization","certificate association"],true]
});
const gcpData=bind(reviewedScale09,{
 "AlloyDB":[privateGcp,"Warehouse internal load balancer","stock transaction route",["primary SQL transaction","committed reservation"]],
 "Bigtable":[gcpEquipmentSystem,"Equipment ingestion backend","validated equipment reading",["keyed telemetry write","bounded history lookup"]],
 "Firestore in Datastore mode":[gcpBookingSystem,"Booking request backend","tenant booking transaction",["entity transaction","committed booking response"]],
 "Datastream":[gcpSales,"Sales source application","operational database replication",["supported CDC source","replicated analytical landing"]],
 "Dataform":[gcpSales,"Sales workflow coordinator","sales mart build",["compiled SQLX actions","assertion-checked publication"]],
 "Managed Service for Apache Spark":[gcpSales,"Sales workflow coordinator","completed batch transform",["reviewed Spark submission","validated curated output"]],
 "Dataproc Metastore":[gcpSales,"Sales workflow coordinator","Hive-compatible lake job",["table/partition lookup","storage read with job identity"]],
 "Cloud Data Fusion":[gcpSales,"Sales workflow coordinator","customer-data integration run",["reviewed pipeline execution","reconciled publication"]],
 "Looker":[gcpSales,"Sales analytical consumer","governed sales query",["reviewed semantic model","authorized query results"]],
 "Logging":[gcpDocs,"Document Cloud Run worker","selected structured runtime logs",["supported log entry","scoped incident query"],true]
});
const gcpOperations=bind(reviewedScale10,{
 "App Engine":[gcpDocs,"Document HTTPS load balancer","customer API release",["reviewed version deployment","traffic migration checks"],true],
 "Batch":[gcpDocs,"Document Pub/Sub work topic","validated document work",["task-group submission","container execution"]],
 "Cloud Service Mesh":[privateGcp,"Warehouse private backend","order-to-inventory request",["workload connection","authorized stock mutation"]],
 "Service Directory":[privateGcp,"Warehouse private backend","supplier service dependency",["endpoint registration","client direct connection"]],
 "VM Manager":[privateGcp,"Warehouse private backend","approved guest maintenance",["selected VM patch scope","post-patch service checks"],true],
 "Infra Manager":[privateGcp,"Warehouse Google VPC","reviewed environment deployment",["Terraform review","verified resources"],true],
 "Cloud Asset Inventory":[gcpDocs,"Document Cloud Storage input","sensitive-resource audit",["supported asset query","effective access review"],true],
 "Recommender":[privateGcp,"Warehouse private backend","VM capacity review",["usage-based proposal","tested change"],true],
 "Error Reporting":[gcpDocs,"Document Cloud Run worker","reported conversion exception",["supported exception entry","incident fix + safe replay"],true],
 "Profiler":[gcpDocs,"Document Cloud Run worker","selected worker instrumentation",["supported samples","benchmarked optimization"],true]
});
gcpOperations["GCP:Batch"]=gcpOperations["Batch"];
delete gcpOperations["Batch"];
function link(registry:Record<string,ReviewedArchitecture[]>,service:string,...connections:NonNullable<ReviewedArchitecture["connections"]>){
 registry[service][0].connections!.push(...connections);
}
function node(registry:Record<string,ReviewedArchitecture[]>,service:string,value:Parameters<typeof n>[0],sub:string,detail:string,icon:string){
 registry[service][0].layers.at(-1)!.nodes.push(n(value,sub,detail,undefined,icon));
}
function remove(registry:Record<string,ReviewedArchitecture[]>,service:string,...labels:string[]){
 const arch=registry[service][0];
 arch.layers=arch.layers.map(layer=>({...layer,nodes:layer.nodes.filter(n=>!labels.includes(n.label))})).filter(layer=>layer.nodes.length);
 arch.connections=arch.connections!.filter(edge=>!labels.includes(edge.from)&&!labels.includes(edge.to));
}
remove(awsDatabase,"Amazon RDS Proxy","Order business handler","Order record table");
remove(awsDatabase,"Amazon DocumentDB","Order business handler","Order record table");
remove(azureData,"Azure Database for MySQL Flexible Server","Portal application backend","Portal business database","Portal Service Bus jobs","Portal background worker");
for(const [service,handler] of [
 ["Azure Database for PostgreSQL Flexible Server","Stock reservation API"],
 ["Azure SQL Managed Instance","Migrated business application"]
]){
 remove(azureData,service,"Azure inventory backend","Azure inventory data");
 link(azureData,service,e("Corporate Azure application identity",handler,"trusted caller token",true));
}
remove(gcpData,"AlloyDB","Warehouse private backend","Warehouse Cloud SQL records");
link(gcpData,"AlloyDB",e("Corporate GCP application identity","Warehouse AlloyDB client","trusted caller token",true));
remove(awsApplications,"AWS Batch","Document conversion worker");
link(awsApplications,"AWS Batch",e("Conversion container","Document input bucket","authorized input read"),e("Conversion container","Document result bucket","validated output write"));
remove(gcpOperations,"GCP:Batch","Document Cloud Run worker");
link(gcpOperations,"GCP:Batch",e("Conversion task container","Document Cloud Storage input","assigned original read"),e("Conversion task container","Document Cloud Storage results","idempotent output write"));
remove(gcpSecurity,"Binary Authorization","Document Cloud Run worker");
link(gcpSecurity,"Binary Authorization",e("Document Pub/Sub work topic","Approved GKE workload","worker subscription"),e("Approved GKE workload","Document Cloud Storage input","authorized source read"),e("Approved GKE workload","Document Cloud Storage results","completed worker output"));
remove(gcpData,"Firestore in Datastore mode","Booking request backend");
link(gcpData,"Firestore in Datastore mode",e("Booking HTTPS frontend","Tenant booking API","authenticated booking route"));
node(gcpData,"Firestore in Datastore mode","Booking Cloud Armor policy","Security policy associated with the HTTPS backend","The configured Cloud Armor policy evaluates the booking request's supported attributes and applies its selected actions at the load-balancer association. Allowed requests proceed to the booking API, which verifies tenant identity and concurrency rules before mutating a booking.","Cloud Armor");
link(gcpData,"Firestore in Datastore mode",e("Booking Cloud Armor policy","Booking HTTPS frontend","associated request policy",true));
link(awsApplications,"AWS App Runner",e("Order business handler","AWS App Runner","catalog service lookup"));
link(awsDatabase,"Amazon DynamoDB Accelerator (DAX)",e("Order API WAF and gateway","Product catalog API","authenticated catalog route"));
link(awsDatabase,"Amazon Keyspaces",e("Equipment history query backend","Device history API","authorized device query"));
link(gcpData,"Bigtable",e("Equipment history client","Equipment history API","authorized history request"));
link(azureData,"Azure Table Storage",e("Equipment analytics viewer","Device status API","authorized status query"));
link(azureData,"Azure Data Explorer",e("Equipment analytics viewer","Azure Data Explorer","bounded KQL query"));
node(azureData,"Azure Databricks","Curated sales Delta tables","Accepted Delta data in the lake","The Spark job writes the selected curated Delta tables to the approved lake location using the configured batch/merge design. The data owner validates and publishes the accepted table version; storage access and table governance restrict who can consume the sales records.","Azure Data Lake Storage");
node(azureData,"Azure Databricks","Sales Databricks SQL warehouse","Authorized SQL over the published tables","The configured SQL warehouse executes the reporting application's permitted query against the published sales tables. Its connection identity and table grants are checked separately from the ETL job's write role; the report uses the accepted table version and reconciled measures.","Azure Databricks");
link(azureData,"Azure Databricks",e("Azure Databricks","Curated sales Delta tables","write transformed batch"),e("Sales data product owner","Curated sales Delta tables","accept publication",true),e("Sales dataset governance","Curated sales Delta tables","table/reader controls",true),e("Sales reporting application","Sales Databricks SQL warehouse","permitted report SQL"),e("Sales Databricks SQL warehouse","Curated sales Delta tables","query published tables"));
link(azureData,"Microsoft Fabric",e("Microsoft Fabric","Sales reporting application","accepted semantic-model result"),e("Sales dataset governance","Microsoft Fabric","workspace/model access",true));
link(gcpData,"Datastream",e("Sales data access owner","BigQuery replication consumer","reader scope",true),e("BigQuery replication consumer","Sales analytical consumer","validated replicated data"));
node(gcpData,"Dataform","Published BigQuery sales marts","Assertion-checked warehouse tables","The selected Dataform SQL actions write the sales mart tables into the approved BigQuery dataset. The owner verifies completed actions, assertions and reconciled totals before publication, while dataset/table permissions restrict the report's permitted data scope.","BigQuery");
link(gcpData,"Dataform",e("Dataform","Published BigQuery sales marts","SQL table transformations"),e("Sales mart reporting owner","Published BigQuery sales marts","accept mart version",true),e("Sales data access owner","Published BigQuery sales marts","dataset/table access",true),e("Sales analytical consumer","Published BigQuery sales marts","authorized mart query"));
node(gcpData,"Managed Service for Apache Spark","Curated sales Parquet files","Completed run output in Cloud Storage","The reviewed Spark job writes the selected Parquet schema and partition layout to its run-scoped curated bucket path. The publisher reconciles the output before exposing it to the analytical table, keeping an incomplete or rejected run outside the accepted dataset.","Cloud Storage");
node(gcpData,"Managed Service for Apache Spark","BigQuery curated external table","Selected schema and permitted lake objects","The configured external table identifies the approved Parquet objects and compatible schema. Its query access model and required object permissions are verified for the selected integration; it reads published lake files rather than automatically copying them into native BigQuery storage.","BigQuery");
link(gcpData,"Managed Service for Apache Spark",e("Managed Service for Apache Spark","Curated sales Parquet files","write reviewed Parquet output"),e("Curated lake publisher","Curated sales Parquet files","publish accepted run",true),e("Sales data access owner","BigQuery curated external table","query/object access",true),e("Sales analytical consumer","BigQuery curated external table","bounded analytical SQL"),e("BigQuery curated external table","Curated sales Parquet files","read approved objects"));
link(gcpData,"Dataproc Metastore",e("Sales data access owner","Lake job storage reader","runtime storage access",true),e("Lake job storage reader","Sales analytical consumer","approved lake-query result"));
link(gcpData,"Cloud Data Fusion",e("Sales data access owner","Curated customer-data owner","data-product reader controls",true),e("Curated customer-data owner","Sales analytical consumer","accepted customer-data publication",true));
node(gcpData,"Looker","Sales warehouse load job","Load completed files and validate warehouse batch","The workflow starts the approved load job for the completed sales batch. The job uses its restricted source-read and BigQuery write identity, loads staging with explicit rerun behavior and checks row counts and sales totals before publishing the warehouse tables.","Cloud Run");
node(gcpData,"Looker","Published sales BigQuery dataset","Reconciled warehouse tables and viewer scope","The dataset contains the accepted sales tables after load validation and promotion. The configured Looker warehouse connection has only its permitted query access, and the semantic model's row restrictions supplement the underlying dataset permissions.","BigQuery");
link(gcpData,"Looker",e("Sales workflow coordinator","Sales warehouse load job","selected completed batch"),e("Sales warehouse load job","Sales Cloud Storage landing","read approved files"),e("Sales warehouse load job","Published sales BigQuery dataset","publish accepted load"),e("Sales data access owner","Published sales BigQuery dataset","dataset reader grants",true),e("Looker","Published sales BigQuery dataset","generated warehouse SQL"));
awsSecurity["Amazon Inspector"]=[practicalInspector];
awsNetwork["VPC Reachability Analyzer"]=[practicalReachability];
export const reviewedScaleBatches=[awsNetwork,awsSecurity,awsDatabase,awsApplications,azureNetwork,azureData,azureOperations,gcpSecurity,gcpData,gcpOperations];
export const reviewedScaleArchitectures=Object.assign({},...reviewedScaleBatches) as Record<string,ReviewedArchitecture[]>;
