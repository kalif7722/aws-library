// Only these repository-owned tracks may bypass the existing remote-caption proxy.
const REVISION = "2026-11-20-approved-animation-v1";
const ROOT = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/sap";
const TRACKS = Object.freeze({
  "01": "/course-captions/sap/module-02/2026-11-20-approved-animation-v1/part-01.vtt",
  "02": "/course-captions/sap/module-02/2026-11-20-approved-animation-v1/part-02.vtt",
  "04": "/course-captions/sap/module-02/2026-11-20-approved-animation-v1/part-04.vtt",
  "07": "/course-captions/sap/module-02/2026-11-20-approved-animation-v1/part-07.vtt"
});
export function reviewedM02Caption(module, part, revision, videoUrl) {
  if (module !== "02" || revision !== REVISION || !Object.hasOwn(TRACKS, part)) return null;
  const expected = `${ROOT}/module-02/releases/${REVISION}/part-${part}/sap-module-02-part-${part}.mp4?v=${REVISION}`;
  return videoUrl === expected ? TRACKS[part] : null;
}
export function courseCaptionRequestUrl(src) {
  return Object.values(TRACKS).includes(src)
    ? src
    : "/api/course-video-captions?src=" + encodeURIComponent(src);
}
