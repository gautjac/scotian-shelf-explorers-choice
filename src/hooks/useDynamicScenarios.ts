
import { useMemo } from 'react';
import { Scenario, GameState } from '../types';
import { dynamicScenarios } from '../data/dynamicContent';
import { scenarios as staticScenarios } from '../data/content';
import { getDominantCategory, getScenarioVariant, isChoiceAvailable } from '../utils/choiceEvaluator';

export const useDynamicScenarios = (gameState: GameState) => {
  return useMemo(() => {
    const language = gameState.language;
    const dominantCategory = getDominantCategory(gameState.choicePattern);
    
    // Start with dynamic scenarios if available, fall back to static
    const baseScenarios = dynamicScenarios[language] || staticScenarios[language] || [];
    
    // Transform scenarios based on user's choice patterns
    const adaptedScenarios = baseScenarios.map(scenario => {
      // Get variant content based on dominant choice category
      const variantContent = getScenarioVariant(scenario, dominantCategory);
      
      // Filter choices based on availability conditions
      const availableChoices = scenario.choices.filter(choice => 
        isChoiceAvailable(choice, gameState.choicePattern, gameState.healthMetrics)
      );
      
      return {
        ...scenario,
        title: variantContent.title,
        description: variantContent.description,
        choices: availableChoices
      };
    });

    return adaptedScenarios;
  }, [gameState.language, gameState.choicePattern, gameState.healthMetrics]);
};
