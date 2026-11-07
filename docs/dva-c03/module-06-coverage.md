# Module 06 source coverage audit

Audited the uploaded PDF pages 165–212 against lesson text and image OCR. Page 165 and 196 are dividers; page 208 is a transition note. The mapping below points to the most relevant visuals and does not imply that every historical number in the PDF is a current service limit.

| Source page(s) | Lesson | Visual origin |
|---|---|---|
| 165–169 | dva-06-001 | saa06-new-01 |
| 166–168 | dva-06-002 | saa06-reuse-05-02 |
| 165–177 | dva-06-003 | new |
| 170–171 | dva-06-004 | saa06-new-02 |
| 172–174 | dva-06-005 | saa06-new-03 |
| 172–173 | dva-06-006 | saa06-reuse-05-03 |
| 170–171, 175–177 | dva-06-007 | new |
| 175–177 | dva-06-008 | saa06-reuse-05-16 |
| 178–181 | dva-06-009 | saa06-new-04 |
| 178–181, 192 | dva-06-010 | new |
| 174, 178–181 | dva-06-011 | saa06-reuse-05-18 |
| 182–185 | dva-06-012 | saa06-reuse-05-24 |
| 182–185 | dva-06-013 | saa06-new-06 |
| 182–186 | dva-06-014 | new |
| 186, 192 | dva-06-015 | saa06-new-07 |
| 187–191 | dva-06-016 | saa06-new-05 |
| 188–191 | dva-06-017 | saa06-reuse-05-23 |
| 193–195 | dva-06-018 | saa06-new-08 |
| 196–199 | dva-06-019 | saa-18-01 |
| 197–200 | dva-06-020 | saa-18-02 |
| 198–200 | dva-06-021 | saa-18-reuse-04-02 |
| 198–200 | dva-06-022 | saa-18-03 |
| 200 | dva-06-023 | saa-18-reuse-04-03 |
| 201–202 | dva-06-024 | saa-18-04 |
| 201–202 | dva-06-025 | saa-18-reuse-04-08 |
| 203 | dva-06-026 | saa-18-reuse-04-09 |
| 203 | dva-06-027 | new |
| 203 | dva-06-028 | saa-18-13 |
| 204 | dva-06-029 | saa-18-reuse-04-13 |
| 205 | dva-06-030 | saa-18-reuse-04-10 |
| 205 | dva-06-031 | saa-18-reuse-04-11 |
| 200, 205, 207–208 | dva-06-032 | new |
| 206 | dva-06-033 | saa-18-09 |
| 206 | dva-06-034 | saa-18-reuse-06-02 |
| 209 | dva-06-035 | saa-07-001 |
| 209 | dva-06-036 | saa-07-002 |
| 209–212 | dva-06-037 | saa-07-003 |
| 211–212 | dva-06-038 | saa-07-005 |
| 209–212 | dva-06-039 | saa-07-009 |
| 209–212 | dva-06-040 | saa-07-016 |
| 209–212 | dva-06-041 | new |

## Topic audit

| PDF pages | Specific coverage | Result |
|---|---|---|
| 166–169 | DNS names, hierarchy, resolver, authoritative answer, caching and Route 53 | Mapped to resolution visuals |
| 170–177 | A/AAAA/CNAME/NS, public/private zones, TTL, apex alias, supported targets and registrar distinction | Added record and alias-target visual |
| 178–192 | Simple, weighted, latency, failover, geolocation, geoproximity, IP-based and multivalue; direct, calculated and alarm health checks | Added weighted and health-signal visuals |
| 193–195 | Registrar versus hosted-zone NS delegation | Existing registrar visual |
| 197–207 | VPC/subnets/routes, IGW/NAT, SG/NACL, Flow Logs, peering, endpoints, VPN/DX | Added Flow Logs destinations; existing topology visuals |
| 209–212 | Three-tier, LAMP on EC2, EBS local software, optional ElastiCache, EFS uploads and RDS MySQL | Existing WordPress and storage visuals; module comparison table clarifies EBS versus EFS |

The PDF mentions detailed numeric limits, fixed prices, and product claims that may change. These are deliberately not copied as timeless course facts; check current AWS documentation for operations. The OCR check confirms topic presence, not a full semantic proof of every visual.
