import React from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { scenarios } from '../data/content';
import { getValidScenarioIds } from '../utils/cacheManager';

export const DeploymentDiagnostics: React.FC = () => {
  const scenarioCounts = {
    en: scenarios.en?.length || 0,
    fr: scenarios.fr?.length || 0,
    mi: scenarios.mi?.length || 0
  };
  
  const totalValidScenarios = getValidScenarioIds().length;
  const allLanguagesEqual = scenarioCounts.en === scenarioCounts.fr && scenarioCounts.fr === scenarioCounts.mi;
  
  const isCorrect = totalValidScenarios === 5 && allLanguagesEqual && scenarioCounts.en === 5;
  
  return (
    <Card className="fixed top-4 left-4 z-50 max-w-sm border-muted bg-card/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <span>🚀 Deployment Status</span>
          <Badge variant={isCorrect ? "default" : "destructive"}>
            {isCorrect ? "CORRECT" : "ERROR"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div className="space-y-1">
          <div className="font-medium">Scenario Counts:</div>
          <div className="grid grid-cols-3 gap-1">
            <Badge variant="outline">EN: {scenarioCounts.en}</Badge>
            <Badge variant="outline">FR: {scenarioCounts.fr}</Badge>
            <Badge variant="outline">MI: {scenarioCounts.mi}</Badge>
          </div>
          <div className="text-muted-foreground">
            Valid scenarios: {totalValidScenarios}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="font-medium">Build Info:</div>
          <div className="text-muted-foreground">
            Build: v5.0-DEPLOYMENT
          </div>
          <div className="text-muted-foreground">
            Time: {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        {!isCorrect && (
          <Alert className="p-2">
            <AlertDescription className="text-xs">
              ⚠️ Content mismatch detected! Expected 5 scenarios per language.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};