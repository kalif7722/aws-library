import type { GcpArchitectureBoard, GcpArchitectureBoardCard, GcpArchitectureBoardGroup } from "./gcp-architecture-boards";

const c = (label: string, caption: string, iconLabel: string = label): GcpArchitectureBoardCard => ({ label, caption, iconLabel });
const g = (title: string, ...cards: GcpArchitectureBoardCard[]): GcpArchitectureBoardGroup => ({ title, cards });
const b = (title: string, note: string, reference: string, ...groups: GcpArchitectureBoardGroup[]): GcpArchitectureBoard => ({ title, note, reference, groups });
const ops = () => g("OPERATE & GOVERN", c("Cloud Monitoring", "Latency / quality / health"), c("Cloud Logging", "Runtime / API logs"), c("IAM controls", "Least privilege", "IAM"));
const governed = (service: string, role: string): GcpArchitectureBoard => b(`Governed ${service} production`, `Separate data access, model or processor configuration and runtime identity around ${service}; version the serving contract and retain quality and security evidence.`, `${service} governance pattern`,
  g("DATA / INPUT", c("Cloud Storage", "Versioned input / artifacts"), c("IAM controls", "Scoped data access", "IAM")),
  g("CONFIGURATION", c(service, "Versioned model / processor config", service)),
  g("AI CAPABILITY", c(service, role, service)),
  g("QUALITY / SAFETY", c("Evaluation", "Accuracy / confidence / safety", "monitor")),
  g("AUDIT", c("Cloud Logging", "Runtime evidence"), c("Cloud Audit Logs", "Admin evidence"))
);
const pair = (primary: GcpArchitectureBoard, service: string, role: string): GcpArchitectureBoard[] => [primary, governed(service, role)];

export const gcpAiMlArchitectureBoards: Record<string, GcpArchitectureBoard[]> = {
  "agent-platform-vision": pair(
    b("Continuous camera intelligence", "Register live video streams, run a managed processor graph continuously and publish events while retaining searchable video intelligence for later investigation.", "Google Cloud Agent Platform Vision continuous analytics pattern",
      g("VIDEO SOURCES", c("Cameras", "RTSP / live feeds", "video")),
      g("STREAM INGESTION", c("Agent Platform Vision", "Registered streams")),
      g("PROCESSING GRAPH", c("Agent Platform Vision", "Model processors + temporal logic")),
      g("EVENTS / WAREHOUSE", c("Pub/Sub", "Operational events"), c("Vision warehouse", "Indexed video metadata", "Agent Platform Vision")),
      ops()), "Agent Platform Vision", "Continuous video intelligence"),
  "cloud-tpu": pair(
    b("Distributed TPU training", "Stage sharded training data close to the accelerator, compile the model through XLA, execute across a TPU slice and checkpoint durable model state outside the TPU lifecycle.", "Google Cloud TPU distributed training pattern",
      g("TRAINING DATA", c("Cloud Storage", "Sharded dataset")),
      g("TRAINING CONTROL", c("Vertex AI", "Custom training job"), c("Queued resource", "Capacity request", "Cloud TPU")),
      g("ACCELERATOR", c("Cloud TPU", "TPU VM + slice topology")),
      g("ARTIFACTS", c("Cloud Storage", "Checkpoints"), c("Vertex AI Model Registry", "Model version", "Vertex AI")),
      ops()), "Cloud TPU", "Tensor accelerator platform"),
  "colab-enterprise": pair(
    b("Governed collaborative notebook", "Give analysts a shared browser notebook backed by a managed runtime that queries governed data directly instead of copying it to local machines.", "Google Cloud Colab Enterprise analytics pattern",
      g("ANALYST", c("Data scientist", "Google identity", "user")),
      g("NOTEBOOK", c("Colab Enterprise", "Collaborative notebook")),
      g("MANAGED RUNTIME", c("Runtime template", "Region + machine / accelerator", "Colab Enterprise")),
      g("GOVERNED DATA", c("BigQuery", "Authorized queries"), c("Cloud Storage", "Datasets / artifacts")),
      ops()), "Colab Enterprise", "Managed collaborative notebooks"),
  "deep-learning-containers": pair(
    b("Portable curated ML runtime", "Build from a pinned Google-maintained framework image, publish an immutable digest and run the same user-space stack across managed training and Kubernetes GPU environments.", "Google Cloud Deep Learning Containers pattern",
      g("MODEL SOURCE", c("Training code", "Requirements", "file")),
      g("TRUSTED IMAGE", c("Deep Learning Containers", "Framework + CUDA stack"), c("Cloud Build", "Derived image + tests")),
      g("REGISTRY", c("Artifact Registry", "Pinned digest"), c("Artifact Analysis", "Vulnerability metadata")),
      g("RUNTIME", c("Vertex AI", "Managed training"), c("GKE", "GPU workload")),
      ops()), "Deep Learning Containers", "Curated ML container runtime"),
  "deep-learning-vm": pair(
    b("Private GPU research workstation", "Run a curated deep-learning VM without a public IP, let researchers connect through IAP and keep datasets and model artifacts in separately governed cloud services.", "Google Cloud Deep Learning VM workstation pattern",
      g("RESEARCHER", c("Data scientist", "IAP / OS Login", "user")),
      g("ML WORKSTATION", c("Deep Learning VM", "Framework + GPU drivers")),
      g("PRIVATE NETWORK", c("VPC network", "No external IP", "VPC"), c("Identity-Aware Proxy", "Admin access")),
      g("DATA / ARTIFACTS", c("Cloud Storage", "Training data"), c("Artifact Registry", "Models / code")),
      ops()), "Deep Learning VM", "Curated ML virtual machine"),
  "dialogflow-es": pair(
    b("Transactional conversational bot", "Match user utterances to intents and entities, keep turn context in the Dialogflow session and invoke a protected fulfillment service for business actions.", "Google Cloud Dialogflow ES fulfillment pattern",
      g("CHANNELS", c("Web / messaging", "User utterance", "app"), c("Telephony", "Voice session", "Speech-to-Text")),
      g("NLU", c("Dialogflow ES", "Intent + entity + context")),
      g("FULFILLMENT", c("Cloud Run", "Authenticated webhook")),
      g("BUSINESS SYSTEM", c("Cloud SQL", "System of record"), c("External API", "Business action", "internet")),
      ops()), "Dialogflow ES", "Intent-driven conversational NLU"),
  "docai": pair(
    b("Document extraction workflow", "Land documents in a controlled bucket, extract layout-aware entities with Document AI, route low-confidence fields to review and write validated structured results downstream.", "Google Cloud Document AI processing pattern",
      g("DOCUMENT INPUT", c("Cloud Storage", "PDF / image documents")),
      g("DOCUMENT PROCESSING", c("Document AI", "OCR + structured entities")),
      g("QUALITY GATE", c("Confidence rules", "Auto accept / review", "monitor"), c("Human review", "Low-confidence cases", "user")),
      g("STRUCTURED OUTPUT", c("BigQuery", "Extracted records"), c("Cloud Storage", "Source + JSON")),
      ops()), "Document AI", "Layout-aware document processing"),
  "enterprise-knowledge-graph": pair(
    b("Enterprise entity knowledge graph", "Resolve fragmented source records into canonical entities, preserve provenance and expose relationship-aware context to search, analytics and grounded assistants.", "Google Cloud Enterprise Knowledge Graph pattern",
      g("SOURCE SYSTEMS", c("CRM / ERP / catalog", "Enterprise records", "database")),
      g("INGEST / RESOLVE", c("Dataflow", "Normalize / match"), c("Datastream", "Change feeds")),
      g("KNOWLEDGE GRAPH", c("Enterprise Knowledge Graph", "Entities + relationships")),
      g("CONSUMERS", c("Gemini Enterprise Agent Platform", "Grounded assistant"), c("BigQuery", "Analytics")),
      ops()), "Enterprise Knowledge Graph", "Connected enterprise entities"),
  "gemini-enterprise-agent-platform": pair(
    b("ACL-aware enterprise assistant", "Authenticate an employee, retrieve only content they are allowed to see, ground Gemini on that evidence and return a cited answer while keeping tool actions separately authorized.", "Google Cloud Gemini Enterprise grounded-agent pattern",
      g("EMPLOYEE", c("Workforce user", "Signed-in request", "user")),
      g("ENTERPRISE AGENT", c("Gemini Enterprise Agent Platform", "Instructions + conversation")),
      g("GROUNDING", c("Enterprise search", "ACL-filtered retrieval", "search"), c("Enterprise Knowledge Graph", "Curated relationships")),
      g("MODEL / TOOLS", c("Gemini", "Grounded generation", "Vertex AI"), c("Cloud Run", "Approved tool endpoint")),
      ops()), "Gemini Enterprise Agent Platform", "Grounded enterprise agents"),
  "live-stream-api": pair(
    b("Global live video delivery", "Ingest one reliable live contribution feed, transcode it into adaptive HLS/DASH renditions, store manifests and segments in Cloud Storage and distribute them globally through Media CDN.", "Google Cloud Live Stream API delivery pattern",
      g("LIVE SOURCE", c("Venue encoder", "SRT / RTMP feed", "video")),
      g("LIVE TRANSCODE", c("Live Stream API", "Adaptive bitrate ladder")),
      g("MEDIA ORIGIN", c("Cloud Storage", "Segments + manifests")),
      g("DELIVERY", c("Media CDN", "Global edge cache"), c("Viewers", "HLS / DASH playback", "user")),
      ops()), "Live Stream API", "Managed live transcoding"),
  "speech-to-text": pair(
    b("Streaming speech transcription", "Stream microphone or call audio with the correct encoding and locale, receive timestamped recognition results and send only validated transcripts into downstream conversation or analytics systems.", "Google Cloud Speech-to-Text streaming pattern",
      g("AUDIO SOURCE", c("Call / microphone", "Streaming audio", "app")),
      g("SPEECH RECOGNITION", c("Speech-to-Text", "Streaming transcription")),
      g("TEXT PIPELINE", c("Dialogflow ES", "Intent processing"), c("Sensitive Data Protection", "PII inspection")),
      g("ANALYTICS", c("BigQuery", "Transcript analytics")),
      ops()), "Speech-to-Text", "Audio transcription API"),
  "tensorflow-enterprise": pair(
    b("Supported TensorFlow production stack", "Pin a supported TensorFlow and accelerator compatibility stack, validate model behavior in CI and deploy the same tested runtime to managed training or inference infrastructure.", "Google Cloud TensorFlow Enterprise compatibility pattern",
      g("MODEL SOURCE", c("TensorFlow code", "Model + tests", "file")),
      g("SUPPORTED RUNTIME", c("TensorFlow Enterprise", "Supported framework version"), c("Deep Learning Containers", "Pinned image")),
      g("TRAIN / SERVE", c("Vertex AI", "Managed training / endpoint"), c("GKE", "Custom runtime")),
      g("MODEL ARTIFACT", c("Cloud Storage", "SavedModel"), c("Vertex AI Model Registry", "Version metadata", "Vertex AI")),
      ops()), "TensorFlow Enterprise", "Supported TensorFlow version strategy"),
  "text-to-speech": pair(
    b("Dynamic speech synthesis", "Turn approved text or SSML into encoded speech, cache stable prompts as versioned audio and synthesize personalized content on demand for applications and voice channels.", "Google Cloud Text-to-Speech application pattern",
      g("TEXT SOURCE", c("Application / CMS", "Text or SSML", "app")),
      g("SYNTHESIS", c("Text-to-Speech", "Voice + audio encoding")),
      g("AUDIO STORE", c("Cloud Storage", "Versioned audio")),
      g("PLAYBACK", c("Cloud CDN", "Cached delivery"), c("Telephony / app", "User playback", "app")),
      ops()), "Text-to-Speech", "Neural speech synthesis"),
  "transcoder-api": pair(
    b("Video-on-demand publishing", "Trigger an asynchronous transcode when a mezzanine video arrives, create standardized HLS/DASH renditions and thumbnails, then publish the validated output through a CDN.", "Google Cloud Transcoder API VOD pattern",
      g("MEDIA INPUT", c("Cloud Storage", "Mezzanine video")),
      g("ORCHESTRATION", c("Eventarc", "Object event"), c("Workflows", "Validate + submit")),
      g("TRANSCODE", c("Transcoder API", "Renditions + manifests")),
      g("PUBLISH", c("Cloud Storage", "Segments / thumbnails"), c("Media CDN", "Viewer delivery")),
      ops()), "Transcoder API", "Asynchronous VOD transcoding"),
  "translation": pair(
    b("Governed multilingual content pipeline", "Translate source content with an approved glossary, validate placeholders and terminology, then publish localized output while retaining the same data classification as the source.", "Google Cloud Translation localization pattern",
      g("SOURCE CONTENT", c("CMS / application", "Text / documents", "app")),
      g("TRANSLATION", c("Cloud Translation", "Language model + glossary", "Translation")),
      g("QUALITY", c("Glossary", "Approved terminology", "file"), c("Human review", "Priority content", "user")),
      g("LOCALIZED OUTPUT", c("Cloud Storage", "Translated documents"), c("Application", "Localized content", "app")),
      ops()), "Translation", "Text / document translation"),
  "video-intelligence-api": pair(
    b("Searchable video metadata", "Annotate stored video asynchronously with selected features, preserve time-coded metadata and index the results so applications can search or jump directly to relevant moments.", "Google Cloud Video Intelligence API catalog pattern",
      g("VIDEO ASSET", c("Cloud Storage", "Uploaded video")),
      g("ANNOTATION", c("Video Intelligence API", "Shots / labels / text")),
      g("NORMALIZATION", c("Dataflow", "Flatten time-coded annotations")),
      g("SEARCH / ANALYTICS", c("BigQuery", "Metadata analytics"), c("Application", "Search + jump-to-time", "app")),
      ops()), "Video Intelligence API", "Time-coded video annotation"),
  "video-stitcher-api": pair(
    b("Server-side ad insertion", "Create a playback session, obtain an external ad decision and return a personalized HLS/DASH manifest that stitches ads into the program while media segments remain CDN-cacheable.", "Google Cloud Video Stitcher API SSAI pattern",
      g("VIEWER", c("Player application", "Session request", "app")),
      g("SESSION / STITCHING", c("Video Stitcher API", "Personalized manifest")),
      g("AD DECISION", c("Ad decision server", "VAST response", "internet")),
      g("MEDIA DELIVERY", c("Live Stream API", "Live origin"), c("Media CDN", "Program + ad segments")),
      ops()), "Video Stitcher API", "Server-side ad insertion"),
  "vision-api": pair(
    b("Image analysis and OCR", "Submit an image once, request only the pretrained features needed and route likelihood or confidence results through application policy rather than treating model output as a final decision.", "Google Cloud Vision API image-analysis pattern",
      g("IMAGE INPUT", c("Cloud Storage", "Images / pages"), c("Application", "Direct image bytes", "app")),
      g("IMAGE ANALYSIS", c("Vision API", "Labels / OCR / objects")),
      g("POLICY / NORMALIZE", c("Application logic", "Thresholds + validation", "app"), c("Dataflow", "Batch normalization")),
      g("OUTPUT", c("BigQuery", "Indexed metadata"), c("Review queue", "Human decision", "user")),
      ops()), "Vision API", "Pretrained image analysis")
};
