import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { exportChoicesToCSV, parseImpactCSV } from '../utils/impactConfiguration';
import { Download, Upload, X } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleDownloadCSV = () => {
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
        title: "CSV Downloaded",
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const text = await file.text();
      const impactConfig = parseImpactCSV(text);
      
      // Store the parsed config in localStorage for now
      // In a real app, this would update the actual game data
      localStorage.setItem('impactConfiguration', JSON.stringify(impactConfig));
      
      toast({
        title: "CSV Uploaded",
        description: `Successfully imported ${Object.keys(impactConfig).length} scenarios. Refresh to apply changes.`,
      });
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
            <Label>Download Current Configuration</Label>
            <Button 
              onClick={handleDownloadCSV} 
              className="w-full"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
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
            <p>• Download to get the current impact values</p>
            <p>• Edit in Excel/Sheets and upload to apply changes</p>
            <p>• Changes require page refresh to take effect</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};