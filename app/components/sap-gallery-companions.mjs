export function sapGalleryCompanion(moduleId,lesson){
 if(lesson?.moduleId!==moduleId||lesson.status!=="qa-passed"||!lesson.asset)return undefined;
 if(moduleId==="19"&&lesson.id==="sap-19-008")return {label:"Review Amazon Bedrock AgentCore basics in AIP",href:"/courses/aws-generative-ai-developer-professional/visual/module-03?slide=20"};
 if(moduleId==="02"&&lesson.id==="sap-02-014")return {label:"Review the difference between metrics, logs and traces",href:"/courses/aws-solutions-architect-professional/visual/module-22?lesson=sap-22-002#visual-lessons"};
 return undefined;
}
