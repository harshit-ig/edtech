import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ApiResponse, AuthResponse, LoginCredentials, DashboardStats } from '../types';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  getAllUsers: async (): Promise<ApiResponse> => {
    const response = await api.get('/auth/users');
    return response.data;
  },

  createUser: async (userData: unknown): Promise<ApiResponse> => {
    const response = await api.post('/auth/users', userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/auth/users/${id}`);
    return response.data;
  },
};

// Admin API
export const adminApi = {
  // Dashboard
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  // Generic CRUD operations
  getAll: async (resource: string): Promise<ApiResponse> => {
    const response = await api.get(`/admin/${resource}`);
    return response.data;
  },

  getById: async (resource: string, id: string): Promise<ApiResponse> => {
    const response = await api.get(`/admin/${resource}/${id}`);
    return response.data;
  },

  create: async (resource: string, data: unknown): Promise<ApiResponse> => {
    const response = await api.post(`/admin/${resource}`, data);
    return response.data;
  },

  update: async (resource: string, id: string, data: unknown): Promise<ApiResponse> => {
    const response = await api.put(`/admin/${resource}/${id}`, data);
    return response.data;
  },

  delete: async (resource: string, id: string): Promise<ApiResponse> => {
    const response = await api.delete(`/admin/${resource}/${id}`);
    return response.data;
  },
};

// Specific resource APIs for better type safety
export const coursesApi = {
  getAll: () => adminApi.getAll('courses'),
  getById: (id: string) => adminApi.getById('courses', id),
  create: (data: unknown) => adminApi.create('courses', data),
  update: (id: string, data: unknown) => adminApi.update('courses', id, data),
  delete: (id: string) => adminApi.delete('courses', id),
};

export const courseDetailsApi = {
  getAll: () => adminApi.getAll('course-details'),
  getById: (id: string) => adminApi.getById('course-details', id),
  create: (data: unknown) => adminApi.create('course-details', data),
  update: (id: string, data: unknown) => adminApi.update('course-details', id, data),
  delete: (id: string) => adminApi.delete('course-details', id),
};

export const coursePricingApi = {
  getAll: () => adminApi.getAll('course-pricing'),
  getById: (id: string) => adminApi.getById('course-pricing', id),
  create: (data: unknown) => adminApi.create('course-pricing', data),
  update: (id: string, data: unknown) => adminApi.update('course-pricing', id, data),
  delete: (id: string) => adminApi.delete('course-pricing', id),
};

export const blogsApi = {
  getAll: () => adminApi.getAll('blogs'),
  getById: (id: string) => adminApi.getById('blogs', id),
  create: (data: unknown) => {
    // For multipart/form-data (file uploads)
    if (data instanceof FormData) {
      return api.post('/admin/blogs', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => response.data);
    }
    // For regular JSON data
    return adminApi.create('blogs', data);
  },
  update: (id: string, data: unknown) => {
    // For multipart/form-data (file uploads)
    if (data instanceof FormData) {
      return api.put(`/admin/blogs/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => response.data);
    }
    // For regular JSON data
    return adminApi.update('blogs', id, data);
  },
  delete: (id: string) => adminApi.delete('blogs', id),
};

export const teamMembersApi = {
  getAll: () => adminApi.getAll('team-members'),
  getById: (id: string) => adminApi.getById('team-members', id),
  create: (data: unknown) => {
    // For multipart/form-data (file uploads)
    if (data instanceof FormData) {
      return api.post('/admin/team-members', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => response.data);
    }
    // For regular JSON data
    return adminApi.create('team-members', data);
  },
  update: (id: string, data: unknown) => {
    // For multipart/form-data (file uploads)
    if (data instanceof FormData) {
      return api.put(`/admin/team-members/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => response.data);
    }
    // For regular JSON data
    return adminApi.update('team-members', id, data);
  },
  delete: (id: string) => adminApi.delete('team-members', id),
};

export const companyInfoApi = {
  getAll: () => adminApi.getAll('company-info'),
  getById: (id: string) => adminApi.getById('company-info', id),
  create: (data: unknown) => adminApi.create('company-info', data),
  update: (id: string, data: unknown) => adminApi.update('company-info', id, data),
  delete: (id: string) => adminApi.delete('company-info', id),
};

export const upcomingSkillsApi = {
  getAll: () => adminApi.getAll('upcoming-skills'),
  getById: (id: string) => adminApi.getById('upcoming-skills', id),
  create: (data: unknown) => adminApi.create('upcoming-skills', data),
  update: (id: string, data: unknown) => adminApi.update('upcoming-skills', id, data),
  delete: (id: string) => adminApi.delete('upcoming-skills', id),
};

export const valuesApi = {
  getAll: () => adminApi.getAll('values'),
  getById: (id: string) => adminApi.getById('values', id),
  create: (data: unknown) => adminApi.create('values', data),
  update: (id: string, data: unknown) => adminApi.update('values', id, data),
  delete: (id: string) => adminApi.delete('values', id),
};

export const statsApi = {
  getAll: () => adminApi.getAll('stats'),
  getById: (id: string) => adminApi.getById('stats', id),
  create: (data: unknown) => adminApi.create('stats', data),
  update: (id: string, data: unknown) => adminApi.update('stats', id, data),
  delete: (id: string) => adminApi.delete('stats', id),
};

export const milestonesApi = {
  getAll: () => adminApi.getAll('milestones'),
  getById: (id: string) => adminApi.getById('milestones', id),
  create: (data: unknown) => adminApi.create('milestones', data),
  update: (id: string, data: unknown) => adminApi.update('milestones', id, data),
  delete: (id: string) => adminApi.delete('milestones', id),
};

export const contactDataApi = {
  getAll: () => adminApi.getAll('contact-data'),
  getById: (id: string) => adminApi.getById('contact-data', id),
  create: (data: unknown) => adminApi.create('contact-data', data),
  update: (id: string, data: unknown) => adminApi.update('contact-data', id, data),
  delete: (id: string) => adminApi.delete('contact-data', id),
};

export const highlightedCountriesApi = {
  getAll: () => adminApi.getAll('highlighted-countries'),
  getById: (id: string) => adminApi.getById('highlighted-countries', id),
  create: (data: unknown) => adminApi.create('highlighted-countries', data),
  update: (id: string, data: unknown) => adminApi.update('highlighted-countries', id, data),
  delete: (id: string) => adminApi.delete('highlighted-countries', id),
};

export const mentorsApi = {
  getAll: () => adminApi.getAll('mentors'),
  getById: (id: string) => adminApi.getById('mentors', id),
  create: (data: unknown) => adminApi.create('mentors', data),
  update: (id: string, data: unknown) => adminApi.update('mentors', id, data),
  delete: (id: string) => adminApi.delete('mentors', id),
};

export const mentorFeaturesApi = {
  getAll: () => adminApi.getAll('mentor-features'),
  getById: (id: string) => adminApi.getById('mentor-features', id),
  create: (data: unknown) => adminApi.create('mentor-features', data),
  update: (id: string, data: unknown) => adminApi.update('mentor-features', id, data),
  delete: (id: string) => adminApi.delete('mentor-features', id),
};

export const companyLogosApi = {
  getAll: () => adminApi.getAll('company-logos'),
  getById: (id: string) => adminApi.getById('company-logos', id),
  create: (data: unknown) => adminApi.create('company-logos', data),
  update: (id: string, data: unknown) => adminApi.update('company-logos', id, data),
  delete: (id: string) => adminApi.delete('company-logos', id),
};

export const faqsApi = {
  getAll: () => adminApi.getAll('faqs'),
  getById: (id: string) => adminApi.getById('faqs', id),
  create: (data: unknown) => adminApi.create('faqs', data),
  update: (id: string, data: unknown) => adminApi.update('faqs', id, data),
  delete: (id: string) => adminApi.delete('faqs', id),
};

export const advantageStatsApi = {
  getAll: () => adminApi.getAll('advantage-stats'),
  getById: (id: string) => adminApi.getById('advantage-stats', id),
  create: (data: unknown) => adminApi.create('advantage-stats', data),
  update: (id: string, data: unknown) => adminApi.update('advantage-stats', id, data),
  delete: (id: string) => adminApi.delete('advantage-stats', id),
};

export const testimonialsApi = {
  getAll: () => adminApi.getAll('testimonials'),
  getById: (id: string) => adminApi.getById('testimonials', id),
  create: (data: unknown) => adminApi.create('testimonials', data),
  update: (id: string, data: unknown) => adminApi.update('testimonials', id, data),
  delete: (id: string) => adminApi.delete('testimonials', id),
};

// Icons API
export const iconsApi = {
  getAll: async (): Promise<ApiResponse> => {
    const response = await api.get('/icons/all');
    return response.data;
  },
  getCourseIcons: async (): Promise<Record<string, string>> => {
    const response = await api.get('/icons');
    return response.data;
  },
  getByName: async (iconName: string): Promise<ApiResponse> => {
    const response = await api.get(`/icons/${iconName}`);
    return response.data;
  },
  create: (data: unknown) => adminApi.create('course-icons', data),
  update: (id: string, data: unknown) => adminApi.update('course-icons', id, data),
  delete: (id: string) => adminApi.delete('course-icons', id),
};

export default api;
