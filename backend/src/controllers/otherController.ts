import { Request, Response } from 'express';
import { 
  FAQModel,
  MentorModel,
  MentorFeatureModel,
  CompanyLogoModel,
  AdvantageStatModel,
  TestimonialModel,
  CourseIconModel,
  IconCategoryModel,
  GeoDataModel
} from '../models';

// FAQ Controllers
export const getFAQs = async (req: Request, res: Response): Promise<void> => {
  try {
    const faqs = await FAQModel.find().sort({ id: 1 });
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mentor Controllers
export const getMentors = async (req: Request, res: Response): Promise<void> => {
  try {
    const mentors = await MentorModel.find();
    res.json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMentorFeatures = async (req: Request, res: Response): Promise<void> => {
  try {
    const features = await MentorFeatureModel.find();
    res.json(features);
  } catch (error) {
    console.error('Error fetching mentor features:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPartnerCompanies = async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await CompanyLogoModel.find();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching partner companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Statistics Controllers
export const getAdvantageStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await AdvantageStatModel.find();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching advantage stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Testimonial Controllers
export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await TestimonialModel.find();
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Icon Controllers
export const getCourseIcons = async (req: Request, res: Response): Promise<void> => {
  try {
    const icons = await CourseIconModel.find();
    
    // Convert to object format like frontend expects
    const iconsObject = icons.reduce((acc: any, icon: any) => {
      acc[icon.iconName] = icon.iconPath;
      return acc;
    }, {});
    
    res.json(iconsObject);
  } catch (error) {
    console.error('Error fetching course icons:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getIconCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await IconCategoryModel.find();
    
    // Convert to object format like frontend expects
    const categoriesObject = categories.reduce((acc: any, category: any) => {
      acc[category.category] = category.icons;
      return acc;
    }, {});
    
    res.json(categoriesObject);
  } catch (error) {
    console.error('Error fetching icon categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getIconByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { iconName } = req.params;
    const icon = await CourseIconModel.findOne({ iconName });
    
    if (!icon) {
      // Return default icon if not found
      const defaultIcon = await CourseIconModel.findOne({ iconName: 'default' });
      if (defaultIcon) {
        res.json({ iconPath: defaultIcon.iconPath });
        return;
      }
      res.status(404).json({ error: 'Icon not found' });
      return;
    }
    
    res.json({ iconPath: icon.iconPath });
  } catch (error) {
    console.error('Error fetching icon:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Geographic Data Controllers
export const getGeoData = async (req: Request, res: Response): Promise<void> => {
  try {
    const geoData = await GeoDataModel.findOne();
    
    if (!geoData) {
      res.status(404).json({ error: 'Geographic data not found' });
      return;
    }
    
    res.json(geoData);
  } catch (error) {
    console.error('Error fetching geo data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Combined endpoints for better performance
export const getMentorData = async (req: Request, res: Response): Promise<void> => {
  try {
    const [mentors, features, partnerCompanies] = await Promise.all([
      MentorModel.find(),
      MentorFeatureModel.find(),
      CompanyLogoModel.find()
    ]);
    
    res.json({
      mentors,
      mentorFeatures: features,
      partnerCompanies
    });
  } catch (error) {
    console.error('Error fetching mentor data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getIconsData = async (req: Request, res: Response): Promise<void> => {
  try {
    const [icons, categories] = await Promise.all([
      CourseIconModel.find(),
      IconCategoryModel.find()
    ]);
    
    // Convert to frontend expected format
    const iconsObject = icons.reduce((acc: any, icon: any) => {
      acc[icon.iconName] = icon.iconPath;
      return acc;
    }, {});
    
    const categoriesObject = categories.reduce((acc: any, category: any) => {
      acc[category.category] = category.icons;
      return acc;
    }, {});
    
    res.json({
      courseIcons: iconsObject,
      iconCategories: categoriesObject
    });
  } catch (error) {
    console.error('Error fetching icons data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
