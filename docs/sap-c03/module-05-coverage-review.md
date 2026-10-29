# SAP-C03 Module 05 coverage review

Reviewed: 29 October 2026. All 22 planned DNS and hybrid-resolution visuals are complete.

Primary exam skill: 1.3.4 (hybrid DNS, Resolver endpoints, private hosted zones, split-horizon DNS and conditional forwarding). Supporting topics address 1.4.2, 1.4.3 and 1.4.5. This completes this module's plan, not the whole-course PDF audit.

| Topic | Lessons |
| --- | --- |
| Resolver roles, TTL, caches, DNS versus application traffic | 01–02 |
| Public/private views, VPC attributes, zone association, namespace precedence and reverse DNS | 03–06 |
| Inbound/outbound endpoints, conditional forwarding, delegation, loops, transport/security/AZ resilience | 07–10 |
| RAM shared rules, Route 53 Profiles, hybrid PrivateLink DNS | 11–13 |
| DNS Firewall, failure mode, query logs and cache visibility limits | 14–15 |
| Alias/CNAME/delegation, health signals, routing policies and regional dependencies | 16–19 |
| DNSSEC signing/validation, error diagnosis, integrated multi-account scenario | 20–22 |

Selected visuals were reviewed for technical content, spelling, readability and separate DNS/application paths. Drafts with obsolete delegation claims, confused endpoint types, incorrect DNS Firewall defaults and imprecise DNSSEC terminology were repaired before acceptance. Supporting notes preserve nuances such as IP-based routing, cache effects, record-type constraints and regional scope.

Every publication asset was encoded and decoded as nonempty 2048×1152 WebP. The initial PNG drafts remain source history; course assets use /course-visuals/sap-c03/module-05/slide-XX.webp.

Official references checked:

- https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-03/solutions-architect-professional-03-domain1.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zone-private-considerations.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-choose-vpc.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/profiles.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/profile-high-level-steps.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall-vpc-configuration.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-query-logs.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-private-hosted-zones.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-determining-health-of-endpoints.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dnssec-validation.html

Whole-course accepted count after this module: 158 of 800 planned visuals. Full syllabus and reference-PDF topic audit remains open; no exam pass guarantee is implied.