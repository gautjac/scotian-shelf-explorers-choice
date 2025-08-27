import React, { useEffect, useState } from 'react';
import { detectInvalidCachedData, clearCacheAndReload } from '../utils/cacheManager';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const InvalidDataDetector: React.FC = () => {
  const [hasInvalidData, setHasInvalidData] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    const checkForInvalidData = async () => {
      try {
        const invalid = await detectInvalidCachedData();
        setHasInvalidData(invalid);
      } catch (error) {
        console.warn('Error checking for invalid data:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkForInvalidData();
  }, []);

  const handleClearData = async () => {
    setIsClearing(true);
    try {
      await clearCacheAndReload();
    } catch (error) {
      console.error('Error clearing cache:', error);
      setIsClearing(false);
    }
  };

  if (isChecking || !hasInvalidData) {
    return null;
  }

  return (
    <Alert className="border-destructive bg-destructive/10 mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          Outdated content detected. Your game shows scenarios that don't match the current version.
        </span>
        <Button
          onClick={handleClearData}
          size="sm"
          variant="destructive"
          disabled={isClearing}
        >
          {isClearing ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <AlertTriangle className="h-4 w-4 mr-2" />
          )}
          {isClearing ? 'Fixing...' : 'Fix Now'}
        </Button>
      </AlertDescription>
    </Alert>
  );
};