import React, { useMemo } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';
import { scenarios } from '../data/offlineContent';

// Generate a simple hash of the content for verification
const generateContentHash = (data: any): string => {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
};

export const ContentHashVerifier: React.FC = () => {
  const contentHash = useMemo(() => {
    // Hash the first scenario's content to verify it's the expected content
    const firstScenario = scenarios.en[0];
    return generateContentHash({
      title: firstScenario.title,
      description: firstScenario.description,
      choicesCount: firstScenario.choices.length
    });
  }, []);

  // Expected hash for "Trash Attack!" scenario with 3 choices
  const expectedHash = generateContentHash({
    title: "Trash Attack!",
    description: "Oh no! Plastic bags and bottles are washing up on Nova Scotia beaches. Sea turtles think plastic bags are jellyfish and try to eat them. Fish get tangled up in bottle rings. What should we do to help?",
    choicesCount: 3
  });

  const isValidContent = contentHash === expectedHash;
  const buildTimestamp = new Date().toISOString();

  return (
    <Alert className={`mb-4 ${isValidContent ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-red-500 bg-red-50 dark:bg-red-950/20'}`}>
      {isValidContent ? (
        <Shield className="h-4 w-4 text-green-600" />
      ) : (
        <AlertTriangle className="h-4 w-4 text-red-600" />
      )}
      <AlertDescription>
        <div className="flex flex-col space-y-1">
          <span className={`font-medium ${isValidContent ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
            Content Verification
          </span>
          <div className="text-xs space-y-1">
            <div>Build: v5.0-DEPLOYMENT</div>
            <div>Content Hash: {contentHash}</div>
            <div>Expected Hash: {expectedHash}</div>
            <div>Status: {isValidContent ? '✅ Valid' : '❌ Invalid - content may be cached'}</div>
            <div>Total Scenarios: {scenarios.en.length}</div>
            <div>Build Time: {buildTimestamp}</div>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};