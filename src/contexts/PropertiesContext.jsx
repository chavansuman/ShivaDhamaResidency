
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { initialProperties } from '@/data/properties';

export const PropertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to map DB snake_case to app camelCase safely
  const mapFromDb = useCallback((p) => {
    if (!p) return null;
    return {
      ...p,
      id: p.id,
      title: p.title || '',
      bhk: p.bhk || '',
      floor: p.floor || '',
      floorNumber: p.floor_number ?? 0,
      rent: Number(p.rent) || 0,
      deposit: Number(p.deposit) || 0,
      maintenance: Number(p.maintenance) || 0,
      area: Number(p.area) || 0,
      carpetArea: Number(p.carpet_area) || 0,
      bathrooms: Number(p.bathrooms) || 0,
      status: p.status || 'Available',
      availableFrom: p.available_from || null,
      furnishingNote: p.furnishing_note || '',
      virtualTour: p.virtual_tour || { rooms: [], externalLink: '' },
      amenities: p.amenities || [],
      features: p.features || {},
      images: p.images || [],
      roomAreas: p.room_areas || [],
      displayOrder: p.display_order || 100, // New field mapping
    };
  }, []);

  // Helper to map app camelCase to DB snake_case
  const mapToDb = useCallback((p) => ({
    id: p.id,
    title: p.title,
    bhk: p.bhk,
    floor: p.floor,
    floor_number: p.floorNumber,
    rent: p.rent,
    deposit: p.deposit,
    maintenance: p.maintenance,
    area: p.area,
    carpet_area: p.carpetArea,
    bathrooms: p.bathrooms,
    status: p.status,
    available_from: p.availableFrom,
    furnishing_note: p.furnishingNote,
    virtual_tour: p.virtualTour,
    amenities: p.amenities,
    features: p.features,
    images: p.images,
    room_areas: p.roomAreas,
    display_order: p.displayOrder, // New field mapping
  }), []);

  const fetchProperties = useCallback(async () => {
    try {
      // Sort by display_order first, then created_at
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });
      
      if (error) {
        console.warn("Supabase fetch error:", error.message);
        // Fallback to local
        if (properties.length === 0) setProperties(initialProperties);
        return;
      }
      
      if (data && data.length > 0) {
        const mappedData = data.map(mapFromDb);
        setProperties(mappedData);
      } else {
         // If DB is empty (rare case after migration, but safe fallback)
         setProperties(initialProperties);
      }
    } catch (error) {
      console.error("Error loading properties:", error);
      if (properties.length === 0) setProperties(initialProperties);
    } finally {
      setLoading(false);
    }
  }, [mapFromDb]); // properties removed to avoid loop

  // Initial fetch and Realtime Subscription
  useEffect(() => {
    fetchProperties();

    const channelName = `public:properties:${Date.now()}`;
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'properties' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newRecord = mapFromDb(payload.new);
            setProperties((prev) => {
              if (prev.find(p => p.id === newRecord.id)) return prev;
              const newList = [...prev, newRecord];
              // Sort local list to match DB order
              return newList.sort((a, b) => (a.displayOrder || 100) - (b.displayOrder || 100));
            });
          } 
          else if (payload.eventType === 'UPDATE') {
            const updatedRecord = mapFromDb(payload.new);
            setProperties((prev) => {
               const updatedList = prev.map((item) => item.id === payload.new.id ? updatedRecord : item);
               return updatedList.sort((a, b) => (a.displayOrder || 100) - (b.displayOrder || 100));
            });
          } 
          else if (payload.eventType === 'DELETE') {
            setProperties((prev) => 
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProperties, mapFromDb]);

  const updateProperty = async (updatedProperty) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
    
    try {
      const dbPayload = mapToDb(updatedProperty);
      const { id, ...updates } = dbPayload;
      
      const { error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error("Supabase Update Failed:", error);
        fetchProperties();
        throw error;
      }
    } catch (err) {
      console.error("Update Property Exception:", err);
      fetchProperties();
      throw err;
    }
  };

  const addProperty = async (newProperty) => {
    const tempId = newProperty.id || `prop_${Date.now()}`;
    const propertyWithId = { 
      ...newProperty, 
      id: tempId,
      created_at: new Date().toISOString(),
      displayOrder: 100 // Default to end of list
    };
    
    setProperties(prev => [...prev, propertyWithId]);

    try {
      const { error } = await supabase.from('properties').insert(mapToDb(propertyWithId));
      if (error) {
        console.error("Add failed", error);
        fetchProperties();
        throw error;
      }
    } catch (err) {
      console.error("Add Exception", err);
      fetchProperties();
      throw err;
    }
  };

  const deleteProperty = async (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));

    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) {
        console.error("Delete failed", error);
        fetchProperties();
        throw error;
      }
    } catch (err) {
       fetchProperties();
       throw err;
    }
  };

  return (
    <PropertiesContext.Provider value={{ 
      properties, 
      loading, 
      updateProperty, 
      addProperty, 
      deleteProperty,
      refreshProperties: fetchProperties
    }}>
      {children}
    </PropertiesContext.Provider>
  );
};
