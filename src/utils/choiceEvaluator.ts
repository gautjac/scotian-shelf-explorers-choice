
import { Choice, ChoicePattern, ChoiceRecord, HealthMetrics } from '../types';

export const calculateChoicePattern = (choicesMade: ChoiceRecord[]): ChoicePattern => {
  const pattern = {
    environmental: 0,
    economic: 0,
    community: 0,
    totalChoices: choicesMade.length
  };

  choicesMade.forEach(choice => {
    pattern[choice.category]++;
  });

  return pattern;
};

export const getDominantCategory = (pattern: ChoicePattern): 'environmental' | 'economic' | 'community' | 'balanced' => {
  if (pattern.totalChoices === 0) return 'balanced';
  
  const { environmental, economic, community } = pattern;
  const max = Math.max(environmental, economic, community);
  
  // Check if it's truly dominant (at least 50% more than others)
  const threshold = pattern.totalChoices * 0.4;
  
  if (environmental >= threshold && environmental === max) return 'environmental';
  if (economic >= threshold && economic === max) return 'economic';
  if (community >= threshold && community === max) return 'community';
  
  return 'balanced';
};

export const isChoiceAvailable = (
  choice: Choice, 
  choicePattern: ChoicePattern, 
  healthMetrics: HealthMetrics
): boolean => {
  if (!choice.availableIf) return true;

  const conditions = choice.availableIf;

  // Check minimum total choices
  if (conditions.minChoices && choicePattern.totalChoices < conditions.minChoices) {
    return false;
  }

  // Check category requirements
  if (conditions.requiredCategory && conditions.minCategoryCount) {
    const categoryCount = choicePattern[conditions.requiredCategory];
    if (categoryCount < conditions.minCategoryCount) {
      return false;
    }
  }

  // Check health metric minimums
  if (conditions.healthMetricMin) {
    const { metric, value } = conditions.healthMetricMin;
    if (healthMetrics[metric] < value) {
      return false;
    }
  }

  // Check health metric maximums
  if (conditions.healthMetricMax) {
    const { metric, value } = conditions.healthMetricMax;
    if (healthMetrics[metric] > value) {
      return false;
    }
  }

  return true;
};

export const getScenarioVariant = (
  scenario: any,
  dominantCategory: 'environmental' | 'economic' | 'community' | 'balanced'
): { title: string; description: string } => {
  if (!scenario.variants || dominantCategory === 'balanced') {
    return { title: scenario.title, description: scenario.description };
  }

  const variant = scenario.variants[dominantCategory];
  if (variant) {
    return variant;
  }

  return { title: scenario.title, description: scenario.description };
};
