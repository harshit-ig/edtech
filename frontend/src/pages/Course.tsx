import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TechBackground from "../TechBackground";
import { courses } from "../data/courses";
import MicrosoftBadge from "../components/MicrosoftBadge";

// Extended course details data
const courseDetails: Record<string, any> = {
  'data-analytics': {
    overview: "Transform into a data-driven professional with our comprehensive Data Analytics and AI certification program. Master the complete data lifecycle from collection to actionable insights using industry-standard tools and AI technologies.",
    objectives: [
      "Master data analysis fundamentals and advanced techniques",
      "Build proficiency in Python, SQL, and data visualization tools",
      "Learn machine learning and AI implementation",
      "Develop real-world data projects for your portfolio",
      "Prepare for industry certifications and interviews"
    ],
    curriculum: [
      {
        module: "Module 1: Data Foundations",
        duration: "4 weeks",
        topics: ["Data Types & Structures", "Statistical Analysis", "Data Cleaning & Preprocessing", "Excel Advanced Features"]
      },
      {
        module: "Module 2: Python for Data Analysis",
        duration: "6 weeks", 
        topics: ["Python Fundamentals", "Pandas & NumPy", "Data Manipulation", "API Integration"]
      },
      {
        module: "Module 3: Database & SQL",
        duration: "4 weeks",
        topics: ["SQL Fundamentals", "Advanced Queries", "Database Design", "Data Warehousing"]
      },
      {
        module: "Module 4: Data Visualization",
        duration: "4 weeks",
        topics: ["Tableau/Power BI", "Python Visualization", "Dashboard Design", "Storytelling with Data"]
      },
      {
        module: "Module 5: Machine Learning & AI",
        duration: "6 weeks",
        topics: ["ML Algorithms", "Model Training", "AI Integration", "Predictive Analytics"]
      },
      {
        module: "Module 6: Capstone Projects",
        duration: "2 weeks",
        topics: ["Portfolio Development", "Industry Projects", "Presentation Skills", "Career Preparation"]
      }
    ],
    tools: [
      { name: "Python", icon: "🐍" },
      { name: "SQL", icon: "🗃️" },
      { name: "Tableau", icon: "📊" },
      { name: "Power BI", icon: "📈" },
      { name: "Excel", icon: "📋" },
      { name: "R", icon: "📊" },
      { name: "Jupyter", icon: "📓" },
      { name: "Git", icon: "🔀" },
      { name: "Azure/AWS", icon: "☁️" }
    ],
    skills: ["Data Analysis", "Statistical Modeling", "Machine Learning", "Data Visualization", "SQL Queries", "Python Programming", "Business Intelligence", "Predictive Analytics"],
    prerequisites: "Basic computer skills and eagerness to learn. No prior programming experience required.",
    certification: "Industry-recognized certification upon completion + Microsoft certification eligibility",
    testimonials: [
      {
        name: "Sarah Mitchell",
        role: "Data Scientist at Google",
        avatar: "S",
        rating: 5,
        content: "This course completely transformed my career. The hands-on projects and expert mentorship helped me land my dream job at Google. The curriculum is perfectly designed for industry needs.",
        color: "edtech-green"
      },
      {
        name: "Michael Chen", 
        role: "AI Engineer at Microsoft",
        avatar: "M",
        rating: 5,
        content: "The practical approach and real-world projects made all the difference. I went from zero experience to securing a senior position in just 6 months. Highly recommended!",
        color: "edtech-orange"
      },
      {
        name: "Rachel Torres",
        role: "Product Manager at Amazon", 
        avatar: "R",
        rating: 5,
        content: "Outstanding course quality and incredible support team. The career services helped me transition from a different field and secure multiple job offers. Worth every penny!",
        color: "edtech-blue"
      }
    ],
    successStats: [
      { label: "Students Trained", value: "500+", color: "edtech-green" },
      { label: "Job Placement", value: "95%", color: "green-600" },
      { label: "Average Rating", value: "4.8★", color: "blue-600" },
      { label: "Salary Increase", value: "85%", color: "edtech-orange" }
    ],
    pricing: {
      current: 1999,
      original: 2999,
      discount: "33% OFF",
      deadline: "Jan 31st",
      features: [
        { text: "Live interactive sessions", icon: "🎥" },
        { text: "Recorded video access", icon: "📹" },
        { text: "Hands-on projects", icon: "💻" },
        { text: "1-on-1 mentorship", icon: "👨‍🏫" },
        { text: "Career support", icon: "🚀" },
        { text: "Certificate of completion", icon: "🏆" },
        { text: "Lifetime community access", icon: "🌐" }
      ]
    },
    courseInfo: {
      startDate: "Next Batch: Jan 15th",
      format: "Live Online",
      support: "24/7 Assistance",
      studentsEnrolled: "500+ Enrolled"
    },
    trustIndicators: {
      rating: "4.8/5",
      reviewCount: "500+ reviews",
      testimonialPreview: {
        text: "Transformed my career in just 4 months. The hands-on approach and mentorship were incredible!",
        author: "Sarah K., Data Analyst at Google"
      }
    },
    careerSupport: [
      "1-on-1 career coaching sessions",
      "Resume and LinkedIn profile optimization", 
      "Mock interview preparation",
      "Job placement assistance",
      "Alumni network access"
    ],
    instructors: [
      {
        name: "Dr. Sarah Johnson",
        title: "Senior Data Scientist at Microsoft",
        experience: "10+ years in data analytics and machine learning"
      },
      {
        name: "Michael Chen", 
        title: "AI Research Director",
        experience: "Former Google AI researcher with 200+ publications"
      }
    ]
  },
  'gen-ai': {
    overview: "Unlock the power of Generative AI and position yourself at the forefront of the AI revolution. Learn to build, deploy, and optimize AI systems that create content, solve complex problems, and drive innovation.",
    features: [
      {
        icon: "✅",
        title: "Future-Ready Curriculum",
        description: "Stay ahead with cutting-edge AI technologies and industry-relevant content that evolves with the rapidly changing landscape."
      },
      {
        icon: "👩‍🏫",
        title: "Learn from Real Practitioners",
        description: "Get insights from industry experts and practitioners who are actively working in leading AI companies."
      },
      {
        icon: "🧠",
        title: "Hands-On Learning Approach",
        description: "Build real AI projects and applications through practical exercises and interactive workshops."
      },
      {
        icon: "🔄",
        title: "AI-Powered Learning Tools",
        description: "Experience personalized learning with AI-driven recommendations and adaptive course content."
      },
      {
        icon: "🛠️",
        title: "Job-Ready Outcomes",
        description: "Graduate with a portfolio of projects and skills that employers are actively seeking in the market."
      },
      {
        icon: "🌐",
        title: "Learn Anytime, Anywhere",
        description: "Access course materials and participate in live sessions from anywhere with our flexible online platform."
      },
      {
        icon: "🏅",
        title: "Certification That Matters",
        description: "Earn industry-recognized certifications that validate your AI expertise and boost your career prospects."
      }
    ],
    objectives: [
      "Master GPT, DALL-E, and other generative models",
      "Build AI-powered applications and solutions",
      "Understand prompt engineering and fine-tuning",
      "Deploy AI solutions in production environments",
      "Navigate ethical AI and responsible development"
    ],
    curriculum: [
      {
        module: "Module 1: Introduction to Data Science and AI",
        duration: "3 weeks",
        topics: ["The role and impact of a data scientist", "The Data Science lifecycle: From problem formulation to deployment (CRISP-DM)", "Overview of AI, Machine Learning, Deep Learning, and Generative AI", "Ethical considerations in AI and Data Science", "Use cases in various industries and AI-driven innovation"]
      },
      {
        module: "Module 2: Advanced Data Foundations & Engineering",
        duration: "3 weeks",
        topics: ["Advanced data types, structures, and storage (NoSQL, Data Lakes)", "Data acquisition (APIs, web scraping) and wrangling with Python", "Data cleaning, preprocessing, and feature engineering techniques", "SQL for complex querying, data manipulation, and database management"]
      },
      {
        module: "Module 3: Statistical Modeling & Rigorous EDA",
        duration: "3 weeks",
        topics: ["Advanced descriptive and inferential statistics for data science", "Probability distributions, sampling, and hypothesis testing", "Regression analysis (linear, logistic) and ANOVA", "Advanced EDA with Python (Matplotlib, Seaborn, Plotly)", "Automating and augmenting EDA with GenAI prompts for deeper insights"]
      },
      {
        module: "Module 4: Python for Data Science & GenAI Integration",
        duration: "3 weeks",
        topics: ["Mastering Python for data science: Pandas, NumPy, SciPy, Matplotlib, Seaborn", "Object-Oriented Programming (OOP) concepts for scalable code", "Using GenAI (ChatGPT, GitHub Copilot) for efficient code generation", "Developing custom Python scripts for data processing and automation"]
      },
      {
        module: "Module 5: Machine Learning – From Theory to Application",
        duration: "4 weeks",
        topics: ["Core ML concepts: Supervised and Unsupervised learning", "Key algorithms: Decision Trees, Random Forests, SVM, K-Means, PCA", "Model training, tuning and evaluation metrics", "Introduction to Scikit-learn library for ML implementation", "AI-assisted model selection and parameter tuning using GenAI"]
      },
      {
        module: "Module 6: Generative AI for Data Scientists",
        duration: "4 weeks",
        topics: ["Deep dive into Generative AI: LLMs, diffusion models, GANs, and Agents", "Advanced prompt engineering for data science applications", "Leveraging GenAI for natural language to SQL/Python generation", "GenAI for automated report writing and insight summarization", "Exploring multimodal GenAI: processing text, image, and structured data"]
      },
      {
        module: "Module 7: Advanced Machine Learning & AI-Powered Optimization",
        duration: "4 weeks",
        topics: ["Introduction to Deep Learning: Neural Networks, TensorFlow/Keras", "Ensemble methods, gradient boosting (XGBoost, LightGBM)", "Model interpretability and explainable AI (XAI) techniques", "AutoML tools and GenAI for accelerating model development", "Time series analysis and forecasting with ML methods"]
      },
      {
        module: "Module 8: Capstone Project: End-to-End Data Science with GenAI",
        duration: "2 weeks",
        topics: ["Select a complex real-world problem (predictive maintenance, fraud detection)", "Execute full data science project: data acquisition to deployment", "Integrate GenAI tools for data augmentation and code optimization", "Develop comprehensive, portfolio-ready project", "Peer review, industry expert feedback, and presentation of findings"]
      }
    ],
    tools: [
      { name: "OpenAI API", icon: "🤖" },
      { name: "Hugging Face", icon: "🤗" },
      { name: "LangChain", icon: "🔗" },
      { name: "Python", icon: "🐍" },
      { name: "TensorFlow", icon: "🧠" },
      { name: "PyTorch", icon: "🔥" },
      { name: "Streamlit", icon: "⚡" },
      { name: "FastAPI", icon: "🚀" }
    ],
    skills: ["Generative AI", "Prompt Engineering", "Model Fine-tuning", "AI Application Development", "Natural Language Processing", "Computer Vision", "AI Ethics", "MLOps"],
    prerequisites: "Basic programming knowledge (Python preferred) and familiarity with APIs",
    certification: "Generative AI Expert Certificate + OpenAI partnership certification track",
    testimonials: [
      {
        name: "Alex Thompson",
        role: "AI Engineer at OpenAI",
        avatar: "A",
        rating: 5,
        content: "This course gave me the practical skills to work with cutting-edge AI technology. The hands-on approach and real-world projects prepared me perfectly for my role at OpenAI.",
        color: "edtech-blue"
      },
      {
        name: "Maria Rodriguez",
        role: "ML Engineer at Meta",
        avatar: "M",
        rating: 5,
        content: "Excellent curriculum covering everything from basics to advanced AI concepts. The mentorship and project-based learning approach helped me transition into AI successfully.",
        color: "edtech-green"
      },
      {
        name: "James Wilson",
        role: "AI Consultant",
        avatar: "J",
        rating: 5,
        content: "The most comprehensive AI course I've taken. It covers both theoretical foundations and practical applications. I'm now running my own AI consulting business!",
        color: "edtech-orange"
      }
    ],
    successStats: [
      { label: "Students Trained", value: "300+", color: "edtech-blue" },
      { label: "Job Placement", value: "92%", color: "green-600" },
      { label: "Average Rating", value: "4.9★", color: "blue-600" },
      { label: "Salary Increase", value: "120%", color: "edtech-orange" }
    ],
    pricing: {
      current: 2499,
      original: 3499,
      discount: "29% OFF",
      deadline: "Feb 15th",
      features: [
        { text: "Future-Ready Curriculum with live AI workshops", icon: "🤖" },
        { text: "Learn from Real Practitioners with expert mentorship", icon: "👨‍💻" },
        { text: "Hands-On Learning Approach with real AI projects", icon: "⚡" },
        { text: "AI-Powered Learning Tools and access to AI models", icon: "🧠" },
        { text: "Job-Ready Outcomes with career placement support", icon: "🚀" },
        { text: "Learn Anytime, Anywhere with flexible access", icon: "🌍" },
        { text: "Certification That Matters - industry certificate", icon: "🏆" }
      ]
    },
    courseInfo: {
      startDate: "Next Batch: Feb 1st",
      format: "Live + Self-paced",
      support: "Expert AI Mentors",
      studentsEnrolled: "300+ Enrolled"
    },
    trustIndicators: {
      rating: "4.9/5",
      reviewCount: "300+ reviews",
      testimonialPreview: {
        text: "The most comprehensive AI course available. Went from beginner to building production AI apps in 4 months!",
        author: "Alex T., AI Engineer at OpenAI"
      }
    }
  }
};

// Default course details for courses not in the extended data
const getDefaultCourseDetails = (course: any) => ({
  overview: course.desc + " This comprehensive program combines theoretical knowledge with practical, hands-on experience to ensure you're job-ready upon completion.",
  objectives: [
    `Master ${course.category.toLowerCase()} fundamentals and advanced concepts`,
    "Build a professional portfolio with real-world projects",
    "Develop industry-relevant skills and best practices", 
    "Prepare for certifications and career advancement",
    "Network with industry professionals and peers"
  ],
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
  certification: `Professional ${course.category} Certificate`
});

const ICONS = {
  'data-analytics': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V7m5 12V4m5 15V9m5 10V12"/>
    </svg>
  ),
  'gen-ai': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.4 4.9L20 9l-4 3.9.9 5.6L12 16.8 7.1 18.5 8 13 4 9l5.6-1.1L12 3z"/>
    </svg>
  ),
  'default': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  )
};

export default function CoursePage() {
  const { courseId } = useParams();
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});
  
  const toggleModule = (index: number) => {
    setOpenModules(prev => ({ ...prev, [index]: !prev[index] }));
  };
  
  // Find course from the data
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
            <p className="text-white/70 mb-6">The course you're looking for doesn't exist.</p>
            <Link to="/courses" className="cta cta-primary">
              Browse All Courses
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const details = courseDetails[course.id] || getDefaultCourseDetails(course);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <TechBackground className="mix-blend-screen opacity-30" />
      </div>
      
      <main className="pt-20">
        {/* SECTION 1: Hero Section - BRAND COLORS */}
        <section className="py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-edtech-blue via-bg-deep to-edtech-blue/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <TechBackground className="opacity-15" />
          
          <div className="relative mx-auto max-w-7xl px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link to="/" className="hover:text-edtech-green transition-colors">Home</Link>
              <span>/</span>
              <Link to="/courses" className="hover:text-edtech-green transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-white/80">{course.title}</span>
            </nav>

            {/* Microsoft Partnership Badge */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <MicrosoftBadge size="lg" />
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${
                    course.accent === 'edtech-green' ? 'bg-gradient-to-br from-edtech-green/20 to-green-400/20' : 
                    'bg-gradient-to-br from-edtech-orange/20 to-orange-400/20'
                  }`}>
                    {ICONS[course.id as keyof typeof ICONS] || ICONS.default}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-white/60">{course.category}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        course.badge === 'FEATURED' ? 'bg-red-500 text-white' :
                        course.badge === 'TRENDING' ? 'bg-edtech-green text-black' :
                        course.badge === 'MOST POPULAR' ? 'bg-edtech-orange text-black' : 'bg-blue-500 text-white'
                      }`}>
                        {course.badge}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                      {course.title}
                    </h1>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="group relative overflow-hidden bg-gradient-to-br from-edtech-green/10 to-edtech-green/20 backdrop-blur-lg rounded-2xl p-4 border border-edtech-green/30 hover:border-edtech-green/60 transition-all duration-300 hover:scale-105">
                    <div className="relative text-center">
                      <div className="mb-2">
                        <svg className="w-8 h-8 mx-auto text-edtech-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{course.duration}</div>
                      <div className="text-xs text-edtech-green">Duration</div>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-hidden bg-gradient-to-br from-edtech-blue/40 to-edtech-blue/60 backdrop-blur-lg rounded-2xl p-4 border-2 border-edtech-blue/80 hover:border-edtech-blue transition-all duration-300 hover:scale-105 shadow-lg">
                    <div className="relative text-center">
                      <div className="mb-2">
                        <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{course.extra}</div>
                      <div className="text-xs text-white/90 font-medium">Projects</div>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-hidden bg-gradient-to-br from-edtech-orange/20 to-edtech-orange/30 backdrop-blur-lg rounded-2xl p-4 border border-edtech-orange/40 hover:border-edtech-orange/60 transition-all duration-300 hover:scale-105">
                    <div className="relative text-center">
                      <div className="mb-2">
                        <svg className="w-8 h-8 mx-auto text-edtech-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">24/7</div>
                      <div className="text-xs text-edtech-orange">Support</div>
                    </div>
                  </div>
                  
                  <div className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-lg rounded-2xl p-4 border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105">
                    <div className="relative text-center">
                      <div className="mb-2">
                        <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">95%</div>
                      <div className="text-xs text-white/80">Success Rate</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-4 text-white">Course Overview</h2>
                  <p className="text-white/80 leading-relaxed text-lg mb-6">
                    {details.overview}
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-edtech-green/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-edtech-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">Duration</div>
                        <div className="font-semibold text-white">{course.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-edtech-orange/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-edtech-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">Projects</div>
                        <div className="font-semibold text-white">{course.extra}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-edtech-blue/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-edtech-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-white/60 text-sm">Certification</div>
                        <div className="font-semibold text-white">Included</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Features Section */}
                {details.features && (
                  <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mt-6">
                    <h2 className="text-2xl font-bold mb-6 text-white">Why Choose This Course</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {details.features.map((feature: any, index: number) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-edtech-green/20 to-edtech-green/30 rounded-xl flex items-center justify-center text-2xl border border-edtech-green/30">
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Enrollment Card */}
                  <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold mb-2 text-white">${details.pricing?.current || 1999}</div>
                      {details.pricing?.original && (
                        <div className="text-white/60 line-through text-lg">${details.pricing.original}</div>
                      )}
                      {details.pricing?.discount && (
                        <div className="text-edtech-green text-sm font-medium bg-edtech-green/20 px-3 py-1 rounded-full inline-block">
                          {details.pricing.discount} {details.pricing.deadline && `- Until ${details.pricing.deadline}`}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Start Date</span>
                        <span className="text-white font-medium">{details.courseInfo?.startDate || "Next Batch: TBD"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Format</span>
                        <span className="text-white font-medium">{details.courseInfo?.format || "Live Online"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Support</span>
                        <span className="text-white font-medium">{details.courseInfo?.support || "24/7 Assistance"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Students</span>
                        <span className="text-white font-medium">{details.courseInfo?.studentsEnrolled || "1000+ Enrolled"}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <a href="#get-started" className="bg-edtech-green hover:bg-green-600 text-black px-6 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full block text-center">
                        Enroll Now →
                      </a>
                      <a href="#contact" className="border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 w-full block text-center">
                        Book Free Demo
                      </a>
                    </div>
                  </div>

                  {/* Enhanced Features */}
                  <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                    <h3 className="text-lg font-bold mb-4 text-white">What's Included</h3>
                    <div className="space-y-3 text-sm">
                      {(details.pricing?.features || [
                        { text: "Live interactive sessions", icon: "🎥" },
                        { text: "Recorded video access", icon: "📹" },
                        { text: "Hands-on projects", icon: "💻" },
                        { text: "1-on-1 mentorship", icon: "👨‍🏫" },
                        { text: "Career support", icon: "🚀" },
                        { text: "Certificate of completion", icon: "🏆" },
                        { text: "Community access", icon: "🌐" }
                      ]).map((feature: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-all duration-200">
                          <span className="text-lg">{feature.icon}</span>
                          <span className="text-white/80">{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                    <h3 className="text-lg font-bold mb-4 text-white">Prerequisites</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{details.prerequisites}</p>
                  </div>

                  {/* Trust Indicators */}
                  <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                    <h3 className="text-lg font-bold mb-4 text-white">Why Students Love Us</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {"★★★★★".split("").map((star, i) => (
                            <span key={i} className="text-lg">{star}</span>
                          ))}
                        </div>
                        <span className="text-white/80 text-sm">{details.trustIndicators?.rating || "4.8/5"} ({details.trustIndicators?.reviewCount || "500+ reviews"})</span>
                      </div>
                      <div className="text-white/60 text-sm">
                        "{details.trustIndicators?.testimonialPreview?.text || "Excellent course with comprehensive content and great support. Highly recommended for career advancement!"}"
                      </div>
                      <div className="text-white/40 text-xs">- {details.trustIndicators?.testimonialPreview?.author || "Anonymous Student"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Testimonials & Success Stories - LIGHT */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Why Students Choose This Course
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of professionals who have transformed their careers with our comprehensive training program
              </p>
            </div>

            {/* Success Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {details.successStats?.map((stat: any, index: number) => (
                <div key={index} className="text-center group">
                  <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-${stat.color}/20`}>
                    <div className={`text-4xl md:text-5xl font-bold text-${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              )) || 
              // Default stats if not provided
              [
                { label: "Students Trained", value: "1000+", color: "edtech-green" },
                { label: "Job Placement", value: "90%", color: "green-600" },
                { label: "Average Rating", value: "4.8★", color: "blue-600" },
                { label: "Salary Increase", value: "75%", color: "edtech-orange" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-${stat.color}/20`}>
                    <div className={`text-4xl md:text-5xl font-bold text-${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {(details.testimonials || [
                {
                  name: "John Smith",
                  role: "Senior Developer",
                  avatar: "J",
                  rating: 5,
                  content: "Excellent course with practical projects and expert guidance. Highly recommended for career advancement.",
                  color: "edtech-green"
                },
                {
                  name: "Maria Garcia",
                  role: "Product Manager",
                  avatar: "M",
                  rating: 5,
                  content: "The comprehensive curriculum and hands-on approach helped me transition to a new role successfully.",
                  color: "edtech-orange"
                },
                {
                  name: "David Lee",
                  role: "Data Analyst",
                  avatar: "D",
                  rating: 5,
                  content: "Outstanding support and real-world projects. The skills I learned are directly applicable to my work.",
                  color: "blue-600"
                }
              ]).map((testimonial: any, index: number) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-100 h-full">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-${testimonial.color} to-${testimonial.color.includes('edtech') ? testimonial.color.replace('edtech-', '') + '-600' : testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}>
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-4">
                      {"★".repeat(testimonial.rating).split("").map((star, i) => (
                        <span key={i} className="text-lg">{star}</span>
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-br from-edtech-blue to-blue-800 rounded-2xl p-8 md:p-12 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Transform Your Career?
                </h3>
                <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                  Join our next cohort and start building the skills that top companies are looking for.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#get-started" className="bg-white text-edtech-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Start Your Journey Today →
                  </a>
                  <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-edtech-blue px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105">
                    Schedule Free Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Curriculum - DARK with Accordion */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-deep to-edtech-blue/5" />
          
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                The <span className="text-edtech-orange">Complete</span> Learning Roadmap
              </h2>
              <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                {details.curriculum.length} powerful modules. Each module transforms your skills and unlocks new capabilities.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="space-y-4">
                {details.curriculum.map((module: any, index: number) => (
                  <div 
                    key={index}
                    className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleModule(index)}
                      className="flex flex-1 items-center justify-between w-full px-8 py-6 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <div className="flex-shrink-0 w-12 h-12 bg-edtech-orange rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-black font-bold text-lg">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-edtech-orange font-semibold mb-1 uppercase tracking-wide">
                            {module.duration}
                          </div>
                          <h3 className="text-xl font-bold text-white text-left">
                            {module.module}
                          </h3>
                        </div>
                      </div>
                      <svg 
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 text-white/60 ${
                          openModules[index] ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    
                    {openModules[index] && (
                      <div className="px-8 pb-8">
                        <div className="border-t border-white/10 pt-6">
                          <h4 className="text-lg font-semibold text-white mb-4">Topics Covered:</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {module.topics.map((topic: string, topicIndex: number) => (
                              <div key={topicIndex} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/10">
                                <div className="w-2 h-2 bg-edtech-green rounded-full flex-shrink-0"></div>
                                <span className="text-white/80 text-sm">{topic}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6 p-4 bg-edtech-orange/10 rounded-lg border border-edtech-orange/20">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-5 h-5 text-edtech-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              <span className="text-edtech-orange font-semibold text-sm">Module Highlight</span>
                            </div>
                            <p className="text-white/80 text-sm">
                              By the end of this module, you'll have hands-on experience with {module.topics.slice(0, 2).join(' and ')}, 
                              setting the foundation for advanced concepts in subsequent modules.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Tools & Technologies - IMPROVED */}
        <section className="py-16 md:py-24" style={{backgroundColor: '#f8fafc'}}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Master Industry-Standard <span className="text-edtech-green">Tools</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Get hands-on experience with the same tools used by leading companies worldwide. Each tool comes with real-world projects and expert guidance.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {details.tools.map((tool: any, index: number) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg hover:border-edtech-green/40 transition-all duration-300 text-center group transform hover:scale-105"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-edtech-green/10 to-edtech-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border-2 border-edtech-green/20">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {tool.icon || "🛠️"}
                      </span>
                    </div>
                    <span className="text-gray-800 font-semibold text-sm block leading-relaxed">{tool.name || tool}</span>
                  </div>
                ))}
              </div>
              
              {/* Additional Info */}
              <div className="text-center mt-12">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-edtech-green/20 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-2xl">✨</span>
                    <span className="text-lg font-semibold text-gray-800">Comprehensive Tool Training</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Learn not just how to use these tools, but master advanced techniques, best practices, and industry workflows that employers value most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Final Call to Action - ENHANCED */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-bg-deep via-edtech-blue to-bg-deep relative overflow-hidden">
          <div className="absolute inset-0">
            <TechBackground className="opacity-10" />
          </div>
          
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                  🚀 Limited Time Offer
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-edtech-green to-edtech-orange">Journey</span> Today
              </h2>
              
              <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                Don't wait for the perfect moment. The perfect moment is now. 
                <br className="hidden md:block" />
                <span className="font-semibold text-edtech-green">Join {details.courseInfo?.studentsEnrolled || "1000+ students"} who transformed their careers.</span>
              </p>

              {/* Enhanced Pricing Card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 mb-8 max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2">${details.pricing?.current || 1999}</div>
                  {details.pricing?.original && (
                    <div className="text-white/60 line-through text-2xl mb-2">${details.pricing.original}</div>
                  )}
                  {details.pricing?.discount && (
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-edtech-green to-edtech-orange text-black rounded-full text-sm font-bold">
                      💰 {details.pricing.discount} {details.pricing.deadline && `- Ends ${details.pricing.deadline}`}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                  {(details.pricing?.features || [
                    { text: "Live expert instruction", icon: "🎥" },
                    { text: "Hands-on projects", icon: "💻" },
                    { text: "1-on-1 mentorship", icon: "👨‍🏫" },
                    { text: "Career support", icon: "🚀" },
                    { text: "Lifetime access", icon: "🌐" },
                    { text: "Certificate included", icon: "🏆" }
                  ]).slice(0, 6).map((feature: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-edtech-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <a 
                    href="#get-started" 
                    className="bg-gradient-to-r from-edtech-green to-edtech-orange text-black px-8 py-4 rounded-full font-bold text-xl hover:brightness-110 transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full block text-center"
                  >
                    🎯 Enroll Now {details.pricing?.original ? `& Save $${details.pricing.original - details.pricing.current}` : ''}
                  </a>
                  <a 
                    href="#contact" 
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 w-full block text-center"
                  >
                    💬 Talk to Our Advisor First
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-edtech-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">30-Day Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-edtech-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">Industry Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-edtech-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm">4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Related Courses - DARK */}
        <section className="py-16 md:py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-deep via-bg-deep to-edtech-blue/5" />
          
          <div className="relative mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Related <span className="text-edtech-orange">Courses</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {courses.filter(c => c.id !== course.id).slice(0, 3).map((relatedCourse) => (
                <Link key={relatedCourse.id} to={`/course/${relatedCourse.id}`} className="block group">
                  <article className="bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:scale-[1.02]" data-accent={relatedCourse.accent.replace('edtech-','')}>
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-black/30 text-white/90 border border-white/20 backdrop-blur-sm">
                        {relatedCourse.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-edtech-orange transition-colors duration-300">
                      {relatedCourse.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        {relatedCourse.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        {relatedCourse.extra}
                      </span>
                    </div>
                    <span className="absolute top-4 right-4 px-2.5 py-1 text-xs font-bold rounded-full bg-edtech-green text-black border border-white/20 shadow-lg">
                      {relatedCourse.badge}
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
