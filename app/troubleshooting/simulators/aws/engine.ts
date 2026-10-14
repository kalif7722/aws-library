export type AwsIngressRule = {
  id: string;
  protocol: "TCP" | "UDP" | "ALL";
  fromPort: number;
  toPort: number;
  sourceType: "IPv4" | "SecurityGroup";
  source: string;
  description: string;
};
export type AwsLabState = {
  instance: { id: string; name: string; state: "running" | "stopped"; systemStatus: "passed" | "impaired"; instanceStatus: "passed" | "impaired"; privateIp: string; subnetId: string; securityGroupIds: string[]; guestSsh: "listening" | "stopped" };
  securityGroups: { id: string; name: string; vpcId: string; ingress: AwsIngressRule[] }[];
  routes: { destination: string; target: string; state: "active" | "blackhole" }[];
  networkAcl: { direction: "inbound" | "outbound"; protocol: string; ports: string; source: string; action: "allow" | "deny" }[];
};
export type AwsReachabilityResult = {
  reachable: boolean;
  blockedAt: "instance" | "security-group" | "route" | "network-acl" | "guest" | null;
  summary: string;
  checks: { name: string; result: "passed" | "blocked"; detail: string }[];
};
export const createInitialAwsLabState = (): AwsLabState => ({
  instance: { id: "i-0a12b345c678d9012", name: "api-prod-01", state: "running", systemStatus: "passed", instanceStatus: "passed", privateIp: "10.20.2.17", subnetId: "subnet-0123abcd4567ef890", securityGroupIds: ["sg-0ab12cd34ef56ab78"], guestSsh: "listening" },
  securityGroups: [{ id: "sg-0ab12cd34ef56ab78", name: "sg-api-prod", vpcId: "vpc-0123abcd4567ef890", ingress: [
    { id: "sgr-0a443311223344556", protocol: "TCP", fromPort: 443, toPort: 443, sourceType: "IPv4", source: "10.40.0.0/16", description: "Application HTTPS" },
    { id: "sgr-0b844311223344557", protocol: "TCP", fromPort: 8443, toPort: 8443, sourceType: "SecurityGroup", source: "sg-0f55aa11bb22cc33", description: "Internal service traffic" }
  ] }],
  routes: [{ destination: "10.20.0.0/16", target: "local", state: "active" }, { destination: "0.0.0.0/0", target: "nat-0123abcd4567ef890", state: "active" }],
  networkAcl: [
    { direction: "inbound", protocol: "TCP", ports: "1024-65535", source: "10.20.0.0/16", action: "allow" },
    { direction: "inbound", protocol: "TCP", ports: "22", source: "10.20.0.0/16", action: "allow" },
    { direction: "outbound", protocol: "TCP", ports: "1024-65535", source: "0.0.0.0/0", action: "allow" },
    { direction: "outbound", protocol: "TCP", ports: "22", source: "0.0.0.0/0", action: "allow" }
  ]
});
export function addSshIngressRule(state: AwsLabState, source: string, sourceType: "IPv4" | "SecurityGroup"): AwsLabState {
  const groupId = state.instance.securityGroupIds[0];
  return { ...state, securityGroups: state.securityGroups.map(group => group.id !== groupId ? group : {
    ...group, ingress: [...group.ingress, { id: "sgr-sim-ssh-admin", protocol: "TCP", fromPort: 22, toPort: 22, sourceType, source, description: "Approved administrator SSH access (simulated)" }]
  }) };
}
export function evaluateAwsSshReachability(state: AwsLabState, source = "sg-bastion-prod"): AwsReachabilityResult {
  const group = state.securityGroups.find(item => state.instance.securityGroupIds.includes(item.id));
  const instanceHealthy = state.instance.state === "running" && state.instance.systemStatus === "passed" && state.instance.instanceStatus === "passed";
  const ruleAllows = !!group?.ingress.some(rule => rule.protocol === "TCP" && rule.fromPort <= 22 && rule.toPort >= 22 &&
    ((rule.sourceType === "SecurityGroup" && rule.source === source) || (rule.sourceType === "IPv4" && rule.source === "198.51.100.24/32")));
  const routeHealthy = state.routes.some(route => route.destination === "10.20.0.0/16" && route.target === "local" && route.state === "active");
  const aclAllows = state.networkAcl.some(rule => rule.direction === "inbound" && rule.protocol === "TCP" && rule.action === "allow" && rule.ports.split("-").map(Number).some(port => port <= 22 && port >= 22));
  const guestHealthy = state.instance.guestSsh === "listening";
  const checks = [
    { name: "EC2 instance status", result: instanceHealthy ? "passed" as const : "blocked" as const, detail: instanceHealthy ? "Instance is running; both status checks passed." : "Instance state or status checks are not healthy." },
    { name: "VPC route", result: routeHealthy ? "passed" as const : "blocked" as const, detail: routeHealthy ? "The VPC local route is active for the destination subnet." : "No active local route matches the destination network." },
    { name: "Network ACL", result: aclAllows ? "passed" as const : "blocked" as const, detail: aclAllows ? "The configured inbound network ACL permits TCP/22 for this lab path." : "No matching inbound network ACL allow was found." },
    { name: "Security group ingress", result: ruleAllows ? "passed" as const : "blocked" as const, detail: ruleAllows ? "An attached security group allows TCP/22 from the approved administrator source." : "No attached security group allows TCP/22 from sg-bastion-prod." },
    { name: "Guest SSH listener", result: guestHealthy ? "passed" as const : "blocked" as const, detail: guestHealthy ? "sshd is listening on TCP/22." : "The guest SSH service is not listening." }
  ];
  const failed = checks.find(check => check.result === "blocked");
  const map = { "EC2 instance status": "instance", "VPC route": "route", "Network ACL": "network-acl", "Security group ingress": "security-group", "Guest SSH listener": "guest" } as const;
  return { reachable: !failed, blockedAt: failed ? map[failed.name as keyof typeof map] : null,
    summary: failed ? "Traffic is blocked at " + failed.name.toLowerCase() + ": " + failed.detail : "The simulated path allows TCP/22 from the approved administrator source. A real SSH login still requires separate authentication verification.",
    checks };
}
