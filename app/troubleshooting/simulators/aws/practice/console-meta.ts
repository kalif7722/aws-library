export type ConsoleMeta={name:string;nav:string[];active:string[];heading:string[];crumb:string[][];section:string[][];tabs?:Record<number,string[]>};
export const consoleMeta:Record<string,ConsoleMeta>={
 'iam-role':{
 name:'IAM',nav:['Dashboard','▾ Access management','Users','User groups','Roles','Policies','Identity providers','Account settings','▾ Access reports','Access Analyzer','Archive rules','Analyzers','Settings','Credential report','Organization activity','Service control policies (SCPs)'],
 active:['Roles','Roles','Policies','Policies','Roles','Roles','Roles'],
 heading:['Roles','Create role','Specify permissions','Review and create','Create role','Create role','ec2-lab-s3-read'],
 crumb:[['IAM','Roles'],['IAM','Roles','Create role'],['IAM','Policies','Create policy'],['IAM','Policies','Create policy'],['IAM','Roles','Create role'],['IAM','Roles','Create role'],['IAM','Roles','ec2-lab-s3-read']],
 section:[['Roles'],['Trusted entity type','Use case'],['Policy editor'],['Policy details','Permissions defined in this policy'],['Permissions policies','Set permissions boundary'],['Role details','Step 1: Select trusted entities','Step 2: Add permissions','Tags - optional'],['Role summary','Trust policy']],
 tabs:{6:['Permissions','Trust relationships','Tags','Access Advisor']}
 },
 'vpc-public-subnet':{
 name:'VPC',nav:['VPC dashboard','Your VPCs','Subnets','Route tables','Internet gateways','Egress-only internet gateways','Carrier gateways','DHCP option sets','Elastic IPs','Managed prefix lists','Endpoints','Endpoint services','NAT gateways','Peering connections','▾ Security','Network ACLs','Security groups','▾ DNS firewall','Rule groups','Domain lists'],
 active:['Your VPCs','Subnets','Internet gateways','Internet gateways','Route tables','Route tables','Route tables','Subnets'],
 heading:['Create VPC','Create subnet','Create internet gateway','Attach to VPC','Create route table','Edit routes for lab-public-rt','Edit subnet associations','Subnet: lab-public-a'],
 crumb:[['VPC','Your VPCs','Create VPC'],['VPC','Subnets','Create subnet'],['VPC','Internet gateways','Create internet gateway'],['VPC','Internet gateways','lab-igw','Attach to VPC'],['VPC','Route tables','Create route table'],['VPC','Route tables','lab-public-rt','Edit routes'],['VPC','Route tables','lab-public-rt','Subnet associations'],['VPC','Subnets','lab-public-a']],
 section:[['Resources to create','Name tag - optional','IPv4 CIDR block','IPv6 CIDR block','Tenancy'],['VPC ID','Subnet settings'],['Internet gateway settings','Tags - optional'],['Internet gateway','Available VPCs'],['Route table settings','Tags'],['Routes'],['Available subnets (1/2)'],['Details','Route table','Routes (2)']],
 tabs:{7:['Details','Flow logs','Route table','Network ACL','CIDR reservations','Tags']}
 },
 's3-bucket':{
 name:'Amazon S3',nav:['General purpose buckets','Directory buckets','Access Grants','Access Points','Object Lambda Access Points','Multi-Region Access Points','Batch Operations','IAM Access Analyzer for S3','Block Public Access settings for this account','▾ Storage Lens','Dashboards','Storage Lens groups','AWS Organizations settings'],
 active:['General purpose buckets','General purpose buckets','General purpose buckets','General purpose buckets','General purpose buckets','General purpose buckets','General purpose buckets'],
 heading:['Create bucket','Create bucket','Create bucket','architect-lab-123456789012','Upload','hello.txt','architect-lab-123456789012'],
 crumb:[['Amazon S3','General purpose buckets','Create bucket'],['Amazon S3','Buckets','Create bucket'],['Amazon S3','Buckets','Create bucket'],['Amazon S3','General purpose buckets','architect-lab-123456789012'],['Amazon S3','Buckets','architect-lab-123456789012','Upload'],['Amazon S3','Buckets','architect-lab-123456789012','Objects','hello.txt'],['Amazon S3','Buckets','architect-lab-123456789012']],
 section:[['General configuration'],['Object Ownership','Block Public Access settings for this bucket'],['Bucket Versioning','Tags - optional','Default encryption','Advanced settings'],['Objects (0)'],['Files and folders (1)','Destination','Permissions','Properties'],['Object overview','Server-side encryption settings','Version ID'],['Objects (2)']],
 tabs:{3:['Objects','Metadata','Properties','Permissions','Metrics','Management','Access Points'],5:['Properties','Permissions','Versions'],6:['Objects','Properties','Permissions','Metrics','Management','Access Points']}
 },
 'rds-private-db':{
 name:'Amazon RDS',nav:['Dashboard','Databases','Query Editor','Performance insights','Snapshots','Exports in Amazon S3','Automated backups','Reserved instances','Proxies','Subnet groups','Parameter groups','Option groups','Custom engine versions','Zero-ETL integrations','Events','Event subscriptions','Recommendations','Certificate update'],
 active:['Subnet groups','Databases','Databases','Databases','Databases','Databases','Databases','Databases'],
 heading:['Create DB subnet group','Create database','Create database','Create database','Create database','Create database','architect-lab-db','architect-lab-db'],
 crumb:[['RDS','Subnet groups','Create DB subnet group'],['RDS','Databases','Create database'],['RDS','Databases','Create database'],['RDS','Databases','Create database'],['RDS','Databases','Create database'],['RDS','Databases','Create database'],['RDS','Databases','architect-lab-db'],['RDS','Databases','architect-lab-db']],
 section:[['Subnet group details','Add subnets to this DB subnet group'],['Creation method','Engine options','Templates'],['Availability and durability','Settings','Credentials management'],['Instance configuration','Storage'],['Connectivity'],['Additional configuration','Estimated costs'],['Endpoint & port','Networking'],['Summary','Delete DB instance']],
 tabs:{6:['Connectivity & security','Monitoring','Logs & events','Configuration','Maintenance & backups'],7:['Connectivity & security','Monitoring','Logs & events','Configuration','Maintenance & backups']}
 },
 'ec2-first-instance':{
 name:'EC2',nav:['EC2 Dashboard','Instances','Instance types','Launch Templates','AMIs','Key Pairs','Volumes','Snapshots','Security Groups','Network Interfaces','Elastic IPs'],active:['Instances','Instances','Instances','Instances','Instances','Instances','Instances','Instances','Instances'],
 heading:['Instances','Launch an instance','Launch an instance','Launch an instance','Launch an instance','Launch an instance','Instance details','Connect to instance','Instances'],
 crumb:[['EC2','Instances'],...Array.from({length:5},()=>['EC2','Instances','Launch an instance']),['EC2','Instances','architect-console-lab'],['EC2','Instances','Connect'],['EC2','Instances']],
 section:[['Instances'],['Name and tags','Application and OS Images (Amazon Machine Image)'],['Instance type','Key pair (login)'],['Network settings'],['Firewall (security groups)'],['Configure storage','Summary'],['Instance summary','Instance details','Security','Storage','Monitoring'],['Connect to instance','EC2 Instance Connect'],['Instance state','Terminate (delete) instance']],
 tabs:{6:['Details','Status checks','Security','Networking','Storage','Monitoring','Tags']}
 }
};
