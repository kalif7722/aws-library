export type GcpExamSkill = {
  id: string;
  name: string;
  tasks: string[];
};

export type GcpExamDomain = {
  name: string;
  weight: string;
  groups: GcpExamSkill[];
};

export const gcpOfficialExamDomains: Record<string, GcpExamDomain[]> = {
  PCDE: [
    {
      name: "Design innovative, scalable, and highly available cloud database solutions",
      weight: "~32%",
      groups: [
        { id: "1-1", name: "Analyze relevant variables to perform database capacity and usage planning", tasks: [
          "Perform solution sizing based on current environment workload metrics and future requirements.",
          "Evaluate performance and cost tradeoffs of different database configurations (for example, machine types and storage types).",
          "Size database compute and storage based on performance requirements."
        ] },
        { id: "1-2", name: "Evaluate database high availability and disaster recovery options given the requirements", tasks: [
          "Evaluate tradeoffs between multi-regional, regional, and zonal database deployment strategies.",
          "Define maintenance windows and notifications based on application availability requirements."
        ] },
        { id: "1-3", name: "Determine how applications will connect to the database", tasks: [
          "Configure networking, key management, encryption, and security.",
          "Justify the use of session pooler services.",
          "Assess auditing policies for managed services."
        ] },
        { id: "1-4", name: "Evaluate appropriate database solutions on Google Cloud", tasks: [
          "Differentiate between managed and unmanaged database services (for example, self-managed, bare metal, Google-managed, Google Cloud native, and partner database offerings).",
          "Distinguish between SQL and NoSQL business requirements (for example, structured, semi-structured, unstructured, and vector).",
          "Analyze the cost of running database solutions in Google Cloud using comparative analysis.",
          "Assess application and database dependencies.",
          "Identify solutions to support regulatory and compliance requirements.",
          "Understand implications of organizational policies on database strategy.",
          "Consider solutions that span multiple database technologies (for example, federation, exports, and hybrid deployments).",
          "Leverage database technologies to support generative AI and LLM use cases."
        ] }
      ]
    },
    {
      name: "Manage a solution that can span multiple database technologies",
      weight: "~25%",
      groups: [
        { id: "2-1", name: "Determine database connectivity and access management considerations", tasks: [
          "Determine Identity and Access Management (IAM) and policies for database connectivity and access control.",
          "Manage database users including authentication and access."
        ] },
        { id: "2-2", name: "Configure database monitoring and troubleshooting options", tasks: [
          "Assess slow running queries, database locking, and identify missing indexes.",
          "Monitor and investigate database vitals including RAM, CPU, storage, I/O, and audit logging.",
          "Monitor and update quotas.",
          "Investigate database resource contention.",
          "Set up alerts for errors and performance metrics."
        ] },
        { id: "2-3", name: "Design database backup and recovery solutions", tasks: [
          "Given requirements, recommend backup and recovery options including automatic scheduled backups.",
          "Configure export and import data for databases.",
          "Design for RTO, RPO, and PITR.",
          "Manage data retention."
        ] },
        { id: "2-4", name: "Optimize database cost and performance in Google Cloud", tasks: [
          "Assess scaling up and scaling out options.",
          "Scale database instances based on current and upcoming workload.",
          "Define replication strategies.",
          "Continuously assess and optimize the cost of running a database solution.",
          "Optimize queries for cost and performance."
        ] },
        { id: "2-5", name: "Automate common database tasks", tasks: [
          "Perform database maintenance (for example, rebuilding indexes and data exports).",
          "Schedule database exports.",
          "Manage upgrades for Google Cloud-managed databases.",
          "Monitor database SLA/SLOs."
        ] }
      ]
    },
    {
      name: "Migrate data solutions",
      weight: "~23%",
      groups: [
        { id: "3-1", name: "Design and implement data migration and replication", tasks: [
          "Develop and execute migration strategies and plans, including zero/near-zero downtime, extended outage, and fallback.",
          "Reverse replication from Google Cloud to source.",
          "Plan and perform database migration, including fallback plans and DDL/DML conversion.",
          "Determine the correct database migration tools for a given scenario, including databases hosted outside Google Cloud."
        ] }
      ]
    },
    {
      name: "Deploy scalable and highly available databases in Google Cloud",
      weight: "~20%",
      groups: [
        { id: "4-1", name: "Apply concepts to implement scalable and highly available databases in Google Cloud", tasks: [
          "Provision highly available database solutions in Google Cloud.",
          "Test high availability and disaster recovery strategies.",
          "Set up multi-regional replication for databases.",
          "Deploy and scale read replicas.",
          "Automate database instance provisioning.",
          "Configure monitoring for highly available databases."
        ] }
      ]
    }
  ],

  PMLE: [
    {
      name: "Architecting low-code AI solutions",
      weight: "~13%",
      groups: [
        { id: "1-1", name: "Developing ML models using BigQuery ML or AutoML on Gemini Enterprise Agent Platform", tasks: [
          "Build models in BigQuery ML or Agent Platform AutoML (for example, classification, regression, forecasting, and clustering) based on the business problem.",
          "Perform feature engineering or selection using BigQuery ML.",
          "Generate predictions using BigQuery ML.",
          "Train models using Agent Platform AutoML.",
          "Fine-tune Gemini models using BigQuery."
        ] },
        { id: "1-2", name: "Building AI solutions using Google Cloud AI APIs or foundational models", tasks: [
          "Evaluate and select the appropriate model for a given task from Gemini Enterprise Agent Platform Model Garden.",
          "Build applications using industry-specific APIs such as Document AI API, Vision API, and Translate API.",
          "Build solutions and tune models for specific use cases such as Gemini, Imagen, Veo, and models as a service in Model Garden.",
          "Optimize Gemini-based applications for cost, latency, and availability."
        ] }
      ]
    },
    {
      name: "Collaborating within and across teams to manage data and models",
      weight: "~16%",
      groups: [
        { id: "2-1", name: "Exploring and preprocessing data for ML", tasks: [
          "Organize and explore different data types such as tabular, text, and images for efficient experimenting, training, and serving.",
          "Choose the right tool for data preprocessing based on scale and complexity, such as BigQuery (SQL), Dataflow, Apache Spark, and in-memory Python frameworks.",
          "Create and consolidate features in Gemini Enterprise Agent Platform Feature Store.",
          "Ensure data privacy and handle sensitive information such as personally identifiable information (PII)."
        ] },
        { id: "2-2", name: "Model prototyping using notebooks", tasks: [
          "Apply collaboration and security best practices when setting up and running notebook environments.",
          "Develop models in Agent Platform Workbench or Colab Enterprise notebooks using common frameworks such as PyTorch, sklearn, and JAX.",
          "Use a variety of foundational and open-source models in Model Garden to create model prototypes in notebook environments."
        ] },
        { id: "2-3", name: "Tracking and running ML experiments", tasks: [
          "Choose the appropriate Google Cloud environment for development and experimentation, such as Experiments on Gemini Enterprise Agent Platform, Agent Platform Pipelines, and Kubeflow Pipelines, given the framework.",
          "Evaluate predictive and generative AI solutions, including model evaluation metrics and LLM-as-a-judge.",
          "Track and compare model artifacts, versions, and lineage using Experiments on Agent Platform and Gemini Enterprise Agent Platform ML Metadata."
        ] }
      ]
    },
    {
      name: "Scaling prototypes into ML models",
      weight: "~21%",
      groups: [
        { id: "3-1", name: "Building models given the task considering cost, complexity, latency, and scalability", tasks: [
          "Choose the model type such as ARIMA, DNN, and LLM.",
          "Choose the product such as Agent Platform AutoML, BigQuery ML, and Agent Platform Pipelines.",
          "Choose the deployment strategy.",
          "Choose modeling techniques given interpretability requirements."
        ] },
        { id: "3-2", name: "Training models", tasks: [
          "Organize training data such as tabular, text, speech, images, and videos on Google Cloud, including Cloud Storage and BigQuery.",
          "Ingest structured and unstructured data from various sources into training pipelines.",
          "Train models using different SDKs and platforms such as Agent Platform custom training, Kubeflow on GKE, Agent Platform AutoML, and Tabular Workflows.",
          "Troubleshoot ML model training failures.",
          "Perform hyperparameter tuning.",
          "Fine-tune foundational models from Agent Platform and Model Garden and determine when tuning should be considered."
        ] },
        { id: "3-3", name: "Choosing appropriate hardware for training", tasks: [
          "Evaluate compute and accelerator options such as CPU, GPU, and TPU.",
          "Understand distributed training on GPUs and TPUs using data and model parallelism strategies."
        ] }
      ]
    },
    {
      name: "Serving and scaling models",
      weight: "~20%",
      groups: [
        { id: "4-1", name: "Serving models", tasks: [
          "Deploy models for batch and online inference using appropriate services such as Agent Platform, Model Garden, Cloud Run, and GKE.",
          "Package and serve models from different frameworks such as PyTorch and XGBoost using prebuilt and custom containers.",
          "Organize and version models in Gemini Enterprise Agent Platform Model Registry.",
          "Implement model rollout strategies such as A/B testing and canary deployments to compare model versions.",
          "Develop solutions for inference preprocessing and postprocessing."
        ] },
        { id: "4-2", name: "Scaling online model serving", tasks: [
          "Manage and serve features using Agent Platform Feature Store.",
          "Deploy models to public and private endpoints.",
          "Choose appropriate hardware such as CPU, GPU, TPU, and edge.",
          "Scale the serving backend based on throughput, including Gemini Enterprise Agent Platform Inference and containerized serving.",
          "Tune ML models for training and serving in production."
        ] }
      ]
    },
    {
      name: "Automating and orchestrating ML pipelines",
      weight: "~18%",
      groups: [
        { id: "5-1", name: "Developing end-to-end ML pipelines", tasks: [
          "Validate data and models.",
          "Build and orchestrate pipelines using managed or unmanaged services and templates or custom solutions, such as Agent Platform Pipelines, Managed Service for Apache Airflow, and Ray on Gemini Enterprise Agent Platform.",
          "Ensure consistent data preprocessing between training and serving."
        ] },
        { id: "5-2", name: "Automating model retraining", tasks: [
          "Determine an appropriate retraining policy.",
          "Deploy models in continuous integration, continuous delivery, and continuous training (CI/CD/CT) pipelines, for example using Cloud Build."
        ] }
      ]
    },
    {
      name: "Monitoring AI solutions",
      weight: "~13%",
      groups: [
        { id: "6-1", name: "Identifying risks to AI solutions", tasks: [
          "Build secure AI systems by protecting against unintentional exploitation and leaks of data or models, including data exfiltration, malicious prompting, and sharing sensitive data with LLMs, using tools such as regex, safety filters, and Model Armor.",
          "Align with responsible AI practices, including monitoring for bias.",
          "Use model explainability on Agent Platform, including Agent Platform Inference."
        ] },
        { id: "6-2", name: "Monitoring, testing, and troubleshooting AI solutions", tasks: [
          "Configure and use Model Monitoring on Gemini Enterprise Agent Platform to establish continuous evaluation metrics for production models.",
          "Monitor for common issues such as training-serving skew, data drift, concept drift, and feature attribution drift.",
          "Monitor, test, and evaluate generative AI solutions."
        ] }
      ]
    }
  ],

  PCSE: [
    {
      name: "Configuring access",
      weight: "~25%",
      groups: [
        { id: "1-1", name: "Managing Cloud Identity", tasks: [
          "Configure Google Cloud Directory Sync and implement single sign-on (SSO) with a third-party identity provider.",
          "Manage a super administrator account.",
          "Automate the user lifecycle management process.",
          "Administer user accounts and groups programmatically.",
          "Configure Workforce Identity Federation."
        ] },
        { id: "1-2", name: "Managing service accounts", tasks: [
          "Secure and protect service accounts, including default service accounts.",
          "Identify scenarios requiring service accounts.",
          "Create, disable, and authorize service accounts.",
          "Secure, audit, and mitigate the usage of service account keys.",
          "Manage and create short-lived credentials.",
          "Configure Workload Identity Federation.",
          "Manage service account impersonation."
        ] },
        { id: "1-3", name: "Managing authentication", tasks: [
          "Create a password and session management policy for user accounts.",
          "Set up Security Assertion Markup Language (SAML) and OAuth.",
          "Configure and enforce 2-step verification."
        ] },
        { id: "1-4", name: "Managing and implementing authorization controls", tasks: [
          "Manage privileged roles and separation of duties with IAM roles and permissions.",
          "Manage IAM and access control list (ACL) permissions.",
          "Grant permissions to different types of identities using IAM conditions and IAM deny policies.",
          "Define access control at the organization, folder, project, and resource level using least privilege.",
          "Configure Access Context Manager.",
          "Apply Policy Intelligence.",
          "Manage permissions through groups.",
          "Identify use cases and configure Privileged Access Manager."
        ] },
        { id: "1-5", name: "Defining the resource hierarchy", tasks: [
          "Manage folders and projects at scale.",
          "Manage pre-built or custom organization policies for the organization, folders, and projects.",
          "Use the resource hierarchy for access control and permissions inheritance."
        ] }
      ]
    },
    {
      name: "Securing communications and establishing boundary protection",
      weight: "~22%",
      groups: [
        { id: "2-1", name: "Designing and configuring perimeter security", tasks: [
          "Configure network perimeter controls such as Cloud NGFW rules and policies, Identity-Aware Proxy, load balancers, and Certificate Authority Service.",
          "Set up application layer inspection on Cloud NGFW (for example, layer 7).",
          "Differentiate between private and public IP addressing.",
          "Configure web application firewalls such as Google Cloud Armor.",
          "Deploy Secure Web Proxy.",
          "Configure Cloud DNS security settings.",
          "Continually monitor and restrict configured APIs."
        ] },
        { id: "2-2", name: "Configuring boundary segmentation", tasks: [
          "Configure security properties of a VPC network, VPC peering, Shared VPC, and firewall rules.",
          "Configure network isolation and data encapsulation for N-tier applications.",
          "Identify use cases and configure VPC Service Controls."
        ] },
        { id: "2-3", name: "Establishing private connectivity", tasks: [
          "Design and configure private connectivity between VPC networks and Google Cloud projects using Shared VPC, VPC peering, and Private Google Access for on-premises hosts.",
          "Design and configure private connectivity and encryption between data centers and VPC networks using HA VPN and Cloud Interconnect.",
          "Establish private connectivity between VPC and Google APIs using Private Google Access, restricted Google access, and Private Service Connect.",
          "Use Cloud NAT to enable outbound traffic."
        ] }
      ]
    },
    {
      name: "Ensuring data protection",
      weight: "~23%",
      groups: [
        { id: "3-1", name: "Protecting sensitive data and preventing data loss", tasks: [
          "Configure Sensitive Data Protection, including discovering and redacting PII, pseudonymization, and format-preserving encryption.",
          "Restrict access to Google Cloud data services such as BigQuery, Cloud Storage, and Cloud SQL.",
          "Secure secrets with Secret Manager.",
          "Protect and manage compute instance metadata."
        ] },
        { id: "3-2", name: "Managing encryption at rest, in transit, and in use", tasks: [
          "Identify use cases for Google default encryption, customer-managed encryption keys (CMEK), and Cloud External Key Manager (EKM).",
          "Determine when to use software and hardware keys.",
          "Create and manage encryption keys for CMEK and EKM, including key rotation, revocation, and key import.",
          "Apply encryption methods to various use cases.",
          "Configure object lifecycle policies for Cloud Storage.",
          "Enable Confidential Computing."
        ] },
        { id: "3-3", name: "Securing AI workloads", tasks: [
          "Implement security and privacy controls for AI/ML systems to protect against unintentional exploitation of data or models.",
          "Determine security requirements for IaaS-hosted and PaaS-hosted training models.",
          "Implement security controls for Gemini Enterprise Agent Platform."
        ] }
      ]
    },
    {
      name: "Managing operations",
      weight: "~19%",
      groups: [
        { id: "4-1", name: "Automating infrastructure and application security", tasks: [
          "Automate security scanning for CVEs through a CI/CD pipeline.",
          "Configure Binary Authorization to secure GKE clusters or Cloud Run.",
          "Automate virtual machine and container image creation, including hardening, maintenance, and VM patch management.",
          "Manage policy and drift detection at scale, including cloud security posture management, custom organization policies, and custom Security Health Analytics modules."
        ] },
        { id: "4-2", name: "Configuring logging, monitoring, and detection", tasks: [
          "Configure and analyze network logs including Cloud NGFW, VPC Flow Logs, Packet Mirroring, Cloud IDS, and Log Analytics.",
          "Design an effective logging strategy.",
          "Log, monitor, respond to, and remediate security incidents.",
          "Design secure access to logs.",
          "Export logs to external security systems.",
          "Configure and analyze Google Cloud Audit Logs and data access logs.",
          "Configure log exports including log sinks and aggregated sinks.",
          "Configure and monitor Security Command Center."
        ] }
      ]
    },
    {
      name: "Supporting compliance requirements",
      weight: "~11%",
      groups: [
        { id: "5-1", name: "Adhering to regulatory and industry standards requirements for the cloud", tasks: [
          "Determine technical needs relative to compute, data, network, and storage.",
          "Evaluate the shared responsibility model.",
          "Configure security controls within cloud environments to support compliance requirements, including Assured Workloads, organization policies, Access Transparency, Access Approval, and regionalization of data and services.",
          "Determine the Google Cloud environment in scope for regulatory compliance.",
          "Map compliance requirements to Google Cloud services and security controls, including network and access segmentation and audit log coverage."
        ] }
      ]
    }
  ],

  PCDOE: [
    {
      name: "Bootstrapping and maintaining a Google Cloud organization",
      weight: "~20%",
      groups: [
        { id: "1-1", name: "Designing the overall resource hierarchy for an organization", tasks: [
          "Organize resources using application-centric structures, projects, and folders.",
          "Plan shared networking using Shared VPC, VPC Network Peering, and Private Service Connect.",
          "Design multi-project monitoring and logging.",
          "Manage IAM roles and organization-level policies.",
          "Create and manage service accounts.",
          "Address data residency."
        ] },
        { id: "1-2", name: "Managing infrastructure", tasks: [
          "Use infrastructure-as-code tooling and managed services such as Infrastructure Manager, Cloud Foundation Toolkit, Config Connector, GitOps, Terraform, and Helm.",
          "Make infrastructure changes using Google-recommended practices and blueprints.",
          "Automate with scripting such as Python and Go."
        ] },
        { id: "1-3", name: "Designing a CI/CD architecture stack in Google Cloud, hybrid, and multi-cloud environments", tasks: [
          "Implement continuous integration with Cloud Build.",
          "Implement continuous delivery with Cloud Deploy, including Kustomize and Skaffold.",
          "Configure Artifact Registry.",
          "Use widely adopted third-party tooling such as Git, Jenkins, Argo CD, Packer, and kpt.",
          "Secure CI/CD tooling."
        ] },
        { id: "1-4", name: "Managing multiple environments", tasks: [
          "Manage ephemeral environments.",
          "Manage configuration and policy.",
          "Manage GKE clusters across an enterprise using fleets.",
          "Use safe and secure patching and upgrading practices."
        ] },
        { id: "1-5", name: "Enabling secure cloud development environments", tasks: [
          "Configure and manage cloud development environments such as Cloud Workstations and Cloud Shell.",
          "Bootstrap environments with required tooling such as custom images, IDEs, and Cloud SDK.",
          "Leverage AI to assist development and operations using Gemini Code Assist, Gemini Cloud Assist, and Gemini CLI."
        ] }
      ]
    },
    {
      name: "Building and implementing CI/CD pipelines, including continuous testing, for application, infrastructure, and machine learning workloads",
      weight: "~25%",
      groups: [
        { id: "2-1", name: "Designing pipelines", tasks: [
          "Design CI/CD for applications and infrastructure.",
          "Manage artifacts with Artifact Registry.",
          "Deploy to hybrid and multi-cloud environments such as GKE.",
          "Configure CI/CD pipeline triggers.",
          "Configure deployment processes including approval flows."
        ] },
        { id: "2-2", name: "Implementing and managing pipelines", tasks: [
          "Audit and track deployments using Artifact Registry, Cloud Build, Cloud Deploy, and Cloud Audit Logs.",
          "Use deployment strategies such as canary, blue/green, rolling, traffic splitting, and feature flags, with success metrics based on application or ML pipeline telemetry.",
          "Troubleshoot and mitigate deployment issues."
        ] },
        { id: "2-3", name: "Managing pipeline configuration and secrets", tasks: [
          "Manage keys with Cloud Key Management Service.",
          "Manage configuration and secrets using Secret Manager, Certificate Manager, Parameter Manager, and Workload Identity Federation.",
          "Choose between build-time and runtime secret injection."
        ] },
        { id: "2-4", name: "Securing the deployment pipeline", tasks: [
          "Use Artifact Analysis and vulnerability scanning.",
          "Implement software supply chain security using Binary Authorization and the SLSA framework.",
          "Apply IAM policies based on environment."
        ] }
      ]
    },
    {
      name: "Applying site reliability engineering practices",
      weight: "~18%",
      groups: [
        { id: "3-1", name: "Balancing change, velocity, and reliability of the service", tasks: [
          "Define SLIs such as availability and latency, SLOs, and SLAs.",
          "Use error budgets, including Cloud Service Mesh definitions.",
          "Evaluate the opportunity cost of risk and reliability, including the number of nines."
        ] },
        { id: "3-2", name: "Managing service lifecycle", tasks: [
          "Manage service lifecycle including planning, deployment, maintenance, and retirement.",
          "Perform capacity planning using quotas, limits, reservations, and Dynamic Workload Scheduler.",
          "Use autoscaling such as managed instance groups, Cloud Run, and GKE."
        ] },
        { id: "3-3", name: "Mitigating incident impact on users", tasks: [
          "Drain or redirect traffic.",
          "Add capacity.",
          "Use rollback strategies."
        ] }
      ]
    },
    {
      name: "Implementing observability practices and troubleshooting issues",
      weight: "~25%",
      groups: [
        { id: "4-1", name: "Instrumenting and collecting telemetry", tasks: [
          "Collect and import logs using Ops Agent, OpenTelemetry, Cloud Audit Logs, VPC Flow Logs, and Cloud Service Mesh.",
          "Optimize logs using filtering, sampling, exclusions, cost management, and source considerations.",
          "Collect metrics from applications, platforms, networking, Cloud Service Mesh, Managed Service for Prometheus, and hybrid/multi-cloud environments.",
          "Create synthetic monitors to proactively probe application endpoints and workflows.",
          "Create custom metrics, including log-based metrics."
        ] },
        { id: "4-2", name: "Managing and analyzing logs", tasks: [
          "Analyze logs using Logs Explorer and the Logging query language.",
          "Export and retain logs by routing to BigQuery, Pub/Sub, and Cloud Storage.",
          "Handle sensitive data using log processors to redact PII and PHI.",
          "Use Gemini Cloud Assist for AI-powered log analysis."
        ] },
        { id: "4-3", name: "Managing metrics, dashboards, and alerts", tasks: [
          "Analyze metrics using Metrics Explorer.",
          "Manage dashboards including creating, filtering, sharing, playbooks, and PromQL.",
          "Configure alerting and alerting policies for SLIs, SLOs, and cost control.",
          "Integrate with third-party alerting tools using webhooks, PagerDuty, and Rootly.",
          "Use Gemini Cloud Assist for metrics interpretation."
        ] },
        { id: "4-4", name: "Capturing and analyzing distributed traces", tasks: [
          "Use tracing frameworks such as OpenTelemetry.",
          "Analyze trace waterfalls and spans.",
          "Correlate trace IDs with structured logs.",
          "Use Gemini Cloud Assist for trace analysis."
        ] },
        { id: "4-5", name: "Troubleshooting issues", tasks: [
          "Troubleshoot infrastructure issues.",
          "Troubleshoot CI/CD pipeline issues.",
          "Troubleshoot application issues.",
          "Troubleshoot observability issues.",
          "Troubleshoot performance and latency issues."
        ] }
      ]
    },
    {
      name: "Optimizing performance and cost",
      weight: "~12%",
      groups: [
        { id: "5-1", name: "Collecting performance information in Google Cloud", tasks: [
          "Use application performance monitoring.",
          "Use Active Assist insights and recommendations."
        ] },
        { id: "5-2", name: "Implementing FinOps practices for optimizing resource utilization and costs", tasks: [
          "Optimize observability costs.",
          "Use Spot virtual machines.",
          "Optimize resource usage for cost and efficiency.",
          "Plan infrastructure cost using committed-use discounts, sustained-use discounts, and network tiers.",
          "Use Google Cloud recommenders for cost, security, performance, manageability, and reliability.",
          "Optimize individual workload costs for GKE, Cloud Run, and Compute Engine."
        ] }
      ]
    }
  ],

  PDE: [
    {
      name: "Designing data processing systems",
      weight: "~22%",
      groups: [
        { id: "1-1", name: "Designing for security and compliance", tasks: [
          "Use Identity and Access Management and organization policies.",
          "Design data security including encryption and key management.",
          "Handle privacy, including personally identifiable information.",
          "Address regional considerations and data sovereignty for data access and storage.",
          "Meet legal and regulatory compliance requirements.",
          "Design project, dataset, and table architecture for proper data governance.",
          "Design for multiple environments such as development and production."
        ] },
        { id: "1-2", name: "Designing for reliability and fidelity", tasks: [
          "Prepare and clean data using Dataform, Dataflow, Cloud Data Fusion, and LLM prompting for query generation.",
          "Monitor and orchestrate data pipelines.",
          "Design disaster recovery and fault tolerance.",
          "Make decisions related to ACID compliance and availability.",
          "Validate data."
        ] },
        { id: "1-3", name: "Designing for flexibility and portability", tasks: [
          "Map current and future business requirements to the architecture.",
          "Design for data and application portability, including multi-cloud and data residency requirements.",
          "Plan data staging, cataloging, profiling, and discovery for data governance."
        ] },
        { id: "1-4", name: "Designing data migrations", tasks: [
          "Analyze current stakeholder needs, users, processes, and technologies, and create a plan for the desired state.",
          "Plan migration and validation to Google Cloud using services such as BigQuery Data Transfer Service, Database Migration Service, Transfer Appliance, Google Cloud networking, and Datastream."
        ] }
      ]
    },
    {
      name: "Ingesting and processing the data",
      weight: "~25%",
      groups: [
        { id: "2-1", name: "Planning the data pipelines", tasks: [
          "Define data sources and sinks.",
          "Define data transformation and orchestration logic.",
          "Apply networking fundamentals.",
          "Apply data encryption."
        ] },
        { id: "2-2", name: "Building the pipelines", tasks: [
          "Cleanse data.",
          "Identify appropriate services such as Dataflow, Apache Beam, Dataproc, Cloud Data Fusion, BigQuery, Pub/Sub, Apache Spark, Hadoop, and Apache Kafka.",
          "Implement batch transformations.",
          "Implement streaming transformations including windowing and late-arriving data.",
          "Implement processing logic.",
          "Apply AI data enrichment.",
          "Acquire and import data.",
          "Integrate with new data sources."
        ] },
        { id: "2-3", name: "Deploying and operationalizing the pipelines", tasks: [
          "Automate and orchestrate jobs using Cloud Composer and Workflows.",
          "Apply continuous integration and continuous deployment."
        ] }
      ]
    },
    {
      name: "Storing the data",
      weight: "~20%",
      groups: [
        { id: "3-1", name: "Selecting storage systems", tasks: [
          "Analyze data access patterns.",
          "Choose managed services such as BigQuery, BigLake, AlloyDB, Bigtable, Spanner, Cloud SQL, Cloud Storage, Firestore, and Memorystore.",
          "Plan for storage costs and performance.",
          "Manage the data lifecycle."
        ] },
        { id: "3-2", name: "Planning for using a data warehouse", tasks: [
          "Design the data model.",
          "Decide the degree of data normalization.",
          "Map business requirements.",
          "Define architecture to support data access patterns."
        ] },
        { id: "3-3", name: "Using a data lake", tasks: [
          "Manage the lake including data discovery, access, and cost controls.",
          "Process data.",
          "Monitor the data lake."
        ] },
        { id: "3-4", name: "Designing for a data platform", tasks: [
          "Build a data platform based on requirements using Google Cloud tools such as Dataplex, Dataplex Catalog, BigQuery, and Cloud Storage.",
          "Build a federated governance model for distributed data systems."
        ] }
      ]
    },
    {
      name: "Preparing and using data for analysis",
      weight: "~15%",
      groups: [
        { id: "4-1", name: "Preparing data for visualization", tasks: [
          "Connect to tools.",
          "Precalculate fields.",
          "Use BigQuery features for business intelligence such as BI Engine and materialized views.",
          "Troubleshoot poorly performing queries.",
          "Apply security, data masking, IAM, and Cloud Data Loss Prevention controls."
        ] },
        { id: "4-2", name: "Preparing data for AI and ML", tasks: [
          "Prepare data for feature engineering, training, and serving machine learning models, including BigQuery ML.",
          "Prepare unstructured data for embeddings and retrieval-augmented generation (RAG)."
        ] },
        { id: "4-3", name: "Sharing data", tasks: [
          "Define rules to share data.",
          "Publish datasets.",
          "Publish reports and visualizations.",
          "Use BigQuery sharing through Analytics Hub."
        ] }
      ]
    },
    {
      name: "Maintaining and automating data workloads",
      weight: "~18%",
      groups: [
        { id: "5-1", name: "Optimizing resources", tasks: [
          "Minimize costs per required business need for data.",
          "Ensure enough resources are available for business-critical data processes.",
          "Decide between persistent or job-based data clusters such as Dataproc."
        ] },
        { id: "5-2", name: "Designing automation and repeatability", tasks: [
          "Create directed acyclic graphs (DAGs) for Cloud Composer.",
          "Schedule and orchestrate jobs in a repeatable way."
        ] },
        { id: "5-3", name: "Organizing workloads based on business requirements", tasks: [
          "Manage capacity using BigQuery Editions and reservations.",
          "Choose interactive or batch query jobs."
        ] },
        { id: "5-4", name: "Monitoring and troubleshooting processes", tasks: [
          "Observe data processes using Cloud Monitoring, Cloud Logging, and the BigQuery admin panel.",
          "Monitor planned usage.",
          "Troubleshoot error messages, billing issues, and quotas.",
          "Manage workloads such as jobs, queries, and compute capacity reservations."
        ] },
        { id: "5-5", name: "Maintaining awareness of failures and mitigating impact", tasks: [
          "Design systems for fault tolerance and manage restarts.",
          "Run jobs in multiple regions or zones.",
          "Prepare for data corruption and missing data.",
          "Design data replication and failover, including Cloud SQL and Redis clusters."
        ] }
      ]
    }
  ],

  PCD: [
    {
      name: "Designing highly scalable, secure, and reliable cloud-native applications",
      weight: "~32%",
      groups: [
        { id: "1-1", name: "Designing high-performing applications and APIs", tasks: [
          "Choose the appropriate platform based on the use case and requirements, such as Compute Engine, GKE, or Cloud Run.",
          "Build, refactor, and deploy application containers to Cloud Run and GKE.",
          "Understand how Google Cloud services are geographically distributed, including latency and regional or zonal services.",
          "Understand load balancer use cases.",
          "Enable session affinity for performant content delivery.",
          "Implement caching using services such as Memorystore.",
          "Create and deploy APIs using HTTP REST and gRPC.",
          "Use application rate limiting, authentication, and observability with Apigee and Cloud API Gateway.",
          "Integrate applications using asynchronous or event-driven approaches such as Eventarc and Pub/Sub.",
          "Define resource requirements for workloads.",
          "Optimize for cost and resource usage.",
          "Understand data replication to support zonal and regional failover models.",
          "Use traffic splitting strategies such as gradual rollouts, rollbacks, and A/B testing on Cloud Run or GKE.",
          "Orchestrate application services with Workflows, Eventarc, Cloud Tasks, and Cloud Scheduler."
        ] },
        { id: "1-2", name: "Designing secure applications", tasks: [
          "Implement data retention and organization policies, including Cloud Storage Object Lifecycle Management and retention lock policies.",
          "Use security mechanisms such as Identity-Aware Proxy and Web Security Scanner to identify vulnerabilities and protect services and resources.",
          "Respond to and resolve vulnerabilities identified by Artifact Analysis and Security Command Center.",
          "Store, access, and rotate application secrets, credentials, and encryption keys using Secret Manager, Cloud KMS, and Workload Identity Federation.",
          "Authenticate to Google Cloud services using Application Default Credentials, JWT, OAuth 2.0, Cloud SQL Auth Proxy, AlloyDB Auth Proxy, Identity Platform, and WIF.",
          "Secure cloud resources using IAM roles for service accounts.",
          "Implement secure service-to-service communication using Cloud Service Mesh, Kubernetes Network Policies, Direct VPC egress, and private service connectivity.",
          "Run services with least-privileged access.",
          "Secure application artifacts using Binary Authorization."
        ] },
        { id: "1-3", name: "Storing and accessing data", tasks: [
          "Select the appropriate storage system based on data volume and performance requirements.",
          "Design schemas for structured databases such as AlloyDB and Spanner and unstructured databases such as Bigtable and Firestore.",
          "Understand eventual and strongly consistent replication for AlloyDB, Bigtable, Cloud SQL, Spanner, and Cloud Storage.",
          "Create signed URLs to grant access to Cloud Storage objects.",
          "Write data to BigQuery for analytics and AI/ML workloads."
        ] }
      ]
    },
    {
      name: "Building and testing applications",
      weight: "~23%",
      groups: [
        { id: "2-1", name: "Setting up your development environment", tasks: [
          "Emulate Google Cloud services using the Google Cloud CLI for local application development and unit testing.",
          "Use the Google Cloud console, Cloud SDK, Cloud Code, Gemini Cloud Assist, Cloud Shell, and Cloud Workstations.",
          "Configure IDEs with appropriate integrations such as Cloud SDK and AI tooling including coding assistants and MCP servers."
        ] },
        { id: "2-2", name: "Building", tasks: [
          "Use Cloud Build and Artifact Registry to build and store containers from source code.",
          "Configure provenance in Cloud Build, including Binary Authorization."
        ] },
        { id: "2-3", name: "Testing", tasks: [
          "Write unit tests with the help of AI coding assistants.",
          "Execute automated integration tests in Cloud Build."
        ] }
      ]
    },
    {
      name: "Configuring cloud-native applications for deployment",
      weight: "~24%",
      groups: [
        { id: "3-1", name: "Deploying applications to Cloud Run", tasks: [
          "Deploy applications from source code.",
          "Invoke Cloud Run services using triggers such as Eventarc and Pub/Sub.",
          "Configure event receivers using Eventarc and Pub/Sub.",
          "Version, expose, and secure APIs in applications using Apigee."
        ] },
        { id: "3-2", name: "Deploying containers to GKE", tasks: [
          "Deploy containerized applications.",
          "Implement Kubernetes health checks to increase application availability.",
          "Incorporate Horizontal Pod Autoscaler attributes including scaling and metrics."
        ] }
      ]
    },
    {
      name: "Integrating applications with Google Cloud services",
      weight: "~21%",
      groups: [
        { id: "4-1", name: "Integrating applications with data and storage services", tasks: [
          "Manage connections to Google Cloud datastores such as Cloud SQL, Firestore, and Cloud Storage.",
          "Read and write data to and from Google Cloud data sources.",
          "Write applications that publish and consume data using messaging services."
        ] },
        { id: "4-2", name: "Consuming Google Cloud APIs", tasks: [
          "Enable Google Cloud services.",
          "Make API calls using Cloud Client Libraries, REST API, gRPC, and API Explorer while considering batching requests, restricting return data, pagination, caching, and exponential backoff.",
          "Use service accounts to make Cloud API calls."
        ] },
        { id: "4-3", name: "Troubleshooting and observability", tasks: [
          "Instrument code to facilitate troubleshooting using metrics, logs, and traces in Google Cloud Observability.",
          "Identify and resolve issues using Google Cloud Observability.",
          "Manage application issues using Error Reporting.",
          "Use trace IDs to correlate trace spans across services.",
          "Use AI-assisted observability."
        ] }
      ]
    }
  ],

  PCA: [
    {
      name: "Designing and planning a cloud solution architecture",
      weight: "~25%",
      groups: [
        { id: "1-1", name: "Designing a cloud solution infrastructure that meets business requirements", tasks: [
          "Address business use cases and product strategy.",
          "Identify functional and non-functional requirements.",
          "Create a business continuity plan.",
          "Optimize cost.",
          "Support application design.",
          "Design integration patterns with external systems.",
          "Plan movement of data.",
          "Evaluate design decision tradeoffs.",
          "Choose workload disposition strategies such as build, buy, modify, or deprecate.",
          "Define success measurements such as KPIs, ROI, and metrics.",
          "Address security and compliance.",
          "Address observability."
        ] },
        { id: "1-2", name: "Designing a cloud solution infrastructure that meets technical requirements", tasks: [
          "Apply the Google Cloud Well-Architected Framework.",
          "Design for high availability and failover.",
          "Design for resource flexibility.",
          "Scale to meet growth requirements.",
          "Optimize performance and latency.",
          "Use Gemini Cloud Assist.",
          "Design backup and recovery."
        ] },
        { id: "1-3", name: "Designing network, storage, and compute resources", tasks: [
          "Integrate with on-premises and multicloud environments.",
          "Use Google Cloud AI and machine learning solutions such as Gemini LLMs, Agent Builder, Model Garden, Gemini models, and AI Hypercomputer.",
          "Design cloud-native networking including VPC, peering, firewalls, load balancers, routing, container networking, Shared VPC, and Private Service Connect.",
          "Choose data processing solutions.",
          "Choose appropriate storage types such as object, file, and databases.",
          "Map compute needs to products such as GKE, Cloud Run, and Cloud Run functions.",
          "Choose compute resources such as Spot VMs, custom machine types, and specialized workloads."
        ] },
        { id: "1-4", name: "Creating a migration plan", tasks: [
          "Integrate solutions with existing systems.",
          "Assess and migrate systems and data to support the solution using services such as Migration Center.",
          "Use migration methodologies, workload testing, network planning, and dependency planning.",
          "Determine software license implications and financial impact."
        ] },
        { id: "1-5", name: "Envisioning future solution improvements", tasks: [
          "Consider cloud and technology improvements.",
          "Consider evolution of business needs.",
          "Use a cloud-first design approach."
        ] }
      ]
    },
    {
      name: "Managing and provisioning a cloud solution infrastructure",
      weight: "~17.5%",
      groups: [
        { id: "2-1", name: "Configuring network topologies", tasks: [
          "Extend to on-premises environments using hybrid networking.",
          "Extend to a multicloud environment, including Google Cloud-to-Google Cloud communication.",
          "Apply security protection such as intrusion protection, access control, and firewalls.",
          "Design VPC and load balancing for access to cloud, internet, and cloud-adjacent services."
        ] },
        { id: "2-2", name: "Configuring individual storage systems", tasks: [
          "Allocate data storage.",
          "Provision data processing and compute.",
          "Manage security and access.",
          "Configure data transfer and latency.",
          "Manage data retention and lifecycle.",
          "Plan for data growth.",
          "Protect data using backup and recovery."
        ] },
        { id: "2-3", name: "Configuring compute systems", tasks: [
          "Provision compute resources.",
          "Configure compute volatility using Spot versus standard resources.",
          "Configure cloud-native networking for Compute Engine, GKE, serverless networking, and Google Cloud VMware Engine.",
          "Orchestrate infrastructure, configure resources, and manage patches.",
          "Use container orchestration.",
          "Use serverless computing."
        ] },
        { id: "2-4", name: "Leveraging Gemini Enterprise Agent Platform for end-to-end ML workflows", tasks: [
          "Use Agent Platform Pipelines to automate and orchestrate the ML lifecycle.",
          "Prepare for Agent Platform data integration.",
          "Use AI Hypercomputer, Cloud Run functions, and Agent Platform for ML/AI workloads; integrate GPUs and TPUs for training and serving; optimize consumption models; and run large-scale AI model training."
        ] },
        { id: "2-5", name: "Configuring prebuilt solutions or APIs with Agent Platform", tasks: [
          "Differentiate between Google AI APIs for Search, Conversation, Vision, Image, Video, and Audio.",
          "Integrate Gemini Enterprise features including AI Agents and NotebookLM to enhance workflows.",
          "Integrate AI models from Model Garden into the solution."
        ] }
      ]
    },
    {
      name: "Designing for security and compliance",
      weight: "~17.5%",
      groups: [
        { id: "3-1", name: "Designing for security", tasks: [
          "Use Identity and Access Management.",
          "Design the resource hierarchy using organizations, folders, and projects.",
          "Protect data using key management, encryption, and secret management.",
          "Apply separation of duties.",
          "Use security controls such as auditing, VPC Service Controls, context-aware access, organization policy, and hierarchical firewall policy.",
          "Manage customer-managed encryption keys with Cloud KMS.",
          "Design secure remote access using Identity-Aware Proxy, service account impersonation, Chrome Enterprise Premium, and Workload Identity Federation.",
          "Secure the software supply chain.",
          "Secure AI using Model Armor, Sensitive Data Protection, and secure model deployment."
        ] },
        { id: "3-2", name: "Designing for compliance", tasks: [
          "Address legislation and regulation such as health record privacy, children's privacy, data privacy, ownership, and data sovereignty.",
          "Address commercial requirements including credit card information and PII handling.",
          "Address industry certifications such as SOC 2.",
          "Design for audits, including logs."
        ] }
      ]
    },
    {
      name: "Analyzing and optimizing technical and business processes",
      weight: "~15%",
      groups: [
        { id: "4-1", name: "Analyzing and defining technical processes", tasks: [
          "Apply software development lifecycle practices.",
          "Apply continuous integration and continuous deployment.",
          "Use troubleshooting and root cause analysis best practices.",
          "Test and validate software and infrastructure.",
          "Use service catalog and provisioning.",
          "Plan disaster recovery."
        ] },
        { id: "4-2", name: "Analyzing and defining business processes", tasks: [
          "Manage stakeholders through influencing and facilitation.",
          "Manage change.",
          "Assess team and skills readiness.",
          "Define decision-making processes.",
          "Manage customer success.",
          "Optimize cost and resources across CapEx and OpEx.",
          "Plan business continuity."
        ] }
      ]
    },
    {
      name: "Managing implementation",
      weight: "~12.5%",
      groups: [
        { id: "5-1", name: "Advising development and operation teams to ensure successful deployment", tasks: [
          "Guide application and infrastructure deployment.",
          "Apply API management best practices using Apigee.",
          "Use testing frameworks including load, unit, and integration testing.",
          "Use data and system migration and management tooling.",
          "Use Gemini Cloud Assist."
        ] },
        { id: "5-2", name: "Interacting with Google Cloud programmatically", tasks: [
          "Use Cloud Shell Editor, Cloud Code, and Cloud Shell Terminal.",
          "Use Google Cloud SDKs such as gcloud, gsutil, and bq.",
          "Use cloud emulators for Bigtable, Spanner, Pub/Sub, and Firestore.",
          "Use Infrastructure as Code including Terraform.",
          "Apply Google API access best practices.",
          "Use Google API client libraries."
        ] }
      ]
    },
    {
      name: "Ensuring solution and operations excellence",
      weight: "~12.5%",
      groups: [
        { id: "6-1", name: "Understanding the operational excellence pillar of the Google Cloud Well-Architected Framework", tasks: [
          "Understand the principles and recommendations of the operational excellence pillar of the Google Cloud Well-Architected Framework."
        ] },
        { id: "6-2", name: "Using Google Cloud Observability solutions", tasks: [
          "Use monitoring and logging.",
          "Use profiling and benchmarking.",
          "Design alerting strategies."
        ] },
        { id: "6-3", name: "Deployment and release management", tasks: [
          "Manage deployment and release processes."
        ] },
        { id: "6-4", name: "Assisting with the support of deployed solutions", tasks: [
          "Assist with support of deployed solutions."
        ] },
        { id: "6-5", name: "Evaluating quality control measures", tasks: [
          "Evaluate quality control measures."
        ] },
        { id: "6-6", name: "Ensuring the reliability of solutions in production", tasks: [
          "Use chaos engineering, penetration testing, and load testing to ensure production reliability."
        ] }
      ]
    }
  ],

  PAA: [
    {
      name: "Building agents using low-code tools",
      weight: "~13%",
      groups: [
        { id: "1-1", name: "Configuring agentic workflows and behavior using low-code tools", tasks: [
          "Configure state-based workflows using pages, transition routes, and event handlers with Gemini Enterprise Agent Designer and Customer Experience Agent Studio.",
          "Create system instructions and in-console prompt templates, including few-shot and chain-of-thought approaches, to guide agent behavior."
        ] },
        { id: "1-2", name: "Connecting enterprise data to Gemini Enterprise", tasks: [
          "Configure agents to securely connect and query enterprise proprietary data sources using Gemini Enterprise and Agent Search.",
          "Ingest and process unstructured multimodal data such as videos, audio, and images into the agentic workflow."
        ] }
      ]
    },
    {
      name: "Using coding agents for application development",
      weight: "~17%",
      groups: [
        { id: "2-1", name: "Using coding agents effectively", tasks: [
          "Configure coding agents with MCP servers, custom skills, and access to tools such as Antigravity and Claude Code on Google Cloud.",
          "Use coding agents in secure sandboxes such as GKE, Cloud Workstations, and Antigravity.",
          "Use coding agents to refactor source code, optimize execution runtimes, and patch application-layer vulnerabilities."
        ] },
        { id: "2-2", name: "Customizing coding agents for enterprise workflows", tasks: [
          "Create skills, plugins, extension hooks, rules, and subagents using Antigravity.",
          "Augment Antigravity with Agents CLI to build, scale, govern, and optimize deployed agents."
        ] }
      ]
    },
    {
      name: "Developing custom agents",
      weight: "~33%",
      groups: [
        { id: "3-1", name: "Designing and building agentic workflows in code", tasks: [
          "Select and configure the appropriate language model, including LLM versus SLM, self-hosted versus SaaS, and open-source versus proprietary, considering cost, security, and agent architecture.",
          "Build custom agents using open-source libraries such as Agent Development Kit (ADK).",
          "Configure sessions and memory using Agent Platform Memory Bank and managed sessions.",
          "Configure skills using Agents CLI, including plugins and agent versus human mode."
        ] },
        { id: "3-2", name: "Integrating enterprise domain knowledge", tasks: [
          "Design, configure, and manage RAG pipelines and vector retrieval systems using embeddings, similarity scoring, reranking, Vector Search, and Agent Retrieval.",
          "Configure agent permissions using Agent Identity.",
          "Use Agent Registry and Google Cloud MCP Servers to configure prebuilt and custom capabilities for managed databases, APIs, third-party SaaS tools, and remote servers."
        ] },
        { id: "3-3", name: "Orchestrating and coordinating agentic workflows", tasks: [
          "Orchestrate agents using protocols such as MCP and Agent2Agent (A2A).",
          "Select and coordinate multiagent handoffs and workflows such as parallel, sequential, and graph workflows using Agent Identity, Agent Registry, Agent Runtime, and agent policies."
        ] }
      ]
    },
    {
      name: "Evaluating and deploying agentic workflows",
      weight: "~22%",
      groups: [
        { id: "4-1", name: "Evaluating agents in development and in production", tasks: [
          "Create test sets for agent evaluation using golden data, prompts, and edge cases.",
          "Create continuous evaluation pipelines to assess agent tool execution against established success criteria.",
          "Choose evaluation frameworks and tools such as ADK evalset, Agent Platform Gen AI evaluation service, and custom autoraters.",
          "Evaluate an agentic system against a golden dataset to assess agent response and retrieval quality."
        ] },
        { id: "4-2", name: "Deploying and scaling production workloads", tasks: [
          "Select the optimal deployment runtime based on use case, requirements, and cost, including Agent Runtime, Cloud Run, and GKE.",
          "Troubleshoot agent issues such as drift, tool invocation latency, reasoning loops, and system failures.",
          "Monitor and optimize agents for performance, reliability, and cost, including logic errors, latency bottlenecks, and hallucinations."
        ] }
      ]
    },
    {
      name: "Securing and governing agentic workflows",
      weight: "~15%",
      groups: [
        { id: "5-1", name: "Configuring agent security and governance", tasks: [
          "Implement authentication and secure tool execution, including agent-to-tool API calls using OAuth 2.0.",
          "Configure principal access boundary policies using Agent Identity.",
          "Configure Agent Gateway to monitor traffic and track agents.",
          "Design and configure agentic governance and policy enforcement using Agent Registry and Model Armor."
        ] },
        { id: "5-2", name: "Implementing secure agent behavior and execution", tasks: [
          "Design safety frameworks and guardrails using Agent Gateway, Model Armor, and human-in-the-loop.",
          "Configure secure access to data and identity propagation using Agent Gateway and Agent Registry."
        ] }
      ]
    }
  ],

  PSOE: [
    {
      name: "Platform operations",
      weight: "~14%",
      groups: [
        { id: "1-1", name: "Enhancing detection and response", tasks: [
          "Prioritize telemetry sources such as Security Command Center, Google Security Operations, Google Threat Intelligence, and Cloud IDS to detect incidents or misconfigurations.",
          "Integrate SCC, Google SecOps, GTI, Cloud IDS, and downstream third-party systems in the security architecture to enhance detection capabilities.",
          "Justify the use of tools with overlapping capabilities based on requirements.",
          "Evaluate the effectiveness of existing tools to identify gaps in coverage and mitigate potential threats.",
          "Evaluate automation and cloud-based tools to enhance detection and response processes."
        ] },
        { id: "1-2", name: "Configuring access", tasks: [
          "Configure user and service account authentication to security tools such as SCC and Google SecOps.",
          "Configure user and service account authorization for feature access using IAM roles and permissions.",
          "Configure user and service account authorization for data access using IAM roles and permissions.",
          "Configure and analyze Cloud Audit Logs and data access logs for the solution.",
          "Configure API access for automations within SCC, Google SecOps, and GTI using service accounts and API keys.",
          "Provision identities using Workforce Identity Federation."
        ] }
      ]
    },
    {
      name: "Data management",
      weight: "~14%",
      groups: [
        { id: "2-1", name: "Ingesting logs for security tooling", tasks: [
          "Determine approaches for data ingestion within security tools such as SCC and Google SecOps.",
          "Configure an ingestion tool or features within security tools.",
          "Assess required logs for detection and response, including automated sources such as SCC Event Threat Detection and Google SecOps.",
          "Evaluate parsers for data ingestion in Google SecOps.",
          "Configure parser modifications or extensions in Google SecOps.",
          "Evaluate data normalization techniques from log sources in Google SecOps.",
          "Evaluate new labels for data ingestion.",
          "Manage log and ingestion costs."
        ] },
        { id: "2-2", name: "Identifying a baseline of user, asset, and entity context", tasks: [
          "Identify relevant threat intelligence information in the enterprise environment.",
          "Differentiate event and entity data log sources such as Cloud Audit Logs and Active Directory organizational context.",
          "Evaluate event and entity data matches for enrichment using aliasing fields."
        ] }
      ]
    },
    {
      name: "Threat hunting",
      weight: "~19%",
      groups: [
        { id: "3-1", name: "Performing threat hunting across environments", tasks: [
          "Develop queries to search across environment logs to identify anomalous activity.",
          "Analyze user behavior to identify anomalous activity.",
          "Investigate networks, endpoints, and services for threat patterns or indicators of compromise using Logs Explorer, Log Analytics, BigQuery, and Google SecOps.",
          "Collaborate with the incident response team to identify active threats.",
          "Develop hypotheses based on behavior, threat intelligence, posture, and incident data from SCC and GTI."
        ] },
        { id: "3-2", name: "Leveraging threat intelligence for threat hunting", tasks: [
          "Search for indicators of compromise within historical logs.",
          "Identify new attack patterns and techniques in real time using threat intelligence and risk assessments such as GTI, detection rules, and SCC toxic combinations.",
          "Analyze entity risk score to identify anomalous behavior.",
          "Perform retrohunts of historical event data with newly enriched logs using Google SecOps rules engine, BigQuery, and Cloud Logging.",
          "Search proactively for underlying threats using threat intelligence and detection rules."
        ] }
      ]
    },
    {
      name: "Detection engineering",
      weight: "~22%",
      groups: [
        { id: "4-1", name: "Developing and implementing mechanisms to detect risks and identify threats", tasks: [
          "Reconcile threat intelligence with user and asset activity.",
          "Analyze logs and events to identify anomalous activity.",
          "Assess suspicious behavior patterns using detection rules and searches across timelines.",
          "Design detection rules that use risk values and Google SecOps reference lists to identify threats matching risk profiles.",
          "Discover anomalous behavior of assets or users and assign risk values using Google SecOps Risk Analytics and curated detection rules.",
          "Design detection rules to discover posture or risk profile changes using SCC Security Health Analytics, SCC posture management, and Google SecOps.",
          "Identify new or low-prevalence processes, domains, and IP addresses using methods such as YARA-L rules and dashboards.",
          "Use entity and context data within detection rules to improve accuracy using Google SecOps entity graph.",
          "Configure SCC Event Threat Detection custom detectors for indicators of compromise."
        ] },
        { id: "4-2", name: "Leveraging threat intelligence for detection", tasks: [
          "Score alerts based on the risk level of indicators of compromise.",
          "Use the latest indicators of compromise to search within ingested security telemetry.",
          "Measure repetitive alert frequency to identify and reduce false positives."
        ] }
      ]
    },
    {
      name: "Incident response",
      weight: "~21%",
      groups: [
        { id: "5-1", name: "Containing and investigating security incidents", tasks: [
          "Collect evidence on incident scope, including forensic images and artifacts.",
          "Observe and analyze alerts related to the incident using SCC and Google SecOps.",
          "Analyze incident scope using Logs Explorer, Log Analytics, BigQuery, Cloud Logging, and Cloud Monitoring.",
          "Collaborate with other engineering teams for detection and long-term remediation.",
          "Isolate affected services and processes to prevent further damage and spread.",
          "Analyze identified artifacts such as hashes, IP addresses, URLs, and binaries using GTI.",
          "Perform root cause analysis using SCC and Google SecOps SIEM."
        ] },
        { id: "5-2", name: "Building, implementing, and using response playbooks", tasks: [
          "Determine appropriate response steps for automation.",
          "Prioritize high-value enrichments based on threat profiles.",
          "Evaluate appropriate integrations for playbooks.",
          "Design new processes in response to newly identified attack patterns from recent incidents.",
          "Recommend new orchestrations and automation playbooks based on current implementation gaps, including Google SecOps SOAR.",
          "Implement mechanisms to notify analysts and stakeholders of incidents."
        ] },
        { id: "5-3", name: "Implementing the case management lifecycle", tasks: [
          "Assign cases into appropriate response stages.",
          "Implement efficient workflows for case escalation.",
          "Assess the effectiveness of case handoffs."
        ] }
      ]
    },
    {
      name: "Observability",
      weight: "~10%",
      groups: [
        { id: "6-1", name: "Developing and maintaining dashboards and reports to provide insights", tasks: [
          "Identify key security analytics such as metrics, KPIs, and trends.",
          "Implement dashboards to visualize security telemetry, ingestion metrics, detections, alerts, and indicators of compromise using Google SecOps SOAR, SIEM, and Looker Studio.",
          "Generate and customize reports using Google SecOps SOAR and SIEM."
        ] },
        { id: "6-2", name: "Configuring health monitoring and alerting", tasks: [
          "Identify important metrics for health monitoring and alerts.",
          "Create dashboards that centralize metrics.",
          "Create alerts with thresholds for specific metrics.",
          "Configure notifications using Cloud Monitoring.",
          "Identify health issues using Cloud Logging.",
          "Configure silent source detection."
        ] }
      ]
    }
  ],

  PCNE: [
    {
      name: "Designing and planning a Google Cloud VPC network",
      weight: "~21%",
      groups: [
        { id: "1-1", name: "Designing an overall network architecture", tasks: [
          "Differentiate between Premium and Standard network tiers.",
          "Design for high availability, failover, disaster recovery, and scale.",
          "Design DNS topology across on-premises and Cloud DNS.",
          "Choose an appropriate load balancer for the network implementation.",
          "Plan GKE networking including secondary ranges, IP address scale, and control plane access.",
          "Identify appropriate IAM roles for network architecture designs such as load balancer provisioning and Shared VPC subnet permissions.",
          "Plan connectivity to managed services using private services access, Private Service Connect, and Serverless VPC Access.",
          "Plan for quotas and limits."
        ] },
        { id: "1-2", name: "Designing VPC networks", tasks: [
          "Choose the VPC type and quantity, including standalone or Shared VPC and the number of VPC environments.",
          "Determine how networks interconnect using VPC Network Peering, Network Connectivity Center mesh and star topologies, and Private Service Connect.",
          "Plan IP address management including subnets, IPv6, bring your own IP, PUPI, Private NAT, non-RFC 1918 addresses, managed services, and IPAM automation.",
          "Plan a global or regional network environment.",
          "Determine the correct VPC MTU sizing for workloads.",
          "Plan third-party device insertion using network virtual appliances, static or policy-based routes, and load balancing."
        ] },
        { id: "1-3", name: "Designing a resilient and performant hybrid and multi-cloud network", tasks: [
          "Design hybrid connectivity for on-premises, cloud, and branch offices considering bandwidth and security constraints using Dedicated Interconnect, Partner Interconnect, Cloud VPN, and SD-WAN appliances.",
          "Design multicloud connectivity using Cloud VPN and Cross-Cloud Interconnect.",
          "Choose when to use Direct Peering or Verified Peering Provider.",
          "Design high-availability and disaster recovery connectivity across multiple regions using regional or global dynamic routing.",
          "Access multiple VPCs from on-premises using Shared VPC, multi-VPC peering, and Network Connectivity Center topologies.",
          "Access Google services such as Vertex AI and APIs privately from on-premises.",
          "Access managed services through Private Service Connect and VPC Network Peering connections such as private services access.",
          "Design IP address space across on-premises and cloud environments to avoid overlaps and support Private NAT.",
          "Architect hybrid DNS topology including forwarding paths, inbound policies, cross-project binding, and DNS peering.",
          "Determine MTU sizing for Cloud Interconnect and HA VPN.",
          "Understand interconnect encryption options such as MACsec and HA VPN over Cloud Interconnect."
        ] },
        { id: "1-4", name: "Designing for Google Kubernetes Engine", tasks: [
          "Choose between public or private cluster nodes and node pools.",
          "Choose between public or private control plane endpoints.",
          "Plan primary and secondary subnet ranges.",
          "Plan GKE IP addresses using RFC 1918, non-RFC 1918, Google-managed services ranges, Private Service Connect, shared IP ranges, and PUPI.",
          "Plan for IPv6.",
          "Design load balancing for GKE networking.",
          "Add and manage node pool configuration."
        ] }
      ]
    },
    {
      name: "Implementing a VPC network",
      weight: "~20%",
      groups: [
        { id: "2-1", name: "Configuring VPCs", tasks: [
          "Create VPC resources including networks, subnets, firewall rules or policies, private services access subnets, and private pools.",
          "Configure VPC Network Peering.",
          "Create a Shared VPC network and share subnets with service projects.",
          "Assign IAM permissions to use Shared VPC subnets from service projects.",
          "Configure access to Google APIs and Google-managed services using Private Google Access and public interfaces.",
          "Expand VPC subnet ranges after creation.",
          "Configure restricted Google Cloud services with VPC Service Controls perimeters."
        ] },
        { id: "2-2", name: "Configuring VPC routing", tasks: [
          "Set up static and dynamic routing using Cloud Router.",
          "Configure global or regional dynamic routing.",
          "Implement routing using network tags and priority.",
          "Implement route priorities with global dynamic routing, including policy-based and dynamic routing.",
          "Implement an internal load balancer as a next hop.",
          "Configure custom route import and export over VPC Network Peering and Network Connectivity Center.",
          "Configure policy-based routing."
        ] },
        { id: "2-3", name: "Configuring Network Connectivity Center", tasks: [
          "Differentiate between VPC, hybrid, and producer spoke types.",
          "Manage VPC topologies such as star, hub-and-spoke, and mesh.",
          "Configure Private NAT and Private Service Connect propagation.",
          "Configure IP/CIDR range filters for Network Connectivity Center spokes.",
          "Monitor and troubleshoot Network Connectivity Center."
        ] },
        { id: "2-4", name: "Configuring and maintaining GKE clusters", tasks: [
          "Create VPC-native clusters using alias IPs.",
          "Set up clusters with Shared VPC.",
          "Configure private clusters and private control plane endpoints.",
          "Add authorized networks for cluster control plane endpoints.",
          "Use DNS-based endpoints for control plane access.",
          "Enable GKE Dataplane V2.",
          "Configure SNAT and IP Masquerade policies.",
          "Create GKE network policies.",
          "Configure Pod ranges and service ranges.",
          "Deploy additional Pod ranges for GKE clusters.",
          "Configure DNS using local DNS cache, Cloud DNS, and kube-dns."
        ] }
      ]
    },
    {
      name: "Configuring managed network services",
      weight: "~16%",
      groups: [
        { id: "3-1", name: "Configuring load balancing", tasks: [
          "Determine the load balancing solution for the network, including internal/external, regional/global, application/proxy/passthrough options.",
          "Configure backend services including autoscaling, network endpoint groups, and managed instance groups.",
          "Configure load balancers and backend settings such as balancing method, session affinity, serving capacity, URL maps, health checks, and global access.",
          "Understand GKE load balancing using the GKE Gateway controller, GKE Ingress controller, and NEGs.",
          "Set up traffic management on Application Load Balancer including traffic splitting, mirroring, and URL rewrites."
        ] },
        { id: "3-2", name: "Configuring Cloud CDN", tasks: [
          "Set up Cloud CDN for supported origins such as managed instance groups, Cloud Storage buckets, and Cloud Run.",
          "Set up Cloud CDN for external backends using internet NEGs and third-party object storage.",
          "Invalidate cached content."
        ] },
        { id: "3-3", name: "Configuring Cloud DNS", tasks: [
          "Manage Cloud DNS zones and records.",
          "Migrate to Cloud DNS.",
          "Configure Cloud DNS routing policies such as geolocation and failover.",
          "Enable DNSSEC.",
          "Integrate self-hosted DNS with Cloud DNS using forwarding and DNS server policies.",
          "Understand private and public zones and implement split-horizon DNS.",
          "Set up DNS cross-project binding and DNS peering.",
          "Configure Cloud DNS and external-dns operator for GKE."
        ] }
      ]
    },
    {
      name: "Configuring and implementing hybrid and multicloud network interconnectivity",
      weight: "~16%",
      groups: [
        { id: "4-1", name: "Configuring Cloud Interconnect", tasks: [
          "Create Dedicated Interconnect connections and configure VLAN attachments.",
          "Create Partner Interconnect connections, configure VLAN attachments, and differentiate between layer 2 and layer 3 interconnects.",
          "Create Cross-Cloud Interconnect connections and configure VLAN attachments.",
          "Configure HA VPN over Cloud Interconnect.",
          "Implement 99.9% and 99.99% SLA interconnect topologies."
        ] },
        { id: "4-2", name: "Configuring a site-to-site IPSec VPN", tasks: [
          "Configure HA VPN toward on-premises VPN gateways.",
          "Configure HA VPN toward other Google Cloud VPCs.",
          "Configure Classic VPN using route-based and policy-based modes."
        ] },
        { id: "4-3", name: "Configuring Cloud Router", tasks: [
          "Implement BGP attributes such as ASN, route priority/MED, link-local addresses, and authentication.",
          "Configure Bidirectional Forwarding Detection (BFD).",
          "Create custom-advertised and custom-learned routes.",
          "Select between legacy and standard best path selection at the VPC."
        ] },
        { id: "4-4", name: "Configuring Network Connectivity Center", tasks: [
          "Create hybrid spokes using VPN and VLAN attachments.",
          "Establish site-to-site data transfer.",
          "Create router appliances.",
          "Solve common transitivity networking issues."
        ] }
      ]
    },
    {
      name: "Managing, monitoring, and troubleshooting network operations",
      weight: "~14%",
      groups: [
        { id: "5-1", name: "Logging and monitoring with Google Cloud Observability", tasks: [
          "Enable and review Cloud Logging for Cloud VPN, Cloud Router, VPC Service Controls, Cloud NGFW, Firewall Insights, VPC Flow Logs, Cloud DNS, Cloud NAT, and Network Connectivity Center.",
          "Monitor networking metrics for Cloud VPN, Cloud Interconnect and VLAN attachments, Cloud Router, load balancers, Google Cloud Armor, and Cloud NAT."
        ] },
        { id: "5-2", name: "Maintaining and troubleshooting connectivity issues", tasks: [
          "Drain and redirect traffic flows with Application Load Balancer.",
          "Manage and troubleshoot VPNs.",
          "Manage and troubleshoot Cloud Interconnect.",
          "Troubleshoot Cloud Router BGP peering.",
          "Troubleshoot with VPC Flow Logs, firewall logs, and Packet Mirroring."
        ] },
        { id: "5-3", name: "Using Network Intelligence Center to monitor and troubleshoot common networking issues", tasks: [
          "Use Network Topology to visualize throughput and traffic flows.",
          "Use Connectivity Tests to diagnose route and firewall misconfigurations.",
          "Use Performance Dashboard to identify packet loss and latency at Google-wide and project scope.",
          "Use Firewall Insights to monitor, identify, and improve rules.",
          "Use Network Analyzer to identify network failures, suboptimal configurations, and utilization warnings.",
          "Use Flow Analyzer and VPC Flow Logs to evaluate network traffic."
        ] }
      ]
    },
    {
      name: "Configuring, implementing and managing a cloud network security solution",
      weight: "~13%",
      groups: [
        { id: "6-1", name: "Configuring Google Cloud Armor policies", tasks: [
          "Configure and attach edge and backend security policies.",
          "Implement WAF rules such as SQL injection, cross-site scripting, and remote file inclusion protection.",
          "Configure advanced network DDoS and Adaptive Protection.",
          "Configure rate limiting.",
          "Configure bot management.",
          "Apply Google Threat Intelligence."
        ] },
        { id: "6-2", name: "Configuring and managing NGFW policies and VPC firewall rules", tasks: [
          "Plan the firewall strategy across VPC firewall rules, Cloud NGFW, hierarchical firewall rules, and third-party integration.",
          "Understand effective policy rules for hierarchical firewall configurations.",
          "Configure Cloud NGFW to support GKE and Cloud Load Balancing.",
          "Create and troubleshoot VPC firewall rules and Cloud NGFW regional, global, and hierarchical policies.",
          "Enable layer 7 packet inspection with Cloud NGFW Enterprise.",
          "Migrate from VPC firewall rules to Cloud NGFW policies.",
          "Configure VPC and NGFW rule criteria including priority, protocols, direction, source, and destination.",
          "Configure VPC and Firewall Rules Logging.",
          "Implement micro-segmentation using metadata, secure tags, service accounts, and network tags.",
          "Differentiate Cloud NGFW Essentials, Standard, and Enterprise tiers."
        ] },
        { id: "6-3", name: "Configuring and securing internet egress traffic using Public Cloud NAT and Secure Web Proxy", tasks: [
          "Configure public Cloud NAT IP addressing with automatic and manual NAT IP addresses.",
          "Configure static and dynamic port allocation for Cloud NAT.",
          "Configure Secure Web Proxy."
        ] },
        { id: "6-4", name: "Configuring self-managed network virtual appliances and Packet Mirroring", tasks: [
          "Route and inspect inter-VPC traffic using multi-NIC VM network virtual appliances.",
          "Configure an internal load balancer as a next hop for HA multi-NIC VM routing.",
          "Configure policy-based routes for HA multi-NIC VM routing.",
          "Develop a strategy for out-of-band Network Security Integration.",
          "Configure Packet Mirroring for VPC traffic toward self-managed collectors."
        ] }
      ]
    }
  ]
};
