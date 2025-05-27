
import { Language, Scenario } from '../types';

interface ScenarioPreviewProps {
  scenarios: Scenario[];
  language: Language['code'];
  onStart: () => void;
  onBack: () => void;
  onScenarioSelect?: (scenarioId: string) => void;
}

const previewText = {
  en: {
    title: 'Your Ocean Journey Awaits',
    subtitle: 'Preview the scenarios you\'ll encounter',
    startButton: 'Start Your Adventure',
    backButton: 'Back to Welcome',
    instruction: 'You\'ll make important decisions in each scenario',
    selectScenario: 'Click on any scenario to start there'
  },
  fr: {
    title: 'Votre voyage océanique vous attend',
    subtitle: 'Aperçu des scénarios que vous rencontrerez',
    startButton: 'Commencer votre aventure',
    backButton: 'Retour à l\'accueil',
    instruction: 'Vous prendrez des décisions importantes dans chaque scénario',
    selectScenario: 'Cliquez sur un scénario pour commencer là'
  },
  mi: {
    title: 'Samqwan alasutmaqan petkik',
    subtitle: 'Nemi\'j koqoey ketu nemitultine\'k',
    startButton: 'Mawita\'n kiskukewey',
    backButton: 'Apijiw piluei',
    instruction: 'Msit koqoey ketu elkewek',
    selectScenario: 'Pekowsin koqoey mawita\'si\'k'
  }
};

export const ScenarioPreview = ({ scenarios, language, onStart, onBack, onScenarioSelect }: ScenarioPreviewProps) => {
  const content = previewText[language];
  
  // Get first 5 scenarios
  const previewScenarios = scenarios.slice(0, 5);

  const handleScenarioClick = (scenarioId: string) => {
    if (onScenarioSelect) {
      onScenarioSelect(scenarioId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-teal-600 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            {content.title}
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-6">
            {content.subtitle}
          </p>
          <p className="text-lg lg:text-xl text-blue-200 mb-4">
            {content.instruction}
          </p>
          {onScenarioSelect && (
            <p className="text-base lg:text-lg text-blue-300">
              {content.selectScenario}
            </p>
          )}
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {previewScenarios.map((scenario, index) => (
            <div
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario.id)}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${
                onScenarioSelect 
                  ? 'hover:bg-white/20 cursor-pointer transform hover:scale-105 active:scale-95' 
                  : 'hover:bg-white/15'
              }`}
            >
              {/* Scenario Image */}
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${scenario.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-lg">
                  {index + 1}
                </div>
                {onScenarioSelect && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    Click to start
                  </div>
                )}
              </div>

              {/* Scenario Content */}
              <div className="p-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                  {scenario.title}
                </h3>
                <p className="text-blue-100 text-base lg:text-lg leading-relaxed">
                  {scenario.description.length > 120 
                    ? `${scenario.description.substring(0, 120)}...`
                    : scenario.description
                  }
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={onBack}
            className="bg-white/20 backdrop-blur-sm text-white px-12 py-6 lg:px-16 lg:py-8 rounded-full text-xl lg:text-2xl font-medium shadow-xl hover:bg-white/30 active:bg-white/40 transition-all duration-300 min-h-[80px] lg:min-h-[100px]"
          >
            {content.backButton}
          </button>
          <button
            onClick={onStart}
            className="bg-white text-blue-900 px-16 py-6 lg:px-20 lg:py-8 rounded-full text-xl lg:text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 hover:bg-blue-50 min-h-[80px] lg:min-h-[100px]"
          >
            {content.startButton}
          </button>
        </div>
      </div>
    </div>
  );
};
