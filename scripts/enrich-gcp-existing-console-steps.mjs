import fs from "node:fs";
const file="docs/gcp/service-content-detailed.json";
const data=JSON.parse(fs.readFileSync(file,"utf8"));
const paths={
"access-approval":["Security → Access Approval","organization/project settings, approval roles and Pub/Sub/email notifications","review a pending request, approve/dismiss it and verify audit evidence"],
"cloud-billing":["Billing","billing account, project linkage, budgets/alerts and BigQuery billing export","validate cost-table freshness, budget notifications and export queries"],
"cloud-hub":["Cloud Hub","management project, enabled data providers and operator access","open prioritized issues, follow a source-service link and verify remediation"],
"cloud-identity":["Cloud Identity","domain verification, users/groups, security settings and federation","test user lifecycle, group membership and sign-in/audit reporting"],
"cloud-marketplace":["Marketplace","product/plan, billing account, procurement controls and target project","review terms, deploy a test entitlement and verify vendor/resource access"],
"cloud-quotas":["IAM & Admin → Quotas & System Limits","service, dimensions, project scope, alert threshold and adjustment request","inspect utilization, submit a justified request and confirm the approved limit"],
"config-connector":["Kubernetes Engine → Config Connector","installation mode, controller identity, namespace and CRD manifest","apply a test resource, inspect reconciliation status and test deletion policy"],
"gcloud-cli":["Activate Cloud Shell","active account/project, configuration, impersonation and command format","run a read-only command, inspect effective identity and confirm audit logs"],
"identity-platform":["Identity Platform","providers, authorized domains, tenant settings and application credentials","complete sign-up/sign-in, validate token claims and test account protection"],
"infra-manager":["Infrastructure Manager","deployment location, Terraform source, variables, service account and state behavior","preview/deploy, inspect operation logs and validate update/delete handling"],
"managed-microsoft-ad":["Managed Microsoft AD","region, domain name, VPC peering, delegated admins and DNS","join a test VM, validate DNS/Kerberos and check domain-controller health"],
"recommender":["Recommender","project/folder scope, recommender type, IAM and export/automation settings","review insight evidence, claim/apply or dismiss a recommendation and verify outcome"],
"cloud-run":["Cloud Run","region, container image, service identity, ingress, authentication, scaling and traffic","deploy a revision, send an authorized request, inspect logs/metrics and test rollback"]};
for(const s of data.services){const p=paths[s.slug];if(p&&!s.consoleSteps)s.consoleSteps=[{title:`Open ${p[0]}`,detail:`Google Cloud Console → ${p[0]}; select the intended scope and supported location.`},{title:"Configure the service",detail:`Set ${p[1]}.`},{title:"Apply security boundaries",detail:"Grant least-privilege administrative and runtime roles; configure network, encryption and audit controls appropriate to the service."},{title:"Validate operation",detail:`${p[2]}.`}];}
fs.writeFileSync(file,JSON.stringify(data,null,2)+"\n");
console.log(`Enriched ${Object.keys(paths).length} existing records with console steps`);
