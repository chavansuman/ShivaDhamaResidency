
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { initialProperties } from '@/data/properties';

export const PropertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    try {
      const response = await fetch('https://iq6wije0mf.execute-api.us-east-1.amazonaws.com/list-properties', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.warn("API fetch error:", response.statusText);
        // Fallback to local
        if (properties.length === 0) setProperties(initialProperties);
        return;
      }

      const result = await response.json();
      const data = result.properties || result; // Handle both {properties: [...]} and [...] formats

      if (data && Array.isArray(data) && data.length > 0) {
        // Sort by displayOrder
        const sortedData = data.sort((a, b) => (a.displayOrder || 100) - (b.displayOrder || 100));
        setProperties(sortedData);
      } else {
        // If API returns empty array, use initialProperties
        setProperties(initialProperties);
      }
    } catch (error) {
      console.error("Error loading properties:", error);
      if (properties.length === 0) setProperties(initialProperties);
    } finally {
      setLoading(false);
    }
  }, []); // properties removed to avoid loop

  // Initial fetch
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const updateProperty = async (updatedProperty) => {
    // Update local state only (no API call for now)
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));

    // TODO: If you have an API endpoint for updating properties, call it here
    console.log('Property updated locally:', updatedProperty);
  };

  const addProperty = async (newProperty) => {
    const tempId = newProperty.id || `prop_${Date.now()}`;
    const propertyWithId = {
      ...newProperty,
      id: tempId,
      displayOrder: 100 // Default to end of list
    };

    // Update local state only (no API call for now)
    setProperties(prev => [...prev, propertyWithId]);

    // TODO: If you have an API endpoint for adding properties, call it here
    console.log('Property added locally:', propertyWithId);
  };

  const deleteProperty = async (id) => {
    // Update local state only (no API call for now)
    setProperties(prev => prev.filter(p => p.id !== id));

    // TODO: If you have an API endpoint for deleting properties, call it here
    console.log('Property deleted locally:', id);
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
