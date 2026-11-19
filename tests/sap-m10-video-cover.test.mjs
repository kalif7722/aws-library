import assert from 'node:assert/strict';
import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
import test from 'node:test';
const staged=process.env.SAP_M10_VIDEO_COVER_PATCH_BASE;
const rel='courses/aws-solutions-architect-professional/visual-lesson-map.json';
const read=path=>fs.readFileSync(new URL('../app/'+path,import.meta.url),'utf8');
const original=path=>staged?fs.readFileSync(staged+'/app/'+path,'utf8'):read(path);
const resolver=original('components/SapPublishedLessons.ts');
const plan=original(rel);
const source=read('components/SapVideoLectures.tsx'),page=read('courses/aws-solutions-architect-professional/visual/[moduleId]/page.tsx');
const moduleMapImport="import plan from '../courses/aws-solutions-architect-professional/visual-lesson-map.json';";
const executableResolver=stripTypeScriptTypes(resolver.replace(moduleMapImport,'const plan='+plan+';'));
const {publishedModuleLessons}=await import('data:text/javascript;base64,'+Buffer.from(executableResolver).toString('base64'));

const mapExpr=page.match(/const slideAssets=([\s\S]*?):undefined;/)?.[1];
const sourceExpr=source.match(/const source=([^\r\n]+);/)?.[1];
const posterExpr=source.match(/\bposter=\{([^{}]+)\}/)?.[1];
assert.ok(mapExpr&&sourceExpr&&posterExpr);
const moduleProps=new Function('id','publishedModuleLessons','return ('+stripTypeScriptTypes(mapExpr+':undefined')+')');
const chapterSource=(id,assets)=>new Function('moduleId','slideAssets','return '+stripTypeScriptTypes(sourceExpr))(id,assets);
const poster=new Function('moduleId','ready','selected','source','return '+posterExpr);
const prefix='/course-visuals/sap-c03/module-10/';

test('SAP module 10 released first chapters resolve to exact gallery assets',()=>{
 const assets=moduleProps('10',publishedModuleLessons), url=chapterSource('10',assets);
 for(const [part,n,file] of [
  ['01',1,'slide-01-aip-v3.webp'],['02',4,'slide-04-aip-v3.webp'],
  ['03',7,'slide-07-v2.webp'],['04',9,'slide-09-v2.webp'],['05',10,'slide-10-v2.webp'],
  ['06',11,'slide-11-aip-v4.webp'],['07',14,'slide-14-v2.webp'],['08',17,'slide-17-v2.webp'],
  ['09',21,'slide-21-v2.webp'],['10',24,'slide-24-v2.webp'],['11',26,'slide-26-v2.webp'],['12',29,'slide-29-v2.webp'],
 ]){
  assert.equal(poster('10',{chapters:[{slide:n}]},{start:2},url),prefix+file,part);
  assert.equal(url(n),prefix+file,part);
 }
 assert.equal(url(16.5),undefined);
 assert.equal(poster('10',{chapters:[{slide:999}]},{start:1},url),undefined);
 assert.match(page,/<SapVideoLectures moduleId=\{id\} slideAssets=\{slideAssets\}\/>/);
 assert.match(source,/slideUrl=source\(ch\.slide\)/);
});

test('other modules keep legacy chapter images; playback and captions unchanged',()=>{
 for(const [id,n,path] of [['00',1,'slide-01.webp?v=sap-m00-cover-v2'],['04',8,'slide-08-v2.webp'],['07',27,'slide-27-v3.webp'],['09',34,'slide-34-v2.webp'],['15',1,'slide-01.webp']]){
  const assets=moduleProps(id,publishedModuleLessons);assert.equal(assets,undefined);
  assert.equal(poster(id,{chapters:[{slide:3}]},{start:n},chapterSource(id,assets)),`/course-visuals/sap-c03/module-${id}/${path}`);
 }
 assert.match(source,/<source src=\{ready\.videoUrl\} type="video\/mp4"\/>/);
 assert.match(source,/<track src=\{ready\.captionsUrl\}/);
 assert.match(source,/CourseVideoCaptions src=\{ready\.captionsUrl\}/);
});
