# Module 03 source coverage audit

Internal page-level mapping of uploaded DVA-C02 PDF pages 72–94. Reused assets are linked to the SAA or SAP visual path. The DVA-C03 objective delta is a separate audit.

| PDF page(s) | Concept | Visual | Source lesson |
|---|---|---|---|
| 72–75, 81, 89, 93–94 | Developer storage choice: block, local, or shared files | dva-03-001 | new |
| 73–75 | EBS is persistent block storage within one AZ | dva-03-002 | saa03-reuse-10-01 |
| 76 | Delete on termination | dva-03-003 | saa03-new-06 |
| 77 | Snapshots capture changed blocks, not application intent | dva-03-004 | saa03-reuse-10-05 |
| 77 | Snapshot capture: protect the application state | dva-03-005 | saa03-reuse-10-35 |
| 78 | EBS snapshot recovery: three different controls | dva-03-006 | new |
| 78 | Snapshot recovery controls | dva-03-007 | saa03-new-05 |
| 79–80 | Build an AMI | dva-03-008 | saa03-new-04 |
| 79–80 | Snapshot, AMI and regional copy solve different jobs | dva-03-009 | saa03-reuse-10-31 |
| 81–82 | Grow EBS deliberately; treat instance store as disposable | dva-03-010 | saa03-reuse-10-10 |
| 83–87 | Choose an EBS volume for the access pattern | dva-03-011 | new |
| 84 | gp2 and gp3 separate capacity from performance differently | dva-03-012 | saa03-reuse-10-03 |
| 85–87 | EBS: choose the disk for the access pattern | dva-03-013 | saa03-reuse-10-02 |
| 83–87 | Find the narrowest point in the EBS path | dva-03-014 | saa03-reuse-10-04 |
| 88 | Multi-Attach shares a block device, not a file share | dva-03-015 | saa03-reuse-10-09 |
| 89–90 | EFS shares files across clients and AZs | dva-03-016 | saa03-reuse-10-11 |
| 89–90 | A mount target is the network doorway to EFS | dva-03-017 | saa03-reuse-10-12 |
| 90 | EFS authorization has independent layers | dva-03-018 | saa03-reuse-10-13 |
| 91 | Choose EFS throughput to match demand | dva-03-019 | saa03-reuse-10-14 |
| 92–94 | EFS lifecycle changes cost and access behavior | dva-03-020 | saa03-reuse-10-15 |

Page 72 is a section divider. Page 87 is a summary and documentation reference. Numeric performance, price, and throughput limits in the PDF may change and are not copied into these images. Page 93–94 comparison is synthesized in lesson 01 and supported by lessons 02 and 16–20.
