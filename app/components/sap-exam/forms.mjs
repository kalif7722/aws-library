// The AWS blueprint applies these weights to the 65 scored questions, not to
// all 75 displayed questions. The mock is original and reports raw practice results.
export const SAP_C03_WEIGHTS = Object.freeze({'1':25,'2':25,'3':15,'4':15,'5':20});
export const DIAGNOSTIC_COUNT = 28;
export const DIAGNOSTIC_MINUTES = 90;
export const FULL_MOCK_COUNT = 75;
export const FULL_MOCK_SCORED = 65;
export const FULL_MOCK_MINUTES = 180;

const domains = Object.keys(SAP_C03_WEIGHTS);
const minute = 60_000;
const wordKey = text => text.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const nonempty = text => typeof text === 'string' && text.trim().length > 0;
const idOkay = id => typeof id === 'string' && /^[a-z][a-z0-9-]{1,127}$/.test(id);
const stableSortById = (a,b) => a.id === b.id ? 0 : a.id < b.id ? -1 : 1;

function majorityQuotas(total) {
  const rows = domains.map(id => {
    const weighted = total * SAP_C03_WEIGHTS[id];
    return {id, seats: Math.floor(weighted / 100), remainder: weighted % 100};
  });
  const remaining = total - rows.reduce((sum,item) => sum + item.seats, 0);
  [...rows].sort((a,b) => b.remainder-a.remainder || Number(a.id)-Number(b.id)).slice(0,remaining).forEach(item => item.seats++);
  return Object.fromEntries(rows.map(({id,seats}) => [id,seats]));
}

export const FULL_MOCK_QUOTAS = Object.freeze(majorityQuotas(FULL_MOCK_SCORED));

function validQuestion(q) {
  return q && idOkay(q.id) && domains.includes(q.domain) &&
    nonempty(q.stem) && wordKey(q.stem) && nonempty(q.image) && nonempty(q.explanation) &&
    Array.isArray(q.options) && q.options.length >= 2 && q.options.every(value => nonempty(value) && wordKey(value)) &&
    new Set(q.options.map(wordKey)).size === q.options.length &&
    Array.isArray(q.correct) && q.correct.length >= 1 && q.correct.length < q.options.length &&
    new Set(q.correct).size === q.correct.length &&
    q.correct.every(i => Number.isInteger(i) && i >= 0 && i < q.options.length);
}

function countKeys(bank, fn) {
  const counts = new Map();
  for (const item of bank) {
    const key = fn(item);
    if (key) counts.set(key, (counts.get(key) ?? 0)+1);
  }
  return counts;
}

function cleanMockBank(bank) {
  if (!Array.isArray(bank)) return [];
  const idCounts = countKeys(bank, q => idOkay(q?.id) ? q.id : '');
  const stemCounts = countKeys(bank, q => nonempty(q?.stem) ? wordKey(q.stem) : '');
  return bank.filter(q => validQuestion(q) && q.reviewStatus === 'reviewed' &&
    idCounts.get(q.id) === 1 && stemCounts.get(wordKey(q.stem)) === 1 &&
    (q.correct.length === 1 ? q.options.length === 4 : q.options.length >= 5));
}

export function assessFullMock(bank) {
  const eligible = cleanMockBank(bank);
  const byDomain = Object.fromEntries(domains.map(d => [d,0]));
  for (const q of eligible) byDomain[q.domain]++;
  const missingByDomain = Object.fromEntries(domains.map(d => [d,Math.max(0,FULL_MOCK_QUOTAS[d]-byDomain[d])]));
  const missingTotal = Math.max(0, FULL_MOCK_COUNT - eligible.length);
  return {
    available: missingTotal === 0 && domains.every(d => missingByDomain[d] === 0),
    eligible: eligible.length,
    excluded: Array.isArray(bank) ? bank.length-eligible.length : 0,
    byDomain, missingByDomain, missingTotal,
    minimumAdditional:Math.max(missingTotal,Object.values(missingByDomain).reduce((sum,count)=>sum+count,0)),
  };
}

function hash(value, initial=2166136261) {
  let state = initial >>> 0;
  for (let i=0; i<value.length; i++) state = Math.imul(state ^ value.charCodeAt(i), 16777619) >>> 0;
  return state;
}

// Deterministic seeded PRNG for question/choice order, not for security.
function rng(seed) {
  let state = hash(seed);
  return () => {
    state = (state + 0x6D2B79F5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15),t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffled(data, seed) {
  const result = [...data], random = rng(seed);
  for (let i=result.length-1;i>0;i--) {
    const j = Math.floor(random() * (i+1));
    [result[i],result[j]] = [result[j],result[i]];
  }
  return result;
}

function fingerprint(q) {
  const core=[q.id,q.domain,q.stem,q.options,[...q.correct].sort((a,b)=>a-b),q.explanation,q.image,q.revision??null];
  // Preserve previously issued descriptor signatures for original banks; pin feedback
  // too when a richer bank supplies it.
  if (Array.isArray(q.optionReasons) || q.references || q.sources) core.push(q.optionReasons??null,q.references??null,q.sources??null);
  const material = JSON.stringify(core);
  return [hash(material),hash(material,3372634263)].map(n => n.toString(16).padStart(8,'0')).join('');
}
const identityOrder = q => q.options.map((_,i) => i);
function buildDescriptor(kind,mode,minutes,questions,seed,scoredIds) {
  return {version:1,kind,mode,durationMs:minutes===null?null:minutes*minute,slots:questions.map(q => ({
    id:q.id,
    revision:fingerprint(q),
    choiceOrder:seed===null || q.preserveChoiceOrder===true ? identityOrder(q) : shuffled(identityOrder(q),JSON.stringify([seed,q.id,'choices'])),
    scored:scoredIds===null || scoredIds.has(q.id),
  }))};
}

function legacyBank(questions) {
  if (!Array.isArray(questions) || questions.length !== DIAGNOSTIC_COUNT ||
    new Set(questions.map(q => q?.id)).size !== questions.length || !questions.every(validQuestion)) {
    throw new Error('The course diagnostic needs its original 28 mapped questions.');
  }
  return questions;
}
export function createDiagnosticForm(questions, mode) {
  if (!['practice','exam'].includes(mode)) throw new Error('Invalid diagnostic mode.');
  const bank = legacyBank(questions);
  return hydrateForm(buildDescriptor('diagnostic',mode,mode==='exam'?DIAGNOSTIC_MINUTES:null,bank,null,null),bank);
}

export function createFullMockForm(bank, seed, mode='exam') {
  if (!['exam','practice'].includes(mode)) throw new Error('Invalid full mock mode.');
  if (!nonempty(seed)) throw new Error('Provide a non-empty seed for the new attempt.');
  if (!assessFullMock(bank).available) throw new Error('The full mock is not ready: more reviewed questions are required.');
  const eligible = cleanMockBank(bank).sort(stableSortById);
  const scored = domains.flatMap(d => shuffled(eligible.filter(q => q.domain===d),JSON.stringify([seed,d,'domain'])).slice(0,FULL_MOCK_QUOTAS[d]));
  const scoredIds = new Set(scored.map(q=>q.id));
  const unscored = shuffled(eligible.filter(q => !scoredIds.has(q.id)),JSON.stringify([seed,'extra'])).slice(0,FULL_MOCK_COUNT-FULL_MOCK_SCORED);
  const questions = shuffled([...scored,...unscored],JSON.stringify([seed,'form']));
  return hydrateForm(buildDescriptor('full-mock',mode,mode==='exam'?FULL_MOCK_MINUTES:null,questions,seed,scoredIds),bank);
}

export function hydrateForm(descriptor, bank) {
  const isFull = descriptor?.kind === 'full-mock';
  const isLegacy = descriptor?.kind === 'diagnostic';
  const validMode = descriptor?.mode === 'exam' || descriptor?.mode === 'practice';
  const timed = descriptor?.mode === 'exam';
  const duration = !timed ? null : (isFull?FULL_MOCK_MINUTES:DIAGNOSTIC_MINUTES)*minute;
  if (descriptor?.version!==1 || !validMode || !isFull&&!isLegacy || descriptor.durationMs!==duration ||
     !Array.isArray(descriptor.slots) || descriptor.slots.length!==(isFull?FULL_MOCK_COUNT:DIAGNOSTIC_COUNT)) {
    throw new Error('Invalid saved exam form.');
  }
  const bankMap = new Map((isFull ? cleanMockBank(bank) : legacyBank(bank)).map(q => [q.id,q]));
  const seen = new Set(), counts = Object.fromEntries(domains.map(d => [d,0]));
  const questions = descriptor.slots.map((slot,index) => {
    if (!slot || typeof slot.scored !== 'boolean') throw new Error('Invalid saved question slot.');
    const q = bankMap.get(slot.id), order = slot.choiceOrder;
    if (!q || seen.has(q.id) || fingerprint(q)!==slot.revision) throw new Error('A saved question was updated, removed, or duplicated.');
    if (!Array.isArray(order) || order.length!==q.options.length || new Set(order).size!==order.length ||
      order.some(i=>!Number.isInteger(i)||i<0||i>=q.options.length)) throw new Error('Invalid saved choice order.');
    if (isLegacy && (q.id!==bank[index].id || !slot.scored || order.some((n,i)=>n!==i))) {
      throw new Error('The diagnostic form must retain its original order.');
    }
    seen.add(q.id);
    if (slot.scored) counts[q.domain]++;
    const correct = order.flatMap((source,displayed) => q.correct.includes(source)?[displayed]:[]);
    return {...q,options:order.map(i=>q.options[i]),correct,...(Array.isArray(q.optionReasons)?{optionReasons:order.map(i=>q.optionReasons[i])}:{})};
  });
  if (isFull && domains.some(d => counts[d]!==FULL_MOCK_QUOTAS[d])) throw new Error('Saved form does not meet the scored-domain quotas.');
  return {descriptor, questions};
}

export function startFormAttempt(form, now=Date.now()) {
  if (!Number.isFinite(now)) throw new Error('Invalid attempt start time.');
  const {descriptor, questions}=form;
  return {
    schema:2, mode:descriptor.mode, questionIds:questions.map(q=>q.id), form:descriptor,
    startedAt:now,deadline:descriptor.durationMs===null?null:now+descriptor.durationMs,
    answers:{},checked:[],flagged:[],submittedAt:null,submissionReason:null,
  };
}

export function scoreForm(attempt,form) {
  if (attempt.submittedAt===null || !Number.isFinite(attempt.submittedAt)) throw new Error('Submit before scoring.');
  const {descriptor,questions}=form;
  if (attempt.mode!==descriptor.mode || attempt.questionIds.length!==questions.length || questions.some((q,i)=>attempt.questionIds[i]!==q.id)) {
    throw new Error('Attempt and exam form do not match.');
  }
  if (attempt.form && (attempt.form.kind!==descriptor.kind || attempt.form.slots.length!==descriptor.slots.length ||
    descriptor.slots.some((slot,i) => {
      const saved=attempt.form.slots[i];
      return slot.id!==saved?.id || slot.revision!==saved.revision || slot.scored!==saved.scored ||
        slot.choiceOrder.join(',')!==saved.choiceOrder?.join(',');
    }))) throw new Error('The saved choices do not match this exam form.');
  let correct=0,total=0,unanswered=0,unansweredAll=0;
  const domains={};
  const results=questions.map((q,index)=>{
    const selected=attempt.answers[q.id], answered=Array.isArray(selected)&&selected.length>0;
    const ok=answered&&selected.length===q.correct.length&&new Set(selected).size===selected.length&&selected.every(i=>q.correct.includes(i));
    const scored=descriptor.slots[index].scored;
    if (!answered) unansweredAll++;
    if (scored) {
      total++;
      if (ok) correct++;
      if (!answered) unanswered++;
      domains[q.domain]??={correct:0,total:0};
      domains[q.domain].total++;
      if (ok) domains[q.domain].correct++;
    }
    return {id:q.id,correct:ok,answered,scored};
  });
  return {correct,total,unanswered,unansweredAll,percentage:correct/total*100,domains,results};
}
