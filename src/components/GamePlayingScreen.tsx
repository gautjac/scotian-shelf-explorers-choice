
import { GameSidebar } from './GameSidebar';
import { ScenarioCard } from './ScenarioCard';
import { GameActions } from './GameActions';
import { LanguageSelector } from './LanguageSelector';
import { Scenario, GameState, Language } from '../types';
import geometricBackground from '../assets/geometric-background.png';

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
    <div className="min-h-screen flex relative" style={{ backgroundImage: `url(${geometricBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-[#0072A0]/60" />
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
      </div>

      {/* Right Sidebar - Ocean Health - 1/3 of screen */}
      <div className="w-1/3 h-screen">
        <GameSidebar
          healthMetrics={gameState.healthMetrics}
          language={gameState.language}
          onLanguageChange={onLanguageChange}
          onBackToPreview={onBackToPreview}
          onRestart={onRestart}
        />
      </div>
    </div>
  );
};
