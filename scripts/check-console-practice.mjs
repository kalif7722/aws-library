import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {expandedStages} from '../app/troubleshooting/simulators/aws/practice/expanded-spec.ts';
import {resourcePlans,initialResources,advanceResources,resourceAction} from '../app/troubleshooting/simulators/aws/practice/resource-state.ts';
const labs=JSON.parse(readFileSync(new URL('../app/troubleshooting/walkthroughs/labs.json',import.meta.url),'utf8'));
const auto=JSON.parse(readFileSync(new URL('../app/troubleshooting/simulators/aws/practice/auto-hotspots.json',import.meta.url),'utf8'));
assert.equal(labs.length,26);assert.equal(labs.reduce((n,l)=>n+l.screens.length,0),155);
for(const lab of labs){assert.ok(resourcePlans[lab.id],`resource plan ${lab.id}`);if(expandedStages[lab.id])assert.equal(expandedStages[lab.id].length,lab.screens.length,lab.id);
 for(const [index,screen] of lab.screens.entries()){const asset=screen.asset||`${lab.id}-${String(index+1).padStart(2,'0')}.svg`;assert.ok(existsSync(new URL(`../public/aws-console-walkthroughs/${asset}`,import.meta.url)),asset)}
 if(auto[lab.id])assert.equal(auto[lab.id].length,lab.screens.length)}
let s3=initialResources('s3-bucket');s3=advanceResources('s3-bucket',2,s3,{});s3=advanceResources('s3-bucket',4,s3,{});
assert.match(resourceAction(s3,'bucket','delete','architect-lab-123456789012').error,/dependent/i);
s3=resourceAction(s3,'object','delete','hello.txt').resources;
assert.equal(resourceAction(s3,'bucket','delete','architect-lab-123456789012').resources.find(x=>x.id==='bucket').status,'deleted');
let rds=advanceResources('rds-private-db',5,initialResources('rds-private-db'),{});
assert.match(resourceAction(rds,'database','delete','architect-lab-db').error,/protection/i);
rds=resourceAction(rds,'database','disable-protection','').resources;
assert.equal(resourceAction(rds,'database','delete','architect-lab-db').resources.find(x=>x.id==='database').status,'deleted');
let ebs=advanceResources('ebs-volume',1,initialResources('ebs-volume'),{});ebs=advanceResources('ebs-volume',2,ebs,{});
assert.match(resourceAction(ebs,'volume','delete','vol-0123456789abcdef0').error,/Detach/i);
ebs=resourceAction(ebs,'volume','detach','vol-0123456789abcdef0').resources;
assert.equal(ebs.find(x=>x.id==='volume').status,'available');
assert.equal(resourceAction(ebs,'volume','delete','vol-0123456789abcdef0').resources.find(x=>x.id==='volume').status,'deleted');
let kms=advanceResources('kms-key',4,[],{});
assert.match(resourceAction(kms,'key','delete','alias/lab-data-key').error,/scheduled/i);
assert.equal(resourceAction(kms,'key','schedule-deletion','alias/lab-data-key').resources[0].status,'pending deletion');
console.log('26 labs, 155 screens; asset, hotspot, persistence lifecycle and cleanup checks passed');
