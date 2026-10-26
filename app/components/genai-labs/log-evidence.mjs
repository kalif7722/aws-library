// Application-emitted training records, not AWS-generated diagnostic assertions.
export function logEvidence(state){
 const c=state.config, id=`sample-${String(state.lab+1).padStart(2,"0")}-${state.revision}`;
 const records=[
  {stage:"prompt_assembly",inputTokens:c.assembly==="relevant"?c.relevantTokens:c.inputTokens,reservedOutputTokens:c.maxTokens,contextLimit:c.contextLimit,assembly:c.assembly,overflowPolicy:c.onOverflow,promptContainsTerminationClause:c.assembly==="relevant"},
  {stage:"converse",request:c.request,responseParsePath:c.parsePath,httpStatus:Array.isArray(c.request?.messages?.[0]?.content)?200:400,error:Array.isArray(c.request?.messages?.[0]?.content)?null:"ValidationException",response:Array.isArray(c.request?.messages?.[0]?.content)?{output:{message:{role:"assistant",content:[{text:"Hello! How can I help you?"}]}},stopReason:"end_turn"}:null},
  {stage:"retry",error:"ThrottlingException",httpStatus:429,attemptBudget:c.maxAttempts,backoff:c.backoff,jitter:c.jitter,concurrency:c.concurrency,admissionQueue:c.admissionQueue,deadlineMs:c.deadlineMs},
  {stage:"stream",events:c.completeOn==="messageStop"&&c.readTimeoutMs>2000?["messageStart","contentBlockStart","contentBlockDelta","contentBlockStop","messageStop","metadata"]:["messageStart","contentBlockDelta","ReadTimeout"],readTimeoutMs:c.readTimeoutMs,completionSignal:c.completeOn,propagateCancellation:c.propagateCancellation},
  {stage:"prompt_render",promptVersion:c.promptVersion,template:c.template,variables:c.variables,validateJson:c.validateJson},
  {stage:"rag_query",sourceVersion:state.sourceVersion,indexedVersion:state.indexedVersion,cachePolicyVersion:c.cachePolicyVersion,knowledgeBaseId:c.knowledgeBaseId,tenant:c.cacheTenant,ingestionStatus:state.syncStatus},
  {stage:"retrieve",metadataFilter:{tenant:c.tenant,category:c.category},numberOfResults:c.topK,source:c.category==="refund"?"policy.pdf":"shipping-guide.pdf",passage:c.category==="refund"?"Refunds are available within 30 days of purchase.":"Shipping normally takes 3–5 business days."},
  {stage:"vector_search",index:c.index,dimensions:c.dimensions,numberOfResults:c.topK,category:c.category,concurrency:c.concurrency,retrievalP95Ms:c.topK<=10&&c.category==="refund"&&c.concurrency<=10?180:900},
  {stage:"grounding",generatedClaim:c.requireEvidence&&c.validateCitations?"30 days":"90 days",sourceText:"Refunds are available within 30 days of purchase.",source:"policy.pdf",policyVersion:18,validateCitations:c.validateCitations,onMissingEvidence:c.onMissingEvidence},
  {stage:"agent_tool",actionGroup:"OrderLookup",function:"lookupOrder",parameters:{orderId:"A104"},toolResponse:c.toolResult,prepared:state.prepared,maxToolCalls:c.maxToolCalls,idempotency:c.idempotency},
  {stage:"safety",guardrailVersion:c.guardrailVersion,publishedVersions:state.guardrailVersions,trustRetrievedInstructions:c.trustRetrievedInstructions,redactLogs:c.redactLogs,bufferBeforeDisplay:c.bufferBeforeDisplay},
  {stage:"release",release:c.release,promptVersion:c.promptVersion,embedding:c.embedding,index:c.index,trafficPercent:c.trafficPercent}
 ];
 return [{timestamp:"2026-10-26T10:00:00.000Z",message:JSON.stringify({level:"INFO",requestId:id,event:"request_started",configurationRevision:state.revision})},{timestamp:"2026-10-26T10:00:00.100Z",message:JSON.stringify({level:"INFO",requestId:id,...records[state.lab]})}];
}
