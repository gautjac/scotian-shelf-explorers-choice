
import { useState, useEffect, useCallback } from 'react';
import { Choice } from '../types';
import { getChoiceImpact } from '../utils/impactConfiguration';

type GamePhase = 'welcome' | 'preview' | 'playing' | 'consequence' | 'completed';
type TransitionDirection = 'forward' | 'backward' | 'fade' | 'modal';

export const useGamePhase = (lastActivity: number, resetGame: () => void) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('welcome');
  const [previousPhase, setPreviousPhase] = useState<GamePhase>('welcome');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>('forward');

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

  const setPhaseWithTransition = useCallback((newPhase: GamePhase, direction: TransitionDirection) => {
    setPreviousPhase(gamePhase);
    setTransitionDirection(direction);
    setGamePhase(newPhase);
  }, [gamePhase]);

  const handleShowPreview = useCallback(() => {
    setPhaseWithTransition('preview', 'forward');
  }, [setPhaseWithTransition]);

  const handleStart = useCallback(() => {
    setPhaseWithTransition('playing', 'forward');
  }, [setPhaseWithTransition]);

  const handleBackToWelcome = useCallback(() => {
    setPhaseWithTransition('welcome', 'backward');
  }, [setPhaseWithTransition]);

  const handleBackToPreview = useCallback(() => {
    setPhaseWithTransition('preview', 'backward');
  }, [setPhaseWithTransition]);

  const handleScenarioSelect = useCallback((scenarioId: string, advanceScenario: (scenarioId: string) => void) => {
    advanceScenario(scenarioId);
    setPhaseWithTransition('playing', 'forward');
  }, [setPhaseWithTransition]);

  const handleChoiceSelect = useCallback((choiceId: string, currentScenario: any) => {
    const choice = currentScenario?.choices.find((c: Choice) => c.id === choiceId);
    if (choice) {
      setSelectedChoice(choice);
      setTransitionDirection('modal');
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
        setPhaseWithTransition('playing', 'forward');
      } else {
        setPhaseWithTransition('completed', 'fade');
      }
      setSelectedChoice(null);
    }
  }, [selectedChoice, setPhaseWithTransition]);

  const handleReturnToChoices = useCallback(() => {
    setSelectedChoice(null);
    setGamePhase('playing');
  }, []);

  const handleRestart = useCallback(() => {
    setPhaseWithTransition('welcome', 'backward');
    resetGame();
  }, [setPhaseWithTransition, resetGame]);

  return {
    gamePhase,
    previousPhase,
    transitionDirection,
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
  };
};
