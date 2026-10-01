import {batch} from "./reviewed-next-builders";
export const reviewedNext07=batch([
["Amazon Athena","query daily sales without copying the lake into a database","https://docs.aws.amazon.com/athena/latest/ug/what-is.html",[
"Sales ingestion job^Publish partitioned sales files^The ingestion job validates the day's sales records and writes columnar files into date-partitioned S3 locations, retaining a stable batch identifier.",
"AWS Glue Data Catalog^Describe the sales table^The catalog records the table schema and partition locations that Athena uses to locate files; it does not move the sales records into the catalog.",
"Amazon Athena^Execute the approved sales aggregation^The analyst submits SQL through an authorized workgroup. Athena reads the selected S3 partitions and computes revenue totals rather than requiring a provisioned warehouse.",
"Amazon S3 query results^Persist the query output^Athena writes the result to the configured protected output location. The workgroup and bucket permissions restrict who can read the computed financial totals.",
"Sales analyst^Validate totals against ingestion evidence^The analyst checks the query's date range and batch completeness before comparing regional totals with the accepted source sales records.",
"Approved sales report^Publish the reconciled daily figures^The reporting application reads the accepted query result and presents the regional totals with their date and query identity so later corrections remain traceable."
]],
["Amazon EMR","transform a large clickstream batch with Spark","https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html",[
"Clickstream collector^Land immutable event batches^The collector writes compressed event files to an S3 landing prefix with batch identity and timestamps; malformed uploads are isolated before the transformation starts.",
"Batch workflow^Submit the versioned Spark job^The scheduler starts the approved EMR compute option and supplies input locations, output locations and the transformation version under a scoped job identity.",
"Amazon EMR^Run distributed Spark transformations^Spark tasks parse events, remove duplicates by event identity and aggregate sessions across the batch using the configured EMR resources and authorized S3 access.",
"Amazon S3 curated dataset^Store partitioned session summaries^The job writes its completed columnar output to the curated prefix and publishes only an accepted batch, avoiding partially written results being treated as complete.",
"Data quality gate^Check counts and session invariants^The gate compares accepted input counts with output evidence and checks required fields and session constraints before exposing the new partitions to analysts.",
"Analytics consumer^Query the accepted session partitions^The consumer reads the curated sessions to analyze journeys and conversion, with the source batch and transformation version retained for reproducibility."
]],
["AWS Lake Formation","give analysts access to permitted lake columns","https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html",[
"Lake data steward^Register and classify the customer dataset^The steward registers the supported S3 lake location and identifies sensitive columns in its cataloged customer table before assigning analyst permissions.",
"Lake Formation permission grant^Define the permitted analyst view^The steward grants the supported table or column permissions to the intended principal, coordinating IAM and storage prerequisites rather than exposing the entire bucket.",
"Analyst Athena query^Request the allowed customer attributes^The analyst submits a query through the configured supported Athena integration using the identity authorized for the selected lake tables.",
"AWS Lake Formation^Authorize the governed lake access^The integration evaluates the applicable Lake Formation permissions and supplies authorized access for the supported query path; unrelated direct S3 access must be separately controlled.",
"Athena result calculation^Aggregate the permitted customer data^Athena computes the requested result from allowed data and writes it to the protected result location without granting the analyst unrestricted lake administration.",
"Steward access verification^Test permitted and denied queries^The steward verifies that the analyst can query approved columns and is denied restricted ones, also reviewing result-bucket access to prevent downstream disclosure."
]],
["AWS Data Exchange","use a licensed market dataset in a pricing analysis","https://docs.aws.amazon.com/data-exchange/latest/userguide/what-is.html",[
"Market-data buyer^Review the product and license^The buyer evaluates the provider's S3-file product, update schedule and permitted uses before accepting its subscription terms for internal pricing analysis.",
"Subscribed data revision^Select the licensed delivery^The subscriber identifies the required dataset revision and assets made available under the product's delivery and entitlement configuration.",
"AWS Data Exchange^Export the selected file assets^The subscriber runs the supported export job into its authorized S3 destination and tracks completion and revision identity rather than assuming all products use file delivery.",
"Market-data staging bucket^Retain the received revision^The destination stores the delivered assets with restricted access and revision metadata so analysis can reproduce which market snapshot was used.",
"Pricing analysis job^Join licensed observations with internal prices^The job validates the delivered schema and joins the approved observations with internal product prices under the license's permitted usage restrictions.",
"Pricing analyst review^Approve the comparison before business use^The analyst checks coverage, freshness and outliers and reviews the recommendation before any separate application changes product prices."
]],
["AWS Glue DataBrew","clean supplier spreadsheets before inventory analysis","https://docs.aws.amazon.com/databrew/latest/dg/what-is.html",[
"Supplier file intake^Store the received inventory extracts^The intake process places supplier files in the approved S3 input location and records their source and receipt date without silently overwriting the original evidence.",
"DataBrew project^Preview and define cleaning operations^The analyst examines sample data and creates a versioned recipe to normalize product codes, date formats and required inventory fields.",
"AWS Glue DataBrew^Run the recipe against the selected input^The recipe job applies the configured transformations to the dataset using its authorized role and records the chosen recipe version and job outcome.",
"Cleaned inventory output^Write the transformed dataset^The job writes its output to the configured S3 destination, preserving the original input separately so a cleaning mistake can be investigated and rerun.",
"Inventory quality reviewer^Check rejected and normalized values^The reviewer validates product identifiers, quantities and missing-field handling before the cleaned file is accepted for downstream inventory analysis.",
"Inventory analysis consumer^Read the approved cleaned delivery^The consumer analyzes the accepted inventory extract with source and recipe identity attached, allowing corrected supplier data to be reprocessed deliberately."
]],
["AWS Glue Data Quality","reject an incomplete orders batch before publication","https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html",[
"Orders ingestion^Land the candidate daily dataset^The ingestion job writes the day's orders to a staging location and records the expected batch range before analysts can query it as an accepted delivery.",
"Data quality ruleset^Define order integrity checks^The data owner defines supported rules for required identifiers, acceptable values and completeness using the dataset's actual business constraints.",
"AWS Glue Data Quality^Evaluate the configured dataset rules^The supported Glue job integration evaluates the rules against the candidate data and emits rule outcomes; a failed rule is evidence for the configured pipeline decision.",
"Publication gate^Read the quality evaluation result^The workflow checks the actual rule outcomes and blocks publication when required checks fail rather than assuming quality evaluation itself fixes bad source records.",
"Source correction workflow^Resolve and rerun the rejected batch^The owner investigates missing or invalid orders, corrects the source or transformation and reruns the batch under a traceable revision identity.",
"Accepted orders dataset^Expose only the validated delivery^After required checks pass, the pipeline publishes the accepted partitions and their quality evidence so consumers can distinguish complete data from staging output."
]],
["Amazon DataZone","let a finance analyst discover and request a governed dataset","https://docs.aws.amazon.com/datazone/latest/userguide/what-is-datazone.html",[
"Sales dataset owner^Prepare the publishable data asset^The owner supplies business metadata, ownership and usage constraints for the supported cataloged sales asset before making it discoverable to other projects.",
"Amazon DataZone catalog^Publish searchable business metadata^The catalog presents the asset's description and ownership to permitted users; discovery metadata is separate from authorization to read the underlying sales records.",
"Finance analysis project^Request a subscription to the asset^The analyst finds the relevant sales asset and submits the intended use through the project's supported subscription workflow.",
"Data owner approval^Review the requested business use^The owner approves or rejects the subscription according to the dataset's restrictions, with supported fulfillment or manual steps handled for the selected asset type.",
"Environment access fulfillment^Grant the approved data access^The configured supported environment grants access for the accepted subscription, or the responsible owner completes required manual fulfillment for unsupported paths.",
"Finance analyst query^Use the approved dataset through its environment^The analyst queries the allowed data for the approved financial analysis while retaining asset ownership and subscription context for future access review."
]],
["Amazon AppFlow","bring approved CRM opportunities into an S3 reporting lake","https://docs.aws.amazon.com/appflow/latest/userguide/what-is-appflow.html",[
"CRM integration owner^Authorize the supported connector^The owner configures the approved CRM connection and its source permissions, limiting the extracted objects and fields to the opportunity reporting requirement.",
"Opportunity extraction flow^Define mapping and validation^The flow specifies the supported extraction mode, selected fields, filters and transformations so only the intended opportunity data is transferred.",
"Amazon AppFlow^Run the configured CRM transfer^AppFlow reads the allowed source records through the supported connector and applies the flow's configured mappings and validations before delivering the result.",
"Amazon S3 reporting landing zone^Store the transferred opportunity records^The configured destination receives the flow output under restricted access. The reporting pipeline records transfer identity and does not assume every run is a full snapshot.",
"Reporting reconciliation job^Merge records by opportunity identity^The application handles the configured transfer semantics, checks completeness and merges opportunity changes into its curated reporting dataset without duplicating records.",
"Sales reporting consumer^Read the reconciled opportunity view^The dashboard queries the accepted curated records and exposes their refresh time so a failed or delayed CRM transfer is not mistaken for current sales activity."
]],
["Amazon Redshift Serverless","serve a governed revenue dashboard from a warehouse","https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-whatis.html",[
"Revenue ingestion job^Prepare accepted order and payment records^The ingestion pipeline reconciles source batches and writes the approved warehouse input with stable business keys and load identity.",
"Warehouse loading operation^Load the approved revenue tables^The authorized job loads or merges the accepted data into the configured namespace and checks row counts and duplicate handling before releasing the batch.",
"Amazon Redshift Serverless^Execute the dashboard's SQL workload^The workgroup runs authorized SQL against the warehouse tables using its configured capacity and access controls, aggregating revenue by the requested business dimensions.",
"Governed revenue view^Restrict the exposed business fields^The database's configured views and permissions limit dashboard users to approved revenue data rather than granting access to all source payment details.",
"Business intelligence client^Render the returned revenue aggregates^The client displays the query result with the relevant date range and dataset refresh state, distinguishing a successful query from a complete source ingestion.",
"Revenue reconciliation owner^Verify dashboard totals and load evidence^The owner compares displayed totals with accepted source records and resolves discrepancies before using the dashboard for financial decisions."
]],
["Amazon OpenSearch Serverless","search approved product documents in a serverless collection","https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless.html",[
"Product publication job^Prepare searchable product documents^The job transforms approved catalog records into searchable documents with stable product identifiers and strips fields that must not be exposed through search.",
"Authorized indexing client^Write documents to the selected collection^The client submits supported indexing requests under the collection's configured network, encryption and data-access policies and records failed document updates.",
"Amazon OpenSearch Serverless^Index the product search fields^The collection stores and indexes the submitted documents for supported search operations; application publication identity determines which product version should be visible.",
"Product search API^Validate the user's search request^The backend validates query parameters and business restrictions before issuing the allowed search, preventing direct public access to administrative indexing operations.",
"Collection search response^Return matching indexed products^The authorized search request returns matching documents according to the submitted query; the API applies its response contract and handles index freshness explicitly.",
"Shopping search page^Display the permitted product matches^The page shows the approved search results and retrieves current purchase details through the product application rather than treating indexed prices as transactional authority."
]]
]);
