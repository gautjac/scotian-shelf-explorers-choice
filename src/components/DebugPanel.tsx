import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { retrieveConfiguration, checkConfigurationHealth } from '../utils/persistentStorage';

interface DebugPanelProps {
  onClose: () => void;
}

export const DebugPanel = ({ onClose }: DebugPanelProps) => {
  const [storageData, setStorageData] = useState<any>(null);

  const inspectStorage = async () => {
    try {
      const persistentData = await retrieveConfiguration('comprehensive');
      const localData = localStorage.getItem('comprehensiveConfiguration');
      const parsedLocal = localData ? JSON.parse(localData) : null;
      
      setStorageData({
        persistent: persistentData,
        localStorage: parsedLocal,
        anyDataFound: !!(persistentData || parsedLocal)
      });
    } catch (error) {
      console.error('Failed to inspect storage:', error);
    }
  };

  const clearAllStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    console.log('🧹 Manually cleared all browser storage');
    setStorageData(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Debug Panel - Content Source Status</CardTitle>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </CardHeader>
        <CardContent className="overflow-y-auto space-y-6">
          
          {/* Current Status */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✅ Single Source of Truth Active</h3>
            <p className="text-green-700">
              All content is now loaded directly from <code>offlineContent.ts</code>. 
              No dynamic configuration overrides are active.
            </p>
          </div>

          {/* Storage Check */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button onClick={inspectStorage}>Check for Old Cache</Button>
              <Button onClick={clearAllStorage} variant="destructive">Clear All Storage</Button>
            </div>
            
            {storageData && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Storage Inspection Results:</h4>
                {storageData.anyDataFound ? (
                  <div className="text-amber-700">
                    ⚠️ Found cached configuration data. This might be causing old content to appear.
                    <Button onClick={clearAllStorage} className="ml-2" size="sm">Clear Now</Button>
                  </div>
                ) : (
                  <div className="text-green-700">
                    ✅ No cached configuration found. Using static content as expected.
                  </div>
                )}
                
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm">Show raw data</summary>
                  <pre className="bg-background p-2 rounded text-xs mt-2 overflow-auto max-h-40">
                    {JSON.stringify(storageData, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>

          {/* Content Source Info */}
          <div className="space-y-3">
            <h3 className="font-semibold">Content Source Information</h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <span className="font-medium">Content Source:</span> <code>src/data/offlineContent.ts</code>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <span className="font-medium">Import Path:</span> <code>src/data/content.ts</code> → <code>offlineContent.ts</code>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <span className="font-medium">Dynamic Config:</span> Disabled (using static content only)
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="space-y-3">
            <h3 className="font-semibold">Troubleshooting Old Content</h3>
            <div className="space-y-2 text-sm">
              <p>If you're still seeing old content:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Click "Clear All Storage" above</li>
                <li>Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)</li>
                <li>Check if browser has cached the page itself</li>
                <li>Open developer tools and disable cache while refreshing</li>
              </ol>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};