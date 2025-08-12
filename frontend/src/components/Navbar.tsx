import { useState } from "react";
import WhiteLogo from "../assets/WHITE-LOGO--300x152.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/10 bg-black/40 supports-backdrop-blur:bg-black/30 h-16">
      <a href="#" className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
        <img src={WhiteLogo} alt="EdTech Informative" className="h-8 w-auto" />
        <span className="sr-only">EdTech Informative</span>
      </a>
      <div className="w-full px-6 h-full flex items-center justify-end">
        <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <a href="/#featured-programs" className="hover:text-edtech-orange transition-colors">Features</a>
          <a href="/#testimonials" className="hover:text-edtech-orange transition-colors">Testimonials</a>
          <a href="/#stats" className="hover:text-edtech-orange transition-colors">Stats</a>
          <a href="/contact" className="hover:text-edtech-orange transition-colors">Contact</a>
          <a href="/#get-started" className="cta cta-primary">Get Started</a>
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
            <a href="/#featured-programs" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">Features</a>
            <a href="/#testimonials" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">Testimonials</a>
            <a href="/#stats" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">Stats</a>
            <a href="/contact" onClick={() => setMobileOpen(false)} className="text-white/80 hover:text-white">Contact</a>
            <a href="/#get-started" onClick={() => setMobileOpen(false)} className="cta cta-primary w-full text-center mt-2">Get Started</a>
          </div>
        </div>
      )}
    </nav>
  );
}

