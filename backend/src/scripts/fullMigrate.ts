import dotenv from 'dotenv';
import { connectDatabase, closeDatabase } from '../utils/database';
import * as models from '../models';

// Load environment variables
dotenv.config();

// Complete data extracted from frontend files
const blogPosts = [
  {
    id: '1',
    title: 'The Future of AI: Trends Every Developer Should Know in 2024',
    slug: 'future-of-ai-trends-2024',
    excerpt: 'Explore the latest AI developments that are reshaping software development and discover how to stay ahead of the curve in this rapidly evolving field.',
    content: `# The Future of AI: Trends Every Developer Should Know in 2024

Artificial Intelligence continues to revolutionize the software development landscape at an unprecedented pace. As we move through 2024, several key trends are emerging that every developer should understand to remain competitive and relevant in the industry.

## 1. The Rise of AI-Powered Development Tools

The integration of AI into development workflows is becoming standard practice. From GitHub Copilot to advanced debugging tools, AI is augmenting developer productivity in remarkable ways.

### Code Generation and Completion
- AI assistants can now generate entire functions and classes
- Context-aware suggestions improve code quality
- Automated testing and documentation generation

### Intelligent Debugging
AI-powered debugging tools can now identify and suggest fixes for complex bugs by analyzing patterns across codebases and understanding common error scenarios.

## 2. Large Language Models in Production

The deployment of Large Language Models (LLMs) in production environments is becoming more sophisticated and accessible.

### Key Developments:
- **Smaller, efficient models** that can run on edge devices
- **Fine-tuned models** for specific industry applications
- **Multi-modal capabilities** combining text, image, and audio processing

## 3. AI Ethics and Responsible Development

As AI becomes more prevalent, the importance of ethical AI development cannot be overstated.

### Best Practices:
- Implementing bias detection and mitigation strategies
- Ensuring transparency in AI decision-making processes
- Building inclusive AI systems that work for diverse populations

## 4. The Evolution of Machine Learning Operations (MLOps)

MLOps is maturing rapidly, with new tools and practices emerging to streamline the deployment and monitoring of ML models.

### Essential MLOps Components:
- **Continuous Integration/Continuous Deployment (CI/CD)** for ML models
- **Model versioning and experiment tracking**
- **Automated monitoring and alerting** for model performance

## Conclusion

The AI revolution is not coming – it's here. Developers who embrace these trends and continuously update their skills will find themselves at the forefront of innovation. Whether you're building AI-powered applications or using AI tools to enhance your development process, staying informed about these trends is crucial for career growth.

As the industry continues to evolve, the key to success lies in maintaining a balance between leveraging AI's capabilities and understanding its limitations. The future belongs to developers who can effectively collaborate with AI tools while maintaining their critical thinking and problem-solving skills.`,
    author: {
      name: 'Dr. Sarah Johnson',
      role: 'AI Research Director',
      avatar: '/api/placeholder/150/150'
    },
    category: 'Artificial Intelligence',
    tags: ['AI', 'Machine Learning', 'Development', 'Trends', 'Future'],
    publishedAt: '2024-01-15',
    readTime: 8,
    featured: true,
    image: '/api/placeholder/800/400'
  }
];

const testimonials = [
  {
    id: 'hannah-ardern',
    name: 'Hannah Ardern',
    role: 'Remote Administrator',
    rating: 4.8,
    review: "Just wrapped up an incredible 2-day bootcamp with 1to10x! During this hands-on experience, I dove into various tools and techniques that are essential for today's data-driven world: Tableau, Orange, Octoparse, GPT for Google Sheets. This achievement has significantly boosted my confidence in working with new tools!",
    category: '🚀 Incredible bootcamp experience!',
    accent: 'blue'
  },
  {
    id: 'peter-odesola',
    name: 'Peter Odesola',
    role: 'Data Analyst',
    rating: 4.9,
    review: "What an intense and rewarding experience! The 10x Data Analyst Bootcamp took my understanding of data analytics to a whole new level. Every session was hands-on and practical, covering everything from spreadsheet automation to ML fundamentals. Definitely one of the best learning experiences I've had!",
    category: '📊 Analytics understanding to new level',
    accent: 'orange'
  },
  {
    id: 'james-wheeler',
    name: 'James Wheeler',
    role: 'Financial Advisor',
    rating: 4.7,
    review: "This bootcamp exceeded all expectations! The 10x Data Analyst Bootcamp was a perfect mix of theory and hands-on practice, helping me understand automation, web scraping, and data-driven decision-making like never before. Worth every minute!",
    category: '💯 Exceeded all expectations!',
    accent: 'green'
  }
];

const mentors = [
  {
    id: 'josh-temin',
    name: 'Josh Temin',
    role: 'Data Scientist',
    company: 'Clarvate',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    accent: 'blue'
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'AI Engineer',
    company: 'Microsoft',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b851?w=400&h=400&fit=crop&crop=face',
    accent: 'orange'
  },
  {
    id: 'carlos-avila',
    name: 'Carlos Avila',
    role: 'Data Engineer',
    company: 'Amazon',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    accent: 'green'
  }
];

const advantageStats = [
  {
    id: 'career-speed',
    title: 'CAREER ADVANCEMENT SPEED',
    value: '10.0x',
    label: 'FASTER GROWTH',
    description: 'Our graduates achieve in 6 months what takes others 5 years. Break through career plateaus with our proven methodology.',
    dots: 8,
    accent: 'blue'
  },
  {
    id: 'salary-boost',
    title: 'SALARY TRANSFORMATION',
    value: '3.5x',
    label: 'INCOME BOOST',
    description: 'Average salary increase within 12 months. Turn your learning investment into life-changing returns.',
    dots: 7,
    accent: 'orange'
  },
  {
    id: 'placement-rate',
    title: 'JOB PLACEMENT SUCCESS',
    value: '94%',
    label: 'PLACEMENT RATE',
    description: 'Land your dream tech role guaranteed. Our industry connections open doors others can\'t.',
    dots: 10,
    accent: 'green'
  }
];

const coursePricing = [
  {
    id: 'data-science-masters',
    name: 'Master of Science in Data Analytics - Complete Program',
    category: 'DATA SCIENCE',
    originalPrice: 7999,
    currentPrice: 4999,
    installmentPrice: 833,
    installmentMonths: 12,
    discount: '37% OFF',
    duration: '24 Months',
    extra: '185+ Lessons',
    description: 'Comprehensive masters-level program covering advanced machine learning, AI ethics, MLOps, business strategy, and capstone research project.',
    features: [
      '24 months of masters-level education',
      '185+ comprehensive lessons across 5 modules',
      'Advanced machine learning & deep learning',
      'AI ethics & responsible AI development',
      'MLOps & production deployment systems',
      'Business strategy & executive leadership',
      'Original capstone research project',
      '1-on-1 PhD-level research mentorship',
      'Executive career coaching & placement',
      'Research publication support',
      'Alumni executive network access',
      'Masters-level industry certificate'
    ],
    highlighted: false,
    accent: 'edtech-green',
    badge: 'TRENDING',
    cta: 'Earn Masters Degree',
    popular: false
  },
  {
    id: 'data-analytics',
    name: '10x Data Analyst and AI Complete Certification with Microsoft',
    category: 'DATA ANALYTICS',
    originalPrice: 2999,
    currentPrice: 1999,
    installmentPrice: 333,
    installmentMonths: 6,
    discount: '33% OFF',
    duration: '6 Months',
    extra: '25+ Live Projects',
    description: 'Master data analysis, AI, and Microsoft tools with hands-on projects that prepare you for real-world challenges.',
    features: [
      'Live interactive sessions with industry experts',
      'Recorded video access (1 year)',
      'Hands-on projects & real-world assignments',
      'Microsoft certification eligibility',
      '1-on-1 mentorship sessions',
      'Career support & job placement assistance',
      'Industry-recognized certificate',
      'Lifetime community access'
    ],
    highlighted: true,
    accent: 'edtech-green',
    badge: 'FEATURED',
    cta: 'Enroll Now',
    popular: false
  }
];

// Migration function
async function fullMigrateData(): Promise<void> {
  console.log('🚀 Starting comprehensive data migration...');

  try {
    // Connect to database
    await connectDatabase();

    // Clear all existing data
    console.log('🧹 Clearing all existing data...');
    await Promise.all([
      models.BlogPostModel.deleteMany({}),
      models.TestimonialModel.deleteMany({}),
      models.MentorModel.deleteMany({}),
      models.AdvantageStatModel.deleteMany({}),
      models.CoursePricingModel.deleteMany({})
    ]);

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

    // Insert course pricing
    console.log('💰 Migrating course pricing...');
    await models.CoursePricingModel.insertMany(coursePricing);

    console.log('✅ Comprehensive data migration completed successfully!');
    console.log('📊 Migration Summary:');
    console.log(`   • Blog Posts: ${blogPosts.length} records`);
    console.log(`   • Testimonials: ${testimonials.length} records`);
    console.log(`   • Mentors: ${mentors.length} records`);
    console.log(`   • Advantage Stats: ${advantageStats.length} records`);
    console.log(`   • Course Pricing: ${coursePricing.length} records`);

  } catch (error) {
    console.error('❌ Comprehensive migration failed:', error);
    throw error;
  } finally {
    await closeDatabase();
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  fullMigrateData()
    .then(() => {
      console.log('🎉 Comprehensive migration process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Comprehensive migration process failed:', error);
      process.exit(1);
    });
}

export default fullMigrateData;
