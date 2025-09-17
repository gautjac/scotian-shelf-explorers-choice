import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Wifi, WifiOff } from 'lucide-react';
import { Language } from '../types';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';

interface OfflineStatusProps {
  language?: Language['code'];
}

export const OfflineStatus = ({ language = 'en' }: OfflineStatusProps) => {
  const { getUIText } = useComprehensiveConfig();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);
    if (!navigator.onLine) {
      setShowOfflineMessage(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineMessage || isOnline) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Alert className="border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20">
        <WifiOff className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800 dark:text-orange-200">
          <strong>{getUIText('OfflineStatus', 'Offline_Mode', language) || 'Offline Mode'}</strong>
          <br />
          {getUIText('OfflineStatus', 'Offline_Message', language) || 'Game works offline. No internet connection needed.'}
        </AlertDescription>
      </Alert>
    </div>
  );
};

interface OnlineIndicatorProps {
  language?: Language['code'];
}

export const OnlineIndicator = ({ language = 'en' }: OnlineIndicatorProps) => {
  const { getUIText } = useComprehensiveConfig();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {isOnline ? (
        <Wifi className="h-4 w-4 text-green-500" />
      ) : (
        <WifiOff className="h-4 w-4 text-orange-500" />
      )}
      <span>{isOnline ? 
        (getUIText('OnlineIndicator', 'Online', language) || 'Online') : 
        (getUIText('OnlineIndicator', 'Offline', language) || 'Offline')
      }</span>
    </div>
  );
};