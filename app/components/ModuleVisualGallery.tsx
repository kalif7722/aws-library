"use client";

import { useCallback, useEffect, useState } from "react";

type Visual = { src: string; alt: string; index: number };

export default function ModuleVisualGallery({ moduleNumber, imageBase }: { moduleNumber: string; imageBase: string }) {
  const visuals: Visual[] = Array.from({ length: 10 }, (_, i) => {
    const index = i + 1;
    return {
      src: `${imageBase}/module-${moduleNumber}/slide-${String(index).padStart(2, "0")}.webp`,
      alt: `Module ${moduleNumber} visual lesson ${index}`,
      index,
    };
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [failed, setFailed] = useState<number[]>([]);

  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(() => setActiveIndex((current) => current === null ? null : (current + visuals.length - 1) % visuals.length), [visuals.length]);
  const next = useCallback(() => setActiveIndex((current) => current === null ? null : (current + 1) % visuals.length), [visuals.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, next, previous]);

  const active = activeIndex === null ? null : visuals[activeIndex];

  return <>
    <style>{`
      .module-visual-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:24px}
      .module-visual-card{border:1px solid #dbe5f1;border-radius:14px;overflow:hidden;background:#fff;color:#152440;padding:0;text-align:left;cursor:zoom-in;display:block;width:100%;min-width:0}
      .module-visual-card:focus-visible,.module-viewer button:focus-visible{outline:3px solid #38bdf8;outline-offset:3px}\n      .module-visual-image-protected{user-select:none;-webkit-user-select:none;-webkit-user-drag:none;-webkit-touch-callout:none}
      .module-visual-thumb{width:100%;aspect-ratio:16/9;object-fit:contain;background:#f3f7fc;display:block}
      .module-visual-fallback{aspect-ratio:16/9;display:grid;place-items:center;text-align:center;padding:18px;background:#f3f7fc;color:#66758b;font-size:13px}
      .module-visual-meta{padding:12px}.module-visual-meta b{font-size:13px}.module-visual-meta small{display:block;color:#687991;margin-top:5px}
      .module-viewer{position:fixed;inset:0;z-index:99999;background:rgba(3,7,18,.97);color:#fff;display:flex;flex-direction:column}
      .module-viewer-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;flex-wrap:wrap}
      .module-viewer-controls{display:flex;gap:8px;align-items:center}
      .module-viewer button{border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.1);color:#fff;border-radius:999px;min-width:42px;min-height:42px;padding:8px 14px;cursor:pointer;font-size:16px}
      .module-viewer button:hover{background:rgba(255,255,255,.2)}
      .module-viewer-stage{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:clamp(6px,2vw,24px);padding:8px 12px 18px}
      .module-viewer-image-wrap{flex:1;min-width:0;min-height:0;height:100%;display:flex;align-items:center;justify-content:center}
      .module-viewer-image{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;image-rendering:auto}
      .module-viewer-footer{text-align:center;color:#cbd5e1;font-size:12px;padding:0 12px 12px}
      @media(max-width:850px){.module-visual-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:560px){.module-visual-grid{grid-template-columns:1fr}.module-viewer-top{padding:10px}.module-viewer-stage{gap:4px;padding:4px}.module-viewer-controls button{min-width:38px;padding:6px 10px}}
    `}</style>
    <div className="module-visual-grid">
      {visuals.map((visual, i) => <button type="button" className="module-visual-card" key={visual.index} onClick={() => setActiveIndex(i)} aria-label={`Open visual ${String(visual.index).padStart(2, "0")} full screen`}>
        {failed.includes(i) ? <div className="module-visual-fallback">Visual {String(visual.index).padStart(2, "0")} will appear here after the WebP file is reviewed and uploaded.</div> : <img className="module-visual-thumb module-visual-image-protected" src={visual.src} alt={visual.alt} draggable={false} onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()} loading="lazy" onError={() => setFailed((old) => old.includes(i) ? old : [...old, i])} />}
      </button>)}
    </div>
    {active && activeIndex !== null && <div className="module-viewer" role="dialog" aria-modal="true" aria-label={active.alt} onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="module-viewer-top">
        <div><strong>{active.alt}</strong></div>
        <div className="module-viewer-controls"><button type="button" onClick={previous} aria-label="Previous visual" title="Previous (←)">←</button><button type="button" onClick={next} aria-label="Next visual" title="Next (→)">→</button><button type="button" onClick={close} aria-label="Close full-screen viewer" title="Close (Esc)">✕</button></div>
      </div>
      <div className="module-viewer-stage">
        <button type="button" onClick={previous} aria-label="Previous visual" title="Previous visual" style={{fontSize:30,flexShrink:0}}>‹</button>
        <div className="module-viewer-image-wrap">{failed.includes(activeIndex) ? <div className="module-visual-fallback">This visual has not been uploaded yet.</div> : <img className="module-viewer-image module-visual-image-protected" src={active.src} alt={active.alt} draggable={false} onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()} onError={() => setFailed((old) => old.includes(activeIndex) ? old : [...old, activeIndex])} />}</div>
        <button type="button" onClick={next} aria-label="Next visual" title="Next visual" style={{fontSize:30,flexShrink:0}}>›</button>
      </div>
    </div>}
  </>;
}
