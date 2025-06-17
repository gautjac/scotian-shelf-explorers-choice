
import { useMemo } from 'react';
import { Scenario, Choice, GameState } from '../types';
import { getAvailableChoices } from '../utils/choiceEvaluator';
import { createDynamicScenarioDescription, getAdvancedChoices } from '../data/dynamicContent';

export const useDynamicScenarios = (scenarios: Scenario[], gameState: GameState) => {
  return useMemo(() => {
    return scenarios.map(scenario => {
      // Create dynamic description based on choice pattern
      const dynamicDescription = createDynamicScenarioDescription(
        scenario.description,
        gameState.choicePattern,
        scenario.id
      );

      // Get advanced choices that might be available
      const advancedChoices = getAdvancedChoices(scenario.id);

      // Combine original choices with advanced choices
      const allChoices = [...scenario.choices, ...advancedChoices];

      // Filter choices based on game state
      const availableChoices = getAvailableChoices(
        allChoices,
        gameState.choicePattern,
        gameState.healthMetrics
      );

      return {
        ...scenario,
        description: dynamicDescription,
        choices: availableChoices
      };
    });
  }, [scenarios, gameState.choicePattern, gameState.healthMetrics]);
};
