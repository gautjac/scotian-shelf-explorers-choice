
import { useState, useCallback } from 'react';
import { GameState, Language, MarineSpecies, HealthMetrics, ChoiceRecord, ChoicePattern } from '../types';
import { marineSpecies } from '../data/content';
import { calculateChoicePattern } from '../utils/choiceEvaluator';

const initialGameState: GameState = {
  currentScenarioId: 'plastic-pollution',
  language: 'en',
  completedScenarios: [],
  speciesHealth: marineSpecies.reduce((acc, species) => ({
    ...acc,
    [species.id]: 'stable' as MarineSpecies['healthStatus']
  }), {}),
  healthMetrics: {
    ecosystem: 70,
    economic: 70,  
    community: 70
  },
  sessionStartTime: Date.now(),
  choicesMade: [],
  choicePattern: {
    environmental: 0,
    economic: 0,
    community: 0,
    totalChoices: 0
  }
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const updateLanguage = useCallback((language: Language['code']) => {    
    setGameState(prev => ({ ...prev, language }));
  }, []);

  const makeChoice = useCallback((scenarioId: string, choiceId: string, impact: 'positive' | 'negative' | 'neutral', category: 'environmental' | 'economic' | 'community') => {
    setGameState(prev => {
      const newSpeciesHealth = { ...prev.speciesHealth };
      const newHealthMetrics = { ...prev.healthMetrics };
      
      // Update species health based on choice impact
      Object.keys(newSpeciesHealth).forEach(speciesId => {
        if (impact === 'positive') {
          if (newSpeciesHealth[speciesId] === 'critical') newSpeciesHealth[speciesId] = 'declining';
          else if (newSpeciesHealth[speciesId] === 'declining') newSpeciesHealth[speciesId] = 'stable';
          else if (newSpeciesHealth[speciesId] === 'stable') newSpeciesHealth[speciesId] = 'thriving';
        } else if (impact === 'negative') {
          if (newSpeciesHealth[speciesId] === 'thriving') newSpeciesHealth[speciesId] = 'stable';
          else if (newSpeciesHealth[speciesId] === 'stable') newSpeciesHealth[speciesId] = 'declining';
          else if (newSpeciesHealth[speciesId] === 'declining') newSpeciesHealth[speciesId] = 'critical';
        }
      });

      // Update health metrics based on choice impact and category
      const impactValue = impact === 'positive' ? 15 : impact === 'negative' ? -15 : 0;
      const categoryBonus = 5; // Extra impact for the choice's category
      
      if (category === 'environmental') {
        newHealthMetrics.ecosystem = Math.max(0, Math.min(100, newHealthMetrics.ecosystem + impactValue + categoryBonus));
        newHealthMetrics.economic = Math.max(0, Math.min(100, newHealthMetrics.economic + impactValue));
        newHealthMetrics.community = Math.max(0, Math.min(100, newHealthMetrics.community + impactValue));
      } else if (category === 'economic') {
        newHealthMetrics.economic = Math.max(0, Math.min(100, newHealthMetrics.economic + impactValue + categoryBonus));
        newHealthMetrics.ecosystem = Math.max(0, Math.min(100, newHealthMetrics.ecosystem + impactValue));
        newHealthMetrics.community = Math.max(0, Math.min(100, newHealthMetrics.community + impactValue));
      } else if (category === 'community') {
        newHealthMetrics.community = Math.max(0, Math.min(100, newHealthMetrics.community + impactValue + categoryBonus));
        newHealthMetrics.ecosystem = Math.max(0, Math.min(100, newHealthMetrics.ecosystem + impactValue));
        newHealthMetrics.economic = Math.max(0, Math.min(100, newHealthMetrics.economic + impactValue));
      }

      const newChoiceRecord: ChoiceRecord = {
        scenarioId,
        choiceId,
        timestamp: Date.now(),
        impact,
        category
      };

      const newChoicesMade = [...prev.choicesMade, newChoiceRecord];
      const newChoicePattern = calculateChoicePattern(newChoicesMade);

      return {
        ...prev,
        speciesHealth: newSpeciesHealth,
        healthMetrics: newHealthMetrics,
        choicesMade: newChoicesMade,
        choicePattern: newChoicePattern,
        completedScenarios: [...prev.completedScenarios, scenarioId]
      };
    });
  }, []);

  const advanceScenario = useCallback((nextScenarioId?: string) => {
    if (nextScenarioId) {
      setGameState(prev => ({ ...prev, currentScenarioId: nextScenarioId }));
    }
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      ...initialGameState,
      language: gameState.language, // Keep current language
      sessionStartTime: Date.now()
    });
  }, [gameState.language]);

  const getCurrentSpecies = useCallback(() => {
    return marineSpecies.map(species => ({
      ...species,
      healthStatus: gameState.speciesHealth[species.id]
    }));
  }, [gameState.speciesHealth]);

  // Auto-reset after 3 minutes of inactivity (for kiosk mode)
  const [lastActivity, setLastActivity] = useState(Date.now());

  const trackActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  return {
    gameState,
    updateLanguage,
    makeChoice,
    advanceScenario,
    resetGame,
    getCurrentSpecies,
    trackActivity,
    lastActivity
  };
};
