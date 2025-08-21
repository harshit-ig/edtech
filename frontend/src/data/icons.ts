// Course icon library - SVG path strings
export const COURSE_ICONS = {
  // Data Analytics
  'bar-chart': 'M4 19V7m5 12V4m5 15V9m5 10V12',
  'chart-line': 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v16H4z',
  'pie-chart': 'M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c.79 0 1.57.1 2.31.29l-2.31 8.71L21 12z',
  
  // AI & Machine Learning
  'star-sparkle': 'M12 3l2.4 4.9L20 9l-4 3.9.9 5.6L12 16.8 7.1 18.5 8 13 4 9l5.6-1.1L12 3z',
  'brain': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'lightning': 'M13 10V3L4 14h7v7l9-11h-7z',
  'cpu': 'M19 12h2m-2 0a7 7 0 11-14 0 7 7 0 0114 0zM12 19v2m0-2a7 7 0 110-14 7 7 0 010 14zm0-16V1m0 2a7 7 0 110 14 7 7 0 010-14z',
  
  // Automation & Robots
  'robot': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'cog': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  'workflow': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  
  // Web Development
  'code': 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  'globe': 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  'desktop': 'M9 17v-2m3 2v-4m3 4v-6M9 3h6l6 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9l6-6z',
  
  // Business & Marketing
  'trending-up': 'M18 2.0845a1 1 0 011 1V17a1 1 0 01-2 0V4.4142L7.7071 13.7071a1 1 0 01-1.4142 0L2.2929 9.7071a1 1 0 011.4142-1.4142L8 12.5858 16.5858 4.0001H13a1 1 0 010-2h5z',
  'target': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'briefcase': 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
  
  // Default fallback
  'default': 'M13 10V3L4 14h7v7l9-11h-7z',
};

// Icon categories for easy browsing
export const ICON_CATEGORIES = {
  'data-analytics': ['bar-chart', 'chart-line', 'pie-chart'],
  'ai-ml': ['star-sparkle', 'brain', 'lightning', 'cpu'],
  'automation': ['robot', 'cog', 'workflow'],
  'web-dev': ['code', 'globe', 'desktop'],
  'business': ['trending-up', 'target', 'briefcase'],
};

// Helper function to get icon by name with fallback
export const getIcon = (iconName?: string): string => {
  if (!iconName) return COURSE_ICONS.default;
  return COURSE_ICONS[iconName as keyof typeof COURSE_ICONS] || COURSE_ICONS.default;
};

// Helper function to get suggested icons for a category
export const getSuggestedIcons = (category: string): string[] => {
  const categoryKey = category.toLowerCase().replace(/\s+/g, '-');
  return ICON_CATEGORIES[categoryKey as keyof typeof ICON_CATEGORIES] || ['default'];
};
