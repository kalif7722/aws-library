export const AWS_ICON_ROOT = "/aws-icons";
export const AWS_ICON_FALLBACK_ROOT = "https://raw.githubusercontent.com/awslabs/aws-icons-for-plantuml/v23.0/dist";

export type AwsArchitectureIcon = { id:string; name:string; category:string; file:string; aliases?:string[] };
export const awsArchitectureIcons: Record<string,AwsArchitectureIcon> = {
 user:{id:"user",name:"User",category:"General",file:"General/User.png",aliases:["analyst","customer","client","producer","consumer"]},
 athena:{id:"athena",name:"Amazon Athena",category:"Analytics",file:"Analytics/Athena.png",aliases:["Athena","federated query"]},
 glueDataCatalog:{id:"glue-data-catalog",name:"AWS Glue Data Catalog",category:"Analytics",file:"Analytics/GlueDataCatalog.png",aliases:["Glue Catalog","Data Catalog"]},
 glue:{id:"glue",name:"AWS Glue",category:"Analytics",file:"Analytics/Glue.png",aliases:["Glue","ETL"]},
 emr:{id:"emr",name:"Amazon EMR",category:"Analytics",file:"Analytics/EMR.png",aliases:["EMR","Elastic MapReduce"]},
 kinesis:{id:"kinesis",name:"Amazon Kinesis Data Streams",category:"Analytics",file:"Analytics/KinesisDataStreams.png",aliases:["Kinesis","Kinesis Data Streams","KDS"]},
 opensearch:{id:"opensearch",name:"Amazon OpenSearch Service",category:"Analytics",file:"Analytics/OpenSearchService.png",aliases:["OpenSearch","OpenSearch Service"]},
 quicksight:{id:"quicksight",name:"Amazon QuickSight",category:"Analytics",file:"Analytics/QuickSight.png",aliases:["QuickSight"]},
 msk:{id:"msk",name:"Amazon Managed Streaming for Apache Kafka",category:"Analytics",file:"Analytics/ManagedStreamingForApacheKafka.png",aliases:["MSK","Amazon MSK","Managed Streaming for Apache Kafka"]},
 lambda:{id:"lambda",name:"AWS Lambda",category:"Compute",file:"Compute/Lambda.png",aliases:["Lambda"]},
 s3:{id:"s3",name:"Amazon S3",category:"Storage",file:"Storage/SimpleStorageService.png",aliases:["S3","Simple Storage Service"]},
 rds:{id:"rds",name:"Amazon RDS",category:"Database",file:"Database/RDS.png",aliases:["RDS","Relational Database Service"]},
 dynamodb:{id:"dynamodb",name:"Amazon DynamoDB",category:"Database",file:"Database/DynamoDB.png",aliases:["DynamoDB"]},
};
export const awsIconSrc=(icon:AwsArchitectureIcon)=>`${AWS_ICON_ROOT}/${icon.file}`;
export const awsIconFallbackSrc=(icon:AwsArchitectureIcon)=>`${AWS_ICON_FALLBACK_ROOT}/${icon.file}`;
export function findAwsArchitectureIcon(value:string){const q=value.trim().toLowerCase();return Object.values(awsArchitectureIcons).find(icon=>icon.id===q||icon.name.toLowerCase()===q||icon.aliases?.some(alias=>alias.toLowerCase()===q));}
