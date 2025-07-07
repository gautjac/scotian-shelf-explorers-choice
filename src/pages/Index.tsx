
import { useEffect, useState } from 'react';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { ScenarioPreview } from '../components/ScenarioPreview';
import { ConsequenceModal } from '../components/ConsequenceModal';
import { CompletionScreen } from '../components/CompletionScreen';
import { GamePlayingScreen } from '../components/GamePlayingScreen';
import { AdminPanel } from '../components/AdminPanel';
import { useGameState } from '../hooks/useGameState';
import { useGamePhase } from '../hooks/useGamePhase';
import { scenarios } from '../data/content';

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  
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


  // Check for admin parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setShowAdmin(urlParams.get('admin') === 'true');
  }, []);

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
    handleConfirmChoice(makeChoice, advanceScenario, gameState.currentScenarioId);
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

  return (
    <>
      {gamePhase === 'welcome' && (
        <WelcomeScreen
          currentLanguage={gameState.language}
          onLanguageChange={handleLanguageChange}
          onStart={handleShowPreviewWithTracking}
        />
      )}

      {gamePhase === 'preview' && (
        <ScenarioPreview
          scenarios={currentScenarios}
          language={gameState.language}
          onStart={handleStartWithTracking}
          onBack={handleBackToWelcomeWithTracking}
          onScenarioSelect={handleScenarioSelectWithTracking}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {gamePhase === 'playing' && currentScenario && (
        <GamePlayingScreen
          gameState={gameState}
          currentScenario={currentScenario}
          onLanguageChange={handleLanguageChange}
          onChoiceSelect={handleChoiceSelectWithTracking}
          onBackToPreview={handleBackToPreviewWithTracking}
          onRestart={handleRestartWithTracking}
        />
      )}

      {gamePhase === 'completed' && (
        <CompletionScreen
          language={gameState.language}
          onLanguageChange={handleLanguageChange}
          onRestart={handleRestartWithTracking}
          choicesMade={gameState.choicesMade}
          healthMetrics={gameState.healthMetrics}
        />
      )}

      {gamePhase === 'consequence' && selectedChoice && (
        <div className="fixed inset-0 z-50 animate-scale-modal-in">
          <ConsequenceModal
            choice={selectedChoice}
            language={gameState.language}
            onConfirm={handleConfirmChoiceWithTracking}
            onReturn={handleReturnToChoicesWithTracking}
            isVisible={true}
          />
        </div>
      )}
      
      {showAdmin && (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      )}
    </>
  );
};

export default Index;
