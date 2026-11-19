import type {Metadata} from "next";
import {Suspense} from "react";
import CourseDirectory from "../components/PortalCourseDirectory";
export const metadata:Metadata={title:"Certification courses",description:"Browse certification study paths across AWS, Azure and Google Cloud."};
export default function CoursesPage(){return <main className="portal-page"><Suspense fallback={<p>Loading courses…</p>}><CourseDirectory/></Suspense></main>;}
