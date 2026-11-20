export const COURSE_MEDIA_ORIGIN="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
export const SAP_MEDIA_ROOT=COURSE_MEDIA_ORIGIN+"/aws-course-videos/previews/sap";

type ExactRelease={release:string;revision:string};

// Only releases with immutable artifacts verified in storage. Confirm ordinary
// learner media access before deploying changes to this list.
const EXACT_RELEASES:Readonly<Record<string,ExactRelease>>={
  "02/05":{release:"2026-11-20-m02p05-fresh-animation-v1",revision:"2026-11-20-m02p05-fresh-animation-v1"},
  "03/01":{release:"2026-11-20-m03p01-approved-animation-v1",revision:"2026-11-20-m03p01-approved-animation-v1"},
  "03/04":{release:"2026-11-20-m03p04-approved-animation-v1",revision:"2026-11-20-m03p04-approved-animation-v1"},
  "03/06":{release:"2026-11-20-m03p06-approved-animation-v1",revision:"2026-11-20-m03p06-approved-animation-v1"},
};

export function exactSapVideoRelease(moduleId:string,part:string):ExactRelease|undefined{
  return EXACT_RELEASES[moduleId+"/"+part];
}

export function sapVideoReleasePrefix(moduleId:string,part:string,release:string){
  return `${SAP_MEDIA_ROOT}/module-${moduleId}/releases/${release}/part-${part}/sap-module-${moduleId}-part-${part}`;
}

export function isExactSapCaptionSource(source:URL):boolean{
  if(source.origin!==COURSE_MEDIA_ORIGIN||source.username||source.password||source.hash)return false;
  return Object.entries(EXACT_RELEASES).some(([key,value])=>{
    const [moduleId,part]=key.split("/");
    const prefix=sapVideoReleasePrefix(moduleId,part,value.release);
    return source.href===`${prefix}.vtt?v=${encodeURIComponent(value.revision)}`;
  });
}
