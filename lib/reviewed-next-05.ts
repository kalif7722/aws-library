import {batch} from "./reviewed-next-builders";
export const reviewedNext05=batch([
["AWS Migration Hub","track an application migration across multiple tools","https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html",[
"Application migration inventory^Define servers and business dependencies^The migration team records the application's servers, owners and cutover dependencies so progress is tracked against a coherent business workload.",
"Migration tool configuration^Authorize supported progress reporting^The team configures the selected supported migration tools and required permissions to report the relevant resource migration status.",
"AWS Migration Hub^Consolidate supported migration progress^Migration Hub presents reported migration state for the configured scope; it does not copy every application's data or execute its traffic cutover.",
"Wave readiness review^Compare reported status with test evidence^The owner verifies application tests and synchronization evidence before treating a tool-reported completed step as cutover readiness.",
"Application cutover coordinator^Execute the reviewed migration procedure^The team performs the selected transfer, write-pause and routing operations through their owning tools under the approved change window.",
"Migration acceptance record^Reconcile actual completion and inventory^The owner records application acceptance and updates the tracked migration status after business verification, retaining rollback and unresolved dependency evidence."
]],
["Migration Evaluator","estimate a data-center workload migration business case","https://aws.amazon.com/migration-evaluator/features/",[
"Data-center estate owner^Select the assessment server population^The owner identifies the permitted systems and business assumptions, including licensing and operational constraints relevant to the migration proposal.",
"Utilization collection^Gather representative server evidence^The configured collection supplies supported inventory and usage observations for the approved systems without assuming a short idle period represents peak demand.",
"Migration Evaluator^Develop the supported migration assessment^The assessment uses accepted inventory and usage evidence to inform a migration business case; it does not provision target servers or guarantee future costs.",
"Sizing and license review^Validate proposed target assumptions^The platform and licensing owners check candidate sizing, software rights and availability requirements against the applications' actual constraints.",
"Finance migration decision^Compare total transition and operating costs^Finance reviews the business case with migration effort, connectivity and parallel-running assumptions rather than relying on compute unit prices alone.",
"Pilot migration validation^Measure a representative migrated workload^The team runs the selected pilot and reconciles performance and operating costs with the assessment before broadening the migration plan."
]],
["AWS Schema Conversion Tool","convert a database schema before data migration","https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html",[
"Source database schema^Identify objects and application SQL^The database owner selects the schema, stored procedures and SQL-dependent application features that must be supported on the target engine.",
"AWS Schema Conversion Tool^Assess supported schema conversion^SCT analyzes the source and generates supported target definitions with conversion findings; an assessment does not migrate all business records.",
"Conversion action review^Resolve unsupported objects manually^The engineer reviews conversion issues and rewrites incompatible procedures or application SQL, recording any behavior changes for testing.",
"Target database schema^Apply the reviewed converted definitions^The team deploys the accepted target objects under scoped database permissions and checks keys, types and indexes before loading data.",
"Database migration load^Transfer and reconcile the business records^The selected migration process loads source records and validates counts and transformations separately from schema conversion.",
"Application compatibility test^Verify transactions and query semantics^The owner tests representative business queries and updates against the target before approving cutover, preserving a documented rollback boundary."
]],
["AWS DataSync","copy a department's files to an S3 landing prefix","https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html",[
"Department source share^Select the permitted file population^The owner identifies the source directories, write activity and supported access method, excluding unrelated files from the migration scope.",
"DataSync locations and agent^Configure supported source and destination access^The team deploys the agent where required and configures location credentials, connectivity and the restricted destination S3 prefix.",
"AWS DataSync^Execute the selected transfer task^DataSync copies the eligible files under its configured task options and records transfer and verification results; synchronization settings determine later update behavior.",
"Amazon S3 department landing^Retain copied objects and access controls^The bucket stores the destination objects under the approved prefix, encryption and consumer permissions; object access is separate from source-share authorization.",
"File reconciliation owner^Review task errors and selected verification^The owner checks task results, required metadata behavior and representative destination reads before interpreting the task as a complete departmental migration.",
"Department access cutover^Pause source writes and accept the final copy^The team follows the reviewed final synchronization and client-access plan, retaining rollback and ownership evidence before retiring the source share."
]],
["AWS Transfer Family","receive a supplier file through a managed SFTP endpoint","https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html",[
"Supplier SFTP client^Authenticate the approved supplier identity^The supplier connects using the configured authentication method and agreed upload path; the supplier does not receive general bucket administration access.",
"Transfer endpoint identity mapping^Restrict storage role and home directory^The endpoint's configured identity maps the supplier to a bounded storage role and permitted logical directory or supported filesystem path.",
"AWS Transfer Family^Accept the permitted protocol upload^The supported endpoint handles the authenticated SFTP upload and writes to the configured storage backend under the supplier's mapped authorization.",
"Amazon S3 supplier input^Store the committed source file^The input prefix retains the uploaded file with its approved access and encryption controls before downstream validation consumes it.",
"Supplier file validation worker^Check schema and business ownership^The worker reads the completed file through its own role, validates expected supplier fields and records an accepted or rejected result with stable file identity.",
"Supplier integration record^Publish the accepted import outcome^The application exposes the validated import result and routes rejected files for approved review, keeping protocol upload success separate from business acceptance."
]],
["AWS Storage Gateway","archive local backup files through an S3 File Gateway","https://docs.aws.amazon.com/filegateway/latest/files3/what-is-file-s3.html",[
"Local backup application^Write the intended backup file^The backup application creates the selected complete backup through its permitted file-share path and records its job and retention identity.",
"File gateway share configuration^Authorize local clients and cloud storage^The owner configures the supported file share, local access rules, gateway cache and S3 role for the intended backup prefix.",
"AWS Storage Gateway^Buffer file writes and upload objects^The selected S3 File Gateway serves the local file interface and uploads data under its configured cache and cloud-storage behavior.",
"Amazon S3 backup prefix^Retain uploaded backup objects^The bucket applies the required encryption, access and retention controls to uploaded backup data; local write completion and cloud upload readiness are checked separately.",
"Backup completion verifier^Confirm upload state and recoverability^The operator verifies the backup's required cloud readiness and job evidence before relying on it as an offsite recovery point.",
"Isolated backup restore^Validate a recovered application dataset^The owner restores the selected backup through the approved procedure and verifies application data, rather than equating object presence with a usable recovery."
]],
["AWS Client VPN","let an employee reach a private support application","https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html",[
"Employee VPN client^Start the approved remote-access connection^The employee connects using the configured supported authentication flow and client profile from an authorized workstation.",
"Client VPN endpoint^Authenticate the remote user^The endpoint authenticates the user under its selected configuration; sign-in alone does not authorize every destination network.",
"AWS Client VPN^Apply routes and authorization rules^The configured endpoint routes and authorization rules admit the employee's permitted private application network through the selected target-network association.",
"Private application ingress^Accept the allowed employee connection^The destination network controls admit the intended application port and healthy endpoint; private routing does not bypass application authentication.",
"Support application backend^Check employee scope and case ownership^The backend verifies the user's application identity and case-access entitlement before reading or changing support records.",
"Employee case response^Return the permitted application result^The client receives the authorized case result through the established VPN path, with network-access and business-access evidence assessed independently."
]],
["AWS Cloud WAN","connect branch networks to an approved shared-service segment","https://docs.aws.amazon.com/network-manager/latest/cloudwan/what-is-cloudwan.html",[
"Enterprise network planner^Define branch and shared-service segments^The planner assigns the application's permitted branch reachability and isolation requirements before constructing the global network policy.",
"Core network policy^Specify attachment and segment routing^The policy defines intended attachment placement and supported segment relationships, avoiding unrestricted connectivity between all participating networks.",
"AWS Cloud WAN^Apply the reviewed core-network policy^Cloud WAN manages the supported core network under the accepted policy version; policy deployment is separate from application execution.",
"Branch and VPC attachments^Connect the selected endpoint networks^The team configures the supported attachments and local routing prerequisites for the branch and shared-service VPC.",
"Shared-service network route^Carry permitted application traffic^The configured network routes and endpoint controls admit the intended private service path while preserving segmentation for unrelated destinations.",
"Network acceptance tests^Verify required paths and isolation^The operator tests permitted service ports and prohibited cross-segment access before accepting the enterprise connectivity change."
]],
["AWS Global Accelerator","route global clients to healthy regional API endpoints","https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html",[
"Global application client^Call the application's accelerator address^The client uses the application's configured hostname and accelerator address for the supported protocol; business authentication remains with the backend.",
"AWS Global Accelerator^Select the supported regional endpoint path^The standard accelerator uses its configured listener, endpoint groups and health evidence to direct traffic toward eligible regional endpoints.",
"Regional application load balancer^Route to healthy API targets^The selected ALB terminates its configured listener protocol and distributes the allowed request to healthy registered application targets.",
"Regional API backend^Authorize and execute the business request^The backend validates the caller and applies the application's business rules before accessing the regional or shared data path.",
"Application data consistency boundary^Commit the requested durable operation^The application uses its chosen data authority and retry identity so traffic relocation cannot create duplicate or inconsistent business updates.",
"Regional failover exercise^Verify client outcomes during endpoint loss^The owner tests the configured regional health and traffic behavior with real requests, accounting for data and dependency readiness separately from network acceleration."
]],
["AWS Network Manager","investigate a branch-to-cloud connectivity incident","https://docs.aws.amazon.com/network-manager/latest/tgwnm/what-are-global-networks.html",[
"Branch application incident^Identify the failing destination and time^The operations owner records the affected branch, cloud destination, protocol and incident interval before investigating the network inventory.",
"Global network inventory^Associate sites, devices and supported resources^The networking team maintains the supported global-network topology and resource relationships needed to interpret branch connectivity evidence.",
"AWS Network Manager^Inspect supported network state and events^Network Manager presents its supported topology and operational evidence; it is not an inline router that repairs every failed packet path.",
"Connectivity investigation owner^Compare cloud and branch evidence^The engineer correlates the reported attachment or connection state with branch-device logs and actual route configuration.",
"Approved network repair^Correct the identified connection or route issue^The owning administrator applies the scoped repair through the resource or device's actual configuration interface under change control.",
"Branch application verification^Confirm the intended private service operation^The owner tests a real permitted application request and checks recovered network evidence before closing the incident."
]]
]);
