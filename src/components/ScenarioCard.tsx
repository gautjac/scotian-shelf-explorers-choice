
import { Scenario, Language } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
  language: Language['code'];
  onChoiceSelect: (choiceId: string) => void;
}

const impactColors = {
  positive: 'bg-green-500 hover:bg-green-600',
  negative: 'bg-red-500 hover:bg-red-600',
  neutral: 'bg-blue-500 hover:bg-blue-600'
};

export const ScenarioCard = ({ scenario, language, onChoiceSelect }: ScenarioCardProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Scenario image */}
      <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${scenario.imageUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <h2 className="text-3xl font-bold text-white mb-2">{scenario.title}</h2>
        </div>
      </div>

      {/* Scenario content */}
      <div className="p-8">
        <p className="text-lg text-slate-700 leading-relaxed mb-8">
          {scenario.description}
        </p>

        {/* Choices */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            {language === 'en' && 'What would you do?'}
            {language === 'fr' && 'Que feriez-vous?'}
            {language === 'mi' && 'Koqoey ketu elkewek?'}
          </h3>
          
          {scenario.choices.map((choice, index) => (
            <button
              key={choice.id}
              onClick={() => onChoiceSelect(choice.id)}
              className={`w-full p-6 rounded-xl text-white font-semibold text-left transition-all duration-300 transform hover:scale-105 shadow-lg ${impactColors[choice.impact]}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{choice.text}</span>
                <span className="text-2xl">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
