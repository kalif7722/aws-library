"""Add SAP-C03 architect console tours; safe to run repeatedly."""
import json
from pathlib import Path
p=Path('app/troubleshooting/walkthroughs/labs.json')
labs=json.loads(p.read_text())
# Section, id, service, title, simulator, documentation, screen tuples.
new=[
('11 · Governance','organizations-scp','AWS Organizations','Apply a guardrail with an SCP',None,'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html',[
('Inspect organization','Organizations → AWS accounts','Confirm organization features and target OU.', [('Organization','All features'),('Target','Sandbox OU')]),
('Create SCP','Policies → Service control policies → Create policy','Create a narrow deny for a test Region.', [('Policy name','DenyUnapprovedRegion'),('Effect','Deny'),('Condition','aws:RequestedRegion')]),
('Attach to OU','Policy details → Targets → Attach','Attach to the sandbox OU and review inherited policies.', [('Target','Sandbox OU'),('Scope','Member accounts')]),
('Verify effective guardrail','AWS accounts → Sandbox OU → Policies','Inspect attached and inherited SCPs; detach the test policy after validation.', [('Verify','SCP attachment'),('Cleanup','Detach, then delete test SCP')])]),
('11 · Governance','control-tower','AWS Control Tower','Inspect landing zone guardrails',None,'https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html',[
('Open landing zone','Control Tower → Landing zone','Check landing zone status and home Region.', [('Status','Available'),('Home Region','Organization setting')]),
('Inspect controls','Control Tower → Control catalog','Filter preventive and detective controls for an OU.', [('Control type','Preventive / detective'),('Scope','OU')]),
('Review enrollment','Organization → OUs / Accounts','Inspect governed OUs and account enrollment status.', [('OU','Sandbox OU'),('Status','Enrolled')]),
('Review drift','Control Tower → Dashboard / Controls','Investigate drift and control status before remediation.', [('Signal','Drift status'),('Action','Review affected resources')])]),
('12 · Hybrid networking','transit-gateway','AWS Transit Gateway','Trace VPC routing through a transit gateway',None,'https://docs.aws.amazon.com/vpc/latest/tgw/tgw-getting-started.html',[
('Inspect gateway','VPC → Transit gateways','Open the gateway and inspect default route table settings.', [('Gateway','lab-tgw'),('State','Available')]),
('Inspect attachments','Transit Gateway Attachments','Confirm VPC attachments and subnet selections.', [('Attachment','Lab VPC'),('Subnets','One per selected AZ')]),
('Inspect TGW route table','Transit Gateway Route Tables → Routes','Compare propagated and static routes to attachment targets.', [('Destination','10.30.0.0/16'),('Target','VPC attachment')]),
('Trace VPC routes','VPC → Route tables → Routes','Verify subnet route table sends remote CIDR to TGW; inspect return path.', [('Destination','10.30.0.0/16'),('Target','Transit gateway')])]),
('12 · Hybrid networking','direct-connect','AWS Direct Connect','Inspect a private virtual interface',None,'https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html',[
('Inspect connection','Direct Connect → Connections','Check connection state, location, bandwidth and partner handoff.', [('State','Available'),('Location','Approved facility')]),
('Inspect private VIF','Virtual interfaces → Private VIF','Review VLAN, BGP peer ASN and address family.', [('Type','Private'),('VLAN','Provider-assigned'),('BGP','Peer ASN')]),
('Review gateway association','Direct Connect gateways → Associations','Confirm association to VGW or TGW and allowed prefixes.', [('Gateway','DX gateway'),('Allowed prefixes','Approved CIDRs')]),
('Verify BGP and route','Virtual interface → BGP / Monitoring','Check BGP up and advertised routes before application testing.', [('BGP status','Up'),('Verify','On-prem and AWS routes')])]),
('13 · Edge delivery','cloudfront-distribution','Amazon CloudFront','Inspect CDN origins and cache behavior',None,'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-creating-console.html',[
('Inspect distribution','CloudFront → Distributions','Open an approved distribution and inspect status and domain.', [('Status','Enabled'),('Domain','CloudFront domain')]),
('Review origin','Distribution → Origins','Inspect origin domain, access control and protocol policy.', [('Origin','S3 / ALB'),('Access','Origin access control')]),
('Review behavior','Distribution → Behaviors','Check path pattern, cache policy, viewer protocol and origin request policy.', [('Viewer protocol','Redirect HTTP to HTTPS'),('Cache policy','Managed / custom')]),
('Validate and invalidate','Distribution → Invalidations / Monitoring','Check response headers and cache misses; use targeted invalidation only if needed.', [('Verify','Hit / miss headers'),('Invalidation','Specific paths')])]),
('13 · Edge delivery','waf-web-acl','AWS WAF','Inspect a web ACL and managed rule',None,'https://docs.aws.amazon.com/waf/latest/developerguide/web-acl-creating.html',[
('Select scope','WAF → Web ACLs','Choose CloudFront global or Regional scope matching the protected resource.', [('Scope','CloudFront or Regional'),('Resource','Approved ALB / distribution')]),
('Inspect rule','Web ACL → Rules','Review managed rule group, priority and override action.', [('Rule group','AWS managed rules'),('Priority','Ordered evaluation')]),
('Inspect association','Web ACL → Associated AWS resources','Verify the correct resource is associated with the web ACL.', [('Association','Protected resource'),('Default action','Allow / Block')]),
('Review sampled requests','Web ACL → Traffic overview / Sampled requests','Inspect matching rule and request evidence before tuning.', [('Evidence','Rule, action, URI'),('Metric','Allowed / blocked requests')])]),
('14 · Security and recovery','kms-key','AWS KMS','Review a key policy and rotation',None,'https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html',[
('Open customer keys','KMS → Customer managed keys','Inspect key state, type and Region before any change.', [('Key type','Symmetric'),('State','Enabled')]),
('Inspect key policy','Key details → Key policy','Review key administrators, key users and principal scope.', [('Administrators','Approved roles'),('Users','Workload role')]),
('Inspect rotation','Key details → Key rotation','Check automatic rotation setting and key material origin.', [('Rotation','Enabled when supported'),('Origin','AWS KMS')]),
('Inspect grants','Key details → Grants / CloudTrail','Review grants and audit key use; schedule deletion only in a disposable lab.', [('Grants','Scoped operations'),('Audit','CloudTrail events')])]),
('14 · Security and recovery','backup-plan','AWS Backup','Inspect a cross-Region backup plan',None,'https://docs.aws.amazon.com/aws-backup/latest/devguide/creating-a-backup-plan.html',[
('Inspect vault','AWS Backup → Backup vaults','Review vault encryption, access policy and lock status.', [('Vault','Lab backup vault'),('Encryption','KMS key')]),
('Review plan rules','Backup plans → Backup rules','Inspect schedule, retention and copy actions.', [('Frequency','Daily example'),('Retention','Lab policy'),('Copy','Approved destination')]),
('Inspect assignments','Backup plan → Resource assignments','Confirm resources are selected by ARN or tags.', [('Assignment','Tagged resources'),('IAM role','Backup service role')]),
('Verify restore point','Backup vault → Recovery points / Jobs','Check completed job and restore point; test restore in sandbox.', [('Job','Completed'),('Recovery point','Available')])]),
('15 · Integration','eventbridge-rule','Amazon EventBridge','Trace an event rule to its target',None,'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule.html',[
('Inspect event bus','EventBridge → Event buses','Select the bus and review resource policy.', [('Bus','Default / custom'),('Policy','Allowed producers')]),
('Inspect rule pattern','Rules → Event pattern','Review source, detail-type and matching event fields.', [('Source','aws.ec2'),('Detail type','EC2 Instance State-change Notification')]),
('Inspect target','Rule → Targets','Verify target ARN, role and input transformation.', [('Target','Approved Lambda / SQS'),('Retry','Policy and DLQ')]),
('Verify delivery','Rule → Monitoring / CloudWatch metrics','Check matched, invoked and failed events; inspect target logs.', [('Metrics','Matched / failed'),('Evidence','Target log or queue')])]),
('15 · Integration','sqs-dlq','Amazon SQS','Review queue redrive and encryption',None,'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-dead-letter-queue.html',[
('Inspect queue','SQS → Queues','Open standard or FIFO queue and inspect ARN.', [('Queue type','Standard / FIFO'),('State','Available')]),
('Review delivery settings','Queue → Configuration','Inspect visibility timeout and retention relative to consumer processing.', [('Visibility timeout','Longer than processing'),('Retention','Lab policy')]),
('Review DLQ','Queue → Dead-letter queue','Verify redrive policy and maxReceiveCount; inspect DLQ access.', [('DLQ','Approved queue'),('maxReceiveCount','Defined threshold')]),
('Verify encryption and metrics','Queue → Encryption / Monitoring','Check SSE setting, queue depth and oldest message age.', [('Encryption','SSE-SQS / KMS'),('Metrics','Age and visible messages')])])]
for section,id,service,title,sim,doc,screens in new:
 if any(x['id']==id for x in labs):continue
 labs.append({'section':section,'id':id,'service':service,'title':title,'simulator':sim,'console':'https://console.aws.amazon.com/','doc':doc,'screens':[{'title':t,'path':path,'action':action,'why':'Architecture review: confirm the selected scope, dependencies and operational evidence before changing production.','rows':[list(v) for v in rows]} for t,path,action,rows in screens]})
p.write_text(json.dumps(labs,indent=2,ensure_ascii=False)+'\n')
print(len(labs),'labs')
