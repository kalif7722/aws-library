# AIP-C01 · Module 00 — Lecturer Video Storyboard

**Status:** 12-slide script updated after GitHub Actions confirmed original slide files 1–12 and 404 for slide 13.

**Format:** Original 12 full-screen slides · instructor voice · MP4 · subtitles · chapter markers.

**Note:** The source PDF/course topic mapping mentions a thirteenth closing topic, but no corresponding visual image is present. Its closing narration is included at the end of slide 12 rather than generating a placeholder.

## Lecture script

### Slide 01 — AWS Certified Generative AI Developer Professional Course (AIP-C01)

Welcome to the AWS Certified Generative AI Developer Professional course. I'm glad you're here. Over this course, we'll look at what it really takes to build generative AI applications that work in production, not just in a demo. We'll start with the foundations, then connect models to business data, introduce agents and tools, and work through reliability, security, governance, and cost. You'll see AWS architecture decisions through practical examples, so as we move forward, keep asking yourself three questions: What problem are we solving? Why would I choose this AWS service? And what could go wrong in production? That mindset will help with both real projects and scenario-based exam questions.

### Slide 02 — What We’ll Cover: GenAI Fundamentals and Bedrock

First, we need a common language. A foundation model is a powerful starting point, but the model alone is not the application. We have to choose a suitable model, send useful prompts, manage outputs, and decide when the model needs external knowledge. Amazon Bedrock gives developers a managed way to work with different foundation models. We'll compare prompting, retrieval-augmented generation, or RAG, and model customization. For example, if a company wants answers from its own frequently changing documents, retrieval may be a better first choice than repeatedly fine-tuning a model. As we study Bedrock, pay attention to the trade-offs: model capability, cost, response time, data handling, and how easily a solution can be operated.

### Slide 03 — Managing Data for Generative AI

Now let's talk about data, because even an excellent model can produce poor answers when the supporting information is weak. Imagine an employee asking a chatbot about a current internal policy. The application needs to find the correct document, use only information that employee is allowed to see, and keep the answer grounded in the source. We'll explore ingestion, document preparation, chunking, embeddings, vector search, and retrieval. We'll also look at choosing storage services and protecting sensitive data throughout the flow. A useful question to remember is this: where does the answer's evidence come from, and how do we know it's the right evidence? That becomes especially important when documents change or different users have different permissions.

### Slide 04 — Agentic AI

Next comes agentic AI. A conventional chatbot might answer a question, but an agent can decide to take steps toward a goal, use a tool, inspect a result, and continue. Picture a support assistant that checks an order, looks up a delivery status, and creates a ticket only when it's needed. That requires more than a prompt. We'll examine orchestration, tool permissions, retries, memory, and the boundaries around what an agent should be allowed to do. You'll encounter Amazon Bedrock Agents, multi-agent patterns, Strands Agents, and Amazon Bedrock AgentCore. The key distinction is not just that an agent calls an API. It's how the application plans and controls a sequence of actions, while keeping humans and security controls in the loop when necessary.

### Slide 05 — Operational Efficiency and Optimization

A generative AI application might work perfectly in a test and still fail as a business service if it's too slow or too expensive. This module looks at that practical side. Tokens affect both cost and the amount of context a model can process. Model selection changes quality, latency, and throughput. We also need to consider caching, concurrency, prompt length, retry behavior, and how the application behaves under load. Think about a customer-service assistant serving thousands of users. We don't necessarily want the largest model for every request. Often the smarter architecture routes simple tasks efficiently and reserves more expensive processing for the cases that need it. We'll learn to measure these trade-offs rather than guess.

### Slide 06 — Managing Models with SageMaker AI

Amazon Bedrock isn't the only important option in the AWS AI ecosystem. Some teams need deeper control over model development, data processing, training, deployment, or monitoring. That's where Amazon SageMaker AI comes into the picture. We'll discuss when to use managed foundation models and when a more customized machine-learning workflow makes sense. We'll also examine the model lifecycle: preparing data, training or adapting models, deploying endpoints, monitoring behavior, and applying safeguards. You don't need to memorize a single architecture for every problem. The skill is recognizing the amount of control the business actually needs and choosing a platform that matches those requirements.

### Slide 07 — More Tools for Building AI Applications

Of course, a production application has much more than a model at its center. Users need a way to send requests. The system may need to call databases, validate inputs, coordinate several steps, and roll out changes safely. We'll connect AI components with services such as Amazon API Gateway, AWS Lambda, AWS Step Functions, and AWS AppConfig. For example, a request could enter through an API, trigger a Lambda function, retrieve relevant context, invoke a model, and return a checked response. More complex workflows might use Step Functions for clear orchestration and error handling. As you see these diagrams later, trace the request from the user all the way to the final response and back again.

### Slide 08 — Governance and Quality Assurance

How do we know that our AI application is behaving well? A response that sounds convincing isn't necessarily accurate, safe, or useful. Governance and quality assurance help us answer that question systematically. We'll explore prompt management, evaluation datasets, tracing, monitoring, and the feedback loops that identify failures. We need to judge relevance, groundedness, correctness, safety, and consistency, depending on the use case. Imagine changing a prompt that improves one question but breaks ten others. Without repeatable evaluations, you might never notice. We'll treat testing as an ongoing engineering discipline, not a final checkbox. We'll also consider when a human review step or additional safeguards are appropriate.

### Slide 09 — Security, Identity, and Compliance

Security has to be built into the entire application. We're not just protecting a model endpoint. We're protecting user identities, prompts, retrieved documents, tool permissions, stored records, and logs. We'll examine identity and access management with AWS IAM, encryption controls with AWS KMS, and data-discovery capabilities such as Amazon Macie, alongside broader security and compliance decisions. Consider an agent that is allowed to look up account details. It should not automatically gain permission to modify those accounts. We'll look at least-privilege permissions, separation of responsibilities, encryption, auditability, and how to avoid exposing sensitive data in prompts or responses. These principles are critical both for AWS exams and for real production systems.

### Slide 10 — Other AWS Services You Should Know

Generative AI doesn't live in isolation. The surrounding architecture often uses familiar AWS building blocks: compute services, containers, databases, storage, analytics, networking, and customer-engagement tools. A team might deploy a web application in containers, store transaction data in a database, stream operational events into analytics, and use a foundation model for natural-language interaction. The exam may test the entire solution, not only the model invocation. We'll therefore connect services by their role in the architecture instead of studying them as disconnected names. Whenever a new service appears, ask what responsibility it owns, what information it receives, and how it helps the system meet its requirements.

### Slide 11 — This All May Seem Familiar…

If you've worked with AWS, software development, networking, databases, or security before, some of these concepts will feel familiar. That's a good thing. Generative AI applications still need reliable APIs, good data, identity controls, monitoring, and sensible architecture. What changes is how we incorporate probabilistic model outputs, retrieval, agent decisions, and evaluation into those established patterns. Even if AI is newer to you, you already have a useful starting point whenever you understand how a request moves through an application. We'll keep building on those connections, and we'll avoid treating every new feature as a completely separate world.

### Slide 12 — Target Candidate

Let's also set expectations for who this course is designed to help. The Generative AI Developer Professional track is most useful for learners who want to design, build, integrate, and operate production generative AI solutions on AWS. You may come from an application development, cloud architecture, machine learning, or security background. Those strengths all help, but we'll need to connect them to real implementation choices. As we progress, pay attention to scenario wording, service limits, operational constraints, and the distinction between an attractive demo and a dependable production design. Where hands-on experience would make a topic clearer, we'll connect the concepts to practical architecture walkthroughs and labs.

And that's our roadmap. We begin with the foundations and Amazon Bedrock, then build outward into data, agents, optimization, model management, application tools, governance, security, and supporting AWS services. As we go, I'll explain not only what each service does, but when to choose it, when not to, and how the different pieces fit together. I'd encourage you to pause at architecture diagrams, predict the next step in the request flow, and revisit topics after trying a lab. The aim is understanding that you can apply, rather than memorizing isolated facts. Thanks for joining me. Let's move into the first technical module and start building a solid foundation in generative AI on AWS.

## Review checklist

- Confirm all 12 original slide images appear and their spoken explanations match the visuals.
- Check pronunciation, narration clarity, pacing, sentence-level subtitles, slide changes, and chapter markers.
- Verify the MP4 plays completely before adding it to the course page.
