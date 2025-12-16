
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react'; // Changed icons to CheckCircle for features/values list consistency
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageImages } from '@/lib/usePageImages';
import { useSiteContent } from '@/lib/useSiteContent';

const AboutPage = () => {
  const { images } = usePageImages();
  const { content } = useSiteContent();

  return (
    <>
      <Helmet>
        <title>{content.about?.title} | Shivadhama Residency Mysuru</title>
        <meta name="description" content="Learn about Shivadhama Residency's mission to provide premium, broker-free living in Jayalakshmipuram, Mysuru. Family-run, tenant-focused, and quality-driven." />
      </Helmet>
      
      <Navbar />
      
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.about?.title}</h1>
            <p className="text-xl text-gray-600 mb-6">
              {content.about?.subtitle}
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-700 font-medium list-none p-0">
              {content.about?.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-maroon flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
             >
                <img 
                  src={images.about?.mainImage}
                  alt="Quality construction" 
                  className="rounded-lg shadow-lg w-full"
                />
             </motion.div>
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="text-gray-700 leading-relaxed space-y-4"
             >
                <p>{content.about?.welcomeParagraph1}</p>
                <p>{content.about?.welcomeParagraph2}</p>
             </motion.div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.about?.valuesTitle}
            </motion.h2>
            <ul className="space-y-4 text-gray-700 list-none p-0">
              {content.about?.values.map((value, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold">{value.name}:</span> {value.description}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div 
            className="max-w-3xl mx-auto text-center text-gray-700 leading-relaxed space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>{content.about?.closingParagraph}</p>
            <p className="font-semibold text-lg text-gray-800">{content.about?.finalLine}</p>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AboutPage;
