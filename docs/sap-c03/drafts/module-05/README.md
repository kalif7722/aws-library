# SAP-C03 Module 05 — DNS and hybrid resolution

22 original visual lessons planned. First five PNG drafts reviewed for technical content and readability; not published or counted as accepted visuals. Conversion to 2048×1152 WebP and live verification remain required. Working execution environment was offline on 29 October 2026.

1. **DNS answers a name; routing carries the traffic** — Separate DNS lookup from application connection; verify TTL, route and security independently. (1.3.4)

2. **Recursive resolution, authoritative answers and caching** — Explain stub, recursive and authoritative roles, positive/negative caching and TTL. (1.3.4)

3. **Public and private DNS views: split-horizon design** — Compare public delegation with associated private zones and missing-record behavior. (1.3.4)

4. **VPC DNS attributes, DHCP options and client resolvers** — Distinguish DNS attributes and custom DNS forwarding; use inbound endpoints for remote resolution. (1.3.4)

5. **Private hosted zones and cross-account VPC association** — Show association authorization, visibility, Profiles/RAM alternatives and routing independence. (1.3.4)

6. **Namespace precedence, NXDOMAIN and reverse DNS** — Most-specific zone/rule, same-domain forwarding precedence, no public fallback, PTR/reverse rules. (1.3.4)

7. **Inbound Resolver endpoints: on-premises queries into AWS** — Forward from corporate DNS to resilient inbound endpoint IPs; associate relevant private zones. (1.3.4)

8. **Outbound Resolver endpoints and conditional forwarding** — Associate suffix-specific rules to client VPCs; route endpoint traffic to corporate DNS. (1.3.4)

9. **Bidirectional hybrid DNS without forwarding loops** — Separate namespace authority, forwarding and supported delegation; avoid looping catch-all rules. (1.3.4)

10. **Resolver endpoint security, capacity and AZ resilience** — UDP/TCP 53, stateful SG/stateless NACL response paths, multi-AZ IPs, capacity and health. (1.3.4)

11. **Share Resolver rules across accounts with AWS RAM** — Central rule ownership and consumer associations; connectivity and authorization remain distinct. (1.3.4)

12. **Route 53 Profiles for consistent multi-VPC DNS** — Bundle supported zone/rule/DNS Firewall associations and distribute with RAM; regional scope and precedence. (1.3.4)

13. **Resolve PrivateLink service names from hybrid networks** — Private DNS, inbound endpoint forwarding, endpoint reachability and security; avoid application IP hardcoding. (1.3.4)

14. **DNS Firewall: domain filtering and policy evaluation** — Domain lists, priority/actions, alerts and failure behavior; DNS policy differs from packet inspection. (1.4.3)

15. **Resolver query logs and DNS observability** — Query metadata, destinations, limits/cache effects, logging policy and troubleshooting correlation. (1.3.4)

16. **Alias, CNAME, apex records and delegation** — Use supported alias targets, CNAME constraints and public delegation; private delegation is separate. (1.4.5)

17. **DNS health checks and private application failover** — Public checker reachability, CloudWatch-alarm health checks, alias target health and readiness limits. (1.4.5)

18. **Route 53 routing policies, TTL and controlled shifts** — Latency/weighted/failover/location policy decisions and health evaluation; cache affects visibility. (1.4.5)

19. **Multi-Region private DNS and Resolver architecture** — Regional endpoints/rules, zone associations and resilience; private backend connectivity and client entry. (1.3.4)

20. **DNSSEC signing versus Resolver validation** — Public-zone signing and chain of trust vs query validation; private scope limitations and SERVFAIL. (1.3.4)

21. **Troubleshoot timeout, NXDOMAIN, NODATA and SERVFAIL** — Use caller/resolver/zone/rule/cache/log evidence; isolate security, DNSSEC and forwarding faults. (1.3.4)

22. **Scenario: resilient multi-account hybrid DNS** — Apply namespaces, zones, inbound/outbound rules, shared policy, logging, failure tests and cost tradeoffs. (1.3.4)

Sources:
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-choose-vpc.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html

Release notes: Keep the accepted course count unchanged until format conversion and deployed-image verification pass. Draft PNGs in this folder are source assets, not course publication assets.
