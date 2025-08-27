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
    
    toast({
      title: "Nuclear Cache Clear + Static Mode",
      description: "Destroying ALL caches and enabling static content...",
      duration: 3000,
    });

    try {
      console.log('💥 NUCLEAR: Starting TOTAL cache destruction + static mode...');
      
      // STEP 1: Clear ALL localStorage completely
      const allKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) allKeys.push(key);
      }
      allKeys.forEach(key => localStorage.removeItem(key));
      console.log('💥 NUCLEAR: ALL localStorage cleared:', allKeys.length, 'keys');
      
      // STEP 2: Clear sessionStorage completely
      sessionStorage.clear();
      console.log('💥 NUCLEAR: sessionStorage cleared');
      
      // STEP 3: Clear ALL configuration storage types
      try {
        const { persistentStorage } = await import('../utils/persistentStorage');
        await persistentStorage.clearAll();
        console.log('💥 NUCLEAR: Persistent storage cleared');
      } catch (error) {
        console.log('💥 NUCLEAR: Persistent storage clear error (continuing):', error);
      }
      
      // STEP 4: Clear cache manager
      try {
        await clearAllCache();
        console.log('💥 NUCLEAR: Cache manager cleared');
      } catch (error) {
        console.log('💥 NUCLEAR: Cache manager clear error (continuing):', error);
      }
      
      // STEP 5: Unregister ALL service workers
      if ('serviceWorker' in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const registration of registrations) {
            await registration.unregister();
          }
          console.log('💥 NUCLEAR: Service workers unregistered:', registrations.length);
        } catch (error) {
          console.log('💥 NUCLEAR: Service worker clear error (continuing):', error);
        }
      }
      
      // STEP 6: Clear ALL browser caches
      if ('caches' in window) {
        try {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
          console.log('💥 NUCLEAR: Browser caches deleted:', cacheNames.length);
        } catch (error) {
          console.log('💥 NUCLEAR: Browser cache clear error (continuing):', error);
        }
      }
      
      // STEP 7: Clear IndexedDB completely (aggressive)
      try {
        if ('indexedDB' in window) {
          const dbDeleteRequest = indexedDB.deleteDatabase('OceanGuardianStorage');
          dbDeleteRequest.onsuccess = () => console.log('💥 NUCLEAR: IndexedDB deleted');
          dbDeleteRequest.onerror = () => console.log('💥 NUCLEAR: IndexedDB delete error (continuing)');
        }
      } catch (error) {
        console.log('💥 NUCLEAR: IndexedDB delete error (continuing):', error);
      }
      
      // STEP 8: Force static content mode
      localStorage.setItem('force_static_content', 'true');
      console.log('💥 NUCLEAR: Force static mode enabled');
      
      toast({
        title: "Nuclear Destruction Complete",
        description: "Reloading in static content mode...",
        duration: 2000,
      });
      
      // STEP 9: Force hard reload with static mode
      setTimeout(() => {
        const cacheBuster = `nuclear=${Date.now()}&force_static=true&v=6.0`;
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('nuclear', Date.now().toString());
        currentUrl.searchParams.set('force_static', 'true');
        currentUrl.searchParams.set('v', '6.0');
        currentUrl.searchParams.set('cache_bust', Math.random().toString());
        
        // Force replace location for hardest possible reload
        window.location.replace(currentUrl.toString());
      }, 1000);
      
    } catch (error) {
      console.error('💥 NUCLEAR: Critical error during nuclear clear:', error);
      toast({
        title: "Nuclear Clear Error",
        description: "Force reloading with static mode anyway...",
        variant: "destructive",
      });
      
      // Force static mode and reload anyway
      localStorage.setItem('force_static_content', 'true');
      setTimeout(() => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('force_static', 'true');
        currentUrl.searchParams.set('emergency', 'true');
        window.location.replace(currentUrl.toString());
      }, 1000);
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