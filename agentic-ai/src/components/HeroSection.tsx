'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, Play, Star } from 'lucide-react';
import Image from 'next/image';
import { VIDEO_CONFIG } from '@/config/video';

interface HeroSectionProps {
  onApplyNow: () => void;
  onWatchDemo?: () => void;
}

export default function HeroSection({ onApplyNow, onWatchDemo }: HeroSectionProps) {
  return (
    <section className="pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-muted rounded-full px-4 py-2 mb-6"
            >
              <Star className="w-4 h-4 text-warning fill-current" />
              <span className="text-sm font-medium">Job Placement Guarantee</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Master </span>
              <span className="text-primary">Agentic AI</span>
              <span className="text-foreground"> in 4 Months</span>
            </h1>

            <div className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              <p className="mb-4">Build intelligent AI agents that solve real business problems with our comprehensive curriculum:</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-center"><span className="text-primary mr-2">•</span><strong>Module 1: Foundations</strong> - Python, LLMs, LangChain basics</li>
                <li className="flex items-center"><span className="text-primary mr-2">•</span><strong>Module 2: Advanced Tools</strong> - RAG, memory, AutoGen systems</li>
                <li className="flex items-center"><span className="text-primary mr-2">•</span><strong>Module 3: Production</strong> - CrewAI, APIs, cloud deployment</li>
                <li className="flex items-center"><span className="text-primary mr-2">•</span><strong>Module 4: Professional</strong> - Portfolio, client projects, career</li>
              </ul>
              <p className="mt-4">Each module includes hands-on projects, real-world case studies, and industry-standard tools used by leading AI companies.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-gray-600">Modules</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-secondary">16</div>
                <div className="text-sm text-gray-600">Weeks</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-accent">8+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onApplyNow}
                className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors pulse-glow"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
              
              {VIDEO_CONFIG.enabled && onWatchDemo && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onWatchDemo}
                  className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 float">
              {/* Mock Code Editor */}
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/favicon.png"
                      alt="Edtech Informative"
                      width={16}
                      height={16}
                      className="w-4 h-4 opacity-70"
                      loading="lazy"
                    />
                    <span className="text-gray-400 text-xs font-mono">AI Studio</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex">
                    <span className="text-blue-400">const</span>
                    <span className="text-white ml-2">agenticAI</span>
                    <span className="text-white ml-2">=</span>
                    <span className="text-yellow-300 ml-2">{'{'}</span>
                  </div>
                  <div className="text-white ml-4">
                    <span className="text-cyan-400">modules</span>
                    <span className="text-white">:</span>
                    <span className="text-green-400 ml-2">4</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="text-white ml-4">
                    <span className="text-cyan-400">weeks</span>
                    <span className="text-white">:</span>
                    <span className="text-green-400 ml-2">16</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="text-white ml-4">
                    <span className="text-cyan-400">projects</span>
                    <span className="text-white">:</span>
                    <span className="text-green-400 ml-2">'8+'</span>
                  </div>
                  <div className="text-yellow-300">{'}'}</div>
                  <div className="text-gray-500 mt-2">
                    <span className="text-gray-500">// 🤖 Ready to build AI agents?</span>
                  </div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-4">
                {['LangChain', 'AutoGen', 'CrewAI', 'FastAPI'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-3 text-center font-medium"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-warning text-white rounded-full p-3"
            >
              <Award className="w-6 h-6" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-success text-white rounded-full p-3"
            >
              <Users className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}