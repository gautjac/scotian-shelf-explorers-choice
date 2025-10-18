
import { GameSidebar } from './GameSidebar';
import { FloatingLanguageHeader } from './FloatingLanguageHeader';
import { Scenario, GameState, Language } from '../types';
import geometricBackground from '../assets/geometric-background.png';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';


interface GamePlayingScreenProps {
  gameState: GameState;
  currentScenario: Scenario;
  onLanguageChange: (language: Language['code']) => void;
  onChoiceSelect: (choiceId: string) => void;
  onBackToPreview: () => void;
  onRestart: () => void;
  onBackToLanguageSelection: () => void;
}

export const GamePlayingScreen = ({
  gameState,
  currentScenario,
  onLanguageChange,
  onChoiceSelect,
  onBackToPreview,
  onRestart,
  onBackToLanguageSelection
}: GamePlayingScreenProps) => {
  const { getUIText, isLoading } = useComprehensiveConfig();
  const scenarioProgress = `${gameState.currentScenarioIndex + 1}/5`;
  
  // Show loading state to prevent flash of English text
  if (isLoading) {
    return (
      <div className="min-h-screen flex relative animate-pulse" style={{ backgroundImage: `url(${geometricBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="w-2/3 h-screen flex flex-col">
          <div className="min-h-full p-6 lg:p-8 pb-24 lg:pb-32 grid grid-rows-[auto_auto_auto] gap-6 overflow-hidden">
            <div className="h-[16.83rem] lg:h-[22.95rem] bg-slate-200/80 rounded-2xl" />
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-6 lg:px-8 lg:py-8">
              <div className="h-8 bg-slate-200 rounded mb-4" />
              <div className="h-6 bg-slate-200 rounded mb-2" />
              <div className="h-6 bg-slate-200 rounded mb-8" />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-6 lg:px-8 lg:py-8">
              <div className="h-6 bg-slate-200 rounded mb-6" />
              <div className="space-y-4">
                <div className="h-20 bg-slate-200 rounded-2xl" />
                <div className="h-20 bg-slate-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-slate-200/80" />
      </div>
    );
  }

  const impactColors = {
    positive: 'bg-[#0072A0] active:bg-[#0072A0]/90 !text-white',
    negative: 'bg-[#0B424E] active:bg-[#0B424E]/90 !text-white',
    neutral: 'bg-[#0B424E] active:bg-[#0B424E]/90 !text-white'
  };

  return (
    <div className="min-h-screen flex relative" style={{ backgroundImage: `url(${geometricBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Main Content Area - 2/3 of screen with Grid Layout */}
      <div className="w-2/3 h-screen flex flex-col">
        {/* Main Content Grid with bottom padding for floating header */}
        <div className="min-h-full p-6 pb-28 grid grid-rows-[auto_auto_auto] gap-6">
          {/* Scenario Image */}
          <div 
            className="h-[18rem] bg-cover bg-center rounded-2xl shadow-lg" 
            style={{ backgroundImage: `url(${currentScenario.imageUrl})` }}
          />

          {/* Content Section with Scenario Progress */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-helvetica text-heading text-blue-900">{currentScenario.title}</h2>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold text-lg">
                {scenarioProgress}
              </div>
            </div>
            <p className="font-helvetica text-primary text-slate-700 leading-relaxed">
              {currentScenario.description}
            </p>
          </div>

          {/* Choices Section with Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg overflow-y-auto">
            <h3 className="font-helvetica text-secondary font-semibold text-slate-800 text-center mb-5">
              {getUIText('ScenarioCard', 'Question Prompt', gameState.language) || 'What would you do?'}
            </h3>
            <div className="space-y-5">
              {currentScenario.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => onChoiceSelect(choice.id)}
                  className={`w-full p-4 rounded-xl font-semibold text-left transition-all duration-300 transform shadow-md active:scale-98 ${impactColors[choice.impact]} min-h-[85px]`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-helvetica text-white text-2xl leading-relaxed pr-4">
                      {choice.text}
                    </span>
                    <span className="text-2xl lg:text-3xl flex-shrink-0">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Ocean Health - 1/3 of screen */}
      <div className="w-1/3 h-screen">
        <GameSidebar 
          healthMetrics={gameState.healthMetrics}
          language={gameState.language}
          currentScenarioIndex={gameState.currentScenarioIndex}
          onBackToPreview={onBackToPreview}
          onRestart={onRestart}
        />
      </div>

      {/* Floating Language Header at Bottom */}
      <FloatingLanguageHeader
        currentLanguage={gameState.language}
        onLanguageChange={onLanguageChange}
        onBackToLanguageSelection={onBackToLanguageSelection}
      />
    </div>
  );
};
