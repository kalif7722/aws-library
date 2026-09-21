export type AzureExamDomain = { name: string; weight: string; groups: Array<{ name: string; tasks: string[] }> };

export const azureOfficialExamDomains: Record<string, AzureExamDomain[]> = {
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
  ]
};
