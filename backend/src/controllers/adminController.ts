import { Request, Response } from 'express';
import {
  CourseModel,
  CourseDetailsModel,
  CoursePricingModel,
  BlogPostModel,
  CompanyInfoModel,
  TeamMemberModel,
  ValueModel,
  StatModel,
  MilestoneModel,
  ContactDataModel,
  UpcomingSkillModel,
  HighlightedCountriesModel,
  MentorModel,
  MentorFeatureModel,
  CompanyLogoModel,
  FAQModel,
  AdvantageStatModel,
  TestimonialModel
} from '../models';

// Generic CRUD operations for any model
class AdminController {
  
  /**
   * Generic GET all items for a model
   */
  static getAll = (Model: any) => async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await Model.find({}).sort({ createdAt: -1 });
      res.json({
        success: true,
        message: `${Model.modelName} items retrieved successfully.`,
        data: items
      });
    } catch (error: any) {
      console.error(`Get all ${Model.modelName} error:`, error);
      res.status(500).json({
        success: false,
        message: `Server error while retrieving ${Model.modelName} items.`
      });
    }
  };

  /**
   * Generic GET single item by ID
   */
  static getById = (Model: any) => async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await Model.findById(id);
      
      if (!item) {
        res.status(404).json({
          success: false,
          message: `${Model.modelName} not found.`
        });
        return;
      }

      res.json({
        success: true,
        message: `${Model.modelName} retrieved successfully.`,
        data: item
      });
    } catch (error: any) {
      console.error(`Get ${Model.modelName} by ID error:`, error);
      res.status(500).json({
        success: false,
        message: `Server error while retrieving ${Model.modelName}.`
      });
    }
  };

  /**
   * Generic CREATE item
   */
  static create = (Model: any) => async (req: Request, res: Response): Promise<void> => {
    try {
      const item = new Model(req.body);
      await item.save();

      res.status(201).json({
        success: true,
        message: `${Model.modelName} created successfully.`,
        data: item
      });
    } catch (error: any) {
      console.error(`Create ${Model.modelName} error:`, error);
      
      if (error.code === 11000) {
        res.status(409).json({
          success: false,
          message: `${Model.modelName} with this identifier already exists.`
        });
        return;
      }

      res.status(400).json({
        success: false,
        message: `Invalid data for ${Model.modelName} creation.`,
        error: error.message
      });
    }
  };

  /**
   * Generic UPDATE item by ID
   */
  static update = (Model: any) => async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await Model.findByIdAndUpdate(id, req.body, { 
        new: true, 
        runValidators: true 
      });
      
      if (!item) {
        res.status(404).json({
          success: false,
          message: `${Model.modelName} not found.`
        });
        return;
      }

      res.json({
        success: true,
        message: `${Model.modelName} updated successfully.`,
        data: item
      });
    } catch (error: any) {
      console.error(`Update ${Model.modelName} error:`, error);
      res.status(400).json({
        success: false,
        message: `Invalid data for ${Model.modelName} update.`,
        error: error.message
      });
    }
  };

  /**
   * Generic DELETE item by ID
   */
  static delete = (Model: any) => async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await Model.findByIdAndDelete(id);
      
      if (!item) {
        res.status(404).json({
          success: false,
          message: `${Model.modelName} not found.`
        });
        return;
      }

      res.json({
        success: true,
        message: `${Model.modelName} deleted successfully.`
      });
    } catch (error: any) {
      console.error(`Delete ${Model.modelName} error:`, error);
      res.status(500).json({
        success: false,
        message: `Server error while deleting ${Model.modelName}.`
      });
    }
  };
}

// Course Controllers
export const getAllCourses = AdminController.getAll(CourseModel);
export const getCourseById = AdminController.getById(CourseModel);
export const createCourse = AdminController.create(CourseModel);
export const updateCourse = AdminController.update(CourseModel);
export const deleteCourse = AdminController.delete(CourseModel);

// Course Details Controllers
export const getAllCourseDetails = AdminController.getAll(CourseDetailsModel);
export const getCourseDetailsById = AdminController.getById(CourseDetailsModel);
export const createCourseDetails = AdminController.create(CourseDetailsModel);
export const updateCourseDetails = AdminController.update(CourseDetailsModel);
export const deleteCourseDetails = AdminController.delete(CourseDetailsModel);

// Course Pricing Controllers
export const getAllCoursePricing = AdminController.getAll(CoursePricingModel);
export const getCoursePricingById = AdminController.getById(CoursePricingModel);
export const createCoursePricing = AdminController.create(CoursePricingModel);
export const updateCoursePricing = AdminController.update(CoursePricingModel);
export const deleteCoursePricing = AdminController.delete(CoursePricingModel);

// Blog Controllers
export const getAllBlogs = AdminController.getAll(BlogPostModel);
export const getBlogById = AdminController.getById(BlogPostModel);
export const createBlog = AdminController.create(BlogPostModel);
export const updateBlog = AdminController.update(BlogPostModel);
export const deleteBlog = AdminController.delete(BlogPostModel);

// Company Info Controllers
export const getAllCompanyInfo = AdminController.getAll(CompanyInfoModel);
export const getCompanyInfoById = AdminController.getById(CompanyInfoModel);
export const createCompanyInfo = AdminController.create(CompanyInfoModel);
export const updateCompanyInfo = AdminController.update(CompanyInfoModel);
export const deleteCompanyInfo = AdminController.delete(CompanyInfoModel);

// Team Member Controllers
export const getAllTeamMembers = AdminController.getAll(TeamMemberModel);
export const getTeamMemberById = AdminController.getById(TeamMemberModel);
export const createTeamMember = AdminController.create(TeamMemberModel);
export const updateTeamMember = AdminController.update(TeamMemberModel);
export const deleteTeamMember = AdminController.delete(TeamMemberModel);

// Value Controllers
export const getAllValues = AdminController.getAll(ValueModel);
export const getValueById = AdminController.getById(ValueModel);
export const createValue = AdminController.create(ValueModel);
export const updateValue = AdminController.update(ValueModel);
export const deleteValue = AdminController.delete(ValueModel);

// Stat Controllers
export const getAllStats = AdminController.getAll(StatModel);
export const getStatById = AdminController.getById(StatModel);
export const createStat = AdminController.create(StatModel);
export const updateStat = AdminController.update(StatModel);
export const deleteStat = AdminController.delete(StatModel);

// Milestone Controllers
export const getAllMilestones = AdminController.getAll(MilestoneModel);
export const getMilestoneById = AdminController.getById(MilestoneModel);
export const createMilestone = AdminController.create(MilestoneModel);
export const updateMilestone = AdminController.update(MilestoneModel);
export const deleteMilestone = AdminController.delete(MilestoneModel);

// Contact Data Controllers
export const getAllContactData = AdminController.getAll(ContactDataModel);
export const getContactDataById = AdminController.getById(ContactDataModel);
export const createContactData = AdminController.create(ContactDataModel);
export const updateContactData = AdminController.update(ContactDataModel);
export const deleteContactData = AdminController.delete(ContactDataModel);

// Upcoming Skill Controllers
export const getAllUpcomingSkills = AdminController.getAll(UpcomingSkillModel);
export const getUpcomingSkillById = AdminController.getById(UpcomingSkillModel);
export const createUpcomingSkill = AdminController.create(UpcomingSkillModel);
export const updateUpcomingSkill = AdminController.update(UpcomingSkillModel);
export const deleteUpcomingSkill = AdminController.delete(UpcomingSkillModel);

// Highlighted Countries Controllers
export const getAllHighlightedCountries = AdminController.getAll(HighlightedCountriesModel);
export const getHighlightedCountriesById = AdminController.getById(HighlightedCountriesModel);
export const createHighlightedCountries = AdminController.create(HighlightedCountriesModel);
export const updateHighlightedCountries = AdminController.update(HighlightedCountriesModel);
export const deleteHighlightedCountries = AdminController.delete(HighlightedCountriesModel);

// Mentor Controllers
export const getAllMentors = AdminController.getAll(MentorModel);
export const getMentorById = AdminController.getById(MentorModel);
export const createMentor = AdminController.create(MentorModel);
export const updateMentor = AdminController.update(MentorModel);
export const deleteMentor = AdminController.delete(MentorModel);

// Mentor Feature Controllers
export const getAllMentorFeatures = AdminController.getAll(MentorFeatureModel);
export const getMentorFeatureById = AdminController.getById(MentorFeatureModel);
export const createMentorFeature = AdminController.create(MentorFeatureModel);
export const updateMentorFeature = AdminController.update(MentorFeatureModel);
export const deleteMentorFeature = AdminController.delete(MentorFeatureModel);

// Company Logo Controllers
export const getAllCompanyLogos = AdminController.getAll(CompanyLogoModel);
export const getCompanyLogoById = AdminController.getById(CompanyLogoModel);
export const createCompanyLogo = AdminController.create(CompanyLogoModel);
export const updateCompanyLogo = AdminController.update(CompanyLogoModel);
export const deleteCompanyLogo = AdminController.delete(CompanyLogoModel);

// FAQ Controllers
export const getAllFAQs = AdminController.getAll(FAQModel);
export const getFAQById = AdminController.getById(FAQModel);
export const createFAQ = AdminController.create(FAQModel);
export const updateFAQ = AdminController.update(FAQModel);
export const deleteFAQ = AdminController.delete(FAQModel);

// Advantage Stat Controllers
export const getAllAdvantageStats = AdminController.getAll(AdvantageStatModel);
export const getAdvantageStatById = AdminController.getById(AdvantageStatModel);
export const createAdvantageStat = AdminController.create(AdvantageStatModel);
export const updateAdvantageStat = AdminController.update(AdvantageStatModel);
export const deleteAdvantageStat = AdminController.delete(AdvantageStatModel);

// Testimonial Controllers
export const getAllTestimonials = AdminController.getAll(TestimonialModel);
export const getTestimonialById = AdminController.getById(TestimonialModel);
export const createTestimonial = AdminController.create(TestimonialModel);
export const updateTestimonial = AdminController.update(TestimonialModel);
export const deleteTestimonial = AdminController.delete(TestimonialModel);

/**
 * Dashboard statistics
 */
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      coursesCount,
      courseDetailsCount,
      coursePricingCount,
      blogsCount,
      teamMembersCount,
      upcomingSkillsCount
    ] = await Promise.all([
      CourseModel.countDocuments(),
      CourseDetailsModel.countDocuments(),
      CoursePricingModel.countDocuments(),
      BlogPostModel.countDocuments(),
      TeamMemberModel.countDocuments(),
      UpcomingSkillModel.countDocuments()
    ]);

    res.json({
      success: true,
      message: 'Dashboard statistics retrieved successfully.',
      data: {
        courses: coursesCount,
        courseDetails: courseDetailsCount,
        coursePricing: coursePricingCount,
        blogs: blogsCount,
        teamMembers: teamMembersCount,
        upcomingSkills: upcomingSkillsCount,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving dashboard statistics.'
    });
  }
};
