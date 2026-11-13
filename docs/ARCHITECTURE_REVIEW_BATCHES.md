# Five combined architecture review batches

Completed on 2026-10-01. All five batches are delivered together. Each node has individually authored hover text for the named workflow; supporting services are not counted as separately reviewed service pages.

| Batch | Scope | New workflows | Explicit node descriptions |
| --- | --- | ---: | ---: |
| 1 | Persistent disks and shared file storage | 7 | 28 |
| 2 | Hybrid VPN, dedicated connectivity and outbound NAT | 7 | 29 |
| 3 | Infrastructure deployment, account governance and operations | 9 | 36 |
| 4 | Batch ETL, streaming checkpoints and analytical queries | 8 | 34 |
| 5 | Scheduling, tasks, orchestration, event routing, queues, receipts and customer authentication | 8 | 33 |
| Total | AWS, Azure and GCP | 39 | 160 |

AWS analytics pages now select the reviewed Glue and Kinesis walkthroughs before their previous analytics architecture templates. Other analytics content is retained. Existing shared node styling, colors and hover presentation are reused.

Important boundaries covered include Cloud Router's BGP control plane, NAT's outbound translation, Glue catalog metadata versus dataset processing, durable writes before checkpoint or queue acknowledgement, authenticated task dispatch, token validation plus customer ownership, and SES acceptance versus recipient delivery. Official documentation references are embedded in each walkthrough.

Validation: the production build and 20 focused architecture tests pass, including exact title/node hover lookup for every reviewed node and regression checks for the five new batches. Styling was not changed; this does not claim a separate visual browser audit.

Overall explicit registry coverage is now 106 workflows and 515 node occurrences, plus four financial workflows with 21 node occurrences. Catalog service coverage is AWS 61/321, Azure 46/203 and GCP 37/177. The remaining 557 catalog services still require individual semantic review.

These totals describe the five-batch release. The subsequent [100-service release](ARCHITECTURE_REVIEW_NEXT_100.md) and [completed and pending service list](ARCHITECTURE_REVIEW_SERVICE_LIST.md) contain current coverage. An authored workflow does not certify every historical example or possible architecture for that service.
