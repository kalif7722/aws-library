export type LabResource={id:string;name:string;kind:string;status:'available'|'attached'|'deleted'|'disabled'|'pending deletion';dependsOn:string[];protected:boolean;readOnly:boolean};
type Definition={id:string;name:string;kind:string;at:number;dependsOn?:string[];protected?:boolean;readOnly?:boolean;status?:LabResource['status']};
const d=(id:string,name:string,kind:string,at:number,dependsOn:string[]=[],protectedResource=false,readOnly=false,status:LabResource['status']='available'):Definition=>({id,name,kind,at,dependsOn,protected:protectedResource,readOnly,status});
export const resourcePlans:Record<string,Definition[]>={
 'ec2-first-instance':[d('instance','architect-console-lab','EC2 instance',5)],
 'iam-role':[d('policy','LabS3ReadObjects','IAM policy',3),d('role','ec2-lab-s3-read','IAM role',5,['policy'])],
 'vpc-public-subnet':[d('vpc','lab-vpc','VPC',0),d('subnet','lab-public-a','Subnet',1,['vpc']),d('igw','lab-igw','Internet gateway',2,['vpc']),d('route-table','lab-public-rt','Route table',4,['vpc'])],
 's3-bucket':[d('bucket','architect-lab-123456789012','S3 bucket',2),d('object','hello.txt','Object version',4,['bucket'])],
 'rds-private-db':[d('subnet-group','lab-db-subnets','DB subnet group',0),d('database','architect-lab-db','RDS DB instance',5,['subnet-group'],true)],
 'lambda-function':[d('function','architect-lab-function','Lambda function',1)],
 'cloudwatch-alarm':[d('alarm','lab-ec2-cpu-high','CloudWatch alarm',4)],
 'route53-record':[d('zone','lab.example.com','Hosted zone',-1,[],false,true),d('record','app.lab.example.com','Alias A record',2,['zone'])],
 'security-group':[d('group','lab-web-sg','Security group',-1,[],false,true),d('ssh-rule','SSH TCP 22 · 203.0.113.10/32','Inbound rule',2,['group'])],
 'ebs-volume':[d('instance','architect-console-lab','EC2 instance',-1,[],false,true),d('volume','vol-0123456789abcdef0','EBS volume',1,['instance']),d('snapshot','architect-lab-data-before-change','EBS snapshot',4)],
 'alb-targets':[d('target-group','lab-web-targets','Target group',4),d('alb','lab-alb','Application Load Balancer',6,['target-group'])],
 'dynamodb-table':[d('table','ArchitectLabOrders','DynamoDB table',2,[],true)],
 'cloudtrail-events':[d('event','RunInstances','CloudTrail event',-1,[],false,true)],
 'cloudformation-stack':[d('stack','architect-lab-stack','CloudFormation stack',-1,[],false,true),d('change-set','lab-update','Change set',5,['stack'])],
 'ecs-service':[d('cluster','lab-fargate-cluster','ECS cluster',-1,[],false,true),d('task','lab-web-task','Task definition',2),d('service','lab-web-service','ECS service',5,['cluster','task'])],
 'cost-explorer':[d('report','ArchitectLabCostReview','Cost Explorer report',4)],
 'organizations-scp':[d('ou','Sandbox OU','Organizational unit',-1,[],false,true),d('policy','DenyLabLeaveOrganization','Service control policy',2),d('attachment','Sandbox OU → DenyLabLeaveOrganization','SCP attachment',3,['ou','policy'],false,false,'attached')],
 'control-tower':[d('landing-zone','Landing zone','Control Tower landing zone',-1,[],false,true)],
 'transit-gateway':[d('tgw','lab-tgw','Transit gateway',0),d('attachment','lab-vpc-a','TGW VPC attachment',1,['tgw'],false,false,'attached'),d('route','10.30.0.0/16','TGW route',3,['attachment'])],
 'direct-connect':[d('connection','lab-connection','Direct Connect connection',-1,[],false,true),d('vif','lab-private-vif','Private virtual interface',-1,['connection'],false,true)],
 'cloudfront-distribution':[d('distribution','lab-distribution','CloudFront distribution',-1,[],false,false),d('invalidation','/hello.txt','Invalidation',5,['distribution'])],
 'waf-web-acl':[d('acl','lab-web-acl','WAF web ACL',-1,[],false,true),d('rule','AWSManagedRulesCommonRuleSet','Managed rule',-1,['acl'],false,true)],
 'kms-key':[d('key','alias/lab-data-key','KMS key',4)],
 'backup-plan':[d('vault','lab-backup-vault','Backup vault',-1,[],false,true),d('plan','lab-daily-backup','Backup plan',1,['vault']),d('assignment','lab-instance-assignment','Backup assignment',2,['plan'])],
 'eventbridge-rule':[d('bus','default','Event bus',-1,[],false,true),d('rule','lab-ec2-state-change','EventBridge rule',5,['bus'])],
 'sqs-dlq':[d('dlq','lab-events-dlq','SQS dead-letter queue',0),d('queue','lab-events','SQS source queue',3,['dlq'])]
};
export function initialResources(labId:string):LabResource[]{return (resourcePlans[labId]??[]).filter(item=>item.at<0).map(item=>({...item,dependsOn:item.dependsOn??[],protected:!!item.protected,readOnly:!!item.readOnly,status:item.status??'available'}))}
export function advanceResources(labId:string,step:number,current:LabResource[],values:Record<string,string>):LabResource[]{
 let next=current.map(item=>({...item}));
 for(const item of resourcePlans[labId]??[]){if(item.at!==step||next.some(resource=>resource.id===item.id&&resource.status!=='deleted'))continue;
  const name=labId==='s3-bucket'&&item.id==='bucket'?values['0:Bucket name']||item.name:labId==='rds-private-db'&&item.id==='database'?values['2:DB instance identifier']||item.name:item.name;
  next=[...next.filter(resource=>resource.id!==item.id),{...item,name,dependsOn:item.dependsOn??[],protected:!!item.protected,readOnly:!!item.readOnly,status:item.status??'available'}]
 }
 if(labId==='ebs-volume'&&step===2)next=next.map(item=>item.id==='volume'?{...item,status:'attached'}:item);
 if(labId==='ec2-first-instance'&&step===8)next=next.map(item=>item.id==='instance'?{...item,status:'deleted'}:item);
 if(labId==='security-group'&&step===4&&values['4:Remove SSH rule']==='Yes')next=next.map(item=>item.id==='ssh-rule'?{...item,status:'deleted'}:item);
 if(labId==='route53-record'&&step===4)next=next.map(item=>item.id==='record'?{...item,status:'deleted'}:item);
 if(labId==='organizations-scp'&&step===4)next=next.map(item=>item.id==='attachment'?{...item,status:'deleted'}:item);
 return next
}
export function resourceAction(current:LabResource[],id:string,action:'delete'|'disable-protection'|'detach'|'disable'|'schedule-deletion',confirmation:string):{resources:LabResource[];error?:string}{
 const item=current.find(resource=>resource.id===id&&resource.status!=='deleted');if(!item)return {resources:current,error:'Resource not found.'};
 if(item.readOnly)return {resources:current,error:'This resource is provided for inspection and cannot be removed in this lab.'};
 if(action==='disable')return {resources:current.map(resource=>resource.id===id?{...resource,status:'disabled'}:resource)};
 if(action==='schedule-deletion'){if(item.kind!=='KMS key')return {resources:current,error:'Scheduling deletion is only available for KMS keys.'};if(confirmation!==item.name)return {resources:current,error:`Type ${item.name} to confirm.`};return {resources:current.map(resource=>resource.id===id?{...resource,status:'pending deletion'}:resource)}}
 if(action==='disable-protection')return {resources:current.map(resource=>resource.id===id?{...resource,protected:false}:resource)};
 if(action==='detach'&&item.status!=='attached')return {resources:current,error:'This resource has no attachment to remove.'};
 if(action==='delete'&&item.kind==='KMS key')return {resources:current,error:'KMS keys must be scheduled for deletion.'};
 if(action==='delete'&&item.kind==='CloudFront distribution'&&item.status!=='disabled')return {resources:current,error:'Disable the distribution before deleting it.'};
 if(action==='delete'&&item.status==='attached')return {resources:current,error:'Detach this resource before deleting it.'};
 if(action==='delete'&&item.protected)return {resources:current,error:'Disable deletion protection before deleting this resource.'};
 if(action==='delete'&&current.some(resource=>resource.status!=='deleted'&&resource.dependsOn.includes(id)))return {resources:current,error:'Remove dependent resources or attachments first.'};
 if(confirmation!==item.name)return {resources:current,error:`Type ${item.name} to confirm.`};
 return {resources:current.map(resource=>resource.id===id?{...resource,status:action==='detach'&&item.kind==='EBS volume'?'available':'deleted'}:resource)}
}
