export const comparisonSources:Record<string,{label:string;url:string}[]>={
 'Global relational':[
 {label:'Aurora Global Database',url:'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html'},
 {label:'Azure SQL geo-replication',url:'https://learn.microsoft.com/en-us/azure/azure-sql/database/active-geo-replication-overview'},
 {label:'Spanner configurations',url:'https://docs.cloud.google.com/spanner/docs/instance-configurations'}],
 'Managed in-memory caching':[{label:'ElastiCache',url:'https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html'},{label:'Azure Managed Redis',url:'https://learn.microsoft.com/en-us/azure/redis/overview'},{label:'Azure Cache retirement',url:'https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/retirement-faq'},{label:'Memorystore',url:'https://docs.cloud.google.com/memorystore/docs'}],
 'Managed containers':[{label:'App Runner availability',url:'https://docs.aws.amazon.com/apprunner/latest/dg/apprunner-availability-change.html'},{label:'ECS Fargate',url:'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html'},{label:'Container Apps',url:'https://learn.microsoft.com/en-us/azure/container-apps/overview'},{label:'Cloud Run',url:'https://docs.cloud.google.com/run/docs/overview'}],
 'Bulk and online data migration':[{label:'Snowball availability',url:'https://docs.aws.amazon.com/snowball/latest/developer-guide/snowball-edge-availability-change.html'},{label:'Storage Mover',url:'https://learn.microsoft.com/en-us/azure/storage-mover/service-overview'},{label:'Storage Transfer Service',url:'https://docs.cloud.google.com/storage-transfer/docs/overview'},{label:'Transfer Appliance',url:'https://docs.cloud.google.com/transfer-appliance/docs/4.0/overview'}],
 'Generative AI':[{label:'Microsoft Foundry',url:'https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry'}]
};
