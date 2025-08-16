import { useState, useEffect } from 'react';

// Stats data for edtech advantages
const advantageStats = [
  {
    id: 'career-speed',
    title: 'CAREER ADVANCEMENT SPEED',
    value: '10.0x',
    label: 'FASTER GROWTH',
    description: 'Our graduates achieve in 6 months what takes others 5 years. Break through career plateaus with our proven methodology.',
    dots: 8,
    accent: 'blue'
  },
  {
    id: 'salary-boost',
    title: 'SALARY TRANSFORMATION',
    value: '3.5x',
    label: 'INCOME BOOST',
    description: 'Average salary increase within 12 months. Turn your learning investment into life-changing returns.',
    dots: 7,
    accent: 'orange'
  },
  {
    id: 'placement-rate',
    title: 'JOB PLACEMENT SUCCESS',
    value: '94%',
    label: 'PLACEMENT RATE',
    description: 'Land your dream tech role guaranteed. Our industry connections open doors others can\'t.',
    dots: 10,
    accent: 'green'
  },
  {
    id: 'learning-efficiency',
    title: 'LEARNING EFFICIENCY',
    value: '8.0x',
    label: 'MORE EFFECTIVE',
    description: 'Master complex skills faster with our proven methodology. Why struggle for years when you can excel in months?',
    dots: 8,
    accent: 'blue'
  },
  {
    id: 'industry-ready',
    title: 'INDUSTRY READINESS',
    value: '100%',
    label: 'JOB READY',
    description: 'Graduate with real-world skills that employers desperately need. No more \'entry-level\' limitations.',
    dots: 8,
    accent: 'orange'
  },
  {
    id: 'career-confidence',
    title: 'CAREER CONFIDENCE',
    value: '10.0x',
    label: 'MORE CONFIDENT',
    description: 'Transform from uncertain to unstoppable. Join the elite who shape the future of technology.',
    dots: 10,
    accent: 'green'
  }
];

export default function AdvantageStats() {
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId) {
              setAnimatedCards(prev => new Set(prev).add(cardId));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = document.querySelectorAll('[data-card-id]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const getAccentColor = (accent: string) => {
    switch (accent) {
      case 'blue': return '#2B2B8E';
      case 'orange': return '#EF552C';
      case 'green': return '#D5DE24';
      default: return '#2B2B8E';
    }
  };

  const renderDots = (totalDots: number, accent: string, cardId: string, index: number) => {
    const accentColor = getAccentColor(accent);
    const isAnimated = animatedCards.has(cardId);
    
    return (
      <div className="grid grid-cols-6 gap-1.5 max-w-28">
        {Array.from({ length: 12 }).map((_, dotIndex) => {
          const shouldAnimate = dotIndex < totalDots && isAnimated;
          const delay = dotIndex * 80 + index * 100;
          
          return (
            <div
              key={dotIndex}
              className="w-2.5 h-2.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: shouldAnimate ? accentColor : '#D1D5DB',
                transitionDelay: `${delay}ms`,
                animation: shouldAnimate ? `pulse-dot 2s ease-in-out ${delay}ms 1 normal forwards` : 'none',
                transform: shouldAnimate ? 'scale(1)' : 'scale(0.8)',
                opacity: shouldAnimate ? 1 : 0.6
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <section className="py-20 px-4" style={{backgroundColor: '#f4f7f1'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge-hero mx-auto w-max">
              <span>⚡</span>
              <span>THE EDTECH ADVANTAGE</span>
            </div>
            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-edtech-blue">Transform</span>, <span className="text-edtech-blue">excel</span>, and <span className="text-edtech-blue">dominate</span>.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {advantageStats.map((stat, index) => (
              <div
                key={stat.id}
                data-card-id={stat.id}
                className={`advantage-stat-card bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 transition-all duration-300 hover:-translate-y-1 reveal`}
                data-accent={stat.accent}
              >
                <div className="mb-3 sm:mb-4">
                  <h3 className="text-xs font-bold text-gray-500 mb-2 sm:mb-3 tracking-wide uppercase">
                    {stat.title}
                  </h3>
                  <div className="mb-3 sm:mb-4">
                    {renderDots(stat.dots, stat.accent, stat.id, index)}
                  </div>
                </div>

                <div className="mb-3">
                  <div>
                    <span className={`text-4xl font-bold mb-1 inline-block ${
                      stat.accent === 'blue' ? 'text-edtech-blue' :
                      stat.accent === 'orange' ? 'text-edtech-orange' :
                      'text-edtech-green'
                    }`}>
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
