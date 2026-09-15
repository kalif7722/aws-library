export type AzureService = { name: string; status: string; slug: string };
export type AzureBranch = { title: string; services: AzureService[] };

export const azureBranches: AzureBranch[] = [
  {
    "title": "AI + machine learning",
    "services": [
      {
        "name": "Microsoft Foundry",
        "status": "Completed — awaiting review",
        "slug": "microsoft-foundry"
      },
      {
        "name": "Azure AI Bot Service",
        "status": "Completed — awaiting review",
        "slug": "azure-ai-bot-service"
      },
      {
        "name": "Azure AI Search",
        "status": "Completed — awaiting review",
        "slug": "azure-ai-search"
      },
      {
        "name": "Azure Databricks",
        "status": "Completed — awaiting review",
        "slug": "azure-databricks"
      },
      {
        "name": "Azure Machine Learning",
        "status": "Completed — awaiting review",
        "slug": "azure-machine-learning"
      },
      {
        "name": "Azure Open Datasets",
        "status": "Completed — awaiting review",
        "slug": "azure-open-datasets"
      },
      {
        "name": "Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "foundry-tools"
      },
      {
        "name": "Azure AI Video Indexer",
        "status": "Completed — awaiting review",
        "slug": "azure-ai-video-indexer"
      },
      {
        "name": "Azure AI Custom Vision",
        "status": "Completed — awaiting review",
        "slug": "azure-ai-custom-vision"
      },
      {
        "name": "Data Science Virtual Machines",
        "status": "Completed — awaiting review",
        "slug": "data-science-virtual-machines"
      },
      {
        "name": "Azure Language in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-language-in-foundry-tools"
      },
      {
        "name": "Azure Translator in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-translator-in-foundry-tools"
      },
      {
        "name": "Azure OpenAI in Foundry Models",
        "status": "Completed — awaiting review",
        "slug": "azure-openai-in-foundry-models"
      },
      {
        "name": "Content Safety in Foundry Control Plane",
        "status": "Completed — awaiting review",
        "slug": "content-safety-in-foundry-control-plane"
      },
      {
        "name": "Health Bot",
        "status": "Completed — awaiting review",
        "slug": "health-bot"
      },
      {
        "name": "Azure Document Intelligence in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-document-intelligence-in-foundry-tools"
      },
      {
        "name": "AI Anomaly Detector",
        "status": "Completed — awaiting review",
        "slug": "ai-anomaly-detector"
      },
      {
        "name": "Foundry Models",
        "status": "Completed — awaiting review",
        "slug": "foundry-models"
      },
      {
        "name": "Microsoft Security Copilot",
        "status": "Completed — awaiting review",
        "slug": "microsoft-security-copilot"
      },
      {
        "name": "Azure AI Immersive Reader",
        "status": "Completed — awaiting review",
        "slug": "azure-ai-immersive-reader"
      },
      {
        "name": "Phi open models",
        "status": "Completed — awaiting review",
        "slug": "phi-open-models"
      },
      {
        "name": "Azure Content Understanding in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-content-understanding-in-foundry-tools"
      },
      {
        "name": "Azure Speech in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-speech-in-foundry-tools"
      },
      {
        "name": "Microsoft Planetary Computer Pro",
        "status": "Completed — awaiting review",
        "slug": "microsoft-planetary-computer-pro"
      },
      {
        "name": "Foundry Agent Service",
        "status": "Completed — awaiting review",
        "slug": "foundry-agent-service"
      },
      {
        "name": "Azure SRE Agent",
        "status": "Completed — awaiting review",
        "slug": "azure-sre-agent"
      },
      {
        "name": "Observability in Foundry Control Plane",
        "status": "Completed — awaiting review",
        "slug": "observability-in-foundry-control-plane"
      },
      {
        "name": "Azure Vision in Foundry Tools",
        "status": "Completed — awaiting review",
        "slug": "azure-vision-in-foundry-tools"
      },
      {
        "name": "Foundry IQ",
        "status": "Completed — awaiting review",
        "slug": "foundry-iq"
      },
      {
        "name": "Foundry Control Plane",
        "status": "Completed — awaiting review",
        "slug": "foundry-control-plane"
      }
    ]
  },
  {
    "title": "Analytics",
    "services": [
      {
        "name": "Azure Analysis Services",
        "status": "Completed — awaiting review",
        "slug": "azure-analysis-services"
      },
      {
        "name": "Azure Data Explorer",
        "status": "Completed — awaiting review",
        "slug": "azure-data-explorer"
      },
      {
        "name": "Azure Data Factory",
        "status": "Completed — awaiting review",
        "slug": "azure-data-factory"
      },
      {
        "name": "Azure Data Lake Storage",
        "status": "Completed — awaiting review",
        "slug": "azure-data-lake-storage"
      },
      {
        "name": "Azure Data Share",
        "status": "Completed — awaiting review",
        "slug": "azure-data-share"
      },
      {
        "name": "Azure Databricks",
        "status": "Completed — awaiting review",
        "slug": "azure-databricks"
      },
      {
        "name": "Azure Stream Analytics",
        "status": "Completed — awaiting review",
        "slug": "azure-stream-analytics"
      },
      {
        "name": "Azure Synapse Analytics",
        "status": "Completed — awaiting review",
        "slug": "azure-synapse-analytics"
      },
      {
        "name": "Data Catalog",
        "status": "Completed — awaiting review",
        "slug": "data-catalog"
      },
      {
        "name": "Data Lake Analytics",
        "status": "Completed — awaiting review",
        "slug": "data-lake-analytics"
      },
      {
        "name": "Event Hubs",
        "status": "Completed — awaiting review",
        "slug": "event-hubs"
      },
      {
        "name": "HDInsight",
        "status": "Completed — awaiting review",
        "slug": "hdinsight"
      },
      {
        "name": "Power BI Embedded",
        "status": "Completed — awaiting review",
        "slug": "power-bi-embedded"
      },
      {
        "name": "Microsoft Graph Data Connect",
        "status": "Completed — awaiting review",
        "slug": "microsoft-graph-data-connect"
      },
      {
        "name": "Azure Chaos Studio",
        "status": "Completed — awaiting review",
        "slug": "azure-chaos-studio"
      },
      {
        "name": "Microsoft Fabric",
        "status": "Completed — awaiting review",
        "slug": "microsoft-fabric"
      },
      {
        "name": "Microsoft Purview",
        "status": "Completed — awaiting review",
        "slug": "microsoft-purview"
      },
      {
        "name": "Power BI",
        "status": "Completed — awaiting review",
        "slug": "power-bi"
      },
      {
        "name": "Microsoft Planetary Computer Pro",
        "status": "Completed — awaiting review",
        "slug": "microsoft-planetary-computer-pro"
      }
    ]
  },
  {
    "title": "Compute",
    "services": [
      {
        "name": "App Service",
        "status": "Completed — awaiting review",
        "slug": "app-service"
      },
      {
        "name": "Azure Compute Fleet",
        "status": "Completed — awaiting review",
        "slug": "azure-compute-fleet"
      },
      {
        "name": "Azure Quantum",
        "status": "Completed — awaiting review",
        "slug": "azure-quantum"
      },
      {
        "name": "Azure Spot Virtual Machines",
        "status": "Completed — awaiting review",
        "slug": "azure-spot-virtual-machines"
      },
      {
        "name": "Azure Spring Apps",
        "status": "Completed — awaiting review",
        "slug": "azure-spring-apps"
      },
      {
        "name": "Azure VMware Solution",
        "status": "Completed — awaiting review",
        "slug": "azure-vmware-solution"
      },
      {
        "name": "Batch",
        "status": "Completed — awaiting review",
        "slug": "batch"
      },
      {
        "name": "Cloud Services",
        "status": "Completed — awaiting review",
        "slug": "cloud-services"
      },
      {
        "name": "Linux Virtual Machines",
        "status": "Completed — awaiting review",
        "slug": "linux-virtual-machines"
      },
      {
        "name": "SQL Server on Azure Virtual Machines",
        "status": "Completed — awaiting review",
        "slug": "sql-server-on-azure-virtual-machines"
      },
      {
        "name": "Static Web Apps",
        "status": "Completed — awaiting review",
        "slug": "static-web-apps"
      },
      {
        "name": "Virtual Machine Scale Sets",
        "status": "Completed — awaiting review",
        "slug": "virtual-machine-scale-sets"
      },
      {
        "name": "Virtual Machines",
        "status": "Completed — awaiting review",
        "slug": "virtual-machines"
      },
      {
        "name": "Azure Virtual Desktop",
        "status": "Completed — awaiting review",
        "slug": "azure-virtual-desktop"
      },
      {
        "name": "Windows Server",
        "status": "Completed — awaiting review",
        "slug": "windows-server"
      },
      {
        "name": "Azure Dedicated Host",
        "status": "Completed — awaiting review",
        "slug": "azure-dedicated-host"
      },
      {
        "name": "Azure VM Image Builder",
        "status": "Completed — awaiting review",
        "slug": "azure-vm-image-builder"
      },
      {
        "name": "Azure Kubernetes Service (AKS)",
        "status": "Completed — awaiting review",
        "slug": "azure-kubernetes-service"
      },
      {
        "name": "Azure Functions",
        "status": "Completed — awaiting review",
        "slug": "azure-functions"
      },
      {
        "name": "Azure Container Instances",
        "status": "Completed — awaiting review",
        "slug": "azure-container-instances"
      },
      {
        "name": "Azure Container Apps",
        "status": "Completed — awaiting review",
        "slug": "azure-container-apps"
      },
      {
        "name": "Nutanix Cloud Clusters",
        "status": "Completed — awaiting review",
        "slug": "nutanix-cloud-clusters"
      },
      {
        "name": "Azure Virtual Desktop",
        "status": "Completed — awaiting review",
        "slug": "azure-virtual-desktop"
      }
    ]
  },
  {
    "title": "Containers",
    "services": [
      {
        "name": "Azure Container Registry",
        "status": "Completed — awaiting review",
        "slug": "azure-container-registry"
      },
      {
        "name": "Azure Kubernetes Service (AKS)",
        "status": "Completed — awaiting review",
        "slug": "azure-kubernetes-service"
      },
      {
        "name": "Azure Container Apps",
        "status": "Completed — awaiting review",
        "slug": "azure-container-apps"
      },
      {
        "name": "Azure Container Instances",
        "status": "Completed — awaiting review",
        "slug": "azure-container-instances"
      },
      {
        "name": "Azure Container Storage",
        "status": "Completed — awaiting review",
        "slug": "azure-container-storage"
      },
      {
        "name": "Azure Linux",
        "status": "Completed — awaiting review",
        "slug": "azure-linux"
      },
      {
        "name": "Azure Red Hat OpenShift",
        "status": "Completed — awaiting review",
        "slug": "azure-red-hat-openshift"
      },
      {
        "name": "Azure Service Fabric",
        "status": "Completed — awaiting review",
        "slug": "azure-service-fabric"
      },
      {
        "name": "Azure Kubernetes Fleet Manager",
        "status": "Completed — awaiting review",
        "slug": "azure-kubernetes-fleet-manager"
      }
    ]
  },
  {
    "title": "Databases",
    "services": [
      {
        "name": "Azure Cosmos DB",
        "status": "Completed — awaiting review",
        "slug": "azure-cosmos-db"
      },
      {
        "name": "Azure Database for PostgreSQL",
        "status": "Completed — awaiting review",
        "slug": "azure-database-for-postgresql"
      },
      {
        "name": "Azure Database for MySQL",
        "status": "Completed — awaiting review",
        "slug": "azure-database-for-mysql"
      },
      {
        "name": "Azure SQL Database",
        "status": "Completed — awaiting review",
        "slug": "azure-sql-database"
      },
      {
        "name": "Azure SQL Managed Instance",
        "status": "Completed — awaiting review",
        "slug": "azure-sql-managed-instance"
      },
      {
        "name": "Azure Cache for Redis",
        "status": "Completed — awaiting review",
        "slug": "azure-cache-for-redis"
      },
      {
        "name": "Azure Managed Redis",
        "status": "Completed — awaiting review",
        "slug": "azure-managed-redis"
      },
      {
        "name": "Azure Database for MariaDB",
        "status": "Completed — awaiting review",
        "slug": "azure-database-for-mariadb"
      },
      {
        "name": "Azure Database Migration Service",
        "status": "Completed — awaiting review",
        "slug": "azure-database-migration-service"
      },
      {
        "name": "Azure Database for PostgreSQL Flexible Server",
        "status": "Completed — awaiting review",
        "slug": "azure-database-for-postgresql-flexible-server"
      },
      {
        "name": "Azure Database for MySQL Flexible Server",
        "status": "Completed — awaiting review",
        "slug": "azure-database-for-mysql-flexible-server"
      },
      {
        "name": "Azure Synapse Analytics",
        "status": "Completed — awaiting review",
        "slug": "azure-synapse-analytics"
      },
      {
        "name": "Azure Data Explorer",
        "status": "Completed — awaiting review",
        "slug": "azure-data-explorer"
      },
      {
        "name": "Azure Table Storage",
        "status": "Completed — awaiting review",
        "slug": "azure-table-storage"
      },
      {
        "name": "Azure Confidential Ledger",
        "status": "Completed — awaiting review",
        "slug": "azure-confidential-ledger"
      }
    ]
  },
  {
    "title": "Developer tools",
    "services": [
      {
        "name": "App Configuration",
        "status": "Completed — awaiting review",
        "slug": "app-configuration"
      },
      {
        "name": "Azure DevOps",
        "status": "Completed — awaiting review",
        "slug": "azure-devops"
      },
      {
        "name": "Azure DevTest Labs",
        "status": "Completed — awaiting review",
        "slug": "azure-devtest-labs"
      },
      {
        "name": "Azure Pipelines",
        "status": "Completed — awaiting review",
        "slug": "azure-pipelines"
      },
      {
        "name": "SDKs",
        "status": "Completed — awaiting review",
        "slug": "sdks"
      },
      {
        "name": "Visual Studio",
        "status": "Completed — awaiting review",
        "slug": "visual-studio"
      },
      {
        "name": "Visual Studio Code",
        "status": "Completed — awaiting review",
        "slug": "visual-studio-code"
      },
      {
        "name": "Azure App Testing",
        "status": "Completed — awaiting review",
        "slug": "azure-app-testing"
      },
      {
        "name": "Microsoft Dev Box",
        "status": "Completed — awaiting review",
        "slug": "microsoft-dev-box"
      },
      {
        "name": "Azure Deployment Environments",
        "status": "Completed — awaiting review",
        "slug": "azure-deployment-environments"
      },
      {
        "name": "Microsoft Playwright Testing",
        "status": "Completed — awaiting review",
        "slug": "microsoft-playwright-testing"
      },
      {
        "name": "Artifact Signing",
        "status": "Completed — awaiting review",
        "slug": "artifact-signing"
      }
    ]
  },
  {
    "title": "DevOps",
    "services": [
      {
        "name": "Azure Artifacts",
        "status": "Completed — awaiting review",
        "slug": "azure-artifacts"
      },
      {
        "name": "Azure Boards",
        "status": "Completed — awaiting review",
        "slug": "azure-boards"
      },
      {
        "name": "Azure DevOps",
        "status": "Completed — awaiting review",
        "slug": "azure-devops"
      },
      {
        "name": "Azure DevTest Labs",
        "status": "Completed — awaiting review",
        "slug": "azure-devtest-labs"
      },
      {
        "name": "Azure Monitor",
        "status": "Completed — awaiting review",
        "slug": "azure-monitor"
      },
      {
        "name": "Azure Pipelines",
        "status": "Completed — awaiting review",
        "slug": "azure-pipelines"
      },
      {
        "name": "Azure Repos",
        "status": "Completed — awaiting review",
        "slug": "azure-repos"
      },
      {
        "name": "Azure Test Plans",
        "status": "Completed — awaiting review",
        "slug": "azure-test-plans"
      },
      {
        "name": "DevOps tool integrations",
        "status": "Completed — awaiting review",
        "slug": "devops-tool-integrations"
      },
      {
        "name": "Azure App Testing",
        "status": "Completed — awaiting review",
        "slug": "azure-app-testing"
      },
      {
        "name": "Azure Managed Grafana",
        "status": "Completed — awaiting review",
        "slug": "azure-managed-grafana"
      },
      {
        "name": "Microsoft Dev Box",
        "status": "Completed — awaiting review",
        "slug": "microsoft-dev-box"
      },
      {
        "name": "Azure Deployment Environments",
        "status": "Completed — awaiting review",
        "slug": "azure-deployment-environments"
      },
      {
        "name": "GitHub Advanced Security for Azure DevOps",
        "status": "Completed — awaiting review",
        "slug": "github-advanced-security-for-azure-devops"
      },
      {
        "name": "Microsoft Playwright Testing",
        "status": "Completed — awaiting review",
        "slug": "microsoft-playwright-testing"
      },
      {
        "name": "Github Enterprise",
        "status": "Completed — awaiting review",
        "slug": "github-enterprise"
      },
      {
        "name": "GitHub Advanced Security",
        "status": "Completed — awaiting review",
        "slug": "github-advanced-security"
      },
      {
        "name": "GitHub Copilot",
        "status": "Completed — awaiting review",
        "slug": "github-copilot"
      },
      {
        "name": "Azure SRE Agent",
        "status": "Completed — awaiting review",
        "slug": "azure-sre-agent"
      }
    ]
  },
  {
    "title": "Hybrid + multicloud",
    "services": [
      {
        "name": "Azure Arc",
        "status": "Pending",
        "slug": "azure-arc"
      },
      {
        "name": "Azure Database for PostgreSQL",
        "status": "Pending",
        "slug": "azure-database-for-postgresql"
      },
      {
        "name": "Azure DevOps",
        "status": "Pending",
        "slug": "azure-devops"
      },
      {
        "name": "Azure ExpressRoute",
        "status": "Pending",
        "slug": "azure-expressroute"
      },
      {
        "name": "Azure IoT Edge",
        "status": "Pending",
        "slug": "azure-iot-edge"
      },
      {
        "name": "Microsoft Sentinel",
        "status": "Pending",
        "slug": "microsoft-sentinel"
      },
      {
        "name": "Azure SQL Database",
        "status": "Pending",
        "slug": "azure-sql-database"
      },
      {
        "name": "Microsoft Defender for Cloud",
        "status": "Pending",
        "slug": "microsoft-defender-for-cloud"
      },
      {
        "name": "Azure Local",
        "status": "Pending",
        "slug": "azure-local"
      },
      {
        "name": "Azure Stack Hub",
        "status": "Pending",
        "slug": "azure-stack-hub"
      },
      {
        "name": "Azure Stack Edge",
        "status": "Pending",
        "slug": "azure-stack-edge"
      },
      {
        "name": "Azure Operator Service Manager",
        "status": "Pending",
        "slug": "azure-operator-service-manager"
      },
      {
        "name": "Azure Operator Nexus",
        "status": "Pending",
        "slug": "azure-operator-nexus"
      },
      {
        "name": "Azure Storage Mover",
        "status": "Pending",
        "slug": "azure-storage-mover"
      }
    ]
  },
  {
    "title": "Identity",
    "services": [
      {
        "name": "Microsoft Entra ID (formerly Azure AD)",
        "status": "Pending",
        "slug": "microsoft-entra-id"
      },
      {
        "name": "Microsoft Entra Domain Services",
        "status": "Pending",
        "slug": "microsoft-entra-domain-services"
      },
      {
        "name": "Microsoft Entra Verified ID",
        "status": "Pending",
        "slug": "microsoft-entra-verified-id"
      },
      {
        "name": "Microsoft Entra External ID",
        "status": "Pending",
        "slug": "microsoft-entra-external-id"
      }
    ]
  },
  {
    "title": "Integration",
    "services": [
      {
        "name": "API Management",
        "status": "Completed — awaiting review",
        "slug": "api-management"
      },
      {
        "name": "Azure Health Data Services",
        "status": "Completed — awaiting review",
        "slug": "azure-health-data-services"
      },
      {
        "name": "Event Grid",
        "status": "Completed — awaiting review",
        "slug": "event-grid"
      },
      {
        "name": "Logic Apps",
        "status": "Completed — awaiting review",
        "slug": "logic-apps"
      },
      {
        "name": "Service Bus",
        "status": "Completed — awaiting review",
        "slug": "service-bus"
      },
      {
        "name": "Azure Web PubSub",
        "status": "Completed — awaiting review",
        "slug": "azure-web-pubsub"
      },
      {
        "name": "Microsoft Energy Data Services",
        "status": "Completed — awaiting review",
        "slug": "microsoft-energy-data-services"
      }
    ]
  },
  {
    "title": "Internet of Things",
    "services": [
      {
        "name": "API Management",
        "status": "Completed — awaiting review",
        "slug": "api-management"
      },
      {
        "name": "Azure Cosmos DB",
        "status": "Completed — awaiting review",
        "slug": "azure-cosmos-db"
      },
      {
        "name": "Azure Digital Twins",
        "status": "Completed — awaiting review",
        "slug": "azure-digital-twins"
      },
      {
        "name": "Azure IoT Central",
        "status": "Completed — awaiting review",
        "slug": "azure-iot-central"
      },
      {
        "name": "Azure IoT Edge",
        "status": "Completed — awaiting review",
        "slug": "azure-iot-edge"
      },
      {
        "name": "Azure IoT Hub",
        "status": "Pending",
        "slug": "azure-iot-hub"
      },
      {
        "name": "Azure IoT Operations",
        "status": "Pending",
        "slug": "azure-iot-operations"
      },
      {
        "name": "Azure Functions",
        "status": "Pending",
        "slug": "azure-functions"
      },
      {
        "name": "Azure Machine Learning",
        "status": "Pending",
        "slug": "azure-machine-learning"
      },
      {
        "name": "Azure Maps",
        "status": "Pending",
        "slug": "azure-maps"
      },
      {
        "name": "Azure Stream Analytics",
        "status": "Pending",
        "slug": "azure-stream-analytics"
      },
      {
        "name": "Notification Hubs",
        "status": "Pending",
        "slug": "notification-hubs"
      },
      {
        "name": "Windows for IoT",
        "status": "Pending",
        "slug": "windows-for-iot"
      },
      {
        "name": "Logic Apps",
        "status": "Pending",
        "slug": "logic-apps"
      },
      {
        "name": "Azure Sphere",
        "status": "Pending",
        "slug": "azure-sphere"
      },
      {
        "name": "Event Grid",
        "status": "Pending",
        "slug": "event-grid"
      }
    ]
  },
  {
    "title": "Management and governance",
    "services": [
      {
        "name": "Azure Copilot",
        "status": "Pending",
        "slug": "azure-copilot"
      },
      {
        "name": "Automation",
        "status": "Pending",
        "slug": "automation"
      },
      {
        "name": "Azure Advisor",
        "status": "Pending",
        "slug": "azure-advisor"
      },
      {
        "name": "Defender External Attack Surface Management",
        "status": "Pending",
        "slug": "defender-external-attack-surface-management"
      },
      {
        "name": "Azure Backup",
        "status": "Pending",
        "slug": "azure-backup"
      },
      {
        "name": "Azure Blueprints",
        "status": "Pending",
        "slug": "azure-blueprints"
      },
      {
        "name": "Azure Lighthouse",
        "status": "Pending",
        "slug": "azure-lighthouse"
      },
      {
        "name": "Azure Managed Applications",
        "status": "Pending",
        "slug": "azure-managed-applications"
      },
      {
        "name": "Azure Migrate",
        "status": "Pending",
        "slug": "azure-migrate"
      },
      {
        "name": "Microsoft Purview",
        "status": "Pending",
        "slug": "microsoft-purview"
      },
      {
        "name": "Azure Monitor",
        "status": "Pending",
        "slug": "azure-monitor"
      },
      {
        "name": "Azure Policy",
        "status": "Pending",
        "slug": "azure-policy"
      },
      {
        "name": "Azure Resource Manager",
        "status": "Pending",
        "slug": "azure-resource-manager"
      },
      {
        "name": "Azure Resource Manager templates",
        "status": "Pending",
        "slug": "azure-resource-manager-templates"
      },
      {
        "name": "Azure Chaos Studio",
        "status": "Pending",
        "slug": "azure-chaos-studio"
      },
      {
        "name": "Azure Site Recovery",
        "status": "Pending",
        "slug": "azure-site-recovery"
      },
      {
        "name": "Cloud Shell",
        "status": "Pending",
        "slug": "cloud-shell"
      },
      {
        "name": "Microsoft Cost Management",
        "status": "Pending",
        "slug": "microsoft-cost-management"
      },
      {
        "name": "Azure Managed Grafana",
        "status": "Pending",
        "slug": "azure-managed-grafana"
      },
      {
        "name": "Azure Network Watcher",
        "status": "Pending",
        "slug": "azure-network-watcher"
      },
      {
        "name": "Azure Traffic Manager",
        "status": "Pending",
        "slug": "azure-traffic-manager"
      },
      {
        "name": "Azure Automanage",
        "status": "Pending",
        "slug": "azure-automanage"
      },
      {
        "name": "Azure Resource Mover",
        "status": "Pending",
        "slug": "azure-resource-mover"
      },
      {
        "name": "Update management center",
        "status": "Pending",
        "slug": "update-management-center"
      },
      {
        "name": "Azure SRE Agent",
        "status": "Pending",
        "slug": "azure-sre-agent"
      }
    ]
  },
  {
    "title": "Media",
    "services": [
      {
        "name": "Azure Content Delivery Network",
        "status": "Pending",
        "slug": "azure-content-delivery-network"
      }
    ]
  },
  {
    "title": "Migration",
    "services": [
      {
        "name": "Azure Database Migration Service",
        "status": "Pending",
        "slug": "azure-database-migration-service"
      },
      {
        "name": "Azure Migrate",
        "status": "Pending",
        "slug": "azure-migrate"
      },
      {
        "name": "Azure Site Recovery",
        "status": "Pending",
        "slug": "azure-site-recovery"
      },
      {
        "name": "Microsoft Cost Management",
        "status": "Pending",
        "slug": "microsoft-cost-management"
      },
      {
        "name": "Azure Data Box",
        "status": "Pending",
        "slug": "azure-data-box"
      },
      {
        "name": "Azure Storage Mover",
        "status": "Pending",
        "slug": "azure-storage-mover"
      }
    ]
  },
  {
    "title": "Mixed reality",
    "services": [
      {
        "name": "Azure Digital Twins",
        "status": "Pending",
        "slug": "azure-digital-twins"
      }
    ]
  },
  {
    "title": "Mobile",
    "services": [
      {
        "name": "API Management",
        "status": "Pending",
        "slug": "api-management"
      },
      {
        "name": "App Configuration",
        "status": "Pending",
        "slug": "app-configuration"
      },
      {
        "name": "App Service",
        "status": "Pending",
        "slug": "app-service"
      },
      {
        "name": "Azure AI Search",
        "status": "Pending",
        "slug": "azure-ai-search"
      },
      {
        "name": "Azure Maps",
        "status": "Pending",
        "slug": "azure-maps"
      },
      {
        "name": "Azure Communication Services",
        "status": "Pending",
        "slug": "azure-communication-services"
      },
      {
        "name": "Notification Hubs",
        "status": "Pending",
        "slug": "notification-hubs"
      }
    ]
  },
  {
    "title": "Networking",
    "services": [
      {
        "name": "Azure Application Gateway",
        "status": "Pending",
        "slug": "azure-application-gateway"
      },
      {
        "name": "Azure Bastion",
        "status": "Pending",
        "slug": "azure-bastion"
      },
      {
        "name": "Azure DDoS Protection",
        "status": "Pending",
        "slug": "azure-ddos-protection"
      },
      {
        "name": "Azure DNS",
        "status": "Pending",
        "slug": "azure-dns"
      },
      {
        "name": "Azure ExpressRoute",
        "status": "Pending",
        "slug": "azure-expressroute"
      },
      {
        "name": "Azure Firewall",
        "status": "Pending",
        "slug": "azure-firewall"
      },
      {
        "name": "Azure Content Delivery Network",
        "status": "Pending",
        "slug": "azure-content-delivery-network"
      },
      {
        "name": "Azure Route Server",
        "status": "Pending",
        "slug": "azure-route-server"
      },
      {
        "name": "Azure Web Application Firewall",
        "status": "Pending",
        "slug": "azure-web-application-firewall"
      },
      {
        "name": "Azure Front Door",
        "status": "Pending",
        "slug": "azure-front-door"
      },
      {
        "name": "Azure Network Function Manager",
        "status": "Pending",
        "slug": "azure-network-function-manager"
      },
      {
        "name": "Azure Virtual Network Manager",
        "status": "Pending",
        "slug": "azure-virtual-network-manager"
      },
      {
        "name": "Azure NAT Gateway",
        "status": "Pending",
        "slug": "azure-nat-gateway"
      },
      {
        "name": "Azure Load Balancer",
        "status": "Pending",
        "slug": "azure-load-balancer"
      },
      {
        "name": "Azure Private Link",
        "status": "Pending",
        "slug": "azure-private-link"
      },
      {
        "name": "Azure Firewall Manager",
        "status": "Pending",
        "slug": "azure-firewall-manager"
      },
      {
        "name": "Azure Network Watcher",
        "status": "Pending",
        "slug": "azure-network-watcher"
      },
      {
        "name": "Azure Traffic Manager",
        "status": "Pending",
        "slug": "azure-traffic-manager"
      },
      {
        "name": "Azure Virtual Network",
        "status": "Pending",
        "slug": "azure-virtual-network"
      },
      {
        "name": "Azure Virtual WAN",
        "status": "Pending",
        "slug": "azure-virtual-wan"
      },
      {
        "name": "Azure VPN Gateway",
        "status": "Pending",
        "slug": "azure-vpn-gateway"
      },
      {
        "name": "Azure Enclave",
        "status": "Pending",
        "slug": "azure-enclave"
      },
      {
        "name": "Azure Multicloud Interconnect",
        "status": "Pending",
        "slug": "azure-multicloud-interconnect"
      }
    ]
  },
  {
    "title": "Security",
    "services": [
      {
        "name": "Azure App Configuration",
        "status": "Pending",
        "slug": "azure-app-configuration"
      },
      {
        "name": "Azure Application Gateway",
        "status": "Pending",
        "slug": "azure-application-gateway"
      },
      {
        "name": "Microsoft Entra Domain Services",
        "status": "Pending",
        "slug": "microsoft-entra-domain-services"
      },
      {
        "name": "Microsoft Defender for Cloud",
        "status": "Pending",
        "slug": "microsoft-defender-for-cloud"
      },
      {
        "name": "Microsoft Defender External Attack Surface Management",
        "status": "Pending",
        "slug": "microsoft-defender-external-attack-surface-management"
      },
      {
        "name": "Azure Bastion",
        "status": "Pending",
        "slug": "azure-bastion"
      },
      {
        "name": "Azure DDoS Protection",
        "status": "Pending",
        "slug": "azure-ddos-protection"
      },
      {
        "name": "Azure Cloud HSM",
        "status": "Pending",
        "slug": "azure-cloud-hsm"
      },
      {
        "name": "Azure Firewall",
        "status": "Pending",
        "slug": "azure-firewall"
      },
      {
        "name": "Azure Firewall Manager",
        "status": "Pending",
        "slug": "azure-firewall-manager"
      },
      {
        "name": "Azure Front Door",
        "status": "Pending",
        "slug": "azure-front-door"
      },
      {
        "name": "Azure Information Protection",
        "status": "Pending",
        "slug": "azure-information-protection"
      },
      {
        "name": "Microsoft Sentinel",
        "status": "Pending",
        "slug": "microsoft-sentinel"
      },
      {
        "name": "Azure Key Vault",
        "status": "Pending",
        "slug": "azure-key-vault"
      },
      {
        "name": "Azure confidential ledger",
        "status": "Pending",
        "slug": "azure-confidential-ledger"
      },
      {
        "name": "Azure VPN Gateway",
        "status": "Pending",
        "slug": "azure-vpn-gateway"
      },
      {
        "name": "Azure Web Application Firewall",
        "status": "Pending",
        "slug": "azure-web-application-firewall"
      },
      {
        "name": "Microsoft Azure Attestation",
        "status": "Pending",
        "slug": "microsoft-azure-attestation"
      },
      {
        "name": "Microsoft Security Copilot",
        "status": "Pending",
        "slug": "microsoft-security-copilot"
      }
    ]
  },
  {
    "title": "Storage",
    "services": [
      {
        "name": "Archive Storage",
        "status": "Pending",
        "slug": "archive-storage"
      },
      {
        "name": "Azure Managed Lustre",
        "status": "Pending",
        "slug": "azure-managed-lustre"
      },
      {
        "name": "Azure Backup",
        "status": "Pending",
        "slug": "azure-backup"
      },
      {
        "name": "Azure Data Lake Storage",
        "status": "Pending",
        "slug": "azure-data-lake-storage"
      },
      {
        "name": "Azure Data Share",
        "status": "Pending",
        "slug": "azure-data-share"
      },
      {
        "name": "Azure Files",
        "status": "Pending",
        "slug": "azure-files"
      },
      {
        "name": "Azure Storage Actions",
        "status": "Pending",
        "slug": "azure-storage-actions"
      },
      {
        "name": "Azure NetApp Files",
        "status": "Pending",
        "slug": "azure-netapp-files"
      },
      {
        "name": "Azure Blob Storage",
        "status": "Pending",
        "slug": "azure-blob-storage"
      },
      {
        "name": "Azure Data Box",
        "status": "Pending",
        "slug": "azure-data-box"
      },
      {
        "name": "Azure Disk Storage",
        "status": "Pending",
        "slug": "azure-disk-storage"
      },
      {
        "name": "Azure confidential ledger",
        "status": "Pending",
        "slug": "azure-confidential-ledger"
      },
      {
        "name": "Azure Elastic SAN",
        "status": "Pending",
        "slug": "azure-elastic-san"
      },
      {
        "name": "Queue Storage",
        "status": "Pending",
        "slug": "queue-storage"
      },
      {
        "name": "Storage Accounts",
        "status": "Pending",
        "slug": "storage-accounts"
      },
      {
        "name": "Storage Explorer",
        "status": "Pending",
        "slug": "storage-explorer"
      },
      {
        "name": "Azure Container Storage",
        "status": "Pending",
        "slug": "azure-container-storage"
      },
      {
        "name": "Azure Storage Discovery",
        "status": "Pending",
        "slug": "azure-storage-discovery"
      },
      {
        "name": "Azure Storage Mover",
        "status": "Pending",
        "slug": "azure-storage-mover"
      }
    ]
  },
  {
    "title": "Virtual desktop infrastructure",
    "services": [
      {
        "name": "Azure Lab Services",
        "status": "Pending",
        "slug": "azure-lab-services"
      },
      {
        "name": "Azure Virtual Desktop",
        "status": "Pending",
        "slug": "azure-virtual-desktop"
      },
      {
        "name": "Microsoft Dev Box",
        "status": "Pending",
        "slug": "microsoft-dev-box"
      }
    ]
  },
  {
    "title": "Web",
    "services": [
      {
        "name": "API Management",
        "status": "Pending",
        "slug": "api-management"
      },
      {
        "name": "App Configuration",
        "status": "Pending",
        "slug": "app-configuration"
      },
      {
        "name": "App Service",
        "status": "Pending",
        "slug": "app-service"
      },
      {
        "name": "Azure AI Search",
        "status": "Pending",
        "slug": "azure-ai-search"
      },
      {
        "name": "Azure Maps",
        "status": "Pending",
        "slug": "azure-maps"
      },
      {
        "name": "Azure SignalR Service",
        "status": "Pending",
        "slug": "azure-signalr-service"
      },
      {
        "name": "Azure Content Delivery Network",
        "status": "Pending",
        "slug": "azure-content-delivery-network"
      },
      {
        "name": "Notification Hubs",
        "status": "Pending",
        "slug": "notification-hubs"
      },
      {
        "name": "Static Web Apps",
        "status": "Pending",
        "slug": "static-web-apps"
      },
      {
        "name": "Azure Communication Services",
        "status": "Pending",
        "slug": "azure-communication-services"
      }
    ]
  }
];

export const azureUniqueServices = [{"name":"Microsoft Foundry","status":"Completed — awaiting review","slug":"microsoft-foundry"},{"name":"Azure AI Bot Service","status":"Completed — awaiting review","slug":"azure-ai-bot-service"},{"name":"Azure AI Search","status":"Pending","slug":"azure-ai-search"},{"name":"Azure Databricks","status":"Completed — awaiting review","slug":"azure-databricks"},{"name":"Azure Machine Learning","status":"Pending","slug":"azure-machine-learning"},{"name":"Azure Open Datasets","status":"Completed — awaiting review","slug":"azure-open-datasets"},{"name":"Foundry Tools","status":"Completed — awaiting review","slug":"foundry-tools"},{"name":"Azure AI Video Indexer","status":"Completed — awaiting review","slug":"azure-ai-video-indexer"},{"name":"Azure AI Custom Vision","status":"Completed — awaiting review","slug":"azure-ai-custom-vision"},{"name":"Data Science Virtual Machines","status":"Completed — awaiting review","slug":"data-science-virtual-machines"},{"name":"Azure Language in Foundry Tools","status":"Completed — awaiting review","slug":"azure-language-in-foundry-tools"},{"name":"Azure Translator in Foundry Tools","status":"Completed — awaiting review","slug":"azure-translator-in-foundry-tools"},{"name":"Azure OpenAI in Foundry Models","status":"Completed — awaiting review","slug":"azure-openai-in-foundry-models"},{"name":"Content Safety in Foundry Control Plane","status":"Completed — awaiting review","slug":"content-safety-in-foundry-control-plane"},{"name":"Health Bot","status":"Completed — awaiting review","slug":"health-bot"},{"name":"Azure Document Intelligence in Foundry Tools","status":"Completed — awaiting review","slug":"azure-document-intelligence-in-foundry-tools"},{"name":"AI Anomaly Detector","status":"Completed — awaiting review","slug":"ai-anomaly-detector"},{"name":"Foundry Models","status":"Completed — awaiting review","slug":"foundry-models"},{"name":"Microsoft Security Copilot","status":"Pending","slug":"microsoft-security-copilot"},{"name":"Azure AI Immersive Reader","status":"Completed — awaiting review","slug":"azure-ai-immersive-reader"},{"name":"Phi open models","status":"Completed — awaiting review","slug":"phi-open-models"},{"name":"Azure Content Understanding in Foundry Tools","status":"Completed — awaiting review","slug":"azure-content-understanding-in-foundry-tools"},{"name":"Azure Speech in Foundry Tools","status":"Completed — awaiting review","slug":"azure-speech-in-foundry-tools"},{"name":"Microsoft Planetary Computer Pro","status":"Completed — awaiting review","slug":"microsoft-planetary-computer-pro"},{"name":"Foundry Agent Service","status":"Completed — awaiting review","slug":"foundry-agent-service"},{"name":"Azure SRE Agent","status":"Pending","slug":"azure-sre-agent"},{"name":"Observability in Foundry Control Plane","status":"Completed — awaiting review","slug":"observability-in-foundry-control-plane"},{"name":"Azure Vision in Foundry Tools","status":"Completed — awaiting review","slug":"azure-vision-in-foundry-tools"},{"name":"Foundry IQ","status":"Completed — awaiting review","slug":"foundry-iq"},{"name":"Foundry Control Plane","status":"Completed — awaiting review","slug":"foundry-control-plane"},{"name":"Azure Analysis Services","status":"Completed — awaiting review","slug":"azure-analysis-services"},{"name":"Azure Data Explorer","status":"Completed — awaiting review","slug":"azure-data-explorer"},{"name":"Azure Data Factory","status":"Completed — awaiting review","slug":"azure-data-factory"},{"name":"Azure Data Lake Storage","status":"Pending","slug":"azure-data-lake-storage"},{"name":"Azure Data Share","status":"Pending","slug":"azure-data-share"},{"name":"Azure Stream Analytics","status":"Pending","slug":"azure-stream-analytics"},{"name":"Azure Synapse Analytics","status":"Completed — awaiting review","slug":"azure-synapse-analytics"},{"name":"Data Catalog","status":"Completed — awaiting review","slug":"data-catalog"},{"name":"Data Lake Analytics","status":"Completed — awaiting review","slug":"data-lake-analytics"},{"name":"Event Hubs","status":"Completed — awaiting review","slug":"event-hubs"},{"name":"HDInsight","status":"Completed — awaiting review","slug":"hdinsight"},{"name":"Power BI Embedded","status":"Completed — awaiting review","slug":"power-bi-embedded"},{"name":"Microsoft Graph Data Connect","status":"Completed — awaiting review","slug":"microsoft-graph-data-connect"},{"name":"Azure Chaos Studio","status":"Pending","slug":"azure-chaos-studio"},{"name":"Microsoft Fabric","status":"Completed — awaiting review","slug":"microsoft-fabric"},{"name":"Microsoft Purview","status":"Pending","slug":"microsoft-purview"},{"name":"Power BI","status":"Completed — awaiting review","slug":"power-bi"},{"name":"App Service","status":"Pending","slug":"app-service"},{"name":"Azure Compute Fleet","status":"Completed — awaiting review","slug":"azure-compute-fleet"},{"name":"Azure Quantum","status":"Completed — awaiting review","slug":"azure-quantum"},{"name":"Azure Spot Virtual Machines","status":"Completed — awaiting review","slug":"azure-spot-virtual-machines"},{"name":"Azure Spring Apps","status":"Completed — awaiting review","slug":"azure-spring-apps"},{"name":"Azure VMware Solution","status":"Completed — awaiting review","slug":"azure-vmware-solution"},{"name":"Batch","status":"Completed — awaiting review","slug":"batch"},{"name":"Cloud Services","status":"Completed — awaiting review","slug":"cloud-services"},{"name":"Linux Virtual Machines","status":"Completed — awaiting review","slug":"linux-virtual-machines"},{"name":"SQL Server on Azure Virtual Machines","status":"Completed — awaiting review","slug":"sql-server-on-azure-virtual-machines"},{"name":"Static Web Apps","status":"Pending","slug":"static-web-apps"},{"name":"Virtual Machine Scale Sets","status":"Completed — awaiting review","slug":"virtual-machine-scale-sets"},{"name":"Virtual Machines","status":"Completed — awaiting review","slug":"virtual-machines"},{"name":"Azure Virtual Desktop","status":"Pending","slug":"azure-virtual-desktop"},{"name":"Windows Server","status":"Completed — awaiting review","slug":"windows-server"},{"name":"Azure Dedicated Host","status":"Completed — awaiting review","slug":"azure-dedicated-host"},{"name":"Azure VM Image Builder","status":"Completed — awaiting review","slug":"azure-vm-image-builder"},{"name":"Azure Kubernetes Service (AKS)","status":"Completed — awaiting review","slug":"azure-kubernetes-service"},{"name":"Azure Functions","status":"Pending","slug":"azure-functions"},{"name":"Azure Container Instances","status":"Completed — awaiting review","slug":"azure-container-instances"},{"name":"Azure Container Apps","status":"Completed — awaiting review","slug":"azure-container-apps"},{"name":"Nutanix Cloud Clusters","status":"Completed — awaiting review","slug":"nutanix-cloud-clusters"},{"name":"Azure Container Registry","status":"Completed — awaiting review","slug":"azure-container-registry"},{"name":"Azure Container Storage","status":"Pending","slug":"azure-container-storage"},{"name":"Azure Linux","status":"Completed — awaiting review","slug":"azure-linux"},{"name":"Azure Red Hat OpenShift","status":"Completed — awaiting review","slug":"azure-red-hat-openshift"},{"name":"Azure Service Fabric","status":"Completed — awaiting review","slug":"azure-service-fabric"},{"name":"Azure Kubernetes Fleet Manager","status":"Completed — awaiting review","slug":"azure-kubernetes-fleet-manager"},{"name":"Azure Cosmos DB","status":"Completed — awaiting review","slug":"azure-cosmos-db"},{"name":"Azure Database for PostgreSQL","status":"Pending","slug":"azure-database-for-postgresql"},{"name":"Azure Database for MySQL","status":"Completed — awaiting review","slug":"azure-database-for-mysql"},{"name":"Azure SQL Database","status":"Pending","slug":"azure-sql-database"},{"name":"Azure SQL Managed Instance","status":"Completed — awaiting review","slug":"azure-sql-managed-instance"},{"name":"Azure Cache for Redis","status":"Completed — awaiting review","slug":"azure-cache-for-redis"},{"name":"Azure Managed Redis","status":"Completed — awaiting review","slug":"azure-managed-redis"},{"name":"Azure Database for MariaDB","status":"Completed — awaiting review","slug":"azure-database-for-mariadb"},{"name":"Azure Database Migration Service","status":"Pending","slug":"azure-database-migration-service"},{"name":"Azure Database for PostgreSQL Flexible Server","status":"Completed — awaiting review","slug":"azure-database-for-postgresql-flexible-server"},{"name":"Azure Database for MySQL Flexible Server","status":"Completed — awaiting review","slug":"azure-database-for-mysql-flexible-server"},{"name":"Azure Table Storage","status":"Completed — awaiting review","slug":"azure-table-storage"},{"name":"Azure confidential ledger","status":"Pending","slug":"azure-confidential-ledger"},{"name":"App Configuration","status":"Pending","slug":"app-configuration"},{"name":"Azure DevOps","status":"Pending","slug":"azure-devops"},{"name":"Azure DevTest Labs","status":"Completed — awaiting review","slug":"azure-devtest-labs"},{"name":"Azure Pipelines","status":"Completed — awaiting review","slug":"azure-pipelines"},{"name":"SDKs","status":"Completed — awaiting review","slug":"sdks"},{"name":"Visual Studio","status":"Completed — awaiting review","slug":"visual-studio"},{"name":"Visual Studio Code","status":"Completed — awaiting review","slug":"visual-studio-code"},{"name":"Azure App Testing","status":"Completed — awaiting review","slug":"azure-app-testing"},{"name":"Microsoft Dev Box","status":"Pending","slug":"microsoft-dev-box"},{"name":"Azure Deployment Environments","status":"Completed — awaiting review","slug":"azure-deployment-environments"},{"name":"Microsoft Playwright Testing","status":"Completed — awaiting review","slug":"microsoft-playwright-testing"},{"name":"Artifact Signing","status":"Completed — awaiting review","slug":"artifact-signing"},{"name":"Azure Artifacts","status":"Completed — awaiting review","slug":"azure-artifacts"},{"name":"Azure Boards","status":"Completed — awaiting review","slug":"azure-boards"},{"name":"Azure Monitor","status":"Pending","slug":"azure-monitor"},{"name":"Azure Repos","status":"Completed — awaiting review","slug":"azure-repos"},{"name":"Azure Test Plans","status":"Completed — awaiting review","slug":"azure-test-plans"},{"name":"DevOps tool integrations","status":"Completed — awaiting review","slug":"devops-tool-integrations"},{"name":"Azure Managed Grafana","status":"Pending","slug":"azure-managed-grafana"},{"name":"GitHub Advanced Security for Azure DevOps","status":"Completed — awaiting review","slug":"github-advanced-security-for-azure-devops"},{"name":"Github Enterprise","status":"Completed — awaiting review","slug":"github-enterprise"},{"name":"GitHub Advanced Security","status":"Completed — awaiting review","slug":"github-advanced-security"},{"name":"GitHub Copilot","status":"Completed — awaiting review","slug":"github-copilot"},{"name":"Azure Arc","status":"Pending","slug":"azure-arc"},{"name":"Azure ExpressRoute","status":"Pending","slug":"azure-expressroute"},{"name":"Azure IoT Edge","status":"Completed — awaiting review","slug":"azure-iot-edge"},{"name":"Microsoft Sentinel","status":"Pending","slug":"microsoft-sentinel"},{"name":"Microsoft Defender for Cloud","status":"Pending","slug":"microsoft-defender-for-cloud"},{"name":"Azure Local","status":"Pending","slug":"azure-local"},{"name":"Azure Stack Hub","status":"Pending","slug":"azure-stack-hub"},{"name":"Azure Stack Edge","status":"Pending","slug":"azure-stack-edge"},{"name":"Azure Operator Service Manager","status":"Pending","slug":"azure-operator-service-manager"},{"name":"Azure Operator Nexus","status":"Pending","slug":"azure-operator-nexus"},{"name":"Azure Storage Mover","status":"Pending","slug":"azure-storage-mover"},{"name":"Microsoft Entra ID (formerly Azure AD)","status":"Pending","slug":"microsoft-entra-id"},{"name":"Microsoft Entra Domain Services","status":"Pending","slug":"microsoft-entra-domain-services"},{"name":"Microsoft Entra Verified ID","status":"Pending","slug":"microsoft-entra-verified-id"},{"name":"Microsoft Entra External ID","status":"Pending","slug":"microsoft-entra-external-id"},{"name":"API Management","status":"Pending","slug":"api-management"},{"name":"Azure Health Data Services","status":"Completed — awaiting review","slug":"azure-health-data-services"},{"name":"Event Grid","status":"Pending","slug":"event-grid"},{"name":"Logic Apps","status":"Pending","slug":"logic-apps"},{"name":"Service Bus","status":"Completed — awaiting review","slug":"service-bus"},{"name":"Azure Web PubSub","status":"Completed — awaiting review","slug":"azure-web-pubsub"},{"name":"Microsoft Energy Data Services","status":"Completed — awaiting review","slug":"microsoft-energy-data-services"},{"name":"Azure Digital Twins","status":"Pending","slug":"azure-digital-twins"},{"name":"Azure IoT Central","status":"Completed — awaiting review","slug":"azure-iot-central"},{"name":"Azure IoT Hub","status":"Pending","slug":"azure-iot-hub"},{"name":"Azure IoT Operations","status":"Pending","slug":"azure-iot-operations"},{"name":"Azure Maps","status":"Pending","slug":"azure-maps"},{"name":"Notification Hubs","status":"Pending","slug":"notification-hubs"},{"name":"Windows for IoT","status":"Pending","slug":"windows-for-iot"},{"name":"Azure Sphere","status":"Pending","slug":"azure-sphere"},{"name":"Azure Copilot","status":"Pending","slug":"azure-copilot"},{"name":"Automation","status":"Pending","slug":"automation"},{"name":"Azure Advisor","status":"Pending","slug":"azure-advisor"},{"name":"Defender External Attack Surface Management","status":"Pending","slug":"defender-external-attack-surface-management"},{"name":"Azure Backup","status":"Pending","slug":"azure-backup"},{"name":"Azure Blueprints","status":"Pending","slug":"azure-blueprints"},{"name":"Azure Lighthouse","status":"Pending","slug":"azure-lighthouse"},{"name":"Azure Managed Applications","status":"Pending","slug":"azure-managed-applications"},{"name":"Azure Migrate","status":"Pending","slug":"azure-migrate"},{"name":"Azure Policy","status":"Pending","slug":"azure-policy"},{"name":"Azure Resource Manager","status":"Pending","slug":"azure-resource-manager"},{"name":"Azure Resource Manager templates","status":"Pending","slug":"azure-resource-manager-templates"},{"name":"Azure Site Recovery","status":"Pending","slug":"azure-site-recovery"},{"name":"Cloud Shell","status":"Pending","slug":"cloud-shell"},{"name":"Microsoft Cost Management","status":"Pending","slug":"microsoft-cost-management"},{"name":"Azure Network Watcher","status":"Pending","slug":"azure-network-watcher"},{"name":"Azure Traffic Manager","status":"Pending","slug":"azure-traffic-manager"},{"name":"Azure Automanage","status":"Pending","slug":"azure-automanage"},{"name":"Azure Resource Mover","status":"Pending","slug":"azure-resource-mover"},{"name":"Update management center","status":"Pending","slug":"update-management-center"},{"name":"Azure Content Delivery Network","status":"Pending","slug":"azure-content-delivery-network"},{"name":"Azure Data Box","status":"Pending","slug":"azure-data-box"},{"name":"Azure Communication Services","status":"Pending","slug":"azure-communication-services"},{"name":"Azure Application Gateway","status":"Pending","slug":"azure-application-gateway"},{"name":"Azure Bastion","status":"Pending","slug":"azure-bastion"},{"name":"Azure DDoS Protection","status":"Pending","slug":"azure-ddos-protection"},{"name":"Azure DNS","status":"Pending","slug":"azure-dns"},{"name":"Azure Firewall","status":"Pending","slug":"azure-firewall"},{"name":"Azure Route Server","status":"Pending","slug":"azure-route-server"},{"name":"Azure Web Application Firewall","status":"Pending","slug":"azure-web-application-firewall"},{"name":"Azure Front Door","status":"Pending","slug":"azure-front-door"},{"name":"Azure Network Function Manager","status":"Pending","slug":"azure-network-function-manager"},{"name":"Azure Virtual Network Manager","status":"Pending","slug":"azure-virtual-network-manager"},{"name":"Azure NAT Gateway","status":"Pending","slug":"azure-nat-gateway"},{"name":"Azure Load Balancer","status":"Pending","slug":"azure-load-balancer"},{"name":"Azure Private Link","status":"Pending","slug":"azure-private-link"},{"name":"Azure Firewall Manager","status":"Pending","slug":"azure-firewall-manager"},{"name":"Azure Virtual Network","status":"Pending","slug":"azure-virtual-network"},{"name":"Azure Virtual WAN","status":"Pending","slug":"azure-virtual-wan"},{"name":"Azure VPN Gateway","status":"Pending","slug":"azure-vpn-gateway"},{"name":"Azure Enclave","status":"Pending","slug":"azure-enclave"},{"name":"Azure Multicloud Interconnect","status":"Pending","slug":"azure-multicloud-interconnect"},{"name":"Azure App Configuration","status":"Pending","slug":"azure-app-configuration"},{"name":"Microsoft Defender External Attack Surface Management","status":"Pending","slug":"microsoft-defender-external-attack-surface-management"},{"name":"Azure Cloud HSM","status":"Pending","slug":"azure-cloud-hsm"},{"name":"Azure Information Protection","status":"Pending","slug":"azure-information-protection"},{"name":"Azure Key Vault","status":"Pending","slug":"azure-key-vault"},{"name":"Microsoft Azure Attestation","status":"Pending","slug":"microsoft-azure-attestation"},{"name":"Archive Storage","status":"Pending","slug":"archive-storage"},{"name":"Azure Managed Lustre","status":"Pending","slug":"azure-managed-lustre"},{"name":"Azure Files","status":"Pending","slug":"azure-files"},{"name":"Azure Storage Actions","status":"Pending","slug":"azure-storage-actions"},{"name":"Azure NetApp Files","status":"Pending","slug":"azure-netapp-files"},{"name":"Azure Blob Storage","status":"Pending","slug":"azure-blob-storage"},{"name":"Azure Disk Storage","status":"Pending","slug":"azure-disk-storage"},{"name":"Azure Elastic SAN","status":"Pending","slug":"azure-elastic-san"},{"name":"Queue Storage","status":"Pending","slug":"queue-storage"},{"name":"Storage Accounts","status":"Pending","slug":"storage-accounts"},{"name":"Storage Explorer","status":"Pending","slug":"storage-explorer"},{"name":"Azure Storage Discovery","status":"Pending","slug":"azure-storage-discovery"},{"name":"Azure Lab Services","status":"Pending","slug":"azure-lab-services"},{"name":"Azure SignalR Service","status":"Pending","slug":"azure-signalr-service"}];

export const azureBranchAccents = ["#0078d4","#5c2d91","#00a4ef","#107c10","#e74856","#8764b8","#ffb900","#008272"];
