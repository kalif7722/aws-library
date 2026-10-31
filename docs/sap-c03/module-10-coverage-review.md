# Module 10 — Block, file and hybrid storage

Production date: 31 October 2026. This inventory uses the supplied PDF as a topic checklist; wording and illustrations are original. 45 original visuals, including two illustrative sandbox walkthroughs, have passed technical and visual review under the Module 09 style standard. Publication additionally requires asset validation and the course build.

## Source inventory

| Physical PDF pages | Topics and subtopics | Visuals |
| --- | --- | --- |
|321|Network block device, AZ scope, instance attachment, size changes, instance EBS optimization|01,04,10,29|
|322|gp2/gp3, io1/io2, st1/sc1; random vs sequential I/O; capacity, throughput and IOPS; SSD boot eligibility|02–04|
|323|Incremental snapshots, application consistency, managed S3 backing, cross-Region copies, AMI relationship, restore initialization and FSR|05–07,31; recovery nuances below|
|324–325|DLM resource tags, schedules, retention and EBS-backed AMIs; DLM ownership boundary; AWS Backup wider service scope|07,32|
|326|Encryption by default; per-Region scope; existing-volume migration and key permissions|08|
|327|Multi-Attach supported volumes and same-AZ attachment; shared writers; cluster-aware filesystem|09|
|328–329|Host-local block storage, performance, fixed instance capacity, reboot survival, stop/termination/host-loss risk, scratch/cache use|10|
|330–331|Managed shared NFS, Linux/POSIX workloads, scaling, mount targets, network security, encryption, private hybrid access|11–13,30|
|332|General Purpose vs previous-generation Max I/O; Bursting, Provisioned and Elastic throughput|14|
|333|Standard, IA, Archive; lifecycle access/cost trade-offs; Regional vs One Zone|11,15|
|334|On-premises and peered access; private paths, route/DNS/target addressing, mount-target redundancy|12|
|335–336|Access-point root directory and POSIX identity; IAM filesystem policy, mount/write controls, POSIX authorization|13,30|
|337|Asynchronous EFS replication, read-only destination, recovery application changes|16|
|358–359|Four FSx families; SMB/NTFS, AD, ACLs, quotas, DFS Namespaces, Linux SMB clients, private on-premises access, SSD/HDD, Multi-AZ and backup|17–19,33|
|360–361|Parallel Lustre, HPC/ML/media; S3 link; storage/performance choice; scratch vs persistent and AZ failure scope|21–22,33|
|362|ONTAP NFS/SMB/iSCSI; application clients, snapshots, clones, compression, deduplication, tiering and capacity|17,24,33|
|363|OpenZFS NFS, compatible clients, snapshots, clones, compression and performance/deployment choices|17,25,33|
|364–365|Windows Single-AZ to Multi-AZ migration; restore alternative; no in-place storage reduction; new target, DataSync and cutover|20|
|366|Lustre S3 lazy loading and explicit output export behavior|23|
|624–630|File, volume and tape interfaces; cached vs stored primary data; local cache/upload requirements; cloud retention; FSx File Gateway and hardware appliance legacy disposition|26–28,34; current-service dispositions below|

|631|S3 event/Lambda processing, Athena/Spectrum/EMR access and separate CRR configuration|41|
|632|Read-only gateway replicas, authoritative writer and cache freshness|42|
|633|Backup files and S3 lifecycle storage/retrieval trade-offs|43|
|634|Version recovery, RefreshCache inventory update and Object Lock version immutability despite client modifications|42–43|

## Current-service dispositions and lesson boundaries

- Current AWS documentation, rather than the PDF's historical throughput tables or price ratios, governs service limits. Artwork teaches mechanisms without presenting old limits as current maxima. Exact quotas depend on configuration, Region and instance/client capabilities.
- SSD boot/data support is explicit. st1/sc1 HDDs are data-only. The initial incorrect gp3 label was rejected and corrected before acceptance.
- EBS snapshots capture written blocks and later changes, not arbitrary application transactions. Snapshot consistency requires application-specific coordination. A consistent multi-volume/application procedure is separate from taking unrelated snapshots.
- Snapshot copies support cross-Region recovery; encrypted copies also need appropriate regional KMS keys and permissions. An EBS-backed AMI references backing snapshots and includes boot metadata; an arbitrary data-volume snapshot alone is not a complete bootable application image.
- DLM governs its policy-created snapshots/AMIs, rather than arbitrary externally created recovery points or instance-store-backed AMIs. AWS Backup's service coverage is broader.
- Fast Snapshot Restore is AZ-specific and has eligibility, performance, credit and billing limits. It is not a universal zero-RTO guarantee. Current provisioned-rate volume initialization is a distinct paid option; specify it deliberately, because it takes precedence over FSR when both are selected.
- The source's physical instance-store capacities are historical examples. Capacity comes from the chosen instance; protect irreplaceable data outside the host. Reboot survival does not imply survival of stop or hardware loss.
- EFS is a shared NFS filesystem, not a Windows-native SMB replacement. POSIX, network and IAM controls solve separate parts of access. An absent user-created filesystem policy is not a safe production authorization design.
- EFS General Purpose is the current recommendation. Max I/O is a previous-generation alternative with higher per-operation latency and does not combine with Elastic throughput or One Zone. Old numerical throughput ceilings are not reused.
- EFS Archive is a Regional storage-class choice. Avoid describing Regional and One Zone as having identical availability and lifecycle capabilities. Replication and backups have different recovery purposes; asynchronous replication needs monitoring and a tested failover procedure.
- FSx Windows SSD/HDD selection depends on latency, metadata operations and cost. Multi-AZ protects serving availability; backups protect recovery history. Linux needs a compatible SMB client. Do not replace Windows access-control semantics with POSIX assumptions.
- FSx capacity and automatic tiering vary by family. The PDF's blanket ONTAP automatic shrink/grow wording is not a universal capacity guarantee. Snapshot and clone space consumption depends on subsequent changes.
- FSx for Lustre repository linkage needs supported import/export settings; S3 updates and Lustre outputs are not universally bidirectional automatically. Scratch data must be recreatable. Persistent SSD/HDD replicate within one AZ; current Persistent Intelligent-Tiering replicates data across multiple AZs. Slides 22 and 45 explicitly separate these configurations and distinguish data durability from serving availability.
- S3 File Gateway uses an IAM role to access its bucket and supports AD-based SMB authentication. S3 storage classes/lifecycle have retrieval and availability implications; an archived object must be restored before file access. Do not imply every S3 class supports immediate file reads.
- Gateway CPU, memory and network must fit supported deployment requirements. S3 File Gateway uses cache disks; Volume/Tape Gateway have type-specific cache and upload-buffer requirements. Volume Gateway stored volumes keep primary data locally; cached volumes keep it in AWS. Both expose iSCSI, not NFS/SMB.
- FSx File Gateway is unavailable to new customers. The AWS hardware appliance stopped being offered on 12 May 2025; support for existing appliances continues until May 2028. Neither is presented as the default new deployment.
- Broad DataSync/Snow-family migration planning belongs to Module 24; application-wide backup/DR to Module 25. Module 10 teaches the storage mechanisms and the Windows filesystem migration case without asserting completion of those later modules.
- Walkthrough artwork is an illustrative teaching aid, not an actual AWS console capture or proof that live resources were provisioned. Required verification steps are included in the lesson details.

## Primary references

- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volumes-multi.html
- https://docs.aws.amazon.com/ebs/latest/userguide/initalize-volume.html
- https://docs.aws.amazon.com/ebs/latest/userguide/ebs-fast-snapshot-restore.html
- https://docs.aws.amazon.com/efs/latest/ug/performance.html
- https://docs.aws.amazon.com/efs/latest/ug/create-file-system-policy.html
- https://docs.aws.amazon.com/efs/latest/APIReference/API_FileSystemProtectionDescription.html
- https://docs.aws.amazon.com/fsx/latest/WindowsGuide/managing-storage-configuration.html
- https://docs.aws.amazon.com/fsx/latest/WindowsGuide/migrate-files-to-fsx-datasync.html
- https://docs.aws.amazon.com/storagegateway/latest/vgw/StorageGatewayConcepts.html
- https://docs.aws.amazon.com/storagegateway/latest/vgw/creating-your-gateway.html
- https://docs.aws.amazon.com/storagegateway/latest/tgw/hardware-appliance.html

This is a topic-to-visual inventory with explicit current-service dispositions. It does not assert that the complete SAP-C03 course is finished or that a specific exam score is guaranteed.

Final visual corrections: 03 (gp3 label), 19 (FSx-managed backup storage), 20 (full service name), 22 (managed FSx file servers), 23 (configured automatic export), 30 (consistent illustrative terminal output and configured negative test), 31 (AMI boot metadata, not an instance-type launch template). Final asset hashes are in module-10-visual-qa.json.

## Depth repair evidence

The source scope is 37 physical PDF pages: 321–337, 358–366 and 624–634. Every page is accounted for above. The earlier review incorrectly stopped at page 630; pages 631–634 are now explicit.

| Source detail needing extra depth | Accepted evidence |
| --- | --- |
|Snapshot timing/load, optional detach, application coordination|35 and snapshot comparison table|
|Manual full-block reads, FSR and current initialization alternative|36 and exact initialization comparison|
|Access-point path, enforced UID/GID and policy restrictions|37|
|Default anonymous policy versus authenticated IAM client permissions|38|
|Bursting credit model and different read metering|39 and EFS numeric comparison|
|Replication initial copy, measured RPO, failover steps and RTO|40|
|Storage Gateway analytics and replication architecture|41|
|Multiple sites/read-only consumers and RefreshCache behavior|42|
|Backup lifecycle, versions and Object Lock client changes|43|
|Block/tape restore interface and type-specific local storage|44|
|Current Lustre Intelligent-Tiering exception to old AZ comparison|22,45 and FSx table|

Exact EBS type capacities/IOPS/throughput, boot eligibility, instance-store reboot behavior, EFS performance-mode restrictions, protocol variants, lifecycle eligibility, current-service exceptions and historical price/scale illustrations are visible in the native comparison tables. These supplement the original teaching diagrams. Old price ratios and maxima have explicit historical/configuration dispositions rather than being passed off as universal current limits.

The updated visual plan records the original explanations, source-page references and Remember cues. The QA manifest records selected asset hashes. This closes the identified Module 10 topic and depth gaps within this source scope; it is not a claim that unfinished course modules are complete.
