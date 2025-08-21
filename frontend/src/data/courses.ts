import { getIcon } from './icons';

export type Course = {
  id: string;
  category: string;
  badge: string;
  title: string;
  desc: string;
  duration: string;
  extra: string;
  accent: 'edtech-green' | 'edtech-orange' | 'edtech-red';
  iconName?: string; // Icon name from the icon library
};

// Helper function to get course icon
export const getCourseIcon = (course: Course): string => {
  return getIcon(course.iconName);
};

export const courses: Course[] = [
  {
    id: 'data-analytics',
    category: 'DATA ANALYTICS',
    badge: 'FEATURED',
    title: '10x Data Analyst and AI Complete Certification with Microsoft',
    desc: 'Master data analysis, AI, and Microsoft tools with hands-on projects that prepare you for real-world challenges.',
    duration: '6 Months',
    extra: '25+ Live Projects',
    accent: 'edtech-green',
    iconName: 'bar-chart', // Using icon name from library
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
    iconName: 'star-sparkle', // Using icon name from library
  },
  
  {
    id: 'agentic-ai',
    category: 'AGENTIC AI',
    badge: 'MOST POPULAR',
    title: '10x Agentic AI and Automation Mastery',
    desc: 'Master autonomous AI agents and orchestrate complex workflows that operate independently to drive business value.Master autonomous AI agents and orchestrate complex workflows that operate independently to drive business value.Master autonomous AI agents and orchestrate complex workflows that operate independently to drive business value.',
    duration: '4 Months',
    extra: 'Advanced AI Projects',
    accent: 'edtech-red',
    iconName: 'robot', // Using icon name from library
  },
  {
    id: 'data-analytics-2',
    category: 'DATA ANALYTICS',
    badge: 'FEATURED',
    title: '10x Data Analyst and AI Complete Certification with Microsoft',
    desc: 'Master data analysis, AI, and Microsoft tools with hands-on projects that prepare you for real‑world challenges.',
    duration: '6 Months',
    extra: '25+ Live Projects',
    accent: 'edtech-green',
    iconName: 'bar-chart', // Using icon name from library
  },
];

