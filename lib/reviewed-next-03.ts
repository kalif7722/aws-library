import {batch} from "./reviewed-next-builders";
export const reviewedNext03=batch([
["AWS Resilience Hub","assess the recovery design of an order platform","https://docs.aws.amazon.com/resilience-hub/latest/userguide/what-is.html",[
"Order workload inventory^Define the assessed application^The owner identifies supported application resources and dependencies, including persistent data, rather than assessing only the public endpoint.",
"Resiliency policy^Set business recovery objectives^The owner defines the policy's required recovery time and data-loss objectives for the applicable failure categories.",
"AWS Resilience Hub^Assess supported resource configurations^The service evaluates the imported application against the policy and returns supported recommendations; assessment is not an executed disaster recovery test.",
"Recovery improvement review^Prioritize the identified design gaps^The owner reviews recommendations against actual data dependencies and chooses approved backup, availability or recovery changes.",
"Recovery exercise^Test the revised operating procedure^The team performs the permitted restore or failover exercise and measures recovery against the business objectives with real application checks.",
"Application reassessment^Compare evidence with the updated design^The owner updates the application inventory and reassesses supported configurations while retaining separate evidence from the actual recovery exercise."
]],
["AWS Fault Injection Service","test an application's response to one failed worker","https://docs.aws.amazon.com/fis/latest/userguide/what-is.html",[
"Resilience experiment owner^Define a bounded failure hypothesis^The owner chooses an isolated worker failure and the expected application response, restricting the experiment to approved nonproduction resources.",
"Experiment template and role^Select targets and permitted actions^The template defines supported actions, exact target selection and the scoped execution role without granting arbitrary account destruction.",
"CloudWatch stop condition^Define the safety threshold^The team configures the supported alarm stop condition and verifies it before starting the experiment; stopping injection does not automatically restore every affected resource.",
"AWS Fault Injection Service^Execute the approved experiment^FIS performs the selected fault actions under the template and role while the team observes its operation state and stop conditions.",
"Application recovery observations^Measure real request and worker behavior^The team checks retries, replacement capacity and end-user success during the injected failure rather than measuring only experiment completion.",
"Experiment review^Restore and record the measured outcome^The owner restores any required test state and records the observed recovery gap before approving changes to the production resilience design."
]],
["AWS CloudFormation Guard","reject a template with an unrestricted database rule","https://docs.aws.amazon.com/cfn-guard/latest/ug/what-is-guard.html",[
"Infrastructure pull request^Submit the database network change^The developer submits the template and parameters for a database environment with its required corporate access scope.",
"Guard policy rules^Define the allowed database ingress^The security team authors and tests rules that reject the prohibited public ingress and required missing resource properties.",
"AWS CloudFormation Guard^Evaluate the selected template data^Guard validates the input against its supplied policy rules and reports failures; it does not query every live resource or apply repairs.",
"Pull-request status check^Block an unresolved policy violation^The configured CI job publishes the Guard result and requires the failed rule to be repaired or handled through the approved exception process.",
"Corrected change set^Review the repaired infrastructure plan^The developer narrows the rule, reruns validation and submits the generated change set for review before deployment.",
"Private database verification^Test access after the approved deployment^The operator verifies permitted client access and denied unrelated access against the deployed environment, beyond the static template check."
]],
["AWS CDK","deploy a reviewed serverless order API","https://docs.aws.amazon.com/cdk/v2/guide/home.html",[
"CDK application source^Define API, handler and order table^The developer defines the API resources, Lambda handler and restricted DynamoDB access in the reviewed CDK application.",
"CDK synthesis job^Generate the deployable template^The job resolves the selected application configuration and synthesizes CloudFormation artifacts, checking the expected environment and asset versions.",
"AWS CDK^Inspect differences before deployment^The team reviews the synthesized infrastructure differences and required bootstrap and deployment roles; source compilation alone is not deployment approval.",
"AWS CloudFormation^Apply the approved infrastructure changes^The authorized deployment applies the reviewed template and assets under the intended account and Region, with stack failure handling.",
"Order API client^Exercise the deployed HTTPS route^The test client submits a permitted order and verifies the handler's durable write and response rather than relying solely on stack status.",
"Release acceptance owner^Accept or roll back the tested version^The owner records the tested release and handles failure through the approved infrastructure and application rollback procedure."
]],
["AWS CLI","copy an approved report with temporary role credentials","https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html",[
"Report export operator^Select the intended account and report^The operator identifies the destination account and approved report object before issuing a command from the controlled workstation.",
"Temporary role session^Authenticate with scoped credentials^The configured workforce or role-assumption flow supplies time-limited credentials that permit only the approved report read.",
"AWS CLI^Submit the signed S3 request^The CLI resolves the chosen profile and Region, signs the supported S3 operation and checks its returned status; it does not bypass IAM.",
"Amazon S3 report prefix^Authorize and return the selected object^S3 evaluates the applicable session and bucket permissions and supplies the permitted report, including required encryption-key authorization.",
"Report integrity check^Validate the downloaded file^The operator verifies the expected report identity and integrity before supplying it to the finance consumer, handling partial or failed downloads explicitly.",
"Finance report import^Load the accepted report batch^The consumer validates the report schema and batch identity and records its accepted import without interpreting a successful copy as financial reconciliation."
]],
["AWS CloudShell","diagnose a deployment using an authenticated console shell","https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html",[
"Deployment operator^Sign in with the intended role^The operator signs into the approved account and operational role rather than using a privileged personal access key.",
"AWS CloudShell^Start the selected shell environment^CloudShell provides its supported shell environment using the signed-in identity's permissions; starting a shell does not expand account access.",
"Deployment status command^Query the selected stack operation^The operator uses a scoped CLI command to retrieve stack events and the failed resource identity for the intended environment.",
"AWS CloudFormation event evidence^Return supported operation diagnostics^The service returns the selected stack's event history and status, allowing the operator to distinguish a deployment failure from a runtime incident.",
"Infrastructure repair proposal^Correct the identified configuration^The owner prepares the supported template or parameter correction through the repository's review process rather than editing production resources blindly.",
"Deployment follow-up^Verify the approved repair^The operator checks the next stack operation and application smoke test before recording recovery; shell command execution alone is not resolution."
]],
["AWS Management Console","review and apply an approved security-group change","https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/what-is.html",[
"Network change request^Identify resource and allowed client^The requester documents the target account, Region, security group and permitted application port before the operator opens the console.",
"Workforce sign-in role^Authorize the intended administration scope^The operator obtains the approved account role with the required resource permissions and authentication controls.",
"AWS Management Console^Inspect the selected group's current rules^The operator checks the resource identity and existing rules in the intended Region, avoiding changes to a similarly named group elsewhere.",
"EC2 security-group API^Apply the approved narrow ingress rule^The console submits the supported service operation under the signed-in role; IAM and resource authorization still determine whether it succeeds.",
"Application connection verification^Test allowed and denied access^The operator confirms the intended client port works and unrelated access remains denied after the accepted rule change.",
"Change evidence record^Correlate audit events and test results^The team records the supported API audit evidence and actual connection checks before closing the authorized change request."
]],
["AWS Tools and SDKs","publish an idempotent receipt job from application code","https://docs.aws.amazon.com/sdkref/latest/guide/overview.html",[
"Order application transaction^Record the accepted order and outbox entry^The application commits its order and durable publication intent under the chosen transaction design before attempting message delivery.",
"Workload IAM role^Supply temporary application credentials^The runtime obtains credentials from its approved workload identity with permission for the intended queue, avoiding embedded long-lived access keys.",
"AWS Tools and SDKs^Send the supported queue request^The SDK signs the SQS request and applies its configured transport retry behavior; SDK retries do not guarantee exactly-once business publication.",
"Amazon SQS receipt queue^Retain the accepted job message^SQS buffers the receipt job with its stable order and job identity so the consumer can handle repeated delivery safely.",
"Outbox publication reconciler^Resolve successful or uncertain sends^The producer records accepted publication and retries unresolved entries under its stable job identity instead of creating a new business job each attempt.",
"Receipt worker^Persist the receipt before acknowledging^The consumer checks the job identity, generates and stores the receipt, then acknowledges completed work without duplicating the business document."
]],
["AWS Infrastructure Composer","design a serverless document-processing stack","https://docs.aws.amazon.com/infrastructure-composer/latest/dg/what-is-composer.html",[
"Document workflow designer^Define upload, event and processing requirements^The developer identifies the source bucket, processing handler and separate result store before drawing the infrastructure resources.",
"AWS Infrastructure Composer^Compose the supported resource template^Composer helps create and connect supported infrastructure definitions; its diagram represents resource configuration rather than executing document processing.",
"Template source repository^Review the generated definitions^The team checks event configuration, resource properties and scoped permissions in the generated template before accepting the design.",
"AWS CloudFormation deployment^Create the reviewed workflow resources^The approved deployment provisions the template and application artifacts under the intended account role and environment configuration.",
"Document upload test^Exercise the configured event path^The tester uploads an authorized source object and verifies that the handler reads it and publishes a complete result in the separate output location.",
"Workflow acceptance check^Verify output and retry behavior^The owner confirms output identity, duplicate-event handling and required failure behavior rather than treating a composed connection as a working integration."
]],
["AWS Launch Wizard","deploy a reviewed enterprise software environment","https://docs.aws.amazon.com/launchwizard/latest/userguide/",[
"Enterprise platform owner^Select a supported deployment workload^The owner chooses a supported enterprise workload and identifies its licensing, capacity and availability requirements before starting deployment.",
"Network and identity prerequisites^Prepare the target environment^The team supplies the approved VPC, subnet, connectivity and deployment permissions required by the selected workload's supported configuration.",
"AWS Launch Wizard^Generate the selected deployment plan^The wizard collects workload inputs and supported sizing choices and presents the applicable deployment configuration for the owner's review.",
"Approved provisioning operation^Create the enterprise resources^The authorized workflow deploys its selected infrastructure under the intended account, with resource-operation failures inspected separately from software readiness.",
"Enterprise application validation^Test the required business endpoint^The application team verifies authentication, connectivity and representative operations against the deployed software rather than assuming infrastructure status proves correctness.",
"Operations handover^Record protection and maintenance ownership^The owner records backup, restore, patching and license responsibilities with the accepted deployment outputs before the platform enters service."
]]
]);
