
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Home, Car, CheckCircle2 } from 'lucide-react'; // Removed Phone, Mail
import { useSiteContent } from '@/lib/useSiteContent';

const WhyTenantsLove = () => {
  const { content } = useSiteContent();

  const features = [
    {
      icon: Home,
      title: 'Premium Living Spaces',
      description: 'Spacious, well-ventilated apartments designed for modern family living with premium finishes.'
    },
    {
      icon: Users,
      title: 'No Brokerage',
      description: 'Direct owner dealing means zero commission. Save money and enjoy transparent communication.'
    },
    {
      icon: Shield,
      title: 'Secure Environment',
      description: '24/7 security surveillance and gated entry ensure a safe haven for you and your loved ones.'
    },
    {
      icon: Zap,
      title: 'Uninterrupted Comfort',
      description: 'Reliable power backup and constant water supply so your daily routine is never disrupted.'
    },
    {
      icon: CheckCircle2,
      title: 'Proactive Maintenance',
      description: 'Our dedicated in-house team resolves maintenance issues promptly to keep your home perfect.'
    },
    {
      icon: Car,
      title: 'Convenient Amenities',
      description: 'Dedicated parking, high-speed internet readiness, and easy access to local transport.'
    }
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{content.home?.whyChooseTitle}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.home?.whyChooseSubtitle}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-100">
                <feature.icon className="w-7 h-7 text-maroon" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-maroon transition-colors">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Removed contact details section as requested */}
        {/*
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-gray-700">
            {content.global?.contactPhone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-maroon" />
                <span className="text-lg font-medium tracking-wide">{content.global.contactPhone}</span>
              </div>
            )}
            {content.global?.contactEmail && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-maroon" />
                <span className="text-lg font-medium tracking-wide">{content.global.contactEmail}</span>
              </div>
            )}
          </div>
        </motion.div>
        */}
      </div>
    </div>
  );
};

export default WhyTenantsLove;
