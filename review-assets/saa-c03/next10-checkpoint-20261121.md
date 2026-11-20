# SAA next-ten review checkpoint — 2026-11-21

Branch: `review/saa-next10-20261121`. This branch contains review assets only. No public mapping or main change is included. Course delivery target: 2048 × 1152 WebP. All exported WebPs below decoded at that size and their raster source was inspected at 1024 × 576. User instruction: replacement artwork must not contain AIP, Approved, Draft, or Review labels.

| Effective display slide | Lesson ID | Review WebP | Git blob SHA | Source and visual result |
| --- | --- | --- | --- | --- |
| M02 07 | `saa02-new-04` | `review-assets/saa-c03/module-02/slide-07-connect-linux-v2-20261121.webp` | `cf09d3a4800bbc7c8aeed8f644fb2b9f590e8f31` | PDF pp. 59–64; direct SSH, browser EC2 Instance Connect, and private Endpoint paths separated; learner-size readable. |
| M03 13 | `saa03-new-04` | `review-assets/saa-c03/module-03/slide-13-ami-v2-20261121.webp` | `3dadf2db7b354f130ae5d693211aae7703200170` | PDF pp. 101–102; EBS-backed AMI definition/snapshots, same-Region launch and regional copy; learner-size readable. |
| M05 03 | `saa05-new-03` | `review-assets/saa-c03/module-05/slide-03-database-control-v2-20261121.webp` | `0fda70a407267a2bc2593594e0e9e165eb0c4b22` | PDF pp. 161–193; RDS, RDS Custom, database on EC2 control, Babelfish, Aurora ML and costs; learner-size readable. |
| M05 10 | `saa05-new-06` | `review-assets/saa-c03/module-05/slide-10-replica-transfer-v2-20261121.webp` | `2142eaad093d738e999cf26aea37dced33c13c39` | PDF p. 167; same-Region replication transfer versus cross-Region outbound charge; learner-size readable. |
| M05 12 | `saa05-new-02` | `review-assets/saa-c03/module-05/slide-12-recover-reconnect-v2-20261121.webp` | `d92913f24de2c119291b238abc4ccb5012af91a8` | PDF pp. 161–193; new RDS restore, validate and reconnect; separate Aurora clone note; learner-size readable. |
| M05 14 | `saa05-new-07` | `review-assets/saa-c03/module-05/slide-14-mysql-physical-restore-v1-20261121.webp` | `63f3a37e7a138b565a02d3c28a73affdcc1782d2` | PDF p. 183; Percona XtraBackup via S3 to new RDS for MySQL or Aurora MySQL; learner-size readable. |

All six were produced from 1672 × 941 PNG rasters and exported to course-size WebP; upsampling does not create native 2048-pixel detail. They are review candidates, not published mappings. Before release, compare every image against exact course source and official artwork requirements once more, then stage only verified public versioned paths. The ten-image publish threshold has not been reached.

## Held and interrupted

- M02 15 `saa02-new-06`: saved PNG only; AI-drawn AWS wordmark/service tiles need official-artwork correction.
- M04 18 `saa04-new-07`: saved PNG only; omits duration-cookie versus application-cookie distinction.
- M04 26 `saa04-new-05`: preview only; orange connector falsely implies healthy target triggers ASG replacement.
- M06 20 `saa06-new-08`: preview only; invented name-server values and conflated registrar with parent DNS delegation.
- M06 06 `saa06-new-03`: generation was interrupted before any image returned; no file saved.

No SAP reuse assets or mapping were changed.

## Official checks used

- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-connect-methods.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/eice-security-groups.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/creating-an-ami-ebs.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-custom.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/babelfish.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-ml.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RestoreFromSnapshot.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Clone.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.html
- https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Migrating.ExtMySQL.S3.html
