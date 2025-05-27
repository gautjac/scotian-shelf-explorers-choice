
import { GameHeader } from './GameHeader';
import { ScenarioCard } from './ScenarioCard';
import { GameActions } from './GameActions';
import { Scenario, GameState, Language } from '../types';

interface GamePlayingScreenProps {
  gameState: GameState;
  currentScenario: Scenario;
  onLanguageChange: (language: Language['code']) => void;
  onChoiceSelect: (choiceId: string) => void;
  onBackToPreview: () => void;
  onRestart: () => void;
}

export const GamePlayingScreen = ({
  gameState,
  currentScenario,
  onLanguageChange,
  onChoiceSelect,
  onBackToPreview,
  onRestart
}: GamePlayingScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0072A0] via-[#0C556B] to-[#0B424E] p-6 lg:p-8">
      {/* Header with language selector and health meters */}
      <GameHeader
        healthMetrics={gameState.healthMetrics}
        language={gameState.language}
        onLanguageChange={onLanguageChange}
      />

      {/* Main scenario */}
      <div className="max-w-7xl mx-auto mb-12">
        <ScenarioCard
          scenario={currentScenario}
          language={gameState.language}
          onChoiceSelect={onChoiceSelect}
        />
      </div>

      {/* Action buttons */}
      <GameActions
        language={gameState.language}
        onBackToPreview={onBackToPreview}
        onRestart={onRestart}
      />
    </div>
  );
};
