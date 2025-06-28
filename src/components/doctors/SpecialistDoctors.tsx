import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Bone, Activity, Star, Award, Calendar, Users } from 'lucide-react';
import DoctorPopup from './DoctorPopup';

const SpecialistDoctors: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const doctors = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiology',
      experience: 15,
      education: 'MBBS, MD (Medicine), DM (Cardiology) - AIIMS New Delhi',
      achievements: [
        'Performed over 2000+ successful cardiac procedures',
        'Pioneer in minimally invasive cardiac surgery',
        'Published 50+ research papers in international journals',
        'Recipient of National Excellence Award in Cardiology',
        'Former Head of Cardiology at AIIMS'
      ],
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      patients: 5000,
      location: 'Sir Ganga Ram Hospital, New Delhi',
      phone: '+91-11-2575-0000',
      email: 'dr.rajesh@sgrh.com',
      testimonial: {
        text: 'Dr. Kumar saved my life with his expertise in cardiac surgery. His compassionate care and advanced treatment gave me a second chance at life. The minimally invasive procedure he performed reduced my recovery time significantly.',
        patient: 'Mrs. Priya Sharma, Age 52'
      },
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      communityLink: '/community/cardiology'
    },
    {
      id: '2',
      name: 'Dr. Meera Gupta',
      specialty: 'Oncology',
      experience: 12,
      education: 'MBBS, MD (Medicine), DM (Medical Oncology) - AIIMS New Delhi',
      achievements: [
        'Specialist in precision cancer therapy and immunotherapy',
        'Led breakthrough research in targeted cancer treatment',
        'Treated 3000+ cancer patients with 85% success rate',
        'International fellowship in Cancer Research at Johns Hopkins',
        'Published 40+ papers in top oncology journals'
      ],
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      patients: 3500,
      location: 'Sir Ganga Ram Hospital, New Delhi',
      phone: '+91-11-2575-0001',
      email: 'dr.meera@sgrh.com',
      testimonial: {
        text: 'Dr. Gupta\'s innovative treatment approach helped me beat stage 3 breast cancer. Her dedication, expertise, and the personalized treatment plan she created gave me hope when I had none.',
        patient: 'Mr. Amit Singh, Age 45'
      },
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      communityLink: '/community/oncology'
    },
    {
      id: '3',
      name: 'Dr. Vikram Malhotra',
      specialty: 'Neurology',
      experience: 18,
      education: 'MBBS, MD (Medicine), DM (Neurology) - AIIMS New Delhi',
      achievements: [
        'Expert in complex brain surgeries and stroke treatment',
        'Pioneer in advanced neurological intervention techniques',
        'Performed 1500+ successful neurological procedures',
        'Head of Neuroscience Department for 8 years',
        'International recognition for stroke treatment protocols'
      ],
      image: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      patients: 4200,
      location: 'Sir Ganga Ram Hospital, New Delhi',
      phone: '+91-11-2575-0002',
      email: 'dr.vikram@sgrh.com',
      testimonial: {
        text: 'Dr. Malhotra\'s expertise in neurology is unmatched. He successfully treated my complex brain aneurysm with precision and care. His post-operative follow-up was exceptional.',
        patient: 'Ms. Kavita Jain, Age 38'
      },
      icon: Brain,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      communityLink: '/community/neurology'
    },
    {
      id: '4',
      name: 'Dr. Sunita Agarwal',
      specialty: 'Orthopedics',
      experience: 14,
      education: 'MBBS, MS (Orthopedics), MCh (Orthopedics) - AIIMS New Delhi',
      achievements: [
        'Specialist in joint replacement and sports medicine',
        'Expert in minimally invasive orthopedic procedures',
        'Performed 2500+ successful orthopedic surgeries',
        'Consultant for national sports teams and athletes',
        'Pioneer in robotic-assisted joint replacement'
      ],
      image: 'https://images.pexels.com/photos/5452207/pexels-photo-5452207.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      patients: 3800,
      location: 'Sir Ganga Ram Hospital, New Delhi',
      phone: '+91-11-2575-0003',
      email: 'dr.sunita@sgrh.com',
      testimonial: {
        text: 'Dr. Agarwal\'s robotic knee replacement surgery gave me my mobility back completely. Her skill, precision, and the advanced techniques she used exceeded all my expectations.',
        patient: 'Mr. Ravi Khanna, Age 62'
      },
      icon: Bone,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      communityLink: '/community/orthopedics'
    }
  ];

  const openDoctorPopup = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsPopupOpen(true);
  };

  const closeDoctorPopup = () => {
    setIsPopupOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center px-4 py-2 bg-medical-gradient/10 border border-medical-teal/20 rounded-full text-medical-teal text-sm font-medium mb-6"
          >
            <Award className="h-4 w-4 mr-2" />
            AIIMS Graduated Specialists
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Our <span className="bg-medical-gradient bg-clip-text text-transparent">Expert Doctors</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our team of AIIMS-graduated specialists brings world-class expertise and 
            compassionate care to treat complex medical conditions with proven success rates.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white dark:bg-dark-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-200 dark:border-dark-border"
              onClick={() => openDoctorPopup(doctor)}
            >
              {/* Doctor Image */}
              <div className="relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute top-4 left-4 p-3 ${doctor.bgColor} rounded-full border border-white/20`}>
                  <doctor.icon className={`h-6 w-6 ${doctor.color}`} />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                    <span className="text-white text-sm ml-2 font-semibold">{doctor.rating}</span>
                  </div>
                  <div className="text-white text-xs bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                    AIIMS Graduate
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-medical-teal transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-medical-blue font-semibold mb-2">{doctor.specialty} Specialist</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {doctor.experience} years experience • {doctor.patients}+ patients treated
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>Expert Care</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Available</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 bg-medical-gradient text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDoctorPopup(doctor);
                    }}
                  >
                    View Full Profile
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 bg-white dark:bg-dark-surface border-2 border-medical-teal text-medical-teal rounded-lg font-medium hover:bg-medical-teal hover:text-white transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Navigate to community
                      window.location.href = doctor.communityLink;
                    }}
                  >
                    Join {doctor.specialty} Community
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-medical-teal/10 to-medical-blue/10 rounded-2xl p-8 border border-medical-teal/20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Specialized Medical Care?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Our AIIMS-graduated specialists are here to provide world-class treatment 
              for complex medical conditions. Book your consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-medical-gradient text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-medical-teal/30 transition-all duration-300"
              >
                Book Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-dark-surface border-2 border-medical-teal text-medical-teal rounded-full font-semibold text-lg hover:bg-medical-teal hover:text-white transition-all duration-300"
              >
                Emergency Services
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Doctor Popup */}
      <DoctorPopup
        doctor={selectedDoctor}
        isOpen={isPopupOpen}
        onClose={closeDoctorPopup}
      />
    </section>
  );
};

export default SpecialistDoctors;