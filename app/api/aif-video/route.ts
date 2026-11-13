import { NextRequest } from "next/server";

// AIF has separate original visuals and media storage from the AIP course.
const ROOT = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/aif";
const MODULES: Record<string, { title: string; revision: string; count: number; firstSlide: number; firstTitle: string }> = {
  "08-01": { title: "Managed AI APIs and Amazon Comprehend Text Analysis",
    revision: "2026-11-13-aif-m08-p01-visual-first-webp-audit-v2",
    count: 5, firstSlide: 1, firstTitle: "Why AWS AI Managed Services?" },
  "08-02": { title: "Translation, Speech Transcription and Polly Voices",
    revision: "2026-11-13-aif-m08-p02-visual-first-webp-audit-v2",
    count: 6, firstSlide: 6, firstTitle: "Amazon Translate" },
  "08-03": { title: "Rekognition, Custom Labels and Moderation",
    revision: "2026-11-13-aif-m08-p03-visual-first-webp-audit-v2",
    count: 4, firstSlide: 12, firstTitle: "Amazon Rekognition" },
  "08-04": { title: "Lex Conversations and Personalize Recommendations",
    revision: "2026-11-13-aif-m08-p04-visual-first-webp-audit-v2",
    count: 3, firstSlide: 16, firstTitle: "Amazon Lex" },
  "08-05": { title: "Textract, Enterprise Search and Human Review",
    revision: "2026-11-13-aif-m08-p05-visual-first-webp-audit-v2",
    count: 5, firstSlide: 19, firstTitle: "Amazon Textract" },
  "08-06": { title: "Medical Speech, Clinical Entities and Safe Review",
    revision: "2026-11-13-aif-m08-p06-visual-first-webp-audit-v2",
    count: 3, firstSlide: 24, firstTitle: "Amazon Transcribe Medical" },
  "08-07": { title: "EC2 Fundamentals and AI Accelerator Choices",
    revision: "2026-11-13-aif-m08-p07-visual-first-webp-audit-v2",
    count: 3, firstSlide: 27, firstTitle: "Amazon EC2" },
  "07-01": { title: "Enterprise Retrieval, Citations and Access Permissions",
    revision: "2026-11-13-aif-m07-p01-beginner-visual-v1",
    count: 4, firstSlide: 1, firstTitle: "Amazon Q Business" },
  "07-02": { title: "Q Business Controls and Q Apps in Context",
    revision: "2026-11-13-aif-m07-p02-beginner-visual-v1",
    count: 2, firstSlide: 5, firstTitle: "Q Business admin controls" },
  "07-03": { title: "Amazon Q Developer for AWS and Coding Workflows",
    revision: "2026-11-13-aif-m07-p03-beginner-visual-v1",
    count: 4, firstSlide: 7, firstTitle: "Amazon Q Developer" },
  "07-04": { title: "Analytics, EC2, Chat Operations and Glue Assistance",
    revision: "2026-11-13-aif-m07-p04-beginner-visual-v1",
    count: 4, firstSlide: 11, firstTitle: "Generative BI in Amazon Quick" },
  "07-05": { title: "PartyRock — Building a No-Code AI Playground",
    revision: "2026-11-13-aif-m07-p05-beginner-visual-v1",
    count: 1, firstSlide: 15, firstTitle: "PartyRock app playground" },
  "06-01": { title: "Clear Prompts, Context and Negative Instructions",
    revision: "2026-11-13-aif-m06-p01-beginner-visual-v1",
    count: 4, firstSlide: 1, firstTitle: "Prompt engineering: give the model a clear task" },
  "06-02": { title: "Sampling Controls, Token Choice and Latency",
    revision: "2026-11-13-aif-m06-p02-beginner-visual-v1",
    count: 3, firstSlide: 5, firstTitle: "Token probabilities and sampling" },
  "06-03": { title: "Zero-Shot, Few-Shot, Structured Prompts and RAG",
    revision: "2026-11-13-aif-m06-p03-beginner-visual-v1",
    count: 4, firstSlide: 8, firstTitle: "Zero-shot prompting" },
  "06-04": { title: "Prompt Templates, Injection and Safe Applications",
    revision: "2026-11-13-aif-m06-p04-beginner-visual-v1",
    count: 4, firstSlide: 12, firstTitle: "Reusable prompt templates" },
  "05-01": { title: "Fine-Tuning and Continued Pre-Training",
    revision: "2026-11-13-aif-m05-p01-verified-webp-visualfirst-v2",
    count: 3, firstSlide: 1, firstTitle: "Fine-tuning a model in Amazon Bedrock" },
  "05-02": { title: "Training Datasets, Transfer Learning and Customization Choices",
    revision: "2026-11-13-aif-m05-p02-beginner-visual-v1",
    count: 5, firstSlide: 4, firstTitle: "Single-turn instruction-tuning datasets" },
  "05-03": { title: "Evaluating Foundation Models and Business Outcomes",
    revision: "2026-11-13-aif-m05-p03-beginner-visual-v1",
    count: 6, firstSlide: 9, firstTitle: "Amazon Bedrock – Evaluating a Model" },
  "05-04": { title: "RAG, Knowledge Bases and Vector Search",
    revision: "2026-11-13-aif-m05-p04-beginner-visual-v1",
    count: 6, firstSlide: 15, firstTitle: "Amazon Bedrock – RAG & Knowledge Base" },
  "05-05": { title: "Guardrails and Bedrock Agent Workflows",
    revision: "2026-11-13-aif-m05-p05-beginner-visual-v1",
    count: 4, firstSlide: 21, firstTitle: "Amazon Bedrock – Guardrails" },
  "05-06": { title: "Monitoring, Pricing and Cost Optimization",
    revision: "2026-11-13-aif-m05-p06-beginner-visual-v1",
    count: 4, firstSlide: 25, firstTitle: "Amazon Bedrock & CloudWatch" },
  "03-16": { title: "Machine Learning Lifecycle — From Business Goals to Monitoring",
    revision: "2026-11-13-aif-m03-p16-beginner-visual-v1",
    count: 5, firstSlide: 54, firstTitle: "The ML lifecycle: complete overview" },
  "03-17": { title: "Hyperparameter Tuning and How to Prevent Overfitting",
    revision: "2026-11-13-aif-m03-p17-beginner-visual-v1",
    count: 3, firstSlide: 59, firstTitle: "Hyperparameter tuning: concepts and purpose" },
  "03-18": { title: "Choosing Traditional Rules Instead of Machine Learning",
    revision: "2026-11-13-aif-m03-p18-beginner-visual-v1",
    count: 1, firstSlide: 62, firstTitle: "When machine learning is not the right solution" },
  "04-04": { title: "Amazon Bedrock — Managed Model Access and Application Architecture",
    revision: "2026-11-13-aif-m04-p04-beginner-visual-v1",
    count: 3, firstSlide: 12, firstTitle: "Amazon Bedrock: the managed foundation-model layer" },
  "04-05": { title: "Choosing Bedrock Models for Real Business Workloads",
    revision: "2026-11-13-aif-m04-p05-beginner-visual-v1",
    count: 2, firstSlide: 15, firstTitle: "Choosing a base foundation model in Bedrock" },
  "04-06": { title: "Tokens, Context Windows and Semantic Embeddings",
    revision: "2026-11-13-aif-m04-p06-beginner-visual-v1",
    count: 4, firstSlide: 17, firstTitle: "Tokenization: words and subwords" },
  "04-01": { title: "Generative AI and Foundation Models — What They Are and How to Choose",
    revision: "2026-11-13-aif-m04-p01-beginner-visual-v1",
    count: 3, firstSlide: 1, firstTitle: "Generative AI: from patterns to new content" },
  "04-02": { title: "How Large Language Models Predict and Sample Tokens",
    revision: "2026-11-13-aif-m04-p02-beginner-visual-v1",
    count: 4, firstSlide: 4, firstTitle: "Large language models (LLMs)" },
  "04-03": { title: "Image Generation, Visual Understanding and Diffusion",
    revision: "2026-11-13-aif-m04-p03-beginner-visual-v1",
    count: 4, firstSlide: 8, firstTitle: "Text-to-image generation" },
  "00-01": { title: "Start Here — Your AI Practitioner Learning Journey",
    revision: "2026-11-13-aif-m00-p01-beginner-visual-v1",
    count: 4, firstSlide: 1, firstTitle: "Your AI Practitioner learning path" },
  "03-01": { title: "AI Fundamentals, Use Cases and Rule-Based vs Learning Systems",
    revision: "2026-11-13-aif-m03-p01-beginner-visual-v1",
    count: 5, firstSlide: 1, firstTitle: "AI definitions and scope" },
  "03-05": { title: "Supervised Learning — Regression and Classification",
    revision: "2026-11-13-aif-m03-p05-beginner-visual-v1",
    count: 3, firstSlide: 19, firstTitle: "Supervised learning: learn from labeled examples" },
  "03-07": { title: "Unstructured Features and Unsupervised Pattern Discovery",
    revision: "2026-11-13-aif-m03-p07-beginner-visual-v1",
    count: 5, firstSlide: 25, firstTitle: "Feature Engineering on Unstructured Data" },
  "03-08": { title: "Semi-Supervised and Self-Supervised Learning Explained",
    revision: "2026-11-13-aif-m03-p08-beginner-visual-v1",
    count: 3, firstSlide: 30, firstTitle: "Semi-supervised learning" },
  "03-10": { title: "Reinforcement Learning Applications and Safe Sequential Decisions",
    revision: "2026-11-13-aif-m03-p10-beginner-visual-v1",
    count: 1, firstSlide: 37, firstTitle: "Applications of Reinforcement Learning" },
  "03-11": { title: "RLHF — Learning from Human Preferences and Response Quality",
    revision: "2026-11-13-aif-m03-p11-beginner-visual-v1",
    count: 3, firstSlide: 38, firstTitle: "What is RLHF?" },
  "03-13": { title: "Classification Evaluation — Confusion Matrices, Precision, Recall and ROC",
    revision: "2026-11-13-aif-m03-p13-beginner-visual-v1",
    count: 4, firstSlide: 46, firstTitle: "Binary classification: worked example" },
  "03-14": { title: "Regression Evaluation — MAE, MAPE, RMSE and R-Squared",
    revision: "2026-11-13-aif-m03-p14-beginner-visual-v1",
    count: 2, firstSlide: 50, firstTitle: "Model Evaluation – Regression Metrics" },
  "03-15": { title: "Choosing Inference Modes — Real-Time, Batch, Asynchronous, Serverless and Edge",
    revision: "2026-11-13-aif-m03-p15-beginner-visual-v1",
    count: 2, firstSlide: 52, firstTitle: "Choose an inference mode" },
  "03-12": { title: "Generalization — Underfitting, Overfitting and Bias–Variance Trade-offs",
    revision: "2026-11-13-aif-m03-p12-beginner-visual-v1",
    count: 5, firstSlide: 41, firstTitle: "Model fit: underfitting, good fit and overfitting" },
  "03-09": { title: "Reinforcement Learning — Rewards, Policies and Exploration",
    revision: "2026-11-13-aif-m03-p09-beginner-visual-v1",
    count: 4, firstSlide: 33, firstTitle: "Reinforcement learning fundamentals" },
  "03-06": { title: "Preparing and Evaluating ML Data — Splits, Features and Leakage",
    revision: "2026-11-13-aif-m03-p06-beginner-visual-v1",
    count: 3, firstSlide: 22, firstTitle: "Training vs. Validation vs. Test Set" },
  "03-04": { title: "Training Data, Labels and Structured versus Unstructured Information",
    revision: "2026-11-13-aif-m03-p04-beginner-visual-v1",
    count: 4, firstSlide: 15, firstTitle: "Training Data" },
  "03-03": { title: "Generative AI, Transformers, Diffusion and Multimodal Models Explained",
    revision: "2026-11-13-aif-m03-p03-beginner-visual-v1",
    count: 6, firstSlide: 9, firstTitle: "What is Generative AI (Gen-AI)?" },
  "03-02": { title: "Deep Learning and Neural Networks Explained Visually",
    revision: "2026-11-13-aif-m03-p02-beginner-visual-v1",
    count: 3, firstSlide: 6, firstTitle: "What is Deep Learning (DL)?" },
  "02-05": { title: "AWS Console, Security Responsibilities and Safe Learning Costs",
    revision: "2026-11-13-aif-m02-p05-beginner-visual-v1",
    count: 4, firstSlide: 26, firstTitle: "Finding services in the AWS Console" },
  "02-04": { title: "AWS History, Global Infrastructure and Regional Design",
    revision: "2026-11-13-aif-m02-p04-beginner-visual-v1",
    count: 8, firstSlide: 18, firstTitle: "How AWS cloud services developed" },
  "02-03": { title: "Cloud Service Models, Responsibility and Pricing",
    revision: "2026-11-13-aif-m02-p03-beginner-visual-v1",
    count: 4, firstSlide: 14, firstTitle: "IaaS, PaaS and SaaS" },
  "02-02": { title: "What Cloud Computing Is and Why Businesses Use It",
    revision: "2026-11-13-aif-m02-p02-beginner-visual-v1",
    count: 7, firstSlide: 7, firstTitle: "What is cloud computing?" },
  "02-01": { title: "Cloud Foundations — How the Internet and Servers Work",
    revision: "2026-11-13-aif-m02-p01-beginner-visual-v1",
    count: 6, firstSlide: 1, firstTitle: "How a website request reaches a server" },
  "01-01": { title: "AI Fundamentals — From Everyday Examples to Generative AI",
    revision: "2026-11-13-aif-m01-p01-beginner-visual-v1",
    count: 6, firstSlide: 1, firstTitle: "What is artificial intelligence?" },
};
type Scene = {slide?: number; title?: string; start_seconds?: number; duration_seconds?: number};
type Manifest = {
  module?: string; part?: string; script_revision?: string; duration_seconds?: number;
  scenes?: Scene[];
};
const responseHeaders = {"Cache-Control": "no-store, max-age=0"};
const processing = () => Response.json({status:"processing"}, {headers:responseHeaders});

// The R2 manifest is the publication catalog for each video. Neither a script revision
// change nor a new slide title requires a new site commit or a Cloudflare rebuild.
export async function GET(request: NextRequest) {
  const module = request.nextUrl.searchParams.get("module") ?? "";
  const part = request.nextUrl.searchParams.get("part") ?? "01";
  if (!/^[0-9]{2}$/.test(module) || !/^[0-9]{2}$/.test(part))
    return Response.json({error:"Invalid video module or part."}, {status:400,headers:responseHeaders});
  const config = MODULES[`${module}-${part}`]; // Optional display metadata; never an availability gate.
  const stem = `aif-module-${module}-part-${part}`;
  const prefix = `${ROOT}/module-${module}/part-${part}/${stem}`;
  try {
    const result = await fetch(`${prefix}-manifest.json?check=${Date.now()}`, {
      cache:"no-store", signal:AbortSignal.timeout(6500),
    });
    if (!result.ok) return processing();
    const manifest = await result.json() as Manifest;
    const scenes = manifest.scenes ?? [];
    // Validate the published media itself, not duplicated title/revision constants.
    if (manifest.module !== module || manifest.part !== part ||
        !manifest.script_revision || !Number.isFinite(manifest.duration_seconds) ||
        (manifest.duration_seconds ?? 0) <= 0 || scenes.length === 0 ||
        scenes.some((scene,i) => !Number.isInteger(scene.slide) ||
          (i > 0 && scene.slide !== (scenes[i-1].slide ?? 0)+1) ||
          !scene.title || !Number.isFinite(scene.start_seconds) ||
          !Number.isFinite(scene.duration_seconds) ||
          (scene.duration_seconds ?? 0) <= 0)) return processing();
    const version = `?v=${encodeURIComponent(manifest.script_revision)}`;
    const videoUrl = `${prefix}.mp4${version}`;
    let media = await fetch(videoUrl, {method:"HEAD",cache:"no-store",signal:AbortSignal.timeout(6500)});
    await media.body?.cancel();
    if (!media.ok) {
      media = await fetch(videoUrl,{method:"GET",headers:{Range:"bytes=0-0"},
        cache:"no-store",signal:AbortSignal.timeout(6500)});
      await media.body?.cancel();
      if (!media.ok) return processing();
    }
    return Response.json({
      status:"ready",module,part,revision:manifest.script_revision,
      title:config?.title ?? scenes[0].title ?? `Video lesson ${part}`,
      videoUrl,captionsUrl:`${prefix}.vtt${version}`,
      transcriptUrl:`${prefix}-transcript.txt${version}`,
      durationSeconds:manifest.duration_seconds,
      chapters:scenes.map(scene=>({slide:scene.slide,title:scene.title,
        startSeconds:scene.start_seconds,durationSeconds:scene.duration_seconds}))
    },{headers:responseHeaders});
  } catch {return processing();}
}
