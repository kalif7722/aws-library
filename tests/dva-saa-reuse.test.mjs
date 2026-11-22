import assert from 'node:assert/strict';
import test from 'node:test';
import links from '../app/components/DvaSaaReuseSourceLinks.json' with {type:'json'};
import lock from '../scripts/dva-saa-derivative-source-lock.json' with {type:'json'};
import dva from '../app/courses/aws-developer-associate/visual-plan.json' with {type:'json'};
import {resolveDvaSaaReuseAssets as resolve} from '../app/components/DvaSaaReuseAssets.ts';

test('production catalog resolves exactly the four approved stable source IDs and no DVA-owned derivatives', () => {
 const actual=Object.assign({},...dva.modules.map(m=>resolve(m.id,m.lessons)));
 assert.deepEqual(actual,Object.fromEntries(Object.entries(links).map(([id,l])=>[id,l.fallbackAsset])));
 assert.equal(Object.keys(actual).length,4);
 assert.equal(Object.keys(lock.derivatives).length,41);
 assert.ok(Object.keys(lock.derivatives).every(id=>!Object.hasOwn(actual,id)));
});

const id='dva-06-004';
const link=links[id];
const consumer={id,asset:link.fallbackAsset};
const asset='/course-visuals/saa-c03/module-06/slide-canon-v-next.webp';
const source={id:link.sourceId,asset,status:'reviewed'};
const sourcePlan=(lessons=[source])=>[{id:link.sourceModule,lessons}];

test('a reviewed SAA replacement follows stable ID without changing DVA ID or position',()=>{
 const sameTitleWrongId={...source,id:'different-id'};
 assert.deepEqual(resolve('06',[consumer],sourcePlan([sameTitleWrongId,source])),{[id]:asset});
});

test('withdrawn, missing, malformed, cross-course, or ambiguous source yields the original fallback',()=>{
 const unavailable=[[],sourcePlan([]),sourcePlan([{...source,status:'visual-review'}]),
  sourcePlan([{...source,asset:null}]),sourcePlan([{...source,asset:'//example.org/source.webp'}]),
  sourcePlan([{...source,asset:'/course-visuals/sap-c03/module-06/source.webp'}]),
  sourcePlan([{...source,asset:'/course-visuals/saa-c03/module-06/../bad.webp'}]),
  sourcePlan([{...source,asset:'/course-visuals/saa-c03/module-06/slide.webp?x=1'}]),
  sourcePlan([source,source]),[...sourcePlan(),...sourcePlan()]];
 for(const p of unavailable) assert.deepEqual(resolve('06',[consumer],p),{});
});

test('DVA lesson move or intentional new local art supersedes the mapping',()=>{
 assert.deepEqual(resolve('07',[consumer],sourcePlan()),{});
 assert.deepEqual(resolve('06',[{...consumer,asset:'/course-visuals/dva-c03/module-06/owned.webp'}],sourcePlan()),{});
});
