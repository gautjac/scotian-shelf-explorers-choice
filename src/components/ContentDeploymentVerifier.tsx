import { useMemo } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { scenarios } from '@/data/content';
import { CheckCircle, AlertTriangle, Hash } from 'lucide-react';

export const ContentDeploymentVerifier = () => {
  const contentAnalysis = useMemo(() => {
    // Analyze deployed content
    const allScenarios = scenarios.en || [];
    const scenarioCount = allScenarios.length;
    const scenarioIds = allScenarios.map(s => s.id).sort();
    
    // Generate content hash for verification
    const contentString = JSON.stringify({
      count: scenarioCount,
      ids: scenarioIds,
      firstTitle: allScenarios[0]?.title || '',
      lastTitle: allScenarios[scenarioCount - 1]?.title || ''
    });
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < contentString.length; i++) {
      const char = contentString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    const contentHash = Math.abs(hash).toString(16);
    
    // Expected values for verification
    const expectedCount = 5;
    const isCountCorrect = scenarioCount === expectedCount;
    
    return {
      scenarioCount,
      scenarioIds,
      contentHash,
      isCountCorrect,
      expectedCount,
      deploymentStatus: isCountCorrect ? 'correct' : 'mismatch'
    };
  }, []);

  const { scenarioCount, scenarioIds, contentHash, isCountCorrect, expectedCount, deploymentStatus } = contentAnalysis;

  return (
    <Alert className={deploymentStatus === 'correct' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
      <div className="flex items-center gap-2">
        {deploymentStatus === 'correct' ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-red-600" />
        )}
        <Hash className="h-3 w-3" />
      </div>
      <AlertDescription>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold">
              {deploymentStatus === 'correct' ? 
                '✅ Content Deployment Verified' : 
                '❌ Content Deployment Mismatch'
              }
            </p>
            <Badge variant={deploymentStatus === 'correct' ? 'default' : 'destructive'}>
              {scenarioCount}/{expectedCount} scenarios
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-medium">Content Hash:</span> {contentHash}
            </div>
            <div>
              <span className="font-medium">Build Time:</span> {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          <div className="text-xs">
            <span className="font-medium">Scenarios:</span> {scenarioIds.join(', ')}
          </div>
          
          {!isCountCorrect && (
            <p className="text-sm text-red-700 font-medium">
              ⚠️ Expected {expectedCount} scenarios but found {scenarioCount}. 
              This indicates a deployment issue.
            </p>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};