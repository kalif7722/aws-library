import {batch} from "./reviewed-next-builders";
export const reviewedNext06=batch([
["Amazon VPC IP Address Manager (IPAM)","allocate nonoverlapping addresses for a new application VPC","https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html",[
"Enterprise address owner^Define account and Region address requirements^The owner identifies the new application's required capacity and private connectivity dependencies before choosing address space.",
"IPAM pool hierarchy^Reserve the approved regional address range^The network team defines its pool scopes and allocation rules so the intended VPC receives space from the correct organizational range.",
"Amazon VPC IP Address Manager (IPAM)^Allocate a compliant VPC CIDR^IPAM supplies the selected supported allocation and tracking behavior under the pool's rules; it does not configure all application routes.",
"Application VPC deployment^Create subnets inside the accepted allocation^The deployment provisions the selected VPC and subnet ranges and records the allocation identity with its infrastructure version.",
"Private network connection plan^Configure routes and endpoint permissions^The team creates the approved connectivity and verifies address compatibility before adding corporate or shared-service routes.",
"Address and connectivity verification^Check allocation compliance and intended reachability^The operator reviews IPAM allocation evidence and live private connectivity tests before accepting the new application network."
]],
["Amazon VPC Lattice","authorize service-to-service requests across application VPCs","https://docs.aws.amazon.com/vpc-lattice/latest/ug/what-is-vpc-lattice.html",[
"Order service client^Resolve and call the selected inventory service^The order backend sends the supported request to the inventory service's configured Lattice endpoint with its required authenticated identity.",
"Service-network associations^Connect the approved client and service VPCs^The platform team associates the intended VPCs and services and configures security-group prerequisites without opening unrelated networks.",
"Amazon VPC Lattice^Apply service routing and auth policy^The configured service network and service policies admit the supported client request and route it using the selected listener and rules.",
"Inventory target group^Select a healthy application endpoint^The service's configured target group forwards eligible requests to healthy supported inventory targets rather than reserving stock itself.",
"Inventory application handler^Validate the permitted stock operation^The handler enforces tenant and business rules using trusted caller context before executing the authorized inventory transaction.",
"Inventory transaction result^Return the durable permitted outcome^The application returns the accepted result through the service request path, preserving mutation identity and data consistency independently from networking authorization."
]],
["Route 53 Resolver DNS Firewall","block lookup of a prohibited external domain","https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall.html",[
"Private application DNS client^Query the configured VPC resolver^The application attempts a DNS lookup using the supported Resolver path; the DNS policy applies to this path rather than every possible encrypted external resolver.",
"DNS firewall rule-group association^Define domain policy and action^The network owner associates the intended domain rules, priorities and supported actions with the selected VPC under its required access configuration.",
"Route 53 Resolver DNS Firewall^Evaluate the matching domain query^DNS Firewall applies the configured allow, block or alert behavior to the supported DNS query; it does not inspect the application's HTTP payload.",
"Resolver response^Return the configured DNS outcome^The client receives the allowed resolution or selected blocked response, with the application handling name-resolution failure through its normal error path.",
"DNS query evidence reviewer^Investigate a blocked-domain event^The security owner reviews the configured DNS evidence and affected client before treating the query as malicious activity or changing the rule.",
"Controlled domain-policy update^Verify exceptions and prohibited lookups^The owner applies a reviewed policy correction and tests allowed and blocked DNS cases while keeping outbound connection controls separately configured."
]],
["VPC Endpoints","let a private report worker read its S3 source","https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html",[
"Private report worker^Read the approved S3 report prefix^The worker submits its signed object-read request using the intended workload role from the selected private subnet.",
"S3 gateway endpoint route^Select the supported regional S3 path^The endpoint is associated with the intended route tables so applicable S3 traffic uses the configured gateway-endpoint path without a NAT hop.",
"VPC Endpoints^Apply the selected endpoint policy^The supported gateway endpoint policy constrains eligible S3 access; it does not replace the caller's IAM and bucket permissions.",
"Amazon S3 report bucket^Authorize and return the selected object^S3 evaluates the applicable role, bucket and encryption-key access and returns the permitted report object through the selected endpoint path.",
"Report worker parser^Validate the approved report schema^The worker parses the received file and checks batch identity and completeness before generating its business summary.",
"Report result store^Publish the accepted summary^The application writes its validated result under a stable run identity, distinguishing private transport from authorization and business-data validation."
]],
["AWS Verified Access","admit an employee to a private finance application","https://docs.aws.amazon.com/verified-access/latest/ug/what-is-verified-access.html",[
"Employee browser^Request the configured application endpoint^The employee opens the supported Verified Access application endpoint using the organization's configured identity and device prerequisites.",
"Trust provider context^Supply the selected identity and device evidence^The configured providers supply supported trust context for policy evaluation; device evidence is used only where the selected integration supports it.",
"AWS Verified Access^Evaluate the application access policy^Verified Access evaluates the configured policy and admits or denies the request under its supported endpoint setup rather than requiring unrestricted network access.",
"Private finance endpoint^Route the admitted request to the backend^The configured private endpoint and load-balancer path forward the admitted request to the finance application without exposing its private backend directly.",
"Finance application authorization^Check the employee's business entitlement^The backend checks the required application entitlement and record scope; access-gateway admission does not authorize every finance operation.",
"Permitted finance response^Return the requested owner-scoped records^The application returns only allowed finance data and records the relevant operation, keeping device policy and business authorization distinct."
]],
["AWS Lambda@Edge","choose a cached site variant using safe request attributes","https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html",[
"Website browser request^Request the public content path^The visitor requests the published website through CloudFront; personalized authenticated data uses its separately protected application path.",
"CloudFront viewer-request association^Invoke the versioned edge function^The distribution associates the supported published function version with the chosen viewer-request event and respects its supported deployment constraints.",
"AWS Lambda@Edge^Rewrite the selected static-content route^The function validates the permitted request attributes and chooses the approved static variant without embedding credentials or unsupported runtime assumptions.",
"CloudFront cache lookup^Use the configured variant cache identity^The distribution's cache behavior and rewritten request determine the selected static content, avoiding accidental sharing of personalized responses.",
"Restricted static origin^Return the approved variant object^The selected origin serves the permitted static object under its origin-access configuration; the edge function does not regenerate the website's business data.",
"Variant response verification^Check cache and route correctness^The release tester verifies the intended variant and cache behavior for representative requests before accepting the edge-function update."
]],
["AWS CloudHSM","perform a payment-service signature with an HSM key","https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html",[
"Payment signing application^Prepare the approved message digest^The application validates the permitted payment operation and creates the message or digest required by its selected supported signing integration.",
"CloudHSM client and crypto user^Authenticate the protected key session^The configured client connects to the supported cluster and authenticates its crypto user with access to the intended HSM key.",
"AWS CloudHSM^Execute the supported signing operation^The HSM performs the selected operation using the protected key under its configured authorization; application payment approval remains outside the HSM.",
"Signature response^Return the operation result to the caller^The client supplies the returned signature and status to the application, which checks errors and does not treat a failed attempt as a completed payment.",
"Payment message verifier^Validate signature and transaction identity^The receiver checks the signature against the intended public key and validates the payment's business identity before accepting the message.",
"HSM operations owner^Test backup, availability and key-access controls^The team verifies the cluster's supported protection and access procedures without assuming an HSM alone guarantees application availability or end-to-end compliance."
]],
["AWS Directory Service","join application servers to managed Microsoft AD","https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html",[
"Directory platform owner^Select the supported directory design^The owner chooses AWS Managed Microsoft AD for the application's directory requirement and identifies the required network and DNS relationships.",
"Directory network prerequisites^Configure private routes and DNS reachability^The team configures the intended subnet, security and DNS paths so supported domain clients can reach the managed directory services.",
"AWS Directory Service^Provision the managed directory^The service creates the selected directory and supplies its supported managed infrastructure; application-specific group membership remains an administrative decision.",
"Application server domain join^Join with approved directory credentials^The server joins the intended domain through the supported workflow and obtains its required computer identity without distributing privileged directory credentials broadly.",
"Employee application authentication^Authenticate using the configured directory flow^The application uses its selected supported directory authentication integration and checks the employee's intended group or business entitlement.",
"Directory integration acceptance^Verify sign-in and restricted access^The owner tests an allowed user and a denied user, plus directory connectivity and recovery prerequisites, before accepting the integration."
]],
["Service Control Policies","prevent member-account creation of unapproved resources","https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",[
"Organization guardrail owner^Define the prohibited account operation^The security owner identifies the exact supported actions and organizational scope to restrict, validating necessary platform-service exceptions.",
"SCP policy review^Test the intended permission boundary^The proposed policy is reviewed against existing administrative and deployment requirements before it is attached broadly to an organizational unit.",
"Service Control Policies^Bound eligible member-account permissions^The applicable SCPs constrain the supported member-account permission boundary; they do not grant IAM permissions to a previously unauthorized principal.",
"Member-account deployment request^Submit a resource creation operation^The workload role requests the selected resource operation under its own IAM policies and the applicable organization guardrails.",
"Service authorization result^Deny the prohibited action^The authorization evaluation rejects the guarded operation where applicable, while allowed operations still require their normal IAM and resource permissions.",
"Guardrail verification owner^Test allowed deployment and prohibited creation^The owner verifies both required application operations and intended denials before accepting the organizational policy rollout."
]],
["AWS Shield","protect a public application's supported AWS endpoint","https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html",[
"Public application client^Request the published edge endpoint^Legitimate clients access the application's configured supported AWS public endpoint; the application still authenticates business requests.",
"Supported public endpoint^Define the application's traffic boundary^The owner identifies the selected CloudFront or other supported endpoint and separately configures origin protection and application access requirements.",
"AWS Shield^Provide the applicable DDoS protection^The selected Shield protection addresses supported DDoS traffic behavior at its supported boundary; it does not validate orders or replace application authorization.",
"Application edge and origin^Forward legitimate traffic to healthy backends^The configured edge and load-balancer path continues serving permitted client traffic under its own cache, listener and health settings.",
"Application operations evidence^Check service availability and attack indicators^The owner examines the available protection evidence and real request outcomes to distinguish attack impact from an unrelated backend failure.",
"DDoS readiness review^Test the approved operational response^The team reviews the applicable protection scope, escalation procedure and origin capacity plan without assuming every endpoint has advanced response entitlements."
]]
]);
