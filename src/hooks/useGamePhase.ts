
import { useState, useEffect, useCallback } from 'react';
import { Choice } from '../types';
import { getChoiceImpact } from '../utils/impactConfiguration';

type GamePhase = 'languageSelection' | 'welcome' | 'preview' | 'playing' | 'consequence' | 'completed';

export const useGamePhase = (lastActivity: number, resetGame: () => void) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('languageSelection');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  // Auto-reset after 3 minutes of inactivity (kiosk mode)
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      if (timeSinceLastActivity > 180000 && gamePhase !== 'languageSelection') { // 3 minutes
        console.log('Auto-reset due to inactivity');
        setGamePhase('languageSelection');
        resetGame();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInactivity);
  }, [lastActivity, gamePhase, resetGame]);

  const handleLanguageSelect = useCallback(() => {
    setGamePhase('welcome');
  }, []);

  const handleShowPreview = useCallback(() => {
    setGamePhase('preview');
  }, []);

  const handleStart = useCallback(() => {
    setGamePhase('playing');
  }, []);

  const handleBackToWelcome = useCallback(() => {
    setGamePhase('welcome');
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
      if (selectedChoice.nextScenarioId) {
        advanceScenario(selectedChoice.nextScenarioId);
        setGamePhase('playing');
      } else {
        setGamePhase('completed');
      }
      setSelectedChoice(null);
    }
  }, [selectedChoice]);

  const handleReturnToChoices = useCallback(() => {
    setSelectedChoice(null);
    setGamePhase('playing');
  }, []);

  const handleRestart = useCallback(() => {
    setGamePhase('languageSelection');
    resetGame();
  }, [resetGame]);

  return {
    gamePhase,
    selectedChoice,
    handleLanguageSelect,
    handleShowPreview,
    handleStart,
    handleBackToWelcome,
    handleBackToLanguageSelection,
    handleBackToPreview,
    handleScenarioSelect,
    handleChoiceSelect,
    handleConfirmChoice,
    handleReturnToChoices,
    handleRestart
  };
};
