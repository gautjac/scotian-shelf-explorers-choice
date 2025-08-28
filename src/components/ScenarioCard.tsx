
import { Scenario, Language } from '../types';
import { useComprehensiveConfig } from '../hooks/useComprehensiveConfig';

interface ScenarioCardProps {
  scenario: Scenario;
  language: Language['code'];
  onChoiceSelect: (choiceId: string) => void;
}

const impactColors = {
  positive: 'bg-[#008BBF] active:bg-[#008BBF]/90 text-white',
  negative: 'bg-[#0C556B] active:bg-[#0C556B]/90 text-white',
  neutral: 'bg-[#0C556B] active:bg-[#0C556B]/90 text-white'
};

export const ScenarioCard = ({ scenario, language, onChoiceSelect }: ScenarioCardProps) => {
  const { getScenarioText, getChoiceText } = useComprehensiveConfig();
  const title = getScenarioText(scenario.id, 'title', language) ?? scenario.title;
  const description = getScenarioText(scenario.id, 'description', language) ?? scenario.description;
  return (
    <div className="h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
      {/* Scenario image - optimized for sidebar layout */}
      <div className="h-96 lg:h-[26rem] bg-cover bg-center relative flex-shrink-0" style={{ backgroundImage: `url(${scenario.imageUrl})` }}>
      </div>

      {/* Scenario content - scrollable if needed */}
      <div className="flex-1 p-8 lg:p-10 pb-8 lg:pb-12 flex flex-col overflow-y-auto">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 mb-6">{title}</h2>
        <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8 lg:mb-10">
          {description}
        </p>

        {/* Choices - optimized for touch interaction */}
        <div className="flex flex-col">
          <h3 className="text-2xl lg:text-3xl font-semibold text-slate-800 mb-6 lg:mb-8">
            {language === 'en' && 'What would you do?'}
            {language === 'fr' && 'Que feriez-vous?'}
            {language === 'mi' && 'Koqoey ketu elkewek?'}
          </h3>
          
          <div className="space-y-4 lg:space-y-6">
            {scenario.choices.map((choice, index) => (
              <button
                key={choice.id}
                onClick={() => onChoiceSelect(choice.id)}
                className={`w-full p-6 lg:p-8 rounded-2xl font-semibold text-left transition-all duration-300 transform shadow-xl active:scale-98 ${impactColors[choice.impact]} min-h-[100px] lg:min-h-[120px]`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg lg:text-xl xl:text-2xl leading-relaxed pr-4">{getChoiceText(scenario.id, choice.id, 'text', language) ?? choice.text}</span>
                  <span className="text-2xl lg:text-3xl flex-shrink-0">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
