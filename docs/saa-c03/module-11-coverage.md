# SAA-C03 Module 11 — storage extras

Planned course PDF pages: 352–376. The displayed sequence contains 26 visuals: nine original SAA slides and 17 previously reviewed SAP Module 10 visuals. All selected SAP asset paths exist; new SAA images were inspected and exported as 2048 × 1152 WebP. The underlying course PDF was not available here for a page-by-page audit, so full source coverage is unverified.

| Topic | Original SAA | SAP source lessons |
| --- | --- | --- |
| EFS access, performance, classes and recovery | 01–03 | 10-011 through 10-016 |
| FSx Windows, Lustre, ONTAP and OpenZFS | 01, 03, 04 | 10-017 through 10-019; 10-021, 10-022, 10-024, 10-025, 10-033 |
| Storage Gateway file, volume and tape | 05 | 10-026 through 10-028 |
| DataSync, Transfer Family and physical transfer | 06, 07, 09 | New SAA visuals |
| Windows file-share migration cutover | 08 | New SAA visual |

Technical review corrected: IAM/file-system policy is conditional in the EFS path; EFS Regional and One Zone have different failure boundaries; FSx Windows Multi-AZ has a standby in another AZ while backups provide restore points; Volume Gateway cached and stored modes have different primary data locations. AWS Snowball Edge is unavailable to new customers; the current physical upload example is AWS Data Transfer Terminal with customer-owned devices. The historical Snow Family topic is retained as an availability note, not an active recommendation.

References: https://docs.aws.amazon.com/decision-guides/latest/decision-guides/choosing-aws-storage-service.html ; https://docs.aws.amazon.com/snowball/latest/developer-guide/snowball-edge-availability-change.html ; https://docs.aws.amazon.com/datasync/latest/userguide/ .
