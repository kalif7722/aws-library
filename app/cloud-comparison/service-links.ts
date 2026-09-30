import {services as awsServices} from '../services/page';
import {azureUniqueServices} from '../azure-data';
import {gcpIcons,gcpServices} from '../gcp-data';
import {findAwsArchitectureIcon,awsIconSrc} from '../../lib/aws-architecture-icons';
import azureIcons from './azure-icon-map.json';

export type Vendor='aws'|'azure'|'gcp';
export type Link={name:string;href:string;icon?:string;external?:boolean};
const normalize=(s:string)=>s.toLowerCase().replace(/\([^)]*\)/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const azureIconMap=azureIcons as Record<string,string>;
const azureIconByName=new Map(Object.entries(azureIconMap).map(([name,file])=>[normalize(name),file]));
const azureIconBase='https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/azure-icons/';
const awsIconBase='https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev';
const extraAwsIcons:Record<string,string>={'AWS Batch':'Compute/Batch.png','AWS Direct Connect':'NetworkingContentDelivery/DirectConnect.png','Amazon Redshift':'Analytics/Redshift.png'};
const overrides:Record<Vendor,Record<string,string[]>>={
 aws:{'AWS App Runner / ECS on Fargate':['AWS App Runner','Amazon ECS','AWS Fargate'],'Amazon Aurora Global Database':['Amazon Aurora'],'Amazon SQS / EventBridge':['Amazon SQS','Amazon EventBridge'],'AWS Security Hub / Amazon GuardDuty':['AWS Security Hub','Amazon GuardDuty']},
 azure:{'Azure Virtual Machines':['Virtual Machines'],'Azure Kubernetes Service':['Azure Kubernetes Service (AKS)'],'Azure Batch':['Batch'],'Azure Managed Disks':['Azure Disk Storage'],'Azure Load Balancer / Application Gateway':['Azure Load Balancer','Azure Application Gateway'],'Azure SQL Database / Azure Database for PostgreSQL':['Azure SQL Database','Azure Database for PostgreSQL'],'Azure Cosmos DB for PostgreSQL':['Azure Cosmos DB'],'Azure Cosmos DB for MongoDB':['Azure Cosmos DB'],'Azure Cosmos DB for NoSQL':['Azure Cosmos DB'],'Microsoft Fabric Warehouse / Azure Synapse Analytics':['Microsoft Fabric','Azure Synapse Analytics'],'Azure Event Hubs':['Event Hubs'],'Azure AI Foundry':['Microsoft Foundry'],'Azure RBAC / Microsoft Entra ID':['Microsoft Entra ID (formerly Azure AD)'],'Azure Key Vault / Managed HSM':['Azure Key Vault'],'Azure Activity Log':['Azure Monitor'],'Azure Resource Manager / Bicep':['Azure Resource Manager','Azure Resource Manager templates'],'Azure API Management':['API Management'],'Azure Service Bus / Event Grid':['Service Bus','Event Grid'],'Azure Management Groups / Azure Policy':['Azure Resource Manager'],'Azure Storage Mover / Azure Data Box':['Azure Storage Mover','Azure Data Box'],'Azure Monitor Application Insights':['Azure Monitor']},
 gcp:{'Cloud Run functions':['Cloud Run'],'Google Cloud Batch':['Batch'],'Persistent Disk / Hyperdisk':['Compute Engine'],'Virtual Private Cloud':['Virtual Private Cloud (VPC)'],'Identity and Access Management':['Identity and Access Management (IAM)'],'Cloud Monitoring / Cloud Logging':['Monitoring','Logging'],'Cloud Audit Logs':['Logging'],'Infrastructure Manager':['Infra Manager'],'Dataflow / Cloud Data Fusion':['Dataflow','Cloud Data Fusion'],'Bigtable / Firestore':['Bigtable','Firestore'],'Cloud Tasks / Eventarc / Pub/Sub':['Cloud Tasks','Eventarc','Pub/Sub'],'API Gateway / Apigee':['API Gateway','Apigee'],'Resource Manager / Organization Policy':['Resource Manager'],'Memorystore for Redis Cluster / Memorystore for Valkey':['Memorystore for Redis Cluster','Memorystore for Valkey'],'Data Transfer Essentials / Transfer Appliance':['Data Transfer Essentials'],'Cloud Trace':['Trace']}
};
const specificIcons:Record<string,string>={
 'Cloud Run functions':'/assets/gcp-icons/legacy/cloud-functions.svg','Persistent Disk / Hyperdisk':'/assets/gcp-icons/legacy/persistent-disk.svg',
 'Google Cloud Batch':'/assets/gcp-icons/legacy/batch.svg','Cloud Audit Logs':'/assets/gcp-icons/legacy/cloud-audit-logs.svg',
 'Vertex AI':'/assets/gcp-icons/core/vertex-ai.svg','Cloud NGFW':'/assets/gcp-icons/legacy/cloud-firewall-rules.svg',
 'Resource Manager / Organization Policy':'/assets/gcp-icons/category/security-identity.svg',
 'Backup and DR Service':'/assets/gcp-icons/category/storage.svg',
 'Data Transfer Essentials / Transfer Appliance':'/assets/gcp-icons/legacy/data-transfer.svg'
};
export function serviceLinks(vendor:Vendor,display:string):Link[]{
 if(vendor==='gcp'&&display==='Vertex AI')return [{name:'Vertex AI',href:'https://cloud.google.com/vertex-ai/docs',icon:specificIcons['Vertex AI'],external:true}];
 if(vendor==='gcp'&&display==='Private Service Connect')return [{name:'Private Service Connect',href:'https://cloud.google.com/vpc/docs/private-service-connect',external:true}];
 if(vendor==='azure'&&display==='Azure RBAC / Microsoft Entra ID')return [{name:'Azure RBAC',href:'https://learn.microsoft.com/en-us/azure/role-based-access-control/overview',external:true},...serviceLinks('azure','Microsoft Entra ID (formerly Azure AD)')];
 const names=overrides[vendor][display]||[display];
 return names.map(name=>{
  if(vendor==='aws'){
   const service=awsServices.find(x=>normalize(x.name)===normalize(name));
   if(!service)return null;
   const icon=findAwsArchitectureIcon(name);
   const src=icon?awsIconSrc(icon):extraAwsIcons[name]?`/aws-icons/${extraAwsIcons[name]}`:undefined;
   return {name,href:`/services?service=${encodeURIComponent(name)}`,icon:src?.startsWith('/')?awsIconBase+src:src};
  }
  if(vendor==='azure'){
   const service=azureUniqueServices.find(x=>normalize(x.name)===normalize(name));
   if(!service)return null;
   const icon=azureIconMap[name]||azureIconByName.get(normalize(name))||({
    'Azure Disk Storage':'azure-disk-storage.svg','Azure SQL Database':'azure-sql-database.svg',
    'Azure Load Balancer':'azure-load-balancer.svg','Azure Application Gateway':'azure-application-gateway.svg',
    'Azure DNS':'azure-dns.svg','Azure Front Door':'azure-front-door.svg',
    'Azure ExpressRoute':'azure-expressroute.svg','Microsoft Fabric':'microsoft-fabric.svg',
    'Azure Synapse Analytics':'azure-synapse-analytics.svg','Azure Key Vault':'azure-key-vault.svg',
    'Azure Web Application Firewall':'azure-web-application-firewall.svg','Azure Firewall':'azure-firewall.svg',
    'Azure Monitor':'azure-monitor.svg','Azure Resource Manager':'azure-resource-manager.svg',
    'Azure Resource Manager templates':'azure-resource-manager.svg',
    'Azure Cosmos DB':'azure-cosmos-db.svg','Azure Database for PostgreSQL':'azure-database-for-postgresql.svg',
    'Microsoft Defender for Cloud':'microsoft-defender-for-cloud.svg','Azure Private Link':'azure-private-link.svg',
    'Azure Backup':'azure-backup.svg','Azure Site Recovery':'azure-site-recovery.svg',
    'Azure Container Registry':'azure-container-registry.svg','Azure Pipelines':'azure-pipelines.svg',
    'Azure Cache for Redis':'azure-managed-redis.svg','Azure Database Migration Service':'azure-database-migration-service.svg',
    'Azure Storage Mover':'azure-storage-mover.svg','Azure Data Box':'azure-data-box.svg',
  } as Record<string,string>)[name];
   return {name,href:`/azure-services?service=${service.slug}`,icon:icon?azureIconBase+icon:undefined};
  }
  if(name==='Firestore')return {name,href:'https://firebase.google.com/docs/firestore',icon:'/assets/gcp-icons/legacy/firestore.svg',external:true};
  const service=gcpServices.find(x=>normalize(x.displayName)===normalize(name));
  if(!service)return null;
  const mappedIcon=gcpIcons[service.slug];
  const icon=specificIcons[name]||specificIcons[display]||mappedIcon?.path;
  return {name,href:`/gcp-services?service=${service.slug}`,icon};
 }).filter(Boolean) as Link[];
}
