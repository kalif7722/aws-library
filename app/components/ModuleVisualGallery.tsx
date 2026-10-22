"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import visualMap from "../courses/aws-generative-ai-developer-professional/visual-lesson-map.json";

type AssetStatus = "generated" | "uploaded" | "qa-passed" | "planned";
type ModuleLesson = {
  sourcePage: number;
  title: string;
  focus: string;
  batch: string;
  assetStatus: AssetStatus;
};
type ModuleMeta = {
  id: string;
  title: string;
  sourcePageStart: number;
  sourcePageEnd: number;
  description: string;
};
type Visual = {
  src: string | null;
  alt: string;
  index: number;
  title: string;
  sourcePdfPage?: number;
  focus?: string;
  batch?: string;
  assetStatus: AssetStatus | "legacy";
};

const lessonsByModule = visualMap.lessonsByModule as unknown as Record<string, ModuleLesson[]>;
const courseModules = visualMap.modules as ModuleMeta[];

function statusLabel(status: Visual["assetStatus"]) {
  switch (status) {
    case "generated": return "Generated · review pending";
    case "uploaded": return "Uploaded · review pending";
    case "qa-passed": return "QA passed";
    case "planned": return "Mapped · image pending";
    default: return "Legacy asset slot";
  }
}

export default function ModuleVisualGallery({ moduleNumber, imageBase }: { moduleNumber: string; imageBase: string }) {
  const mappedLessons = lessonsByModule[moduleNumber];
  const moduleMeta = courseModules.find((module) => module.id === moduleNumber);

  const visuals: Visual[] = useMemo(() => {
    if (mappedLessons?.length) {
      return mappedLessons.map((lesson, i) => ({
        src: lesson.assetStatus === "planned" ? null : imageBase + "/module-" + moduleNumber + "/slide-" + String(i + 1).padStart(2, "0") + ".webp",
        alt: "Module " + moduleNumber + " · PDF page " + lesson.sourcePage + ": " + lesson.title,
        index: i + 1,
        title: lesson.title,
        sourcePdfPage: lesson.sourcePage,
        focus: lesson.focus,
        batch: lesson.batch,
        assetStatus: lesson.assetStatus,
      }));
    }

    // Keep the existing ten-image gallery intact for modules not mapped page-by-page yet.
    return Array.from({ length: 10 }, (_, i) => {
      const index = i + 1;
      return {
        src: imageBase + "/module-" + moduleNumber + "/slide-" + String(index).padStart(2, "0") + ".webp",
        alt: "Module " + moduleNumber + " visual lesson " + index,
        index,
        title: "Visual lesson " + String(index).padStart(2, "0"),
        assetStatus: "legacy" as const,
      };
    });
  }, [imageBase, mappedLessons, moduleNumber]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [failed, setFailed] = useState<number[]>([]);
  const navigableIndices = useMemo(
    () => visuals.map((visual, index) => visual.src && !failed.includes(index) ? index : -1).filter((index) => index >= 0),
    [visuals, failed],
  );

  const close = useCallback(() => setActiveIndex(null), []);
  const moveLightbox = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => {
      if (current === null || navigableIndices.length === 0) return null;
      const currentPosition = navigableIndices.indexOf(current);
      if (currentPosition < 0) return navigableIndices[0];
      return navigableIndices[(currentPosition + direction + navigableIndices.length) % navigableIndices.length];
    });
  }, [navigableIndices]);
  const previous = useCallback(() => moveLightbox(-1), [moveLightbox]);
  const next = useCallback(() => moveLightbox(1), [moveLightbox]);

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
  const generatedCount = mappedLessons?.filter((lesson) => lesson.assetStatus === "generated").length ?? 0;
  const uploadedCount = mappedLessons?.filter((lesson) => lesson.assetStatus === "uploaded").length ?? 0;
  const qaPassedCount = mappedLessons?.filter((lesson) => lesson.assetStatus === "qa-passed").length ?? 0;
  const plannedCount = mappedLessons?.filter((lesson) => lesson.assetStatus === "planned").length ?? 0;

  return <>
    <style>{[
      '.module-visual-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:24px}',
      '.module-visual-card{border:1px solid #dbe5f1;border-radius:14px;overflow:hidden;background:#fff;color:#152440;padding:0;text-align:left;display:block;width:100%;min-width:0;cursor:zoom-in}',
      '.module-visual-card:disabled{cursor:default;opacity:1}',
      '.module-visual-card:focus-visible,.module-viewer button:focus-visible{outline:3px solid #38bdf8;outline-offset:3px}',
      '.module-visual-image-protected{user-select:none;-webkit-user-select:none;-webkit-user-drag:none;-webkit-touch-callout:none}',
      '.module-visual-thumb{width:100%;aspect-ratio:16/9;object-fit:contain;background:#f3f7fc;display:block}',
      '.module-visual-fallback{aspect-ratio:16/9;display:grid;place-items:center;text-align:center;padding:18px;background:#f3f7fc;color:#66758b;font-size:13px;line-height:1.5}',
      '.module-visual-meta{padding:12px;min-height:100px}.module-visual-meta b{font-size:13px;display:block;line-height:1.4}.module-visual-meta small{display:block;color:#687991;margin-top:5px;line-height:1.4}',
      '.module-visual-meta-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:7px;color:#61718a;font-size:11px}',
      '.module-visual-status{display:inline-block;border-radius:999px;padding:3px 7px;background:#eef2f7;color:#475569;font-size:10px;font-weight:700;white-space:normal;text-align:right}',
      '.module-map-summary{margin-top:20px;padding:16px 18px;border:1px solid #cbdff3;border-radius:14px;background:#f4f9ff;color:#183453;line-height:1.5}',
      '.module-map-summary-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:8px}',
      '.module-map-summary small{display:block;margin-top:8px;color:#62748c}',
      '.module-map-counts{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}',
      '.module-map-counts span{background:white;border:1px solid #d6e3f1;border-radius:8px;padding:5px 9px;font-size:12px}',
      '.module-map-legacy-note{margin-top:20px;padding:14px 16px;border:1px dashed #cbd5e1;border-radius:12px;background:#f8fafc;color:#64748b;font-size:13px;line-height:1.6}',
      '.module-viewer{position:fixed;inset:0;z-index:99999;background:rgba(3,7,18,.97);color:#fff;display:flex;flex-direction:column}',
      '.module-viewer-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;flex-wrap:wrap}',
      '.module-viewer-controls{display:flex;gap:8px;align-items:center}',
      '.module-viewer button{border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.1);color:#fff;border-radius:999px;min-width:42px;min-height:42px;padding:8px 14px;cursor:pointer;font-size:16px}',
      '.module-viewer button:hover{background:rgba(255,255,255,.2)}',
      '.module-viewer-stage{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:clamp(6px,2vw,24px);padding:8px 12px 18px}',
      '.module-viewer-image-wrap{flex:1;min-width:0;min-height:0;height:100%;display:flex;align-items:center;justify-content:center}',
      '.module-viewer-image{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;image-rendering:auto}',
      '@media(max-width:850px){.module-visual-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}',
      '@media(max-width:560px){.module-visual-grid{grid-template-columns:1fr}.module-viewer-top{padding:10px}.module-viewer-stage{gap:4px;padding:4px}.module-viewer-controls button{min-width:38px;padding:6px 10px}}'
    ].join("\n")}</style>

    {mappedLessons?.length ? <div className="module-map-summary">
      <div className="module-map-summary-head">
        <strong>{moduleMeta?.title ?? ("Module " + moduleNumber)} · page-by-page lesson map</strong>
        <span>PDF pages {moduleMeta?.sourcePageStart ?? mappedLessons[0].sourcePage}–{moduleMeta?.sourcePageEnd ?? mappedLessons[mappedLessons.length - 1].sourcePage} · {mappedLessons.length} mapped lessons</span>
      </div>
      <div className="module-map-counts">
        <span>{generatedCount} generated · review pending</span>
        <span>{uploadedCount} uploaded</span>
        <span>{qaPassedCount} QA passed</span>
        <span>{plannedCount} mapped · image pending</span>
      </div>
      <small>Lesson titles and PDF-page numbers are driven by <code>visual-lesson-map.json</code>. To extend another module, add its page entries there; the gallery expands automatically.</small>
    </div> : <div className="module-map-legacy-note">
      <strong>Page-by-page mapping not configured for this module yet.</strong> The existing ten-slot gallery is preserved for compatibility. Add this module’s PDF-page entries to <code>visual-lesson-map.json</code> when its lesson plan is ready.
    </div>}

    <div className="module-visual-grid">
      {visuals.map((visual, i) => {
        const isFailed = failed.includes(i);
        const fallbackMessage = visual.assetStatus === "planned"
          ? "Lesson mapped from the source PDF. Its individual image has not been generated yet."
          : isFailed
            ? "The expected WebP asset could not be loaded. Check that the file is uploaded to the mapped R2 path."
            : "Image asset pending.";
        return <button type="button" className="module-visual-card" key={"Module " + moduleNumber + "-" + visual.index} disabled={!visual.src || isFailed} onClick={() => setActiveIndex(i)} aria-label={"Open " + visual.alt + " full screen"}>
          {visual.src && !isFailed ? <img className="module-visual-thumb module-visual-image-protected" src={visual.src} alt={visual.alt} draggable={false} onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()} loading="lazy" onError={() => setFailed((old) => old.includes(i) ? old : [...old, i])} /> : <div className="module-visual-fallback">{fallbackMessage}</div>}
          <div className="module-visual-meta">
            <div className="module-visual-meta-top">
              <span>{visual.sourcePdfPage !== undefined ? "PDF " + visual.sourcePdfPage : "Image " + String(visual.index).padStart(2, "0")}</span>
              <span className="module-visual-status">{statusLabel(visual.assetStatus)}</span>
            </div>
            <b>{visual.title}</b>
            {visual.focus ? <small>{visual.focus}</small> : null}
            {visual.batch ? <small>{visual.batch}</small> : null}
          </div>
        </button>;
      })}
    </div>

    {active && activeIndex !== null && active.src && <div className="module-viewer" role="dialog" aria-modal="true" aria-label={active.alt} onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="module-viewer-top">
        <div><strong>{active.alt}</strong></div>
        <div className="module-viewer-controls"><button type="button" onClick={previous} aria-label="Previous visual" title="Previous (←)">←</button><button type="button" onClick={next} aria-label="Next visual" title="Next (→)">→</button><button type="button" onClick={close} aria-label="Close full-screen viewer" title="Close (Esc)">✕</button></div>
      </div>
      <div className="module-viewer-stage">
        <button type="button" onClick={previous} aria-label="Previous visual" title="Previous visual" style={{fontSize:30,flexShrink:0}}>‹</button>
        <div className="module-viewer-image-wrap">{failed.includes(activeIndex) ? <div className="module-visual-fallback">This image could not be loaded from its mapped asset path.</div> : <img className="module-viewer-image module-visual-image-protected" src={active.src} alt={active.alt} draggable={false} onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()} onError={() => setFailed((old) => old.includes(activeIndex) ? old : [...old, activeIndex])} />}</div>
        <button type="button" onClick={next} aria-label="Next visual" title="Next visual" style={{fontSize:30,flexShrink:0}}>›</button>
      </div>
    </div>}
  </>;
}
