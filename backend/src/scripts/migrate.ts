import dotenv from 'dotenv';
import { connectDatabase, closeDatabase } from '../utils/database';
import * as models from '../models';

// Import all data from organized data files
import {
  teamMembers,
  companyValues,
  aboutStats,
  companyMilestones,
  contactData,
  companyInfo,
  upcomingSkills,
  highlightedCountries
} from './data/about';

import { blogPosts } from './data/blog';
import { courses } from './data/courses';
import { courseDetails } from './data/courseDetails';
import { faqs } from './data/faq';
import { courseIcons } from './data/icons';
import { mentors, partnerCompanies } from './data/mentors';
import { coursePricing } from './data/pricing';
import { advantageStats } from './data/stats';
import { testimonials } from './data/testimonials';

// Load environment variables
dotenv.config();

// Comprehensive migration function
async function migrateData(): Promise<void> {
  console.log('🚀 Starting comprehensive data migration...');

  try {
    // Connect to database
    await connectDatabase();

    // Clear all existing data
    console.log('🧹 Clearing all existing data...');
    await Promise.all([
      models.CompanyInfoModel.deleteMany({}),
      models.TeamMemberModel.deleteMany({}),
      models.ValueModel.deleteMany({}),
      models.StatModel.deleteMany({}),
      models.MilestoneModel.deleteMany({}),
      models.ContactDataModel.deleteMany({}),
      models.UpcomingSkillModel.deleteMany({}),
      models.HighlightedCountriesModel.deleteMany({}),
      models.CourseModel.deleteMany({}),
      models.FAQModel.deleteMany({}),
      models.CourseIconModel.deleteMany({}),
      models.BlogPostModel.deleteMany({}),
      models.TestimonialModel.deleteMany({}),
      models.MentorModel.deleteMany({}),
      models.AdvantageStatModel.deleteMany({}),
      models.CoursePricingModel.deleteMany({}),
      models.CourseDetailsModel.deleteMany({}),
      models.MentorFeatureModel.deleteMany({}),
      models.CompanyLogoModel.deleteMany({})
    ]);

    // Insert company data
    console.log('📊 Migrating company data...');
    await models.CompanyInfoModel.create(companyInfo);
    await models.TeamMemberModel.insertMany(teamMembers);
    await models.ValueModel.insertMany(companyValues);
    await models.StatModel.insertMany(aboutStats);
    await models.MilestoneModel.insertMany(companyMilestones);
    const contactDataResult = await models.ContactDataModel.create(contactData);
    console.log('📞 Contact Data inserted:', contactDataResult._id);
    await models.UpcomingSkillModel.insertMany(upcomingSkills);
    await models.HighlightedCountriesModel.create({ countries: highlightedCountries });

    // Insert course data
    console.log('🎓 Migrating course data...');
    await models.CourseModel.insertMany(courses);
    await models.CourseDetailsModel.insertMany(courseDetails);
    await models.CoursePricingModel.insertMany(coursePricing);

    // Insert FAQ data
    console.log('❓ Migrating FAQ data...');
    await models.FAQModel.insertMany(faqs);

    // Insert icons data
    console.log('🎨 Migrating icons data...');
    await models.CourseIconModel.insertMany(courseIcons);

    // Insert blog posts
    console.log('📝 Migrating blog posts...');
    await models.BlogPostModel.insertMany(blogPosts);

    // Insert testimonials
    console.log('💬 Migrating testimonials...');
    await models.TestimonialModel.insertMany(testimonials);

    // Insert mentors
    console.log('👨‍🏫 Migrating mentors...');
    await models.MentorModel.insertMany(mentors);

    // Insert advantage stats
    console.log('📊 Migrating advantage statistics...');
    await models.AdvantageStatModel.insertMany(advantageStats);

    // Insert mentor features (dummy data)
    console.log('🌟 Migrating mentor features...');
    const mentorFeaturesData = [
      {
        icon: '🎯',
        title: 'Personalized Guidance',
        description: 'Get customized learning paths tailored to your career goals and current skill level.'
      },
      {
        icon: '💼',
        title: 'Industry Connections',
        description: 'Access our network of 500+ industry professionals and hiring managers.'
      },
      {
        icon: '📈',
        title: 'Career Acceleration',
        description: 'Our mentees see 3x faster career growth compared to traditional learning.'
      },
      {
        icon: '🤝',
        title: '1-on-1 Sessions',
        description: 'Regular private sessions with your dedicated mentor for personalized support.'
      }
    ];
    await models.MentorFeatureModel.insertMany(mentorFeaturesData);

    // Insert company logos
    console.log('🏢 Migrating company logos...');
    await models.CompanyLogoModel.insertMany(partnerCompanies);

    console.log('✅ Comprehensive data migration completed successfully!');
    console.log('📊 Migration Summary:');
    console.log(`   • Company Info: 1 record (includes ${companyInfo.pricingFaq?.length || 0} pricing FAQs, ${companyInfo.whatsappQuickMessages?.length || 0} WhatsApp messages, ${companyInfo.courseBenefitsComparison?.length || 0} course benefits)`);
    console.log(`   • Team Members: ${teamMembers.length} records`);
    console.log(`   • Company Values: ${companyValues.length} records`);
    console.log(`   • Stats: ${aboutStats.length} records`);
    console.log(`   • Milestones: ${companyMilestones.length} records`);
    console.log(`   • Contact Data: 1 record (${contactData.offices.length} offices)`);
    console.log(`   • Upcoming Skills: ${upcomingSkills.length} records`);
    console.log(`   • Courses: ${courses.length} records`);
          console.log(`   • Course Details: ${courseDetails.length} records`);
      console.log(`   • Course Pricing: ${coursePricing.length} records`);
      console.log(`   • FAQs: ${faqs.length} records`);
      console.log(`   • Icons: ${courseIcons.length} records`);
    console.log(`   • Blog Posts: ${blogPosts.length} records`);
    console.log(`   • Testimonials: ${testimonials.length} records`);
    console.log(`   • Mentors: ${mentors.length} records`);
    console.log(`   • Advantage Stats: ${advantageStats.length} records`);
    console.log(`   • Mentor Features: ${mentorFeaturesData.length} records`);
    console.log(`   • Company Logos: ${partnerCompanies.length} records`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await closeDatabase();
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData()
    .then(() => {
      console.log('🎉 Migration process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration process failed:', error);
      process.exit(1);
    });
}

export default migrateData;
