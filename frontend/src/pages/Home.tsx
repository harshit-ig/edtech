import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CoursesSection from "../components/Courses";
import UpcomingSkills from "../components/UpcomingSkills";
import Testimonials from "../components/Testimonials";
import CompanyShowcase from "../components/CompanyShowcase";
import WhyChooseUs from "../components/WhyChooseUs";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <UpcomingSkills />
      <Testimonials />
      <CoursesSection />
      <CompanyShowcase />
      <WhyChooseUs />
      <FAQ />
      <Footer />
    </div>
  );
}

