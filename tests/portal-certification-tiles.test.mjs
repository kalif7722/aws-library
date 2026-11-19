import assert from "node:assert/strict";
import fs from "node:fs";
import {stripTypeScriptTypes} from "node:module";
import test from "node:test";

const read=(file)=>fs.readFileSync(new URL("../app/"+file,import.meta.url),"utf8");
const importTs=async file=>import("data:text/javascript;base64,"+Buffer.from(stripTypeScriptTypes(read(file))).toString("base64"));
const {courseDirectory}=await importTs("courses/catalog.ts");
const {portalCertificationAsset,portalExamCode,portalCertificationHue}=await importTs("components/portalCertificationAssets.ts");

test("all 42 catalogued credentials have an exact asset or deliberate badge-free fallback",()=>{
  assert.equal(courseDirectory.length,42);
  const fallback=[];
  const assets=[];
  for(const c of courseDirectory){
    const code=portalExamCode(c.title);
    assert.ok(code,c.href);
    const src=portalCertificationAsset(c.cloud,code);
    if(src){
      assert.ok(["pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev","d1.awsstatic.com","images.credly.com"].includes(new URL(src).hostname));
      assets.push(src);
    }else fallback.push(code);
  }
  assert.equal(new Set(assets).size,41);
  assert.deepEqual(fallback,["PAA"]);
  assert.match(portalCertificationAsset("aws","SOA-C03"),/awsstatic.*cloudops-resized/);
  assert.match(portalCertificationAsset("gcp","AGWA"),/images\.credly\.com\/images\/2a0b01fd-/);
  assert.match(portalCertificationAsset("azure","AI-103"),/Azure%20AI%20Apps%20and%20Agents%20Developer\.webp$/);
  assert.match(portalCertificationAsset("gcp","PSOE"),/Security%20Operations%20Engineer\.webp$/);
  assert.equal(portalCertificationAsset("aws","constructor"),undefined);
  assert.equal(portalCertificationAsset("unlisted","SAP-C03"),undefined);
  assert.equal(courseDirectory.find(c=>portalExamCode(c.title)==="AZ-700").level,"ASSOCIATE");
  assert.equal(courseDirectory.find(c=>portalExamCode(c.title)==="AZ-140").level,"SPECIALTY");
});
test("home and directory both use images with neutral fallback, keep text, and have strong color contrast",()=>{
  const home=read("page.tsx"),catalog=read("components/PortalCourseDirectory.tsx"),badge=read("components/PortalCertificationBadge.tsx");
  const css=read("components/PortalCertificationBadge.css");
  for(const screen of [home,catalog]){
    assert.match(screen,/<PortalCertificationBadge cloud=\{/);
    assert.match(screen,/portal-certification-tile/);
    assert.match(screen,/portalCertificationHue\(code\)/);
  }
  assert.doesNotMatch(home,/courseArtwork/);assert.doesNotMatch(catalog,/subjectIcons/);
  assert.match(badge,/alt="" loading="lazy"/);assert.match(badge,/onError=\{\(\)=>setFailed\(src\)\}/);
  assert.match(badge,/portal-certification-code/);
  assert.match(css,/data-theme="light"/);assert.match(css,/focus-within/);assert.match(css,/object-fit:contain/);

  const rgb=(h,s,l)=>{const a=s*Math.min(l,1-l);const f=n=>{const k=(n+h/30)%12;return l-a*Math.max(-1,Math.min(k-3,9-k,1))};return [f(0),f(8),f(4)];};
  const luma=rgb=>rgb.map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0);
  const mix=(back,over,a)=>back.map((x,i)=>x*(1-a)+over[i]*a);
  const contrast=(a,b)=>(Math.max(luma(a),luma(b))+.05)/(Math.min(luma(a),luma(b))+.05);
  const check=(h,light)=>{
    const base=light?[1,1,1]:[20/255,34/255,58/255];
    const title=light?[23/255,41/255,65/255]:[242/255,245/255,1];
    const muted=light?[67/255,88/255,114/255]:[198/255,212/255,232/255];
    const ink=light?rgb(h,.74,.25):rgb(h,.82,.82);
    const glow=rgb(h,light?.84:.73,light?.65:.52),tail=rgb(h+(light?30:36),light?.77:.64,light?.63:.48);
    // Conservatively test both gradient layers at maximum opacity, and separately.
    for(const g of [0,light?.25:.28])for(const t of [0,light?.12:.11]){
      const bg=mix(mix(base,tail,t),glow,g);
      for(const [role,fg] of [["title",title],["body",muted],["accent text",ink]]) assert.ok(contrast(fg,bg)>=4.5,`hue ${h}, ${light?"light":"dark"}, ${role}: ${contrast(fg,bg)}`);
    }
  };
  for(const c of courseDirectory)for(const light of [false,true])check(portalCertificationHue(portalExamCode(c.title)),light);
});
