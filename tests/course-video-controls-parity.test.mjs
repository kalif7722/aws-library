import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=(path)=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const controls=read("app/components/CourseVideoControls.tsx");
const aip=read("app/components/AipVideoLectures.tsx");
const aif=read("app/components/AifVideoLectures.tsx");

test("AIP and AIF use the exact same standard playback control component",()=>{
  assert.match(aip,/import CourseVideoControls/);
  assert.match(aif,/import CourseVideoControls/);
  assert.match(aip,/<CourseVideoControls\b/);
  assert.match(aif,/<CourseVideoControls\b/);
  for(const prop of ["onTogglePlayback","onSkip","onSeek","onChangeSpeed","onToggleCaptions",
    "onToggleMute","onVolume","onPrevious","onNext","onFullscreen","onMarkComplete"]){
    assert.ok(controls.includes(prop),`Shared controls missing ${prop}`);
    assert.ok(aip.includes(prop+"="),`AIP fails to wire ${prop}`);
    assert.ok(aif.includes(prop+"="),`AIF fails to wire ${prop}`);
  }
});

test("Shared controls include 5-second skips, captions, volume, speed and accessible navigation",()=>{
  assert.match(controls,/onSkip\(-5\)/);
  assert.match(controls,/onSkip\(5\)/);
  assert.match(controls,/Rewind 5 seconds/);
  assert.match(controls,/Forward 5 seconds/);
  assert.match(controls,/Video playback position/);
  assert.match(controls,/Video playback speed/);
  assert.match(controls,/Turn on captions/);
  assert.match(controls,/Volume/);
  assert.match(controls,/Previous video/);
  assert.match(controls,/Next video/);
  assert.match(controls,/Fullscreen with navigation/);
  assert.match(controls,/Mark this video complete/);
  assert.match(controls,/COURSE_VIDEO_SPEEDS = \[0\.75,1,1\.25,1\.5,1\.75,2\]/);
});

test("Fullscreen works at the stage level with auto-hiding HUD and accessible arrows",()=>{
  assert.match(aif,/requestFullscreen\(\)/);
  assert.match(aif,/document\.exitFullscreen\(\)/);
  assert.match(aif,/fullscreenchange/);
  assert.match(aif,/onPointerMove=\{trackHud\}/);
  assert.match(aif,/aif-video-stage:fullscreen\[data-hud="visible"\] \.cv-controls/);
  assert.match(aif,/aif-video-fullscreen-nav/);
  assert.match(aif,/onKeyDown=\{handleKeyboard\}/);
  assert.match(aip,/onPointerMove=\{trackFullscreenPointer\}/);
  assert.match(aip,/document\.exitFullscreen\(\)/);
});

test("Both courses share playback-speed and auto-next preferences",()=>{
  assert.match(controls,/COURSE_VIDEO_SPEED_KEY = "course-video-playback-speed:v1"/);
  assert.match(controls,/COURSE_VIDEO_AUTO_NEXT_KEY = "course-video-auto-next:v1"/);
  assert.match(aip,/const PLAYBACK_SPEED_KEY = COURSE_VIDEO_SPEED_KEY/);
  assert.match(aip,/const AUTO_NEXT_KEY = COURSE_VIDEO_AUTO_NEXT_KEY/);
  assert.match(aif,/localStorage\.getItem\(COURSE_VIDEO_SPEED_KEY\)/);
  assert.match(aif,/const AUTO_NEXT_KEY=COURSE_VIDEO_AUTO_NEXT_KEY/);
  assert.match(aif,/onEnded=\{finish\}/);
  assert.match(aif,/if\(autoNext&&hasNext\)selectNext\(\)/);
});

test("AIF keeps real R2 verification and original slides while sharing controls",()=>{
  const api=read("app/api/aif-video/route.ts");
  const page=read("app/courses/aws-ai-practitioner/visual/[moduleId]/page.tsx");
  assert.match(api,/manifest\.script_revision !== config\.revision/);
  assert.match(api,/method:"HEAD"/);
  assert.match(aif,/results\[active\]/);
  assert.match(aif,/ready&&!mediaError/);
  assert.match(aif,/\/course-visuals\/aif-course\/module-/);
  assert.match(page,/<AifVideoLectures moduleId=\{id\}/);
  assert.match(page,/<AifModuleLessons key=\{id\}/);
});
