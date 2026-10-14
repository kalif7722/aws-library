export type AwsIngressRule = {
  id: string;
  protocol: "TCP" | "UDP" | "ALL";
  fromPort: number;
  toPort: number;
  sourceType: "IPv4" | "SecurityGroup";
  source: string;
  description: string;
};
export type AwsVpc = { id: string; name: string; cidr: string; state: "available" | "pending"; isDefault: boolean };
export type AwsSubnet = { id: string; name: string; vpcId: string; cidr: string; availabilityZone: string; state: "available" | "pending"; routeTableId: string; networkAclId: string };
export type AwsRoute = { destination: string; target: string; state: "active" | "blackhole" };
export type AwsRouteTable = { id: string; name: string; vpcId: string; routes: AwsRoute[]; associatedSubnetIds: string[]; isMain: boolean; tags: Record<string, string> };
export type AwsInstance = { id: string; name: string; state: "running" | "stopped"; systemStatus: "passed" | "impaired"; instanceStatus: "passed" | "impaired"; privateIp: string; subnetId: string; securityGroupIds: string[]; guestSsh: "listening" | "stopped"; instanceType?: string; availabilityZone?: string; imageId?: string; tags?: Record<string, string> };
export type AwsLabState = {
  instance: AwsInstance;
  instances?: AwsInstance[];
  vpcs?: AwsVpc[];
  subnets?: AwsSubnet[];
  routeTables?: AwsRouteTable[];
  securityGroups: { id: string; name: string; vpcId: string; ingress: AwsIngressRule[]; egress?: AwsIngressRule[] }[];
  routes: { destination: string; target: string; state: "active" | "blackhole" }[];
  networkAcl: { direction: "inbound" | "outbound"; ruleNumber: number; protocol: string; ports: string; source: string; action: "allow" | "deny" }[];
  s3Buckets: { name: string; region: string; blockPublicAccess: boolean; versioningEnabled: boolean; encryption: "SSE-S3" | "SSE-KMS"; }[];
  iamRoles: { name: string; lastActivity: string; trustedService: string; attachedPolicies: string[] }[];
};
export type AwsReachabilityResult = {
  reachable: boolean;
  blockedAt: "instance" | "security-group" | "route" | "network-acl" | "guest" | null;
  summary: string;
  checks: { name: string; result: "passed" | "blocked"; detail: string }[];
};
export const createInitialAwsLabState = (): AwsLabState => ({
  instance: { id: "i-0a12b345c678d9012", name: "api-prod-01", state: "running", systemStatus: "passed", instanceStatus: "passed", privateIp: "10.20.2.17", subnetId: "subnet-0123abcd4567ef890", securityGroupIds: ["sg-0ab12cd34ef56ab78"], guestSsh: "listening", tags: { Name: "api-prod-01", Environment: "production", Application: "payments-api", Owner: "platform-engineering" } },
  securityGroups: [{ id: "sg-0ab12cd34ef56ab78", name: "sg-api-prod", vpcId: "vpc-0123abcd4567ef890", ingress: [
    { id: "sgr-0a443311223344556", protocol: "TCP", fromPort: 443, toPort: 443, sourceType: "IPv4", source: "10.40.0.0/16", description: "Application HTTPS" },
    { id: "sgr-0b844311223344557", protocol: "TCP", fromPort: 8443, toPort: 8443, sourceType: "SecurityGroup", source: "sg-0f55aa11bb22cc33", description: "Internal service traffic" }
  ], egress: [{ id: "sgr-egress-default", protocol: "ALL", fromPort: 0, toPort: 65535, sourceType: "IPv4", source: "0.0.0.0/0", description: "Default allow all outbound traffic" }] }, {
    id: "sg-0f55aa11bb22cc33", name: "sg-bastion-prod", vpcId: "vpc-0123abcd4567ef890", ingress: [
      { id: "sgr-0c944311223344558", protocol: "TCP", fromPort: 22, toPort: 22, sourceType: "IPv4", source: "10.20.0.0/16", description: "Approved administrator access" }
    ], egress: [{ id: "sgr-egress-default", protocol: "ALL", fromPort: 0, toPort: 65535, sourceType: "IPv4", source: "0.0.0.0/0", description: "Default allow all outbound traffic" }]
  }],
  routes: [{ destination: "10.20.0.0/16", target: "local", state: "active" }, { destination: "0.0.0.0/0", target: "nat-0123abcd4567ef890", state: "active" }],
  vpcs: [{ id: "vpc-0123abcd4567ef890", name: "production-vpc", cidr: "10.20.0.0/16", state: "available", isDefault: false }],
  subnets: [
    { id: "subnet-0123abcd4567ef890", name: "private-admin-subnet", vpcId: "vpc-0123abcd4567ef890", cidr: "10.20.2.0/24", availabilityZone: "eu-west-1a", state: "available", routeTableId: "rtb-0123abcd4567ef890", networkAclId: "acl-0123abcd4567ef890" },
    { id: "subnet-0fedcba9876543210", name: "public-web-subnet", vpcId: "vpc-0123abcd4567ef890", cidr: "10.20.1.0/24", availabilityZone: "eu-west-1b", state: "available", routeTableId: "rtb-0fedcba9876543210", networkAclId: "acl-0123abcd4567ef890" }
  ],
  routeTables: [
    { id: "rtb-0123abcd4567ef890", name: "rtb-production-private", vpcId: "vpc-0123abcd4567ef890", routes: [{ destination: "10.20.0.0/16", target: "local", state: "active" }, { destination: "0.0.0.0/0", target: "nat-0123abcd4567ef890", state: "active" }], associatedSubnetIds: ["subnet-0123abcd4567ef890"], isMain: false, tags: { Name: "rtb-production-private", Environment: "production" } },
    { id: "rtb-0fedcba9876543210", name: "rtb-production-public", vpcId: "vpc-0123abcd4567ef890", routes: [{ destination: "10.20.0.0/16", target: "local", state: "active" }, { destination: "0.0.0.0/0", target: "igw-0123abcd4567ef890", state: "active" }], associatedSubnetIds: ["subnet-0fedcba9876543210"], isMain: false, tags: { Name: "rtb-production-public", Environment: "production" } }
  ],
  networkAcl: [
    { direction: "inbound", ruleNumber: 110, protocol: "TCP", ports: "1024-65535", source: "10.20.0.0/16", action: "allow" },
    { direction: "inbound", ruleNumber: 100, protocol: "TCP", ports: "22", source: "10.20.0.0/16", action: "allow" },
    { direction: "outbound", ruleNumber: 100, protocol: "TCP", ports: "1024-65535", source: "0.0.0.0/0", action: "allow" },
    { direction: "outbound", ruleNumber: 110, protocol: "TCP", ports: "22", source: "0.0.0.0/0", action: "allow" }
  ],
  s3Buckets: [
    { name: "prod-app-artifacts", region: "eu-west-1", blockPublicAccess: true, versioningEnabled: true, encryption: "SSE-KMS" },
    { name: "prod-app-logs", region: "eu-west-1", blockPublicAccess: true, versioningEnabled: true, encryption: "SSE-S3" },
    { name: "data-lake-curated", region: "eu-west-1", blockPublicAccess: true, versioningEnabled: false, encryption: "SSE-KMS" }
  ],
  iamRoles: [
    { name: "EC2-Production-Role", lastActivity: "Today", trustedService: "ec2.amazonaws.com", attachedPolicies: ["CloudWatchAgentServerPolicy"] },
    { name: "Lambda-Payments-Role", lastActivity: "Today", trustedService: "lambda.amazonaws.com", attachedPolicies: ["PaymentsReadOnly"] },
    { name: "DataPipeline-Role", lastActivity: "Yesterday", trustedService: "glue.amazonaws.com", attachedPolicies: ["AmazonS3ReadOnlyAccess"] }
  ]
});
export function addSshIngressRule(state: AwsLabState, source: string, sourceType: "IPv4" | "SecurityGroup", targetGroupId = state.instance.securityGroupIds[0]): AwsLabState {
  const groupId = targetGroupId;
  const normalizedSource = sourceType === "SecurityGroup"
    ? state.securityGroups.find(group => group.id === source || group.name === source)?.id ?? source
    : source;
  return { ...state, securityGroups: state.securityGroups.map(group => group.id !== groupId ? group : {
    ...group, ingress: [...group.ingress.filter(rule => !(rule.protocol === "TCP" && rule.fromPort <= 22 && rule.toPort >= 22 && rule.sourceType === sourceType && rule.source === normalizedSource)), { id: "sgr-sim-ssh-admin", protocol: "TCP", fromPort: 22, toPort: 22, sourceType, source: normalizedSource, description: "Approved administrator SSH access (simulated)" }]
  }) };
}
function portMatches(ports: string, port: number): boolean {
  if (ports === "ALL" || ports === "-1") return true;
  const parts = ports.split("-").map(Number);
  if (parts.length === 1) return parts[0] === port;
  return Number.isFinite(parts[0]) && Number.isFinite(parts[1]) && port >= parts[0] && port <= parts[1];
}
function ipv4ToNumber(ip: string): number | null {
  const octets = ip.split(".").map(Number);
  if (octets.length !== 4 || octets.some(o => !Number.isInteger(o) || o < 0 || o > 255)) return null;
  return (((octets[0] << 24) >>> 0) + (octets[1] << 16) + (octets[2] << 8) + octets[3]) >>> 0;
}
function cidrContains(cidr: string, ip: string): boolean {
  const [base, prefixText] = cidr.split("/");
  const network = ipv4ToNumber(base);
  const address = ipv4ToNumber(ip);
  const prefix = prefixText === undefined ? 32 : Number(prefixText);
  if (network === null || address === null || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) return false;
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return (network & mask) === (address & mask);
}
function aclAllows(state: AwsLabState, direction: "inbound" | "outbound", port: number, sourceIp: string): boolean {
  const rules = state.networkAcl.filter(rule => rule.direction === direction && (rule.protocol === "TCP" || rule.protocol === "6" || rule.protocol === "-1" || rule.protocol === "ALL") && portMatches(rule.ports, port) && cidrContains(rule.source, sourceIp)).sort((a, b) => a.ruleNumber - b.ruleNumber);
  // AWS evaluates the lowest matching rule number first; default is implicit deny.
  const first = rules[0];
  return !!first && first.action === "allow";
}
export function evaluateAwsSshReachability(state: AwsLabState, source = "sg-bastion-prod", targetInstanceId?: string): AwsReachabilityResult {
  const targetInstance = getAwsInstances(state).find(item => item.id === targetInstanceId) ?? state.instance;
  const groups = state.securityGroups.filter(item => targetInstance.securityGroupIds.includes(item.id));
  const sourceIp = source === "sg-bastion-prod" ? "10.20.1.10" : source.split("/")[0];
  const instanceHealthy = targetInstance.state === "running" && targetInstance.systemStatus === "passed" && targetInstance.instanceStatus === "passed";
  const ruleAllows = groups.some(group => group.ingress.some(rule => (rule.protocol === "ALL" || (rule.protocol === "TCP" && rule.fromPort <= 22 && rule.toPort >= 22)) &&
    ((rule.sourceType === "SecurityGroup" && (rule.source === source || state.securityGroups.some(sourceGroup => sourceGroup.name === source && sourceGroup.id === rule.source))) || (rule.sourceType === "IPv4" && cidrContains(rule.source, sourceIp)))));
  const targetSubnet = getAwsSubnets(state).find(subnet => subnet.id === targetInstance.subnetId);
  const targetRouteTable = targetSubnet ? getAwsRouteTables(state).find(table => table.id === targetSubnet.routeTableId) : undefined;
  const effectiveRoutes = targetInstance.id === state.instance.id ? state.routes : targetRouteTable?.routes ?? state.routes;
  const routeHealthy = effectiveRoutes.some(route => cidrContains(route.destination, targetInstance.privateIp) && route.target === "local" && route.state === "active");
  const inboundAclAllows = aclAllows(state, "inbound", 22, sourceIp);
  const outboundAclAllows = aclAllows(state, "outbound", 49152, sourceIp);
  const guestHealthy = targetInstance.guestSsh === "listening";
  const checks = [
    { name: "EC2 instance status", result: instanceHealthy ? "passed" as const : "blocked" as const, detail: instanceHealthy ? "Instance is running; both status checks passed." : "Instance state or status checks are not healthy." },
    { name: "VPC local route", result: routeHealthy ? "passed" as const : "blocked" as const, detail: routeHealthy ? "An active local route covers the instance private IP." : "No active local route covers the instance private IP." },
    { name: "Network ACL inbound", result: inboundAclAllows ? "passed" as const : "blocked" as const, detail: inboundAclAllows ? "The first matching inbound rule permits TCP/22 from the source." : "Inbound network ACL rules do not permit TCP/22 from the source." },
    { name: "Security group ingress", result: ruleAllows ? "passed" as const : "blocked" as const, detail: ruleAllows ? "An attached security group allows TCP/22 from the approved administrator source." : "No attached security group allows TCP/22 from the approved administrator source." },
    { name: "Network ACL return traffic", result: outboundAclAllows ? "passed" as const : "blocked" as const, detail: outboundAclAllows ? "The first matching outbound rule permits ephemeral TCP return traffic." : "Outbound network ACL rules block the ephemeral TCP return path." },
    { name: "Guest SSH listener", result: guestHealthy ? "passed" as const : "blocked" as const, detail: guestHealthy ? "sshd is listening on TCP/22." : "The guest SSH service is not listening." }
  ];
  const failed = checks.find(check => check.result === "blocked");
  const map = { "EC2 instance status": "instance", "VPC local route": "route", "Network ACL inbound": "network-acl", "Security group ingress": "security-group", "Network ACL return traffic": "network-acl", "Guest SSH listener": "guest" } as const;
  return { reachable: !failed, blockedAt: failed ? map[failed.name as keyof typeof map] : null,
    summary: failed ? "Traffic is blocked at " + failed.name.toLowerCase() + ": " + failed.detail : "The simulated path allows TCP/22 from the approved administrator source. A real SSH login still requires separate authentication verification.",
    checks };
}

export function updateS3BucketSetting(
  state: AwsLabState,
  bucketName: string,
  setting: "blockPublicAccess" | "versioningEnabled",
  value: boolean
): AwsLabState {
  return {
    ...state,
    s3Buckets: state.s3Buckets.map(bucket => bucket.name === bucketName ? { ...bucket, [setting]: value } : bucket)
  };
}

export function toggleIamRolePolicy(state: AwsLabState, roleName: string, policyName: string): AwsLabState {
  return {
    ...state,
    iamRoles: state.iamRoles.map(role => {
      if (role.name !== roleName) return role;
      const attached = role.attachedPolicies.includes(policyName);
      return { ...role, attachedPolicies: attached ? role.attachedPolicies.filter(policy => policy !== policyName) : [...role.attachedPolicies, policyName] };
    })
  };
}

export function addNetworkAclRule(state: AwsLabState, rule: AwsLabState["networkAcl"][number]): { state: AwsLabState; error: string | null } {
  if (!Number.isInteger(rule.ruleNumber) || rule.ruleNumber < 1 || rule.ruleNumber > 32766) {
    return { state, error: "Rule number must be between 1 and 32766." };
  }
  if (state.networkAcl.some(item => item.direction === rule.direction && item.ruleNumber === rule.ruleNumber)) {
    return { state, error: "That rule number is already used in this direction." };
  }
  const portText = rule.ports.trim();
  const portParts = portText.split("-");
  if (!portText || portParts.length > 2 || portParts.some(part => !/^\d+$/.test(part))) {
    return { state, error: "Enter a port or port range between 0 and 65535." };
  }
  const ports = portParts.map(Number);
  if (ports.some(port => port < 0 || port > 65535) || (ports.length === 2 && ports[0] > ports[1])) {
    return { state, error: "Enter a valid port range between 0 and 65535." };
  }
  const cidrParts = rule.source.trim().split("/");
  const octets = (cidrParts[0] ?? "").split(".");
  const prefix = Number(cidrParts[1]);
  if (cidrParts.length !== 2 || octets.length !== 4 ||
      octets.some(part => !/^\d+$/.test(part) || Number(part) > 255) ||
      !/^\d+$/.test(cidrParts[1] ?? "") || prefix < 0 || prefix > 32) {
    return { state, error: "Enter a valid IPv4 CIDR such as 10.20.0.0/16." };
  }
  const networkAcl = [...state.networkAcl, { ...rule, ports: portText, source: rule.source.trim() }]
    .sort((a, b) => a.direction.localeCompare(b.direction) || a.ruleNumber - b.ruleNumber);
  return { state: { ...state, networkAcl }, error: null };
}



export function updateNetworkAclRule(
  state: AwsLabState,
  direction: "inbound" | "outbound",
  originalRuleNumber: number,
  updatedRule: AwsLabState["networkAcl"][number]
): { state: AwsLabState; error: string | null } {
  const exists = state.networkAcl.some(rule => rule.direction === direction && rule.ruleNumber === originalRuleNumber);
  if (!exists) return { state, error: "The rule no longer exists. Refresh the ACL and try again." };
  if (updatedRule.direction !== direction) return { state, error: "A rule cannot be moved between inbound and outbound in this editor." };
  const withoutOriginal = { ...state, networkAcl: state.networkAcl.filter(rule => !(rule.direction === direction && rule.ruleNumber === originalRuleNumber)) };
  return addNetworkAclRule(withoutOriginal, updatedRule);
}

export function deleteNetworkAclRule(
  state: AwsLabState,
  direction: "inbound" | "outbound",
  ruleNumber: number
): { state: AwsLabState; deleted: boolean } {
  const networkAcl = state.networkAcl.filter(rule => !(rule.direction === direction && rule.ruleNumber === ruleNumber));
  return { state: networkAcl.length === state.networkAcl.length ? state : { ...state, networkAcl }, deleted: networkAcl.length !== state.networkAcl.length };
}


export function getAwsInstances(state: AwsLabState): AwsInstance[] {
  return state.instances?.length ? state.instances : [state.instance];
}

export type LaunchAwsInstanceInput = {
  name: string;
  instanceType: string;
  subnetId: string;
  securityGroupIds: string[];
  imageId?: string;
  availabilityZone?: string;
  tags?: Record<string, string>;
};

export function launchAwsInstance(state: AwsLabState, input: LaunchAwsInstanceInput): { state: AwsLabState; instance: AwsInstance | null; error: string | null } {
  const name = input.name.trim();
  if (!name) return { state, instance: null, error: "Enter an instance name." };
  if (getAwsInstances(state).some(instance => instance.name.toLowerCase() === name.toLowerCase())) {
    return { state, instance: null, error: "An instance with that name already exists." };
  }
  const subnet = getAwsSubnets(state).find(item => item.id === input.subnetId);
  if (!input.subnetId.trim() || (state.subnets?.length && !subnet)) return { state, instance: null, error: "Choose a valid subnet." };
  if (!input.securityGroupIds.length || input.securityGroupIds.some(id => !state.securityGroups.some(group => group.id === id))) {
    return { state, instance: null, error: "Choose at least one valid security group." };
  }
  if (subnet && input.securityGroupIds.some(id => state.securityGroups.find(group => group.id === id)?.vpcId !== subnet.vpcId)) {
    return { state, instance: null, error: "The selected security groups must belong to the subnet's VPC." };
  }
  const currentInstances = getAwsInstances(state);
  const sequence = currentInstances.length + 1;
  const id = "i-0a12b345c678d9" + sequence.toString(16).padStart(3, "0");
  const subnetOctets = subnet?.cidr.split("/")[0].split(".");
  const privateIp = subnetOctets?.length === 4 ? subnetOctets.slice(0, 3).join(".") + "." + (18 + currentInstances.length) : "10.20.2." + (17 + currentInstances.length);
  const instance: AwsInstance = {
    id, name, state: "running", systemStatus: "passed", instanceStatus: "passed",
    privateIp, subnetId: input.subnetId,
    securityGroupIds: [...input.securityGroupIds], guestSsh: "listening",
    instanceType: input.instanceType, availabilityZone: input.availabilityZone ?? subnet?.availabilityZone ?? "eu-west-1a",
    imageId: input.imageId ?? "ami-0a1b2c3d4e5f67890", tags: { Name: name, ...(input.tags ?? {}) }
  };
  return { state: { ...state, instances: [...currentInstances, instance] }, instance, error: null };
}

export function setAwsInstanceState(state: AwsLabState, instanceId: string, nextState: "running" | "stopped"): AwsLabState {
  const instances = getAwsInstances(state).map(instance => instance.id === instanceId ? { ...instance, state: nextState } : instance);
  const primary = instances.find(instance => instance.id === state.instance.id) ?? instances[0];
  return { ...state, instance: primary, instances };
}

export function rebootAwsInstance(state: AwsLabState, instanceId: string): AwsLabState {
  const instances = getAwsInstances(state).map(instance => instance.id === instanceId ? { ...instance, state: "running" as const, systemStatus: "passed" as const, instanceStatus: "passed" as const } : instance);
  const primary = instances.find(instance => instance.id === state.instance.id) ?? instances[0];
  return { ...state, instance: primary, instances };
}


export function updateAwsInstanceTag(state: AwsLabState, instanceId: string, keyInput: string, valueInput: string): { state: AwsLabState; error: string | null } {
  const key = keyInput.trim();
  const value = valueInput.trim();
  if (!key) return { state, error: "Tag key is required." };
  if (key === "Name" && !value) return { state, error: "The Name tag cannot be empty." };
  if (key.length > 128) return { state, error: "Tag keys must be 128 characters or fewer." };
  if (value.length > 256) return { state, error: "Tag values must be 256 characters or fewer." };
  if (key.toLowerCase().startsWith("aws:")) return { state, error: "Tag keys beginning with aws: are reserved." };
  const instances = getAwsInstances(state);
  if (!instances.some(instance => instance.id === instanceId)) return { state, error: "Instance not found. Refresh the inventory and try again." };
  const updatedInstances = instances.map(instance => instance.id === instanceId ? { ...instance, ...(key === "Name" ? { name: value } : {}), tags: { ...(instance.tags ?? {}), [key]: value, ...(key === "Name" ? {} : { Name: instance.name }) } } : instance);
  const primary = updatedInstances.find(instance => instance.id === state.instance.id) ?? updatedInstances[0];
  return { state: { ...state, instance: primary, instances: updatedInstances }, error: null };
}

export function deleteAwsInstanceTag(state: AwsLabState, instanceId: string, key: string): { state: AwsLabState; error: string | null } {
  if (key === "Name") return { state, error: "The Name tag is required in this training console." };
  const instances = getAwsInstances(state);
  const target = instances.find(instance => instance.id === instanceId);
  if (!target) return { state, error: "Instance not found. Refresh the inventory and try again." };
  const tags = { ...(target.tags ?? {}) };
  if (!(key in tags)) return { state, error: "Tag not found." };
  delete tags[key];
  const updatedInstances = instances.map(instance => instance.id === instanceId ? { ...instance, tags } : instance);
  const primary = updatedInstances.find(instance => instance.id === state.instance.id) ?? updatedInstances[0];
  return { state: { ...state, instance: primary, instances: updatedInstances }, error: null };
}


function validateSecurityGroupIngressRule(state: AwsLabState, rule: Omit<AwsIngressRule, "id">): string | null {
  if (!["TCP", "UDP", "ALL"].includes(rule.protocol)) return "Choose TCP, UDP, or all traffic.";
  if (!Number.isInteger(rule.fromPort) || !Number.isInteger(rule.toPort) || rule.fromPort < 0 || rule.toPort > 65535 || rule.fromPort > rule.toPort) return "Enter a valid port range from 0 to 65535.";
  if (!rule.description || rule.description.trim().length > 255) return "Enter a rule description of 1 to 255 characters.";
  if (rule.sourceType === "SecurityGroup") {
    if (!state.securityGroups.some(group => group.id === rule.source || group.name === rule.source)) return "Choose an existing source security group.";
  } else {
    const parts = rule.source.trim().split("/");
    const prefix = Number(parts[1]);
    if (parts.length !== 2 || ipv4ToNumber(parts[0]) === null || !/^\d+$/.test(parts[1] ?? "") || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) return "Enter a valid IPv4 CIDR such as 198.51.100.24/32.";
  }
  return null;
}

function normalizeSecurityGroupRuleSource(state: AwsLabState, rule: Omit<AwsIngressRule, "id">): Omit<AwsIngressRule, "id"> {
  return { ...rule, source: rule.sourceType === "SecurityGroup" ? state.securityGroups.find(group => group.id === rule.source || group.name === rule.source)?.id ?? rule.source : rule.source.trim(), description: rule.description.trim() };
}

export function addSecurityGroupIngressRule(state: AwsLabState, groupId: string, input: Omit<AwsIngressRule, "id">): { state: AwsLabState; rule: AwsIngressRule | null; error: string | null } {
  const group = state.securityGroups.find(item => item.id === groupId);
  if (!group) return { state, rule: null, error: "Security group not found." };
  const error = validateSecurityGroupIngressRule(state, input);
  if (error) return { state, rule: null, error };
  const normalized = normalizeSecurityGroupRuleSource(state, input);
  if (group.ingress.some(rule => rule.protocol === normalized.protocol && rule.fromPort === normalized.fromPort && rule.toPort === normalized.toPort && rule.sourceType === normalized.sourceType && rule.source === normalized.source)) return { state, rule: null, error: "An equivalent ingress rule already exists." };
  let sequence = 1;
  while (group.ingress.some(rule => rule.id === "sgr-sim-" + sequence.toString(36))) sequence += 1;
  const rule: AwsIngressRule = { ...normalized, id: "sgr-sim-" + sequence.toString(36) };
  return { state: { ...state, securityGroups: state.securityGroups.map(item => item.id === groupId ? { ...item, ingress: [...item.ingress, rule] } : item) }, rule, error: null };
}

export function updateSecurityGroupIngressRule(state: AwsLabState, groupId: string, ruleId: string, input: Omit<AwsIngressRule, "id">): { state: AwsLabState; error: string | null } {
  const group = state.securityGroups.find(item => item.id === groupId);
  if (!group || !group.ingress.some(rule => rule.id === ruleId)) return { state, error: "Security group rule not found. Refresh and try again." };
  const error = validateSecurityGroupIngressRule(state, input);
  if (error) return { state, error };
  const normalized = normalizeSecurityGroupRuleSource(state, input);
  if (group.ingress.some(rule => rule.id !== ruleId && rule.protocol === normalized.protocol && rule.fromPort === normalized.fromPort && rule.toPort === normalized.toPort && rule.sourceType === normalized.sourceType && rule.source === normalized.source)) return { state, error: "An equivalent ingress rule already exists." };
  return { state: { ...state, securityGroups: state.securityGroups.map(item => item.id === groupId ? { ...item, ingress: item.ingress.map(rule => rule.id === ruleId ? { ...normalized, id: rule.id } : rule) } : item) }, error: null };
}

export function deleteSecurityGroupIngressRule(state: AwsLabState, groupId: string, ruleId: string): { state: AwsLabState; deleted: boolean } {
  const group = state.securityGroups.find(item => item.id === groupId);
  if (!group || !group.ingress.some(rule => rule.id === ruleId)) return { state, deleted: false };
  return { state: { ...state, securityGroups: state.securityGroups.map(item => item.id === groupId ? { ...item, ingress: item.ingress.filter(rule => rule.id !== ruleId) } : item) }, deleted: true };
}


export function getAwsVpcs(state: AwsLabState): AwsVpc[] {
  return state.vpcs?.length ? state.vpcs : [{ id: "vpc-0123abcd4567ef890", name: "production-vpc", cidr: "10.20.0.0/16", state: "available", isDefault: false }];
}

export function getAwsSubnets(state: AwsLabState): AwsSubnet[] {
  return state.subnets?.length ? state.subnets : [{ id: "subnet-0123abcd4567ef890", name: "private-admin-subnet", vpcId: "vpc-0123abcd4567ef890", cidr: "10.20.2.0/24", availabilityZone: "eu-west-1a", state: "available", routeTableId: "rtb-0123abcd4567ef890", networkAclId: "acl-0123abcd4567ef890" }];
}

export function getAwsRouteTables(state: AwsLabState): AwsRouteTable[] {
  return state.routeTables?.length ? state.routeTables : [{ id: "rtb-0123abcd4567ef890", name: "rtb-production-private", vpcId: "vpc-0123abcd4567ef890", routes: state.routes, associatedSubnetIds: [state.instance.subnetId], isMain: false, tags: { Name: "rtb-production-private" } }];
}

export function associateSubnetWithRouteTable(state: AwsLabState, subnetId: string, routeTableId: string): { state: AwsLabState; error: string | null } {
  const subnets = getAwsSubnets(state);
  const routeTables = getAwsRouteTables(state);
  const subnet = subnets.find(item => item.id === subnetId);
  const routeTable = routeTables.find(item => item.id === routeTableId);
  if (!subnet) return { state, error: "Subnet not found." };
  if (!routeTable) return { state, error: "Route table not found." };
  if (subnet.vpcId !== routeTable.vpcId) return { state, error: "A subnet can only be associated with a route table in the same VPC." };
  const updatedSubnets = subnets.map(item => item.id === subnetId ? { ...item, routeTableId } : item);
  const updatedTables = routeTables.map(item => ({ ...item, associatedSubnetIds: item.id === routeTableId ? [...new Set([...item.associatedSubnetIds.filter(id => id !== subnetId), subnetId])] : item.associatedSubnetIds.filter(id => id !== subnetId) }));
  const effectiveRoutes = subnetId === state.instance.subnetId ? routeTable.routes : state.routes;
  return { state: { ...state, subnets: updatedSubnets, routeTables: updatedTables, routes: effectiveRoutes }, error: null };
}

export function toggleAwsRouteState(state: AwsLabState, routeTableId: string, destination: string): { state: AwsLabState; error: string | null } {
  const routeTables = getAwsRouteTables(state);
  const table = routeTables.find(item => item.id === routeTableId);
  if (!table) return { state, error: "Route table not found." };
  if (!table.routes.some(route => route.destination === destination)) return { state, error: "Route not found." };
  const updatedTables = routeTables.map(item => item.id === routeTableId ? { ...item, routes: item.routes.map(route => route.destination === destination ? { ...route, state: route.state === "active" ? "blackhole" as const : "active" as const } : route) } : item);
  const instanceSubnet = getAwsSubnets(state).find(item => item.id === state.instance.subnetId);
  const effectiveRoutes = instanceSubnet?.routeTableId === routeTableId ? updatedTables.find(item => item.id === routeTableId)!.routes : state.routes;
  return { state: { ...state, routeTables: updatedTables, routes: effectiveRoutes }, error: null };
}


export function migrateAwsLabState(savedState: Partial<AwsLabState> | null | undefined): AwsLabState {
  const baseline = createInitialAwsLabState();
  if (!savedState?.instance || !savedState.securityGroups || !savedState.routes) return baseline;
  const instance: AwsInstance = { ...baseline.instance, ...savedState.instance, tags: savedState.instance.tags ?? (savedState.instance.id === baseline.instance.id ? baseline.instance.tags : { Name: savedState.instance.name }) };
  const securityGroups = [
    ...savedState.securityGroups,
    ...baseline.securityGroups.filter(group => !savedState.securityGroups!.some(savedGroup => savedGroup.id === group.id))
  ];
  const networkAcl = (savedState.networkAcl ?? baseline.networkAcl).map(rule => ({
    ...rule,
    ruleNumber: Number.isFinite(rule.ruleNumber) ? rule.ruleNumber : rule.direction === "inbound" ? (rule.ports === "22" ? 100 : 110) : (rule.ports === "1024-65535" ? 100 : 110)
  }));
  const vpcs = savedState.vpcs?.length ? savedState.vpcs : baseline.vpcs;
  let subnets = savedState.subnets?.length ? savedState.subnets : baseline.subnets ?? [];
  if (!subnets.some(subnet => subnet.id === instance.subnetId)) {
    subnets = [...subnets, { id: instance.subnetId, name: "migrated-training-subnet", vpcId: instance.subnetId === baseline.instance.subnetId ? "vpc-0123abcd4567ef890" : (vpcs?.[0]?.id ?? "vpc-0123abcd4567ef890"), cidr: "10.20.2.0/24", availabilityZone: "eu-west-1a", state: "available", routeTableId: "rtb-0123abcd4567ef890", networkAclId: "acl-0123abcd4567ef890" }];
  }
  const routes = savedState.routes ?? baseline.routes;
  const routeTables = savedState.routeTables?.length ? savedState.routeTables : (baseline.routeTables ?? []).map((table, index) => index === 0 ? { ...table, routes, associatedSubnetIds: [instance.subnetId] } : table);
  const instances = savedState.instances?.map(item => ({ ...item, tags: item.tags ?? { Name: item.name } }));
  return {
    ...baseline, ...savedState, instance, instances, securityGroups, networkAcl,
    s3Buckets: savedState.s3Buckets ?? baseline.s3Buckets,
    iamRoles: savedState.iamRoles ?? baseline.iamRoles,
    vpcs, subnets, routeTables, routes
  };
}


function validateAwsRoute(state: AwsLabState, routeTableId: string, destinationInput: string, targetInput: string): { destination: string; target: string; error: string | null } {
  const destination = destinationInput.trim();
  const target = targetInput.trim();
  const parts = destination.split("/");
  const prefix = Number(parts[1]);
  if (parts.length !== 2 || ipv4ToNumber(parts[0]) === null || parts[1] === "" || !Number.isInteger(prefix) || String(prefix) !== parts[1] || prefix < 0 || prefix > 32) {
    return { destination, target, error: "Enter a valid IPv4 destination CIDR, such as 10.20.0.0/16." };
  }
  const table = getAwsRouteTables(state).find(item => item.id === routeTableId);
  if (!table) return { destination, target, error: "Route table not found." };
  const vpc = getAwsVpcs(state).find(item => item.id === table.vpcId);
  const knownTargets = ["local", "nat-0123abcd4567ef890", "igw-0123abcd4567ef890"];
  if (!knownTargets.includes(target)) return { destination, target, error: "Choose a known target: local, the seeded NAT gateway, or the seeded internet gateway." };
  if (target === "local" && destination !== vpc?.cidr) return { destination, target, error: "The local route destination must match the VPC CIDR." };
  return { destination, target, error: null };
}

function withRouteTableRoutes(state: AwsLabState, routeTables: AwsRouteTable[], routeTableId: string): AwsLabState {
  const subnet = getAwsSubnets(state).find(item => item.id === state.instance.subnetId);
  const activeTable = routeTables.find(item => item.id === routeTableId);
  const routes = subnet?.routeTableId === routeTableId ? activeTable?.routes ?? state.routes : state.routes;
  return { ...state, routeTables, routes };
}

export function addAwsRoute(state: AwsLabState, routeTableId: string, destinationInput: string, targetInput: string): { state: AwsLabState; error: string | null } {
  const routeTables = getAwsRouteTables(state);
  const table = routeTables.find(item => item.id === routeTableId);
  if (!table) return { state, error: "Route table not found." };
  const validated = validateAwsRoute(state, routeTableId, destinationInput, targetInput);
  if (validated.error) return { state, error: validated.error };
  if (table.routes.some(route => route.destination === validated.destination)) return { state, error: "A route for this destination already exists." };
  const updated = routeTables.map(item => item.id === routeTableId ? { ...item, routes: [...item.routes, { destination: validated.destination, target: validated.target, state: "active" as const }] } : item);
  return { state: withRouteTableRoutes(state, updated, routeTableId), error: null };
}

export function updateAwsRoute(state: AwsLabState, routeTableId: string, originalDestination: string, destinationInput: string, targetInput: string): { state: AwsLabState; error: string | null } {
  const routeTables = getAwsRouteTables(state);
  const table = routeTables.find(item => item.id === routeTableId);
  const existing = table?.routes.find(route => route.destination === originalDestination);
  if (!table || !existing) return { state, error: "Route not found. Refresh and try again." };
  if (existing.target === "local") return { state, error: "The VPC local route cannot be edited in this simulator." };
  const validated = validateAwsRoute(state, routeTableId, destinationInput, targetInput);
  if (validated.error) return { state, error: validated.error };
  if (table.routes.some(route => route.destination !== originalDestination && route.destination === validated.destination)) return { state, error: "A route for this destination already exists." };
  const updated = routeTables.map(item => item.id === routeTableId ? { ...item, routes: item.routes.map(route => route.destination === originalDestination ? { ...route, destination: validated.destination, target: validated.target, state: "active" as const } : route) } : item);
  return { state: withRouteTableRoutes(state, updated, routeTableId), error: null };
}

export function deleteAwsRoute(state: AwsLabState, routeTableId: string, destination: string): { state: AwsLabState; error: string | null } {
  const routeTables = getAwsRouteTables(state);
  const table = routeTables.find(item => item.id === routeTableId);
  const existing = table?.routes.find(route => route.destination === destination);
  if (!table || !existing) return { state, error: "Route not found. Refresh and try again." };
  if (existing.target === "local") return { state, error: "The VPC local route cannot be deleted." };
  const updated = routeTables.map(item => item.id === routeTableId ? { ...item, routes: item.routes.filter(route => route.destination !== destination) } : item);
  return { state: withRouteTableRoutes(state, updated, routeTableId), error: null };
}


function withEgressAsIngress(state: AwsLabState, groupId: string): AwsLabState {
  return { ...state, securityGroups: state.securityGroups.map(group => group.id === groupId ? { ...group, ingress: group.egress ?? [] } : group) };
}

function restoreEgressFromProxy(original: AwsLabState, proxy: AwsLabState, groupId: string): AwsLabState {
  const changed = proxy.securityGroups.find(group => group.id === groupId);
  return changed ? { ...original, securityGroups: original.securityGroups.map(group => group.id === groupId ? { ...group, egress: changed.ingress } : group) } : original;
}

export function addSecurityGroupEgressRule(state: AwsLabState, groupId: string, input: Omit<AwsIngressRule, "id">): { state: AwsLabState; rule: AwsIngressRule | null; error: string | null } {
  const result = addSecurityGroupIngressRule(withEgressAsIngress(state, groupId), groupId, input);
  return { state: result.error ? state : restoreEgressFromProxy(state, result.state, groupId), rule: result.rule, error: result.error };
}

export function updateSecurityGroupEgressRule(state: AwsLabState, groupId: string, ruleId: string, input: Omit<AwsIngressRule, "id">): { state: AwsLabState; error: string | null } {
  const result = updateSecurityGroupIngressRule(withEgressAsIngress(state, groupId), groupId, ruleId, input);
  return { state: result.error ? state : restoreEgressFromProxy(state, result.state, groupId), error: result.error };
}

export function deleteSecurityGroupEgressRule(state: AwsLabState, groupId: string, ruleId: string): { state: AwsLabState; deleted: boolean } {
  const result = deleteSecurityGroupIngressRule(withEgressAsIngress(state, groupId), groupId, ruleId);
  return { state: result.deleted ? restoreEgressFromProxy(state, result.state, groupId) : state, deleted: result.deleted };
}
