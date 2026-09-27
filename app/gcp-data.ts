import inventory from "../docs/gcp/gcp-services.json";
import iconManifest from "../docs/gcp/icon-manifest.json";
import content from "../docs/gcp/service-content.json";
import pilotContent from "../docs/gcp/pilot-service-content.json";
import { assetUrl } from "../lib/asset-url";

export type GcpService = {
  slug: string; displayName: string; canonicalName: string; categorySlug: string;
  officialCategory: string; aliases: string[]; abbreviations: string[]; description?: string;
  documentationUrl: string | null; el10Path: string; el10Status: string;
  primaryWalkthroughPath: string; primaryWalkthroughStatus?: string;
  companionWalkthroughPath: string; companionWalkthroughStatus?: string;
};
export type GcpContent = {
  slug: string; summary?: string; concepts?: string[]; applicationFit?: string[];
  architecture?: string[]; security?: string[]; operations?: string[]; watchPoints?: string[];
  cost?: string[]; alternatives?: string[]; relatedServices?: string[];
  sources?: { title: string; url: string }[];
  sections?: { title: string; kind: string; body?: string; steps?: string[] }[];
};
export const gcpServices = inventory.services as GcpService[];
export const gcpCategories = inventory.categories;
const baseGcpContent = Object.fromEntries((content.services as GcpContent[]).map(item => [item.slug, item]));
const pilotGcpContent = Object.fromEntries((pilotContent.services as GcpContent[]).map(item => [item.slug, item]));
export const gcpContent = { ...baseGcpContent, ...pilotGcpContent };
export const gcpSourceUrl = inventory.source.url;

// Status is still useful for reviewed/published walkthroughs, but EL10 visuals are
// discovered directly from their mapped R2 path so a correctly named upload can
// appear without editing this inventory file again.
export const gcpAssetReady = (status?: string) => /^(READY|PUBLISHED|VERIFIED|VALIDATED|MAPPED|COMPLETE|COMPLETED)$/i.test(status || "");

const gcpR2Base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
export const gcpAssetCandidates = (path: string) => {
  const configured = assetUrl(path);
  return configured === path ? gcpR2Base + (path.startsWith("/") ? path : `/${path}`) : configured;
};

export const gcpIcons = iconManifest.serviceMappings as Record<string, {path:string | null; label:string | null; kind:string; fallback?:boolean}>;