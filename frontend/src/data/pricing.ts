export interface CoursePricing {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  currentPrice: number;
  installmentPrice: number; // Monthly installment price
  installmentMonths: number; // Number of months for installment
  discount: string;
  duration: string;
  extra: string;
  description: string;
  features: string[];
  highlighted: boolean;
  accent: 'edtech-green' | 'edtech-orange' | 'edtech-red' | 'edtech-blue';
  badge: string;
  cta: string;
  popular?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const coursePricing: CoursePricing[] = [
  {
    id: 'data-analytics',
    name: '10x Data Analyst and AI Complete Certification with Microsoft',
    category: 'DATA ANALYTICS',
    originalPrice: 2999,
    currentPrice: 1999,
    installmentPrice: 399,
    installmentMonths: 6,
    discount: '33% OFF',
    duration: '6 Months',
    extra: '25+ Live Projects',
    description: 'Master data analysis, AI, and Microsoft tools with hands-on projects that prepare you for real-world challenges.',
    features: [
      'Live interactive sessions with industry experts',
      'Recorded video access (1 year)',
      'Hands-on projects & real-world assignments',
      'Microsoft certification eligibility',
      '1-on-1 mentorship sessions',
      'Career support & job placement assistance',
      'Industry-recognized certificate',
      'Lifetime community access'
    ],
    highlighted: false,
    accent: 'edtech-green',
    badge: 'FEATURED',
    cta: 'Enroll Now',
    popular: true
  },
  {
    id: 'gen-ai',
    name: 'Become a Generative AI Expert: Unlocking Creativity with Code',
    category: 'GENERATIVE AI',
    originalPrice: 3499,
    currentPrice: 2499,
    installmentPrice: 499,
    installmentMonths: 6,
    discount: '29% OFF',
    duration: '3 Months',
    extra: 'AI Tools Access',
    description: 'Learn to harness the power of generative AI and build innovative solutions that drive business value.',
    features: [
      'Future-Ready Curriculum with live AI workshops',
      'Learn from Real AI Practitioners',
      'Hands-On Learning with real AI projects',
      'AI-Powered Learning Tools & model access',
      'Job-Ready Outcomes with portfolio',
      'Expert mentorship & career guidance',
      'OpenAI partnership certification track',
      'Access to premium AI tools & platforms'
    ],
    highlighted: true,
    accent: 'edtech-orange',
    badge: 'TRENDING',
    cta: 'Start Learning',
    popular: false
  },
  {
    id: 'agentic-ai',
    name: '10x Agentic AI and Automation Mastery',
    category: 'AGENTIC AI',
    originalPrice: 3499,
    currentPrice: 2499,
    installmentPrice: 499,
    installmentMonths: 6,
    discount: '29% OFF',
    duration: '4 Months',
    extra: 'Advanced AI Projects',
    description: 'Master autonomous AI agents and orchestrate complex workflows that operate independently to drive business value.',
    features: [
      'Autonomous Agent Development training',
      'Multi-Agent Systems orchestration',
      'Advanced automation workflows',
      'System integration techniques',
      'Live expert-led sessions',
      '1-on-1 agent development mentorship',
      'Industry partnerships & networking',
      'Access to premium AI agent tools'
    ],
    highlighted: false,
    accent: 'edtech-red',
    badge: 'MOST POPULAR',
    cta: 'Master AI Agents',
    popular: true
  },
  {
    id: 'web-development',
    name: 'Full Stack Web Development Bootcamp',
    category: 'WEB DEVELOPMENT',
    originalPrice: 2999,
    currentPrice: 1999,
    installmentPrice: 399,
    installmentMonths: 6,
    discount: '33% OFF',
    duration: '5 Months',
    extra: '15+ Projects',
    description: 'Learn modern web development with React, Node.js, and cloud deployment. Build real-world applications.',
    features: [
      '5 Months of intensive training',
      '15+ Real-world projects',
      'React, Node.js & modern stack',
      'Cloud deployment & DevOps',
      '1-on-1 mentorship',
      'Career support & job placement',
      'Lifetime access to materials',
      'Industry-recognized certificate'
    ],
    highlighted: false,
    accent: 'edtech-green',
    badge: 'NEW',
    cta: 'Build Apps',
    popular: false
  },
  {
    id: 'cloud-computing',
    name: 'AWS Cloud Architect Certification',
    category: 'CLOUD COMPUTING',
    originalPrice: 2199,
    currentPrice: 1599,
    installmentPrice: 319,
    installmentMonths: 6,
    discount: '27% OFF',
    duration: '3 Months',
    extra: 'AWS Certified',
    description: 'Master cloud architecture and deployment with AWS services. Prepare for industry certifications.',
    features: [
      '3 Months of cloud training',
      'AWS certification preparation',
      'Hands-on lab environment',
      'Real cloud projects',
      'AWS-certified instructors',
      'Study groups & community',
      'Career placement support',
      'Industry-recognized certification'
    ],
    highlighted: false,
    accent: 'edtech-blue',
    badge: 'HOT',
    cta: 'Get Certified',
    popular: false
  },
  {
    id: 'cybersecurity',
    name: 'Ethical Hacking & Cybersecurity',
    category: 'CYBERSECURITY',
    originalPrice: 2999,
    currentPrice: 2199,
    installmentPrice: 439,
    installmentMonths: 6,
    discount: '27% OFF',
    duration: '6 Months',
    extra: '20+ Labs',
    description: 'Learn cybersecurity fundamentals, penetration testing, and ethical hacking methodologies.',
    features: [
      '6 Months of security training',
      '20+ Hands-on labs',
      'Ethical hacking tools & techniques',
      'Industry certification prep',
      'Virtual security lab access',
      'Cybersecurity professional mentors',
      '24/7 lab access',
      'Career placement assistance'
    ],
    highlighted: false,
    accent: 'edtech-red',
    badge: 'FEATURED',
    cta: 'Secure Future',
    popular: false
  }
];

export const pricingFAQs: FAQ[] = [
  {
    question: "What's included in each course?",
    answer: "Each course includes live interactive sessions, recorded videos, hands-on projects, community access, mentorship, and an industry-recognized certificate. Specific features vary by course - check the course details for the complete list."
  },
  {
    question: "Do you offer payment plans or financing?",
    answer: "Yes! We offer flexible payment plans including 3, 6, and 12-month installment options with 0% interest. We also partner with financing companies to make education accessible. Contact our team to set up a payment plan that works for you."
  },
  {
    question: "What if I'm not satisfied with the course?",
    answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied within the first 30 days, we'll provide a full refund, no questions asked. Your success is our priority."
  },
  {
    question: "How long do I have access to course materials?",
    answer: "Most courses include 1 year of access to recorded materials, live session recordings, and project resources. Data Analytics includes lifetime community access. You can also purchase extended access if needed."
  },
  {
    question: "Are these courses beginner-friendly?",
    answer: "Absolutely! Our courses are designed for all skill levels. We start with fundamentals and gradually build to advanced concepts. Our mentors provide personalized support to ensure everyone can succeed regardless of their starting point."
  },
  {
    question: "Do you provide job placement assistance?",
    answer: "Yes! All our courses include career support services: resume optimization, LinkedIn profile enhancement, mock interviews, job search strategies, and access to our hiring partner network. We have a 90%+ job placement success rate."
  },
  {
    question: "Are the certificates industry-recognized?",
    answer: "Yes! Our certificates are recognized by industry leaders and we have partnerships with Microsoft, AWS, and other tech companies. Many of our courses also prepare you for official vendor certifications."
  },
  {
    question: "Can I switch between courses?",
    answer: "While each course is designed as a complete program, we understand goals can change. Contact our student success team if you need to discuss options - we're here to support your learning journey."
  },
  {
    question: "What kind of support do you provide during the course?",
    answer: "We provide comprehensive support including 1-on-1 mentorship, 24/7 community access, regular office hours with instructors, technical support, and career guidance. You're never learning alone."
  },
  {
    question: "How are the live sessions scheduled?",
    answer: "Live sessions are typically scheduled during evenings and weekends to accommodate working professionals. All sessions are recorded so you can catch up if you miss one. We also offer flexible scheduling for different time zones."
  }
];

export const courseBenefits = [
  ['Live Interactive Sessions', 'Real-time learning with expert instructors', true, 'Pre-recorded only'],
  ['1-on-1 Mentorship', 'Personalized guidance from industry experts', true, 'Group support only'], 
  ['Job Placement Assistance', 'Dedicated career support & hiring network', '90%+ Success Rate', 'Limited support'],
  ['Industry Certifications', 'Microsoft, AWS & vendor certifications', true, 'Generic certificates'],
  ['Real-World Projects', 'Portfolio-ready industry projects', '15-25 Projects', '3-5 Basic projects'],
  ['Lifetime Community Access', 'Ongoing network & learning community', true, 'Course period only'],
  ['Money-Back Guarantee', 'Risk-free learning experience', '30 Days', '7-14 Days'],
  ['Course Material Access', 'Extended access to all resources', '1 Year+', '6 Months']
];
