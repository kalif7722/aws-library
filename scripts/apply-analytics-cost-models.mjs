import fs from 'node:fs';

const path='app/components/AnalyticsLearningDetails.tsx';
let src=fs.readFileSync(path,'utf8');
const insightImport='import { getServiceLearningInsights } from "./ServiceLearningInsights";';
const costImport='import { ServiceCostBoard } from "./ServiceLearningShowcase";';
if(!src.includes(insightImport)) src=src.replace('import { awsArchitectureIcons, awsIconSrc, awsIconFallbackSrc, type AwsArchitectureIcon } from "../../lib/aws-architecture-icons";', 'import { awsArchitectureIcons, awsIconSrc, awsIconFallbackSrc, type AwsArchitectureIcon } from "../../lib/aws-architecture-icons";\n'+insightImport+'\n'+costImport);
else if(!src.includes(costImport)) src=src.replace(insightImport,insightImport+'\n'+costImport);

const fnAnchor='export default function AnalyticsLearningDetails({serviceName}:{serviceName:string}){const d=data[serviceName as ServiceKey];if(!d)return null;const slug=serviceName.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");return';
const fnReplacement='export default function AnalyticsLearningDetails({serviceName}:{serviceName:string}){const d=data[serviceName as ServiceKey];if(!d)return null;const slug=serviceName.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");const insights=getServiceLearningInsights(serviceName,"Analytics");return';
if(!src.includes('const insights=getServiceLearningInsights(serviceName,"Analytics")')){
  if(!src.includes(fnAnchor)) throw new Error('Analytics learning function anchor changed');
  src=src.replace(fnAnchor,fnReplacement);
}

if(!src.includes('Cost model</a>')){
  src=src.replace('<a href={`#${slug}-optimize`}>Optimize</a><a href={`#${slug}-compare`}>Compare</a>', '<a href={`#${slug}-optimize`}>Optimize</a><a href={`#${slug}-cost`}>Cost model</a><a href={`#${slug}-compare`}>Compare</a>');
}

const compareAnchor='<section className="compare-board" id={`${slug}-compare`}>';
const costMarkup='<ServiceCostBoard cost={insights.cost} costId={`${slug}-cost`}/>';
if(!src.includes(costMarkup)){
  if(!src.includes(compareAnchor)) throw new Error('Analytics compare anchor changed');
  src=src.replace(compareAnchor,costMarkup+compareAnchor);
}

if(!src.includes('ServiceCostBoard cost={insights.cost}')) throw new Error('Analytics cost model board missing');
fs.writeFileSync(path,src);
console.log('Applied service-specific cost model boards to analytics service pages.');
