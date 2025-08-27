import React, { useState } from 'react';
import { Button } from './ui/button';
import { Trash2, AlertTriangle } from 'lucide-react';
import { clearCacheAndReload } from '../utils/cacheManager';
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

interface CacheClearButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export const CacheClearButton: React.FC<CacheClearButtonProps> = ({
  variant = 'destructive',
  size = 'default',
  className = ''
}) => {
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = async () => {
    setIsClearing(true);
    try {
      await clearCacheAndReload();
    } catch (error) {
      console.error('Error clearing cache:', error);
      setIsClearing(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={className}
          disabled={isClearing}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {isClearing ? 'Clearing...' : 'Clear All Cache'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Clear All Cache Data?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will clear all cached game data and reload the page. You will see the most up-to-date content, 
            but any unsaved progress will be lost. This action cannot be undone.
            <br /><br />
            <strong>Use this if you're seeing old content that doesn't match the current game.</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleClearCache}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Clear Cache & Reload
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};