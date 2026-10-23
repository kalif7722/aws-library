"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import visualMap from "../courses/aws-generative-ai-developer-professional/visual-lesson-map.json";

type ModuleMeta = {
  id: string;
  title: string;
  sourcePageStart: number;
  sourcePageEnd: number;
  description: string;
};
type Visual = {
  src: string;
  alt: string;
  index: number;
};

type DiscoveryResponse = {
  moduleId: string;
  referenceCount: number;
  consecutiveMissing: number;
  availableSlides: number[];
  slidePaths?: Record<string, string>;
  failedChecks: number;
  nextStart: number | null;
};

const courseModules = visualMap.modules as ModuleMeta[];

export default function ModuleVisualGallery({ moduleNumber, imageBase }: { moduleNumber: string; imageBase: string }) {
  const moduleMeta = courseModules.find((module) => module.id === moduleNumber);
  const [availableSlides, setAvailableSlides] = useState<number[]>([]);
  const [slidePaths, setSlidePaths] = useState<Record<string, string>>({});
  const [failed, setFailed] = useState<number[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [discoveryError, setDiscoveryError] = useState<string | null>(null);
  const [discoveryWarning, setDiscoveryWarning] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [comfortView, setComfortView] = useState(true);

  // Uploaded slide numbers drive the gallery. PDF pages describe the source only.
  const visuals: Visual[] = useMemo(() => availableSlides.map((index) => {
    return {
      src: imageBase + "/module-" + moduleNumber + "/slide-" + String(index).padStart(2, "0") + ".webp",
      alt: `Module ${moduleNumber} visual slide ${index}`,
      index,
    };
  }), [availableSlides, imageBase, moduleNumber]);

  useEffect(() => {
    let current = true;
    setLoadingAssets(true);
    setDiscoveryError(null);
    setDiscoveryWarning(null);
    setAvailableSlides([]);
    setSlidePaths({});
    setFailed([]);
    setActiveIndex(null);

    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    const scan = async () => {
      const found = new Set<number>();
      const paths: Record<string, string> = {};
      let failures = 0;
      let start: number | null = 1;
      let missing = 0;
      try {
        do {
          const response = await fetch(`/api/course-visuals?module=${encodeURIComponent(moduleNumber)}&start=${start}&missing=${missing}`, { cache: "no-store", signal: controller.signal });
          if (!response.ok) throw new Error("Unable to check visual lessons. Please retry.");
          const payload: DiscoveryResponse = await response.json();
          if (!current) return;
          for (const slide of payload.availableSlides ?? []) {
            if (Number.isInteger(slide) && slide >= 1) found.add(slide);
          }
          Object.assign(paths, payload.slidePaths ?? {});
          failures += payload.failedChecks;
          missing = payload.consecutiveMissing ?? 0;
          const next = payload.nextStart;
          if (next !== null && (!Number.isInteger(next) || next <= start)) throw new Error("Unable to finish checking lessons.");
          start = next;
          // Show results as they arrive without dropping existing cards during refresh.
          setAvailableSlides(old => [...new Set([...old, ...found])].sort((a,b) => a-b));
          setSlidePaths(old => ({...old, ...paths}));
          setLoadingAssets(false);
        } while (start !== null);
        if (!current) return;
        if (!failures) {
          setAvailableSlides([...found].sort((a,b) => a-b));
          setSlidePaths(paths);
        }
        setFailed([]);
        setDiscoveryError(null);
        setDiscoveryWarning(failures ? "Some lessons could not be checked. Retrying automatically…" : null);
      } catch (error) {
        if (current) setDiscoveryError(error instanceof Error ? error.message : "Unable to check lessons.");
      } finally {
        if (current) {
          setLoadingAssets(false);
          timer = setTimeout(scan, 60000);
        }
      }
    };
    void scan();
    return () => { current = false; controller.abort(); clearTimeout(timer); };
  }, [moduleNumber, refreshKey]);

  const resolvedSrc = useCallback((visual: Visual) => {
    const discoveredKey = slidePaths[String(visual.index)];
    const base = imageBase.endsWith("/") ? imageBase.slice(0, -1) : imageBase;
    return discoveredKey ? base + "/" + discoveredKey : visual.src;
  }, [imageBase, slidePaths]);

  const navigableIndices = useMemo(
    () => visuals
      .map((visual, index) => availableSlides.includes(visual.index) && !failed.includes(index) ? index : -1)
      .filter((index) => index >= 0),
    [availableSlides, failed, visuals],
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
  const visibleVisuals = visuals
    .map((visual, index) => ({ visual, index }))
    .filter(({ visual, index }) => availableSlides.includes(visual.index) && !failed.includes(index));
  const moduleTitle = moduleMeta?.title ?? ("Module " + moduleNumber);

  return <section className={comfortView ? "module-visual-library" : "module-visual-library module-comfort-off"}>
    <style>{[
      '.module-visual-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:24px}',
      '.module-visual-card{border:1px solid #314a74;border-radius:18px;overflow:hidden;background:#101c35;color:#fff;padding:0;text-align:left;cursor:zoom-in;display:block;width:100%;min-width:0;box-shadow:0 0 0 1px rgba(94,165,255,.13),0 7px 22px rgba(13,37,85,.24);transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}',
      '.module-visual-card:hover,.module-visual-card:focus-visible{transform:translateY(-3px);border-color:#79c9ff;box-shadow:0 0 0 1px rgba(130,213,255,.5),0 0 20px rgba(54,147,255,.26),0 14px 30px rgba(12,35,82,.32)}',
      '.module-visual-card:focus-visible,.module-viewer button:focus-visible{outline:3px solid #38bdf8;outline-offset:3px}',
      '.module-visual-image-protected{user-select:none;-webkit-user-select:none;-webkit-user-drag:none;-webkit-touch-callout:none}',
      '.module-visual-thumb{width:100%;aspect-ratio:16/9;object-fit:contain;background:#101c35;display:block}',
      '.module-visual-library{--slide-image-filter:brightness(.86) saturate(.9)}',
      'html[data-theme=\"light\"] .module-visual-library{--slide-image-filter:brightness(.97) saturate(.96)}',
      '.module-visual-library.module-comfort-off{--slide-image-filter:none!important}',
      '.module-visual-thumb,.module-viewer-image{filter:var(--slide-image-filter);transition:filter .2s ease}',
      '.module-comfort-toggle{border:1px solid #9bb6d9;background:#fff;color:#16416a;border-radius:9px;padding:8px 12px;font-size:12px;font-weight:700;cursor:pointer}',
      '.module-comfort-toggle[aria-pressed=\"true\"]{background:#e5f2ff;border-color:#5e9ad4}',
      '.module-comfort-toggle:focus-visible{outline:3px solid #38bdf8;outline-offset:2px}',
      '.module-visual-fallback{display:grid;place-items:center;text-align:center;padding:22px;background:#f3f7fc;color:#66758b;font-size:13px;line-height:1.5;border:1px dashed #cbd5e1;border-radius:12px}',
      '.module-map-summary{margin-top:20px;padding:16px 18px;border:1px solid #cbdff3;border-radius:14px;background:#f4f9ff;color:#183453;line-height:1.5}',
      '.module-map-summary-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:8px}',
      '.module-map-summary small{display:block;margin-top:8px;color:#62748c}',
      '.module-map-counts{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}',
      '.module-map-counts span{background:white;border:1px solid #d6e3f1;border-radius:8px;padding:5px 9px;font-size:12px}',
      '.module-map-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:12px}',
      '.module-map-refresh{border:1px solid #b5c9df;background:white;color:#16416a;border-radius:9px;padding:8px 12px;font-size:12px;font-weight:700;cursor:pointer}',
      '.module-map-refresh:disabled{opacity:.6;cursor:wait}',
      '.module-map-note{margin-top:8px;color:#62748c;font-size:12px;line-height:1.5}',
      '.module-viewer{position:fixed;inset:0;z-index:99999;background:rgba(3,7,18,.97);color:#fff;display:flex;flex-direction:column}',
      '.module-viewer-top{display:flex;align-items:center;justify-content:flex-end;gap:12px;padding:14px 18px;flex-wrap:wrap}',
      '.module-viewer-controls{display:flex;gap:8px;align-items:center}',
      '.module-viewer button{border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.1);color:#fff;border-radius:999px;min-width:42px;min-height:42px;padding:8px 14px;cursor:pointer;font-size:16px}',
      '.module-viewer button:hover{background:rgba(255,255,255,.2)}',
      '.module-viewer-stage{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:clamp(6px,2vw,24px);padding:8px 12px 18px}',
      '.module-viewer-image-wrap{flex:1;min-width:0;min-height:0;height:100%;display:flex;align-items:center;justify-content:center}',
      '.module-viewer-image{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;image-rendering:auto}',
      '@media(prefers-reduced-motion:reduce){.module-visual-card,.module-visual-thumb,.module-viewer-image{transition:none}.module-visual-card:hover,.module-visual-card:focus-visible{transform:none}}',
      '@media(max-width:850px){.module-visual-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}',
      '@media(max-width:560px){.module-visual-grid{grid-template-columns:1fr}.module-viewer-top{padding:10px}.module-viewer-stage{gap:4px;padding:4px}.module-viewer-controls button{min-width:38px;padding:6px 10px}}'
    ].join("\n")}</style>

    <div className="module-map-summary">
      <div className="module-map-summary-head">
        <strong>{moduleTitle} · uploaded visual lessons</strong>
        <span>{visibleVisuals.length} visual lessons</span>
      </div>
      <div className="module-map-counts">
        <span>{visibleVisuals.length} lessons available</span>

      </div>
      <div className="module-map-actions">
        <button type="button" className="module-comfort-toggle" aria-pressed={comfortView} onClick={() => setComfortView((value) => !value)}>Comfort view {comfortView ? "On" : "Off"}</button>
        <button type="button" className="module-map-refresh" onClick={() => setRefreshKey((value) => value + 1)} disabled={loadingAssets}>
          {loadingAssets ? "Checking lessons…" : "Refresh lessons"}
        </button>
        {loadingAssets ? <span role="status" className="module-map-note">Checking for new lessons…</span> : null}
        {discoveryError ? <span role="alert" className="module-map-note">Discovery error: {discoveryError}</span> : null}
        {discoveryWarning ? <span role="status" className="module-map-note">{discoveryWarning}</span> : null}
      </div>

    </div>

    {loadingAssets ? <div className="module-visual-fallback" role="status">Finding visual lessons…</div> : null}
    {!loadingAssets && discoveryError ? <div className="module-visual-fallback">Lessons could not be checked right now. Retrying automatically.</div> : null}
    {!loadingAssets && !discoveryError && visibleVisuals.length === 0 ? <div className="module-visual-fallback">
      Visual lessons will appear here as they become available.
    </div> : null}

    {!loadingAssets && !discoveryError && visibleVisuals.length > 0 ? <div className="module-visual-grid">
      {visibleVisuals.map(({ visual, index }) => <button type="button" className="module-visual-card" key={"Module " + moduleNumber + "-" + visual.index} onClick={() => setActiveIndex(index)} aria-label={"Open " + visual.alt + " full screen"}>
        <img className="module-visual-thumb module-visual-image-protected" src={resolvedSrc(visual)} alt={visual.alt} draggable={false} onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()} loading="lazy" onError={() => setFailed((old) => old.includes(index) ? old : [...old, index])} />
      </button>)}
    </div> : null}

    {active && activeIndex !== null && availableSlides.includes(active.index) && !failed.includes(activeIndex) && <div className="module-viewer" role="dialog" aria-modal="true" aria-label={active.alt} onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="module-viewer-top">
        <div className="module-viewer-controls"><button type="button" onClick={previous} aria-label="Previous visual" title="Previous (←)">←</button><button type="button" onClick={next} aria-label="Next visual" title="Next (→)">→</button><button type="button" onClick={close} aria-label="Close full-screen viewer" title="Close (Esc)">✕</button></div>
      </div>
      <div className="module-viewer-stage">
        <button type="button" onClick={previous} aria-label="Previous visual" title="Previous visual" style={{fontSize:30,flexShrink:0}}>‹</button>
        <div className="module-viewer-image-wrap"><img className="module-viewer-image module-visual-image-protected" src={resolvedSrc(active)} alt={active.alt} draggable={false} onContextMenu={(event) => event.preventDefault()} onDragStart={(event) => event.preventDefault()} onError={() => setFailed((old) => old.includes(activeIndex) ? old : [...old, activeIndex])} /></div>
        <button type="button" onClick={next} aria-label="Next visual" title="Next visual" style={{fontSize:30,flexShrink:0}}>›</button>
      </div>
    </div>}
  </section>;
}
