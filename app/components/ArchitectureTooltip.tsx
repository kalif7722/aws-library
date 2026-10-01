"use client";

import {useEffect,useState} from "react";

type Tip={text:string;provider:string;left:number;top:number;below:boolean}|null;

export default function ArchitectureTooltip(){
  const [tip,setTip]=useState<Tip>(null);
  useEffect(()=>{
    let active:HTMLElement|null=null;
    const show=(target:HTMLElement)=>{
      const text=target.dataset.architectureDetail;
      if(!text)return;
      active=target;
      const rect=target.getBoundingClientRect();
      const width=Math.min(390,window.innerWidth-24);
      const left=Math.max(12,Math.min(window.innerWidth-width-12,rect.left+rect.width/2-width/2));
      const below=rect.top<190;
      setTip({text,provider:target.dataset.architectureProvider||"aws",left,top:below?rect.bottom+12:rect.top-12,below});
    };
    const owner=(event:Event)=>(event.target as Element|null)?.closest?.("[data-architecture-detail]") as HTMLElement|null;
    const over=(event:PointerEvent)=>{const target=owner(event);if(target)show(target)};
    const out=(event:PointerEvent)=>{const target=owner(event);if(target&&!target.contains(event.relatedTarget as Node)){active=null;setTip(null)}};
    const focus=(event:FocusEvent)=>{const target=owner(event);if(target)show(target)};
    const blur=(event:FocusEvent)=>{const target=owner(event);if(target&&!target.contains(event.relatedTarget as Node)){active=null;setTip(null)}};
    const click=(event:MouseEvent)=>{const target=owner(event);if(target)show(target)};
    const reposition=()=>{if(active)show(active)};
    document.addEventListener("pointerover",over);
    document.addEventListener("pointerout",out);
    document.addEventListener("focusin",focus);
    document.addEventListener("focusout",blur);
    document.addEventListener("click",click);
    window.addEventListener("resize",reposition);
    window.addEventListener("scroll",reposition,true);
    return()=>{document.removeEventListener("pointerover",over);document.removeEventListener("pointerout",out);document.removeEventListener("focusin",focus);document.removeEventListener("focusout",blur);document.removeEventListener("click",click);window.removeEventListener("resize",reposition);window.removeEventListener("scroll",reposition,true)};
  },[]);
  if(!tip)return null;
  return <div className={`architecture-tooltip architecture-tooltip-${tip.provider} ${tip.below?"is-below":"is-above"}`} style={{left:tip.left,top:tip.top}} role="tooltip">{tip.text}</div>;
}
