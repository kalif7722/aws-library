# SAA Module 17 — Advanced identity and security

- Planned source range: SAA course PDF pages 622–699.
- Published mapping: 64 lessons, 11 new SAA visuals and 53 selected SAP visuals (16 identity, 14 governance, 13 cryptography and secrets, and 10 security visibility).
- Topics: workforce and customer federation, Cognito, directory choices, Organizations and SCPs, Control Tower, KMS authorization, Secrets Manager and Parameter Store, ACM, WAF, Shield, GuardDuty, and access-denial diagnosis.
- Technical distinctions: SCPs limit member-account permissions but do not grant them. Cognito user pools authenticate application users; identity pools vend temporary AWS credentials. WAF filters application requests, Shield addresses DDoS, and GuardDuty detects suspicious activity. KMS use requires compatible key and IAM permissions, with grants where applicable.
- Source status: planned topics are mapped; page-by-page comparison against the original SAA PDF remains open. No 100% source coverage assertion is made.
- Related console walkthroughs: SCP, Control Tower, WAF web ACL, and KMS key exercises remain planned separately.
