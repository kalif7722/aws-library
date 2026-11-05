# SAA-C03 Module 03: EC2 networking, lifecycle and storage

Source inventory: AWS Certified Solutions Architect Slides v49, pages 78–118. The source deck is used only to inventory topics; the displayed diagrams and explanations are original or previously created SAP visuals selected for the Associate scope. The SAA-C03 guide is a second coverage lens. Source text and diagrams are not reproduced.

| Source pages | Teaching concept | Candidate visuals | Status |
| --- | --- | --- | --- |
| 78–84 | Private/public IPv4, Elastic IP and internet reachability | SAA 03-01 | Mapped, image QA pending |
| 85–89 | Cluster, spread, partition and precision-time placement | SAP 07-09, 07-23 | Mapped, Associate-fit review pending |
| 90 | ENI attributes, primary/secondary attachment and AZ boundary | SAA 03-02 | Mapped, image QA pending |
| 91–93 | Stop, terminate and hibernate; RAM and storage fate | SAA 03-03 | Mapped, image QA pending |
| 94–98 | EBS AZ scope, attachment and DeleteOnTermination | SAP 10-01; SAA 03-06 | Mapped, image QA pending |
| 99–100 | Snapshots, cross-AZ restore, initialization, archive and Recycle Bin | SAP 10-05, 10-06, 10-35, 10-36; SAA 03-05 | Mapped, image QA pending |
| 101–102 | AMI creation, snapshot mapping and regional copy | SAA 03-04; SAP 10-31 | Mapped, image QA pending |
| 103–104 | Ephemeral instance store versus persistent EBS | SAP 10-10 | Mapped, Associate-fit review pending |
| 105–109 | EBS gp2/gp3, io1/io2, st1/sc1, IOPS and throughput | SAP 10-02, 10-03, 10-04 | Mapped, type-specific QA pending |
| 110 | EBS Multi-Attach scope and shared-writer discipline | SAP 10-09 | Mapped, Associate-fit review pending |
| 111–112 | EBS encryption and recovery-key authorization | SAP 10-08 | Mapped, Associate-fit review pending |
| 113–116 | EFS NFS sharing, mount targets, access, throughput and lifecycle classes | SAP 10-11 through 10-15 | Mapped, Associate-fit review pending |
| 117–118 | EBS versus EFS architecture choice | SAP 10-01, 10-11; module decision table | Mapped, comparative QA pending |

## Batch result and gap check

- 13/13 source-page groups have candidate visual coverage; 25/25 planned lesson paths resolve at 2048×1152.
- 6 new SAA images and 19 selected SAP visuals. The first public-IP draft incorrectly carried a Module 24 label and was excluded. A first DeleteOnTermination image suggested charges stopped on attachment; it was corrected before publication.
- Current AWS documentation was used to avoid stale source-deck limits and pricing claims, including public IPv4 charges, hibernation prerequisites, EBS type capabilities and EFS storage classes.
- This is a *topic mapping*, not 100% verified learning coverage. Detailed per-image technical and visual QA, exam-objective traceability and a rendered site check remain open. Do not mark lessons `qa-passed` yet.

## 2026-11-05 correction

The SAA snapshot-recovery image's module badge has been corrected from 05 to 03. Its restore, archive, Recycle Bin, regional-copy and Fast Snapshot Restore teaching content is retained. The 25 lesson paths and all PDF topic groups were checked against the actual images.
