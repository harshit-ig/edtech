export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24"> 
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Loved by learners</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <article key={i} className="card p-6 bg-gradient-to-br from-edtech-green/10 to-edtech-blue/10 reveal">
              <p className="text-white/80">“The guidance and projects made the difference. I landed interviews within weeks.”</p>
              <div className="mt-4 text-sm text-white/60">Data Analyst, USA</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

