import { scenarios } from '../data/content';
import { Choice } from '../types';

interface ImpactConfigurationRow {
  scenarioId: string;
  scenarioTitle: string;
  choiceId: string;
  choiceText: string;
  language: string;
  currentImpact: string;
  ecosystemImpact: number;
  economicImpact: number;
  communityImpact: number;
}

// Convert legacy impact to suggested granular values
const convertLegacyImpact = (impact: 'positive' | 'negative' | 'neutral', scenarioId: string, choiceId: string) => {
  // Base values
  const basePositive = { ecosystem: 15, economic: 10, community: 12 };
  const baseNegative = { ecosystem: -15, economic: -10, community: -12 };
  const baseNeutral = { ecosystem: 0, economic: 0, community: 0 };

  // Scenario-specific adjustments for realism
  const adjustments: Record<string, Record<string, Partial<typeof basePositive>>> = {
    'plastic-pollution': {
      'ban-plastics': { ecosystem: 25, economic: -5, community: 15 },
      'ignore-problem': { ecosystem: -30, economic: 0, community: -10 },
      'beach-cleanup': { ecosystem: 10, economic: 5, community: 20 }
    },
    'fishing-practices': {
      'sustainable-quotas': { ecosystem: 20, economic: -5, community: 10 },
      'unlimited-fishing': { ecosystem: -35, economic: 15, community: -15 },
      'marine-reserves': { ecosystem: 30, economic: -10, community: 5 }
    },
    'shipping-traffic': {
      'speed-restrictions': { ecosystem: 25, economic: -8, community: 5 },
      'ignore-whales': { ecosystem: -40, economic: 0, community: -5 },
      'detection-systems': { ecosystem: 20, economic: -15, community: 10 }
    },
    'ocean-acidification': {
      'reduce-emissions': { ecosystem: 30, economic: -10, community: 15 },
      'ignore-acidity': { ecosystem: -25, economic: 0, community: -8 },
      'buffer-zones': { ecosystem: 5, economic: -20, community: 0 }
    },
    'renewable-energy': {
      'careful-planning': { ecosystem: 15, economic: 5, community: 20 },
      'no-renewables': { ecosystem: -20, economic: 0, community: -15 },
      'adaptive-technology': { ecosystem: 25, economic: -5, community: 15 }
    },
    'coastal-development': {
      'green-development': { ecosystem: 20, economic: -5, community: 15 },
      'unrestricted-development': { ecosystem: -30, economic: 10, community: -10 },
      'buffer-zones-coastal': { ecosystem: 25, economic: -8, community: 12 }
    },
    'invasive-species': {
      'removal-programs': { ecosystem: 20, economic: -10, community: 8 },
      'ignore-invaders': { ecosystem: -25, economic: 0, community: -5 },
      'education-prevention': { ecosystem: 15, economic: -5, community: 25 }
    },
    'climate-change': {
      'renewable-energy': { ecosystem: 25, economic: -5, community: 20 },
      'ignore-climate': { ecosystem: -30, economic: 0, community: -15 },
      'carbon-capture': { ecosystem: 35, economic: -8, community: 10 }
    }
  };

  const adjustment = adjustments[scenarioId]?.[choiceId];
  
  if (impact === 'positive') {
    return {
      ecosystem: adjustment?.ecosystem ?? basePositive.ecosystem,
      economic: adjustment?.economic ?? basePositive.economic,
      community: adjustment?.community ?? basePositive.community
    };
  } else if (impact === 'negative') {
    return {
      ecosystem: adjustment?.ecosystem ?? baseNegative.ecosystem,
      economic: adjustment?.economic ?? baseNegative.economic,
      community: adjustment?.community ?? baseNegative.community
    };
  } else {
    return {
      ecosystem: adjustment?.ecosystem ?? baseNeutral.ecosystem,
      economic: adjustment?.economic ?? baseNeutral.economic,
      community: adjustment?.community ?? baseNeutral.community
    };
  }
};

// Export all choices to CSV format
export const exportChoicesToCSV = (): string => {
  const rows: ImpactConfigurationRow[] = [];
  
  Object.entries(scenarios).forEach(([language, scenarioList]) => {
    scenarioList.forEach(scenario => {
      scenario.choices.forEach(choice => {
        const impacts = convertLegacyImpact(choice.impact, scenario.id, choice.id);
        
        rows.push({
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          choiceId: choice.id,
          choiceText: choice.text,
          language,
          currentImpact: choice.impact,
          ecosystemImpact: choice.ecosystemImpact ?? impacts.ecosystem,
          economicImpact: choice.economicImpact ?? impacts.economic,
          communityImpact: choice.communityImpact ?? impacts.community
        });
      });
    });
  });

  // Create CSV header
  const header = [
    'Scenario ID',
    'Scenario Title', 
    'Choice ID',
    'Choice Text',
    'Language',
    'Current Impact Type',
    'Ecosystem Impact (-50 to +50)',
    'Economic Impact (-50 to +50)',
    'Community Impact (-50 to +50)'
  ].join(',');

  // Create CSV rows
  const csvRows = rows.map(row => [
    row.scenarioId,
    `"${row.scenarioTitle.replace(/"/g, '""')}"`,
    row.choiceId,
    `"${row.choiceText.replace(/"/g, '""')}"`,
    row.language,
    row.currentImpact,
    row.ecosystemImpact,
    row.economicImpact,
    row.communityImpact
  ].join(','));

  return [header, ...csvRows].join('\n');
};

// Parse CSV and return impact configuration
export const parseImpactCSV = (csvContent: string): Record<string, Record<string, { ecosystem: number; economic: number; community: number }>> => {
  const lines = csvContent.split('\n');
  const impactConfig: Record<string, Record<string, { ecosystem: number; economic: number; community: number }>> = {};
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse CSV (handle quoted strings)
    const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
    if (!matches || matches.length < 9) continue;
    
    const values = matches.map(match => 
      match.startsWith(',') ? match.slice(1) : match
    ).map(value => 
      value.startsWith('"') && value.endsWith('"') 
        ? value.slice(1, -1).replace(/""/g, '"')
        : value
    );
    
    const [scenarioId, , choiceId, , , , ecosystemStr, economicStr, communityStr] = values;
    
    const ecosystem = parseInt(ecosystemStr) || 0;
    const economic = parseInt(economicStr) || 0;
    const community = parseInt(communityStr) || 0;
    
    // Validate ranges
    const clamp = (value: number) => Math.max(-50, Math.min(50, value));
    
    if (!impactConfig[scenarioId]) {
      impactConfig[scenarioId] = {};
    }
    
    impactConfig[scenarioId][choiceId] = {
      ecosystem: clamp(ecosystem),
      economic: clamp(economic),
      community: clamp(community)
    };
  }
  
  return impactConfig;
};

// Get impact values for a choice (uses granular if available, falls back to legacy conversion)
export const getChoiceImpact = (scenarioId: string, choice: Choice) => {
  if (choice.ecosystemImpact !== undefined && choice.economicImpact !== undefined && choice.communityImpact !== undefined) {
    return {
      ecosystem: choice.ecosystemImpact,
      economic: choice.economicImpact,
      community: choice.communityImpact
    };
  }
  
  return convertLegacyImpact(choice.impact, scenarioId, choice.id);
};