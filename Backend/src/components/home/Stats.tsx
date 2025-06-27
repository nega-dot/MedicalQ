import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Users, 
  MessageSquare, 
  Clock, 
  Star,
  TrendingUp,
  Globe,
  Award,
  HeartHandshake
} from 'lucide-react';

const Stats: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counters, setCounters] = useState({
    questions: 0,
    doctors: 0,
    users: 0,
    satisfaction: 0,
    responseTime: 0,
    countries: 0
  });

  const finalStats = {
    questions: 15847,
    doctors: 523,
    users: 50234,
    satisfaction: 98,
    responseTime: 1.8,
    countries: 45
  };

  const statsConfig = [
    {
      key: 'questions',
      icon: MessageSquare,
      value: counters.questions,
      suffix: '+',
      label: 'Questions Answered',
      color: 'text-medical-teal',
      bgColor: 'bg-medical-teal/10',
      borderColor: 'border-medical-teal/20'
    },
    {
      key: 'doctors',
      icon: Users,
      value: counters.doctors,
      suffix: '+',
      label: 'Verified Doctors',
      color: 'text-medical-blue',
      bgColor: 'bg-medical-blue/10',
      borderColor: 'border-medical-blue/20'
    },
    {
      key: 'users',
      icon: Globe,
      value: counters.users,
      suffix: '+',
      label: 'Active Users',
      color: 'text-medical-green',
      bgColor: 'bg-medical-green/10',
      borderColor: 'border-medical-green/20'
    },
    {
      key: 'satisfaction',
      icon: Star,
      value: counters.satisfaction,
      suffix: '%',
      label: 'Satisfaction Rate',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20'
    },
    {
      key: 'responseTime',
      icon: Clock,
      value: counters.responseTime,
      suffix: 'hrs',
      label: 'Avg Response Time',
      color: 'text-medical-purple',
      bgColor: 'bg-medical-purple/10',
      borderColor: 'border-medical-purple/20'
    },
    {
      key: 'countries',
      icon: Award,
      value: counters.countries,
      suffix: '+',
      label: 'Countries Served',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/20'
    }
  ];

  useEffect(() => {
    if (inView) {
      const animateCounters = () => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const interval = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          const easeOut = 1 - Math.pow(1 - progress, 3);

          setCounters({
            questions: Math.floor(finalStats.questions * easeOut),
            doctors: Math.floor(finalStats.doctors * easeOut),
            users: Math.floor(finalStats.users * easeOut),
            satisfaction: Math.floor(finalStats.satisfaction * easeOut),
            responseTime: parseFloat((finalStats.responseTime * easeOut).toFixed(1)),
            countries: Math.floor(finalStats.countries * easeOut)
          });

          if (currentStep >= steps) {
            clearInterval(interval);
            setCounters(finalStats);
          }
        }, stepDuration);

        return () => clearInterval(interval);
      };

      const timeout = setTimeout(animateCounters, 500);
      return () => clearTimeout(timeout);
    }
  }, [inView]);

  const achievements = [
    {
      icon: TrendingUp,
      title: "Fastest Growing",
      description: "Health platform in 2024"
    },
    {
      icon: Award,
      title: "Medical Excellence",
      description: "Award winner 2023"
    },
    {
      icon: HeartHandshake,
      title: "Trusted Partner",
      description: "500+ hospitals network"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-surface to-dark-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-medical-teal/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-medical-blue/20 rounded-full blur-xl"
      />

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
            <TrendingUp className="h-4 w-4 mr-2" />
            Our Impact in Numbers
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by <span className="bg-medical-gradient bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join a growing community of patients and healthcare professionals who trust 
            MedicalQ for reliable medical information and expert consultation.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {statsConfig.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              className={`relative p-8 bg-dark-surface/50 backdrop-blur-xl border ${stat.borderColor} rounded-2xl group hover:bg-dark-surface/70 transition-all duration-300 overflow-hidden`}
            >
              {/* Background Gradient */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 0.1 }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 ${stat.bgColor} rounded-2xl`}
              />

              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ 
                    rotate: inView ? [0, 360] : 0,
                    scale: inView ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    delay: index * 0.2,
                    duration: 1,
                    ease: "easeInOut"
                  }}
                  className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} border ${stat.borderColor} rounded-2xl mb-6 group-hover:shadow-lg transition-all duration-300`}
                >
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-medical-gradient group-hover:bg-clip-text transition-all duration-300"
                >
                  {typeof stat.value === 'number' && stat.value >= 1000 
                    ? `${Math.floor(stat.value / 1000)}${stat.value % 1000 !== 0 ? '.' + Math.floor((stat.value % 1000) / 100) : ''}k`
                    : stat.value
                  }{stat.suffix}
                </motion.div>

                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ delay: 1 + index * 0.1, duration: 1 }}
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-${stat.color.split('-')[1]}-400 to-${stat.color.split('-')[1]}-600 rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Recognized Excellence
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-dark-surface/30 backdrop-blur-xl border border-dark-border/50 rounded-xl group hover:bg-dark-surface/50 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-12 h-12 bg-medical-gradient rounded-full mb-4 group-hover:shadow-lg group-hover:shadow-medical-teal/30 transition-all duration-300"
                >
                  <achievement.icon className="h-6 w-6 text-white" />
                </motion.div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-300 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-time Updates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full mr-2"
            />
            Live: {Math.floor(Math.random() * 50) + 20} doctors online now
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;