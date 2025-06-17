
import { Scenario, Language } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
  language: Language['code'];
  onChoiceSelect: (choiceId: string) => void;
}

const impactColors = {
  positive: 'bg-[#008BBF] hover:bg-[#008BBF]/90 text-white',
  negative: 'bg-[#0C556B] hover:bg-[#0C556B]/90 text-white',
  neutral: 'bg-[#0C556B] hover:bg-[#0C556B]/90 text-white'
};

const getCategoryIcon = (category: 'environmental' | 'economic' | 'community') => {
  switch (category) {
    case 'environmental': return '🌱';
    case 'economic': return '💰';
    case 'community': return '👥';
    default: return '🌊';
  }
};

export const ScenarioCard = ({ scenario, language, onChoiceSelect }: ScenarioCardProps) => {
  return (
    <div className="h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
      {/* Scenario image - optimized for sidebar layout */}
      <div className="h-64 lg:h-80 bg-cover bg-center relative flex-shrink-0" style={{ backgroundImage: `url(${scenario.imageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-8 right-8">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3">{scenario.title}</h2>
        </div>
      </div>

      {/* Scenario content - scrollable if needed */}
      <div className="flex-1 p-8 lg:p-10 flex flex-col overflow-y-auto">
        <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8 lg:mb-10">
          {scenario.description}
        </p>

        {/* Choices - optimized for touch interaction */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-6 lg:mb-8">
            {language === 'en' && 'What would you do?'}
            {language === 'fr' && 'Que feriez-vous?'}
            {language === 'mi' && 'Koqoey ketu elkewek?'}
          </h3>
          
          <div className="space-y-4 lg:space-y-6 flex-1">
            {scenario.choices.map((choice, index) => (
              <button
                key={choice.id}
                onClick={() => onChoiceSelect(choice.id)}
                className={`w-full p-6 lg:p-8 rounded-2xl font-semibold text-left transition-all duration-300 transform hover:scale-102 shadow-xl active:scale-98 ${impactColors[choice.impact]} min-h-[100px] lg:min-h-[120px] relative`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg lg:text-xl xl:text-2xl leading-relaxed pr-4">{choice.text}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xl">{getCategoryIcon(choice.category)}</span>
                    <span className="text-2xl lg:text-3xl">→</span>
                  </div>
                </div>
                {choice.availableIf && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                    NEW!
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
