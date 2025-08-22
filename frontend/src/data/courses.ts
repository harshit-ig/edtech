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
    id: 'data-science-masters',
    category: 'DATA SCIENCE',
    badge: 'TRENDING',
    title: 'Master of Science in Data Analytics - Complete Program',
    desc: 'Comprehensive masters-level program covering advanced machine learning, AI ethics, MLOps, business strategy, and capstone research project.',
    duration: '24 Months',
    extra: '185+ Lessons',
    accent: 'edtech-green',
    iconName: 'graduation-cap',
    featured: true,
  },
  {
    id: 'gen-ai',
    category: 'GENERATIVE AI',
    badge: 'TRENDING',
    title: 'Become a Generative AI Expert: Unlocking Creativity with Code',
    desc: 'Learn to harness the power of generative AI and build innovative solutions that drive business value.',
    duration: '3 Months',
    extra: '25+ Projects',
    accent: 'edtech-orange',
    iconName: 'star-sparkle',
    featured: true,
  }
];

// Helper function to get featured courses for homepage
export const getFeaturedCourses = (): Course[] => {
  return courses.filter(course => course.featured).slice(0, 6);
};

// Helper function to get all courses for courses page
export const getAllCourses = (): Course[] => {
  return courses;
};

