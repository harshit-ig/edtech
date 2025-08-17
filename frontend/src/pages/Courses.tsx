import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingDots from "../FloatingDots";
import { courses } from "../data/courses";
import microsoftDarkLogo from "../assets/in-partnership-with-microsoft-for-dark.png";

// Extended course data for the courses page
const allCourses = [
  ...courses,
  {
    id: 'web-development',
    category: 'WEB DEVELOPMENT',
    badge: 'NEW',
    title: 'Full Stack Web Development Bootcamp',
    desc: 'Learn modern web development with React, Node.js, and cloud deployment. Build real-world applications.',
    duration: '5 Months',
    extra: '15+ Projects',
    accent: 'edtech-green' as const,
  },
  {
    id: 'mobile-development',
    category: 'MOBILE DEVELOPMENT',
    badge: 'POPULAR',
    title: 'React Native Mobile App Development',
    desc: 'Create cross-platform mobile applications with React Native and modern development practices.',
    duration: '4 Months',
    extra: '10+ Apps',
    accent: 'edtech-orange' as const,
  },
  {
    id: 'cloud-computing',
    category: 'CLOUD COMPUTING',
    badge: 'HOT',
    title: 'AWS Cloud Architect Certification',
    desc: 'Master cloud architecture and deployment with AWS services. Prepare for industry certifications.',
    duration: '3 Months',
    extra: 'AWS Certified',
    accent: 'edtech-green' as const,
  },
  {
    id: 'cybersecurity',
    category: 'CYBERSECURITY',
    badge: 'FEATURED',
    title: 'Ethical Hacking & Cybersecurity',
    desc: 'Learn cybersecurity fundamentals, penetration testing, and ethical hacking methodologies.',
    duration: '6 Months',
    extra: '20+ Labs',
    accent: 'edtech-orange' as const,
  },
];

// Memoized SVG icons
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
  'agentic-ai': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M8 7v10m8-10v10M4 17h16"/>
    </svg>
  ),
  'web-development': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
    </svg>
  ),
  'mobile-development': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <path d="m12 18h.01"/>
    </svg>
  ),
  'cloud-computing': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  ),
  'cybersecurity': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  'default': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18"/>
    </svg>
  )
};

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['ALL', ...Array.from(new Set(allCourses.map(c => c.category)))];
  
  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = selectedCategory === 'ALL' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Background dots */}
      <div className="fixed inset-0 -z-10">
        <FloatingDots numDots={60} className="mix-blend-screen opacity-50" />
      </div>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="badge-hero mx-auto w-max mb-6">
              <span>🎓</span><span>ALL COURSES</span>
            </div>

            {/* Microsoft Partnership Logo */}
            <div className="mb-6 flex justify-center">
              <img 
                src={microsoftDarkLogo} 
                alt="In Partnership with Microsoft" 
                className="h-16 md:h-20 lg:h-24 opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Explore Our <span className="text-glow-green">Complete</span> Course Catalog
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto mb-12">
              Choose from our comprehensive collection of industry-leading courses designed to accelerate your career growth
            </p>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col gap-4 mb-8">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:border-edtech-green/50 focus:bg-black/40 transition-all min-w-0"
                  />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-edtech-green text-black'
                          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {category.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                {selectedCategory !== 'ALL' && ` in ${selectedCategory}`}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, idx) => (
                <article 
                  key={`${course.id}-${idx}`} 
                  className="course-card p-4 flex flex-col relative hover:transform hover:scale-105 transition-all duration-300" 
                  data-accent={course.accent.replace('edtech-','')}
                > 
                  <div className="course-head">
                    <span className="cat-pill">{course.category}</span>
                    <div className="course-icon">
                      {ICONS[course.id as keyof typeof ICONS] || ICONS.default}
                    </div>
                  </div>

                  <div className="mt-4 flex-1">
                    <h3 className="course-title mt-2 text-[18px] font-semibold leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-white/70 line-clamp-3">
                      {course.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-[12px] text-white/70">
                    <span className="chip">
                      <span className="meta-dot"/> {course.duration}
                    </span>
                    <span className="chip">
                      <span className="meta-dot"/> {course.extra}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Link 
                      to={`/course/${course.id}`} 
                      className="cta cta-secondary flex-1 text-center"
                    >
                      View Details
                    </Link>
                    <a className="cta cta-primary" href="#get-started">
                      Apply Now
                    </a>
                  </div>
                  
                  <span className="corner-badge">{course.badge}</span>
                </article>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-white/70">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Join thousands of successful students who have transformed their careers with our programs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#get-started" className="cta cta-primary">
                  Book FREE Strategy Call
                </a>
                <Link to="/contact" className="cta cta-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
