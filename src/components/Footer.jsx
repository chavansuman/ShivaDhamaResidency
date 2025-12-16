
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { useSiteContent } from '@/lib/useSiteContent';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { content } = useSiteContent();

  const handleDirections = () => {
    if (content.global?.googleMapsUrl) {
      window.open(content.global.googleMapsUrl, '_blank');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="w-8 h-8 text-maroon" />
              <span className="text-xl font-bold">{content.global?.siteName || "Shivadhama Residency"}</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              {content.global?.footerAbout}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-maroon-light">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/location" className="block text-gray-400 hover:text-white transition-colors">
                Location
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
              <Link to="/blog" className="block text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-maroon-light">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-maroon flex-shrink-0 mt-1" />
                <span className="text-gray-400">{content.global?.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-maroon flex-shrink-0" />
                <span className="text-gray-400">{content.global?.contactPhone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-maroon flex-shrink-0" />
                <span className="text-gray-400">{content.global?.contactEmail}</span>
              </div>
              <div className="pt-2">
                <Button 
                   onClick={handleDirections}
                   variant="outline" 
                   size="sm" 
                   className="text-white border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {content.global?.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
