import React, { useState } from 'react';
import { Button } from './ui/button';
import { AlertTriangle, RefreshCw, Zap } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { clearAllCache } from '../utils/cacheManager';
import { useToast } from '@/hooks/use-toast';

export const NuclearCacheClear: React.FC = () => {
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const handleNuclearClear = async () => {
    setIsClearing(true);
    
    try {
      toast({
        title: "🚀 Nuclear Cache Clear Initiated",
        description: "Clearing ALL cached data and forcing fresh reload...",
        duration: 3000,
      });

      // Clear all possible caches
      await clearAllCache();
      
      // Clear session storage
      sessionStorage.clear();
      
      // Unregister all service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(reg => reg.unregister()));
      }
      
      // Clear all possible browser caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Force hard reload with maximum cache busting
      const timestamp = Date.now();
      const cacheBuster = `nuclear_clear=${timestamp}&v=4.0&force=true`;
      window.location.href = `${window.location.origin}/?${cacheBuster}`;
      
    } catch (error) {
      console.error('Nuclear cache clear failed:', error);
      // Force reload anyway
      window.location.reload();
    }
  };

  return (
    <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950/20 mb-4">
      <Zap className="h-4 w-4 text-orange-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium text-orange-800 dark:text-orange-200">
            Not seeing the latest content?
          </span>
          <span className="text-sm text-orange-700 dark:text-orange-300">
            Force clear ALL cached data and reload with fresh content.
          </span>
        </div>
        <Button
          onClick={handleNuclearClear}
          size="sm"
          variant="destructive"
          disabled={isClearing}
          className="ml-4 bg-orange-600 hover:bg-orange-700"
        >
          {isClearing ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Zap className="h-4 w-4 mr-2" />
          )}
          {isClearing ? 'Clearing...' : 'Nuclear Clear'}
        </Button>
      </AlertDescription>
    </Alert>
  );
};