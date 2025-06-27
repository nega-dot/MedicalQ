import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Users, Star, MapPin, Phone, Mail } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  education: string;
  achievements: string[];
  image: string;
  rating: number;
  patients: number;
  location: string;
  phone: string;
  email: string;
  testimonial: {
    text: string;
    patient: string;
  };
}

interface DoctorPopupProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

const DoctorPopup: React.FC<DoctorPopupProps> = ({ doctor, isOpen, onClose }) => {
  if (!doctor) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl bg-white dark:bg-dark-surface rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-medical-blue to-medical-teal p-6 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full border-4 border-white/20 object-cover"
                />
                <div>
                  <h2 className="text-3xl font-bold mb-2">{doctor.name}</h2>
                  <p className="text-xl opacity-90 mb-2">{doctor.specialty}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{doctor.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{doctor.patients}+ patients</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Education */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-medical-blue" />
                      Education & Qualifications
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-dark-card p-4 rounded-lg">
                      {doctor.education}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Key Achievements
                    </h3>
                    <ul className="space-y-2">
                      {doctor.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Star className="h-4 w-4 text-medical-teal mt-1 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-medical-blue" />
                        <span className="text-gray-700 dark:text-gray-300">{doctor.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-medical-blue" />
                        <span className="text-gray-700 dark:text-gray-300">{doctor.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-medical-blue" />
                        <span className="text-gray-700 dark:text-gray-300">{doctor.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Patient Testimonial */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Patient Testimonial
                    </h3>
                    <div className="bg-gradient-to-br from-medical-teal/10 to-medical-blue/10 p-6 rounded-lg border border-medical-teal/20">
                      <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4">
                        "{doctor.testimonial.text}"
                      </blockquote>
                      <cite className="text-medical-teal font-semibold">
                        - {doctor.testimonial.patient}
                      </cite>
                    </div>
                  </div>

                  {/* Specialization Details */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Specialization Focus
                    </h3>
                    <div className="bg-gray-50 dark:bg-dark-card p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300">
                        Dr. {doctor.name.split(' ')[1]} specializes in advanced {doctor.specialty.toLowerCase()} 
                        treatments with a focus on patient-centered care and cutting-edge medical technologies.
                      </p>
                    </div>
                  </div>

                  {/* Community Link */}
                  <div className="bg-gradient-to-r from-medical-blue/10 to-medical-teal/10 p-4 rounded-lg border border-medical-blue/20">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Join {doctor.specialty} Community
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Connect with other patients and get expert advice from Dr. {doctor.name.split(' ')[1]}
                    </p>
                    <button className="w-full py-2 bg-medical-blue text-white rounded-lg hover:bg-medical-blue/90 transition-colors">
                      Join Community
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-gray-50 dark:bg-dark-card border-t border-gray-200 dark:border-dark-border">
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-medical-gradient text-white rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-200"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book Appointment</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-white dark:bg-dark-surface border-2 border-medical-teal text-medical-teal rounded-lg font-semibold hover:bg-medical-teal hover:text-white transition-all duration-200"
                >
                  View Full Profile
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DoctorPopup;