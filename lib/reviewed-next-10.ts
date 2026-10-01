import {batch} from "./reviewed-next-builders";
export const reviewedNext10=batch([
["AWS IoT Core","accept device telemetry and store validated readings","https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html",[
"Temperature sensor^Publish the timestamped reading^The device sends a reading with its stable device identity and sequence number over its configured authenticated MQTT connection, retaining unsent records according to firmware policy.",
"AWS IoT Core^Authenticate and authorize the MQTT publication^The broker validates the configured device credentials and applicable IoT policy for the selected topic before accepting the supported publication.",
"IoT topic rule^Route the eligible telemetry message^The configured rule selects the intended telemetry topic and invokes its supported action under the required permissions, passing the message for application validation.",
"Telemetry validation Lambda^Check device, schema and reading identity^The handler validates the expected schema and ranges and uses device and sequence identity to handle duplicates before writing an accepted reading.",
"Telemetry data store^Persist the accepted device reading^The authorized write stores the validated reading with event and receipt times so consumers can distinguish delayed telemetry from current sensor measurements.",
"Operations dashboard^Display accepted readings and freshness^The dashboard reads the stored measurements and shows their age, handling missing or stale readings explicitly rather than assuming a connected device always reports current data."
]],
["AWS IoT Greengrass","keep factory anomaly checks running at the edge","https://docs.aws.amazon.com/greengrass/v2/developerguide/what-is-iot-greengrass.html",[
"Factory vibration sensor^Send measurements to the local gateway^The sensor supplies timestamped measurements through the site's configured local connection, preserving the equipment identity required by the edge analysis.",
"Greengrass core device^Run the approved local component deployment^The gateway runs the configured Greengrass components with scoped permissions and dependencies so the selected analysis can operate near the equipment.",
"Local anomaly component^Evaluate the measurement window^The application component applies its versioned anomaly rules or model to local readings and records the detected condition without requiring a cloud round trip.",
"Local operator alert^Present the detected equipment condition^The site's application notifies the operator using its configured local integration; equipment shutdown requires the plant's separately approved safety control.",
"Buffered cloud publication^Forward accepted summaries when connectivity permits^The configured component and buffering integration publish permitted summaries to the cloud and handle reconnect behavior without assuming unlimited offline storage.",
"Cloud maintenance record^Store evidence for the equipment owner^The backend records the received summaries with event times and analysis version so maintenance staff can review the condition even when delivery was delayed."
]],
["AWS IoT Device Defender","investigate an unexpected device-behavior deviation","https://docs.aws.amazon.com/iot-device-defender/latest/devguide/what-is-device-defender.html",[
"Connected device fleet^Produce eligible behavior evidence^Devices and the supported cloud integrations supply the configured metrics used by the selected security profile, under the fleet's approved telemetry permissions.",
"Device Defender security profile^Define expected behavior for the fleet^The owner selects supported metrics, thresholds or supported detection configuration and attaches the profile to the intended device targets.",
"AWS IoT Device Defender^Evaluate the configured behavior evidence^The service detects deviations under the selected profile and reports violations; an abnormal metric is evidence to investigate rather than proof that a device is compromised.",
"Fleet security investigation^Correlate the violation with device context^The owner checks the affected device, expected workload and relevant evidence before deciding whether the deviation reflects abuse, a defect or normal activity.",
"Approved mitigation workflow^Apply a supported scoped containment action^The configured automation or operator applies the selected permitted mitigation, such as an appropriate policy or certificate change, after checking its operational impact.",
"Device recovery verification^Confirm containment and permitted operation^The fleet owner tests the intended access restriction and restores only approved device behavior, retaining the violation and mitigation identity for review."
]],
["AWS IoT Device Management","roll out an approved firmware update to a device group","https://docs.aws.amazon.com/iot/latest/developerguide/iot-jobs.html",[
"Firmware release owner^Publish the approved update artifact^The owner signs and stores the accepted firmware artifact and defines compatibility and recovery requirements before scheduling a fleet update.",
"Target device group^Select compatible rollout participants^The fleet owner selects the intended supported group and verifies device eligibility, avoiding an update intended for one hardware revision reaching another.",
"AWS IoT Device Management^Create the configured device job^The supported Jobs workflow publishes the job document and rollout controls for the selected devices, allowing execution progress and failure status to be tracked.",
"Device job agent^Download and validate the firmware^The device's implemented agent receives the job, retrieves the permitted artifact and verifies authenticity and compatibility before applying the update.",
"Firmware installation and status^Apply the update and report its outcome^The agent follows its device-specific safe installation and recovery logic and reports execution status; publishing a cloud job does not itself install firmware.",
"Fleet rollout owner^Review failures before expanding the release^The owner checks reported outcomes and representative device behavior, stopping or adjusting the rollout when failures exceed its approved operational criteria."
]],
["AWS IoT SiteWise","calculate an equipment KPI from industrial measurements","https://docs.aws.amazon.com/iot-sitewise/latest/userguide/what-is-sitewise.html",[
"Industrial equipment source^Expose the permitted machine measurements^The plant supplies timestamped speed and production measurements through its approved industrial interface, keeping control commands separate from the telemetry path.",
"SiteWise edge ingestion^Map source readings to equipment properties^The configured supported gateway integration collects the selected measurements and maps them to the intended asset property aliases under plant network controls.",
"AWS IoT SiteWise asset model^Organize measurements and KPI definitions^The asset model defines the equipment properties and supported transformations or metrics, providing the industrial structure used to interpret the ingested readings.",
"Property ingestion and metric evaluation^Store readings and compute the configured KPI^The supported ingestion stores the asset-property values and the configured metric derives the selected production KPI over its specified time window.",
"Plant operations application^Read the permitted asset values^The authorized application queries the relevant measurements and KPI values, retaining timestamps so missing or delayed readings are visible to operators.",
"Production supervisor^Review the equipment KPI before intervention^The supervisor interprets the KPI alongside plant conditions and follows the site's approved maintenance or process-change procedure rather than treating a chart as a safety controller."
]],
["AWS IoT TwinMaker","show equipment data in an interactive plant scene","https://docs.aws.amazon.com/iot-twinmaker/latest/guide/what-is-twinmaker.html",[
"Plant model owner^Prepare equipment identities and scene assets^The owner supplies the approved visual assets and stable equipment identities needed to link the scene to actual plant information without exposing restricted geometry.",
"TwinMaker entity components^Configure the equipment data relationships^The workspace defines entities and supported components or connectors that associate equipment with its authorized external data sources.",
"AWS IoT TwinMaker scene^Bind visual equipment to its data context^The configured scene associates its equipment representations with the defined entities and data bindings; TwinMaker does not manufacture sensor readings from visual geometry.",
"Authorized scene application^Retrieve the supported entity data^The application loads the permitted scene and requests equipment information through the configured integrations, respecting source access and supported query behavior.",
"Equipment status overlay^Display returned readings and their timestamps^The viewer presents the data beside the matching equipment and distinguishes stale or unavailable values from a current normal operating state.",
"Maintenance technician^Use the scene to locate the affected asset^The technician identifies the equipment and reviews its source evidence before following the plant's approved inspection or repair process."
]],
["Amazon Kinesis Video Streams","retain camera footage for an authorized incident review","https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/what-is-kinesis-video.html",[
"Authorized site camera^Capture the permitted video feed^The camera records the approved area under the site's privacy policy and associates capture timestamps with the stream's stable camera identity.",
"Video producer integration^Upload timestamped video fragments^The configured supported producer sends video fragments to the selected stream using scoped credentials and handles connection interruptions according to its buffering design.",
"Amazon Kinesis Video Streams^Store the ingested fragments under retention settings^The selected stream receives and retains the supported video fragments according to its configured storage and access controls; retention must match the site's evidence requirements.",
"Incident review backend^Request the permitted recording interval^The application validates the reviewer's authorization and requests the supported playback or retrieval path for the camera and time range associated with the incident.",
"Authorized video player^Play the retrieved incident footage^The player presents the returned recording with camera and time context, handling gaps and unavailable fragments rather than assuming continuous coverage.",
"Incident reviewer^Record findings from the actual footage^The reviewer checks the video evidence and records the relevant findings under restricted access and retention rules, keeping investigative decisions outside the streaming service."
]],
["Amazon MQ","buffer order messages for a legacy fulfillment consumer","https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/welcome.html",[
"Order publication backend^Prepare a durable fulfillment message^After recording the accepted order, the producer builds a message with a stable order identity and handles the boundary between its database commit and broker publication.",
"Amazon MQ broker^Accept the supported protocol publication^The configured ActiveMQ or RabbitMQ broker accepts the authorized message under its selected durability and queue settings, retaining the configured backlog for consumers.",
"Legacy fulfillment consumer^Receive a message from the configured queue^The consumer uses the selected broker's supported protocol and acknowledgment model, treating redelivery as possible instead of assuming exactly-once execution.",
"Fulfillment transaction^Record the order action idempotently^The application checks the stable order identity and commits the intended fulfillment state before signaling that the message was processed successfully.",
"Consumer acknowledgment^Confirm processing through the broker protocol^The consumer acknowledges only after its durable business operation succeeds; failed work remains eligible for the configured retry or dead-letter behavior.",
"Fulfillment exception owner^Investigate repeatedly failing messages^The operator reviews the configured failure queue or broker evidence, fixes the cause and deliberately replays eligible orders without duplicating completed fulfillment actions."
]],
["Amazon MWAA","orchestrate a daily warehouse refresh with Airflow","https://docs.aws.amazon.com/mwaa/latest/userguide/what-is-mwaa.html",[
"Data pipeline author^Publish the versioned Airflow DAG^The author deploys the approved DAG and supported dependencies to the configured environment, defining real task dependencies and retry behavior for the daily warehouse refresh.",
"Amazon MWAA scheduler^Create the scheduled DAG run^The managed Airflow environment schedules the selected DAG and manages task execution according to its configuration; the scheduler does not perform every transformation itself.",
"Extraction task^Produce the identified source-data batch^The task invokes the permitted source extraction and records the batch identity, making retries safe and distinguishing a completed extract from an empty or partial delivery.",
"Transformation task^Run and await the external data job^The task starts the approved Glue or other configured processing job and checks its completion, passing the accepted output identity to the downstream load task.",
"Warehouse load task^Load and reconcile the accepted output^The authorized task loads the validated batch and verifies counts and duplicate handling before marking the warehouse refresh complete.",
"Airflow run review^Inspect failed tasks and replay safely^The data owner checks task evidence and corrects failures before rerunning the relevant dependency path, preserving batch identity so a retry does not duplicate warehouse records."
]],
["AWS Elemental MediaConvert","prepare multiple playback renditions of an uploaded lesson","https://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html",[
"Lesson upload application^Store the approved source video^The uploader writes the accepted source video to a protected S3 location and records its lesson revision before a conversion job is submitted.",
"Conversion job submitter^Choose the approved output preset^The backend selects supported codecs, rendition settings and output destinations and supplies the scoped role needed to read the source and write the generated assets.",
"AWS Elemental MediaConvert^Transcode the video into the selected renditions^The job decodes the source and creates the configured output encodings and packaging artifacts, reporting actual completion or failure for the submitted job.",
"Amazon S3 playback artifacts^Retain the completed rendition set^The destination stores the generated media and manifests under the lesson revision, keeping incomplete or failed outputs out of the accepted publication path.",
"Media publication gate^Validate playback and approve the lesson version^The workflow checks job outcome and representative playback before publishing the accepted manifest through the configured restricted-origin delivery setup.",
"Learner video player^Request the supported playback rendition^The player retrieves the published media through the site's delivery path and selects supported renditions according to playback conditions, while course access remains separately authorized."
]]
]);
