export type Field={label:string;value:string;kind?:'text'|'select'|'check'|'choice'|'readonly';options?:string[];help?:string;required?:boolean};
export type Stage={fields:Field[];button:string;note?:string};
const f=(label:string,value:string,kind:Field['kind']='text',options?:string[],help?:string):Field=>({label,value,kind,options,help,required:kind==='text'});
const c=(label:string,value:string,options:string[])=>f(label,value,'choice',options);
const s=(label:string,value:string,options:string[])=>f(label,value,'select',options);
const k=(label:string,value='Yes')=>f(label,value,'check');
const r=(label:string,value:string)=>f(label,value,'readonly');
export const stages:Record<string,Stage[]>={
'ec2-first-instance':[
 {fields:[s('Region','US East (N. Virginia) · us-east-1',['US East (N. Virginia) · us-east-1','Europe (Ireland) · eu-west-1']),r('Navigation','EC2 → Instances')],button:'Launch instances'},
 {fields:[f('Name','architect-console-lab'),s('Application and OS Images (Amazon Machine Image)','Amazon Linux 2023 AMI',['Amazon Linux 2023 AMI','Ubuntu Server 24.04 LTS','Windows Server 2022'])],button:'Continue to instance type'},
 {fields:[s('Instance type','t3.micro',['t3.micro','t3.small','t3.medium']),s('Key pair name','lab-key',['lab-key','Create new key pair','Proceed without a key pair'])],button:'Continue to network settings'},
 {fields:[s('VPC','lab-vpc',['lab-vpc','default']),s('Subnet','lab-public-subnet',['lab-public-subnet','No preference']),s('Auto-assign public IP','Enable',['Enable','Disable'])],button:'Continue to firewall'},
 {fields:[c('Firewall (security groups)','Create security group',['Create security group','Select existing security group']),c('Allow SSH traffic from','My IP',['My IP','Anywhere','Custom']),r('SSH port','TCP 22')],button:'Continue to storage',note:'For this exercise, SSH must be scoped to My IP.'},
 {fields:[s('Root volume','8 GiB gp3',['8 GiB gp3','16 GiB gp3']),k('Encrypted'),k('Delete on termination'),r('Summary','1 instance · Amazon Linux 2023 · t3.micro')],button:'Launch instance'},
 {fields:[r('Instance state','Running'),r('Status checks','2/2 passed'),r('Public IPv4 address','198.51.100.24'),r('Private IPv4 address','10.0.1.24'),r('Storage','Root EBS gp3 · delete on termination')],button:'Connect'},
 {fields:[s('Connection type','EC2 Instance Connect',['EC2 Instance Connect','Session Manager','SSH client']),f('Username','ec2-user'),s('Connection','Public IP address',['Public IP address','Private IP address']),r('Read-only checks','whoami · uptime')],button:'Connect to instance'},
 {fields:[s('Instance state menu','Terminate (delete) instance',['Terminate (delete) instance','Stop instance']),k('Confirm termination'),r('Cleanup inventory','EBS · snapshots · key pair · IPs')],button:'Terminate (delete) instance'}
],
'iam-role':[
 {fields:[r('Navigation','IAM → Access management → Roles')],button:'Create role'},
 {fields:[c('Trusted entity type','AWS service',['AWS service','AWS account','Web identity']),s('Service or use case','EC2',['EC2','Lambda','ECS'])],button:'Next'},
 {fields:[s('Policy editor','JSON',['JSON','Visual']),f('Action','s3:GetObject'),f('Resource','arn:aws:s3:::architect-lab-bucket/examples/*')],button:'Next',note:'The policy allows only object reads under examples/*.'},
 {fields:[f('Policy name','LabS3ReadObjects'),r('Review','S3 GetObject on example objects')],button:'Create policy'},
 {fields:[f('Search permissions policies','LabS3ReadObjects'),k('LabS3ReadObjects attached')],button:'Next'},
 {fields:[f('Role name','ec2-lab-s3-read'),r('Trusted entity','EC2'),r('Permissions','LabS3ReadObjects')],button:'Create role'},
 {fields:[r('Principal','ec2.amazonaws.com'),r('Action','sts:AssumeRole'),r('Permissions policy','LabS3ReadObjects'),k('I reviewed the trust relationship')],button:'Finish role review'}
],
'vpc-public-subnet':[
 {fields:[c('Resources to create','VPC only',['VPC only','VPC and more']),f('Name tag','lab-vpc'),f('IPv4 CIDR','10.20.0.0/16'),s('IPv6 CIDR block','No IPv6 CIDR block',['No IPv6 CIDR block','Amazon-provided IPv6 CIDR block']),s('Tenancy','Default',['Default','Dedicated'])],button:'Create VPC'},
 {fields:[s('VPC','lab-vpc',['lab-vpc','default']),f('Subnet name','lab-public-subnet'),s('Availability Zone','us-east-1a',['us-east-1a','us-east-1b']),f('IPv4 subnet CIDR block','10.20.1.0/24')],button:'Create subnet'},
 {fields:[f('Name tag','lab-igw')],button:'Create internet gateway'},
 {fields:[r('Internet gateway','lab-igw'),s('Available VPCs','lab-vpc',['lab-vpc','default'])],button:'Attach internet gateway'},
 {fields:[f('Name','lab-public-rt'),s('VPC','lab-vpc',['lab-vpc','default'])],button:'Create route table'},
 {fields:[r('Destination','10.20.0.0/16 → local'),f('Destination','0.0.0.0/0'),s('Target','lab-igw',['lab-igw','local'])],button:'Save changes'},
 {fields:[s('Subnet association','lab-public-subnet',['lab-public-subnet','None']),r('Route table','lab-public-rt')],button:'Save associations'},
 {fields:[r('Default route','0.0.0.0/0 → lab-igw'),r('Subnet','lab-public-subnet'),k('Auto-assign public IPv4'),r('Security reminder','A public subnet alone does not expose an instance')],button:'Finish network review'}
],
's3-bucket':[
 {fields:[c('Bucket type','General purpose',['General purpose','Directory']),s('AWS Region','US East (N. Virginia) us-east-1',['US East (N. Virginia) us-east-1','Europe (Ireland) eu-west-1']),f('Bucket name','architect-lab-123456789012')],button:'Continue to ownership'},
 {fields:[c('Object Ownership','ACLs disabled (recommended)',['ACLs disabled (recommended)','ACLs enabled']),k('Block all public access'),r('Ownership','Bucket owner enforced')],button:'Continue to versioning'},
 {fields:[c('Bucket Versioning','Enable',['Enable','Disable']),s('Default encryption','SSE-S3',['SSE-S3','SSE-KMS']),k('Bucket key'),r('Tags','Environment: lab')],button:'Create bucket'},
 {fields:[r('Bucket name','architect-lab-123456789012'),r('Objects','0 objects'),r('Tabs','Objects · Properties · Permissions · Metrics · Management')],button:'Upload'},
 {fields:[f('File','examples/architecture-notes.txt'),s('Storage class','Standard',['Standard','Standard-IA']),r('Destination','s3://architect-lab-123456789012/examples/')],button:'Upload'},
 {fields:[r('Object key','examples/architecture-notes.txt'),r('Storage class','Standard'),r('Server-side encryption','SSE-S3'),r('Version ID','Generated after upload')],button:'Show versions'},
 {fields:[k('Show versions'),r('Object versions','Current and noncurrent versions'),k('Delete object versions before deleting bucket')],button:'Finish bucket review'}
],
'rds-private-db':[
 {fields:[f('DB subnet group name','lab-db-subnets'),f('Description','Private database subnets'),s('VPC','lab-vpc',['lab-vpc','default']),c('Availability Zones','us-east-1a and us-east-1b',['us-east-1a and us-east-1b','us-east-1a only'])],button:'Create'},
 {fields:[c('Database creation method','Standard create',['Standard create','Easy create']),s('Engine type','PostgreSQL',['PostgreSQL','MySQL','MariaDB']),c('Templates','Dev/Test',['Dev/Test','Production','Free tier'])],button:'Continue to settings'},
 {fields:[c('Deployment option','Single DB instance',['Single DB instance','Multi-AZ DB instance']),f('DB instance identifier','lab-postgres'),f('Master username','postgres'),s('Credentials management','Self managed',['Self managed','Managed in AWS Secrets Manager']),f('Master password','LabExampleOnly_2026!')],button:'Continue to instance configuration'},
 {fields:[s('DB instance class','db.t3.micro',['db.t3.micro','db.t4g.micro','db.m6i.large']),s('Storage type','General Purpose SSD (gp3)',['General Purpose SSD (gp3)','Provisioned IOPS SSD']),f('Allocated storage (GiB)','20'),k('Storage autoscaling')],button:'Continue to connectivity'},
 {fields:[c('Compute resource','Don’t connect to an EC2 compute resource',['Don’t connect to an EC2 compute resource','Connect to an EC2 compute resource']),s('Network type','IPv4',['IPv4','Dual-stack mode']),s('Virtual private cloud (VPC)','lab-vpc',['lab-vpc','default']),s('DB subnet group','lab-db-subnets',['lab-db-subnets','default']),c('Public access','No',['No','Yes']),c('VPC security group','Choose existing',['Choose existing','Create new']),s('Existing VPC security groups','lab-db-sg',['lab-db-sg','default']),f('Database port','5432')],button:'Continue to additional configuration',note:'Public access must remain No; the database security group should allow TCP 5432 only from the application security group.'},
 {fields:[f('Initial database name','labdb'),k('Enable automated backups'),s('Backup retention period','7 days',['7 days','1 day','14 days']),k('Enable encryption'),r('Summary','PostgreSQL · private · gp3')],button:'Create database'},
 {fields:[r('Status','Available'),r('Endpoint','lab-postgres.example.us-east-1.rds.amazonaws.com'),r('Port','5432'),r('Publicly accessible','No'),r('DB subnet group','lab-db-subnets'),r('VPC security group','lab-db-sg')],button:'Review deletion protection'},
 {fields:[k('Create final snapshot'),k('Retain automated backups'),r('Deletion protection','Review before deleting'),r('Confirmation','A final snapshot can continue to incur charges')],button:'Finish database review'}
]};
