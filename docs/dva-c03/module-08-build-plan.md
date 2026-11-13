# Module 08 — application delivery build plan

Source: uploaded *AWS Certified Developer Slides v46.pdf*, PDF pages 282–312 (CloudFront) and 657–700 (API Gateway). This is an internal topic map, not a claim that visual text has passed semantic QA. Recreate explanations and diagrams; do not reproduce source slides. Audit current DVA-C03 objectives separately.

Visual standard: 2048 × 1152 WebP; dark navy, strong white/orange hierarchy, cyan/purple/orange service paths, legible technical explanation, architecture walkthrough, precise caveat and an exam decision/takeaway. Reuse only when the existing image teaches the assigned developer-facing decision at sufficient depth. The attached SAP samples are the composition benchmark. Avoid a fixed three-step formula.

| ID | PDF pages | Lesson / required detail | Origin |
|---|---|---|---|
| 01 | 282–285 | Edge distribution, cache hit/miss and origin path | SAP 15/04 |
| 02 | 284–286 | Origin choices and private S3 OAC request path | SAA 10/03 |
| 03 | 287 | CloudFront caching versus S3 cross-Region replication | New |
| 04 | 288–289 | TTL, cache hit/miss and cache-key construction | SAP 15/16 |
| 05 | 290–292 | Cache policy: headers, cookies, query strings, compression and TTL | SAA 10/02 |
| 06 | 291–292 | Cache-key cardinality and low hit ratio debugging | New |
| 07 | 293–294 | Origin request policy versus cache policy, forwarded values | New |
| 08 | 295 | Invalidation paths, versioned URLs and freshness tradeoff | New |
| 09 | 296–297 | Ordered behaviors, default behavior and sign-in route | SAP 15/04 |
| 10 | 298 | Separate static and dynamic behavior for cache efficiency | SAP 15/30 |
| 11 | 299–300 | VPC origin versus public ALB/EC2 origin and access control | New |
| 12 | 301 | Country allow/block geo restriction and limitations | New |
| 13 | 302–303 | Signed viewer URL/cookie versus private origin access | SAP 15/12 |
| 14 | 303–305 | Trusted key group, signature, policy and expiry flow | New |
| 15 | 304 | Signed URL versus signed cookie versus S3 presigned URL | New |
| 16 | 306–308 | Price classes, edge coverage, data transfer and request cost | SAA 10/05 |
| 17 | 309 | Behaviors route paths to multiple origins | New |
| 18 | 310 | Origin group primary/secondary failover conditions | SAA 10/04 |
| 19 | 311 | Field-level encryption and sensitive POST field path | New |
| 20 | 312 | Real-time logs, Kinesis delivery and sampling/fields | New |
| 21 | 282–312 | OAC, viewer signing and WAF: distinct trust boundaries | SAP 15/09 |
| 22 | 288–295 | Cache diagnosis: key, origin request and invalidation | New |
| 23 | 296–300 | Browser/API dynamic route through CloudFront | New |
| 24 | 306–310 | Edge delivery and origin resiliency decision | New |
| 25 | 657–660 | Serverless API request path and integration target | SAA 14/01 |
| 26 | 660–661 | Direct AWS service integration versus Lambda | SAP 13/20 |
| 27 | 662 | Regional, edge-optimized and private endpoint types | SAP 13/26 |
| 28 | 663, 688–692 | Authorization mechanisms and resource policy boundary | SAA 14/06 |
| 29 | 664–665 | Deployment, stage and REST versus HTTP API staging | SAP 13/23 |
| 30 | 666–667 | Stage variables with Lambda alias and permission | New |
| 31 | 668 | Canary stage traffic, metrics and rollback | New |
| 32 | 669–671 | Proxy versus non-proxy integration contracts | SAP 13/21 |
| 33 | 669–671 | HTTP, Lambda, AWS service, mock and private integration choice | SAA 14/08 |
| 34 | 672–674 | VTL mapping templates: JSON/XML and query parameter transforms | New |
| 35 | 675 | OpenAPI import/export and definition-driven configuration | New |
| 36 | 676–677 | REST request validator and OpenAPI model | New |
| 37 | 678–679 | REST stage cache, cache key, TTL and invalidation | SAP 13/29 |
| 38 | 680–681 | Usage plan and API key association order | SAP 13/33 |
| 39 | 682–683 | Access/execution logs, tracing and key latency metrics | SAP 13/35 |
| 40 | 684 | Account/stage/method throttling, burst and 429 | SAA 14/07 |
| 41 | 685 | 4xx versus 5xx, integration timeout and gateway response | SAP 13/34 |
| 42 | 686–687 | Preflight, CORS headers and browser origin behavior | SAP 13/32 |
| 43 | 688–689 | Resource policy with IAM, VPC endpoint and cross-account | SAP 13/27 |
| 44 | 690–692 | IAM, Cognito, Lambda authorizer and API keys compared | SAP 13/30 |
| 45 | 693 | HTTP API versus REST API versus WebSocket feature matrix | SAA 14/05 |
| 46 | 694–695 | WebSocket connect, disconnect and route selection | SAP 13/36 |
| 47 | 696–698 | Bidirectional messaging and callback management API | SAP 13/37 |
| 48 | 699 | Route selection expression and integration responses | New |
| 49 | 700 | End-to-end API architecture and developer release path | SAP 13/24 |
| 50 | 659–663 | Private HTTP integration and VPC Link path | SAP 13/22 |
| 51 | 664–668 | Versioned deployment, canary and stage-variable exercise | New |
| 52 | 672–677 | Request transformation and validation exercise | New |
| 53 | 678–685 | Cache, throttle and failure diagnosis exercise | New |
| 54 | 686–693 | Auth, resource policy and CORS decision table | New |
| 55 | 694–700 | WebSocket connect/post/disconnect architecture exercise | New |

## Gates before marking complete

1. Verify every reused file exists and inspect visual text for the exact assigned page concepts; replace weak matches with new images. The working split is 30 reuse / 25 new and can change after this review.
2. Produce the new images with the same visual quality as the supplied samples, at the standard resolution, with original wording. Inspect rendered text and diagrams individually.
3. Make a page-to-lesson audit for all 75 PDF pages, including all non-divider pages and developer specifics, plus the current DVA-C03 objective delta. Mark uncertainties explicitly.
4. Validate asset paths, lesson order, duplicate images, visual quality and build before publishing the complete module.
