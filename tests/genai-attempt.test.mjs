import test from 'node:test';
import assert from 'node:assert/strict';
import {beginAttempt} from '../app/components/genai-labs/attempt.mjs';
import {createState,applyConfig,evaluate,SOLUTIONS,serviceAction} from '../app/components/genai-labs/engine.mjs';
test('all twelve entries discard solved saved resources and start broken in either mode',()=>{for(let lab=0;lab<12;lab++){let solved=applyConfig(createState(lab),SOLUTIONS[lab]);if(lab===5)solved=serviceAction(solved,'sync');if(lab===9)solved=serviceAction(solved,'prepare');if(lab===10){solved=serviceAction(solved,'guardrail-edit');solved=serviceAction(solved,'guardrail-attack');solved=serviceAction(solved,'guardrail-publish');}assert.equal(evaluate(solved).ok,true);for(const mode of ['guided','challenge']){const fresh=beginAttempt(lab,JSON.stringify({state:solved,mode,hint:true}));assert.deepEqual(fresh.state,createState(lab));assert.equal(evaluate(fresh.state).ok,false);assert.equal(fresh.mode,mode);assert.equal(fresh.hint,false)}}});
test('invalid saved data does not block a fresh broken attempt',()=>{assert.equal(beginAttempt(0,'{').mode,null);assert.equal(evaluate(beginAttempt(0,null).state).ok,false)});
