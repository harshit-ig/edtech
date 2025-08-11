export default function Stats() {
  const items: [string, string][] = [
    ['99.9%','Uptime'],
    ['+42%','Productivity'],
    ['2M+','Automations'],
    ['120+','Integrations']
  ];
  return (
    <section id="stats" className="py-24 md:py-28 bg-black/30">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map(([num,label]) => (
          <div key={label} className="reveal">
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-edtech-green to-edtech-blue drop-shadow" style={{ WebkitTextStroke: '2px rgba(255,255,255,.8)' }}>{num}</div>
            <div className="mt-2 text-white/70">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

