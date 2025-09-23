'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ananya Singh",
      role: "Data Analyst @ E-commerce",
      testimonial: "The SQL and Python training was fantastic. I now build automated sales reports that save my team 20 hours weekly."
    },
    {
      name: "Rohit Verma",
      role: "Business Analyst @ Fintech",
      testimonial: "Excel to Tableau transformation was eye-opening. I created my first interactive dashboard within the first week."
    },
    {
      name: "Maya Kapoor",
      role: "Senior Data Analyst @ Tech Startup",
      testimonial: "Life-changing 6-month program. The comprehensive training helped me master Python, SQL, and data visualization to build my 6-figure analytics career."
    },
    {
      name: "Disha Sharma",
      role: "Marketing Analyst @ Consumer Brand",
      testimonial: "Customer segmentation project using Python taught me to identify profitable customer segments that boosted revenue by 15%."
    },
    {
      name: "Karthik N.",
      role: "Financial Analyst @ Investment Firm",
      testimonial: "Advanced Excel techniques transformed my reporting. My financial models are now 5x more sophisticated and accurate."
    },
    {
      name: "Max Olivares",
      role: "Data Specialist @ Healthcare",
      testimonial: "The statistical analysis module was incredible—I can now identify trends and patterns that drive real business decisions."
    },
    {
      name: "Mohd. Faraz",
      role: "Operations Analyst @ Logistics",
      testimonial: "Perfect balance of theory and hands-on practice. Went from Excel basics to creating complex SQL queries and Python scripts."
    },
    {
      name: "Prathibha Agarwal",
      role: "Research Analyst @ Consulting",
      testimonial: "The data storytelling skills helped me present insights that secured a £50K client contract for my company."
    },
    {
      name: "Tushar Tyagi",
      role: "Business Intelligence Analyst @ Retail",
      testimonial: "Power BI training was exceptional—I built executive dashboards that are now used company-wide for strategic decisions."
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Learners Say
          </h2>
          <p className="text-lg text-gray-600">
            Real success stories from our Data Analyst Career Program graduates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">
                <div className="text-base font-semibold text-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonial.role}
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-warning mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed">
                "{testimonial.testimonial}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}