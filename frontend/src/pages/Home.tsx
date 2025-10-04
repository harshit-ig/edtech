import { Suspense, lazy, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UpcomingSkills from "../components/UpcomingSkills";
import { getAboutPageData } from "../utils/dataAdapter";
import type { Milestone } from "../types";
import { useContactModal } from "../contexts/ContactModalContext";

// Lazy load heavy components that appear below the fold
const CoursesSection = lazy(() => import("../components/Courses"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const CompanyShowcase = lazy(() => import("../components/CompanyShowcase"));
const CertificateSection = lazy(() => import("../components/CertificateSection"));
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs"));
const FAQ = lazy(() => import("../components/FAQ"));
const Footer = lazy(() => import("../components/Footer"));

export default function HomePage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const { openModal } = useContactModal();

  const handleApplyNow = () => {
    openModal(
      'Book FREE Strategy Call',
      'Schedule a personalized consultation to discuss your career goals and find the perfect program for you. Our experts will help you map out your learning journey.'
    );
  };

  useEffect(() => {
    const loadMilestones = async () => {
      try {
        const data = await getAboutPageData();
        setMilestones(data.companyMilestones);
      } catch (error) {
        console.error('Error loading milestones:', error);
      }
    };
    loadMilestones();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <UpcomingSkills />
      <Suspense fallback={<div className="py-16 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edtech-green"></div></div>}>
        <CoursesSection />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edtech-green"></div></div>}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edtech-green"></div></div>}>
        <CompanyShowcase />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edtech-green"></div></div>}>
        <CertificateSection onApplyNow={handleApplyNow} />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edtech-green"></div></div>}>
        <WhyChooseUs />
      </Suspense>
        {/* SECTION 5: Our Journey - DARK */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-deep to-edtech-blue/5" />
          
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="text-center mb-16 about-reveal reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our <span className="text-edtech-orange">Journey</span></h2>
              <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
                From a <span className="text-edtech-green font-semibold">small startup</span> to a <span className="text-edtech-orange font-semibold">global education platform</span> - here's how we've grown together.
              </p>
            </div>

            <div className="relative about-reveal reveal">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-edtech-green via-edtech-orange to-edtech-blue transform md:-translate-x-0.5 rounded-full" style={{height: 'calc(100% + 4rem)'}}></div>
              
              <div className="space-y-16">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-gradient-to-r from-edtech-green to-edtech-orange rounded-full border-4 border-bg-deep transform md:-translate-x-1/2 z-10 shadow-lg"></div>
                    
                    {/* Content */}
                    <div className={`bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 ml-16 md:ml-0 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 ${
                      index % 2 === 0 ? 'md:mr-12 md:w-5/12' : 'md:ml-auto md:w-5/12'
                    }`}>
                      <div className="text-edtech-green font-bold text-xl mb-3">{milestone.year}</div>
                      <h3 className="text-2xl font-bold text-white mb-4">{milestone.title}</h3>
                      <p className="text-white/70 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
                
                {/* Timeline ending - Future indicator */}
                <div className="relative mt-16">
                  {/* Final timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-gradient-to-r from-edtech-green to-edtech-orange rounded-full border-4 border-bg-deep transform md:-translate-x-1/2 z-10 shadow-lg"></div>
                  
                 
                </div>
              </div>
            </div>
               {/* Future content - centered below the timeline */}
               <div className="pt-16 flex justify-center">
                    <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 max-w-md text-center">
                      <div className="text-edtech-orange font-bold text-xl mb-3">The Future</div>
                      <h3 className="text-2xl font-bold text-white mb-4">Building Tomorrow</h3>
                      <p className="text-white/70 leading-relaxed">
                        🚀 Our journey continues as we innovate and expand to serve more learners worldwide, 
                        <span className="text-edtech-green font-semibold">shaping the future</span> of technology education.
                      </p>
                    </div>
                  </div>
          </div>
        </section>
      <Suspense fallback={<div className="py-16 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edtech-green"></div></div>}>
        <FAQ />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edtech-green"></div></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

