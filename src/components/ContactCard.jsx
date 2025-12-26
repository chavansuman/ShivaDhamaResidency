
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactCard = ({ property }) => {
  const ownerEmail = "shivadhamamysuru@gmail.com";
  const ownerPhone = "+919886000624";

  const handleCall = () => {
    window.location.href = `tel:${ownerPhone.replace(/\s/g, '')}`;
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${property.title} (${property.bhk})`;
    window.open(`https://wa.me/${ownerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const subject = `Inquiry about ${property.title}`;
  const body = `Hi,\n\nI'm interested in ${property.title} (${property.bhk}) at Shivadhama Residency.\n\nPlease provide more details regarding availability and visiting hours.\n\nThank you.`;

  const handleEmail = () => {
    // Constructs a specific URL to open Gmail's compose window in the browser
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${ownerEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="sticky top-24"
    >
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Owner</h3>
        
        <div className="space-y-3">
          <Button
            onClick={handleCall}
            className="w-full bg-[#8B2D2D] hover:bg-[#6d2323] text-white transition-colors h-12"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          
          <Button
            onClick={handleWhatsApp}
            className="w-full bg-[#047b31] hover:bg-[#026728] text-white transition-colors h-12"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
          
          <Button
            onClick={handleEmail}
            variant="outline"
            className="w-full border-[#8B2D2D] text-[#8B2D2D] hover:bg-[#8B2D2D] hover:text-white transition-colors h-12"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Contact Details:</p>
          <div className="space-y-2">
            <p className="text-sm flex items-center text-gray-800">
              <span className="font-bold w-16 text-gray-900">Phone:</span> 
              <a href={`tel:${ownerPhone.replace(/\s/g, '')}`} className="hover:text-[#8B2D2D] transition-colors font-medium">
                {ownerPhone}
              </a>
            </p>
            <p className="text-sm flex items-center text-gray-800">
              <span className="font-bold w-16 text-gray-900">Email:</span> 
              <a href={`mailto:${ownerEmail}`} className="hover:text-[#8B2D2D] transition-colors break-all font-medium">
                {ownerEmail}
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;
