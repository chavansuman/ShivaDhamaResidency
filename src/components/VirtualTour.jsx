
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const VirtualTour = ({ tourData }) => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const rooms = tourData?.rooms || [];

  if (!rooms.length) return null;

  const currentRoom = rooms[activeRoomIndex];

  const handleNext = () => {
    setActiveRoomIndex((prev) => (prev + 1) % rooms.length);
  };

  const handlePrev = () => {
    setActiveRoomIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col">
      {/* Viewport Container */}
      <div className="relative h-[400px] md:h-[550px] bg-black overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoom.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
             <img
              src={currentRoom.image}
              alt={currentRoom.name}
              className="w-full h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="pointer-events-auto bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12 backdrop-blur-sm transition-all"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="pointer-events-auto bg-black/30 hover:bg-black/50 text-white rounded-full h-12 w-12 backdrop-blur-sm transition-all"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>

        {/* Room Label Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12 pointer-events-none">
           <h3 className="text-2xl font-bold text-white mb-1">{currentRoom.name}</h3>
           <p className="text-white/80 text-sm max-w-2xl">{currentRoom.description}</p>
        </div>
        
        {/* Fullscreen Hint */}
        <div className="absolute top-4 right-4">
           <Button 
             variant="ghost" 
             size="sm" 
             className="bg-black/30 hover:bg-black/50 text-white pointer-events-none backdrop-blur-md"
             onClick={() => window.open(currentRoom.image, '_blank')}
           >
             <Maximize2 className="w-4 h-4 mr-2" /> View Full
           </Button>
        </div>
      </div>

      {/* Thumbnails Navigation */}
      <div className="bg-gray-50 p-4 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Room Navigation</p>
        <div className="flex gap-3 overflow-x-auto pb-2 px-1 custom-scrollbar">
          {rooms.map((room, index) => (
            <button
              key={room.id}
              onClick={() => setActiveRoomIndex(index)}
              className={cn(
                "flex-shrink-0 relative w-32 h-20 rounded-lg overflow-hidden transition-all duration-300 border-2 group",
                activeRoomIndex === index 
                  ? "border-maroon ring-2 ring-maroon/20 scale-105 opacity-100 shadow-md" 
                  : "border-transparent opacity-70 hover:opacity-100 grayscale hover:grayscale-0"
              )}
            >
              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              <div className={cn(
                "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity",
                activeRoomIndex === index ? "opacity-0" : "opacity-100 group-hover:opacity-0"
              )}>
                 <span className="text-white text-xs font-medium px-2 text-center drop-shadow-md truncate w-full">{room.name}</span>
              </div>
              {activeRoomIndex === index && (
                <div className="absolute inset-0 ring-inset ring-2 ring-white/20 rounded-lg"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
