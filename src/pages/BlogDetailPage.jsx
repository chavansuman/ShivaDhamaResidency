
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBlogs } from '@/lib/useBlogs';
import { Button } from '@/components/ui/button';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlog } = useBlogs();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate slight loading delay for smoother transition
    setLoading(true);
    const foundBlog = getBlog(id);
    
    if (foundBlog) {
      setBlog(foundBlog);
    }
    setLoading(false);
  }, [id, getBlog]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
           <div className="w-16 h-16 border-4 border-maroon border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Helmet>
          <title>Blog Not Found | Shivadhama Residency</title>
        </Helmet>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
           <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h2>
           <p className="text-gray-600 mb-8">The article you are looking for does not exist or has been removed.</p>
           <Button onClick={() => navigate('/blog')}>
             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
           </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Shivadhama Residency</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>
      
      <Navbar />
      
      <div className="bg-white min-h-screen">
        {/* Hero / Header Image */}
        <div className="w-full h-[400px] relative bg-gray-900">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-12">
               <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                 <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
               </Link>
               <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
                 {blog.title}
               </h1>
               <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
                 <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" /> {blog.author}
                 </div>
                 <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> {blog.date}
                 </div>
                 <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" /> {blog.readTime || '5 min read'}
                 </div>
                 <div className="flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Tag className="w-3 h-3 mr-2" /> {blog.category}
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
           <div className="max-w-3xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-maroon prose-img:rounded-xl max-w-none"
             >
                <div className="text-xl font-medium text-gray-800 mb-10 leading-relaxed border-l-4 border-maroon pl-6 italic">
                   {blog.excerpt}
                </div>
                
                <div className="whitespace-pre-wrap">
                  {blog.content}
                </div>
             </motion.div>

             <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
               <div className="text-gray-500 text-sm">
                 Posted in <span className="font-semibold text-gray-900">{blog.category}</span>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}`, '_blank')}>
                    Share on Twitter
                  </Button>
               </div>
             </div>
           </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default BlogDetailPage;
