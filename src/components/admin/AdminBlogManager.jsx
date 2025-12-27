
import React, { useState } from 'react';
import { useBlogs } from '@/lib/useBlogs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Save, X, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ImageUploader from '@/components/admin/ImageUploader';

const initialBlogState = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  author: 'Admin',
  image: '',
  readTime: '5 min read'
};

const AdminBlogManager = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlogs();
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState(initialBlogState);
  const { toast } = useToast();

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setFormData({
        ...initialBlogState,
        ...blog
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentBlog(null);
    setFormData(initialBlogState);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentBlog(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlog(id);
      toast({ title: "Blog post deleted", variant: "destructive" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Auto-calculate read time (for display only, not stored in DB currently unless schema changes)
    const wordCount = formData.content ? formData.content.trim().split(/\s+/).length : 0;
    const calculatedReadTime = Math.max(1, Math.ceil(wordCount / 200)) + ' min read';
    
    const blogData = {
        ...formData,
        readTime: calculatedReadTime
    };

    if (currentBlog) {
      await updateBlog({ ...blogData, id: currentBlog.id });
      toast({ title: "Blog updated successfully" });
    } else {
      await addBlog(blogData);
      toast({ title: "New blog post published" });
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (newImages) => {
    const image = newImages.length > 0 ? newImages[0] : '';
    setFormData(prev => ({ ...prev, image }));
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{currentBlog ? 'Edit Blog Post' : 'Create New Post'}</h2>
          <Button variant="ghost" onClick={handleCancel} className="text-gray-500 hover:text-gray-900">
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Post Title</Label>
              <Input 
                id="title"
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Enter an engaging title"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category"
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                placeholder="e.g. Lifestyle, Tips" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input 
                id="author"
                name="author" 
                value={formData.author} 
                onChange={handleChange} 
                placeholder="Author Name"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
               <Label>Cover Image</Label>
               <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                   <ImageUploader 
                      images={formData.image ? [formData.image] : []}
                      onImagesChange={handleImageChange}
                      multiple={false}
                      label="Upload or paste image URL"
                   />
               </div>
               <p className="text-xs text-gray-500 mt-1">Recommended size: 1200x600px. Max file size: 5MB.</p>
            </div>

            <div className="space-y-2 md:col-span-2">
               <Label htmlFor="excerpt">Excerpt</Label>
               <Textarea 
                 id="excerpt"
                 name="excerpt" 
                 value={formData.excerpt} 
                 onChange={handleChange} 
                 rows={2} 
                 placeholder="A short summary that appears on the blog list"
                 required 
               />
            </div>

            <div className="space-y-2 md:col-span-2">
               <Label htmlFor="content">Full Content</Label>
               <Textarea 
                 id="content"
                 name="content" 
                 value={formData.content} 
                 onChange={handleChange} 
                 rows={12} 
                 placeholder="Write your blog post content here..."
                 className="font-normal"
                 required 
               />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t mt-6">
            <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button type="submit" className="bg-maroon hover:bg-maroon-dark text-white min-w-[120px]">
              <Save className="w-4 h-4 mr-2" /> 
              {currentBlog ? 'Update Post' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
           <p className="text-gray-500 text-sm mt-1">Manage your articles, news, and updates</p>
        </div>
        <Button onClick={handleAddNew} className="bg-maroon hover:bg-maroon-dark text-white">
          <Plus className="w-4 h-4 mr-2" /> Add
        </Button>
      </div>

      <div className="grid gap-4">
        {blogs.length === 0 ? (
           <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
             </div>
             <h3 className="text-lg font-medium text-gray-900">No blog posts yet</h3>
             <p className="text-gray-500 mb-6">Create your first blog post to engage with your audience.</p>
             <Button onClick={handleAddNew} variant="outline">Create Post</Button>
           </div>
        ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="group bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-start md:items-center hover:shadow-md transition-all duration-200">
                <div className="w-full md:w-32 h-32 md:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                   {blog.image ? (
                     <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                   ) : (
                     <div className="flex items-center justify-center h-full text-gray-300"><FileText className="w-8 h-8" /></div>
                   )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-blue-50 text-blue-700 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full">
                        {blog.category}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{blog.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 group-hover:text-maroon transition-colors">{blog.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                </div>

                <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(blog)} className="flex-1 md:flex-none justify-center">
                    <Edit className="w-4 h-4 mr-2 md:mr-0" /> <span className="md:hidden">Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-1 md:flex-none justify-center" onClick={() => handleDelete(blog.id)}>
                    <Trash2 className="w-4 h-4 mr-2 md:mr-0" /> <span className="md:hidden">Delete</span>
                  </Button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default AdminBlogManager;
