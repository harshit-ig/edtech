import { useState } from "react";
import { contactData } from "../data/about";
import { submitContactPageForm, type ContactPageFormData } from "../api";

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactPageFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitContactPageForm(formData);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert(result.message);
    } catch (error) {
      setIsSubmitting(false);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-start">
        {/* Left: contact cards */}
        <div className="space-y-6">
          {contactData.offices.map((office, index) => (
            <div key={index} className="card p-6">
              <h3 className="text-xl font-semibold mb-2">{office.name}</h3>
              <p className="text-white/70">{office.address}</p>
              {office.email && (
                <p className="text-white/70">Email: {office.email}</p>
              )}
              <p className="text-white/70">Phone: {office.phone}</p>
            </div>
          ))}
          <div className="card p-0 overflow-hidden">
            <div className="h-56 w-full bg-black/30">
              <iframe
                title="map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={contactData.mapEmbedUrl}
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Right: form */}
        <form className="card p-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-white/70 mt-1">{contactData.responseTime}</p>
          <div className="grid gap-4 mt-6">
            <input 
              className="bg-black/30 border border-white/10 rounded-lg px-4 py-3" 
              placeholder="Your name" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
            <input 
              className="bg-black/30 border border-white/10 rounded-lg px-4 py-3" 
              placeholder="Your email" 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            <input 
              className="bg-black/30 border border-white/10 rounded-lg px-4 py-3" 
              placeholder="Subject" 
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
            <textarea 
              className="bg-black/30 border border-white/10 rounded-lg px-4 py-3" 
              rows={5} 
              placeholder="Message" 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
            <button 
              className="cta cta-primary w-full" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

