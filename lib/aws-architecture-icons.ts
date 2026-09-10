export const AWS_ICON_ROOT = "/aws-icons";
export const AWS_ICON_FALLBACK_ROOT = "https://raw.githubusercontent.com/awslabs/aws-icons-for-plantuml/v23.0/dist";

export type AwsArchitectureIcon = {
  id: string;
  name: string;
  category: string;
  file: string;
  aliases?: string[];
};

export const awsArchitectureIcons: Record<string, AwsArchitectureIcon> = {
  user: { id: "user", name: "User", category: "General", file: "General/User.png", aliases: ["analyst", "customer", "client"] },
  athena: { id: "athena", name: "Amazon Athena", category: "Analytics", file: "Analytics/Athena.png", aliases: ["Athena", "federated query"] },
  glueDataCatalog: { id: "glue-data-catalog", name: "AWS Glue Data Catalog", category: "Analytics", file: "Analytics/GlueDataCatalog.png", aliases: ["Glue Catalog", "Data Catalog"] },
  s3: { id: "s3", name: "Amazon S3", category: "Storage", file: "Storage/SimpleStorageService.png", aliases: ["S3", "Simple Storage Service"] },
  rds: { id: "rds", name: "Amazon RDS", category: "Database", file: "Database/RDS.png", aliases: ["RDS", "Relational Database Service"] },
  dynamodb: { id: "dynamodb", name: "Amazon DynamoDB", category: "Database", file: "Database/DynamoDB.png", aliases: ["DynamoDB"] },
};

export const awsIconSrc = (icon: AwsArchitectureIcon) => `${AWS_ICON_ROOT}/${icon.file}`;
export const awsIconFallbackSrc = (icon: AwsArchitectureIcon) => `${AWS_ICON_FALLBACK_ROOT}/${icon.file}`;

export function findAwsArchitectureIcon(value: string) {
  const q = value.trim().toLowerCase();
  return Object.values(awsArchitectureIcons).find((icon) =>
    icon.id === q || icon.name.toLowerCase() === q || icon.aliases?.some((alias) => alias.toLowerCase() === q)
  );
}
