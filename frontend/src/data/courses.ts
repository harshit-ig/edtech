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
  featured?: boolean; // Mark courses as featured for homepage display
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
    iconName: 'bar-chart',
    featured: true,
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
    iconName: 'star-sparkle',
    featured: true,
  },
  {
    id: 'agentic-ai',
    category: 'AGENTIC AI',
    badge: 'MOST POPULAR',
    title: '10x Agentic AI and Automation Mastery',
    desc: 'Master autonomous AI agents and orchestrate complex workflows that operate independently to drive business value.',
    duration: '4 Months',
    extra: 'Advanced AI Projects',
    accent: 'edtech-red',
    iconName: 'robot',
    featured: true,
  },
  {
    id: 'web-development',
    category: 'WEB DEVELOPMENT',
    badge: 'NEW',
    title: 'Full Stack Web Development Bootcamp',
    desc: 'Learn modern web development with React, Node.js, and cloud deployment. Build real-world applications.',
    duration: '5 Months',
    extra: '15+ Projects',
    accent: 'edtech-green',
    iconName: 'code',
    featured: false,
  },
  {
    id: 'mobile-development',
    category: 'MOBILE DEVELOPMENT',
    badge: 'POPULAR',
    title: 'React Native Mobile App Development',
    desc: 'Create cross-platform mobile applications with React Native and modern development practices.',
    duration: '4 Months',
    extra: '10+ Apps',
    accent: 'edtech-orange',
    iconName: 'mobile',
    featured: false,
  },
  {
    id: 'cloud-computing',
    category: 'CLOUD COMPUTING',
    badge: 'HOT',
    title: 'AWS Cloud Architect Certification',
    desc: 'Master cloud architecture and deployment with AWS services. Prepare for industry certifications.',
    duration: '3 Months',
    extra: 'AWS Certified',
    accent: 'edtech-green',
    iconName: 'cloud',
    featured: false,
  },
  {
    id: 'cybersecurity',
    category: 'CYBERSECURITY',
    badge: 'FEATURED',
    title: 'Ethical Hacking & Cybersecurity',
    desc: 'Learn cybersecurity fundamentals, penetration testing, and ethical hacking methodologies.',
    duration: '6 Months',
    extra: '20+ Labs',
    accent: 'edtech-orange',
    iconName: 'shield',
    featured: false,
  },
];

// Helper function to get featured courses for homepage
export const getFeaturedCourses = (): Course[] => {
  return courses.filter(course => course.featured).slice(0, 6);
};

// Helper function to get all courses for courses page
export const getAllCourses = (): Course[] => {
  return courses;
};

