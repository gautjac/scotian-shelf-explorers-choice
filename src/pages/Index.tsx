import { useState, useEffect } from 'react';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { ScenarioPreview } from '../components/ScenarioPreview';
import { ScenarioCard } from '../components/ScenarioCard';
import { ConsequenceModal } from '../components/ConsequenceModal';
import { CompletionScreen } from '../components/CompletionScreen';
import { HealthMeters } from '../components/HealthMeters';
import { LanguageSelector } from '../components/LanguageSelector';
import { useGameState } from '../hooks/useGameState';
import { scenarios } from '../data/content';
import { Choice } from '../types';

type GamePhase = 'welcome' | 'preview' | 'playing' | 'consequence' | 'completed';

const Index = () => {
  const {
    gameState,
    updateLanguage,
    makeChoice,
    advanceScenario,
    resetGame,
    getCurrentSpecies,
    trackActivity,
    lastActivity
  } = useGameState();

  const [gamePhase, setGamePhase] = useState<GamePhase>('welcome');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  // Auto-reset after 3 minutes of inactivity (kiosk mode)
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      if (timeSinceLastActivity > 180000 && gamePhase !== 'welcome') { // 3 minutes
        console.log('Auto-reset due to inactivity');
        setGamePhase('welcome');
        resetGame();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInactivity);
  }, [lastActivity, gamePhase, resetGame]);

  // Track user activity
  useEffect(() => {
    const handleActivity = () => trackActivity();
    
    window.addEventListener('click', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    
    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [trackActivity]);

  const currentScenarios = scenarios[gameState.language];
  const currentScenario = currentScenarios?.find(s => s.id === gameState.currentScenarioId);

  const handleShowPreview = () => {
    setGamePhase('preview');
    trackActivity();
  };

  const handleStart = () => {
    setGamePhase('playing');
    trackActivity();
  };

  const handleBackToWelcome = () => {
    setGamePhase('welcome');
    trackActivity();
  };

  const handleBackToPreview = () => {
    setGamePhase('preview');
    trackActivity();
  };

  const handleScenarioSelect = (scenarioId: string) => {
    advanceScenario(scenarioId);
    setGamePhase('playing');
    trackActivity();
  };

  const handleChoiceSelect = (choiceId: string) => {
    const choice = currentScenario?.choices.find(c => c.id === choiceId);
    if (choice) {
      setSelectedChoice(choice);
      setGamePhase('consequence');
    }
    trackActivity();
  };

  const handleConfirmChoice = () => {
    if (selectedChoice) {
      makeChoice(gameState.currentScenarioId, selectedChoice.id, selectedChoice.impact);
      if (selectedChoice.nextScenarioId) {
        advanceScenario(selectedChoice.nextScenarioId);
        setGamePhase('playing');
      } else {
        setGamePhase('completed');
      }
      setSelectedChoice(null);
    }
    trackActivity();
  };

  const handleReturnToChoices = () => {
    setSelectedChoice(null);
    setGamePhase('playing');
    trackActivity();
  };

  const handleRestart = () => {
    setGamePhase('welcome');
    resetGame();
    trackActivity();
  };

  const handleLanguageChange = (language: 'en' | 'fr' | 'mi') => {
    updateLanguage(language);
    trackActivity();
  };

  if (gamePhase === 'welcome') {
    return (
      <WelcomeScreen
        currentLanguage={gameState.language}
        onLanguageChange={handleLanguageChange}
        onStart={handleShowPreview}
      />
    );
  }

  if (gamePhase === 'preview') {
    return (
      <ScenarioPreview
        scenarios={currentScenarios}
        language={gameState.language}
        onStart={handleStart}
        onBack={handleBackToWelcome}
        onScenarioSelect={handleScenarioSelect}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  if (gamePhase === 'completed') {
    return (
      <CompletionScreen
        language={gameState.language}
        onLanguageChange={handleLanguageChange}
        onRestart={handleRestart}
        choicesMade={gameState.choicesMade}
      />
    );
  }

  if (gamePhase === 'playing' && currentScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0072A0] via-[#0C556B] to-[#0B424E] p-6 lg:p-8">
        {/* Header with language selector and health meters - optimized spacing */}
        <div className="max-w-7xl mx-auto mb-10 lg:mb-12">
          <div className="flex flex-col xl:flex-row gap-8 items-start">
            <div className="flex-1">
              <HealthMeters 
                healthMetrics={gameState.healthMetrics} 
                language={gameState.language}
              />
            </div>
            <LanguageSelector 
              currentLanguage={gameState.language}
              onLanguageChange={handleLanguageChange}
              className="bg-[#0B424E]/30 backdrop-blur-sm rounded-2xl p-6"
            />
          </div>
        </div>

        {/* Main scenario */}
        <div className="max-w-7xl mx-auto mb-12">
          <ScenarioCard
            scenario={currentScenario}
            language={gameState.language}
            onChoiceSelect={handleChoiceSelect}
          />
        </div>

        {/* Action buttons - moved under choices and centered */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleBackToPreview}
              className="bg-[#0B424E]/30 backdrop-blur-sm text-white px-8 py-6 lg:px-10 lg:py-8 rounded-2xl font-medium text-lg lg:text-xl hover:bg-[#0B424E]/40 active:bg-[#0B424E]/50 transition-colors duration-200 min-h-[70px] lg:min-h-[80px] shadow-lg min-w-[200px] lg:min-w-[250px]"
            >
              {gameState.language === 'en' && 'Return to Scenarios'}
              {gameState.language === 'fr' && 'Retour aux scénarios'}
              {gameState.language === 'mi' && 'Kluskap koqoey'}
            </button>
            <button
              onClick={handleRestart}
              className="bg-[#0B424E]/30 backdrop-blur-sm text-white px-8 py-6 lg:px-10 lg:py-8 rounded-2xl font-medium text-lg lg:text-xl hover:bg-[#0B424E]/40 active:bg-[#0B424E]/50 transition-colors duration-200 min-h-[70px] lg:min-h-[80px] shadow-lg min-w-[200px] lg:min-w-[250px]"
            >
              {gameState.language === 'en' && 'Start Over'}
              {gameState.language === 'fr' && 'Recommencer'}
              {gameState.language === 'mi' && 'Pilei mawita\'sin'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {gamePhase === 'consequence' && selectedChoice && (
        <ConsequenceModal
          choice={selectedChoice}
          language={gameState.language}
          onConfirm={handleConfirmChoice}
          onReturn={handleReturnToChoices}
          isVisible={true}
        />
      )}
    </>
  );
};

export default Index;
