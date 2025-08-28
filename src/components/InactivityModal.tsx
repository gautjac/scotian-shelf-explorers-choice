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

export const InactivityModal = ({ 
  isVisible, 
  language, 
  onStillHere, 
  onStartOver, 
  onTimeout 
}: InactivityModalProps) => {
  const [countdown, setCountdown] = useState(10);

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
            {language === 'en' ? 'Are you still there?' :
             language === 'fr' ? 'Êtes-vous toujours là?' :
             'Neke\'k tett?'}
          </h2>
          
          <div className="text-sm text-muted-foreground">
            {language === 'en' ? `Returning to start in ${countdown} seconds...` :
             language === 'fr' ? `Retour au début dans ${countdown} secondes...` :
             `Apoqnmuei mawita\'k ${countdown} tipiskak...`}
          </div>
          
          <div className="flex flex-col gap-3 w-full">
            <Button 
              onClick={onStillHere}
              className="w-full h-12 text-lg bg-[#00AE9F] text-white active:bg-[#00AE9F]/80"
            >
              {language === 'en' ? "I'm still here!" :
               language === 'fr' ? 'Je suis encore là!' :
               'Neke\'k tett!'}
            </Button>
            
            <Button 
              onClick={onStartOver}
              variant="outline"
              className="w-full h-12 text-lg border-[#00AE9F] text-[#00AE9F] active:bg-[#00AE9F]/10"
            >
              {language === 'en' ? 'Start Over' :
               language === 'fr' ? 'Recommencer' :
               'Ap mawita\'n'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};