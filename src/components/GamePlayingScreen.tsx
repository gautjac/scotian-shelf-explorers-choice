
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
  const { getScenarioText, getChoiceText } = useComprehensiveConfig();
  
  const title = getScenarioText(currentScenario.id, 'title', gameState.language) ?? currentScenario.title;
  const description = getScenarioText(currentScenario.id, 'description', gameState.language) ?? currentScenario.description;

  const impactColors = {
    positive: 'bg-[#008BBF] hover:bg-[#008BBF]/90 text-white',
    negative: 'bg-[#0C556B] hover:bg-[#0C556B]/90 text-white',
    neutral: 'bg-[#0C556B] hover:bg-[#0C556B]/90 text-white'
  };

  return (
    <div className="min-h-screen flex relative" style={{ backgroundImage: `url(${geometricBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Main Content Area - 2/3 of screen with Grid Layout */}
      <div className="w-2/3 h-screen flex flex-col">
        {/* Main Content Grid with bottom padding for floating header */}
        <div className="flex-1 p-6 lg:p-8 pb-24 lg:pb-32 grid grid-rows-[minmax(200px,1fr)_auto_1fr] gap-6 overflow-hidden">
          {/* Scenario Image */}
          <div 
            className="h-96 lg:h-128 bg-cover bg-center rounded-2xl shadow-lg" 
            style={{ backgroundImage: `url(${currentScenario.imageUrl})` }}
          />

          {/* Content Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg -mt-8">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-900 mb-4">{title}</h2>
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Choices Section with Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg overflow-y-auto -mt-4">
            <h3 className="text-xl lg:text-2xl font-semibold text-slate-800 text-center mb-6">
              {gameState.language === 'en' && 'What would you do?'}
              {gameState.language === 'fr' && 'Que feriez-vous?'}
              {gameState.language === 'mi' && 'Koqoey ketu elkewek?'}
            </h3>
            <div className="space-y-4 lg:space-y-6">
              {currentScenario.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => onChoiceSelect(choice.id)}
                  className={`w-full p-4 lg:p-6 rounded-xl font-semibold text-left transition-all duration-300 transform hover:scale-102 shadow-md active:scale-98 ${impactColors[choice.impact]} min-h-[80px] lg:min-h-[100px]`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base lg:text-lg xl:text-xl leading-relaxed pr-4">
                      {getChoiceText(currentScenario.id, choice.id, 'text', gameState.language) ?? choice.text}
                    </span>
                    <span className="text-xl lg:text-2xl flex-shrink-0">→</span>
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
