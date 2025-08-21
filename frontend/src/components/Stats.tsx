import { companyInfo } from "../data/about";

export default function Stats() {
  return (
    <section id="stats" className="py-24 md:py-28 bg-black/30">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {companyInfo.marketingStats.map((stat) => (
          <div key={stat.label} className="reveal">
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-edtech-green to-edtech-blue drop-shadow" style={{ WebkitTextStroke: '2px rgba(255,255,255,.8)' }}>{stat.number}</div>
            <div className="mt-2 text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

