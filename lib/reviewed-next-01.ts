import {batch} from "./reviewed-next-builders";
export const reviewedNext01=batch([
["AWS Cost Anomaly Detection","investigate an unexpected development-account bill","https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html",[
"Development account charges^Updated billing records^The development account's recorded usage supplies the billing history for the configured monitor; application request logs are not its cost input.",
"Cost monitor definition^Account and service scope^FinOps selects the monitored linked account and monitor type and configures a subscription threshold appropriate to the development workload.",
"AWS Cost Anomaly Detection^Detect unusual spending^The service evaluates the monitored spending pattern and identifies an anomaly with estimated impact and available contributor evidence; detection is not immediate resource shutdown.",
"FinOps notification subscription^Notify the cost owner^The configured subscription delivers eligible anomaly notifications to the responsible owner under its selected threshold and notification frequency.",
"AWS Cost Explorer^Isolate contributing usage^The owner filters the anomaly interval by account, service and usage dimensions, then correlates the increase with the workload's recent deployments.",
"Development workload owner^Approve and verify a repair^The owner reviews an unintended instance launch, stops the approved excess capacity and checks subsequent billing; the anomaly service does not perform that resource change."
]],
["AWS Cost and Usage Reports","reconcile a monthly customer allocation report","https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html",[
"Billing export configuration^Choose cost details and destination^FinOps configures the report's required granularity and permitted S3 destination, with ownership tags activated before relying on their allocation columns.",
"AWS Cost and Usage Reports^Deliver detailed billing files^The configured report delivers cost and usage files and associated metadata to S3; revisions and delayed billing records can change a previous interval.",
"Amazon S3 billing prefix^Retain the report batch^The bucket restricts the billing data to the finance analytics role and retains the selected report versions for reproducible reconciliation.",
"AWS Glue billing catalog^Describe the file schema^The report integration supplies the required table and partition metadata so queries can interpret the delivered files; the catalog is not the financial ledger.",
"Amazon Athena allocation query^Group accepted charges by owner^The finance query filters the intended interval and groups charges by the approved allocation dimensions, accounting for credits and report revisions.",
"Customer allocation reviewer^Reconcile totals before publication^The reviewer compares allocated totals with the accepted bill and investigates missing ownership tags before publishing the customer-facing allocation report."
]],
["AWS Billing Conductor","publish a pro forma chargeback statement","https://docs.aws.amazon.com/billingconductor/latest/userguide/what-is-billingconductor.html",[
"Chargeback administrator^Define the billing group^The administrator groups the approved member accounts and documents their business owner; grouping does not change the underlying AWS payer invoice.",
"Pricing plan owner^Set reviewed pricing rules^The owner selects the group's approved pricing plan and rules, checking the intended markup or discount and applicable service scope.",
"AWS Billing Conductor^Calculate pro forma charges^Billing Conductor applies the configured pricing to eligible usage for the billing group and exposes pro forma cost data separately from actual AWS charges.",
"Pro forma report export^Deliver allocation evidence^The selected supported reporting path exports the group's pro forma detail for finance review, with access restricted to the intended account owners.",
"Finance statement reviewer^Reconcile group and actual bill^Finance compares the internal statement with the payer's actual charges and explicitly identifies adjustments rather than presenting pro forma data as the AWS invoice.",
"Business account owner^Accept the internal allocation^The account owner reviews the published period and pricing assumptions and raises allocation disputes through the finance workflow before the internal statement is finalized."
]],
["AWS Compute Optimizer","rightsize an overprovisioned EC2 worker","https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html",[
"EC2 batch worker^Collect representative utilization^The worker processes its normal batch window while required utilization evidence accumulates; a quiet holiday is not assumed to represent peak capacity needs.",
"Recommendation preferences^Choose eligible workload scope^The operations owner opts in the required accounts and checks supported resource coverage, lookback and recommendation preferences for the worker.",
"AWS Compute Optimizer^Assess candidate instance sizes^The service compares supported utilization evidence with instance alternatives and exposes performance-risk and cost evidence; it does not resize the worker automatically.",
"Batch performance reviewer^Check memory and deadline constraints^The owner compares the recommendation with job completion deadlines, required memory and software licensing, including signals absent from basic CPU metrics.",
"EC2 replacement launch template^Test the selected size^The owner updates a reviewed launch-template version and runs the representative batch on the candidate size, retaining the original version for rollback.",
"Batch acceptance check^Verify deadline and output correctness^The team accepts the smaller worker only after the batch finishes within its deadline and output reconciliation passes; lower estimated cost alone is insufficient."
]],
["AWS Trusted Advisor","resolve an exposed resource recommendation","https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html",[
"Account resource inventory^Identify supported check coverage^The security owner identifies the account's resources and available Trusted Advisor checks, accounting for support-plan and check-specific refresh behavior.",
"AWS Trusted Advisor^Return applicable recommendations^Trusted Advisor evaluates available checks and presents affected resources and recommended follow-up; its recommendation is not proof of an active exploit.",
"Security findings reviewer^Validate the reported exposure^The reviewer inspects the resource's real configuration and business access requirement before deciding which recommendation warrants a change.",
"Infrastructure change proposal^Restrict the intended access^The owner prepares a scoped configuration change that preserves the legitimate client path and submits it through the workload's change controls.",
"Resource deployment^Apply the approved configuration^The approved deployment changes the affected resource through its service API; Trusted Advisor does not execute arbitrary application repairs.",
"Recommendation follow-up^Confirm access and refreshed result^The owner tests allowed and denied access and reviews the refreshed check evidence before closing the finding, keeping functional verification separate from its administrative status."
]],
["AWS Service Quotas","prepare an account for a larger worker fleet","https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html",[
"Fleet capacity plan^Calculate peak resource demand^The platform team calculates the worker fleet's regional demand, deployment overlap and rollback headroom before launching the larger production batch.",
"AWS Service Quotas^Inspect the applicable account limit^The owner checks the selected service and Region's supported quota and current value; quotas are distinct from guaranteed capacity availability.",
"Quota increase request^Submit the reviewed target value^The authorized owner requests an increase for the supported adjustable quota and records the business capacity requirement without assuming immediate approval.",
"Request status review^Wait for the approved quota^The release process checks request status and the effective quota before proceeding; an accepted request submission is not an increased limit.",
"Worker fleet deployment^Launch within quota and capacity^The deployment launches the approved worker count and handles capacity or API failures independently from the account's allowed quota.",
"Fleet readiness verification^Confirm running healthy workers^The operator verifies healthy worker registration and batch capacity rather than treating quota approval as evidence that instances were successfully provisioned."
]],
["Savings Plans","purchase a commitment supported by baseline usage","https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html",[
"Historical compute usage^Measure eligible steady demand^FinOps reviews eligible hourly usage across representative business periods and separates predictable baseline demand from temporary migrations or seasonal peaks.",
"Commitment analysis^Compare recommendation with forecast^The analyst checks the supported recommendation against expected architectural changes and existing commitments, documenting the risk of future underutilization.",
"Savings Plans^Select the appropriate commitment type^The owner selects the supported plan type, term and payment option that match the reviewed workload flexibility; a commitment is not a capacity reservation.",
"Finance approval^Authorize the bounded commitment^Finance approves the proposed hourly commitment and commercial terms before the authorized purchasing action; application owners do not silently commit the account.",
"Eligible running workloads^Apply covered-usage discounts^The billing process applies eligible plan benefits to covered usage while unmatched usage retains its applicable pricing; workloads continue using their normal runtime architecture.",
"Commitment utilization review^Check coverage and unused commitment^FinOps monitors utilization and coverage after purchase and adjusts future planning when the workload changes, recognizing that idle commitment is still a financial obligation."
]],
["AWS Billing and Cost Management","close a monthly cloud cost review","https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-what-is.html",[
"AWS usage records^Accumulate account charges^Resource consumption produces billing records for the account and period; operational telemetry alone cannot establish the final payable amount.",
"AWS Billing and Cost Management^Review bills and payment context^The authorized billing user reviews the selected period's bill, linked-account attribution and relevant billing settings under the account's access model.",
"Cost allocation tags^Assign charges to business owners^Activated allocation tags and account ownership provide the selected chargeback dimensions, while missing tags remain visible for correction rather than guessed allocation.",
"AWS Cost Explorer^Explain material spending changes^FinOps compares the reporting periods and drills into the services and accounts responsible for material changes before proposing optimization work.",
"Finance reconciliation^Validate credits and invoice differences^Finance reconciles the accepted invoice with internal reports and documents credits, adjustments and late-arriving records that explain differences.",
"Monthly account review^Record decisions and follow-up owners^The team records the accepted cost statement and assigns reviewed optimization tasks; the billing console supplies evidence rather than automatically redesigning workloads."
]],
["AWS Account Management","update operational contacts for a member account","https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html",[
"Account ownership registry^Identify the intended member account^The platform owner identifies the target account and its approved operational contacts, avoiding updates based solely on a familiar account display name.",
"Account management authorization^Verify the permitted administration scope^The operator checks the applicable account or delegated administration permissions and organization prerequisites before requesting the supported contact update.",
"AWS Account Management^Update the selected contact information^The authorized operation updates the intended account contact under the supported API or console workflow; it does not grant the contact a workload IAM role.",
"Contact verification^Confirm the intended channel and owner^The owner verifies the saved contact fields and operational ownership through the approved internal process, distinguishing contact records from authentication credentials.",
"Administration audit^Retain account-change evidence^The security team reviews supported management-event evidence for the account change and correlates it with the approved request and operator identity.",
"Account handover record^Publish the corrected operational ownership^The platform registry records the accepted contact update and escalation owner so incidents route correctly without treating the contact update as an application deployment."
]],
["AWS Health","prepare for a scheduled infrastructure event","https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html",[
"Affected AWS resource^Match the workload inventory^The operations team maps the relevant account resource to its application owner so a resource-specific service event can be interpreted in business context.",
"AWS Health^Expose the applicable service event^Health supplies the selected account's event details, affected-resource evidence and update state; it is separate from measuring the application's own request success.",
"EventBridge Health event rule^Route the selected event types^The configured rule matches supported Health events for the intended scope and sends them to the operations notification workflow without assuming every event requires automation.",
"Workload incident owner^Assess maintenance impact^The owner reviews event timing, availability design and affected capacity before selecting a safe maintenance or failover action.",
"Reviewed workload maintenance^Replace or move the affected capacity^The operations procedure performs the approved resource action and preserves the workload's required state and rollback path during the maintenance window.",
"Application verification^Confirm healthy service after maintenance^The owner checks real application requests and current Health event updates before closing the operational task; a resolved provider event alone does not prove workload recovery."
]]
]);
