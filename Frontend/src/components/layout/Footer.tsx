import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Users, 
  Stethoscope, 
  FileText, 
  Shield, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Clock,
  Award,
  Building,
  BookOpen,
  CreditCard,
  Video,
  ChevronRight,
  Ambulance,
  UserCheck,
  Search,
  MessageSquare,
  TrendingUp,
  Languages
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'For Patients & Visitors',
      links: [
        { name: 'Request Appointment', href: '/appointment', icon: Calendar },
        { name: 'Find a Specialist', href: '/specialists', icon: Stethoscope },
        { name: 'Medical Departments', href: '/departments', icon: Building },
        { name: 'Lab Results', href: '/lab-results', icon: FileText },
        { name: 'Patient Guide', href: '/patient-guide', icon: BookOpen },
        { name: 'Emergency Services', href: '/emergency', icon: Ambulance }
      ]
    },
    {
      title: 'For Medical Professionals',
      links: [
        { name: 'Research & Publications', href: '/research', icon: Award },
        { name: 'Career Opportunities', href: '/careers', icon: Users },
        { name: 'Academic Programs', href: '/academics', icon: BookOpen },
        { name: "Doctor's Portal", href: '/doctor-portal', icon: UserCheck },
        { name: 'Medical Resources', href: '/resources', icon: FileText },
        { name: 'Continuing Education', href: '/education', icon: Award }
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'About Us', href: '/about', icon: Building },
        { name: 'News & Events', href: '/news', icon: FileText },
        { name: 'Health Community', href: '/community', icon: MessageSquare },
        { name: 'Privacy Policy', href: '/privacy', icon: Shield },
        { name: 'Terms of Service', href: '/terms', icon: FileText },
        { name: 'Contact Us', href: '/contact', icon: Mail }
      ]
    },
    {
      title: 'Additional Resources',
      links: [
        { name: 'International Patients', href: '/international', icon: Globe },
        { name: 'Insurance Information', href: '/insurance', icon: CreditCard },
        { name: 'Health Checkup Packages', href: '/packages', icon: Heart },
        { name: 'Telemedicine Services', href: '/telemedicine', icon: Video },
        { name: 'Health Blog', href: '/blog', icon: FileText },
        { name: 'Patient Support', href: '/support', icon: Users }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/sgrh', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/sgrh', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/sgrh', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/sgrh', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/sgrh', color: 'hover:text-red-500' }
  ];

  const contactInfo = [
    { icon: Phone, text: '+91-11-2575-0000', href: 'tel:+911125750000', label: 'Main Hospital' },
    { icon: Ambulance, text: '+91-11-2575-1111', href: 'tel:+911125751111', label: 'Emergency' },
    { icon: Mail, text: 'info@sgrh.com', href: 'mailto:info@sgrh.com', label: 'General Inquiries' },
    { icon: MapPin, text: 'Rajinder Nagar, New Delhi - 110060', href: 'https://maps.google.com', label: 'Location' }
  ];

  const certifications = [
    { name: 'NABH Accredited', icon: Award },
    { name: 'ISO 9001:2015', icon: Shield },
    { name: 'JCI Standards', icon: Globe },
    { name: 'NABL Certified', icon: Award }
  ];

  const languages = ['English', 'Hindi', 'Punjabi', 'Urdu'];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Hospital Info - Takes 2 columns */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Heart className="h-12 w-12 text-medical-teal" fill="currentColor" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-medical-blue rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-medical-gradient bg-clip-text text-transparent">
                    Sir Ganga Ram Hospital
                  </h3>
                  <p className="text-sm text-gray-400">Excellence in Healthcare Since 1951</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                A premier healthcare institution committed to providing world-class medical care 
                with compassion, innovation, and excellence. Serving the community for over 70 years 
                with state-of-the-art facilities and expert medical professionals.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-3 text-gray-300 hover:text-medical-teal transition-colors group p-2 rounded-lg hover:bg-gray-800"
                  >
                    <item.icon className="h-4 w-4 text-medical-teal group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-sm font-medium">{item.text}</span>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Operating Hours */}
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-medical-teal" />
                  Operating Hours
                </h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>OPD:</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency:</span>
                    <span className="text-medical-teal font-semibold">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lab Services:</span>
                    <span>6:00 AM - 10:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.2 }}
                      className={`p-3 bg-gray-800 rounded-full text-gray-400 ${social.color} transition-all duration-200 hover:bg-gray-700`}
                    >
                      <social.icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Sections - Each takes 1 column */}
          {footerSections.map((section, sectionIndex) => (
            <div key={section.title} className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
              >
                <h4 className="text-lg font-semibold mb-6 text-white border-b border-gray-700 pb-2">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: linkIndex * 0.05, duration: 0.4 }}
                    >
                      <a
                        href={link.href}
                        className="flex items-center space-x-2 text-gray-400 hover:text-medical-teal transition-colors group text-sm py-1"
                      >
                        <link.icon className="h-3 w-3 text-medical-teal/60 group-hover:text-medical-teal group-hover:scale-110 transition-all" />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.name}
                        </span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Newsletter & Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-medical-teal" />
                Stay Updated
              </h4>
              <p className="text-gray-400">
                Subscribe to our newsletter for health tips, medical updates, and hospital news.
              </p>
            </div>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-medical-gradient text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                Subscribe
              </motion.button>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <Languages className="h-4 w-4 mr-2 text-medical-teal" />
                Languages Available
              </h4>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 pt-6 border-t border-gray-800"
        >
          <h4 className="text-lg font-semibold mb-4 text-center">Accreditations & Certifications</h4>
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <cert.icon className="h-4 w-4 text-medical-teal" />
                <span className="text-sm text-gray-300">{cert.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>© {currentYear} Sir Ganga Ram Hospital. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <a href="/privacy" className="hover:text-medical-teal transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="/terms" className="hover:text-medical-teal transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="/sitemap" className="hover:text-medical-teal transition-colors">Sitemap</a>
                <span>•</span>
                <a href="/accessibility" className="hover:text-medical-teal transition-colors">Accessibility</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-medical-teal" />
                <span>NABH Accredited</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-medical-teal" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-medical-teal" />
                <span>JCI Standards</span>
              </div>
            </div>
          </div>
          
          {/* Emergency Notice */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3">
              <p className="text-red-400 text-sm font-medium flex items-center justify-center">
                <Ambulance className="h-4 w-4 mr-2" />
                For Medical Emergencies, Call: +91-11-2575-1111 (Available 24/7)
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;