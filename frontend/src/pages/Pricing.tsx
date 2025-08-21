import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingDots from "../FloatingDots";
import MicrosoftBadge from "../components/MicrosoftBadge";

const pricingPlans = [
  {
    name: "Individual Course",
    price: "$1,999",
    originalPrice: "$2,999",
    period: "per course",
    description: "Perfect for focused learning in a specific technology area",
    features: [
      "Access to 1 selected course",
      "Live interactive sessions",
      "Recorded video access (6 months)",
      "Hands-on projects & assignments",
      "Community access",
      "Certificate of completion",
      "Basic career support"
    ],
    highlighted: false,
    cta: "Get Started",
    badge: "Most Popular"
  },
  {
    name: "Professional Bundle",
    price: "$4,999",
    originalPrice: "$8,999",
    period: "6 months access",
    description: "Comprehensive learning with premium support and mentorship",
    features: [
      "Access to ALL current courses",
      "Live interactive sessions",
      "Recorded video access (1 year)",
      "Hands-on projects & assignments", 
      "1-on-1 mentorship (4 sessions)",
      "Priority community access",
      "Industry-recognized certificates",
      "Premium career support",
      "Resume & LinkedIn optimization",
      "Mock interview preparation",
      "Job placement assistance"
    ],
    highlighted: true,
    cta: "Start Learning",
    badge: "Best Value"
  },
  {
    name: "Enterprise",
    price: "Custom",
    originalPrice: null,
    period: "per organization",
    description: "Tailored solutions for teams and organizations",
    features: [
      "Custom curriculum development",
      "Dedicated success manager",
      "Team progress tracking",
      "Corporate certificates",
      "Bulk user management",
      "Advanced analytics & reporting",
      "On-site training options",
      "Priority support (24/7)",
      "Custom integrations",
      "Volume discounts available"
    ],
    highlighted: false,
    cta: "Contact Sales",
    badge: "For Teams"
  }
];

const faqs = [
  {
    question: "What's included in the course fee?",
    answer: "Each course includes live sessions, recorded videos, hands-on projects, community access, and a certificate. Premium plans also include mentorship and career support services."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes! We offer flexible payment plans including 3, 6, and 12-month installment options with 0% interest. Contact our team to set up a payment plan that works for you."
  },
  {
    question: "What if I'm not satisfied with the course?",
    answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied within the first 30 days, we'll provide a full refund, no questions asked."
  },
  {
    question: "How long do I have access to the course materials?",
    answer: "Individual courses include 6 months of access to recorded materials. Professional Bundle includes 1 year of access. You can also purchase lifetime access for an additional fee."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No hidden fees whatsoever. The price you see is what you pay. This includes all course materials, projects, certificates, and the support services listed in your plan."
  },
  {
    question: "Do you offer student or military discounts?",
    answer: "Yes! We offer 20% discounts for students with valid .edu email addresses and 25% discounts for active military personnel and veterans. Contact us for discount codes."
  },
  {
    question: "Can I switch between plans?",
    answer: "Absolutely! You can upgrade your plan anytime and only pay the difference. If you want to downgrade, the changes will take effect at your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cryptocurrency payments for your convenience."
  }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Background dots */}
      <div className="fixed inset-0 -z-10">
        <FloatingDots numDots={60} className="mix-blend-screen opacity-40" />
      </div>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <div className="badge-hero mx-auto w-max mb-6">
                <span>💰</span><span>TRANSPARENT PRICING</span>
              </div>

              {/* Microsoft Partnership Badge */}
              <div className="mb-6 flex justify-center">
                <MicrosoftBadge size="lg" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                Invest in Your <span className="text-glow-green">Future</span> Today
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto mb-8">
                Choose the plan that fits your goals and budget. All plans include our quality guarantee 
                and are designed to maximize your return on investment.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-white/60'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className="relative inline-flex h-6 w-12 items-center rounded-full bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-edtech-green focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-edtech-green transition-transform ${
                      billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm ${billingCycle === 'annual' ? 'text-white' : 'text-white/60'}`}>
                  Annual
                </span>
                <span className="text-xs bg-edtech-green text-black px-2 py-1 rounded-full font-medium">
                  Save 25%
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`card relative p-8 ${
                    plan.highlighted 
                      ? 'ring-2 ring-edtech-green transform scale-105 lg:scale-110' 
                      : 'hover:transform hover:scale-105'
                  } transition-all duration-300`}
                >
                  {plan.badge && (
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-black ${
                      plan.highlighted ? 'bg-edtech-green' : 'bg-edtech-orange'
                    }`}>
                      {plan.badge}
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-white/70 text-sm mb-6">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-extrabold">{plan.price}</span>
                        {plan.originalPrice && (
                          <span className="text-lg text-white/50 line-through">{plan.originalPrice}</span>
                        )}
                      </div>
                      <div className="text-white/60 text-sm mt-1">{plan.period}</div>
                    </div>

                    {plan.originalPrice && (
                      <div className="text-edtech-green text-sm font-medium mb-6">
                        Save ${parseInt(plan.originalPrice.replace('$', '').replace(',', '')) - parseInt(plan.price.replace('$', '').replace(',', ''))}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-edtech-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-edtech-green" fill="currentColor" viewBox="0 0 8 8">
                            <path d="m2.3 6.73.04-.04L6.67 2.3c.4-.4 1.06-.4 1.46 0s.4 1.06 0 1.46L3.8 8.09c-.4.4-1.06.4-1.46 0L.1 5.85c-.4-.4-.4-1.06 0-1.46s1.06-.4 1.46 0l.74.74z"/>
                          </svg>
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`w-full ${
                      plan.highlighted 
                        ? 'cta cta-primary' 
                        : plan.name === 'Enterprise' 
                        ? 'cta cta-secondary'
                        : 'cta cta-secondary hover:bg-edtech-green hover:text-black'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>

            {/* Money Back Guarantee */}
            <div className="text-center">
              <div className="card p-8 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-edtech-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-edtech-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">30-Day Money-Back Guarantee</h3>
                <p className="text-white/80">
                  We're confident you'll love our courses. If you're not completely satisfied within 30 days, 
                  we'll refund your money, no questions asked.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 md:py-24 bg-black/20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Different?</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Compare our offering with other online education platforms
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full card p-0 overflow-hidden">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-6 font-bold">Features</th>
                    <th className="text-center p-6 font-bold text-edtech-green">EdTech Informative</th>
                    <th className="text-center p-6 font-bold text-white/60">Other Platforms</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    ['Live Interactive Sessions', true, false],
                    ['1-on-1 Mentorship', true, false], 
                    ['Job Placement Assistance', true, 'Limited'],
                    ['Industry-Recognized Certificates', true, 'Generic'],
                    ['Real-World Projects', true, 'Basic'],
                    ['Lifetime Community Access', true, false],
                    ['Money-Back Guarantee', '30 Days', '7-14 Days'],
                    ['Career Support', 'Comprehensive', 'Basic']
                  ].map(([feature, us, others], index) => (
                    <tr key={index}>
                      <td className="p-6 font-medium">{feature}</td>
                      <td className="p-6 text-center">
                        {us === true ? (
                          <svg className="w-6 h-6 text-edtech-green mx-auto" fill="currentColor" viewBox="0 0 8 8">
                            <path d="m2.3 6.73.04-.04L6.67 2.3c.4-.4 1.06-.4 1.46 0s.4 1.06 0 1.46L3.8 8.09c-.4.4-1.06.4-1.46 0L.1 5.85c-.4-.4-.4-1.06 0-1.46s1.06-.4 1.46 0l.74.74z"/>
                          </svg>
                        ) : (
                          <span className="text-edtech-green font-medium">{us}</span>
                        )}
                      </td>
                      <td className="p-6 text-center text-white/60">
                        {others === true ? (
                          <svg className="w-6 h-6 text-edtech-green mx-auto" fill="currentColor" viewBox="0 0 8 8">
                            <path d="m2.3 6.73.04-.04L6.67 2.3c.4-.4 1.06-.4 1.46 0s.4 1.06 0 1.46L3.8 8.09c-.4.4-1.06.4-1.46 0L.1 5.85c-.4-.4-.4-1.06 0-1.46s1.06-.4 1.46 0l.74.74z"/>
                          </svg>
                        ) : others === false ? (
                          <svg className="w-6 h-6 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          others
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-white/70 text-lg">
                Got questions? We've got answers. Can't find what you're looking for? 
                <Link to="/contact" className="text-edtech-green hover:underline ml-1">Contact us</Link>.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="card p-0 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        openFaq === index ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6 border-t border-white/10">
                      <p className="text-white/80 pt-4 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-black/20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Career?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of successful graduates who invested in their future. 
                Start your journey today with our risk-free guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/courses" className="cta cta-primary">
                  Choose Your Course
                </Link>
                <Link to="/contact" className="cta cta-secondary">
                  Talk to an Advisor
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
