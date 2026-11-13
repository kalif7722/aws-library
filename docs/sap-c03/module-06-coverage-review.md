# Module 06 visual coverage repair — 2026-10-30

The audit found that the initial 30 visuals represented the main hybrid concepts but did not cover all reference-PDF topics at sufficient depth. This repair puts the explanations in the visuals rather than relying on optional notes.

## Repair inventory

- Added 40 (extends original 07): physical delivery, provider/facility responsibilities, current dedicated and hosted capacity options, commissioning.
- Added 41 (extends original 13): dedicated-only LAG, matching speed/endpoint, current member limits, minimum active links and per-flow limits.
- Added 31–39: shared-service replicas/proxies, hybrid egress, public/private VPN-over-DX, multiple VPN routing, S3 on Outposts, Client VPN destination access, VPN setup, native Client VPN/TGW and Wavelength.
- Replaced generic learning notes on 01–10 with topic-specific explanations.
- All 30 existing visuals and stable IDs retained; the expanded DX and LAG lessons are additions, not replacements. New assets use versioned paths to avoid stale cached replacements.

## Reference PDF crosswalk

Page numbers refer to *AWS Certified Solutions Architect Professional Slides v30.pdf*, 845-page reference. Explanations and artwork are original. The PDF supplies a depth inventory; current AWS documentation takes precedence for service behavior and limits.

| Reference pages | Topic | Visual lessons after repair |
|---|---|---|
| 700 | VPN components, customer gateway and dual tunnels | 03, 37 |
| 701 | Static/BGP routes and return reachability | 05, 37 |
| 702–703 | Hybrid internet egress and VGW/NAT limitations | 32 |
| 704 | VPN CloudHub | 27 |
| 705 | Per-VPC connectivity and gateway alternatives | 04, 09, 10 |
| 706 | Shared-services replication and proxy approach | 31 |
| 707 | Client VPN authentication and VPC access | 28, 36 |
| 708 | Client VPN peered-VPC access | 36 |
| 709 | Client VPN on-premises access | 36 |
| 710 | Client VPN internet access | 29, 36 |
| 711–712 | Client VPN and transit routing | 29, 36, 38 |
| 713 | Direct Connect fundamentals and resilience | 02, 07, 12 |
| 714 | Virtual interface types | 08 |
| 715 | Physical colocation/provider dependencies | 07, 40 |
| 716 | Dedicated/hosted speeds and provisioning | 07, 40 |
| 717 | IPsec over DX public VIF | 15, 33 |
| 718 | LAG constraints and threshold | 13, 41 |
| 719 | DX gateway cross-account/Region associations | 09 |
| 720 | DX gateway with Transit Gateway | 10 |
| 721 | Multiple VPN connections and active sites | 34 |
| 722 | Independent DX locations and devices | 12 |
| 723 | VPN backup and degraded capacity | 14 |
| 724 | Direct Connect SiteLink | 30 |
| 315–316 | Outposts ownership, local compute and regional ties | 19, 20, 21, 25 |
| 317 | S3 on Outposts | 35 |
| 318 | Wavelength carrier edge | 39 (reference-PDF enrichment) |
| 319 | Local Zones | 22 |

Further hybrid depth remains in 01, 06, 11, 16–18, 23–26: requirements, capacity/acceleration, BGP direction policy, private-IP overlay, SD-WAN/GRE, operations, customer-operated containers, disconnect dependencies and integrated decisions.

## Current behavior corrections

- Do not generalize the VGW NAT restriction to Transit Gateway: TGW supports centralized egress through a NAT gateway.
- Current dedicated DX choices include 400 Gbps; hosted choices include 25 Gbps where supported.
- LAG member limits depend on port speed: four at 1/10 Gbps, two at 100/400 Gbps.
- Native Client VPN/TGW association is supported. It cannot mix with subnet associations; client source addresses are preserved. Explicit routes, network authorization and return routes remain necessary.
- S3 on Outposts uses finite local capacity and OUTPOSTS storage class; SSE-S3 default, optional SSE-C, no SSE-KMS.
- Wavelength is retained as explicit PDF enrichment, not asserted as a separately named SAP-C03 exam requirement.

## Primary technical references

- https://docs.aws.amazon.com/directconnect/latest/UserGuide/connection_options.html
- https://docs.aws.amazon.com/directconnect/latest/UserGuide/Colocation.html
- https://docs.aws.amazon.com/directconnect/latest/UserGuide/lags.html
- https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-basics.html
- https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html
- https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-site-to-site-vpn.html
- https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-aws-transit-gateway-vpn.html
- https://docs.aws.amazon.com/vpn/latest/s2svpn/VPNRoutingTypes.html
- https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-route-priority.html
- https://docs.aws.amazon.com/vpn/latest/s2svpn/cgw-options.html
- https://docs.aws.amazon.com/vpn/latest/s2svpn/FirewallRules.html
- https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-working-routes.html
- https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/no-internet-access.html
- https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/intermittent-access.html
- https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/cvpn-tgw.html
- https://docs.aws.amazon.com/AmazonS3/latest/s3-outposts/S3onOutposts.html
- https://docs.aws.amazon.com/AmazonS3/latest/s3-outposts/S3OnOutpostsRestrictionsLimitations.html
- https://docs.aws.amazon.com/AmazonS3/latest/s3-outposts/s3-outposts-data-encryption.html
- https://docs.aws.amazon.com/AmazonS3/latest/s3-outposts/S3OutpostsCapacity.html
- https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html
- https://docs.aws.amazon.com/wavelength/latest/developerguide/carrier-gateways.html

## Claim boundary

This crosswalk closes the identified Module 06 topic gaps. It does not certify every fact on every page of the reference deck, guarantee an exam result, or complete the whole-course audit. Whole-course `pdfDistinctTopicsReviewed` and `claim100PercentCoverage` remain false until the entire syllabus has undergone a traceable audit. Visual QA and asset integrity are checked before release.

