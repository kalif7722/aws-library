import sourceLinks from './DvaSaaReuseSourceLinks.json' with {type: 'json'};
import saaPlan from '../courses/aws-solutions-architect-associate/visual-plan.json' with {type: 'json'};

type Consumer = {id: string; asset: string | null};
type Source = Consumer & {status: string};
type SourceModule = {id: string; lessons?: readonly Source[]};
export type DvaSaaReuseAssets = Record<string, string>;

/** Only reviewed, explicitly audited, SAA-owned visuals may replace a DVA fallback. */
export function resolveDvaSaaReuseAssets(
 moduleId: string,
 consumers: readonly Consumer[],
 modules: readonly SourceModule[] = saaPlan.modules,
): DvaSaaReuseAssets {
 const current = new Map(consumers.map(lesson => [lesson.id, lesson.asset]));
 const results: [string, string][] = [];
 for (const [consumer, link] of Object.entries(sourceLinks)) {
  // A deliberate DVA replacement or move supersedes this historical link.
  if (link.module !== moduleId || current.get(consumer) !== link.fallbackAsset) continue;
  const module = modules.filter(item => item.id === link.sourceModule);
  if (module.length !== 1) continue;
  const candidates = (module[0].lessons ?? []).filter(source => source.id === link.sourceId);
  if (candidates.length !== 1) continue;
  const source = candidates[0];
  const prefix = '/course-visuals/saa-c03/module-' + link.sourceModule + '/';
  if (source.status !== 'reviewed' || !source.asset?.startsWith(prefix)) continue;
  if (!/^[a-z0-9][a-z0-9_-]*\.webp$/.test(source.asset.slice(prefix.length))) continue;
  results.push([consumer, source.asset]);
 }
 return Object.fromEntries(results);
}
