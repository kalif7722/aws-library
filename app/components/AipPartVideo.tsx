"use client";

import { useEffect, useRef, useState } from "react";

type Chapter = { slide: number; title: string; startSeconds: number; durationSeconds: number };
type Ready = {
  status: "ready";
  title: string;
  videoUrl: string;
  captionsUrl: string;
  transcriptUrl: string;
  durationSeconds?: number;
  chapters: Chapter[];
};

const timeLabel = (seconds: number) => {
  const sec = Math.max(0, Math.floor(seconds));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
};

export default function AipPartVideo({
  moduleId,
  partId,
  title,
  posterSlide,
}: {
  moduleId: string;
  partId: string;
  title: string;
  posterSlide: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [data, setData] = useState<Ready | null>(null);
  const [error, setError] = useState(false);
  const [resume, setResume] = useState(0);
  const storageKey = `aip-video-${moduleId}-${partId}-progress`;

  useEffect(() => {
    const ctrl = new AbortController();
    setData(null);
    setError(false);
    try {
      const stored = Number(localStorage.getItem(storageKey) ?? "0");
      if (Number.isFinite(stored) && stored > 0) setResume(stored);
    } catch { /* optional storage */ }

    fetch(`/api/aip-video?module=${moduleId}&part=${partId}`, {
      cache: "no-store",
      signal: ctrl.signal,
    })
      .then((response) => response.ok ? response.json() : { status: "processing" })
      .then((value: Ready | {status: "processing"}) => {
        if (!ctrl.signal.aborted && value.status === "ready") setData(value);
      })
      .catch(() => {/* Preview not yet published */});
    return () => ctrl.abort();
  }, [moduleId, partId, storageKey]);

  const seek = (seconds: number) => {
    if (!ref.current) return;
    ref.current.currentTime = seconds;
    ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="aip-part-video" style={{margin:"22px 0 26px",borderTop:"1px solid #dce8f6",paddingTop:18}}>
      <h3 style={{fontSize:18,margin:"0 0 10px",color:"#193b64"}}>Part {partId} · {title}</h3>
      {!data || error ? (
        <p className="aip-video-note" role="status">
          {error
            ? "This video could not be played from the media server; the corresponding slide images are still available below."
            : "The lecture is being validated. Video playback will appear once the narrated slides and uploaded media pass the release checks."}
        </p>
      ) : (
        <>
          <video
            ref={ref}
            className="aip-video-player"
            controls
            playsInline
            preload="metadata"
            poster={`https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals/module-${moduleId}/slide-${String(posterSlide).padStart(2,"0")}.webp`}
            onError={() => setError(true)}
            onTimeUpdate={(event) => {
              const seconds = event.currentTarget.currentTime;
              if (Number.isFinite(seconds)) {
                try { localStorage.setItem(storageKey, String(Math.round(seconds))); }
                catch { /* optional progress */ }
              }
            }}
            onEnded={() => {
              try { localStorage.removeItem(storageKey); }
              catch { /* optional progress */ }
              setResume(0);
            }}
          >
            <source src={data.videoUrl} type="video/mp4" />
            <track src={data.captionsUrl} kind="subtitles" srcLang="en" label="English" />
            Your browser does not support HTML5 video.
          </video>
          <div className="aip-video-links">
            {resume > 15 && <button type="button" className="aip-video-btn" onClick={() => seek(resume)}>Resume at {timeLabel(resume)}</button>}
            <a href={data.transcriptUrl} target="_blank" rel="noopener noreferrer">Read full transcript</a>
            <span>{timeLabel(data.durationSeconds ?? 0)} · {data.chapters.length} slide chapters</span>
          </div>
          <div className="aip-video-grid">
            {data.chapters.map((chapter) => (
              <button type="button" className="aip-video-chapter" key={chapter.slide} onClick={() => seek(chapter.startSeconds)}>
                <small>{timeLabel(chapter.startSeconds)}</small>
                <span>{String(chapter.slide).padStart(2,"0")} · {chapter.title}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
