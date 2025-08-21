import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingDots from "../FloatingDots";
import { getAllCourses, getCourseIcon } from "../data/courses";
import MicrosoftBadge from "../components/MicrosoftBadge";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Use centralized course data
  const allCourses = getAllCourses();
  
  // Memoize categories to avoid recalculation
  const categories = useMemo(() => 
    ['ALL', ...Array.from(new Set(allCourses.map(c => c.category)))], 
    [allCourses]
  );
  
  // Memoize filtered courses to optimize rendering
  const filteredCourses = useMemo(() => 
    allCourses.filter(course => {
      const matchesCategory = selectedCategory === 'ALL' || course.category === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }), 
    [allCourses, selectedCategory, searchTerm]
  );

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

            {/* Microsoft Partnership Badge */}
            <div className="mb-6 flex justify-center">
              <MicrosoftBadge size="lg" />
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={getCourseIcon(course)}/>
                      </svg>
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
