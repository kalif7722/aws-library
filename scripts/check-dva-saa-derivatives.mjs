import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import lock from './dva-saa-derivative-source-lock.json' with {type:'json'};
import saa from '../app/courses/aws-solutions-architect-associate/visual-plan.json' with {type:'json'};
import dva from '../app/courses/aws-developer-associate/visual-plan.json' with {type:'json'};
import direct from '../app/components/DvaSaaReuseSourceLinks.json' with {type:'json'};
import {resolveDvaSaaReuseAssets} from '../app/components/DvaSaaReuseAssets.ts';

const find = (plan,module,id) => plan.modules.find(m=>m.id===module)?.lessons?.find(l=>l.id===id);
const file = asset => {
 if (!/^\/course-visuals\/(?:saa|dva)-c03\/module-\d{2}\/[a-z0-9_-]+\.webp$/.test(asset??'')) return;
 try {return readFileSync(fileURLToPath(new URL('../public'+asset, import.meta.url)));} catch (e) {if(e.code!=='ENOENT')throw e;}
};
const blob = bytes => createHash('sha1').update('blob '+bytes.length+'\0').update(bytes).digest('hex');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const findings = [];
for (const [id,l] of Object.entries(lock.derivatives)) {
 const current = find(dva,l.module,id), source = find(saa,l.sourceModule,l.sourceId);
 const issues = [];
 if (current?.asset !== l.derivativeAsset) issues.push('DVA derivative mapping changed');
 else {
  const bytes=file(current.asset);
  if (!bytes || sha256(bytes) !== l.derivativeSha256) issues.push('DVA derivative bytes missing or changed');
 }
 if (source && source.status !== l.sourceStatus) issues.push('SAA source review status changed');
 if (source?.asset !== l.sourceAsset) issues.push('SAA source missing or asset path changed');
 else {
  const bytes=file(source.asset);
  if (!bytes || blob(bytes) !== l.sourceGitBlob) issues.push('SAA source bytes missing or changed');
 }
 if (issues.length) findings.push({id, sourceId:l.sourceId, issues});
}
const directChecks = [];
for (const [id,l] of Object.entries(direct)) {
 const consumer=find(dva,l.module,id);
 // DVA-owned edits intentionally disable reuse; report them rather than rewriting.
 const target=consumer && resolveDvaSaaReuseAssets(l.module,[consumer])[id];
 const fallbackPresent=Boolean(file(l.fallbackAsset));
 directChecks.push({id,target:target??null,fallbackPresent});
 if (target ? !file(target) || !fallbackPresent : !fallbackPresent) findings.push({id,issues:['Direct SAA target or fallback physical file missing']});
}
console.log(JSON.stringify({derivatives:Object.keys(lock.derivatives).length,directChecks,findings},null,2));
process.exitCode = findings.length ? 1 : 0;
