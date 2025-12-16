
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

// This hook now serves as a wrapper around the global context to maintain backward compatibility
// while ensuring all components share the exact same state instance.
export const useSiteContent = () => {
  return useSiteSettings();
};
