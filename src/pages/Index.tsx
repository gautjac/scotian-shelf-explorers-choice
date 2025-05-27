
import { useState, useEffect } from 'react';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { ScenarioCard } from '../components/ScenarioCard';
import { ConsequenceModal } from '../components/ConsequenceModal';
import { CompletionScreen } from '../components/CompletionScreen';
import { SpeciesHealthBar } from '../components/SpeciesHealthBar';
import { LanguageSelector } from '../components/LanguageSelector';
import { useGameState } from '../hooks/useGameState';
import { scenarios } from '../data/content';
import { Choice } from '../types';

type GamePhase = 'welcome' | 'playing' | 'consequence' | 'completed';

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

  const handleStart = () => {
    setGamePhase('playing');
    trackActivity();
  };

  const handleChoiceSelect = (choiceId: string) => {
    const choice = currentScenario?.choices.find(c => c.id === choiceId);
    if (choice) {
      setSelectedChoice(choice);
      makeChoice(gameState.currentScenarioId, choiceId, choice.impact);
      setGamePhase('consequence');
    }
    trackActivity();
  };

  const handleContinue = () => {
    if (selectedChoice?.nextScenarioId) {
      advanceScenario(selectedChoice.nextScenarioId);
      setGamePhase('playing');
    } else {
      setGamePhase('completed');
    }
    setSelectedChoice(null);
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
        onStart={handleStart}
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
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 p-4">
        {/* Header with language selector and species health */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1">
              <SpeciesHealthBar 
                species={getCurrentSpecies()} 
                language={gameState.language}
              />
            </div>
            <LanguageSelector 
              currentLanguage={gameState.language}
              onLanguageChange={handleLanguageChange}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
            />
          </div>
        </div>

        {/* Main scenario */}
        <div className="max-w-6xl mx-auto">
          <ScenarioCard
            scenario={currentScenario}
            language={gameState.language}
            onChoiceSelect={handleChoiceSelect}
          />
        </div>

        {/* Reset button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleRestart}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors duration-200"
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
          onContinue={handleContinue}
          isVisible={true}
        />
      )}
    </>
  );
};

export default Index;
