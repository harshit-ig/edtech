import { Request, Response } from 'express';
import { CourseModel, CourseDetailsModel, CoursePricingModel } from '../models';

// Get all courses
export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get featured courses
export const getFeaturedCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await CourseModel.find({ featured: true }).limit(6);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get course by ID
export const getCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findOne({ id });
    
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get course details by ID
export const getCourseDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const courseDetails = await CourseDetailsModel.findOne({ courseId: id });
    
    if (!courseDetails) {
      // If no specific details found, get basic course info for default details
      const course = await CourseModel.findOne({ id });
      if (!course) {
        res.status(404).json({ error: 'Course not found' });
        return;
      }
      
      // Return default course details structure
      const defaultDetails = {
        overview: course.desc + " This comprehensive program combines theoretical knowledge with practical, hands-on experience to ensure you're job-ready upon completion.",
        curriculum: [
          {
            module: "Module 1: Foundations",
            duration: "4 weeks",
            topics: ["Core Concepts", "Industry Overview", "Tools Introduction", "Best Practices"]
          },
          {
            module: "Module 2: Practical Application", 
            duration: "6 weeks",
            topics: ["Hands-on Projects", "Real-world Scenarios", "Problem Solving", "Case Studies"]
          },
          {
            module: "Module 3: Advanced Techniques",
            duration: "4 weeks", 
            topics: ["Advanced Concepts", "Optimization", "Performance", "Scaling"]
          },
          {
            module: "Module 4: Professional Development",
            duration: "2 weeks",
            topics: ["Portfolio Building", "Career Preparation", "Interview Skills", "Industry Networking"]
          }
        ],
        tools: [
          { name: "Industry-standard tools", icon: "🛠️" },
          { name: "Modern frameworks", icon: "⚡" },
          { name: "Professional software", icon: "💻" },
          { name: "Cloud platforms", icon: "☁️" }
        ],
        prerequisites: "Basic computer literacy and enthusiasm to learn",
        testimonials: [],
        successStats: [],
        pricing: {
          current: 1999,
          original: 2999,
          discount: "33% OFF",
          deadline: "Limited Time",
          features: [
            { text: "Live sessions", icon: "🎥" },
            { text: "Recorded content", icon: "📹" },
            { text: "Projects", icon: "💻" },
            { text: "Mentorship", icon: "👨‍🏫" },
            { text: "Certificate", icon: "🏆" }
          ]
        },
        courseInfo: {
          startDate: "Flexible Start",
          format: "Online",
          support: "Expert Support",
          studentsEnrolled: "Join Today"
        },
        trustIndicators: {
          rating: "4.8/5",
          reviewCount: "100+ reviews",
          testimonialPreview: {
            text: "Great course with practical skills!",
            author: "Student Review"
          }
        }
      };
      
      res.json(defaultDetails);
      return;
    }
    
    res.json(courseDetails);
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all course pricing
export const getCoursePricing = async (req: Request, res: Response): Promise<void> => {
  try {
    const pricing = await CoursePricingModel.find();
    res.json(pricing);
  } catch (error) {
    console.error('Error fetching course pricing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get course pricing by ID
export const getCoursePricingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const pricing = await CoursePricingModel.findOne({ id });
    
    if (!pricing) {
      res.status(404).json({ error: 'Course pricing not found' });
      return;
    }
    
    res.json(pricing);
  } catch (error) {
    console.error('Error fetching course pricing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
