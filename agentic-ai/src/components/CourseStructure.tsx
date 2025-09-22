'use client';

import { motion } from 'framer-motion';
import { BookOpen, Brain, Target, Zap, Code, Lightbulb, Shield, ArrowRight } from 'lucide-react';

interface CourseStructureProps {
  onApplyNow: () => void;
}

export default function CourseStructure({ onApplyNow }: CourseStructureProps) {
  const topics = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "✨ Agentic AI Fundamentals",
      description: "Build the foundation to design intelligent agents, understand autonomous systems, and create multi-agent workflows that solve real-world problems.",
      highlight: "For AI Builders:"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "✨ LangChain & AutoGen Mastery",
      description: "Master the leading frameworks for building AI agents. Create complex workflows that handle reasoning, memory, and tool integration automatically.",
      highlight: "For AI Builders:"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "✨ OpenAI & LLM Integration",
      description: "Hands-on integration with OpenAI APIs, advanced prompting techniques, and building production-ready AI systems with proper error handling.",
      highlight: "For AI Builders:",
      extra: "Explore 20+ cutting-edge AI models and APIs during our live coding sessions."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "✨ Production Deployment",
      description: "Deploy AI agents to the cloud, implement monitoring systems, and scale your applications to handle thousands of users reliably.",
      highlight: "For AI Builders:"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "✨ Agent Architecture & Design",
      description: "Design sophisticated agent systems with memory, planning capabilities, and tool usage patterns that adapt to complex scenarios.",
      highlight: "For AI Builders:"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "✨ AI Safety & Best Practices",
      description: "Implement safety guardrails, handle edge cases, and build responsible AI systems that users trust and regulators approve.",
      highlight: "For AI Builders:"
    }
  ];

  return (
    <section id="curriculum" className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            📖 <span className="text-primary">4-MONTH CURRICULUM</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Master AI skills for{' '}
            <span className="font-bold text-primary">high-paying jobs & freelancing success</span>
          </p>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-primary mr-3 flex-shrink-0">
                  {topic.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{topic.title}</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                <span className="font-medium text-primary">{topic.highlight}</span> {topic.description}
              </p>
              {topic.extra && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {topic.extra}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              💰 Double Your Income with High-Demand AI Skills
            </h3>
            <p className="text-lg mb-6 text-gray-300">
              4 months of intensive training designed for job placement and freelancing success. 
              Learn skills that companies pay £45K-£80K+ for, with guaranteed placement assistance.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onApplyNow}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 text-lg rounded-lg transition-colors"
            >
              <span className="block sm:hidden">View Curriculum</span>
              <span className="hidden sm:block">View Full Curriculum</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}