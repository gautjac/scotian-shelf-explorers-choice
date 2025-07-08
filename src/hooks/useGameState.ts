
import { useState, useCallback } from 'react';
import { GameState, Language, MarineSpecies, HealthMetrics } from '../types';
import { marineSpecies } from '../data/content';
import { useComprehensiveConfig } from './useComprehensiveConfig';
import { getChoiceImpact } from '../utils/impactConfiguration';

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
  choicesMade: []
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { getChoiceImpact: getComprehensiveChoiceImpact } = useComprehensiveConfig();

  const updateLanguage = useCallback((language: Language['code']) => {
    setGameState(prev => ({ ...prev, language }));
  }, []);

  const makeChoice = useCallback((scenarioId: string, choiceId: string, impact: 'positive' | 'negative' | 'neutral', granularImpacts?: { ecosystem: number; economic: number; community: number }) => {
    console.log('makeChoice called:', { scenarioId, choiceId, impact, granularImpacts });
    setGameState(prev => {
      const newSpeciesHealth = { ...prev.speciesHealth };
      const newHealthMetrics = { ...prev.healthMetrics };
      
      // Get impact values: check comprehensive config first, then granular, then fallback to legacy
      let finalImpacts = granularImpacts;
      
      if (!finalImpacts) {
        const comprehensiveImpacts = getComprehensiveChoiceImpact(scenarioId, choiceId, prev.language);
        if (comprehensiveImpacts) {
          finalImpacts = comprehensiveImpacts;
        }
      }
      
      if (!finalImpacts) {
        // Find the choice object and get its impact values
        const scenarios = require('../data/content').scenarios;
        const scenario = scenarios[prev.language]?.find((s: any) => s.id === scenarioId);
        const choice = scenario?.choices.find((c: any) => c.id === choiceId);
        if (choice) {
          finalImpacts = getChoiceImpact(scenarioId, choice);
        }
      }
      
      // Update species health based on choice impact (using ecosystem impact for species health)
      const ecosystemImpact = finalImpacts?.ecosystem ?? (impact === 'positive' ? 10 : impact === 'negative' ? -10 : 0);
      
      Object.keys(newSpeciesHealth).forEach(speciesId => {
        if (ecosystemImpact > 0) {
          if (newSpeciesHealth[speciesId] === 'critical') newSpeciesHealth[speciesId] = 'declining';
          else if (newSpeciesHealth[speciesId] === 'declining') newSpeciesHealth[speciesId] = 'stable';
          else if (newSpeciesHealth[speciesId] === 'stable') newSpeciesHealth[speciesId] = 'thriving';
        } else if (ecosystemImpact < 0) {
          if (newSpeciesHealth[speciesId] === 'thriving') newSpeciesHealth[speciesId] = 'stable';
          else if (newSpeciesHealth[speciesId] === 'stable') newSpeciesHealth[speciesId] = 'declining';
          else if (newSpeciesHealth[speciesId] === 'declining') newSpeciesHealth[speciesId] = 'critical';
        }
      });

      // Update health metrics using final impacts
      if (finalImpacts) {
        newHealthMetrics.ecosystem = Math.max(0, Math.min(100, newHealthMetrics.ecosystem + finalImpacts.ecosystem));
        newHealthMetrics.economic = Math.max(0, Math.min(100, newHealthMetrics.economic + finalImpacts.economic));
        newHealthMetrics.community = Math.max(0, Math.min(100, newHealthMetrics.community + finalImpacts.community));
      } else {
        // Ultimate fallback to legacy system
        const impactValue = impact === 'positive' ? 10 : impact === 'negative' ? -10 : 0;
        newHealthMetrics.ecosystem = Math.max(0, Math.min(100, newHealthMetrics.ecosystem + impactValue));
        newHealthMetrics.economic = Math.max(0, Math.min(100, newHealthMetrics.economic + impactValue));
        newHealthMetrics.community = Math.max(0, Math.min(100, newHealthMetrics.community + impactValue));
      }

      console.log('Health metrics updated:', { 
        old: prev.healthMetrics, 
        new: newHealthMetrics 
      });

      return {
        ...prev,
        speciesHealth: newSpeciesHealth,
        healthMetrics: newHealthMetrics,
        choicesMade: [...prev.choicesMade, {
          scenarioId,
          choiceId,
          timestamp: Date.now()
        }],
        completedScenarios: [...prev.completedScenarios, scenarioId]
      };
    });
  }, [getComprehensiveChoiceImpact]);

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
