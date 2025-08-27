import React, { useState } from 'react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Bug, ChevronDown, ChevronRight } from 'lucide-react';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';
import { scenarios } from '../data/offlineContent';

export const RuntimeConfigDebugger: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { config, getScenarioText, getChoiceText } = useComprehensiveConfig();

  const testScenario = 'plastic-pollution';
  const testChoice = 'ban-plastics';
  const testLanguage = 'en';

  const staticText = scenarios[testLanguage]?.find(s => s.id === testScenario)?.title;
  const runtimeText = getScenarioText(testScenario, 'title', testLanguage);
  const staticChoiceText = scenarios[testLanguage]?.find(s => s.id === testScenario)?.choices.find(c => c.id === testChoice)?.text;
  const runtimeChoiceText = getChoiceText(testScenario, testChoice, 'text', testLanguage);

  const isUsingCachedConfig = !!config;
  const hasTextMismatch = staticText !== runtimeText || staticChoiceText !== runtimeChoiceText;

  if (!isExpanded) {
    return (
      <Alert className={`border-2 mb-4 ${hasTextMismatch ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'}`}>
        <Bug className={`h-4 w-4 ${hasTextMismatch ? 'text-red-600' : 'text-blue-600'}`} />
        <AlertDescription className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`font-medium ${hasTextMismatch ? 'text-red-800 dark:text-red-200' : 'text-blue-800 dark:text-blue-200'}`}>
              Content Source Debug
            </span>
            <span className={`text-sm ${hasTextMismatch ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'}`}>
              {isUsingCachedConfig ? '⚠️ Using cached configuration' : '✅ Using static content'}
              {hasTextMismatch && ' - Content mismatch detected!'}
            </span>
          </div>
          <Button
            onClick={() => setIsExpanded(true)}
            size="sm"
            variant="outline"
            className="ml-4"
          >
            <ChevronRight className="h-4 w-4 mr-2" />
            Details
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20 mb-4">
      <Bug className="h-4 w-4 text-blue-600" />
      <AlertDescription>
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium text-blue-800 dark:text-blue-200">
            Runtime Configuration Debug Panel
          </span>
          <Button
            onClick={() => setIsExpanded(false)}
            size="sm"
            variant="outline"
          >
            <ChevronDown className="h-4 w-4 mr-2" />
            Collapse
          </Button>
        </div>
        
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Configuration Status</h4>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                <div>Config loaded: {isUsingCachedConfig ? '⚠️ YES (cached)' : '✅ NO (static)'}</div>
                <div>Config type: {typeof config}</div>
                <div>Has scenarios: {config?.scenarios ? '✅' : '❌'}</div>
                <div>Languages in config: {config?.scenarios ? Object.keys(config.scenarios).join(', ') : 'none'}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Content Comparison</h4>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                <div className="mb-2">
                  <strong>Scenario Title:</strong>
                  <div className="ml-2">
                    <div>Static: "{staticText}"</div>
                    <div className={staticText !== runtimeText ? 'text-red-600 font-bold' : 'text-green-600'}>
                      Runtime: "{runtimeText}"
                    </div>
                  </div>
                </div>
                
                <div>
                  <strong>Choice Text:</strong>
                  <div className="ml-2">
                    <div>Static: "{staticChoiceText}"</div>
                    <div className={staticChoiceText !== runtimeChoiceText ? 'text-red-600 font-bold' : 'text-green-600'}>
                      Runtime: "{runtimeChoiceText}"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {hasTextMismatch && (
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded border border-red-300">
              <strong className="text-red-800 dark:text-red-200">⚠️ Content Mismatch Detected!</strong>
              <p className="text-red-700 dark:text-red-300 mt-1">
                The runtime content differs from static content, indicating cached configuration is overriding the expected text. 
                Use the Nuclear Clear button to resolve this.
              </p>
            </div>
          )}
          
          <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 p-2 rounded">
            <strong>Debug tip:</strong> Check browser console for [SCENARIO-DEBUG] and [CHOICE-DEBUG] logs to see detailed source information.
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};