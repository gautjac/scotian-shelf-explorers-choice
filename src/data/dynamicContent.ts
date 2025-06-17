import { Scenario } from '../types';

export const dynamicScenarios: Record<string, Scenario[]> = {
  en: [
    {
      id: 'plastic-pollution',
      title: 'Plastic in the Ocean',
      description: 'You see lots of plastic bags and bottles floating in the water. Sea animals might eat them by mistake.',
      imageUrl: '/placeholder.svg',
      variants: {
        environmental: {
          title: 'Fighting Ocean Plastic',
          description: 'Your past choices show you care about nature! Now there\'s a big plastic problem that needs your help.'
        },
        economic: {
          title: 'Plastic Problem and Money',
          description: 'You think about money and jobs. How can we fix the plastic problem without hurting businesses?'
        },
        community: {
          title: 'Community vs Plastic',
          description: 'You care about people working together. How can everyone help clean up the plastic?'
        }
      },
      choices: [
        {
          id: 'ban-plastics',
          text: 'Ban all plastic bags in stores',
          impact: 'positive',
          category: 'environmental',
          consequence: 'Stores use paper bags. Less plastic in ocean but costs more.',
          pros: 'Ocean animals are safer from plastic',
          cons: 'Paper bags cost more money'
        },
        {
          id: 'plastic-tax',
          text: 'Make plastic bags cost extra money',
          impact: 'neutral',
          category: 'economic',
          consequence: 'People use fewer plastic bags. Stores make extra money.',
          pros: 'Less plastic waste and stores earn money',
          cons: 'Poor families pay more for bags'
        },
        {
          id: 'education-campaign',
          text: 'Teach people why plastic hurts ocean animals',
          impact: 'positive',
          category: 'community',
          consequence: 'People learn and choose to use less plastic.',
          pros: 'Everyone learns to help the ocean',
          cons: 'Takes time to change people\'s habits'
        },
        {
          id: 'advanced-cleanup',
          text: 'Start a big ocean cleaning project with new machines',
          impact: 'positive',
          category: 'environmental',
          consequence: 'High-tech machines clean plastic from the ocean.',
          pros: 'Removes lots of plastic quickly',
          cons: 'Very expensive and uses lots of energy',
          availableIf: {
            minChoices: 1,
            requiredCategory: 'environmental',
            minCategoryCount: 1
          }
        },
        {
          id: 'business-partnership',
          text: 'Work with companies to make money from recycling plastic',
          impact: 'neutral',
          category: 'economic',
          consequence: 'Companies earn money by turning ocean plastic into new things.',
          pros: 'Makes money while cleaning ocean',
          cons: 'Companies might focus more on profit than cleaning',
          availableIf: {
            minChoices: 1,
            requiredCategory: 'economic',
            minCategoryCount: 1
          }
        }
      ]
    },
    {
      id: 'overfishing',
      title: 'Too Many Fish Caught',
      description: 'Big fishing boats catch too many fish. Soon there might not be enough fish left.',
      imageUrl: '/placeholder.svg',
      variants: {
        environmental: {
          title: 'Saving Fish for the Future',
          description: 'You\'ve been protecting nature! Now fish need your help - there aren\'t many left.'
        },
        economic: {
          title: 'Fishing Jobs and Fish',
          description: 'You think about workers and money. How do we save fish but keep fishing jobs?'
        },
        community: {
          title: 'Fishers and Fish Together',
          description: 'You bring people together. How can fishing families help save the fish they need?'
        }
      },
      choices: [
        {
          id: 'fishing-limits',
          text: 'Make rules about how many fish boats can catch',
          impact: 'positive',
          category: 'environmental',
          consequence: 'Fish have time to have babies and grow. Fishing boats catch less.',
          pros: 'More fish in the future',
          cons: 'Fishing workers make less money now'
        },
        {
          id: 'fish-farming',
          text: 'Build fish farms in the ocean',
          impact: 'neutral',
          category: 'economic',
          consequence: 'People raise fish in big pens. More fish to eat but ocean space used.',
          pros: 'More fish and jobs',
          cons: 'Fish farms can make ocean water dirty'
        },
        {
          id: 'community-fishing',
          text: 'Let fishing families decide together how many fish to catch',
          impact: 'positive',
          category: 'community',
          consequence: 'Fishing families work together to protect fish and jobs.',
          pros: 'Fishers help make the rules',
          cons: 'Hard for everyone to agree'
        },
        {
          id: 'marine-reserves',
          text: 'Create big "no fishing" areas where fish can be safe',
          impact: 'positive',
          category: 'environmental',
          consequence: 'Large areas become safe homes for fish to grow and have babies.',
          pros: 'Fish populations recover quickly',
          cons: 'Fishers lose access to some good fishing spots',
          availableIf: {
            minChoices: 2,
            requiredCategory: 'environmental',
            minCategoryCount: 1
          }
        },
        {
          id: 'fishing-buyback',
          text: 'Pay fishing boat owners to stop fishing and do other jobs',
          impact: 'neutral',
          category: 'economic',
          consequence: 'Government pays fishers to find new jobs. Fewer boats, more fish.',
          pros: 'Helps fishers and fish',
          cons: 'Costs lots of government money',
          availableIf: {
            healthMetricMin: { metric: 'economic', value: 60 }
          }
        }
      ]
    },
    {
      id: 'climate-change',
      title: 'Ocean Getting Warmer',
      description: 'The ocean water is getting warmer. This makes it hard for sea animals to live.',
      imageUrl: '/placeholder.svg',
      variants: {
        environmental: {
          title: 'Stopping Ocean Warming',
          description: 'Your green choices are working! But the ocean is still getting too warm for sea life.'
        },
        economic: {
          title: 'Warm Ocean, Cool Solutions',
          description: 'You balance money and nature. How can we cool the ocean without hurting business?'
        },
        community: {
          title: 'Everyone vs Warming Ocean',
          description: 'You get people working together. How can everyone help cool down the ocean?'
        }
      },
      choices: [
        {
          id: 'renewable-energy',
          text: 'Build wind and solar power instead of coal',
          impact: 'positive',
          category: 'environmental',
          consequence: 'Clean energy makes less pollution. Ocean stops getting warmer.',
          pros: 'Clean air and cooler ocean',
          cons: 'Costs lots of money to build'
        },
        {
          id: 'carbon-tax',
          text: 'Make companies pay money when they pollute',
          impact: 'neutral',
          category: 'economic',
          consequence: 'Companies pollute less to save money. Government gets money for clean projects.',
          pros: 'Less pollution and money for good projects',
          cons: 'Some companies might leave town'
        },
        {
          id: 'community-action',
          text: 'Get everyone to use less electricity and drive less',
          impact: 'positive',
          category: 'community',
          consequence: 'Families work together to waste less energy.',
          pros: 'Everyone helps and saves money',
          cons: 'Hard to get everyone to change'
        },
        {
          id: 'green-technology',
          text: 'Invest in new machines that take pollution out of the air',
          impact: 'positive',
          category: 'environmental',
          consequence: 'Special machines suck pollution from the air to cool the ocean.',
          pros: 'Directly fixes the warming problem',
          cons: 'Very expensive and uses lots of energy',
          availableIf: {
            minChoices: 2,
            healthMetricMin: { metric: 'economic', value: 70 }
          }
        }
      ]
    }
  ],
  fr: [
    // French translations would go here - keeping structure the same
    {
      id: 'plastic-pollution',
      title: 'Plastique dans l\'océan',
      description: 'Tu vois beaucoup de sacs et bouteilles en plastique dans l\'eau. Les animaux marins peuvent les manger par erreur.',
      imageUrl: '/placeholder.svg',
      choices: [
        {
          id: 'ban-plastics',
          text: 'Interdire tous les sacs plastique dans les magasins',
          impact: 'positive',
          category: 'environmental',
          consequence: 'Les magasins utilisent des sacs en papier. Moins de plastique dans l\'océan mais ça coûte plus cher.',
          pros: 'Les animaux marins sont plus en sécurité',
          cons: 'Les sacs en papier coûtent plus cher'
        }
        // ... other French choices would follow the same pattern
      ]
    }
    // ... other French scenarios
  ],
  mi: [
    // Mi'kmaq translations would go here - keeping structure the same
    {
      id: 'plastic-pollution',
      title: 'Samqwan plastik',
      description: 'Nemi\'j plastik apukweyul aq puktew samqwan. Samqwanikatl kisi mitsitl oqwa\'latl.',
      imageUrl: '/placeholder.svg',
      choices: [
        {
          id: 'ban-plastics',
          text: 'Msit plastik apukweyul ankamkewe',
          impact: 'positive',
          category: 'environmental',
          consequence: 'Mawita\'timk wejo\'k apukweyul. Naktewei plastik samqwan mu mijuajinu toqwa\'tu.',
          pros: 'Samqwanikatl ankamkesultijik plastik kt',
          cons: 'Wejo\'k apukweyul mijuajinu toqwa\'tu'
        }
        // ... other Mi'kmaq choices would follow the same pattern
      ]
    }
    // ... other Mi'kmaq scenarios
  ]
};
