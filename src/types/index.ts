
export interface Language {
  code: 'en' | 'fr' | 'mi';
  name: string;
  nativeName: string;
}

export interface Choice {
  id: string;
  text: string;
  impact: 'positive' | 'negative' | 'neutral';
  consequence: string;
  pros: string;
  cons: string;
  nextScenarioId?: string;
  category?: 'environmental' | 'economic' | 'community';
  requiredChoicePattern?: {
    environmental?: number;
    economic?: number;
    community?: number;
    minHealthMetrics?: Partial<HealthMetrics>;
  };
  isAdvanced?: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  choices: Choice[];
  isEnding?: boolean;
  dynamicDescription?: (choicePattern: ChoicePattern) => string;
}

export interface MarineSpecies {
  id: string;
  name: string;
  imageUrl: string;
  healthStatus: 'thriving' | 'stable' | 'declining' | 'critical';
}

export interface HealthMetrics {
  ecosystem: number; // 0-100
  economic: number;  // 0-100
  community: number; // 0-100
}

export interface ChoicePattern {
  environmental: number;
  economic: number;
  community: number;
  totalChoices: number;
}

export interface GameState {
  currentScenarioId: string;
  language: Language['code'];
  completedScenarios: string[];
  speciesHealth: Record<string, MarineSpecies['healthStatus']>;
  healthMetrics: HealthMetrics;
  sessionStartTime: number;
  choicesMade: Array<{
    scenarioId: string;
    choiceId: string;
    timestamp: number;
    impact: 'positive' | 'negative' | 'neutral';
    category?: 'environmental' | 'economic' | 'community';
  }>;
  choicePattern: ChoicePattern;
}
