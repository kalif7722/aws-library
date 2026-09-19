# Azure Service Library Tracker

Source: `azure-service-tracker.xlsx` supplied for the Azure service catalog.
The catalog preserves every workbook branch reference. Repeated services are intentionally shown in multiple branches but use one shared service identity, filename slug, and category-folder mapping.

- Branches: 21
- Branch references: 282
- Unique services: 203
- Visuals marked completed in workbook: 94
- Visuals pending in workbook: 109

| Branch | R2 folder | References |
|---|---|---:|
| AI + machine learning | `azure/ai-machine-learning/` | 30 |
| Analytics | `azure/analytics/` | 19 |
| Compute | `azure/compute/` | 23 |
| Containers | `azure/containers/` | 9 |
| Databases | `azure/databases/` | 15 |
| Developer tools | `azure/developer-tools/` | 12 |
| DevOps | `azure/devops/` | 19 |
| Hybrid + multicloud | `azure/hybrid-multicloud/` | 14 |
| Identity | `azure/identity/` | 4 |
| Integration | `azure/integration/` | 7 |
| Internet of Things | `azure/internet-of-things/` | 16 |
| Management and governance | `azure/management-and-governance/` | 25 |
| Media | `azure/media/` | 1 |
| Migration | `azure/migration/` | 6 |
| Mixed reality | `azure/mixed-reality/` | 1 |
| Mobile | `azure/mobile/` | 7 |
| Networking | `azure/networking/` | 23 |
| Security | `azure/security/` | 19 |
| Storage | `azure/storage/` | 19 |
| Virtual desktop infrastructure | `azure/virtual-desktop-infrastructure/` | 3 |
| Web | `azure/web/` | 10 |

Image convention: `/azure/<category-folder>/<service-slug>.webp`. A missing or pending image renders an informative placeholder and never blocks service navigation.

Course task walkthroughs use a separate namespace and must never be uploaded into
the EL10 category folders:

```text
/azure-certification-walkthroughs/<course-folder>/<task-slug>.webp
```

For example, AZ-305 assets belong under
`azure-certification-walkthroughs/az-305/`. A truly shared task may use
`azure-certification-walkthroughs/common/<category-folder>/`, but a course-specific
asset takes precedence. This separation prevents walkthrough uploads from
overwriting a service's EL10 detail visual.
