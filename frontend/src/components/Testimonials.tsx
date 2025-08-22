import { useState, useEffect } from 'react';
import { getTestimonialsData } from '../utils/dataAdapter';
import type { Testimonial } from '../types';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Static success stats (these don't change often, so keeping them static for now)
  const successStats = [
    { value: '1000+', label: 'Students Trained' },
    { value: '95%', label: 'Job Placement Rate' },
    { value: '4.9/5', label: 'Average Rating' }
  ];

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getTestimonialsData();
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  // Initialize scroll reveal for dynamic content after data loads
  useEffect(() => {
    if (!loading && testimonials.length > 0) {
      const timer = setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) e.target.classList.add("visible");
            });
          },
          { threshold: 0.1 }
        );
        
        const testimonialRevealElements = document.querySelectorAll('.testimonial-reveal');
        testimonialRevealElements.forEach((el) => observer.observe(el));
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [loading, testimonials.length]);

  if (loading) {
    return (
      <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="text-gray-600 text-lg">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="badge-hero mx-auto w-max">
            <span>⭐</span>
            <span>SUCCESS STORIES</span>
          </div>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900">
            Hear what our 
            <span className="text-edtech-orange font-extrabold"> learners have to say</span>
          </h2>
          <p className="mt-4 text-gray-800 max-w-3xl mx-auto font-semibold">
            Real stories from professionals who transformed their careers with 1to10x. Join thousands of learners who've accelerated their growth and landed their dream jobs.
          </p>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {successStats.map((stat, index) => (
            <div key={index} className="text-center testimonial-reveal reveal">
              <div className={`text-4xl md:text-5xl font-extrabold mb-2 ${
                index === 0 ? 'text-edtech-green' : 
                index === 1 ? 'text-edtech-orange' : 
                'text-edtech-blue'
              }`}>
                {stat.value}
              </div>
              <div className="text-gray-700 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No testimonials available at the moment.
            </div>
          ) : (
            testimonials.map((testimonial) => (
            <article 
              key={testimonial.id} 
              className="testimonial-card group testimonial-reveal reveal"
              data-accent={testimonial.accent}
            >
              {/* Category Badge */}
              <div className="testimonial-category">
                {testimonial.category}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-lg ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  ({testimonial.rating})
                </span>
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-800 leading-relaxed mb-6 font-medium">
                "{testimonial.review}"
              </blockquote>

              {/* Author Info */}
              <div className="testimonial-author">
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                    {testimonial.company && (
                      <span>, {testimonial.company}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Accent indicator */}
              <div className="testimonial-indicator">
                <div className="pulse-dot"></div>
              </div>
            </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

