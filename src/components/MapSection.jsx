
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/lib/useSiteContent';

const MapSection = () => {
  const { content } = useSiteContent();

  const handleDirections = () => {
    if (content.global?.googleMapsUrl) {
      window.open(content.global.googleMapsUrl, '_blank');
    } else {
      window.open("https://www.google.com/maps/search/?api=1&query=Shivadhama+Residency+Jayalakshmipuram+Mysuru", "_blank");
    }
  };

  return (
    <div className="bg-[#F5F1ED] py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-maroon/10 text-maroon text-sm font-medium mb-4">
              <MapPin className="w-4 h-4 mr-2" /> Prime Location
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Located in the Heart of Jayalakshmipuram
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Experience the perfect blend of tranquility and connectivity. Shivadhama Residency is situated near Kalidasa Road, known for its peaceful atmosphere and proximity to major city hubs.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-lg shadow-sm mr-4 mt-1">
                  <Phone className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Contact Details</h4>
                  <p className="text-sm text-gray-600">{content.global?.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-2 rounded-lg shadow-sm mr-4 mt-1">
                  <Mail className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email Enquiries</h4>
                  <p className="text-sm text-gray-600">{content.global?.contactEmail}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white p-2 rounded-lg shadow-sm mr-4 mt-1">
                  <MapPin className="w-5 h-5 text-maroon" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Visit Us</h4>
                  <p className="text-sm text-gray-600 mb-2">{content.global?.address}</p>
                  <Button onClick={handleDirections} variant="link" className="text-maroon p-0 h-auto font-medium hover:underline">
                    Get Directions on Google Maps <Navigation className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="h-full min-h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white relative">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.6252%2C12.3206%2C76.6292%2C12.3246&layer=mapnik&marker=12.3226%2C76.6272"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shivadhama Residency Location"
            ></iframe>

            <div className="absolute bottom-4 right-4">
              <Button variant="default" className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg font-semibold" onClick={handleDirections}>
                <Navigation className="w-4 h-4 mr-2 text-maroon" /> Get Directions
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default MapSection;
