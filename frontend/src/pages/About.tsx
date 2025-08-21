import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingDots from "../FloatingDots";
import { teamMembers, companyValues as values, aboutStats as stats, companyMilestones as milestones } from "../data/about";

// Helper function to render icon from SVG path
const renderIcon = (iconPath: string) => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Background dots */}
      <div className="fixed inset-0 -z-10">
        <FloatingDots numDots={50} className="mix-blend-screen opacity-40" />
      </div>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <div className="badge-hero mx-auto w-max mb-6">
                <span>🚀</span><span>OUR STORY</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                Transforming Lives Through <span className="text-glow-green">Technology Education</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-4xl mx-auto">
                Since 2018, we've been on a mission to bridge the skills gap in technology by providing world-class, 
                practical education that prepares students for successful careers in the digital economy.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="card p-6">
                    <div className={`text-3xl md:text-4xl font-bold mb-2 text-${stat.color}`}>
                      {stat.number}
                    </div>
                    <div className="text-white/70 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="card p-8 md:p-12">
                <div className="w-16 h-16 bg-edtech-green/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-edtech-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  To make high-quality technology education accessible to everyone, regardless of their background or location. 
                  We believe that with the right guidance and resources, anyone can build a successful career in tech.
                </p>
              </div>
              
              <div className="card p-8 md:p-12">
                <div className="w-16 h-16 bg-edtech-orange/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-edtech-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  To be the world's leading platform for practical technology education, creating a future where talent 
                  and opportunity meet, regardless of geographical or economic barriers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-black/20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                The principles that guide everything we do and shape the learning experience we create.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-edtech-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-edtech-blue">
                    {renderIcon(value.iconPath)}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                From a small startup to a global education platform - here's how we've grown together.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-edtech-green/30 transform md:-translate-x-0.5"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-edtech-green rounded-full border-4 border-bg-deep transform md:-translate-x-1/2 z-10"></div>
                    
                    {/* Content */}
                    <div className={`card p-6 ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-8 md:w-5/12' : 'md:ml-8 md:w-5/12 md:ml-auto'
                    }`}>
                      <div className="text-edtech-green font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                      <p className="text-white/70">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-black/20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Industry experts and educators passionate about transforming lives through technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="card p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-24 h-24 bg-gradient-to-br from-edtech-green/20 to-edtech-orange/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <div className="text-edtech-green text-sm font-medium mb-3">{member.role}</div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-3">
                    <a href={member.linkedin} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-edtech-green/20 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href={member.twitter} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-edtech-orange/20 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join our community of learners and start building the career you've always dreamed of. 
                The future of tech is waiting for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/courses" className="cta cta-primary">
                  Explore Courses
                </Link>
                <Link to="/contact" className="cta cta-secondary">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
