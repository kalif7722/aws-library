import {batch} from "./reviewed-next-builders";
export const reviewedNext08=batch([
["Amazon Bedrock","answer a product-support question from approved documents","https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",[
"Support document owner^Prepare the approved knowledge source^The owner publishes current product instructions and removes restricted material from the selected source before synchronizing it with the configured knowledge base.",
"Knowledge base ingestion^Chunk and index the source documents^The configured ingestion prepares searchable representations in its supported vector store, retaining source references so retrieved passages can be traced to the approved documents.",
"Support application^Submit an authorized product question^The backend validates the caller and permitted product scope before invoking its selected retrieval and generation operation with the application's approved configuration.",
"Amazon Bedrock^Retrieve context and generate the support answer^The configured knowledge-base operation retrieves relevant passages and supplies them to the selected model for generation. The application treats the generated answer as fallible, even when references are returned.",
"Answer validation policy^Check references and escalation conditions^The application checks its required evidence and response constraints and escalates unsupported or sensitive questions instead of accepting every fluent answer as correct.",
"Support user response^Present the answer with source references^The client displays the permitted answer and its references, or the escalation outcome, so the user can distinguish documented instructions from an unresolved question."
]],
["Amazon Kendra","find employee policies through an authorized search application","https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html",[
"Policy document connector^Synchronize approved policy documents^The supported connector ingests current policy text, metadata and configured access-control information from the organization's approved source into the selected index.",
"Amazon Kendra index^Index policy content and access metadata^The index prepares the synchronized content for supported search operations, with access restrictions depending on correct source ACL ingestion and query identity configuration.",
"Employee search backend^Build the authenticated search request^The backend derives user and group context from its trusted identity integration and submits the search with the supported access-filter configuration.",
"Amazon Kendra query^Rank the permitted policy matches^Kendra evaluates the query and configured access context to return relevant eligible results; the application must not omit required user context or trust client-supplied group membership.",
"Search result renderer^Show excerpts and authorized source links^The application displays allowed excerpts and source references, retaining the identity boundary when users open documents from the original policy repository.",
"Policy access reviewer^Test restricted and public employee policies^The owner tests representative users and groups to confirm that restricted policy content is not exposed by search results or by their linked source documents."
]],
["Amazon Lex","collect appointment details before creating a booking","https://docs.aws.amazon.com/lexv2/latest/dg/what-is.html",[
"Appointment chat client^Send the user's booking request^The client sends the user's text or supported speech input to the configured bot session without treating an interpreted request as a confirmed appointment.",
"Amazon Lex^Recognize intent and collect required slots^The bot matches the booking intent and prompts for required date, location and appointment details according to its configured conversation model.",
"Validation Lambda hook^Check slot values against booking rules^The hook validates dates and allowed locations, asking for corrections when needed rather than accepting an unavailable or malformed appointment request.",
"Fulfillment booking backend^Reserve an available appointment atomically^After required confirmation, the backend checks current availability and writes the reservation using a stable request identity to avoid duplicate bookings.",
"Booking result response^Return the confirmed reservation or conflict^The fulfillment result supplies the actual reservation identifier or an actionable failure; intent recognition alone does not establish that capacity was reserved.",
"Appointment client^Show the accepted booking details^The client displays the backend-confirmed date and identifier or continues the conversation to resolve an availability conflict."
]],
["Amazon Polly","create a spoken version of an approved lesson","https://docs.aws.amazon.com/polly/latest/dg/what-is.html",[
"Lesson editor^Approve the narration text^The editor checks the lesson wording and pronunciation requirements before requesting audio, excluding private data and content that should not appear in the public lesson.",
"Narration application^Select a supported voice and speech settings^The application chooses the supported engine, language and voice combination and validates any SSML against the selected synthesis operation's constraints.",
"Amazon Polly^Synthesize the submitted lesson narration^Polly converts the approved text or SSML into speech using the selected voice settings; it does not verify the technical accuracy of the lesson content.",
"Audio output handler^Store the returned narration artifact^The application stores the returned audio, or retrieves the configured asynchronous task output, with its lesson version and synthesis settings.",
"Narration quality reviewer^Check pronunciation and completeness^The reviewer listens for incorrect pronunciation, missing sections and timing issues before approving the generated audio for learners.",
"Lesson media player^Serve the accepted narration^The course player retrieves the approved audio through its authorized delivery path and associates it with the matching lesson text and revision."
]],
["Amazon Transcribe","transcribe a recorded customer call for review","https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html",[
"Authorized call recorder^Store the permitted recording^The recording process follows the organization's consent and retention requirements and writes the supported audio file to the protected input bucket.",
"Transcription job submitter^Configure language and output controls^The application submits the recording with supported language, speaker or channel settings and any applicable redaction configuration under a scoped service role.",
"Amazon Transcribe^Convert the recording into timed transcript text^The service recognizes speech from the submitted audio and produces transcript information under the selected job settings; recognition can mishear names and low-quality speech.",
"Protected transcript output^Retain the job result and source identity^The application retrieves the completed transcript into its restricted review store and records the recording identity, job settings and completion state.",
"Call review analyst^Correct important recognition errors^The reviewer checks critical statements and identifiers against the recording before relying on the transcript for a customer action or quality decision.",
"Customer follow-up workflow^Use the accepted call notes^The case owner uses the reviewed transcript to prepare the required follow-up while applying separate access and retention controls to both audio and text."
]],
["Amazon Translate","prepare a translated support reply for agent approval","https://docs.aws.amazon.com/translate/latest/dg/what-is.html",[
"Support agent draft^Write the approved source-language reply^The agent prepares the response from the customer's actual case and removes information that must not be shared before requesting translation.",
"Translation request backend^Select language and terminology settings^The application sets the supported source and target languages and approved custom terminology where applicable, preserving the case identity outside the translated text.",
"Amazon Translate^Translate the submitted response text^The service produces target-language text under the selected settings; it does not determine whether the original advice is correct or appropriate for the customer's case.",
"Bilingual review queue^Inspect the translated wording^The reviewer checks product terms, instructions and tone, correcting mistranslations that could change the meaning of a customer action.",
"Agent approval^Accept the final customer response^The case owner approves the reviewed wording and confirms that the translated reply still matches the intended resolution and permitted disclosure.",
"Support delivery system^Send the accepted reply to the case^The authorized case application delivers the approved translated response and retains both language versions for the case's audit trail."
]],
["Amazon Textract","extract invoice fields before accounts-payable approval","https://docs.aws.amazon.com/textract/latest/dg/what-is.html",[
"Invoice intake^Store the received supplier invoice^The intake application validates the file type and records supplier and receipt identity in a protected S3 location before any extraction result can affect payment.",
"Expense-analysis job^Submit the supported invoice document^The backend starts the supported expense-analysis operation and records its job identity, using scoped access to the selected input and output resources.",
"Amazon Textract^Extract invoice fields and line-item information^The service returns recognized invoice information and confidence evidence from the submitted document; extracted totals and supplier names still require application validation.",
"Accounts-payable validator^Match supplier, totals and purchase order^The application compares recognized values with trusted supplier records and order data, flagging missing or inconsistent fields for human review.",
"Invoice review owner^Resolve low-confidence or unmatched values^The reviewer checks the original document and corrects extraction errors before approving the invoice's validated business record.",
"Approved payable record^Record the accepted invoice for payment scheduling^The application stores the approved invoice with its source reference and validation evidence; a separate authorized payment process controls any transfer of funds."
]],
["Amazon Rekognition","screen submitted product images before publication","https://docs.aws.amazon.com/rekognition/latest/dg/moderation.html",[
"Seller upload application^Store the candidate product image^The application validates file constraints and stores the candidate image in a restricted staging location without immediately making it publicly visible.",
"Image moderation job^Request the supported image analysis^The backend submits the selected image to the configured moderation operation and records the publication candidate identity for its returned result.",
"Amazon Rekognition^Return moderation labels and confidence^The service analyzes image content and returns supported moderation categories and confidence values; these values inform the site's policy rather than guaranteeing safe content.",
"Publication policy evaluator^Apply the site's moderation thresholds^The application checks the labels against its approved publication rules and sends ambiguous or prohibited candidates to a review queue.",
"Human image reviewer^Resolve policy-sensitive publication decisions^The reviewer inspects the original image and relevant policy context, correcting uncertain automated decisions before approving or rejecting publication.",
"Product image publisher^Expose only the accepted image version^The publication workflow promotes the approved image to the delivery location and retains the review outcome so rejected staging uploads remain unavailable to shoppers."
]],
["Amazon Comprehend","classify support feedback for analyst review","https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html",[
"Feedback intake^Collect permitted customer comments^The intake pipeline selects feedback eligible for analysis and applies the organization's privacy rules before passing text into the language-analysis workflow.",
"Analysis request builder^Choose the supported text operation^The application submits supported language and document sizes to the selected sentiment or entity operation while retaining customer-case identity in its own store.",
"Amazon Comprehend^Return language-analysis labels and scores^The service analyzes the supplied text and returns supported sentiment or entity evidence; sarcasm, context and domain terminology can produce incorrect interpretations.",
"Feedback enrichment store^Attach results to the original comments^The application stores the returned labels and confidence with the analysis version and source identity, preserving the original text for authorized review.",
"Support analyst^Review themes and uncertain classifications^The analyst examines representative comments and low-confidence results before interpreting a trend or escalating a specific customer issue.",
"Service improvement owner^Prioritize an evidence-backed change^The owner combines reviewed feedback with operational evidence to choose a product improvement rather than allowing sentiment scores alone to trigger customer actions."
]],
["Amazon Comprehend Medical","identify clinical text entities for clinician review","https://docs.aws.amazon.com/comprehend-medical/latest/dev/comprehendmedical-welcome.html",[
"Authorized clinical document intake^Select permitted clinical text^The healthcare application checks authorization and applicable data-handling requirements before selecting the supported clinical text for entity extraction.",
"Clinical extraction request^Submit text under the approved integration^The backend invokes the selected supported operation and records the document identity, avoiding unnecessary patient data in application diagnostics.",
"Amazon Comprehend Medical^Extract clinical entities and relationships^The service returns supported clinical entity information and confidence evidence from the text; extracted mentions are not diagnoses or treatment recommendations.",
"Clinical review workspace^Present results beside the source passage^The application links extracted entities to their source context and highlights uncertain findings so the reviewer can inspect negation and patient-specific meaning.",
"Qualified clinical reviewer^Confirm relevant entities and corrections^The clinician checks the original record and corrects extraction errors before accepting information into the approved documentation workflow.",
"Reviewed clinical record update^Store the accepted structured information^The authorized application saves only reviewed information with source and reviewer identity, preserving the clinical decision with the responsible professional."
]]
]);
