  if(/policy|governance/.test(normalized))return "azure-policy.svg";
  if(/sentinel|defender|security copilot/.test(normalized))return "microsoft-defender-for-cloud.svg";
  if(/function|logic app|api management/.test(normalized))return "azure-functions.svg";
  if(/event grid/.test(normalized))return "event-grid.svg";
  if(/service bus/.test(normalized))return "azure-service-bus.svg";
  if(/iot hub/.test(normalized))return "azure-iot-hub.svg";
  return undefined;
};
const azureWalkthroughFilenameOverrides:Record<string,string[]>={
  "Data Catalog":["azure-data-catalog.webp","data-catalog.webp"],
  "Entra ID":["microsoft-entra-id.webp","entra-id.webp"],
  "Microsoft Entra ID":["microsoft-entra-id.webp","entra-id.webp"],
  "Microsoft Entra ID (formerly Azure AD)":["microsoft-entra-id.webp","entra-id.webp"],
  "HDInsight":["azure-hdinsight.webp","hdinsight.webp"],
  "Data Lake Analytics":["azure-data-lake-analytics.webp","data-lake-analytics.webp"],
  "Event Hubs":["azure-event-hubs.webp","event-hubs.webp"],
  "App Service":["azure-app-service.webp","app-service.webp"],
  "Azure Container Apps":["azure-container-apps.webp","container-apps.webp"],
  "Nutanix Cloud Clusters":["azure-nutanix-cloud-clusters.webp","nutanix-cloud-clusters.webp"],
};
const normalizedAzureWalkthroughOverrides:Record<string,string[]>=Object.fromEntries(Object.entries(azureWalkthroughFilenameOverrides).map(([name,files])=>[normalizeAzureLabel(name),files]));
const walkthroughFilenameVariants=(filename:string)=>{
  const normalized=filename.endsWith(".webp")?filename:filename+".webp";
  const alternate=normalized.startsWith("azure-")?normalized.slice("azure-".length):"azure-"+normalized;
  return [normalized,alternate];
};
export const azureWalkthroughUrls=(service:string)=>{
  const slug=service.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const filenames=[...(azureWalkthroughFilenameOverrides[service]||normalizedAzureWalkthroughOverrides[normalizeAzureLabel(service)]||[]),slug+".webp"]
    .flatMap(walkthroughFilenameVariants)
    .filter((filename,index,all)=>all.indexOf(filename)===index);
  return filenames.map(filename=>{
    const path="/azure-certification-walkthroughs/"+filename;
    const configured=assetUrl(path);
    return configured===path?"https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev"+path:configured;
  });
};

const azureIconUrl=(file:string)=>{const path="/azure-icons/"+file;const configured=assetUrl(path);return configured===path?"https://pub-a5e11688cacf4195a0d3c6afe384eb56.r2.dev"+path:configured};
