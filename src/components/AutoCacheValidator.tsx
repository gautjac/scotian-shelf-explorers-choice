import { useEffect } from 'react';
import { detectInvalidCachedData, clearAllCache } from '../utils/cacheManager';
import { useToast } from '@/hooks/use-toast';

export const AutoCacheValidator: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    const validateCache = async () => {
      try {
        console.log('AGGRESSIVE: Force clearing all cached data to ensure latest content...');
        
        toast({
          title: "Ensuring Latest Content",
          description: "Clearing all cached data to guarantee current scenarios...",
          duration: 2000,
        });
        
        // Always clear cache aggressively
        await clearAllCache();
        
        // Force immediate hard reload with cache busting
        const cacheBuster = `cache_cleared=${Date.now()}&v=4.0`;
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('cache_cleared', Date.now().toString());
        currentUrl.searchParams.set('v', '4.0');
        
        // Force hard reload without using cache
        window.location.replace(currentUrl.toString());
      } catch (error) {
        console.warn('Error during aggressive cache clearing:', error);
        // Force reload anyway
        window.location.reload();
      }
    };

    // Only run once on mount, be aggressive
    const hasRunBefore = sessionStorage.getItem('aggressive_cache_clear_v4');
    if (!hasRunBefore) {
      sessionStorage.setItem('aggressive_cache_clear_v4', 'true');
      validateCache();
    }
  }, [toast]);

  return null; // This component only performs background validation
};