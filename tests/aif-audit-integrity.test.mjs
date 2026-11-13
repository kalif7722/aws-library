import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const read = path => JSON.parse(fs.readFileSync(new URL(path, root), 'utf8'));
const sha = data => createHash('sha256').update(data).digest('hex');
test('completed pending AIF audits remain bound to the reviewed visuals and lesson explanations', () => {
  const plan = read('app/courses/aws-ai-practitioner/visual-lesson-map.json');
  const audit = read('docs/aif-teaching-depth-audit.json');
  assert.equal(audit.status, 'verified');
  assert.equal(audit.lessons.length, plan.lessons.length);
  const reviewed = audit.lessons.filter(a => a.assetSha256);
  assert.equal(reviewed.length, 188);
  for (const a of reviewed) {
    const lesson = plan.lessons.find(l => l.id === a.lessonId);
    assert.ok(lesson, a.lessonId);
    assert.ok(['verified', 'revised-and-verified'].includes(a.status), a.lessonId);
    assert.deepEqual(a.sourcePages, lesson.sourcePages, a.lessonId);
    assert.equal(sha(fs.readFileSync(new URL('public' + lesson.asset, root))), a.assetSha256, `${a.lessonId}: visual changed since review`);
    assert.equal(sha(JSON.stringify({ title: lesson.title, learningNotes: lesson.learningNotes ?? [] })), a.lessonContentSha256, `${a.lessonId}: explanation changed since review`);
    assert.ok(a.verifiedEvidence.length >= 4, a.lessonId);
  }
  assert.ok(audit.lessons.every(a => ['verified', 'revised-and-verified'].includes(a.status)));
});
