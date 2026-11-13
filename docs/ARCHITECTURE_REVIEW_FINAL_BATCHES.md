# Final architecture walkthrough batches

This update completes the 357 catalog entries previously marked pending in 36 batches. Each entry selects an explicit directional workflow with its own service responsibility, input, consumer and acceptance checks. Shared identity and operations stages provide surrounding context. Existing completed workflows, themes and console asset mappings are preserved.

| Cloud | New entries | Catalog completed | Pending |
|---|---:|---:|---:|
| AWS | 120 | 321 | 0 |
| Azure | 127 | 203 | 0 |
| GCP | 110 | 177 | 0 |

Coverage means the currently selected replacement workflow for each catalog name; it does not mean every historical example or possible architecture has been reviewed. Historical offerings use clearly marked migration or legacy operating examples.

## Batches

| Batch | Services |
|---|---:|
| [aws-01](../lib/architecture-final/aws-01.json) | 10 |
| [aws-02](../lib/architecture-final/aws-02.json) | 10 |
| [aws-03](../lib/architecture-final/aws-03.json) | 10 |
| [aws-04](../lib/architecture-final/aws-04.json) | 10 |
| [aws-05](../lib/architecture-final/aws-05.json) | 10 |
| [aws-06](../lib/architecture-final/aws-06.json) | 10 |
| [aws-07](../lib/architecture-final/aws-07.json) | 10 |
| [aws-08](../lib/architecture-final/aws-08.json) | 10 |
| [aws-09](../lib/architecture-final/aws-09.json) | 10 |
| [aws-10](../lib/architecture-final/aws-10.json) | 10 |
| [aws-11](../lib/architecture-final/aws-11.json) | 10 |
| [aws-12](../lib/architecture-final/aws-12.json) | 10 |
| [azure-01](../lib/architecture-final/azure-01.json) | 10 |
| [azure-02](../lib/architecture-final/azure-02.json) | 10 |
| [azure-03](../lib/architecture-final/azure-03.json) | 10 |
| [azure-04](../lib/architecture-final/azure-04.json) | 10 |
| [azure-05](../lib/architecture-final/azure-05.json) | 10 |
| [azure-06](../lib/architecture-final/azure-06.json) | 10 |
| [azure-07](../lib/architecture-final/azure-07.json) | 10 |
| [azure-08](../lib/architecture-final/azure-08.json) | 10 |
| [azure-09](../lib/architecture-final/azure-09.json) | 10 |
| [azure-10](../lib/architecture-final/azure-10.json) | 10 |
| [azure-11](../lib/architecture-final/azure-11.json) | 10 |
| [azure-12](../lib/architecture-final/azure-12.json) | 10 |
| [azure-13](../lib/architecture-final/azure-13.json) | 7 |
| [gcp-01](../lib/architecture-final/gcp-01.json) | 10 |
| [gcp-02](../lib/architecture-final/gcp-02.json) | 10 |
| [gcp-03](../lib/architecture-final/gcp-03.json) | 10 |
| [gcp-04](../lib/architecture-final/gcp-04.json) | 10 |
| [gcp-05](../lib/architecture-final/gcp-05.json) | 10 |
| [gcp-06](../lib/architecture-final/gcp-06.json) | 10 |
| [gcp-07](../lib/architecture-final/gcp-07.json) | 10 |
| [gcp-08](../lib/architecture-final/gcp-08.json) | 10 |
| [gcp-09](../lib/architecture-final/gcp-09.json) | 10 |
| [gcp-10](../lib/architecture-final/gcp-10.json) | 10 |
| [gcp-11](../lib/architecture-final/gcp-11.json) | 10 |

## Validation

The production build passes. Automated checks cover registry completeness, provider collisions, node hover lookup, valid topology, banned placeholder copy and actual renderer selection for all 357 new entries. The registry contains 660 distinct workflows and 4,251 nodes including the existing reviewed workflows. These checks establish coverage and rendering, rather than independent proof of every architectural choice.

See [the complete completed/pending service list](ARCHITECTURE_REVIEW_SERVICE_LIST.md).
