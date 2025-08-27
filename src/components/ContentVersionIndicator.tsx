import React from 'react';
import { Badge } from './ui/badge';
import { getValidScenarioIds } from '../utils/cacheManager';

export const ContentVersionIndicator: React.FC = () => {
  const scenarioCount = getValidScenarioIds().length;
  const isCorrect = scenarioCount === 5;
  
  return (
    <Badge 
      variant={isCorrect ? "default" : "destructive"} 
      className="fixed bottom-4 right-4 z-50 opacity-90 bg-card/95 backdrop-blur-sm"
    >
      v5.0-DEPLOYMENT ({scenarioCount}/5)
    </Badge>
  );
};