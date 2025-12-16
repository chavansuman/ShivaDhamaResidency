
import { useContext } from 'react';
import { PropertiesContext } from '@/contexts/PropertiesContext';

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  
  return context;
};
