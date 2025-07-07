
import { GameSidebar } from './GameSidebar';
import { ScenarioCard } from './ScenarioCard';
import { GameActions } from './GameActions';
import { LanguageSelector } from './LanguageSelector';
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
        />
      </div>

      {/* Main Content Area - Question Section - 2/3 of screen */}
      <div className="w-2/3 h-screen p-6 lg:p-8 flex flex-col">
        {/* Main scenario */}
        <div className="flex-1 mb-8">
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

      {/* Language selector - bottom right corner */}
      <div className="absolute bottom-8 right-8 z-20">
        <LanguageSelector 
          currentLanguage={gameState.language}
          onLanguageChange={onLanguageChange}
          className="bg-[#0B424E]/30 backdrop-blur-sm rounded-2xl p-4"
        />
      </div>
    </div>
  );
};
