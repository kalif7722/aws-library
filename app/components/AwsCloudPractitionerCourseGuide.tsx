"use client";

import { useState } from "react";
import "./AwsSecurityCourseGuide.css";

type Visual = { kind: string; title: string; subtitle: string; nodes: string[]; explanation: string; cue: string };
type Task = { title: string; ask: string; focus: string[]; services: string[]; flow: string[]; visual: Visual };
type Domain = { number: string; title: string; weight: string; outcome: string; flow: string[]; tasks: Task[] };

const V = (kind: string, title: string, subtitle: string, nodes: string[], explanation: string, cue: string): Visual => ({ kind, title, subtitle, nodes, explanation, cue });
const taskId = (title: string) => {
  const match = title.match(/Task (\d+)\.(\d+)/);
  return match ? match[1] + "-" + match[2] : "";
};

const domains: Domain[] = [
  {
    "number": "01",
    "title": "Cloud Concepts",
    "weight": "24%",
    "outcome": "Understand cloud value, Well-Architected principles, migration, and economics",
    "flow": [
      "Understand the requirement",
      "Recognize the AWS choice",
      "Compare the trade-off",
      "Verify the outcome"
    ],
    "tasks": [
      {
        "title": "Task 1.1: Define the benefits of the AWS Cloud",
        "ask": "Global reach, high availability, elasticity and agility",
        "focus": [
          "Global reach, high availability, elasticity and agility.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon EC2",
          "Amazon CloudFront",
          "AWS Auto Scaling"
        ],
        "flow": [
          "Identify the define the benefits of the aws cloud requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Define the benefits of the AWS Cloud",
          "subtitle": "Global reach, high availability, elasticity and agility",
          "nodes": [
            "Need",
            "Region",
            "Scale",
            "Value"
          ],
          "explanation": "Start with the use case, then connect global reach, high availability, elasticity and agility to the relevant AWS capabilities and their practical limits.",
          "cue": "For define the benefits of the aws cloud, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 1.2: Identify design principles of the AWS Cloud",
        "ask": "The six Well-Architected pillars and how each improves outcomes",
        "focus": [
          "The six Well-Architected pillars and how each improves outcomes.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Well-Architected Tool",
          "Amazon CloudWatch",
          "AWS Trusted Advisor"
        ],
        "flow": [
          "Identify the identify design principles of the aws cloud requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify design principles of the AWS Cloud",
          "subtitle": "The six Well-Architected pillars and how each improves outcomes",
          "nodes": [
            "Workload",
            "Pillar",
            "Review",
            "Improve"
          ],
          "explanation": "Start with the use case, then connect the six well-architected pillars and how each improves outcomes to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify design principles of the aws cloud, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 1.3: Understand the benefits of and strategies for migration to the AWS Cloud",
        "ask": "Cloud Adoption Framework, migration paths, and migration support",
        "focus": [
          "Cloud Adoption Framework, migration paths, and migration support.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Migration Hub",
          "AWS Application Migration Service",
          "AWS DMS"
        ],
        "flow": [
          "Identify the understand the benefits of and strategies for migration to the aws cloud requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Understand the benefits of and strategies for migration to the AWS Cloud",
          "subtitle": "Cloud Adoption Framework, migration paths, and migration support",
          "nodes": [
            "Assess",
            "Plan",
            "Migrate",
            "Optimize"
          ],
          "explanation": "Start with the use case, then connect cloud adoption framework, migration paths, and migration support to the relevant AWS capabilities and their practical limits.",
          "cue": "For understand the benefits of and strategies for migration to the aws cloud, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 1.4: Understand concepts of cloud economics",
        "ask": "Fixed versus variable cost, rightsizing, licensing, automation and scale",
        "focus": [
          "Fixed versus variable cost, rightsizing, licensing, automation and scale.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Pricing Calculator",
          "AWS Cost Explorer",
          "AWS Compute Optimizer"
        ],
        "flow": [
          "Identify the understand concepts of cloud economics requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Understand concepts of cloud economics",
          "subtitle": "Fixed versus variable cost, rightsizing, licensing, automation and scale",
          "nodes": [
            "Baseline",
            "Right-size",
            "Estimate",
            "Measure"
          ],
          "explanation": "Start with the use case, then connect fixed versus variable cost, rightsizing, licensing, automation and scale to the relevant AWS capabilities and their practical limits.",
          "cue": "For understand concepts of cloud economics, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      }
    ]
  },
  {
    "number": "02",
    "title": "Security and Compliance",
    "weight": "30%",
    "outcome": "Recognize responsibility, governance, access control, and security resources",
    "flow": [
      "Understand the requirement",
      "Recognize the AWS choice",
      "Compare the trade-off",
      "Verify the outcome"
    ],
    "tasks": [
      {
        "title": "Task 2.1: Understand the AWS shared responsibility model",
        "ask": "Separate security of the cloud from security in the cloud across EC2, RDS and Lambda",
        "focus": [
          "Separate security of the cloud from security in the cloud across EC2, RDS and Lambda.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon EC2",
          "Amazon RDS",
          "AWS Lambda"
        ],
        "flow": [
          "Identify the understand the aws shared responsibility model requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Understand the AWS shared responsibility model",
          "subtitle": "Separate security of the cloud from security in the cloud across EC2, RDS and Lambda",
          "nodes": [
            "Service",
            "AWS duty",
            "Your duty",
            "Verify"
          ],
          "explanation": "Start with the use case, then connect separate security of the cloud from security in the cloud across ec2, rds and lambda to the relevant AWS capabilities and their practical limits.",
          "cue": "For understand the aws shared responsibility model, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 2.2: Understand AWS Cloud security, governance, and compliance concepts",
        "ask": "Encryption, compliance evidence, logging, detection, and governance",
        "focus": [
          "Encryption, compliance evidence, logging, detection, and governance.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Artifact",
          "AWS CloudTrail",
          "AWS Config",
          "Amazon GuardDuty"
        ],
        "flow": [
          "Identify the understand aws cloud security, governance, and compliance concepts requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Understand AWS Cloud security, governance, and compliance concepts",
          "subtitle": "Encryption, compliance evidence, logging, detection, and governance",
          "nodes": [
            "Classify",
            "Protect",
            "Log",
            "Audit"
          ],
          "explanation": "Start with the use case, then connect encryption, compliance evidence, logging, detection, and governance to the relevant AWS capabilities and their practical limits.",
          "cue": "For understand aws cloud security, governance, and compliance concepts, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 2.3: Identify AWS access management capabilities",
        "ask": "Root account protection, MFA, least privilege, policies, roles and federation",
        "focus": [
          "Root account protection, MFA, least privilege, policies, roles and federation.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS IAM",
          "AWS IAM Identity Center",
          "AWS Secrets Manager"
        ],
        "flow": [
          "Identify the identify aws access management capabilities requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS access management capabilities",
          "subtitle": "Root account protection, MFA, least privilege, policies, roles and federation",
          "nodes": [
            "Identity",
            "Authenticate",
            "Authorize",
            "Review"
          ],
          "explanation": "Start with the use case, then connect root account protection, mfa, least privilege, policies, roles and federation to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws access management capabilities, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 2.4: Identify components and resources for security",
        "ask": "Threat protection, Marketplace solutions, security guidance, and Trusted Advisor",
        "focus": [
          "Threat protection, Marketplace solutions, security guidance, and Trusted Advisor.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS WAF",
          "AWS Shield",
          "AWS Security Hub",
          "AWS Trusted Advisor"
        ],
        "flow": [
          "Identify the identify components and resources for security requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify components and resources for security",
          "subtitle": "Threat protection, Marketplace solutions, security guidance, and Trusted Advisor",
          "nodes": [
            "Threat",
            "Control",
            "Signal",
            "Guidance"
          ],
          "explanation": "Start with the use case, then connect threat protection, marketplace solutions, security guidance, and trusted advisor to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify components and resources for security, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      }
    ]
  },
  {
    "number": "03",
    "title": "Cloud Technology and Services",
    "weight": "34%",
    "outcome": "Choose and describe core AWS infrastructure and service categories",
    "flow": [
      "Understand the requirement",
      "Recognize the AWS choice",
      "Compare the trade-off",
      "Verify the outcome"
    ],
    "tasks": [
      {
        "title": "Task 3.1: Define methods of deploying and operating in the AWS Cloud",
        "ask": "Console, APIs, SDKs, CLI, infrastructure as code, and deployment models",
        "focus": [
          "Console, APIs, SDKs, CLI, infrastructure as code, and deployment models.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Management Console",
          "AWS CLI",
          "AWS CloudFormation"
        ],
        "flow": [
          "Identify the define methods of deploying and operating in the aws cloud requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Define methods of deploying and operating in the AWS Cloud",
          "subtitle": "Console, APIs, SDKs, CLI, infrastructure as code, and deployment models",
          "nodes": [
            "Access",
            "Provision",
            "Repeat",
            "Operate"
          ],
          "explanation": "Start with the use case, then connect console, apis, sdks, cli, infrastructure as code, and deployment models to the relevant AWS capabilities and their practical limits.",
          "cue": "For define methods of deploying and operating in the aws cloud, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.2: Define the AWS global infrastructure",
        "ask": "Regions, Availability Zones, edge locations, and high availability",
        "focus": [
          "Regions, Availability Zones, edge locations, and high availability.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon CloudFront",
          "Amazon Route 53",
          "AWS Global Accelerator"
        ],
        "flow": [
          "Identify the define the aws global infrastructure requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Define the AWS global infrastructure",
          "subtitle": "Regions, Availability Zones, edge locations, and high availability",
          "nodes": [
            "Region",
            "AZ",
            "Edge",
            "Resilience"
          ],
          "explanation": "Start with the use case, then connect regions, availability zones, edge locations, and high availability to the relevant AWS capabilities and their practical limits.",
          "cue": "For define the aws global infrastructure, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.3: Identify AWS compute services",
        "ask": "EC2 instance families, containers, serverless, scaling and load balancing",
        "focus": [
          "EC2 instance families, containers, serverless, scaling and load balancing.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon EC2",
          "Amazon ECS",
          "Amazon EKS",
          "AWS Lambda"
        ],
        "flow": [
          "Identify the identify aws compute services requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS compute services",
          "subtitle": "EC2 instance families, containers, serverless, scaling and load balancing",
          "nodes": [
            "Workload",
            "Compute",
            "Scale",
            "Balance"
          ],
          "explanation": "Start with the use case, then connect ec2 instance families, containers, serverless, scaling and load balancing to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws compute services, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.4: Identify AWS database services",
        "ask": "Relational, NoSQL, in-memory, and migration options",
        "focus": [
          "Relational, NoSQL, in-memory, and migration options.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon RDS",
          "Amazon Aurora",
          "Amazon DynamoDB",
          "AWS DMS"
        ],
        "flow": [
          "Identify the identify aws database services requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS database services",
          "subtitle": "Relational, NoSQL, in-memory, and migration options",
          "nodes": [
            "Data",
            "Model",
            "Service",
            "Migrate"
          ],
          "explanation": "Start with the use case, then connect relational, nosql, in-memory, and migration options to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws database services, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.5: Identify AWS network services",
        "ask": "VPC components, network controls, DNS and connectivity",
        "focus": [
          "VPC components, network controls, DNS and connectivity.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon VPC",
          "Amazon Route 53",
          "AWS Direct Connect",
          "AWS VPN"
        ],
        "flow": [
          "Identify the identify aws network services requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS network services",
          "subtitle": "VPC components, network controls, DNS and connectivity",
          "nodes": [
            "VPC",
            "Subnet",
            "Secure",
            "Connect"
          ],
          "explanation": "Start with the use case, then connect vpc components, network controls, dns and connectivity to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws network services, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.6: Identify AWS storage services",
        "ask": "Object, block, file, storage classes, lifecycle and backup",
        "focus": [
          "Object, block, file, storage classes, lifecycle and backup.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon S3",
          "Amazon EBS",
          "Amazon EFS",
          "AWS Backup"
        ],
        "flow": [
          "Identify the identify aws storage services requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS storage services",
          "subtitle": "Object, block, file, storage classes, lifecycle and backup",
          "nodes": [
            "Data",
            "Access",
            "Tier",
            "Protect"
          ],
          "explanation": "Start with the use case, then connect object, block, file, storage classes, lifecycle and backup to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws storage services, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.7: Identify AWS artificial intelligence and machine learning (AI/ML) services and analytics services",
        "ask": "Managed AI capabilities and analytics for querying, streams and visualization",
        "focus": [
          "Managed AI capabilities and analytics for querying, streams and visualization.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon SageMaker AI",
          "Amazon Lex",
          "Amazon Athena",
          "AWS Glue"
        ],
        "flow": [
          "Identify the identify aws artificial intelligence and machine learning (ai/ml) services and analytics services requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS artificial intelligence and machine learning (AI/ML) services and analytics services",
          "subtitle": "Managed AI capabilities and analytics for querying, streams and visualization",
          "nodes": [
            "Question",
            "Data",
            "Analyze",
            "Result"
          ],
          "explanation": "Start with the use case, then connect managed ai capabilities and analytics for querying, streams and visualization to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws artificial intelligence and machine learning (ai/ml) services and analytics services, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 3.8: Identify services from other in-scope AWS service categories",
        "ask": "Integration, communication, developer tools, end-user computing, IoT and support",
        "focus": [
          "Integration, communication, developer tools, end-user computing, IoT and support.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon EventBridge",
          "Amazon SNS",
          "Amazon SQS",
          "Amazon Connect"
        ],
        "flow": [
          "Identify the identify services from other in-scope aws service categories requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify services from other in-scope AWS service categories",
          "subtitle": "Integration, communication, developer tools, end-user computing, IoT and support",
          "nodes": [
            "Event",
            "Integrate",
            "Deliver",
            "Support"
          ],
          "explanation": "Start with the use case, then connect integration, communication, developer tools, end-user computing, iot and support to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify services from other in-scope aws service categories, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      }
    ]
  },
  {
    "number": "04",
    "title": "Billing, Pricing, and Support",
    "weight": "12%",
    "outcome": "Compare purchase options and find cost and support resources",
    "flow": [
      "Understand the requirement",
      "Recognize the AWS choice",
      "Compare the trade-off",
      "Verify the outcome"
    ],
    "tasks": [
      {
        "title": "Task 4.1: Compare AWS pricing models",
        "ask": "On-Demand, Savings Plans, Reserved Instances, Spot, dedicated capacity and storage tiers",
        "focus": [
          "On-Demand, Savings Plans, Reserved Instances, Spot, dedicated capacity and storage tiers.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "Amazon EC2",
          "AWS Savings Plans",
          "Amazon S3"
        ],
        "flow": [
          "Identify the compare aws pricing models requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Compare AWS pricing models",
          "subtitle": "On-Demand, Savings Plans, Reserved Instances, Spot, dedicated capacity and storage tiers",
          "nodes": [
            "Usage",
            "Commitment",
            "Discount",
            "Trade-off"
          ],
          "explanation": "Start with the use case, then connect on-demand, savings plans, reserved instances, spot, dedicated capacity and storage tiers to the relevant AWS capabilities and their practical limits.",
          "cue": "For compare aws pricing models, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 4.2: Understand resources for billing, budget, and cost management",
        "ask": "Budgets, Cost Explorer, Pricing Calculator, consolidated billing and allocation tags",
        "focus": [
          "Budgets, Cost Explorer, Pricing Calculator, consolidated billing and allocation tags.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Budgets",
          "AWS Cost Explorer",
          "AWS Pricing Calculator",
          "AWS Organizations"
        ],
        "flow": [
          "Identify the understand resources for billing, budget, and cost management requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Understand resources for billing, budget, and cost management",
          "subtitle": "Budgets, Cost Explorer, Pricing Calculator, consolidated billing and allocation tags",
          "nodes": [
            "Estimate",
            "Tag",
            "Track",
            "Alert"
          ],
          "explanation": "Start with the use case, then connect budgets, cost explorer, pricing calculator, consolidated billing and allocation tags to the relevant AWS capabilities and their practical limits.",
          "cue": "For understand resources for billing, budget, and cost management, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      },
      {
        "title": "Task 4.3: Identify AWS technical resources and AWS Support options",
        "ask": "Support plans, documentation, Trusted Advisor, Health, Marketplace and partners",
        "focus": [
          "Support plans, documentation, Trusted Advisor, Health, Marketplace and partners.",
          "Recognize when each option applies and distinguish it from nearby AWS choices in the official CLF-C02 guide."
        ],
        "services": [
          "AWS Support",
          "AWS Trusted Advisor",
          "AWS Health Dashboard",
          "AWS Marketplace"
        ],
        "flow": [
          "Identify the identify aws technical resources and aws support options requirement.",
          "Compare the relevant AWS capabilities.",
          "Choose the option that meets the use case.",
          "Explain the business or operational result."
        ],
        "visual": {
          "kind": "flow",
          "title": "Identify AWS technical resources and AWS Support options",
          "subtitle": "Support plans, documentation, Trusted Advisor, Health, Marketplace and partners",
          "nodes": [
            "Question",
            "Resource",
            "Plan",
            "Resolve"
          ],
          "explanation": "Start with the use case, then connect support plans, documentation, trusted advisor, health, marketplace and partners to the relevant AWS capabilities and their practical limits.",
          "cue": "For identify aws technical resources and aws support options, identify the requirement first, then choose the AWS option that directly addresses it."
        }
      }
    ]
  }
];

const openService = (name: string) => {
  window.dispatchEvent(new CustomEvent("aws-course-service", { detail: { name, courseCode: "CLF" } }));
};

function Walkthrough({ task }: { task: Task }) {
  const [full, setFull] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  const key = taskId(task.title);
  const base = "https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev/aws-certification-walkthroughs/clf-c02-tasks";
  const items = ["primary", "companion"].map(kind => ({ kind, src: base + "/clf-c02-task-" + key + "-" + kind + ".png" }));
  return <div className="aws-security-walkthrough">
    <div className="aws-security-walkthrough-head"><b>WALKTHROUGH · {key.replace("-", ".")}</b><span>Click any board to open full screen</span></div>
    <div className="aws-security-walkthrough-grid">
      {items.map(item => <figure key={item.src}>
        <figcaption>{item.kind === "primary" ? "PRIMARY WALKTHROUGH" : "COMPANION COVERAGE"}</figcaption>
        <button type="button" onClick={event => { const image = event.currentTarget.querySelector("img"); if (image) setFull(image.currentSrc); }}>
          <img src={item.src} alt={task.title + " " + item.kind + " walkthrough"} loading="lazy" onError={event => { const image = event.currentTarget; if (!image.dataset.fallback) { image.dataset.fallback = "webp"; image.src = image.src.replace(/\.png$/, ".webp"); } else { image.style.display = "none"; setMissing(true); } }} />
          <span>Open full screen</span>
        </button>
      </figure>)}
    </div>
    {missing && <div className="aws-security-walkthrough-missing">Walkthrough guide will appear here once the matching image is uploaded.</div>}
    {full && <div className="aws-security-lightbox" role="dialog" aria-modal="true" onClick={() => setFull(null)}><button type="button" aria-label="Close full-screen walkthrough" onClick={() => setFull(null)}>×</button><img src={full} alt={task.title + " full-screen walkthrough"} onClick={event => event.stopPropagation()} /></div>}
  </div>;
}

function TaskCard({ task, active, onSelect }: { task: Task; active: boolean; onSelect: () => void }) {
  return <button type="button" className={"aws-aif-task " + (active ? "active" : "")} onClick={onSelect}>
    <span>{taskId(task.title).replace("-", ".")}</span><strong>{task.title.replace(/^Task \d+\.\d+: /, "")}</strong>
  </button>;
}

export default function AwsCloudPractitionerCourseGuide() {
  const [domainIndex, setDomainIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const domain = domains[domainIndex];
  const task = domain.tasks[taskIndex];
  const selectDomain = (index: number) => { setDomainIndex(index); setTaskIndex(0); };
  return <section className="aws-security-course" id="clf-exam-guide" data-course-layout="shared-task-shell-v2">
    <div className="aws-security-course-header">
      <div className="aws-security-course-header-main">
        <p className="aws-security-kicker">AWS CERTIFIED CLOUD PRACTITIONER · CLF-C02 · TASK-FIRST COURSE</p>
        <h1>Cloud concepts, security, AWS services, billing, and support</h1>
        <p>Study each official CLF-C02 task through a visual explainer, service choices, everyday examples, and exam-focused memory hooks.</p>
      </div>
      <div className="aws-security-course-stats">
        <strong>04</strong><span>exam domains</span>
        <strong>19</strong><span>official tasks</span>
        <strong>700</strong><span>passing scaled score</span>
      </div>
    </div>
    <div className="aws-security-domain-tabs">{domains.map((item, index) => <button type="button" key={item.number} className={domainIndex === index ? "active" : ""} onClick={() => selectDomain(index)}><span>{item.number}</span><strong>{item.title}</strong><em>{item.weight}</em></button>)}</div>
    <div className="aws-security-layout">
      <aside className="aws-security-task-list">
        <div className="aws-security-task-list-title">TASKS · {domain.title}</div>
        {domain.tasks.map((item, index) => <TaskCard task={item} active={index === taskIndex} onSelect={() => setTaskIndex(index)} key={item.title} />)}
      </aside>
      <main className="aws-security-main">
        <p className="aws-security-kicker">DOMAIN {domain.number} · {domain.weight} · OFFICIAL OBJECTIVE</p>
        <h2>{task.title.replace(/^Task \d+\.\d+: /, "")}</h2>
        <p className="aws-security-breadcrumb">{domain.title} → {task.title}</p>
        <div className="aws-security-ask"><b>WHAT THIS TASK ASKS</b><span>{task.ask}</span></div>
        <div className="aws-security-content-grid">
          <div className="aws-security-visual-card">
            <p className="aws-security-label">VISUAL EXPLAINER · CLF-C02</p><h3>{task.visual.title}</h3><p>{task.visual.subtitle}</p>
            <div className="aws-security-flow">{task.visual.nodes.map((node, index) => <span key={node}>{node}{index < task.visual.nodes.length - 1 && <i>→</i>}</span>)}</div>
            <p className="aws-security-explanation">{task.visual.explanation}</p>
          </div>
          <div className="aws-security-focus-card">
            <p className="aws-security-label">GUIDE-ALIGNED FOCUS</p>
            {task.focus.map(item => <p key={item}>{item}</p>)}
            <p className="aws-security-label">RELATED CLF-C02 SERVICES</p>
            <div className="aws-security-services">{task.services.map(service => <button type="button" key={service} onClick={() => openService(service)}>{service} ↗</button>)}</div>
          </div>
        </div>
        <div className="aws-security-flow-card"><p className="aws-security-label">TASK-TO-DESIGN FLOW</p><div>{task.flow.map((step, index) => <article key={step}><b>0{index + 1}</b><span>{step}</span></article>)}</div></div>
        <Walkthrough task={task} />
        <div className="aws-security-memory"><b>EXAM MEMORY HOOK</b><span>{task.visual.cue}</span></div>
      </main>
    </div>
  </section>;
}
