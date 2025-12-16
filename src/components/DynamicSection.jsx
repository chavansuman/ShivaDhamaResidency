
import React from 'react';
import { motion } from 'framer-motion';

const DynamicSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {data.title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{data.title}</h2>
          )}
          {data.content && (
            <div className="prose prose-lg mx-auto text-gray-600 whitespace-pre-wrap">
              {data.content}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DynamicSection;
