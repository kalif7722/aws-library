# SAA-C03 Module 10 — edge delivery and global routing

Course plan pages: 337–351. Fifteen mapped visuals: six original SAA slides and nine reviewed SAP Module 15 slides. All asset paths were checked before publication. The source course PDF was not available in this workspace for a page-by-page comparison; full source coverage is therefore unverified.

| Topic | Original SAA slides | SAP reuse |
| --- | --- | --- |
| CloudFront, Global Accelerator and Route 53 choice | 01, 06 | 03, 28 |
| Distribution, cache key, request forwarding and behavior | 02, 04 | 04, 05, 16 |
| Private S3 origin, OAC and static site | 03 | 06, 09 |
| Origin group retry and viewer restrictions | 04 | 12 |
| TTL, invalidation, transfer and origin load | 05 | 16 |
| Static versus dynamic delivery | 01, 06 | 30 |

Corrections during image review: a cache hit returns to the viewer without an origin fetch; private personalized responses bypass shared caching in the illustrated design; website endpoints cannot use OAC; origin group failover applies only to eligible GET, HEAD and OPTIONS requests; dual-stack Global Accelerator supplies two IPv4 and two IPv6 addresses. AWS official documentation was used for these technical checks.

The CloudFront distribution lab remains a linked course walkthrough; this mapping does not assert that a live AWS account was exercised.
