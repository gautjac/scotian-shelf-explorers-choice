import { useEffect } from 'react';
import { detectInvalidCachedData, clearAllCache } from '../utils/cacheManager';
import { useToast } from '@/hooks/use-toast';

export const AutoCacheValidator: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    const validateCache = async () => {
      try {
        console.log('Checking for invalid cached data...');
        const hasInvalidData = await detectInvalidCachedData();
        
        if (hasInvalidData) {
          console.log('Auto-clearing invalid cached data...');
          
          toast({
            title: "Updating Content",
            description: "Clearing old cached data to show current scenarios...",
            duration: 3000,
          });
          
          await clearAllCache();
          
          // Force immediate reload to show fresh content
          window.location.href = window.location.href + '?cache_cleared=' + Date.now();
        } else {
          console.log('Cache validation passed - content is current');
        }
      } catch (error) {
        console.warn('Error during auto cache validation:', error);
        // If cache validation fails, still try to clear cache as a precaution
        try {
          await clearAllCache();
          toast({
            title: "Cache Refreshed",
            description: "Content cache has been refreshed to ensure latest scenarios.",
            duration: 3000,
          });
        } catch (clearError) {
          console.warn('Failed to clear cache:', clearError);
        }
      }
    };

    // Run validation immediately and then after a short delay
    validateCache();
    const timeout = setTimeout(validateCache, 500);
    
    return () => clearTimeout(timeout);
  }, [toast]);

  return null; // This component only performs background validation
};