// Generated from azure-service-tracker-certifications-reviewed(1).xlsx.
// Retiring AZ-500 is intentionally excluded from the published course catalog.

export type AzureCourseService = { name: string; classification: "Direct" | "Related" };
export type AzureCourseScope = { title: string; services: AzureCourseService[] };
export type AzureCourse = { code: string; level: string; title: string; description: string; scope: AzureCourseScope[]; sourceUrl: string };

export const azureCourses: AzureCourse[] = [
  {
    "code": "AZ-900",
    "level": "Foundational",
    "title": "Microsoft Certified: Azure Fundamentals",
    "description": "Review the Azure services and concepts mapped in the current certification tracker.",
    "scope": [
      {
        "title": "Analytics",
        "services": [
          {
            "name": "Azure Data Lake Storage",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Purview",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Compute",
        "services": [
          {
            "name": "App Service",
            "classification": "Direct"
          },
          {
            "name": "Virtual Machine Scale Sets",
            "classification": "Direct"
          },
          {
            "name": "Azure Virtual Desktop",
            "classification": "Direct"
          },
          {
            "name": "Azure Kubernetes Service (AKS)",
            "classification": "Direct"
          },
          {
            "name": "Azure Functions",
            "classification": "Direct"
          },
          {
            "name": "Azure Container Instances",
            "classification": "Direct"
          },
          {
            "name": "Azure Container Apps",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "DevOps",
        "services": [
          {
            "name": "Azure Monitor",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Hybrid + multicloud",
        "services": [
          {
            "name": "Azure Arc",
            "classification": "Related"
          },
          {
            "name": "Azure ExpressRoute",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Defender for Cloud",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Identity",
        "services": [
          {
            "name": "Microsoft Entra ID (formerly Azure AD)",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Entra Domain Services",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Entra External ID",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Management and governance",
        "services": [
          {
            "name": "Azure Advisor",
            "classification": "Direct"
          },
          {
            "name": "Azure Backup",
            "classification": "Related"
          },
          {
            "name": "Azure Migrate",
            "classification": "Direct"
          },
          {
            "name": "Azure Policy",
            "classification": "Direct"
          },
          {
            "name": "Azure Resource Manager",
            "classification": "Direct"
          },
          {
            "name": "Azure Site Recovery",
            "classification": "Related"
          },
          {
            "name": "Cloud Shell",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Cost Management",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Migration",
        "services": [
          {
            "name": "Azure Data Box",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Networking",
        "services": [
          {
            "name": "Azure Application Gateway",
            "classification": "Related"
          },
          {
            "name": "Azure DNS",
            "classification": "Direct"
          },
          {
            "name": "Azure Front Door",
            "classification": "Related"
          },
          {
            "name": "Azure Load Balancer",
            "classification": "Related"
          },
          {
            "name": "Azure Virtual Network",
            "classification": "Direct"
          },
          {
            "name": "Azure VPN Gateway",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Storage",
        "services": [
          {
            "name": "Azure Files",
            "classification": "Direct"
          },
          {
            "name": "Azure Blob Storage",
            "classification": "Direct"
          },
          {
            "name": "Azure Disk Storage",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900"
  },
  {
    "code": "AZ-104",
    "level": "Associate",
    "title": "Microsoft Certified: Azure Administrator Associate",
    "description": "Study the Azure administration services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "Compute",
        "services": [
          {
            "name": "App Service",
            "classification": "Direct"
          },
          {
            "name": "Virtual Machine Scale Sets",
            "classification": "Direct"
          },
          {
            "name": "Virtual Machines",
            "classification": "Direct"
          },
          {
            "name": "Azure Functions",
            "classification": "Related"
          },
          {
            "name": "Azure Container Instances",
            "classification": "Direct"
          },
          {
            "name": "Azure Container Apps",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Containers",
        "services": [
          {
            "name": "Azure Container Registry",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Databases",
        "services": [
          {
            "name": "Azure Database for PostgreSQL",
            "classification": "Related"
          },
          {
            "name": "Azure SQL Database",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "DevOps",
        "services": [
          {
            "name": "Azure Monitor",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Hybrid + multicloud",
        "services": [
          {
            "name": "Azure ExpressRoute",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Identity",
        "services": [
          {
            "name": "Microsoft Entra ID (formerly Azure AD)",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Management and governance",
        "services": [
          {
            "name": "Azure Backup",
            "classification": "Direct"
          },
          {
            "name": "Azure Policy",
            "classification": "Direct"
          },
          {
            "name": "Azure Resource Manager",
            "classification": "Direct"
          },
          {
            "name": "Azure Site Recovery",
            "classification": "Direct"
          },
          {
            "name": "Azure Network Watcher",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Networking",
        "services": [
          {
            "name": "Azure Application Gateway",
            "classification": "Related"
          },
          {
            "name": "Azure Bastion",
            "classification": "Direct"
          },
          {
            "name": "Azure DNS",
            "classification": "Direct"
          },
          {
            "name": "Azure Load Balancer",
            "classification": "Related"
          },
          {
            "name": "Azure Virtual Network",
            "classification": "Direct"
          },
          {
            "name": "Azure VPN Gateway",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Security",
        "services": [
          {
            "name": "Azure Key Vault",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Storage",
        "services": [
          {
            "name": "Azure Files",
            "classification": "Direct"
          },
          {
            "name": "Azure Blob Storage",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104"
  },
  {
    "code": "AZ-305",
    "level": "Expert",
    "title": "Microsoft Certified: Azure Solutions Architect Expert",
    "description": "Study the Azure architecture services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "AI + machine learning",
        "services": [
          {
            "name": "Azure Databricks",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Analytics",
        "services": [
          {
            "name": "Azure Data Factory",
            "classification": "Related"
          },
          {
            "name": "Azure Data Lake Storage",
            "classification": "Direct"
          },
          {
            "name": "Azure Synapse Analytics",
            "classification": "Related"
          },
          {
            "name": "Event Hubs",
            "classification": "Direct"
          },
          {
            "name": "Azure Chaos Studio",
            "classification": "Related"
          },
          {
            "name": "Microsoft Purview",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Compute",
        "services": [
          {
            "name": "App Service",
            "classification": "Direct"
          },
          {
            "name": "Virtual Machine Scale Sets",
            "classification": "Direct"
          },
          {
            "name": "Azure Virtual Desktop",
            "classification": "Related"
          },
          {
            "name": "Azure Kubernetes Service (AKS)",
            "classification": "Direct"
          },
          {
            "name": "Azure Functions",
            "classification": "Direct"
          },
          {
            "name": "Azure Container Apps",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Databases",
        "services": [
          {
            "name": "Azure Cosmos DB",
            "classification": "Direct"
          },
          {
            "name": "Azure Database for PostgreSQL",
            "classification": "Direct"
          },
          {
            "name": "Azure SQL Database",
            "classification": "Direct"
          },
          {
            "name": "Azure SQL Managed Instance",
            "classification": "Direct"
          },
          {
            "name": "Azure Cache for Redis",
            "classification": "Direct"
          },
          {
            "name": "Azure Database Migration Service",
            "classification": "Direct"
          },
          {
            "name": "Azure Database for PostgreSQL Flexible Server",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "DevOps",
        "services": [
          {
            "name": "Azure Monitor",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Hybrid + multicloud",
        "services": [
          {
            "name": "Azure ExpressRoute",
            "classification": "Direct"
          },
          {
            "name": "Azure Storage Mover",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Identity",
        "services": [
          {
            "name": "Microsoft Entra ID (formerly Azure AD)",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Entra External ID",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Integration",
        "services": [
          {
            "name": "API Management",
            "classification": "Direct"
          },
          {
            "name": "Event Grid",
            "classification": "Direct"
          },
          {
            "name": "Logic Apps",
            "classification": "Direct"
          },
          {
            "name": "Service Bus",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Management and governance",
        "services": [
          {
            "name": "Azure Backup",
            "classification": "Direct"
          },
          {
            "name": "Azure Migrate",
            "classification": "Direct"
          },
          {
            "name": "Azure Policy",
            "classification": "Direct"
          },
          {
            "name": "Azure Resource Manager",
            "classification": "Direct"
          },
          {
            "name": "Azure Site Recovery",
            "classification": "Direct"
          },
          {
            "name": "Azure Traffic Manager",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Networking",
        "services": [
          {
            "name": "Azure Application Gateway",
            "classification": "Direct"
          },
          {
            "name": "Azure DNS",
            "classification": "Direct"
          },
          {
            "name": "Azure Firewall",
            "classification": "Direct"
          },
          {
            "name": "Azure Front Door",
            "classification": "Direct"
          },
          {
            "name": "Azure Load Balancer",
            "classification": "Direct"
          },
          {
            "name": "Azure Private Link",
            "classification": "Direct"
          },
          {
            "name": "Azure Virtual Network",
            "classification": "Direct"
          },
          {
            "name": "Azure VPN Gateway",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Security",
        "services": [
          {
            "name": "Azure Key Vault",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Storage",
        "services": [
          {
            "name": "Azure Files",
            "classification": "Direct"
          },
          {
            "name": "Azure NetApp Files",
            "classification": "Related"
          },
          {
            "name": "Azure Blob Storage",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-305"
  },
  {
    "code": "AZ-700",
    "level": "Specialty",
    "title": "Microsoft Certified: Azure Network Engineer Associate",
    "description": "Study the Azure networking services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "Hybrid + multicloud",
        "services": [
          {
            "name": "Azure ExpressRoute",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Management and governance",
        "services": [
          {
            "name": "Azure Network Watcher",
            "classification": "Direct"
          },
          {
            "name": "Azure Traffic Manager",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Media",
        "services": [
          {
            "name": "Azure Content Delivery Network",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Networking",
        "services": [
          {
            "name": "Azure Application Gateway",
            "classification": "Direct"
          },
          {
            "name": "Azure Bastion",
            "classification": "Direct"
          },
          {
            "name": "Azure DDoS Protection",
            "classification": "Direct"
          },
          {
            "name": "Azure DNS",
            "classification": "Direct"
          },
          {
            "name": "Azure Firewall",
            "classification": "Direct"
          },
          {
            "name": "Azure Route Server",
            "classification": "Direct"
          },
          {
            "name": "Azure Web Application Firewall",
            "classification": "Direct"
          },
          {
            "name": "Azure Front Door",
            "classification": "Direct"
          },
          {
            "name": "Azure Network Function Manager",
            "classification": "Related"
          },
          {
            "name": "Azure Virtual Network Manager",
            "classification": "Direct"
          },
          {
            "name": "Azure NAT Gateway",
            "classification": "Direct"
          },
          {
            "name": "Azure Load Balancer",
            "classification": "Direct"
          },
          {
            "name": "Azure Private Link",
            "classification": "Direct"
          },
          {
            "name": "Azure Firewall Manager",
            "classification": "Direct"
          },
          {
            "name": "Azure Virtual Network",
            "classification": "Direct"
          },
          {
            "name": "Azure Virtual WAN",
            "classification": "Direct"
          },
          {
            "name": "Azure VPN Gateway",
            "classification": "Direct"
          },
          {
            "name": "Azure Multicloud Interconnect",
            "classification": "Related"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-700"
  },
  {
    "code": "AZ-400",
    "level": "Expert",
    "title": "Microsoft Certified: DevOps Engineer Expert",
    "description": "Study the Azure DevOps services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "AI + machine learning",
        "services": [
          {
            "name": "Azure SRE Agent",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Analytics",
        "services": [
          {
            "name": "Azure Chaos Studio",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Compute",
        "services": [
          {
            "name": "App Service",
            "classification": "Direct"
          },
          {
            "name": "Azure Kubernetes Service (AKS)",
            "classification": "Direct"
          },
          {
            "name": "Azure Functions",
            "classification": "Direct"
          },
          {
            "name": "Azure Container Apps",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Containers",
        "services": [
          {
            "name": "Azure Container Registry",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Developer tools",
        "services": [
          {
            "name": "Azure DevOps",
            "classification": "Direct"
          },
          {
            "name": "Azure Pipelines",
            "classification": "Direct"
          },
          {
            "name": "Azure Deployment Environments",
            "classification": "Related"
          },
          {
            "name": "Microsoft Playwright Testing",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "DevOps",
        "services": [
          {
            "name": "Azure Artifacts",
            "classification": "Direct"
          },
          {
            "name": "Azure Boards",
            "classification": "Direct"
          },
          {
            "name": "Azure Monitor",
            "classification": "Direct"
          },
          {
            "name": "Azure Repos",
            "classification": "Direct"
          },
          {
            "name": "Azure Test Plans",
            "classification": "Direct"
          },
          {
            "name": "GitHub Advanced Security",
            "classification": "Direct"
          },
          {
            "name": "GitHub Copilot",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Hybrid + multicloud",
        "services": [
          {
            "name": "Microsoft Defender for Cloud",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Management and governance",
        "services": [
          {
            "name": "Azure Policy",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Security",
        "services": [
          {
            "name": "Azure App Configuration",
            "classification": "Related"
          },
          {
            "name": "Azure Key Vault",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-400"
  },
  {
    "code": "AI-901",
    "level": "Foundational",
    "title": "Microsoft Certified: Azure AI Fundamentals",
    "description": "Review the Azure AI services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "AI + machine learning",
        "services": [
          {
            "name": "Microsoft Foundry",
            "classification": "Direct"
          },
          {
            "name": "Azure AI Bot Service",
            "classification": "Direct"
          },
          {
            "name": "Azure AI Search",
            "classification": "Direct"
          },
          {
            "name": "Azure Databricks",
            "classification": "Related"
          },
          {
            "name": "Azure Machine Learning",
            "classification": "Direct"
          },
          {
            "name": "Azure Open Datasets",
            "classification": "Related"
          },
          {
            "name": "Azure AI Video Indexer",
            "classification": "Direct"
          },
          {
            "name": "Azure AI Custom Vision",
            "classification": "Direct"
          },
          {
            "name": "Azure Language in Foundry Tools",
            "classification": "Direct"
          },
          {
            "name": "Azure Translator in Foundry Tools",
            "classification": "Related"
          },
          {
            "name": "Azure OpenAI in Foundry Models",
            "classification": "Direct"
          },
          {
            "name": "Content Safety in Foundry Control Plane",
            "classification": "Direct"
          },
          {
            "name": "Health Bot",
            "classification": "Related"
          },
          {
            "name": "Azure Document Intelligence in Foundry Tools",
            "classification": "Direct"
          },
          {
            "name": "Foundry Models",
            "classification": "Related"
          },
          {
            "name": "Azure AI Immersive Reader",
            "classification": "Related"
          },
          {
            "name": "Phi open models",
            "classification": "Related"
          },
          {
            "name": "Azure Speech in Foundry Tools",
            "classification": "Direct"
          },
          {
            "name": "Azure Vision in Foundry Tools",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
  },
  {
    "code": "AI-103",
    "level": "Associate",
    "title": "Microsoft Certified: Azure AI Apps and Agents Developer Associate",
    "description": "Study the Azure AI application and agent services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "AI + machine learning",
        "services": [
          {
            "name": "Microsoft Foundry",
            "classification": "Direct"
          },
          {
            "name": "Azure AI Bot Service",
            "classification": "Related"
          },
          {
            "name": "Azure AI Search",
            "classification": "Direct"
          },
          {
            "name": "Azure Databricks",
            "classification": "Related"
          },
          {
            "name": "Azure Machine Learning",
            "classification": "Related"
          },
          {
            "name": "Azure AI Custom Vision",
            "classification": "Related"
          },
          {
            "name": "Azure Language in Foundry Tools",
            "classification": "Direct"
          },
          {
            "name": "Azure OpenAI in Foundry Models",
            "classification": "Direct"
          },
          {
            "name": "Content Safety in Foundry Control Plane",
            "classification": "Direct"
          },
          {
            "name": "Azure Document Intelligence in Foundry Tools",
            "classification": "Direct"
          },
          {
            "name": "Azure Content Understanding in Foundry Tools",
            "classification": "Related"
          },
          {
            "name": "Azure Speech in Foundry Tools",
            "classification": "Direct"
          },
          {
            "name": "Foundry Agent Service",
            "classification": "Direct"
          },
          {
            "name": "Azure Vision in Foundry Tools",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Analytics",
        "services": [
          {
            "name": "Microsoft Graph Data Connect",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Compute",
        "services": [
          {
            "name": "App Service",
            "classification": "Direct"
          },
          {
            "name": "Azure Kubernetes Service (AKS)",
            "classification": "Direct"
          },
          {
            "name": "Azure Functions",
            "classification": "Direct"
          },
          {
            "name": "Azure Container Apps",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Databases",
        "services": [
          {
            "name": "Azure Cosmos DB",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "DevOps",
        "services": [
          {
            "name": "Azure Monitor",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Identity",
        "services": [
          {
            "name": "Microsoft Entra ID (formerly Azure AD)",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Security",
        "services": [
          {
            "name": "Azure App Configuration",
            "classification": "Related"
          },
          {
            "name": "Azure Key Vault",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103"
  },
  {
    "code": "DP-900",
    "level": "Foundational",
    "title": "Microsoft Certified: Azure Data Fundamentals",
    "description": "Review the Azure data services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "AI + machine learning",
        "services": [
          {
            "name": "Azure Databricks",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Analytics",
        "services": [
          {
            "name": "Azure Analysis Services",
            "classification": "Related"
          },
          {
            "name": "Azure Data Explorer",
            "classification": "Direct"
          },
          {
            "name": "Azure Data Factory",
            "classification": "Direct"
          },
          {
            "name": "Azure Data Lake Storage",
            "classification": "Direct"
          },
          {
            "name": "Azure Data Share",
            "classification": "Related"
          },
          {
            "name": "Azure Stream Analytics",
            "classification": "Direct"
          },
          {
            "name": "Azure Synapse Analytics",
            "classification": "Direct"
          },
          {
            "name": "Event Hubs",
            "classification": "Direct"
          },
          {
            "name": "Power BI Embedded",
            "classification": "Related"
          },
          {
            "name": "Microsoft Fabric",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Purview",
            "classification": "Direct"
          },
          {
            "name": "Power BI",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Compute",
        "services": [
          {
            "name": "SQL Server on Azure Virtual Machines",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Databases",
        "services": [
          {
            "name": "Azure Cosmos DB",
            "classification": "Direct"
          },
          {
            "name": "Azure Database for PostgreSQL",
            "classification": "Direct"
          },
          {
            "name": "Azure Database for MySQL",
            "classification": "Direct"
          },
          {
            "name": "Azure SQL Database",
            "classification": "Direct"
          },
          {
            "name": "Azure SQL Managed Instance",
            "classification": "Direct"
          },
          {
            "name": "Azure Database Migration Service",
            "classification": "Related"
          },
          {
            "name": "Azure Table Storage",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Storage",
        "services": [
          {
            "name": "Azure Files",
            "classification": "Direct"
          },
          {
            "name": "Azure Blob Storage",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900"
  },
  {
    "code": "DP-300",
    "level": "Associate",
    "title": "Microsoft Certified: Azure Database Administrator Associate",
    "description": "Study the Azure database administration services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "Compute",
        "services": [
          {
            "name": "SQL Server on Azure Virtual Machines",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Databases",
        "services": [
          {
            "name": "Azure Database for PostgreSQL",
            "classification": "Related"
          },
          {
            "name": "Azure Database for MySQL",
            "classification": "Related"
          },
          {
            "name": "Azure SQL Database",
            "classification": "Direct"
          },
          {
            "name": "Azure SQL Managed Instance",
            "classification": "Direct"
          },
          {
            "name": "Azure Database Migration Service",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Developer tools",
        "services": [
          {
            "name": "Azure DevOps",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "DevOps",
        "services": [
          {
            "name": "Azure Monitor",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Hybrid + multicloud",
        "services": [
          {
            "name": "Microsoft Defender for Cloud",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Identity",
        "services": [
          {
            "name": "Microsoft Entra ID (formerly Azure AD)",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Management and governance",
        "services": [
          {
            "name": "Azure Backup",
            "classification": "Direct"
          },
          {
            "name": "Azure Policy",
            "classification": "Related"
          },
          {
            "name": "Azure Site Recovery",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Networking",
        "services": [
          {
            "name": "Azure Private Link",
            "classification": "Direct"
          },
          {
            "name": "Azure Virtual Network",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Security",
        "services": [
          {
            "name": "Azure Key Vault",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-300"
  },
  {
    "code": "DP-600",
    "level": "Associate",
    "title": "Microsoft Certified: Fabric Analytics Engineer Associate",
    "description": "Study the analytics and Fabric services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "AI + machine learning",
        "services": [
          {
            "name": "Azure Databricks",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Analytics",
        "services": [
          {
            "name": "Azure Data Explorer",
            "classification": "Related"
          },
          {
            "name": "Azure Data Factory",
            "classification": "Direct"
          },
          {
            "name": "Azure Data Lake Storage",
            "classification": "Related"
          },
          {
            "name": "Azure Stream Analytics",
            "classification": "Related"
          },
          {
            "name": "Azure Synapse Analytics",
            "classification": "Related"
          },
          {
            "name": "Event Hubs",
            "classification": "Related"
          },
          {
            "name": "Microsoft Fabric",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Purview",
            "classification": "Direct"
          },
          {
            "name": "Power BI",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-600"
  },
  {
    "code": "AZ-140",
    "level": "Associate",
    "title": "Microsoft Certified: Azure Virtual Desktop Specialty",
    "description": "Study the Azure Virtual Desktop services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "Compute",
        "services": [
          {
            "name": "Azure Virtual Desktop",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Developer tools",
        "services": [
          {
            "name": "Microsoft Dev Box",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "DevOps",
        "services": [
          {
            "name": "Azure Monitor",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Identity",
        "services": [
          {
            "name": "Microsoft Entra ID (formerly Azure AD)",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Entra Domain Services",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Management and governance",
        "services": [
          {
            "name": "Azure Backup",
            "classification": "Direct"
          },
          {
            "name": "Azure Site Recovery",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Networking",
        "services": [
          {
            "name": "Azure Bastion",
            "classification": "Related"
          },
          {
            "name": "Azure Load Balancer",
            "classification": "Related"
          },
          {
            "name": "Azure Virtual Network",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Storage",
        "services": [
          {
            "name": "Azure Files",
            "classification": "Direct"
          },
          {
            "name": "Azure NetApp Files",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Virtual desktop infrastructure",
        "services": [
          {
            "name": "Azure Lab Services",
            "classification": "Related"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-140"
  },
  {
    "code": "AZ-120",
    "level": "Specialty",
    "title": "Microsoft Certified: Azure for SAP Workloads Specialty",
    "description": "Study the Azure services mapped in the current certification tracker for SAP workloads.",
    "scope": [
      {
        "title": "Databases",
        "services": [
          {
            "name": "Azure Database for PostgreSQL",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "DevOps",
        "services": [
          {
            "name": "Azure Monitor",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Hybrid + multicloud",
        "services": [
          {
            "name": "Azure ExpressRoute",
            "classification": "Direct"
          },
          {
            "name": "Azure Storage Mover",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Identity",
        "services": [
          {
            "name": "Microsoft Entra ID (formerly Azure AD)",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Management and governance",
        "services": [
          {
            "name": "Azure Backup",
            "classification": "Direct"
          },
          {
            "name": "Azure Migrate",
            "classification": "Direct"
          },
          {
            "name": "Azure Site Recovery",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Networking",
        "services": [
          {
            "name": "Azure Application Gateway",
            "classification": "Related"
          },
          {
            "name": "Azure Firewall",
            "classification": "Direct"
          },
          {
            "name": "Azure Load Balancer",
            "classification": "Direct"
          },
          {
            "name": "Azure Virtual Network",
            "classification": "Direct"
          },
          {
            "name": "Azure VPN Gateway",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Security",
        "services": [
          {
            "name": "Azure Key Vault",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Storage",
        "services": [
          {
            "name": "Azure NetApp Files",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-120"
  },
  {
    "code": "SC-900",
    "level": "Foundational",
    "title": "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
    "description": "Review the security, compliance and identity services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "AI + machine learning",
        "services": [
          {
            "name": "Microsoft Security Copilot",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Analytics",
        "services": [
          {
            "name": "Microsoft Purview",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Hybrid + multicloud",
        "services": [
          {
            "name": "Microsoft Sentinel",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Defender for Cloud",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Identity",
        "services": [
          {
            "name": "Microsoft Entra ID (formerly Azure AD)",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Entra Domain Services",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Entra External ID",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Management and governance",
        "services": [
          {
            "name": "Azure Policy",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Security",
        "services": [
          {
            "name": "Microsoft Defender External Attack Surface Management",
            "classification": "Related"
          },
          {
            "name": "Azure Information Protection",
            "classification": "Related"
          },
          {
            "name": "Azure Key Vault",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900"
  },
  {
    "code": "SC-300",
    "level": "Associate",
    "title": "Microsoft Certified: Identity and Access Administrator Associate",
    "description": "Study the identity and access services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "Analytics",
        "services": [
          {
            "name": "Microsoft Graph Data Connect",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "Identity",
        "services": [
          {
            "name": "Microsoft Entra ID (formerly Azure AD)",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Entra Domain Services",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Entra Verified ID",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Entra External ID",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Security",
        "services": [
          {
            "name": "Azure App Configuration",
            "classification": "Related"
          },
          {
            "name": "Azure Key Vault",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300"
  },
  {
    "code": "SC-200",
    "level": "Associate",
    "title": "Microsoft Certified: Security Operations Analyst Associate",
    "description": "Study the security operations services mapped in the current certification tracker.",
    "scope": [
      {
        "title": "AI + machine learning",
        "services": [
          {
            "name": "Microsoft Security Copilot",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Analytics",
        "services": [
          {
            "name": "Microsoft Purview",
            "classification": "Related"
          }
        ]
      },
      {
        "title": "DevOps",
        "services": [
          {
            "name": "Azure Monitor",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Hybrid + multicloud",
        "services": [
          {
            "name": "Microsoft Sentinel",
            "classification": "Direct"
          },
          {
            "name": "Microsoft Defender for Cloud",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Identity",
        "services": [
          {
            "name": "Microsoft Entra ID (formerly Azure AD)",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Integration",
        "services": [
          {
            "name": "Logic Apps",
            "classification": "Direct"
          }
        ]
      },
      {
        "title": "Security",
        "services": [
          {
            "name": "Azure App Configuration",
            "classification": "Related"
          },
          {
            "name": "Microsoft Defender External Attack Surface Management",
            "classification": "Direct"
          }
        ]
      }
    ],
    "sourceUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-200"
  }
];

export const azureCourseByCode = Object.fromEntries(azureCourses.map((course) => [course.code, course]));
