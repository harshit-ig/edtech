import { mentors, partnerCompanies } from '../data/mentors';

export default function MentorProfiles() {
  // Create duplicated arrays for seamless scrolling
  const duplicatedMentors = [...mentors, ...mentors];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{backgroundColor: '#f4f7f1'}}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="badge-hero mx-auto w-max mb-6">
              <span>👨‍💼</span>
              <span>EXPERT MENTORS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Learn from <span className="text-edtech-blue font-extrabold">experienced professionals</span>
            </h2>
            <p className="text-gray-800 max-w-3xl mx-auto font-semibold">
              Get personalized guidance from seasoned professionals working at leading companies who are passionate about helping you succeed in your career journey.
            </p>
          </div>

          {/* Company logos showcase - multiple rows like CompanyShowcase */}
          <div className="mb-16">
            <div className="space-y-6 sm:space-y-8">
              {/* Company Row - Right to Left (changed direction) */}
              <div className="overflow-hidden whitespace-nowrap">
                <div className="inline-flex py-1 animate-scroll-right gap-8">
                  {[...partnerCompanies, ...partnerCompanies].map((company, index) => (
                    <div key={`${company.name}-${index}`} className="flex-shrink-0">
                      <div className="company-card" style={{background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'}}>
                        <img 
                          src={company.logo} 
                          alt={company.name}
                          className="company-logo"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mentors scroll */}
          <div className="relative overflow-hidden">
            <div className="mentors-scroll flex gap-6 w-max">
              {duplicatedMentors.map((mentor, index) => (
                <div key={`${mentor.id}-${index}`} className="flex-shrink-0 w-72">
                  <div className="advantage-stat-card bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 transition-all duration-300 reveal" data-accent={mentor.accent}>
                    <div className="text-center">
                      <div className="mb-4">
                        <img 
                          src={mentor.image} 
                          alt={mentor.name}
                          className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-gray-100"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{mentor.name}</h4>
                        <p className="text-gray-600 text-sm font-medium mb-2">{mentor.role}</p>
                        
                        <div className={`inline-flex items-center px-3 py-1 rounded-full ${
                          mentor.accent === 'blue' ? 'bg-edtech-blue/10 border border-edtech-blue/20' :
                          mentor.accent === 'orange' ? 'bg-edtech-orange/10 border border-edtech-orange/20' :
                          'bg-edtech-green/10 border border-edtech-green/20'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            mentor.accent === 'blue' ? 'bg-edtech-blue' :
                            mentor.accent === 'orange' ? 'bg-edtech-orange' :
                            'bg-edtech-green'
                          }`}></div>
                          <span className={`text-xs font-semibold ${
                            mentor.accent === 'blue' ? 'text-edtech-blue' :
                            mentor.accent === 'orange' ? 'text-edtech-orange' :
                            'text-edtech-green'
                          }`}>{mentor.company}</span>
                        </div>
                      </div>
                    </div>
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
