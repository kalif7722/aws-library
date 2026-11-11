import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const workflows=[
  "render-aip-m03-parts-01-03.yml",
  "render-aip-m03-parts-04-06.yml",
  "render-aip-m03-parts-07-08.yml",
  "render-aip-m02-parts-01-02.yml",
  "render-aip-m02-parts-03-04.yml",
  "render-aip-m02-parts-05-08.yml",
  "render-aip-m02-parts-09-10.yml",
  "render-aip-m02-parts-11-12.yml",
  "render-aip-m02-parts-13-15.yml",
  "render-aip-m02-parts-16-19.yml",
  "retry-aip-m02-parts-06-08.yml",
];

for(const name of workflows){
  test(`${name}: artifact outages cannot prevent R2 video release`,()=>{
    const text=readFileSync(new URL(`../.github/workflows/${name}`,import.meta.url),"utf8");
    assert.match(text,/name: Save optional GitHub preview artifact/);
    assert.match(text,/if: \$\{\{ vars\.AIP_UPLOAD_GITHUB_PREVIEW == 'true' \}\}/);
    assert.match(text,/continue-on-error: true\s+uses: actions\/upload-artifact@v4/);
    assert.match(text,/name: Publish only verified files to Cloudflare R2[\s\S]*?id: media/);
    assert.match(text,/name: Register uploaded video without a Git rebase/);
    assert.match(text,/echo "::error::Missing R2 credentials;/);
    assert.doesNotMatch(text,/echo "uploaded=false"/);
    // Audio checkpointing remains active even with preview artifacts disabled.
    assert.match(text,/uses: actions\/cache\/restore@v4/);
    assert.match(text,/uses: actions\/cache\/save@v4/);
  });
}

test("M03 renders rerun after a workflow hotfix; M02 successful media is not needlessly rerendered",()=>{
  for(const name of workflows){
    const content=readFileSync(new URL(`../.github/workflows/${name}`,import.meta.url),"utf8");
    if(name.includes("m03-")){
      assert.ok(content.includes(`- ".github/workflows/${name}"`),name);
    }else{
      assert.ok(!content.includes(`- ".github/workflows/${name}"`),name);
      assert.match(content,/workflow_dispatch:/);
    }
  }
});
