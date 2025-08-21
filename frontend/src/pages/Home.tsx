import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CoursesSection from "../components/Courses";
import UpcomingSkills from "../components/UpcomingSkills";
import Testimonials from "../components/Testimonials";
import AdvantageStats from "../components/AdvantageStats";
import CompanyShowcase from "../components/CompanyShowcase";
import MentorsSection from "../components/MentorsSection";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CoursesSection />
      <UpcomingSkills />
      <Testimonials />
      <AdvantageStats />
      <CompanyShowcase />
      <MentorsSection />
      <FAQ />
      <Footer />
    </div>
  );
}

