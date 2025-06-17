
import { Scenario, Choice, ChoicePattern } from '../types';

export const createDynamicScenarioDescription = (
  baseDescription: string,
  choicePattern: ChoicePattern,
  scenarioId: string
): string => {
  if (choicePattern.totalChoices === 0) return baseDescription;

  const dominant = getDominantPattern(choicePattern);
  
  const contextualIntros = {
    'plastic-pollution': {
      environmental: "Building on your strong environmental stance, you now face an even more complex pollution challenge...",
      economic: "Your focus on economic solutions has prepared you for this cost-benefit analysis of pollution control...",
      community: "Your community-first approach is crucial as local residents deal with this pollution crisis...",
      balanced: "Your balanced decision-making will be tested with this multifaceted pollution problem..."
    },
    'overfishing': {
      environmental: "Your commitment to ecosystem protection now extends to marine life preservation...",
      economic: "The economic implications you've been considering now apply to fishing industry sustainability...",
      community: "The community partnerships you've fostered are vital for fishing community transitions...",
      balanced: "Your holistic approach continues as you balance marine conservation with human needs..."
    }
  };

  const intro = contextualIntros[scenarioId as keyof typeof contextualIntros]?.[dominant];
  return intro ? `${intro} ${baseDescription}` : baseDescription;
};

const getDominantPattern = (choicePattern: ChoicePattern): 'environmental' | 'economic' | 'community' | 'balanced' => {
  if (choicePattern.totalChoices === 0) return 'balanced';

  const { environmental, economic, community } = choicePattern;
  const max = Math.max(environmental, economic, community);
  
  if (environmental === economic && economic === community) return 'balanced';
  if (environmental === max) return 'environmental';
  if (economic === max) return 'economic';
  return 'community';
};

export const getAdvancedChoices = (scenarioId: string): Choice[] => {
  const advancedChoicesByScenario: Record<string, Choice[]> = {
    'plastic-pollution': [
      // Low requirement choices to test the system
      {
        id: 'test-simple-advanced',
        text: '🔬 Test an innovative bio-plastic solution (appears after 1 choice)',
        impact: 'positive',
        consequence: 'Launches a pilot program for biodegradable alternatives',
        pros: 'Shows immediate environmental benefits with community support',
        cons: 'Still in experimental phase with uncertain long-term viability',
        category: 'environmental',
        requiredChoicePattern: { totalChoices: 1 }, // Just need 1 choice total
        isAdvanced: true
      },
      {
        id: 'advanced-circular-economy',
        text: 'Implement a full circular economy system for ocean plastics',
        impact: 'positive',
        consequence: 'Creates a comprehensive waste-to-resource loop',
        pros: 'Revolutionary approach that turns waste into economic opportunity while healing the ocean',
        cons: 'Requires massive coordination and initial investment',
        category: 'environmental',
        requiredChoicePattern: { environmental: 2 },
        isAdvanced: true
      },
      {
        id: 'advanced-plastic-credits',
        text: 'Create a plastic credit trading system like carbon credits',
        impact: 'positive',
        consequence: 'Establishes market incentives for plastic reduction',
        pros: 'Market-based solution that rewards cleanup and reduction efforts',
        cons: 'Complex system that may be exploited without proper oversight',
        category: 'economic',
        requiredChoicePattern: { economic: 2 },
        isAdvanced: true
      },
      {
        id: 'advanced-community-cooperative',
        text: 'Establish community-owned plastic processing cooperatives',
        impact: 'positive',
        consequence: 'Empowers local communities to manage their plastic waste',
        pros: 'Creates local jobs while addressing pollution, builds community ownership',
        cons: 'Requires significant training and ongoing support systems',
        category: 'community',
        requiredChoicePattern: { community: 2 },
        isAdvanced: true
      }
    ],
    'overfishing': [
      {
        id: 'advanced-marine-permaculture',
        text: 'Develop regenerative ocean farming systems',
        impact: 'positive',
        consequence: 'Creates food production that heals rather than harms the ocean',
        pros: 'Innovative approach that increases biodiversity while producing food',
        cons: 'Unproven at scale and requires significant research investment',
        category: 'environmental',
        requiredChoicePattern: { environmental: 2 },
        isAdvanced: true
      },
      {
        id: 'advanced-fishing-blockchain',
        text: 'Implement blockchain-based fishing quota and tracking system',
        impact: 'positive',
        consequence: 'Creates transparent, tamper-proof fishing management',
        pros: 'Technology solution that ensures accountability and fair distribution',
        cons: 'High-tech solution that may exclude traditional fishing communities',
        category: 'economic',
        requiredChoicePattern: { economic: 2 },
        isAdvanced: true
      },
      {
        id: 'advanced-fisher-guardians',
        text: 'Transform fishers into paid ocean guardians and restoration experts',
        impact: 'positive',
        consequence: 'Redirects fishing expertise toward ocean stewardship',
        pros: 'Honors fishing knowledge while creating new sustainable livelihoods',
        cons: 'Significant cultural shift that may face resistance from traditional fishers',
        category: 'community',
        requiredChoicePattern: { community: 2 },
        isAdvanced: true
      }
    ]
  };

  return advancedChoicesByScenario[scenarioId] || [];
};
