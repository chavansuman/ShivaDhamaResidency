
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MapPin, Navigation } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSiteContent } from '@/lib/useSiteContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { content } = useSiteContent();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you shortly.",
    });
  };

  const handleDirections = () => {
    if (content.global?.googleMapsUrl) {
      window.open(content.global.googleMapsUrl, '_blank');
    }
  };

  return (
    <>
      <Helmet>
        <title>{content.contact?.title} | Shivadhama Residency</title>
        <meta name="description" content="Contact Shivadhama Residency for premium rental homes in Jayalakshmipuram, Mysuru. Call us or visit directly." />
      </Helmet>
      
      <Navbar />
      
      <div className="bg-[#F5F1ED] min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {content.contact?.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              {content.contact?.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 lg:col-span-1"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-maroon/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600 text-sm mb-2">Speak directly with the owner</p>
                    <a href={`tel:${content.global?.contactPhone}`} className="text-maroon font-semibold hover:underline">
                      {content.global?.contactPhone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-maroon/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600 text-sm mb-2">For inquiries and details</p>
                    <a href={`mailto:${content.global?.contactEmail}`} className="text-maroon font-semibold hover:underline break-all">
                      {content.global?.contactEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-maroon/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-600 text-sm mb-3">{content.global?.address}</p>
                    <Button 
                      onClick={handleDirections}
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-maroon/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Visiting Hours</h3>
                    <p className="text-gray-600 text-sm">
                      {content.contact?.hours}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Inquiry about 2BHK availability" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="I am interested in viewing the property..." 
                    className="min-h-[150px]"
                    required 
                  />
                </div>

                <Button type="submit" className="w-full bg-maroon hover:bg-maroon-dark text-white py-6 text-lg">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ContactPage;
