import { courses } from "../data/courses";

// Memoized SVG icons to prevent re-rendering
const ICONS = {
  'data-analytics': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V7m5 12V4m5 15V9m5 10V12"/>
    </svg>
  ),
  'gen-ai': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.4 4.9L20 9l-4 3.9.9 5.6L12 16.8 7.1 18.5 8 13 4 9l5.6-1.1L12 3z"/>
    </svg>
  ),
  'ai-engineering': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M8 7v10m8-10v10M4 17h16"/>
    </svg>
  ),
  'ai-kids': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="7" r="3"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/>
    </svg>
  ),
  'default': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18"/>
    </svg>
  )
};

export default function CoursesSection() {
  return (
    <section  id="featured-programs" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-10">
          <div className="badge-hero mx-auto w-max"><span>🚀</span><span>MOST POPULAR COURSES</span></div>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold">Featured Programs</h2>
          <p className="mt-2 text-white/70 max-w-2xl mx-auto">Transform your career with our industry‑leading certification programs designed by experts for real‑world success</p>
        </div>

        {/* Grid layout instead of marquee */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {courses.map((c, idx) => (
            <article key={`${c.id}-${idx}`} className="course-card p-4 flex flex-col relative" data-accent={c.accent.replace('edtech-','')}> 
              <div className="course-head">
                <span className="cat-pill">{c.category}</span>
                <div className="course-icon">
                  {ICONS[c.id as keyof typeof ICONS] || ICONS.default}
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
                <a className="cta cta-secondary" href="#">View Details</a>
                <a className="cta course-card-apply" href="#">Apply Now</a>
              </div>
                <span className="corner-badge">{c.badge}</span>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#" className="cta cta-secondary hover:text-edtech-orange">View All Courses</a>
        </div>
      </div>
    </section>
  );
}

