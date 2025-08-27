import { useEffect } from 'react';
import { detectInvalidCachedData, clearAllCache } from '../utils/cacheManager';
import { useToast } from '@/hooks/use-toast';

export const AutoCacheValidator: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    const validateCache = async () => {
      try {
        const hasInvalidData = await detectInvalidCachedData();
        
        if (hasInvalidData) {
          console.log('Auto-clearing invalid cached data...');
          await clearAllCache();
          
          toast({
            title: "Content Updated",
            description: "Old cached data was automatically cleared to show the latest content.",
            duration: 5000,
          });
          
          // Trigger a soft reload to refresh the UI
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        console.warn('Error during auto cache validation:', error);
      }
    };

    // Run validation after a short delay to let the app initialize
    const timeout = setTimeout(validateCache, 1000);
    
    return () => clearTimeout(timeout);
  }, [toast]);

  return null; // This component only performs background validation
};