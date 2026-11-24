import type {Lesson} from './SapPublishedLessons';
import manifest from './sap-gallery-intros.json';

type Intro = {id:string;moduleId:string;beforeLessonId:string;title:string;asset:string;learningNotes:string[];decisionCue:string};
const intros:readonly Intro[]=manifest;
const idPattern=/^sap-(01|02|03|05|07)-service-intro-[a-z0-9-]+$/;
const assetPattern=/^\/course-visuals\/sap-c03\/module-(01|02|03|05|07)\/service-intro-[a-z0-9-]+-[a-f0-9]{12}\.webp$/;

export function sapGalleryLessons(moduleId:string, canonical:Lesson[], additions:readonly Intro[]=intros):Lesson[] {
 const knownIds=new Set(canonical.map(l=>l.id));
 const byAnchor=new Map<string,Lesson[]>();
 for(const intro of additions){
  if(intro.moduleId!==moduleId || !idPattern.test(intro.id) || intro.id.split('-')[1]!==moduleId || !assetPattern.test(intro.asset) || !intro.asset.includes('/module-'+moduleId+'/') || knownIds.has(intro.id))continue;
  const anchor=canonical.find(l=>l.id===intro.beforeLessonId&&l.moduleId===moduleId&&l.status==='qa-passed'&&!!l.asset);
  if(!anchor)continue;
  const lesson:Lesson={id:intro.id,moduleId,sequence:anchor.sequence,title:intro.title,asset:intro.asset,status:'qa-passed',learningNotes:intro.learningNotes,decisionCue:intro.decisionCue,examSkills:[]};
  knownIds.add(intro.id);
  const prior=byAnchor.get(anchor.id)??[];
  byAnchor.set(anchor.id,[...prior,lesson]);
 }
 return canonical.flatMap(l=>[...(byAnchor.get(l.id)??[]),l]);
}

export function isSapGalleryIntro(id:string):boolean { return idPattern.test(id); }

export function sapGalleryVisuals(lessons:Lesson[]):Lesson[] {
 return lessons.filter(l=>l.asset&&l.status==='qa-passed');
}

export function sapGalleryDeepLinkIndex(search:string, visuals:Lesson[]):number {
 const lesson=new URLSearchParams(search).get('lesson');
 return visuals.findIndex(l=>l.id===lesson);
}

export function sapGalleryPositionLabel(id:string, originalVisuals:Lesson[]):string {
 if(isSapGalleryIntro(id))return 'Service basics';
 const index=originalVisuals.findIndex(l=>l.id===id);
 return index<0?'':`${index+1}/${originalVisuals.length}`;
}
