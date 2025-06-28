import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Stethoscope, 
  Shield, 
  Clock, 
  Users, 
  Brain, 
  Heart,
  MessageSquare,
  Star,
  CheckCircle,
  Zap,
  Lock,
  Activity
} from 'lucide-react';

const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Stethoscope,
      title: 'Verified Medical Experts',
      description: 'All doctors are verified with medical licenses and credentials. Get answers from real healthcare professionals.',
      color: 'text-medical-teal',
      bgColor: 'bg-medical-teal/10',
      borderColor: 'border-medical-teal/20'
    },
    {
      icon: Clock,
      title: 'Fast Response Times',
      description: 'Get medical answers within 2 hours on average. Emergency questions are prioritized for immediate attention.',
      color: 'text-medical-blue',
      bgColor: 'bg-medical-blue/10',
      borderColor: 'border-medical-blue/20'
    },
    {
      icon: Shield,
      title: 'Complete Privacy',
      description: 'Your health information is protected with bank-level encryption. Ask sensitive questions anonymously.',
      color: 'text-medical-green',
      bgColor: 'bg-medical-green/10',
      borderColor: 'border-medical-green/20'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Our AI analyzes your symptoms and suggests relevant questions while flagging potential emergencies.',
      color: 'text-medical-purple',
      bgColor: 'bg-medical-purple/10',
      borderColor: 'border-medical-purple/20'
    },
    {
      icon: MessageSquare,
      title: 'Interactive Discussions',
      description: 'Engage in detailed conversations with doctors. Ask follow-up questions and get comprehensive care.',
      color: 'text-medical-pink',
      bgColor: 'bg-medical-pink/10',
      borderColor: 'border-medical-pink/20'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with others who have similar health concerns. Share experiences and get peer support.',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/20'
    }
  ];

  const emergencyFeatures = [
    {
      icon: Zap,
      title: 'Emergency Detection',
      description: 'AI automatically detects critical symptoms and alerts emergency services'
    },
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Track your symptoms and get continuous medical guidance'
    },
    {
      icon: Lock,
      title: 'Secure Data',
      description: 'HIPAA-compliant security ensures your medical data stays private'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-surface relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-medical-teal rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-medical-blue rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          ref={ref}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center px-4 py-2 bg-medical-gradient/10 border border-medical-teal/20 rounded-full text-medical-teal text-sm font-medium mb-6"
          >
            <Heart className="h-4 w-4 mr-2" />
            Why choose MedicalQ?
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Healthcare Made <span className="bg-medical-gradient bg-clip-text text-transparent">Simple</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of healthcare with our comprehensive platform designed 
            to connect you with medical experts instantly.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                transition: { duration: 0.2 }
              }}
              className={`relative p-8 bg-dark-surface/50 backdrop-blur-xl border ${feature.borderColor} rounded-2xl group hover:bg-dark-surface/70 transition-all duration-300 overflow-hidden`}
            >
              {/* Hover Effect Background */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 0.1 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 ${feature.bgColor} rounded-2xl`}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} border ${feature.borderColor} rounded-2xl mb-6 group-hover:shadow-lg transition-all duration-300`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-medical-gradient group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Element */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-${feature.color.split('-')[1]}-400 to-${feature.color.split('-')[1]}-600 rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Emergency Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6"
            >
              <Zap className="h-8 w-8 text-red-400" />
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Emergency <span className="text-red-400">Ready</span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our advanced AI system can detect medical emergencies and provide immediate guidance 
              while connecting you with emergency services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {emergencyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center justify-center w-12 h-12 bg-red-500/20 rounded-full mb-4"
                >
                  <feature.icon className="h-6 w-6 text-red-400" />
                </motion.div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(20, 184, 166, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-medical-gradient text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-medical-teal/30 transition-all duration-300 group"
          >
            <span className="flex items-center">
              Start Your Health Journey
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <CheckCircle className="h-5 w-5 ml-2" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;