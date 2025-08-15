import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { useToast } from '@/hooks/use-toast';
import { exportChoicesToCSV, parseImpactCSV } from '../utils/impactConfiguration';
import { exportComprehensiveCSV, parseComprehensiveCSV, validateComprehensiveConfig } from '../utils/comprehensiveConfiguration';
import { createBackup } from '../utils/backupManager';
import { storeConfiguration } from '../utils/persistentStorage';
import { downloadSourceFiles } from '../utils/sourceFileGenerator';
import { Download, Upload, X, Database, AlertCircle, FileCode } from 'lucide-react';
import { EditorGuide } from './EditorGuide';
import { BackupManager } from './BackupManager';
import { StorageHealthIndicator } from './StorageHealthIndicator';
import { DebugPanel } from './DebugPanel';

interface ContentManagerProps {
  onClose: () => void;
}

export const ContentManager = ({ onClose }: ContentManagerProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const { toast } = useToast();

  const handleDownloadImpactCSV = () => {
    try {
      const csvContent = exportChoicesToCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', 'impact_configuration.csv');
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Impact CSV Downloaded",
        description: "Impact configuration exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to export CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadComprehensiveCSV = () => {
    try {
      const csvContent = exportComprehensiveCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', 'comprehensive_app_configuration.csv');
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Comprehensive CSV Downloaded",
        description: "All app content and impact values exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to export comprehensive CSV file.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateSourceFiles = async () => {
    try {
      // Get current configuration
      const configStr = localStorage.getItem('comprehensiveConfiguration');
      if (!configStr) {
        toast({
          title: "No Configuration Found",
          description: "Please import a CSV file first before generating source files.",
          variant: "destructive",
        });
        return;
      }
      
      const config = JSON.parse(configStr);
      
      const success = downloadSourceFiles(config);
      
      if (success) {
        toast({
          title: "Source Files Generated",
          description: "Downloaded offlineContent.ts and content.ts. Replace these files in your project to make changes permanent.",
        });
      } else {
        toast({
          title: "Generation Failed", 
          description: "Failed to generate source files.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to access configuration data.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const text = await file.text();
      
      // Detect file type by checking first line
      const firstLine = text.split('\n')[0];
      const isComprehensive = firstLine.includes('Section,Type,ID,Language,Field,Content');
      
      // Create automatic backup before import
      try {
        const backupType = isComprehensive ? 'comprehensive' : 'impact';
        await createBackup(backupType, 'auto-import');
        
        toast({
          title: "Backup Created",
          description: "Automatic backup created before import.",
        });
      } catch (backupError) {
        // Continue with import even if backup fails
        console.warn('Failed to create auto-backup:', backupError);
        
        toast({
          title: "Backup Warning",
          description: "Could not create backup, but continuing with import.",
          variant: "destructive",
        });
      }
      
      if (isComprehensive) {
        // Parse comprehensive CSV
        console.log('📁 [DEBUG] Parsing comprehensive CSV...');
        const comprehensiveConfig = parseComprehensiveCSV(text);
        console.log('📊 [DEBUG] Parsed config structure:', comprehensiveConfig);
        console.log('📊 [DEBUG] Scenarios available:', Object.keys(comprehensiveConfig.scenarios || {}));
        
        const validationErrors = validateComprehensiveConfig(comprehensiveConfig);
        
        if (validationErrors.length > 0) {
          console.error('❌ [DEBUG] Validation errors:', validationErrors);
          toast({
            title: "Validation Failed",
            description: `Configuration errors: ${validationErrors.join(', ')}`,
            variant: "destructive",
          });
          return;
        }
        
        // Store comprehensive configuration in persistent storage
        console.log('💾 [DEBUG] Storing comprehensive config...');
        await storeConfiguration('comprehensive', comprehensiveConfig);
        localStorage.setItem('comprehensiveConfiguration', JSON.stringify(comprehensiveConfig));
        
        // Trigger immediate reload
        window.dispatchEvent(new CustomEvent('comprehensive-config-updated'));
        console.log('🔔 [DEBUG] Dispatched config update event');
        
        toast({
          title: "Comprehensive CSV Uploaded",
          description: "Applied immediately. Your content and impacts are now live.",
        });
      } else {
        // Parse legacy impact CSV
        const impactConfig = parseImpactCSV(text);
        
        // Store impact configuration in persistent storage
        await storeConfiguration('impact', impactConfig);
        localStorage.setItem('impactConfiguration', JSON.stringify(impactConfig));
        
        toast({
          title: "Impact CSV Uploaded",
          description: `Applied immediately. Imported ${Object.keys(impactConfig).length} scenarios.`,
        });
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to parse CSV file. Check the format.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Clear the input
      event.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Content Manager</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="import-export" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mx-6 mt-2">
              <TabsTrigger value="import-export">Import/Export</TabsTrigger>
              <TabsTrigger value="backup-history">Backup History</TabsTrigger>
              <TabsTrigger value="storage-health">Storage Health</TabsTrigger>
              <TabsTrigger value="editor-guide">Editor's Guide</TabsTrigger>
              <TabsTrigger value="debug">Debug</TabsTrigger>
            </TabsList>
            
            <TabsContent value="import-export" className="px-6 pb-6 space-y-4">
              <div className="space-y-2">
                <Label>Download Configurations</Label>
                <div className="space-y-2">
                  <Button 
                    onClick={handleDownloadComprehensiveCSV} 
                    className="w-full"
                    variant="default"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download All Content & Impact Values
                  </Button>
                  <Button 
                    onClick={handleDownloadImpactCSV} 
                    className="w-full"
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Impact Values Only
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Make Changes Permanent</Label>
                <Button 
                  onClick={handleGenerateSourceFiles} 
                  className="w-full"
                  variant="secondary"
                >
                  <FileCode className="h-4 w-4 mr-2" />
                  Generate Source Files for Publishing
                </Button>
                <div className="text-xs text-muted-foreground">
                  Downloads .ts files to replace in your project, making CSV changes permanent in published apps
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="csv-upload">Upload New Configuration</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="file:mr-2 file:px-2 file:py-1 file:rounded-md file:border-0 file:text-sm file:bg-secondary file:text-secondary-foreground"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                {isUploading && (
                  <p className="text-sm text-muted-foreground">Processing file...</p>
                )}
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Comprehensive CSV:</strong> All app text, scenario content, UI labels, and impact values in one file</p>
                <p><strong>Impact Only CSV:</strong> Just scenario impact values (legacy format)</p>
                <p>• Edit downloaded CSV in Excel/Google Sheets</p>
                <p>• Upload modified CSV to apply changes immediately</p>
                <p>• Generate source files after CSV import to make changes permanent in published apps</p>
                <p>• Replace the downloaded .ts files in your project to publish your custom content</p>
                <p>• Automatic backup created before each import</p>
              </div>
            </TabsContent>
            
            <TabsContent value="backup-history" className="px-6 pb-6">
              <BackupManager />
            </TabsContent>

            <TabsContent value="storage-health" className="px-6 pb-6 space-y-4">
              <StorageHealthIndicator />
              
              <Card>
                <CardHeader>
                  <CardTitle>About Storage Health</CardTitle>
                  <CardDescription>
                    Your app uses multiple storage layers to ensure content survives browser clearing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm space-y-2">
                    <p><strong>IndexedDB:</strong> Most reliable, large storage capacity, survives browser clearing</p>
                    <p><strong>Cache API:</strong> PWA cache storage, persists across sessions</p>
                    <p><strong>localStorage:</strong> Basic browser storage, can be cleared by user</p>
                  </div>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      If any storage layer fails, click "Ensure Persistence" to re-save your content to all available layers.
                      The "Download backup files" button creates downloadable JSON backups for maximum safety.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="editor-guide" className="px-6 pb-6">
              <EditorGuide />
            </TabsContent>

            <TabsContent value="debug" className="px-6 pb-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Advanced debugging tools to inspect configuration data and troubleshoot issues.
                  </p>
                  <Button onClick={() => setShowDebugPanel(true)}>Open Debug Panel</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {showDebugPanel && (
        <DebugPanel onClose={() => setShowDebugPanel(false)} />
      )}
    </div>
  );
};