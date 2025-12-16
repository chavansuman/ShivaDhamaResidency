
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBlogs } from '@/lib/useBlogs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Tag, Clock } from 'lucide-react';

const BlogPage = () => {
  const { blogs } = useBlogs();

  return (
    <>
      <Helmet>
        <title>Blog | Shivadhama Residency</title>
        <meta name="description" content="Stay updated with the latest news, tips, and insights from Shivadhama Residency blog. Discover living in Jayalakshmipuram, Mysuru." />
      </Helmet>
      
      <Navbar />
      
      <div className="bg-gray-50 py-16 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Insights about Mysuru living, rental tips, and community updates from Shivadhama Residency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group border border-gray-100"
                >
                  <Link to={`/blog/${blog.id}`} className="block relative overflow-hidden h-56">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-maroon flex items-center">
                       <Tag className="w-3 h-3 mr-1" /> {blog.category}
                    </div>
                  </Link>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                       <span>{blog.date}</span>
                       <span>•</span>
                       <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {blog.readTime || '5 min'}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-maroon transition-colors line-clamp-2">
                      <Link to={`/blog/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                      {blog.excerpt}
                    </p>
                    
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <Link to={`/blog/${blog.id}`} className="inline-flex items-center text-maroon font-semibold hover:text-maroon-dark hover:underline group/link">
                        Read Full Article <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Tag className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">No blog posts found</h3>
                <p className="text-gray-500 mt-2">Check back soon for new updates!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default BlogPage;
