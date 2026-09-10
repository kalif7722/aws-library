"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle(){
  const [theme,setTheme]=useState<Theme>("dark");
  const [visible,setVisible]=useState(true);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const reveal=()=>{
    setVisible(true);
    if(timer.current)clearTimeout(timer.current);
    timer.current=setTimeout(()=>setVisible(false),2600);
  };
  useEffect(()=>{
    const saved=window.localStorage.getItem("visual-learning-theme") as Theme|null;
    const initial=saved==="light"||saved==="dark"?saved:"dark";
    setTheme(initial);
    document.documentElement.dataset.theme=initial;
    const onMove=()=>reveal();
    window.addEventListener("pointermove",onMove,{passive:true});
    window.addEventListener("keydown",onMove);
    reveal();
    return()=>{window.removeEventListener("pointermove",onMove);window.removeEventListener("keydown",onMove);if(timer.current)clearTimeout(timer.current)};
  },[]);
  const toggle=()=>{
    const next:Theme=theme==="dark"?"light":"dark";
    setTheme(next);
    document.documentElement.dataset.theme=next;
    window.localStorage.setItem("visual-learning-theme",next);
    reveal();
  };
  return <button className={`site-theme-toggle ${visible?"visible":"hidden"}`} onClick={toggle} onFocus={reveal} onMouseEnter={reveal} aria-label={`Switch to ${theme==="dark"?"light":"dark"} mode`} title={`Switch to ${theme==="dark"?"light":"dark"} mode`}><span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span><b>{theme==="dark"?"Light":"Dark"}</b></button>;
}
