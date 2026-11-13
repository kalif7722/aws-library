# Module 15 — Edge delivery, caching and global acceleration

Source: *AWS Certified Solutions Architect Professional Slides v30.pdf*, physical pages 301–303 and 379–404 (29 pages). Reviewed 2026-11-01.

## Scope and evidence

The 32 visuals map to every assigned physical page in `module-15-source-crosswalk.json`. The module includes three illustrated walkthroughs, 21 native service comparison rows, 50 native precision rows, official AWS service icons, and source URL verification. The source PDF is the topic inventory. Current AWS documentation resolves older service capabilities and deprecated practices. The course-wide 100% coverage flag remains false while later modules are pending.

| Area | Detailed coverage | Lessons |
|---|---|---|
| Global Accelerator | Static anycast IPs, global network ingress, listener protocols and ports, regional endpoint groups, traffic dials, endpoint weights, health checks, regional failover, client IP caveats | 1–3, 28, 32 |
| CloudFront distribution | Edge and regional cache path, origin types, S3 REST versus website endpoint, custom origin reachability, VPC origins, OAC and bucket/KMS policy, S3 replication distinction | 4–9, 30 |
| Availability and access | Origin group request-based failover eligibility, custom errors and error cache TTL, geo restriction, signed URLs and cookies, trusted key groups, S3 presigned URL distinction | 10–15, 31 |
| Performance and cost | Price classes, cache policy, cache key, origin request policy, TTL, invalidation, versioned asset URLs, cache metrics and logs | 12, 16, 29 |
| Edge code | Four Lambda@Edge events and cache hit/miss placement, us-east-1 version replication, CloudFront Functions viewer events, combination rules, capability and quota distinctions, token validation, device variants, origin selection | 17–27 |
| Architecture decisions | CloudFront versus Global Accelerator versus Route 53, static versus dynamic paths, direct origin protection, operational walkthroughs | 3, 9, 26, 28–32 |

## Corrections to historical material

* CloudFront VPC origins can privately connect to supported ALB, NLB or EC2 resources; an ordinary custom origin must be publicly reachable.
* Origin group failover is a per-request retry for eligible methods and configured errors or connection failures. It does not use continuous origin health checks, weighted origins, or a persistent health status dashboard.
* Global Accelerator traffic dials apply to traffic already directed to a Region; endpoint weights then act within that group.
* Use OAC for private S3 REST origins and trusted key groups for signed viewer access. S3 website endpoints are custom HTTP origins and cannot use OAC.
* CloudFront Functions and Lambda@Edge differ in event positions and capabilities. Avoid fixed quota figures from an older PDF; review current limits and supported runtimes at deployment time.

All walkthrough interfaces, sample resources and responses are illustrative. They are architecture exercises, not evidence of execution in an AWS account. Asset hashes and sizes are in `module-15-asset-manifest.json`.
