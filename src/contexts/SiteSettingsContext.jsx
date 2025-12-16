
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { initialSiteContent } from '@/data/siteContent';
import { useToast } from '@/components/ui/use-toast';

const SiteSettingsContext = createContext();

export const SiteSettingsProvider = ({ children }) => {
  // Initialize with deep copy of defaults
  const [content, setContent] = useState(JSON.parse(JSON.stringify(initialSiteContent)));
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();

  // Fetch initial content
  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) throw error;

      if (data && data.length > 0) {
        const contentMap = data.reduce((acc, item) => {
          if (item.key && item.value) {
            acc[item.key] = item.value;
          }
          return acc;
        }, {});
        
        // Deep merge: Defaults <- DB Data
        setContent(prev => {
          const nextState = { ...initialSiteContent, ...prev };
          
          if (contentMap.global) nextState.global = { ...nextState.global, ...contentMap.global };
          if (contentMap.pages) nextState.pages = { ...nextState.pages, ...contentMap.pages };

          Object.keys(contentMap).forEach(key => {
            if (key !== 'global' && key !== 'pages') {
              nextState[key] = { ...(nextState[key] || {}), ...contentMap[key] };
            }
          });

          return nextState;
        });
      }
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error fetching site content:', error);
      toast({ 
        title: "Connection Error", 
        description: "Could not load latest content. Showing defaults.",
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // --- Explicit Save Function ---
  const saveAllSettings = async () => {
    setIsSaving(true);
    try {
      // NOTE: Removed strict Supabase Session check because we are using simple Local Auth for Admin UI
      // The RLS policies have been updated to allow public writes for this simplified setup.
      
      const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
      if (!isAuthenticated) {
        throw new Error("You must be logged in to save changes.");
      }

      // Prepare data for batch upsert
      const upsertData = [];
      
      // Add global settings
      if (content.global) {
        upsertData.push({ key: 'global', value: content.global, updated_at: new Date().toISOString() });
      }
      
      // Add pages structure
      if (content.pages) {
        upsertData.push({ key: 'pages', value: content.pages, updated_at: new Date().toISOString() });
      }

      // Add other root keys if they exist in content state
      Object.keys(content).forEach(key => {
        if (key !== 'global' && key !== 'pages') {
           upsertData.push({ key, value: content[key], updated_at: new Date().toISOString() });
        }
      });

      const { error } = await supabase
        .from('site_content')
        .upsert(upsertData, { onConflict: 'key' });

      if (error) throw error;

      setHasUnsavedChanges(false);
      toast({ 
        title: "Settings Saved", 
        description: "All website content has been updated successfully.",
        className: "bg-green-50 border-green-200 text-green-900"
      });
      return true;

    } catch (err) {
      console.error('Save failed:', err);
      toast({ 
        title: "Save Failed", 
        description: err.message || "Changes could not be saved to the server.", 
        variant: "destructive" 
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // --- Update Methods (Local State Only) ---

  const markChanged = () => setHasUnsavedChanges(true);

  const updateGlobalContent = (key, value) => {
    setContent(prev => {
      const currentGlobal = prev.global || initialSiteContent.global || {};
      return { ...prev, global: { ...currentGlobal, [key]: value } };
    });
    markChanged();
  };

  const updatePageSpecificContent = (page, key, value) => {
    setContent(prev => {
      const currentPage = prev[page] || initialSiteContent[page] || {};
      return { ...prev, [page]: { ...currentPage, [key]: value } };
    });
    markChanged();
  };

  const updatePages = (newPages) => {
    setContent(prev => ({ ...prev, pages: newPages }));
    markChanged();
  };

  // --- Section Management Helpers ---
  
  const addSection = (page, sectionData) => {
    const currentPages = content.pages || {};
    const pageSections = currentPages[page] || [];
    const newSection = { ...sectionData, id: Date.now(), type: 'custom' };
    const newPages = { ...currentPages, [page]: [...pageSections, newSection] };
    updatePages(newPages);
  };

  const updateSection = (page, sectionId, updates) => {
    const currentPages = content.pages || {};
    const pageSections = currentPages[page] || [];
    const newPageSections = pageSections.map(s => s.id === sectionId ? { ...s, ...updates } : s);
    const newPages = { ...currentPages, [page]: newPageSections };
    updatePages(newPages);
  };

  const deleteSection = (page, sectionId) => {
    const currentPages = content.pages || {};
    const pageSections = currentPages[page] || [];
    const newPageSections = pageSections.filter(s => s.id !== sectionId);
    const newPages = { ...currentPages, [page]: newPageSections };
    updatePages(newPages);
  };

  const reorderSections = (page, oldIndex, newIndex) => {
    const currentPages = content.pages || {};
    const pageSections = [...(currentPages[page] || [])];
    const [removed] = pageSections.splice(oldIndex, 1);
    pageSections.splice(newIndex, 0, removed);
    const newPages = { ...currentPages, [page]: pageSections };
    updatePages(newPages);
  };

  const getPageSections = (pageName) => {
     const pages = content.pages || initialSiteContent.pages || {};
     return pages[pageName] || [];
  };

  const value = {
    content,
    loading,
    isSaving,
    hasUnsavedChanges,
    saveAllSettings,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    updateGlobalContent,
    updatePageSpecificContent,
    getPageSections,
    refreshContent: fetchContent
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
