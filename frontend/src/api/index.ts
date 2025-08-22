// API layer for backend server communications only
// UI utilities and third-party integrations remain in components

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
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

// Contact Form API - Submit contact form to backend
export const submitContactForm = async (formData: ContactFormData): Promise<ContactFormResponse> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData)
  // });
  // return response.json();
  
  // Temporary simulation
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form submitted:', formData);
      resolve({
        success: true,
        message: "Thank you! We'll contact you within 24 hours."
      });
    }, 1000);
  });
};

// Course Enrollment API - Submit course enrollment to backend
export const submitCourseEnrollment = async (enrollmentData: CourseEnrollmentData): Promise<CourseEnrollmentResponse> => {
  // TODO: Replace with actual API call when backend is ready
  // const response = await fetch('/api/course-enrollment', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(enrollmentData)
  // });
  // return response.json();
  
  // Temporary simulation
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Course enrollment submitted:', enrollmentData);
      resolve({
        success: true,
        message: `Thank you for your interest in ${enrollmentData.courseName}! Our team will contact you within 24 hours to discuss enrollment details.`,
        enrollmentId: `ENR-${Date.now()}`
      });
    }, 1200);
  });
};

// Future backend APIs to add:
// export const getCourses = async () => { ... }
// export const enrollInCourse = async (courseId: string) => { ... }
// export const authenticateUser = async (credentials) => { ... }
// export const getUser = async (userId: string) => { ... }
// export const updateProfile = async (profileData) => { ... }
