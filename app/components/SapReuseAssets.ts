import sourceLinks from './SapReuseSourceLinks.json';
import {publishedModuleLessons, publishedSapImageUrl} from './SapPublishedLessons';

type Course = keyof typeof sourceLinks;
type SourceLink = readonly [moduleId: string, lessonId: string];
type ModuleLinks = Record<string, SourceLink>;
export type SapReuseAssets = Record<string, string>;

type SapVisual = {id: string; asset: string | null; status: string};
type ConsumerVisual = {id: string; asset: string | null};
type PublishedModule = (moduleId: string) => readonly SapVisual[];
// Retain reviewed artwork where a newer canonical revision changes the learner objective.
// Only the exact existing receiver, source and fallback may match this exception.
const retainedArt: Record<string, readonly [string, string, string]> = {
 'saa:18:saa-18-reuse-06-37': ['06', 'sap-06-037', '/course-visuals/sap-c03/module-06/slide-37-v2.webp'],
 'saa:01:sap01-07': ['01', 'sap-01-007', '/course-visuals/sap-c03/module-01/slide-07.webp']
};


/**
 * Stable consumer lesson ID → stable SAP lesson ID. No duplicated file versions.
 * Only active SAP gallery visuals resolve. If a source is withdrawn or missing,
 * the consumer keeps its existing asset and no provenance note is added.
 */
export function resolveSapReuseAssets(
 course: Course,
 moduleId: string,
 consumerVisuals: readonly ConsumerVisual[],
 published: PublishedModule = publishedModuleLessons,
): SapReuseAssets {
 const links = (sourceLinks[course] as unknown as Record<string, ModuleLinks>)[moduleId] ?? {};
 const currentAssets = new Map(consumerVisuals.map(lesson => [lesson.id, lesson.asset]));
 const perModule = new Map<string, Map<string, SapVisual>>();
 const resolved: [string, string][] = [];
 for (const [consumerId, [sourceModule, sourceId]] of Object.entries(links)) {
  // A course-owned replacement supersedes its historical SAP link.
  if (!currentAssets.get(consumerId)?.startsWith('/course-visuals/sap-c03/')) continue;
  let lessons = perModule.get(sourceModule);
  if (!lessons) {
   lessons = new Map(published(sourceModule).map(lesson => [lesson.id, lesson]));
   perModule.set(sourceModule, lessons);
  }
  const source = lessons.get(sourceId);
  if (source?.status === 'qa-passed' && source.asset) {
   const pin = retainedArt[`${course}:${moduleId}:${consumerId}`];
   const keep = pin && pin[0] === sourceModule && pin[1] === sourceId && pin[2] === currentAssets.get(consumerId);
   resolved.push([consumerId, keep ? pin[2] : publishedSapImageUrl(sourceModule, source.asset)]);
  }
 }
 return Object.fromEntries(resolved);
}
