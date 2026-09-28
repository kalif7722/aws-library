import type { GcpExamDomain } from "./gcp-exam-objectives";

export const gcpAdditionalExamDomains: Record<string, GcpExamDomain[]> = {
  ACE: [
    {
      name: "Setting up a cloud solution environment",
      weight: "~20%",
      groups: [
        { id: "1-1", name: "Setting up cloud projects and accounts", tasks: [
          "Create a resource hierarchy and apply organization policies.",
          "Grant IAM roles within projects and manage users and groups in Cloud Identity.",
          "Enable APIs, set up Google Cloud Observability products, and assess quotas.",
          "Set up standalone organizations and cloud networking.",
          "Verify product availability across regions and zones.",
          "Configure Cloud Asset Inventory and use Gemini Cloud Assist to analyze resources.",
          "Configure Workforce Identity Federation."
        ] },
        { id: "1-2", name: "Managing billing configuration", tasks: [
          "Create one or more billing accounts and link projects to billing accounts.",
          "Establish billing budgets and alerts.",
          "Set up billing exports."
        ] }
      ]
    },
    {
      name: "Planning and implementing a cloud solution",
      weight: "~30%",
      groups: [
        { id: "2-1", name: "Planning and implementing compute resources", tasks: [
          "Select Compute Engine, GKE, Cloud Run, Cloud Run functions, or Agent Runtime on Gemini Enterprise Agent Platform for a workload.",
          "Launch compute instances and choose zonal Persistent Disk, regional Persistent Disk, or Hyperdisk.",
          "Create autoscaled managed instance groups from instance templates and configure OS Login and VM Manager.",
          "Use Spot VMs and custom machine types.",
          "Deploy GKE clusters including Autopilot, regional, and private clusters and deploy containerized applications.",
          "Deploy serverless applications that process Pub/Sub, Cloud Storage, or Eventarc events.",
          "Identify when to use GPUs or TPUs."
        ] },
        { id: "2-2", name: "Planning and implementing storage and data solutions", tasks: [
          "Choose and deploy Cloud SQL, BigQuery, Firestore, Spanner, Bigtable, AlloyDB, Dataflow, Pub/Sub, Managed Service for Apache Kafka, and Memorystore.",
          "Choose and deploy Cloud Storage, Filestore, NetApp Volumes, and Managed Lustre and select Cloud Storage classes.",
          "Load data using command-line tools, Cloud Storage, and Storage Transfer Service.",
          "Maintain multi-region redundancy across data solutions."
        ] },
        { id: "2-3", name: "Planning and implementing networking resources", tasks: [
          "Create custom-mode VPCs, Shared VPCs, subnets, and VPC Network Peering.",
          "Create VPC firewall rules and Cloud NGFW policies including ingress, egress, tags, and service accounts.",
          "Establish Cloud VPN, VPC Network Peering, and Cloud Interconnect connectivity.",
          "Choose and deploy load balancers and differentiate Network Service Tiers."
        ] },
        { id: "2-4", name: "Planning and implementing resources using tooling", tasks: [
          "Use Infrastructure as Code tooling such as Fabric FAST, Config Connector, Terraform, and Helm.",
          "Use AI-assisted planning and implementation tools such as Gemini CLI, Google Antigravity, Gemini Cloud Assist, and Application Design Center."
        ] }
      ]
    },
    {
      name: "Ensuring the successful operation of a cloud solution",
      weight: "~30%",
      groups: [
        { id: "3-1", name: "Managing compute resources", tasks: [
          "Connect to and inspect Compute Engine instances and manage snapshots and images.",
          "Inspect GKE clusters, nodes, Pods, Services, StatefulSets, Artifact Registry access, and node pools.",
          "Manage horizontal and vertical Pod autoscaling and GKE Autopilot resource requests.",
          "Deploy Cloud Run versions, configure traffic splitting, and configure Cloud Run autoscaling.",
          "Attach GPUs and TPUs, deploy agents to Agent Runtime, manage Agent Platform Workbench and BigQuery notebooks, and use Cloud Workstations."
        ] },
        { id: "3-2", name: "Managing storage and data solutions", tasks: [
          "Manage and secure Cloud Storage objects and configure object lifecycle policies.",
          "Run queries against Cloud SQL, BigQuery, Bigtable, Spanner, Firestore, and AlloyDB.",
          "Estimate storage costs and back up or restore Cloud SQL, Firestore, Spanner, AlloyDB, and Bigtable.",
          "Review Dataflow and BigQuery job status and use Database Center.",
          "Configure customer-managed encryption keys."
        ] },
        { id: "3-3", name: "Managing networking resources", tasks: [
          "Resize subnet IPv4 ranges, reserve static addresses, and add custom static routes.",
          "Use Cloud DNS and Cloud NAT.",
          "Manage VPC firewall rules and Cloud NGFW policies."
        ] },
        { id: "3-4", name: "Monitoring and logging", tasks: [
          "Create Cloud Monitoring alerts and custom metrics.",
          "Configure VPC Flow Logs, audit logs, firewall logs, log buckets, log analytics, and log routers.",
          "View and filter Cloud Logging entries and export logs to external systems or BigQuery.",
          "Use Cloud Trace, Cloud Profiler, Query Insights, and index advisor to diagnose issues.",
          "Use Personalized Service Health, Ops Agent, Managed Service for Prometheus, Gemini Cloud Assist, Active Assist, and Cloud Hub."
        ] }
      ]
    },
    {
      name: "Configuring access and security",
      weight: "~20%",
      groups: [
        { id: "4-1", name: "Managing IAM", tasks: [
          "View and create IAM policies.",
          "Attach roles and understand policy inheritance in the organization hierarchy.",
          "Manage predefined, basic, and custom IAM roles."
        ] },
        { id: "4-2", name: "Managing service accounts", tasks: [
          "Create Google-managed and user-managed service accounts and apply minimum permissions.",
          "Assign service accounts to resources and manage their IAM permissions.",
          "Use service account impersonation and short-lived credentials.",
          "Use service accounts with GKE applications and provision Workload Identity Federation."
        ] }
      ]
    }
  ],

  GAL: [
    {
      name: "Fundamentals of gen AI",
      weight: "~30%",
      groups: [
        { id: "1-1", name: "Describe core generative AI concepts and use cases", tasks: [
          "Define AI, NLP, machine learning, generative AI, foundation models, multimodal models, diffusion models, prompt tuning, prompt engineering, and LLMs.",
          "Describe supervised, unsupervised, and reinforcement learning approaches and the ML lifecycle.",
          "Choose a foundation model based on modality, context, security, availability, reliability, cost, performance, tuning, and customization.",
          "Identify create, summarize, discover, automate, code, image, video, data-analysis, and personalization use cases."
        ] },
        { id: "1-2", name: "Describe how data types are used in gen AI and the business implications", tasks: [
          "Explain data quality and accessibility characteristics including completeness, consistency, relevance, availability, cost, and format.",
          "Differentiate structured, unstructured, labeled, and unlabeled data and their business implications."
        ] },
        { id: "1-3", name: "Identify the core layers of the gen AI landscape and the business implications", tasks: [
          "Understand infrastructure, models, platforms, agents, and applications as layers of the gen AI landscape."
        ] },
        { id: "1-4", name: "Identify the use cases and strengths of Google's foundation models", tasks: [
          "Recognize the use cases and strengths of Gemini, Gemma, Imagen, and Veo."
        ] }
      ]
    },
    {
      name: "Google Cloud's gen AI offerings",
      weight: "~35%",
      groups: [
        { id: "2-1", name: "Describe Google Cloud's strengths in the field of gen AI", tasks: [
          "Explain Google's AI-first approach, enterprise-ready AI platform, comprehensive ecosystem, and open approach.",
          "Identify AI Hypercomputer, TPUs, GPUs, data centers, and cloud computing as AI-optimized infrastructure components.",
          "Explain data control, security, privacy, governance, prebuilt and customizable solutions, agents, APIs, low-code and no-code tools."
        ] },
        { id: "2-2", name: "Describe how Google Cloud's prebuilt gen AI offerings enable AI-powered work", tasks: [
          "Recognize the functionality and business value of the Gemini app, Gemini Advanced and Gems.",
          "Recognize Gemini Enterprise capabilities including Gemini Notebook API, multimodal search, and custom agents.",
          "Recognize Gemini for Google Workspace use cases and value."
        ] },
        { id: "2-3", name: "Describe how Google Cloud's gen AI offerings improve the customer experience", tasks: [
          "Recognize Agent Search on Gemini Enterprise Agent Platform and Google Search for external search experiences.",
          "Recognize Customer Engagement Suite components including Conversational Agents, Agent Assist, Conversational Insights, and Contact Center as a Service."
        ] },
        { id: "2-4", name: "Describe how Google Cloud empowers developers to build with AI", tasks: [
          "Recognize Agent Platform, Model Garden, Agent Search, Agent Platform AutoML, RAG offerings, and custom-agent capabilities."
        ] },
        { id: "2-5", name: "Define the purpose and types of tooling for gen AI agents", tasks: [
          "Explain extensions, functions, data stores, and plugins as agent tools.",
          "Identify Cloud Storage, databases, Cloud Functions, Cloud Run, Agent Platform and prebuilt AI APIs for agent tooling.",
          "Recognize Speech-to-Text, Text-to-Speech, Translation, Document Translation, Document AI, Vision, Video Intelligence, Natural Language, and Google Cloud API Library.",
          "Determine when to use Agent Studio and Google AI Studio."
        ] }
      ]
    },
    {
      name: "Techniques to improve gen AI model output",
      weight: "~20%",
      groups: [
        { id: "3-1", name: "Describe how to proactively overcome foundation model limitations", tasks: [
          "Identify model limitations including data dependency, knowledge cutoff, bias, fairness, hallucinations, and edge cases.",
          "Use grounding, RAG, prompt engineering, fine-tuning, and human-in-the-loop practices.",
          "Monitor evaluation, upgrades, security patches, versions, performance, drift, and Agent Platform Feature Store."
        ] },
        { id: "3-2", name: "Describe prompt engineering techniques and how they drive better results", tasks: [
          "Use zero-shot, one-shot, few-shot, role prompting, and prompt chaining.",
          "Recognize advanced prompting techniques including chain-of-thought and ReAct."
        ] },
        { id: "3-3", name: "Identify grounding techniques and their use cases", tasks: [
          "Differentiate grounding with enterprise, third-party, and world data.",
          "Explain RAG and Google Cloud grounding offerings including Agent Search, RAG APIs, and grounding with Google Search.",
          "Use token count, temperature, top-p, safety settings, and output length to control model behavior."
        ] }
      ]
    },
    {
      name: "Business strategies for a successful gen AI solution",
      weight: "~15%",
      groups: [
        { id: "4-1", name: "Describe Google Cloud-recommended steps to implement a transformational gen AI solution", tasks: [
          "Identify solution types, business requirements, technical constraints, and the right gen AI approach.",
          "Describe integration steps and techniques to measure the impact of gen AI initiatives."
        ] },
        { id: "4-2", name: "Define secure AI and its importance", tasks: [
          "Explain security throughout the ML lifecycle and the purpose of Google's Secure AI Framework (SAIF).",
          "Recognize secure-by-design infrastructure, IAM, Security Command Center, and workload monitoring tools."
        ] },
        { id: "4-3", name: "Describe the importance of responsible AI in business", tasks: [
          "Explain responsible AI, transparency, privacy, anonymization, pseudonymization, data quality, bias, fairness, accountability, and explainability."
        ] }
      ]
    }
  ],

  CDL: [
    {
      name: "Digital Transformation with Google Cloud",
      weight: "~18%",
      groups: [
        { id: "1-1", name: "Explain why and how the cloud is revolutionizing businesses", tasks: [
          "Define cloud, agentic AI, infrastructure, digital transformation, open source, and open standards.",
          "Explain scalability, cost effectiveness, agility, speed, flexibility, security, global reach, high availability, data-driven insights, and strategic value.",
          "Describe transformation drivers, challenges, and risks of not adopting cloud.",
          "Recognize Google Cloud differentiators including AI, openness, AI Hypercomputer, AI-ready data platform, security, and global networking."
        ] },
        { id: "1-2", name: "Describe fundamental cloud concepts", tasks: [
          "Compare private, hybrid, and multicloud architectures.",
          "Explain IP, DNS, latency, bandwidth, regions, zones, and edge locations.",
          "Compare IaaS, PaaS, and SaaS service models."
        ] }
      ]
    },
    {
      name: "Exploring Data Transformation with Google Cloud",
      weight: "~18%",
      groups: [
        { id: "2-1", name: "Describe the intrinsic role data plays in digital transformation", tasks: [
          "Explain the value of data, databases, data warehouses, data lakes, data types, data supply chains, governance, openness, and interoperability."
        ] },
        { id: "2-2", name: "Determine which Google Cloud data management products apply to business use cases", tasks: [
          "Match Cloud Storage, Spanner, Cloud SQL, AlloyDB, Bigtable, BigQuery, and Firestore to business use cases.",
          "Compare relational, non-relational, object, SQL, and NoSQL data models.",
          "Differentiate Cloud Storage Standard, Nearline, Coldline, Archive, and Autoclass.",
          "Describe database migration and modernization approaches."
        ] },
        { id: "2-3", name: "Discuss smart analytics, business intelligence, and streaming analytics", tasks: [
          "Explain Looker and BigQuery-based analytics and visualization.",
          "Explain real-time streaming analytics and products including Pub/Sub, Dataflow, and Managed Service for Apache Spark."
        ] }
      ]
    },
    {
      name: "Innovating with Google Cloud Artificial Intelligence",
      weight: "~18%",
      groups: [
        { id: "3-1", name: "Describe fundamental AI and ML concepts and how they create business value", tasks: [
          "Define AI, ML, gen AI, analytics, BI, agentic AI, common ML business use cases, data quality, explainable AI, and responsible AI."
        ] },
        { id: "3-2", name: "Explain how Google Cloud AI offerings create business value", tasks: [
          "Describe Gemini Enterprise Agent Platform business use cases and match pre-trained APIs and foundation models to workloads.",
          "Explain Agent Studio, AutoML on Agent Platform, AI Hypercomputer, GPUs, TPUs, and flexible consumption models.",
          "Explain BigQuery ML using standard SQL."
        ] }
      ]
    },
    {
      name: "Modernize Infrastructure and Applications with Google Cloud",
      weight: "~18%",
      groups: [
        { id: "4-1", name: "Describe how Google Cloud helps organizations transition to the cloud", tasks: [
          "Define discovery, assessment, retire, retain, rehost, replatform, refactor, and reimagine migration strategies.",
          "Define VMs, containers, applications, microservices, serverless, Spot VMs, Kubernetes, autoscaling, load balancing, and managed services."
        ] },
        { id: "4-2", name: "Describe functionality and business value of Google Cloud infrastructure offerings", tasks: [
          "Explain Compute Engine, GKE, Cloud Run, and Cloud Run functions business value.",
          "Recognize multicloud and hybrid products including AlloyDB Omni, BigQuery Omni, GKE Enterprise, Cloud SQL, and Looker."
        ] },
        { id: "4-3", name: "Describe the business value of APIs", tasks: [
          "Define APIs, API monetization opportunities, and the business value of Apigee API Management."
        ] }
      ]
    },
    {
      name: "Trust and Security with Google Cloud",
      weight: "~18%",
      groups: [
        { id: "5-1", name: "Describe fundamental cloud security concepts", tasks: [
          "Explain threats, cloud versus on-premises security, confidentiality, integrity, availability, least privilege, zero trust, posture, resilience, firewalls, encryption, authentication, authorization, auditing, and SecOps."
        ] },
        { id: "5-2", name: "Describe the business value of Google's defense-in-depth security approach", tasks: [
          "Recognize security across the AI stack, Google Threat Intelligence, Security Command Center, and Google Security Operations.",
          "Recognize secure-by-design infrastructure and AI security offerings including Gemini in Security Operations, AI Protection, and Model Armor.",
          "Recognize VPC, VPN, Interconnect, firewalls, Cloud Armor, Cloud Logging, IAM, Sensitive Data Protection, Confidential Computing, Certificate Manager, and Identity-Aware Proxy.",
          "Explain trust, transparency, audits, sovereignty, data residency, and compliance."
        ] }
      ]
    },
    {
      name: "Scaling with Google Cloud Operations",
      weight: "~10%",
      groups: [
        { id: "6-1", name: "Recognize how Google Cloud supports cloud cost control", tasks: [
          "Explain CapEx to OpEx, TCO, financial governance, resource hierarchy, quotas, budgets, billing reports, Dynamic Workload Scheduler, and Spot VMs."
        ] },
        { id: "6-2", name: "Describe modern operations, reliability, and resilience", tasks: [
          "Use Cloud Monitoring, Cloud Logging, Cloud Trace, Cloud Profiler, and Error Reporting concepts.",
          "Explain operational excellence, reliability, high availability, redundancy, replication, scalability, backups, latency, traffic, saturation, errors, DevOps, SRE, SLIs, SLOs, and SLAs."
        ] }
      ]
    }
  ],

  ADP: [
    {
      name: "Data Preparation and Ingestion",
      weight: "~30%",
      groups: [
        { id: "1-1", name: "Prepare and process data", tasks: [
          "Differentiate ETL, ELT, and ETLT.",
          "Choose Storage Transfer Service or Transfer Appliance for data transfer.",
          "Assess data quality and clean data using Cloud Data Fusion, BigQuery, SQL, or Dataflow."
        ] },
        { id: "1-2", name: "Extract and load data into appropriate Google Cloud storage systems", tasks: [
          "Identify CSV, JSON, Parquet, Avro, and structured table formats.",
          "Choose Dataflow, BigQuery Data Transfer Service, Database Migration Service, or Cloud Data Fusion for extraction.",
          "Choose Cloud Storage, BigQuery, Cloud SQL, Firestore, Bigtable, or Spanner and select regional, dual-region, multi-region, or zonal placement.",
          "Load data with gcloud, bq CLI, Storage Transfer Service, BigQuery Data Transfer Service, or client libraries."
        ] }
      ]
    },
    {
      name: "Data Analysis and Presentation",
      weight: "~27%",
      groups: [
        { id: "2-1", name: "Identify data trends, patterns, and insights using BigQuery and Jupyter notebooks", tasks: [
          "Write BigQuery SQL for reports and insights and use Colab Enterprise notebooks for analysis and visualization."
        ] },
        { id: "2-2", name: "Visualize data and create dashboards in Looker", tasks: [
          "Create, modify, and share dashboards.",
          "Compare Looker and Looker Studio and manipulate simple LookML parameters."
        ] },
        { id: "2-3", name: "Define, train, evaluate, and use ML models", tasks: [
          "Use BigQuery ML and AutoML for ML use cases and remote connections to Google LLMs.",
          "Plan ML projects, create and evaluate BigQuery ML models, perform inference, and organize models in Model Registry."
        ] }
      ]
    },
    {
      name: "Data Pipeline Orchestration",
      weight: "~18%",
      groups: [
        { id: "3-1", name: "Design and implement simple data pipelines", tasks: [
          "Choose Dataproc, Dataflow, Cloud Data Fusion, Cloud Composer, or Dataform and evaluate ETL versus ELT patterns."
        ] },
        { id: "3-2", name: "Schedule, automate, and monitor basic data processing tasks", tasks: [
          "Use BigQuery scheduled queries, Cloud Scheduler, Cloud Composer, Dataflow job UI, Cloud Logging, and Cloud Monitoring.",
          "Choose Cloud Composer, scheduled queries, Dataproc Workflow Templates, or Workflows for orchestration.",
          "Use Pub/Sub to BigQuery event-driven ingestion and Eventarc triggers with Dataform, Dataflow, Cloud Functions, Cloud Run, or Cloud Composer."
        ] }
      ]
    },
    {
      name: "Data Management",
      weight: "~25%",
      groups: [
        { id: "4-1", name: "Configure access control and governance", tasks: [
          "Apply least privilege with IAM for BigQuery and Cloud Storage.",
          "Compare Cloud Storage public, private, and uniform access and determine when to share data with Analytics Hub."
        ] },
        { id: "4-2", name: "Configure lifecycle management", tasks: [
          "Choose Cloud Storage classes based on access and retention.",
          "Configure BigQuery and Cloud Storage lifecycle and deletion policies and select archival services."
        ] },
        { id: "4-3", name: "Identify high availability and disaster recovery strategies", tasks: [
          "Compare Google-managed backup and recovery, replication, and primary versus secondary placement for Cloud Storage and Cloud SQL."
        ] },
        { id: "4-4", name: "Apply security measures and ensure compliance with data privacy regulations", tasks: [
          "Compare CMEK, CSEK, and Google-managed encryption keys.",
          "Use Cloud KMS and distinguish encryption in transit from encryption at rest."
        ] }
      ]
    }
  ],

  AGWA: [
    {
      name: "Managing user accounts, domains, and Directory",
      weight: "~20%",
      groups: [
        { id: "1-1", name: "Managing the user life cycle", tasks: [
          "Create, provision, deprovision, suspend, restore, archive, and modify users.",
          "Use third-party identity providers, SAML SSO, Directory Sync, and Google Cloud Directory Sync.",
          "Transfer Drive ownership, manage licenses, passwords, and account security."
        ] },
        { id: "1-2", name: "Designing and creating organizational units", tasks: [
          "Design, create, and manage organizational units using Google-recommended practices."
        ] },
        { id: "1-3", name: "Managing groups", tasks: [
          "Design group structures and manage distribution lists, Collaborative Inbox, dynamic groups, and security groups."
        ] },
        { id: "1-4", name: "Managing domains", tasks: [
          "Add and verify primary and secondary domains and manage domain aliases."
        ] },
        { id: "1-5", name: "Managing buildings and resources", tasks: [
          "Create buildings, rooms, and bookable resources and configure resource permissions and features."
        ] }
      ]
    },
    {
      name: "Managing core Workspace services",
      weight: "~23%",
      groups: [
        { id: "2-1", name: "Configuring Gmail", tasks: [
          "Configure MX records, routing, content compliance, spam, phishing, malware, allowlists, attachment controls, forwarding, POP/IMAP, SPF, DKIM, DMARC, migration, delegation, footers, and quarantines."
        ] },
        { id: "2-2", name: "Configuring Google Drive and Docs", tasks: [
          "Configure sharing defaults, trust rules, target audiences, templates, Shared Drives, quotas, Drive for desktop, ownership transfer, labels, and offline access."
        ] },
        { id: "2-3", name: "Configuring Google Calendar", tasks: [
          "Manage resource calendars, booking policies, delegation, internal and external sharing, shared calendars, ownership transfer, and invitation controls."
        ] },
        { id: "2-4", name: "Configuring Google Meet", tasks: [
          "Enable Meet by OU and configure safety, quality, recording, transcript, and note-taking settings."
        ] },
        { id: "2-5", name: "Configuring Google Chat", tasks: [
          "Enable Chat by OU and configure history, spaces, external participation, moderation, invites, and Chat apps."
        ] },
        { id: "2-6", name: "Using generative AI for Google Workspace", tasks: [
          "Protect organization data when using gen AI, enable Gemini by OU, enable Workspace extensions, and generate Gemini usage reports."
        ] },
        { id: "2-7", name: "Supporting Workspace development", tasks: [
          "Identify AppSheet and Apps Script automation use cases and enable AppSheet by OU."
        ] }
      ]
    },
    {
      name: "Managing data governance and compliance",
      weight: "~15%",
      groups: [
        { id: "3-1", name: "Using Google Vault for eDiscovery and data retention", tasks: [
          "Configure retention, holds, search, export, archive-user licensing, and audit reporting in Google Vault."
        ] },
        { id: "3-2", name: "Creating and managing data loss prevention rules", tasks: [
          "Create DLP rules for Gmail, Chat, and Drive using content detectors, regular expressions, actions, and customized notifications."
        ] },
        { id: "3-3", name: "Creating and managing Drive trust rules", tasks: [
          "Allow or block sharing by OU, group, domain, user, visitor, or external identity."
        ] },
        { id: "3-4", name: "Determining how to store and export environment data", tasks: [
          "Manage Google Takeout, Data Export, geographic data location, and legal or compliance settings."
        ] },
        { id: "3-5", name: "Classifying data", tasks: [
          "Use labels, DLP, default classification, and AI classification for Drive and Gmail data."
        ] }
      ]
    },
    {
      name: "Managing security policies and access controls",
      weight: "~20%",
      groups: [
        { id: "4-1", name: "Securing user access", tasks: [
          "Enforce password policies, recovery options, 2-step verification and passkeys.",
          "Use context-aware access, security policies, delegated administrator roles, and Google Session Control."
        ] },
        { id: "4-2", name: "Reporting, auditing, and investigating security risks and events", tasks: [
          "Use audit and investigation tools, security center, security health, activity rules, and alerts."
        ] },
        { id: "4-3", name: "Enabling additional Google and third-party applications", tasks: [
          "Manage Marketplace and Play Store application access, third-party SSO, additional Google services, and connected applications."
        ] }
      ]
    },
    {
      name: "Managing browsers and endpoints",
      weight: "~10%",
      groups: [
        { id: "5-1", name: "Managing mobile devices", tasks: [
          "Choose basic, advanced, or third-party mobile management and manage company-owned and BYOD device security and offboarding."
        ] },
        { id: "5-2", name: "Managing Chrome browsers", tasks: [
          "Enroll Chrome browsers, apply browser policies, and allow, block, or force-install extensions and apps by OU or group."
        ] }
      ]
    },
    {
      name: "Monitoring and troubleshooting common issues",
      weight: "~13%",
      groups: [
        { id: "6-1", name: "Identifying and diagnosing Workspace issues", tasks: [
          "Use Admin console audit logs and the Google Workspace Status Dashboard and diagnose mail delivery issues."
        ] },
        { id: "6-2", name: "Troubleshooting and resolving common issues", tasks: [
          "Troubleshoot user access, 2SV, Gmail delivery, Email Log Search, SPF/DKIM/DMARC, Calendar, Drive, Drive for desktop, offline access, deleted data, and Meet quality or access issues."
        ] },
        { id: "6-3", name: "Viewing, creating, and managing reports and audit logs", tasks: [
          "Monitor application usage, storage limits, audit reports, and device activity."
        ] },
        { id: "6-4", name: "Using support resources", tasks: [
          "Document reproduction steps, collect logs and HAR files, check status and known issues, open Google Support cases, and use the Workspace updates blog, status dashboard, and release calendar."
        ] }
      ]
    }
  ]
};
