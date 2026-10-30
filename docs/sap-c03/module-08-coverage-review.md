# Module 08: Load balancing and application ingress

Production status: complete and reviewed for consolidated release. 24 original visual lessons accepted. No whole-course completion claim.

## Source boundary

Reviewed the reference course PDF's physical pages 239–254 as a topic inventory. Its diagrams, layout and prose were not reproduced. Physical pages 204–238 belong to containers and Lambda and are assigned to modules 12 and 13. API Gateway begins on physical page 255 and belongs to module 13. Module 08 adds current ingress, security, deployment and operational explanations beyond this PDF section.

| Reference pages | Topic inventory | Visuals |
| --- | --- | --- |
| 239 | Modern and classic load-balancer families, protocols, public/private schemes | 01,03,13,17,22 |
| 240 | CLB health checks, certificate/SAN behavior, SNI limitation, TCP TLS pass-through | 08,22 |
| 241–243 | ALB HTTP routing, multiple applications, dynamic ports, HTTP/2, WebSockets, redirects, request conditions, instance/IP/Lambda targets, target-group health | 02,05,06,07 |
| 244–245 | NLB transport workloads, static zonal addresses, EIPs, target types, performance and pricing considerations | 13,14,16,21,24 |
| 246 | Regional and zonal NLB DNS and locality tradeoffs | 14,24 |
| 247–248 | GWLB appliance use cases, network-layer operation, GENEVE 6081, instance/IP targets | 17,18 |
| 249–250 | Cross-zone distribution, service defaults, transfer implications | 04,24 |
| 251 | Session affinity, cookie duration and load imbalance | 10,12,22 |
| 252–253 | Least outstanding requests and round robin | 10,22 |
| 254 | NLB flow selection and connection affinity | 15 |

## Current-information corrections

- ALB cross-zone behavior can be disabled for eligible target groups; the load-balancer-level setting remains enabled.
- ALB supports mutual TLS. ALB mTLS passthrough forwards certificate information after terminating TLS; this differs from raw TCP TLS pass-through through NLB.
- NLB security groups exist, with creation-time and protocol-specific constraints.
- NLB supports QUIC and TCP_QUIC in addition to traditional protocols; current compatibility restrictions apply.
- Removed fixed ALB/NLB latency comparisons and obsolete free-tier claims. Teach workload fit and current pricing instead.
- CLB cross-zone default depends on creation method. SAN changes require certificate updates.
- Added explicit fail-open behavior, weighted-target-group non-failover, draining, proxy-header trust, identity boundaries and operational evidence.

## Official guide alignment

The supplied SAP-C03 guide's physical page 9 identifies ingress skill 1.1.10, including ALB, NLB, AWS Load Balancer Controller and API Gateway. Module 08 covers ELB and controller foundations; module 13 owns API Gateway depth and module 12 owns Kubernetes/container lifecycle depth. This is shared skill representation, not a claim that one module alone completes the whole skill.

Supporting skills include network inspection 1.4.3, authentication 2.1.2, encryption in transit 2.2.2, network transfer costs 3.2.2/3.2.4, resilience 4.3.3, deployment rollback 5.2.5 and observability/health 5.3.1/5.4.1. Each visual must be mapped only to the skills it actually teaches.

## Primary sources checked

- https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/rule-action-types.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-authenticate-users.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/mutual-authentication.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/x-forwarded-headers.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-listeners.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/network/network-load-balancers.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-security-groups.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/network/target-group-health-checks.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/network/application-load-balancer-target.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/network/edit-target-group-attributes.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/target-groups.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/edit-target-group-attributes.html
- https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-https-load-balancers.html
- https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
- https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html
- https://aws.amazon.com/elasticloadbalancing/pricing/
- https://aws.amazon.com/elasticloadbalancing/faqs/

## Release gate

All 24 final generated images were inspected for complete copy, correct technical meaning, readable labels and uncropped layout. Repaired the CLB protocol/algorithm illustration and refined NLB/GWLB technical labels and NLB text spacing. All final files passed format, dimension, byte-size and decoding checks as 2048×1152 WebP. The module map, this report, the assets and Module07 lesson27 repair are ready for one consolidated GitHub update. Module07's other known depth-review items remain open and must not be marked repaired by this release.
