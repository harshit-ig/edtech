import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingDots from "../FloatingDots";
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
    tools: ["Python", "SQL", "Tableau", "Power BI", "Excel", "R", "Jupyter", "Git", "Azure/AWS"],
    prerequisites: "Basic computer skills and eagerness to learn. No prior programming experience required.",
    certification: "Industry-recognized certification upon completion + Microsoft certification eligibility",
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
    objectives: [
      "Master GPT, DALL-E, and other generative models",
      "Build AI-powered applications and solutions",
      "Understand prompt engineering and fine-tuning",
      "Deploy AI solutions in production environments",
      "Navigate ethical AI and responsible development"
    ],
    curriculum: [
      {
        module: "Module 1: AI Fundamentals",
        duration: "2 weeks",
        topics: ["AI History & Evolution", "Neural Networks Basics", "Deep Learning Foundations", "Gen AI Landscape"]
      },
      {
        module: "Module 2: Large Language Models",
        duration: "4 weeks",
        topics: ["GPT Architecture", "Prompt Engineering", "Fine-tuning Techniques", "Custom Model Training"]
      },
      {
        module: "Module 3: Multimodal AI",
        duration: "3 weeks",
        topics: ["Image Generation", "Text-to-Image", "Audio Processing", "Video Synthesis"]
      },
      {
        module: "Module 4: Application Development",
        duration: "3 weeks",
        topics: ["AI API Integration", "Chatbot Development", "Content Generation Systems", "AI Workflows"]
      }
    ],
    tools: ["OpenAI API", "Hugging Face", "LangChain", "Python", "TensorFlow", "PyTorch", "Streamlit", "FastAPI"],
    prerequisites: "Basic programming knowledge (Python preferred) and familiarity with APIs",
    certification: "Generative AI Expert Certificate + OpenAI partnership certification track"
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
  tools: ["Industry-standard tools", "Modern frameworks", "Professional software", "Cloud platforms"],
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
      
      {/* Background dots */}
      <div className="fixed inset-0 -z-10">
        <FloatingDots numDots={40} className="mix-blend-screen opacity-30" />
      </div>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link to="/" className="hover:text-edtech-green">Home</Link>
              <span>/</span>
              <Link to="/courses" className="hover:text-edtech-green">Courses</Link>
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
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                      {course.title}
                    </h1>
                  </div>
                </div>

                <div className="card p-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                  <p className="text-white/80 leading-relaxed mb-6">
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
                        <div className="font-semibold">{course.duration}</div>
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
                        <div className="font-semibold">{course.extra}</div>
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
                        <div className="font-semibold">Included</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Objectives */}
                <div className="card p-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                  <div className="grid gap-4">
                    {details.objectives.map((objective: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-edtech-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-edtech-green" fill="currentColor" viewBox="0 0 8 8">
                            <path d="m2.3 6.73.04-.04L6.67 2.3c.4-.4 1.06-.4 1.46 0s.4 1.06 0 1.46L3.8 8.09c-.4.4-1.06.4-1.46 0L.1 5.85c-.4-.4-.4-1.06 0-1.46s1.06-.4 1.46 0l.74.74z"/>
                          </svg>
                        </div>
                        <p className="text-white/80">{objective}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curriculum */}
                <div className="card p-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                  <div className="space-y-4">
                    {details.curriculum.map((module: any, index: number) => (
                      <div key={index} className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold">{module.module}</h3>
                          <span className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">
                            {module.duration}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic: string, topicIndex: number) => (
                            <span key={topicIndex} className="text-xs bg-white/5 text-white/70 px-2 py-1 rounded-lg">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Technologies */}
                <div className="card p-6 md:p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Tools & Technologies</h2>
                  <div className="flex flex-wrap gap-3">
                    {details.tools.map((tool: string, index: number) => (
                      <span key={index} className="bg-gradient-to-r from-edtech-blue/20 to-edtech-green/20 border border-white/10 px-4 py-2 rounded-lg font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Enrollment Card */}
                  <div className="card p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold mb-2">$1,999</div>
                      <div className="text-white/60 line-through text-lg">$2,999</div>
                      <div className="text-edtech-green text-sm font-medium">33% OFF - Limited Time</div>
                    </div>
                    
                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Start Date</span>
                        <span>Next Batch: Jan 15th</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Format</span>
                        <span>Live Online</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Support</span>
                        <span>24/7 Assistance</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <a href="#get-started" className="cta cta-primary w-full block text-center">
                        Enroll Now
                      </a>
                      <a href="#contact" className="cta cta-secondary w-full block text-center">
                        Book Free Demo
                      </a>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4">What's Included</h3>
                    <div className="space-y-3 text-sm">
                      {[
                        "Live interactive sessions",
                        "Recorded video access",
                        "Hands-on projects",
                        "1-on-1 mentorship",
                        "Career support",
                        "Certificate of completion",
                        "Lifetime community access"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-edtech-green" fill="currentColor" viewBox="0 0 8 8">
                            <path d="m2.3 6.73.04-.04L6.67 2.3c.4-.4 1.06-.4 1.46 0s.4 1.06 0 1.46L3.8 8.09c-.4.4-1.06.4-1.46 0L.1 5.85c-.4-.4-.4-1.06 0-1.46s1.06-.4 1.46 0l.74.74z"/>
                          </svg>
                          <span className="text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4">Prerequisites</h3>
                    <p className="text-white/80 text-sm">{details.prerequisites}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Courses */}
        <section className="py-16 bg-black/20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold text-center mb-12">Related Courses</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {courses.filter(c => c.id !== course.id).slice(0, 3).map((relatedCourse) => (
                <Link key={relatedCourse.id} to={`/course/${relatedCourse.id}`} className="block">
                  <article className="course-card p-4 hover:transform hover:scale-105 transition-all duration-300" data-accent={relatedCourse.accent.replace('edtech-','')}>
                    <div className="course-head">
                      <span className="cat-pill">{relatedCourse.category}</span>
                    </div>
                    <h3 className="course-title mt-4 text-lg font-semibold line-clamp-2">
                      {relatedCourse.title}
                    </h3>
                    <div className="mt-4 flex items-center gap-3 text-sm text-white/70">
                      <span className="chip">{relatedCourse.duration}</span>
                      <span className="chip">{relatedCourse.extra}</span>
                    </div>
                    <span className="corner-badge">{relatedCourse.badge}</span>
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
