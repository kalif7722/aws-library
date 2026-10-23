import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../app/api/course-visuals/route.ts', import.meta.url),'utf8');
const map = JSON.parse(readFileSync(new URL('../app/courses/aws-generative-ai-developer-professional/visual-lesson-map.json', import.meta.url),'utf8'));
const code = ts.transpile(source.replace(/^import visualMap.*;$/m,`const visualMap = ${JSON.stringify(map)};`).replace('export async function GET','async function GET'), {target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None});
test('discovers all 129 uploads in bounded requests, including gaps and nested folders', async () => {
  let calls=0;
  const fakeFetch=async url=>{
    calls++;
    const n=Number(url.match(/slide-(\d+)\.webp/)[1]);
    const nested=url.includes('module-02/module-02/');
    return new Response(null,{status:n<=129 && (n%2===0 ? nested : !nested) ? 200:404});
  };
  const get=new Function('fetch',code+';return GET;')(fakeFetch);
  let start=1; const slides=[];
  do {
    calls=0;
    const response=await get(new Request(`https://example.test/api?module=02&start=${start}`));
    const result=await response.json();
    assert.equal(response.headers.get('Cache-Control'),'no-store, max-age=0');
    assert.ok(calls<=24,`Request used ${calls} subrequests`);
    slides.push(...result.availableSlides);
    start=result.nextStart;
  }while(start!==null);
  assert.deepEqual(slides,Array.from({length:129},(_,i)=>i+1));
  assert.equal((await get(new Request('https://example.test/api?module=02&start=NaN'))).status,400);
});
test('failed gateway responses stay within request budget and remain retryable',async()=>{
  let calls=0;
  const get=new Function('fetch',code+';return GET;')(async()=>{calls++;return new Response(null,{status:503});});
  const data=await (await get(new Request('https://example.test/api?module=02'))).json();
  assert.equal(data.failedChecks,6);
  assert.equal(calls,24);
  assert.equal(data.nextStart,7);
});
