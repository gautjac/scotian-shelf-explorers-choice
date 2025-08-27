
export type GamePhase = 'languageSelection' | 'preview' | 'playing' | 'consequence' | 'healthTransition' | 'completed';

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
  // Granular impact values (-50 to +50)
  ecosystemImpact?: number;
  economicImpact?: number;
  communityImpact?: number;
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

export interface HealthMetrics {
  ecosystem: number; // 0-100
  economic: number;  // 0-100
  community: number; // 0-100
}

export interface GameState {
  currentScenarioId: string;
  language: Language['code'];
  completedScenarios: string[];
  speciesHealth: Record<string, MarineSpecies['healthStatus']>;
  healthMetrics: HealthMetrics;
  previousHealthMetrics?: HealthMetrics;
  currentScenarioIndex: number;
  sessionStartTime: number;
  choicesMade: Array<{
    scenarioId: string;
    choiceId: string;
    timestamp: number;
  }>;
}
