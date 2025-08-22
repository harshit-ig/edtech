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

// Future backend APIs to add:
// export const getCourses = async () => { ... }
// export const enrollInCourse = async (courseId: string) => { ... }
// export const authenticateUser = async (credentials) => { ... }
// export const getUser = async (userId: string) => { ... }
// export const updateProfile = async (profileData) => { ... }
