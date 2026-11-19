const R2="https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev";
// Exact certification images used on the corresponding course detail; use
// credential codes, not display-title matching or a same-provider default.
const aws: Readonly<Record<string,string>>={
  "CLF-C02":"cloud-practitioner.png", "AIF-C01":"ai-practitioner.png",
  "SAA-C03":"solutions-architect-associate.png", "DVA-C03":"developer-associate.png",
  "DEA-C01":"data-engineer-associate.png", "MLA-C01":"machine-learning-engineer.png",
  "SAP-C03":"solutions-architect-professional.png", "DOP-C02":"devops-engineer-professional.png",
  "AIP-C01":"generative-ai-developer-professional.png", "ANS-C01":"advanced-networking-specialty.png",
  "SCS-C03":"security-specialty.png",
};
const azure: Readonly<Record<string,string>>={
  "AZ-900":"Azure Fundamentals.png","AZ-104":"Azure Administrator.png",
  "AZ-305":"Azure Solutions Architect.png","AZ-700":"Azure Network Engineer.png",
  "AZ-400":"Azure DevOps Engineer.png","AI-901":"Azure AI Fundamentals.png",
  "AI-103":"Azure AI Apps and Agents Developer.webp","DP-900":"Azure Data Fundamentals.png",
  "DP-300":"Azure Database Administrator.png","DP-600":"Azure Fabrics Analytics Engineer.png",
  "AZ-140":"Azure Virtual Desktop.png","AZ-120":"Azure For SAP Workloads.png",
  "SC-900":"Azure Security Compliance and Identity.png","SC-300":"Azure Identity and Access Administrator.png",
  "SC-200":"Azure Security Operations Analyst.png",
};
const gcp: Readonly<Record<string,string>>={
  PCA:"Cloud Architect.png",PCD:"Cloud Developer.png",PDE:"Data Engineer.png",
  PCDE:"Cloud Database Engineer.png",PMLE:"Machine Learning Engineer.png",
  PCSE:"Cloud Security Engineer.png",PCDOE:"Cloud DevOps Engineer.png",PCNE:"Cloud Network Engineer.png",
  PSOE:"Security Operations Engineer.webp",ACE:"Cloud Engineer.png",ADP:"Data Practitioner.png",
  GAL:"GenAI Leader.png",CDL:"Cloud Digital Leader.png",
};
const files: Readonly<Record<string,Readonly<Record<string,string>>>>={aws,azure,gcp};

// The course's older SysOps filename is not the CloudOps credential. AWS
// publishes a separate exact badge for the renamed SOA-C03 certification.
const cloudOps="https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/certification/approved/images/certification-badges/cloudops-resized.80c61c986c771120eafdce35b00aca0c8525c2d1.png";
// The course's older Workspace image is the Professional credential. This is
// the Associate certification artwork from Google Cloud's Credly issuer.
const associateWorkspace="https://images.credly.com/images/2a0b01fd-ef7b-4b82-b4d3-395df951f389/blob";
export function portalExamCode(title:string){return title.match(/\(([A-Z0-9]+(?:-[A-Z0-9]+)*)\)\s*$/)?.[1]??"";}
export function portalCertificationAsset(cloud:string,code:string){
  if(cloud==="aws"&&code==="SOA-C03")return cloudOps;
  if(cloud==="gcp"&&code==="AGWA")return associateWorkspace;
  if(!Object.hasOwn(files,cloud)||!Object.hasOwn(files[cloud],code))return undefined;
  return `${R2}/${cloud}-certification-badges/${encodeURIComponent(files[cloud][code])}`;
}
const hues: Readonly<Record<string,number>>={
  "CLF-C02":32,"AIF-C01":267,"SAA-C03":186,"DVA-C03":342,"SOA-C03":218,"DEA-C01":153,"MLA-C01":293,"SAP-C03":39,"DOP-C02":200,"AIP-C01":231,"ANS-C01":161,"SCS-C03":8,
  "AZ-900":205,"AZ-104":254,"AZ-305":184,"AZ-700":153,"AZ-400":226,"AI-901":277,"AI-103":317,"DP-900":192,"DP-300":34,"DP-600":160,"AZ-140":211,"AZ-120":18,"SC-900":340,"SC-300":244,"SC-200":194,
  CDL:156,GAL:285,ACE:211,ADP:43,AGWA:329,PCA:190,PCD:249,PDE:170,PCDE:216,PMLE:306,PCSE:12,PCDOE:263,PCNE:143,PAA:230,PSOE:341,
};
export function portalCertificationHue(code:string){return Object.hasOwn(hues,code)?hues[code]:211;}
