export interface PricingPlan {
  name: string;
  price: string;
  originalPrice: string | null;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  badge: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const pricingPlans: PricingPlan[] = [
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

export const pricingFAQs: FAQ[] = [
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

export const comparisonFeatures = [
  ['Live Interactive Sessions', true, false],
  ['1-on-1 Mentorship', true, false], 
  ['Job Placement Assistance', true, 'Limited'],
  ['Industry-Recognized Certificates', true, 'Generic'],
  ['Real-World Projects', true, 'Basic'],
  ['Lifetime Community Access', true, false],
  ['Money-Back Guarantee', '30 Days', '7-14 Days'],
  ['Career Support', 'Comprehensive', 'Basic']
];
