import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Language } from '../types';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';

interface InactivityModalProps {
  isVisible: boolean;
  language: Language['code'];
  onStillHere: () => void;
  onStartOver: () => void;
  onTimeout: () => void;
}

export const InactivityModal = ({ 
  isVisible, 
  language, 
  onStillHere, 
  onStartOver, 
  onTimeout 
}: InactivityModalProps) => {
  const [countdown, setCountdown] = useState(10);
  const { getUIText } = useComprehensiveConfig();

  useEffect(() => {
    if (!isVisible) {
      setCountdown(10);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  useEffect(() => {
    if (countdown <= 0 && isVisible) {
      onTimeout();
    }
  }, [countdown, isVisible, onTimeout]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scale-in">
        <div className="flex flex-col items-center text-center gap-6">
          <Clock size={64} className="text-primary" />
          
          <h2 className="text-2xl font-bold text-foreground">
            {getUIText('InactivityModal', 'Title', language)}
          </h2>
          
          <div className="text-sm text-muted-foreground">
            {getUIText('InactivityModal', 'Auto Redirect', language)?.replace('{countdown}', countdown.toString())}
          </div>
          
          <div className="flex flex-col gap-3 w-full">
            <Button 
              onClick={onStillHere}
              className="w-full h-12 text-lg bg-[#00AE9F] text-white active:bg-[#00AE9F]/80"
            >
              {getUIText('InactivityModal', 'Still Here Button', language)}
            </Button>
            
            <Button 
              onClick={onStartOver}
              variant="outline"
              className="w-full h-12 text-lg border-[#00AE9F] text-[#00AE9F] active:bg-[#00AE9F]/10"
            >
              {getUIText('InactivityModal', 'Start Over Button', language)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};