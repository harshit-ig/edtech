// import FloatingDots from "../FloatingDots";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WhiteLogo from "../assets/WHITE-LOGO--300x152.png";
import { getCoursesData } from "../utils/dataAdapter";
import type { Course } from "../types";

export default function Footer() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCoursesData();
        setCourses(data);
      } catch (error) {
        console.error('Error loading courses:', error);
        setCourses([]);
      } finally {
        // Courses loading complete
      }
    };

    loadCourses();
  }, []);

  // Get first 4 courses for footer display
  const footerCourses = courses.slice(0, 4);

  // Helper function to convert text to title case
  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <footer id="contact" className="py-20 border-t border-white/10 relative overflow-hidden">
      {/* <FloatingDots numDots={80} className="opacity-75 -z-10" /> */}
      <div className="mx-auto max-w-7xl px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <img src={WhiteLogo} alt="EdTech Informative" className="h-10 w-auto mb-4" />
            <p className="text-white/80 text-lg mb-6 max-w-md leading-relaxed">
              Transform your career with <span className="text-edtech-green font-semibold">cutting-edge tech skills</span>. Your gateway to <span className="text-edtech-orange font-semibold">future‑ready careers</span> in Data, AI, and Cloud technologies.
            </p>
            <div className="flex gap-4">
              <Link to="/courses" className="cta cta-primary">
                Start Learning Today
              </Link>
              <Link to="/contact" className="cta cta-secondary">
                Contact Us
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Courses</h4>
            <ul className="space-y-3 text-white/70">
              {footerCourses.map((course) => (
                <li key={course.id}>
                  <Link to={`/course/${course.id}`} className="hover:text-edtech-orange transition-colors font-medium">
                    {course.title.length > 25 ? toTitleCase(course.category) : toTitleCase(course.title)}
                  </Link>
                </li>
              ))}
              <li><Link to="/courses" className="hover:text-edtech-green transition-colors font-medium">View All Courses</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link to="/about" className="hover:text-edtech-orange transition-colors font-medium">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-edtech-orange transition-colors font-medium">Blog</Link></li>
              <li><Link to="/pricing" className="hover:text-edtech-orange transition-colors font-medium">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-edtech-orange transition-colors font-medium">Contact</Link></li>
     </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2025 EdTech Informative. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Link to="/privacy-policy" className="hover:text-edtech-orange transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link to="/refund-policy" className="hover:text-edtech-orange transition-colors">
                Refund Policy
              </Link>
              <span>|</span>
              <Link to="/terms-of-service" className="hover:text-edtech-orange transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

