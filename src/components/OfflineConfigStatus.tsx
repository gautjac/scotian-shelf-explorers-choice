import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Wifi, WifiOff, RefreshCw, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { checkOfflineStorageHealth, syncOfflineConfigurations, offlineConfigManager } from '../utils/offlineConfigManager';

interface StorageHealth {
  indexedDB: boolean;
  cache: boolean;
  localStorage: boolean;
  errors: string[];
}

export const OfflineConfigStatus = () => {
  const [health, setHealth] = useState<StorageHealth | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const healthStatus = await checkOfflineStorageHealth();
      setHealth(healthStatus);
    } catch (error) {
      console.error('Failed to check storage health:', error);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await syncOfflineConfigurations();
      await checkHealth();
      toast({
        title: "Sync Complete",
        description: "All configurations have been synchronized across storage layers.",
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to synchronize configurations.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleBackup = async () => {
    try {
      const comprehensiveBackup = await offlineConfigManager.createBackup('comprehensive');
      const impactBackup = await offlineConfigManager.createBackup('impact');
      
      if (comprehensiveBackup || impactBackup) {
        toast({
          title: "Backup Created",
          description: "Configuration backups have been downloaded.",
        });
      } else {
        toast({
          title: "Backup Failed",
          description: "No configurations available to backup.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Backup Error",
        description: "Failed to create configuration backups.",
        variant: "destructive",
      });
    }
  };

  const getStorageStatus = () => {
    if (!health) return 'unknown';
    
    const workingLayers = [health.indexedDB, health.cache, health.localStorage].filter(Boolean).length;
    
    if (workingLayers === 3) return 'excellent';
    if (workingLayers === 2) return 'good';
    if (workingLayers === 1) return 'poor';
    return 'critical';
  };

  const storageStatus = getStorageStatus();

  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg bg-card">
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 text-orange-500" />
        )}
        
        <Badge 
          variant={storageStatus === 'excellent' ? 'default' : 
                  storageStatus === 'good' ? 'secondary' : 
                  storageStatus === 'poor' ? 'outline' : 'destructive'}
        >
          Storage: {storageStatus}
        </Badge>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSync}
          disabled={isSyncing}
          className="h-6 px-2"
        >
          <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackup}
          className="h-6 px-2"
        >
          <Download className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};