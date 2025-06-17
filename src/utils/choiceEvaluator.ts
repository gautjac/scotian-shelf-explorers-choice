
import { Choice, ChoicePattern, HealthMetrics, GameState } from '../types';

export const calculateChoicePattern = (gameState: GameState): ChoicePattern => {
  const pattern = {
    environmental: 0,
    economic: 0,
    community: 0,
    totalChoices: gameState.choicesMade.length
  };

  gameState.choicesMade.forEach(choice => {
    if (choice.category) {
      pattern[choice.category]++;
    }
  });

  console.log('📊 Calculated choice pattern:', pattern);
  return pattern;
};

export const isChoiceAvailable = (
  choice: Choice,
  choicePattern: ChoicePattern,
  healthMetrics: HealthMetrics
): boolean => {
  if (!choice.requiredChoicePattern) {
    console.log(`✅ Choice ${choice.id} available (no requirements)`);
    return true;
  }

  const { environmental, economic, community, minHealthMetrics, totalChoices } = choice.requiredChoicePattern;

  // Check total choices requirement first
  if (totalChoices && choicePattern.totalChoices < totalChoices) {
    console.log(`❌ Choice ${choice.id} blocked: need ${totalChoices} total choices, have ${choicePattern.totalChoices}`);
    return false;
  }

  // Check choice pattern requirements
  if (environmental && choicePattern.environmental < environmental) {
    console.log(`❌ Choice ${choice.id} blocked: need ${environmental} environmental choices, have ${choicePattern.environmental}`);
    return false;
  }
  if (economic && choicePattern.economic < economic) {
    console.log(`❌ Choice ${choice.id} blocked: need ${economic} economic choices, have ${choicePattern.economic}`);
    return false;
  }
  if (community && choicePattern.community < community) {
    console.log(`❌ Choice ${choice.id} blocked: need ${community} community choices, have ${choicePattern.community}`);
    return false;
  }

  // Check health metrics requirements
  if (minHealthMetrics) {
    if (minHealthMetrics.ecosystem && healthMetrics.ecosystem < minHealthMetrics.ecosystem) {
      console.log(`❌ Choice ${choice.id} blocked: need ${minHealthMetrics.ecosystem} ecosystem health, have ${healthMetrics.ecosystem}`);
      return false;
    }
    if (minHealthMetrics.economic && healthMetrics.economic < minHealthMetrics.economic) {
      console.log(`❌ Choice ${choice.id} blocked: need ${minHealthMetrics.economic} economic health, have ${healthMetrics.economic}`);
      return false;
    }
    if (minHealthMetrics.community && healthMetrics.community < minHealthMetrics.community) {
      console.log(`❌ Choice ${choice.id} blocked: need ${minHealthMetrics.community} community health, have ${healthMetrics.community}`);
      return false;
    }
  }

  console.log(`✅ Choice ${choice.id} available (all requirements met)`);
  return true;
};

export const getAvailableChoices = (
  choices: Choice[],
  choicePattern: ChoicePattern,
  healthMetrics: HealthMetrics
): Choice[] => {
  return choices.filter(choice => isChoiceAvailable(choice, choicePattern, healthMetrics));
};

export const getDominantChoiceCategory = (choicePattern: ChoicePattern): 'environmental' | 'economic' | 'community' | 'balanced' => {
  if (choicePattern.totalChoices === 0) return 'balanced';

  const { environmental, economic, community } = choicePattern;
  const max = Math.max(environmental, economic, community);
  
  if (environmental === economic && economic === community) return 'balanced';
  if (environmental === max) return 'environmental';
  if (economic === max) return 'economic';
  return 'community';
};
