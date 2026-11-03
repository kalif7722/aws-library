import type {Stage,Field} from './spec';
/* Screen-specific controls transcribed from the approved console walkthroughs.
 * Syntax: label=value, label=value~choice 1|choice 2, +checkbox, !display value. */
const controls:Record<string,string[]>= {
 'lambda-function':[
  'Creation method=Author from scratch~Author from scratch|Use a blueprint|Container image;Function name=architect-lab-function;Runtime=Python 3.13~Python 3.13|Node.js 22.x;Architecture=x86_64~x86_64|arm64',
  'Execution role=Use an existing role~Create a new role with basic Lambda permissions|Use an existing role;Existing role=lab-lambda-execution~lab-lambda-execution;!Function name=architect-lab-function',
  '!Function name=architect-lab-function;!Tab=Code;!File=lambda_function.py;Code=def lambda_handler(event, context): return {"statusCode": 200, "body": "hello"}',
  'Test event action=Create new event~Create new event|Edit saved event;Event name=console-test;Event sharing=Private~Private|Shareable;Event JSON={"message":"hello"}',
  '!Test event=console-test;!Execution result=Succeeded;!Response={"statusCode":200,"body":"hello"}',
  '!Tab=Configuration;Memory=128 MB;Timeout=3 sec;!Permissions=lab-lambda-execution;!Monitor=CloudWatch Logs'
 ],
 'cloudwatch-alarm':[
  '!Namespace=EC2 → Per-Instance Metrics;!Instance=architect-console-lab;Metric=CPUUtilization~CPUUtilization|StatusCheckFailed',
  'Statistic=Average~Average|Maximum|Minimum;Period=5 minutes~1 minute|5 minutes|15 minutes;Threshold type=Static~Static|Anomaly detection;Condition=Greater than~Greater than|Greater than or equal to;Threshold value=80',
  'Datapoints to alarm=2;Evaluation periods=3;Missing data treatment=Treat missing data as missing~Treat missing data as missing|Treat missing data as breaching|Treat missing data as not breaching',
  'Alarm state trigger=In alarm~In alarm|OK|Insufficient data;Notification=Select an existing SNS topic~Select an existing SNS topic|Create new topic;SNS topic=lab-alerts',
  'Alarm name=lab-ec2-cpu-high;!Metric=CPUUtilization Average 5 minutes;!Threshold=Greater than 80, 2 of 3;!Notification=lab-alerts',
  '!Alarm state=Insufficient data;!Tabs=Details · Actions · History;!Threshold=80;!Evaluation=2 out of 3'
 ],
 'route53-record':[
  '!Hosted zone=lab.example.com;!Records=NS · SOA;!Action=Create record',
  'Record name=app;Record type=A~A|AAAA|CNAME;Alias=On~On|Off;Route traffic to=Alias to Application and Classic Load Balancer~Alias to Application and Classic Load Balancer|Alias to CloudFront distribution;Region=us-east-1;Load balancer=lab-alb',
  '!Record=app.lab.example.com;Routing policy=Simple routing~Simple routing|Weighted routing;Evaluate target health=Yes~Yes|No;!Alias target=lab-alb',
  'Record name=app.lab.example.com;Type=A~A|AAAA|CNAME;Resolver IP=;!Response=NOERROR · 203.0.113.20',
  '!Record=app.lab.example.com A · Alias Yes;Selected record=app.lab.example.com;!Protected records=NS and SOA remain'
 ],
 'security-group':[
  '!Instance=architect-console-lab;!Tab=Security;!Security group=lab-web-sg;!Existing ingress=HTTP TCP 80 · lab-alb-sg',
  '!Security group=lab-web-sg;!VPC=lab-vpc;!Tab=Inbound rules;!Existing rule=HTTP TCP 80 · lab-alb-sg',
  '!Existing rule=HTTP TCP 80 · lab-alb-sg;Type=SSH~SSH|Custom TCP;Protocol=TCP;Port range=22;Source=My IP · 203.0.113.10/32~My IP · 203.0.113.10/32|Custom;Description=Temporary lab access',
  '!Saved rule=SSH TCP 22 · 203.0.113.10/32;!Existing rule=HTTP TCP 80 · lab-alb-sg;!Status=Rules updated',
  '!Keep rule=HTTP TCP 80 · lab-alb-sg;Remove SSH rule=Yes~Yes|No;!Action=Save rules'
 ],
 'ebs-volume':[
  '!Instance=architect-console-lab;!State=Running;!Availability Zone=us-east-1a;!Tab=Storage',
  'Volume type=General Purpose SSD (gp3)~General Purpose SSD (gp3)|Provisioned IOPS SSD;Size (GiB)=8;IOPS=3000;Throughput (MiB/s)=125;Availability Zone=us-east-1a;Encrypted=Yes~Yes|No;KMS key=aws/ebs',
  '!Volume=vol-0123456789abcdef0;Instance=architect-console-lab~architect-console-lab;Device=/dev/sdf~\/dev\/sdf|\/dev\/sdg',
  '!Volume status=In-use;!Volume type=gp3 · 8 GiB;!Encrypted=Yes;!Availability Zone=us-east-1a;!Attachment=architect-console-lab · /dev/sdf',
  'Resource type=Volume~Volume|Instance;Volume=vol-0123456789abcdef0;Description=architect-lab-data-before-change',
  '!Snapshot status=Completed;!Snapshot size=8 GiB;!Encrypted=Yes;!Actions=Create volume from snapshot · Copy snapshot · Delete snapshot'
 ],
 'alb-targets':[
  'Load balancer type=Application Load Balancer~Application Load Balancer|Network Load Balancer;!Action=Create',
  'Load balancer name=lab-alb;Scheme=Internet-facing~Internet-facing|Internal;IP address type=IPv4~IPv4|Dualstack',
  'VPC=lab-vpc;Availability Zones=us-east-1a and us-east-1b;Subnets=lab-public-a and lab-public-b',
  'Security group=lab-alb-sg;Listener protocol=HTTP~HTTP|HTTPS;Listener port=80',
  'Target group name=lab-web-targets;Target type=Instances~Instances|IP addresses;Protocol=HTTP;Port=80',
  'Health check path=/health;Healthy threshold=5;Unhealthy threshold=2;Timeout=5 seconds',
  'Registered targets=architect-console-lab;Port=80;!Listener=HTTP:80 → lab-web-targets',
  '!Target group=lab-web-targets;!Health=Initial · checking;!Tabs=Targets · Health checks · Attributes'
 ],
 'dynamodb-table':[
  'Table name=ArchitectLabOrders;Partition key=orderId;Key type=String~String|Number|Binary',
  'Table settings=Customize settings~Default settings|Customize settings;Capacity mode=On-demand~On-demand|Provisioned;Deletion protection=Enabled~Enabled|Disabled;Encryption=AWS owned key~AWS owned key|AWS managed key',
  '!Table=ArchitectLabOrders;!Status=Active;!Partition key=orderId (String);!Capacity=On-demand',
  'Item orderId=order-1001;Attribute status=created;!Action=Explore table items',
  'Point-in-time recovery=Enabled~Enabled|Disabled;!Backups=On-demand backups;!Deletion protection=Enabled'
 ],
 'cloudtrail-events':[
  'Region=us-east-1;Time window=Last 90 days~Last 90 days|Last 7 days|Custom;!Event history=Management events',
  'Lookup attribute=Event name~Event name|Resource name|Username;Value=RunInstances;!Apply=Search',
  '!Event name=RunInstances;!Event source=ec2.amazonaws.com;!Username=lab-operator;!Resource=architect-console-lab',
  '!Evidence=Filtered event history;!Action=Download events;!Correlate=Timestamp · resource ID'
 ],
 'cloudformation-stack':[
  '!Stack=architect-lab-stack;!Status=CREATE_COMPLETE;!Tabs=Overview · Events · Resources · Outputs',
  'Action=Create change set for current stack;Change set name=lab-update;!Stack=architect-lab-stack',
  'Template source=Use current template~Use current template|Replace current template;!Template=Current stack template',
  '!Parameters=No parameters;!Next=Configure stack options',
  'Stack policy=Preserve current policy;Tags=Environment · lab;!Permissions=Existing stack role',
  '!Review=Current template · no parameters;!Action=Create change set',
  '!Change set=lab-update;!Status=CREATE_COMPLETE;!Changes=Review resource changes before execution',
  '!Stack events=UPDATE_IN_PROGRESS → UPDATE_COMPLETE;!Outputs=Verify expected outputs;!Rollback=Inspect failed events if any'
 ],
 'ecs-service':[
  '!Cluster=lab-fargate-cluster;!Launch type=Fargate;!Services=Inspect current services',
  'Task definition family=lab-web-task;Launch type=AWS Fargate~AWS Fargate|Amazon EC2;Task size=0.5 vCPU · 1 GiB;Task execution role=ecsTaskExecutionRole;Task role=lab-web-task-role',
  'Container name=web;Image=public.ecr.aws/nginx/nginx:latest;Container port=80;Log driver=awslogs',
  'Service name=lab-web-service;Desired tasks=1;Deployment type=Rolling update;Task definition=lab-web-task',
  'VPC=lab-vpc;Subnets=lab-private-a and lab-private-b;Security group=lab-web-sg;Public IP=Turned off~Turned off|Turned on',
  'Load balancer=lab-alb;Target group=lab-web-targets;Container=web:80;!Health check=/health',
  '!Service=lab-web-service;!Task status=Running;!Networking=Private subnets;!Logs=CloudWatch log stream'
 ],
 'cost-explorer':[
  'Date range=Last 30 days~Last 30 days|This month|Custom;Granularity=Daily~Daily|Monthly;!View=Cost and usage',
  'Group by=Service~Service|Region|Linked account;!Metric=Unblended cost',
  'Filter=Region;Region=US East (N. Virginia);!Chart=Daily cost by service',
  'Group by=Usage type~Usage type|Service|Operation;!Inspect=Top contributor and date',
  'Report name=ArchitectLabCostReview;!Filters=Daily · Service · Region;!Action=Save report'
 ],
 'organizations-scp':[
  '!Organization=Root → Security OU → Sandbox OU;!Selected OU=Sandbox OU;!Member account=lab-account',
  '!Policy type=Service control policies;!Available policy=FullAWSAccess;!Action=Create policy',
  'Policy name=DenyLabLeaveOrganization;Effect=Deny;Action=organizations:LeaveOrganization;Resource=*;!JSON version=2012-10-17',
  'Policy=DenyLabLeaveOrganization;Target=Sandbox OU~Sandbox OU|Production OU;!Action=Attach policy',
  '!Directly attached=DenyLabLeaveOrganization;!Inherited=FullAWSAccess from Root;Selected policy=DenyLabLeaveOrganization'
 ],
 'control-tower':[
  '!Landing zone=Enabled;!Home Region=us-east-1;!Governed Regions=Review;!Drift status=In sync',
  'Control behavior=Preventive~Preventive|Detective|Proactive;!Implementation=Inspect control definition',
  '!Organizational unit=Sandbox OU;!Enabled controls=Review targets;!Drift=Inspect evidence'
 ],
 'transit-gateway':[
  'Name tag=lab-tgw;Amazon side ASN=64512;Default route table association=Enable~Enable|Disable;Default route table propagation=Enable~Enable|Disable',
  'Transit gateway=lab-tgw;Attachment type=VPC~VPC|VPN;VPC=lab-vpc-a;Subnets=us-east-1a and us-east-1b',
  '!Attachment=lab-vpc-a;!State=Available;!Association=Default route table',
  'Destination=10.30.0.0/16;Attachment=lab-vpc-b;!Route type=Static',
  '!Propagation=lab-vpc-b;!Route table=lab-tgw-rt;!State=Enabled',
  '!VPC A route=10.30.0.0/16 → lab-tgw;!VPC B return route=10.20.0.0/16 → lab-tgw;!Check=Both directions'
 ],
 'direct-connect':[
  '!Connection=lab-connection;!State=Available;!Location=Approved DX location;!Bandwidth=1 Gbps',
  '!Private virtual interface=lab-private-vif;!VLAN=101;!Gateway=lab-dx-gw;!Address family=IPv4;!Customer ASN=65000',
  '!BGP status=Up;!Advertised routes=On-prem prefixes;!Received routes=AWS prefixes',
  '!Transit gateway association=lab-tgw;!Allowed prefixes=Approved on-prem routes;!Review=DX gateway and routing'
 ],
 'cloudfront-distribution':[
  '!Distribution=lab-distribution;!Status=Deployed;!Domain=Example CloudFront domain',
  '!Origin=architect-lab-123456789012.s3.us-east-1.amazonaws.com;!Origin access=Origin access control (OAC);!Bucket policy=SourceArn scoped',
  '!Behavior=Default (*);!Viewer protocol policy=Redirect HTTP to HTTPS;!Cache policy=Managed-CachingOptimized',
  '!Security=AWS WAF web ACL;!Alternate domain names=Review;!Certificate=Review',
  '!Distribution status=Deployed;!Origin health=Inspect;!Cache behavior=Verify',
  'Invalidation path=/hello.txt;!Action=Create invalidation;!Scope=Targeted object only'
 ],
 'waf-web-acl':[
  'Resource type=Regional~Regional|CloudFront;Region=us-east-1;!Scope=Match protected resource',
  '!Managed rules=AWS managed rule groups;!Priority=Review order;Default action=Allow~Allow|Block',
  '!Rule=AWSManagedRulesCommonRuleSet;Action=Use rule action~Use rule action|Count;!Priority=1',
  '!Associated resource=lab-alb;!Web ACL=lab-web-acl;!Scope=Regional',
  '!Sampled requests=Inspect action and rule;!Action=Block or Count;!Evidence=Request details'
 ],
 'kms-key':[
  'Key type=Symmetric~Symmetric|Asymmetric;Key usage=Encrypt and decrypt;Regionality=Single-Region key~Single-Region key|Multi-Region key',
  'Alias=alias/lab-data-key;Description=Architect lab data encryption key;Tag=Environment · lab',
  'Key administrators=lab-admin-role;!Allow key deletion=Review policy',
  'Key users=lab-application-role;!Policy=Key usage principals',
  '!Key policy=Review;Automatic key rotation=Enabled~Enabled|Disabled;!Alias=alias/lab-data-key'
 ],
 'backup-plan':[
  '!Vault=lab-backup-vault;!Encryption key=aws/backup;!Access policy=Review;!Vault Lock=Not configured',
  'Plan name=lab-daily-backup;Rule name=DailyBackup;Frequency=Daily~Daily|Weekly;Retention=7 days',
  'Resource assignment name=lab-instance-assignment;Resource type=EC2;Resource ID=architect-console-lab;IAM role=AWSBackupDefaultServiceRole',
  '!Backup jobs=Completed;!Vault=lab-backup-vault;!Recovery point=Inspect',
  '!Recovery point=Completed;!Retention=7 days;!Restore=Test separately'
 ],
 'eventbridge-rule':[
  '!Event bus=default;!Permissions=Review bus policy;!Action=Create rule',
  'Rule name=lab-ec2-state-change;Rule type=Rule with an event pattern~Rule with an event pattern|Schedule;Event bus=default',
  'Event source=AWS events or EventBridge partner events;Event pattern={"source":["aws.ec2"],"detail-type":["EC2 Instance State-change Notification"],"detail":{"state":["running"]}}',
  'Target type=AWS service~AWS service|EventBridge API destination;Target=SQS queue;Queue=lab-events',
  'Tag key=Environment;Tag value=lab;!Rule=lab-ec2-state-change',
  '!Review=EC2 running event pattern;!Target=SQS lab-events;!Retry policy=Default;!DLQ=Review',
  '!Rule=lab-ec2-state-change;!Metrics=Matched events · Invocations · Failed invocations;!State=Enabled'
 ],
 'sqs-dlq':[
  'Queue type=Standard~Standard|FIFO;Name=lab-events-dlq;Encryption=SSE-SQS~SSE-SQS|SSE-KMS;Access policy=Basic',
  'Queue type=Standard~Standard|FIFO;Name=lab-events;Visibility timeout=60 seconds;Message retention=4 days;Delivery delay=0 seconds;Receive message wait time=20 seconds',
  'Encryption=Enabled · SSE-SQS~Enabled · SSE-SQS|SSE-KMS;Access policy=Basic;!Principal=Queue owner only',
  'Dead-letter queue=Enabled~Enabled|Disabled;DLQ ARN=lab-events-dlq;Maximum receives=5',
  '!Queue=lab-events;!Monitoring=Visible messages · Oldest message age;!Tabs=Encryption · Access policy · Dead-letter queue'
 ]
};
const parse=(raw:string):Field[]=>raw.split(';').filter(Boolean).map(token=>{const readonly=token.startsWith('!');const labelValue=readonly?token.slice(1):token;const separator=labelValue.indexOf('=');const name=separator<0?labelValue:labelValue.slice(0,separator);const rest=separator<0?'':labelValue.slice(separator+1);const [value,choices]=rest.split('~');return {label:name,value:value.replaceAll('\\/','/'),kind:readonly?'readonly':choices?'select':'text',options:choices?.split('|').map(x=>x.replaceAll('\\/','/')),required:!readonly&&!choices&&Boolean(value.trim())} as Field});
export const expandedStages:Record<string,Stage[]> = Object.fromEntries(Object.entries(controls).map(([id,screens])=>[id,screens.map((raw,index)=>({fields:parse(raw),button:index===screens.length-1?'Complete lab':'Continue to next screen'}))]));
