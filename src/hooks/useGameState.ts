
import { useState, useCallback } from 'react';
import { GameState, Language, MarineSpecies, HealthMetrics } from '../types';
import { marineSpecies } from '../data/content';
import { getChoiceImpact } from '../utils/impactConfiguration';

const scenarioOrder = ['plastic-pollution', 'fishing-practices', 'shipping-traffic', 'renewable-energy', 'coastal-development'];

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
  previousHealthMetrics: {
    ecosystem: 70,
    economic: 70,
    community: 70
  },
  currentScenarioIndex: 0,
  sessionStartTime: Date.now(),
  choicesMade: []
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const updateLanguage = useCallback((language: Language['code']) => {
    setGameState(prev => ({ ...prev, language }));
  }, []);

  const makeChoice = useCallback((scenarioId: string, choiceId: string, impact: 'positive' | 'negative' | 'neutral', granularImpacts?: { ecosystem: number; economic: number; community: number }) => {
    console.log('makeChoice called:', { scenarioId, choiceId, impact, granularImpacts });
    setGameState(prev => {
      // Store current metrics as previous before updating
      const previousHealthMetrics = { ...prev.healthMetrics };
      
      const newSpeciesHealth = { ...prev.speciesHealth };
      const newHealthMetrics = { ...prev.healthMetrics };
      
      // Get impact values: try uploaded impact CSV first, then passed granular, then content/legacy
      let finalImpacts = null;
      
      // Try impact-only CSV from localStorage
      try {
        const raw = localStorage.getItem('impactConfiguration');
        if (raw) {
          const impactConfig = JSON.parse(raw);
          const byScenario = impactConfig[scenarioId];
          const byChoice = byScenario?.[choiceId];
          if (byChoice && typeof byChoice.ecosystem === 'number' && typeof byChoice.economic === 'number' && typeof byChoice.community === 'number') {
            finalImpacts = {
              ecosystem: byChoice.ecosystem,
              economic: byChoice.economic,
              community: byChoice.community
            };
          }
        }
      } catch (e) {
        console.warn('Failed to read impactConfiguration from localStorage:', e);
      }
      
      if (!finalImpacts && granularImpacts) {
        finalImpacts = granularImpacts;
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
        previousHealthMetrics,
        choicesMade: [...prev.choicesMade, {
          scenarioId,
          choiceId,
          timestamp: Date.now()
        }],
        completedScenarios: [...prev.completedScenarios, scenarioId]
      };
    });
  }, []);

  const advanceScenario = useCallback((nextScenarioId?: string) => {
    setGameState(prev => {
      const currentIndex = scenarioOrder.findIndex(id => id === prev.currentScenarioId);
      const nextIndex = nextScenarioId ? scenarioOrder.findIndex(id => id === nextScenarioId) : currentIndex + 1;
      
      return {
        ...prev,
        currentScenarioId: nextScenarioId || prev.currentScenarioId,
        currentScenarioIndex: nextIndex >= 0 ? nextIndex : prev.currentScenarioIndex
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      ...initialGameState,
      language: gameState.language, // Keep current language
      sessionStartTime: Date.now(),
      currentScenarioIndex: 0
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
