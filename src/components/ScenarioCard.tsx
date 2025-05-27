
import { Scenario, Language } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
  language: Language['code'];
  onChoiceSelect: (choiceId: string) => void;
}

const impactColors = {
  positive: 'bg-[#008BBF] hover:bg-[#008BBF]/90 text-white', // Ocean blue for positive
  negative: 'bg-[#B22222] hover:bg-[#B22222]/90 text-white', // Maroon for negative  
  neutral: 'bg-[#0C556B] hover:bg-[#0C556B]/90 text-white'   // Teal for neutral
};

export const ScenarioCard = ({ scenario, language, onChoiceSelect }: ScenarioCardProps) => {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Scenario image - optimized for 32" display */}
      <div className="h-80 bg-cover bg-center relative" style={{ backgroundImage: `url(${scenario.imageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-8 right-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3">{scenario.title}</h2>
        </div>
      </div>

      {/* Scenario content - larger spacing for touch */}
      <div className="p-10 lg:p-12">
        <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-12">
          {scenario.description}
        </p>

        {/* Choices - optimized for touch interaction */}
        <div className="space-y-6">
          <h3 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-8">
            {language === 'en' && 'What would you do?'}
            {language === 'fr' && 'Que feriez-vous?'}
            {language === 'mi' && 'Koqoey ketu elkewek?'}
          </h3>
          
          {scenario.choices.map((choice, index) => (
            <button
              key={choice.id}
              onClick={() => onChoiceSelect(choice.id)}
              className={`w-full p-8 lg:p-10 rounded-2xl font-semibold text-left transition-all duration-300 transform hover:scale-102 shadow-xl active:scale-98 ${impactColors[choice.impact]} min-h-[120px] lg:min-h-[140px]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl lg:text-2xl leading-relaxed pr-4">{choice.text}</span>
                <span className="text-3xl lg:text-4xl flex-shrink-0">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
