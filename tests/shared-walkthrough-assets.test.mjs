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
