import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';
import { retrieveConfiguration, checkConfigurationHealth } from '../utils/persistentStorage';

interface DebugPanelProps {
  onClose: () => void;
}

export const DebugPanel = ({ onClose }: DebugPanelProps) => {
  const { config, reloadConfig, hasConfig } = useComprehensiveConfig();
  const [storageData, setStorageData] = useState<any>(null);
  const [healthData, setHealthData] = useState<any>(null);

  const inspectStorage = async () => {
    try {
      const persistentData = await retrieveConfiguration('comprehensive');
      const localData = localStorage.getItem('comprehensiveConfiguration');
      const parsedLocal = localData ? JSON.parse(localData) : null;
      
      setStorageData({
        persistent: persistentData,
        localStorage: parsedLocal,
        match: JSON.stringify(persistentData) === JSON.stringify(parsedLocal)
      });
    } catch (error) {
      console.error('Failed to inspect storage:', error);
    }
  };

  const checkHealth = async () => {
    try {
      const health = await checkConfigurationHealth();
      setHealthData(health);
    } catch (error) {
      console.error('Failed to check health:', error);
    }
  };

  const testConfigRetrieval = () => {
    console.log('🧪 [TEST] Current config in hook:', config);
    console.log('🧪 [TEST] Has config:', hasConfig);
    
    // Test specific scenarios
    const testScenario = 'overfishing';
    const testChoice = 'regulations';
    
    console.log('🧪 [TEST] Testing scenario retrieval:');
    console.log('Title (en):', config?.scenarios?.en?.[testScenario]?.title);
    console.log('Title (fr):', config?.scenarios?.fr?.[testScenario]?.title);
    
    console.log('🧪 [TEST] Testing choice retrieval:');
    const compositeId = `${testScenario}_${testChoice}`;
    console.log(`Choice text (${compositeId}):`, config?.scenarios?.en?.[compositeId]?.text);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Debug Panel - Configuration Inspector</CardTitle>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </CardHeader>
        <CardContent className="overflow-y-auto">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="test">Test</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Config Status</h3>
                  <p>Has Config: {hasConfig ? '✅' : '❌'}</p>
                  <p>Config Object: {config ? '✅' : '❌'}</p>
                  <p>Scenarios Available: {config?.scenarios ? Object.keys(config.scenarios).length : 0} languages</p>
                  <p>UI Elements Available: {config?.uiElements ? Object.keys(config.uiElements).length : 0} languages</p>
                </div>
                <div className="space-y-2">
                  <Button onClick={reloadConfig} className="w-full">Reload Config</Button>
                  <Button onClick={inspectStorage} className="w-full">Inspect Storage</Button>
                  <Button onClick={checkHealth} className="w-full">Check Health</Button>
                  <Button onClick={testConfigRetrieval} className="w-full">Test Retrieval</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="storage" className="space-y-4">
              {storageData && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Storage Comparison</h3>
                    <p>Data Match: {storageData.match ? '✅' : '❌'}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Persistent Storage:</h4>
                    <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(storageData.persistent, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-medium">localStorage:</h4>
                    <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(storageData.localStorage, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
              
              {healthData && (
                <div>
                  <h3 className="font-semibold">Storage Health</h3>
                  <pre className="bg-muted p-2 rounded text-xs">
                    {JSON.stringify(healthData, null, 2)}
                  </pre>
                </div>
              )}
            </TabsContent>

            <TabsContent value="structure" className="space-y-4">
              <div>
                <h3 className="font-semibold">Current Config Structure</h3>
                <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-96">
                  {JSON.stringify(config, null, 2)}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="test" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Live Testing</h3>
                <p>Open the browser console to see test results when you click the button below.</p>
                <Button onClick={testConfigRetrieval}>Run Retrieval Test</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};