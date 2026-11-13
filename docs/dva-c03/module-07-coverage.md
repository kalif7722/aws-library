# Module 07 source coverage audit

The uploaded PDF sections 213–237 and 248–281 are mapped below. Pages 238–247 belong to the developer-tools module. The source PDF includes historical price and quota examples; the course teaches the decision factors without treating those figures as current.

| PDF page(s) | Lesson | Visual origin |
|---|---|---|
| 214–218 | dva-07-001 | new |
| 214–218 | dva-07-002 | saa-08-002 |
| 215–218 | dva-07-003 | saa-08-003 |
| 215–281 | dva-07-004 | saa-09-016 |
| 216–218 | dva-07-005 | saa-08-reuse-01 |
| 217–218, 260 | dva-07-006 | new |
| 219–225 | dva-07-007 | new |
| 219–224 | dva-07-008 | saa-08-reuse-03 |
| 219–225 | dva-07-009 | saa-08-004 |
| 219–225 | dva-07-010 | saa-09-001 |
| 219–224 | dva-07-011 | saa-09-002 |
| 226, 272–274 | dva-07-012 | new |
| 226 | dva-07-013 | saa-08-008 |
| 226 | dva-07-014 | saa-08-reuse-33 |
| 226, 281 | dva-07-015 | saa-09-reuse-30 |
| 227 | dva-07-016 | saa-08-reuse-06 |
| 227 | dva-07-017 | saa-08-005 |
| 227–229, 275 | dva-07-018 | saa-09-reuse-31 |
| 228–229 | dva-07-019 | saa-09-007 |
| 228–229 | dva-07-020 | saa-09-reuse-13 |
| 229 | dva-07-021 | saa-09-006 |
| 229 | dva-07-022 | saa-09-reuse-14 |
| 229 | dva-07-023 | saa-09-008 |
| 229 | dva-07-024 | saa-09-014 |
| 230–237 | dva-07-025 | new |
| 230–233, 236–237 | dva-07-026 | saa-08-reuse-09 |
| 230, 234, 236–237 | dva-07-027 | saa-08-reuse-10 |
| 230, 235–237 | dva-07-028 | saa-08-reuse-11 |
| 249–253 | dva-07-029 | new |
| 249–252 | dva-07-030 | saa-08-006 |
| 250–252 | dva-07-031 | saa-08-reuse-12 |
| 253 | dva-07-032 | saa-09-reuse-23 |
| 254–256 | dva-07-033 | new |
| 254–256 | dva-07-034 | saa-09-reuse-15 |
| 254–256 | dva-07-035 | saa-09-011 |
| 256 | dva-07-036 | saa-09-reuse-16 |
| 257–258 | dva-07-037 | saa-09-reuse-17 |
| 257–259 | dva-07-038 | saa-09-010 |
| 258 | dva-07-039 | saa-09-009 |
| 258 | dva-07-040 | saa-09-reuse-18 |
| 258 | dva-07-041 | saa-09-reuse-19 |
| 258 | dva-07-042 | saa-09-reuse-21 |
| 259 | dva-07-043 | saa-09-reuse-20 |
| 260 | dva-07-044 | saa-09-reuse-29 |
| 261–263, 271 | dva-07-045 | saa-09-004 |
| 262–268 | dva-07-046 | new |
| 262–266 | dva-07-047 | saa-09-005 |
| 262–268 | dva-07-048 | saa-09-reuse-05 |
| 269–271 | dva-07-049 | new |
| 272–274 | dva-07-050 | saa-09-015 |
| 275–277 | dva-07-051 | new |
| 276–277 | dva-07-052 | saa-09-012 |
| 276–277 | dva-07-053 | saa-09-reuse-37 |
| 278 | dva-07-054 | new |
| 278 | dva-07-055 | saa-08-007 |
| 278 | dva-07-056 | saa-08-reuse-36 |
| 279–280 | dva-07-057 | new |
| 279–280 | dva-07-058 | saa-09-003 |
| 279–280 | dva-07-059 | saa-09-reuse-04 |
| 281 | dva-07-060 | new |

## Topic checkpoints

| PDF pages | Coverage decision |
|---|---|
| 213–225 | Bucket/object model, use cases, naming, IAM and bucket policies, cross-account and Block Public Access |
| 226–229 | Static site, versioning, SRR/CRR and replication caveats |
| 230–237 | All listed storage classes, durability versus availability, retrieval and cost factors |
| 248–253 | Transitions, expiration, noncurrent versions and Storage Class Analysis |
| 254–260 | SNS/SQS/Lambda/EventBridge event permissions, prefix performance, multipart/acceleration/range fetch, metadata and tags |
| 261–271 | SSE-S3, SSE-KMS, DSSE-KMS, SSE-C, client-side encryption, TLS and bucket-policy/default-encryption distinction |
| 272–281 | Browser CORS, MFA Delete, access logging and loop, presigned URLs, access points/VPC origin, Object Lambda with current availability |

Current AWS guidance limits S3 Object Lambda to existing customers and select partners; this is stated on the new slide. Operational limits, prices and default settings should be verified against current AWS documentation. Page mapping plus visual title is insufficient as proof of complete semantic coverage; visual text QA and objective audit remain distinct checks.
