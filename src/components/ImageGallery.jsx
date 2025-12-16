
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const nextImage = (e) => {
    e?.stopPropagation();
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image Display */}
        <div 
          className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 rounded-xl overflow-hidden cursor-pointer group border border-gray-200"
          onClick={() => setIsLightboxOpen(true)}
        >
          {/* Image Container with object-contain to prevent cropping */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
             <img
              src={images[selectedImage]}
              alt={`Property view ${selectedImage + 1}`}
              className="w-full h-full object-contain" 
            />
          </div>
          
          {/* Hover Overlay with Hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center backdrop-blur-sm shadow-sm">
              <Maximize2 className="w-4 h-4 mr-2" />
              View Fullscreen
            </span>
          </div>

          {/* Navigation Arrows (visible on hover) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          {/* Mobile Image Counter */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md md:hidden">
             {selectedImage + 1} / {images.length}
          </div>
        </div>
        
        {/* Thumbnails Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all flex-shrink-0 border-2 ${
                  selectedImage === index 
                    ? 'border-maroon opacity-100 ring-1 ring-maroon' 
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center backdrop-blur-sm"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20 z-50"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full z-50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <div className="relative w-full h-full p-4 md:p-10 flex items-center justify-center">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={images[selectedImage]}
                alt={`Property view ${selectedImage + 1}`}
                className="max-w-full max-h-full object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full z-50"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm backdrop-blur-md">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
