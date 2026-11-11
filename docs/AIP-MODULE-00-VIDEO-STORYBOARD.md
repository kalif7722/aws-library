# AIP-C01 Module 00 — Visual-Verified Lecturer Narration

**Status:** Revised to match the actual rendered 12-slide video frames. A new render is required.

**Voice preserved:** en-US-AndrewNeural at -3%; same visual video format and subtitle/chapters pipeline.

## Slide-to-narration alignment

| Slide | Actual image heading | Lecturer guidance |
| --- | --- | --- |
| 01 | Course Opening | User request → application → orchestrated context → foundation model → safe, useful answer |
| 02 | Course Roadmap | Ten milestones along the illustrated learning trail |
| 03 | The Developer’s Role | Seven responsibilities surrounding the application diagram |
| 04 | Practical Starting Point | AWS fundamentals, application development, and AI basics converge into production GenAI |
| 05 | The GenAI Application Stack | Five application layers with security, governance, and observability across the stack |
| 06 | One Request, End to End | Customer-support request path with optional tools, escalation, and logging |
| 07 | Retrieval or Adaptation? | RAG retrieves private current facts; fine-tuning changes learned task behaviour |
| 08 | Security Around the Stack — Request Path | Defense-in-depth across entry, application, data, network and telemetry |
| 09 | Security Around the Stack — Control Responsibilities | User, application and model protected by AWS controls surrounding the core |
| 10 | Reference Application | API Gateway, Lambda, optional S3/knowledge base, Bedrock, guardrails, human escalation, IAM/KMS and CloudWatch |
| 11 | Reading Architecture Diagrams | Legend for components, flow arrows, optional controls, trust boundary, storage and step numbers |
| 12 | Next: Foundations & Bedrock | Four questions about models, invoking them and control, plus prompts, retrieval, guardrails and integration |

**Important observations from the uploaded video:**

- The original manuscript followed an outdated 13-topic course map, not the actual 12 image headings. This is now corrected.
- The eighth image visually contains the slide number **09 / 12**, even though it is played as the eighth image. This is an image labeling issue, not an audio timing issue.
- The eighth and ninth images both explain security around the stack. Their new voiceovers approach the concepts from different perspectives: the request path versus the control responsibilities.
- No image changes have been made in this narration-only revision.

## Complete revised script

### Slide 01 — Course Opening

**Visible cues:** User Request · Application · Orchestrated Context · Foundation Model · Safe Useful Answer

Welcome to the course. Before we talk about individual AWS services, I want you to understand the big picture shown here. Follow the arrows from left to right. A user starts with a question or task. The application receives that request and manages the user experience. Now look at the middle panel, called orchestrated context. This is where we bring together the original question, relevant data or knowledge, instructions and tools, and safety rules. All of that helps the foundation model generate a response that is grounded in what the user actually needs. On the far right, our goal is a safe, useful answer, not just any text produced by a model. Notice the green return arrow leading back to the user: this is one complete application interaction. Throughout this course, we will break down each part of this flow, choose the right AWS services for it, and learn how to make the whole system dependable in production.

### Slide 02 — Course Roadmap

**Visible cues:** Foundations & Bedrock · Data & RAG · Agentic AI · Performance & cost · SageMaker lifecycle · App integration · Governance & evaluation · Security · Supporting AWS · Exam prep

Here's the route we'll follow through the course. Think of this winding path as our learning journey, with ten stops. We begin at number one, foundations and Amazon Bedrock, so we understand models and how to invoke them. Stop two is data and RAG: how to give a model relevant, trusted information. Stop three introduces agentic AI, where applications use tools and coordinate actions. At number four, we'll focus on performance and cost, because good output must also be efficient. Number five covers the SageMaker model lifecycle, and six connects our AI features into real applications. At seven, we'll test quality through governance and evaluation. Eight adds security controls throughout the solution. Nine broadens the picture to supporting AWS services, and ten brings everything together for exam preparation. We'll return to this roadmap as the material gets deeper. For now, notice the progression: understand the model, build the application, then make it reliable, secure, and ready for real users.

### Slide 03 — The Developer’s Role

**Visible cues:** Select a foundation model · Connect trusted data · Design prompts and retrieval · Orchestrate tools or agents · Expose an API/interface · Protect data · Evaluate and monitor outcomes

This slide explains what a generative AI developer actually does. The application is in the centre, and seven responsibilities surround it. Start with number one at the top: select a foundation model that balances capability, cost, and latency. At number two on the left, connect trusted data so answers can use reliable organisational information. At three on the right, design prompts and retrieval so the model receives the right instructions and evidence. Number four, lower left, is orchestration: allowing tools or agents to perform steps when a single model call is not enough. At five, expose the solution through an API or user interface so other systems or people can use it. Six is protecting data, permissions, and privacy. And seven is evaluating and monitoring the results for accuracy, safety, and operational value. The key idea is that building a production AI application is an engineering discipline. Choosing a model is only the first of these seven jobs.

### Slide 04 — Practical Starting Point

**Visible cues:** AWS Fundamentals · Application Development · AI Basics · Production GenAI

Before we start the technical modules, let's look at the three foundations in this diagram. On the left is AWS fundamentals: identity and access management, networking, storage, and compute. Those are the building blocks that determine whether our application is secure and reachable. In the middle is application development. Notice the examples along the bottom: APIs, error handling, and deployment. A GenAI feature still needs all the engineering practices of a normal software application. On the right are AI basics, especially large language models, tokens, and prompting. You don't need to be a model researcher, but you should know what the model receives, what it generates, and how prompting affects its behaviour. Follow the three arrows down to the box labelled Production GenAI. That's the point of this slide: we combine cloud knowledge, software engineering, and AI concepts to build and operate real applications. These are preparation topics, not separate exam eligibility requirements.

### Slide 05 — The GenAI Application Stack

**Visible cues:** Infrastructure & Networking · Context & Data · Foundation Model · Orchestration & Agents · Application Interfaces · Governance · Observability · Security

Now we're going to read the architecture from the bottom upwards. At the base is infrastructure and networking: compute, storage, and connectivity. Above that sits context and data, which includes enterprise information, preparation, and retrieval. The foundation model layer is next; it is responsible for understanding the prompt and generating output. Above the model are orchestration and agents, which coordinate workflows, tools, and multiple steps. At the top are application interfaces, the screens and integrations people actually interact with. But don't miss the controls drawn around the sides. Governance on the left covers policies, controls, and compliance. Observability on the right covers monitoring, evaluation, and operational insight. Security runs across the top, protecting the whole stack, not just one component. This picture gives you a useful checklist. Whenever you evaluate a GenAI architecture, identify each layer, ask which AWS service owns it, and check that security and monitoring extend across the full request flow.

### Slide 06 — One Request, End to End

**Visible cues:** User question · API & authentication · Retrieve approved knowledge · Foundation model generates draft · Guardrails and application checks · Answer · Optional tool call · Human escalation · Logs and metrics

Let's make the stack practical with a customer-support assistant. Follow the six numbered boxes from left to right. First, a customer asks a question. Second, the request reaches our API, where the application authenticates the caller and applies access rules. At step three, we retrieve approved knowledge when the question needs company facts. That might be a policy document or a product manual. Step four is the foundation model: it combines the question and useful context to generate a draft response. Step five is essential. Guardrails and application checks evaluate whether that response is safe, relevant, and appropriate to return. Only then do we reach step six, the answer shown to the customer. Notice two paths above the main line. An optional tool call can fetch information or perform an authorised action; complex or sensitive cases can be escalated to a human. And look at the dotted line along the bottom: logs and metrics help us investigate what happened at each stage. This is how a single question becomes a controlled production workflow.

### Slide 07 — Retrieval or Adaptation?

**Visible cues:** RAG: retrieves current private facts · Fine-tuning: adapts model behavior · Need fresh knowledge? · Need stable task behavior?

This is a decision you'll make frequently, so compare the two panels carefully. On the left is RAG, or retrieval-augmented generation. The user asks a question; the application searches private sources, such as documents, databases, or wikis; and the relevant context is added before the model is invoked. The model can answer using information that was retrieved at request time. Now look at the right-hand panel. Fine-tuning starts with a prepared training dataset and updates the model's behaviour before it is served for tasks. It is not simply a live lookup of today's company documents. The decision rule at the bottom is the important takeaway. Need fresh, frequently changing, or private facts? Start by considering retrieval. Need a more consistent task-specific style or behaviour, with suitable training examples? Fine-tuning may be appropriate. These approaches can also complement each other. But for exam scenarios, learn to recognise whether the real requirement is current knowledge or a change in model behaviour.

### Slide 08 — Security Around the Stack — Request Path

**Visible cues:** WAF · Guardrails · IAM · Secrets Manager · KMS · VPC / PrivateLink · CloudTrail · CloudWatch

Security here is shown as a set of layers around a request, not a single shield. Start on the left side of the middle row. A user reaches the application through an entry point protected by AWS WAF, which helps filter malicious web requests. Next, guardrails enforce content and usage policies around model interactions. In the centre, compute and the application handle the request, while the data layer must remain protected. Now look at the five service boxes across the top. IAM defines who can access what with least-privilege permissions. Secrets Manager securely stores and rotates credentials. KMS manages the encryption keys used to protect data. These controls complement WAF and guardrails; none replaces another. The dashed turquoise boundary underneath represents VPC and PrivateLink, which can provide controlled private network paths where supported. Finally, the bottom panels distinguish two important jobs: CloudTrail records AWS API activity for auditing, while CloudWatch tracks logs, metrics, and operational health. The lesson is defence in depth across identity, traffic, model behaviour, data, and operations.

### Slide 09 — Security Around the Stack — Control Responsibilities

**Visible cues:** User · Application · Foundation model · IAM · KMS · Secrets Manager · VPC / PrivateLink · WAF · Guardrails · CloudTrail · CloudWatch

This second security view reorganises those controls around the system we're protecting. Look first at the vertical centre: a user interacts with an application, and the application invokes a foundation model. Now scan the boxes on the left. IAM scopes the application's permissions. KMS manages encryption keys. Secrets Manager protects credentials used to reach dependent services. And VPC or PrivateLink can control supported network connections. On the right, WAF protects appropriate web entry points and guardrails check interactions with the model. CloudTrail supplies an audit trail of AWS API activity, while CloudWatch provides operational logs and monitoring. Notice that the protection is arranged around the entire user-to-model path. This matters because a secure model call is not enough if the application leaks secrets, the API allows excessive access, or nobody notices a failure. When you see a security scenario in the exam, ask which risk is being described, and then choose the control that addresses that specific risk.

### Slide 10 — Reference Application

**Visible cues:** User · API Gateway · Lambda orchestration · Bedrock model · Guardrails (input) · Guardrails (output) · S3 documents · Knowledge base / vector search · Human escalation · IAM and KMS · CloudWatch telemetry

Here is our full reference architecture for a customer-support assistant. Read the main path from left to right. The user asks a question, and API Gateway receives and routes the request. Lambda coordinates the application logic: it can add context, apply policies, and invoke the model. Notice the input guardrails above Lambda. The design includes checks for harmful or disallowed requests before the model produces an answer. Now look at the lower-left branch. When a question needs company knowledge, documents in Amazon S3 feed a knowledge base or vector-search system. Relevant information flows back into the orchestration step as optional context. Lambda then calls a model through Amazon Bedrock. The generated content passes through output guardrails before the application returns a helpful response. The downward arrow from Lambda shows a different outcome: an unresolved or sensitive case can be passed to a human agent. Finally, the box on the lower right shows the cross-cutting services. IAM controls access, KMS supports encryption, and CloudWatch gives us logs, metrics, and alarms. This diagram is a useful template for understanding how the earlier concepts become one working AWS application.

### Slide 11 — Reading Architecture Diagrams

**Visible cues:** component · request/data flow · optional/control/telemetry · trust or network scope · persistent store · execution order · Client · Application · Database · Monitoring

Before we move into more complex designs, let's learn how to read the diagrams used throughout this course. Start with the legend on the left. A rounded rectangle represents a component or service. A solid orange arrow shows a request or data flow. A dashed turquoise arrow indicates something different, such as an optional path, a control, or telemetry. The purple dashed outline marks a trust or network boundary, while the cylinder represents persistent storage. The numbered circles tell you the execution order. Now apply that legend to the example on the right. Step one goes from the client to the application. At step two, the application accesses the database. At step three, a separate dashed path sends monitoring information from the application. The dashed purple box encloses the trust or network scope. The direction and style of an arrow matter just as much as the service icons. Whenever we study an AWS architecture, trace the main request first, then inspect the boundaries, optional branches, security controls, and monitoring paths.

### Slide 12 — Next: Foundations & Bedrock

**Visible cues:** What can it do? · Which model fits? · How do we invoke it? · How do we control and evaluate it? · Foundation models · prompts · retrieval · guardrails · application integration

We're ready for Module One: foundations and Amazon Bedrock. Look at the four questions surrounding the model in the middle. First, what can a foundation model actually do, and what are its limitations? Second, which model fits a particular business requirement? Third, how does an application invoke the model in practice? And fourth, how do we control and evaluate the responses so they're useful and safe? The row along the bottom previews the building blocks we'll connect: foundation models, prompts, retrieval, guardrails, and application integration. Remember the end-to-end flow from our opening slide. We'll return to that same flow, but now we'll understand the model at its centre much more deeply. As you continue, focus less on memorising service names and more on why each component exists and how information moves between them. Let's begin with the foundations of generative AI and how Amazon Bedrock helps developers work with foundation models.

## QA checklist

- Confirm the scene numbers, headings, diagram labels and narrated sequence agree.
- Verify exactly 12 uploaded slide images in the new MP4; do not substitute generic or generated replacement images.
- Preserve the existing neural voice and rate unless deliberately changed in a later revision.
- Verify speech stops at slide changes, and captions, chapter timestamps and audio do not overlap.
- Review the near-duplicate security slides 8 and 9 separately; consider improving the visuals in a later iteration.
- Do not publish the new overview to the course site until the revised MP4 has passed visual and audio review.
