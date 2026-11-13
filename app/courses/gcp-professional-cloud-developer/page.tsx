import GcpCertificationCourse from "../../components/GcpCertificationCourse";
import { gcpCourseByCode } from "../../gcp-course-data";

export default function Course() {
  return <GcpCertificationCourse course={gcpCourseByCode.PCD} />;
}
