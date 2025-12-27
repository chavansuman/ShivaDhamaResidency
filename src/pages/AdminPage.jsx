
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
import AdminLogin from '@/components/admin/AdminLogin';
import { useToast } from '@/components/ui/use-toast';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { supabase } from '@/lib/customSupabaseClient';

const AdminPage = () => {
  const [mainTab, setMainTab] = useState('content');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Use context for saving content
  const { saveAllSettings, isSaving, hasUnsavedChanges } = useSiteSettings();
  const { toast } = useToast();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setCheckingAuth(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Removed legacy checkLocalAuth

  const handleLoginSuccess = () => {
    // Session state is handled by the subscription above
    toast({ title: "Welcome back", description: "You have successfully logged in." });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage all aspects of your property website</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center hidden md:flex">
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
          {/* Mobile View: Select Dropdown */}
          <div className="block md:hidden relative">
            <label htmlFor="admin-tabs" className="sr-only">Select a section</label>
            <select
              id="admin-tabs"
              value={mainTab}
              onChange={(e) => setMainTab(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:ring-2 focus:ring-maroon focus:border-maroon transition-all shadow-sm outline-none appearance-none"
            >
              <option value="content">Site Content & Global</option>
              <option value="properties">Properties</option>
              <option value="blog">Blog Posts</option>
              <option value="settings">Profile & Security</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Desktop View: Tabs List */}
          <div className="hidden md:flex justify-center">
            <TabsList className="bg-white p-1 border border-gray-200 rounded-xl shadow-sm h-auto inline-flex">
              <TabsTrigger
                value="content"
                className="px-6 py-3 rounded-xl data-[state=active]:bg-maroon data-[state=active]:text-white transition-all flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Site Settings
              </TabsTrigger>
              <TabsTrigger
                value="properties"
                className="px-6 py-3 rounded-xl data-[state=active]:bg-maroon data-[state=active]:text-white transition-all flex items-center gap-2"
              >
                <Home className="w-4 h-4" /> Properties
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className="px-6 py-3 rounded-xl data-[state=active]:bg-maroon data-[state=active]:text-white transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" /> Blog Posts
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="px-6 py-3 rounded-xl data-[state=active]:bg-maroon data-[state=active]:text-white transition-all flex items-center gap-2"
              >
                <UserCog className="w-4 h-4" /> Security
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="content" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AdminContentManager />
          </TabsContent>

          <TabsContent value="properties" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AdminPropertiesManager />
          </TabsContent>

          <TabsContent value="blog" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AdminBlogManager />
          </TabsContent>

          <TabsContent value="settings" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
