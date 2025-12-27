
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { usePageImages } from '@/lib/usePageImages';
import { useSiteContent } from '@/lib/useSiteContent';

const HeroSection = () => {
  const { images } = usePageImages();
  const { content } = useSiteContent();
  const bgImage = images.home?.heroBackground;

  return (
    <div className="relative bg-maroon text-white py-20 overflow-hidden min-h-[500px] flex items-center">
      {bgImage ? (
        <>
          <div className="absolute inset-0 z-0">
             <img src={bgImage} alt="Hero Background" className="w-full h-full object-cover" />
             {/* Enhanced gradient overlay for better text contrast */}
             <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 via-maroon/70 to-maroon/50 mix-blend-multiply" />
             <div className="absolute inset-0 bg-black/20" />
          </div>
        </>
      ) : (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-2xl md:text-5xl font-bold mb-6 drop-shadow-lg tracking-tight"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {content.home?.heroTitle || "Welcome to Shivadhama Residency"}
          </motion.h1>
          <p className="text-xl md:text-2xl mb-8 text-white/95 font-light drop-shadow-md">
            {content.home?.heroSubtitle || "Premium Rental Apartments in the Heart of Mysuru"}
          </p>
          <div className="inline-flex items-center justify-center space-x-2 text-lg drop-shadow-md bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
            <MapPin className="w-5 h-5 text-white" />
            <span>Jayalakshmipuram, Mysuru</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
