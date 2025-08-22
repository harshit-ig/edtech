import dotenv from 'dotenv';
import { connectDatabase, closeDatabase } from '../utils/database';
import * as models from '../models';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

// Import data from frontend files
const dataPath = path.join(__dirname, '../../../frontend/src/data');

// Helper function to safely require JSON/JS files
const requireData = (filename: string) => {
  try {
    const fullPath = path.join(dataPath, filename);
    if (fs.existsSync(fullPath)) {
      // For .ts files, we'll need to read and parse them
      const content = fs.readFileSync(fullPath, 'utf8');
      return content;
    }
    return null;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

// Simplified data objects (manually extracted from the files we read earlier)
const aboutData = {
  teamMembers: [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former Google AI researcher with 15+ years in tech education. PhD in Computer Science from MIT.",
      image: "/api/placeholder/300/300",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder", 
      bio: "Ex-Microsoft Principal Engineer. Built scalable learning platforms for 1M+ students worldwide.",
      image: "/api/placeholder/300/300",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Curriculum",
      bio: "Former Stanford Professor. Expert in AI/ML education with 200+ published papers.",
      image: "/api/placeholder/300/300", 
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "David Kim",
      role: "VP of Student Success",
      bio: "Career coach with 10+ years helping 5000+ students land their dream tech jobs.",
      image: "/api/placeholder/300/300",
      linkedin: "#",
      twitter: "#"
    }
  ],
  companyValues: [
    {
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Innovation First",
      description: "We stay ahead of industry trends, constantly updating our curriculum to reflect the latest technologies and practices."
    },
    {
      iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM9 9a2 2 0 11-4 0 2 2 0 014 0z",
      title: "Community Driven",
      description: "Our vibrant community of learners, mentors, and industry experts creates an environment where everyone thrives."
    },
    {
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Results Focused",
      description: "We measure success by our students' career outcomes. 95% of our graduates land their dream jobs within 6 months."
    },
    {
      iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: "Student First",
      description: "Every decision we make is guided by what's best for our students' learning journey and career success."
    }
  ],
  aboutStats: [
    { number: "50,000+", label: "Students Graduated", color: "edtech-green" },
    { number: "95%", label: "Job Placement Rate", color: "edtech-orange" },
    { number: "150+", label: "Industry Partners", color: "edtech-red" },
    { number: "4.9/5", label: "Average Rating", color: "edtech-green" }
  ],
  companyMilestones: [
    {
      year: "2018",
      title: "Founded EdTech Informative",
      description: "Started with a mission to democratize quality tech education globally."
    },
    {
      year: "2019", 
      title: "First 1,000 Students",
      description: "Reached our first milestone with students from 25+ countries."
    },
    {
      year: "2020",
      title: "COVID Pivot",
      description: "Successfully transitioned to fully remote learning during the pandemic."
    },
    {
      year: "2021",
      title: "Industry Partnerships",
      description: "Formed partnerships with Google, Microsoft, and Amazon for certification programs."
    },
    {
      year: "2022",
      title: "AI Specialization Launch",
      description: "Became the first online platform to offer comprehensive AI and ML bootcamps."
    },
    {
      year: "2023",
      title: "50,000 Graduate Milestone",
      description: "Celebrated 50,000+ successful graduates with 95% job placement rate."
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded to serve students in 80+ countries with localized content."
    }
  ],
  contactData: {
    offices: [
      {
        name: "Head Office",
        address: "30 N Gould St, Sheridan WY, 82801",
        email: "support@edtechinformative.com",
        phone: "+1 929 588 7774"
      },
      {
        name: "UK Office", 
        address: "128 City Rd, London EC1V 2NX",
        phone: "+44 7520 637 821"
      }
    ],
    responseTime: "We usually respond within 1 business day.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.001!2d-73.935242!3d40.730610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sus!4v1700000000000"
  },
  companyInfo: {
    whatsappNumber: "+919643274676",
    supportEmail: "support@edtechinformative.com",
    heroRoles: [
      "Data • AI • Analytics ",
      "Generative AI",
      "Data Science"
    ],
    carouselRoles: [
      "Data Analyst",
      "Data Scientist", 
      "AI Researcher",
      "Data Engineer",
      "Generative AI"
    ],
    marketingStats: [
      { number: "99.9%", label: "Uptime" },
      { number: "+42%", label: "Productivity" },
      { number: "2M+", label: "Automations" },
      { number: "120+", label: "Integrations" }
    ]
  },
  upcomingSkills: [
    {
      id: 'quantum-computing',
      name: 'Quantum Computing',
      category: 'EMERGING TECH',
      demand: 'Ultra High',
      growth: '+450%',
      icon: '⚛️',
      accent: 'blue'
    },
    {
      id: 'multimodal-ai',
      name: 'Multimodal AI',
      category: 'AI/ML',
      demand: 'Critical',
      growth: '+320%',
      icon: '🧠',
      accent: 'orange'
    },
    {
      id: 'edge-computing',
      name: 'Edge Computing',
      category: 'CLOUD TECH',
      demand: 'High',
      growth: '+280%',
      icon: '⚡',
      accent: 'green'
    },
    {
      id: 'web3-security',
      name: 'Web3 Security',
      category: 'BLOCKCHAIN',
      demand: 'Critical',
      growth: '+400%',
      icon: '🛡️',
      accent: 'red'
    }
  ],
  highlightedCountries: [
    "England",
    "United States of America",
    "United States"
  ]
};

const courseData = {
  courses: [
    {
      id: 'data-analytics',
      category: 'DATA ANALYTICS',
      badge: 'FEATURED',
      title: '10x Data Analyst and AI Complete Certification with Microsoft',
      desc: 'Master data analysis, AI, and Microsoft tools with hands-on projects that prepare you for real-world challenges.',
      duration: '6 Months',
      extra: '25+ Live Projects',
      accent: 'edtech-green',
      iconName: 'bar-chart',
      featured: true,
    },
    {
      id: 'data-science-masters',
      category: 'DATA SCIENCE',
      badge: 'TRENDING',
      title: 'Master of Science in Data Analytics - Complete Program',
      desc: 'Comprehensive masters-level program covering advanced machine learning, AI ethics, MLOps, business strategy, and capstone research project.',
      duration: '24 Months',
      extra: '185+ Lessons',
      accent: 'edtech-green',
      iconName: 'graduation-cap',
      featured: true,
    },
    {
      id: 'gen-ai',
      category: 'GENERATIVE AI',
      badge: 'TRENDING',
      title: 'Become a Generative AI Expert: Unlocking Creativity with Code',
      desc: 'Learn to harness the power of generative AI and build innovative solutions that drive business value.',
      duration: '3 Months',
      extra: '25+ Projects',
      accent: 'edtech-orange',
      iconName: 'star-sparkle',
      featured: true,
    }
  ]
};

// Migration function
async function migrateData(): Promise<void> {
  console.log('🚀 Starting data migration...');

  try {
    // Connect to database
    await connectDatabase();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
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
      models.FAQModel.deleteMany({})
    ]);

    // Insert company data
    console.log('📊 Migrating company data...');
    await models.CompanyInfoModel.create(aboutData.companyInfo);
    await models.TeamMemberModel.insertMany(aboutData.teamMembers);
    await models.ValueModel.insertMany(aboutData.companyValues);
    await models.StatModel.insertMany(aboutData.aboutStats);
    await models.MilestoneModel.insertMany(aboutData.companyMilestones);
    await models.ContactDataModel.create(aboutData.contactData);
    await models.UpcomingSkillModel.insertMany(aboutData.upcomingSkills);
    await models.HighlightedCountriesModel.create({ countries: aboutData.highlightedCountries });

    // Insert course data
    console.log('🎓 Migrating course data...');
    await models.CourseModel.insertMany(courseData.courses);

    // Insert FAQ data
    console.log('❓ Migrating FAQ data...');
    const faqData = [
      {
        id: 1,
        question: "What makes our platform different from other career development programs?",
        answer: "Our platform combines AI-driven personalized learning paths with real-world industry projects and direct mentorship from professionals at top companies. Unlike traditional programs, we focus on practical skills that you can implement immediately in your current role or showcase to future employers."
      },
      {
        id: 2,
        question: "How long does it take to see results from the program?",
        answer: "Most learners see significant improvements in their skills within 4-6 weeks. Career advancement typically occurs within 3-6 months, with many students landing new roles or promotions. The timeline depends on your dedication, current skill level, and career goals."
      },
      {
        id: 3,
        question: "Do I need prior experience in tech to benefit from our courses?",
        answer: "Not at all! Our courses are designed for learners at all levels. We offer beginner-friendly programs that start from the basics, as well as advanced courses for experienced professionals. Our AI-driven assessment helps place you in the right program for your current skill level."
      }
    ];
    await models.FAQModel.insertMany(faqData);

    // Insert icons data
    console.log('🎨 Migrating icons data...');
    const iconsData = [
      { iconName: 'bar-chart', iconPath: 'M4 19V7m5 12V4m5 15V9m5 10V12' },
      { iconName: 'star-sparkle', iconPath: 'M12 3l2.4 4.9L20 9l-4 3.9.9 5.6L12 16.8 7.1 18.5 8 13 4 9l5.6-1.1L12 3z' },
      { iconName: 'graduation-cap', iconPath: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14v7' },
      { iconName: 'default', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' }
    ];
    await models.CourseIconModel.insertMany(iconsData);

    console.log('✅ Data migration completed successfully!');
    console.log('📊 Migration Summary:');
    console.log(`   • Company Info: 1 record`);
    console.log(`   • Team Members: ${aboutData.teamMembers.length} records`);
    console.log(`   • Company Values: ${aboutData.companyValues.length} records`);
    console.log(`   • Stats: ${aboutData.aboutStats.length} records`);
    console.log(`   • Milestones: ${aboutData.companyMilestones.length} records`);
    console.log(`   • Contact Data: 1 record`);
    console.log(`   • Upcoming Skills: ${aboutData.upcomingSkills.length} records`);
    console.log(`   • Courses: ${courseData.courses.length} records`);
    console.log(`   • FAQs: ${faqData.length} records`);
    console.log(`   • Icons: ${iconsData.length} records`);

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
