import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import ts from "typescript";

const player=readFileSync(new URL("../app/components/AipVideoLectures.tsx",import.meta.url),"utf8");
const hook=readFileSync(new URL("../app/components/useAipVideoWatchProgress.ts",import.meta.url),"utf8");

test("AIP video player JSX and progress hook TypeScript parse cleanly",()=>{
  for(const [name,source,kind] of [
    ["AipVideoLectures.tsx",player,ts.ScriptKind.TSX],
    ["useAipVideoWatchProgress.ts",hook,ts.ScriptKind.TS],
  ]){
    const file=ts.createSourceFile(name,source,ts.ScriptTarget.Latest,true,kind);
    const problems=file.parseDiagnostics.map(d=>ts.flattenDiagnosticMessageText(d.messageText," "));
    assert.deepEqual(problems,[],`Source parsing failed: ${name}: ${problems.join("; ")}`);
  }
});

test("custom controls replace browser native fullscreen and include transport controls",()=>{
  assert.match(player,/controls=\{false\}/);
  assert.match(player,/className="av-custom-controls"/);
  assert.match(player,/className="av-fullscreen-nav"/);
  assert.match(player,/aria-label="Rewind 5 seconds"/);
  assert.match(player,/aria-label="Forward 5 seconds"/);
  assert.match(player,/aria-label=\{fullscreen\?"Exit fullscreen":"Fullscreen with navigation"\}/);
  assert.match(player,/\.av-main:fullscreen \.av-video-stage/);
  assert.match(player,/\.av-main:fullscreen \.av-custom-controls/);
});

test("learner-directed completion marks video and slides regardless of time watched",()=>{
  assert.match(player,/onEnded=\{\(\)=>\{\s*watch\.onEnded\(\)/);
  assert.match(player,/if\(end>0 && destination>=end-0\.15\)watch\.markComplete\(\)/);
  assert.match(player,/className="av-mark-complete" onClick=\{completeManually\}/);
  assert.match(hook,/const onEnded=useCallback\(\(\)=>\{\s*last\.current=null;\s*markComplete\(\)/);
  assert.match(hook,/aipVideoCompletionIds\(moduleId,partId\?\?'00',chapters\.map/);
});

test("fullscreen lecture navigation and saved positions remain wired",()=>{
  assert.match(player,/onPrevious=\{prev \? \(\) => choose\(prev\.id,true\) : undefined\}/);
  assert.match(player,/onNext=\{next \? \(\) => choose\(next\.id,true\) : undefined\}/);
  assert.match(player,/persistPosition\(destination\)/);
  assert.match(player,/watch\.onSeeked\(destination\)/);
  assert.match(player,/onLoadedMetadata=\{event=>/);
});


test("playback speed preference is saved and applied to every new video",()=>{
  assert.match(player,/const PLAYBACK_SPEED_KEY = "aip-video-playback-speed:v1"/);
  assert.match(player,/\[0\.75,1,1\.25,1\.5,1\.75,2\] as const/);
  assert.match(player,/aria-label="Video playback speed"/);
  assert.match(player,/localStorage\.setItem\(PLAYBACK_SPEED_KEY,String\(value\)\)/);
  assert.match(player,/video\.playbackRate=rate/);
  assert.match(player,/if\(player\.current\)player\.current\.playbackRate=value/);
  assert.match(player,/\.av-main:fullscreen \.av-custom-controls/);
});


test("fullscreen titles and controls fade out when idle and reveal at pointer edges",()=>{
  assert.match(player,/const \[hudZone,setHudZone\]=useState/);
  assert.match(player,/if\(fullscreen\)revealHud\("all",2600\)/);
  assert.match(player,/if\(y<145\)revealHud\("top"\)/);
  assert.match(player,/y>area\.height-175\)revealHud\("bottom"\)/);
  assert.match(player,/x<135\|\|x>area\.width-135\)revealHud\("sides"\)/);
  assert.match(player,/\.av-main:fullscreen \.av-main-top\{position:absolute/);
  assert.match(player,/\.av-main:fullscreen \.av-custom-controls\{position:absolute/);
  assert.match(player,/\.av-main:fullscreen \.av-fullscreen-nav\{padding:0 18px/);
  assert.match(player,/\.av-main:fullscreen:is\(\.av-fs-all,\.av-fs-bottom\) \.av-custom-controls/);
  assert.match(player,/\.av-main:fullscreen:is\(\.av-fs-all,\.av-fs-top\) \.av-main-top/);
  assert.match(player,/\.av-main:fullscreen:is\(\.av-fs-all,\.av-fs-sides\) \.av-fullscreen-nav/);
  assert.match(player,/onPointerDown=\{event=>\{if\(fullscreen&&event\.pointerType==="touch"\)revealHud/);
  assert.match(player,/onFocus=\{\(\)=>\{if\(fullscreen\)revealHud/);
});
