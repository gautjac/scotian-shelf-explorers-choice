import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  listBackups, 
  restoreFromBackup, 
  deleteBackup, 
  exportBackup, 
  createBackup,
  getStorageStats,
  validateStorageIntegrity 
} from '../utils/backupManager';
import { 
  Download, 
  RotateCcw, 
  Trash2, 
  Save, 
  AlertTriangle,
  Clock,
  Database,
  HardDrive
} from 'lucide-react';

export const BackupManager = () => {
  const [backups, setBackups] = useState<any[]>([]);
  const [storageStats, setStorageStats] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadBackups();
    loadStorageStats();
    
    // Validate storage on load
    const validation = validateStorageIntegrity();
    if (!validation.isValid) {
      toast({
        title: "Storage Issues Detected",
        description: `Found issues: ${validation.errors.join(', ')}`,
        variant: "destructive",
      });
    }
  }, [toast]);

  const loadBackups = () => {
    setBackups(listBackups());
  };

  const loadStorageStats = () => {
    setStorageStats(getStorageStats());
  };

  const handleCreateManualBackup = async (type: 'comprehensive' | 'impact') => {
    setIsProcessing(true);
    try {
      const backupId = createBackup(type, 'manual');
      loadBackups();
      loadStorageStats();
      
      toast({
        title: "Backup Created",
        description: `Manual ${type} backup created successfully.`,
      });
    } catch (error) {
      toast({
        title: "Backup Failed",
        description: `Failed to create ${type} backup.`,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = async (backupId: string, backupType: string) => {
    setIsProcessing(true);
    try {
      restoreFromBackup(backupId);
      loadBackups();
      loadStorageStats();
      
      toast({
        title: "Restore Complete",
        description: `${backupType} configuration restored successfully.`,
      });
    } catch (error) {
      toast({
        title: "Restore Failed",
        description: "Failed to restore from backup.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (backupId: string) => {
    setIsProcessing(true);
    try {
      deleteBackup(backupId);
      loadBackups();
      loadStorageStats();
      
      toast({
        title: "Backup Deleted",
        description: "Backup removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete backup.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async (backupId: string) => {
    try {
      exportBackup(backupId);
      
      toast({
        title: "Backup Exported",
        description: "Backup file downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export backup.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatSize = (bytes: number) => {
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="space-y-4">
      {/* Storage Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Storage Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Storage</p>
              <p className="font-medium">{storageStats.totalSize} KB</p>
            </div>
            <div>
              <p className="text-muted-foreground">Backup Storage</p>
              <p className="font-medium">{storageStats.backupSize} KB</p>
            </div>
            <div>
              <p className="text-muted-foreground">Backups</p>
              <p className="font-medium">{storageStats.backupCount}/{storageStats.maxBackups}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Backup Creation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Save className="h-4 w-4" />
            Create Manual Backup
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Button
              onClick={() => handleCreateManualBackup('comprehensive')}
              disabled={isProcessing}
              className="w-full"
              variant="outline"
            >
              <Save className="h-4 w-4 mr-2" />
              Backup All Content
            </Button>
            <Button
              onClick={() => handleCreateManualBackup('impact')}
              disabled={isProcessing}
              className="w-full"
              variant="outline"
            >
              <Database className="h-4 w-4 mr-2" />
              Backup Impact Values Only
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Backup History
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {backups.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No backups found. Create a manual backup or import a CSV to start.
            </p>
          ) : (
            <div className="space-y-3">
              {backups.map((backup) => (
                <div
                  key={backup.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={backup.type === 'comprehensive' ? 'default' : 'secondary'}>
                        {backup.type}
                      </Badge>
                      <Badge variant={backup.trigger === 'manual' ? 'outline' : 'secondary'}>
                        {backup.trigger}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{backup.contentSummary}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(backup.timestamp)} • {formatSize(backup.size)}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRestore(backup.id, backup.type)}
                      disabled={isProcessing}
                      title="Restore this backup"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleExport(backup.id)}
                      title="Download backup file"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(backup.id)}
                      disabled={isProcessing}
                      title="Delete backup"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p className="flex items-center gap-2">
          <AlertTriangle className="h-3 w-3" />
          Automatic backups are created before CSV imports
        </p>
        <p>• Manual backups preserve current configuration state</p>
        <p>• Only the {storageStats.maxBackups} most recent backups are kept</p>
        <p>• Use export to save backups outside the browser</p>
      </div>
    </div>
  );
};