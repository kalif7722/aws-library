import { azureNewExamDomains } from "./azure-new-exam-objectives";

export type AzureExamDomain = { name: string; weight: string; groups: Array<{ name: string; tasks: string[] }> };

export const azureOfficialExamDomains: Record<string, AzureExamDomain[]> = {
  ...azureNewExamDomains,
  "SC-200": [
    {
      "name": "Manage a security operations environment",
      "weight": "40–45%",
      "groups": [
        {
          "name": "Configure automation for Microsoft Defender XDR and Microsoft Sentinel",
          "tasks": [
            "Configure email notifications in Microsoft Defender XDR, including incidents, actions, and threat analytics",
            "Configure alert notifications in Microsoft Defender XDR, including tuning, suppression, and correlation",
            "Configure Microsoft Defender for Endpoint advanced features",
            "Configure rules settings in Microsoft Defender for Endpoint",
            "Configure custom data collection in Microsoft Defender for Endpoint",
            "Configure security policies for Microsoft Defender for Endpoint, including attack surface reduction (ASR) rules",
            "Manage automated investigation and response capabilities in Microsoft Defender XDR",
            "Configure automatic attack disruption in Microsoft Defender XDR",
            "Configure and manage device groups, permissions, and automation levels in Microsoft Defender for Endpoint",
            "Create and configure automation rules in Microsoft Sentinel",
            "Create and configure Microsoft Sentinel playbooks"
          ]
        },
        {
          "name": "Configure the Microsoft Sentinel SIEM and platform",
          "tasks": [
            "Specify Microsoft Sentinel roles",
            "Manage data retention for XDR and Microsoft Sentinel tables, including Analytics, Data lake, and XDR tiers",
            "Create and configure Microsoft Sentinel workbooks",
            "Optimize the Microsoft Sentinel platform, including SOC optimization recommendations"
          ]
        },
        {
          "name": "Ingest data into the Microsoft Sentinel SIEM and platform",
          "tasks": [
            "Select data connectors based on data source requirements, including Windows logs and security events",
            "Configure collection of Windows Security events by using Windows Security Events via AMA, including data collection rules",
            "Plan and configure collection of Windows Security events by using Windows Event Forwarding (WEF)",
            "Plan and configure Syslog via AMA and Common Event Format (CEF) via AMA connectors",
            "Configure collection of Azure activities by using Azure Policy and resource diagnostic settings",
            "Ingest threat indicators into Microsoft Sentinel",
            "Create custom log tables in the workspace to store ingested data"
          ]
        },
        {
          "name": "Configure detections",
          "tasks": [
            "Create custom detection rules by using Advanced Hunting in Microsoft Defender XDR",
            "Manage custom detection rules in Microsoft Defender XDR",
            "Configure and manage analytics rules in Microsoft Sentinel SIEM, including scheduled, near-real time (NRT), threat intelligence, and machine learning",
            "Analyze attack vector coverage by using the MITRE ATT&CK matrix",
            "Configure anomalies in Microsoft Sentinel"
          ]
        }
      ]
    },
    {
      "name": "Respond to security incidents",
      "weight": "35–40%",
      "groups": [
        {
          "name": "Respond to alerts and incidents in Microsoft Defender XDR",
          "tasks": [
            "Investigate and remediate threats by using Microsoft Defender for Office 365, including automatic attack disruption",
            "Investigate and remediate threats or compromised entities identified by Microsoft Purview",
            "Investigate and remediate alerts and incidents identified by Microsoft Defender for Cloud workload protections",
            "Investigate and remediate security risks identified by Microsoft Defender for Cloud Apps",
            "Investigate and remediate compromised identities that are identified by Microsoft Entra ID",
            "Investigate and remediate security alerts from Microsoft Defender for Identity",
            "Investigate and remediate alerts and incidents identified by Microsoft Sentinel",
            "Investigate incidents by using agentic AI, including embedded Microsoft Security Copilot",
            "Investigate complex attacks, such as multi-stage, multi-domain, and lateral movement",
            "Manage security incidents by using case management"
          ]
        },
        {
          "name": "Respond to alerts and incidents in Microsoft Defender for Endpoint",
          "tasks": [
            "Investigate device timelines",
            "Perform actions on the device, including live response and collecting investigation packages",
            "Perform evidence and entity investigation",
            "Investigate and remediate incidents identified by automatic attack disruption"
          ]
        },
        {
          "name": "Investigate Microsoft 365 activities to identify threats",
          "tasks": [
            "Investigate threats by using Microsoft Purview Audit",
            "Investigate threats by using Content search in Microsoft Purview eDiscovery",
            "Investigate threats by using Microsoft Graph activity logs"
          ]
        }
      ]
    },
    {
      "name": "Perform threat hunting",
      "weight": "20–25%",
      "groups": [
        {
          "name": "Detect threats by using Microsoft Defender XDR",
          "tasks": [
            "Identify the appropriate table to use in a KQL query",
            "Identify threats by using Kusto Query Language (KQL)",
            "Create Advanced Hunting queries",
            "Interpret threat analytics in Microsoft Defender XDR",
            "Create hunting graphs, including blast radius",
            "Analyze relationships between entities by using Sentinel Graph"
          ]
        },
        {
          "name": "Detect threats by using the Microsoft Sentinel platform",
          "tasks": [
            "Create and monitor hunting queries",
            "Create and manage KQL jobs in Data lake",
            "Create and manage Summary rule tables for querying",
            "Hunt for threats by using Notebooks, including connection to the Sentinel MCP Server"
          ]
        }
      ]
    }
  ],
  "SC-900": [
    {
      "name": "Describe the concepts of security, compliance, and identity",
      "weight": "10–15%",
      "groups": [
        { "name": "Describe security and compliance concepts", "tasks": [
          "Describe the shared responsibility model", "Describe defense-in-depth", "Describe the Zero Trust model", "Describe encryption and hashing", "Describe Governance, Risk, and Compliance (GRC) concepts"
        ] },
        { "name": "Define identity concepts", "tasks": [
          "Define identity as the primary security perimeter", "Define authentication", "Define authorization", "Describe identity providers", "Describe the concept of directory services and Active Directory", "Describe the concept of federation"
        ] }
      ]
    },
    {
      "name": "Describe the capabilities of Microsoft Entra",
      "weight": "25–30%",
      "groups": [
        { "name": "Describe function and identity types of Microsoft Entra ID", "tasks": ["Describe Microsoft Entra ID", "Describe types of identities, including agent ID", "Describe hybrid identity"] },
        { "name": "Describe authentication capabilities of Microsoft Entra ID", "tasks": ["Describe the authentication methods", "Describe multifactor authentication (MFA)", "Describe password protection and management capabilities"] },
        { "name": "Describe access management capabilities of Microsoft Entra ID", "tasks": ["Describe Microsoft Entra Conditional Access", "Describe Microsoft Entra roles and role-based access control (RBAC)"] },
        { "name": "Describe identity protection and governance capabilities of Microsoft Entra", "tasks": ["Describe Microsoft Entra ID Governance", "Describe access reviews", "Describe the capabilities of Microsoft Entra Privileged Identity Management", "Describe Microsoft Entra ID Protection"] }
      ]
    },
    {
      "name": "Describe the capabilities of Microsoft security solutions",
      "weight": "35–40%",
      "groups": [
        { "name": "Describe core infrastructure security services in Azure", "tasks": ["Describe Azure DDoS Protection", "Describe Azure Firewall", "Describe Azure Web Application Firewall (WAF)", "Describe network segmentation with Azure virtual networks", "Describe network security groups (NSGs)", "Describe Azure Bastion", "Describe Azure Key Vault"] },
        { "name": "Describe security management capabilities of Azure", "tasks": ["Describe Microsoft Defender for Cloud", "Describe Cloud Security Posture Management (CSPM)", "Describe how security policies, standards, and recommendations improve the cloud security posture", "Describe enhanced security features provided by cloud workload protection"] },
        { "name": "Describe capabilities of Microsoft Sentinel", "tasks": ["Define the concepts of security information and event management (SIEM) and security orchestration automated response (SOAR)", "Describe threat detection and mitigation capabilities in Microsoft Sentinel"] },
        { "name": "Describe threat protection with Microsoft Defender XDR", "tasks": ["Describe Microsoft Defender XDR services", "Describe Microsoft Defender for Office 365", "Describe Microsoft Defender for Endpoint", "Describe Microsoft Defender for Cloud Apps", "Describe Microsoft Defender for Identity", "Describe Microsoft Defender Vulnerability Management", "Describe Microsoft Defender Threat Intelligence (Defender TI)", "Describe the Microsoft Defender portal"] }
      ]
    },
    {
      "name": "Describe the capabilities of Microsoft compliance solutions",
      "weight": "20–25%",
      "groups": [
        { "name": "Describe Microsoft Service Trust Portal and privacy principles", "tasks": ["Describe the Service Trust Portal offerings", "Describe the privacy principles of Microsoft"] },
        { "name": "Describe compliance management capabilities of Microsoft Purview", "tasks": ["Describe the Microsoft Purview portal", "Describe Compliance Manager", "Describe the uses and benefits of compliance score"] },
        { "name": "Describe information protection, data lifecycle management, and data governance capabilities of Microsoft Purview", "tasks": ["Describe the data classification capabilities", "Describe the benefits of Content explorer and Activity explorer", "Describe sensitivity labels and sensitivity label policies", "Describe data loss prevention (DLP)", "Describe records management", "Describe retention policies, retention labels, and retention label policies"] },
        { "name": "Describe insider risk, eDiscovery, and audit capabilities in Microsoft Purview", "tasks": ["Describe insider risk management", "Describe eDiscovery solutions in Microsoft Purview", "Describe audit solutions in Microsoft Purview"] }
      ]
    }
  ],
  "AZ-104": [
    {
      "name": "Manage Azure identities and governance",
      "weight": "20–25%",
      "groups": [
        {
          "name": "Manage Microsoft Entra users and groups",
          "tasks": [
            "Create users and groups",
            "Manage user and group properties",
            "Manage licenses in Microsoft Entra ID",
            "Manage external users",
            "Configure self-service password reset (SSPR)"
          ]
        },
        {
          "name": "Manage access to Azure resources",
          "tasks": [
            "Manage built-in Azure roles",
            "Assign roles at different scopes",
            "Interpret access assignments"
          ]
        },
        {
          "name": "Manage Azure subscriptions and governance",
          "tasks": [
            "Implement and manage Azure Policy",
            "Configure resource locks",
            "Apply and manage tags on resources",
            "Manage resource groups",
            "Manage subscriptions",
            "Manage costs by using alerts, budgets, and Azure Advisor recommendations",
            "Configure management groups"
          ]
        }
      ]
    },
    {
      "name": "Implement and manage storage",
      "weight": "15–20%",
      "groups": [
        {
          "name": "Configure access to storage",
          "tasks": [
            "Configure Azure Storage firewalls and virtual networks",
            "Create and use shared access signature (SAS) tokens",
            "Configure stored access policies",
            "Manage access keys",
            "Configure identity-based access for Azure Files"
          ]
        },
        {
          "name": "Configure and manage storage accounts",
          "tasks": [
            "Create and configure storage accounts",
            "Configure Azure Storage redundancy",
            "Configure object replication",
            "Configure storage account encryption",
            "Manage data by using Azure Storage Explorer and AzCopy"
          ]
        },
        {
          "name": "Configure Azure Files and Azure Blob Storage",
          "tasks": [
            "Create and configure a file share in Azure Files",
            "Create and configure a container in Azure Blob Storage",
            "Configure storage tiers",
            "Configure soft delete for blobs and containers",
            "Configure snapshots and soft delete for Azure Files",
            "Configure blob lifecycle management",
            "Configure blob versioning"
          ]
        }
      ]
    },
    {
      "name": "Deploy and manage Azure compute resources",
      "weight": "20–25%",
      "groups": [
        {
          "name": "Automate deployment of resources by using Azure Resource Manager (ARM) templates or Bicep files",
          "tasks": [
            "Interpret an Azure Resource Manager template or a Bicep file",
            "Modify an existing Azure Resource Manager template",
            "Modify an existing Bicep file",
            "Deploy resources by using an Azure Resource Manager template or a Bicep file",
            "Export a deployment as an Azure Resource Manager template or convert an Azure Resource Manager template to a Bicep file"
          ]
        },
        {
          "name": "Create and configure virtual machines",
          "tasks": [
            "Create a virtual machine",
            "Configure encryption at host for Azure virtual machines",
            "Move a virtual machine to another resource group, subscription, or region",
            "Manage virtual machine sizes",
            "Manage virtual machine disks",
            "Deploy virtual machines to availability zones and availability sets",
            "Deploy and configure an Azure Virtual Machine Scale Sets"
          ]
        },
        {
          "name": "Provision and manage containers in the Azure portal",
          "tasks": [
            "Create and manage an Azure Container Registry",
            "Provision a container by using Azure Container Instances",
            "Provision a container by using Azure Container Apps",
            "Manage sizing and scaling for containers, including Azure Container Instances and Azure Container Apps"
          ]
        },
        {
          "name": "Create and configure Azure App Service",
          "tasks": [
            "Provision an App Service plan",
            "Configure scaling for an App Service plan",
            "Create an App Service",
            "Configure certificates and Transport Layer Security (TLS) for an App Service",
            "Map an existing custom DNS name to an App Service",
            "Configure backup for an App Service",
            "Configure networking settings for an App Service",
            "Configure deployment slots for an App Service"
          ]
        }
      ]
    },
    {
      "name": "Implement and manage virtual networking",
      "weight": "15–20%",
      "groups": [
        {
          "name": "Configure and manage virtual networks in Azure",
          "tasks": [
            "Create and configure virtual networks and subnets",
            "Create and configure virtual network peering",
            "Configure public IP addresses",
            "Configure user-defined routes",
            "Troubleshoot network connectivity"
          ]
        },
        {
          "name": "Configure secure access to virtual networks",
          "tasks": [
            "Create and configure network security groups (NSGs) and application security groups",
            "Evaluate effective security rules in NSGs",
            "Implement Azure Bastion",
            "Configure service endpoints for Azure platform as a service (PaaS)",
            "Configure private endpoints for Azure PaaS"
          ]
        },
        {
          "name": "Configure name resolution and load balancing",
          "tasks": [
            "Configure Azure DNS",
            "Configure an internal or public load balancer",
            "Troubleshoot load balancing"
          ]
        }
      ]
    },
    {
      "name": "Monitor and maintain Azure resources",
      "weight": "10–15%",
      "groups": [
        {
          "name": "Monitor resources in Azure",
          "tasks": [
            "Interpret metrics in Azure Monitor",
            "Configure log settings in Azure Monitor",
            "Query and analyze logs in Azure Monitor",
            "Set up alert rules, action groups, and alert processing rules in Azure Monitor",
            "Configure and interpret monitoring of virtual machines, storage accounts, and networks by using Azure Monitor Insights",
            "Use Azure Network Watcher and Connection monitor"
          ]
        },
        {
          "name": "Implement backup and recovery",
          "tasks": [
            "Create a Recovery Services vault",
            "Create an Azure Backup vault",
            "Create and configure a backup policy",
            "Perform backup and restore operations by using Azure Backup",
            "Configure Azure Site Recovery for Azure resources",
            "Perform a failover to a secondary region by using Site Recovery",
            "Configure and interpret reports and alerts for backups"
          ]
        }
      ]
    }
  ],
  "AZ-400": [
    { name: "Design and implement processes and communications", weight: "10–15%", groups: [
      { name: "Design and implement traceability and flow of work", tasks: ["Design and implement a work item strategy", "Configure Azure Boards and GitHub integration", "Design traceability from work items to builds and releases"] },
      { name: "Design and implement appropriate metrics and queries for DevOps", tasks: ["Design metrics and queries for planning, development, testing, security, delivery, and operations"] },
      { name: "Configure collaboration and communication", tasks: ["Configure wikis, process diagrams, and documentation", "Automate documentation from Git history", "Configure webhooks and collaboration integrations"] }
    ] },
    { name: "Design and implement a source control strategy", weight: "10–15%", groups: [
      { name: "Design and implement branching strategies for the source code", tasks: ["Design trunk-based, feature, and release branch strategies", "Configure pull request workflows and branch protection"] },
      { name: "Configure and manage repositories", tasks: ["Manage large files and repository scale", "Configure repository permissions and tags", "Recover and remove data from source control"] }
    ] },
    { name: "Design and implement build and release pipelines", weight: "50–55%", groups: [
      { name: "Design and implement a package management strategy", tasks: ["Select GitHub Packages or Azure Artifacts", "Manage feeds, views, dependencies, and artifact versions"] },
      { name: "Design and implement a testing strategy for pipelines", tasks: ["Choose local, unit, integration, and load tests", "Configure quality, security, and release gates"] },
      { name: "Design and implement pipelines", tasks: ["Build YAML pipelines and reusable templates", "Configure agents, triggers, variables, and artifacts"] },
      { name: "Design and implement deployments", tasks: ["Configure environments, deployment jobs, approvals, and checks", "Choose progressive delivery and rollback strategies"] },
      { name: "Design and implement infrastructure as code (IaC)", tasks: ["Choose declarative infrastructure definitions", "Validate, deploy, and govern infrastructure through pipelines"] },
      { name: "Maintain pipelines", tasks: ["Monitor, diagnose, secure, and optimize pipelines"] }
    ] },
    { name: "Develop a security and compliance plan", weight: "10–15%", groups: [
      { name: "Design and implement authentication and authorization methods", tasks: ["Configure service connections and least privilege", "Manage identities and repository or pipeline access"] },
      { name: "Design and implement a strategy for managing sensitive information in automation", tasks: ["Protect secrets, keys, and certificates in automation", "Use secure variables and secret stores"] },
      { name: "Automate security and compliance scanning", tasks: ["Integrate dependency, code, and infrastructure scanning", "Review security findings and compliance evidence"] }
    ] },
    { name: "Implement an instrumentation strategy", weight: "5–10%", groups: [
      { name: "Configure monitoring for a DevOps environment", tasks: ["Instrument applications and infrastructure", "Configure telemetry, alerts, and feedback loops"] },
      { name: "Analyze metrics from instrumentation", tasks: ["Analyze application, infrastructure, and delivery metrics", "Use monitoring insights to improve reliability"] }
    ] }
  ],
  "AZ-305": [
    {
      "name": "Design identity, governance, and monitoring solutions",
      "weight": "25–30%",
      "groups": [
        {
          "name": "Design solutions for logging and monitoring",
          "tasks": [
            "Recommend a logging solution",
            "Recommend a solution for routing logs",
            "Recommend a monitoring solution"
          ]
        },
        {
          "name": "Design authentication and authorization solutions",
          "tasks": [
            "Recommend an authentication solution",
            "Recommend an identity management solution",
            "Recommend a solution for authorizing access to Azure resources",
            "Recommend a solution for authorizing access to on-premises resources",
            "Recommend a solution to manage secrets, certificates, and keys"
          ]
        },
        {
          "name": "Design governance",
          "tasks": [
            "Recommend a structure for management groups, subscriptions, and resource groups, and a strategy for resource tagging",
            "Recommend a solution for managing compliance",
            "Recommend a solution for identity governance"
          ]
        }
      ]
    },
    {
      "name": "Design data storage solutions",
      "weight": "20–25%",
      "groups": [
        {
          "name": "Design data storage solutions for relational data",
          "tasks": [
            "Recommend a solution for storing relational data",
            "Recommend a database service tier and compute tier",
            "Recommend a solution for database scalability",
            "Recommend a solution for data protection"
          ]
        },
        {
          "name": "Design data storage solutions for semi-structured and unstructured data",
          "tasks": [
            "Recommend a solution for storing semi-structured data",
            "Recommend a solution for storing unstructured data",
            "Recommend a data storage solution to balance features, performance, and costs",
            "Recommend a data solution for protection and durability"
          ]
        },
        {
          "name": "Design data integration",
          "tasks": [
            "Recommend a solution for data integration",
            "Recommend a solution for data analysis"
          ]
        }
      ]
    },
    {
      "name": "Design business continuity solutions",
      "weight": "15–20%",
      "groups": [
        {
          "name": "Design solutions for backup and disaster recovery",
          "tasks": [
            "Recommend a recovery solution for Azure and hybrid workloads that meets recovery objectives",
            "Recommend a backup and recovery solution for compute",
            "Recommend a backup and recovery solution for databases",
            "Recommend a backup and recovery solution for unstructured data"
          ]
        },
        {
          "name": "Design for high availability",
          "tasks": [
            "Recommend a high availability solution for compute",
            "Recommend a high availability solution for relational data",
            "Recommend a high availability solution for semi-structured and unstructured data"
          ]
        }
      ]
    },
    {
      "name": "Design infrastructure solutions",
      "weight": "30–35%",
      "groups": [
        {
          "name": "Design compute solutions",
          "tasks": [
            "Specify components of a compute solution based on workload requirements",
            "Recommend a virtual machine-based solution",
            "Recommend a container-based solution",
            "Recommend a serverless-based solution",
            "Recommend a compute solution for batch processing"
          ]
        },
        {
          "name": "Design an application architecture",
          "tasks": [
            "Recommend a messaging architecture",
            "Recommend an event-driven architecture",
            "Recommend a solution for API integration",
            "Recommend a caching solution for applications",
            "Recommend an application configuration management solution",
            "Recommend an automated deployment solution for applications"
          ]
        },
        {
          "name": "Design migrations",
          "tasks": [
            "Evaluate a migration solution that leverages the Microsoft Cloud Adoption Framework for Azure",
            "Evaluate on-premises servers, data, and applications for migration",
            "Recommend a solution for migrating workloads to infrastructure as a service (IaaS) and platform as a service (PaaS)",
            "Recommend a solution for migrating databases",
            "Recommend a solution for migrating unstructured data"
          ]
        },
        {
          "name": "Design network solutions",
          "tasks": [
            "Recommend a connectivity solution that connects Azure resources to the internet",
            "Recommend a connectivity solution that connects Azure resources to on-premises networks",
            "Recommend a solution to optimize network performance",
            "Recommend a solution to optimize network security",
            "Recommend a load-balancing and routing solution"
          ]
        }
      ]
    }
  ],
  "AZ-700": [
    {
      "name": "Design and implement core networking infrastructure",
      "weight": "25–30%",
      "groups": [
        {
          "name": "Design and implement IP addressing for Azure resources",
          "tasks": [
            "Plan and implement network segmentation and address spaces",
            "Create a virtual network (VNet)",
            "Plan and configure subnetting for services, including virtual network gateways, private endpoints, service endpoints, firewalls, application gateways, VNet-integrated platform services, and Azure Bastion",
            "Plan and configure subnet delegation",
            "Plan and configure shared or dedicated subnets",
            "Create a Public IP Prefix",
            "Choose when to use a public IP address prefix",
            "Plan and implement a Custom IP address prefix (bring your own IP)",
            "Create a public IP address",
            "Associate public IP addresses to resources"
          ]
        },
        {
          "name": "Design and implement name resolution",
          "tasks": [
            "Design name resolution inside a VNet",
            "Configure DNS settings for a VNet",
            "Design public DNS zones",
            "Design private DNS zones",
            "Configure public and private DNS zones",
            "Link a private DNS zone to a VNet",
            "Design and implement Azure DNS Private Resolver"
          ]
        },
        {
          "name": "Design and implement VNet connectivity and routing",
          "tasks": [
            "Design service chaining, including gateway transit",
            "Implement VNet peering",
            "Implement and manage virtual network connectivity by using Azure Virtual Network Manager",
            "Design and implement user-defined routes (UDRs)",
            "Associate a route table with a subnet",
            "Configure forced tunneling",
            "Diagnose and resolve routing issues",
            "Design and implement Azure Route Server",
            "Identify appropriate use cases for Azure NAT Gateway",
            "Implement Azure NAT Gateway"
          ]
        },
        {
          "name": "Monitor networks",
          "tasks": [
            "Configure monitoring, network diagnostics, and logs in Azure Network Watcher",
            "Monitor and troubleshoot network health by using Azure Network Watcher",
            "Monitor and troubleshoot networks by using Azure Monitor for Networks",
            "Activate and monitor distributed denial-of-service (DDoS) protection",
            "Evaluate network security recommendations identified by Microsoft Defender for Cloud Secure Score",
            "Evaluate network security recommendations identified by Microsoft Defender for Cloud attack path analysis",
            "Identify network resources by using Cloud Security Explorer in Microsoft Defender for Cloud"
          ]
        }
      ]
    },
    {
      "name": "Design, implement, and manage connectivity services",
      "weight": "20–25%",
      "groups": [
        {
          "name": "Design, implement, and manage a site-to-site VPN connection",
          "tasks": [
            "Design a site-to-site VPN connection, including for high availability",
            "Select an appropriate virtual network gateway stock-keeping unit (SKU) for site-to-site VPN requirements",
            "Implement a site-to-site VPN connection",
            "Identify when to use a policy-based VPN versus a route-based VPN connection",
            "Create and configure a local network gateway",
            "Create and configure an IPsec/Internet Key Exchange (IKE) policy",
            "Create and configure a virtual network gateway",
            "Diagnose and resolve virtual network gateway connectivity issues",
            "Implement Azure Extended Network"
          ]
        },
        {
          "name": "Design, implement, and manage a point-to-site VPN connection",
          "tasks": [
            "Select an appropriate virtual network gateway SKU for point-to-site VPN requirements",
            "Select and configure a tunnel type",
            "Select an appropriate authentication method",
            "Configure RADIUS authentication",
            "Configure authentication by using Microsoft Entra ID",
            "Implement a VPN client configuration file",
            "Diagnose and resolve client-side and authentication issues",
            "Specify Azure requirements for Always On VPN",
            "Specify Azure requirements for Azure Network Adapter"
          ]
        },
        {
          "name": "Design, implement, and manage Azure ExpressRoute",
          "tasks": [
            "Select an ExpressRoute connectivity model",
            "Select an appropriate ExpressRoute SKU and tier",
            "Design and implement ExpressRoute to meet requirements, including cross-region connectivity, redundancy, and disaster recovery",
            "Design and implement ExpressRoute options, including Global Reach, FastPath, and ExpressRoute Direct",
            "Choose between Azure private peering only, Microsoft peering only, or both",
            "Configure Azure private peering",
            "Configure Microsoft peering",
            "Create and configure an ExpressRoute gateway",
            "Connect a virtual network to an ExpressRoute circuit",
            "Recommend a route advertisement configuration",
            "Configure encryption over ExpressRoute",
            "Implement Bidirectional Forwarding Detection",
            "Diagnose and resolve ExpressRoute connection issues"
          ]
        },
        {
          "name": "Design and implement an Azure Virtual WAN architecture",
          "tasks": [
            "Select a Virtual WAN SKU",
            "Design a Virtual WAN architecture, including selecting types and services",
            "Create a virtual hub in Virtual WAN",
            "Choose an appropriate scale unit for each gateway type",
            "Deploy a gateway into a virtual hub",
            "Configure virtual hub routing",
            "Integrate a virtual hub with a third-party NVA for cloud connectivity"
          ]
        }
      ]
    },
    {
      "name": "Design and implement application delivery services",
      "weight": "15–20%",
      "groups": [
        {
          "name": "Design and implement Azure Load Balancer and Azure Traffic Manager",
          "tasks": [
            "Map requirements to features and capabilities of Azure Load Balancer",
            "Identify appropriate use cases for Azure Load Balancer",
            "Choose an Azure Load Balancer SKU and tier",
            "Choose between public and internal load balancers",
            "Choose between regional and cross-region load balancers",
            "Create and configure an Azure Load Balancer",
            "Implement Azure Traffic Manager",
            "Implement Gateway Load Balancer",
            "Implement a load balancing rule",
            "Create and configure inbound NAT rules",
            "Create and configure explicit outbound rules, including source network address translation (SNAT)"
          ]
        },
        {
          "name": "Design and implement Azure Application Gateway",
          "tasks": [
            "Map requirements to features and capabilities of Azure Application Gateway",
            "Identify appropriate use cases for Azure Application Gateway",
            "Choose between manual and autoscale",
            "Create a backend pool",
            "Configure health probes",
            "Configure listeners",
            "Configure routing rules",
            "Configure HTTP settings",
            "Configure Transport Layer Security (TLS)",
            "Configure rewrite rule sets"
          ]
        },
        {
          "name": "Design and implement Azure Front Door",
          "tasks": [
            "Map requirements to features and capabilities of Azure Front Door",
            "Identify appropriate use cases for Azure Front Door",
            "Choose an appropriate tier",
            "Configure an Azure Front Door, including routing, origins, and endpoints",
            "Configure TLS termination and end-to-end TLS encryption",
            "Configure caching",
            "Configure traffic acceleration",
            "Implement rules, URL rewrite, and URL redirect",
            "Secure an origin by using Azure Private Link in Azure Front Door"
          ]
        }
      ]
    },
    {
      "name": "Design and implement private access to Azure services",
      "weight": "10–15%",
      "groups": [
        {
          "name": "Design and implement Azure Private Link service and Azure private endpoints",
          "tasks": [
            "Plan private endpoints",
            "Create private endpoints",
            "Configure access to private endpoints",
            "Create a Private Link service",
            "Integrate Private Link and Private Endpoint with DNS",
            "Integrate a Private Link service with on-premises clients"
          ]
        },
        {
          "name": "Design and implement service endpoints",
          "tasks": [
            "Choose when to use a service endpoint",
            "Create service endpoints",
            "Configure service endpoint policies",
            "Configure access to service endpoints"
          ]
        }
      ]
    },
    {
      "name": "Design and implement Azure network security services",
      "weight": "15–20%",
      "groups": [
        {
          "name": "Implement and manage network security groups",
          "tasks": [
            "Create a network security group (NSG)",
            "Associate a NSG to a subnet or network interface",
            "Create an application security group (ASG)",
            "Associate an ASG to a network interface",
            "Create and configure NSG inbound and outbound security rules",
            "Implement virtual network flow logs",
            "Interpret virtual network flow logs",
            "Verify IP flow",
            "Configure an NSG for remote server administration, including Azure Bastion",
            "Implement and manage virtual network security by using Azure Virtual Network Manager"
          ]
        },
        {
          "name": "Design and implement Azure Firewall and Azure Firewall Manager",
          "tasks": [
            "Map requirements to features and capabilities of Azure Firewall",
            "Select an appropriate Azure Firewall SKU",
            "Design an Azure Firewall deployment",
            "Create and implement an Azure Firewall deployment",
            "Configure Azure Firewall rules",
            "Create and implement Azure Firewall Manager policies",
            "Create a secure hub by deploying Azure Firewall inside an Azure Virtual WAN hub"
          ]
        },
        {
          "name": "Design and implement a Web Application Firewall (WAF) deployment",
          "tasks": [
            "Map requirements to features and capabilities of WAF",
            "Design a WAF deployment",
            "Configure detection or prevention mode",
            "Configure rule sets for WAF on Azure Front Door",
            "Configure rule sets for WAF on Application Gateway",
            "Implement a WAF policy",
            "Associate a WAF policy"
          ]
        }
      ]
    }
  ],
  "AZ-900": [
    {
      "name": "Describe cloud concepts",
      "weight": "25–30%",
      "groups": [
        {
          "name": "Describe cloud computing",
          "tasks": [
            "Define cloud computing",
            "Describe the shared responsibility model",
            "Define cloud models, including public, private, and hybrid",
            "Identify appropriate use cases for each cloud model",
            "Describe the consumption-based model",
            "Compare cloud pricing models",
            "Describe serverless"
          ]
        },
        {
          "name": "Describe the benefits of using cloud services",
          "tasks": [
            "Describe the benefits of high availability and scalability in the cloud",
            "Describe the benefits of reliability and predictability in the cloud",
            "Describe the benefits of security and governance in the cloud",
            "Describe the benefits of manageability in the cloud"
          ]
        },
        {
          "name": "Describe cloud service types",
          "tasks": [
            "Describe infrastructure as a service (IaaS)",
            "Describe platform as a service (PaaS)",
            "Describe software as a service (SaaS)",
            "Identify appropriate use cases for each cloud service type (IaaS, PaaS, and SaaS)"
          ]
        }
      ]
    },
    {
      "name": "Describe Azure architecture and services",
      "weight": "35–40%",
      "groups": [
        {
          "name": "Describe the core architectural components of Azure",
          "tasks": [
            "Describe Azure regions, region pairs, and sovereign regions",
            "Describe availability zones",
            "Describe Azure datacenters",
            "Describe Azure resources and resource groups",
            "Describe subscriptions",
            "Describe management groups",
            "Describe the hierarchy of resource groups, subscriptions, and management groups"
          ]
        },
        {
          "name": "Describe Azure compute and networking services",
          "tasks": [
            "Compare compute types, including containers, virtual machines, and functions",
            "Describe virtual machine options, including Azure virtual machines, Azure Virtual Machine Scale Sets, availability sets, and Azure Virtual Desktop",
            "Describe the resources required for virtual machines",
            "Describe application hosting options, including web apps, containers, and virtual machines",
            "Describe virtual networking, including the purpose of Azure virtual networks, subnets, peering, Azure DNS, Azure VPN Gateway, and ExpressRoute",
            "Define public and private endpoints"
          ]
        },
        {
          "name": "Describe Azure storage services",
          "tasks": [
            "Compare Azure Storage services",
            "Describe storage tiers",
            "Describe redundancy options",
            "Describe storage account options and storage types",
            "Identify options for moving files, including AzCopy, Azure Storage Explorer, and Azure File Sync",
            "Describe migration options, including Azure Migrate and Azure Data Box"
          ]
        },
        {
          "name": "Describe Azure identity, access, and security",
          "tasks": [
            "Describe directory services in Azure, including Microsoft Entra ID and Microsoft Entra Domain Services",
            "Describe authentication methods in Azure, including single sign-on (SSO), multifactor authentication (MFA), and passwordless",
            "Describe external identities in Azure",
            "Describe Microsoft Entra Conditional Access",
            "Describe Azure role-based access control (RBAC)",
            "Describe the concept of Zero Trust",
            "Describe the purpose of the defense-in-depth model",
            "Describe the purpose of Microsoft Defender for Cloud"
          ]
        }
      ]
    },
    {
      "name": "Describe Azure management and governance",
      "weight": "30–35%",
      "groups": [
        {
          "name": "Describe cost management in Azure",
          "tasks": [
            "Describe factors that can affect costs in Azure",
            "Explore the pricing calculator",
            "Describe cost management capabilities in Azure",
            "Describe the purpose of tags"
          ]
        },
        {
          "name": "Describe features and tools in Azure for governance and compliance",
          "tasks": [
            "Describe the purpose of Microsoft Purview in Azure",
            "Describe the purpose of Azure Policy",
            "Describe the purpose of resource locks"
          ]
        },
        {
          "name": "Describe features and tools for managing and deploying Azure resources",
          "tasks": [
            "Describe the Azure portal",
            "Describe Azure Cloud Shell, Azure CLI, and Azure PowerShell",
            "Describe the purpose of Azure Arc",
            "Describe infrastructure as code (IaC)",
            "Describe Azure Resource Manager (ARM) and ARM templates"
          ]
        },
        {
          "name": "Describe monitoring tools in Azure",
          "tasks": [
            "Describe the purpose of Azure Advisor",
            "Describe Azure Service Health",
            "Describe Azure Monitor, including Log Analytics, Azure Monitor alerts, and Azure Monitor Application Insights"
          ]
        }
      ]
    }
  ],
  "AZ-120": [
  {
    "name": "Migrate SAP workloads to Azure",
    "weight": "25–30%",
    "groups": [
      {
        "name": "Identify requirements for target infrastructure",
        "tasks": [
          "Estimate target sizing for SAP workloads",
          "Identify supported scenarios for SAP deployments on Azure",
          "Identify compute, storage, and network requirements for SAP workloads",
          "Assess constraints imposed by subscription models and quota limits",
          "Identify software licensing requirements for target workloads",
          "Identify cost implications for target workloads",
          "Specify an Azure support plan for the target infrastructure",
          "Choose between lift and shift, lift-shift-migrate, and lift-shift-migrate to HANA",
          "Choose an appropriate SAP workload migration strategy and tools"
        ]
      },
      {
        "name": "Design and implement an Azure environment to support SAP workloads",
        "tasks": [
          "Design and implement authorization and access control for SAP workloads",
          "Design and implement governance and compliance by using Azure Policy",
          "Design and implement authentication for SAP workloads",
          "Design and implement authentication for SAP software as a service (SaaS) applications",
          "Design and implement a management hierarchy, including management groups, subscriptions, and resource groups",
          "Design Azure landing zones for SAP"
        ]
      },
      {
        "name": "Design and implement integration with SAP RISE",
        "tasks": [
          "Design networking for SAP RISE",
          "Implement networking for SAP RISE",
          "Design and implement Azure compute, network, and storage services with SAP RISE",
          "Design and implement integration of data management services such as data archiving",
          "Design and implement integration of identity and security services with SAP RISE"
        ]
      }
    ]
  },
  {
    "name": "Design and implement an infrastructure to support SAP workloads on Azure",
    "weight": "25–30%",
    "groups": [
      {
        "name": "Design and implement a compute solution for SAP workloads",
        "tasks": [
          "Choose an SAP-certified Azure virtual machine for a given SAP workload",
          "Configure the Azure VM extension for SAP solutions",
          "Deploy an operating system by using an Azure Marketplace image",
          "Create a custom image and deploy it to an Azure virtual machine",
          "Automate a deployment of Azure virtual machines by using IaC, including Bicep and Azure",
          "Resource Manager (ARM) templates",
          "Automate a deployment by using the SAP Deployment Automation Framework",
          "Automate a deployment by using Azure Center for SAP solutions"
        ]
      },
      {
        "name": "Design and implement networking for SAP on Azure virtual machines",
        "tasks": [
          "Design and implement virtual networks and subnets",
          "Implement Accelerated Networking for Azure virtual machines",
          "Design and configure proximity placement groups",
          "Design networking to meet SAP workload latency requirements",
          "Design and implement network flow control",
          "Design and implement network security",
          "Design and implement service endpoints and private endpoints for Azure Storage",
          "Design name resolution for integration with Azure DNS",
          "Design and configure ExpressRoute for hybrid connectivity"
        ]
      },
      {
        "name": "Design and implement a storage solution for SAP on Azure virtual machines",
        "tasks": [
          "Choose a storage type",
          "Specify when to use disk striping and simple volumes",
          "Design for storage security considerations",
          "Design and implement data protection",
          "Design and implement caching for disks",
          "Configure Write Accelerator",
          "Configure encryption for storage, disks, and data",
          "Design and implement volumes by using Azure NetApp Files",
          "Design and implement volumes by using Azure Files"
        ]
      }
    ]
  },
  {
    "name": "Design and implement high availability and disaster recovery (HADR)",
    "weight": "20–25%",
    "groups": [
      {
        "name": "Design and implement a high availability solution for SAP on Azure virtual machines",
        "tasks": [
          "Design for service-level agreement (SLA) considerations",
          "Design and deploy SAP workloads into availability sets and availability zones",
          "Design and implement load balancing for high availability",
          "Configure clustering for HANA and SAP Central Services (SCS)",
          "Configure clustering for SQL",
          "Configure Pacemaker and STONITH",
          "Configure an Azure fence agent or STONITH Block Device (SBD)",
          "Design and configure storage-level replication for SAP workloads",
          "Configure restart of SAP systems, instances, and HANA databases"
        ]
      },
      {
        "name": "Design and implement a disaster recovery solution for SAP on Azure virtual machines",
        "tasks": [
          "Design and implement an Azure Site Recovery strategy for an SAP infrastructure",
          "Design a disaster recovery solution with regional considerations",
          "Specify network configurations for disaster recovery",
          "Design a backup strategy to meet SLA requirements",
          "Implement policies for backups and snapshots",
          "Configure and validate snapshots and backups for SAP workloads",
          "Perform backup and restore",
          "Test disaster recovery"
        ]
      }
    ]
  },
  {
    "name": "Maintain SAP workloads on Azure",
    "weight": "20–25%",
    "groups": [
      {
        "name": "Optimize performance and costs",
        "tasks": [
          "Optimize performance and costs for an SAP workload by using Azure Advisor recommendations",
          "Analyze and optimize network performance",
          "Optimize costs by using Azure Savings Plans or Reserved Instances for SAP virtual machines",
          "Optimize performance and costs by resizing Azure virtual machines",
          "Optimize storage costs",
          "Optimize data performance by using archiving",
          "Optimize performance and costs of SAP application servers and databases"
        ]
      },
      {
        "name": "Monitor and maintain SAP on Azure",
        "tasks": [
          "Monitor Azure virtual machines by using Azure Monitor",
          "Monitor high availability by using Azure Monitor",
          "Monitor storage by using Azure Monitor",
          "Monitor networking by using Azure Monitor and Azure Network Watcher",
          "Configure Azure Monitor for SAP solutions",
          "Manage backups by using Azure Backup",
          "Start and stop SAP systems by using Azure Center for SAP solutions",
          "Manage virtual instances by using Azure Center for SAP solutions",
          "Implement the SAP Landscape Management (LaMa) connector for Azure"
        ]
      }
    ]
  }
],
  "AZ-140": [
  {
    "name": "Plan and implement an Azure Virtual Desktop infrastructure",
    "weight": "40–45%",
    "groups": [
      {
        "name": "Plan, implement, and manage networking for Azure Virtual Desktop",
        "tasks": [
          "Assess network capacity and speed requirements for Azure Virtual Desktop",
          "Design network configuration for session hosts to meet requirements for Azure Virtual Desktop",
          "Plan and implement Remote Desktop Protocol (RDP) Shortpath, RDP Multipath, and quality of service (QoS) policies",
          "Plan and implement an Azure Private Link solution for Azure Virtual Desktop",
          "Monitor and troubleshoot network connectivity"
        ]
      },
      {
        "name": "Plan and implement storage for Azure Virtual Desktop user data",
        "tasks": [
          "Plan storage for Azure Virtual Desktop user data",
          "Implement storage for FSLogix components",
          "Implement storage accounts for Azure Virtual Desktop",
          "Implement file shares for Azure Virtual Desktop",
          "Implement Azure NetApp Files for Azure Virtual Desktop"
        ]
      },
      {
        "name": "Plan host pools and session hosts",
        "tasks": [
          "Recommend resource groups, subscriptions, and management groups for Azure Virtual Desktop resources",
          "Recommend an operating system (OS) for Azure Virtual Desktop session hosts",
          "Recommend an appropriate licensing model for Azure Virtual Desktop based on requirements",
          "Plan a host pool architecture",
          "Design an Azure Virtual Desktop configuration for performance requirements",
          "Design an Azure Virtual Desktop configuration for Azure Virtual Machines capacity requirements"
        ]
      },
      {
        "name": "Implement host pools and session hosts",
        "tasks": [
          "Create host pools and session hosts by using the Azure portal",
          "Automate creation of Azure Virtual Desktop hosts and host pools by using PowerShell, Azure CLI, Azure Resource Manager templates (ARM templates), and Bicep files",
          "Configure host pool and session host settings",
          "Configure licensing for session hosts, including user eligibility for Windows client access and RDS Client Access License (CAL) requirements for Windows Server"
        ]
      },
      {
        "name": "Create and manage session host images",
        "tasks": [
          "Create an image manually",
          "Create an image by using Azure VM Image Builder",
          "Modify an image",
          "Plan and implement lifecycle management for images",
          "Apply OS and application updates to an image",
          "Create a session host by using a custom image",
          "Plan and implement image storage, including Azure Compute Gallery"
        ]
      }
    ]
  },
  {
    "name": "Plan and implement identity and security",
    "weight": "15–20%",
    "groups": [
      {
        "name": "Plan and implement identity integration",
        "tasks": [
          "Select an identity scenario for Azure Virtual Desktop, including Active Directory Domain",
          "Services (AD DS), Microsoft Entra ID, and Microsoft Entra Domain Services",
          "Specify requirements to configure the Azure Virtual Desktop session host for an identity scenario",
          "Plan and implement Azure role-based access control (Azure RBAC) for Azure Virtual Desktop",
          "Plan and implement Microsoft Entra Conditional Access policies for connections to Azure",
          "Virtual Desktop",
          "Plan and implement authentication options in Azure Virtual Desktop, including passwordless, smart card, and multifactor authentication",
          "Manage roles, groups, and rights assignments on Azure Virtual Desktop session hosts",
          "Configure Microsoft Entra single sign-on"
        ]
      },
      {
        "name": "Plan and implement security",
        "tasks": [
          "Plan, implement, and manage security for Azure Virtual Desktop session hosts by using",
          "Microsoft Defender for Cloud",
          "Configure session host protection by using Microsoft Defender Antivirus",
          "Configure session host protection by using Microsoft Defender for Endpoint, including onboarding and scanning options",
          "Implement and manage network security for connections to Azure Virtual Desktop, including user defined routes (UDRs), network security groups (NSGs), and Azure Firewall",
          "Configure Azure Bastion or just-in-time (JIT) VM access for administrative access to session hosts",
          "Plan and implement Windows threat protection features on Azure Virtual Desktop session hosts, including App Control for Business and Controlled Folder Access",
          "Plan for and implement Azure confidential VMs and Trusted Launch security features for Azure Virtual Desktop session hosts"
        ]
      }
    ]
  },
  {
    "name": "Plan and implement user environments and apps",
    "weight": "20–25%",
    "groups": [
      {
        "name": "Plan and implement FSLogix",
        "tasks": [
          "Recommend FSLogix configuration",
          "Configure FSLogix Profile Containers",
          "Configure FSLogix ODFC containers",
          "Configure FSLogix Cloud Cache",
          "Implement FSLogix application masking"
        ]
      },
      {
        "name": "Plan and implement user experience and client settings",
        "tasks": [
          "Choose an Azure Virtual Desktop client",
          "Choose a deployment method for the client",
          "Deploy and troubleshoot Azure Virtual Desktop clients",
          "Configure device redirection",
          "Configure multimedia redirection",
          "Configure printing and Universal Print",
          "Configure user settings through Microsoft Intune policies or Group Policy",
          "Configure Remote Desktop Protocol (RDP) properties on a host pool",
          "Configure session timeout properties",
          "Implement the Start VM on Connect feature",
          "Assign and unassign personal desktops to users"
        ]
      },
      {
        "name": "Install and configure apps on a session host",
        "tasks": [
          "Choose a method for deploying an app to Azure Virtual Desktop",
          "Create and configure an application group",
          "Assign users to application groups",
          "Publish an application as a RemoteApp",
          "Implement and manage Microsoft 365 Apps on Azure Virtual Desktop session hosts",
          "Implement and manage OneDrive, including multisession environments",
          "Implement and manage Microsoft Teams, including the Remote Desktop WebRTC Redirector",
          "Service",
          "Implement and manage browsers for Azure Virtual Desktop sessions",
          "Configure dynamic application delivery by using App attach",
          "Create an application package for App attach"
        ]
      }
    ]
  },
  {
    "name": "Monitor and maintain an Azure Virtual Desktop infrastructure",
    "weight": "10–15%",
    "groups": [
      {
        "name": "Monitor and manage Azure Virtual Desktop services",
        "tasks": [
          "Configure log collection and analysis for Azure Virtual Desktop session hosts",
          "Monitor Azure Virtual Desktop by using Azure Monitor",
          "Customize Azure Monitor workbooks for Azure Virtual Desktop Insights",
          "Optimize session host capacity and performance",
          "Implement autoscaling in host pools",
          "Monitor and manage active sessions and application groups"
        ]
      },
      {
        "name": "Plan and implement updates, backups, and disaster recovery",
        "tasks": [
          "Recommend an update strategy for session hosts",
          "Plan and implement a disaster recovery plan for Azure Virtual Desktop",
          "Plan for multi-region implementation",
          "Design and implement a backup strategy for Azure Virtual Desktop",
          "Configure backup and restore for FSLogix user profiles, personal desktops, and images"
        ]
      }
    ]
  }
],
  "DP-600": [
  {
    "name": "Maintain a data analytics solution",
    "weight": "25–30%",
    "groups": [
      {
        "name": "Implement security and governance",
        "tasks": [
          "Implement workspace-level access controls",
          "Implement item-level access controls",
          "Implement row-level, column-level, object-level, and file-level access control",
          "Apply sensitivity labels to items",
          "Endorse items"
        ]
      },
      {
        "name": "Maintain the analytics development lifecycle",
        "tasks": [
          "Configure version control for a workspace",
          "Create and manage a Power BI Desktop project (.pbip)",
          "Create and configure deployment pipelines",
          "Perform impact analysis of downstream dependencies from lakehouses, warehouses, dataflows, and semantic models",
          "Deploy and manage semantic models by using the XMLA endpoint",
          "Create and update reusable assets, including Power BI template (.pbit) files, Power BI data source (.pbids) files, and shared semantic models"
        ]
      }
    ]
  },
  {
    "name": "Prepare data",
    "weight": "45–50%",
    "groups": [
      {
        "name": "Get data",
        "tasks": [
          "Create a data connection",
          "Discover data by using OneLake catalog and Real-Time hub",
          "Ingest or access data as needed",
          "Choose between different data stores",
          "Implement OneLake integration for Eventhouse and semantic models"
        ]
      },
      {
        "name": "Transform data",
        "tasks": [
          "Create views, functions, and stored procedures",
          "Enrich data by adding new columns or tables",
          "Implement a star schema for a lakehouse or warehouse",
          "Denormalize data",
          "Aggregate data",
          "Merge or join data",
          "Identify and resolve duplicate data, missing data, or null values",
          "Convert column data types",
          "Filter data"
        ]
      },
      {
        "name": "Query and analyze data",
        "tasks": [
          "Select, filter, and aggregate data by using the Visual query editor",
          "Select, filter, and aggregate data by using SQL",
          "Select, filter, and aggregate data by using KQL",
          "Select, filter, and aggregate data by using DAX"
        ]
      }
    ]
  },
  {
    "name": "Implement and manage semantic models",
    "weight": "25–30%",
    "groups": [
      {
        "name": "Design and build semantic models",
        "tasks": [
          "Choose a storage mode",
          "Implement a star schema for a semantic model",
          "Implement relationships, such as bridge tables and many-to-many relationships",
          "Write calculations that use DAX variables and functions, such as iterators, table filtering, windowing, and information functions",
          "Implement calculation groups, dynamic format strings, and field parameters",
          "Identify use cases for and configure large semantic model storage format",
          "Design and build composite models"
        ]
      },
      {
        "name": "Optimize enterprise-scale semantic models",
        "tasks": [
          "Implement performance improvements in queries and report visuals",
          "Improve DAX performance",
          "Configure Direct Lake, including default fallback and refresh behavior",
          "Choose between Direct Lake on OneLake and Direct Lake on SQL analytics endpoint",
          "Implement incremental refresh for semantic models"
        ]
      }
    ]
  }
],
  "SC-300": [
  {
    "name": "Implement and manage user identities",
    "weight": "20–25%",
    "groups": [
      {
        "name": "Configure and manage a Microsoft Entra tenant",
        "tasks": [
          "Configure and manage built-in and custom Microsoft Entra roles",
          "Recommend when to use administrative units",
          "Configure and manage administrative units",
          "Evaluate effective permissions for Microsoft Entra roles",
          "Configure and manage domains in Microsoft Entra ID and Microsoft 365",
          "Configure Company branding settings",
          "Configure tenant properties, user settings, group settings, and device settings"
        ]
      },
      {
        "name": "Create, configure, and manage Microsoft Entra identities",
        "tasks": [
          "Create, configure, and manage users",
          "Create, configure, and manage groups",
          "Manage custom security attributes",
          "Automate bulk operations by using the Microsoft Entra admin center and PowerShell",
          "Manage device join and device registration in Microsoft Entra ID",
          "Assign, modify, and report on licenses"
        ]
      },
      {
        "name": "Implement and manage identities for external users and tenants",
        "tasks": [
          "Manage External collaboration settings in Microsoft Entra ID",
          "Invite external users, individually or in bulk",
          "Manage external user accounts in Microsoft Entra ID",
          "Implement Cross-tenant access settings",
          "Implement and manage cross-tenant synchronization",
          "Configure external identity providers, including protocols such as SAML and WS-Fed"
        ]
      },
      {
        "name": "Implement and manage hybrid identity",
        "tasks": [
          "Implement and manage Microsoft Entra Connect Sync",
          "Implement and manage Microsoft Entra Cloud Sync",
          "Implement and manage password hash synchronization",
          "Implement and manage pass-through authentication",
          "Implement and manage seamless single sign-on (SSO)",
          "Migrate from AD FS to other authentication and authorization mechanisms",
          "Implement and manage Microsoft Entra Connect Health"
        ]
      }
    ]
  },
  {
    "name": "Implement authentication and access management",
    "weight": "25–30%",
    "groups": [
      {
        "name": "Plan, implement, and manage Microsoft Entra user authentication",
        "tasks": [
          "Plan for authentication",
          "Implement and manage authentication methods, including certificate-based authentication, Temporary Access Pass, OAuth 2.0 tokens, Microsoft Authenticator, and passkeys (FIDO2)",
          "Implement and manage tenant-wide multifactor authentication (MFA) settings",
          "Configure and deploy self-service password reset (SSPR)",
          "Implement and manage Windows Hello for Business",
          "Disable accounts and revoke user sessions",
          "Implement and manage Microsoft Entra password protection",
          "Enable Microsoft Entra Kerberos authentication for hybrid identities"
        ]
      },
      {
        "name": "Plan, implement, and manage Microsoft Entra Conditional Access",
        "tasks": [
          "Plan Conditional Access policies",
          "Implement Conditional Access policy assignments",
          "Implement Conditional Access policy controls",
          "Test and troubleshoot Conditional Access policies",
          "Implement session management",
          "Implement device-enforced restrictions",
          "Implement continuous access evaluation",
          "Configure authentication context",
          "Implement protected actions",
          "Create a Conditional Access policy from a template"
        ]
      },
      {
        "name": "Manage risk by using Microsoft Entra ID Protection",
        "tasks": [
          "Implement and manage user risk by using Microsoft Entra ID Protection or Conditional",
          "Access policies",
          "Implement and manage sign-in risk by using Microsoft Entra ID Protection or Conditional",
          "Access policies",
          "Implement and manage multifactor authentication registration by using authentication methods and registration campaigns",
          "Monitor, investigate and remediate risky users and risky sign-ins",
          "Monitor, investigate, and remediate risky workload identities"
        ]
      },
      {
        "name": "Implement Global Secure Access",
        "tasks": [
          "Deploy Global Secure Access clients",
          "Deploy and manage Private Access",
          "Deploy and manage Internet Access",
          "Deploy and manage Internet Access for Microsoft 365"
        ]
      }
    ]
  },
  {
    "name": "Plan and implement workload identities",
    "weight": "20–25%",
    "groups": [
      {
        "name": "Plan and implement identities for applications and Azure workloads",
        "tasks": [
          "Select appropriate identities for applications and Azure workloads, including managed identities, service principals, user accounts, and managed service accounts",
          "Create managed identities",
          "Assign a managed identity to an Azure resource",
          "Use a managed identity assigned to an Azure resource to access other Azure resources"
        ]
      },
      {
        "name": "Plan, implement, and monitor the integration of enterprise applications",
        "tasks": [
          "Plan and implement settings for enterprise applications, including application-level and tenant-level settings",
          "Assign appropriate Microsoft Entra roles to users to manage enterprise applications",
          "Design and implement integration for on-premises apps by using Microsoft Entra",
          "Application Proxy",
          "Design and implement integration for software as a service (SaaS) apps",
          "Assign, classify, and manage users, groups, and app roles for enterprise applications",
          "Configure and manage user and admin consent",
          "Create and manage application collections"
        ]
      },
      {
        "name": "Plan and implement app registrations",
        "tasks": [
          "Plan for app registrations",
          "Create app registrations",
          "Configure app authentication",
          "Configure API permissions",
          "Create app roles"
        ]
      },
      {
        "name": "Manage and monitor app access by using Microsoft Defender for Cloud Apps",
        "tasks": [
          "Configure and analyze cloud discovery results by using Defender for Cloud Apps",
          "Configure connected apps",
          "Implement application-enforced restrictions",
          "Configure Conditional Access app control",
          "Create access and session policies in Defender for Cloud Apps",
          "Implement and manage policies for OAuth apps",
          "Manage the Cloud app catalog"
        ]
      }
    ]
  },
  {
    "name": "Plan and automate identity governance",
    "weight": "20–25%",
    "groups": [
      {
        "name": "Plan and implement entitlement management in Microsoft Entra",
        "tasks": [
          "Plan entitlements",
          "Create and configure catalogs",
          "Create and configure access packages",
          "Manage access requests",
          "Implement and manage terms of use (ToU)",
          "Manage the lifecycle of external users",
          "Configure and manage connected organizations"
        ]
      },
      {
        "name": "Plan, implement, and manage access reviews in Microsoft Entra",
        "tasks": [
          "Plan for access reviews",
          "Create and configure access reviews",
          "Monitor access review activity",
          "Manually respond to access review activity"
        ]
      },
      {
        "name": "Plan and implement privileged access",
        "tasks": [
          "Plan and manage Microsoft Entra roles in Microsoft Entra Privileged Identity Management",
          "(PIM), including settings and assignments",
          "Plan and manage Azure resources in PIM, including settings and assignments",
          "Plan and configure PIM for Groups",
          "Manage the PIM request and approval process",
          "Analyze PIM audit history and reports",
          "Create and manage break-glass accounts"
        ]
      },
      {
        "name": "Monitor identity activity by using logs, workbooks, and reports",
        "tasks": [
          "Review and analyze sign-in, audit, and provisioning logs by using the Microsoft Entra admin center",
          "Configure diagnostic settings, including configuring destinations such as Log Analytics workspaces, storage accounts, and Azure Event Hubs",
          "Monitor Microsoft Entra ID by using KQL queries in Log Analytics",
          "Analyze Microsoft Entra ID by using workbooks and reporting",
          "Monitor and improve the security posture by using Identity Secure Score"
        ]
      }
    ]
  }
],
};
