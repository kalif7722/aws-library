import {reviewedNetworkArchitectures} from "./reviewed-network-architectures";
import {reviewedSecurityArchitectures} from "./reviewed-security-architectures";
import {reviewedRecoveryArchitectures} from "./reviewed-recovery-architectures";
import {reviewedMigrationArchitectures} from "./reviewed-migration-architectures";
import {reviewedTracingArchitectures} from "./reviewed-tracing-architectures";
import {reviewedPrivateAccessArchitectures} from "./reviewed-private-access-architectures";
import {reviewedCacheArchitectures} from "./reviewed-cache-architectures";
import {reviewedSecretsArchitectures} from "./reviewed-secrets-architectures";
import {reviewedContainerArchitectures} from "./reviewed-container-architectures";
import {reviewedIdentityArchitectures} from "./reviewed-identity-architectures";
import {reviewedReleaseArchitectures} from "./reviewed-release-architectures";
import {reviewedDatabaseArchitectures} from "./reviewed-database-architectures";
import {reviewedStorageArchitectures} from "./reviewed-storage-architectures";
import {reviewedHybridArchitectures} from "./reviewed-hybrid-architectures";
import {reviewedOperationsArchitectures} from "./reviewed-operations-architectures";
import {reviewedDataArchitectures} from "./reviewed-data-architectures";
import {reviewedIntegrationArchitectures} from "./reviewed-integration-architectures";
import {reviewedScaleArchitectures} from "./reviewed-scale-architectures";
export type ReviewedNode={label:string;sub:string;detail:string;kind?:"user"|"app"|"data"|"security"|"storage"|"message";icon?:string};
export type ReviewedArchitecture={title:string;note:string;reference:string;layers:{title:string;nodes:ReviewedNode[]}[];connections?:{from:string;to:string;label:string;control?:boolean}[]};
const n=(label:string,sub:string,detail:string,kind?:ReviewedNode["kind"],icon?:string):ReviewedNode=>({label,sub,detail,kind,icon});
const l=(title:string,...nodes:ReviewedNode[])=>({title,nodes});
const a=(title:string,note:string,reference:string,...layers:ReviewedArchitecture["layers"]):ReviewedArchitecture=>({title,note,reference,layers});

const awsImages=a("AWS: create thumbnails after an upload","S3 sends an object-created notification; Lambda reads the original and writes a thumbnail to a separate bucket.","https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html",
 l("Upload",n("Photo application","Upload original image","The application uploads the original image into the input bucket using its authorized credentials or an approved presigned upload. It does not send image bytes through the notification payload.","app")),
 l("Store and notify",n("Amazon S3 input bucket","Original + object-created event","The input bucket durably stores the original and emits an object-created notification matching the configured prefix/suffix filter. Its notification configuration names the Lambda destination; the function policy allows that bucket to invoke it.",undefined,"Amazon S3")),
 l("Process",n("AWS Lambda","Read original and resize","The handler extracts the bucket and object key from the S3 event, reads the image through GetObject, validates its format and size, and creates the thumbnail. Its execution role permits source reads and output writes. Duplicate events must not create inconsistent results.")),
 l("Persist result",n("Amazon S3 thumbnail bucket","Generated thumbnail","Lambda writes the resized image to a separate output bucket with a deterministic key. Keeping output separate from the trigger bucket prevents generated thumbnails from repeatedly invoking the same processing function.",undefined,"Amazon S3")),
 l("Serve",n("Photo viewer","Retrieve resized image","The viewer requests the stored thumbnail through an authorized read path. It reads the generated object rather than invoking the resize function for every page view.","app")));

const awsApi=a("AWS: validate and record an order","An HTTP API authenticates the caller; a function validates the order and writes its durable record before returning the response.","https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html",
 l("Submit",n("Shopping client","Authenticated order request","The client submits the product identifiers, quantities and an idempotency key with its bearer token. It does not supply the trusted final price; the backend validates the submitted order.","app")),
 l("API entry",n("Amazon API Gateway","JWT validation and route","The HTTP API JWT authorizer validates the bearer token and required route scopes. The matched POST route invokes Lambda with the request context and body; API Gateway does not perform the order's business validation.")),
 l("Business logic",n("AWS Lambda","Validate order and handle retries","The handler validates the requested items and totals using trusted application rules, checks the idempotency key, and conditionally records the order. It returns a success response only after the durable write succeeds; a retried request must resolve to the same order.")),
 l("Durable record",n("Amazon DynamoDB","Order and idempotency record","The table stores the order under its application-defined key. Conditional writes or a transaction prevent the same idempotency key from creating multiple orders. DynamoDB enforces the write condition; the function defines the business decision.")),
 l("Respond",n("Shopping client response","Order identifier or error","API Gateway returns the function's mapped HTTP response. The client displays the accepted order identifier or handles a validation/conflict error; this response does not imply payment or shipping has completed.","app")));

const awsQueue=a("AWS: queued invoice generation","SQS absorbs invoice requests while Lambda workers build documents and acknowledge only completed jobs.","https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html",
 l("Produce",n("Order application","Enqueue invoice job","After an order is recorded, the producer sends an invoice job containing the order identifier and stable job key. The application handles the possibility that the order write and queue publication do not complete together.","app")),
 l("Buffer",n("Amazon SQS","Durable job backlog","The queue retains invoice jobs until a consumer successfully processes and deletes them. The visibility timeout temporarily hides received messages; it does not guarantee exactly-once execution. A redrive policy sends repeatedly failing messages to the configured dead-letter queue.")),
 l("Invoke",n("Lambda event source mapping","Poll and batch SQS records","The mapping polls SQS and invokes the function with batches. Successfully processed records are deleted; configured partial-batch responses identify failed records to retry without unnecessarily replaying successful ones.","message")),
 l("Create invoice",n("AWS Lambda","Render PDF idempotently","The handler loads the order through its authorized data access, renders the invoice PDF, and writes it under the stable invoice key. It reports a record as successful only after storage succeeds and records enough job state to tolerate redelivery.")),
 l("Store",n("Amazon S3 invoice bucket","Completed document","The output bucket retains the completed invoice. Authorized users or downstream billing systems retrieve the document by its recorded identifier; S3 does not acknowledge the SQS message itself.",undefined,"Amazon S3")),
 l("Recover failures",n("Invoice dead-letter queue","Jobs requiring investigation","SQS moves jobs here after the configured receive limit is exceeded. The operator investigates malformed inputs or persistent failures, fixes the cause, and deliberately redrives suitable jobs rather than repeatedly replaying an unresolved error.","message")));

const azureImages=a("Azure: create thumbnails from blob events","Event Grid routes BlobCreated notifications; a function reads the new blob and writes a thumbnail into an output container.","https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-grid-trigger",
 l("Upload",n("Photo application","Upload original blob","The uploader writes an original image to the input container using its authorized identity or a narrowly scoped SAS. Only the blob event metadata is sent to the event handler; the function must read the original bytes from storage.","app")),
 l("Store",n("Azure Blob Storage input","Original image","The source container stores the uploaded original. Storage emits the supported BlobCreated event; the subscription filters limit which container or path is eligible to trigger thumbnail generation.",undefined,"Azure Blob Storage")),
 l("Route event",n("Azure Event Grid","BlobCreated subscription","The subscription filters BlobCreated events and delivers matching event metadata to the registered Azure Functions Event Grid endpoint. Event Grid retries failed delivery according to its policy; the handler must tolerate duplicate events.")),
 l("Resize",n("Azure Functions","Read, validate and resize blob","The Event Grid-triggered handler validates the event and source location, uses its managed identity to read the original blob, then generates a resized image. Successful trigger delivery alone does not prove a usable thumbnail was produced.")),
 l("Output",n("Azure Blob Storage thumbnails","Separate output container","The function writes the thumbnail using an output key derived from the source image. Event subscription filters exclude this output container so thumbnail writes do not feed back into the source processing loop.",undefined,"Azure Blob Storage")),
 l("Consume",n("Photo viewer","Authorized thumbnail download","The viewer fetches the generated thumbnail through the application or an approved storage access mechanism. Its access is limited to the output it is entitled to read.","app")));

const azureApi=a("Azure: validate and persist a support ticket","API Management protects the external API; a function applies ticket rules and stores the accepted request in Cosmos DB.","https://learn.microsoft.com/en-us/azure/api-management/import-function-app-as-api",
 l("Request",n("Customer portal","Submit support request","The authenticated portal sends the support category, description and request identifier. The service checks the customer's access and validates the request before creating a ticket.","app")),
 l("API policies",n("Azure API Management","Token check and backend route","Configured token-validation and throttling policies protect the public ticket endpoint. API Management forwards accepted calls to the Functions backend using its configured backend authentication, while rejected calls are stopped at the API boundary.")),
 l("Ticket logic",n("Azure Functions","Validate and create ticket","The HTTP-triggered function validates the category and payload, authorizes the operation using trusted caller context, and writes a ticket with a stable request identifier. Repeated submissions must resolve consistently rather than generating duplicate tickets.")),
 l("Record",n("Azure Cosmos DB","Ticket document","The container stores the ticket document under the selected item and partition keys. The function handles conflict and concurrency responses; Cosmos DB supplies the configured database consistency and durability behavior.")),
 l("Response",n("Customer portal response","Ticket identifier","The function returns the recorded ticket identifier or a controlled error through API Management. The portal can use the identifier for subsequent status queries; ticket creation is separate from human support resolution.","app")));

const azureQueue=a("Azure: process fulfillment commands","Service Bus queues accepted fulfillment commands; a function completes a message only after its business update succeeds.","https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus-trigger",
 l("Submit command",n("Order application","Publish fulfillment command","The producer sends the accepted order identifier and stable command identifier to the fulfillment queue. It establishes a reliable relationship between recording the order and publishing the command, for example with an application outbox.","app")),
 l("Queue",n("Azure Service Bus","Fulfillment queue","The queue buffers commands and supplies locked messages to the configured consumer. Delivery count and dead-letter policy isolate poison messages. Queue delivery semantics do not replace application idempotency.")),
 l("Execute",n("Azure Functions","Apply fulfillment update","The Service Bus-triggered handler loads the order, checks whether the command was already applied, and writes the fulfillment transition. It completes the message only after that operation succeeds; failures release or retry the message according to trigger and queue configuration.")),
 l("State",n("Azure Cosmos DB","Fulfillment and processed-command state","The application persists the fulfillment state and command-deduplication information under an appropriate partition model. The handler must use a suitable transactional or concurrency design rather than assuming message settlement and database writes are one transaction.")),
 l("Failed commands",n("Service Bus dead-letter queue","Manual diagnosis and replay","Messages reaching a dead-letter condition are retained for investigation. The operator inspects the reason and payload, corrects the underlying issue, and republishes only suitable commands with idempotent processing preserved.","message")));

const gcpImages=a("GCP: resize images on object finalization","An Eventarc trigger delivers a finalized-object event to Cloud Run; application code reads the original and writes a thumbnail.","https://docs.cloud.google.com/eventarc/standard/docs/run/route-trigger-cloud-storage",
 l("Upload",n("Photo application","Write original object","The authorized uploader writes an original image into the source bucket. It waits for the completed object; the downstream event identifies the object and generation rather than carrying image bytes.","app")),
 l("Source",n("Cloud Storage input bucket","Finalized original","Cloud Storage durably retains the uploaded object and emits its object-finalized event. The trigger's bucket and location configuration determine which uploads are eligible for delivery.",undefined,"Cloud Storage")),
 l("Delivery",n("Eventarc","Filtered CloudEvent delivery","The trigger routes matching Cloud Storage events to the Cloud Run service using the configured trigger identity and Pub/Sub transport. Duplicate delivery is possible; the receiver must handle repeated events for the same object generation.")),
 l("Resize",n("Cloud Run","Read original and generate thumbnail","The container's event handler parses the CloudEvent, retrieves the source object with its runtime service account, validates and resizes the image, then writes the thumbnail. It acknowledges a handled event only after the intended output is durable.")),
 l("Output",n("Cloud Storage thumbnails","Generation-keyed output","The application writes a thumbnail using a stable source-object/generation-derived key. The output bucket is outside the source trigger's filter, preventing output writes from triggering another resize cycle.",undefined,"Cloud Storage")),
 l("View",n("Photo viewer","Read generated image","The user-facing application serves or authorizes a read of the stored thumbnail. Rendering a page consumes that output and does not require Cloud Run to regenerate the image each time.","app")));

const gcpApi=a("GCP: submit and query a booking","API Gateway validates the client token and invokes an authorized Cloud Run booking backend, which persists the booking in Firestore.","https://docs.cloud.google.com/api-gateway/docs/get-started-cloud-run",
 l("Submit",n("Booking client","Token and booking request","The client sends its identity token, requested slot and stable request identifier. The backend must enforce ownership and booking rules; possession of a token alone does not authorize every booking operation.","app")),
 l("Gateway",n("API Gateway","Validate JWT and invoke backend","The configured API definition validates the client's JWT and maps the booking route to Cloud Run. Its backend-authentication service account has permission to invoke that service; this backend identity is distinct from the end user's authorization.")),
 l("Application",n("Cloud Run","Validate slot and persist booking","The application checks the trusted caller context, validates the slot, and uses a Firestore transaction or suitable write preconditions to reserve it consistently. It handles retried submissions by the stable request identifier and returns the booking outcome.")),
 l("Database",n("Firestore","Booking and slot availability","Firestore stores booking documents and slot state. Transactional reads and writes allow the application to reject conflicting reservations; Firestore does not choose the booking's business rules itself.")),
 l("Result",n("Booking client response","Confirmed booking or conflict","The backend response returns through the gateway with the booking identifier or a conflict/validation error. The client can query its booking later using the authorized read endpoint.","app")));

const gcpQueue=a("GCP: queued receipt generation","Pub/Sub pushes authorized receipt jobs to Cloud Run, which stores the document before acknowledging successful processing.","https://docs.cloud.google.com/run/docs/tutorials/pubsub",
 l("Publish",n("Order application","Publish receipt job","The order producer publishes a message with a stable order and job identifier after the order is accepted. Its publication strategy accounts for a failure between the business write and event publication.","app")),
 l("Messaging",n("Pub/Sub","Receipt topic and push subscription","The topic accepts receipt jobs and the push subscription delivers them to Cloud Run. The configured push identity supplies an OIDC token with invoke permission. Unacknowledged messages are retried under the subscription's delivery policy.")),
 l("Generate",n("Cloud Run","Render and persist receipt","The handler validates the push request and message, retrieves authorized order data, and generates the receipt. It writes the completed document under a stable key and returns a successful acknowledgment response only after processing is complete. Duplicate messages are handled idempotently.")),
 l("Store",n("Cloud Storage receipts","Completed receipt object","The output bucket stores the generated receipt so authorized consumers can retrieve it independently of the message-delivery path. A successful storage write is an application checkpoint; Pub/Sub is acknowledged by the handler's response.",undefined,"Cloud Storage")),
 l("Recover",n("Pub/Sub dead-letter topic","Unprocessable jobs","When a dead-letter policy and required IAM permissions are configured, repeatedly undeliverable jobs can be forwarded here. A separate subscription lets operators inspect and deliberately replay repaired jobs; forwarding thresholds are approximate.",undefined,"Pub/Sub")));

export const reviewedWorkloadArchitectures:Record<string,ReviewedArchitecture[]>={
 ...reviewedNetworkArchitectures,
 ...reviewedSecurityArchitectures,
 ...reviewedRecoveryArchitectures,
 ...reviewedMigrationArchitectures,
 ...reviewedTracingArchitectures,
 ...reviewedPrivateAccessArchitectures,
 ...reviewedCacheArchitectures,
 ...reviewedSecretsArchitectures,
 ...reviewedContainerArchitectures,
 ...reviewedIdentityArchitectures,
 ...reviewedReleaseArchitectures,
 ...reviewedDatabaseArchitectures,
 ...reviewedStorageArchitectures,
 ...reviewedHybridArchitectures,
 ...reviewedOperationsArchitectures,
 ...reviewedDataArchitectures,
 ...reviewedIntegrationArchitectures,
 ...reviewedScaleArchitectures,
 "AWS Lambda":[awsImages,awsApi,awsQueue],
 "Amazon S3":[awsImages,awsQueue],
 "Amazon SQS":[awsQueue],
 "Amazon API Gateway":[awsApi],"Amazon DynamoDB":[awsApi],
 "Azure Functions":[azureImages,azureApi,azureQueue],
 "Azure Blob Storage":[azureImages],
 "Azure Service Bus":[azureQueue],
 "Service Bus":[azureQueue],"API Management":[azureApi],"Azure API Management":[azureApi],"Azure Cosmos DB":[azureApi,azureQueue],
 "Cloud Run":[gcpImages,gcpApi,gcpQueue],
 "Cloud Storage":[gcpImages,gcpQueue],
 "Pub/Sub":[gcpQueue],
 "API Gateway":[gcpApi],"Eventarc":[gcpImages],
};

const uniqueArchitectures=[...new Map(Object.values(reviewedWorkloadArchitectures).flat().map(arch=>[arch.title,arch])).values()];
export function reviewedWorkloadNodeDetail(architecture:string|undefined,label:string){
 return uniqueArchitectures.find(item=>item.title===architecture)?.layers.flatMap(item=>item.nodes).find(item=>item.label===label)?.detail;
}
export function reviewedGcpBoards(service:string){
 return (reviewedWorkloadArchitectures["GCP:"+service]??reviewedWorkloadArchitectures[service])?.map(arch=>({title:arch.title,note:arch.note,reference:arch.reference,groups:arch.layers.map(layer=>({title:layer.title,cards:layer.nodes.map(node=>({label:node.label,caption:node.sub,detail:node.detail,iconLabel:node.icon||node.label}))}))}));
}
