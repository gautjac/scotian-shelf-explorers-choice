import { useEffect, useState } from 'react';
import { HealthMetrics, Language, Choice } from '../types';
import { HealthMeters } from './HealthMeters';
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

  useEffect(() => {
    // Show meters after a brief delay
    const showTimer = setTimeout(() => {
      setShowMeters(true);
    }, 500);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  const titleText = {
    en: 'Ocean Impact',
    fr: 'Impact sur l\'océan',
    mi: 'Kepkek ta\'n telitaqsit'
  };

  const impactText = {
    en: 'Your choice has changed the ocean health...',
    fr: 'Votre choix a changé la santé de l\'océan...',
    mi: 'Kil koqoey kesalul kepkek wula\'tioqn...'
  };

  const nextText = {
    en: selectedChoice.nextScenarioId ? 'Next scenario' : 'Final results',
    fr: selectedChoice.nextScenarioId ? 'Prochain scénario' : 'Résultats finaux',
    mi: selectedChoice.nextScenarioId ? 'Aq tett' : 'Klu\'su\'n'
  };

  const skipText = {
    en: 'Next',
    fr: 'Suivant',
    mi: 'Aqq'
  };

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
            {titleText[language]}
          </h2>
          
          <p className="text-xl lg:text-2xl mb-12 text-blue-100">
            {impactText[language]}
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
            <p className="text-lg text-blue-200">
              {nextText[language]}
            </p>
            
            <button
              onClick={onTransitionComplete}
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-colors duration-200 shadow-lg border border-white/30"
            >
              {skipText[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
