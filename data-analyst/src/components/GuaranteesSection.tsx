'use client';

import { motion } from 'framer-motion';
import { Shield, DollarSign, TrendingUp, CheckCircle, ArrowRight, Clock } from 'lucide-react';

interface GuaranteesSectionProps {
  onApplyNow: () => void;
}

export default function GuaranteesSection({ onApplyNow }: GuaranteesSectionProps) {
  const guarantees = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "15-Day Money Back Guarantee",
      description: "Not satisfied? Get a full refund within 15 days, no questions asked.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Double Your Income Promise",
      description: "We guarantee you'll double your income within 4 months or get personalized coaching.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Job Placement Assistance",
      description: "Access to our exclusive network of 200+ hiring partners actively seeking data talent.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const incomePromises = [
    "💰 Average graduate salary: £30,000-£50,000",
    "🚀 85% of students double their income in 4 months",
    "💼 Job placement assistance with 200+ partner companies",
    "🌟 Freelancing support to earn £300-£1500+ per project",
    "📈 Lifetime career support and networking opportunities"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05),transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-green-100 border border-green-300 rounded-full px-6 py-2 mb-6"
          >
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-semibold">Risk-Free Investment</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We're So Confident, We <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Guarantee</span> Your Success
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your success is our reputation. That's why we back our program with industry-leading guarantees 
            that remove all risk from your investment in your future.
          </p>
        </motion.div>

        {/* Guarantees Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`${guarantee.bgColor} ${guarantee.borderColor} border-2 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className={`w-16 h-16 ${guarantee.color} mx-auto mb-6 flex items-center justify-center bg-white rounded-full shadow-md`}>
                {guarantee.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{guarantee.title}</h3>
              <p className="text-gray-600 leading-relaxed">{guarantee.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Income Promise Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">Double Your Income Promise</h3>
              </div>
              
              <p className="text-xl text-gray-200 mb-8">
                Our program is designed to transform your earning potential. Here's what our graduates achieve:
              </p>

              <div className="space-y-4">
                {incomePromises.map((promise, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{promise}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl p-8 mb-8"
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">85%</div>
                <div className="text-xl font-semibold">Students Double Income</div>
                <div className="text-sm opacity-90 mt-2">Within 4 Months</div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onApplyNow}
                className="bg-white text-gray-900 font-bold py-4 px-8 rounded-full text-lg hover:shadow-xl transition-all flex items-center space-x-2 mx-auto"
              >
                <span>Start Your Transformation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Risk Elimination Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center"
        >
          <Clock className="w-16 h-16 text-primary mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Zero Risk, Maximum Reward
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Try our program for 15 days. If you're not completely satisfied with the content, 
            teaching quality, or your progress, we'll refund every penny. No questions, no hassle.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="font-bold text-gray-800 mb-3">✅ What's Included in Your Guarantee:</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Full access to all course materials</li>
                <li>• Personal mentorship and support</li>
                <li>• Job placement assistance</li>
                <li>• Lifetime access to updates</li>
                <li>• Community and networking opportunities</li>
              </ul>
            </div>
            
            <div className="text-left">
              <h4 className="font-bold text-gray-800 mb-3">🚫 No Questions Asked If:</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• You're not satisfied with the content quality</li>
                <li>• The program doesn't meet your expectations</li>
                <li>• You feel it's not worth the investment</li>
                <li>• You need to withdraw for any reason</li>
                <li>• You simply change your mind</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}