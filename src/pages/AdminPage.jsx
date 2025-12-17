
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, LayoutDashboard, Home, FileText, LogOut, Save, Loader2, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminContentManager from '@/components/admin/AdminContentManager';
import AdminPropertiesManager from '@/components/admin/AdminPropertiesManager';
import AdminBlogManager from '@/components/admin/AdminBlogManager';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminImageManager from '@/components/admin/AdminImageManager';
import AdminLogin from '@/components/admin/AdminLogin';
import { useToast } from '@/components/ui/use-toast';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

const AdminPage = () => {
  const [mainTab, setMainTab] = useState('properties');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  // Use context for saving content
  const { saveAllSettings, isSaving, hasUnsavedChanges } = useSiteSettings();
  const { toast } = useToast();

  useEffect(() => {
    checkLocalAuth();
  }, []);

  const checkLocalAuth = () => {
    const auth = localStorage.getItem('admin_authenticated');
    const loginTime = localStorage.getItem('admin_login_time');
    
    // Simple session expiry check (24 hours)
    const isExpired = loginTime && (Date.now() - parseInt(loginTime) > 24 * 60 * 60 * 1000);

    if (auth === 'true' && !isExpired) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem('admin_authenticated'); // Cleanup
    }
    setCheckingAuth(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    toast({ title: "Welcome back", description: "You have successfully logged in." });
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_login_time');
    setIsAuthenticated(false);
    toast({ title: "Logged Out", description: "See you next time." });
  };

  const handleGlobalSave = async () => {
    await saveAllSettings();
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-maroon" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login | Shivadhama Residency</title>
        </Helmet>
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>Admin Dashboard | Shivadhama Residency</title>
      </Helmet>
      
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div>
            <h6 className="text-lg font-semibold text-gray-900">Admin Dashboard</h6>
            <p className="text-gray-500 mt-1 text-sm">Manage your properties</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center hidden md:flex " style={{ display: 'none' }}>
               <Settings className="w-4 h-4 mr-2" />
               Logged in as Admin
            </div>
            
            {/* Save Button - Only shown for 'content' tab where context saving is needed */}
            {mainTab === 'content' && (
              <Button 
                onClick={handleGlobalSave} 
                disabled={isSaving}
                className={`min-w-[150px] shadow-sm transition-all active:scale-95 ${hasUnsavedChanges ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> {hasUnsavedChanges ? 'Save Changes' : 'All Saved'}
                  </>
                )}
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        <Tabs value={mainTab} onValueChange={setMainTab} className="w-full space-y-8">
          <div className="flex justify-center overflow-x-auto pb-2">
            <TabsList className="bg-white p-1 border border-gray-200 rounded-xl shadow-sm h-auto inline-flex min-w-max">
               {/* <TabsTrigger 
                 value="content" 
                 className="px-6 py-3 rounded-lg data-[state=active]:bg-maroon data-[state=active]:text-white transition-all flex items-center gap-2"
               >
                 <LayoutDashboard className="w-4 h-4" /> Site Content & Global
               </TabsTrigger> */}
               <TabsTrigger 
                 value="properties" 
                 className="px-6 py-3 rounded-lg data-[state=active]:bg-maroon data-[state=active]:text-white transition-all flex items-center gap-2 rounded-xl"
               >
                 <Home className="w-4 h-4" /> Manage Properties
               </TabsTrigger>
               {<TabsTrigger 
                 value="blog" 
                 className="px-6 py-3 rounded-lg data-[state=active]:bg-maroon data-[state=active]:text-white transition-all flex items-center gap-2 rounded-xl"
               >
                 <FileText className="w-4 h-4" /> Manage Blog Posts
               </TabsTrigger> }
               <TabsTrigger 
                 value="settings" 
                 className="px-6 py-3 rounded-lg data-[state=active]:bg-maroon data-[state=active]:text-white transition-all flex items-center gap-2 rounded-xl hidden"
               >
                 <UserCog className="w-4 h-4" /> Settings
               </TabsTrigger>


               <TabsTrigger 
                 value="image-manager" 
                 className="px-6 py-3 rounded-lg data-[state=active]:bg-maroon data-[state=active]:text-white transition-all flex items-center gap-2 rounded-xl"
                 style={{ display: 'none' }}
               >
                 <UserCog className="w-4 h-4" /> Image Manager
               </TabsTrigger>
            </TabsList>
          </div>

          {/* <TabsContent value="content" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AdminContentManager />
          </TabsContent> */}

          <TabsContent value="properties" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AdminPropertiesManager />
          </TabsContent>
          
          {<TabsContent value="blog" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AdminBlogManager />
          </TabsContent>}

          <TabsContent value="settings" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AdminSettings />
          </TabsContent>

          <TabsContent value="image-manager" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AdminImageManager images={[
              { id: 100, alt: 'Mountain view', caption: 'Beautiful mountains', url: 'https://picsum.photos/seed/100/200' },
              { id: 200, alt: 'Beach', caption: 'Sunny beach', url: 'https://picsum.photos/seed/200/200' },
              { id: 300, alt: 'Forest', caption: 'Green forest', url: 'https://picsum.photos/seed/300/200' },
              { id: 400, alt: 'City', caption: 'Modern city', url: 'https://picsum.photos/seed/400/200' },
              { id: 500, alt: 'Desert', caption: 'Sandy desert', url: 'https://picsum.photos/seed/500/200' },
            ]} isOpen={true} onClose={() => {}} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
