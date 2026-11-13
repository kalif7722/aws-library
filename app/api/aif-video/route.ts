import { NextRequest } from "next/server";

// AIF has separate original visuals and media storage from the AIP course.
const ROOT = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-course-videos/previews/aif";
const MODULES: Record<string, { title: string; revision: string; count: number; firstSlide: number; firstTitle: string }> = {
  "03-16": { title: "Machine Learning Lifecycle — From Business Goals to Monitoring",
    revision: "2026-11-13-aif-m03-p16-beginner-visual-v1",
    count: 5, firstSlide: 54, firstTitle: "The ML lifecycle: complete overview" },
  "03-17": { title: "Hyperparameter Tuning and How to Prevent Overfitting",
    revision: "2026-11-13-aif-m03-p17-beginner-visual-v1",
    count: 3, firstSlide: 59, firstTitle: "Hyperparameter tuning: concepts and purpose" },
  "03-18": { title: "Choosing Traditional Rules Instead of Machine Learning",
    revision: "2026-11-13-aif-m03-p18-beginner-visual-v1",
    count: 1, firstSlide: 62, firstTitle: "When machine learning is not the right solution" },
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
type Manifest = {script_revision?: string; duration_seconds?: number; scenes?: Scene[]};
const processing = () => Response.json({status:"processing"}, {headers:{"Cache-Control":"no-store"}});
export async function GET(request: NextRequest) {
  const module = request.nextUrl.searchParams.get("module") ?? "";
  const part = request.nextUrl.searchParams.get("part") ?? "01";
  const config = MODULES[`${module}-${part}`];
  if (!config) return Response.json({error:"No video lesson is mapped for this module."}, {status:404});
  const stem = `aif-module-${module}-part-${part}`;
  const prefix = `${ROOT}/module-${module}/part-${part}/${stem}`;
  const version = `?v=${encodeURIComponent(config.revision)}`;
  try {
    const result = await fetch(`${prefix}-manifest.json${version}`, {
      cache:"no-store", signal:AbortSignal.timeout(6500),
    });
    if (!result.ok) return processing();
    const manifest = await result.json() as Manifest;
    const scenes = manifest.scenes ?? [];
    if (manifest.script_revision !== config.revision ||
        scenes.length !== config.count || scenes[0]?.title !== config.firstTitle ||
        scenes.some((scene,i) => scene.slide !== config.firstSlide+i ||
          !Number.isFinite(scene.start_seconds) ||
          !Number.isFinite(scene.duration_seconds))) return processing();
    const videoUrl = `${prefix}.mp4${version}`;
    let media = await fetch(videoUrl, {method:"HEAD", cache:"no-store",signal:AbortSignal.timeout(6500)});
    await media.body?.cancel();
    if (!media.ok) {
      media = await fetch(videoUrl,{method:"GET",headers:{Range:"bytes=0-0"},cache:"no-store",signal:AbortSignal.timeout(6500)});
      await media.body?.cancel();
      if (!media.ok) return processing();
    }
    return Response.json({
      status:"ready",module,part,title:config.title,videoUrl,
      captionsUrl:`${prefix}.vtt${version}`,
      transcriptUrl:`${prefix}-transcript.txt${version}`,
      durationSeconds:manifest.duration_seconds,
      chapters:scenes.map(scene=>({slide:scene.slide,title:scene.title,
        startSeconds:scene.start_seconds,durationSeconds:scene.duration_seconds}))
    },{headers:{"Cache-Control":"no-store"}});
  } catch {return processing();}
}
