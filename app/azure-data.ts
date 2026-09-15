export type AzureService = { name: string; status: string; slug: string; folder: string };
export type AzureBranch = { title: string; folder: string; services: AzureService[] };

export const azureBranches: AzureBranch[] = [
  {
    "title": "AI + machine learning",
    "folder": "ai-machine-learning",
    "services": [
      {
        "name": "Microsoft Foundry",
        "status": "Completed — awaiting review",
        "slug": "microsoft-foundry",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure AI Bot Service",
        "status": "Completed — awaiting review",
        "slug": "azure-ai-bot-service",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure AI Search",
        "status": "Completed — awaiting review",
        "slug": "azure-ai-search",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure Databricks",
        "status": "Completed — awaiting review",
        "slug": "azure-databricks",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure Machine Learning",
        "status": "Completed — awaiting review",
        "slug": "azure-machine-learning",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure Open Datasets",
        "status": "Completed — awaiting review",
        "slug": "azure-open-datasets",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "foundry-tools",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure AI Video Indexer",
        "status": "Completed — awaiting review",
        "slug": "azure-ai-video-indexer",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure AI Custom Vision",
        "status": "Completed — awaiting review",
        "slug": "azure-ai-custom-vision",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Data Science Virtual Machines",
        "status": "Completed — awaiting review",
        "slug": "data-science-virtual-machines",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure Language in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-language-in-foundry-tools",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure Translator in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-translator-in-foundry-tools",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure OpenAI in Foundry Models",
        "status": "Completed — awaiting review",
        "slug": "azure-openai-in-foundry-models",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Content Safety in Foundry Control Plane",
        "status": "Completed — awaiting review",
        "slug": "content-safety-in-foundry-control-plane",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Health Bot",
        "status": "Completed — awaiting review",
        "slug": "health-bot",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure Document Intelligence in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-document-intelligence-in-foundry-tools",
        "folder": "ai-machine-learning"
      },
      {
        "name": "AI Anomaly Detector",
        "status": "Completed — awaiting review",
        "slug": "ai-anomaly-detector",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Foundry Models",
        "status": "Completed — awaiting review",
        "slug": "foundry-models",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Microsoft Security Copilot",
        "status": "Completed — awaiting review",
        "slug": "microsoft-security-copilot",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure AI Immersive Reader",
        "status": "Completed — awaiting review",
        "slug": "azure-ai-immersive-reader",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Phi open models",
        "status": "Completed — awaiting review",
        "slug": "phi-open-models",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure Content Understanding in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-content-understanding-in-foundry-tools",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure Speech in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-speech-in-foundry-tools",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Microsoft Planetary Computer Pro",
        "status": "Completed — awaiting review",
        "slug": "microsoft-planetary-computer-pro",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Foundry Agent Service",
        "status": "Completed — awaiting review",
        "slug": "foundry-agent-service",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure SRE Agent",
        "status": "Completed — awaiting review",
        "slug": "azure-sre-agent",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Observability in Foundry Control Plane",
        "status": "Completed — awaiting review",
        "slug": "observability-in-foundry-control-plane",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Azure Vision in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-vision-in-foundry-tools",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Foundry IQ",
        "status": "Completed — awaiting review",
        "slug": "foundry-iq",
        "folder": "ai-machine-learning"
      },
      {
        "name": "Foundry Control Plane",
        "status": "Completed — awaiting review",
        "slug": "foundry-control-plane",
        "folder": "ai-machine-learning"
      }
    ]
  },
  {
    "title": "Analytics",
    "folder": "analytics",
    "services": [
      {
        "name": "Azure Analysis Services",
        "status": "Completed — awaiting review",
        "slug": "azure-analysis-services",
        "folder": "analytics"
      },
      {
        "name": "Azure Data Explorer",
        "status": "Completed — awaiting review",
        "slug": "azure-data-explorer",
        "folder": "analytics"
      },
      {
        "name": "Azure Data Factory",
        "status": "Completed — awaiting review",
        "slug": "azure-data-factory",
        "folder": "analytics"
      },
      {
        "name": "Azure Data Lake Storage",
        "status": "Completed — awaiting review",
        "slug": "azure-data-lake-storage",
        "folder": "analytics"
      },
      {
        "name": "Azure Data Share",
        "status": "Completed — awaiting review",
        "slug": "azure-data-share",
        "folder": "analytics"
      },
      {
        "name": "Azure Databricks",
        "status": "Completed — awaiting review",
        "slug": "azure-databricks",
        "folder": "analytics"
      },
      {
        "name": "Azure Stream Analytics",
        "status": "Completed — awaiting review",
        "slug": "azure-stream-analytics",
        "folder": "analytics"
      },
      {
        "name": "Azure Synapse Analytics",
        "status": "Completed — awaiting review",
        "slug": "azure-synapse-analytics",
        "folder": "analytics"
      },
      {
        "name": "Data Catalog",
        "status": "Completed — awaiting review",
        "slug": "data-catalog",
        "folder": "analytics"
      },
      {
        "name": "Data Lake Analytics",
        "status": "Completed — awaiting review",
        "slug": "data-lake-analytics",
        "folder": "analytics"
      },
      {
        "name": "Event Hubs",
        "status": "Completed — awaiting review",
        "slug": "event-hubs",
        "folder": "analytics"
      },
      {
        "name": "HDInsight",
        "status": "Completed — awaiting review",
        "slug": "hdinsight",
        "folder": "analytics"
      },
      {
        "name": "Power BI Embedded",
        "status": "Completed — awaiting review",
        "slug": "power-bi-embedded",
        "folder": "analytics"
      },
      {
        "name": "Microsoft Graph Data Connect",
        "status": "Completed — awaiting review",
        "slug": "microsoft-graph-data-connect",
        "folder": "analytics"
      },
      {
        "name": "Azure Chaos Studio",
        "status": "Completed — awaiting review",
        "slug": "azure-chaos-studio",
        "folder": "analytics"
      },
      {
        "name": "Microsoft Fabric",
        "status": "Completed — awaiting review",
        "slug": "microsoft-fabric",
        "folder": "analytics"
      },
      {
        "name": "Microsoft Purview",
        "status": "Completed — awaiting review",
        "slug": "microsoft-purview",
        "folder": "analytics"
      },
      {
        "name": "Power BI",
        "status": "Completed — awaiting review",
        "slug": "power-bi",
        "folder": "analytics"
      },
      {
        "name": "Microsoft Planetary Computer Pro",
        "status": "Completed — awaiting review",
        "slug": "microsoft-planetary-computer-pro",
        "folder": "analytics"
      }
    ]
  },
  {
    "title": "Compute",
    "folder": "compute",
    "services": [
      {
        "name": "App Service",
        "status": "Completed — awaiting review",
        "slug": "app-service",
        "folder": "compute"
      },
      {
        "name": "Azure Compute Fleet",
        "status": "Completed — awaiting review",
        "slug": "azure-compute-fleet",
        "folder": "compute"
      },
      {
        "name": "Azure Quantum",
        "status": "Completed — awaiting review",
        "slug": "azure-quantum",
        "folder": "compute"
      },
      {
        "name": "Azure Spot Virtual Machines",
        "status": "Completed — awaiting review",
        "slug": "azure-spot-virtual-machines",
        "folder": "compute"
      },
      {
        "name": "Azure Spring Apps",
        "status": "Completed — awaiting review",
        "slug": "azure-spring-apps",
        "folder": "compute"
      },
      {
        "name": "Azure VMware Solution",
        "status": "Completed — awaiting review",
        "slug": "azure-vmware-solution",
        "folder": "compute"
      },
      {
        "name": "Batch",
        "status": "Completed — awaiting review",
        "slug": "batch",
        "folder": "compute"
      },
      {
        "name": "Cloud Services",
        "status": "Completed — awaiting review",
        "slug": "cloud-services",
        "folder": "compute"
      },
      {
        "name": "Linux Virtual Machines",
        "status": "Completed — awaiting review",
        "slug": "linux-virtual-machines",
        "folder": "compute"
      },
      {
        "name": "SQL Server on Azure Virtual Machines",
        "status": "Completed — awaiting review",
        "slug": "sql-server-on-azure-virtual-machines",
        "folder": "compute"
      },
      {
        "name": "Static Web Apps",
        "status": "Completed — awaiting review",
        "slug": "static-web-apps",
        "folder": "compute"
      },
      {
        "name": "Virtual Machine Scale Sets",
        "status": "Completed — awaiting review",
        "slug": "virtual-machine-scale-sets",
        "folder": "compute"
      },
      {
        "name": "Virtual Machines",
        "status": "Completed — awaiting review",
        "slug": "virtual-machines",
        "folder": "compute"
      },
      {
        "name": "Azure Virtual Desktop",
        "status": "Completed — awaiting review",
        "slug": "azure-virtual-desktop",
        "folder": "compute"
      },
      {
        "name": "Windows Server",
        "status": "Completed — awaiting review",
        "slug": "windows-server",
        "folder": "compute"
      },
      {
        "name": "Azure Dedicated Host",
        "status": "Completed — awaiting review",
        "slug": "azure-dedicated-host",
        "folder": "compute"
      },
      {
        "name": "Azure VM Image Builder",
        "status": "Completed — awaiting review",
        "slug": "azure-vm-image-builder",
        "folder": "compute"
      },
      {
        "name": "Azure Kubernetes Service (AKS)",
        "status": "Completed — awaiting review",
        "slug": "azure-kubernetes-service",
        "folder": "compute"
      },
      {
        "name": "Azure Functions",
        "status": "Completed — awaiting review",
        "slug": "azure-functions",
        "folder": "compute"
      },
      {
        "name": "Azure Container Instances",
        "status": "Completed — awaiting review",
        "slug": "azure-container-instances",
        "folder": "compute"
      },
      {
        "name": "Azure Container Apps",
        "status": "Completed — awaiting review",
        "slug": "azure-container-apps",
        "folder": "compute"
      },
      {
        "name": "Nutanix Cloud Clusters",
        "status": "Completed — awaiting review",
        "slug": "nutanix-cloud-clusters",
        "folder": "compute"
      },
      {
        "name": "Azure Virtual Desktop",
        "status": "Completed — awaiting review",
        "slug": "azure-virtual-desktop",
        "folder": "compute"
      }
    ]
  },
  {
    "title": "Containers",
    "folder": "containers",
    "services": [
      {
        "name": "Azure Container Registry",
        "status": "Completed — awaiting review",
        "slug": "azure-container-registry",
        "folder": "containers"
      },
      {
        "name": "Azure Kubernetes Service (AKS)",
        "status": "Completed — awaiting review",
        "slug": "azure-kubernetes-service",
        "folder": "containers"
      },
      {
        "name": "Azure Container Apps",
        "status": "Completed — awaiting review",
        "slug": "azure-container-apps",
        "folder": "containers"
      },
      {
        "name": "Azure Container Instances",
        "status": "Completed — awaiting review",
        "slug": "azure-container-instances",
        "folder": "containers"
      },
      {
        "name": "Azure Container Storage",
        "status": "Completed — awaiting review",
        "slug": "azure-container-storage",
        "folder": "containers"
      },
      {
        "name": "Azure Linux",
        "status": "Completed — awaiting review",
        "slug": "azure-linux",
        "folder": "containers"
      },
      {
        "name": "Azure Red Hat OpenShift",
        "status": "Completed — awaiting review",
        "slug": "azure-red-hat-openshift",
        "folder": "containers"
      },
      {
        "name": "Azure Service Fabric",
        "status": "Completed — awaiting review",
        "slug": "azure-service-fabric",
        "folder": "containers"
      },
      {
        "name": "Azure Kubernetes Fleet Manager",
        "status": "Completed — awaiting review",
        "slug": "azure-kubernetes-fleet-manager",
        "folder": "containers"
      }
    ]
  },
  {
    "title": "Databases",
    "folder": "databases",
    "services": [
      {
        "name": "Azure Cosmos DB",
        "status": "Completed — awaiting review",
        "slug": "azure-cosmos-db",
        "folder": "databases"
      },
      {
        "name": "Azure Database for PostgreSQL",
        "status": "Completed — awaiting review",
        "slug": "azure-database-for-postgresql",
        "folder": "databases"
      },
      {
        "name": "Azure Database for MySQL",
        "status": "Completed — awaiting review",
        "slug": "azure-database-for-mysql",
        "folder": "databases"
      },
      {
        "name": "Azure SQL Database",
        "status": "Completed — awaiting review",
        "slug": "azure-sql-database",
        "folder": "databases"
      },
      {
        "name": "Azure SQL Managed Instance",
        "status": "Completed — awaiting review",
        "slug": "azure-sql-managed-instance",
        "folder": "databases"
      },
      {
        "name": "Azure Cache for Redis",
        "status": "Completed — awaiting review",
        "slug": "azure-cache-for-redis",
        "folder": "databases"
      },
      {
        "name": "Azure Managed Redis",
        "status": "Completed — awaiting review",
        "slug": "azure-managed-redis",
        "folder": "databases"
      },
      {
        "name": "Azure Database for MariaDB",
        "status": "Completed — awaiting review",
        "slug": "azure-database-for-mariadb",
        "folder": "databases"
      },
      {
        "name": "Azure Database Migration Service",
        "status": "Completed — awaiting review",
        "slug": "azure-database-migration-service",
        "folder": "databases"
      },
      {
        "name": "Azure Database for PostgreSQL Flexible Server",
        "status": "Completed — awaiting review",
        "slug": "azure-database-for-postgresql-flexible-server",
        "folder": "databases"
      },
      {
        "name": "Azure Database for MySQL Flexible Server",
        "status": "Completed — awaiting review",
        "slug": "azure-database-for-mysql-flexible-server",
        "folder": "databases"
      },
      {
        "name": "Azure Synapse Analytics",
        "status": "Completed — awaiting review",
        "slug": "azure-synapse-analytics",
        "folder": "databases"
      },
      {
        "name": "Azure Data Explorer",
        "status": "Completed — awaiting review",
        "slug": "azure-data-explorer",
        "folder": "databases"
      },
      {
        "name": "Azure Table Storage",
        "status": "Completed — awaiting review",
        "slug": "azure-table-storage",
        "folder": "databases"
      },
      {
        "name": "Azure Confidential Ledger",
        "status": "Completed — awaiting review",
        "slug": "azure-confidential-ledger",
        "folder": "databases"
      }
    ]
  },
  {
    "title": "Developer tools",
    "folder": "developer-tools",
    "services": [
      {
        "name": "App Configuration",
        "status": "Completed — awaiting review",
        "slug": "app-configuration",
        "folder": "developer-tools"
      },
      {
        "name": "Azure DevOps",
        "status": "Completed — awaiting review",
        "slug": "azure-devops",
        "folder": "developer-tools"
      },
      {
        "name": "Azure DevTest Labs",
        "status": "Completed — awaiting review",
        "slug": "azure-devtest-labs",
        "folder": "developer-tools"
      },
      {
        "name": "Azure Pipelines",
        "status": "Completed — awaiting review",
        "slug": "azure-pipelines",
        "folder": "developer-tools"
      },
      {
        "name": "SDKs",
        "status": "Completed — awaiting review",
        "slug": "sdks",
        "folder": "developer-tools"
      },
      {
        "name": "Visual Studio",
        "status": "Completed — awaiting review",
        "slug": "visual-studio",
        "folder": "developer-tools"
      },
      {
        "name": "Visual Studio Code",
        "status": "Completed — awaiting review",
        "slug": "visual-studio-code",
        "folder": "developer-tools"
      },
      {
        "name": "Azure App Testing",
        "status": "Completed — awaiting review",
        "slug": "azure-app-testing",
        "folder": "developer-tools"
      },
      {
        "name": "Microsoft Dev Box",
        "status": "Completed — awaiting review",
        "slug": "microsoft-dev-box",
        "folder": "developer-tools"
      },
      {
        "name": "Azure Deployment Environments",
        "status": "Completed — awaiting review",
        "slug": "azure-deployment-environments",
        "folder": "developer-tools"
      },
      {
        "name": "Microsoft Playwright Testing",
        "status": "Completed — awaiting review",
        "slug": "microsoft-playwright-testing",
        "folder": "developer-tools"
      },
      {
        "name": "Artifact Signing",
        "status": "Completed — awaiting review",
        "slug": "artifact-signing",
        "folder": "developer-tools"
      }
    ]
  },
  {
    "title": "DevOps",
    "folder": "devops",
    "services": [
      {
        "name": "Azure Artifacts",
        "status": "Completed — awaiting review",
        "slug": "azure-artifacts",
        "folder": "devops"
      },
      {
        "name": "Azure Boards",
        "status": "Completed — awaiting review",
        "slug": "azure-boards",
        "folder": "devops"
      },
      {
        "name": "Azure DevOps",
        "status": "Completed — awaiting review",
        "slug": "azure-devops",
        "folder": "devops"
      },
      {
        "name": "Azure DevTest Labs",
        "status": "Completed — awaiting review",
        "slug": "azure-devtest-labs",
        "folder": "devops"
      },
      {
        "name": "Azure Monitor",
        "status": "Completed — awaiting review",
        "slug": "azure-monitor",
        "folder": "devops"
      },
      {
        "name": "Azure Pipelines",
        "status": "Completed — awaiting review",
        "slug": "azure-pipelines",
        "folder": "devops"
      },
      {
        "name": "Azure Repos",
        "status": "Completed — awaiting review",
        "slug": "azure-repos",
        "folder": "devops"
      },
      {
        "name": "Azure Test Plans",
        "status": "Completed — awaiting review",
        "slug": "azure-test-plans",
        "folder": "devops"
      },
      {
        "name": "DevOps tool integrations",
        "status": "Completed — awaiting review",
        "slug": "devops-tool-integrations",
        "folder": "devops"
      },
      {
        "name": "Azure App Testing",
        "status": "Completed — awaiting review",
        "slug": "azure-app-testing",
        "folder": "devops"
      },
      {
        "name": "Azure Managed Grafana",
        "status": "Completed — awaiting review",
        "slug": "azure-managed-grafana",
        "folder": "devops"
      },
      {
        "name": "Microsoft Dev Box",
        "status": "Completed — awaiting review",
        "slug": "microsoft-dev-box",
        "folder": "devops"
      },
      {
        "name": "Azure Deployment Environments",
        "status": "Completed — awaiting review",
        "slug": "azure-deployment-environments",
        "folder": "devops"
      },
      {
        "name": "GitHub Advanced Security for Azure DevOps",
        "status": "Completed — awaiting review",
        "slug": "github-advanced-security-for-azure-devops",
        "folder": "devops"
      },
      {
        "name": "Microsoft Playwright Testing",
        "status": "Completed — awaiting review",
        "slug": "microsoft-playwright-testing",
        "folder": "devops"
      },
      {
        "name": "Github Enterprise",
        "status": "Completed — awaiting review",
        "slug": "github-enterprise",
        "folder": "devops"
      },
      {
        "name": "GitHub Advanced Security",
        "status": "Completed — awaiting review",
        "slug": "github-advanced-security",
        "folder": "devops"
      },
      {
        "name": "GitHub Copilot",
        "status": "Completed — awaiting review",
        "slug": "github-copilot",
        "folder": "devops"
      },
      {
        "name": "Azure SRE Agent",
        "status": "Completed — awaiting review",
        "slug": "azure-sre-agent",
        "folder": "devops"
      }
    ]
  },
  {
    "title": "Hybrid + multicloud",
    "folder": "hybrid-multicloud",
    "services": [
      {
        "name": "Azure Arc",
        "status": "Pending",
        "slug": "azure-arc",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure Database for PostgreSQL",
        "status": "Pending",
        "slug": "azure-database-for-postgresql",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure DevOps",
        "status": "Pending",
        "slug": "azure-devops",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure ExpressRoute",
        "status": "Pending",
        "slug": "azure-expressroute",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure IoT Edge",
        "status": "Pending",
        "slug": "azure-iot-edge",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Microsoft Sentinel",
        "status": "Pending",
        "slug": "microsoft-sentinel",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure SQL Database",
        "status": "Pending",
        "slug": "azure-sql-database",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Microsoft Defender for Cloud",
        "status": "Pending",
        "slug": "microsoft-defender-for-cloud",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure Local",
        "status": "Pending",
        "slug": "azure-local",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure Stack Hub",
        "status": "Pending",
        "slug": "azure-stack-hub",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure Stack Edge",
        "status": "Pending",
        "slug": "azure-stack-edge",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure Operator Service Manager",
        "status": "Pending",
        "slug": "azure-operator-service-manager",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure Operator Nexus",
        "status": "Pending",
        "slug": "azure-operator-nexus",
        "folder": "hybrid-multicloud"
      },
      {
        "name": "Azure Storage Mover",
        "status": "Pending",
        "slug": "azure-storage-mover",
        "folder": "hybrid-multicloud"
      }
    ]
  },
  {
    "title": "Identity",
    "folder": "identity",
    "services": [
      {
        "name": "Microsoft Entra ID (formerly Azure AD)",
        "status": "Pending",
        "slug": "microsoft-entra-id",
        "folder": "identity"
      },
      {
        "name": "Microsoft Entra Domain Services",
        "status": "Pending",
        "slug": "microsoft-entra-domain-services",
        "folder": "identity"
      },
      {
        "name": "Microsoft Entra Verified ID",
        "status": "Pending",
        "slug": "microsoft-entra-verified-id",
        "folder": "identity"
      },
      {
        "name": "Microsoft Entra External ID",
        "status": "Pending",
        "slug": "microsoft-entra-external-id",
        "folder": "identity"
      }
    ]
  },
  {
    "title": "Integration",
    "folder": "integration",
    "services": [
      {
        "name": "API Management",
        "status": "Completed — awaiting review",
        "slug": "api-management",
        "folder": "integration"
      },
      {
        "name": "Azure Health Data Services",
        "status": "Completed — awaiting review",
        "slug": "azure-health-data-services",
        "folder": "integration"
      },
      {
        "name": "Event Grid",
        "status": "Completed — awaiting review",
        "slug": "event-grid",
        "folder": "integration"
      },
      {
        "name": "Logic Apps",
        "status": "Completed — awaiting review",
        "slug": "logic-apps",
        "folder": "integration"
      },
      {
        "name": "Service Bus",
        "status": "Completed — awaiting review",
        "slug": "service-bus",
        "folder": "integration"
      },
      {
        "name": "Azure Web PubSub",
        "status": "Completed — awaiting review",
        "slug": "azure-web-pubsub",
        "folder": "integration"
      },
      {
        "name": "Microsoft Energy Data Services",
        "status": "Completed — awaiting review",
        "slug": "microsoft-energy-data-services",
        "folder": "integration"
      }
    ]
  },
  {
    "title": "Internet of Things",
    "folder": "internet-of-things",
    "services": [
      {
        "name": "API Management",
        "status": "Completed — awaiting review",
        "slug": "api-management",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure Cosmos DB",
        "status": "Completed — awaiting review",
        "slug": "azure-cosmos-db",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure Digital Twins",
        "status": "Completed — awaiting review",
        "slug": "azure-digital-twins",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure IoT Central",
        "status": "Completed — awaiting review",
        "slug": "azure-iot-central",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure IoT Edge",
        "status": "Completed — awaiting review",
        "slug": "azure-iot-edge",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure IoT Hub",
        "status": "Pending",
        "slug": "azure-iot-hub",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure IoT Operations",
        "status": "Pending",
        "slug": "azure-iot-operations",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure Functions",
        "status": "Pending",
        "slug": "azure-functions",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure Machine Learning",
        "status": "Pending",
        "slug": "azure-machine-learning",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure Maps",
        "status": "Pending",
        "slug": "azure-maps",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure Stream Analytics",
        "status": "Pending",
        "slug": "azure-stream-analytics",
        "folder": "internet-of-things"
      },
      {
        "name": "Notification Hubs",
        "status": "Pending",
        "slug": "notification-hubs",
        "folder": "internet-of-things"
      },
      {
        "name": "Windows for IoT",
        "status": "Pending",
        "slug": "windows-for-iot",
        "folder": "internet-of-things"
      },
      {
        "name": "Logic Apps",
        "status": "Pending",
        "slug": "logic-apps",
        "folder": "internet-of-things"
      },
      {
        "name": "Azure Sphere",
        "status": "Pending",
        "slug": "azure-sphere",
        "folder": "internet-of-things"
      },
      {
        "name": "Event Grid",
        "status": "Pending",
        "slug": "event-grid",
        "folder": "internet-of-things"
      }
    ]
  },
  {
    "title": "Management and governance",
    "folder": "management-and-governance",
    "services": [
      {
        "name": "Azure Copilot",
        "status": "Pending",
        "slug": "azure-copilot",
        "folder": "management-and-governance"
      },
      {
        "name": "Automation",
        "status": "Pending",
        "slug": "automation",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Advisor",
        "status": "Pending",
        "slug": "azure-advisor",
        "folder": "management-and-governance"
      },
      {
        "name": "Defender External Attack Surface Management",
        "status": "Pending",
        "slug": "defender-external-attack-surface-management",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Backup",
        "status": "Pending",
        "slug": "azure-backup",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Blueprints",
        "status": "Pending",
        "slug": "azure-blueprints",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Lighthouse",
        "status": "Pending",
        "slug": "azure-lighthouse",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Managed Applications",
        "status": "Pending",
        "slug": "azure-managed-applications",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Migrate",
        "status": "Pending",
        "slug": "azure-migrate",
        "folder": "management-and-governance"
      },
      {
        "name": "Microsoft Purview",
        "status": "Pending",
        "slug": "microsoft-purview",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Monitor",
        "status": "Pending",
        "slug": "azure-monitor",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Policy",
        "status": "Pending",
        "slug": "azure-policy",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Resource Manager",
        "status": "Pending",
        "slug": "azure-resource-manager",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Resource Manager templates",
        "status": "Pending",
        "slug": "azure-resource-manager-templates",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Chaos Studio",
        "status": "Pending",
        "slug": "azure-chaos-studio",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Site Recovery",
        "status": "Pending",
        "slug": "azure-site-recovery",
        "folder": "management-and-governance"
      },
      {
        "name": "Cloud Shell",
        "status": "Pending",
        "slug": "cloud-shell",
        "folder": "management-and-governance"
      },
      {
        "name": "Microsoft Cost Management",
        "status": "Pending",
        "slug": "microsoft-cost-management",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Managed Grafana",
        "status": "Pending",
        "slug": "azure-managed-grafana",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Network Watcher",
        "status": "Pending",
        "slug": "azure-network-watcher",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Traffic Manager",
        "status": "Pending",
        "slug": "azure-traffic-manager",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Automanage",
        "status": "Pending",
        "slug": "azure-automanage",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure Resource Mover",
        "status": "Pending",
        "slug": "azure-resource-mover",
        "folder": "management-and-governance"
      },
      {
        "name": "Update management center",
        "status": "Pending",
        "slug": "update-management-center",
        "folder": "management-and-governance"
      },
      {
        "name": "Azure SRE Agent",
        "status": "Pending",
        "slug": "azure-sre-agent",
        "folder": "management-and-governance"
      }
    ]
  },
  {
    "title": "Media",
    "folder": "media",
    "services": [
      {
        "name": "Azure Content Delivery Network",
        "status": "Pending",
        "slug": "azure-content-delivery-network",
        "folder": "media"
      }
    ]
  },
  {
    "title": "Migration",
    "folder": "migration",
    "services": [
      {
        "name": "Azure Database Migration Service",
        "status": "Pending",
        "slug": "azure-database-migration-service",
        "folder": "migration"
      },
      {
        "name": "Azure Migrate",
        "status": "Pending",
        "slug": "azure-migrate",
        "folder": "migration"
      },
      {
        "name": "Azure Site Recovery",
        "status": "Pending",
        "slug": "azure-site-recovery",
        "folder": "migration"
      },
      {
        "name": "Microsoft Cost Management",
        "status": "Pending",
        "slug": "microsoft-cost-management",
        "folder": "migration"
      },
      {
        "name": "Azure Data Box",
        "status": "Pending",
        "slug": "azure-data-box",
        "folder": "migration"
      },
      {
        "name": "Azure Storage Mover",
        "status": "Pending",
        "slug": "azure-storage-mover",
        "folder": "migration"
      }
    ]
  },
  {
    "title": "Mixed reality",
    "folder": "mixed-reality",
    "services": [
      {
        "name": "Azure Digital Twins",
        "status": "Pending",
        "slug": "azure-digital-twins",
        "folder": "mixed-reality"
      }
    ]
  },
  {
    "title": "Mobile",
    "folder": "mobile",
    "services": [
      {
        "name": "API Management",
        "status": "Pending",
        "slug": "api-management",
        "folder": "mobile"
      },
      {
        "name": "App Configuration",
        "status": "Pending",
        "slug": "app-configuration",
        "folder": "mobile"
      },
      {
        "name": "App Service",
        "status": "Pending",
        "slug": "app-service",
        "folder": "mobile"
      },
      {
        "name": "Azure AI Search",
        "status": "Pending",
        "slug": "azure-ai-search",
        "folder": "mobile"
      },
      {
        "name": "Azure Maps",
        "status": "Pending",
        "slug": "azure-maps",
        "folder": "mobile"
      },
      {
        "name": "Azure Communication Services",
        "status": "Pending",
        "slug": "azure-communication-services",
        "folder": "mobile"
      },
      {
        "name": "Notification Hubs",
        "status": "Pending",
        "slug": "notification-hubs",
        "folder": "mobile"
      }
    ]
  },
  {
    "title": "Networking",
    "folder": "networking",
    "services": [
      {
        "name": "Azure Application Gateway",
        "status": "Pending",
        "slug": "azure-application-gateway",
        "folder": "networking"
      },
      {
        "name": "Azure Bastion",
        "status": "Pending",
        "slug": "azure-bastion",
        "folder": "networking"
      },
      {
        "name": "Azure DDoS Protection",
        "status": "Pending",
        "slug": "azure-ddos-protection",
        "folder": "networking"
      },
      {
        "name": "Azure DNS",
        "status": "Pending",
        "slug": "azure-dns",
        "folder": "networking"
      },
      {
        "name": "Azure ExpressRoute",
        "status": "Pending",
        "slug": "azure-expressroute",
        "folder": "networking"
      },
      {
        "name": "Azure Firewall",
        "status": "Pending",
        "slug": "azure-firewall",
        "folder": "networking"
      },
      {
        "name": "Azure Content Delivery Network",
        "status": "Pending",
        "slug": "azure-content-delivery-network",
        "folder": "networking"
      },
      {
        "name": "Azure Route Server",
        "status": "Pending",
        "slug": "azure-route-server",
        "folder": "networking"
      },
      {
        "name": "Azure Web Application Firewall",
        "status": "Pending",
        "slug": "azure-web-application-firewall",
        "folder": "networking"
      },
      {
        "name": "Azure Front Door",
        "status": "Pending",
        "slug": "azure-front-door",
        "folder": "networking"
      },
      {
        "name": "Azure Network Function Manager",
        "status": "Pending",
        "slug": "azure-network-function-manager",
        "folder": "networking"
      },
      {
        "name": "Azure Virtual Network Manager",
        "status": "Pending",
        "slug": "azure-virtual-network-manager",
        "folder": "networking"
      },
      {
        "name": "Azure NAT Gateway",
        "status": "Pending",
        "slug": "azure-nat-gateway",
        "folder": "networking"
      },
      {
        "name": "Azure Load Balancer",
        "status": "Pending",
        "slug": "azure-load-balancer",
        "folder": "networking"
      },
      {
        "name": "Azure Private Link",
        "status": "Pending",
        "slug": "azure-private-link",
        "folder": "networking"
      },
      {
        "name": "Azure Firewall Manager",
        "status": "Pending",
        "slug": "azure-firewall-manager",
        "folder": "networking"
      },
      {
        "name": "Azure Network Watcher",
        "status": "Pending",
        "slug": "azure-network-watcher",
        "folder": "networking"
      },
      {
        "name": "Azure Traffic Manager",
        "status": "Pending",
        "slug": "azure-traffic-manager",
        "folder": "networking"
      },
      {
        "name": "Azure Virtual Network",
        "status": "Pending",
        "slug": "azure-virtual-network",
        "folder": "networking"
      },
      {
        "name": "Azure Virtual WAN",
        "status": "Pending",
        "slug": "azure-virtual-wan",
        "folder": "networking"
      },
      {
        "name": "Azure VPN Gateway",
        "status": "Pending",
        "slug": "azure-vpn-gateway",
        "folder": "networking"
      },
      {
        "name": "Azure Enclave",
        "status": "Pending",
        "slug": "azure-enclave",
        "folder": "networking"
      },
      {
        "name": "Azure Multicloud Interconnect",
        "status": "Pending",
        "slug": "azure-multicloud-interconnect",
        "folder": "networking"
      }
    ]
  },
  {
    "title": "Security",
    "folder": "security",
    "services": [
      {
        "name": "Azure App Configuration",
        "status": "Pending",
        "slug": "azure-app-configuration",
        "folder": "security"
      },
      {
        "name": "Azure Application Gateway",
        "status": "Pending",
        "slug": "azure-application-gateway",
        "folder": "security"
      },
      {
        "name": "Microsoft Entra Domain Services",
        "status": "Pending",
        "slug": "microsoft-entra-domain-services",
        "folder": "security"
      },
      {
        "name": "Microsoft Defender for Cloud",
        "status": "Pending",
        "slug": "microsoft-defender-for-cloud",
        "folder": "security"
      },
      {
        "name": "Microsoft Defender External Attack Surface Management",
        "status": "Pending",
        "slug": "microsoft-defender-external-attack-surface-management",
        "folder": "security"
      },
      {
        "name": "Azure Bastion",
        "status": "Pending",
        "slug": "azure-bastion",
        "folder": "security"
      },
      {
        "name": "Azure DDoS Protection",
        "status": "Pending",
        "slug": "azure-ddos-protection",
        "folder": "security"
      },
      {
        "name": "Azure Cloud HSM",
        "status": "Pending",
        "slug": "azure-cloud-hsm",
        "folder": "security"
      },
      {
        "name": "Azure Firewall",
        "status": "Pending",
        "slug": "azure-firewall",
        "folder": "security"
      },
      {
        "name": "Azure Firewall Manager",
        "status": "Pending",
        "slug": "azure-firewall-manager",
        "folder": "security"
      },
      {
        "name": "Azure Front Door",
        "status": "Pending",
        "slug": "azure-front-door",
        "folder": "security"
      },
      {
        "name": "Azure Information Protection",
        "status": "Pending",
        "slug": "azure-information-protection",
        "folder": "security"
      },
      {
        "name": "Microsoft Sentinel",
        "status": "Pending",
        "slug": "microsoft-sentinel",
        "folder": "security"
      },
      {
        "name": "Azure Key Vault",
        "status": "Pending",
        "slug": "azure-key-vault",
        "folder": "security"
      },
      {
        "name": "Azure confidential ledger",
        "status": "Pending",
        "slug": "azure-confidential-ledger",
        "folder": "security"
      },
      {
        "name": "Azure VPN Gateway",
        "status": "Pending",
        "slug": "azure-vpn-gateway",
        "folder": "security"
      },
      {
        "name": "Azure Web Application Firewall",
        "status": "Pending",
        "slug": "azure-web-application-firewall",
        "folder": "security"
      },
      {
        "name": "Microsoft Azure Attestation",
        "status": "Pending",
        "slug": "microsoft-azure-attestation",
        "folder": "security"
      },
      {
        "name": "Microsoft Security Copilot",
        "status": "Pending",
        "slug": "microsoft-security-copilot",
        "folder": "security"
      }
    ]
  },
  {
    "title": "Storage",
    "folder": "storage",
    "services": [
      {
        "name": "Archive Storage",
        "status": "Pending",
        "slug": "archive-storage",
        "folder": "storage"
      },
      {
        "name": "Azure Managed Lustre",
        "status": "Pending",
        "slug": "azure-managed-lustre",
        "folder": "storage"
      },
      {
        "name": "Azure Backup",
        "status": "Pending",
        "slug": "azure-backup",
        "folder": "storage"
      },
      {
        "name": "Azure Data Lake Storage",
        "status": "Pending",
        "slug": "azure-data-lake-storage",
        "folder": "storage"
      },
      {
        "name": "Azure Data Share",
        "status": "Pending",
        "slug": "azure-data-share",
        "folder": "storage"
      },
      {
        "name": "Azure Files",
        "status": "Pending",
        "slug": "azure-files",
        "folder": "storage"
      },
      {
        "name": "Azure Storage Actions",
        "status": "Pending",
        "slug": "azure-storage-actions",
        "folder": "storage"
      },
      {
        "name": "Azure NetApp Files",
        "status": "Pending",
        "slug": "azure-netapp-files",
        "folder": "storage"
      },
      {
        "name": "Azure Blob Storage",
        "status": "Pending",
        "slug": "azure-blob-storage",
        "folder": "storage"
      },
      {
        "name": "Azure Data Box",
        "status": "Pending",
        "slug": "azure-data-box",
        "folder": "storage"
      },
      {
        "name": "Azure Disk Storage",
        "status": "Pending",
        "slug": "azure-disk-storage",
        "folder": "storage"
      },
      {
        "name": "Azure confidential ledger",
        "status": "Pending",
        "slug": "azure-confidential-ledger",
        "folder": "storage"
      },
      {
        "name": "Azure Elastic SAN",
        "status": "Pending",
        "slug": "azure-elastic-san",
        "folder": "storage"
      },
      {
        "name": "Queue Storage",
        "status": "Pending",
        "slug": "queue-storage",
        "folder": "storage"
      },
      {
        "name": "Storage Accounts",
        "status": "Pending",
        "slug": "storage-accounts",
        "folder": "storage"
      },
      {
        "name": "Storage Explorer",
        "status": "Pending",
        "slug": "storage-explorer",
        "folder": "storage"
      },
      {
        "name": "Azure Container Storage",
        "status": "Pending",
        "slug": "azure-container-storage",
        "folder": "storage"
      },
      {
        "name": "Azure Storage Discovery",
        "status": "Pending",
        "slug": "azure-storage-discovery",
        "folder": "storage"
      },
      {
        "name": "Azure Storage Mover",
        "status": "Pending",
        "slug": "azure-storage-mover",
        "folder": "storage"
      }
    ]
  },
  {
    "title": "Virtual desktop infrastructure",
    "folder": "virtual-desktop-infrastructure",
    "services": [
      {
        "name": "Azure Lab Services",
        "status": "Pending",
        "slug": "azure-lab-services",
        "folder": "virtual-desktop-infrastructure"
      },
      {
        "name": "Azure Virtual Desktop",
        "status": "Pending",
        "slug": "azure-virtual-desktop",
        "folder": "virtual-desktop-infrastructure"
      },
      {
        "name": "Microsoft Dev Box",
        "status": "Pending",
        "slug": "microsoft-dev-box",
        "folder": "virtual-desktop-infrastructure"
      }
    ]
  },
  {
    "title": "Web",
    "folder": "web",
    "services": [
      {
        "name": "API Management",
        "status": "Pending",
        "slug": "api-management",
        "folder": "web"
      },
      {
        "name": "App Configuration",
        "status": "Pending",
        "slug": "app-configuration",
        "folder": "web"
      },
      {
        "name": "App Service",
        "status": "Pending",
        "slug": "app-service",
        "folder": "web"
      },
      {
        "name": "Azure AI Search",
        "status": "Pending",
        "slug": "azure-ai-search",
        "folder": "web"
      },
      {
        "name": "Azure Maps",
        "status": "Pending",
        "slug": "azure-maps",
        "folder": "web"
      },
      {
        "name": "Azure SignalR Service",
        "status": "Pending",
        "slug": "azure-signalr-service",
        "folder": "web"
      },
      {
        "name": "Azure Content Delivery Network",
        "status": "Pending",
        "slug": "azure-content-delivery-network",
        "folder": "web"
      },
      {
        "name": "Notification Hubs",
        "status": "Pending",
        "slug": "notification-hubs",
        "folder": "web"
      },
      {
        "name": "Static Web Apps",
        "status": "Pending",
        "slug": "static-web-apps",
        "folder": "web"
      },
      {
        "name": "Azure Communication Services",
        "status": "Pending",
        "slug": "azure-communication-services",
        "folder": "web"
      }
    ]
  }
];

export const azureUniqueServices = [{"name":"Microsoft Foundry","status":"Completed — awaiting review","slug":"microsoft-foundry","folder":"ai-machine-learning"},{"name":"Azure AI Bot Service","status":"Completed — awaiting review","slug":"azure-ai-bot-service","folder":"ai-machine-learning"},{"name":"Azure AI Search","status":"Pending","slug":"azure-ai-search","folder":"web"},{"name":"Azure Databricks","status":"Completed — awaiting review","slug":"azure-databricks","folder":"analytics"},{"name":"Azure Machine Learning","status":"Pending","slug":"azure-machine-learning","folder":"internet-of-things"},{"name":"Azure Open Datasets","status":"Completed — awaiting review","slug":"azure-open-datasets","folder":"ai-machine-learning"},{"name":"Foundry Tools","status":"Completed — awaiting review","slug":"foundry-tools","folder":"ai-machine-learning"},{"name":"Azure AI Video Indexer","status":"Completed — awaiting review","slug":"azure-ai-video-indexer","folder":"ai-machine-learning"},{"name":"Azure AI Custom Vision","status":"Completed — awaiting review","slug":"azure-ai-custom-vision","folder":"ai-machine-learning"},{"name":"Data Science Virtual Machines","status":"Completed — awaiting review","slug":"data-science-virtual-machines","folder":"ai-machine-learning"},{"name":"Azure Language in Foundry Tools","status":"Completed — awaiting review","slug":"azure-language-in-foundry-tools","folder":"ai-machine-learning"},{"name":"Azure Translator in Foundry Tools","status":"Completed — awaiting review","slug":"azure-translator-in-foundry-tools","folder":"ai-machine-learning"},{"name":"Azure OpenAI in Foundry Models","status":"Completed — awaiting review","slug":"azure-openai-in-foundry-models","folder":"ai-machine-learning"},{"name":"Content Safety in Foundry Control Plane","status":"Completed — awaiting review","slug":"content-safety-in-foundry-control-plane","folder":"ai-machine-learning"},{"name":"Health Bot","status":"Completed — awaiting review","slug":"health-bot","folder":"ai-machine-learning"},{"name":"Azure Document Intelligence in Foundry Tools","status":"Completed — awaiting review","slug":"azure-document-intelligence-in-foundry-tools","folder":"ai-machine-learning"},{"name":"AI Anomaly Detector","status":"Completed — awaiting review","slug":"ai-anomaly-detector","folder":"ai-machine-learning"},{"name":"Foundry Models","status":"Completed — awaiting review","slug":"foundry-models","folder":"ai-machine-learning"},{"name":"Microsoft Security Copilot","status":"Pending","slug":"microsoft-security-copilot","folder":"security"},{"name":"Azure AI Immersive Reader","status":"Completed — awaiting review","slug":"azure-ai-immersive-reader","folder":"ai-machine-learning"},{"name":"Phi open models","status":"Completed — awaiting review","slug":"phi-open-models","folder":"ai-machine-learning"},{"name":"Azure Content Understanding in Foundry Tools","status":"Completed — awaiting review","slug":"azure-content-understanding-in-foundry-tools","folder":"ai-machine-learning"},{"name":"Azure Speech in Foundry Tools","status":"Completed — awaiting review","slug":"azure-speech-in-foundry-tools","folder":"ai-machine-learning"},{"name":"Microsoft Planetary Computer Pro","status":"Completed — awaiting review","slug":"microsoft-planetary-computer-pro","folder":"analytics"},{"name":"Foundry Agent Service","status":"Completed — awaiting review","slug":"foundry-agent-service","folder":"ai-machine-learning"},{"name":"Azure SRE Agent","status":"Pending","slug":"azure-sre-agent","folder":"management-and-governance"},{"name":"Observability in Foundry Control Plane","status":"Completed — awaiting review","slug":"observability-in-foundry-control-plane","folder":"ai-machine-learning"},{"name":"Azure Vision in Foundry Tools","status":"Completed — awaiting review","slug":"azure-vision-in-foundry-tools","folder":"ai-machine-learning"},{"name":"Foundry IQ","status":"Completed — awaiting review","slug":"foundry-iq","folder":"ai-machine-learning"},{"name":"Foundry Control Plane","status":"Completed — awaiting review","slug":"foundry-control-plane","folder":"ai-machine-learning"},{"name":"Azure Analysis Services","status":"Completed — awaiting review","slug":"azure-analysis-services","folder":"analytics"},{"name":"Azure Data Explorer","status":"Completed — awaiting review","slug":"azure-data-explorer","folder":"databases"},{"name":"Azure Data Factory","status":"Completed — awaiting review","slug":"azure-data-factory","folder":"analytics"},{"name":"Azure Data Lake Storage","status":"Pending","slug":"azure-data-lake-storage","folder":"storage"},{"name":"Azure Data Share","status":"Pending","slug":"azure-data-share","folder":"storage"},{"name":"Azure Stream Analytics","status":"Pending","slug":"azure-stream-analytics","folder":"internet-of-things"},{"name":"Azure Synapse Analytics","status":"Completed — awaiting review","slug":"azure-synapse-analytics","folder":"databases"},{"name":"Data Catalog","status":"Completed — awaiting review","slug":"data-catalog","folder":"analytics"},{"name":"Data Lake Analytics","status":"Completed — awaiting review","slug":"data-lake-analytics","folder":"analytics"},{"name":"Event Hubs","status":"Completed — awaiting review","slug":"event-hubs","folder":"analytics"},{"name":"HDInsight","status":"Completed — awaiting review","slug":"hdinsight","folder":"analytics"},{"name":"Power BI Embedded","status":"Completed — awaiting review","slug":"power-bi-embedded","folder":"analytics"},{"name":"Microsoft Graph Data Connect","status":"Completed — awaiting review","slug":"microsoft-graph-data-connect","folder":"analytics"},{"name":"Azure Chaos Studio","status":"Pending","slug":"azure-chaos-studio","folder":"management-and-governance"},{"name":"Microsoft Fabric","status":"Completed — awaiting review","slug":"microsoft-fabric","folder":"analytics"},{"name":"Microsoft Purview","status":"Pending","slug":"microsoft-purview","folder":"management-and-governance"},{"name":"Power BI","status":"Completed — awaiting review","slug":"power-bi","folder":"analytics"},{"name":"App Service","status":"Pending","slug":"app-service","folder":"web"},{"name":"Azure Compute Fleet","status":"Completed — awaiting review","slug":"azure-compute-fleet","folder":"compute"},{"name":"Azure Quantum","status":"Completed — awaiting review","slug":"azure-quantum","folder":"compute"},{"name":"Azure Spot Virtual Machines","status":"Completed — awaiting review","slug":"azure-spot-virtual-machines","folder":"compute"},{"name":"Azure Spring Apps","status":"Completed — awaiting review","slug":"azure-spring-apps","folder":"compute"},{"name":"Azure VMware Solution","status":"Completed — awaiting review","slug":"azure-vmware-solution","folder":"compute"},{"name":"Batch","status":"Completed — awaiting review","slug":"batch","folder":"compute"},{"name":"Cloud Services","status":"Completed — awaiting review","slug":"cloud-services","folder":"compute"},{"name":"Linux Virtual Machines","status":"Completed — awaiting review","slug":"linux-virtual-machines","folder":"compute"},{"name":"SQL Server on Azure Virtual Machines","status":"Completed — awaiting review","slug":"sql-server-on-azure-virtual-machines","folder":"compute"},{"name":"Static Web Apps","status":"Pending","slug":"static-web-apps","folder":"web"},{"name":"Virtual Machine Scale Sets","status":"Completed — awaiting review","slug":"virtual-machine-scale-sets","folder":"compute"},{"name":"Virtual Machines","status":"Completed — awaiting review","slug":"virtual-machines","folder":"compute"},{"name":"Azure Virtual Desktop","status":"Pending","slug":"azure-virtual-desktop","folder":"virtual-desktop-infrastructure"},{"name":"Windows Server","status":"Completed — awaiting review","slug":"windows-server","folder":"compute"},{"name":"Azure Dedicated Host","status":"Completed — awaiting review","slug":"azure-dedicated-host","folder":"compute"},{"name":"Azure VM Image Builder","status":"Completed — awaiting review","slug":"azure-vm-image-builder","folder":"compute"},{"name":"Azure Kubernetes Service (AKS)","status":"Completed — awaiting review","slug":"azure-kubernetes-service","folder":"containers"},{"name":"Azure Functions","status":"Pending","slug":"azure-functions","folder":"internet-of-things"},{"name":"Azure Container Instances","status":"Completed — awaiting review","slug":"azure-container-instances","folder":"containers"},{"name":"Azure Container Apps","status":"Completed — awaiting review","slug":"azure-container-apps","folder":"containers"},{"name":"Nutanix Cloud Clusters","status":"Completed — awaiting review","slug":"nutanix-cloud-clusters","folder":"compute"},{"name":"Azure Container Registry","status":"Completed — awaiting review","slug":"azure-container-registry","folder":"containers"},{"name":"Azure Container Storage","status":"Pending","slug":"azure-container-storage","folder":"storage"},{"name":"Azure Linux","status":"Completed — awaiting review","slug":"azure-linux","folder":"containers"},{"name":"Azure Red Hat OpenShift","status":"Completed — awaiting review","slug":"azure-red-hat-openshift","folder":"containers"},{"name":"Azure Service Fabric","status":"Completed — awaiting review","slug":"azure-service-fabric","folder":"containers"},{"name":"Azure Kubernetes Fleet Manager","status":"Completed — awaiting review","slug":"azure-kubernetes-fleet-manager","folder":"containers"},{"name":"Azure Cosmos DB","status":"Completed — awaiting review","slug":"azure-cosmos-db","folder":"internet-of-things"},{"name":"Azure Database for PostgreSQL","status":"Pending","slug":"azure-database-for-postgresql","folder":"hybrid-multicloud"},{"name":"Azure Database for MySQL","status":"Completed — awaiting review","slug":"azure-database-for-mysql","folder":"databases"},{"name":"Azure SQL Database","status":"Pending","slug":"azure-sql-database","folder":"hybrid-multicloud"},{"name":"Azure SQL Managed Instance","status":"Completed — awaiting review","slug":"azure-sql-managed-instance","folder":"databases"},{"name":"Azure Cache for Redis","status":"Completed — awaiting review","slug":"azure-cache-for-redis","folder":"databases"},{"name":"Azure Managed Redis","status":"Completed — awaiting review","slug":"azure-managed-redis","folder":"databases"},{"name":"Azure Database for MariaDB","status":"Completed — awaiting review","slug":"azure-database-for-mariadb","folder":"databases"},{"name":"Azure Database Migration Service","status":"Pending","slug":"azure-database-migration-service","folder":"migration"},{"name":"Azure Database for PostgreSQL Flexible Server","status":"Completed — awaiting review","slug":"azure-database-for-postgresql-flexible-server","folder":"databases"},{"name":"Azure Database for MySQL Flexible Server","status":"Completed — awaiting review","slug":"azure-database-for-mysql-flexible-server","folder":"databases"},{"name":"Azure Table Storage","status":"Completed — awaiting review","slug":"azure-table-storage","folder":"databases"},{"name":"Azure confidential ledger","status":"Pending","slug":"azure-confidential-ledger","folder":"storage"},{"name":"App Configuration","status":"Pending","slug":"app-configuration","folder":"web"},{"name":"Azure DevOps","status":"Pending","slug":"azure-devops","folder":"hybrid-multicloud"},{"name":"Azure DevTest Labs","status":"Completed — awaiting review","slug":"azure-devtest-labs","folder":"devops"},{"name":"Azure Pipelines","status":"Completed — awaiting review","slug":"azure-pipelines","folder":"devops"},{"name":"SDKs","status":"Completed — awaiting review","slug":"sdks","folder":"developer-tools"},{"name":"Visual Studio","status":"Completed — awaiting review","slug":"visual-studio","folder":"developer-tools"},{"name":"Visual Studio Code","status":"Completed — awaiting review","slug":"visual-studio-code","folder":"developer-tools"},{"name":"Azure App Testing","status":"Completed — awaiting review","slug":"azure-app-testing","folder":"devops"},{"name":"Microsoft Dev Box","status":"Pending","slug":"microsoft-dev-box","folder":"virtual-desktop-infrastructure"},{"name":"Azure Deployment Environments","status":"Completed — awaiting review","slug":"azure-deployment-environments","folder":"devops"},{"name":"Microsoft Playwright Testing","status":"Completed — awaiting review","slug":"microsoft-playwright-testing","folder":"devops"},{"name":"Artifact Signing","status":"Completed — awaiting review","slug":"artifact-signing","folder":"developer-tools"},{"name":"Azure Artifacts","status":"Completed — awaiting review","slug":"azure-artifacts","folder":"devops"},{"name":"Azure Boards","status":"Completed — awaiting review","slug":"azure-boards","folder":"devops"},{"name":"Azure Monitor","status":"Pending","slug":"azure-monitor","folder":"management-and-governance"},{"name":"Azure Repos","status":"Completed — awaiting review","slug":"azure-repos","folder":"devops"},{"name":"Azure Test Plans","status":"Completed — awaiting review","slug":"azure-test-plans","folder":"devops"},{"name":"DevOps tool integrations","status":"Completed — awaiting review","slug":"devops-tool-integrations","folder":"devops"},{"name":"Azure Managed Grafana","status":"Pending","slug":"azure-managed-grafana","folder":"management-and-governance"},{"name":"GitHub Advanced Security for Azure DevOps","status":"Completed — awaiting review","slug":"github-advanced-security-for-azure-devops","folder":"devops"},{"name":"Github Enterprise","status":"Completed — awaiting review","slug":"github-enterprise","folder":"devops"},{"name":"GitHub Advanced Security","status":"Completed — awaiting review","slug":"github-advanced-security","folder":"devops"},{"name":"GitHub Copilot","status":"Completed — awaiting review","slug":"github-copilot","folder":"devops"},{"name":"Azure Arc","status":"Pending","slug":"azure-arc","folder":"hybrid-multicloud"},{"name":"Azure ExpressRoute","status":"Pending","slug":"azure-expressroute","folder":"networking"},{"name":"Azure IoT Edge","status":"Completed — awaiting review","slug":"azure-iot-edge","folder":"internet-of-things"},{"name":"Microsoft Sentinel","status":"Pending","slug":"microsoft-sentinel","folder":"security"},{"name":"Microsoft Defender for Cloud","status":"Pending","slug":"microsoft-defender-for-cloud","folder":"security"},{"name":"Azure Local","status":"Pending","slug":"azure-local","folder":"hybrid-multicloud"},{"name":"Azure Stack Hub","status":"Pending","slug":"azure-stack-hub","folder":"hybrid-multicloud"},{"name":"Azure Stack Edge","status":"Pending","slug":"azure-stack-edge","folder":"hybrid-multicloud"},{"name":"Azure Operator Service Manager","status":"Pending","slug":"azure-operator-service-manager","folder":"hybrid-multicloud"},{"name":"Azure Operator Nexus","status":"Pending","slug":"azure-operator-nexus","folder":"hybrid-multicloud"},{"name":"Azure Storage Mover","status":"Pending","slug":"azure-storage-mover","folder":"storage"},{"name":"Microsoft Entra ID (formerly Azure AD)","status":"Pending","slug":"microsoft-entra-id","folder":"identity"},{"name":"Microsoft Entra Domain Services","status":"Pending","slug":"microsoft-entra-domain-services","folder":"security"},{"name":"Microsoft Entra Verified ID","status":"Pending","slug":"microsoft-entra-verified-id","folder":"identity"},{"name":"Microsoft Entra External ID","status":"Pending","slug":"microsoft-entra-external-id","folder":"identity"},{"name":"API Management","status":"Pending","slug":"api-management","folder":"web"},{"name":"Azure Health Data Services","status":"Completed — awaiting review","slug":"azure-health-data-services","folder":"integration"},{"name":"Event Grid","status":"Pending","slug":"event-grid","folder":"internet-of-things"},{"name":"Logic Apps","status":"Pending","slug":"logic-apps","folder":"internet-of-things"},{"name":"Service Bus","status":"Completed — awaiting review","slug":"service-bus","folder":"integration"},{"name":"Azure Web PubSub","status":"Completed — awaiting review","slug":"azure-web-pubsub","folder":"integration"},{"name":"Microsoft Energy Data Services","status":"Completed — awaiting review","slug":"microsoft-energy-data-services","folder":"integration"},{"name":"Azure Digital Twins","status":"Pending","slug":"azure-digital-twins","folder":"mixed-reality"},{"name":"Azure IoT Central","status":"Completed — awaiting review","slug":"azure-iot-central","folder":"internet-of-things"},{"name":"Azure IoT Hub","status":"Pending","slug":"azure-iot-hub","folder":"internet-of-things"},{"name":"Azure IoT Operations","status":"Pending","slug":"azure-iot-operations","folder":"internet-of-things"},{"name":"Azure Maps","status":"Pending","slug":"azure-maps","folder":"web"},{"name":"Notification Hubs","status":"Pending","slug":"notification-hubs","folder":"web"},{"name":"Windows for IoT","status":"Pending","slug":"windows-for-iot","folder":"internet-of-things"},{"name":"Azure Sphere","status":"Pending","slug":"azure-sphere","folder":"internet-of-things"},{"name":"Azure Copilot","status":"Pending","slug":"azure-copilot","folder":"management-and-governance"},{"name":"Automation","status":"Pending","slug":"automation","folder":"management-and-governance"},{"name":"Azure Advisor","status":"Pending","slug":"azure-advisor","folder":"management-and-governance"},{"name":"Defender External Attack Surface Management","status":"Pending","slug":"defender-external-attack-surface-management","folder":"management-and-governance"},{"name":"Azure Backup","status":"Pending","slug":"azure-backup","folder":"storage"},{"name":"Azure Blueprints","status":"Pending","slug":"azure-blueprints","folder":"management-and-governance"},{"name":"Azure Lighthouse","status":"Pending","slug":"azure-lighthouse","folder":"management-and-governance"},{"name":"Azure Managed Applications","status":"Pending","slug":"azure-managed-applications","folder":"management-and-governance"},{"name":"Azure Migrate","status":"Pending","slug":"azure-migrate","folder":"migration"},{"name":"Azure Policy","status":"Pending","slug":"azure-policy","folder":"management-and-governance"},{"name":"Azure Resource Manager","status":"Pending","slug":"azure-resource-manager","folder":"management-and-governance"},{"name":"Azure Resource Manager templates","status":"Pending","slug":"azure-resource-manager-templates","folder":"management-and-governance"},{"name":"Azure Site Recovery","status":"Pending","slug":"azure-site-recovery","folder":"migration"},{"name":"Cloud Shell","status":"Pending","slug":"cloud-shell","folder":"management-and-governance"},{"name":"Microsoft Cost Management","status":"Pending","slug":"microsoft-cost-management","folder":"migration"},{"name":"Azure Network Watcher","status":"Pending","slug":"azure-network-watcher","folder":"networking"},{"name":"Azure Traffic Manager","status":"Pending","slug":"azure-traffic-manager","folder":"networking"},{"name":"Azure Automanage","status":"Pending","slug":"azure-automanage","folder":"management-and-governance"},{"name":"Azure Resource Mover","status":"Pending","slug":"azure-resource-mover","folder":"management-and-governance"},{"name":"Update management center","status":"Pending","slug":"update-management-center","folder":"management-and-governance"},{"name":"Azure Content Delivery Network","status":"Pending","slug":"azure-content-delivery-network","folder":"web"},{"name":"Azure Data Box","status":"Pending","slug":"azure-data-box","folder":"storage"},{"name":"Azure Communication Services","status":"Pending","slug":"azure-communication-services","folder":"web"},{"name":"Azure Application Gateway","status":"Pending","slug":"azure-application-gateway","folder":"security"},{"name":"Azure Bastion","status":"Pending","slug":"azure-bastion","folder":"security"},{"name":"Azure DDoS Protection","status":"Pending","slug":"azure-ddos-protection","folder":"security"},{"name":"Azure DNS","status":"Pending","slug":"azure-dns","folder":"networking"},{"name":"Azure Firewall","status":"Pending","slug":"azure-firewall","folder":"security"},{"name":"Azure Route Server","status":"Pending","slug":"azure-route-server","folder":"networking"},{"name":"Azure Web Application Firewall","status":"Pending","slug":"azure-web-application-firewall","folder":"security"},{"name":"Azure Front Door","status":"Pending","slug":"azure-front-door","folder":"security"},{"name":"Azure Network Function Manager","status":"Pending","slug":"azure-network-function-manager","folder":"networking"},{"name":"Azure Virtual Network Manager","status":"Pending","slug":"azure-virtual-network-manager","folder":"networking"},{"name":"Azure NAT Gateway","status":"Pending","slug":"azure-nat-gateway","folder":"networking"},{"name":"Azure Load Balancer","status":"Pending","slug":"azure-load-balancer","folder":"networking"},{"name":"Azure Private Link","status":"Pending","slug":"azure-private-link","folder":"networking"},{"name":"Azure Firewall Manager","status":"Pending","slug":"azure-firewall-manager","folder":"security"},{"name":"Azure Virtual Network","status":"Pending","slug":"azure-virtual-network","folder":"networking"},{"name":"Azure Virtual WAN","status":"Pending","slug":"azure-virtual-wan","folder":"networking"},{"name":"Azure VPN Gateway","status":"Pending","slug":"azure-vpn-gateway","folder":"security"},{"name":"Azure Enclave","status":"Pending","slug":"azure-enclave","folder":"networking"},{"name":"Azure Multicloud Interconnect","status":"Pending","slug":"azure-multicloud-interconnect","folder":"networking"},{"name":"Azure App Configuration","status":"Pending","slug":"azure-app-configuration","folder":"security"},{"name":"Microsoft Defender External Attack Surface Management","status":"Pending","slug":"microsoft-defender-external-attack-surface-management","folder":"security"},{"name":"Azure Cloud HSM","status":"Pending","slug":"azure-cloud-hsm","folder":"security"},{"name":"Azure Information Protection","status":"Pending","slug":"azure-information-protection","folder":"security"},{"name":"Azure Key Vault","status":"Pending","slug":"azure-key-vault","folder":"security"},{"name":"Microsoft Azure Attestation","status":"Pending","slug":"microsoft-azure-attestation","folder":"security"},{"name":"Archive Storage","status":"Pending","slug":"archive-storage","folder":"storage"},{"name":"Azure Managed Lustre","status":"Pending","slug":"azure-managed-lustre","folder":"storage"},{"name":"Azure Files","status":"Pending","slug":"azure-files","folder":"storage"},{"name":"Azure Storage Actions","status":"Pending","slug":"azure-storage-actions","folder":"storage"},{"name":"Azure NetApp Files","status":"Pending","slug":"azure-netapp-files","folder":"storage"},{"name":"Azure Blob Storage","status":"Pending","slug":"azure-blob-storage","folder":"storage"},{"name":"Azure Disk Storage","status":"Pending","slug":"azure-disk-storage","folder":"storage"},{"name":"Azure Elastic SAN","status":"Pending","slug":"azure-elastic-san","folder":"storage"},{"name":"Queue Storage","status":"Pending","slug":"queue-storage","folder":"storage"},{"name":"Storage Accounts","status":"Pending","slug":"storage-accounts","folder":"storage"},{"name":"Storage Explorer","status":"Pending","slug":"storage-explorer","folder":"storage"},{"name":"Azure Storage Discovery","status":"Pending","slug":"azure-storage-discovery","folder":"storage"},{"name":"Azure Lab Services","status":"Pending","slug":"azure-lab-services","folder":"virtual-desktop-infrastructure"},{"name":"Azure SignalR Service","status":"Pending","slug":"azure-signalr-service","folder":"web"}];
