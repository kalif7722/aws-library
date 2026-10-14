/**
 * Seeded, fictional AWS account configuration for the simulator and future labs.
 * These records are deliberately independent from live AWS APIs and credentials.
 * Keep lab overlays separate from the default console view so no scenario is
 * disclosed to learners before they inspect the resources themselves.
 */
export type AwsMockResource = {
  id: string;
  service: string;
  name: string;
  region: string;
  status: string;
  attributes: Record<string, string | number | boolean | string[]>;
  relationships: Record<string, string[]>;
};

export type AwsMockProfile = {
  id: string;
  label: string;
  purpose: string;
  resources: AwsMockResource[];
};

const commonResources: AwsMockResource[] = [
  {
    id: "vpc-0123abcd4567ef890", service: "VPC", name: "prod-core-vpc", region: "eu-west-1", status: "available",
    attributes: { cidr: "10.20.0.0/16", tenancy: "default", dnsSupport: true, dnsHostnames: true },
    relationships: { subnets: ["subnet-0123abcd4567ef890", "subnet-0fedcba9876543210"], routeTables: ["rtb-0123abcd4567ef890"], securityGroups: ["sg-0ab12cd34ef56ab78"] }
  },
  {
    id: "subnet-0123abcd4567ef890", service: "VPC", name: "prod-private-a", region: "eu-west-1", status: "available",
    attributes: { cidr: "10.20.2.0/24", availabilityZone: "eu-west-1a", publicIpOnLaunch: false },
    relationships: { vpc: ["vpc-0123abcd4567ef890"], routeTable: ["rtb-0123abcd4567ef890"], networkAcl: ["acl-0123abcd4567ef890"] }
  },
  {
    id: "i-0a12b345c678d9012", service: "EC2", name: "api-prod-01", region: "eu-west-1", status: "running",
    attributes: { instanceType: "t3.medium", privateIp: "10.20.2.17", publicIp: "", systemStatus: "passed", instanceStatus: "passed", sshService: "listening" },
    relationships: { vpc: ["vpc-0123abcd4567ef890"], subnet: ["subnet-0123abcd4567ef890"], securityGroups: ["sg-0ab12cd34ef56ab78"], iamRoles: ["EC2-Production-Role"], targetGroups: ["tg-payments-api"] }
  },
  {
    id: "sg-0ab12cd34ef56ab78", service: "VPC", name: "sg-api-prod", region: "eu-west-1", status: "in-use",
    attributes: { description: "Application API ingress", vpcId: "vpc-0123abcd4567ef890", inboundRules: 2, outboundRules: 1 },
    relationships: { instances: ["i-0a12b345c678d9012"], vpc: ["vpc-0123abcd4567ef890"] }
  },
  {
    id: "sg-0f55aa11bb22cc33", service: "VPC", name: "sg-bastion-prod", region: "eu-west-1", status: "in-use",
    attributes: { description: "Approved bastion administrator access", vpcId: "vpc-0123abcd4567ef890", inboundRules: 1, outboundRules: 1 },
    relationships: { vpc: ["vpc-0123abcd4567ef890"], sourceForSecurityGroups: ["sg-0ab12cd34ef56ab78"] }
  },
  {
    id: "rtb-0123abcd4567ef890", service: "VPC", name: "rtb-prod-private-a", region: "eu-west-1", status: "active",
    attributes: { localRoute: "10.20.0.0/16", defaultRouteTarget: "nat-0123abcd4567ef890" },
    relationships: { vpc: ["vpc-0123abcd4567ef890"], subnets: ["subnet-0123abcd4567ef890"] }
  },
  {
    id: "acl-0123abcd4567ef890", service: "VPC", name: "acl-prod-private", region: "eu-west-1", status: "associated",
    attributes: { inboundRuleCount: 2, outboundRuleCount: 2, defaultAction: "deny", orderedRules: true },
    relationships: { subnets: ["subnet-0123abcd4567ef890"] }
  },
  {
    id: "alb-0123payments", service: "Elastic Load Balancing", name: "alb-payments-prod", region: "eu-west-1", status: "active",
    attributes: { type: "application", scheme: "internal", ipAddressType: "ipv4", listenerPorts: "443", dnsName: "internal-alb-payments-123.eu-west-1.elb.amazonaws.com" },
    relationships: { vpc: ["vpc-0123abcd4567ef890"], targetGroups: ["tg-payments-api", "tg-payments-admin"], securityGroups: ["sg-alb-prod"] }
  },
  {
    id: "tg-payments-api", service: "Elastic Load Balancing", name: "tg-payments-api", region: "eu-west-1", status: "healthy",
    attributes: { protocol: "HTTP", port: 8080, targetType: "instance", healthCheckPath: "/health", healthyTargets: 1, unhealthyTargets: 0 },
    relationships: { loadBalancers: ["alb-0123payments"], targets: ["i-0a12b345c678d9012"] }
  },
  {
    id: "orders-prod", service: "RDS", name: "orders-prod", region: "eu-west-1", status: "available",
    attributes: { engine: "postgres", engineVersion: "16.3", instanceClass: "db.r6g.large", port: 5432, publiclyAccessible: false, storageEncrypted: true, backupRetentionDays: 7, multiAz: true, endpoint: "orders-prod.abc123.eu-west-1.rds.amazonaws.com" },
    relationships: { vpc: ["vpc-0123abcd4567ef890"], securityGroups: ["sg-rds-orders"], subnetGroup: ["orders-private-subnets"], monitoringAlarms: ["orders-db-connections"] }
  },
  {
    id: "sg-rds-orders", service: "VPC", name: "sg-rds-orders", region: "eu-west-1", status: "in-use",
    attributes: { description: "Orders database ingress", vpcId: "vpc-0123abcd4567ef890", inboundRules: 1, allowedTcpPort: 5432, allowedSourceSecurityGroup: "sg-0ab12cd34ef56ab78" },
    relationships: { databases: ["orders-prod"], vpc: ["vpc-0123abcd4567ef890"] }
  },
  {
    id: "prod-app-artifacts", service: "S3", name: "prod-app-artifacts", region: "eu-west-1", status: "available",
    attributes: { blockPublicAccess: true, versioningEnabled: true, encryption: "SSE-KMS", objectOwnership: "BucketOwnerEnforced" },
    relationships: { iamRoles: ["EC2-Production-Role", "Lambda-Payments-Role"], kmsKeys: ["alias/prod-artifacts"] }
  },
  {
    id: "Lambda-Payments-Role", service: "IAM", name: "Lambda-Payments-Role", region: "global", status: "active",
    attributes: { trustedService: "lambda.amazonaws.com", attachedPolicies: ["PaymentsReadOnly"], permissionsBoundary: "Boundary-ApplicationRuntime" },
    relationships: { functions: ["payments-authorizer"], policies: ["PaymentsReadOnly"] }
  },
  {
    id: "payments-authorizer", service: "Lambda", name: "payments-authorizer", region: "eu-west-1", status: "active",
    attributes: { runtime: "python3.12", architecture: "x86_64", timeoutSeconds: 10, memoryMb: 256, tracing: "Active", logGroup: "/aws/lambda/payments-authorizer" },
    relationships: { iamRoles: ["Lambda-Payments-Role"], logGroups: ["/aws/lambda/payments-authorizer"], apiGateways: ["payments-api"] }
  },
  {
    id: "payments-5xx-rate", service: "CloudWatch", name: "payments-5xx-rate", region: "eu-west-1", status: "ALARM",
    attributes: { namespace: "AWS/ApplicationELB", metric: "HTTPCode_Target_5XX_Count", threshold: 20, evaluationPeriods: 3, periodSeconds: 60 },
    relationships: { loadBalancers: ["alb-0123payments"], targetGroups: ["tg-payments-api"] }
  },
  {
    id: "Z0456EXAMPLEDEF", service: "Route 53", name: "example.com", region: "global", status: "private/public-zone",
    attributes: { zoneType: "public", recordCount: 8, domainName: "example.com." },
    relationships: { loadBalancers: ["alb-0123payments"], healthChecks: ["hc-payments-prod"] }
  }
];

export const AWS_MOCK_PROFILES: AwsMockProfile[] = [
  { id: "baseline-production", label: "Production baseline", purpose: "Coherent cross-service seed configuration for the console simulator.", resources: commonResources },
  {
    id: "private-db-connectivity-lab", label: "Private database connectivity lab", purpose: "Future lab overlay: app-to-RDS connectivity across DNS, routing, and security controls.",
    resources: commonResources.map(resource => ({
      ...resource,
      attributes: resource.id === "sg-rds-orders"
        ? { ...resource.attributes, allowedSourceSecurityGroup: "sg-legacy-app" }
        : { ...resource.attributes },
      relationships: Object.fromEntries(Object.entries(resource.relationships).map(([key, values]) => [key, [...values]]))
    }))
  },
  {
    id: "iam-access-denied-lab", label: "IAM access-denied lab", purpose: "Future lab overlay: effective permissions across identity policies, boundaries, and resource policies.",
    resources: [
      ...commonResources.map(resource => resource.id !== "Lambda-Payments-Role" ? ({ ...resource, attributes: { ...resource.attributes }, relationships: Object.fromEntries(Object.entries(resource.relationships).map(([key, values]) => [key, [...values]])) }) : ({
        ...resource,
        attributes: { ...resource.attributes, attachedPolicies: ["PaymentsReadOnly"], permissionsBoundary: "Boundary-ApplicationRuntime", lastDeniedAction: "s3:PutObject" },
        relationships: { ...resource.relationships, policies: ["PaymentsReadOnly", "Boundary-ApplicationRuntime"] }
      })),
      {
        id: "Boundary-ApplicationRuntime", service: "IAM", name: "Boundary-ApplicationRuntime", region: "global", status: "attached",
        attributes: { policyType: "permissions-boundary", allowsS3PutObject: false, allowedActions: ["s3:GetObject", "rds:Describe*"] },
        relationships: { roles: ["Lambda-Payments-Role"] }
      }
    ]
  }
];

export function getAwsMockProfile(profileId = "baseline-production"): AwsMockProfile {
  return AWS_MOCK_PROFILES.find(profile => profile.id === profileId) ?? AWS_MOCK_PROFILES[0];
}
