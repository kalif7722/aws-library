import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createServer} from 'vite';
const vite=await createServer({configFile:false,server:{middlewareMode:true,hmr:false}});
after(()=>vite.close());
const {sharedWalkthroughPath:path,sharedWalkthroughCandidates:candidates}=await vite.ssrLoadModule('/app/components/SharedServiceWalkthrough.tsx');
test('long catalog names retain their uploaded walkthrough aliases',()=>{
 assert.equal(path('Amazon Elastic Container Service (Amazon ECS)'),'/aws-certification-walkthroughs/amazon-ecs.webp');
 assert.equal(path('Audit Manager'),'/aws-certification-walkthroughs/aws-audit-manager.webp');
 assert.equal(path('AWS Key Management Service (AWS KMS)'),'/aws-certification-walkthroughs/kms.webp');
});
test('known analytics walkthroughs retain real bundled image fallbacks',()=>{
 for(const service of ['Amazon Athena','AWS Glue','Amazon EMR','Amazon Kinesis','Amazon Kinesis Data Streams','Amazon Data Firehose','Amazon OpenSearch Service','Amazon QuickSight','Amazon Managed Streaming for Apache Kafka','AWS AppSync','AWS Data Exchange','AWS Lake Formation','Amazon AppFlow','Amazon Managed Service for Apache Flink','Amazon EventBridge']){
  const local=candidates(service).find(src=>src.startsWith('/assets/demos/'));
  assert.ok(local,service);assert.ok(fs.existsSync(new URL('../public'+local,import.meta.url)),service+' fallback must exist');
 }
});
test('alternate format candidates preserve the same service identity',()=>{
 const urls=candidates('AWS Config');assert.equal(urls.length,new Set(urls).size);
 assert.ok(urls.some(url=>url.endsWith('/aws-config.webp')));assert.ok(urls.some(url=>url.endsWith('/aws-config.png')));
 assert.ok(urls.every(url=>!url.includes('undefined')));
});
test('screenshot-confirmed naming differences select their exact root object keys',()=>{
 const expected={'AWS App Runner':'amazon-app-runner','AWS HealthLake':'amazon-healthlake','Amazon FSx for NetApp ONTAP':'amazon-fsx-for-netapp','Amazon EC2 Auto Scaling':'amazon-ec2-auto-scaling','Amazon Quick':'amazon-quick-sight','Amazon Managed Workflows for Apache Airflow':'amazon-mwaa'};
 for(const [service,stem] of Object.entries(expected))assert.equal(path(service),`/aws-certification-walkthroughs/${stem}.webp`);
 const msk=candidates('Amazon Managed Streaming for Apache Kafka');
 assert.ok(msk.some(src=>src.endsWith('/amazon-msk.webp')));
});
test('all 321 catalog services map to root service assets without task-folder leakage',()=>{
 const inventory=JSON.parse(fs.readFileSync(new URL('../docs/AWS_CONSOLE_WALKTHROUGH_MAPPING.json',import.meta.url),'utf8'));
 assert.equal(inventory.services.length,321);
 for(const {service,path:expected} of inventory.services){
  assert.equal(path(service),expected);
  for(const url of candidates(service)){assert.doesNotMatch(url,/tasks\/|task-\d/);assert.doesNotMatch(url,/undefined|\.\.\//);}
 }
});
test('renamed services retain their original same-service filename as fallback',()=>{
 for(const [service,old] of [['AWS App Runner','aws-app-runner'],['AWS HealthLake','aws-healthlake'],['Amazon FSx for NetApp ONTAP','amazon-fsx-for-netapp-ontap']])assert.ok(candidates(service).some(url=>url.endsWith('/'+old+'.webp')));
});
test('full supplied inventory resolves Health and Private CA to observed filenames',()=>{
 for(const name of ['AWS Health','AWS Health Dashboard'])assert.equal(path(name),'/aws-certification-walkthroughs/aws-health-dashboard.webp');
 for(const name of ['AWS Private CA','AWS Private Certificate Authority'])assert.equal(path(name),'/aws-certification-walkthroughs/aws-private-certificate-authority.webp');
 const inventory=JSON.parse(fs.readFileSync(new URL('../docs/AWS_CONSOLE_WALKTHROUGH_MAPPING.json',import.meta.url),'utf8'));
 assert.equal(inventory.observedFilenames.length,261);
 assert.equal(inventory.uploadedObjects.length,266);
 for(const file of inventory.uploadedObjects.filter(o=>o.provider==='aws')){
  const display=file.filename.slice(0,-5).replace(/-/g,' ');
  assert.ok(candidates(display).some(url=>url.endsWith(file.path)),file.filename);
 }
});
test('five Azure files in AWS root are explicitly mapped without broad cross-vendor fallback',async()=>{
 const {azureWalkthroughUrls}=await vite.ssrLoadModule('/app/components/AzureServiceLearningDetails.tsx');
 const expected={'Azure Confidential Ledger':'azure-confidential-ledger','Data Factory':'azure-data-factory','Azure HorizonDB':'azure-horizondb','Azure Managed Instance for Apache Cassandra':'azure-managed-instance-apache-cassandra','Table Storage':'azure-table-storage'};
 for(const [name,stem] of Object.entries(expected))assert.ok(azureWalkthroughUrls(name,'AZ-104','Databases')[0].endsWith('/aws-certification-walkthroughs/'+stem+'.webp'),name);
 assert.ok(azureWalkthroughUrls('Azure Monitor').every(url=>!url.includes('/aws-certification-walkthroughs/')));
});
