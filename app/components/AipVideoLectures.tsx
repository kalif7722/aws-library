"use client";

import { useEffect, useRef, useState } from "react";
import AipPartVideo from "./AipPartVideo";

type Chapter = { slide: number; title: string; startSeconds: number; durationSeconds: number };
type VideoReady = {
  status: "ready";
  title: string;
  videoUrl: string;
  captionsUrl: string;
  transcriptUrl: string;
  durationSeconds?: number;
  chapters: Chapter[];
};
type VideoState = VideoReady | { status: "processing" };

const PARTS: Array<{part: string; title: string; range: string; firstSlide: number}> = [
  { part: "01", title: "GenAI Fundamentals and Amazon Bedrock", range: "1–9", firstSlide: 1 },
  { part: "02", title: "Fine-tuning, Continued Pre-Training and LoRA", range: "10–13", firstSlide: 10 },
  { part: "03", title: "RAG and Bedrock Knowledge Bases", range: "14–24", firstSlide: 14 },
  { part: "04", title: "Chunking, Embeddings and RAG Evaluation", range: "25–34", firstSlide: 25 },
  { part: "05", title: "Multimodal Models, Guardrails and Prompts", range: "35–43", firstSlide: 35 },
  { part: "06", title: "Prompt Patterns and Application Flows", range: "44–54", firstSlide: 44 },
  { part: "07", title: "Responsible AI and the GenAI Lens", range: "55–59", firstSlide: 55 },
];

const formatTime = (seconds: number) => {
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
};

export default function AipVideoLectures({ moduleId }: { moduleId: string }) {
  const player = useRef<HTMLVideoElement>(null);
  const [video, setVideo] = useState<VideoState | null>(null);
  const [resumeAt, setResumeAt] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (moduleId !== "00" && moduleId !== "01") return;
    const controller = new AbortController();
    const restoreKey = moduleId === "00" ? "aip-module-00-video-progress" : "aip-module-01-part-02-video-progress";
    try {
      const stored = Number(localStorage.getItem(restoreKey) ?? "0");
      if (Number.isFinite(stored) && stored > 0) setResumeAt(stored);
    } catch { /* storage unavailable */ }
    const query = moduleId === "00" ? "/api/aip-video?module=00" : "/api/aip-video?module=01&part=02";
    fetch(query, { signal: controller.signal, cache: "no-store" })
      .then((result) => result.ok ? result.json() : { status: "processing" })
      .then((result: VideoState) => {
        if (!controller.signal.aborted) setVideo(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) setVideo({ status: "processing" });
      });
    return () => controller.abort();
  }, [moduleId]);

  const jump = (seconds: number) => {
    if (!player.current) return;
    player.current.currentTime = seconds;
    player.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="video-lectures" className="aip-video-lectures" aria-label="Video lectures">
      <style>{`
        .aip-video-lectures{margin:28px 0 34px;border-radius:22px;overflow:hidden;border:1px solid #cfdcee;background:#fff;color:#162945;box-shadow:0 10px 30px #1427410d}
        .aip-video-heading{padding:23px 26px;background:linear-gradient(120deg,#111c37,#195384);color:#fff}
        .aip-video-heading small{font-size:11px;font-weight:800;letter-spacing:.14em;color:#b9e7ff}
        .aip-video-heading h2{color:#fff;margin:7px 0 5px;font-size:clamp(20px,2.4vw,27px)}
        .aip-video-heading p{font-size:13px;color:#d8eafb;line-height:1.6;margin:0}
        .aip-video-body{padding:20px 24px 24px}
        .aip-video-player{width:100%;display:block;aspect-ratio:16/9;background:#081324;border-radius:14px}
        .aip-video-note{color:#566781;font-size:13px;line-height:1.7;margin:15px 0}
        .aip-video-links{display:flex;gap:12px;flex-wrap:wrap;align-items:center;font-size:13px;margin:12px 0}
        .aip-video-links a{color:#1765b4;font-weight:700;text-decoration:underline;text-underline-offset:3px}
        .aip-video-btn{background:#1765b4;color:#fff;border:0;border-radius:10px;padding:10px 15px;cursor:pointer;font-weight:700}
        .aip-video-btn:hover{background:#104e8b}
        .aip-video-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:14px}
        .aip-video-chapter{display:flex;align-items:flex-start;text-align:left;gap:9px;padding:12px;border-radius:12px;background:#f4f8fe;border:1px solid #dce8f6;color:#193b64;cursor:pointer}
        .aip-video-chapter:hover,.aip-video-chapter:focus-visible{border-color:#2a7bc5;background:#e6f2ff}
        .aip-video-chapter span{display:block;font-size:12px;font-weight:700;line-height:1.45}
        .aip-video-chapter small{font-size:10px;color:#526f8c;white-space:nowrap;padding-top:2px}
        .aip-video-part{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:13px 4px;border-bottom:1px solid #e5ebf4}
        .aip-video-part:last-child{border-bottom:0}
        .aip-video-part b{display:block;font-size:14px;color:#173451;margin-bottom:3px}
        .aip-video-part span{display:block;font-size:12px;color:#667d98}
        .aip-video-part a{color:#1765b4;font-size:12px;white-space:nowrap}
        @media(max-width:640px){.aip-video-body{padding:16px}.aip-video-grid{grid-template-columns:1fr}.aip-video-part{flex-direction:column;align-items:flex-start;gap:5px}}
      `}</style>
      <div className="aip-video-heading">
        <small>VIDEO LEARNING PATH · AWS AIP-C01</small>
        <h2>{moduleId === "00" ? "Course Introduction · Video Overview" : "Module 01 · Video Lecture Series"}</h2>
        <p>{moduleId === "00"
          ? "Follow the original course diagrams with a continuous instructor-style explanation."
          : "Seven topic-based lessons, organised around the existing module visuals."}</p>
      </div>
      <div className="aip-video-body">
        {moduleId === "00" ? (
          video?.status === "ready" && !error ? (
            <>
              <video
                ref={player}
                className="aip-video-player"
                controls
                playsInline
                preload="metadata"
                poster="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals/module-00/slide-01.webp"
                onError={() => setError(true)}
                onTimeUpdate={(event) => {
                  const time = event.currentTarget.currentTime;
                  if (Number.isFinite(time)) {
                    try { localStorage.setItem("aip-module-00-video-progress", String(Math.round(time))); }
                    catch { /* optional progress */ }
                  }
                }}
                onEnded={() => {
                  try { localStorage.removeItem("aip-module-00-video-progress"); }
                  catch { /* optional progress */ }
                  setResumeAt(0);
                }}
              >
                <source src={video.videoUrl} type="video/mp4" />
                <track src={video.captionsUrl} kind="subtitles" srcLang="en" label="English" />
                Your browser does not support HTML5 video.
              </video>
              <div className="aip-video-links">
                {resumeAt > 15 ? <button type="button" className="aip-video-btn" onClick={() => jump(resumeAt)}>Resume at {formatTime(resumeAt)}</button> : null}
                <a href={video.transcriptUrl} target="_blank" rel="noopener noreferrer">Read full transcript</a>
                <span>{formatTime(video.durationSeconds ?? video.chapters.reduce((n, c) => n + c.durationSeconds, 0))} · {video.chapters.length} slide chapters</span>
              </div>
              <h3 style={{margin:"20px 0 8px",fontSize:17}}>Jump to a slide explanation</h3>
              <div className="aip-video-grid">
                {video.chapters.map((chapter) => (
                  <button type="button" className="aip-video-chapter" key={chapter.slide} onClick={() => jump(chapter.startSeconds)}>
                    <small>{formatTime(chapter.startSeconds)}</small>
                    <span>{String(chapter.slide).padStart(2, "0")} · {chapter.title}</span>
                  </button>
                ))}
              </div>
              <p className="aip-video-note">Tip: Use the chapters to revisit a concept, or open the original images in the Visual lessons section below.</p>
            </>
          ) : (
            <p className="aip-video-note" role="status">
              {error
                ? "The video could not be played from the media server. The original slide lessons remain available below."
                : "The revised, diagram-aligned lecture is being validated. The player will appear here once the new video and its manifest are available."}
            </p>
          )
        ) : (
          <>
            <p className="aip-video-note">Lecture parts are published individually after their actual slide images and narration are verified. Part 01 requires a repair to source slide 4.</p>
            {video?.status === "ready" && !error ? (
              <div style={{marginBottom:24}}>
                <h3 style={{fontSize:18,margin:"0 0 12px"}}>Watch Part 02 · Fine-Tuning, Continued Pre-Training and LoRA</h3>
                <video
                  ref={player}
                  controls
                  playsInline
                  preload="metadata"
                  className="aip-video-player"
                  poster="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-genai-course-visuals/module-01/slide-10.webp"
                  onError={() => setError(true)}
                  onTimeUpdate={(event) => {
                    const time = event.currentTarget.currentTime;
                    if (Number.isFinite(time)) {
                      try { localStorage.setItem("aip-module-01-part-02-video-progress", String(Math.round(time))); }
                      catch { /* progress optional */ }
                    }
                  }}
                  onEnded={() => {
                    try { localStorage.removeItem("aip-module-01-part-02-video-progress"); }
                    catch { /* optional progress */ }
                    setResumeAt(0);
                  }}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  <track src={video.captionsUrl} kind="subtitles" srcLang="en" label="English" />
                  Your browser does not support HTML5 video.
                </video>
                <div className="aip-video-links">
                  {resumeAt > 15 ? <button type="button" className="aip-video-btn" onClick={() => jump(resumeAt)}>Resume at {formatTime(resumeAt)}</button> : null}
                  <a href={video.transcriptUrl} target="_blank" rel="noopener noreferrer">Read full transcript</a>
                  <span>{formatTime(video.durationSeconds ?? video.chapters.reduce((n, c) => n + c.durationSeconds, 0))} · {video.chapters.length} slides</span>
                </div>
                <div className="aip-video-grid">
                  {video.chapters.map((chapter) => (
                    <button type="button" className="aip-video-chapter" key={chapter.slide} onClick={() => jump(chapter.startSeconds)}>
                      <small>{formatTime(chapter.startSeconds)}</small>
                      <span>{String(chapter.slide).padStart(2, "0")} · {chapter.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p role="status" className="aip-video-note">{error
                ? "The Part 02 video could not be played. The original slides remain available below."
                : "Part 02's visually verified lecture is being rendered and checked before it becomes playable here."}</p>
            )}
            <AipPartVideo
              moduleId="01"
              partId="03"
              title="RAG, Vector Search and Bedrock Knowledge Bases"
              posterSlide={14}
            />
            {PARTS.map((part) => (
              <div key={part.part} className="aip-video-part">
                <div>
                  <b>Part {part.part} · {part.title}</b>
                  <span>Mapped slides {part.range} · {part.part === "02" && video?.status === "ready" && !error ? "Video available above" : part.part === "03" ? "Video section above" : "Video preparation"}</span>
                </div>
                <a href={`/courses/aws-generative-ai-developer-professional/visual/module-01?slide=${part.firstSlide}`}>View starting slide</a>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
