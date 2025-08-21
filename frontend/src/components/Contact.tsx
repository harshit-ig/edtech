import { contactData } from "../data/about";

export default function ContactSection() {
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
        <form className="card p-6" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-white/70 mt-1">{contactData.responseTime}</p>
          <div className="grid gap-4 mt-6">
            <input className="bg-black/30 border border-white/10 rounded-lg px-4 py-3" placeholder="Your name" required />
            <input className="bg-black/30 border border-white/10 rounded-lg px-4 py-3" placeholder="Your email" type="email" required />
            <input className="bg-black/30 border border-white/10 rounded-lg px-4 py-3" placeholder="Subject" />
            <textarea className="bg-black/30 border border-white/10 rounded-lg px-4 py-3" rows={5} placeholder="Message" />
            <button className="cta cta-primary w-full" type="submit">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
}

