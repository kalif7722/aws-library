# SAA Module 06 — Route 53: source-page and image audit

Source inventory: course PDF pages 194–227. The course uses original explanations and selected SAP visuals; no source diagrams or phrases are copied.

| PDF pages | Required teaching content | Lessons checked | Result |
| --- | --- | --- | --- |
| 194–198 | DNS terminology, recursive/authoritative resolution, actual network connection, Route 53 authoritative role | SAA 06-01; SAP 05-01, 05-02 | Covered |
| 199–200 | A, AAAA, CNAME, NS, SOA, MX, TXT record structure and purpose | SAA 06-02; SAP 05-16 | Covered |
| 201–203 | Public/private hosted zones, VPC view, TTL and caching | SAA 06-03; SAP 05-03 through 05-06 | Covered |
| 204–206 | CNAME versus alias, apex, supported AWS targets and target-managed TTL | SAA 06-03; SAP 05-16 | Covered |
| 207–210 | Simple, weighted and latency routing, response behavior and cache | SAA 06-04; SAP 05-18 | Covered |
| 211–215 | Endpoint/calculated/private health signals and primary-secondary failover | SAA 06-06, 06-07; SAP 05-17, 05-24 | Covered |
| 216–221 | Geolocation, geoproximity bias, IP-based CIDR and multivalue response | SAA 06-05, 06-07; SAP 05-23 | Covered |
| 222–224 | Registrar, delegation to public hosted zone, third-party registrar | SAA 06-08; SAP 05-16 | Covered |
| 225–227 | Hybrid DNS, private hosted zones, inbound/outbound Resolver endpoints | SAA 06-09; SAP 05-07 through 05-10, 05-19, 05-22 | Covered |

Nine original SAA images plus 23 selected SAP visuals, 32 lessons total. All image paths and dimensions checked. The SAP image text was inspected with OCR; the nine new diagrams were inspected visually and a misleading inbound-to-outbound arrow in the hybrid slide was corrected before inclusion. The page groups above cover the course PDF teaching topics for this module; specialized SAP content (RAM, Profiles, PrivateLink, DNSSEC and troubleshooting) offers additional context. No exam score guarantee is implied by source coverage.

Current AWS documentation used for changed behaviors:
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-overview.html
