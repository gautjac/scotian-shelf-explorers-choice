
import { useMemo } from 'react';
import { Scenario, Choice, GameState } from '../types';
import { getAvailableChoices } from '../utils/choiceEvaluator';
import { createDynamicScenarioDescription, getAdvancedChoices } from '../data/dynamicContent';

export const useDynamicScenarios = (scenarios: Scenario[], gameState: GameState) => {
  return useMemo(() => {
    console.log('🔄 Processing dynamic scenarios...');
    console.log('Choice pattern:', gameState.choicePattern);
    console.log('Health metrics:', gameState.healthMetrics);
    console.log('Choices made:', gameState.choicesMade.length);

    return scenarios.map(scenario => {
      // Create dynamic description based on choice pattern
      const dynamicDescription = createDynamicScenarioDescription(
        scenario.description,
        gameState.choicePattern,
        scenario.id
      );

      // Get advanced choices that might be available
      const advancedChoices = getAdvancedChoices(scenario.id);
      console.log(`📋 Advanced choices for ${scenario.id}:`, advancedChoices.length);

      // Combine original choices with advanced choices
      const allChoices = [...scenario.choices, ...advancedChoices];

      // Filter choices based on game state
      const availableChoices = getAvailableChoices(
        allChoices,
        gameState.choicePattern,
        gameState.healthMetrics
      );

      console.log(`✅ Available choices for ${scenario.id}: ${availableChoices.length}/${allChoices.length}`);
      
      const dynamicScenario = {
        ...scenario,
        description: dynamicDescription,
        choices: availableChoices
      };

      // Log if description changed
      if (dynamicDescription !== scenario.description) {
        console.log(`📝 Dynamic description for ${scenario.id}: "${dynamicDescription.substring(0, 50)}..."`);
      }

      return dynamicScenario;
    });
  }, [scenarios, gameState.choicePattern, gameState.healthMetrics]);
};
