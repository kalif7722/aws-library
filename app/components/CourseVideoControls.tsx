"use client";

export const COURSE_VIDEO_SPEEDS = [0.75,1,1.25,1.5,1.75,2] as const;
export const COURSE_VIDEO_SPEED_KEY = "course-video-playback-speed:v1";
export const COURSE_VIDEO_AUTO_NEXT_KEY = "course-video-auto-next:v1";

export function formatVideoTime(seconds:number) {
  if (!Number.isFinite(seconds)) return "—";
  const n=Math.max(0,Math.floor(seconds));
  return `${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`;
}

type Props={
  playing:boolean; position:number; duration:number; playbackSpeed:number;
  muted:boolean; volume:number; captionsOn:boolean; fullscreen:boolean;
  onTogglePlayback:()=>void;onSkip:(seconds:number)=>void;onSeek:(seconds:number)=>void;
  onChangeSpeed:(speed:number)=>void;onToggleCaptions:()=>void;
  onToggleMute:()=>void;onVolume:(value:number)=>void;
  onFullscreen?:()=>void;onPrevious?:()=>void;onNext?:()=>void;
  previousTitle?:string;nextTitle?:string;
  onMarkComplete?:()=>void;completed?:boolean;
};

/** Shared AIP/AIF video controls. Keep interaction labels and behavior identical. */
export default function CourseVideoControls(p:Props) {
  return <div className="av-custom-controls cv-controls" role="group" aria-label="Video playback controls">
    <style>{`
      .cv-controls {position:relative;z-index:10;flex:none;background:#071827;color:#f5faff;padding:9px 12px 10px}
      .cv-controls .av-timeline {display:block;width:100%;height:13px;margin:0 0 8px;accent-color:#79d8ff;cursor:pointer}
      .cv-controls .av-control-row {display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      .cv-controls .av-control-row button {border:1px solid #557b9a;border-radius:8px;padding:8px 10px;color:#effaff;background:#173b5b;font-size:12px;font-weight:750;white-space:nowrap;min-height:36px;cursor:pointer}
      .cv-controls .av-control-row button:hover:not(:disabled),.cv-controls .av-control-row button:focus-visible {background:#17639b;outline:2px solid #8ddcff;outline-offset:1px}
      .cv-controls .av-control-row button:disabled {opacity:.5;cursor:not-allowed}
      .cv-controls .av-speed-control {display:flex;gap:5px;align-items:center;font-size:12px;font-weight:750}
      .cv-controls .av-speed-control select {background:#173b5b;color:white;border:1px solid #557b9a;border-radius:7px;padding:7px;min-height:36px}
      .cv-controls .av-volume {width:75px;accent-color:#79d8ff}
      .cv-controls .av-timestamp {font-size:12px;white-space:nowrap;font-variant-numeric:tabular-nums}
      .cv-controls .av-controls-grow {flex:1;min-width:5px}
      @media(max-width:600px) {
        .cv-controls {padding:8px}
        .cv-controls .av-control-row {gap:5px}
        .cv-controls .av-control-row button {padding:7px;font-size:11px;min-height:32px}
        .cv-controls .av-speed-control span {display:none}
        .cv-controls .av-speed-control select {padding:5px 3px;min-height:32px}
        .cv-controls .av-volume {width:48px}
        .cv-controls .av-timestamp {font-size:10px}
      }
    `}</style>
    <input className="av-timeline" type="range" min={0} max={Math.max(1,p.duration)}
      value={Math.min(Math.max(0,p.position),Math.max(1,p.duration))} step={0.1}
      onChange={e=>p.onSeek(Number(e.currentTarget.value))}
      aria-label="Video playback position" aria-valuetext={`${formatVideoTime(p.position)} of ${formatVideoTime(p.duration)}`}/>
    <div className="av-control-row">
      <button type="button" onClick={p.onTogglePlayback} aria-label={p.playing?"Pause video":"Play video"} title={p.playing?"Pause":"Play"}>{p.playing?"❚❚":"▶"}</button>
      <button type="button" onClick={()=>p.onSkip(-5)} aria-label="Rewind 5 seconds" title="Back 5 seconds">↶ 5s</button>
      <button type="button" onClick={()=>p.onSkip(5)} aria-label="Forward 5 seconds" title="Forward 5 seconds">5s ↷</button>
      <span className="av-timestamp">{formatVideoTime(p.position)} / {formatVideoTime(p.duration)}</span>
      <span className="av-controls-grow"/>
      <button type="button" disabled={!p.onPrevious} onClick={p.onPrevious} aria-label={p.previousTitle?`Previous video: ${p.previousTitle}`:"No previous video"} title={p.previousTitle??"No previous video"}>❮</button>
      <button type="button" disabled={!p.onNext} onClick={p.onNext} aria-label={p.nextTitle?`Next video: ${p.nextTitle}`:"No next video"} title={p.nextTitle??"No next video"}>❯</button>
      <label className="av-speed-control"><span>Speed</span>
        <select aria-label="Video playback speed" value={p.playbackSpeed} onChange={e=>p.onChangeSpeed(Number(e.currentTarget.value))}>
          {COURSE_VIDEO_SPEEDS.map(n=><option key={n} value={n}>{n}×</option>)}
        </select>
      </label>
      <button type="button" onClick={p.onToggleCaptions} aria-pressed={p.captionsOn}
        aria-label={p.captionsOn?"Turn off captions":"Turn on captions"} title="English subtitles">CC{p.captionsOn?" ✓":""}</button>
      <button type="button" onClick={p.onToggleMute} aria-label={p.muted?"Unmute":"Mute"} title={p.muted?"Unmute":"Mute"}>{p.muted?"🔇":"🔊"}</button>
      <input className="av-volume" type="range" min={0} max={1} step={0.05}
        value={p.muted?0:p.volume} onChange={e=>p.onVolume(Number(e.currentTarget.value))} aria-label="Volume"/>
      {p.onMarkComplete&&<button type="button" className="av-mark-complete" onClick={p.onMarkComplete}
        disabled={p.completed} aria-label={p.completed?"Video completed":"Mark this video complete"}>
        {p.completed?"✓ Completed":"✓ Mark complete"}
      </button>}
      {p.onFullscreen&&<button type="button" onClick={p.onFullscreen}
        aria-label={p.fullscreen?"Exit fullscreen":"Fullscreen with navigation"} title={p.fullscreen?"Exit fullscreen":"Fullscreen with navigation"}>
        {p.fullscreen?"⤢":"⛶"}
      </button>}
    </div>
  </div>;
}
