import { Router } from 'express';
import { requireAdminAuth } from '../middleware/auth';
import { createAdminRateLimiter, uploadBlogImages, handleUploadError } from '../middleware';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blogAdminController';
import {
  // Course routes
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  
  // Course Details routes
  getAllCourseDetails,
  getCourseDetailsById,
  createCourseDetails,
  updateCourseDetails,
  deleteCourseDetails,
  
  // Course Pricing routes
  getAllCoursePricing,
  getCoursePricingById,
  createCoursePricing,
  updateCoursePricing,
  deleteCoursePricing,
  
  // Company Info routes
  getAllCompanyInfo,
  getCompanyInfoById,
  createCompanyInfo,
  updateCompanyInfo,
  deleteCompanyInfo,
  
  // Team Member routes
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  
  // Value routes
  getAllValues,
  getValueById,
  createValue,
  updateValue,
  deleteValue,
  
  // Stat routes
  getAllStats,
  getStatById,
  createStat,
  updateStat,
  deleteStat,
  
  // Milestone routes
  getAllMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
  
  // Contact Data routes
  getAllContactData,
  getContactDataById,
  createContactData,
  updateContactData,
  deleteContactData,
  
  // Upcoming Skill routes
  getAllUpcomingSkills,
  getUpcomingSkillById,
  createUpcomingSkill,
  updateUpcomingSkill,
  deleteUpcomingSkill,
  
  // Dashboard
  getDashboardStats
} from '../controllers/adminController';

const router = Router();

// Apply admin-specific rate limiter (very lenient or disabled for admins)
router.use(createAdminRateLimiter());

// Apply admin authentication to all routes
router.use(requireAdminAuth);

/**
 * Dashboard Statistics
 * @route GET /api/admin/dashboard/stats
 */
router.get('/dashboard/stats', getDashboardStats);

/**
 * Courses CRUD Routes
 */
router.get('/courses', getAllCourses);
router.get('/courses/:id', getCourseById);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

/**
 * Course Details CRUD Routes
 */
router.get('/course-details', getAllCourseDetails);
router.get('/course-details/:id', getCourseDetailsById);
router.post('/course-details', createCourseDetails);
router.put('/course-details/:id', updateCourseDetails);
router.delete('/course-details/:id', deleteCourseDetails);

/**
 * Course Pricing CRUD Routes
 */
router.get('/course-pricing', getAllCoursePricing);
router.get('/course-pricing/:id', getCoursePricingById);
router.post('/course-pricing', createCoursePricing);
router.put('/course-pricing/:id', updateCoursePricing);
router.delete('/course-pricing/:id', deleteCoursePricing);

/**
 * Blog Posts CRUD Routes with File Upload Support
 */
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs', uploadBlogImages, handleUploadError, createBlog);
router.put('/blogs/:id', uploadBlogImages, handleUploadError, updateBlog);
router.delete('/blogs/:id', deleteBlog);

/**
 * Company Info CRUD Routes
 */
router.get('/company-info', getAllCompanyInfo);
router.get('/company-info/:id', getCompanyInfoById);
router.post('/company-info', createCompanyInfo);
router.put('/company-info/:id', updateCompanyInfo);
router.delete('/company-info/:id', deleteCompanyInfo);

/**
 * Team Members CRUD Routes
 */
router.get('/team-members', getAllTeamMembers);
router.get('/team-members/:id', getTeamMemberById);
router.post('/team-members', createTeamMember);
router.put('/team-members/:id', updateTeamMember);
router.delete('/team-members/:id', deleteTeamMember);

/**
 * Values CRUD Routes
 */
router.get('/values', getAllValues);
router.get('/values/:id', getValueById);
router.post('/values', createValue);
router.put('/values/:id', updateValue);
router.delete('/values/:id', deleteValue);

/**
 * Stats CRUD Routes
 */
router.get('/stats', getAllStats);
router.get('/stats/:id', getStatById);
router.post('/stats', createStat);
router.put('/stats/:id', updateStat);
router.delete('/stats/:id', deleteStat);

/**
 * Milestones CRUD Routes
 */
router.get('/milestones', getAllMilestones);
router.get('/milestones/:id', getMilestoneById);
router.post('/milestones', createMilestone);
router.put('/milestones/:id', updateMilestone);
router.delete('/milestones/:id', deleteMilestone);

/**
 * Contact Data CRUD Routes
 */
router.get('/contact-data', getAllContactData);
router.get('/contact-data/:id', getContactDataById);
router.post('/contact-data', createContactData);
router.put('/contact-data/:id', updateContactData);
router.delete('/contact-data/:id', deleteContactData);

/**
 * Upcoming Skills CRUD Routes
 */
router.get('/upcoming-skills', getAllUpcomingSkills);
router.get('/upcoming-skills/:id', getUpcomingSkillById);
router.post('/upcoming-skills', createUpcomingSkill);
router.put('/upcoming-skills/:id', updateUpcomingSkill);
router.delete('/upcoming-skills/:id', deleteUpcomingSkill);

export default router;
