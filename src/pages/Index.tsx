
import { useState, useEffect } from 'react';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { ScenarioPreview } from '../components/ScenarioPreview';
import { ScenarioCard } from '../components/ScenarioCard';
import { ConsequenceModal } from '../components/ConsequenceModal';
import { CompletionScreen } from '../components/CompletionScreen';
import { SpeciesHealthBar } from '../components/SpeciesHealthBar';
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
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 p-6 lg:p-8">
        {/* Header with language selector and species health - optimized spacing */}
        <div className="max-w-7xl mx-auto mb-10 lg:mb-12">
          <div className="flex flex-col xl:flex-row gap-8 items-start">
            <div className="flex-1">
              <SpeciesHealthBar 
                species={getCurrentSpecies()} 
                language={gameState.language}
              />
            </div>
            <LanguageSelector 
              currentLanguage={gameState.language}
              onLanguageChange={handleLanguageChange}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6"
            />
          </div>
        </div>

        {/* Main scenario */}
        <div className="max-w-7xl mx-auto">
          <ScenarioCard
            scenario={currentScenario}
            language={gameState.language}
            onChoiceSelect={handleChoiceSelect}
          />
        </div>

        {/* Action buttons - larger for touch */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4">
          <button
            onClick={handleBackToPreview}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 lg:px-8 lg:py-6 rounded-2xl font-medium text-base lg:text-lg hover:bg-white/30 active:bg-white/40 transition-colors duration-200 min-h-[60px] lg:min-h-[70px] shadow-lg"
          >
            {gameState.language === 'en' && 'Return to Scenarios'}
            {gameState.language === 'fr' && 'Retour aux scénarios'}
            {gameState.language === 'mi' && 'Kluskap koqoey'}
          </button>
          <button
            onClick={handleRestart}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 lg:px-8 lg:py-6 rounded-2xl font-medium text-base lg:text-lg hover:bg-white/30 active:bg-white/40 transition-colors duration-200 min-h-[60px] lg:min-h-[70px] shadow-lg"
          >
            {gameState.language === 'en' && 'Start Over'}
            {gameState.language === 'fr' && 'Recommencer'}
            {gameState.language === 'mi' && 'Pilei mawita\'sin'}
          </button>
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
