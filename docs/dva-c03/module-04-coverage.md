# Module 04 source coverage audit

Internal page-level mapping of uploaded DVA-C02 PDF pages 95–137. Page 95 is a section divider and page 138 begins the database chapter. DVA-C03 objective delta remains a separate audit.

| PDF page(s) | Concept | Visual | Source lesson |
|---|---|---|---|
| 95–100 | Scale up, scale out, and stay available | dva-04-001 | new |
| 101–105 | Choose the load balancer from the traffic | dva-04-002 | saa04-reuse-08-01 |
| 103–105 | Listener, rule, target group: three decisions | dva-04-003 | saa04-reuse-08-02 |
| 101–103 | Public entry point, private application | dva-04-004 | saa04-reuse-08-03 |
| 104 | Health checks measure application readiness | dva-04-005 | saa04-reuse-08-05 |
| 105–107 | Classic Load Balancer: understand the legacy | dva-04-006 | saa04-reuse-08-22 |
| 106 | Secure both the entry point and the target | dva-04-007 | saa04-reuse-08-19 |
| 108–113 | ALB listener rules route by the request | dva-04-008 | new |
| 108–110 | ALB routes by the request meaning | dva-04-009 | saa04-reuse-08-06 |
| 111–113 | ALB targets: instances, IPs and functions | dva-04-010 | saa04-reuse-08-07 |
| 114–116 | NLB: choose transport and TLS behavior | dva-04-011 | saa04-reuse-08-13 |
| 114–116 | NLB addresses, DNS and client identity | dva-04-012 | saa04-reuse-08-14 |
| 116 | NLB keeps flows together and checks health | dva-04-013 | saa04-reuse-08-15 |
| 117–118 | GWLB inserts an appliance inspection service | dva-04-014 | saa04-reuse-08-17 |
| 117–118 | GWLB flow affinity protects stateful inspection | dva-04-015 | saa04-reuse-08-18 |
| 119–120 | Sticky sessions and failover | dva-04-016 | saa04-new-03 |
| 120 | ALB sticky-session cookie ownership | dva-04-017 | saa04-new-07 |
| 121–122 | Cross-zone balancing changes the target pool | dva-04-018 | saa04-reuse-08-04 |
| 123–126 | TLS certificates and SNI | dva-04-019 | saa04-new-04 |
| 123–126 | TLS termination: identify both connections | dva-04-020 | saa04-reuse-08-08 |
| 127 | Drain connections before removing capacity | dva-04-021 | saa04-reuse-08-11 |
| 128–131 | Auto Scaling groups: define the safe operating range | dva-04-022 | saa04-reuse-07-12 |
| 129–131 | ALB health versus ASG health | dva-04-023 | saa04-new-05 |
| 132–135 | Target tracking: choose demand per unit of capacity | dva-04-024 | saa04-reuse-07-13 |
| 132–134 | Step scaling: react to the size of the breach | dva-04-025 | saa04-reuse-07-14 |
| 133–134 | Scheduled and predictive scaling: prepare ahead | dva-04-026 | saa04-reuse-07-15 |
| 132–137 | Auto Scaling: metric, policy, readiness | dva-04-027 | new |
| 136 | Warmup and warm pools: readiness is not one timer | dva-04-028 | saa04-reuse-07-16 |
| 137 | Instance refresh: roll a new launch definition safely | dva-04-029 | saa04-reuse-07-18 |
| 129–130 | Health checks: identify failure before replacement | dva-04-030 | saa04-reuse-07-19 |

The ordered set covers scaling versus availability, managed ELB types, security groups, target health, ALB routing and cookies, cross-zone, TLS and SNI, draining, and ASG launch, policy, metric, warmup, replacement and refresh.
