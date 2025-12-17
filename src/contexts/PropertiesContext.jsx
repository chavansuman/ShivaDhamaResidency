
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { initialProperties } from '@/data/properties';
import { getApiUrl, getApiHeaders } from '@/config/api';

export const PropertiesContext = createContext();

function floatsToStrings(value) {
  if (Array.isArray(value)) {
    return value.map(floatsToStrings);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, floatsToStrings(v)])
    );
  }

  if (typeof value === "number" && !Number.isInteger(value)) {
    return value.toString();
  }

  return value;
}


export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    try {
      const response = await fetch(getApiUrl('listProperties'), {
        method: 'GET',
        headers: getApiHeaders()
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
    // Optimistic update of local state
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));

    try {
      const { id: property_id, ...property_details } = updatedProperty;
      const response = await fetch(getApiUrl('updateProperty'), {
        method: 'POST',
        headers: {
          ...getApiHeaders(), // Include existing API headers (e.g., Authorization)
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ property_id, property_details: floatsToStrings(property_details) })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Property updated successfully via API:', updatedProperty);
      // Optionally, if the API returns the updated property, you might want to re-sync state here
      // const result = await response.json();
      // setProperties(prev => prev.map(p => p.id === result.id ? result : p));
    } catch (error) {
      console.error("Error updating property via API:", error);
      // TODO: Implement rollback of local state if API update fails
      // setProperties(prev => prev.map(p => p.id === updatedProperty.id ? previousVersionOfProperty : p));
    }
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
