
import React, { useState } from 'react';
import { useSiteContent } from '@/lib/useSiteContent';
import { usePageImages } from '@/lib/usePageImages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Layout, 
  Type, 
  GripVertical,
  Image as ImageIcon,
  Globe,
  Home,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import AttractionManager from '@/components/admin/AttractionManager';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AdminPropertiesManager from './AdminPropertiesManager';

const AdminContentManager = () => {
  const { 
    content, 
    addSection, 
    updateSection, 
    deleteSection, 
    reorderSections,
    updateGlobalContent,
    updatePageSpecificContent
  } = useSiteContent();
  
  const { images, updateImages } = usePageImages();
  
  const [activeTab, setActiveTab] = useState('global');
  const [subTab, setSubTab] = useState('content');
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, page: null, id: null });
  const { toast } = useToast();

  const pages = ['home', 'about', 'location', 'blog', 'contact'];

  const handleMove = (page, index, direction) => {
    const pageSections = content.pages?.[page] || [];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < pageSections.length) {
      reorderSections(page, index, newIndex);
    }
  };

  const handleAddSection = (page) => {
    addSection(page, {
      title: 'New Section Title',
      content: 'Enter your section content here...'
    });
    toast({
      title: "Section Added",
      description: "A new custom section has been added to the page.",
    });
  };

  const handleDeleteClick = (page, id) => {
    setDeleteConfirmation({
        isOpen: true,
        page,
        id
    });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.page && deleteConfirmation.id) {
        deleteSection(deleteConfirmation.page, deleteConfirmation.id);
        toast({
            title: "Section Deleted",
            description: "The section has been removed.",
            variant: "destructive"
        });
    }
    setDeleteConfirmation({ isOpen: false, page: null, id: null });
  };

  const handlePageImageUpdate = (page, key, newImages) => {
      const url = newImages.length > 0 ? newImages[0] : '';
      updateImages(page, key, url);
      
      if (url) {
          toast({ title: "Image updated successfully" });
      }
  };

  // Helper to safely access nested content
  const getSafeContent = (page, key) => {
    return content?.[page]?.[key] || '';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-500">
      
    </div>
  );

  // return (
  //   <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-500">
  //     <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" style={{ display: 'smooth' }}>
  //       <div className="border-b border-gray-200 bg-gray-50 px-6 pt-4">
  //         <TabsList className="bg-transparent space-x-2 h-auto p-0 pb-4 w-full justify-start overflow-x-auto">
  //           <TabsTrigger 
  //             value="global"
  //             className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-gray-200 border border-transparent px-6 py-2 rounded-lg"
  //           >
  //             <Globe className="w-4 h-4 mr-2" /> Global Settings
  //           </TabsTrigger>
  //           {pages.map(page => (
  //             <TabsTrigger 
  //               key={page} 
  //               value={page}
  //               className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-gray-200 border border-transparent px-6 py-2 rounded-lg capitalize"
  //             >
  //               {page === 'home' && <Home className="w-4 h-4 mr-2" />}
  //               {page}
  //             </TabsTrigger>
  //           ))}
  //         </TabsList>
  //       </div>

  //       <div className="p-6 md:p-8">
  //         {/* GLOBAL SETTINGS TAB */}
  //         <TabsContent value="global" className="mt-0 space-y-8">
  //           <div className="grid gap-6 max-w-4xl">
  //             <div className="space-y-4">
  //               <h3 className="text-lg font-semibold border-b pb-2">Header & Footer</h3>
  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //                 <div className="space-y-2">
  //                   <Label>Header Title</Label>
  //                   <Input 
  //                     value={getSafeContent('global', 'headerTitle')} 
  //                     onChange={(e) => updateGlobalContent('headerTitle', e.target.value)}
  //                   />
  //                 </div>
  //                 <div className="space-y-2">
  //                   <Label>Header Subtitle</Label>
  //                   <Input 
  //                     value={getSafeContent('global', 'headerSubtitle')} 
  //                     onChange={(e) => updateGlobalContent('headerSubtitle', e.target.value)}
  //                   />
  //                 </div>
  //                 <div className="space-y-2 md:col-span-2">
  //                   <Label>Footer Copyright Text</Label>
  //                   <Input 
  //                     value={getSafeContent('global', 'footerText')} 
  //                     onChange={(e) => updateGlobalContent('footerText', e.target.value)}
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="space-y-4">
  //               <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //                 <div className="space-y-2">
  //                   <Label>Contact Phone</Label>
  //                   <Input 
  //                     value={getSafeContent('global', 'contactPhone')} 
  //                     onChange={(e) => updateGlobalContent('contactPhone', e.target.value)}
  //                   />
  //                 </div>
  //                 <div className="space-y-2">
  //                   <Label>Contact Email</Label>
  //                   <Input 
  //                     value={getSafeContent('global', 'contactEmail')} 
  //                     onChange={(e) => updateGlobalContent('contactEmail', e.target.value)}
  //                   />
  //                 </div>
  //                 <div className="space-y-2 md:col-span-2">
  //                   <Label>Physical Address</Label>
  //                   <Textarea 
  //                     value={getSafeContent('global', 'address')} 
  //                     onChange={(e) => updateGlobalContent('address', e.target.value)}
  //                   />
  //                 </div>
  //                 <div className="space-y-2 md:col-span-2">
  //                   <Label>Google Maps URL (Location Link)</Label>
  //                   <Input 
  //                     value={getSafeContent('global', 'googleMapsUrl')} 
  //                     onChange={(e) => updateGlobalContent('googleMapsUrl', e.target.value)}
  //                     placeholder="https://maps.google.com/..."
  //                   />
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </TabsContent>

  //         {/* PAGE TABS */}
  //         {pages.map(pageName => (
  //           <TabsContent key={pageName} value={pageName} className="mt-0">
  //             <Tabs value={subTab} onValueChange={setSubTab} className="w-full">
  //               <div className="mb-6">
  //                   <TabsList>
  //                     <TabsTrigger value="content" className="flex items-center gap-2"><Type className="w-4 h-4"/> Content</TabsTrigger>
  //                     <TabsTrigger value="images" className="flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Images</TabsTrigger>
  //                     <TabsTrigger value="structure" className="flex items-center gap-2"><Layout className="w-4 h-4"/> Sections</TabsTrigger>
  //                   </TabsList>
  //               </div>
                
  //               {/* 1. TEXT CONTENT SUBTAB */}
  //               <TabsContent value="content" className="space-y-6">
  //                  <h3 className="text-lg font-semibold capitalize">{pageName} Text Content</h3>
                   
  //                  {/* HOME PAGE */}
  //                  {pageName === 'home' && (
  //                     <div className="grid gap-4 max-w-3xl">
  //                       <div className="space-y-2">
  //                         <Label>Hero Title</Label>
  //                         <Input 
  //                           value={getSafeContent('home', 'heroTitle')}
  //                           onChange={(e) => updatePageSpecificContent('home', 'heroTitle', e.target.value)}
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <Label>Hero Subtitle</Label>
  //                         <Input 
  //                           value={getSafeContent('home', 'heroSubtitle')}
  //                           onChange={(e) => updatePageSpecificContent('home', 'heroSubtitle', e.target.value)}
  //                         />
  //                       </div>
  //                       <div className="border-t my-4 pt-4 space-y-2">
  //                         <Label>Why Choose Us - Title</Label>
  //                         <Input 
  //                           value={getSafeContent('home', 'whyChooseTitle')}
  //                           onChange={(e) => updatePageSpecificContent('home', 'whyChooseTitle', e.target.value)}
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <Label>Why Choose Us - Subtitle</Label>
  //                         <Textarea 
  //                           value={getSafeContent('home', 'whyChooseSubtitle')}
  //                           onChange={(e) => updatePageSpecificContent('home', 'whyChooseSubtitle', e.target.value)}
  //                         />
  //                       </div>
  //                     </div>
  //                  )}

  //                  {/* ABOUT PAGE */}
  //                  {pageName === 'about' && (
  //                     <div className="grid gap-4 max-w-3xl">
  //                       <div className="space-y-2">
  //                         <Label>Main Title</Label>
  //                         <Input 
  //                           value={getSafeContent('about', 'title')}
  //                           onChange={(e) => updatePageSpecificContent('about', 'title', e.target.value)}
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <Label>Subtitle</Label>
  //                         <Textarea 
  //                           value={getSafeContent('about', 'subtitle')}
  //                           onChange={(e) => updatePageSpecificContent('about', 'subtitle', e.target.value)}
  //                           rows={3}
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <Label>Welcome Paragraph 1</Label>
  //                         <Textarea 
  //                           value={getSafeContent('about', 'welcomeParagraph1')}
  //                           onChange={(e) => updatePageSpecificContent('about', 'welcomeParagraph1', e.target.value)}
  //                           rows={5}
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <Label>Welcome Paragraph 2</Label>
  //                         <Textarea 
  //                           value={getSafeContent('about', 'welcomeParagraph2')}
  //                           onChange={(e) => updatePageSpecificContent('about', 'welcomeParagraph2', e.target.value)}
  //                           rows={5}
  //                         />
  //                       </div>
  //                        <div className="space-y-2">
  //                         <Label>Values Title</Label>
  //                         <Input 
  //                           value={getSafeContent('about', 'valuesTitle')}
  //                           onChange={(e) => updatePageSpecificContent('about', 'valuesTitle', e.target.value)}
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <Label>Closing Paragraph</Label>
  //                         <Textarea 
  //                           value={getSafeContent('about', 'closingParagraph')}
  //                           onChange={(e) => updatePageSpecificContent('about', 'closingParagraph', e.target.value)}
  //                           rows={3}
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <Label>Final Line</Label>
  //                         <Input 
  //                           value={getSafeContent('about', 'finalLine')}
  //                           onChange={(e) => updatePageSpecificContent('about', 'finalLine', e.target.value)}
  //                         />
  //                       </div>
  //                     </div>
  //                  )}

  //                  {/* LOCATION PAGE */}
  //                  {pageName === 'location' && (
  //                     <div className="grid gap-4 max-w-4xl">
  //                       <div className="grid gap-4 max-w-3xl">
  //                         <div className="space-y-2">
  //                           <Label>Page Title</Label>
  //                           <Input 
  //                             value={getSafeContent('location', 'title')}
  //                             onChange={(e) => updatePageSpecificContent('location', 'title', e.target.value)}
  //                           />
  //                         </div>
  //                         <div className="space-y-2">
  //                           <Label>Subtitle</Label>
  //                           <Textarea 
  //                             value={getSafeContent('location', 'subtitle')}
  //                             onChange={(e) => updatePageSpecificContent('location', 'subtitle', e.target.value)}
  //                             rows={2}
  //                           />
  //                         </div>
  //                         <div className="space-y-2">
  //                           <Label>Description Title</Label>
  //                           <Input 
  //                             value={getSafeContent('location', 'descriptionTitle')}
  //                             onChange={(e) => updatePageSpecificContent('location', 'descriptionTitle', e.target.value)}
  //                           />
  //                         </div>
  //                         <div className="space-y-2">
  //                           <Label>Description Content (SEO)</Label>
  //                           <Textarea 
  //                             value={getSafeContent('location', 'descriptionText')}
  //                             onChange={(e) => updatePageSpecificContent('location', 'descriptionText', e.target.value)}
  //                             rows={6}
  //                           />
  //                         </div>
  //                       </div>

  //                       <div className="border-t my-6 pt-6 space-y-6">
  //                          <h4 className="text-lg font-bold text-gray-900 border-l-4 border-maroon pl-3">Nearby Amenities Section</h4>
  //                          <div className="space-y-4 max-w-3xl">
  //                             <div className="space-y-2">
  //                                 <Label>"What's Nearby" Title</Label>
  //                                 <Input 
  //                                   value={getSafeContent('location', 'nearbyTitle')}
  //                                   onChange={(e) => updatePageSpecificContent('location', 'nearbyTitle', e.target.value)}
  //                                 />
  //                             </div>
  //                             <div className="space-y-2">
  //                                 <Label>"What's Nearby" Description</Label>
  //                                 <Textarea 
  //                                   value={getSafeContent('location', 'nearbyDesc')}
  //                                   onChange={(e) => updatePageSpecificContent('location', 'nearbyDesc', e.target.value)}
  //                                   rows={2}
  //                                 />
  //                             </div>
  //                          </div>

  //                          <h4 className="text-lg font-bold text-gray-900 border-l-4 border-maroon pl-3 mt-8">Famous Attractions Section</h4>
  //                          <div className="space-y-4 max-w-3xl">
  //                             <div className="space-y-2">
  //                                 <Label>"Attractions" Title</Label>
  //                                 <Input 
  //                                   value={getSafeContent('location', 'attractionsTitle')}
  //                                   onChange={(e) => updatePageSpecificContent('location', 'attractionsTitle', e.target.value)}
  //                                 />
  //                             </div>
  //                             <div className="space-y-2">
  //                                 <Label>"Attractions" Description</Label>
  //                                 <Textarea 
  //                                   value={getSafeContent('location', 'attractionsDesc')}
  //                                   onChange={(e) => updatePageSpecificContent('location', 'attractionsDesc', e.target.value)}
  //                                   rows={2}
  //                                 />
  //                             </div>
  //                          </div>

  //                          {/* Dynamic Attraction List Manager */}
  //                          <div className="mt-6 pt-6 border-t">
  //                             <h4 className="text-md font-semibold mb-4 text-gray-700">Manage Attractions List</h4>
  //                             <AttractionManager 
  //                               attractions={content.location?.attractions || []}
  //                               onChange={(newAttractions) => updatePageSpecificContent('location', 'attractions', newAttractions)}
  //                             />
  //                          </div>
  //                       </div>
  //                     </div>
  //                  )}

  //                  {/* CONTACT PAGE */}
  //                  {pageName === 'contact' && (
  //                     <div className="grid gap-4 max-w-3xl">
  //                       <div className="space-y-2">
  //                         <Label>Page Title</Label>
  //                         <Input 
  //                           value={getSafeContent('contact', 'title')}
  //                           onChange={(e) => updatePageSpecificContent('contact', 'title', e.target.value)}
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <Label>Subtitle</Label>
  //                         <Input 
  //                           value={getSafeContent('contact', 'subtitle')}
  //                           onChange={(e) => updatePageSpecificContent('contact', 'subtitle', e.target.value)}
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <Label>Visiting Hours</Label>
  //                         <Input 
  //                           value={getSafeContent('contact', 'hours')}
  //                           onChange={(e) => updatePageSpecificContent('contact', 'hours', e.target.value)}
  //                         />
  //                       </div>
  //                       <div className="space-y-2">
  //                         <Label>Receiver Email (For Contact Form)</Label>
  //                         <Input 
  //                           value={getSafeContent('contact', 'emailTo')}
  //                           onChange={(e) => updatePageSpecificContent('contact', 'emailTo', e.target.value)}
  //                           placeholder="Email address to receive form submissions"
  //                         />
  //                       </div>
  //                     </div>
  //                  )}

  //                  {/* BLOG PAGE */}
  //                  {pageName === 'blog' && (
  //                     <div className="p-8 bg-gray-50 text-center rounded-lg border border-dashed border-gray-300">
  //                        <p className="text-gray-500">Blog content is managed in the 'Blog Posts' tab of the admin panel.</p>
  //                        <Button variant="link" onClick={() => document.querySelector('[value="blog"]')?.click()}>
  //                           Go to Blog Manager
  //                        </Button>
  //                     </div>
  //                  )}
  //               </TabsContent>

  //               {/* 2. IMAGES SUBTAB */}
  //               <TabsContent value="images" className="space-y-6">
  //                 <h3 className="text-lg font-semibold capitalize">{pageName} Images</h3>
  //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                     {pageName === 'home' && (
  //                       <div className="space-y-2">
  //                           <Label>Hero Background Image</Label>
  //                           <ImageUploader 
  //                               images={images.home?.heroBackground ? [images.home.heroBackground] : []}
  //                               onImagesChange={(newImages) => handlePageImageUpdate('home', 'heroBackground', newImages)}
  //                               multiple={false}
  //                               label=""
  //                           />
  //                       </div>
  //                     )}
  //                     {pageName === 'location' && (
  //                       <>
  //                         <div className="space-y-2">
  //                             <Label>Location Hero Image</Label>
  //                             <ImageUploader 
  //                               images={images.location?.heroImage ? [images.location.heroImage] : []}
  //                               onImagesChange={(newImages) => handlePageImageUpdate('location', 'heroImage', newImages)}
  //                               multiple={false}
  //                               label=""
  //                           />
  //                         </div>
  //                         <div className="space-y-2">
  //                             <Label>Map/Location Detail Image</Label>
  //                             <ImageUploader 
  //                               images={images.location?.mapImage ? [images.location.mapImage] : []}
  //                               onImagesChange={(newImages) => handlePageImageUpdate('location', 'mapImage', newImages)}
  //                               multiple={false}
  //                               label=""
  //                           />
  //                         </div>
  //                       </>
  //                     )}
  //                     {pageName === 'about' && (
  //                       <div className="space-y-2">
  //                           <Label>About Main Image</Label>
  //                           <ImageUploader 
  //                               images={images.about?.mainImage ? [images.about.mainImage] : []}
  //                               onImagesChange={(newImages) => handlePageImageUpdate('about', 'mainImage', newImages)}
  //                               multiple={false}
  //                               label=""
  //                           />
  //                       </div>
  //                     )}
  //                     {['blog', 'contact'].includes(pageName) && (
  //                       <div className="p-8 bg-gray-50 text-center rounded-lg border border-dashed border-gray-300">
  //                           <p className="text-gray-500">No specific main images configured for this page. Check individual posts or sections.</p>
  //                       </div>
  //                     )}
  //                 </div>
  //               </TabsContent>

  //               {/* 3. STRUCTURE/SECTIONS SUBTAB */}
  //               <TabsContent value="structure" className="space-y-6">
  //                 <div className="flex justify-between items-center mb-6">
  //                   <h2 className="text-xl font-semibold capitalize flex items-center">
  //                     {pageName} Page Structure
  //                   </h2>
  //                   <Button onClick={() => handleAddSection(pageName)} className="bg-maroon hover:bg-maroon-dark text-white">
  //                     <Plus className="w-4 h-4 mr-2" /> Add Custom Section
  //                   </Button>
  //                 </div>

  //                 <div className="space-y-4">
  //                   {(content.pages?.[pageName] || []).map((section, index) => (
  //                     <div 
  //                       key={section.id} 
  //                       className="group bg-white border border-gray-200 rounded-xl p-6 transition-all hover:shadow-md hover:border-gray-300 relative"
  //                     >
  //                       <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl bg-gray-100 group-hover:bg-maroon transition-colors" />
                        
  //                       <div className="flex flex-col md:flex-row gap-6">
  //                         <div className="flex md:flex-col gap-2 md:border-r md:pr-4 md:border-gray-100 justify-center md:justify-start">
  //                           <Button 
  //                             variant="ghost" 
  //                             size="icon"
  //                             disabled={index === 0}
  //                             onClick={() => handleMove(pageName, index, 'up')}
  //                             className="h-8 w-8 hover:bg-gray-100 text-gray-500"
  //                           >
  //                             <MoveUp className="w-4 h-4" />
  //                           </Button>
  //                           <div className="hidden md:flex items-center justify-center py-1">
  //                             <GripVertical className="w-4 h-4 text-gray-300" />
  //                           </div>
  //                           <Button 
  //                             variant="ghost" 
  //                             size="icon"
  //                             disabled={index === (content.pages?.[pageName]?.length || 0) - 1}
  //                             onClick={() => handleMove(pageName, index, 'down')}
  //                             className="h-8 w-8 hover:bg-gray-100 text-gray-500"
  //                           >
  //                             <MoveDown className="w-4 h-4" />
  //                           </Button>
  //                         </div>

  //                         <div className="flex-grow space-y-4">
  //                           <div className="flex justify-between items-start">
  //                             <div className="flex items-center space-x-3">
  //                               <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide border ${
  //                                 section.type === 'component' 
  //                                   ? 'bg-blue-50 text-blue-700 border-blue-200' 
  //                                   : 'bg-green-50 text-green-700 border-green-200'
  //                               }`}>
  //                                 {section.type === 'component' ? 'System Component' : 'Custom Section'}
  //                               </span>
  //                               <span className="text-xs text-gray-400 font-mono">ID: {section.id}</span>
  //                             </div>
  //                             <Button 
  //                               variant="ghost" 
  //                               size="sm"
  //                               onClick={() => handleDeleteClick(pageName, section.id)}
  //                               className="text-red-500 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-2"
  //                             >
  //                               <Trash2 className="w-4 h-4 mr-1" /> Remove
  //                             </Button>
  //                           </div>

  //                           <div className="grid gap-4">
  //                             <div className="space-y-2">
  //                               <Label className="text-gray-600 font-medium">Section Title / Label</Label>
  //                               <Input 
  //                                 value={section.type === 'component' ? (section.label || section.component) : section.title}
  //                                 onChange={(e) => updateSection(pageName, section.id, section.type === 'component' ? { label: e.target.value } : { title: e.target.value })}
  //                                 className="pl-3"
  //                                 placeholder="Section Title"
  //                               />
  //                             </div>

  //                             {section.type === 'custom' && (
  //                               <div className="space-y-2">
  //                                 <Label className="text-gray-600 font-medium">Content Body</Label>
  //                                 <Textarea 
  //                                   value={section.content}
  //                                   onChange={(e) => updateSection(pageName, section.id, { content: e.target.value })}
  //                                   rows={4}
  //                                   className="font-normal"
  //                                   placeholder="Enter the main content for this section..."
  //                                 />
  //                               </div>
  //                             )}
  //                           </div>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </TabsContent>
  //             </Tabs>
  //           </TabsContent>
  //         ))}

  //       </div>
  //     </Tabs>

  //     {/* Delete Confirmation Modal for Sections */}
  //     <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={(isOpen) => !isOpen && setDeleteConfirmation({ isOpen: false, page: null, id: null })}>
  //       <AlertDialogContent>
  //         <AlertDialogHeader>
  //           <AlertDialogTitle className="flex items-center text-red-600">
  //               <AlertCircle className="w-5 h-5 mr-2" />
  //               Delete Section?
  //           </AlertDialogTitle>
  //           <AlertDialogDescription>
  //             Are you sure you want to remove this section? This action cannot be undone.
  //           </AlertDialogDescription>
  //         </AlertDialogHeader>
  //         <AlertDialogFooter>
  //           <AlertDialogCancel>Cancel</AlertDialogCancel>
  //           <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
  //             Yes, Remove It
  //           </AlertDialogAction>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialog>
  //   </div>
  // );
};

export default AdminContentManager;
