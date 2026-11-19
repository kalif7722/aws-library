const M10_RELEASE_CANDIDATES=["03","04","05","06","07","08","09","10","11"];
export const isPartId=id=>typeof id==="string"&&/^(?:0[1-9]|[1-9][0-9])$/.test(id);

export function discoveryPartIds(moduleId,known,requestedPart){
  const ids=known.map(item=>item.id);
  if(moduleId==="10"){
    // These are candidate IDs, not playlist entries. Only the API can
    // promote a candidate after checking its published artifacts.
    ids.push(...M10_RELEASE_CANDIDATES);
    if(isPartId(requestedPart))ids.push(requestedPart);
  }else{
    const last=Math.max(0,...ids.map(Number));
    for(let n=last+1;n<=Math.min(last+6,99);n++)ids.push(String(n).padStart(2,"0"));
  }
  return [...new Set(ids)].sort((a,b)=>Number(a)-Number(b));
}

export function discoveredLectures(known,results){
  const byId=new Map(known.map(item=>[item.id,item]));
  for(const [id,value] of Object.entries(results)){
    if(byId.has(id)||!isPartId(id)||value?.status!=="ready"||!value.title||!Array.isArray(value.chapters)||!value.chapters.length)continue;
    const start=value.chapters[0].slide,end=value.chapters[value.chapters.length-1].slide;
    if(!Number.isInteger(start)||!Number.isInteger(end)||start>end)continue;
    byId.set(id,{id,title:value.title,start,end});
  }
  return [...byId.values()].sort((a,b)=>Number(a.id)-Number(b.id));
}

export function readyRequestedPart(requestedPart,entries,results){
  return requestedPart&&entries.some(item=>item.id===requestedPart)&&results[requestedPart]?.status==="ready"
    ?requestedPart:null;
}
