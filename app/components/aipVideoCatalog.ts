/** Published AIP video chapters. Keep the catalog in one place so the
 * playlist, slide study credit, and dashboard cannot disagree about counts. */
export type AipLecturePart = {
  id: string;
  title: string;
  subtitle: string;
  start: number;
  end: number;
};

export const AIP_VIDEO_PARTS: Record<string, readonly AipLecturePart[]> = {
  "00": [
    { id: "00", title: "Course Introduction", subtitle: "Course overview", start: 1, end: 12 },
  ],
  "01": [
    { id: "01", title: "Foundation Models & Amazon Bedrock", subtitle: "Models, APIs and access", start: 1, end: 9 },
    { id: "02", title: "Fine-Tuning & LoRA", subtitle: "Customization approaches", start: 10, end: 13 },
    { id: "03", title: "RAG & Knowledge Bases", subtitle: "Retrieval, vectors and grounding", start: 14, end: 24 },
    { id: "04", title: "Chunking, Embeddings & RAG Quality", subtitle: "Retrieval quality and metadata", start: 25, end: 34 },
    { id: "05", title: "RAG Evaluation & Guardrails", subtitle: "Multimodal AI and prompt management", start: 35, end: 43 },
    { id: "06", title: "Bedrock Flows & Effective Prompting", subtitle: "Structured responses and prompt anatomy", start: 44, end: 50 },
  ],
  "02": [
    { id: "01", title: "Structuring Data for GenAI", subtitle: "JSON, conversations and chunking", start: 1, end: 7 },
    { id: "02", title: "Bedrock Data Automation", subtitle: "Documents, images, video, audio and blueprints", start: 8, end: 15 },
    { id: "03", title: "SageMaker Data Wrangler", subtitle: "Transformations, preparation and common failures", start: 16, end: 21 },
    { id: "04", title: "AWS Glue and Data Quality", subtitle: "ETL, crawler, catalog, partitions and checks", start: 22, end: 28 },
    { id: "05", title: "CloudWatch & Amazon Transcribe", subtitle: "Metrics, speech recognition and content review", start: 29, end: 33 },
    { id: "06", title: "Amazon Comprehend", subtitle: "NLP, custom entities, PII review and medical text", start: 34, end: 39 },
    { id: "07", title: "OpenSearch Fundamentals", subtitle: "Search, dashboards, indexes, shards and replicas", start: 40, end: 46 },
    { id: "08", title: "Operating OpenSearch Domains", subtitle: "Managed domains, lifecycle, stability and security", start: 47, end: 56 },
  ],
};

export function aipVideoId(moduleId: string, partId: string): string {
  return moduleId === "00" ? "aip-video-00" : `aip-video-${moduleId}-${partId}`;
}

export type AipVideoProgress = {
  total: number;
  seen: number;
  completed: number;
  inProgress: number;
  seenIds: string[];
  completedIds: string[];
};

/** A video has been seen once its slide navigation or narration yields study
 * credit. It is completed by watching the video or studying every slide.
 * This also recovers progress stored before these counters were introduced. */
export function getAipVideoProgress(done: readonly string[], moduleId?: string): AipVideoProgress {
  const ids = new Set(done);
  const modules = moduleId ? [moduleId] : Object.keys(AIP_VIDEO_PARTS);
  const seenIds: string[] = [];
  const completedIds: string[] = [];
  let total = 0;
  for (const mod of modules) {
    for (const part of AIP_VIDEO_PARTS[mod] ?? []) {
      total++;
      const id = aipVideoId(mod, part.id);
      let viewedSlides = 0;
      for (let slide = part.start; slide <= part.end; slide++) {
        if (ids.has(`aip-${mod}-${slide}`)) viewedSlides++;
      }
      const finished = ids.has(id) || viewedSlides === part.end - part.start + 1;
      if (finished || viewedSlides > 0) seenIds.push(id);
      if (finished) completedIds.push(id);
    }
  }
  return {
    total, seen: seenIds.length, completed: completedIds.length,
    inProgress: seenIds.length - completedIds.length,
    seenIds, completedIds,
  };
}
