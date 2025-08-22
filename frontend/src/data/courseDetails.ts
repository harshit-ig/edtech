export interface CourseDetails {
  overview: string;
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  objectives: string[];
  curriculum: Array<{
    module: string;
    duration: string;
    topics: string[];
  }>;
  tools: Array<{
    name: string;
    icon: string;
  }>;
  skills: string[];
  prerequisites: string;
  certification: string;
  testimonials: Array<{
    name: string;
    role: string;
    avatar: string;
    rating: number;
    content: string;
    color: string;
  }>;
  successStats: Array<{
    label: string;
    value: string;
    color: string;
  }>;
  pricing: {
    current: number;
    original: number;
    discount: string;
    deadline: string;
    features: Array<{
      text: string;
      icon: string;
    }>;
  };
  courseInfo: {
    startDate: string;
    format: string;
    support: string;
    studentsEnrolled: string;
  };
  trustIndicators: {
    rating: string;
    reviewCount: string;
    testimonialPreview: {
      text: string;
      author: string;
    };
  };
  careerSupport?: string[];
  instructors?: Array<{
    name: string;
    title: string;
    experience: string;
  }>;
}

export const courseDetails: Record<string, CourseDetails> = {
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
  },
  'agentic-ai': {
    overview: "Master the cutting-edge field of Agentic AI and build autonomous systems that can think, plan, and act independently. Learn to create AI agents that can handle complex workflows, make decisions, and interact with multiple systems seamlessly.",
    features: [
      {
        icon: "🤖",
        title: "Autonomous Agent Development",
        description: "Build AI agents that can operate independently, make decisions, and execute complex multi-step tasks without human intervention."
      },
      {
        icon: "⚡",
        title: "Advanced Automation",
        description: "Create sophisticated automation workflows that can adapt to changing conditions and handle exceptions intelligently."
      },
      {
        icon: "🧠",
        title: "Multi-Agent Systems",
        description: "Design and orchestrate multiple AI agents working together to solve complex business problems collaboratively."
      },
      {
        icon: "🔗",
        title: "System Integration",
        description: "Learn to integrate AI agents with existing business systems, APIs, and databases for seamless operation."
      }
    ],
    objectives: [
      "Master autonomous AI agent architecture and design patterns",
      "Build multi-agent systems for complex problem solving",
      "Create intelligent automation workflows for business processes",
      "Develop AI agents that can learn and adapt over time",
      "Implement robust error handling and decision-making systems"
    ],
    curriculum: [
      {
        module: "Module 1: Foundations of Agentic AI",
        duration: "2 weeks",
        topics: [
          "Introduction to autonomous agents",
          "Agent architectures and design patterns",
          "Decision-making algorithms",
          "Goal-oriented programming",
          "Agent communication protocols"
        ]
      },
      {
        module: "Module 2: Building Your First AI Agent",
        duration: "3 weeks", 
        topics: [
          "Agent development frameworks",
          "State management in agents",
          "Perception and action systems",
          "Planning and reasoning algorithms",
          "Agent testing and debugging"
        ]
      },
      {
        module: "Module 3: Multi-Agent Systems",
        duration: "3 weeks",
        topics: [
          "Agent coordination and collaboration",
          "Distributed problem solving",
          "Negotiation and consensus algorithms",
          "Load balancing in agent systems",
          "Conflict resolution mechanisms"
        ]
      },
      {
        module: "Module 4: Advanced Automation",
        duration: "4 weeks",
        topics: [
          "Workflow orchestration",
          "Dynamic task allocation",
          "Adaptive automation systems",
          "Exception handling strategies",
          "Performance optimization"
        ]
      },
      {
        module: "Module 5: Integration & Deployment",
        duration: "3 weeks",
        topics: [
          "API integration techniques",
          "Database connectivity",
          "Cloud deployment strategies", 
          "Monitoring and logging",
          "Security considerations"
        ]
      },
      {
        module: "Module 6: Capstone Project",
        duration: "1 week",
        topics: [
          "End-to-end agent system design",
          "Business problem solving",
          "Portfolio development",
          "Presentation and documentation",
          "Industry best practices"
        ]
      }
    ],
    tools: [
      { name: "LangChain", icon: "🔗" },
      { name: "AutoGPT", icon: "🤖" },
      { name: "CrewAI", icon: "👥" },
      { name: "OpenAI GPT-4", icon: "🧠" },
      { name: "Anthropic Claude", icon: "💭" },
      { name: "Python", icon: "🐍" },
      { name: "Docker", icon: "🐳" },
      { name: "Kubernetes", icon: "⚓" },
      { name: "Redis", icon: "🔴" },
      { name: "PostgreSQL", icon: "🐘" }
    ],
    skills: [
      "Autonomous Agent Development",
      "Multi-Agent Orchestration", 
      "Intelligent Automation",
      "Workflow Design",
      "AI Agent Architecture",
      "Decision Systems",
      "System Integration",
      "Cloud Deployment"
    ],
    prerequisites: "Basic programming knowledge (Python preferred), understanding of AI/ML concepts, and familiarity with APIs. No prior agent development experience required.",
    certification: "Agentic AI Specialist Certification upon successful completion of all modules and capstone project.",
    testimonials: [
      {
        name: "Sarah Chen",
        role: "AI Engineer",
        avatar: "S",
        rating: 5,
        content: "This course opened up a completely new world of AI for me. The autonomous agents I built are now saving my company 40+ hours per week.",
        color: "edtech-red"
      },
      {
        name: "Marcus Johnson", 
        role: "Automation Lead",
        avatar: "M",
        rating: 5,
        content: "Incredible depth and practical focus. The multi-agent systems I learned to build are revolutionizing our business processes.",
        color: "red-600"
      },
      {
        name: "Dr. Elena Rodriguez",
        role: "Research Scientist",
        avatar: "E", 
        rating: 5,
        content: "The most advanced AI course available. The instructors are clearly experts in the field and the projects are cutting-edge.",
        color: "edtech-orange"
      }
    ],
    successStats: [
      { label: "Career Advancement", value: "95%", color: "edtech-red" },
      { label: "Salary Increase", value: "80%", color: "red-600" },
      { label: "Job Placement", value: "92%", color: "edtech-red" },
      { label: "Student Satisfaction", value: "4.9★", color: "red-500" }
    ],
    pricing: {
      current: 2499,
      original: 3499,
      discount: "Save $1000 - Early Bird Special",
      deadline: "September 30th",
      features: [
        { text: "Live expert-led sessions", icon: "🎥" },
        { text: "Advanced AI projects", icon: "🤖" },
        { text: "1-on-1 agent mentorship", icon: "👨‍💻" },
        { text: "Industry partnerships", icon: "🤝" },
        { text: "Lifetime agent community access", icon: "🌐" },
        { text: "Advanced AI certification", icon: "🏆" },
        { text: "Job placement assistance", icon: "💼" },
        { text: "Access to premium AI tools", icon: "⚡" }
      ]
    },
    courseInfo: {
      startDate: "Next Cohort: October 15th",
      format: "Live Online + Hands-on Labs",
      support: "24/7 AI Expert Support",
      studentsEnrolled: "500+ Future AI Leaders"
    },
    trustIndicators: {
      rating: "4.9/5",
      reviewCount: "300+ reviews",
      testimonialPreview: {
        text: "This is the future of AI education. The autonomous agents I built are already deployed in production!",
        author: "James K., Senior AI Architect at Microsoft"
      }
    }
  },
  'web-development': {
    overview: "Master full-stack web development with our comprehensive bootcamp covering modern technologies like React, Node.js, and cloud deployment. Build real-world applications from frontend to backend.",
    features: [
      {
        icon: "🚀",
        title: "Full-Stack Development", 
        description: "Learn both frontend and backend technologies to become a complete web developer"
      },
      {
        icon: "⚡",
        title: "Modern Tech Stack",
        description: "Work with cutting-edge technologies like React, Node.js, Express, and MongoDB"
      },
      {
        icon: "🎯",
        title: "15+ Real Projects",
        description: "Build portfolio-ready projects including e-commerce sites, social platforms, and more"
      },
      {
        icon: "☁️",
        title: "Cloud Deployment",
        description: "Learn to deploy applications on AWS, Vercel, and other cloud platforms"
      }
    ],
    objectives: [
      "Build responsive, interactive web applications using React and modern JavaScript",
      "Develop robust backend APIs using Node.js, Express, and databases",
      "Implement user authentication, authorization, and security best practices",
      "Deploy full-stack applications to cloud platforms with CI/CD pipelines",
      "Work with version control, testing frameworks, and development workflows"
    ],
    curriculum: [
      {
        module: "Frontend Fundamentals",
        duration: "4 weeks",
        topics: ["HTML5 & CSS3", "JavaScript ES6+", "Responsive Design", "CSS Frameworks", "Git & Version Control"]
      },
      {
        module: "React Development",
        duration: "6 weeks", 
        topics: ["React Components", "State Management", "Hooks", "React Router", "Context API", "Redux Toolkit"]
      },
      {
        module: "Backend Development",
        duration: "5 weeks",
        topics: ["Node.js Fundamentals", "Express.js", "RESTful APIs", "Database Design", "MongoDB & Mongoose"]
      },
      {
        module: "Full-Stack Integration",
        duration: "4 weeks",
        topics: ["Authentication & Authorization", "File Uploads", "Real-time Features", "Testing", "API Security"]
      },
      {
        module: "Deployment & DevOps",
        duration: "3 weeks",
        topics: ["Cloud Deployment", "CI/CD Pipelines", "Docker Basics", "Domain & Hosting", "Performance Optimization"]
      }
    ],
    tools: [
      { name: "React", icon: "⚛️" },
      { name: "Node.js", icon: "🟢" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Express.js", icon: "🚂" },
      { name: "Git", icon: "📂" },
      { name: "VS Code", icon: "💻" },
      { name: "AWS", icon: "☁️" },
      { name: "Vercel", icon: "▲" }
    ],
    skills: ["React Development", "Node.js", "Express.js", "MongoDB", "RESTful APIs", "Authentication", "Cloud Deployment", "Git", "Responsive Design", "JavaScript ES6+"],
    prerequisites: "Basic understanding of programming concepts. Familiarity with HTML, CSS, and JavaScript is helpful but not required.",
    certification: "Full-Stack Web Developer Certification upon completion",
    testimonials: [
      {
        name: "Sarah Chen",
        role: "Full-Stack Developer at Spotify",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b193?w=150",
        rating: 5,
        content: "This bootcamp transformed me from a complete beginner to landing my dream job at Spotify. The project-based approach really works!",
        color: "green"
      },
      {
        name: "Alex Rodriguez", 
        role: "Software Engineer at Airbnb",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        rating: 5,
        content: "The full-stack curriculum is incredibly comprehensive. I'm now confident building entire applications from scratch.",
        color: "orange"
      }
    ],
    successStats: [
      { label: "Job Placement Rate", value: "94%", color: "green" },
      { label: "Average Salary Increase", value: "$25K+", color: "orange" },
      { label: "Portfolio Projects", value: "15+", color: "blue" }
    ],
    pricing: {
      current: 1999,
      original: 2999,
      discount: "33% OFF",
      deadline: "Limited Time Offer",
      features: [
        { text: "5 Months of Intensive Training", icon: "⏰" },
        { text: "15+ Real-World Projects", icon: "🎯" },
        { text: "1-on-1 Mentorship", icon: "👨‍🏫" },
        { text: "Career Support & Job Placement", icon: "💼" },
        { text: "Lifetime Access to Course Materials", icon: "♾️" }
      ]
    },
    courseInfo: {
      startDate: "Next cohort starts February 15, 2025",
      format: "Live Online Classes + Self-paced Projects",
      support: "24/7 Discord Community + Weekly Office Hours",
      studentsEnrolled: "2,800+ developers trained"
    },
    trustIndicators: {
      rating: "4.9/5",
      reviewCount: "1,200+ reviews",
      testimonialPreview: {
        text: "This bootcamp transformed me from a complete beginner to landing my dream job at Spotify.",
        author: "Sarah Chen, Full-Stack Developer"
      }
    }
  },
  'mobile-development': {
    overview: "Create stunning cross-platform mobile applications with React Native. Learn to build iOS and Android apps with a single codebase, covering everything from UI design to app store deployment.",
    objectives: [
      "Build native mobile apps for iOS and Android using React Native",
      "Implement navigation, state management, and mobile-specific features", 
      "Integrate with device APIs, push notifications, and backend services",
      "Publish apps to Google Play Store and Apple App Store",
      "Optimize app performance and implement offline functionality"
    ],
    curriculum: [
      {
        module: "React Native Fundamentals",
        duration: "3 weeks",
        topics: ["React Native Setup", "Components & Styling", "Navigation", "State Management", "Debugging Tools"]
      },
      {
        module: "Mobile UI/UX Development", 
        duration: "4 weeks",
        topics: ["Mobile Design Patterns", "Animations", "Gestures", "Platform-specific Components", "Responsive Mobile Design"]
      },
      {
        module: "Device Integration",
        duration: "3 weeks", 
        topics: ["Camera & Media", "Location Services", "Push Notifications", "Offline Storage", "Device APIs"]
      },
      {
        module: "Backend Integration & Deployment",
        duration: "4 weeks",
        topics: ["API Integration", "Authentication", "Real-time Features", "App Store Guidelines", "Publishing Process"]
      }
    ],
    tools: [
      { name: "React Native", icon: "📱" },
      { name: "Expo", icon: "🚀" },
      { name: "Android Studio", icon: "🤖" },
      { name: "Xcode", icon: "🍎" },
      { name: "Firebase", icon: "🔥" },
      { name: "Redux", icon: "🔄" }
    ],
    skills: ["React Native", "Mobile App Development", "iOS Development", "Android Development", "App Store Optimization", "Mobile UI/UX", "Push Notifications", "Device APIs"],
    prerequisites: "Basic knowledge of React and JavaScript. Mobile development experience not required.",
    certification: "React Native Mobile Developer Certification",
    testimonials: [
      {
        name: "Mike Johnson",
        role: "Mobile Developer at Uber",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        rating: 5,
        content: "This course gave me the skills to build professional mobile apps. Now working on Uber's mobile team!",
        color: "orange"
      }
    ],
    successStats: [
      { label: "App Store Success Rate", value: "89%", color: "edtech-green" },
      { label: "Apps Built", value: "10+", color: "blue" },
      { label: "Cross-Platform Efficiency", value: "70%+", color: "orange" }
    ],
    pricing: {
      current: 1799,
      original: 2499,
      discount: "28% OFF",
      deadline: "Early Bird Special",
      features: [
        { text: "4 Months of Mobile Development", icon: "📱" },
        { text: "10+ Mobile Apps Built", icon: "🎯" },
        { text: "App Store Submission Guidance", icon: "🏪" },
        { text: "Device Testing Lab Access", icon: "🧪" }
      ]
    },
    courseInfo: {
      startDate: "Next cohort starts March 1, 2025",
      format: "Live Coding Sessions + Project Workshops",
      support: "Mobile Development Community + Expert Mentors",
      studentsEnrolled: "1,500+ mobile developers"
    },
    trustIndicators: {
      rating: "4.8/5",
      reviewCount: "800+ reviews", 
      testimonialPreview: {
        text: "This course gave me the skills to build professional mobile apps. Now working on Uber's mobile team!",
        author: "Mike Johnson, Mobile Developer"
      }
    }
  },
  'cloud-computing': {
    overview: "Master cloud architecture and deployment with AWS services. Learn to design, build, and manage scalable cloud infrastructure while preparing for AWS certification exams.",
    objectives: [
      "Design and implement scalable cloud architectures on AWS",
      "Deploy and manage applications using cloud-native services",
      "Implement security best practices and compliance frameworks",
      "Optimize cloud costs and performance monitoring", 
      "Prepare for AWS Solutions Architect certification exam"
    ],
    curriculum: [
      {
        module: "Cloud Fundamentals",
        duration: "2 weeks",
        topics: ["Cloud Computing Concepts", "AWS Core Services", "IAM & Security", "Billing & Cost Management"]
      },
      {
        module: "Compute & Storage",
        duration: "3 weeks",
        topics: ["EC2 Instances", "Load Balancing", "Auto Scaling", "S3 Storage", "EBS Volumes", "Lambda Functions"]
      },
      {
        module: "Networking & Databases",
        duration: "3 weeks",
        topics: ["VPC Configuration", "Route 53", "CloudFront CDN", "RDS Databases", "DynamoDB", "ElastiCache"]
      },
      {
        module: "DevOps & Monitoring",
        duration: "4 weeks",
        topics: ["CloudFormation", "CodePipeline", "CloudWatch", "AWS CLI", "Container Services", "Serverless Architecture"]
      }
    ],
    tools: [
      { name: "AWS Console", icon: "☁️" },
      { name: "Terraform", icon: "🏗️" },
      { name: "Docker", icon: "🐳" },
      { name: "Kubernetes", icon: "⎈" },
      { name: "AWS CLI", icon: "💻" },
      { name: "CloudFormation", icon: "📋" }
    ],
    skills: ["AWS Cloud Services", "Cloud Architecture", "Infrastructure as Code", "DevOps", "Serverless Computing", "Container Orchestration", "Cloud Security", "Cost Optimization"],
    prerequisites: "Basic understanding of networking and system administration. Programming experience helpful.",
    certification: "AWS Solutions Architect Associate preparation + completion certificate",
    testimonials: [
      {
        name: "David Kim",
        role: "Cloud Architect at Netflix",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150", 
        rating: 5,
        content: "This course prepared me perfectly for the AWS certification and my role at Netflix. The hands-on labs were invaluable!",
        color: "green"
      }
    ],
    successStats: [
      { label: "AWS Certification Pass Rate", value: "92%", color: "green" },
      { label: "Salary Increase", value: "$30K+", color: "orange" },
      { label: "Cloud Projects", value: "8+", color: "blue" }
    ],
    pricing: {
      current: 1599,
      original: 2199,
      discount: "27% OFF",
      deadline: "Cloud Skills in Demand",
      features: [
        { text: "3 Months of Cloud Training", icon: "☁️" },
        { text: "AWS Certification Prep", icon: "🏆" },
        { text: "Hands-on Lab Environment", icon: "🧪" },
        { text: "Real Cloud Projects", icon: "🎯" }
      ]
    },
    courseInfo: {
      startDate: "Next cohort starts February 20, 2025",
      format: "Live Labs + Cloud Sandbox Access",
      support: "AWS-certified instructors + Study groups",
      studentsEnrolled: "2,100+ cloud engineers"
    },
    trustIndicators: {
      rating: "4.9/5",
      reviewCount: "950+ reviews",
      testimonialPreview: {
        text: "This course prepared me perfectly for the AWS certification and my role at Netflix.",
        author: "David Kim, Cloud Architect"
      }
    }
  },
  'cybersecurity': {
    overview: "Learn cybersecurity fundamentals, penetration testing, and ethical hacking methodologies. Develop skills to protect organizations from cyber threats and pursue a career in information security.",
    objectives: [
      "Understand cybersecurity frameworks and threat landscapes",
      "Perform penetration testing and vulnerability assessments",
      "Implement security controls and incident response procedures",
      "Master ethical hacking tools and methodologies",
      "Prepare for industry certifications like CEH and CISSP"
    ],
    curriculum: [
      {
        module: "Security Fundamentals",
        duration: "4 weeks",
        topics: ["Cybersecurity Frameworks", "Threat Modeling", "Risk Assessment", "Security Policies", "Compliance Standards"]
      },
      {
        module: "Network Security",
        duration: "5 weeks",
        topics: ["Network Protocols", "Firewalls & IDS", "VPN Technologies", "Wireless Security", "Network Monitoring"]
      },
      {
        module: "Ethical Hacking",
        duration: "6 weeks", 
        topics: ["Reconnaissance", "Vulnerability Scanning", "Exploitation Techniques", "Post-Exploitation", "Reporting"]
      },
      {
        module: "Incident Response & Forensics",
        duration: "4 weeks",
        topics: ["Incident Handling", "Digital Forensics", "Malware Analysis", "Recovery Procedures", "Legal Considerations"]
      },
      {
        module: "Advanced Security Topics",
        duration: "5 weeks",
        topics: ["Cloud Security", "IoT Security", "Application Security", "Cryptography", "Security Architecture"]
      }
    ],
    tools: [
      { name: "Kali Linux", icon: "🐉" },
      { name: "Metasploit", icon: "🛡️" },
      { name: "Nmap", icon: "🔍" },
      { name: "Burp Suite", icon: "🕷️" },
      { name: "Wireshark", icon: "🦈" },
      { name: "OWASP ZAP", icon: "⚡" }
    ],
    skills: ["Penetration Testing", "Vulnerability Assessment", "Incident Response", "Digital Forensics", "Network Security", "Ethical Hacking", "Security Frameworks", "Compliance"],
    prerequisites: "Basic networking knowledge and familiarity with operating systems. Programming experience beneficial.",
    certification: "Ethical Hacker Certification + preparation for CEH/CISSP exams",
    testimonials: [
      {
        name: "Jessica Martinez",
        role: "Security Analyst at CrowdStrike", 
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        rating: 5,
        content: "The hands-on labs and real-world scenarios prepared me perfectly for my cybersecurity career. The instructor expertise was exceptional!",
        color: "red"
      }
    ],
    successStats: [
      { label: "Job Placement Rate", value: "91%", color: "green" },
      { label: "Certification Pass Rate", value: "88%", color: "orange" },
      { label: "Practical Labs", value: "20+", color: "red" }
    ],
    pricing: {
      current: 2199,
      original: 2999,
      discount: "27% OFF", 
      deadline: "Cybersecurity Skills Critical",
      features: [
        { text: "6 Months of Security Training", icon: "🛡️" },
        { text: "20+ Hands-on Labs", icon: "🧪" },
        { text: "Industry Certification Prep", icon: "🏆" },
        { text: "Virtual Security Lab Access", icon: "💻" }
      ]
    },
    courseInfo: {
      startDate: "Next cohort starts March 15, 2025",
      format: "Live Hacking Labs + Case Studies", 
      support: "Cybersecurity Professionals + 24/7 Lab Access",
      studentsEnrolled: "1,800+ security professionals"
    },
    trustIndicators: {
      rating: "4.8/5",
      reviewCount: "720+ reviews",
      testimonialPreview: {
        text: "The hands-on labs and real-world scenarios prepared me perfectly for my cybersecurity career.",
        author: "Jessica Martinez, Security Analyst"
      }
    }
  }
};

// Default course details for courses not in the extended data
export const getDefaultCourseDetails = (course: any): CourseDetails => ({
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
  skills: [],
  prerequisites: "Basic computer literacy and enthusiasm to learn",
  certification: `Professional ${course.category} Certificate`,
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
});
