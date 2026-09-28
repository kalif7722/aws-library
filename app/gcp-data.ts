import inventory from "../docs/gcp/gcp-services.json";
import iconManifest from "../docs/gcp/icon-manifest.json";
import content from "../docs/gcp/service-content.json";
import detailedContent from "../docs/gcp/service-content-detailed.json";
import aiMlContent from "../docs/gcp/service-content-ai-ml.json";
import appDevelopmentContent from "../docs/gcp/service-content-app-development.json";
import appHostingContent from "../docs/gcp/service-content-app-hosting.json";
import computeContent from "../docs/gcp/service-content-compute.json";
import dataAnalyticsContent from "../docs/gcp/service-content-data-analytics.json";
import databasesContent from "../docs/gcp/service-content-databases.json";
import hybridMulticloudContent from "../docs/gcp/service-content-hybrid-multicloud.json";
import industrySolutionsContent from "../docs/gcp/service-content-industry-solutions.json";
import migrationContent from "../docs/gcp/service-content-migration.json";
import networkingContent from "../docs/gcp/service-content-networking.json";
import observabilityContent from "../docs/gcp/service-content-observability.json";
import securityContent from "../docs/gcp/service-content-security.json";
import storageContent from "../docs/gcp/service-content-storage.json";
import { assetUrl } from "../lib/asset-url";
import { gcpArchitectureBoardsBySlug, type GcpArchitectureBoard } from "../lib/gcp-architecture-boards";
import { gcpComputeArchitectureBoards } from "../lib/gcp-architecture-boards-compute";
import { gcpNetworkingArchitectureBoards } from "../lib/gcp-architecture-boards-networking";
import { gcpAnalyticsArchitectureBoards } from "../lib/gcp-architecture-boards-analytics";
import { gcpDatabaseArchitectureBoards } from "../lib/gcp-architecture-boards-databases";
import { gcpSecurityArchitectureBoards } from "../lib/gcp-architecture-boards-security";
import { gcpStorageArchitectureBoards } from "../lib/gcp-architecture-boards-storage";
import { gcpObservabilityArchitectureBoards } from "../lib/gcp-architecture-boards-observability";

export type GcpService = {
  slug: string; displayName: string; canonicalName: string; categorySlug: string;
  officialCategory: string; aliases: string[]; abbreviations: string[]; description?: string;
  documentationUrl: string | null; el10Path: string; el10Status: string;
  primaryWalkthroughPath: string; primaryWalkthroughStatus?: string;
  companionWalkthroughPath: string; companionWalkthroughStatus?: string;
};
export type GcpContent = {
  slug: string; summary?: string; concepts?: string[]; applicationFit?: string[];
  architectureVersion?: number;
  architecture?: string[]; security?: string[]; operations?: string[]; watchPoints?: string[];
  cost?: string[]; alternatives?: string[]; relatedServices?: string[];
  sources?: { title: string; url: string }[];
  architectureBoards?: GcpArchitectureBoard[];
  architectureFlows?: { title: string; note: string; reference?: string; steps: { title: string; items: string[] }[] }[];
  consoleSteps?: { title: string; detail: string }[];
  comparisons?: { name: string; fit: string }[];
  memoryHooks?: string[];
};
export const gcpServices = inventory.services as GcpService[];
export const gcpCategories = inventory.categories;
const baseGcpContent = Object.fromEntries((content.services as GcpContent[]).map(item => [item.slug, item]));
const detailedGcpContent = Object.fromEntries((detailedContent.services as GcpContent[]).map(item => [item.slug, item]));
const aiMlGcpContent = Object.fromEntries((aiMlContent.services as GcpContent[]).map(item => [item.slug, item]));
const appDevelopmentGcpContent = Object.fromEntries((appDevelopmentContent.services as GcpContent[]).map(item => [item.slug, item]));
const appHostingGcpContent = Object.fromEntries((appHostingContent.services as GcpContent[]).map(item => [item.slug, item]));
const computeGcpContent = Object.fromEntries((computeContent.services as GcpContent[]).map(item => [item.slug, item]));
const dataAnalyticsGcpContent = Object.fromEntries((dataAnalyticsContent.services as GcpContent[]).map(item => [item.slug, item]));
const databasesGcpContent = Object.fromEntries((databasesContent.services as GcpContent[]).map(item => [item.slug, item]));
const hybridMulticloudGcpContent = Object.fromEntries((hybridMulticloudContent.services as GcpContent[]).map(item => [item.slug, item]));
const industrySolutionsGcpContent = Object.fromEntries((industrySolutionsContent.services as GcpContent[]).map(item => [item.slug, item]));
const migrationGcpContent = Object.fromEntries((migrationContent.services as GcpContent[]).map(item => [item.slug, item]));
const networkingGcpContent = Object.fromEntries((networkingContent.services as GcpContent[]).map(item => [item.slug, item]));
const observabilityGcpContent = Object.fromEntries((observabilityContent.services as GcpContent[]).map(item => [item.slug, item]));
const securityGcpContent = Object.fromEntries((securityContent.services as GcpContent[]).map(item => [item.slug, item]));
const storageGcpContent = Object.fromEntries((storageContent.services as GcpContent[]).map(item => [item.slug, item]));
const mergedGcpContent = { ...baseGcpContent, ...detailedGcpContent, ...aiMlGcpContent, ...appDevelopmentGcpContent, ...appHostingGcpContent, ...computeGcpContent, ...dataAnalyticsGcpContent, ...databasesGcpContent, ...hybridMulticloudGcpContent, ...industrySolutionsGcpContent, ...migrationGcpContent, ...networkingGcpContent, ...observabilityGcpContent, ...securityGcpContent, ...storageGcpContent } as Record<string, GcpContent>;
const architectureBoardsBySlug: Record<string, GcpArchitectureBoard[]> = { ...gcpArchitectureBoardsBySlug, ...gcpComputeArchitectureBoards, ...gcpNetworkingArchitectureBoards, ...gcpAnalyticsArchitectureBoards, ...gcpDatabaseArchitectureBoards, ...gcpSecurityArchitectureBoards, ...gcpStorageArchitectureBoards, ...gcpObservabilityArchitectureBoards };
export const gcpContent = Object.fromEntries(Object.entries(mergedGcpContent).map(([slug, details]) => [slug, architectureBoardsBySlug[slug] ? { ...details, architectureBoards: architectureBoardsBySlug[slug] } : details])) as Record<string, GcpContent>;
export const gcpSourceUrl = inventory.source.url;

// Status is still useful for reviewed/published walkthroughs, but EL10 visuals are
// discovered directly from their mapped R2 path so a correctly named upload can
// appear without editing this inventory file again.
export const gcpAssetReady = (status?: string) => /^(READY|PUBLISHED|VERIFIED|VALIDATED|MAPPED|COMPLETE|COMPLETED)$/i.test(status || "");

const gcpR2Base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
export const gcpAssetUrl = (path: string) => {
  const configured = assetUrl(path);
  return configured === path ? gcpR2Base + (path.startsWith("/") ? path : `/${path}`) : configured;
};

export const gcpIcons = iconManifest.serviceMappings as Record<string, {path:string | null; label:string | null; kind:string; fallback?:boolean}>;
