
import { useEffect, useState } from 'react';
import { LanguageSelectionScreen } from '../components/LanguageSelectionScreen';
import { InactivityModal } from '../components/InactivityModal';
import { ScenarioPreview } from '../components/ScenarioPreview';
import { ConsequenceModal } from '../components/ConsequenceModal';
import { CompletionScreen } from '../components/CompletionScreen';
import { GamePlayingScreen } from '../components/GamePlayingScreen';
import { ContentManagerButton } from '../components/ContentManagerButton';
import { OfflineConfigStatus } from '../components/OfflineConfigStatus';
import { useGameState } from '../hooks/useGameState';
import { useGamePhase } from '../hooks/useGamePhase';
import { scenarios } from '../data/content';

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
    showInactivityModal,
    handleLanguageSelect,
    handleShowPreview,
    handleStart,
    handleBackToLanguageSelection,
    handleBackToPreview,
    handleScenarioSelect,
    handleChoiceSelect,
    handleConfirmChoice,
    handleReturnToChoices,
    handleRestart,
    handleInactivityStillHere,
    handleInactivityStartOver,
    handleInactivityTimeout
  } = useGamePhase(lastActivity, resetGame);



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

  const handleLanguageSelectWithTracking = (language: 'en' | 'fr' | 'mi') => {
    updateLanguage(language);
    handleLanguageSelect();
    trackActivity();
  };

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


  const handleBackToLanguageSelectionWithTracking = () => {
    handleBackToLanguageSelection();
    trackActivity();
  };

  const handleShowPreviewWithTracking = () => {
    handleShowPreview();
    trackActivity();
  };

  return (
    <>
      {gamePhase === 'languageSelection' && (
        <LanguageSelectionScreen
          onLanguageSelect={handleLanguageSelectWithTracking}
        />
      )}


      {gamePhase === 'preview' && (
        <ScenarioPreview
          scenarios={currentScenarios}
          language={gameState.language}
          onStart={handleStartWithTracking}
          onBack={handleBackToLanguageSelectionWithTracking}
          onScenarioSelect={handleScenarioSelectWithTracking}
          onLanguageChange={handleLanguageChange}
          onBackToLanguageSelection={handleBackToLanguageSelectionWithTracking}
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
          onBackToLanguageSelection={handleBackToLanguageSelectionWithTracking}
        />
      )}

      {gamePhase === 'completed' && (
        <CompletionScreen
          language={gameState.language}
          onLanguageChange={handleLanguageChange}
          onRestart={handleRestartWithTracking}
          choicesMade={gameState.choicesMade}
          healthMetrics={gameState.healthMetrics}
          onBackToLanguageSelection={handleBackToLanguageSelectionWithTracking}
        />
      )}

      {gamePhase === 'consequence' && selectedChoice && (
        <div className="fixed inset-0 z-50 animate-scale-modal-in">
          <ConsequenceModal
            choice={selectedChoice}
            language={gameState.language}
            scenarioId={gameState.currentScenarioId}
            onConfirm={handleConfirmChoiceWithTracking}
            onReturn={handleReturnToChoicesWithTracking}
            isVisible={true}
          />
        </div>
      )}
      
      <ContentManagerButton />
      
      <div className="fixed bottom-4 right-4 z-40">
        <OfflineConfigStatus />
      </div>

      <InactivityModal
        isVisible={showInactivityModal}
        language={gameState.language}
        onStillHere={() => { handleInactivityStillHere(); trackActivity(); }}
        onStartOver={() => { handleInactivityStartOver(); trackActivity(); }}
        onTimeout={handleInactivityTimeout}
      />
    </>
  );
};

export default Index;
