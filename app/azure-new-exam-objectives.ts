import type { AzureExamDomain } from "./azure-exam-objectives";

export const azureNewExamDomains: Record<string, AzureExamDomain[]> = {
  "AI-901": [
    {
      "name": "Identify AI concepts and capabilities",
      "weight": "40–45%",
      "groups": [
        {
          "name": "Describe principles of responsible AI",
          "tasks": [
            "Describe considerations for fairness in an AI solution",
            "Describe considerations for reliability and safety in an AI solution",
            "Describe considerations for privacy and security in an AI solution",
            "Describe considerations for inclusiveness in an AI solution",
            "Describe considerations for transparency in an AI solution",
            "Describe considerations for accountability in an AI solution"
          ]
        },
        {
          "name": "Identify AI model components and configurations",
          "tasks": [
            "Describe how generative AI models work",
            "Identify an appropriate AI model, based on capabilities",
            "Identify appropriate model deployment options and configuration parameters"
          ]
        },
        {
          "name": "Identify AI workloads",
          "tasks": [
            "Identify scenarios for common AI workloads, including generative and agentic AI, text analysis, speech, computer vision, and information extraction",
            "Describe common text analysis techniques, including keyword extraction, entity detection, sentiment analysis, and summarization",
            "Identify features and capabilities of speech recognition and speech synthesis",
            "Identify features and capabilities of computer vision and image-generation models",
            "Identify techniques to extract information from text, images, audio, and videos"
          ]
        }
      ]
    },
    {
      "name": "Implement AI solutions by using Microsoft Foundry",
      "weight": "55–60%",
      "groups": [
        {
          "name": "Implement generative AI apps and agents by using Foundry",
          "tasks": [
            "Create effective system and user prompts for generative AI models",
            "Deploy a model and interact with it in the Foundry portal",
            "Create a lightweight chat client application by using the Foundry SDK",
            "Create and test a single-agent solution in the Foundry portal",
            "Create a lightweight client application for an agent"
          ]
        },
        {
          "name": "Implement AI solutions for text and speech by using Foundry",
          "tasks": [
            "Build a lightweight application that includes text analysis",
            "Respond to spoken prompts by using a deployed multimodal model",
            "Build a lightweight application by using Azure Speech in Foundry Tools"
          ]
        },
        {
          "name": "Implement AI solutions with computer vision and image-generation capabilities by using Foundry",
          "tasks": [
            "Interpret visual input in prompts by using a deployed multimodal model",
            "Create new visual outputs by using generative models",
            "Build a lightweight application that includes vision capabilities"
          ]
        },
        {
          "name": "Implement AI solutions for information extraction by using Foundry",
          "tasks": [
            "Extract information from documents and forms by using Azure Content Understanding in Foundry Tools",
            "Extract information from images by using Content Understanding",
            "Extract information from audio and video by using Content Understanding",
            "Build a lightweight application with information extraction capabilities by using Content Understanding"
          ]
        }
      ]
    }
  ],
  "AI-103": [
    {
      "name": "Plan and manage an Azure AI solution",
      "weight": "25–30%",
      "groups": [
        {
          "name": "Choose the appropriate Foundry services for generative AI and agents",
          "tasks": [
            "Choose an appropriate model for each task, including large language models (LLMs), small language models, multimodal models, and Foundry Tools",
            "Choose the appropriate Foundry services for generative tasks, grounding, vector search, agent workflows, or multimodal processing",
            "Choose an appropriate method for retrieval and indexing",
            "Choose appropriate memory, tool, and knowledge integration services for agent solutions"
          ]
        },
        {
          "name": "Set up AI solutions in Foundry",
          "tasks": [
            "Design Azure infrastructure for AI apps and agent-based solutions",
            "Choose appropriate deployment options",
            "Configure model and agent deployments",
            "Integrate Foundry projects with continuous integration and continuous deployment (CI/CD) pipelines"
          ]
        },
        {
          "name": "Manage, monitor, and secure AI systems",
          "tasks": [
            "Manage quotas, scaling, rate limits, and cost footprints for model and agent workloads",
            "Monitor model performance, drift, safety events, and grounding quality",
            "Monitor data ingestion quality, search index health, and relevance performance",
            "Configure security, including managed identity, private networking, keyless credentials, and role policies"
          ]
        },
        {
          "name": "Implement responsible AI across generative AI and agentic systems",
          "tasks": [
            "Configure safety filters, guardrails, risk detection, and content moderation",
            "Apply responsible AI instrumentation, including evaluators, safety evaluations, and explanation tooling",
            "Implement auditing through trace logging, provenance metadata, and approval workflows",
            "Govern agent behavior with oversight modes, constraints, and tool-access controls"
          ]
        }
      ]
    },
    {
      "name": "Implement generative AI and agentic solutions",
      "weight": "30–35%",
      "groups": [
        {
          "name": "Build generative applications by using Foundry",
          "tasks": [
            "Deploy and consume LLMs, small models, code models, and multimodal models",
            "Implement retrieval-augmented generation (RAG) in an application",
            "Design workflows, tool-augmented flows, and multistep reasoning pipelines",
            "Evaluate models and apps, including detecting fabrications, relevance, quality, and safety",
            "Integrate generative workflows into applications by using Foundry SDKs and connectors",
            "Configure an application to connect to a Foundry project"
          ]
        },
        {
          "name": "Build agents by using Foundry",
          "tasks": [
            "Define agent roles, goals, conversation-tracking approach, and tool schemas",
            "Build agents that integrate retrieval, function-calling, and conversation memory",
            "Integrate agent tools, including APIs, knowledge stores, search, content understanding, and custom functions",
            "Implement orchestrated multi-agent solutions",
            "Build autonomous or semiautonomous workflows with safeguards and approval flow controls",
            "Integrate monitoring into deployed agents, evaluate agent behavior, and perform error analysis"
          ]
        },
        {
          "name": "Optimize and operationalize generative AI systems",
          "tasks": [
            "Tune generation behavior, such as prompt engineering and adjusting model parameters",
            "Implement model reflection, chain-of-thought evaluations, and self-critique loops",
            "Set up observability by implementing tracing, token analytics, safety signals, and latency breakdowns",
            "Orchestrate multiple models, flows, or hybrid LLM and rules engines"
          ]
        }
      ]
    },
    {
      "name": "Implement computer vision solutions",
      "weight": "10–15%",
      "groups": [
        {
          "name": "Design and implement image- and video-generation solutions",
          "tasks": [
            "Implement a solution that generates images from text prompts and reference media",
            "Implement a solution that generates videos from text prompts and reference media",
            "Configure image-editing workflows, including inpainting, mask‑based edits, and prompt‑driven modifications",
            "Implement workflows to edit generated videos",
            "Select and apply appropriate generation and editing controls provided by the platform"
          ]
        },
        {
          "name": "Design and implement multimodal understanding workflows",
          "tasks": [
            "Build a solution that analyzes visual context by using multimodal models",
            "Configure apps to produce concise or detailed captions for single or multiple images",
            "Implement a solution that enables question‑answering grounded in visual evidence",
            "Configure generation of alt‑text and extended image descriptions aligned to accessibility guidelines",
            "Implement visual understanding by configuring Azure Content Understanding in Foundry Tools to extract visual characteristics",
            "Implement video analysis workflows to process and interpret video segments",
            "Configure single‑task and pro‑mode Content Understanding pipelines",
            "Implement solutions that identify objects, components, or regions within images or video"
          ]
        },
        {
          "name": "Implement responsible AI for multimodal content",
          "tasks": [
            "Implement filters to classify unsafe or disallowed visual content",
            "Detect and mitigate indirect prompt injection by using embedded text in images",
            "Enforce visual policy rules, such as applying watermarks, flagging prohibited symbols, upholding brand usage requirements, and detecting potentially inappropriate content"
          ]
        }
      ]
    },
    {
      "name": "Implement text analysis solutions",
      "weight": "10–15%",
      "groups": [
        {
          "name": "Apply language model text analysis",
          "tasks": [
            "Implement solutions to extract entities, topics, summaries, and structured JSON outputs by using generative prompting and Foundry Tools",
            "Configure detection of sentiment, tone, safety issues, and sensitive content",
            "Build solutions that translate text by using Azure Translator in Foundry Tools or LLM‑powered translation flows",
            "Customize language model outputs for domain tasks, such as compliance summarization and domain extraction"
          ]
        },
        {
          "name": "Implement speech solutions",
          "tasks": [
            "Implement workflows to convert speech to text and text to speech for agentic interactions",
            "Integrate speech as an agent modality, including custom speech models",
            "Enable multimodal reasoning from audio inputs",
            "Translate speech into other languages by using language models and Foundry Tools"
          ]
        }
      ]
    },
    {
      "name": "Implement information extraction solutions",
      "weight": "10–15%",
      "groups": [
        {
          "name": "Build retrieval and grounding pipelines",
          "tasks": [
            "Ingest and index content, such as documents, images, audio, and video",
            "Configure semantic search, hybrid search, and vector search for grounding",
            "Implement enrichment by using custom or built-in skills for text, images, and layout",
            "Configure RAG ingestion flow, including documents and using optical character recognition (OCR)",
            "Connect retrieval pipelines directly to workflows and agent tools"
          ]
        },
        {
          "name": "Extract content from documents",
          "tasks": [
            "Extract information by using multimodal pipelines that combine OCR, layout analysis, and field extraction",
            "Produce clean, grounded representations to use with agents and RAG by using Content Understanding",
            "Implement analyzers for generating structured or markdown outputs for downstream reasoning by using Content Understanding"
          ]
        }
      ]
    }
  ],
  "DP-900": [
    {
      "name": "Describe core data concepts",
      "weight": "25–30%",
      "groups": [
        {
          "name": "Describe ways to represent data",
          "tasks": [
            "Describe the features of structured data",
            "Describe the features of semi-structured data",
            "Describe the features of unstructured data"
          ]
        },
        {
          "name": "Identify options for data storage",
          "tasks": [
            "Describe common formats for data files",
            "Describe features of common data stores including databases",
            "Identify Azure datastores for common use cases"
          ]
        },
        {
          "name": "Describe common data workloads",
          "tasks": [
            "Describe features of transactional workloads",
            "Describe features of analytical workloads"
          ]
        },
        {
          "name": "Identify roles and responsibilities for data workloads",
          "tasks": [
            "Describe responsibilities for database administrators",
            "Describe responsibilities for data engineers",
            "Describe responsibilities for data analysts"
          ]
        }
      ]
    },
    {
      "name": "Identify considerations for relational data on Azure",
      "weight": "20–25%",
      "groups": [
        {
          "name": "Describe relational concepts",
          "tasks": [
            "Identify features of relational data",
            "Describe normalization and why it is used",
            "Identify common structured query language (SQL) statements",
            "Identify common database objects"
          ]
        },
        {
          "name": "Describe relational Azure data services",
          "tasks": [
            "Describe the Azure SQL family of products, including Azure SQL Database, Azure SQL Managed Instance, and SQL Server on Azure Virtual Machines",
            "Identify Azure database services for open-source database systems"
          ]
        }
      ]
    },
    {
      "name": "Describe considerations for working with non-relational data on Azure",
      "weight": "15–20%",
      "groups": [
        {
          "name": "Describe the capabilities of Azure storage",
          "tasks": [
            "Describe features of Azure Blob storage",
            "Describe features of Azure Files",
            "Describe features of Azure Table storage"
          ]
        },
        {
          "name": "Describe the capabilities and features of Azure Cosmos DB",
          "tasks": [
            "Identify use cases for Azure Cosmos DB",
            "Describe Azure Cosmos DB APIs"
          ]
        }
      ]
    },
    {
      "name": "Describe an analytics workload",
      "weight": "25–30%",
      "groups": [
        {
          "name": "Describe common elements of large-scale analytics",
          "tasks": [
            "Describe considerations for data ingestion and processing",
            "Describe options for analytical data stores",
            "Describe Microsoft cloud services for large-scale analytics, including Azure Databricks and Microsoft Fabric"
          ]
        },
        {
          "name": "Describe considerations for real-time data analytics",
          "tasks": [
            "Describe the difference between batch and streaming data",
            "Identify Microsoft cloud services for real-time analytics"
          ]
        },
        {
          "name": "Describe data visualization in Microsoft Power BI",
          "tasks": [
            "Identify the capabilities of Power BI",
            "Describe features of data models in Power BI",
            "Identify appropriate visualizations for data"
          ]
        }
      ]
    }
  ],
  "DP-300": [
    {
      "name": "Plan and implement data platform resources",
      "weight": "15–20%",
      "groups": [
        {
          "name": "Plan and deploy Azure SQL solutions",
          "tasks": [
            "Recommend a database offering based on specific requirements",
            "Choose an automated deployment method",
            "Identify use cases for Azure Arc-enabled SQL services",
            "Identify use cases for Azure SQL Database in Microsoft Fabric",
            "Plan for table partitioning",
            "Recommend a database sharding solution",
            "Deploy database offerings on selected platforms",
            "Deploy hybrid SQL Server solutions",
            "Apply patches and updates for hybrid and infrastructure as a service (IaaS) deployment"
          ]
        },
        {
          "name": "Configure resources for scale and performance",
          "tasks": [
            "Configure Azure SQL Database for scale and performance",
            "Configure Azure SQL Managed Instance for scale and performance",
            "Configure SQL Server on Azure Virtual Machines for scale and performance",
            "Configure table partitioning",
            "Configure data compression"
          ]
        },
        {
          "name": "Plan and implement a migration strategy",
          "tasks": [
            "Evaluate requirements for a migration",
            "Evaluate offline or online migration strategies",
            "Implement an online migration strategy",
            "Implement an offline migration strategy",
            "Implement a migration to Azure",
            "Implement a migration between Azure SQL services",
            "Implement Azure SQL Managed Instance database copy and move",
            "Troubleshoot a migration"
          ]
        }
      ]
    },
    {
      "name": "Implement a secure environment",
      "weight": "20–25%",
      "groups": [
        {
          "name": "Configure database authentication and authorization",
          "tasks": [
            "Configure Microsoft Entra ID authentication for Azure SQL Database, Azure SQL Managed Instance, and SQL Server",
            "Configure authentication for SQL on Azure VMs and Azure SQL Managed Instance",
            "Configure security principals",
            "Create users from Microsoft Entra identities",
            "Configure database and object-level permissions using graphical tools",
            "Apply the principle of least privilege for all securables",
            "Troubleshoot authentication and authorization issues",
            "Manage authentication and authorization by using T-SQL"
          ]
        },
        {
          "name": "Implement security for data at rest and data in transit",
          "tasks": [
            "Implement transparent data encryption (TDE)",
            "Implement object-level encryption",
            "Configure server- and database-level firewall rules",
            "Implement Always Encrypted",
            "Implement Always Encrypted with VBS enclaves",
            "Configure private links and service endpoints"
          ]
        },
        {
          "name": "Implement compliance controls for sensitive data",
          "tasks": [
            "Apply a data classification strategy",
            "Configure server and database audits",
            "Implement change data tracking",
            "Implement dynamic data masking",
            "Implement ledger in Azure SQL",
            "Implement row-level security"
          ]
        }
      ]
    },
    {
      "name": "Monitor, configure, and optimize database resources",
      "weight": "20–25%",
      "groups": [
        {
          "name": "Monitor resource activity and performance",
          "tasks": [
            "Prepare an operational performance baseline",
            "Determine sources for performance metrics",
            "Interpret performance metrics",
            "Configure and monitor activity and performance",
            "Monitor by using database watcher",
            "Monitor by using Extended Events"
          ]
        },
        {
          "name": "Monitor and optimize query performance",
          "tasks": [
            "Configure Query Store",
            "Monitor by using Query Store",
            "Identify and resolve session blocking",
            "Identify performance issues using dynamic management views (DMVs)",
            "Identify and implement index changes for queries",
            "Recommend query construct modifications based on resource usage",
            "Review execution plans",
            "Monitor by using Intelligent Insights"
          ]
        },
        {
          "name": "Configure database solutions for optimal performance",
          "tasks": [
            "Implement index maintenance tasks",
            "Implement statistics maintenance tasks",
            "Implement database integrity checks",
            "Configure database automatic tuning",
            "Configure server settings for performance",
            "Configure Resource Governor for performance",
            "Implement database-scoped configuration",
            "Configure compute and storage resources for scaling",
            "Identify use cases for intelligent query processing (IQP) features"
          ]
        }
      ]
    },
    {
      "name": "Configure and manage automation of tasks",
      "weight": "15–20%",
      "groups": [
        {
          "name": "Create and manage SQL Server Agent jobs",
          "tasks": [
            "Manage schedules for regular maintenance jobs",
            "Configure job alerts and notifications",
            "Troubleshoot SQL Server Agent jobs"
          ]
        },
        {
          "name": "Automate deployment of database resources",
          "tasks": [
            "Automate deployment by using Azure Resource Manager (ARM) and Bicep templates",
            "Automate deployment by using Azure PowerShell",
            "Automate deployment by using Azure CLI",
            "Monitor and troubleshoot deployments"
          ]
        },
        {
          "name": "Create and manage database tasks in Azure",
          "tasks": [
            "Create and configure elastic jobs",
            "Create and configure database tasks by using automation",
            "Configure alerts and notifications on database tasks",
            "Troubleshoot automated database tasks"
          ]
        }
      ]
    },
    {
      "name": "Plan and configure a high availability and disaster recovery (HA/DR) environment",
      "weight": "20–25%",
      "groups": [
        {
          "name": "Plan an HA/DR strategy for database solutions",
          "tasks": [
            "Recommend HA/DR strategy based on Recovery Point Objective/Recovery Time Objective (RPO/RTO) requirements",
            "Evaluate HA/DR for hybrid deployments",
            "Evaluate Azure-specific HA/DR solutions",
            "Plan a testing procedure for an HA/DR solution"
          ]
        },
        {
          "name": "Plan and perform backup and restore of a database",
          "tasks": [
            "Recommend a database backup and restore strategy",
            "Perform a database backup by using native tools",
            "Perform a database restore by using native tools",
            "Perform a database restore to a point in time",
            "Configure long-term backup retention",
            "Backup and restore a database by using T-SQL",
            "Backup to and restore from cloud storage"
          ]
        },
        {
          "name": "Configure HA/DR for database solutions",
          "tasks": [
            "Configure active geo-replication",
            "Configure Always On availability groups on SQL Managed Instance and Azure virtual machines",
            "Configure failover groups",
            "Configure Always On Failover Cluster Instances on Azure virtual machines",
            "Configure log shipping",
            "Monitor an HA/DR solution",
            "Troubleshoot an HA/DR solution"
          ]
        }
      ]
    }
  ]
};
