import { Scenario, Language, MarineSpecies } from '../types';

interface ComprehensiveConfig {
  scenarios?: Record<string, any>;
  uiText?: Record<string, any>;
  impact?: Record<string, any>;
}

export const generateOfflineContentSource = (config: ComprehensiveConfig): string => {
  const generateImports = () => {
    return `import { Language, Scenario, MarineSpecies } from '../types';

// Import local images
import plasticPollutionImg from '../assets/images/plastic-pollution.jpg';
import fishingPracticesImg from '../assets/images/fishing-practices.jpg';
import shippingTrafficImg from '../assets/images/shipping-traffic.jpg';
import oceanAcidificationImg from '../assets/images/ocean-acidification.jpg';
import renewableEnergyImg from '../assets/images/renewable-energy.jpg';
import coastalDevelopmentImg from '../assets/images/coastal-development.jpg';
import lobsterImg from '../assets/images/lobster.jpg';
import codImg from '../assets/images/cod.jpg';
import whaleImg from '../assets/images/whale.jpg';
import kelpImg from '../assets/images/kelp.jpg';`;
  };

  const generateLanguages = () => {
    return `export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'mi', name: "Mi'kmaq", nativeName: "Mi'kmaq" }
];`;
  };

  const generateMarineSpecies = () => {
    return `export const marineSpecies: MarineSpecies[] = [
  {
    id: 'lobster',
    name: 'Atlantic Lobster',
    imageUrl: lobsterImg,
    healthStatus: 'stable'
  },
  {
    id: 'cod',
    name: 'Atlantic Cod',
    imageUrl: codImg,
    healthStatus: 'stable'
  },
  {
    id: 'whale',
    name: 'North Atlantic Right Whale',
    imageUrl: whaleImg,
    healthStatus: 'stable'
  },
  {
    id: 'kelp',
    name: 'Kelp Forest',
    imageUrl: kelpImg,
    healthStatus: 'stable'
  }
];`;
  };

  const getImageVariable = (scenarioId: string): string => {
    const imageMap: Record<string, string> = {
      'plastic-pollution': 'plasticPollutionImg',
      'fishing-practices': 'fishingPracticesImg',
      'shipping-traffic': 'shippingTrafficImg',
      'ocean-acidification': 'oceanAcidificationImg',
      'renewable-energy': 'renewableEnergyImg',
      'coastal-development': 'coastalDevelopmentImg'
    };
    return imageMap[scenarioId] || 'plasticPollutionImg';
  };

  const formatStringForTS = (text: string): string => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');
  };

  const generateScenarios = () => {
    if (!config.scenarios) {
      return 'export const scenarios: Record<Language[\'code\'], Scenario[]> = {};';
    }

    const languages = ['en', 'fr', 'mi'];
    const scenariosByLang: Record<string, any[]> = {};

    // Group scenarios by language
    languages.forEach(lang => {
      scenariosByLang[lang] = [];
    });

    // Extract scenarios from config
    Object.entries(config.scenarios).forEach(([scenarioId, scenarioData]: [string, any]) => {
      languages.forEach(lang => {
        if (scenarioData[lang]) {
          const scenario = scenarioData[lang];
          const choices = scenario.choices || [];
          
          scenariosByLang[lang].push({
            id: scenarioId,
            title: scenario.title || '',
            description: scenario.description || '',
            imageUrl: getImageVariable(scenarioId),
            choices: choices.map((choice: any) => ({
              id: choice.id || '',
              text: choice.text || '',
              impact: choice.impact || 'neutral',
              consequence: choice.consequence || '',
              pros: choice.pros || '',
              cons: choice.cons || '',
              nextScenarioId: choice.nextScenarioId,
              ecosystemImpact: choice.ecosystemImpact,
              economicImpact: choice.economicImpact,
              communityImpact: choice.communityImpact
            })),
            isEnding: scenario.isEnding
          });
        }
      });
    });

    const generateLanguageScenarios = (lang: string, scenarios: any[]) => {
      if (scenarios.length === 0) return '[]';

      return `[
${scenarios.map(scenario => `    {
      id: '${scenario.id}',
      title: '${formatStringForTS(scenario.title)}',
      description: '${formatStringForTS(scenario.description)}',
      imageUrl: ${scenario.imageUrl},
      choices: [
${scenario.choices.map((choice: any) => `        {
          id: '${choice.id}',
          text: '${formatStringForTS(choice.text)}',
          impact: '${choice.impact}',
          consequence: '${formatStringForTS(choice.consequence)}',
          pros: '${formatStringForTS(choice.pros)}',
          cons: '${formatStringForTS(choice.cons)}'${choice.nextScenarioId ? `,
          nextScenarioId: '${choice.nextScenarioId}'` : ''}${choice.ecosystemImpact !== undefined ? `,
          ecosystemImpact: ${choice.ecosystemImpact}` : ''}${choice.economicImpact !== undefined ? `,
          economicImpact: ${choice.economicImpact}` : ''}${choice.communityImpact !== undefined ? `,
          communityImpact: ${choice.communityImpact}` : ''}
        }`).join(',\n')}
      ]${scenario.isEnding ? ',\n      isEnding: true' : ''}
    }`).join(',\n')}
  ]`;
    };

    return `export const scenarios: Record<Language['code'], Scenario[]> = {
  en: ${generateLanguageScenarios('en', scenariosByLang.en)},
  fr: ${generateLanguageScenarios('fr', scenariosByLang.fr)},
  mi: ${generateLanguageScenarios('mi', scenariosByLang.mi)}
};`;
  };

  return `${generateImports()}

${generateLanguages()}

${generateMarineSpecies()}

${generateScenarios()}`;
};

export const generateContentSource = (config: ComprehensiveConfig): string => {
  return `// Re-export from offline content for complete offline functionality
export { 
  languages, 
  scenarios, 
  marineSpecies 
} from './offlineContent';`;
};

export const downloadSourceFiles = (config: ComprehensiveConfig) => {
  try {
    // Generate offlineContent.ts
    const offlineContentSource = generateOfflineContentSource(config);
    const offlineBlob = new Blob([offlineContentSource], { type: 'text/typescript;charset=utf-8;' });
    
    // Generate content.ts (simple re-export)
    const contentSource = generateContentSource(config);
    const contentBlob = new Blob([contentSource], { type: 'text/typescript;charset=utf-8;' });
    
    // Create download links
    const offlineLink = document.createElement('a');
    const offlineUrl = URL.createObjectURL(offlineBlob);
    offlineLink.setAttribute('href', offlineUrl);
    offlineLink.setAttribute('download', 'offlineContent.ts');
    offlineLink.style.visibility = 'hidden';
    
    const contentLink = document.createElement('a');
    const contentUrl = URL.createObjectURL(contentBlob);
    contentLink.setAttribute('href', contentUrl);
    contentLink.setAttribute('download', 'content.ts');
    contentLink.style.visibility = 'hidden';
    
    // Download both files
    document.body.appendChild(offlineLink);
    document.body.appendChild(contentLink);
    offlineLink.click();
    
    // Delay second download slightly
    setTimeout(() => {
      contentLink.click();
      document.body.removeChild(offlineLink);
      document.body.removeChild(contentLink);
      URL.revokeObjectURL(offlineUrl);
      URL.revokeObjectURL(contentUrl);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Failed to generate source files:', error);
    return false;
  }
};