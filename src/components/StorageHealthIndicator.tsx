import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  Database, 
  HardDrive, 
  Cloud, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  RefreshCw
} from 'lucide-react';
import { checkConfigurationHealth, createAutoBackup, persistentStorage } from '../utils/persistentStorage';
import { toast } from './ui/use-toast';

interface StorageHealthProps {
  className?: string;
}

export const StorageHealthIndicator: React.FC<StorageHealthProps> = ({ className }) => {
  const [health, setHealth] = useState<{
    indexedDB: boolean;
    cache: boolean;
    localStorage: boolean;
    errors: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const healthData = await checkConfigurationHealth();
      setHealth(healthData);
      setLastCheck(new Date());
    } catch (error) {
      console.error('Failed to check storage health:', error);
      toast({
        title: "Health Check Failed",
        description: "Unable to check storage health status.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackupAll = async () => {
    setIsLoading(true);
    try {
      const comprehensiveBackup = await createAutoBackup('comprehensive');
      const impactBackup = await createAutoBackup('impact');
      
      if (comprehensiveBackup || impactBackup) {
        toast({
          title: "Backup Created",
          description: "Configuration backups downloaded successfully.",
        });
      } else {
        toast({
          title: "Backup Failed", 
          description: "No configuration data found to backup.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to create backup:', error);
      toast({
        title: "Backup Failed",
        description: "Unable to create backup files.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnsurePersistence = async () => {
    setIsLoading(true);
    try {
      // Re-store current configurations to all storage layers
      const comprehensiveData = await persistentStorage.retrieve('comprehensiveConfiguration');
      const impactData = await persistentStorage.retrieve('impactConfiguration');
      
      let stored = 0;
      if (comprehensiveData) {
        await persistentStorage.store('comprehensiveConfiguration', comprehensiveData);
        stored++;
      }
      if (impactData) {
        await persistentStorage.store('impactConfiguration', impactData);
        stored++;
      }
      
      if (stored > 0) {
        toast({
          title: "Persistence Ensured",
          description: `${stored} configuration(s) saved to all available storage layers.`,
        });
        checkHealth(); // Refresh health status
      } else {
        toast({
          title: "No Data Found",
          description: "No configuration data found to persist.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to ensure persistence:', error);
      toast({
        title: "Persistence Failed",
        description: "Unable to save to all storage layers.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  if (!health) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Checking storage health...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const healthyCount = [health.indexedDB, health.cache, health.localStorage].filter(Boolean).length;
  const totalCount = 3;
  
  const getOverallStatus = () => {
    if (healthyCount === totalCount) return { status: 'excellent', color: 'bg-green-500', icon: CheckCircle };
    if (healthyCount >= 2) return { status: 'good', color: 'bg-yellow-500', icon: AlertTriangle };
    if (healthyCount >= 1) return { status: 'poor', color: 'bg-orange-500', icon: AlertTriangle };
    return { status: 'critical', color: 'bg-red-500', icon: XCircle };
  };

  const overall = getOverallStatus();
  const OverallIcon = overall.icon;

  return (
    <TooltipProvider>
      <Card className={className}>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <OverallIcon className="h-4 w-4" />
              <span className="font-medium">Storage Health</span>
              <Badge variant={overall.status === 'excellent' ? 'default' : 'secondary'}>
                {healthyCount}/{totalCount} Active
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={checkHealth}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh health status</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackupAll}
                    disabled={isLoading}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download backup files</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <Database className={`h-5 w-5 mb-1 ${health.indexedDB ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="text-xs text-center">IndexedDB</span>
                  {health.indexedDB ? (
                    <CheckCircle className="h-3 w-3 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="h-3 w-3 text-red-500 mt-1" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>IndexedDB: {health.indexedDB ? 'Working' : 'Failed'}</p>
                <p className="text-xs">Most reliable, large storage</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <Cloud className={`h-5 w-5 mb-1 ${health.cache ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="text-xs text-center">Cache API</span>
                  {health.cache ? (
                    <CheckCircle className="h-3 w-3 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="h-3 w-3 text-red-500 mt-1" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cache API: {health.cache ? 'Working' : 'Failed'}</p>
                <p className="text-xs">PWA cache, survives refresh</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <HardDrive className={`h-5 w-5 mb-1 ${health.localStorage ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="text-xs text-center">localStorage</span>
                  {health.localStorage ? (
                    <CheckCircle className="h-3 w-3 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="h-3 w-3 text-red-500 mt-1" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>localStorage: {health.localStorage ? 'Working' : 'Failed'}</p>
                <p className="text-xs">Basic storage, can be cleared</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {healthyCount < totalCount && (
            <div className="flex justify-center">
              <Button
                variant="default"
                size="sm"
                onClick={handleEnsurePersistence}
                disabled={isLoading}
                className="w-full"
              >
                <Database className="h-3 w-3 mr-2" />
                Ensure Persistence
              </Button>
            </div>
          )}

          {health.errors.length > 0 && (
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-destructive">Issues detected:</p>
              {health.errors.map((error, index) => (
                <p key={index} className="mt-1">• {error}</p>
              ))}
            </div>
          )}

          {lastCheck && (
            <p className="text-xs text-muted-foreground text-center">
              Last checked: {lastCheck.toLocaleTimeString()}
            </p>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};