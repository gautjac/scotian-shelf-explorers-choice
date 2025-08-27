import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EXPECTED_VERSION = '4.0';
const BUILD_TIMESTAMP = Date.now(); // This will be set at build time

export const VersionMismatchDetector: React.FC = () => {
  const [hasVersionMismatch, setHasVersionMismatch] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkVersion = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const currentVersion = urlParams.get('v');
      const lastKnownVersion = localStorage.getItem('last_known_version');
      
      // Check if we're running an older version
      if (lastKnownVersion && lastKnownVersion !== EXPECTED_VERSION) {
        setHasVersionMismatch(true);
        return;
      }
      
      // Check URL version parameter
      if (currentVersion && currentVersion !== EXPECTED_VERSION) {
        setHasVersionMismatch(true);
        return;
      }
      
      // Store current version
      localStorage.setItem('last_known_version', EXPECTED_VERSION);
    };

    checkVersion();
    
    // Check periodically for version changes
    const interval = setInterval(checkVersion, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    toast({
      title: "Updating to Latest Version",
      description: "Downloading fresh content and clearing old data...",
      duration: 2000,
    });

    try {
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Force reload with new version
      const newUrl = `${window.location.origin}/?v=${EXPECTED_VERSION}&updated=${Date.now()}`;
      window.location.href = newUrl;
      
    } catch (error) {
      console.error('Update failed:', error);
      window.location.reload();
    }
  };

  if (!hasVersionMismatch) {
    return null;
  }

  return (
    <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20 mb-4">
      <Download className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium text-blue-800 dark:text-blue-200">
            New version available!
          </span>
          <span className="text-sm text-blue-700 dark:text-blue-300">
            Update now to see the latest scenarios and improvements.
          </span>
        </div>
        <Button
          onClick={handleUpdate}
          size="sm"
          variant="default"
          disabled={isUpdating}
          className="ml-4 bg-blue-600 hover:bg-blue-700"
        >
          {isUpdating ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {isUpdating ? 'Updating...' : 'Update Now'}
        </Button>
      </AlertDescription>
    </Alert>
  );
};