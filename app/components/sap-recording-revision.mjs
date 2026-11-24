const LEGACY_REVISION="2026-11-23-sap-through-m08-v1";
const LEGACY_VIDEO_SHA={
 "03":"91917287ee945398fb1fe93422311c444068e719e59552f16ccf6af2b075319c",
 "05":"d284290475f98eb6035f6d74ac609f910e29fc57f246f5fa3eae85f761b27c01",
};
const CHANGES={
 "03":[[12,"sap-02-012","93c9b0932edf"],[13,"sap-02-013","9a618c380ac4"]],
 "05":[[18,"sap-02-018","70093a2c017e"],[22,"sap-02-022","b18acb8ad58a"]],
};
const MODULE_ROUTE="/courses/aws-solutions-architect-professional/visual/module-02";

export function legacyRecordingLinks(moduleId,part,ready,slideAssets){
 if(moduleId!=="02"||!Object.hasOwn(CHANGES,part)||ready?.status!=="ready"||ready.revision!==LEGACY_REVISION)return [];
 let source;
 try{source=new URL(ready.videoUrl);}catch{return [];}
 if(source.origin!=="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev"||
    source.pathname!==`/aws-course-videos/previews/sap/module-02/part-${part}/sap-module-02-part-${part}.mp4`||
    source.searchParams.get("sha")!==LEGACY_VIDEO_SHA[part])return [];
 const rows=CHANGES[part];
 if(!rows.every(([slide,id,hash])=>slideAssets?.[slide]===`/course-visuals/sap-c03/module-02/${id}-fact-fix-${hash}.webp`&&ready.chapters?.some(chapter=>chapter.slide===slide)))return [];
 return rows.map(([slide,id])=>({slide,href:`${MODULE_ROUTE}?lesson=${id}#visual-lessons`}));
}
