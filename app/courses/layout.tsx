import CoursePresentation from '../components/CoursePresentation';
import UniformCourseNav from '../components/UniformCourseNav';
export default function CoursesLayout({children}:{children:React.ReactNode}) {
 return <><UniformCourseNav/><CoursePresentation>{children}</CoursePresentation></>;
}
