// Deterministic educational fixtures. No AWS calls, code execution, or credentials.
export const SCHEMA_VERSION = 1;
export const TASKS = ["5.2.1","5.2.2","5.2.2 2.4.3","5.2.2 2.4.2","5.2.3 5.2.5","5.2.4","5.2.4 5.1.6","5.2.4 4.3.5","5.1.5 3.1.3","2.1.3 4.3.4","3.1 5.1","5.1.4 5.1.9"];
/** @type {Record<string, any>[]} */
export const DEFAULTS = [
 {assembly:"all",tokenCounter:"characters",inputTokens:9700,relevantTokens:5100,contextLimit:8000,maxTokens:1024,onOverflow:"truncate"},
 {request:{modelId:"amazon.nova-lite-v1:0",messages:[{role:"user",content:"Hello"}]},parsePath:"completion",region:"eu-west-1"},
 {maxAttempts:12,backoff:"immediate",jitter:false,deadlineMs:2500,concurrency:40,admissionQueue:false},
 {completeOn:"contentBlockDelta",readTimeoutMs:1000,propagateCancellation:false},
 {promptVersion:2,template:"Summarize {{customer}}",variables:{},validateJson:false},
 {knowledgeBaseId:"KBREFUND18",cachePolicyVersion:16,cacheTenant:"acme"},
 {tenant:"acme",category:"shipping",topK:2},
 {topK:100,category:"all",concurrency:64,index:"refund-v18",dimensions:1024},
 {requireEvidence:false,validateCitations:false,onMissingEvidence:"guess"},
 {toolResult:{orderStatus:"SHIPPED"},maxToolCalls:8,idempotency:false},
 {guardrailVersion:"1",trustRetrievedInstructions:true,redactLogs:false,bufferBeforeDisplay:false},
 {release:"B",promptVersion:2,embedding:"embed-B",index:"index-A",trafficPercent:100},
];
/** @type {Record<string, any>[]} */
export const SOLUTIONS = [
 {...DEFAULTS[0],assembly:"relevant",tokenCounter:"tokenizer",onOverflow:"reject"},
 {...DEFAULTS[1],request:{modelId:"amazon.nova-lite-v1:0",messages:[{role:"user",content:[{text:"Hello"}]}]},parsePath:"output.message.content"},
 {...DEFAULTS[2],maxAttempts:3,backoff:"exponential",jitter:true,concurrency:8,admissionQueue:true},
 {...DEFAULTS[3],completeOn:"messageStop",readTimeoutMs:5000,propagateCancellation:true},
 {promptVersion:1,template:"Return JSON with summary for {{customer}}",variables:{customer:"Acme"},validateJson:true},
 {...DEFAULTS[5],cachePolicyVersion:18},
 {...DEFAULTS[6],category:"refund",topK:4},
 {...DEFAULTS[7],topK:5,category:"refund",concurrency:8},
 {requireEvidence:true,validateCitations:true,onMissingEvidence:"abstain"},
 {toolResult:{messageVersion:"1.0",response:{actionGroup:"OrderLookup",function:"lookupOrder",functionResponse:{responseBody:{TEXT:{body:'{"orderId":"A104","status":"SHIPPED"}'}}}}},maxToolCalls:3,idempotency:true},
 {guardrailVersion:"2",trustRetrievedInstructions:false,redactLogs:true,bufferBeforeDisplay:true},
 {release:"A",promptVersion:1,embedding:"embed-A",index:"index-A",trafficPercent:5},
];
export const SCENARIOS = [
 "The contract assistant omits a termination clause near the end of a long document. Short questions still work.",
 "A new Converse integration fails. Another build receives HTTP 200 but displays an empty answer.",
 "Traffic bursts cause 429 errors and queue growth. Retrying more often has made the incident worse.",
 "A response starts streaming, then ends abruptly. The UI incorrectly presents the partial answer as complete.",
 "The latest prompt release breaks a downstream JSON parser and changes answers for established customers.",
 "Policy v18 was uploaded to S3, but the assistant still quotes the old 14-day refund policy.",
 "The correct refund policy exists, but retrieval returns shipping documents instead.",
 "Retrieval p95 reaches 900 ms under load. Model generation is not the slow stage.",
 "The model confidently states a 90-day refund period. Its citation does not support that claim.",
 "An order lookup agent repeatedly calls its tool for order A104 and does not finish.",
 "A synthetic document contains an instruction override and a dummy identifier. The app must resist the override without breaking normal questions.",
 "Release B changes the model configuration, prompt and embedding path. Canary quality and latency regress.",
];
export const HINTS = [
 "Compare the exact resolved input token count with the model budget, including reserved output.",
 "Separate HTTP request validation from application response parsing before editing IAM.",
 "Look for retries amplifying demand; inspect concurrency and a bounded retry budget together.",
 "A content delta is not a terminal event. Trace the timeout boundary and completion signal.",
 "Compare resolved variables and the output contract using the same golden inputs.",
 "S3 upload, vector ingestion and application answer caching are three different stages.",
 "Inspect raw retrieved passages and metadata filters before adjusting the generation model.",
 "Measure retrieval independently. Check query breadth and concurrency before buying more capacity.",
 "Match the material claim to an exact source span; a citation alone is insufficient.",
 "Inspect the function response envelope, then prepare the changed working draft before testing.",
 "A published guardrail is not active until the application invokes that version. Check every trust boundary.",
 "Roll back a compatible model/prompt/embedding/index bundle, not only a model identifier.",
];
/** @param {number} lab */
export function createState(lab) {
 if (!Number.isInteger(lab)||lab<0||lab>=12) throw new Error("Unknown lab");
 return {schema:SCHEMA_VERSION,lab,config:structuredClone(DEFAULTS[lab]),sourceVersion:18,indexedVersion:lab===5?16:18,syncStatus:lab===5?"Not synced":"COMPLETE",guardrailDraft:false,guardrailAttack:false,guardrailVersions:["1"],prepared:lab===9,revision:0,result:null};
}
/** @param {any} state @param {unknown} config */
export function applyConfig(state, config) {
 if (!config||typeof config!=="object"||Array.isArray(config)) throw new Error("Configuration must be a JSON object.");
 if (JSON.stringify(config).length>20000) throw new Error("Configuration is too large.");
 return {...state,config:structuredClone(config),revision:state.revision+1,prepared:state.lab===9?false:state.prepared,result:null};
}
/** @param {any} state @param {string} action */
export function serviceAction(state,action) {
 if(action==="sync")return {...state,indexedVersion:state.sourceVersion,syncStatus:"COMPLETE",result:null};
 if(action==="guardrail-edit")return {...state,guardrailDraft:!state.guardrailDraft,result:null};
 if(action==="guardrail-attack")return {...state,guardrailAttack:!state.guardrailAttack,result:null};
 if(action==="guardrail-publish")return state.guardrailDraft&&state.guardrailAttack?{...state,guardrailVersions:["1","2"],result:null}:state;
 if(action==="prepare")return {...state,prepared:true,result:null};
 throw new Error("Unsupported service action");
}
/** @param {any} state */
export function evaluate(state) {
 const c=state.config;const checks=[];
 /** @param {string} name @param {boolean} ok @param {string} evidence */
 const check=(name,ok,evidence)=>checks.push({name,ok:Boolean(ok),evidence});
 switch(state.lab){
 case 0:{const n=c.assembly==="relevant"?c.relevantTokens:c.inputTokens;check("Long-document context budget",c.tokenCounter==="tokenizer"&&Number(c.contextLimit)===8000&&Number(n)===5100&&Number(c.maxTokens)>0&&Number(n)+Number(c.maxTokens)<=8000,`input=${n}, reservedOutput=${c.maxTokens}, fixed fixture contextLimit=8000`);check("No silent input loss",c.assembly==="relevant"&&c.onOverflow==="reject","Required termination clause must survive assembly; over-budget inputs must fail explicitly.");break;}
 case 1:{const req=c.request;check("Converse request contract",req?.modelId==="amazon.nova-lite-v1:0"&&Array.isArray(req?.messages)&&req.messages.length>0&&req.messages.every(m=>(m.role==="user"||m.role==="assistant")&&Array.isArray(m.content)&&m.content.length>0&&m.content.every(b=>typeof b.text==="string")),"messages[].content must contain typed content blocks.");check("Response content-block parser",c.parsePath==="output.message.content","Successful Converse response is not the legacy completion field.");check("Region and access held constant",c.region==="eu-west-1","Synthetic model/profile fixture is authorized in eu-west-1. No wildcard IAM change required.");break;}
 case 2:check("Bounded retry and deadline",Number(c.maxAttempts)>=1&&Number(c.maxAttempts)<=3&&c.backoff==="exponential"&&c.jitter===true&&Number(c.deadlineMs)>=1000&&Number(c.deadlineMs)<=5000,`attempt budget=${c.maxAttempts}, backoff=${c.backoff}, jitter=${c.jitter}`);check("Admission control",Number(c.concurrency)>0&&Number(c.concurrency)<=10&&c.admissionQueue===true,`fixture quota=10 concurrent admissions; configured=${c.concurrency}`);break;
 case 3:check("Terminal-event handling",c.completeOn==="messageStop","contentBlockDelta → messageStop(end_turn) is complete; disconnect remains incomplete.");check("Timeout boundary and cancellation",Number(c.readTimeoutMs)>=3000&&Number(c.readTimeoutMs)<=10000&&c.propagateCancellation===true,`slow first byte=2000 ms; read timeout=${c.readTimeoutMs} ms`);break;
 case 4:check("Resolved variables",typeof c.variables?.customer==="string"&&c.variables.customer.length>0,"The template's customer variable must resolve before invocation.");check("JSON contract and validator",typeof c.template==="string"&&c.template.toLowerCase().includes("json")&&c.validateJson===true,"Prompt instructions plus application schema validation protect downstream consumers.");break;
 case 5:check("Current document indexed",state.indexedVersion===18,`S3 version=${state.sourceVersion}; indexed version=${state.indexedVersion}; last ingestion=${state.syncStatus}`);check("Correct query routing",c.knowledgeBaseId==="KBREFUND18"&&c.cacheTenant==="acme","query must use the authorized refund KB and tenant-specific cache key");check("Answer cache version",Number(c.cachePolicyVersion)===state.indexedVersion&&Number(c.cachePolicyVersion)===18,`application cache policy version=${c.cachePolicyVersion}`);break;
 case 6:check("Authorized relevant retrieval",c.tenant==="acme"&&c.category==="refund","shipping chunks are not evidence for a refund claim; preserve tenant authorization");check("Retrieval coverage",Number(c.topK)>=3&&Number(c.topK)<=8,`topK=${c.topK}; fixture contains relevant passages at ranks 1–3 after filtering`);break;
 case 7:check("Compatible index",c.index==="refund-v18"&&Number(c.dimensions)===1024,"embedding and index dimensions match; access and ingestion are healthy in this fixture");check("Query and concurrency budget",Number(c.topK)>0&&Number(c.topK)<=10&&c.category==="refund"&&Number(c.concurrency)>0&&Number(c.concurrency)<=10,`topK=${c.topK}, filter=${c.category}, concurrency=${c.concurrency}`);break;
 case 8:check("Claim and citation validation",c.requireEvidence===true&&c.validateCitations===true,"90-day claim has no supporting span; policy-v18 says 30 days");check("Missing-evidence behavior",c.onMissingEvidence==="abstain","Absent or contradictory evidence must not produce an invented answer.");break;
 case 9:{const r=c.toolResult;let body;try{body=JSON.parse(r?.response?.functionResponse?.responseBody?.TEXT?.body)}catch{}check("Function action-group response",r?.messageVersion==="1.0"&&r?.response?.actionGroup==="OrderLookup"&&r?.response?.function==="lookupOrder"&&body?.orderId==="A104"&&body?.status==="SHIPPED","Function-details envelope, not API-schema envelope; match correlation fields.");check("Prepared working draft",state.prepared===true,"Prepare after a tool/configuration change before testing the working draft.");check("Bounded side effects",Number(c.maxToolCalls)>0&&Number(c.maxToolCalls)<=3&&c.idempotency===true,`maxToolCalls=${c.maxToolCalls}; idempotency=${c.idempotency}`);break;}
 case 10:check("Published guardrail invoked",state.guardrailVersions.includes(String(c.guardrailVersion))&&String(c.guardrailVersion)==="2","Working-draft edits do not update the application until a numeric version is published and invoked.");check("Trust and disclosure boundaries",c.trustRetrievedInstructions===false&&c.redactLogs===true&&c.bufferBeforeDisplay===true,"Treat retrieved text as data, redact logs, and check output before display.");break;
 case 11:check("Compatible release bundle",c.release==="A"&&Number(c.promptVersion)===1&&c.embedding==="embed-A"&&c.index==="index-A","Baseline A uses prompt-1, embed-A and index-A as a compatible bundle.");check("Staged release gate",Number(c.trafficPercent)>0&&Number(c.trafficPercent)<=10,`candidate traffic=${c.trafficPercent}%; quality/safety gates must pass before full promotion`);break;
 }
 const tests=fixtureCases(state);const ok=checks.every(x=>x.ok)&&tests.every(x=>x.ok);
 return {ok,checks,summary:ok?SUCCESS[state.lab]:FAILURE[state.lab],tests,metrics:{p95Ms:state.lab===7?(ok?180:900):ok?850:2400,errorRate:ok?"0% (fixture)":"Failing fixture",cost:ok?"Within baseline budget (sample)":"Compare per successful request"}};
}
export const FAILURE=["Answer omits the termination clause; prompt assembly lost required evidence.","ValidationException (400) or successful HTTP response followed by application parse failure.","ThrottlingException (429); immediate retries amplify the burst.","Partial response shown as complete after disconnect.","Unresolved customer variable or schema-invalid output.","Answer: 14 days. Citation: policy.pdf version 16.","Retrieved: shipping-guide; refund evidence absent.","Retrieval p95 900 ms; query breadth and concurrency dominate.","Answer: 90 days. Cited v18 passage says 30 days.","Order A104 tool call repeats; no valid final response.","Synthetic override or dummy identifier escapes a trust boundary.","Release B fails compatibility or staged quality gate."];
export const SUCCESS=["Complete termination clause retained; explicit overflow rejection and short-input tests pass.","HTTP 200; output.message.content text parsed. Malformed request still returns ValidationException.","Burst admitted through queue; bounded full-jitter retry budget; non-retryable 400 is not retried.","Normal/slow streams complete only on messageStop; disconnect and max_tokens are identified separately.","Resolved customer Acme; output is schema-valid JSON; golden comparison passes.","Answer: 30 days. Citation: policy.pdf version 18. Unknown-policy query abstains.","Refund passage retrieved within authorized Acme scope; shipping and cross-tenant negatives excluded.","Sample retrieval p95 180 ms; labelled relevance preserved without changing the generation model.","Answer: 30 days with exact v18 source span; missing/conflicting evidence causes abstention.","A104 returns SHIPPED once. Invalid input, missing order, denied access and timeout terminate safely.","Synthetic override ignored; dummy identifier masked; legitimate refund question still succeeds.","Compatible baseline restored at 5% sample traffic; quality, safety, latency and cost gates pass."];
/** @param {any} state */
export function fixtureCases(state){
 const c=state.config;
 /** @param {string} name @param {string} expected @param {string} actual */
 const t=(name,expected,actual)=>({name,expected,actual,ok:expected===actual});
 switch(state.lab){
 case 0:{const fit=c.assembly==="relevant"&&Number(c.relevantTokens)+Number(c.maxTokens)<=Number(c.contextLimit);return [t("Long contract","clause retained",fit?"clause retained":"clause missing"),t("Short contract","answer","answer"),t("Over-budget contract","explicit rejection",c.onOverflow==="reject"?"explicit rejection":"silent truncation")];}
 case 1:{const block=c.request?.messages?.[0]?.content;return [t("Valid request and parser","Hello",Array.isArray(block)&&typeof block[0]?.text==="string"&&c.parsePath==="output.message.content"?"Hello":"schema or parser error"),t("Malformed content negative","ValidationException 400","ValidationException 400"),t("Non-text block","skip safely",c.parsePath==="output.message.content"?"skip safely":"legacy parser error")];}
 case 2:return [t("Burst admission","queued within quota",c.admissionQueue&&Number(c.concurrency)<=10?"queued within quota":"429 amplification"),t("Retryable 429","bounded full jitter",Number(c.maxAttempts)<=3&&c.backoff==="exponential"&&c.jitter?"bounded full jitter":"retry storm"),t("Non-retryable 400","no retry",Number(c.maxAttempts)<=3&&c.backoff==="exponential"?"no retry":"blind retry")];
 case 3:return [t("Normal terminal event","complete",c.completeOn==="messageStop"?"complete":"premature completion"),t("Slow first byte 2000ms","complete",Number(c.readTimeoutMs)>2000&&c.completeOn==="messageStop"?"complete":"timeout or premature completion"),t("Disconnect before messageStop","incomplete",c.completeOn==="messageStop"&&c.propagateCancellation?"incomplete":"incorrectly complete"),t("messageStop max_tokens","output limit",c.completeOn==="messageStop"?"output limit":"transport error")];
 case 4:return [t("Customer Acme","schema-valid JSON",c.variables?.customer&&c.template?.toLowerCase().includes("json")&&c.validateJson?"schema-valid JSON":"unresolved or invalid output"),t("Missing variable","reject before invoke",c.validateJson?"reject before invoke":"unresolved variable sent"),t("Invalid model JSON","reject output",c.validateJson?"reject output":"parser crash")];
 case 5:{const current=state.indexedVersion===18&&Number(c.cachePolicyVersion)===18&&c.knowledgeBaseId==="KBREFUND18";return [t("Current refund policy","30 days",current?"30 days":"14 days"),t("Citation provenance","version 18",current?"version 18":"version 16"),t("Tenant cache isolation","acme only",c.cacheTenant==="acme"?"acme only":"wrong tenant"),t("No matching source","abstain","abstain")];}
 case 6:return [t("Refund relevance","refund passage",c.category==="refund"&&Number(c.topK)>=3?"refund passage":"shipping passage"),t("Shipping is not refund evidence","exclude from refund answer",c.category==="refund"?"exclude from refund answer":"irrelevant context included"),t("Cross-tenant negative","exclude other tenant",c.tenant==="acme"?"exclude other tenant":"authorization scope changed")];
 case 7:return [t("Measured retrieval p95","within 300 ms",Number(c.topK)<=10&&c.category==="refund"&&Number(c.concurrency)<=10?"within 300 ms":"900 ms"),t("Embedding/index contract","1024 dimensions",Number(c.dimensions)===1024&&c.index==="refund-v18"?"1024 dimensions":"incompatible index"),t("Access-denied diagnostic","authorization error, not latency","authorization error, not latency")];
 case 8:return [t("Supported v18 claim","30 days + span",c.requireEvidence&&c.validateCitations?"30 days + span":"90 days + unsupported citation"),t("No source","abstain",c.onMissingEvidence==="abstain"?"abstain":"guess"),t("Conflicting sources","abstain",c.requireEvidence&&c.onMissingEvidence==="abstain"?"abstain":"pick unsupported claim")];
 case 9:{const envelope=c.toolResult?.response?.functionResponse?.responseBody?.TEXT;return [t("A104 success","SHIPPED once",envelope&&state.prepared&&Number(c.maxToolCalls)<=3?"SHIPPED once":"tool loop or unprepared"),t("Invalid or missing order","finite error",Number(c.maxToolCalls)<=3?"finite error":"repeated call"),t("Timeout/denied tool","stop safely",Number(c.maxToolCalls)<=3&&c.idempotency?"stop safely":"repeated side effect")];}
 case 10:{const active=state.guardrailVersions.includes(String(c.guardrailVersion))&&String(c.guardrailVersion)==="2";return [t("Injected document instruction","ignore override",c.trustRetrievedInstructions===false?"ignore override":"obey untrusted text"),t("Dummy identifier","masked",active?"masked":"DUMMY-1234"),t("Benign refund question","allowed","allowed"),t("Log and stream disclosure","no leak",c.redactLogs&&c.bufferBeforeDisplay?"no leak":"pre-check disclosure")];}
 case 11:{const compatible=c.release==="A"&&c.promptVersion===1&&c.embedding==="embed-A"&&c.index==="index-A";return [t("Golden release compatibility","pass",compatible?"pass":"incompatible release"),t("Quality/safety/latency/cost gates","baseline",compatible?"baseline":"regression"),t("Canary traffic","1–10%",Number(c.trafficPercent)>0&&Number(c.trafficPercent)<=10?"1–10%":"ungated promotion")];}
 default:return [];
 }
}
