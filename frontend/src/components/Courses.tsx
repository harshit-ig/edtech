import { getFeaturedCourses, getCourseIcon } from "../data/courses";
import { Link } from "react-router-dom";
import MicrosoftBadge from "./MicrosoftBadge";

export default function CoursesSection() {
  const featuredCourses = getFeaturedCourses();

  return (
    <section  id="featured-programs" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-10">
          <div className="badge-hero mx-auto w-max"><span>🚀</span><span>MOST POPULAR COURSES</span></div>
          
          {/* Microsoft Partnership Badge */}
          <div className="mt-6 mb-6 flex justify-center">
            <MicrosoftBadge size="md" />
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold">Featured <span className="text-edtech-orange font-extrabold">Programs</span></h2>
          <p className="mt-2 text-white/70 max-w-2xl mx-auto">Transform your career with our industry‑leading certification programs designed by experts for real‑world success</p>
        </div>

        {/* Grid layout for featured courses only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {featuredCourses.map((c, idx) => (
            <article key={`${c.id}-${idx}`} className="course-card p-4 flex flex-col relative reveal" data-accent={c.accent.replace('edtech-','')} style={{ animationDelay: `${idx * 150}ms` }}> 
              <div className="course-head">
                <span className="cat-pill">{c.category}</span>
                <div className="course-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={getCourseIcon(c)}/>
                  </svg>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="course-title mt-2 text-[18px] font-semibold leading-snug line-clamp-2">{c.title}</h3>
                <p className="mt-2 text-[13px] text-white/70 line-clamp-2">{c.desc}</p>
              </div>

              <div className="mt-4 flex items-center gap-3 text-[12px] text-white/70">
                <span className="chip"><span className="meta-dot"/> {c.duration}</span>
                <span className="chip"><span className="meta-dot"/> {c.extra}</span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Link to={`/course/${c.id}`} className="cta cta-secondary">View Details</Link>
                <a className="cta course-card-apply" href="#get-started">Apply Now</a>
              </div>
                <span className="corner-badge">{c.badge}</span>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/courses" className="cta cta-secondary hover:text-edtech-orange">View All Courses</Link>
        </div>
      </div>
    </section>
  );
}

