import { useState } from 'react';

// Trending and upcoming skills data
const upcomingSkills = [
  {
    id: 'quantum-computing',
    name: 'Quantum Computing',
    category: 'EMERGING TECH',
    demand: 'Ultra High',
    growth: '+450%',
    icon: '⚛️',
    accent: 'blue'
  },
  {
    id: 'multimodal-ai',
    name: 'Multimodal AI',
    category: 'AI/ML',
    demand: 'Critical',
    growth: '+320%',
    icon: '🧠',
    accent: 'orange'
  },
  {
    id: 'edge-computing',
    name: 'Edge Computing',
    category: 'CLOUD TECH',
    demand: 'High',
    growth: '+280%',
    icon: '⚡',
    accent: 'green'
  },
  {
    id: 'web3-security',
    name: 'Web3 Security',
    category: 'BLOCKCHAIN',
    demand: 'Critical',
    growth: '+400%',
    icon: '🛡️',
    accent: 'red'
  },
  {
    id: 'neuromorphic-ai',
    name: 'Neuromorphic AI',
    category: 'AI HARDWARE',
    demand: 'Ultra High',
    growth: '+500%',
    icon: '🔬',
    accent: 'blue'
  },
  {
    id: 'spatial-computing',
    name: 'Spatial Computing',
    category: 'AR/VR/XR',
    demand: 'High',
    growth: '+380%',
    icon: '🥽',
    accent: 'orange'
  },
  {
    id: 'autonomous-systems',
    name: 'Autonomous Systems',
    category: 'ROBOTICS',
    demand: 'Critical',
    growth: '+350%',
    icon: '🤖',
    accent: 'green'
  },
  {
    id: 'bio-computing',
    name: 'Bio-Computing',
    category: 'BIOTECH',
    demand: 'Ultra High',
    growth: '+600%',
    icon: '🧬',
    accent: 'red'
  }
];

export default function UpcomingSkills() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Duplicate skills for seamless infinite scroll
  const duplicatedSkills = [...upcomingSkills, ...upcomingSkills];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const container = e.currentTarget as HTMLElement;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = e.currentTarget as HTMLElement;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{backgroundColor: '#f4f7f1'}}>
      {/* Simple light background without gradients */}
      
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <div className="badge-hero mx-auto w-max">
            <span>🚀</span>
            <span>FUTURE-READY SKILLS</span>
          </div>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
            Master Tomorrow's 
            <span className="text-edtech-orange font-extrabold"> Most Valuable Skills</span>
          </h2>
          <p className="mt-4 text-gray-800 max-w-2xl mx-auto font-semibold">
            Get ahead of 99% of professionals by mastering these breakthrough technologies before they become mainstream
          </p>
        </div>

        {/* Marquee Container */}
        <div className="marquee relative">
          <div 
            className={`marquee-viewport ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div className="marquee-track py-4 animate-marquee">
              {duplicatedSkills.map((skill, index) => (
                <div
                  key={`${skill.id}-${index}`}
                  className="skill-card group"
                  data-accent={skill.accent}
                >
                  {/* Skill Icon */}
                  <div className="skill-icon">
                    <span className="text-4xl">{skill.icon}</span>
                  </div>

                  {/* Skill Info */}
                  <div className="skill-content">
                    <div className="skill-category">
                      {skill.category}
                    </div>
                    <h3 className="skill-title">
                      {skill.name}
                    </h3>
                    
                    {/* Metrics */}
                    <div className="skill-metrics">
                      <div className="metric">
                        <span className="metric-label">Demand</span>
                        <span className="metric-value demand-badge">
                          {skill.demand}
                        </span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Growth</span>
                        <span className="metric-value growth-badge">
                          {skill.growth}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Corner indicator */}
                  <div className="corner-indicator">
                    <div className="pulse-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
