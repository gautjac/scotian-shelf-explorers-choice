import React from 'react';
import { Badge } from './ui/badge';
import { getValidScenarioIds } from '../utils/cacheManager';

export const ContentVersionIndicator: React.FC = () => {
  const scenarioCount = getValidScenarioIds().length;
  
  return (
    <Badge variant="outline" className="fixed bottom-4 right-4 z-50 opacity-75">
      v3.0 ({scenarioCount} scenarios)
    </Badge>
  );
};