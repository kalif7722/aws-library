import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,applyConfig,SOLUTIONS} from '../app/components/genai-labs/engine.mjs';
import {logEvidence} from '../app/components/genai-labs/log-evidence.mjs';
test('all twelve incidents emit inspectable correlated application records',()=>{for(let i=0;i<12;i++){const s=createState(i),rows=logEvidence(s);assert.equal(rows.length,2);const parsed=rows.map(r=>JSON.parse(r.message));assert.equal(parsed[0].requestId,parsed[1].requestId);assert.ok(parsed[1].stage);assert.ok(!('checks' in parsed[1]));}});
test('request schema and parser failures remain separate evidence',()=>{let s=createState(1);assert.equal(JSON.parse(logEvidence(s)[1].message).httpStatus,400);s=applyConfig(s,SOLUTIONS[1]);const record=JSON.parse(logEvidence(s)[1].message);assert.equal(record.httpStatus,200);assert.equal(record.response.output.message.content[0].text,'Hello! How can I help you?');});
test('ingestion evidence does not pretend to flush the app cache',()=>{const s={...createState(5),indexedVersion:18,syncStatus:'COMPLETE'};const record=JSON.parse(logEvidence(s)[1].message);assert.equal(record.indexedVersion,18);assert.equal(record.cachePolicyVersion,16);});
