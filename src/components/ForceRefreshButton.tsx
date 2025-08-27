import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { clearAllCache } from '../utils/cacheManager';

export const ForceRefreshButton: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleForceRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      toast({
        title: "Force Refreshing...",
        description: "Clearing all cache and reloading with fresh content",
        duration: 2000,
      });

      // Clear all cache types
      await clearAllCache();
      
      // Clear session storage
      sessionStorage.clear();
      
      // Unregister service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(reg => reg.unregister()));
      }
      
      // Clear browser cache
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Force hard reload with cache busting
      const url = new URL(window.location.href);
      url.searchParams.set('force_refresh', Date.now().toString());
      url.searchParams.set('v', '5.0');
      url.searchParams.set('cache_bust', Math.random().toString(36).substring(7));
      
      window.location.replace(url.toString());
    } catch (error) {
      console.error('Error during force refresh:', error);
      // Force reload anyway
      window.location.reload();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={handleForceRefresh}
        disabled={isRefreshing}
        variant="outline"
        size="sm"
        className="gap-2 bg-card/95 backdrop-blur-sm border-primary hover:bg-primary hover:text-primary-foreground"
      >
        <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? 'Refreshing...' : 'Force Refresh'}
        <Badge variant="secondary" className="ml-1 text-xs">
          v5.0
        </Badge>
      </Button>
    </div>
  );
};