# Shared visual-course video-player standard

Approved 2026-11-13. Applies to AIP-C01, AIF-C01 and any new AWS, Azure, GCP or other visual learning course videos. Do **not** create a separate minimal player for a new course.

## Single shared control component
- **Component:** `app/components/CourseVideoControls.tsx`.
- Used by both `app/components/AipVideoLectures.tsx` and `app/components/AifVideoLectures.tsx`.
- Every course **must** expose Play/Pause, seekable timeline, **5 seconds backward**, **5 seconds forward**, current / total time, rate selection (0.75×, 1×, 1.25×, 1.5×, 1.75×, 2×), CC on/off, mute and volume, previous/next video or module (disabled where impossible), completion control, and immersive fullscreen.
- Include exact slide-title chapters, original slide links, caption source, transcript, and live media availability status outside the core control bar.
- Resume progress is stored per course/module/lecture in browser-local storage. The playback speed and auto-next preferences use **shared keys across courses**: `course-video-playback-speed:v1` and `course-video-auto-next:v1`. Preserve existing AIP and AIF legacy playback-speed preferences when migrating.
- Auto-next may move within a module or to the next mapped module only when a lesson is available or the user's navigation remains functional. Browser autoplay restrictions should show a clear Play instruction rather than pretending to play.
- Native video controls alone are **not** sufficient: AIF and AIP both require the shared custom controls.

## Fullscreen behavior
- Request fullscreen on the **video stage container**, not solely on the HTML video element. The container includes chapter navigation arrows and the control bar.
- Player overlays (top title when present, previous/next buttons, timeline and controls) automatically fade after inactivity and are redisplayed when the pointer approaches the relevant edge, on touch, or via keyboard focus.
- Exit via the visible fullscreen button or Escape. Keep volume, captions, playback rate and current progress unchanged.
- Keyboard navigation and controls must be accessible (visible focus, descriptive aria labels). Avoid overriding text-input or button keyboard behavior.
- Responsive control rows may wrap on mobile rather than clipping or hiding critical actions.

## Source and publication separation
- AIP original visual URLs and AIF local WebP URLs stay specific to each course. The playback component and user interaction patterns are shared.
- Each course's own API remains authoritative for MP4+matching manifest status; do not display a broken/unpublished video as ready.
- Preserve original slide viewing and lesson progress when adding video lectures.

## Change safety
1. Shared controls must not introduce broken imports, event callbacks or missing keyboard accessibility into either course.
2. Run `node --test tests/course-video-controls-parity.test.mjs tests/aif-video-lesson-mapping.test.mjs` when changing any player implementation.
3. GitHub Actions workflow `.github/workflows/check-course-video-controls.yml` validates these controls on changes.
4. Verify desktop, mobile and fullscreen playback manually after deployment; checking source code does not prove live media is available.
5. New courses import the common control component and use the same preferences, control labels and underlying behavior. Extend the shared component rather than introducing another parallel implementation.

## Mandatory presentation, navigation and spoken-caption parity (2026-11-13)
- All courses must use AIP's approved desktop composition: gradient course header; **vertical numbered left playlist** with active, available, in-progress and completed statuses; right lecture title, slide range, status and 16:9 media stage; captions, transcript, chapters and actions underneath. Responsive layouts may stack the panes vertically but must not default to horizontally scrolling lesson chips.
- Previous/next controls must display the **actual destination lecture title** on hover, focus and accessible label in both the normal control bar and immersive fullscreen arrows. Never rely on anonymous left/right arrows or only a browser-native title popup. In fullscreen, hide overlays when idle and reveal by pointer edge/keyboard focus as in AIP.
- Spoken English captions are mandatory and must match narration-script text, tracked to playback time. The shared `CourseVideoCaptions` component fetches the approved caption URL through `/api/course-video-captions`, parses timed WebVTT cues and draws legible text over the video. Both AIP and AIF must use this same component; avoid double-rendering native captions.
- Caption publishing is validated independently of MP4 availability: valid `WEBVTT`, meaningful nonempty cues, cue timing and transcript correspondence. When captions cannot be loaded, display a visible warning instead of silently enabling an empty CC toggle.
- Future cloud courses must reuse the shared `CourseVideoControls` and `CourseVideoCaptions` and follow the same layout, controls, hover details, fullscreen presentation, transcript and progress standards. Course-specific assets, manifests and narration remain independent.
