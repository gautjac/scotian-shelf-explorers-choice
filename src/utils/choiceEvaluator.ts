
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

  return pattern;
};

export const isChoiceAvailable = (
  choice: Choice,
  choicePattern: ChoicePattern,
  healthMetrics: HealthMetrics
): boolean => {
  if (!choice.requiredChoicePattern) return true;

  const { environmental, economic, community, minHealthMetrics } = choice.requiredChoicePattern;

  // Check choice pattern requirements
  if (environmental && choicePattern.environmental < environmental) return false;
  if (economic && choicePattern.economic < economic) return false;
  if (community && choicePattern.community < community) return false;

  // Check health metrics requirements
  if (minHealthMetrics) {
    if (minHealthMetrics.ecosystem && healthMetrics.ecosystem < minHealthMetrics.ecosystem) return false;
    if (minHealthMetrics.economic && healthMetrics.economic < minHealthMetrics.economic) return false;
    if (minHealthMetrics.community && healthMetrics.community < minHealthMetrics.community) return false;
  }

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
