import inventory from "../docs/gcp/gcp-services.json";
import iconManifest from "../docs/gcp/icon-manifest.json";
import content from "../docs/gcp/service-content.json";

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
};
export const gcpServices = inventory.services as GcpService[];
export const gcpCategories = inventory.categories;
export const gcpContent = Object.fromEntries((content.services as GcpContent[]).map(item => [item.slug, item]));
export const gcpSourceUrl = inventory.source.url;
// Pending / generated-only images are never advertised as available.
export const gcpAssetReady = (status?: string) => /^(READY|PUBLISHED|VERIFIED|VALIDATED|MAPPED|COMPLETE|COMPLETED)$/i.test(status || "");
// Manifest paths remain local until an explicit published URL replaces them.
export const gcpAssetUrl = (path: string) => path;

export const gcpIcons = iconManifest.serviceMappings as Record<string, {path:string | null; label:string | null; kind:string; fallback?:boolean}>;
