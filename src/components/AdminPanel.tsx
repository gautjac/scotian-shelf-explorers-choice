import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { exportChoicesToCSV, parseImpactCSV } from '../utils/impactConfiguration';
import { exportComprehensiveCSV, parseComprehensiveCSV, validateComprehensiveConfig } from '../utils/comprehensiveConfiguration';
import { resetContentCache } from '../utils/cacheManager';
import { Download, Upload, X, RefreshCw } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [isUploading, setIsUploading] = useState(false);
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

  const handleResetCache = async () => {
    try {
      await resetContentCache();
      toast({
        title: "Cache Reset",
        description: "Content cache cleared. CSV changes should now be visible.",
      });
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to reset content cache.",
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
      
      if (isComprehensive) {
        // Parse comprehensive CSV
        const comprehensiveConfig = parseComprehensiveCSV(text);
        const validationErrors = validateComprehensiveConfig(comprehensiveConfig);
        
        if (validationErrors.length > 0) {
          toast({
            title: "Validation Failed",
            description: `Configuration errors: ${validationErrors.join(', ')}`,
            variant: "destructive",
          });
          return;
        }
        
        localStorage.setItem('comprehensiveConfiguration', JSON.stringify(comprehensiveConfig));
        // Notify app to reload config live
        window.dispatchEvent(new Event('comprehensive-config-updated'));
        
        toast({
          title: "Comprehensive CSV Uploaded",
          description: "Applied immediately. Your content and impacts are now live.",
        });
      } else {
        // Parse legacy impact CSV
        const impactConfig = parseImpactCSV(text);
        localStorage.setItem('impactConfiguration', JSON.stringify(impactConfig));
        // Notify app to apply new impacts
        window.dispatchEvent(new Event('impact-config-updated'));
        
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
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Admin Panel</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <Label>Cache Management</Label>
            <Button 
              onClick={handleResetCache} 
              className="w-full"
              variant="secondary"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Content Cache
            </Button>
            <p className="text-xs text-muted-foreground">
              Clear cached overrides to see CSV file changes
            </p>
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
            <p>• Upload modified CSV to apply changes</p>
            <p>• Changes require page refresh to take effect</p>
            <p>• The comprehensive CSV has sections: SCENARIOS, UI_ELEMENTS</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};