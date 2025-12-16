import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

const FloatingButtons = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/919886000624?text=Hi%2C%20I%20am%20interested%20in%20Shivadhama%20Residency', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919886000624';
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-colors"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
      
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        onClick={handleCall}
        className="fixed bottom-24 right-6 w-14 h-14 bg-maroon hover:bg-maroon-dark text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-colors"
        aria-label="Call"
      >
        <Phone className="w-6 h-6" />
      </motion.button>
    </>
  );
};

export default FloatingButtons;