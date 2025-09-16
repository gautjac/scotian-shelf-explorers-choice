import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { useToast } from '@/hooks/use-toast';
import { exportChoicesToCSV, parseImpactCSV } from '../utils/impactConfiguration';
import { exportComprehensiveCSV, parseComprehensiveCSV, validateComprehensiveConfig, parseCopydeckCSVContent } from '../utils/comprehensiveConfiguration';
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
} // Force rebuild

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
      console.log('🔧 [DEBUG] Config for source generation:', config);
      console.log('🔧 [DEBUG] First scenario in config:', config.scenarios?.['plastic-pollution']?.en);
      
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
    if (!event.target.files) return;
    
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvContent = e.target?.result as string;
      
      if (file.name.includes('comprehensive') || file.name.includes('all_content')) {
        console.log('📥 [IMPORT] Processing comprehensive CSV...');
        
        // Create backup before importing
        try {
          await createBackup('comprehensive', 'auto-import');
        } catch (error) {
          console.warn('Failed to create backup:', error);
        }
        
        const parseResult = parseComprehensiveCSV(csvContent);
        
        if (parseResult.config) {
          // Store the comprehensive configuration
          await storeConfiguration('comprehensive', parseResult.config);
          
          // Trigger config reload
          window.dispatchEvent(new CustomEvent('configUpdate'));
          
          console.log('✅ [IMPORT] Comprehensive configuration imported successfully');
          
          let message = `Imported ${parseResult.successCount} entries successfully.`;
          if (parseResult.errors.length > 0) {
            message += ` ${parseResult.errors.length} errors encountered.`;
            console.warn('⚠️ [IMPORT] Errors:', parseResult.errors);
          }
          
          toast({
            title: "Configuration Imported",
            description: message,
            variant: parseResult.errors.length > 0 ? "default" : "default",
          });
        } else {
          console.error('❌ [IMPORT] Failed to parse comprehensive CSV');
          console.error('❌ [IMPORT] Errors:', parseResult.errors);
          toast({
            title: "Import Failed",
            description: `Failed to parse CSV: ${parseResult.errors.join(', ')}`,
            variant: "destructive",
          });
        }
      } else if (file.name.includes('impact')) {
        console.log('📥 [IMPORT] Processing impact CSV...');
        
        // Create backup before importing
        try {
          await createBackup('impact', 'auto-import');
        } catch (error) {
          console.warn('Failed to create backup:', error);
        }
        
        const parsedImpacts = parseImpactCSV(csvContent);
        
        if (parsedImpacts) {
          // Store the impact configuration
          await storeConfiguration('impact', parsedImpacts);
          
          console.log('✅ [IMPORT] Impact configuration imported successfully');
          toast({
            title: "Impact Configuration Imported",
            description: "Impact configuration has been imported successfully.",
          });
        } else {
          console.error('❌ [IMPORT] Failed to parse impact CSV');
          toast({
            title: "Import Failed",
            description: "Failed to parse the impact CSV file.",
            variant: "destructive",
          });
        }
      } else {
        console.log('📥 [IMPORT] Processing copydeck CSV...');
        
        // Create backup before importing
        try {
          await createBackup('comprehensive', 'auto-import');
        } catch (error) {
          console.warn('Failed to create backup:', error);
        }
        
        const parseResult = parseCopydeckCSVContent(csvContent);
        
        if (parseResult.result && Object.keys(parseResult.result).length > 0) {
          // Store the UI text configuration - use comprehensive type since UI text is part of it
          const uiConfig = { uiElements: parseResult.result, scenarios: {} };
          await storeConfiguration('comprehensive', uiConfig);
          
          // Trigger config reload
          window.dispatchEvent(new CustomEvent('configUpdate'));
          
          let message = `Imported ${parseResult.successCount} UI text entries successfully.`;
          if (parseResult.errors && parseResult.errors.length > 0) {
            message += ` ${parseResult.errors.length} errors encountered.`;
            console.warn('⚠️ [IMPORT] Errors:', parseResult.errors);
          }
          
          console.log('✅ [IMPORT] UI text imported successfully');
          toast({
            title: "UI Text Imported",
            description: message,
          });
        } else {
          console.error('❌ [IMPORT] Failed to parse copydeck CSV');
          if (parseResult.errors && parseResult.errors.length > 0) {
            console.error('❌ [IMPORT] Errors:', parseResult.errors);
          }
          toast({
            title: "Import Failed",
            description: `Failed to parse CSV: ${parseResult.errors?.join(', ') || 'Unknown error'}`,
            variant: "destructive",
          });
        }
      }
    };
    
    reader.readAsText(file);
    event.target.value = '';
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
                <p>• Upload CSV to prepare for source file generation</p>
                <p>• Generate source files after CSV import</p>
                <p><strong>IMPORTANT:</strong> Replace src/data/offlineContent.ts and src/data/content.ts files on GitHub with downloaded files</p>
                <p>• Changes only appear after GitHub file replacement and hard refresh (Ctrl+F5)</p>
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