// Curated topic-to-task index. Broad AWS service introductions remain supporting
// context until a concrete exam decision is taught by the lesson.
const rules: Record<string, Array<[RegExp, string[]]>> = {
  "01": [
    [/Well-Architected|Generative AI Lens|Lifecycle/i,["1-1"]],
    [/Foundation Models|Base Models|Model Access|Fine-tuning|Pre-Training|LoRA/i,["1-2"]],
    [/API Endpoints|Converse API|IAM permissions/i,["2-4"]],
    [/Knowledge Base Data Store|vector database|Vector Database|Optimizing your Embeddings|metadata|Keeping Your KB|OpenSearch/i,["1-4"]],
    [/RAG|Knowledge Bases|Chunking|Embeddings|Retrieval|Rerank|Context Relevance/i,["1-5"]],
    [/Prompt|Structured Data Responses|Flows with Prompts|Complex Flow/i,["1-6"]],
    [/Guardrails|Redaction|Bias/i,["3-1"]],
    [/Multimodal/i,["1-3"]],
    [/Enterprise Integration/i,["2-3"]],
  ],
  "02": [
    [/Structured Data|Unstructured Text|Segmenting|Formatting Data|Data Automation|Data Wrangler|Glue|Transcribe|Comprehend|Data Quality/i,["1-3"]],
    [/Vector|OpenSearch as a Vector Store|OpenSearch Vector|OpenSearch.*Shard|OpenSearch Hierarchical|S3 Vectors|Aurora as a Vector|DynamoDB with Generative AI/i,["1-4"]],
    [/Re-Ranker|Rerank/i,["1-5"]],
    [/S3.*Encrypt|Encryption|Access Point/i,["3-2"]],
  ],
  "03": [
    [/AgentCore Evaluations|Evaluation Prompt|Custom Evaluator/i,["5-1"]],
    [/Q Developer|Q Apps|Q Business/i,["2-5"]],
    [/Agent|Strands|MCP|Orchestrat|Routing|Parallelization|Prompt Chaining|Evaluator-Optimizer|Human|OpenAPI/i,["2-1"]],
  ],
  "04": [
    [/CloudWatch|Monitoring/i,["4-3"]],
    [/Retrieval Performance|Responsive|Parallel Requests|Prompt Routing|Specific Use Cases|API Profiling|UltraServers|Backoff|Connection Pooling|Cross-Region/i,["4-2"]],
    [/Token|Cost|Price|Batch|Throughput|Cach|Resource Utilization/i,["4-1"]],
  ],
  "05": [
    [/Model Monitor|Clarify|Bias Metrics/i,["4-3"]],
    [/Model Registry|Approval|Promotion|Lineage/i,["1-2"]],
    [/Deploy|Endpoint|Inference Profile|Asynchronous Inference|Safeguard/i,["2-2"]],
  ],
  "06": [
    [/API Gateway.*Generative AI|Serverless API|AppSync.*Generative AI/i,["2-4"]],
    [/CodePipeline|CodeBuild|CodeDeploy|CI\/CD|Outposts|Wavelength|EventBridge|SQS|SNS|AppFlow/i,["2-3"]],
    [/AppConfig|Step Functions.*Generative AI|Circuit Breaker/i,["2-5"]],
    [/Lambda.*Bedrock|Amplify/i,["2-5"]],
  ],
  "07": [
    [/Evaluation|ROUGE|BLEU|BERTScore|Benchmark|Judge|Testing|Validation/i,["5-1"]],
    [/Responsible AI|Lake Formation|Lineage/i,["3-3"]],
    [/CloudWatch|X-Ray|Monitoring|Monitor|Tracing|CloudTrail/i,["4-3"]],
  ],
  "08": [
    [/WAF|Guardrail/i,["3-1"]],
    [/Least Privilege|Mask|Anonym|Salt|IAM|MFA|Encrypt|KMS|Macie|Secrets|Cognito|VPC|Endpoint|PrivateLink|Network ACL|Security Group/i,["3-2"]],
  ],
  "17": [
    [/Choosing a Vector Store|OpenSearch vs. OpenSearch Serverless/i,["1-4"]],
    [/Orchestration.*Step Functions|Chatbot/i,["1-1"]],
  ],
};

export function examTasksForLesson(moduleId: string, title: string): string[] {
  return rules[moduleId]?.find(([pattern]) => pattern.test(title))?.[1] ?? [];
}
