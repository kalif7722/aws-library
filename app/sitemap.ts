import type { MetadataRoute } from "next";

const siteUrl = "https://aws-library.kalifs.workers.dev";

// Keep this public URL list aligned with the course links on the homepage.
// Include only public pages intended for search indexing.
const publicPaths = [
  "/",
  "/services",
  "/azure-services",
  "/gcp-services",
  "/cloud-comparison",
  "/courses/aws-cloud-practitioner",
  "/courses/aws-ai-practitioner",
  "/courses/aws-solutions-architect-associate",
  "/courses/aws-developer-associate",
  "/courses/aws-cloudops-engineer-associate",
  "/courses/aws-data-engineer-associate",
  "/courses/aws-machine-learning-engineer-associate",
  "/courses/aws-solutions-architect-professional",
  "/courses/aws-devops-engineer-professional",
  "/courses/aws-generative-ai-developer-professional",
  "/courses/aws-advanced-networking-specialty",
  "/courses/aws-security-specialty",
  "/courses/azure-az-900",
  "/courses/azure-az-104",
  "/courses/azure-az-305",
  "/courses/azure-az-700",
  "/courses/azure-az-400",
  "/courses/azure-ai-901",
  "/courses/azure-ai-103",
  "/courses/azure-dp-900",
  "/courses/azure-dp-300",
  "/courses/azure-dp-600",
  "/courses/azure-az-140",
  "/courses/azure-az-120",
  "/courses/azure-sc-900",
  "/courses/azure-sc-300",
  "/courses/azure-sc-200",
  "/courses/gcp-cloud-digital-leader",
  "/courses/gcp-generative-ai-leader",
  "/courses/gcp-associate-cloud-engineer",
  "/courses/gcp-associate-data-practitioner",
  "/courses/gcp-associate-google-workspace-administrator",
  "/courses/gcp-professional-cloud-architect",
  "/courses/gcp-professional-cloud-developer",
  "/courses/gcp-professional-data-engineer",
  "/courses/gcp-professional-cloud-database-engineer",
  "/courses/gcp-professional-machine-learning-engineer",
  "/courses/gcp-professional-cloud-security-engineer",
  "/courses/gcp-professional-cloud-devops-engineer",
  "/courses/gcp-professional-cloud-network-engineer",
  "/courses/gcp-professional-agentic-architect",
  "/courses/gcp-professional-security-operations-engineer"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => {
    const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
      path === "/" ? "weekly" : "monthly";

    return {
      url: new URL(path, siteUrl).toString(),
      changeFrequency,
      priority:
        path === "/" ? 1 :
        path === "/cloud-comparison" || path.endsWith("-services") ? 0.8 :
        path.startsWith("/courses/") ? 0.7 : 0.8,
    };
  });
}
