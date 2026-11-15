# IAM objective audit — 15 November 2026

Status: reviewed current 45-lesson IAM inventory; targeted gaps remain. This is an evidence-based inventory audit, not a full-course completion claim.

Official reference: https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03-domain4.html

| Objective | Accepted lesson evidence | Remaining work |
|---|---|---|
| 4.2.1 Authorization controls | 7–8, 21, 23, 25–32, 42, 44 cover principals, resource grants, role assumption and application authorization | Add IAM paths and IAM Roles Anywhere; deepen role trust-policy conditions |
| 4.2.2 RBAC and ABAC | 19, 24, 45 cover tag sets, model choice and trusted tag matching | Include governance of tag assignment in the acceptance review |
| 4.2.3 Least-privilege policies | 2–22, 33, 37–38, 40–43 cover language, conditions, boundaries and refinement | Add an explicit session-policy restriction example; distinguish identity/resource/session cases |
| 4.2.4 Authorization failure analysis | 27–39 cover endpoint, cross-account and KMS failures, Access Analyzer and simulation | Add a worked trust-policy failure case |

Task 4.1 authentication is a separate module requirement. Orientation and role-overview slides do not establish complete coverage of Identity Center, Cognito, federation, STS issuance, presigned URLs or authentication troubleshooting.

## Next accepted production sequence

1. IAM paths: organize identities without treating the path as an automatic security boundary. Annotated ARN and policy scope composition.
2. Roles Anywhere: certificate, trust anchor, profile, trusted role, temporary credentials. Trust-boundary architecture.
3. Session policies: a role can allow an action while the issued session is narrower. Permission intersection with a concrete request.
4. Trust policy diagnosis: identify principal, AssumeRole permission, trust conditions and the first failed check. Worked branching case.

Use AIP_SECURITY_GLOSS_V1 and the shared reference collection. Verify current primary service documentation before writing each image's exact labels. Review the first new visual as the style gate; batch publication follows the existing 20–25 image preference. No new images are claimed generated or accepted by this audit.
