export type PracticeLab={id:string;service:string;title:string;section:string;screens:readonly unknown[]};
export function resolvePracticeView<T extends PracticeLab>(labs:readonly T[],id:string,requestedStep:number){
 if(!labs.length)throw Error('No practice labs configured');
 const lab=labs.find(item=>item.id===id)??labs[0];
 const safeStep=Math.min(Math.max(Number.isFinite(requestedStep)?Math.trunc(requestedStep):0,0),Math.max(0,lab.screens.length-1));
 return {lab,safeStep};
}
export function findPracticeLabs<T extends PracticeLab>(labs:readonly T[],query:string){
 const needle=query.trim().toLowerCase();
 if(!needle)return [];
 return labs.filter(item=>`${item.service} ${item.title} ${item.section} ${item.id}`.toLowerCase().includes(needle));
}
