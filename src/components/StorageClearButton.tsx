import { useState } from 'react';
import { Button } from './ui/button';
import { Trash2, AlertTriangle } from 'lucide-react';
import { persistentStorage } from '../utils/persistentStorage';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export const StorageClearButton = () => {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearAll = async () => {
    setIsClearing(true);
    try {
      // Clear all persistent storage
      await persistentStorage.clearAll();
      
      // Clear localStorage completely
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('ocean-game') || key.startsWith('comprehensive') || key.startsWith('impact')) {
          localStorage.removeItem(key);
        }
      });

      // Clear sessionStorage
      sessionStorage.clear();

      // Clear service worker caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }

      toast.success('All caches cleared! The page will reload to use fresh content.');
      
      // Force reload after short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error clearing storage:', error);
      toast.error('Failed to clear all storage');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Clear All Cache
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Clear All Cached Data?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will clear all cached configurations, stored settings, and force the app to reload with fresh content. 
            This action cannot be undone and will help resolve issues with outdated cached content.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleClearAll}
            disabled={isClearing}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isClearing ? 'Clearing...' : 'Clear All Cache'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};