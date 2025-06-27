import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Bone, Activity, Star, Award } from 'lucide-react';
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
        'Recipient of National Excellence Award in Cardiology'
      ],
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      patients: 5000,
      location: 'Sir Ganga Ram Hospital, New Delhi',
      phone: '+91-11-2575-0000',
      email: 'dr.rajesh@sgrh.com',
      testimonial: {
        text: 'Dr. Kumar saved my life with his expertise in cardiac surgery. His compassionate care and advanced treatment gave me a second chance at life.',
        patient: 'Mrs. Priya Sharma'
      },
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      id: '2',
      name: 'Dr. Meera Gupta',
      specialty: 'Oncology',
      experience: 12,
      education: 'MBBS, MD (Medicine), DM (Medical Oncology) - AIIMS New Delhi',
      achievements: [
        'Specialist in precision cancer therapy',
        'Led breakthrough research in immunotherapy',
        'Treated 3000+ cancer patients successfully',
        'International fellowship in Cancer Research'
      ],
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      patients: 3500,
      location: 'Sir Ganga Ram Hospital, New Delhi',
      phone: '+91-11-2575-0001',
      email: 'dr.meera@sgrh.com',
      testimonial: {
        text: 'Dr. Gupta\'s innovative treatment approach helped me beat cancer. Her dedication and expertise are truly remarkable.',
        patient: 'Mr. Amit Singh'
      },
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: '3',
      name: 'Dr. Vikram Malhotra',
      specialty: 'Neurology',
      experience: 18,
      education: 'MBBS, MD (Medicine), DM (Neurology) - AIIMS New Delhi',
      achievements: [
        'Expert in complex brain surgeries',
        'Pioneer in stroke treatment protocols',
        'Performed 1500+ neurological procedures',
        'Head of Neuroscience Department'
      ],
      image: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      patients: 4200,
      location: 'Sir Ganga Ram Hospital, New Delhi',
      phone: '+91-11-2575-0002',
      email: 'dr.vikram@sgrh.com',
      testimonial: {
        text: 'Dr. Malhotra\'s expertise in neurology is unmatched. He successfully treated my complex brain condition with precision.',
        patient: 'Ms. Kavita Jain'
      },
      icon: Brain,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: '4',
      name: 'Dr. Sunita Agarwal',
      specialty: 'Orthopedics',
      experience: 14,
      education: 'MBBS, MS (Orthopedics), MCh (Orthopedics) - AIIMS New Delhi',
      achievements: [
        'Specialist in joint replacement surgery',
        'Expert in sports medicine and rehabilitation',
        'Performed 2500+ orthopedic surgeries',
        'Consultant for national sports teams'
      ],
      image: 'https://images.pexels.com/photos/5452207/pexels-photo-5452207.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      patients: 3800,
      location: 'Sir Ganga Ram Hospital, New Delhi',
      phone: '+91-11-2575-0003',
      email: 'dr.sunita@sgrh.com',
      testimonial: {
        text: 'Dr. Agarwal\'s joint replacement surgery gave me my mobility back. Her skill and care are exceptional.',
        patient: 'Mr. Ravi Khanna'
      },
      icon: Bone,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
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
            compassionate care to treat complex medical conditions.
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
              className="bg-white dark:bg-dark-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
              onClick={() => openDoctorPopup(doctor)}
            >
              {/* Doctor Image */}
              <div className="relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className={`absolute top-4 left-4 p-3 ${doctor.bgColor} rounded-full`}>
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
                    <span className="text-white text-sm ml-2">{doctor.rating}</span>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-medical-teal transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-medical-blue font-semibold mb-2">{doctor.specialty}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {doctor.experience} years experience
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>{doctor.patients}+ patients</span>
                  <span>AIIMS Graduate</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-medical-gradient text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDoctorPopup(doctor);
                  }}
                >
                  View Profile
                </motion.button>
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
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Need specialized care? Our expert doctors are here to help.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-medical-gradient text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-medical-teal/30 transition-all duration-300"
          >
            Book Consultation
          </motion.button>
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