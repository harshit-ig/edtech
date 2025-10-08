import { motion } from 'framer-motion';
import { Award, CheckCircle, ArrowRight } from 'lucide-react';
import faviconImg from '../assets/favicon.png';

interface CertificateSectionProps {
  onApplyNow: () => void;
}

export default function CertificateSection({ onApplyNow }: CertificateSectionProps) {
  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-edtech-blue/10 rounded-full px-4 py-2 mb-6"
            >
              <Award className="w-4 h-4 text-edtech-blue" />
              <span className="text-sm font-medium text-edtech-blue">Industry-Recognized Certification</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Get Your </span>
              <span className="text-edtech-blue">Professional</span>
              <span className="text-gray-900"> Certificate</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Upon successful completion of our comprehensive programs, you'll receive an 
              industry-recognized certificate that validates your expertise and demonstrates 
              your commitment to professional development.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-edtech-blue flex-shrink-0" />
                <span className="text-gray-700">Verified completion of expert-led training</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-edtech-blue flex-shrink-0" />
                <span className="text-gray-700">Hands-on project portfolio with real-world applications</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-edtech-blue flex-shrink-0" />
                <span className="text-gray-700">Showcase your skills to top employers</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-edtech-blue flex-shrink-0" />
                <span className="text-gray-700">LinkedIn-shareable digital certificate</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onApplyNow}
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-edtech-red to-edtech-orange text-black rounded-full font-bold text-lg hover:brightness-110 transition-all hover:shadow-xl"
            >
              Earn Your Certificate
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right Certificate Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 border-4 border-edtech-blue/20">
              {/* Certificate Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <img
                    src={faviconImg}
                    alt="Edtech Informative"
                    className="w-8 h-8"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-bold text-edtech-blue">Edtech Informative</h3>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-edtech-blue to-transparent mb-4"></div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Certificate of Completion</h4>
                <p className="text-gray-600 text-sm">This certifies that</p>
              </div>

              {/* Certificate Body */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-edtech-blue mb-2">Sarah Johnson</div>
                <p className="text-gray-700 mb-4">has successfully completed the</p>
                <div className="bg-edtech-blue/10 rounded-lg p-4 mb-4">
                  <h5 className="text-xl font-bold text-edtech-blue mb-2">
                    Data Analytics Professional Program
                  </h5>
                  <p className="text-sm text-gray-600">
                    6-Month Career Program • 150+ Hours • Real-World Projects
                  </p>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Demonstrating proficiency in advanced technical skills and professional excellence
                </p>
              </div>

              {/* Certificate Footer */}
              <div className="flex justify-between items-end text-xs text-gray-500">
                <div>
                  <div className="w-20 h-px bg-gray-300 mb-1"></div>
                  <p>Date: 18 January 2025</p>
                </div>
                <div className="text-right">
                  <div className="w-20 h-px bg-gray-300 mb-1 ml-auto"></div>
                  <p>Verification ID: #CERT-2025</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-edtech-blue/30"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-edtech-blue/30"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-edtech-blue/30"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-edtech-blue/30"></div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-edtech-orange text-black rounded-full p-4 shadow-lg"
            >
              <Award className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}