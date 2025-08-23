// API layer for backend server communications only
// UI utilities and third-party integrations remain in components

// NoCodeAPI Google Sheets configuration
const GOOGLE_SHEETS_API_BASE = 'https://v1.nocodeapi.com/harshitig/google_sheets/qjpIHLdbQIlkotdA';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

export interface CourseEnrollmentData {
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  courseName: string;
  courseCategory?: string;
  source?: string; // Where the enrollment came from (home, courses-page, course-details, etc.)
}

export interface CourseEnrollmentResponse {
  success: boolean;
  message: string;
  enrollmentId?: string;
}

// Contact Form API - Submit contact form to Google Sheets (call sheet)
export const submitContactForm = async (formData: ContactFormData): Promise<ContactFormResponse> => {
  try {
    const response = await fetch(`${GOOGLE_SHEETS_API_BASE}?tabId=call`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        [
          formData.fullName,
          formData.email,
          formData.phone || '',
          formData.subject || '',
          formData.message || '',
          new Date().toISOString(),
          'Contact Form'
        ]
      ])
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await response.json();
    
    return {
      success: true,
      message: `Thank you ${formData.fullName}! We'll contact you within 24 hours.`
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error submitting your form. Please try again.'
    };
  }
};

// Course Enrollment API - Submit course enrollment to Google Sheets (course sheet)
export const submitCourseEnrollment = async (enrollmentData: CourseEnrollmentData): Promise<CourseEnrollmentResponse> => {
  try {
    const response = await fetch(`${GOOGLE_SHEETS_API_BASE}?tabId=course`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        [
          enrollmentData.fullName,
          enrollmentData.email,
          enrollmentData.phone,
          enrollmentData.courseId,
          enrollmentData.courseName,
          enrollmentData.courseCategory || '',
          enrollmentData.source || '',
          new Date().toISOString(),
          'Course Enrollment'
        ]
      ])
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await response.json();
    
    return {
      success: true,
      message: `Thank you for your interest in ${enrollmentData.courseName}! Our team will contact you within 24 hours to discuss enrollment details.`,
      enrollmentId: `ENR-${Date.now()}`
    };
  } catch (error) {
    console.error('Course enrollment submission error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error processing your enrollment. Please try again.'
    };
  }
};

// Backend API Configuration
const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? 'https://your-production-api.com/api' 
  : '/api'; // Use proxy in development

// Generic API error handling
interface APIError {
  status: number;
  message: string;
  name: string;
}

const createAPIError = (status: number, message: string): APIError => ({
  status,
  message,
  name: 'APIError'
});

// Generic fetch wrapper with error handling
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const apiError = createAPIError(response.status, `API Error: ${response.statusText}`);
      throw new Error(apiError.message);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message.includes('API Error:')) {
      throw error;
    }
    console.error(`API request failed for ${endpoint}:`, error);
    throw new Error('Network error occurred. Please check your connection.');
  }
};

// ===== COMPANY & ABOUT DATA APIs =====

export const getCompanyInfo = async () => {
  return apiRequest<any>('/company/info');
};

export const getTeamMembers = async () => {
  return apiRequest<any>('/company/team');
};

export const getCompanyValues = async () => {
  return apiRequest<any>('/company/values');
};

export const getAboutStats = async () => {
  return apiRequest<any>('/company/stats');
};

export const getCompanyMilestones = async () => {
  return apiRequest<any>('/company/milestones');
};

export const getContactData = async () => {
  return apiRequest<any>('/company/contact');
};

export const getUpcomingSkills = async () => {
  return apiRequest<any>('/company/skills');
};

export const getHighlightedCountries = async () => {
  return apiRequest<any>('/company/countries');
};

// Combined about data endpoint
export const getAboutData = async () => {
  return apiRequest<any>('/company/about');
};

// ===== COURSES APIs =====

export const getAllCourses = async () => {
  return apiRequest<any>('/courses');
};

export const getFeaturedCourses = async () => {
  return apiRequest<any>('/courses/featured');
};

export const getCourseById = async (courseId: string) => {
  return apiRequest<any>(`/courses/${courseId}`);
};

export const getCourseDetails = async (courseId: string) => {
  return apiRequest<any>(`/courses/${courseId}/details`);
};

export const getCoursePricing = async () => {
  return apiRequest<any>('/courses/pricing/all');
};

export const getCoursePricingById = async (courseId: string) => {
  return apiRequest<any>(`/courses/pricing/${courseId}`);
};

// ===== BLOG APIs =====

export const getAllBlogPosts = async (params?: {
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) => {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.append('category', params.category);
  if (params?.featured) searchParams.append('featured', 'true');
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.offset) searchParams.append('offset', params.offset.toString());
  
  const query = searchParams.toString();
  return apiRequest<any>(`/blog${query ? `?${query}` : ''}`);
};

export const getBlogPostBySlug = async (slug: string) => {
  return apiRequest<any>(`/blog/slug/${slug}`);
};

export const getBlogPostById = async (postId: string) => {
  return apiRequest<any>(`/blog/id/${postId}`);
};

export const getFeaturedBlogPosts = async () => {
  return apiRequest<any>('/blog/featured');
};

export const getBlogCategories = async () => {
  return apiRequest<any>('/blog/categories');
};

export const getPostsByCategory = async (category: string) => {
  return apiRequest<any>(`/blog/category/${category}`);
};

export const getRelatedPosts = async (slug: string, limit = 3) => {
  return apiRequest<any>(`/blog/slug/${slug}/related?limit=${limit}`);
};

// ===== OTHER DATA APIs =====

export const getFAQs = async () => {
  return apiRequest<any>('/faqs');
};

export const getMentors = async () => {
  return apiRequest<any>('/mentors');
};

export const getMentorFeatures = async () => {
  return apiRequest<any>('/mentors/features');
};

export const getPartnerCompanies = async () => {
  return apiRequest<any>('/mentors/companies');
};

// Combined mentor data
export const getMentorData = async () => {
  return apiRequest<any>('/mentors/all');
};

export const getAdvantageStats = async () => {
  return apiRequest<any>('/stats');
};

export const getTestimonials = async () => {
  return apiRequest<any>('/testimonials');
};

export const getCourseIcons = async () => {
  return apiRequest<any>('/icons');
};

export const getIconByName = async (iconName: string) => {
  return apiRequest<any>(`/icons/${iconName}`);
};

// Combined icons data
export const getIconsData = async () => {
  return apiRequest<any>('/icons/all');
};

export const getGeoData = async () => {
  return apiRequest<any>('/geo');
};

// ===== HELPER FUNCTIONS (maintain frontend compatibility) =====

// Helper functions that mirror the frontend data utilities
export const getIcon = async (iconName?: string): Promise<string> => {
  try {
    if (!iconName) {
      const icons = await getCourseIcons();
      return icons.default || 'M13 10V3L4 14h7v7l9-11h-7z';
    }
    
    const icons = await getCourseIcons();
    return icons[iconName] || icons.default || 'M13 10V3L4 14h7v7l9-11h-7z';
  } catch (error) {
    console.error('Error fetching icon:', error);
    return 'M13 10V3L4 14h7v7l9-11h-7z'; // fallback icon
  }
};

// Legacy compatibility functions
export const getCourseIcon = async (course: { iconName?: string }): Promise<string> => {
  return getIcon(course.iconName);
};

// Helper for getting specific data with fallbacks
export const getPostBySlug = async (slug: string) => {
  return getBlogPostBySlug(slug);
};

// Health check endpoint
export const healthCheck = async () => {
  return apiRequest<any>('/health');
};
