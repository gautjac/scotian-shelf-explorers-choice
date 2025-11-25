
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageSelectionScreen } from '../components/LanguageSelectionScreen';
import { InactivityModal } from '../components/InactivityModal';
import { ScenarioPreview } from '../components/ScenarioPreview';
import { ConsequenceModal } from '../components/ConsequenceModal';
import { CompletionScreen } from '../components/CompletionScreen';
import { GamePlayingScreen } from '../components/GamePlayingScreen';
import { HealthTransitionScreen } from '../components/HealthTransitionScreen';
import { ContentManagerButton } from '../components/ContentManagerButton';
import { FloatingLanguageHeader } from '../components/FloatingLanguageHeader';
import { useGameState } from '../hooks/useGameState';
import { useGamePhase } from '../hooks/useGamePhase';
import { scenarios } from '../data/content';

const Index = () => {
  const [showCurtain, setShowCurtain] = useState(false);
  
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
    isExiting,
    handleLanguageSelect,
    handleShowPreview,
    handleStart,
    handleBackToLanguageSelection,
    handleBackToPreview,
    handleScenarioSelect,
    handleChoiceSelect,
    handleConfirmChoice,
    handleHealthTransitionComplete,
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
    // Delay curtain until after button slide-down animation completes
    setTimeout(() => setShowCurtain(true), 1000);
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

  const handleHealthTransitionCompleteWithTracking = () => {
    handleHealthTransitionComplete(advanceScenario, gameState.currentScenarioIndex, 5);
    trackActivity();
  };

  // Hide curtain after new screen mounts
  useEffect(() => {
    if (gamePhase === 'playing' || gamePhase === 'preview') {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowCurtain(false);
        });
      });
    }
  }, [gamePhase]);

  return (
    <div className="min-h-screen bg-black">
      {/* Transition Curtain */}
      <AnimatePresence>
        {showCurtain && (
          <motion.div
            key="transition-curtain"
            className="fixed inset-0 z-[2147483200] bg-black pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {gamePhase === 'languageSelection' && (
          <LanguageSelectionScreen
            key="language-selection"
            onLanguageSelect={handleLanguageSelectWithTracking}
            isExiting={isExiting}
          />
        )}

        {gamePhase === 'preview' && (
          <ScenarioPreview
            key="preview"
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
            key="playing"
            gameState={gameState}
            currentScenario={currentScenario}
            onLanguageChange={handleLanguageChange}
            onChoiceSelect={handleChoiceSelectWithTracking}
            onBackToPreview={handleBackToPreviewWithTracking}
            onRestart={handleRestartWithTracking}
            onBackToLanguageSelection={handleBackToLanguageSelectionWithTracking}
          />
        )}

        {gamePhase === 'healthTransition' && selectedChoice && gameState.previousHealthMetrics && (
          <HealthTransitionScreen
            key="health-transition"
            currentHealthMetrics={gameState.healthMetrics}
            previousHealthMetrics={gameState.previousHealthMetrics}
            language={gameState.language}
            selectedChoice={selectedChoice}
            onTransitionComplete={handleHealthTransitionCompleteWithTracking}
          />
        )}

        {gamePhase === 'completed' && (
          <CompletionScreen
            key="completed"
            language={gameState.language}
            onLanguageChange={handleLanguageChange}
            onRestart={handleRestartWithTracking}
            choicesMade={gameState.choicesMade}
            healthMetrics={gameState.healthMetrics}
            onBackToLanguageSelection={handleBackToLanguageSelectionWithTracking}
          />
        )}
      </AnimatePresence>

      {gamePhase === 'consequence' && selectedChoice && (
        <>
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
          <FloatingLanguageHeader
            currentLanguage={gameState.language}
            onLanguageChange={handleLanguageChange}
            onBackToLanguageSelection={handleBackToLanguageSelectionWithTracking}
            variant="floating"
          />
        </>
      )}
      
      <ContentManagerButton />

      <InactivityModal
        isVisible={showInactivityModal}
        language={gameState.language}
        onStillHere={() => { handleInactivityStillHere(); trackActivity(); }}
        onStartOver={() => { handleInactivityStartOver(); trackActivity(); }}
        onTimeout={handleInactivityTimeout}
      />
    </div>
  );
};

export default Index;
