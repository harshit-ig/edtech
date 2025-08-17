import { useState } from 'react';

const faqs = [
  {
    id: 1,
    question: "What makes our platform different from other career development programs?",
    answer: "Our platform combines AI-driven personalized learning paths with real-world industry projects and direct mentorship from professionals at top companies. Unlike traditional programs, we focus on practical skills that you can implement immediately in your current role or showcase to future employers."
  },
  {
    id: 2,
    question: "How long does it take to see results from the program?",
    answer: "Most learners see significant improvements in their skills within 4-6 weeks. Career advancement typically occurs within 3-6 months, with many students landing new roles or promotions. The timeline depends on your dedication, current skill level, and career goals."
  },
  {
    id: 3,
    question: "Do I need prior experience in tech to benefit from our courses?",
    answer: "Not at all! Our courses are designed for learners at all levels. We offer beginner-friendly programs that start from the basics, as well as advanced courses for experienced professionals. Our AI-driven assessment helps place you in the right program for your current skill level."
  },
  {
    id: 4,
    question: "What kind of support do I get during the program?",
    answer: "You'll receive comprehensive support including: personalized mentorship from industry experts, 24/7 access to our learning community, regular one-on-one sessions, career guidance and interview preparation, resume optimization, and lifetime access to course updates and materials."
  },
  {
    id: 5,
    question: "How much of a salary increase can I expect?",
    answer: "Our alumni typically see salary increases of 40-150% within the first year. Data professionals often see increases from $60k to $120k+, while those transitioning to AI/ML roles can see even higher growth. Results vary based on location, experience, and the specific role you transition into."
  },
  {
    id: 6,
    question: "Are the courses updated with the latest industry trends?",
    answer: "Yes! Our curriculum is continuously updated every quarter to reflect the latest industry trends, technologies, and best practices. We work directly with professionals from top companies to ensure our content stays relevant and cutting-edge."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <div className="badge-hero mx-auto w-max mb-6">
            <span>❓</span>
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Frequently Asked <span className="text-edtech-orange font-extrabold">Questions</span>
          </h2>
          <p className="text-white/70 max-w-4xl mx-auto text-lg leading-relaxed">
            Everything you need to know about our career transformation programs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="card p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-center justify-between text-left focus:outline-none group"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-edtech-orange transition-colors pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-white/70 transition-transform duration-200 ${
                        openId === faq.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === faq.id
                      ? 'max-h-96 opacity-100 mt-4'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="text-white/80 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/70 mb-6">
              Our team is here to help you choose the right program for your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="cta cta-primary"
              >
                Contact Support
              </a>
              <a
                href="/#get-started"
                className="cta cta-secondary"
              >
                Book Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
