import { useEffect, useState } from 'react';
import { HealthMetrics, Language, Choice } from '../types';
import { HealthMeters } from './HealthMeters';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';
import geometricBackground from '../assets/geometric-background.png';

interface HealthTransitionScreenProps {
  currentHealthMetrics: HealthMetrics;
  previousHealthMetrics: HealthMetrics;  
  language: Language['code'];
  selectedChoice: Choice;
  onTransitionComplete: () => void;
}

export const HealthTransitionScreen = ({
  currentHealthMetrics,
  previousHealthMetrics,
  language,
  selectedChoice,
  onTransitionComplete
}: HealthTransitionScreenProps) => {
  const [showMeters, setShowMeters] = useState(false);
  const { getUIText, isLoading } = useComprehensiveConfig();

  useEffect(() => {
    // Show meters after a brief delay
    const showTimer = setTimeout(() => {
      setShowMeters(true);
    }, 500);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6 lg:p-8 animate-pulse"
        style={{
          backgroundImage: `url(${geometricBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="bg-slate-400/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 max-w-6xl mx-auto text-white shadow-2xl">
          <div className="text-center">
            <div className="h-12 bg-white/20 rounded mb-8" />
            <div className="h-6 bg-white/20 rounded mb-12" />
            <div className="h-40 bg-white/20 rounded mb-12" />
            <div className="h-12 bg-white/20 rounded-2xl w-48 mx-auto" />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 lg:p-8"
      style={{
        backgroundImage: `url(${geometricBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-gradient-to-br from-[#0B424E]/90 to-[#0C556B]/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 max-w-6xl mx-auto text-white shadow-2xl animate-fade-in">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            {getUIText('HealthTransitionScreen', 'Title', language) || 'Ocean Impact'}
          </h2>
          
          <p className="text-xl lg:text-2xl mb-12 text-blue-100">
            {getUIText('HealthTransitionScreen', 'Impact Text', language) || 'Your choice has changed the ocean health...'}
          </p>

          {showMeters && (
            <div className="mb-12 animate-fade-in">
              <HealthMeters 
                healthMetrics={currentHealthMetrics}
                language={language}
                showInitialAnimation={true}
              />
            </div>
          )}

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={onTransitionComplete}
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-colors duration-200 shadow-lg border border-white/30"
            >
              {getUIText('HealthTransitionScreen', 'Next Button', language) || 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
