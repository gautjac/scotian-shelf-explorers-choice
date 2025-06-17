import { useEffect } from 'react';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { ScenarioPreview } from '../components/ScenarioPreview';
import { ConsequenceModal } from '../components/ConsequenceModal';
import { CompletionScreen } from '../components/CompletionScreen';
import { GamePlayingScreen } from '../components/GamePlayingScreen';
import { useGameState } from '../hooks/useGameState';
import { useGamePhase } from '../hooks/useGamePhase';
import { useDynamicScenarios } from '../hooks/useDynamicScenarios';

const Index = () => {
  const {
    gameState,
    updateLanguage,
    makeChoice,
    advanceScenario,
    resetGame,
    trackActivity,
    lastActivity
  } = useGameState();

  const {
    gamePhase,
    selectedChoice,
    handleShowPreview,
    handleStart,
    handleBackToWelcome,
    handleBackToPreview,
    handleScenarioSelect,
    handleChoiceSelect,
    handleConfirmChoice,
    handleReturnToChoices,
    handleRestart
  } = useGamePhase(lastActivity, resetGame);

  // Get dynamic scenarios based on current game state
  const currentScenarios = useDynamicScenarios(gameState);
  const currentScenario = currentScenarios?.find(s => s.id === gameState.currentScenarioId);

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

  const handleLanguageChange = (language: 'en' | 'fr' | 'mi') => {
    updateLanguage(language);
    trackActivity();
  };

  const handleScenarioSelectWithTracking = (scenarioId: string) => {
    handleScenarioSelect(scenarioId, advanceScenario);
    trackActivity();
  };

  const handleChoiceSelectWithTracking = (choiceId: string) => {
    handleChoiceSelect(choiceId, currentScenario);
    trackActivity();
  };

  const handleConfirmChoiceWithTracking = () => {
    // Pass the choice category to makeChoice
    const choiceCategory = selectedChoice?.category || 'environmental';
    const makeChoiceWithCategory = (scenarioId: string, choiceId: string, impact: 'positive' | 'negative' | 'neutral') => {
      makeChoice(scenarioId, choiceId, impact, choiceCategory);
    };
    
    handleConfirmChoice(makeChoiceWithCategory, advanceScenario, gameState.currentScenarioId);
    trackActivity();
  };

  const handleReturnToChoicesWithTracking = () => {
    handleReturnToChoices();
    trackActivity();
  };

  const handleRestartWithTracking = () => {
    handleRestart();
    trackActivity();
  };

  const handleBackToPreviewWithTracking = () => {
    handleBackToPreview();
    trackActivity();
  };

  const handleStartWithTracking = () => {
    handleStart();
    trackActivity();
  };

  const handleBackToWelcomeWithTracking = () => {
    handleBackToWelcome();
    trackActivity();
  };

  const handleShowPreviewWithTracking = () => {
    handleShowPreview();
    trackActivity();
  };

  if (gamePhase === 'welcome') {
    return (
      <WelcomeScreen
        currentLanguage={gameState.language}
        onLanguageChange={handleLanguageChange}
        onStart={handleShowPreviewWithTracking}
      />
    );
  }

  if (gamePhase === 'preview') {
    return (
      <ScenarioPreview
        scenarios={currentScenarios}
        language={gameState.language}
        onStart={handleStartWithTracking}
        onBack={handleBackToWelcomeWithTracking}
        onScenarioSelect={handleScenarioSelectWithTracking}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  if (gamePhase === 'completed') {
    return (
      <CompletionScreen
        language={gameState.language}
        onLanguageChange={handleLanguageChange}
        onRestart={handleRestartWithTracking}
        choicesMade={gameState.choicesMade}
      />
    );
  }

  if (gamePhase === 'playing' && currentScenario) {
    return (
      <GamePlayingScreen
        gameState={gameState}
        currentScenario={currentScenario}
        onLanguageChange={handleLanguageChange}
        onChoiceSelect={handleChoiceSelectWithTracking}
        onBackToPreview={handleBackToPreviewWithTracking}
        onRestart={handleRestartWithTracking}
      />
    );
  }

  return (
    <>
      {gamePhase === 'consequence' && selectedChoice && (
        <ConsequenceModal
          choice={selectedChoice}
          language={gameState.language}
          onConfirm={handleConfirmChoiceWithTracking}
          onReturn={handleReturnToChoicesWithTracking}
          isVisible={true}
        />
      )}
    </>
  );
};

export default Index;
