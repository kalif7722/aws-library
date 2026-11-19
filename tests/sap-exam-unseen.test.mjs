import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
const read = path => JSON.parse(fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8'));
const practice = read('docs/sap-c03/module-27-next/questions-draft.json');
const visualManifest = read('app/components/sap-exam/unseen-visuals.json');
const lessonMap = read('app/courses/aws-solutions-architect-professional/visual-lesson-map.json');
const diagnostic = read('app/components/sap-exam/questions.json');

test('each optional practice case has a unique WebP and is not scored by the diagnostic', () => {
  assert.deepEqual(Object.keys(visualManifest).sort(), practice.map(q => q.id).sort());
  assert.equal(new Set(Object.values(visualManifest).map(v => v.path)).size, 5);
  assert.equal(diagnostic.length, 28);
  for (const q of practice) {
    const {path, alt} = visualManifest[q.id];
    assert.match(path, /^\/course-visuals\/sap-c03\/module-27\/help-[a-z0-9-]+\.webp$/);
    assert.ok(alt.length >= 65);
    const b = fs.readFileSync(new URL('../public' + path, import.meta.url));
    assert.equal(b.toString('ascii', 0, 4), 'RIFF');
    assert.equal(b.toString('ascii', 8, 12), 'WEBP');
    assert.equal(b.readUInt32LE(4) + 8, b.length);
    assert.ok(!diagnostic.some(d => d.id === q.id));
  }
});

test('every optional answer points to an exact published teaching lesson', () => {
  for (const q of practice) {
    assert.ok(q.teachBack.length > 0);
    for (const link of q.teachBack) {
      const route = new URL(link.href, 'https://example.test');
      assert.equal(route.pathname, '/courses/aws-solutions-architect-professional/visual/module-' + link.module);
      assert.equal(route.searchParams.get('lesson'), link.id);
      assert.ok(lessonMap.lessonsByModule[link.module]?.some(l => l.id === link.id && l.asset && l.status === 'qa-passed'), link.id);
    }
  }
});
