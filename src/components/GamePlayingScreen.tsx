
import { GameSidebar } from './GameSidebar';
import { ScenarioCard } from './ScenarioCard';
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
    <div className="min-h-screen bg-[#0072A0] flex relative">
      {/* Left Sidebar - Ocean Health - 1/3 of screen */}
      <div className="w-1/3 h-screen">
        <GameSidebar
          healthMetrics={gameState.healthMetrics}
          language={gameState.language}
          onBackToPreview={onBackToPreview}
          onRestart={onRestart}
          onLanguageChange={onLanguageChange}
        />
      </div>

      {/* Main Content Area - Question Section - 2/3 of screen */}
      <div className="w-2/3 h-screen p-6 lg:p-8 flex flex-col justify-center">
        {/* Main scenario */}
        <ScenarioCard
          scenario={currentScenario}
          language={gameState.language}
          onChoiceSelect={onChoiceSelect}
        />
      </div>
    </div>
  );
};
