import { mentorFeatures as features } from '../data/mentors';

export default function WhyChooseUs() {
  return (
    <>
      <section className="py-16 md:py-24 relative overflow-hidden" style={{backgroundColor: '#f4f7f1'}}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Why Choose Us Section */}
          <div className="relative">
            <div className="text-center mb-16">
              <div className="badge-hero mx-auto w-max mb-6">
                <span>⚡</span>
                <span>WHY CHOOSE US</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
                Accelerate your <span className="text-edtech-orange font-extrabold">career growth</span> with expert guidance
              </h2>
              <p className="text-gray-800 max-w-3xl mx-auto font-semibold">
                Our comprehensive learning platform combines real-world projects, expert mentorship, and personalized learning paths to help you achieve your career goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="advantage-stat-card bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 transition-all duration-300 reveal" data-accent={['blue', 'orange', 'green'][index % 3]} style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold mb-4 ${
                      ['blue', 'orange', 'green'][index % 3] === 'blue' ? 'text-edtech-blue bg-edtech-blue/10' :
                      ['blue', 'orange', 'green'][index % 3] === 'orange' ? 'text-edtech-orange bg-edtech-orange/10' :
                      'text-edtech-green bg-edtech-green/10'
                    }`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
