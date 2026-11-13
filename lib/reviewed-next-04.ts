import {batch} from "./reviewed-next-builders";
export const reviewedNext04=batch([
["AWS CodeCommit","release an application from an existing approved repository","https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html",[
"Application developer^Create the reviewed source change^The developer submits the application change to an existing supported CodeCommit repository under the organization's approved source-control identity.",
"AWS CodeCommit^Retain commits and pull-request evidence^The repository stores the selected revision and review history with its access controls; storing code does not authorize production deployment.",
"Code review owner^Approve the intended release revision^The reviewer checks the source change and required status evidence before the exact commit becomes eligible for the release pipeline.",
"CodePipeline source action^Retrieve the approved commit^The configured pipeline retrieves the intended repository revision using its scoped source permissions and records the artifact identity.",
"CodeBuild release tests^Build and validate the artifact^The build job tests the selected revision and publishes an immutable release artifact, keeping build credentials separate from runtime permissions.",
"Application release owner^Deploy and verify the accepted artifact^The approved release deploys the tested artifact and verifies application health with rollback available; repository approval alone is insufficient readiness evidence."
]],
["AWS CodeConnections","build a release from an external Git repository","https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html",[
"External source repository^Record the proposed application revision^The developer commits the release change to the selected external Git provider and follows that repository's branch and review controls.",
"Provider connection owner^Authorize the selected repository integration^The owner configures the supported provider connection with the permitted installation and repository scope rather than broad unrelated repository access.",
"AWS CodeConnections^Supply the configured source integration^The supported connection lets the AWS source action access the selected provider repository under its configured authorization; it does not review the application's code.",
"CodePipeline source artifact^Retrieve the selected release revision^The source action retrieves the intended commit and produces the pipeline artifact, recording which revision is being built.",
"CodeBuild test job^Validate the source artifact^The job builds and tests the exact artifact before release, using its scoped package and artifact permissions.",
"Release approval and deployment^Accept only the tested revision^The release owner approves the resulting artifact and verifies the deployed endpoint, keeping external repository connectivity separate from deployment authorization."
]],
["AWS Device Farm","test a mobile checkout journey on real devices","https://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html",[
"Mobile application build^Produce the candidate app and test package^The build pipeline creates the selected mobile binary and automated checkout tests with their source and version identity.",
"Device test configuration^Choose supported devices and test settings^The tester selects the device pool and compatible test configuration, restricting test credentials and the backend environment to approved nonproduction access.",
"AWS Device Farm^Execute the submitted device test run^Device Farm runs the accepted application and test package on the selected supported devices and records run evidence; it does not fix application defects.",
"Test screenshots and logs^Retain checkout failure evidence^The run artifacts capture the selected test results and device observations with sensitive test data restricted to the authorized team.",
"Mobile defect triage^Reproduce and repair the failing interaction^The developer reviews the failing checkout step and device-specific evidence before changing the application or test configuration.",
"Replacement device run^Verify the repaired candidate^The team reruns the relevant device coverage and accepts the candidate only after the checkout outcome and required test assertions pass."
]],
["Amazon EC2 Image Builder","publish a tested application-server image","https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html",[
"Image recipe owner^Select base image and component versions^The platform team pins the approved base image and build components for the application server, including required software and hardening settings.",
"Build infrastructure configuration^Scope instance, network and role access^The build environment uses the selected instance profile, network and supported configuration to fetch dependencies without unrestricted production access.",
"Amazon EC2 Image Builder^Build the recipe's server image^Image Builder executes the configured image pipeline and components to create the candidate image under its defined build process.",
"Image test components^Validate software and security requirements^The configured tests verify required packages, configuration and application readiness, reporting failures rather than distributing an untested build.",
"Image distribution configuration^Publish the accepted AMI^The successful pipeline distributes the selected image to approved accounts and Regions under its supported permissions and encryption configuration.",
"Application launch-template update^Roll out and health-check the image^The owner updates a reviewed template version and verifies replacement instances before accepting the fleet rollout, retaining the prior image for rollback."
]],
["AWS Serverless Application Repository","deploy a reviewed reusable event processor","https://docs.aws.amazon.com/serverlessrepo/latest/devguide/what-is-serverlessrepo.html",[
"Application platform owner^Select the intended published application^The owner identifies a trusted reusable application and its exact version rather than deploying a similarly named package without review.",
"Template and permissions review^Inspect resources and required capabilities^The reviewer examines the application's template, parameters and IAM effects before granting the supported deployment capabilities.",
"AWS Serverless Application Repository^Create the selected deployment change set^The repository supplies the supported deployment workflow for the chosen application version; availability in the repository does not guarantee suitability or trust.",
"AWS CloudFormation approval^Apply the reviewed application resources^The owner reviews and executes the intended change set under the scoped deployment role and target environment.",
"Event processor test input^Exercise the accepted event contract^The tester sends a permitted event and verifies the processor's actual input, durable output and required failure behavior.",
"Reusable application release record^Track version and operating ownership^The owner records the deployed version and protection responsibilities so future updates receive the same template and workload validation."
]],
["AWS Copilot","deploy a container web service with a worker queue","https://aws.github.io/copilot-cli/",[
"Application manifest source^Define web and worker responsibilities^The developer defines the supported service and worker manifests with the application's image, environment and dependency requirements.",
"Container build artifact^Publish the intended immutable image^The build job creates the tested container image and records its digest before deployment, avoiding an ambiguous mutable tag as release evidence.",
"AWS Copilot^Generate and deploy the configured environment^Copilot uses the reviewed manifests and deployment permissions to provision its supported application resources; the CLI does not execute the application's business logic.",
"Load-balanced web service^Accept and validate customer requests^The deployed web service authenticates callers and validates the business request before publishing permitted work to the configured queue.",
"Queue-backed container worker^Persist the completed job output^The worker consumes the job with stable identity and stores its result before acknowledging completion, handling retries without duplicate business effects.",
"Release smoke-test owner^Verify both request and worker outcomes^The owner tests the public service route and durable worker result before accepting the environment update and its operating handover."
]],
["AWS Amplify","publish a frontend that calls an authenticated backend","https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html",[
"Frontend source revision^Submit the reviewed website change^The developer records the approved frontend source and build settings for the intended branch and deployment environment.",
"Amplify build configuration^Scope build inputs and backend endpoints^The owner supplies the required build commands and environment configuration without placing private backend credentials in client-side code.",
"AWS Amplify^Build and publish the frontend release^The configured hosting workflow builds and publishes the accepted static application release with its selected routing and domain settings.",
"Signed-in browser client^Call the intended authenticated API^The browser authenticates through the configured application identity flow and sends the appropriate token to the separate backend endpoint.",
"Business API backend^Authorize and perform the requested operation^The backend verifies trusted identity and ownership before accessing data; frontend hosting does not grant the user database access.",
"Frontend release acceptance^Verify asset and authenticated request behavior^The team checks the published route, cache behavior and permitted API operation before accepting the release, with the previous frontend version retained for rollback."
]],
["AWS App2Container","containerize an existing internal web application","https://docs.aws.amazon.com/app2container/latest/UserGuide/what-is-a2c.html",[
"Existing application server^Identify the intended running application^The migration owner identifies the supported web application and its configuration, dependencies and persistent data before container analysis.",
"AWS App2Container^Analyze and package supported application components^The tool inspects the selected supported application and generates containerization artifacts; external databases and business data still require separate migration planning.",
"Container artifact review^Check runtime configuration and secrets^The team reviews generated image and deployment definitions and removes inappropriate embedded secrets or host-specific assumptions before publishing the image.",
"Amazon ECR candidate image^Store the tested container artifact^The selected repository retains the reviewed image digest under the release permissions and required image assessment configuration.",
"Container application test environment^Validate the application's real dependencies^The team deploys the candidate to the selected runtime and tests authenticated requests, database access and file persistence against the migration requirements.",
"Reviewed application cutover^Move traffic after acceptance^The owner cuts over the approved client route after testing and retains the documented rollback path rather than treating container packaging as completed migration."
]],
["AWS Application Discovery Service","inventory servers before planning a migration wave","https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html",[
"Data-center application owner^Identify the approved discovery scope^The owner selects the permitted servers and migration assessment question, protecting sensitive host and network information during collection.",
"Discovery collection setup^Install or configure the supported collector^The team configures the appropriate supported collection method and required access without assuming every application dependency is automatically discoverable.",
"AWS Application Discovery Service^Collect supported server and dependency observations^The service collects its available server and usage evidence for the approved scope; inventory data is not an executed migration or complete business dependency map.",
"Migration inventory review^Correlate discovered servers with application ownership^The migration team verifies names, utilization and observed relationships against configuration records and interviews with application owners.",
"Migration wave design^Group dependencies and define target constraints^The owner identifies coordinated cutover dependencies, data requirements and candidate target sizing using the accepted evidence.",
"Wave readiness assessment^Validate the planned scope with stakeholders^The team confirms the migration wave and unresolved discovery gaps before scheduling transfer, with recovery and rollback planned separately."
]],
["AWS Application Migration Service","rehost an application server with a verified cutover","https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html",[
"Source application server^Prepare supported replication prerequisites^The migration owner checks server support, disk scope and required agent connectivity, recording the application's database and external dependencies separately.",
"Replication staging resources^Receive the selected source blocks^The configured staging environment receives replicated disk data under the selected network and encryption setup; replication does not authenticate the application.",
"AWS Application Migration Service^Launch a test instance from replication^MGN uses the configured launch settings to create the supported test server while source synchronization continues under the migration plan.",
"Application migration test^Verify software, data and private dependencies^The owner validates the test instance's business operations and required network paths before approving a production cutover.",
"Approved cutover window^Quiesce writes and launch the final target^The team follows the reviewed write-pause and final synchronization procedure, then launches the intended cutover server and switches the client route separately.",
"Post-cutover acceptance^Verify business requests and rollback readiness^The owner confirms accepted application behavior and data consistency before finalizing migration and retiring source access under the documented recovery procedure."
]]
]);
