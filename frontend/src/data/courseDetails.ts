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
  'data-science-masters': {
    overview: "Embark on a comprehensive Master of Science in Data Analytics journey that transforms you into a complete data science professional. This masters-level program covers advanced machine learning, AI ethics, MLOps & production systems, business strategy, and culminates in an original research project.",
    objectives: [
      "Master advanced machine learning algorithms and deep learning techniques",
      "Develop expertise in AI ethics and responsible AI deployment",
      "Build production-ready MLOps pipelines and deployment systems",
      "Understand business intelligence and strategic decision-making",
      "Conduct independent research and present findings to industry experts",
      "Prepare for senior data scientist and ML engineer roles"
    ],
    curriculum: [
      {
        module: "Module 1: Data Science Foundations",
        duration: "6 months",
        topics: [
          "Advanced statistical analysis and probability theory",
          "Data structures and algorithm optimization for big data",
          "Mathematical foundations for machine learning",
          "Research methodology and experimental design",
          "Data visualization and storytelling techniques",
          "Python and R programming for data science",
          "SQL and NoSQL database management",
          "Version control and collaborative development"
        ]
      },
      {
        module: "Module 2: Advanced Machine Learning",
        duration: "6 months", 
        topics: [
          "Supervised learning: advanced regression and classification",
          "Unsupervised learning: clustering and dimensionality reduction",
          "Deep learning: neural networks, CNNs, RNNs, and transformers",
          "Natural language processing and computer vision",
          "Reinforcement learning and recommendation systems",
          "Ensemble methods and model selection",
          "Feature engineering and selection techniques",
          "Hyperparameter optimization and automated ML"
        ]
      },
      {
        module: "Module 3: MLOps & Production Systems",
        duration: "4 months",
        topics: [
          "Model deployment strategies and containerization",
          "CI/CD pipelines for machine learning projects",
          "Model monitoring and performance tracking",
          "A/B testing and experimentation frameworks",
          "Scalable data processing with Apache Spark",
          "Cloud platforms: AWS, Azure, and GCP for ML",
          "Model versioning and experiment management",
          "Production debugging and model maintenance"
        ]
      },
      {
        module: "Module 4: Business Strategy & Ethics",
        duration: "4 months",
        topics: [
          "Business intelligence and data-driven decision making",
          "AI ethics and bias detection in machine learning",
          "Privacy-preserving machine learning techniques",
          "Regulatory compliance and data governance",
          "Strategic planning for data science initiatives",
          "Stakeholder communication and presentation skills",
          "ROI measurement for data science projects",
          "Leadership in data science teams"
        ]
      },
      {
        module: "Module 5: Capstone Research Project",
        duration: "4 months",
        topics: [
          "Research proposal development and literature review",
          "Original research methodology design",
          "Advanced data collection and preprocessing",
          "Novel algorithm development or application",
          "Statistical analysis and hypothesis testing",
          "Research paper writing and academic standards",
          "Peer review and iterative improvement",
          "Industry presentation and defense"
        ]
      }
    ],
    tools: [
      { name: "Python", icon: "🐍" },
      { name: "R", icon: "📊" },
      { name: "TensorFlow", icon: "🧠" },
      { name: "PyTorch", icon: "🔥" },
      { name: "Apache Spark", icon: "⚡" },
      { name: "Docker", icon: "🐳" },
      { name: "Kubernetes", icon: "⚓" },
      { name: "AWS/Azure/GCP", icon: "☁️" },
      { name: "MLflow", icon: "🔄" },
      { name: "Jupyter", icon: "📓" },
      { name: "Git", icon: "🔀" },
      { name: "Tableau/Power BI", icon: "📈" }
    ],
    skills: [
      "Advanced Machine Learning",
      "Deep Learning", 
      "AI Ethics",
      "MLOps & Deployment",
      "Business Intelligence",
      "Research Methodology",
      "Statistical Analysis",
      "Data Engineering",
      "Cloud Computing",
      "Leadership & Strategy"
    ],
    prerequisites: "Bachelor's degree in a quantitative field (Computer Science, Mathematics, Statistics, Engineering) or equivalent experience. Basic programming knowledge in Python or R. Fundamental understanding of statistics and linear algebra.",
    certification: "Master of Science in Data Analytics - Industry-recognized masters-level certificate upon completion of all modules and successful defense of capstone research project",
    testimonials: [
      {
        name: "Dr. Emily Rodriguez",
        role: "Senior Data Scientist at Google",
        avatar: "E",
        rating: 5,
        content: "This masters program exceeded my expectations. The depth of coverage in advanced ML and the research component prepared me for the most challenging data science roles. Now leading a team of 15 data scientists at Google.",
        color: "edtech-green"
      },
      {
        name: "Marcus Chen",
        role: "ML Engineering Director at Microsoft",
        avatar: "M",
        rating: 5,
        content: "The MLOps and production systems module was game-changing. I went from individual contributor to leading the ML infrastructure team at Microsoft. The business strategy component was invaluable for leadership roles.",
        color: "edtech-blue"
      },
      {
        name: "Dr. Sarah Kim",
        role: "Chief Data Officer at Tesla",
        avatar: "S",
        rating: 5,
        content: "The research project component set this program apart. Publishing my capstone research opened doors to C-level positions. The AI ethics module is crucial for responsible leadership in our field.",
        color: "edtech-orange"
      }
    ],
    successStats: [
      { label: "Masters Graduates", value: "150+", color: "edtech-green" },
      { label: "Research Publications", value: "85%", color: "green-600" },
      { label: "Senior Role Placement", value: "95%", color: "edtech-red" },
      { label: "Average Salary", value: "$180K+", color: "edtech-orange" }
    ],
    pricing: {
      current: 4999,
      original: 7999,
      discount: "37% OFF",
      deadline: "Masters Program - Limited Seats",
      features: [
        { text: "24 months of masters-level education", icon: "🎓" },
        { text: "185+ comprehensive lessons", icon: "📚" },
        { text: "1-on-1 research mentorship", icon: "👨‍🔬" },
        { text: "Industry research project", icon: "🔬" },
        { text: "Executive career coaching", icon: "👔" },
        { text: "Masters-level certificate", icon: "🏆" },
        { text: "Alumni network access", icon: "🌐" },
        { text: "Research publication support", icon: "📰" }
      ]
    },
    courseInfo: {
      startDate: "Next Cohort: March 1st",
      format: "Live Online + Research Labs",
      support: "PhD-level Mentorship",
      studentsEnrolled: "150+ Masters Students"
    },
    trustIndicators: {
      rating: "4.9/5",
      reviewCount: "150+ graduate reviews",
      testimonialPreview: {
        text: "This masters program exceeded my expectations. Now leading a team of 15 data scientists at Google.",
        author: "Dr. Emily Rodriguez, Senior Data Scientist at Google"
      }
    },
    careerSupport: [
      "Executive-level career coaching",
      "C-suite interview preparation",
      "Research publication assistance",
      "Industry conference speaking opportunities",
      "Alumni executive network access"
    ],
    instructors: [
      {
        name: "Dr. Michael Thompson",
        title: "Former Director of Data Science at Netflix",
        experience: "PhD in Computer Science, 15+ years leading data science teams"
      },
      {
        name: "Dr. Lisa Chen",
        title: "AI Research Scientist at OpenAI",
        experience: "PhD in Machine Learning, 50+ research publications"
      },
      {
        name: "Dr. James Wilson",
        title: "Chief Data Officer at Uber",
        experience: "PhD in Statistics, Former McKinsey Principal"
      }
    ]
  },
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
