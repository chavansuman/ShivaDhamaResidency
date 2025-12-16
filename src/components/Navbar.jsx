
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Building2, Info, Phone, MapPin, BookOpen, Lock } from 'lucide-react';
import { useSiteContent } from '@/lib/useSiteContent';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { content } = useSiteContent();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/location', label: 'Location', icon: MapPin },
    // { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
    { path: '/admin', label: 'Admin', icon: Lock }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-maroon" />
            <span className="text-xl font-bold text-gray-900 hidden sm:inline-block">
              {content.global?.siteName || "Shivadhama Residency"}
            </span>
            <span className="text-xl font-bold text-gray-900 sm:hidden">
              {content.global?.siteName?.split(' ')[0] || "Shivadhama"}
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 transition-colors text-sm font-medium ${
                  isActive(item.path)
                    ? 'text-maroon'
                    : 'text-gray-700 hover:text-maroon'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-maroon text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
