import AzureCertificationCourse from "../../components/AzureCertificationCourse";
import { azureCourseByCode } from "../../azure-course-data";

export default function Course() {
  return <AzureCertificationCourse course={azureCourseByCode["AZ-305"]} />;
}

