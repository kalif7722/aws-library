import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

for (let part=1;part<=13;part++) {
  const suffix=String(part).padStart(2,"0");
  const path=new URL(`../content/video-narration/aip-module-06-part-${suffix}.json`,import.meta.url);
  const manifest=JSON.parse(readFileSync(path,"utf8"));
  test(`AIP M06 Part ${suffix}: avoid templated spoken conclusions`,()=>{
    assert.ok(manifest.scenes.length>0);
    const endings=new Map();
    for(const scene of manifest.scenes){
      assert.ok(scene.narration.split(/\s+/).length>=100,`slide ${scene.slide}: too short`);
      const normalized=scene.narration.trim().replace(/\s+/g," ").toLowerCase();
      const tail=normalized.split(" ").slice(-18).join(" ");
      assert.ok(!endings.has(tail),`Repeated 18-word ending in slides ${endings.get(tail)} and ${scene.slide}`);
      endings.set(tail,scene.slide);
    }
  });
}
