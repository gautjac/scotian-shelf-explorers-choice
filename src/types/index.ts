
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
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  choices: Choice[];
  isEnding?: boolean;
}

export interface MarineSpecies {
  id: string;
  name: string;
  imageUrl: string;
  healthStatus: 'thriving' | 'stable' | 'declining' | 'critical';
}

export interface GameState {
  currentScenarioId: string;
  language: Language['code'];
  completedScenarios: string[];
  speciesHealth: Record<string, MarineSpecies['healthStatus']>;
  sessionStartTime: number;
  choicesMade: Array<{
    scenarioId: string;
    choiceId: string;
    timestamp: number;
  }>;
}
