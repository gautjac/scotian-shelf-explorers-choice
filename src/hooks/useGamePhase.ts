
import { useState, useEffect, useCallback } from 'react';
import { Choice, GamePhase } from '../types';
import { getChoiceImpact } from '../utils/impactConfiguration';

export const useGamePhase = (lastActivity: number, resetGame: () => void) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('languageSelection');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showInactivityModal, setShowInactivityModal] = useState(false);

  // Inactivity detection - show modal after 60 seconds, auto-redirect after 10 more seconds
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      
      // Don't show modal on language selection screen
      if (gamePhase === 'languageSelection') {
        setShowInactivityModal(false);
        return;
      }
      
      // Show modal after 60 seconds of inactivity
      if (timeSinceLastActivity > 60000 && !showInactivityModal) {
        setShowInactivityModal(true);
      }
    }, 1000); // Check every second for responsiveness

    return () => clearInterval(checkInactivity);
  }, [lastActivity, gamePhase, showInactivityModal]);

  const handleLanguageSelect = useCallback(() => {
    setGamePhase('playing');
  }, []); // Go directly to playing, skip preview

  const handleShowPreview = useCallback(() => {
    setGamePhase('preview');
  }, []);

  const handleStart = useCallback(() => {
    setGamePhase('playing');
  }, []);


  const handleBackToLanguageSelection = useCallback(() => {
    setGamePhase('languageSelection');
  }, []);

  const handleBackToPreview = useCallback(() => {
    setGamePhase('preview');
  }, []);

  const handleScenarioSelect = useCallback((scenarioId: string, advanceScenario: (scenarioId: string) => void) => {
    advanceScenario(scenarioId);
    setGamePhase('playing');
  }, []);

  const handleChoiceSelect = useCallback((choiceId: string, currentScenario: any) => {
    const choice = currentScenario?.choices.find((c: Choice) => c.id === choiceId);
    if (choice) {
      setSelectedChoice(choice);
      setGamePhase('consequence');
    }
  }, []);

  const handleConfirmChoice = useCallback((
    makeChoice: (scenarioId: string, choiceId: string, impact: 'positive' | 'negative' | 'neutral', granularImpacts?: { ecosystem: number; economic: number; community: number }) => void,
    advanceScenario: (scenarioId?: string) => void,
    currentScenarioId: string
  ) => {
    if (selectedChoice) {
      const granularImpacts = getChoiceImpact(currentScenarioId, selectedChoice);
      makeChoice(currentScenarioId, selectedChoice.id, selectedChoice.impact, granularImpacts);
      setGamePhase('healthTransition');
    }
  }, [selectedChoice]);

  const handleHealthTransitionComplete = useCallback((
    advanceScenario: (scenarioId?: string) => void,
    currentScenarioIndex: number,
    totalScenarios: number
  ) => {
    // Check if we've completed all scenarios (0-indexed, so compare with totalScenarios - 1)
    if (currentScenarioIndex >= totalScenarios - 1) {
      setGamePhase('completed');
    } else {
      // Advance to next scenario in the sequence
      advanceScenario();
      setGamePhase('playing');
    }
    setSelectedChoice(null);
  }, []);

  const handleReturnToChoices = useCallback(() => {
    setSelectedChoice(null);
    setGamePhase('playing');
  }, []);

  const handleRestart = useCallback(() => {
    setGamePhase('languageSelection');
    setShowInactivityModal(false);
    resetGame();
  }, [resetGame]);

  const handleInactivityStillHere = useCallback(() => {
    setShowInactivityModal(false);
  }, []);

  const handleInactivityStartOver = useCallback(() => {
    setShowInactivityModal(false);
    setGamePhase('languageSelection');
    resetGame();
  }, [resetGame]);

  const handleInactivityTimeout = useCallback(() => {
    setShowInactivityModal(false);
    setGamePhase('languageSelection');
    resetGame();
  }, [resetGame]);

  return {
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
    handleHealthTransitionComplete,
    handleReturnToChoices,
    handleRestart,
    handleInactivityStillHere,
    handleInactivityStartOver,
    handleInactivityTimeout
  };
};
