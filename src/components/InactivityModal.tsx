import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Language } from '../types';

interface InactivityModalProps {
  isVisible: boolean;
  language: Language['code'];
  onStillHere: () => void;
  onStartOver: () => void;
  onTimeout: () => void;
}

const inactivityTexts = {
  en: {
    title: 'Are you still there?',
    stillHere: "I'm still here",
    startOver: 'Start over'
  },
  fr: {
    title: 'Êtes-vous toujours là?',
    stillHere: 'Je suis toujours là',
    startOver: 'Recommencer'
  },
  mi: {
    title: 'Ula gisip eteg?',
    stillHere: 'Gisip eta',
    startOver: 'Ap-teluisn'
  }
};

export const InactivityModal = ({ 
  isVisible, 
  language, 
  onStillHere, 
  onStartOver, 
  onTimeout 
}: InactivityModalProps) => {
  const [countdown, setCountdown] = useState(10);
  const texts = inactivityTexts[language];

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
            {texts.title}
          </h2>
          
          <div className="text-sm text-muted-foreground">
            Auto-redirect in {countdown} seconds
          </div>
          
          <div className="flex flex-col gap-3 w-full">
            <Button 
              onClick={onStillHere}
              className="w-full h-12 text-lg bg-[#00AE9F] text-white active:bg-[#00AE9F]/80"
            >
              {texts.stillHere}
            </Button>
            
            <Button 
              onClick={onStartOver}
              variant="outline"
              className="w-full h-12 text-lg border-[#00AE9F] text-[#00AE9F] active:bg-[#00AE9F]/10"
            >
              {texts.startOver}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};