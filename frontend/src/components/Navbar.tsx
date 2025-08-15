import { useState } from "react";
import { Link } from "react-router-dom";
import WhiteLogo from "../assets/WHITE-LOGO--300x152.png";
import { courses } from "../data/courses";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  const displayedCourses = courses.slice(0, 4);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/10 bg-black/40 supports-backdrop-blur:bg-black/30 h-16">
      <div className="w-full px-6 h-full flex items-center justify-between">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-3 ml-6">
          <img src={WhiteLogo} alt="EdTech Informative" className="h-8 w-auto" />
          <span className="sr-only">EdTech Informative</span>
        </Link>
        
        {/* Navigation - Center */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <Link to="/" className="hover:text-edtech-orange transition-colors">Home</Link>
          
          {/* Courses Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setCoursesDropdownOpen(true)}
            onMouseLeave={() => setCoursesDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-edtech-orange transition-colors group">
              Courses
              <svg 
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {coursesDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80">
                {/* Invisible bridge to maintain hover */}
                <div className="h-2 w-full"></div>
                
                <div className="bg-bg-deep/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-6 animate-fadeIn">
                  <div className="mb-4">
                    <h3 className="text-white font-semibold text-base mb-1">Popular Courses</h3>
                    <p className="text-white/60 text-sm">Industry-leading certification programs</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {displayedCourses.map((course) => (
                      <div key={course.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 ${
                          course.accent === 'edtech-green' ? 'bg-gradient-to-br from-edtech-green to-green-400' : 
                          'bg-gradient-to-br from-edtech-orange to-orange-400'
                        }`}>
                          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-medium leading-tight line-clamp-2 mb-2 group-hover:text-edtech-orange transition-colors">
                            {course.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs">
                            <span className={`px-2 py-1 rounded-full text-black font-medium text-xs ${
                              course.badge === 'FEATURED' ? 'bg-red-500' :
                              course.badge === 'TRENDING' ? 'bg-edtech-green' :
                              course.badge === 'MOST POPULAR' ? 'bg-edtech-orange' : 'bg-blue-500'
                            }`}>
                              {course.badge}
                            </span>
                            <span className="text-white/60">{course.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <a 
                      href="/#featured-programs" 
                      className="flex items-center justify-between text-white/70 hover:text-edtech-orange transition-colors p-3 rounded-xl hover:bg-white/5 group"
                    >
                      <div>
                        <div className="font-medium">Explore All Courses</div>
                        <div className="text-sm text-white/50">View our complete course catalog</div>
                      </div>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <a href="/pricing" className="hover:text-edtech-orange transition-colors">Pricing</a>
          <a href="/about" className="hover:text-edtech-orange transition-colors">About</a>
          <Link to="/contact" className="hover:text-edtech-orange transition-colors">Contact Us</Link>
        </div>
        
        {/* CTA Button - Right */}
        <div className="hidden md:block">
          <a href="/#get-started" className="group relative inline-flex items-center gap-2 cta-flow text-black px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform duration-200">
            <span className="relative z-10 font-semibold">Book FREE Strategy Call</span>
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <button
          aria-label="Menu"
          className={`md:hidden ml-3 p-2 rounded-lg border transition-colors ${mobileOpen ? 'bg-edtech-orange text-black border-edtech-orange' : 'border-white/20 text-white/80 hover:text-white'}`}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden absolute inset-x-0 top-full bg-black/85 backdrop-blur border-b border-white/10 animate-slideDown">
          <div className="px-6 py-4 flex flex-col gap-3 text-sm">
            <Link to="/" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">Home</Link>
            <a href="/#featured-programs" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">All Courses</a>
            <a href="/pricing" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">Pricing</a>
            <a href="/about" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">About</a>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">Contact Us</Link>
            <a href="/#get-started" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium w-full mt-2">
              Book FREE Strategy Call
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

