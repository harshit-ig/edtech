

export const courseDetails = [
  {
    courseId: 'data-science-masters',
    overview: "Embark on a comprehensive Master of Science in Data Analytics journey that transforms you into a complete data science professional. This masters-level program covers advanced machine learning, AI ethics, MLOps & production systems, business strategy, and culminates in an original research project.",
    features: [
      {
        icon: "🎓",
        title: "Masters-Level Education",
        description: "Comprehensive 24-month program with advanced curriculum and research components"
      },
      {
        icon: "🧠",
        title: "Advanced AI & ML",
        description: "Deep learning, neural networks, and cutting-edge machine learning techniques"
      },
      {
        icon: "⚙️",
        title: "MLOps & Production",
        description: "Real-world deployment and production systems for machine learning models"
      },
      {
        icon: "📊",
        title: "Business Strategy",
        description: "Data-driven decision making and strategic business intelligence"
      },
      {
        icon: "🔬",
        title: "Research Project",
        description: "Original capstone research with publication opportunities"
      },
      {
        icon: "👨‍💼",
        title: "Executive Coaching",
        description: "Leadership development and career advancement support"
      }
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

    prerequisites: "Bachelor's degree in a quantitative field (Computer Science, Mathematics, Statistics, Engineering) or equivalent experience. Basic programming knowledge in Python or R. Fundamental understanding of statistics and linear algebra.",

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

  },
  {
    courseId: 'data-analytics',
    overview: "Transform into a data-driven professional with our comprehensive Data Analytics and AI certification program. Master the complete data lifecycle from collection to actionable insights using industry-standard tools and AI technologies.",
    features: [
      {
        icon: "📊",
        title: "Comprehensive Data Analysis",
        description: "Master the complete data lifecycle from collection to actionable insights"
      },
      {
        icon: "🤖",
        title: "AI & Machine Learning",
        description: "Learn to implement AI solutions and predictive analytics"
      },
      {
        icon: "💻",
        title: "Hands-On Projects",
        description: "Build real-world projects for your portfolio"
      },
      {
        icon: "🏆",
        title: "Microsoft Certification",
        description: "Prepare for industry-recognized Microsoft certifications"
      },
      {
        icon: "👨‍🏫",
        title: "Expert Mentorship",
        description: "1-on-1 guidance from industry professionals"
      },
      {
        icon: "🚀",
        title: "Career Support",
        description: "Comprehensive job placement and career guidance"
      }
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

    prerequisites: "Basic computer skills and eagerness to learn. No prior programming experience required.",

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

  },
  {
    courseId: 'gen-ai',
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

    prerequisites: "Basic programming knowledge (Python preferred) and familiarity with APIs",

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
      current: 2999,
      original: 3499,
      discount: "14% OFF",
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
    },
  }
];