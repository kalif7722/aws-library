# SAP-C03 Module 04 coverage review

Reviewed: 29 October 2026. Status: all 40 planned visuals completed and reviewed.

Official source: https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-professional-03/solutions-architect-professional-03-domain1.html

| Official skill | Module evidence |
| --- | --- |
| 1.4.1 Multi-VPC / hybrid / multi-account connectivity | 10–22: endpoints, peering, TGW route tables/RAM, Cloud WAN, PrivateLink and Lattice; 38–40 scenarios |
| 1.4.2 Subnets, IPAM, segmentation | 01–07 foundations, address sizing, overlap and routes; 15, 23–24, 30 and 38 |
| 1.4.3 Inspection, filtering and application protection | 08–09 SG/NACL and Flow Logs; 25–30 symmetry, GWLB, Network Firewall, WAF, DDoS and perimeter; 39 |
| 1.4.4 IPv6 adoption and dual stack | 03, 31–35: prefixes, dual-stack migration, egress-only IGW, DNS64/NAT64, IPv6 security |
| 1.4.5 Global traffic routing | 36: Route 53 routing policies, DNS caching, Global Accelerator, regional readiness; detailed DNS/global routing continues later |

## Review and corrections

- Reviewed each selected generated visual for content, text and readability before mapping it.
- Rejected drafts that implied invalid TGW local routing, incorrect endpoint SG direction, bypass of inspection or DNS Resolver in the application data path.
- Corrected WAF Count to nonterminating; distinguished S3 bucket policy controls from SG/NACL controls; corrected IPv6 route/rule wording.
- Included native TGW-attached Network Firewall as well as inspection VPC deployment, checked against current AWS documentation.
- Every published visual is encoded as 2048×1152 WebP. Source topics are expressed through original teaching examples and visuals.

## Scope

This completes the 40-lesson Module 04 plan. It represents all five Task 1.4 skill statements, including all services named as examples there. Detailed DNS, hybrid resilience and global routing exercises continue in their planned modules. This is not a claim that the entire 800-visual course or every topic in the reference course PDF is complete, and it is not an exam pass guarantee. The whole-course topic audit remains open.

Supporting AWS documentation:

- https://docs.aws.amazon.com/vpc-lattice/latest/ug/auth-policies.html
- https://docs.aws.amazon.com/network-firewall/latest/developerguide/asymmetric-routing.html
- https://docs.aws.amazon.com/vpc/latest/tgw/how-transit-gateways-work.html
- https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-nat64-dns64.html
- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html
- https://docs.aws.amazon.com/global-accelerator/latest/api/
- https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-pricing.html