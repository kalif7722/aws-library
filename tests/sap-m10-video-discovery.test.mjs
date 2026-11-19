import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {discoveryPartIds,discoveredLectures,readyRequestedPart} from '../app/components/sap-video-discovery.mjs';

const old=[{id:'01',title:'Static lesson 1',start:1,end:3},{id:'02',title:'Static lesson 2',start:4,end:6}];
const ready=(title,start,end)=>({status:'ready',title,chapters:Array.from({length:end-start+1},(_,i)=>({slide:start+i}))});
test('M10 verifies exact candidate IDs through part 11 without duplicates; other modules retain six-ahead behavior',()=>{
  const expected=Array.from({length:11},(_,i)=>String(i+1).padStart(2,'0'));
  assert.deepEqual(discoveryPartIds('10',old,'09'),expected);
  assert.deepEqual(discoveryPartIds('10',old,'12'),[...expected,'12']);
  assert.deepEqual(discoveryPartIds('10',old,'9'),expected);
  assert.deepEqual(discoveryPartIds('10',old,'00'),expected);
  assert.deepEqual(discoveryPartIds('15',old,'99'),expected.slice(0,8));
});
test('M10 07–11 appear only after ready; keep manifest title, chapter bounds and sorted unique parts',()=>{
  const results={
    '01':ready('Do not duplicate the static part',1,3),
    '03':ready('Manifest 03',7,8),'05':{status:'processing'},
    '11':ready('Manifest 11',26,28),'09':ready('Manifest 09',21,23),
    '07':ready('Manifest 07',14,16),'08':ready('Manifest 08',17,20),
    '10':ready('Manifest 10',24,25),'06':{status:'ready',title:'Malformed',chapters:[]},
  };
  const entries=discoveredLectures(old,results);
  assert.deepEqual(entries.map(i=>i.id),['01','02','03','07','08','09','10','11']);
  assert.deepEqual(entries.find(i=>i.id==='09'),{id:'09',title:'Manifest 09',start:21,end:23});
  assert.equal(entries[0].title,old[0].title);
  assert.equal(readyRequestedPart('09',entries,results),'09');
  assert.equal(readyRequestedPart('05',entries,results),null);
  assert.equal(readyRequestedPart(null,entries,results),null);
});
test('link selection is non-autoplay and cannot override a manual choice; poster and published chapters survive',()=>{
  const source=fs.readFileSync(new URL('../app/components/SapVideoLectures.tsx',import.meta.url),'utf8');
  assert.match(source,/get\("part"\)/);
  assert.match(source,/if\(fromLink\)\{pendingRequestedPart.current=null;setActive\(fromLink\);\}/);
  assert.match(source,/const choose=\(id:string,autoPlay=false\)=>\{\s*pendingRequestedPart.current=null;/);
  assert.match(source,/parts.filter\(id=>!alreadyReady\[id\]\)/);
  assert.match(source,/ready\.chapters\[0\]\?\.slide\?\?selected.start/);
  assert.match(source,/slideUrl=source\(ch\.slide\)/);
});
