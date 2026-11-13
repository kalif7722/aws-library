# Produced modules: source depth and asset audit

Reviewed 31 October 2026 against the supplied 845-page v30 PDF. This review covers the produced Module 00–10 material; Modules 11 onward remain planned. The source PDF is an inventory, not artwork to redistribute.

## Evidence and limits

All 322 previously active visual assets were decoded and OCR-inspected for content/mapping alignment. This found real mapping defects that lesson titles/counts concealed. OCR is supporting evidence, not proof of semantic completeness. Source text was reviewed by topic, and diagram-only Storage Gateway examples were inspected visually. Existing detailed Module 06, 07 and 08 inventories were retained rather than replacing them with a count-based claim.

The repair batch contains 27 additional earlier-module lessons, four earlier replacement images, a complete Module 10 style/depth rebuild and 11 additional Module 10 lessons. There are 360 accepted visuals after integration. Exact comparisons appear in readable native tables using the Module 09 reference presentation pattern.

## Source scope and repairs

| Module | Relevant source scope | Findings and accepted repairs |
| --- | --- | --- |
|01 Identity|9–47, 59,65–69,166–169; overlap explicitly shared with organization/security topics|Added 45–52: AD DS/AD FS, directory options, managed-directory availability/integrations, trust versus replication, STS API types, condition operators/variables/missing context, multivalued tags, current managed-policy behavior. Replaced 29: endpoint policy is an extra filter; same-account resource-policy grants make “identity allow always required” too broad.|
|02 Organizations|48–78|Added 23–26: created/invited/moved-account roles, feature modes and discount sharing, tag compliance versus mandatory presence, AI opt-out scope and backup intent versus execution.|
|03 Encryption/configuration|93–126; S3-specific encryption shared with09|Added 27–32: recursive parameter paths, tier/value/count/policy distinctions, CloudFormation reference resolution versus rotation, cross-account secret authorization, key material origin/custom/external stores, actual CloudHSM TLS key-operation integration.|
|04 VPC|667–699,725–732|Replaced08 and09: actual images were shifted to incorrect subjects. Replaced11: removed unrelated AIF/AIP branding. Added41–42: full NAT-instance operating responsibility; Flow Log fields/original packet addresses and diagnostic limits.|
|05 DNS|272–300|Added23–25: IP-based CIDR routing, current geoproximity controls, endpoint/calculated/private health signals, versioned Traffic Flow configuration and caching.|
|06 Hybrid networking|700–724 and315–319|Retained existing41-visual source inventory and current-service dispositions in module-06-coverage-review.md. No newly identified missing core topic from this pass.|
|07 Compute|175–203|Retained the32-visual detailed depth audit and repair evidence in module-07-depth-audit.md. No newly identified missing core topic from this pass.|
|08 Load balancing|239–254|Retained24-visual topic/subtopic inventory and source dispositions in module-08-coverage-review.md. No newly identified missing core topic from this pass.|
|09 S3|338–357 plus132–140 and129|Added34–37: MRAP routing versus replication, Object Lambda eligibility and Glacier vault context, presigned authority/credential expiry, access logs versus CloudTrail data events versus metrics. Retained the detailed class/metrics tables.|
|10 Block/file/hybrid storage|321–337,358–366,624–634|Rebuilt all34 previous visuals in Module09 style and added35–45. Explicitly recovered previously omitted631–634. See module-10-coverage-review.md and module-10-visual-plan.json.|

Each added/replaced visual has section-level original teaching copy and exact page references in the repair plans. The QA manifest records the selected asset path, dimensions, size and SHA-256. Native tables preserve details too dense for large diagram labels, including service limits, defaults, protocol support and legacy availability.

## Ownership of later topics

S3 cost-management material later in the PDF is also owned by the cost module; completing the S3 storage teaching does not complete that later module. DataSync/Data Exchange/Transfer Family content after366, broader migration planning and the later migration sections remain owned by the relevant integration/migration modules. Application-wide backup and disaster recovery remain owned by the later DR module. Detailed security/observability/operations topics remain owned by those later modules even where earlier lessons introduce their interactions.

No source topic may be silently discarded because a later module owns it. Before that module is accepted, enumerate its full source page/subtopic inventory under content-production-standard.md. The global claim100PercentCoverage remains false until all planned modules and their source-item evidence are complete. This audit closes the specifically identified gaps in produced material; it does not certify every future lesson or guarantee an exam result.
