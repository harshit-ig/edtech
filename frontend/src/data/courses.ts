export type Course = {
  id: string;
  category: string;
  badge: string;
  tag?: string;
  title: string;
  desc: string;
  duration: string;
  extra: string;
  accent: 'edtech-green' | 'edtech-blue' | 'edtech-orange';
};

export const courses: Course[] = [
  {
    id: 'data-analytics',
    category: 'DATA ANALYTICS',
    badge: 'FEATURED',
    tag: 'Popular',
    title: '10x Data Analyst and AI Complete Certification with Microsoft',
    desc: 'Master data analysis, AI, and Microsoft tools with hands-on projects that prepare you for real-world challenges.',
    duration: '6 Months',
    extra: '25+ Live Projects',
    accent: 'edtech-green',
  },
  {
    id: 'gen-ai',
    category: 'GENERATIVE AI',
    badge: 'TRENDING',
    title: 'Become a Generative AI Expert: Unlocking Creativity with Code',
    desc: 'Learn to harness the power of generative AI and build innovative solutions that drive business value.',
    duration: '3 Months',
    extra: 'AI Tools Access',
    accent: 'edtech-orange',
  },
  {
    id: 'ai-engineering',
    category: 'AI ENGINEERING',
    badge: 'NEW',
    tag: 'Popular',
    title: '10X AI Engineer Complete Program',
    desc: 'Transform from Python basics to production‑ready AI Engineer. Master LangChain, FastAPI, Vector DBs & Enterprise AI with real‑world projects.',
    duration: '7 Months',
    extra: '25+ AI Projects',
    accent: 'edtech-blue',
  },
  {
    id: 'ai-kids',
    category: 'AI FOR KIDS',
    badge: 'AGE 8‑16',
    title: '10x AI for Kids Program: Transform Your Child into an AI Creator',
    desc: 'Give your child a competitive advantage by mastering AI through fun, interactive projects that build real‑world skills.',
    duration: '10 Weeks',
    extra: 'Fun AI Projects',
    accent: 'edtech-green',
  },
  {
    id: 'agentic-ai',
    category: 'AGENTIC AI',
    badge: 'MOST POPULAR',
    tag: 'Popular',
    title: '10x Agentic AI and Automation Mastery',
    desc: 'Master autonomous AI agents and orchestrate complex workflows that operate independently to drive business value.',
    duration: '4 Months',
    extra: 'Advanced AI Projects',
    accent: 'edtech-orange',
  },
  {
    id: 'data-analytics-2',
    category: 'DATA ANALYTICS',
    badge: 'FEATURED',
    tag: 'Popular',
    title: '10x Data Analyst and AI Complete Certification with Microsoft',
    desc: 'Master data analysis, AI, and Microsoft tools with hands-on projects that prepare you for real‑world challenges.',
    duration: '6 Months',
    extra: '25+ Live Projects',
    accent: 'edtech-green',
  },
];

