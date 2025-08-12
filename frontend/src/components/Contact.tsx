export default function ContactSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-start">
        {/* Left: contact cards */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">Head Office</h3>
            <p className="text-white/70">30 N Gould St, Sheridan WY, 82801</p>
            <p className="text-white/70">Email: support@edtechinformative.com</p>
            <p className="text-white/70">Phone: +1 929 588 7774</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-2">UK Office</h3>
            <p className="text-white/70">128 City Rd, London EC1V 2NX</p>
            <p className="text-white/70">Phone: +44 7520 637 821</p>
          </div>
          <div className="card p-0 overflow-hidden">
            <div className="h-56 w-full bg-black/30">
              <iframe
                title="map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.001!2d-73.935242!3d40.730610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sus!4v1700000000000"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Right: form */}
        <form className="card p-6" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-white/70 mt-1">We usually respond within 1 business day.</p>
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

