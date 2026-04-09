
import { useEffect, useState, useRef } from 'react';
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
import { logPhase, logActivity, logSession } from '../utils/activityLogger';

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

  // Log phase transitions for troubleshooting
  const prevPhaseRef = useRef(gamePhase);
  useEffect(() => {
    if (prevPhaseRef.current !== gamePhase) {
      logPhase(gamePhase, {
        from: prevPhaseRef.current,
        language: gameState.language,
        scenario: gameState.currentScenarioId,
        curtain: showCurtain,
      });
      prevPhaseRef.current = gamePhase;
    }
  }, [gamePhase, gameState.language, gameState.currentScenarioId, showCurtain]);

  // Log session start
  useEffect(() => { logSession('start'); }, []);

  const currentScenarios = scenarios[gameState.language];
  const currentScenario = currentScenarios?.find(s => s.id === gameState.currentScenarioId);

  const handleLanguageSelectWithTracking = (language: 'en' | 'fr' | 'mi') => {
    logActivity('language-select', { language });
    updateLanguage(language);
    handleLanguageSelect();
    trackActivity();
    setTimeout(() => setShowCurtain(true), 1000);
  };

  const handleLanguageChange = (language: 'en' | 'fr' | 'mi') => {
    logActivity('language-change', { language });
    updateLanguage(language);
    trackActivity();
  };

  const handleScenarioSelectWithTracking = (scenarioId: string) => {
    logActivity('scenario-select', { scenarioId });
    handleScenarioSelect(scenarioId, advanceScenario);
    trackActivity();
  };

  const handleChoiceSelectWithTracking = (choiceId: string) => {
    logActivity('choice-select', { choiceId, scenario: gameState.currentScenarioId });
    handleChoiceSelect(choiceId, currentScenario);
    trackActivity();
  };

  const handleConfirmChoiceWithTracking = () => {
    logActivity('choice-confirm', { scenario: gameState.currentScenarioId });
    handleConfirmChoice(makeChoice, advanceScenario, gameState.currentScenarioId);
    trackActivity();
  };

  const handleReturnToChoicesWithTracking = () => {
    logActivity('return-to-choices');
    handleReturnToChoices();
    trackActivity();
  };

  const handleRestartWithTracking = () => {
    logActivity('restart');
    logSession('reset');
    handleRestart();
    trackActivity();
  };

  const handleBackToPreviewWithTracking = () => {
    logActivity('back-to-preview');
    handleBackToPreview();
    trackActivity();
  };

  const handleStartWithTracking = () => {
    logActivity('start-game');
    handleStart();
    trackActivity();
  };

  const handleBackToLanguageSelectionWithTracking = () => {
    logActivity('back-to-language-selection');
    handleBackToLanguageSelection();
    trackActivity();
  };

  const handleHealthTransitionCompleteWithTracking = () => {
    logActivity('health-transition-complete', { scenarioIndex: gameState.currentScenarioIndex });
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
          <>
            <HealthTransitionScreen
              key="health-transition"
              currentHealthMetrics={gameState.healthMetrics}
              previousHealthMetrics={gameState.previousHealthMetrics}
              language={gameState.language}
              selectedChoice={selectedChoice}
              onTransitionComplete={handleHealthTransitionCompleteWithTracking}
            />
            <FloatingLanguageHeader
              currentLanguage={gameState.language}
              onLanguageChange={handleLanguageChange}
              onBackToLanguageSelection={handleBackToLanguageSelectionWithTracking}
              variant="floating"
            />
          </>
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
        onStillHere={() => { logActivity('inactivity-still-here'); handleInactivityStillHere(); trackActivity(); }}
        onStartOver={() => { logActivity('inactivity-start-over'); logSession('reset'); handleInactivityStartOver(); trackActivity(); }}
        onTimeout={() => { logActivity('inactivity-timeout'); logSession('reset'); handleInactivityTimeout(); }}
      />
    </div>
  );
};

export default Index;
