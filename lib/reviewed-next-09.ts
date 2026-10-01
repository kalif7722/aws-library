import {batch} from "./reviewed-next-builders";
export const reviewedNext09=batch([
["Amazon SageMaker AI","train and serve an approved demand forecasting model","https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html",[
"Forecast dataset owner^Publish validated demand history^The owner prepares time-aligned sales and inventory features with a held-out evaluation period, excluding future information that would make test results misleading.",
"SageMaker training job^Fit the selected forecasting model^The versioned training job reads the approved inputs under a scoped role and writes model artifacts and training evidence to the configured protected destination.",
"Forecast evaluation job^Compare against the accepted baseline^The evaluation checks held-out forecast error and relevant business segments before a model is accepted for deployment; training completion alone does not establish useful predictions.",
"Approved SageMaker endpoint^Host the accepted inference artifact^The deployment creates or updates the configured endpoint with the approved model and capacity settings, verifying readiness before application traffic uses it.",
"Inventory planning backend^Request forecasts for allowed products^The application constructs validated inference features and invokes the endpoint, checking errors and output shape before using a forecast in planning.",
"Inventory planner^Review the forecast before ordering stock^The planner compares model recommendations with known promotions and constraints before approving inventory actions, retaining the model version used for the forecast."
]],
["Amazon SageMaker Processing","prepare reproducible features before model training","https://docs.aws.amazon.com/sagemaker/latest/dg/processing-job.html",[
"Raw training dataset^Publish the approved input snapshot^The dataset owner stores a versioned input snapshot with its schema and training eligibility rules so preprocessing can be reproduced without changing source files.",
"Processing job definition^Select the container, script and resources^The pipeline supplies the versioned processing implementation, S3 inputs, output locations and scoped execution role for the specific feature-preparation task.",
"Amazon SageMaker Processing^Execute the feature transformation job^The configured processing compute runs the script to normalize fields, encode approved features and split data according to the authored preparation rules.",
"Processed feature artifacts^Store training and evaluation outputs^The job writes the configured output datasets and transformation metadata, keeping evaluation records separate from training inputs to prevent leakage.",
"Feature validation gate^Check schema, leakage and dataset counts^The pipeline checks required feature types and split identities and rejects incomplete or invalid artifacts before the downstream training job can use them.",
"Model training consumer^Read the accepted feature version^The training stage consumes only validated processing outputs and records their identity with the model artifact so later failures can be traced to the feature preparation."
]],
["Amazon SageMaker Clarify","review model bias and feature influence before approval","https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-configure-processing-jobs.html",[
"Model evaluation owner^Define the relevant assessment questions^The owner selects the approved dataset, model, facet definitions and supported metrics for the model's actual use, rather than assuming a universal fairness threshold.",
"Clarify processing configuration^Specify the assessment inputs^The job configuration identifies the supported bias or explainability analysis, labels and model inference setup needed for the chosen assessment.",
"Amazon SageMaker Clarify^Compute the configured assessment evidence^The processing job evaluates the selected bias metrics or feature-attribution analysis and produces reports for the specified data and configuration.",
"Assessment artifact store^Retain reports with model and dataset identity^The pipeline stores the generated reports alongside the evaluated model version and dataset references so reviewers know the scope of each finding.",
"Model risk reviewer^Interpret findings and limitations^The reviewer examines material disparities or influential features in their business context and decides whether more data, model changes or usage restrictions are required.",
"Model approval gate^Record the reviewed deployment decision^The owner records acceptance or required remediation with the assessment evidence; a completed Clarify job does not automatically certify a model as fair or safe."
]],
["Amazon SageMaker Ground Truth","label product images with a reviewed workforce","https://docs.aws.amazon.com/sagemaker/latest/dg/sms.html",[
"Image dataset curator^Prepare the permitted labeling manifest^The curator selects approved product images and writes the supported input manifest, excluding data the selected workforce must not access.",
"Labeling task configuration^Define instructions and workforce access^The owner configures the supported task type, clear label definitions and appropriate workforce, with source access limited to the images needed for each task.",
"Amazon SageMaker Ground Truth^Coordinate the configured labeling job^The job distributes tasks to the chosen workforce and applies its configured annotation-consolidation behavior to the returned labels.",
"Labeled output manifest^Retain the annotations and source references^The completed job writes the supported labeling output that associates annotations with original images and the task identity used to create them.",
"Label quality reviewer^Inspect ambiguous classes and sampled labels^The reviewer checks representative annotations against the instructions, resolving ambiguous classes and correcting systematic mistakes before training.",
"Training dataset publisher^Release the accepted labeled dataset^The curator publishes the reviewed labels under a stable version and records their quality checks so model evaluation can distinguish labeling issues from model errors."
]],
["Amazon SageMaker Model Registry","promote an evaluated model through an approval gate","https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry.html",[
"Model training pipeline^Produce the candidate artifact and metrics^The pipeline stores the trained model with evaluation evidence, container identity and input lineage so reviewers can assess the candidate that would actually be deployed.",
"Amazon SageMaker Model Registry^Register the versioned model package^The registry records the supported model-package version and its supplied metadata and approval status within the selected model group.",
"Model approval reviewer^Assess evaluation and deployment requirements^The reviewer checks the candidate's evidence, intended use and release constraints before updating its approval status through the authorized workflow.",
"Release pipeline approval check^Select only an approved model package^The deployment automation reads the package's current approval state and verifies required release conditions instead of deploying every newly registered artifact.",
"SageMaker endpoint deployment^Serve the accepted model version^The release process creates or updates the intended endpoint using the selected package and verifies readiness and representative inference responses.",
"Inference application acceptance^Verify behavior and retain rollback identity^The application owner checks real input contracts and acceptance results and records the previous deployable version before accepting the model release."
]],
["Amazon SageMaker Model Monitor","investigate changing feature distributions after deployment","https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html",[
"Production inference endpoint^Capture eligible inference records^The configured supported endpoint captures selected request and response data to its protected destination under privacy controls without changing the model's inference result.",
"Baseline preparation job^Define the accepted feature distribution^The owner prepares baseline statistics and constraints from representative approved data, recording the schema and model context used to establish expected behavior.",
"Amazon SageMaker Model Monitor^Evaluate captured data on the configured schedule^The supported monitoring job compares the selected captured data with its baseline and emits analysis artifacts and configured metrics for detected constraint violations.",
"Drift review queue^Collect the relevant violation evidence^The workflow presents the violated constraints, time range and data references to the model owner, separating missing capture data from an actual distribution change.",
"Model owner investigation^Assess input changes and business impact^The owner examines changed features, upstream transformations and available quality evidence before deciding whether the deployed model requires remediation.",
"Controlled model remediation^Validate any data or model correction^The team tests a corrected input pipeline or replacement model before a separately approved deployment, avoiding automatic retraining merely because a drift check failed."
]],
["Amazon SageMaker Data Wrangler","prepare a reviewed feature transformation for training","https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html",[
"Feature analyst^Select the approved training data source^The analyst identifies the authorized dataset and intended prediction target within the configured Studio Classic Data Wrangler environment, retaining the source snapshot identity.",
"Data Wrangler import^Load the supported dataset into the flow^The configured data source supplies the selected records for exploration under the analyst's permitted access, with sampling understood before conclusions are drawn.",
"Amazon SageMaker Data Wrangler^Author feature cleaning and transformations^The analyst defines supported transformations and examines their effects on feature types, missing values and distributions rather than treating the preview as a production dataset.",
"Exported processing workflow^Run the accepted transformation on the dataset^For this Studio Classic flow, the supported processing-job export executes the reviewed preparation logic using the selected compute and input configuration and writes the resulting feature artifacts.",
"Feature quality gate^Validate the generated training inputs^The pipeline checks required schema, split identity and leakage risks against the full output before making the features available to model training.",
"Training pipeline^Consume the versioned prepared features^The trainer records the accepted transformation and dataset versions with the resulting model so an inference-time feature implementation can be kept consistent."
]],
["Amazon SageMaker JumpStart","evaluate a pretrained model before hosting it","https://docs.aws.amazon.com/sagemaker/latest/dg/studio-jumpstart.html",[
"Model selection owner^Review the candidate and its usage terms^The owner selects an available JumpStart model for the intended task and reviews its license, supported deployment configuration and resource requirements.",
"Amazon SageMaker JumpStart^Provide the selected model deployment resources^The supported JumpStart workflow supplies the chosen pretrained model and integration resources; the application's task suitability still requires its own evaluation.",
"Isolated evaluation deployment^Host the candidate in the approved environment^The team deploys the model with restricted access and supported compute settings, keeping evaluation traffic separate from production users.",
"Representative task evaluation^Test real inputs and acceptance criteria^The evaluation checks the candidate's outputs, latency and relevant failure cases using permitted task data rather than relying only on example prompts.",
"Application release reviewer^Approve the evaluated model and constraints^The owner records the selected version, usage restrictions and fallback behavior before the model is accepted for application use.",
"Production application integration^Invoke the approved hosted model^The backend submits validated inputs to the accepted endpoint and handles errors and output checks according to the evaluated application contract."
]],
["Amazon Personalize","recommend eligible products from reviewed interaction history","https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html",[
"Interaction data owner^Prepare permitted product and user events^The owner selects consented interaction history and consistent product identifiers, applying retention and access rules before recommendation training.",
"Personalize dataset import^Load the configured datasets^The application imports the supported datasets with the required schema and checks ingestion outcome and time coverage before starting the selected training workflow.",
"Amazon Personalize^Train the configured recommendation resource^The chosen supported recipe or recommender learns from the accepted interaction and item data; model training does not establish that every recommended item can be sold.",
"Recommendation request backend^Request suggestions for the permitted user context^The application invokes the configured recommendation resource using trusted user context and applicable supported filters, keeping user identities scoped to the application.",
"Product eligibility validator^Check inventory and business restrictions^The backend checks the returned item identifiers against current stock, catalog status and the user's eligibility before displaying recommendations.",
"Shopping recommendation panel^Display the accepted suggestions^The client shows eligible recommended products and records permitted interaction events for the configured feedback integration, while checkout enforces its own transactional rules."
]],
["Amazon Augmented AI","route uncertain document extraction to human reviewers","https://docs.aws.amazon.com/sagemaker/latest/dg/a2i.html",[
"Document extraction workflow^Produce candidate fields and confidence evidence^The application runs its supported extraction integration and associates the candidate values with the original permitted document and processing identity.",
"Human-review activation rule^Select records requiring inspection^The configured supported integration or application rule identifies uncertain or policy-sensitive results and starts the intended human loop under its approved workflow.",
"Amazon Augmented AI^Coordinate the configured human review task^The service presents the task through the selected supported review workflow and workforce, giving reviewers the context required by the authored task template.",
"Human reviewer^Correct and confirm the document fields^The reviewer examines the source document and resolves uncertain values according to the task instructions instead of merely accepting machine-generated fields.",
"Review result consumer^Read the completed human-loop output^The application retrieves the supported review output, checks completion and result schema, and associates the corrected values with their source record.",
"Validated document record^Publish the accepted reviewed values^The downstream workflow stores the accepted extraction and review identity before business use, while handling unresolved or failed reviews through its explicit exception path."
]]
]);
