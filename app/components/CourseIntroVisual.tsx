import './CourseIntroVisual.css';

type IntroCourse = 'saa' | 'dva';

const intros = {
 saa: {
  title: 'Turn requirements into AWS architecture choices.',
  image: '/course-visuals/saa-c03/course-intro-v1.webp',
  alt: 'SAA-C03: design secure, resilient, high-performing and cost-optimized AWS architectures.',
  start: '/courses/aws-solutions-architect-associate/visual/module-00',
  module: '00',
 },
 dva: {
  title: 'Build, secure, ship, and debug applications on AWS.',
  image: '/course-visuals/dva-c03/course-intro-v1.webp',
  alt: 'DVA-C03 learning path: develop with AWS, secure applications, test and deploy, troubleshoot and optimize.',
  start: '/courses/aws-developer-associate/visual/module-01',
  module: '01',
 },
} as const;

export default function CourseIntroVisual({course}: {course: IntroCourse}) {
 const intro=intros[course];
 return <section id="course-intro" className="course-opening-visual" aria-labelledby="course-intro-heading">
  <div className="course-opening-header">
   <div><h2 id="course-intro-heading">Course introduction</h2><p>{intro.title}</p></div>
   <a href={intro.start}>Start Module {intro.module} <span aria-hidden="true">→</span></a>
  </div>
  <img src={intro.image} width={2048} height={1152} alt={intro.alt}/>
 </section>;
}
