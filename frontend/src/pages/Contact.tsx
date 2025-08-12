import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactSection from "../components/Contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <div className="text-center mt-8">
          <h1 className="text-3xl md:text-4xl font-bold">Get in touch</h1>
          <p className="text-white/70 mt-2">We’d love to hear from you.</p>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

