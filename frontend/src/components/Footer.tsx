// import FloatingDots from "../FloatingDots";
import { Link } from "react-router-dom";
import WhiteLogo from "../assets/WHITE-LOGO--300x152.png";

export default function Footer() {
  return (
    <footer id="contact" className="py-20 border-t border-white/10 relative overflow-hidden">
      {/* <FloatingDots numDots={80} className="opacity-75 -z-10" /> */}
      <div className="mx-auto max-w-7xl px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <img src={WhiteLogo} alt="EdTech Informative" className="h-10 w-auto mb-4" />
            <p className="text-white/80 text-lg mb-6 max-w-md leading-relaxed">
              Transform your career with cutting-edge tech skills. Your gateway to future‑ready careers in Data, AI, and Cloud technologies.
            </p>
            <div className="flex gap-4">
              <Link to="/#get-started" className="cta cta-primary">
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
              <li><Link to="/courses" className="hover:text-edtech-orange transition-colors font-medium">Data Analytics</Link></li>
              <li><Link to="/courses" className="hover:text-edtech-orange transition-colors font-medium">AI & Machine Learning</Link></li>
              <li><Link to="/courses" className="hover:text-edtech-orange transition-colors font-medium">Cloud Computing</Link></li>
              <li><Link to="/courses" className="hover:text-edtech-orange transition-colors font-medium">Cybersecurity</Link></li>
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
              <li><a href="#" className="hover:text-edtech-orange transition-colors font-medium">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2025 EdTech Informative. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/contact" className="text-white/60 hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

